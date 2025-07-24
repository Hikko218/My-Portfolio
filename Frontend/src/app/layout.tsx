import "./globals.css";
import { ReactNode } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata = {
  title: "My Portfolio",
  description: "Built with Next.js, Tailwind, TypeScript, shadcn/ui",
  openGraph: {
    title: "My Portfolio",
    description: "Built with Next.js, Tailwind, TypeScript, shadcn/ui",
    url: "https://my-portfolio.de",
    siteName: "Heiko Ries Portfolio",
    images: [
      {
        url: "https://localhost:3001/Titel_Picture.JPG",
        width: 1200,
        height: 630,
        alt: "Heiko Ries Portfolio Preview",
      },
    ],
    locale: "de_DE",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col bg-cover bg-center"
        style={{ backgroundImage: "url('/hero-bg.jpg')" }}>

        <Header />
        <main className="flex-grow">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
