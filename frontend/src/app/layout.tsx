import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import NavBar from "@/components/ui/navbar";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "G10 - Desarrollo 2024",
  description: "Bienal de esculturas",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <html lang="en" className="bg-black">
        <body className={inter.className }>
          <NavBar />
          {children}
        </body>
      </html>
    </>
  );
}
