// app/admin/layout.js
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import TeacherHeader from "./TeacherHeader";
import { TeacherSidebar } from "./TeacherSidebar";

export const metadata = {
  title: "Teacher - Dashboard",
};

export default function AdminLayout({ children }) {
  return (
    <>
      <SidebarProvider>
        <TeacherSidebar />
        <main className="w-full">
          <TeacherHeader />
          {children}
        </main>
      </SidebarProvider>
    </>
  );
}
