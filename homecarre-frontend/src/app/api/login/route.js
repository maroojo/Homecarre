// app/api/adminlogin/route.js
export async function POST(request) {
    const body = await request.json();
  
    const res = await fetch('https://accomasia.co.th/homecare/adminlogin', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body,
    });
  
    const data = await res.json(); 
    return new Response(data, {
      status: res.status,
      headers: { 'Content-Type': 'application/json' },
    });
  }
  