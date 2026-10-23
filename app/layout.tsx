import type { Metadata } from "next";
import { Inter, EB_Garamond } from "next/font/google";
import "./globals.css";
import { ToasterProvider } from "@/providers/toaster.provider";
import { ModalProvider } from "@/components/modals/modal-provider";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import { ConfigProvider } from "antd";
import ScrollToTop from "@/components/ui/scroll-to-top";
import QueryProvider from "@/providers/query-provider";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const ebGaramond = EB_Garamond({
  variable: "--font-eb-garamond",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_APP_URL || "https://ai-recruite.com"
  ),
  title: {
    default: "AI-Recruite | Next-Gen AI Recruitment & Interview Platform",
    template: "%s | AI-Recruite",
  },
  description:
    "Automated AI interview practice, smart candidate ranking, and seamless hiring platform for tech talent and recruiters.",
  keywords: [
    "AI recruitment",
    "AI mock interview",
    "smart candidate ranking",
    "tech hiring",
    "automated recruitment",
    "resume analyzer",
  ],
  authors: [{ name: "AI-Recruite Team" }],
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "AI-Recruite",
    title: "AI-Recruite | Next-Gen AI Recruitment & Interview Platform",
    description:
      "Automated AI interview practice, smart candidate ranking, and seamless hiring platform for tech talent and recruiters.",
  },
  twitter: {
    card: "summary_large_image",
    title: "AI-Recruite | Next-Gen AI Recruitment & Interview Platform",
    description:
      "Automated AI interview practice, smart candidate ranking, and seamless hiring platform for tech talent and recruiters.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={`${inter.variable} ${ebGaramond.variable} antialiased`}
    >
      <body>
        <QueryProvider>
          <AntdRegistry>
            <ConfigProvider
              theme={{
                token: {
                  colorPrimary: "#244034",
                  colorPrimaryHover: "#1b3329",
                  colorPrimaryActive: "#14251e",
                  colorLink: "#244034",
                  borderRadius: 4,
                  borderRadiusLG: 4,
                  borderRadiusSM: 4,
                  borderRadiusXS: 2,
                  fontFamily: "var(--font-inter), ui-sans-serif, system-ui, sans-serif",
                },
                components: {
                  DatePicker: {
                    colorPrimary: "#244034",
                    activeBorderColor: "transparent",
                    hoverBorderColor: "transparent",
                    borderRadius: 4,
                  },
                  Select: {
                    colorPrimary: "#244034",
                    colorPrimaryHover: "#1b3329",
                    controlItemBgActive: "#EDF6F1",
                    controlItemBgHover: "#F4F9F6",
                    optionSelectedBg: "#EDF6F1",
                    optionSelectedColor: "#244034",
                    multipleItemBg: "#EDF6F1",
                    multipleItemBorderColor: "#D5E6DC",
                    colorTextPlaceholder: "#9CA3AF",
                    borderRadius: 4,
                  },
                  Modal: {
                    borderRadiusLG: 4,
                    borderRadiusSM: 4,
                  },
                },
              }}
            >
              {children}
            </ConfigProvider>
          </AntdRegistry>
        </QueryProvider>
        <ToasterProvider />
        <ModalProvider />
        <ScrollToTop />
      </body>
    </html>
  );
}
