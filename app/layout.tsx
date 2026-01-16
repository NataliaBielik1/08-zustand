import type { Metadata } from "next";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";


import "modern-normalize";
import "./globals.css";
import TanstackProvider from "@/components/TanstackProvider/TanstackProvider";

export const metadata: Metadata = {
  title: "NoteHub",
  description:
    "A simple and efficient app for creating and organizing your notes.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <TanstackProvider>
          <Header />
          {children}
          <Footer />
        </TanstackProvider>
      </body>
    </html>
  );
}










