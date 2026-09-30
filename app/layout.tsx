import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import RobotMascot from "@/components/visuals/robot-mascot";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
});

const description =
  "AI software engineer in Dresden. Three years of production backends across Node.js, TypeScript and .NET, LLM systems shipped on top of them, and empirical ML work on whether reported results hold up.";

export const metadata: Metadata = {
  title: "Saad Aamir | AI Software Engineer",
  description,
  openGraph: {
    title: "Saad Aamir | AI Software Engineer",
    description,
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${jetbrainsMono.variable} font-sans`}>
        {children}
        <RobotMascot />
      </body>
    </html>
  );
}
