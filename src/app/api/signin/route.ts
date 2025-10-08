import { adminClient, client } from '@/lib/appwrite/client';
import { NextRequest, NextResponse } from 'next/server';
import { Account, Teams } from 'node-appwrite';
import { z } from 'zod';

const FormSchema = z.object({
  email: z.email({ message: 'Invalid email address' }),
  password: z.string().min(8, {
    message: 'Password must have at least 8 characters',
  }),
  domain: z.string().optional(),
});

export async function POST(request: NextRequest) {
  const payload = await request.json();

  const { success, error } = FormSchema.safeParse(payload);
  if (!success) {
    return NextResponse.json(
      { errors: error.issues },
      { status: 422 },
    );
  }

  try {
    const account = new Account(adminClient);
    const session =
      await account.createEmailPasswordSession(payload);

    if (payload.domain) {
      const teams = new Teams(adminClient);
      const team = await teams.get({
        teamId: payload.domain,
      });
      if (!team) {
        return NextResponse.json(
          {
            error: `The app ${payload.domain} does not exist in IAM`,
            errors: [],
          },
          { status: 404 },
        );
      }

      const memberships = await teams.listMemberships({
        teamId: payload.domain,
      });
      const isUserMember = memberships.memberships.find(
        (m) => m.userEmail === payload.email,
      );

      if (!isUserMember) {
        return NextResponse.json(
          {
            data: {
              sessionId: session.$id,
              session: session.secret,
            },
            error: null,
            errors: [],
          },
          {
            status: 302,
          },
        );
      }
    }

    return NextResponse.json(
      {
        error: null,
        errors: [],
        session: session.secret,
      },
      {
        headers: { session: session.secret },
      },
    );
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message, errors: [] },
      { status: 400 },
    );
  }
}
