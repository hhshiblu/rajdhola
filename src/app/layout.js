import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";
import { Providers } from "@/redux/provider";
import { AuthProvider } from "@/sessionProvider";
import Head from "next/head";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "rajdhola.com",
  description: "rajdhola is a big company as a e-commerce",
  // openGraph: {
  //   images: [
  //     {
  //       url: "/images/your-image.jpg", // Replace with the relative path to your image
  //       width: 800, // Optional: specify the width of the image
  //       height: 600, // Optional: specify the height of the image
  //       alt: "Description of the image", // Optional: specify an alt text for the image
  //     },
  //   ],
  // },
  icons: {
    icon: ["/favicon_crome.png"],
    apple: ["/apple_favicon.png"],
    shortcut: ["/apple_favicon.png"],
  },
};
export const dynamic = "force-dynamic";
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          <AuthProvider>
            {children}
            <Toaster richColors position="top-right" />
          </AuthProvider>
        </Providers>
      </body>
    </html>
  );
}
