import { adminClient } from '@/lib/appwrite/client';
import { getLoggedInUser } from '@/lib/auth/appwrite';
import { NextRequest, NextResponse } from 'next/server';
import { Models, Query, Teams, Users } from 'node-appwrite';
import z from 'zod';

const FormSchema = z.object({
  name: z.string(),
  domain: z.string(),
});

export async function PUT(request: NextRequest) {
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
    await teams.updateName({
      teamId: payload.domain,
      name: payload.name,
    });

    await teams.updatePrefs({
      teamId: payload.domain,
      prefs: {
        logoUrl: payload.logoUrl,
        imageUrl: payload.imageUrl,
      },
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

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ appId: string }> },
) {
  const { appId } = await params;

  try {
    const teams = new Teams(adminClient);
    const team = await teams.get({ teamId: appId });

    return NextResponse.json({
      data: team,
      error: null,
      errors: [],
    });
  } catch (error: any) {
    if (error.code === 404) {
      return NextResponse.json(
        { error: 'App not found', errors: [] },
        { status: 404 },
      );
    }

    return NextResponse.json(
      { error: error.message, errors: [] },
      { status: 400 },
    );
  }
}
