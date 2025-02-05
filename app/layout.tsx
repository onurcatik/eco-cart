import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../assets/styles/globals.css";
import "../lib/constants/index";
import { APP_DESCRIPTION, SERVER_URL } from "../lib/constants/index";
import { ThemeProvider } from "next-themes";
import { Toaster } from "@/components/ui/toaster";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    template: "%s | Eco-Cart",
    default: "Eco-Cart",
  },
  description: APP_DESCRIPTION,
  icons: {
    icon: "/favicon.ico", // Favicon ekleme
  },
  metadataBase: new URL(SERVER_URL),
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
        <Toaster />
      </body>
    </html>
  );
}