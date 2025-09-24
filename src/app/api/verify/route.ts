import { adminClient, client } from "@/lib/appwrite/client";
import { createSessionClient, getLoggedInUser } from "@/lib/auth/appwrite";
import { NextRequest, NextResponse } from "next/server";
import { Account } from "node-appwrite";
import { z } from "zod";

const FormSchema = z.object({
  secret: z.string(),
  userId: z.string()
});

export async function POST(request: NextRequest) {
  const payload = await request.json();

  const { success, error } = FormSchema.safeParse(payload);
  if (!success) {
    return NextResponse.json({ errors: error.issues }, { status: 422 });
  }

  try {
    const account = new Account(client);
    await account.updateVerification(payload);

    return NextResponse.json({
      error: null,
      errors: [],
    });
  } catch (error: any) {
    if (error) { 
      const user = await getLoggedInUser();
      if (user?.emailVerification) { 
        return NextResponse.json({
          error: null,
          errors: [],
        });
      }
    }
    return NextResponse.json(
      { error: error.message, errors: [] },
      { status: 400 },
    );
  }
}
