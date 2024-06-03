import { Inter } from "next/font/google";
import "./globals.css";
import { prefix } from './prefix.js';
import Script from 'next/script'

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "旋轉星圖 Planisphere",
  description: "可觀天文館的網上互動旋轉星圖 An Online Interactive Planisphere from HKNEAC",
  manifest: `${prefix}/pwa/manifest.json`,
  appleWebApp: {
    title: "可觀天文助理",
    statusBarStyle: "black-translucent",
  },
  viewport: {
    width: "device-width",
    initalScale: 1,
    maximumScale: 1,
    userScalable: "no",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <div className="container">
          <Script async src="https://www.googletagmanager.com/gtag/js?id=G-VP2D6ZZ6BT" />
          <Script id="google-analytics">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
    
              gtag('config', 'G-VP2D6ZZ6BT');
            `}
          </Script>
        </div>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
        <link href="https://fonts.googleapis.com/css2?family=Noto+Sans+TC:wght@100..900&display=swap" rel="stylesheet" />
        <meta property="og:image" content={`${prefix}/planisphere-thumbnail_800x600.png`} />
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  );
}
