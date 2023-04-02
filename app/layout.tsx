import { Nunito } from 'next/font/google'

import './globals.css'
import React from 'react'
import Navbar from '@/app/components/navbar/Navbar'
import ClientOnly from '@/app/components/ClientOnly'
import RegisterModal from './components/modals/RegisterModal'

export const metadata = {
  title: 'Airbnb',
  description: 'Airbnb clone',
}

const font = Nunito({
  subsets: ['latin'],
})

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={font.className}>
        <ClientOnly>
          <RegisterModal />
          <Navbar />
        </ClientOnly>
        {children}
      </body>
    </html>
  )
}

// 33:50 https://www.youtube.com/watch?v=c_-b_isI4vg&list=LL&index=1&t=90s
