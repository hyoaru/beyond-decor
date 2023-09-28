import Header from './components/Header'
import './globals.css'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Beyond Decor',
  description: ' ',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className} suppressHydrationWarning>
        <Header />
        <main className="mx-6 mt-3">
          {children}
        </main>
      </body>
    </html>
  )
}
