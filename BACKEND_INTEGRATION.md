# BWEBO Contact Form - Backend Integration Guide

## Overview
The BWEBO website contact form is fully integrated with Supabase backend for data storage and ready for email notifications.

---

## ✅ Current Implementation

### 1. **Form Fields**
- ✅ Full Name
- ✅ Email Address
- ✅ Phone Number
- ✅ Business Type (Hotel, Company, Supermarket, Startup, Other)
- ✅ Website Package (Standard, Premium)
- ✅ Message / Notes

### 2. **Backend Integration**
- ✅ Supabase Edge Function endpoint: `/make-server-af2d9ffb/contact`
- ✅ Data saved to Supabase PostgreSQL via KV store
- ✅ Form validation on both frontend and backend
- ✅ Success/Error states with user feedback
- ✅ Loading states during submission

### 3. **Security Features**
- ✅ CORS protection
- ✅ Request validation
- ✅ Environment variables for sensitive data
- ✅ reCAPTCHA placeholder ready for integration

---

## 📧 Email Notification Setup (TODO)

To send email notifications to **bwebo.dz@gmail.com** when a form is submitted, you can use one of these services:

### Option 1: Resend (Recommended)

1. Sign up at [resend.com](https://resend.com)
2. Get your API key
3. Add to Supabase environment variables:
   ```
   RESEND_API_KEY=re_your_api_key_here
   ```
4. Uncomment the email code in `/supabase/functions/server/index.tsx`
5. Update the `from` email to your verified domain

### Option 2: SendGrid

1. Sign up at [sendgrid.com](https://sendgrid.com)
2. Get your API key
3. Add similar integration code to the endpoint

### Option 3: Supabase Email (if configured)

Use Supabase's built-in email functionality if you have it set up.

---

## 🔐 reCAPTCHA Integration (Optional)

To add spam protection:

1. Get reCAPTCHA keys from [Google reCAPTCHA](https://www.google.com/recaptcha/admin)
2. Add to your environment:
   ```
   RECAPTCHA_SITE_KEY=your_site_key
   RECAPTCHA_SECRET_KEY=your_secret_key
   ```
3. Update the Contact.tsx component to include reCAPTCHA widget
4. Verify the token on the backend before saving

---

## 📊 Data Structure

Each form submission is saved with this structure:

```typescript
{
  id: "contact_1234567890_abc123",
  fullName: "John Doe",
  email: "john@example.com",
  phone: "+213 XXX XX XX XX",
  businessType: "company",
  websitePackage: "premium",
  message: "I need a website for my business...",
  submittedAt: "2024-01-15T10:30:00.000Z",
  type: "contact_form"
}
```

---

## 🧪 Testing

### Test the form:
1. Fill out all required fields
2. Submit the form
3. Check browser console for logs
4. Verify data in Supabase dashboard under the KV store
5. Check for success message

### Test the backend:
```bash
curl -X POST https://YOUR_PROJECT_ID.supabase.co/functions/v1/make-server-af2d9ffb/contact \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_ANON_KEY" \
  -d '{
    "fullName": "Test User",
    "email": "test@example.com",
    "phone": "+213123456789",
    "businessType": "company",
    "websitePackage": "standard",
    "message": "Test message"
  }'
```

---

## 🎨 UI States

### Success State
- ✅ Green checkmark icon
- ✅ "Request sent successfully!" message
- ✅ Form resets after 5 seconds
- ✅ Additional info: "We'll contact you within 24 hours"

### Error State
- ❌ Red alert icon
- ❌ "There was an issue, please try again." message
- ❌ Fallback: "Or contact us directly at bwebo.dz@gmail.com"

### Loading State
- ⏳ Spinning animation
- ⏳ "Sending to Supabase Backend..." text
- ⏳ Disabled form fields and button

---

## 📝 Next Steps

1. **Add Email Notifications** - Uncomment and configure email service in backend
2. **Add reCAPTCHA** - Integrate Google reCAPTCHA for spam protection
3. **Add Analytics** - Track form submissions
4. **Add Webhooks** - Notify other services when form is submitted
5. **Add Auto-responder** - Send confirmation email to user

---

## 🚀 Deployment Checklist

- [x] Form integrated with Supabase backend
- [x] Data validation on frontend and backend
- [x] Success/error handling
- [ ] Email notifications configured
- [ ] reCAPTCHA integrated
- [ ] Rate limiting configured
- [ ] Analytics tracking added
- [ ] Auto-responder email set up

---

## 📞 Support

For questions or issues, contact the development team or refer to:
- Supabase documentation: https://supabase.com/docs
- Resend documentation: https://resend.com/docs
- reCAPTCHA documentation: https://developers.google.com/recaptcha

---

**Last Updated:** December 29, 2024
