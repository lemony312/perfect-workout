import type { Metadata, Viewport } from "next";
import Link from "next/link";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { WorkoutProvider } from "@/context/WorkoutContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  viewportFit: "cover",
};

export const metadata: Metadata = {
  title: "Perfect Workout Calendar",
  description: "AthleanX Perfect Workout Series Calendar",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <WorkoutProvider>
          <nav className="bg-[#1a1a1a] border-b border-white/5 sticky top-0 z-50" style={{ paddingTop: 'env(safe-area-inset-top)' }}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex items-center justify-center h-12 sm:h-14 gap-2 sm:gap-6">
                <Link
                  href="/"
                  className="text-sm font-medium text-[#a0a0a0] hover:text-[#f5f5f5] transition-colors px-4 py-3 rounded-md hover:bg-[#252525] active:bg-[#303030]"
                >
                  Original Series
                </Link>
                <div className="h-4 w-px bg-white/10" />
                <Link
                  href="/2025"
                  className="text-sm font-medium text-[#a0a0a0] hover:text-[#f5f5f5] transition-colors px-4 py-3 rounded-md hover:bg-[#252525] active:bg-[#303030]"
                >
                  2025 Series
                </Link>
                <div className="h-4 w-px bg-white/10" />
                <Link
                  href="/bodyweight"
                  className="text-sm font-medium text-[#a0a0a0] hover:text-[#f5f5f5] transition-colors px-4 py-3 rounded-md hover:bg-[#252525] active:bg-[#303030]"
                >
                  Bodyweight
                </Link>
                <div className="h-4 w-px bg-white/10" />
                <Link
                  href="/stretching"
                  className="text-sm font-medium text-[#a0a0a0] hover:text-[#f5f5f5] transition-colors px-4 py-3 rounded-md hover:bg-[#252525] active:bg-[#303030]"
                >
                  Stretching
                </Link>
                <div className="h-4 w-px bg-white/10" />
                <Link
                  href="/posture"
                  className="text-sm font-medium text-[#a0a0a0] hover:text-[#f5f5f5] transition-colors px-4 py-3 rounded-md hover:bg-[#252525] active:bg-[#303030]"
                >
                  Posture
                </Link>
                <div className="h-4 w-px bg-white/10" />
                <Link
                  href="/voice-training"
                  className="text-sm font-medium text-[#a0a0a0] hover:text-[#f5f5f5] transition-colors px-4 py-3 rounded-md hover:bg-[#252525] active:bg-[#303030]"
                >
                  Voice Training
                </Link>
              </div>
            </div>
          </nav>
          {children}
        </WorkoutProvider>
      </body>
    </html>
  );
}
