import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono, Noto_Sans_SC } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  display: "swap",
});

const notoSansSC = Noto_Sans_SC({
  variable: "--font-noto-sans-sc",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Moxt — AI 原生工作空间",
  description: "人与 AI 同事，在同一个工作空间里协作。",
  icons: { icon: "/logo.svg" },
  metadataBase: new URL("https://moxt.ai"),
  openGraph: {
    title: "Moxt — AI 原生工作空间",
    description: "人与 AI 同事，在同一个工作空间里协作。",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#29C16A",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="zh-CN"
      className={`${inter.variable} ${jetbrainsMono.variable} ${notoSansSC.variable}`}
    >
      <body>{children}</body>
    </html>
  );
}
