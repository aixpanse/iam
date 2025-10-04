import { adminClient } from '@/lib/appwrite/client';
import { getLoggedInUser } from '@/lib/auth/appwrite';
import { NextRequest, NextResponse } from 'next/server';
import { Teams } from 'node-appwrite';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ appId: string }> },
) {
  const user = await getLoggedInUser();
  const { appId } = await params;

  if (!user?.labels?.includes('iam')) {
    return NextResponse.json(
      { error: 'Not allowed', errors: [] },
      { status: 403 },
    );
  }

  try {
    const teams = new Teams(adminClient);
    const { memberships } = await teams.listMemberships({
      teamId: appId,
    });

    return NextResponse.json({
      data: memberships.map((m) => ({
        $id: m.userId,
        name: m.userName,
        email: m.userEmail,
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
