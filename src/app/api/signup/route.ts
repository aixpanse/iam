import { adminClient, client } from '@/lib/appwrite/client';
import { NextRequest, NextResponse } from 'next/server';
import { Account, Query, Teams, Users } from 'node-appwrite';
import { z } from 'zod';
import * as uuid from 'uuid';

const FormSchema = z.object({
  name: z.string().optional(),
  email: z.email({ message: 'Invalid email address' }),
  password: z
    .string()
    .min(8, { message: 'Password must have at least 8 characters' }),
  confirmPassword: z
    .string()
    .min(8, { message: 'Password must have at least 8 characters' }),
  label: z.string().optional(),
  domain: z.string().optional(),
});

export async function POST(request: NextRequest) {
  const payload = await request.json();

  const { success, error } = FormSchema.safeParse(payload);
  if (!success) {
    return NextResponse.json({ errors: error.issues }, { status: 422 });
  }

  try {
    if (payload.password !== payload.confirmPassword) {
      throw Error('Passwords are not the same');
    }

    const userId = uuid.v4();

    const teams = new Teams(adminClient);

    if (payload.domain) {
      const team = await teams.get({ teamId: payload.domain });
      if (!team) {
        return NextResponse.json({
          error: `The app ${payload.domain} does not exist in IAM`,
          errors: [],
        });
      }
    }

    let account = new Account(adminClient);
    const res = await account.create({
      userId,
      name: payload.name,
      email: payload.email,
      password: payload.password,
    });

    if (payload.domain) {
      await teams.createMembership({
        teamId: payload.domain,
        roles: ['member'],
        userId,
        email: payload.email,
        name: payload.name,
      });
    }

    if (payload.label) {
      const users = new Users(adminClient);
      await users.updateLabels({
        userId: res.$id,
        labels: [payload.label],
      });
    }

    const session = await account.createEmailPasswordSession(payload);
    client.setSession(session.secret);

    const userAccount = new Account(client);
    await userAccount.createVerification({
      url: `${process.env.NEXT_PUBLIC_APP_URL}/auth/verify`,
    });

    await userAccount.deleteSession({ sessionId: session.$id });

    return NextResponse.json({
      error: null,
      errors: [],
    });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message, errors: [] },
      { status: 400 },
    );
  }
}
