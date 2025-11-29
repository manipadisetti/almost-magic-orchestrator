import { Metadata } from 'next'
import Header from '../../components/Header'
import Breadcrumbs from '../../components/Breadcrumbs'
import Footer from '../../components/Footer'

export const metadata: Metadata = {
    title: 'Contact Us - Thin Air',
    description: 'Get in touch with the Thin Air team. Support, advisory, and general enquiries welcome.',
}

export default function ContactPage() {
    return (
        <main className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-white">
            <Header />
            <Breadcrumbs items={[{ label: 'Contact' }]} />

            {/* Hero */}
            <section className="py-20 px-4 text-center bg-gray-50 dark:bg-gray-800">
                <h1 className="text-5xl md:text-6xl font-bold mb-6 text-gray-900 dark:text-white">
                    Get In Touch
                </h1>
                <p className="text-xl text-gray-700 dark:text-gray-300 max-w-3xl mx-auto">
                    Have questions? Need help? Want to discuss a custom project? We're here for you.
                </p>
            </section>

            {/* Contact Options */}
            <section className="py-16 px-4">
                <div className="max-w-6xl mx-auto">
                    <div className="grid md:grid-cols-2 gap-8 mb-16">
                        {/* Support */}
                        <div className="bg-gray-50 dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 rounded-xl p-8 hover:border-blue-500 dark:hover:border-blue-400 transition-all">
                            <div className="text-5xl mb-4">💬</div>
                            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Support</h2>
                            <p className="text-gray-700 dark:text-gray-300 mb-6">
                                Technical questions, account issues, or need help with your application? Our support team is here to help.
                            </p>
                            <a
                                href="mailto:support@almostmagic.net.au"
                                className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 text-lg font-semibold"
                            >
                                support@almostmagic.net.au
                            </a>
                            <p className="text-sm text-gray-500 dark:text-gray-400 mt-4">
                                Response time: Within 24 hours (business days)
                            </p>
                        </div>

                        {/* Advisory */}
                        <div className="bg-gray-50 dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 rounded-xl p-8 hover:border-purple-500 dark:hover:border-purple-400 transition-all">
                            <div className="text-5xl mb-4">🎯</div>
                            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Advisory</h2>
                            <p className="text-gray-700 dark:text-gray-300 mb-6">
                                Strategic questions, custom projects, enterprise enquiries, or partnership opportunities? Let's talk.
                            </p>
                            <a
                                href="mailto:advisory@almostmagic.net.au"
                                className="text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300 text-lg font-semibold"
                            >
                                advisory@almostmagic.net.au
                            </a>
                            <p className="text-sm text-gray-500 dark:text-gray-400 mt-4">
                                Response time: Within 48 hours (business days)
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Contact Form */}
            <section className="py-16 px-4 bg-gray-50 dark:bg-gray-800">
                <div className="max-w-2xl mx-auto">
                    <h2 className="text-4xl font-bold mb-4 text-center text-gray-900 dark:text-white">Send Us a Message</h2>
                    <p className="text-center text-gray-600 dark:text-gray-400 mb-8">
                        Prefer a form? Fill this out and we'll get back to you within 1 business day.
                    </p>

                    <form className="space-y-6">
                        <div>
                            <label htmlFor="name" className="block text-sm font-semibold text-gray-900 dark:text-white mb-2">
                                Your Name *
                            </label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                required
                                className="w-full px-4 py-3 border-2 border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:border-blue-500 dark:focus:border-blue-400 focus:outline-none transition-colors"
                                placeholder="John Smith"
                            />
                        </div>

                        <div>
                            <label htmlFor="email" className="block text-sm font-semibold text-gray-900 dark:text-white mb-2">
                                Your Email *
                            </label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                required
                                className="w-full px-4 py-3 border-2 border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:border-blue-500 dark:focus:border-blue-400 focus:outline-none transition-colors"
                                placeholder="john@example.com"
                            />
                        </div>

                        <div>
                            <label htmlFor="subject" className="block text-sm font-semibold text-gray-900 dark:text-white mb-2">
                                Subject *
                            </label>
                            <input
                                type="text"
                                id="subject"
                                name="subject"
                                required
                                className="w-full px-4 py-3 border-2 border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:border-blue-500 dark:focus:border-blue-400 focus:outline-none transition-colors"
                                placeholder="I have a question about..."
                            />
                        </div>

                        <div>
                            <label htmlFor="message" className="block text-sm font-semibold text-gray-900 dark:text-white mb-2">
                                Message *
                            </label>
                            <textarea
                                id="message"
                                name="message"
                                required
                                rows={6}
                                className="w-full px-4 py-3 border-2 border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:border-blue-500 dark:focus:border-blue-400 focus:outline-none transition-colors resize-none"
                                placeholder="Tell us about your project or question..."
                            />
                        </div>

                        <button
                            type="submit"
                            className="w-full bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white font-bold py-4 px-6 rounded-lg transition-colors"
                        >
                            Send Message
                        </button>

                        <p className="text-sm text-gray-500 dark:text-gray-400 text-center">
                            By submitting this form, you agree to our privacy policy. We'll never share your information with third parties.
                        </p>
                    </form>
                </div>
            </section>

            <Footer />
        </main>
    )
}
