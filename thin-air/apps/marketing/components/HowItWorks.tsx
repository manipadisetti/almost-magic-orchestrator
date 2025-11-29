export default function HowItWorks() {
    return (
        <section id="how-it-works" className="py-20 px-4 bg-gray-50 dark:bg-gray-800/50">
            <div className="max-w-6xl mx-auto">
                <h2 className="text-4xl md:text-5xl font-bold mb-4 text-center text-gray-900 dark:text-white">
                    How Thin Air Works
                </h2>
                <p className="text-xl text-gray-600 dark:text-gray-400 text-center mb-12">
                    Five phases. Complete ownership. Real-time progress tracking.
                </p>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {/* Phase 1 */}
                    <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-6 hover:border-blue-500 transition-all shadow-sm">
                        <div className="text-5xl mb-4">💭</div>
                        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">1. Vapour</h3>
                        <p className="text-gray-700 dark:text-gray-300 mb-4">
                            Share your idea however it makes sense to you. Voice notes, sketches, PDFs, rambling descriptions. We capture everything.
                        </p>
                        <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1 list-none pl-0">
                            <li>✓ Upload files (drag & drop)</li>
                            <li>✓ Voice or text input</li>
                            <li>✓ See file names as you add them</li>
                            <li>✓ We review and show you what we understood</li>
                        </ul>
                    </div>

                    {/* Phase 2 */}
                    <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-6 hover:border-purple-500 transition-all shadow-sm">
                        <div className="text-5xl mb-4">🧠</div>
                        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">2. Condenser</h3>
                        <p className="text-gray-700 dark:text-gray-300 mb-4">
                            <strong>Gemini 3 Pro</strong> asks intelligent, non-technical questions. You answer. We refine. You approve.
                        </p>
                        <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1 list-none pl-0">
                            <li>✓ Smart Q&A (voice or text)</li>
                            <li>✓ Refined requirements</li>
                            <li>✓ Credit cost estimate</li>
                            <li>✓ Your approval required</li>
                        </ul>
                    </div>

                    {/* Phase 3 */}
                    <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-6 hover:border-pink-500 transition-all shadow-sm">
                        <div className="text-5xl mb-4">👁️</div>
                        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">3. Mirage</h3>
                        <p className="text-gray-700 dark:text-gray-300 mb-4">
                            Visualise your system as a knowledge graph. See how everything connects. Modify if needed.
                        </p>
                        <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1 list-none pl-0">
                            <li>✓ Interactive knowledge graph</li>
                            <li>✓ User journey visualisation</li>
                            <li>✓ Drag, add, remove features</li>
                            <li>✓ Approve or modify</li>
                        </ul>
                    </div>

                    {/* Phase 4 */}
                    <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-6 hover:border-green-500 transition-all shadow-sm">
                        <div className="text-5xl mb-4">⚙️</div>
                        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">4. Materialiser</h3>
                        <p className="text-gray-700 dark:text-gray-300 mb-4">
                            Watch your app being built in real-time. Progress bar shows % complete, time total, time remaining.
                        </p>
                        <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1 list-none pl-0">
                            <li>✓ Real-time progress tracking</li>
                            <li>✓ Security hardening included</li>
                            <li>✓ Auto-testing included</li>
                            <li>✓ Up to 5 iterations free</li>
                        </ul>
                    </div>

                    {/* Phase 5 */}
                    <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-6 hover:border-yellow-500 transition-all shadow-sm">
                        <div className="text-5xl mb-4">🚀</div>
                        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">5. Manifest</h3>
                        <p className="text-gray-700 dark:text-gray-300 mb-4">
                            Three buttons: Download Zip, Push to GitHub, Deploy Application. Test for 30 days. Download everything.
                        </p>
                        <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1 list-none pl-0">
                            <li>✓ Download all code + docs</li>
                            <li>✓ Push to your GitHub</li>
                            <li>✓ Deploy for testing</li>
                            <li>✓ <strong>30-day data deletion</strong></li>
                        </ul>
                    </div>

                    {/* Pricing */}
                    <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-xl p-6 shadow-sm">
                        <div className="text-5xl mb-4">💰</div>
                        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">Pricing</h3>
                        <p className="text-gray-700 dark:text-gray-300 mb-4">
                            <strong>1 credit = $9 AUD</strong><br />
                            Average app = 6-9 credits ($54-81 AUD)
                        </p>
                        <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1 list-none pl-0">
                            <li>✓ 10 credits free on signup</li>
                            <li>✓ Simple mods: Free</li>
                            <li>✓ Complex mods: Quoted first</li>
                            <li>✓ White-label: +1 credit</li>
                        </ul>
                    </div>
                </div>

                {/* CTA */}
                <div className="text-center mt-12">
                    <a
                        href="http://localhost:5173"
                        className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all"
                    >
                        Start Building Now - 10 Credits Free
                    </a>
                    <p className="text-gray-500 dark:text-gray-400 mt-4">No credit card required • Business email only</p>
                </div>
            </div>
        </section>
    )
}
