"use client";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { Container, Layers, LayoutDashboard, Users } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import type { Route } from "next";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function AdminSidebar() {
	const pathname = usePathname();
	const links: {
		href: Route;
		label: string;
		Icon: LucideIcon;
	}[] = [
		{ href: "/admin", label: "Dashboard", Icon: LayoutDashboard },
		{ href: "/admin/users", label: "Users", Icon: Users },
		{ href: "/admin/images", label: "Images", Icon: Layers },
		{ href: "/admin/sessions", label: "Sessions", Icon: Container },
	];
	return (
		<nav className="grid gap-x-4 text-sm text-muted-foreground">
			<section className="h-full p-4 items-start flex flex-col gap-2">
				{links.map(({ href, label, Icon }) => (
					<Button
						asChild
						key={href}
						variant="ghost"
						className={cn(
							pathname === href ? "text-primary bg-secondary" : "text-muted-foreground",
							"hover:text-primary flex gap-2 w-full justify-start",
						)}
					>
						<Link href={href}>
							<Icon className="size-5" />
							{label}
						</Link>
					</Button>
				))}
			</section>
		</nav>
	);
}
