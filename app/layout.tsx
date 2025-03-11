import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Open Graph Image Generator",
  description: "Generate Open Graph images for your web pages.",
  openGraph: {
    title: "Open Graph Image Generator",
    description: "Generate Open Graph images for your web pages.",
    images: "https://og-image-generate.netlify.app/og-open-graph-image-generator.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`antialiased`}>
        {children}
      </body>
    </html>
  );
}
