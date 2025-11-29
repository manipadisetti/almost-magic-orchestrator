import type { Metadata } from 'next'
import { Analytics } from '../components/Analytics'
import './globals.css'

export const metadata: Metadata = {
  title: 'Thin Air - Turn Your Scattered Ideas Into Working Software',
  description: 'Watch your app being built in real-time. Test it completely free. Download everything. No credit card required. Australian-built software generation platform.',
  keywords: ['app builder', 'no-code', 'AI software', 'custom applications', 'Australia'],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en-AU">
      <body className="antialiased">
        {children}
        <Analytics />
      </body>
    </html>
  )
}
