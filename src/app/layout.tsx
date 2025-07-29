import Head from "next/head";
import "./globals.css";
import { Inter, Open_Sans } from "next/font/google";

// Učitaj oba fonta preko Next.js optimiziranog loadera
const inter = Inter({ subsets: ["latin"] });
const openSans = Open_Sans({ subsets: ["latin"] });

export const metadata = {
  title: "Pozivnica za naše vjenčanje | Ana Marija & Domagoj",
  description: "Vjenčanje se održava 20. rujna 2025. godine.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <Head>
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />
        <meta property="og:title" content={metadata.title} />
        <meta property="og:description" content={metadata.description} />
        {/* Dodajte ostale metatagove po potrebi */}
      </Head>

      {/* Dodajemo oba fonta – ako želiš koristiti samo jedan, možeš maknuti drugi */}
      <body className={`${inter.className} ${openSans.className}`}>
        {children}
      </body>
    </html>
  );
}
