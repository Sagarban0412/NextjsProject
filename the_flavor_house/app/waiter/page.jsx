import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { jwtDecode } from "jwt-decode";
import WaiterFilterBar from "@/components/WaiterFilterBar";
import AllTables from "@/components/AllTables";

export default async function Page() {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;
  const user = token ? jwtDecode(token) : null;

  // If no token, redirect to login
  if (!token) {
    redirect("/");
  }

  return (
    <>
      <WaiterFilterBar />
    </>
  );
}
