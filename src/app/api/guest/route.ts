import { initFirebaseAdmin } from "@/firebase/initFirebaseNode";
import { NextResponse } from "next/server";

export async function GET() {
  const db = initFirebaseAdmin();

  // returns all invites
  const invites = await db.collection("invites").get();
  const inviteIds = invites.docs.map((invite: any) =>
    Object.assign({}, { id: invite.id }, invite.data())
  );

  return NextResponse.json(inviteIds);
}
