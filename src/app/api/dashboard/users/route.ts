import { adminClient } from "@/lib/appwrite/client";
import { getLoggedInUser } from "@/lib/auth/appwrite";
import { NextRequest, NextResponse } from "next/server";
import { Query, Users } from "node-appwrite";

export async function GET(request: NextRequest) {
  const user = await getLoggedInUser();
  const users = new Users(adminClient);

  if (!user?.labels?.includes("iam")) {
    return NextResponse.json(
      { error: "Not allowed", errors: [] },
      { status: 403 },
    );
  }

  if (!user?.prefs.company) {
    return NextResponse.json({
      users: [],
      error: null,
      errors: [],
    });
  }

  try {
    const userList = await users.list({
      queries: [Query.contains("labels", user?.prefs.company)],
    });
    return NextResponse.json({
      users: userList?.users ?? [],
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
