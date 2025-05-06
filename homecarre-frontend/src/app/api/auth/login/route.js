import { NextResponse } from "next/server";

export async function POST(req) {
  const body = await req.json();

  const res = await fetch("https://accomasia.co.th/homecare/adminlogin", {
    method: "POST",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

  const data = await res.json();

  if (!res.ok) {
    console.error("Login failed:", data);
    return NextResponse.json(
      { error: data?.message || "Login failed" },
      { status: res.status }
    );
  }

  const response = NextResponse.json({ success: true });

  const maxAge = 60 * 60 * 12;

  response.cookies.set("token", data.token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge,
  });

  response.cookies.set(
    "userInfo",
    JSON.stringify({
      fullname: data.user_fullname,
      role: data.user_auth,
      userId: data.user_id,
      userName: data.user_name,
    }),
    {
      httpOnly: false,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge,
    }
  );
  return response;
}
