/* eslint-disable @next/next/no-page-custom-font */
import type { Metadata } from "next";

import "@/app/globals.css";

export const metadata: Metadata = {
  title: "PortFIAPolio",
  description: "Checkpoint 3",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
      <html lang="pt-br">
        <head>
          <link href="https://fonts.googleapis.com/css2?family=Questrial&family=Tajawal:wght@200;300;400;500;700;800;900&display=swap" rel="stylesheet" />
      </head>
        <body>
          {children}
        </body>
      </html>
  );
}

