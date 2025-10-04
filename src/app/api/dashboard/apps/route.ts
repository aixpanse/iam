import { adminClient } from '@/lib/appwrite/client';
import { getLoggedInUser } from '@/lib/auth/appwrite';
import { NextRequest, NextResponse } from 'next/server';
import { Models, Teams } from 'node-appwrite';
import z from 'zod';

const FormSchema = z.object({
  name: z.string(),
  domain: z.string(),
});

export async function POST(request: NextRequest) {
  const user = await getLoggedInUser();

  if (!user?.labels?.includes('iam')) {
    return NextResponse.json(
      { error: 'Not allowed', errors: [] },
      { status: 403 },
    );
  }

  const payload = await request.json();
  const { success, error } = FormSchema.safeParse(payload);
  if (!success) {
    return NextResponse.json(
      { errors: error.issues },
      { status: 422 },
    );
  }

  try {
    const teams = new Teams(adminClient);
    await teams.create({
      teamId: payload.domain,
      name: payload.name,
      roles: ['owner', 'member'],
    });
    await teams.createMembership({
      teamId: payload.domain,
      roles: ['owner'],
      userId: user!.$id,
      name: user!.name,
    });

    return NextResponse.json(
      { error: null, errors: [] },
      { status: 201 },
    );
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message, errors: [] },
      { status: 400 },
    );
  }
}

export async function GET(request: NextRequest) {
  const user = await getLoggedInUser();

  if (!user?.labels?.includes('iam')) {
    return NextResponse.json(
      { error: 'Not allowed', errors: [] },
      { status: 403 },
    );
  }

  try {
    const teams = new Teams(adminClient);
    const teamsList = await teams.list();
    const result: Models.Team[] = [];
    for (const team of teamsList.teams) {
      const { memberships } = await teams.listMemberships({
        teamId: team.$id,
      });
      const userMembership = memberships.find(
        (m) =>
          user &&
          m.userId === user.$id &&
          m.roles.includes('owner'),
      );
      if (userMembership) {
        result.push(team);
      }
    }

    return NextResponse.json({
      data: result.map((r) => ({
        id: r.$id,
        name: r.name,
        domain: r.$id,
      })),
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
