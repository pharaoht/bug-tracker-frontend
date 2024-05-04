import type { Metadata } from "next";
import "./globals.css";
import styles from './page.module.css'
import Navbar from "@/components/Navbar/Navbar";
import Sidebar from "@/components/Sidebar/Sidebar";

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
        <Navbar/>
        <div className={styles.divider}>
          <Sidebar/>
          {children}
        </div>
      </body>
    </html>
  );
}
