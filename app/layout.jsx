import Header from './components/Header'
import './globals.css'
import { Lora } from 'next/font/google'

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
        <main className="mt-3">
          {children}
        </main>
      </body>
    </html>
  )
}
