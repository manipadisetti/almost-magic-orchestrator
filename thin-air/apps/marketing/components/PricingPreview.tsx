export default function PricingPreview() {
    return (
        <section className="py-20 px-4 bg-white dark:bg-gray-900">
            <div className="max-w-4xl mx-auto text-center">
                <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900 dark:text-white">
                    Transparent Pricing
                </h2>
                <p className="text-xl text-gray-600 dark:text-gray-400 mb-12">
                    1 credit = $9 AUD • Average app = 6-9 credits ($54-81 AUD)
                </p>

                <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-xl p-8 mb-8">
                    <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                        Start with 10 Credits Free
                    </h3>
                    <p className="text-xl text-gray-700 dark:text-gray-300 mb-6">
                        Worth $90 AUD • Build 2-3 complete applications
                    </p>
                    <p className="text-gray-600 dark:text-gray-400">
                        No credit card required • Business email only • Test everything before spending a cent
                    </p>
                </div>

                <div className="grid md:grid-cols-3 gap-6 mb-12">
                    <div className="bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-6 shadow-sm">
                        <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Simple Apps</h4>
                        <p className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-2">6-7 credits</p>
                        <p className="text-gray-600 dark:text-gray-400">$54-63 AUD</p>
                    </div>

                    <div className="bg-gray-50 dark:bg-gray-800 border border-purple-200 dark:border-purple-500/50 rounded-xl p-6 shadow-sm">
                        <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Standard Apps</h4>
                        <p className="text-3xl font-bold text-purple-600 dark:text-purple-400 mb-2">7-8 credits</p>
                        <p className="text-gray-600 dark:text-gray-400">$63-72 AUD</p>
                    </div>

                    <div className="bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-6 shadow-sm">
                        <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Complex Apps</h4>
                        <p className="text-3xl font-bold text-pink-600 dark:text-pink-400 mb-2">8-9 credits</p>
                        <p className="text-gray-600 dark:text-gray-400">$72-81 AUD</p>
                    </div>
                </div>

                <p className="text-gray-600 dark:text-gray-400 mb-8 max-w-3xl mx-auto">
                    <strong>Includes everything:</strong> Code, documentation, marketing site, 30-day testing, up to 5 iterations, security hardening, auto-testing.
                    <br /><br />
                    <span className="text-sm">
                        * Credits expire 12 months from purchase. No lock-in contracts.
                        <br />
                        * Client data deleted 30 days after creation.
                    </span>
                </p>

                <a
                    href="/pricing"
                    className="inline-block bg-gray-900 hover:bg-gray-800 dark:bg-gray-700 dark:hover:bg-gray-600 text-white px-8 py-3 rounded-lg font-semibold transition-all"
                >
                    See Full Pricing Details
                </a>
            </div>
        </section>
    )
}
