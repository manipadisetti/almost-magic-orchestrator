import Header from '../components/Header'
import Hero from '../components/Hero'
import Problem from '../components/Problem'
import Solution from '../components/Solution'
import HowItWorks from '../components/HowItWorks'
import Pricing from '../components/PricingPreview'
import Footer from '../components/Footer'

export default function HomePage() {
  return (
    <main className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-white">
      <Header />
      <Hero />
      <Problem />
      <Solution />
      <HowItWorks />
      <Pricing />
      <Footer />
    </main>
  )
}
