import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";
import ThemeRegistry from "@/theme/ThemeRegistry";
import NextAuthSessionProvider from "@/components/SessionProvider";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
});

export const metadata: Metadata = {
  title: "AI English Learning",
  description: "Improve your English writing with AI",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${outfit.variable} antialiased`}
      >
        <ThemeRegistry>
          <NextAuthSessionProvider>{children}</NextAuthSessionProvider>
        </ThemeRegistry>
      </body>
    </html>
  );
}
