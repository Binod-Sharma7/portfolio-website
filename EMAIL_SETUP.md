# Email Setup Instructions

To enable email functionality in your contact form, follow these steps:

## 1. Install EmailJS
Run this command in your terminal:
```bash
npm install @emailjs/browser
```

## 2. Create EmailJS Account
1. Go to [https://www.emailjs.com/](https://www.emailjs.com/)
2. Create a free account
3. Verify your email

## 3. Set up Email Service
1. Go to Email Services in your dashboard
2. Add a new service (Gmail, Outlook, etc.)
3. Connect your email account and verify

## 4. Create Email Template
1. Go to Email Templates
2. Create a new template with these variables:
   - `{{from_name}}` - Sender's name
   - `{{from_email}}` - Sender's email
   - `{{message}}` - Message content
   - `{{to_email}}` - Your email (sharmabinod9844976377@gmail.com)

Template example:
```
Subject: New Contact Form Message from {{from_name}}

Hi Binod,

You have received a new message from your portfolio website:

From: {{from_name}} ({{from_email}})

Message:
{{message}}

Best regards,
Portfolio Contact Form
```

## 5. Get Your Keys
After setting up service and template, you'll get:
- Service ID
- Template ID
- Public Key

## 6. Update the Code
In `src/App.jsx`, replace these placeholders in the `handleFormSubmit` function:
- `'YOUR_SERVICE_ID'` → Your actual service ID
- `'YOUR_TEMPLATE_ID'` → Your actual template ID
- `'YOUR_PUBLIC_KEY'` → Your actual public key

## 7. Test
1. Run `npm run dev`
2. Fill out the contact form
3. Submit and check your email

The form now includes:
- Form validation (required fields)
- Loading state during submission
- Success/error messages
- Form reset after successful submission