import Image from 'next/image'
import PhasesDiagram from './PhasesDiagram'

export default function Hero() {
    return (
        <section className="relative min-h-screen flex items-center justify-center px-4 py-20 bg-white dark:bg-gray-900">
            <div className="relative z-10 max-w-6xl mx-auto text-center">
                {/* Logo */}
                <div className="mb-8 flex justify-center">
                    <Image
                        src="/logo.png"
                        alt="Almost Magic Tech Lab"
                        width={200}
                        height={60}
                        className="h-16 w-auto"
                    />
                </div>

                {/* Headline */}
                <h1 className="text-5xl md:text-7xl font-bold mb-6 text-gray-900 dark:text-white">
                    Turn Your Scattered Ideas Into Working Software
                </h1>

                {/* Subheadline - Australian English */}
                <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-8 max-w-4xl mx-auto">
                    Watch your app being built in real-time. Test it completely free. Download everything. No credit card required.
                </p>

                {/* Trust Badges */}
                <div className="flex flex-wrap justify-center gap-4 mb-12">
                    <div className="bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 px-4 py-2 rounded-lg text-gray-800 dark:text-gray-200">
                        🎁 20 Credits Free ($180 AUD Value)
                    </div>
                    <div className="bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 px-4 py-2 rounded-lg text-gray-800 dark:text-gray-200">
                        💳 No Credit Card Required
                    </div>
                    <div className="bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 px-4 py-2 rounded-lg text-gray-800 dark:text-gray-200">
                        ⚡ Real-Time Progress Tracking
                    </div>
                    <div className="bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 px-4 py-2 rounded-lg text-gray-800 dark:text-gray-200">
                        🚀 Deploy in Minutes
                    </div>
                </div>

                {/* CTAs */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
                    <a
                        href="http://localhost:5173"
                        className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all"
                    >
                        Start Building Now
                    </a>
                    <a
                        href="#how-it-works"
                        className="bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 text-gray-900 dark:text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all"
                    >
                        See How It Works
                    </a>
                </div>

                {/* 5-Phase Diagram */}
                <PhasesDiagram />

                {/* Seal */}
                <div className="mt-12 flex justify-center">
                    <Image
                        src="/seal.jpg"
                        alt="Clarity over cynicism"
                        width={120}
                        height={120}
                        className="rounded-full opacity-80"
                    />
                </div>
            </div>
        </section>
    )
}
