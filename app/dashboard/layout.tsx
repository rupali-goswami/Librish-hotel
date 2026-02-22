import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = await cookies(); // ✅ await
  const token = cookieStore.get("adminToken");

  if (!token) {
    redirect("/admin/login");
  }

  return <>{children}</>;
}
