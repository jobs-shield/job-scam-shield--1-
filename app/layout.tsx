import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/styles/globals.css";
import ClientLayoutWrapper from "@/components/ClientLayoutWrapper";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL("https://vijay-ukande.netlify.app"),
  title: "Vijay Ukande – Cybersecurity Portfolio",
  description: "Interactive cybersecurity portfolio showcasing vulnerability research, security projects, certifications, and technical skills.",
  keywords: ["Cybersecurity", "Portfolio", "Security Researcher", "Vulnerability Research", "Vijay Ukande"],
  authors: [{ name: "Vijay Ukande" }],
  openGraph: {
    title: "Vijay Ukande – Cybersecurity Portfolio",
    description: "Interactive cybersecurity portfolio showcasing vulnerability research, security projects, certifications, and technical skills.",
    url: "https://vijay-ukande.netlify.app",
    siteName: "Vijay Ukande Portfolio",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Vijay Ukande Cybersecurity Portfolio Preview",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Vijay Ukande – Cybersecurity Portfolio",
    description: "Interactive cybersecurity portfolio showcasing vulnerability research, security projects, certifications, and technical skills.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ClientLayoutWrapper>
          {children}
        </ClientLayoutWrapper>
      </body>
    </html>
  );
}
