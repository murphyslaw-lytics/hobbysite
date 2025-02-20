import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

import { MainLayout } from '@/MainLayout'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import '../globals.css'
import '/node_modules/flag-icons/css/flag-icons.min.css'
import {PersonalizationProvider} from '@/context'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
    title: 'Compass starter',
    description: 'Provided by Contentstack'
}

/**
 * @component RootLayout 
 * @description default layout component of the app
 * 
 * @returns {JSX.Element}
*/
export default async function RootLayout ({
    children
}: Readonly<{
  children: React.ReactNode;
}>) {

    return (
        <html lang='en'>
            <body className={inter.className}>
                <PersonalizationProvider>
                    <MainLayout>
                        {children}
                    </MainLayout>
                </PersonalizationProvider>
            </body>
        </html>
    )
}
