import "./globals.css";

import Header from "@/components/Common/Header/Header.jsx";

import { Inter } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import CreateNewEvent from "@/components/Event/CreateNewEvent";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Schedulla",
  description: "Organize Your Meetings",
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={inter.className}>
          {/* Header */}
          <Header />

          {/* Main */}
          <main className="min-h-screen bg-gradient-to-b from-teal-50 to white">
            {children}
          </main>

          {/* Footer */}
          <footer className="bg-teal-50 py-8">
            <div className="container text-center px-4 mx-auto text-gray-600 ">
              <p>Easily schedule your meetings with Schedulla.</p>
            </div>
          </footer>

          {/* button action -> event/create?true */}
          <CreateNewEvent />
        </body>
      </html>
    </ClerkProvider>
  );
}
