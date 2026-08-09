import { useState, useEffect, useLayoutEffect } from "react";
import {
  isRouteErrorResponse,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useNavigation,
} from "react-router";
import type { Route } from "./+types/root";
import Header from "../components/Header";
import Footer from "../components/Footer";
import "./app.css";

const SITE_NAME = "Block Sherpa";
const SITE_DESCRIPTION = "Web3-native consulting and development firm.";
const THEME_COLOR = "#ffffff";

export const meta: Route.MetaFunction = () => {
  const title = SITE_NAME;
  const description = SITE_DESCRIPTION;
  const ogImage = "/og-image.svg";

  return [
    { title },
    { name: "description", content: description },
    { name: "theme-color", content: THEME_COLOR },
    { property: "og:type", content: "website" },
    { property: "og:site_name", content: SITE_NAME },
    { property: "og:title", content: title },
    { property: "og:description", content: description },
    { property: "og:image", content: ogImage },
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:title", content: title },
    { name: "twitter:description", content: description },
    { name: "twitter:image", content: ogImage },
    { name: "apple-mobile-web-app-title", content: SITE_NAME },
    { name: "apple-mobile-web-app-capable", content: "yes" },
    {
      name: "apple-mobile-web-app-status-bar-style",
      content: "black-translucent",
    },
    { name: "mobile-web-app-capable", content: "yes" },
  ];
};

export const links: Route.LinksFunction = () => [
  {
    rel: "stylesheet",
    href: "https://api.fontshare.com/v2/css?f[]=general-sans@700,600,500,400&f[]=satoshi@700,500,400&display=swap",
  },
  { rel: "icon", href: "/favicon.ico" },
  { rel: "manifest", href: "/manifest.webmanifest" },
  { rel: "apple-touch-icon", href: "/favicon.ico" },
  { rel: "mask-icon", href: "/maskable-icon.svg", color: THEME_COLOR },
];

export function Layout({ children }: { children: React.ReactNode }) {
  const navigation = useNavigation();
  const [isHydrated, setIsHydrated] = useState(false);
  const [showContent, setShowContent] = useState(false);

  // Force a delay so you can SEE the loading state
  useLayoutEffect(() => {
    setIsHydrated(true);
    
    // Add a 2-second delay so you can clearly see the loading state
    // Remove this in production!
    const timer = setTimeout(() => {
      setShowContent(true);
    }, 300);
    
    return () => clearTimeout(timer);
  }, []);

  const isLoading = navigation.state === "loading";

  // Show loading screen during hydration or before content is ready
  if (!isHydrated || !showContent) {
    return (
      <html lang="en">
        <head>
          <meta charSet="utf-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <meta name="view-transition" content="same-origin" />
          <Meta />
          <Links />
        </head>
        <body>
          <div className="fixed inset-0 bg-white z-50 flex items-center justify-center">
            <div className="text-center space-y-4">
              <div className="relative w-16 h-16 mx-auto">
                <div className="absolute inset-0 border-4 border-slate-200 rounded-full"></div>
                <div className="absolute inset-0 border-4 border-t-blue-600 rounded-full animate-spin"></div>
              </div>
              <div className="w-12 h-12 bg-slate-900 rounded-lg flex items-center justify-center mx-auto">
                <span className="text-white font-bold text-sm">BS</span>
              </div>
              <p className="text-slate-500 text-sm font-medium animate-pulse">
                Loading BlockSherpa...
              </p>
            </div>
          </div>
          <ScrollRestoration />
          <Scripts />
        </body>
      </html>
    );
  }

  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="view-transition" content="same-origin" />
        <Meta />
        <Links />
      </head>
      <body>
        <div className="min-h-screen flex flex-col">
          {isLoading ? (
            <div className="fixed inset-0 bg-white z-50 flex items-center justify-center">
              <div className="text-center space-y-4">
                <div className="relative w-16 h-16 mx-auto">
                  <div className="absolute inset-0 border-4 border-slate-200 rounded-full"></div>
                  <div className="absolute inset-0 border-4 border-t-blue-600 rounded-full animate-spin"></div>
                </div>
                <div className="w-12 h-12 bg-slate-900 rounded-lg flex items-center justify-center mx-auto">
                  <span className="text-white font-bold text-sm">BS</span>
                </div>
                <p className="text-slate-500 text-sm font-medium animate-pulse">
                  Loading BlockSherpa...
                </p>
              </div>
            </div>
          ) : (
            <>
              <Header />
              <main className="flex-1">
                {children}
              </main>
              <Footer />
            </>
          )}
        </div>
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  return <Outlet />;
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  let message = "Oops!";
  let details = "An unexpected error occurred.";
  let stack: string | undefined;

  if (isRouteErrorResponse(error)) {
    message = error.status === 404 ? "404" : "Error";
    details =
      error.status === 404
        ? "The requested page could not be found."
        : error.statusText || details;
  } else if (import.meta.env.DEV && error && error instanceof Error) {
    details = error.message;
    stack = error.stack;
  }

  return (
    <main className="pt-32 pb-24 container mx-auto px-6 text-center">
      <h1 className="text-4xl font-bold text-slate-900 mb-4">{message}</h1>
      <p className="text-slate-600 mb-8">{details}</p>
      <a
        href="/"
        className="px-6 py-3 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transition-all"
      >
        Return to Home
      </a>
      {stack && import.meta.env.DEV && (
        <pre className="mt-8 w-full p-4 overflow-x-auto bg-slate-100 rounded-lg text-left">
          <code className="text-sm">{stack}</code>
        </pre>
      )}
    </main>
  );
}