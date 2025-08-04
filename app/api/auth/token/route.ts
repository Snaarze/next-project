import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  // next auth uses an algo which encode and decode using base64 to generate random long string or unique identification for user session in order to query/
  // sent data from the database or backend to client server
  const token = await getToken({ req: request });

  return NextResponse.json(token);
}
