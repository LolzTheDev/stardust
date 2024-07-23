"use client";
import { Loader2 } from "lucide-react";
import { useEffect } from "react";
import { useFormStatus } from "react-dom";
import { Button, type ButtonProps } from "./ui/button";
export function StyledSubmit({
	pendingText = "Loading...",
	pendingSpinner = false,
	children,
	...props
}: ButtonProps & { pendingText?: string; pendingSpinner?: boolean }) {
	const { pending } = useFormStatus();
	return (
		<Button type="submit" disabled={pending} {...props}>
			{pending ? pendingSpinner ? <Loader2 className="animate-spin" /> : pendingText : children}
		</Button>
	);
}
