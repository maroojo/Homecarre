import { NextResponse } from 'next/server';

export async function GET(req) {
  const token = req.cookies.get('token')?.value;

  if (token) {
    await fetch('https://accomasia.co.th/homecare/logout', {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  const response = NextResponse.json({ logout: true });

  response.cookies.set('token', '', {
    httpOnly: true,
    path: '/',
    expires: new Date(0),
  });

  response.cookies.set('userInfo', '', {
    httpOnly: false,
    path: '/',
    expires: new Date(0),
  });

  return response;
}
