// app/admin/layout.js
import AdminHeader from "./AdminHeader"; // or "@/components/AdminHeader"
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AdminSidebar, AppSidebar } from "@/app/admin/AdminSidebar";

export const metadata = {
  title: "Admin - Dashboard",
};

export default function AdminLayout({ children }) {
  return (
    <>
      <SidebarProvider>
        <AdminSidebar/>
        <main className="w-full">
          <AdminHeader />
          {children}
        </main>
      </SidebarProvider>
    </>
  );
}
