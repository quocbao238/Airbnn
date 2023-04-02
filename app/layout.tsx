import { Nunito } from 'next/font/google'

import './globals.css'
import React from 'react'
import Navbar from '@/app/components/navbar/Navbar'
import ClientOnly from '@/app/components/ClientOnly'
import Modal from './components/modals/Modal'

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
          <Modal isOpen title="Hello" actionLabel="Submit" />
          <Navbar />
        </ClientOnly>
        {children}
      </body>
    </html>
  )
}

// 33:50 https://www.youtube.com/watch?v=c_-b_isI4vg&list=LL&index=1&t=90s
