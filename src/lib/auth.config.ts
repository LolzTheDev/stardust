import { DiscordIcon, GitHubIcon, GitLabIcon, GoogleIcon } from "@/components/icons";
import { LogIn } from "lucide-react";
import type { NextAuthConfig } from "next-auth";
import type { OAuthUserConfig, OIDCUserConfig, Provider } from "next-auth/providers";
import Auth0 from "next-auth/providers/auth0";
import Discord from "next-auth/providers/discord";
import GitHub from "next-auth/providers/github";
import GitLab from "next-auth/providers/gitlab";
import Google from "next-auth/providers/google";
import Okta from "next-auth/providers/okta";
import { getConfig } from "./config";
const { auth: authConfig } = getConfig();
const providerArgs = <T>(provider: string): OIDCUserConfig<T> | OAuthUserConfig<T> => ({
	clientId: authConfig.oauth?.providers[provider].clientId,
	clientSecret: authConfig.oauth?.providers[provider].clientSecret,
	issuer: authConfig.oauth?.providers[provider].issuer,
});
const providersList = {
	auth0: {
		provider: Auth0,
		Icon: LogIn,
	},
	discord: {
		provider: Discord,
		Icon: DiscordIcon,
	},
	github: {
		provider: GitHub,
		Icon: GitHubIcon,
	},
	google: {
		provider: Google,
		Icon: GoogleIcon,
	},
	gitlab: {
		provider: GitLab,
		Icon: GitLabIcon,
	},
	okta: {
		provider: Okta,
		Icon: LogIn,
	},
} as const;

const providers: Provider[] = [];
for (const [name, { provider }] of Object.entries(providersList)) {
	// @ts-expect-error all functions are callable lol
	if (authConfig.oauth && name in authConfig.oauth.providers) providers.push(provider(providerArgs(name)));
}

const config: NextAuthConfig = {
	secret: authConfig.secret,
	trustHost: true,
	pages: {
		signIn: "/auth/login",
		signOut: "/auth/logout",
		error: "/auth/error",
	},
	providers,
};

export { providersList as providers, config };
