import { redirect } from "next/navigation";
import { CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { getServerSession } from "next-auth";
import config from "@/lib/auth.config";
import { Mail } from "lucide-react";
export default async function EmailVerify() {
	const session = await getServerSession(config);
	if (session) {
		redirect("/");
	}
	return (
		<>
			<CardTitle className="mx-auto mb-2 flex flex-col items-center justify-center">
				<Mail className="mb-10 h-12 w-12" />
				Verify your email
			</CardTitle>
			<CardContent>
				<p className="text-center">
					We have sent a verification email to your email address. Please check
					your inbox and click on the link to verify your email.
				</p>
			</CardContent>
			<CardFooter>
				<p className="text-muted-foreground text-center text-sm">
					If you haven&apos;t received the email, please check your spam folder.
				</p>
			</CardFooter>
		</>
	);
}