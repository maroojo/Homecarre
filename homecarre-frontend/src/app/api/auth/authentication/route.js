import { NextResponse } from "next/server";

export async function POST(req) {
  const token = req.cookies.get("token")?.value;
  const userInfoRaw = req.cookies.get("userInfo")?.value;

  if (!token || !userInfoRaw) {
    return NextResponse.json({ error: "Unauthenticated" }, { status: 401 });
  }

  const userInfo = JSON.parse(userInfoRaw);

  const res = await fetch(
    "https://accomasia.co.th/homecare/api/admin/checkuser",
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ user_id: userInfo.userId }),
    }
  );

  const check = await res.json();

  if (!res.ok) {
    return NextResponse.json(
      { error: "Token expired or invalid" },
      { status: 403 }
    );
  }

  return NextResponse.json({
    ...userInfo,
    status: check.status,
  });
}
