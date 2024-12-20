import { AdminSidebar } from "@/components/sidebar";
import { auth } from "@/lib/auth";
import { db, user } from "@/lib/drizzle/db";
import { eq } from "drizzle-orm";
import type { Metadata } from "next";
import { redirect } from "next/navigation";
export const metadata: Metadata = {
	title: {
		absolute: "Admin | Stardust",
		template: " %s | Stardust",
	},
};
export default async function AdminLayout({ children }: { children: React.ReactNode }) {
	const userSession = await auth();
	const [{ isAdmin }] = await db
		.select({ isAdmin: user.isAdmin })
		.from(user)
		.where(eq(user.email, userSession?.user?.email as string));
	if (!isAdmin) {
		return redirect("/");
	}
	return (
		<div className="flex flex-row gap-4">
			<AdminSidebar />
			<div className="h-full min-h-[calc(100vh_-_theme(spacing.16))] w-full px-4 mb-2">{children}</div>
		</div>
	);
}
export const dynamic = "force-dynamic";
