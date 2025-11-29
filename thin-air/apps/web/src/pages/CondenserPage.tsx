import { useState, useEffect } from 'react';
import { trpc } from '../utils/trpc';
import { motion } from 'framer-motion';

const DEMO_PROJECT_ID = "00000000-0000-0000-0000-000000000000";

interface Requirement {
    id: string;
    category: string;
    description: string;
    priority: 'high' | 'medium' | 'low';
    confidence: number;
}

const ANALYSIS_STAGES = [
    "Reading inputs...",
    "Identifying intents...",
    "Extracting features...",
    "Structuring requirements...",
    "Finalising analysis..."
];

export function CondenserPage() {
    const projectId = DEMO_PROJECT_ID;
    const [isAnalysing, setIsAnalysing] = useState(false);
    const [requirements, setRequirements] = useState<Requirement[]>([]);
    const [analysisComplete, setAnalysisComplete] = useState(false);
    const [progress, setProgress] = useState(0);
    const [stageIndex, setStageIndex] = useState(0);
    const [secondsLeft, setSecondsLeft] = useState(15);
    const [error, setError] = useState<string | null>(null);

    const { data: inputs } = trpc.vapor.list.useQuery({ projectId });
    const analyzeRequirements = trpc.condenser.analyze.useMutation({
        onSuccess: (data) => {
            setRequirements(data.requirements);
            setAnalysisComplete(true);
            setIsAnalysing(false);
            setProgress(100);
        },
        onError: (err) => {
            setIsAnalysing(false);
            setError(err.message);
        }
    });

    useEffect(() => {
        let interval: NodeJS.Timeout;
        if (isAnalysing) {
            setProgress(0);
            setSecondsLeft(15);
            setStageIndex(0);

            interval = setInterval(() => {
                setProgress(prev => {
                    if (prev >= 95) return prev;
                    return prev + (100 / 150); // Approx 15 seconds to reach 100%
                });
                setSecondsLeft(prev => Math.max(0, prev - 0.1));
                setStageIndex(prev => {
                    const newIndex = Math.floor((100 - (secondsLeft / 15 * 100)) / 20);
                    return Math.min(newIndex, ANALYSIS_STAGES.length - 1);
                });
            }, 100);
        }
        return () => clearInterval(interval);
    }, [isAnalysing]);

    const handleAnalyse = () => {
        setIsAnalysing(true);
        setError(null);
        analyzeRequirements.mutate({ projectId });
    };

    const totalInputs = inputs?.length || 0;

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
                        <span className="text-blue-600 font-medium">Condenser</span>
                    </div>
                    <div className="flex items-center gap-4">
                        <span className="text-sm text-gray-600 dark:text-gray-400">Step 2 of 5</span>
                    </div>
                </div>
            </header>

            {/* Progress Bar */}
            <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
                <div className="max-w-7xl mx-auto px-6 py-3">
                    <div className="flex items-center gap-2">
                        <div className="flex-1 h-2 bg-blue-600 rounded-full"></div>
                        <div className="flex-1 h-2 bg-blue-600 rounded-full"></div>
                        <div className="flex-1 h-2 bg-gray-200 dark:bg-gray-700 rounded-full"></div>
                        <div className="flex-1 h-2 bg-gray-200 dark:bg-gray-700 rounded-full"></div>
                        <div className="flex-1 h-2 bg-gray-200 dark:bg-gray-700 rounded-full"></div>
                    </div>
                    <div className="flex justify-between mt-2 text-xs text-gray-600 dark:text-gray-400">
                        <span>Vapour</span>
                        <span className="font-semibold text-blue-600 dark:text-blue-400">Condenser</span>
                        <span>Mirage</span>
                        <span>Materialiser</span>
                        <span>Manifest</span>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="max-w-5xl mx-auto px-6 py-12">
                {/* Instructions Section */}
                <div className="mb-12 text-center">
                    <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900 dark:text-white">
                        🧪 Phase 2: Condenser
                    </h2>
                    <p className="text-xl text-gray-700 dark:text-gray-300 mb-6 max-w-3xl mx-auto">
                        AI analyses your inputs and extracts structured requirements. This is where the magic begins.
                    </p>

                    {/* Status Card */}
                    <div className="bg-blue-50 dark:bg-blue-900/20 border-2 border-blue-200 dark:border-blue-800 rounded-xl p-6 mb-8 text-left max-w-3xl mx-auto">
                        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
                            <span>📊</span> Analysis Status
                        </h3>
                        <div className="space-y-2 text-gray-700 dark:text-gray-300">
                            <div className="flex justify-between items-center">
                                <span>Inputs captured:</span>
                                <span className="font-bold text-blue-600 dark:text-blue-400">{totalInputs}</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span>Requirements extracted:</span>
                                <span className="font-bold text-blue-600 dark:text-blue-400">{requirements.length}</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span>Analysis status:</span>
                                <span className={`font-bold ${analysisComplete ? 'text-green-600 dark:text-green-400' : 'text-gray-600 dark:text-gray-400'}`}>
                                    {analysisComplete ? '✓ Complete' : 'Pending'}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Error Message */}
                {error && (
                    <div className="max-w-3xl mx-auto mb-8 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded relative" role="alert">
                        <strong className="font-bold">Error: </strong>
                        <span className="block sm:inline">{error}</span>
                    </div>
                )}

                {/* Analyse Button & Progress */}
                {!analysisComplete && totalInputs > 0 && (
                    <div className="text-center mb-12">
                        {!isAnalysing ? (
                            <button
                                onClick={handleAnalyse}
                                className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-12 py-4 rounded-lg font-semibold hover:opacity-90 transition-all shadow-lg text-lg"
                            >
                                <span className="flex items-center gap-3">
                                    <span>🧪</span> Start Analysis
                                </span>
                            </button>
                        ) : (
                            <div className="max-w-md mx-auto">
                                <div className="mb-2 flex justify-between text-sm font-medium text-gray-700 dark:text-gray-300">
                                    <span>{ANALYSIS_STAGES[stageIndex]}</span>
                                    <span>{Math.round(progress)}%</span>
                                </div>
                                <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700 mb-2">
                                    <div
                                        className="bg-blue-600 h-2.5 rounded-full transition-all duration-300 ease-out"
                                        style={{ width: `${progress}%` }}
                                    ></div>
                                </div>
                                <p className="text-xs text-gray-500 dark:text-gray-400 text-right">
                                    ~{Math.ceil(secondsLeft)}s remaining
                                </p>
                            </div>
                        )}

                        {!isAnalysing && (
                            <p className="mt-4 text-sm text-gray-600 dark:text-gray-400">
                                AI will analyse your {totalInputs} input{totalInputs !== 1 ? 's' : ''} and extract structured requirements
                            </p>
                        )}
                    </div>
                )}

                {/* Requirements Display */}
                {requirements.length > 0 && (
                    <div className="mb-12">
                        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                            Extracted Requirements ({requirements.length})
                        </h3>

                        <div className="grid gap-4">
                            {requirements.map((req, index) => (
                                <motion.div
                                    key={req.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.1 }}
                                    className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 p-6 rounded-xl hover:border-blue-300 dark:hover:border-blue-600 transition-all"
                                >
                                    <div className="flex items-start justify-between mb-3">
                                        <div className="flex items-center gap-3">
                                            <span className="text-2xl">
                                                {req.category === 'feature' ? '⚡' :
                                                    req.category === 'technical' ? '🔧' :
                                                        req.category === 'design' ? '🎨' :
                                                            req.category === 'business' ? '💼' : '📋'}
                                            </span>
                                            <div>
                                                <span className="text-xs px-3 py-1 rounded-full font-semibold uppercase bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300">
                                                    {req.category}
                                                </span>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <span className={`text-xs px-3 py-1 rounded-full font-semibold uppercase ${req.priority === 'high' ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300' :
                                                req.priority === 'medium' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300' :
                                                    'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300'
                                                }`}>
                                                {req.priority}
                                            </span>
                                            <span className="text-xs text-gray-500 dark:text-gray-400">
                                                {Math.round(req.confidence * 100)}% confident
                                            </span>
                                        </div>
                                    </div>
                                    <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                                        {req.description}
                                    </p>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Next Steps */}
                {analysisComplete && (
                    <div className="text-center">
                        <p className="text-gray-600 dark:text-gray-400 mb-4">
                            Requirements extracted successfully! Ready to design the architecture?
                        </p>
                        <button
                            onClick={() => window.location.hash = 'mirage'}
                            className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-3 rounded-lg font-semibold hover:opacity-90 transition-all shadow-lg"
                        >
                            Continue to Mirage →
                        </button>
                    </div>
                )}

                {/* No Inputs Warning */}
                {totalInputs === 0 && (
                    <div className="bg-yellow-50 dark:bg-yellow-900/20 border-2 border-yellow-200 dark:border-yellow-800 rounded-xl p-6 text-center">
                        <p className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                            No inputs to analyse
                        </p>
                        <p className="text-gray-700 dark:text-gray-300 mb-4">
                            Go back to Vapour and capture your requirements first.
                        </p>
                        <button
                            onClick={() => window.location.hash = 'vapor'}
                            className="bg-blue-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-blue-700 transition-all"
                        >
                            ← Back to Vapour
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}
