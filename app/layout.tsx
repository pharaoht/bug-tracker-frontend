import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar/Navbar";
import { UserContextProvider } from "@/context/UserContext";

export const metadata: Metadata = {
  title: "Bug Tracker",
  description: "Created by Pharaoh Manson",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <UserContextProvider>
          <Navbar/>
          {children}
        </UserContextProvider>
      </body>
    </html>
  );
}
