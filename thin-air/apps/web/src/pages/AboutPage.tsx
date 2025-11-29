import { Header } from '../components/Header';
import { Badge } from '../components/Badge';
import { useState, useEffect } from 'react';

export function AboutPage() {
    const [theme, setTheme] = useState<'default' | 'high-contrast'>('default');
    const [largeText, setLargeText] = useState(false);
    const [simplified, setSimplified] = useState(false);

    useEffect(() => {
        document.documentElement.setAttribute('data-theme', theme);
    }, [theme]);

    return (
        <div className={`min-h-screen bg-gray-50 dark:bg-gray-900 ${largeText ? 'text-lg' : ''} ${simplified ? 'simplified' : ''}`}>
            <Header
                theme={theme}
                setTheme={setTheme}
                largeText={largeText}
                setLargeText={setLargeText}
                simplified={simplified}
                setSimplified={setSimplified}
            />

            <main className="max-w-4xl mx-auto px-6 py-12">
                <div className="text-center mb-16">
                    <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
                        About Thin Air
                    </h1>
                    <div className="flex justify-center gap-3 mb-6">
                        <Badge label="Proprietary Technology" color="blue" />
                        <Badge label="Patent Pending" color="purple" />
                    </div>
                    <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                        We turn scattered thoughts into working software. No technical skills required.
                    </p>
                </div>

                {/* Process Flow Image */}
                <div className="mb-16 bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-700">
                    <h2 className="text-2xl font-bold mb-6 text-center text-gray-900 dark:text-white">How It Works</h2>
                    <img
                        src="/process-flow.png"
                        alt="Thin Air Process: Vapour to Manifest"
                        className="w-full h-auto rounded-lg"
                    />
                    <p className="text-center mt-4 text-sm text-gray-500 italic">
                        From raw idea to deployed application in 5 simple steps.
                    </p>
                </div>

                {/* Origin Story */}
                <div className="prose dark:prose-invert max-w-none">
                    <h2 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">The "Almost Magic" Story</h2>
                    <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
                        Thin Air was born from a simple observation: the hardest part of building software isn't writing code—it's articulating what you want.
                        We realized that millions of brilliant ideas die simply because the gap between a thought and a technical specification is too wide.
                    </p>
                    <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
                        Our team at <strong>Almost Magic</strong> set out to bridge this gap. We asked ourselves: "What if you could just speak your idea,
                        and an intelligent system could understand, refine, and build it for you?"
                    </p>
                    <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
                        That question led to the creation of our 5-phase engine:
                    </p>
                    <ul className="space-y-4 list-none pl-0">
                        <li className="flex items-start gap-3">
                            <span className="text-2xl">💭</span>
                            <div>
                                <strong className="text-blue-600 dark:text-blue-400">Vapour:</strong> Capturing the raw, unstructured essence of your idea.
                            </div>
                        </li>
                        <li className="flex items-start gap-3">
                            <span className="text-2xl">🧪</span>
                            <div>
                                <strong className="text-blue-600 dark:text-blue-400">Condenser:</strong> Distilling thoughts into concrete requirements.
                            </div>
                        </li>
                        <li className="flex items-start gap-3">
                            <span className="text-2xl">👁️</span>
                            <div>
                                <strong className="text-blue-600 dark:text-blue-400">Mirage:</strong> Visualizing the architecture before a single line of code is written.
                            </div>
                        </li>
                        <li className="flex items-start gap-3">
                            <span className="text-2xl">⚙️</span>
                            <div>
                                <strong className="text-blue-600 dark:text-blue-400">Materialiser:</strong> The heavy lifting—generating production-ready code.
                            </div>
                        </li>
                        <li className="flex items-start gap-3">
                            <span className="text-2xl">🚀</span>
                            <div>
                                <strong className="text-blue-600 dark:text-blue-400">Manifest:</strong> Deploying your creation to the world.
                            </div>
                        </li>
                    </ul>
                </div>
            </main>
        </div>
    );
}
