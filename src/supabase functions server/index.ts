import { Hono } from "npm:hono";
import { cors } from "npm:hono/cors";
import { logger } from "npm:hono/logger";
import { createClient } from "npm:@supabase/supabase-js@2";
const app = new Hono();

// Enable logger
app.use('*', logger(console.log));

// Enable CORS for all routes and methods
app.use(
  "/*",
  cors({
    origin: "*",
    allowHeaders: ["Content-Type", "Authorization"],
    allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    exposeHeaders: ["Content-Length"],
    maxAge: 600,
  }),
);

// Health check endpoint
app.get("/make-server-af2d9ffb/health", (c) => {
  return c.json({ status: "ok" });
});

// Contact form submission endpoint
app.post("/make-server-af2d9ffb/contact", async (c) => {
  try {
    // Parse multipart form data (files + text)
    const body = await c.req.parseBody({ all: true });
    
    // Extract text fields (ensure they are strings)
    const fullName = body['fullName'] as string;
    const email = body['email'] as string;
    const phone = body['phone'] as string;
    const businessType = body['businessType'] as string;
    const websitePackage = body['websitePackage'] as string;
    const domain = body['domain'] as string;
    const message = body['message'] as string;

    // Extract files (can be a single file or array of files)
    const rawFiles = body['files'] as File | File[] | undefined;
    let files: File[] | undefined;
    if (rawFiles) {
      files = Array.isArray(rawFiles) ? (rawFiles as File[]) : [rawFiles as File];
    }
    
    if (!fullName || !email || !phone || !businessType || !websitePackage || !domain || !message) {
      return c.json(
        { success: false, error: "All text fields are required" },
        400
      );
    }

    // Create Supabase client with service role key
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '',
    );

    // Handle File Uploads
    const fileUrls: string[] = [];
    
    if (files && files.length > 0) {
      const bucketName = 'contact-uploads';
      
      // Ensure bucket exists (idempotent check)
      const { data: buckets } = await supabase.storage.listBuckets();
      const bucketExists = buckets?.some(bucket => bucket.name === bucketName);
      
      if (!bucketExists) {
        await supabase.storage.createBucket(bucketName, {
          public: false, // Private bucket for security
          fileSizeLimit: 10485760, // 10MB limit
        });
      }

      // Upload each file
      for (const file of files) {
        // Sanitize filename: timestamp-random-filename
        const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}-${file.name.replace(/[^a-zA-Z0-9.-]/g, '_')}`;
        
        const { error: uploadError } = await supabase.storage
          .from(bucketName)
          .upload(fileName, file, {
            contentType: file.type,
            upsert: false
          });

        if (uploadError) {
          console.error(`Failed to upload ${file.name}:`, uploadError);
          continue; // Skip failed file but continue with others
        }

        // Create Signed URL (valid for 10 years ~ 315360000 seconds)
        // Since we can't store secure tokens easily in a simple text field, 
        // we'll generate a long-lived signed URL for the admin to view.
        const { data: signedUrlData } = await supabase.storage
          .from(bucketName)
          .createSignedUrl(fileName, 315360000); // 10 years

        if (signedUrlData?.signedUrl) {
          fileUrls.push(signedUrlData.signedUrl);
        }
      }
    }

    // Insert into clients table
    const { data, error } = await supabase
      .from('clients')
      .insert([
        {
          fullName: fullName,
          email: email,
          phone: phone,
          businessType: businessType,
          websitePackage: websitePackage,
          domain: domain,
          message: message,
          file_path: fileUrls.length > 0 ? fileUrls.join(',') : null, // Store URLs in file_path column
          time: new Date().toISOString(), // Store current timestamp in time column
        }
      ])
      .select();

    if (error) {
      console.error("Error inserting into clients table:", error);
      return c.json(
        { success: false, error: `Database error: ${error.message}` },
        500
      );
    }

    console.log("Contact form submission saved to clients table:", data);

    // TODO: Send email notification to bwebo.dz@gmail.com
    // You can integrate an email service like Resend, SendGrid, or Supabase Edge Function with email
    // Example with Resend:
    // await fetch('https://api.resend.com/emails', {
    //   method: 'POST',
    //   headers: {
    //     'Authorization': `Bearer ${Deno.env.get('RESEND_API_KEY')}`,
    //     'Content-Type': 'application/json'
    //   },
    //   body: JSON.stringify({
    //     from: 'notifications@yourdomain.com',
    //     to: 'bwebo.dz@gmail.com',
    //     subject: 'New Contact Form Submission',
    //     html: `<h2>New Contact Form</h2>
    //            <p><strong>Name:</strong> ${fullName}</p>
    //            <p><strong>Email:</strong> ${email}</p>
    //            <p><strong>Phone:</strong> ${phone}</p>
    //            <p><strong>Business Type:</strong> ${businessType}</p>
    //            <p><strong>Package:</strong> ${websitePackage}</p>
    //            <p><strong>Domain:</strong> ${domain}</p>
    //            <p><strong>Message:</strong> ${message}</p>`
    //   })
    // });

    return c.json({
      success: true,
      message: "Contact form submitted successfully",
      data: data,
    });

  } catch (error) {
    console.error("Error processing contact form:", error);
    return c.json(
      { success: false, error: `Internal server error: ${error.message}` },
      500
    );
  }
});

Deno.serve(app.fetch);