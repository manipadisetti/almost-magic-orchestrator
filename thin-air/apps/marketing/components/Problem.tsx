export default function Problem() {
    return (
        <section className="py-20 px-4 bg-gray-50 dark:bg-gray-800/50">
            <div className="max-w-4xl mx-auto">
                <h2 className="text-4xl md:text-5xl font-bold mb-8 text-center text-gray-900 dark:text-white">
                    Your Best Ideas Are Stuck in Your Head
                </h2>

                <div className="prose prose-lg max-w-none dark:prose-invert">
                    <p className="text-gray-700 dark:text-gray-300 text-lg mb-6">
                        You've had that idea for months. Maybe years.
                    </p>

                    <p className="text-gray-700 dark:text-gray-300 text-lg mb-6">
                        The one that could streamline your operations. Cut costs. Finally give your team the tool they need—not another bloated software subscription that does everything <em>except</em> what you want.
                    </p>

                    <p className="text-gray-700 dark:text-gray-300 text-lg mb-8">
                        But here's what actually happens:
                    </p>

                    <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-6 mb-8 shadow-sm">
                        <p className="text-gray-700 dark:text-gray-300 mb-4">
                            Ideas arrive at 3 AM. During client calls. In the shower. You scribble them on napkins, type them into scattered notes apps, promise yourself you'll "organise this properly later."
                        </p>
                        <p className="text-gray-900 dark:text-white font-semibold">
                            Later never comes.
                        </p>
                    </div>

                    <p className="text-gray-700 dark:text-gray-300 text-lg mb-4">
                        Because building software properly means:
                    </p>

                    <ul className="space-y-3 mb-8 list-none pl-0">
                        <li className="flex items-start gap-3">
                            <span className="text-red-500 text-xl">✗</span>
                            <span className="text-gray-700 dark:text-gray-300"><strong>Hiring developers</strong> you can't afford ($50,000+ for even basic tools)</span>
                        </li>
                        <li className="flex items-start gap-3">
                            <span className="text-red-500 text-xl">✗</span>
                            <span className="text-gray-700 dark:text-gray-300"><strong>Learning to code</strong> yourself (hundreds of hours you don't have)</span>
                        </li>
                        <li className="flex items-start gap-3">
                            <span className="text-red-500 text-xl">✗</span>
                            <span className="text-gray-700 dark:text-gray-300"><strong>Wrestling with "no-code" tools</strong> that promise everything but constantly tell you "Sorry, that's not available on your plan"</span>
                        </li>
                    </ul>

                    <p className="text-2xl text-gray-900 dark:text-white font-semibold text-center">
                        Sound familiar?
                    </p>
                </div>
            </div>
        </section>
    )
}
