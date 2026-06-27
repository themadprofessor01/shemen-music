import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact — ShemenMusic",
  description: "Get in touch with ShemenMusic for questions, feedback, or licensing inquiries.",
  openGraph: {
    title: "Contact — ShemenMusic",
    description: "Get in touch with ShemenMusic for questions, feedback, or licensing inquiries.",
    url: "https://shemenmusic.com/contact",
    siteName: "ShemenMusic",
    type: "website",
  },
  alternates: { canonical: "https://shemenmusic.com/contact" },
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
