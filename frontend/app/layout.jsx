import { Inter } from "next/font/google";
import "./globals.css";
import Web3Modal from "@/context/Web3Modal";

const inter = Inter({ subsets: ["latin"] });
export const metadata = {
  title: "CharitableX",
  description: "Make Direct Donations to Charities with Crypto",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Web3Modal>{children}</Web3Modal>
      </body>
    </html>
  );
}
