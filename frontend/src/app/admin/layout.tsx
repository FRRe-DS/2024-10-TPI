import { AppSidebar } from "@/components/navigation/app-sidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/navigation/sidebar";

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <SidebarProvider>
        <AppSidebar />
        <main>
          <SidebarTrigger />
        </main>
        <div className="p-10">{children}</div>
      </SidebarProvider>
    </>
  );
}
