import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Jira Clone",
  description: "A Kanban task management app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-white overflow-hidden text-gray-900">
        <Header />
        <div className="flex flex-1 h-[calc(100vh-3.5rem)] overflow-hidden">
          <Sidebar />
          <main className="flex-1 overflow-auto bg-white flex flex-col">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}