import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar/Navbar";
import Sidebar from "@/components/Sidebar/Sidebar";
import Main from "@/components/Main/Main";

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
      <body className={''}>
        <Navbar/>
        <div style={{display:'flex'}}>
          <Sidebar/>
          {children}
        </div>
      </body>
    </html>
  );
}
