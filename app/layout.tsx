import { Nunito } from 'next/font/google'

import './globals.css'
import React from 'react'
import Navbar from '@/app/components/navbar/Navbar'
import ClientOnly from '@/app/components/ClientOnly'
import RegisterModal from './components/modals/RegisterModal'
import ToasterProvider from './providers/ToasterProvider'
import LoginModal from './components/modals/LoginModal'
import getCurrentUser from './actions/getCurrentUser'
import RentModal from './components/modals/RentModal'


// https://www.youtube.com/watch?v=c_-b_isI4vg&t=16104s


export const metadata = {
  title: 'Airbnb',
  description: 'Airbnb clone',
}

const font = Nunito({
  subsets: ['latin'],
})

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const currentUser = await getCurrentUser()

  return (
    <html lang="en">
      <body className={font.className}>
        <ClientOnly>
          <ToasterProvider />
          <RentModal />
          <RegisterModal />
          <LoginModal />
          <Navbar currentUser={currentUser} />
        </ClientOnly>

        <div className='pb-20 pt-28'>
          {children}
        </div>
      </body>
    </html>
  )
}

// 3:58
