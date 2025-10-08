import { adminClient } from '@/lib/appwrite/client';
import { getLoggedInUser } from '@/lib/auth/appwrite';
import { NextRequest, NextResponse } from 'next/server';
import { Teams } from 'node-appwrite';

export async function POST(request: NextRequest) {
  const payload: { sessionId: string; domain: string } =
    await request.json();

  if (!payload.sessionId) {
    return NextResponse.json(
      { errors: 'SessionId is required' },
      { status: 422 },
    );
  }

  if (!payload.domain) {
    return NextResponse.json(
      { errors: 'Domain is required' },
      { status: 422 },
    );
  }

  console.log('post join', payload);

  try {
    const teams = new Teams(adminClient);
    const team = await teams.get({
      teamId: payload.domain,
    });
    console.log('got team');
    if (!team) {
      return NextResponse.json(
        {
          error: `The app ${payload.domain} does not exist in IAM`,
          errors: [],
        },
        { status: 404 },
      );
    }

    const user = await getLoggedInUser();
    if (user) {
      await teams.createMembership({
        teamId: payload.domain,
        roles: ['member'],
        userId: user.$id,
        email: user.email,
        name: user.name,
      });
    } else {
      return NextResponse.json(
        { error: 'User is not logged in', errors: [] },
        { status: 400 },
      );
    }

    return NextResponse.json(
      {
        error: null,
        errors: [],
      },
      {
        status: 200,
      },
    );
  } catch (error: any) {
    return NextResponse.json(
      {
        error: error.message,
        errors: [],
      },
      { status: 200 },
    );
  }
}
