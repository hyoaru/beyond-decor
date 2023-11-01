// export const revalidate = 0
// export const dynamic = 'force-dynamic'
// export const fetchCache = 'force-no-store'

import "@fortawesome/fontawesome-svg-core/styles.css";
import { config } from "@fortawesome/fontawesome-svg-core";
import { Lora } from 'next/font/google'

// App imports
import { PocketbaseContextProvider, AuthStateContextProvider } from "./_context";
import Footer from './_components/Footer'
import Header from './_components/Header'
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
        <PocketbaseContextProvider>
          <AuthStateContextProvider>
            <Header />
            <main className="my-3">
              {children}
            </main>
            <Footer />
          </AuthStateContextProvider>
        </PocketbaseContextProvider>
      </body>
    </html>
  )
}
