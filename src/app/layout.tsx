import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { ToastProvider } from "@/components/contexts/toast-context";
import GoogleAnalytics from "@/components/GoogleAnalytics";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Katrine Rosa Beck | Frontend developer and illustrator",
  description:
    "Digital worlds where frontend development, illustration, and storytelling meet.",
  icons: {
    icon: "/Wulfrivfav.png",
    apple: "/Wulfrivfav.png",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      data-scroll-behavior="smooth"
    >
      <body className="min-h-full flex flex-col">
        <ToastProvider>
          <Header />
          {children}
          <Footer />
          <GoogleAnalytics />
        </ToastProvider>
      </body>
    </html>
  );
}
