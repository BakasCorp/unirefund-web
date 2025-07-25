"use server";
import "../globals.css";
import {GeistSans} from "geist/font/sans";
import {Suspense} from "react";
import {Toaster} from "@/components/ui/sonner";
import type {Metadata} from "next";
import {LocaleProvider} from "src/providers/locale";
import Tooltip from "src/providers/tooltip";
import {getLocalizationResources} from "src/utils";

interface RootLayoutProps {
  params: {lang: string};
  children: JSX.Element;
}
const appName = process.env.APPLICATION_NAME || "UNIREFUND";

const title =
  process.env.STAGE !== "PROD"
    ? `[${process.env.STAGE?.substring(0, 3).toUpperCase()}] ${appName.charAt(0).toUpperCase() + appName.slice(1).toLowerCase()}`
    : appName.charAt(0).toUpperCase() + appName.slice(1).toLowerCase();
export async function generateViewport() {
  await Promise.resolve();
  return {
    width: "device-width",
    initialScale: 1,
    maximumScale: 1,
    userScalable: false,
    viewportFit: "cover",
  };
}

export async function generateMetadata(): Promise<Metadata> {
  await Promise.resolve();
  return {
    title,
    description: "Core project is a core web app for managing multi-tenant apps.",
  };
}
export default async function RootLayout({children, params}: RootLayoutProps) {
  const {lang} = params;
  const resources = await getLocalizationResources(lang);
  return (
    <html className="h-full" lang={lang}>
      <body className={`overflow-hidden ${GeistSans.className}`} data-app-name={appName}>
        <Suspense fallback={<div>Loading...</div>}>
          <Toaster richColors />
          <Tooltip>
            <LocaleProvider lang={lang} resources={resources}>
              {children}
            </LocaleProvider>
          </Tooltip>
        </Suspense>
      </body>
    </html>
  );
}
