import "./globals.css";

import Header from "@/components/Common/Header/Header.jsx";

import { Inter } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import CreateNewEvent from "@/components/Event/CreateNewEvent";
import { Suspense } from "react";
import PageNotFound from "./not-found";
import Footer from "@/components/Common/Footer/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Schedulla",
  description: "Organize Your Meetings",
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html lang="en">
        <head>
          {/* Force correct favicon path */}
          <link rel="icon" href="/favicon.ico" />
        </head>
        <body className={inter.className}>
          {/* Header */}
          <Header />

          {/* Main */}
          <main className="min-h-screen bg-gradient-to-b from-teal-50 to white">
            {children}
          </main>

          {/* Footer */}
          <Footer />

          {/* button action -> event/create?true */}
          <Suspense fallback={<PageNotFound />}>
            <CreateNewEvent />
          </Suspense>
        </body>
      </html>
    </ClerkProvider>
  );
}
