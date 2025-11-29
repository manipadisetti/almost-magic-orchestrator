import { Metadata } from 'next'
import Header from '../../components/Header'
import Breadcrumbs from '../../components/Breadcrumbs'
import Footer from '../../components/Footer'

export const metadata: Metadata = {
    title: 'About Us - Thin Air',
    description: 'Learn about Almost Magic Tech Lab and the story behind Thin Air. Building software that turns ideas into reality.',
}

export default function AboutPage() {
    return (
        <main className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-white">
            <Header />
            <Breadcrumbs items={[{ label: 'About' }]} />

            {/* Hero */}
            <section className="py-20 px-4 text-center bg-gray-50 dark:bg-gray-800">
                <h1 className="text-5xl md:text-6xl font-bold mb-6 text-gray-900 dark:text-white">
                    About Almost Magic
                </h1>
                <p className="text-xl text-gray-700 dark:text-gray-300 max-w-3xl mx-auto">
                    We believe great ideas shouldn't die because building software is too expensive, too slow, or too complicated.
                </p>
            </section>

            {/* Origin Story */}
            <section className="py-16 px-4">
                <div className="max-w-4xl mx-auto">
                    <h2 className="text-4xl font-bold mb-8 text-gray-900 dark:text-white">The Origin Story</h2>

                    <div className="space-y-6 text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
                        <p>
                            Almost Magic Tech Lab started from a simple observation: brilliant ideas were dying not because they were bad ideas, but because the gap between "I have an idea" and "I have working software" was too wide.
                        </p>

                        <p>
                            Small business owners would sketch their vision on napkins, only to be quoted $50,000+ and 6 months by development agencies. Tech-savvy founders would try no-code platforms, only to hit feature limitations and realize they were locked into a platform they didn't own.
                        </p>

                        <p>
                            We asked ourselves: <strong className="text-gray-900 dark:text-white">What if AI could bridge that gap?</strong>
                        </p>

                        <p>
                            Not AI that generates boilerplate code. Not AI that makes developers slightly faster. But AI that fundamentally changes who can build software and how quickly they can do it.
                        </p>

                        <p>
                            So we built Thin Air.
                        </p>
                    </div>
                </div>
            </section>

            {/* Our Philosophy */}
            <section className="py-16 px-4 bg-gray-50 dark:bg-gray-800">
                <div className="max-w-4xl mx-auto">
                    <h2 className="text-4xl font-bold mb-8 text-gray-900 dark:text-white">Our Philosophy</h2>

                    <div className="grid md:grid-cols-2 gap-8">
                        <div className="bg-white dark:bg-gray-900 border-2 border-gray-200 dark:border-gray-700 rounded-xl p-6">
                            <div className="text-4xl mb-4">🎯</div>
                            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">You Own Everything</h3>
                            <p className="text-gray-700 dark:text-gray-300">
                                Your code. Your data. Your IP. Forever. We don't believe in platform lock-in or recurring fees for hosting code you should own.
                            </p>
                        </div>

                        <div className="bg-white dark:bg-gray-900 border-2 border-gray-200 dark:border-gray-700 rounded-xl p-6">
                            <div className="text-4xl mb-4">⚡</div>
                            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">Speed Matters</h3>
                            <p className="text-gray-700 dark:text-gray-300">
                                Ideas have momentum. Waiting 6 months kills that momentum. We deliver working applications in days, not months.
                            </p>
                        </div>

                        <div className="bg-white dark:bg-gray-900 border-2 border-gray-200 dark:border-gray-700 rounded-xl p-6">
                            <div className="text-4xl mb-4">💎</div>
                            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">Quality Over Shortcuts</h3>
                            <p className="text-gray-700 dark:text-gray-300">
                                Fast doesn't mean sloppy. Every application includes security hardening, comprehensive testing, and production-grade code.
                            </p>
                        </div>

                        <div className="bg-white dark:bg-gray-900 border-2 border-gray-200 dark:border-gray-700 rounded-xl p-6">
                            <div className="text-4xl mb-4">🤝</div>
                            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">Radical Transparency</h3>
                            <p className="text-gray-700 dark:text-gray-300">
                                We tell you the cost before doing any work. You approve every step. No surprises. No hidden fees. Ever.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Who We Serve */}
            <section className="py-16 px-4">
                <div className="max-w-4xl mx-auto">
                    <h2 className="text-4xl font-bold mb-8 text-gray-900 dark:text-white">Who We Serve</h2>

                    <div className="space-y-6 text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
                        <p>
                            <strong className="text-gray-900 dark:text-white">Small business owners</strong> who need custom software but can't afford enterprise development costs.
                        </p>

                        <p>
                            <strong className="text-gray-900 dark:text-white">Small tech teams</strong> who want to validate ideas quickly without committing to months of development.
                        </p>

                        <p>
                            <strong className="text-gray-900 dark:text-white">Founders</strong> who've been burned by no-code platforms and want to own their stack.
                        </p>

                        <p>
                            <strong className="text-gray-900 dark:text-white">Anyone</strong> with a great idea who's been told "that would cost $50,000 and take 6 months."
                        </p>
                    </div>
                </div>
            </section>

            {/* Built in Australia */}
            <section className="py-16 px-4 bg-blue-600 dark:bg-blue-700 text-white text-center">
                <div className="max-w-4xl mx-auto">
                    <div className="text-6xl mb-6">🇦🇺</div>
                    <h2 className="text-4xl font-bold mb-4">Built in Australia</h2>
                    <p className="text-xl text-blue-100 mb-8">
                        We're proudly Australian. All our development, support, and advisory services operate from Australia, in Australian Eastern Time.
                    </p>
                    <p className="text-blue-100">
                        Questions? Email us at <a href="mailto:advisory@almostmagic.net.au" className="underline font-semibold">advisory@almostmagic.net.au</a>
                    </p>
                </div>
            </section>

            <Footer />
        </main>
    )
}
