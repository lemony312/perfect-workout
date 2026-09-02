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
            {/* The links no longer fit a phone. Scroll them sideways instead of
                letting them force the document wider than the screen — an
                overflowing nav makes mobile browsers widen the layout viewport
                and scale down EVERY page (see scripts/test_mobile_layout.py). */}
            <div className="max-w-7xl mx-auto overflow-x-auto overscroll-x-contain [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
              {/* w-max + min-w-full: sized to its content when the links overflow
                  (so justify-center has no slack to clip the first link), but
                  full width when they fit, so they stay centred on desktop. */}
              <div className="flex items-center justify-center w-max min-w-full h-12 sm:h-14 gap-2 sm:gap-6 px-4 sm:px-6 lg:px-8">
                <Link
                  href="/"
                  className="shrink-0 whitespace-nowrap text-sm font-medium text-[#a0a0a0] hover:text-[#f5f5f5] transition-colors px-4 py-3 rounded-md hover:bg-[#252525] active:bg-[#303030]"
                >
                  Original Series
                </Link>
                <div className="h-4 w-px shrink-0 bg-white/10" />
                <Link
                  href="/2025"
                  className="shrink-0 whitespace-nowrap text-sm font-medium text-[#a0a0a0] hover:text-[#f5f5f5] transition-colors px-4 py-3 rounded-md hover:bg-[#252525] active:bg-[#303030]"
                >
                  2025 Series
                </Link>
                <div className="h-4 w-px shrink-0 bg-white/10" />
                <Link
                  href="/bodyweight"
                  className="shrink-0 whitespace-nowrap text-sm font-medium text-[#a0a0a0] hover:text-[#f5f5f5] transition-colors px-4 py-3 rounded-md hover:bg-[#252525] active:bg-[#303030]"
                >
                  Bodyweight
                </Link>
                <div className="h-4 w-px shrink-0 bg-white/10" />
                <Link
                  href="/stretching"
                  className="shrink-0 whitespace-nowrap text-sm font-medium text-[#a0a0a0] hover:text-[#f5f5f5] transition-colors px-4 py-3 rounded-md hover:bg-[#252525] active:bg-[#303030]"
                >
                  Stretching
                </Link>
                <div className="h-4 w-px shrink-0 bg-white/10" />
                <Link
                  href="/posture"
                  className="shrink-0 whitespace-nowrap text-sm font-medium text-[#a0a0a0] hover:text-[#f5f5f5] transition-colors px-4 py-3 rounded-md hover:bg-[#252525] active:bg-[#303030]"
                >
                  Posture
                </Link>
                <div className="h-4 w-px shrink-0 bg-white/10" />
                <Link
                  href="/voice-training"
                  className="shrink-0 whitespace-nowrap text-sm font-medium text-[#a0a0a0] hover:text-[#f5f5f5] transition-colors px-4 py-3 rounded-md hover:bg-[#252525] active:bg-[#303030]"
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
