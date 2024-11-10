import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Nav from "@/components/ui/nav";
import { cookies } from "next/headers";
import { NextAuthProvider } from "./providers";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "G10 - Desarrollo 2024",
  description: "Bienal de esculturas",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = cookies();
  const accessToken = cookieStore.get("access_token");
  const userString = cookieStore.get("user");
  const user = userString ? JSON.parse(userString?.value) : null;
  return (
    <html lang="es">
      <body className={`${inter.className} min-h-screen bg-transparent`}>
        <NextAuthProvider>
          <Nav cookieData={accessToken} user={user} />
          <main>{children}</main>
        </NextAuthProvider>
      </body>
    </html>
  );
}
