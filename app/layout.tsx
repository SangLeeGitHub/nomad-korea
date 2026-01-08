import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ThemeProvider } from "@/components/theme/ThemeProvider";
import { createClient } from "@/utils/supabase/server";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "노마드코리아 - 한국 디지털 노마드를 위한 도시 정보",
  description:
    "전국 50개 도시의 생활비, 카페, 인터넷 속도를 한눈에 비교하세요. 2,500개 이상의 리얼 리뷰와 실시간 커뮤니티.",
  keywords: "디지털노마드, 한국, 제주, 서울, 부산, 생활비, 카페, 코워킹",
  openGraph: {
    title: "노마드코리아 - 한국 디지털 노마드를 위한 도시 정보",
    description: "전국 50개 도시를 한눈에 비교하세요",
    type: "website",
    locale: "ko_KR",
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  return (
    <html lang="ko" className={inter.variable} suppressHydrationWarning>
      <body className="antialiased">
        <ThemeProvider>
          <Header user={user} />
          <main className="min-h-screen">{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
