import { adminClient } from "@/lib/appwrite/client";
import { NextRequest, NextResponse } from "next/server";
import { Account } from "node-appwrite";
import { z } from "zod";

const FormSchema = z.object({
  email: z.email({ message: "Invalid email address" }),
});

export async function POST(request: NextRequest) {
  const payload = await request.json();

  const { success, error } = FormSchema.safeParse(payload);
  if (!success) {
    return NextResponse.json({ errors: error.issues }, { status: 422 });
  }

  const account = new Account(adminClient);

  try {
    await account.createRecovery({
      email: payload.email,
      url: `${process.env.NEXT_PUBLIC_APP_URL}/password`,
    });
    return NextResponse.json({ error: null, errors: [] });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message, errors: [] },
      { status: 400 },
    );
  }
}

const UpdateFormSchema = z.object({
  password: z
    .string()
    .min(8, { message: "Password must have at least 8 characters" }),
  userId: z.string(),
  secret: z.string(),
});

export async function PUT(request: NextRequest) {
  const payload = await request.json();

  const { success, error } = UpdateFormSchema.safeParse(payload);
  if (!success) {
    return NextResponse.json({ errors: error.issues }, { status: 422 });
  }

  const account = new Account(adminClient);

  try {
    await account.updateRecovery(payload);
    //await account.updatePassword({ password: payload.password });

    return NextResponse.json({ error: null, errors: [] });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message, errors: [] },
      { status: 400 },
    );
  }
}
