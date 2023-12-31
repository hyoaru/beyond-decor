import "@fortawesome/fontawesome-svg-core/styles.css";
import { config } from "@fortawesome/fontawesome-svg-core";
import { Lora } from 'next/font/google'
import { Toaster } from "sonner";

// App imports
import Footer from '@components/base/Footer'
import Header from '@components/base/Header'
import './globals.css'

config.autoAddCss = false;
const typeface = Lora({ subsets: ['latin'] })

export const metadata = {
  title: 'Beyond Decor',
  description: ' ',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={typeface.className} suppressHydrationWarning>
        <Header />
        <main className="my-3">
          {children}
        </main>
        <Footer />
        <Toaster richColors />
      </body>
    </html>
  )
}
