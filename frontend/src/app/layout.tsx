import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Nav from "@/components/ui/nav";
import { cookies } from "next/headers";
import { deleteCookie } from "./actions";
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
  const correo = cookieStore.get("correo");
  return (
    <>
      <html lang="es">
        <body className={inter.className + "min-h-screen bg-transparent"}>
          <Nav accessToken={accessToken} correo={correo} />
          {children}
        </body>
      </html>
    </>
  );
}
