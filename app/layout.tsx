import Header from "./component/Header";
import Footer from "./component/Footer";
import type { Metadata } from "next";
import { Geist, Geist_Mono, Pacifico } from "next/font/google";
import "./globals.css";

const pacifico = Pacifico({
  weight: '400',
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-pacifico',
})

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "금화레이저",
  description: "정밀 레이저 가공 전문 기업, 금화레이저입니다.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" suppressHydrationWarning={true}>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${pacifico.variable} antialiased flex flex-col min-h-screen`}
      >
        {/* ✅ 공통 Header 추가 */}
        <Header />
        {/* ✅ 각 페이지 본문 */}
        <main className="flex-grow">{children}</main>
        <Footer />
      </body>
    </html>
  );
}