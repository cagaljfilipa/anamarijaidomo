import { initFirebaseAdmin } from "@/firebase/initFirebaseNode";
import { NextResponse } from "next/server";

export async function POST() {
  const db = initFirebaseAdmin();

  return NextResponse.json("Donezo! Check the console for the invite IDs.");
}
