import {Inter} from 'next/font/google';
import "../globals.css";
import ToasterContext from '@components/ToasterContext';

const inter = Inter({subsets: ['latin']});

export const metadata = {
  title: 'Auth Halo Chat',
  description: "Build a Next 14 Chat App",
}

export default function RootLayer({children}) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-purple-1`}>
        <ToasterContext/>
        {children}
      </body>
    </html>
  )
}
