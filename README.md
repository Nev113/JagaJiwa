# JagaJiwa - Mental Health Support Chatbot

This is a [Next.js](https://nextjs.org) project with an integrated Azure-powered chatbot for mental health support.

## Features

- 🤖 Intelligent chatbot powered by Azure Language Services
- 💭 Sentiment analysis for emotional support
- 🎯 QnA knowledge base integration
- 🚫 Gambling addiction detection and prevention
- 🆘 Crisis intervention support
- 📱 Responsive web interface

## Setup

1. **Clone and install dependencies:**

```bash
npm install
```

2. **Configure environment variables:**

   - Copy `.env.example` to `.env.local`
   - Fill in your Azure service credentials:
     - `LANGUAGE_ENDPOINT`: Your Azure Language Service endpoint
     - `LANGUAGE_KEY`: Your Azure Language Service key
     - `QNA_PROJECT_NAME`: Your QnA project name
     - `QNA_DEPLOYMENT_NAME`: Your QnA deployment name (usually "production")
     - `MicrosoftAppId`: Your Bot Framework app ID (optional for web chat)
     - `MicrosoftAppPassword`: Your Bot Framework app password (optional)

3. **Run the development server:**

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
