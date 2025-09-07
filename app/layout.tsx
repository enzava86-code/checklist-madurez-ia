import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Checklist de Madurez en IA | Evaluación Profesional',
  description: 'Evalúa la preparación de tu organización para implementar soluciones de Inteligencia Artificial. Diagnóstico personalizado para micropymes y empresas.',
  keywords: 'IA, inteligencia artificial, madurez digital, transformación digital, checklist, evaluación empresarial',
  authors: [{ name: 'Dualvia' }],
  viewport: 'width=device-width, initial-scale=1',
  robots: 'index, follow',
  openGraph: {
    title: 'Checklist de Madurez en IA',
    description: 'Evalúa la preparación de tu organización para IA con nuestro diagnóstico personalizado',
    type: 'website',
    locale: 'es_ES',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Checklist de Madurez en IA',
    description: 'Evalúa la preparación de tu organización para IA',
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es">
      <body className={inter.className}>
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
          {children}
        </div>
      </body>
    </html>
  )
}