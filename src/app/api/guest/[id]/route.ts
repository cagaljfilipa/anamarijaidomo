import { initFirebaseAdmin } from "@/firebase/initFirebaseNode";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const db = initFirebaseAdmin();

  // get the id from the slug url
  const id = params.id;

  // return the invite with the id
  const invite = await db.collection("invites").doc(id).get();
  const inviteData = Object.assign({}, { id: invite.id }, invite.data());

  return NextResponse.json(inviteData);
}

export async function POST(
  request: Request,
  { params }: { params: { id: string } }
) {
  const db = initFirebaseAdmin();

  const id = params.id;
  const requestBody = await request.json();
  // verify that the invite code is correct
  const invite = await db.collection("invites").doc(id).get();
  const inviteData = Object.assign({}, { id: invite.id }, invite.data());

  if (inviteData.inviteCode !== requestBody.inviteCode) {
    return NextResponse.json(
      "Sorry, that invite code is incorrect. Please try again.",
      { status: 400 }
    );
  }

  // update the invite with the guest's response
  await db.collection("invites").doc(id).update({
    responded: true,
    guests: requestBody.guests,
  });

  return NextResponse.json(inviteData);
}
