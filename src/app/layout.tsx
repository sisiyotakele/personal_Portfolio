import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Sisiyo Takele — Software Engineer",
  description: "Sisiyo Takele builds thoughtful software across full-stack, backend, mobile, and AI/ML.",
  icons: {
    icon: [{ url: "/favicon.png", type: "image/png", sizes: "512x512" }],
    shortcut: "/favicon.png",
    apple: "/favicon.png",
  },
  openGraph: {
    title: "Sisiyo Takele — Software Engineer",
    description: "Building useful software with care, curiosity, and intelligent systems.",
    type: "website",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
