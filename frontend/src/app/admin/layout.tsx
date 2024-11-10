"use client";
import { AppSidebar } from "@/components/navigation/app-sidebar";
import {
  SidebarProvider,
  SidebarTrigger,
} from "@/components/navigation/sidebar";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import { SidebarInset } from "@/components/ui/sidebar";
import { usePathname } from "next/navigation";
import React from "react";

// Mapeo de rutas a nombres de páginas
const pageNames: Record<string, string> = {
  "/admin/events": "Eventos",
  "/admin/sculptors": "Escultores",
  "/admin/sculptures": "Esculturas",

  // Agrega más rutas según sea necesario
};

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();

  // Obtener el nombre de la página actual o una versión predeterminada
  const currentPageName = pageNames[pathname] || "Página Desconocida";

  return (
    <>
      <SidebarProvider>
        <AppSidebar />
        <SidebarInset>
          <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 h-4" />
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem className="hidden md:block">
                  <BreadcrumbLink href="/admin">Inicio</BreadcrumbLink>
                </BreadcrumbItem>

                {pathname !== "/admin" && (
                  <>
                    <BreadcrumbSeparator className="hidden md:block" />
                    <BreadcrumbItem>
                      <BreadcrumbPage>{currentPageName}</BreadcrumbPage>
                    </BreadcrumbItem>
                  </>
                )}
              </BreadcrumbList>
            </Breadcrumb>
          </header>

          <div className="pl-10">{children}</div>
        </SidebarInset>
      </SidebarProvider>
    </>
  );
}
