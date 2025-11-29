export default function Solution() {
    return (
        <section className="py-20 px-4 bg-white dark:bg-gray-900">
            <div className="max-w-4xl mx-auto">
                <h2 className="text-4xl md:text-5xl font-bold mb-8 text-center text-gray-900 dark:text-white">
                    What If Your Ideas Could Just... Materialise?
                </h2>

                <div className="prose prose-lg max-w-none dark:prose-invert">
                    <p className="text-gray-700 dark:text-gray-300 text-lg mb-6">
                        Arthur C. Clarke once said that any sufficiently advanced technology is indistinguishable from magic.
                    </p>

                    <p className="text-gray-700 dark:text-gray-300 text-lg mb-6">
                        We reckon he was onto something.
                    </p>

                    <p className="text-gray-700 dark:text-gray-300 text-lg mb-8">
                        Not because technology <em>is</em> magic (it's not—it's maths and logic and a lot of clever engineering). But because when it works properly, it should <em>feel</em> effortless. Natural. Like your thoughts simply becoming real.
                    </p>

                    <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-xl p-8 mb-8">
                        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">That's what Thin Air does.</h3>
                        <p className="text-gray-700 dark:text-gray-300 text-lg">
                            Think about it: your ideas literally come out of thin air. A conversation. A napkin sketch. A rambling voice note recorded while driving. They're unstructured. Messy. Incomplete.
                        </p>
                        <p className="text-gray-700 dark:text-gray-300 text-lg mt-4">
                            But they're valuable.
                        </p>
                    </div>

                    <p className="text-gray-700 dark:text-gray-300 text-lg mb-6">
                        Thin Air takes those scattered thoughts—voice notes, sketches, rambling descriptions, PDF specifications—and transforms them into production-ready applications.
                    </p>

                    <div className="grid md:grid-cols-3 gap-4 mb-8">
                        <div className="text-center p-4">
                            <div className="text-4xl mb-2">❌</div>
                            <p className="text-gray-600 dark:text-gray-400">Not prototypes</p>
                        </div>
                        <div className="text-center p-4">
                            <div className="text-4xl mb-2">❌</div>
                            <p className="text-gray-600 dark:text-gray-400">Not mockups</p>
                        </div>
                        <div className="text-center p-4">
                            <div className="text-4xl mb-2">❌</div>
                            <p className="text-gray-600 dark:text-gray-400">Not "proof of concepts"</p>
                        </div>
                    </div>

                    <p className="text-2xl font-bold text-center text-gray-900 dark:text-white mb-8">
                        Actual working software. Built. Deployed temporarily for testing. Then downloaded completely so you can host it wherever you choose.
                    </p>

                    {/* Comparison */}
                    <div className="grid md:grid-cols-2 gap-6 mt-12">
                        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-500/30 rounded-xl p-6">
                            <h4 className="text-xl font-bold text-red-600 dark:text-red-400 mb-4">Most "No-Code" Tools Say:</h4>
                            <ul className="space-y-2 list-none pl-0">
                                <li className="text-gray-700 dark:text-gray-300">❌ "You can't use that API"</li>
                                <li className="text-gray-700 dark:text-gray-300">❌ "That integration requires Enterprise"</li>
                                <li className="text-gray-700 dark:text-gray-300">❌ "You're locked into our hosting"</li>
                                <li className="text-gray-700 dark:text-gray-300">❌ "Want your code? That'll be extra"</li>
                            </ul>
                        </div>

                        <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-500/30 rounded-xl p-6">
                            <h4 className="text-xl font-bold text-green-600 dark:text-green-400 mb-4">Thin Air Says:</h4>
                            <ul className="space-y-2 list-none pl-0">
                                <li className="text-gray-700 dark:text-gray-300">✅ "What do you want to build?"</li>
                                <li className="text-gray-700 dark:text-gray-300">✅ "Test it on our servers for 30 days"</li>
                                <li className="text-gray-700 dark:text-gray-300">✅ "Download everything—code, sites, documentation"</li>
                                <li className="text-gray-700 dark:text-gray-300">✅ "Host it wherever you want. It's yours"</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
