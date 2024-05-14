import type { Metadata } from "next";
import { Inter as FontSans,IBM_Plex_Serif} from "next/font/google";
import "./globals.css";

import { cn } from "@/lib/utils"
import { ThemeProvider } from "@/components/theme-provider";
import { ModeToggle } from "@/components/Toogle-theme";
 
const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
})

const ibmPLexSerif=IBM_Plex_Serif({
  subsets:['latin'],
  weight:['400','700'],
  variable:'--font-ibm-plex-serif' 
})

export const metadata: Metadata = {
  title: "Horizon",
  description: "Horizon is a modern Baning  platform for everyone",
  icons:{
    icon:'/icons/logo.svg'
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
     <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          fontSans.variable,
          ibmPLexSerif.variable
        )}
      >
        <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            {children}

            <ModeToggle />
          </ThemeProvider>

      </body>
    </html>
  );
}