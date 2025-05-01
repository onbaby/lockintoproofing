import { NextResponse } from 'next/server';
import { Resend } from 'resend';

// Debug: Log environment variables
const apiKey = process.env.RESEND_API_KEY;
console.log('Debug - Environment Variables:', {
  apiKeyExists: !!apiKey,
  apiKeyLength: apiKey?.length,
  fromEmail: process.env.RESEND_FROM_EMAIL,
  toEmail: process.env.RESEND_TO_EMAIL,
  nodeEnv: process.env.NODE_ENV
});

if (!apiKey) {
  console.error('Critical Error: RESEND_API_KEY is not configured');
  throw new Error('RESEND_API_KEY is required');
}

const resend = new Resend(apiKey);

export async function POST(request: Request) {
  try {
    // Log the incoming request
    const formData = await request.json();
    console.log('Debug - Received form data:', formData);

    // Validate required fields
    const requiredFields = ['firstName', 'lastName', 'email', 'phone', 'address', 'service'];
    const missingFields = requiredFields.filter(field => !formData[field]);
    
    if (missingFields.length > 0) {
      console.error('Validation Error - Missing fields:', missingFields);
      return NextResponse.json(
        { error: `Missing required fields: ${missingFields.join(', ')}` },
        { status: 400 }
      );
    }

    const { firstName, lastName, email, phone, address, service, message } = formData;

    // Log the email configuration
    const emailConfig = {
      from: `American Top Roofing <onboarding@americantoproofingandrestoration.com>`,
      to: [process.env.RESEND_TO_EMAIL || 'sadiq.rasheed@outlook.com'],
      subject: `New Roofing Quote Request from ${firstName} ${lastName}`,
      reply_to: email
    };
    console.log('Debug - Email configuration:', emailConfig);

    try {
      console.log('Debug - Attempting to send email...');
      
      // Test Resend connection first
      console.log('Debug - Testing Resend connection...');
      try {
        const domains = await resend.domains.list();
        console.log('Debug - Resend domains:', domains);
      } catch (domainError) {
        console.error('Error getting domains:', domainError);
      }

      const { data, error } = await resend.emails.send({
        ...emailConfig,
        html: `
          <!DOCTYPE html>
          <html>
            <head>
              <meta charset="utf-8">
              <title>New Contact Form Submission</title>
              <style>
                body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
                .container { max-width: 600px; margin: 0 auto; padding: 20px; }
                .header { background-color: #2563eb; color: white; padding: 20px; border-radius: 5px 5px 0 0; }
                .content { background-color: #f9fafb; padding: 20px; border-radius: 0 0 5px 5px; }
                .field { margin-bottom: 15px; }
                .label { font-weight: bold; color: #4b5563; }
                .value { margin-top: 5px; }
                .footer { margin-top: 20px; font-size: 12px; color: #6b7280; }
              </style>
            </head>
            <body>
              <div class="container">
                <div class="header">
                  <h1 style="margin: 0;">New Contact Form Submission</h1>
                </div>
                <div class="content">
                  <div class="field">
                    <div class="label">Name:</div>
                    <div class="value">${firstName} ${lastName}</div>
                  </div>
                  <div class="field">
                    <div class="label">Email:</div>
                    <div class="value">${email}</div>
                  </div>
                  <div class="field">
                    <div class="label">Phone:</div>
                    <div class="value">${phone}</div>
                  </div>
                  <div class="field">
                    <div class="label">Address:</div>
                    <div class="value">${address}</div>
                  </div>
                  <div class="field">
                    <div class="label">Service Requested:</div>
                    <div class="value">${service}</div>
                  </div>
                  ${message ? `
                  <div class="field">
                    <div class="label">Additional Information:</div>
                    <div class="value">${message}</div>
                  </div>
                  ` : ''}
                </div>
                <div class="footer">
                  <p>This is an automated message from your website's contact form.</p>
                </div>
              </div>
            </body>
          </html>
        `
      });

      if (error) {
        console.error('Resend API Error:', {
          error,
          message: error.message,
          name: error.name
        });
        return NextResponse.json(
          { 
            error: `Failed to send email: ${error.message}`,
            details: error
          },
          { status: 500 }
        );
      }

      console.log('Success - Email sent:', data);
      return NextResponse.json(
        { 
          success: true, 
          message: 'Email sent successfully',
          data: data
        },
        { status: 200 }
      );
    } catch (emailError: any) {
      console.error('Email Sending Error:', {
        message: emailError.message,
        name: emailError.name,
        stack: emailError.stack,
        code: emailError.code,
        response: emailError.response
      });
      return NextResponse.json(
        { 
          error: `Email sending failed: ${emailError.message}`,
          details: {
            name: emailError.name,
            message: emailError.message,
            code: emailError.code
          }
        },
        { status: 500 }
      );
    }
  } catch (error: any) {
    console.error('Request Processing Error:', {
      message: error.message,
      name: error.name,
      stack: error.stack
    });
    return NextResponse.json(
      { 
        error: `Request failed: ${error.message}`,
        details: {
          name: error.name,
          message: error.message
        }
      },
      { status: 500 }
    );
  }
} 