"use client";

import * as Sentry from "@sentry/nextjs";
import NextError from "next/error";
import { useEffect } from "react";

export default function GlobalError({ error }: { error: Error & { digest?: string } }) {
  // Capture the error with Sentry for monitoring
  useEffect(() => {
    Sentry.captureException(error);
  }, [error]);

  return (
    <html>
      <body>
        {/* 
          `NextError` is the default Next.js error page component.
          Its type definition requires a `statusCode` prop.
          Since the App Router does not expose status codes for errors,
          we simply pass 0 to render a generic error message.
        */}
        <NextError statusCode={0} />
      </body>
    </html>
  );
}