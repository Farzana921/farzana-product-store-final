import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { type ReactNode } from "react";
import { Provider as ReduxProvider } from "react-redux";
import { Toaster } from "react-hot-toast";

import appCss from "../styles.css?url";
import { store } from "@/redux/store";
import { SettingsProvider } from "@/context/SettingsContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="font-display text-8xl">404</h1>

        <h2 className="mt-4 font-display text-2xl text-foreground">
          Page not found
        </h2>

        <p className="mt-2 text-sm text-muted-foreground">
          The page you are looking for does not exist.
        </p>

        <div className="mt-8">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-full bg-foreground px-6 py-3 text-sm text-background hover:bg-foreground/85"
          >
            Go Home
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  const router = useRouter();

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="font-display text-2xl">
          Something went wrong
        </h1>

        <p className="mt-2 text-sm text-muted-foreground">
          An unexpected error occurred. Please try again.
        </p>

        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="rounded-full bg-foreground px-6 py-3 text-sm text-background hover:bg-foreground/85"
          >
            Try Again
          </button>

          <a
            href="/"
            className="rounded-full border border-border bg-background px-6 py-3 text-sm hover:bg-secondary"
          >
            Go Home
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route =
  createRootRouteWithContext<{ queryClient: QueryClient }>()({
    head: () => ({
      meta: [
        { charSet: "utf-8" },

        {
          name: "viewport",
          content: "width=device-width, initial-scale=1",
        },

        {
          title: "Farzana Product Store",
        },

        {
          name: "description",
          content:
            "A React-based e-commerce application where users can browse products, search items, view product details, and manage a shopping cart.",
        },

        {
          name: "author",
          content: "Farzana Akbari",
        },

        {
          property: "og:title",
          content: "Farzana Product Store",
        },

        {
          property: "og:description",
          content:
            "Product Store App built using React, Redux Toolkit, Context API, and React Query.",
        },

        {
          property: "og:type",
          content: "website",
        },

        {
          name: "twitter:card",
          content: "summary_large_image",
        },
      ],

      links: [
        {
          rel: "stylesheet",
          href: appCss,
        },

        {
          rel: "preconnect",
          href: "https://fonts.googleapis.com",
        },

        {
          rel: "preconnect",
          href: "https://fonts.gstatic.com",
          crossOrigin: "anonymous",
        },

        {
          rel: "stylesheet",
          href:
            "https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;1,400&family=Inter:wght@300;400;500;600;700&display=swap",
        },
      ],
    }),

    shellComponent: RootShell,
    component: RootComponent,
    notFoundComponent: NotFoundComponent,
    errorComponent: ErrorComponent,
  });

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>

      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  return (
    <QueryClientProvider client={queryClient}>
      <ReduxProvider store={store}>
        <SettingsProvider>
          <div className="flex min-h-screen flex-col">
            <Navbar />

            <main className="flex-1">
              <Outlet />
            </main>

            <Footer />
          </div>

          <Toaster
            position="top-center"
            toastOptions={{
              style: {
                background: "var(--color-foreground)",
                color: "var(--color-background)",
                borderRadius: "999px",
                padding: "10px 18px",
                fontSize: "13px",
              },
            }}
          />
        </SettingsProvider>
      </ReduxProvider>
    </QueryClientProvider>
  );
}