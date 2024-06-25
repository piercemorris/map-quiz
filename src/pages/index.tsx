'use client'

import Image from 'next/image'
import { Inter } from 'next/font/google'
import Japan from '~/components/maps/Japan'
import { ComposableMap, Geographies, Geography } from 'react-simple-maps'
import MapChart from '~/components/MapChart'


const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <main>
      <MapChart />
    </main>
  )
}
