import { adminClient, client } from "@/lib/appwrite/client";
import { NextRequest, NextResponse } from "next/server";
import { Account, Users } from "node-appwrite";
import { z } from "zod";
import { createSessionClient, getLoggedInUser } from "@/lib/auth/appwrite";

const DeleteFormSchema = z.object({
  delete: z.string(),
});

const PatchUserFormSchema = z.object({
  name: z.string().optional(),
});

export async function DELETE(request: NextRequest) {
  const user = await getLoggedInUser();
  if (!user) {
    return NextResponse.json(
      { error: "Not allowed", errors: [] },
      { status: 403 },
    );
  }

  const payload = await request.json();

  const { success, error } = DeleteFormSchema.safeParse(payload);
  if (!success) {
    return NextResponse.json({ errors: error.issues }, { status: 422 });
  }

  try {
    if (payload.delete !== "delete") {
      throw Error("You must type delete");
    }

    const { account } = await createSessionClient();
    await account.deleteSessions();

    const users = new Users(adminClient);
    users.delete({ userId: user.$id });

    return NextResponse.json({
      error: null,
      errors: [],
    });
  } catch (error: any) {
    console.error(error);
    return NextResponse.json(
      { error: error.message, errors: [] },
      { status: 400 },
    );
  }
}

export async function PATCH(request: NextRequest) {
  const user = await getLoggedInUser();
  if (!user) {
    return NextResponse.json(
      { error: "Not allowed", errors: [] },
      { status: 403 },
    );
  }

  const payload = await request.json();

  const { success, error } = PatchUserFormSchema.safeParse(payload);
  if (!success) {
    return NextResponse.json({ errors: error.issues }, { status: 422 });
  }

  try {
    const { account } = await createSessionClient();
    await account.updateName(payload.name);

    return NextResponse.json({
      error: null,
      errors: [],
    });
  } catch (error: any) {
    console.error(error);
    return NextResponse.json(
      { error: error.message, errors: [] },
      { status: 400 },
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    console.log({ session: request.headers.get("session") });
    client.setSession(request.headers.get("session") || "");
    const account = new Account(client);
    const user = await account.get();
    if (!user) {
      return NextResponse.json(
        { error: "Not allowed", errors: [] },
        { status: 403 },
      );
    }

    console.log({ user });
    return NextResponse.json(
      {
        user,
        error: null,
        errors: [],
      },
      {
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
          "Access-Control-Allow-Headers": "*",
        },
      },
    );
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message, errors: [] },
      {
        status: error.code || 400,
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
          "Access-Control-Allow-Headers": "*",
        },
      },
    );
  }
}

export async function OPTIONS(request: NextRequest) {
  return new NextResponse(null, {
    status: 200,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
      "Access-Control-Allow-Headers": "*",
    },
  });
}
