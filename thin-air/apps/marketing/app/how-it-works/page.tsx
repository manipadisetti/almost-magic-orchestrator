import { Metadata } from 'next'
import Header from '../../components/Header'
import Breadcrumbs from '../../components/Breadcrumbs'
import Footer from '../../components/Footer'

export const metadata: Metadata = {
    title: 'How It Works - Thin Air',
    description: 'From scattered thoughts to deployed application. See the complete 5-phase process with real-time progress tracking.',
}

export default function HowItWorksPage() {
    const phases = [
        {
            emoji: '💭',
            number: 1,
            name: 'Vapour',
            subtitle: 'Capture Your Idea',
            whatYouDo: 'Share your idea however it comes out. Talk to us. Sketch it on paper. Upload a PDF specification. Type rambling notes at 2 AM. Whatever works for how you think.',
            whatHappens: 'We capture everything. Voice becomes text. Sketches become structured information. PDFs get analysed. Context gets understood, not just words recorded.',
            whatYouGet: 'Every scattered thought, organised and ready for you to review. Nothing lost. Everything captured.',
            yourEffort: 'Just thinking out loud the way you naturally do.',
        },
        {
            emoji: '🔍',
            number: 2,
            name: 'Condenser',
            subtitle: 'Clarify Your Intent',
            whatYouDo: 'Review what we understood. Approve it, refine it, or tell us we got it completely wrong.',
            whatHappens: 'AI analyses your inputs and extracts clear requirements. We show you exactly what we think you want to build.',
            whatYouGet: 'A structured breakdown of your application requirements. Clear. Specific. Ready for you to approve or adjust.',
            yourEffort: 'Read and approve (or correct) what we understood.',
        },
        {
            emoji: '🗺️',
            number: 3,
            name: 'Mirage',
            subtitle: 'Visualise the Structure',
            whatYouDo: 'Explore the interactive knowledge graph. See how everything connects. Request changes if needed.',
            whatHappens: 'We build a visual map of your entire application. Every feature, every connection, every dependency.',
            whatYouGet: 'An interactive diagram showing exactly what we\'re going to build and how it all fits together.',
            yourEffort: 'Review the structure and approve the plan.',
        },
        {
            emoji: '⚙️',
            number: 4,
            name: 'Materialiser',
            subtitle: 'Generate Your Application',
            whatYouDo: 'Wait. Seriously, just wait. We\'ll notify you when it\'s ready.',
            whatHappens: 'AI generates your complete application. Database schema, API endpoints, frontend components, authentication, everything.',
            whatYouGet: 'A fully functional application. Not a prototype. Not a demo. The real thing.',
            yourEffort: 'None. This is where we do the heavy lifting.',
        },
        {
            emoji: '🚀',
            number: 5,
            name: 'Manifest',
            subtitle: 'Deploy and Own',
            whatYouDo: 'Test your application. Request any final adjustments. Then deploy.',
            whatHappens: 'We deploy your application to production. You get all the source code, deployment configs, and documentation.',
            whatYouGet: 'A deployed application that you completely own. All code is yours. Forever.',
            yourEffort: 'Test it, approve it, and start using it.',
        },
    ]

    return (
        <main className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-white">
            <Header />
            <Breadcrumbs items={[{ label: 'How It Works' }]} />

            {/* Hero */}
            <section className="py-20 px-4 text-center bg-gray-50 dark:bg-gray-800">
                <h1 className="text-5xl md:text-6xl font-bold mb-6 text-gray-900 dark:text-white">
                    From Scattered Thoughts to Deployed Application
                </h1>
                <p className="text-xl text-gray-700 dark:text-gray-300 max-w-3xl mx-auto mb-4">
                    This is iterative. You'll review, approve, and refine at each step. Take your time. It's your application—we just handle the technical complexity.
                </p>
                <p className="text-lg text-gray-600 dark:text-gray-400">
                    <strong>Timeline:</strong> Typically 5-10 business days from start to deployment, including your review time. However, this depends entirely on how quickly you review and approve. If you move fast, you could potentially complete your entire application in hours.
                </p>
            </section>

            {/* Phases - Grid Layout */}
            <section className="py-16 px-4">
                <div className="max-w-7xl mx-auto grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {phases.map((phase) => (
                        <div
                            key={phase.number}
                            className="bg-gray-50 dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 rounded-xl p-6 hover:border-blue-500 dark:hover:border-blue-400 transition-all flex flex-col"
                        >
                            <div className="flex items-center gap-3 mb-4">
                                <div className="text-4xl">{phase.emoji}</div>
                                <div>
                                    <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                                        Phase {phase.number}: {phase.name}
                                    </h2>
                                    <p className="text-sm text-gray-600 dark:text-gray-400">{phase.subtitle}</p>
                                </div>
                            </div>

                            <div className="space-y-3 flex-grow">
                                <div>
                                    <h3 className="text-sm font-bold text-gray-900 dark:text-white mb-1">What you do:</h3>
                                    <p className="text-sm text-gray-700 dark:text-gray-300">
                                        {phase.whatYouDo}
                                    </p>
                                </div>

                                <div>
                                    <h3 className="text-sm font-bold text-gray-900 dark:text-white mb-1">What happens:</h3>
                                    <p className="text-sm text-gray-700 dark:text-gray-300">
                                        {phase.whatHappens}
                                    </p>
                                </div>

                                <div>
                                    <h3 className="text-sm font-bold text-gray-900 dark:text-white mb-1">What you get:</h3>
                                    <p className="text-sm text-gray-700 dark:text-gray-300">
                                        {phase.whatYouGet}
                                    </p>
                                </div>

                                <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                                    <p className="text-xs text-gray-600 dark:text-gray-400">
                                        <strong>Your effort:</strong> {phase.yourEffort}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            <Footer />
        </main>
    )
}
