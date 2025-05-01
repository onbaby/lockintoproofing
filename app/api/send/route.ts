import { Resend } from 'resend';
import { NextResponse } from 'next/server';

const resend = new Resend('re_fQjiyaBW_AyLd6zWPRQQ88jwJbjbhkPqZ');

export async function POST(req: Request) {
  try {
    const {
      firstName,
      lastName,
      email,
      phone,
      address,
      service,
      message,
    } = await req.json();

    const data = await resend.emails.send({
      from: 'American Top Roofing <onboarding@resend.dev>',
      to: ['sadiq.rasheed@outlook.com'],
      subject: `New Quote Request from ${firstName} ${lastName}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #ddd; border-radius: 5px;">
          <h2 style="color: #2563eb; margin-bottom: 20px;">New Quote Request</h2>
          <div style="margin-bottom: 15px;">
            <p style="margin: 5px 0;"><strong>Name:</strong> ${firstName} ${lastName}</p>
            <p style="margin: 5px 0;"><strong>Email:</strong> ${email}</p>
            <p style="margin: 5px 0;"><strong>Phone:</strong> ${phone}</p>
            <p style="margin: 5px 0;"><strong>Address:</strong> ${address}</p>
            <p style="margin: 5px 0;"><strong>Service Needed:</strong> ${service}</p>
          </div>
          <div style="margin-top: 20px; padding-top: 15px; border-top: 1px solid #eee;">
            <h3 style="color: #2563eb; margin-bottom: 10px;">Additional Information:</h3>
            <p style="margin: 5px 0;">${message || 'No additional information provided.'}</p>
          </div>
        </div>
      `,
    });

    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error('Email sending error:', error);
    return NextResponse.json({ error: 'Failed to send email' }, { status: 500 });
  }
} 