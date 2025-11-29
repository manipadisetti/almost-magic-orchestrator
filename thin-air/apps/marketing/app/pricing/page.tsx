import { Metadata } from 'next'
import Header from '../../components/Header'
import Breadcrumbs from '../../components/Breadcrumbs'
import Footer from '../../components/Footer'

export const metadata: Metadata = {
    title: 'Pricing - Thin Air',
    description: 'Transparent pricing. 1 credit = $9 AUD. Average app = 6-9 credits. Start with 10 credits free ($90 AUD value).',
}

export default function PricingPage() {
    return (
        <main className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-white">
            <Header />
            <Breadcrumbs items={[{ label: 'Pricing' }]} />

            {/* Hero */}
            <section className="py-20 px-4 text-center bg-gray-50 dark:bg-gray-800">
                <h1 className="text-5xl md:text-6xl font-bold mb-6 text-gray-900 dark:text-white">
                    Transparent Pricing. No Surprises.
                </h1>
                <p className="text-xl text-gray-700 dark:text-gray-300 max-w-3xl mx-auto">
                    Build applications. Own everything. Pay only for what you build. We tell you the cost before doing any work.
                </p>
                <div className="mt-8 flex flex-wrap gap-4 justify-center text-sm">
                    <div className="bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300 px-4 py-2 rounded-full font-semibold">
                        ✓ Credits expire after 12 months
                    </div>
                    <div className="bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 px-4 py-2 rounded-full font-semibold">
                        ✓ No lock-in contracts
                    </div>
                    <div className="bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-300 px-4 py-2 rounded-full font-semibold">
                        ✓ 30-day data deletion
                    </div>
                </div>
            </section>

            {/* Pricing Details */}
            <section className="py-16 px-4">
                <div className="max-w-4xl mx-auto">
                    <h2 className="text-4xl font-bold mb-8 text-center text-gray-900 dark:text-white">How Credits Work</h2>

                    <div className="bg-blue-50 dark:bg-blue-900/20 border-2 border-blue-200 dark:border-blue-800 rounded-xl p-8 mb-8">
                        <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">The Basics</h3>
                        <ul className="space-y-3 text-lg text-gray-700 dark:text-gray-300">
                            <li className="flex items-start gap-3">
                                <span className="text-blue-600 dark:text-blue-400 font-bold">•</span>
                                <span><strong>1 credit = $9 AUD</strong></span>
                            </li>
                            <li className="flex items-start gap-3">
                                <span className="text-blue-600 dark:text-blue-400 font-bold">•</span>
                                <span>Average app = <strong>6-9 credits</strong> ($54-81 AUD)</span>
                            </li>
                            <li className="flex items-start gap-3">
                                <span className="text-blue-600 dark:text-blue-400 font-bold">•</span>
                                <span>Start with <strong>20 credits free</strong> ($180 AUD value)</span>
                            </li>
                            <li className="flex items-start gap-3">
                                <span className="text-blue-600 dark:text-blue-400 font-bold">•</span>
                                <span>White-label branding = <strong>+1 credit</strong> ($9 AUD)</span>
                            </li>
                        </ul>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6 mb-12">
                        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-6">
                            <h4 className="text-xl font-bold mb-3 text-gray-900 dark:text-white">What You Get</h4>
                            <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                                <li>✓ Full source code</li>
                                <li>✓ Documentation (TDD, FRD, PRD)</li>
                                <li>✓ User & Admin manuals</li>
                                <li>✓ Test for 30 days</li>
                                <li>✓ Download everything</li>
                            </ul>
                        </div>

                        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-6">
                            <h4 className="text-xl font-bold mb-3 text-gray-900 dark:text-white">Our Guarantees</h4>
                            <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                                <li>✓ No lock-in contracts</li>
                                <li>✓ Credits expire after 12 months</li>
                                <li>✓ 30-day data deletion</li>
                                <li>✓ AI transparency</li>
                                <li>✓ You own the code</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    )
}
