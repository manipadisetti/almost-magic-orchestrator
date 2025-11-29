import { useState, useEffect } from 'react';
import { trpc } from '../utils/trpc';
import { motion } from 'framer-motion';

const DEMO_PROJECT_ID = "00000000-0000-0000-0000-000000000000";

interface ArchitectureComponent {
    id: string;
    name: string;
    type: 'frontend' | 'backend' | 'database' | 'service' | 'infrastructure';
    description: string;
    technologies: string[];
    dependencies: string[];
}

const DESIGN_STAGES = [
    "Analysing requirements...",
    "Selecting technologies...",
    "Designing schema...",
    "Defining API structure...",
    "Finalising architecture..."
];

export function MiragePage() {
    const projectId = DEMO_PROJECT_ID;
    const [isDesigning, setIsDesigning] = useState(false);
    const [architecture, setArchitecture] = useState<ArchitectureComponent[]>([]);
    const [designComplete, setDesignComplete] = useState(false);
    const [progress, setProgress] = useState(0);
    const [stageIndex, setStageIndex] = useState(0);
    const [secondsLeft, setSecondsLeft] = useState(20);
    const [error, setError] = useState<string | null>(null);

    const designArchitecture = trpc.mirage.design.useMutation({
        onSuccess: (data) => {
            setArchitecture(data.components);
            setDesignComplete(true);
            setIsDesigning(false);
            setProgress(100);
        },
        onError: (err) => {
            setIsDesigning(false);
            setError(err.message);
        }
    });

    useEffect(() => {
        let interval: NodeJS.Timeout;
        if (isDesigning) {
            setProgress(0);
            setSecondsLeft(20);
            setStageIndex(0);

            interval = setInterval(() => {
                setProgress(prev => {
                    if (prev >= 95) return prev;
                    return prev + (100 / 200); // Approx 20 seconds
                });
                setSecondsLeft(prev => Math.max(0, prev - 0.1));
                setStageIndex(prev => {
                    const newIndex = Math.floor((100 - (secondsLeft / 20 * 100)) / 20);
                    return Math.min(newIndex, DESIGN_STAGES.length - 1);
                });
            }, 100);
        }
        return () => clearInterval(interval);
    }, [isDesigning]);

    const handleDesign = () => {
        setIsDesigning(true);
        setError(null);
        designArchitecture.mutate({ projectId });
    };

    const componentIcons = {
        frontend: '🎨',
        backend: '⚙️',
        database: '💾',
        service: '🔌',
        infrastructure: '🏗️',
    };

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
            {/* Header with Breadcrumbs */}
            <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 py-4 px-6">
                <div className="max-w-7xl mx-auto flex items-center justify-between">
                    <div className="flex items-center gap-3 text-sm">
                        <span className="font-bold text-gray-900 dark:text-white">Thin Air</span>
                        <span className="text-gray-400">/</span>
                        <a href="#vapor" className="text-gray-600 hover:text-blue-600 dark:text-gray-400">Vapour</a>
                        <span className="text-gray-400">/</span>
                        <a href="#condenser" className="text-gray-600 hover:text-blue-600 dark:text-gray-400">Condenser</a>
                        <span className="text-gray-400">/</span>
                        <span className="text-blue-600 font-medium">Mirage</span>
                    </div>
                    <div className="flex items-center gap-4">
                        <span className="text-sm text-gray-600 dark:text-gray-400">Step 3 of 5</span>
                    </div>
                </div>
            </header>

            {/* Progress Bar */}
            <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
                <div className="max-w-7xl mx-auto px-6 py-3">
                    <div className="flex items-center gap-2">
                        <div className="flex-1 h-2 bg-blue-600 rounded-full"></div>
                        <div className="flex-1 h-2 bg-blue-600 rounded-full"></div>
                        <div className="flex-1 h-2 bg-blue-600 rounded-full"></div>
                        <div className="flex-1 h-2 bg-gray-200 dark:bg-gray-700 rounded-full"></div>
                        <div className="flex-1 h-2 bg-gray-200 dark:bg-gray-700 rounded-full"></div>
                    </div>
                    <div className="flex justify-between mt-2 text-xs text-gray-600 dark:text-gray-400">
                        <span>Vapour</span>
                        <span>Condenser</span>
                        <span className="font-semibold text-blue-600 dark:text-blue-400">Mirage</span>
                        <span>Materialiser</span>
                        <span>Manifest</span>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="max-w-6xl mx-auto px-6 py-12">
                {/* Instructions Section */}
                <div className="mb-12 text-center">
                    <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900 dark:text-white">
                        🏗️ Phase 3: Mirage
                    </h2>
                    <p className="text-xl text-gray-700 dark:text-gray-300 mb-6 max-w-3xl mx-auto">
                        AI designs the perfect architecture for your application. Components, technologies, and how they all fit together.
                    </p>

                    {/* Info Card */}
                    <div className="bg-purple-50 dark:bg-purple-900/20 border-2 border-purple-200 dark:border-purple-800 rounded-xl p-6 mb-8 text-left max-w-3xl mx-auto">
                        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
                            <span>🎯</span> What AI Will Design
                        </h3>
                        <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                            <li className="flex items-start gap-2">
                                <span className="text-blue-600 dark:text-blue-400">•</span>
                                <span><strong>Frontend:</strong> UI framework, state management, routing</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="text-blue-600 dark:text-blue-400">•</span>
                                <span><strong>Backend:</strong> API structure, authentication, business logic</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="text-blue-600 dark:text-blue-400">•</span>
                                <span><strong>Database:</strong> Schema design, relationships, indexes</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="text-blue-600 dark:text-blue-400">•</span>
                                <span><strong>Services:</strong> Third-party integrations, APIs, tools</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="text-blue-600 dark:text-blue-400">•</span>
                                <span><strong>Infrastructure:</strong> Hosting, deployment, scaling strategy</span>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Error Message */}
                {error && (
                    <div className="max-w-3xl mx-auto mb-8 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded relative" role="alert">
                        <strong className="font-bold">Error: </strong>
                        <span className="block sm:inline">{error}</span>
                    </div>
                )}

                {/* Design Button & Progress */}
                {!designComplete && (
                    <div className="text-center mb-12">
                        {!isDesigning ? (
                            <button
                                onClick={handleDesign}
                                className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-12 py-4 rounded-lg font-semibold hover:opacity-90 transition-all shadow-lg text-lg"
                            >
                                <span className="flex items-center gap-3">
                                    <span>🏗️</span> Design Architecture
                                </span>
                            </button>
                        ) : (
                            <div className="max-w-md mx-auto">
                                <div className="mb-2 flex justify-between text-sm font-medium text-gray-700 dark:text-gray-300">
                                    <span>{DESIGN_STAGES[stageIndex]}</span>
                                    <span>{Math.round(progress)}%</span>
                                </div>
                                <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700 mb-2">
                                    <div
                                        className="bg-purple-600 h-2.5 rounded-full transition-all duration-300 ease-out"
                                        style={{ width: `${progress}%` }}
                                    ></div>
                                </div>
                                <p className="text-xs text-gray-500 dark:text-gray-400 text-right">
                                    ~{Math.ceil(secondsLeft)}s remaining
                                </p>
                            </div>
                        )}

                        {!isDesigning && (
                            <p className="mt-4 text-sm text-gray-600 dark:text-gray-400">
                                AI will analyse your requirements and design the optimal architecture
                            </p>
                        )}
                    </div>
                )}

                {/* Architecture Display */}
                {architecture.length > 0 && (
                    <div className="mb-12">
                        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                            Architecture Design ({architecture.length} Components)
                        </h3>

                        {/* Group by type */}
                        {['frontend', 'backend', 'database', 'service', 'infrastructure'].map((type) => {
                            const components = architecture.filter(c => c.type === type);
                            if (components.length === 0) return null;

                            return (
                                <div key={type} className="mb-8">
                                    <h4 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4 flex items-center gap-2">
                                        <span className="text-2xl">{componentIcons[type as keyof typeof componentIcons]}</span>
                                        <span className="capitalize">{type}</span>
                                        <span className="text-sm text-gray-500 dark:text-gray-400">({components.length})</span>
                                    </h4>

                                    <div className="grid gap-4 md:grid-cols-2">
                                        {components.map((component, index) => (
                                            <motion.div
                                                key={component.id}
                                                initial={{ opacity: 0, scale: 0.95 }}
                                                animate={{ opacity: 1, scale: 1 }}
                                                transition={{ delay: index * 0.1 }}
                                                className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 p-6 rounded-xl hover:border-purple-300 dark:hover:border-purple-600 transition-all"
                                            >
                                                <h5 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                                                    {component.name}
                                                </h5>
                                                <p className="text-gray-700 dark:text-gray-300 mb-4 text-sm">
                                                    {component.description}
                                                </p>

                                                {/* Technologies */}
                                                {component.technologies.length > 0 && (
                                                    <div className="mb-3">
                                                        <p className="text-xs font-semibold text-gray-600 dark:text-gray-400 mb-2">Technologies:</p>
                                                        <div className="flex flex-wrap gap-2">
                                                            {component.technologies.map((tech, idx) => (
                                                                <span
                                                                    key={idx}
                                                                    className="text-xs px-2 py-1 rounded-full bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300"
                                                                >
                                                                    {tech}
                                                                </span>
                                                            ))}
                                                        </div>
                                                    </div>
                                                )}

                                                {/* Dependencies */}
                                                {component.dependencies.length > 0 && (
                                                    <div>
                                                        <p className="text-xs font-semibold text-gray-600 dark:text-gray-400 mb-2">Depends on:</p>
                                                        <div className="flex flex-wrap gap-2">
                                                            {component.dependencies.map((dep, idx) => (
                                                                <span
                                                                    key={idx}
                                                                    className="text-xs px-2 py-1 rounded-full bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300"
                                                                >
                                                                    {dep}
                                                                </span>
                                                            ))}
                                                        </div>
                                                    </div>
                                                )}
                                            </motion.div>
                                        ))}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}

                {/* Next Steps */}
                {designComplete && (
                    <div className="text-center">
                        <p className="text-gray-600 dark:text-gray-400 mb-4">
                            Architecture designed successfully! Ready to generate the code?
                        </p>
                        <button
                            onClick={() => window.location.hash = 'materialiser'}
                            className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-3 rounded-lg font-semibold hover:opacity-90 transition-all shadow-lg"
                        >
                            Continue to Materialiser →
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}
