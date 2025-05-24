import type { Metadata } from "next";
import { Manrope, Inconsolata } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/Providers/theme-provider";
import Navbar from "@/components/Navbar/Navbar";
import { usePathname } from "next/navigation";
import ClientLayout from "./ClientLayout";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
});

const inconsolata = Inconsolata({
  variable: "--font-inconsolata",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "GnosisUp",
  description: "Ascend Your Understanding",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${manrope.variable} ${inconsolata.variable}`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <ClientLayout>{children}</ClientLayout>
        </ThemeProvider>
      </body>
    </html>
  );
}
