import { useState, useEffect } from 'react';
import { trpc } from '../utils/trpc';
import { motion } from 'framer-motion';

const DEMO_PROJECT_ID = "00000000-0000-0000-0000-000000000000";

interface GeneratedFile {
    path: string;
    content: string;
    language: string;
}

const GENERATION_STAGES = [
    "Analysing architecture...",
    "Generating frontend components...",
    "Creating backend services...",
    "Writing database schema...",
    "Configuring infrastructure...",
    "Finalising codebase..."
];

export function MaterialiserPage() {
    const projectId = DEMO_PROJECT_ID;
    const [isGenerating, setIsGenerating] = useState(false);
    const [files, setFiles] = useState<GeneratedFile[]>([]);
    const [generationComplete, setGenerationComplete] = useState(false);
    const [selectedFile, setSelectedFile] = useState<GeneratedFile | null>(null);
    const [progress, setProgress] = useState(0);
    const [stageIndex, setStageIndex] = useState(0);
    const [secondsLeft, setSecondsLeft] = useState(45);
    const [error, setError] = useState<string | null>(null);

    const generateCode = trpc.materialiser.generate.useMutation({
        onSuccess: (data) => {
            setFiles(data.files);
            setGenerationComplete(true);
            setIsGenerating(false);
            setProgress(100);
            if (data.files.length > 0) {
                setSelectedFile(data.files[0]);
            }
        },
        onError: (err) => {
            setIsGenerating(false);
            setError(err.message);
        }
    });

    useEffect(() => {
        let interval: NodeJS.Timeout;
        if (isGenerating) {
            setProgress(0);
            setSecondsLeft(45);
            setStageIndex(0);

            interval = setInterval(() => {
                setProgress(prev => {
                    if (prev >= 95) return prev;
                    return prev + (100 / 450); // Approx 45 seconds
                });
                setSecondsLeft(prev => Math.max(0, prev - 0.1));
                setStageIndex(prev => {
                    const newIndex = Math.floor((100 - (secondsLeft / 45 * 100)) / 16);
                    return Math.min(newIndex, GENERATION_STAGES.length - 1);
                });
            }, 100);
        }
        return () => clearInterval(interval);
    }, [isGenerating]);

    const handleGenerate = () => {
        setIsGenerating(true);
        setError(null);
        generateCode.mutate({ projectId });
    };

    const downloadAll = () => {
        files.forEach(file => {
            const blob = new Blob([file.content], { type: 'text/plain' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = file.path;
            a.click();
            URL.revokeObjectURL(url);
        });
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
                        <a href="#mirage" className="text-gray-600 hover:text-blue-600 dark:text-gray-400">Mirage</a>
                        <span className="text-gray-400">/</span>
                        <span className="text-blue-600 font-medium">Materialiser</span>
                    </div>
                    <div className="flex items-center gap-4">
                        <span className="text-sm text-gray-600 dark:text-gray-400">Step 4 of 5</span>
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
                        <div className="flex-1 h-2 bg-blue-600 rounded-full"></div>
                        <div className="flex-1 h-2 bg-gray-200 dark:bg-gray-700 rounded-full"></div>
                    </div>
                    <div className="flex justify-between mt-2 text-xs text-gray-600 dark:text-gray-400">
                        <span>Vapour</span>
                        <span>Condenser</span>
                        <span>Mirage</span>
                        <span className="font-semibold text-blue-600 dark:text-blue-400">Materialiser</span>
                        <span>Manifest</span>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="max-w-7xl mx-auto px-6 py-12">
                {/* Instructions Section */}
                <div className="mb-12 text-center">
                    <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900 dark:text-white">
                        ⚡ Phase 4: Materialiser
                    </h2>
                    <p className="text-xl text-gray-700 dark:text-gray-300 mb-6 max-w-3xl mx-auto">
                        AI generates production-ready code for your entire application. From frontend to backend, database to deployment configs.
                    </p>

                    {/* Info Card */}
                    <div className="bg-green-50 dark:bg-green-900/20 border-2 border-green-200 dark:border-green-800 rounded-xl p-6 mb-8 text-left max-w-3xl mx-auto">
                        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
                            <span>✨</span> What AI Will Generate
                        </h3>
                        <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                            <li className="flex items-start gap-2">
                                <span className="text-green-600 dark:text-green-400">•</span>
                                <span><strong>Frontend Code:</strong> React components, pages, routing, state management</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="text-green-600 dark:text-green-400">•</span>
                                <span><strong>Backend Code:</strong> API routes, controllers, middleware, validation</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="text-green-600 dark:text-green-400">•</span>
                                <span><strong>Database:</strong> Schema files, migrations, seed data</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="text-green-600 dark:text-green-400">•</span>
                                <span><strong>Configuration:</strong> package.json, tsconfig, env files, Docker</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="text-green-600 dark:text-green-400">•</span>
                                <span><strong>Tests:</strong> Unit tests, integration tests, E2E tests</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="text-green-600 dark:text-green-400">•</span>
                                <span><strong>Documentation:</strong> README, API docs, deployment guide</span>
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

                {/* Generate Button & Progress */}
                {!generationComplete && (
                    <div className="text-center mb-12">
                        {!isGenerating ? (
                            <button
                                onClick={handleGenerate}
                                className="bg-gradient-to-r from-green-600 to-emerald-600 text-white px-12 py-4 rounded-lg font-semibold hover:opacity-90 transition-all shadow-lg text-lg"
                            >
                                <span className="flex items-center gap-3">
                                    <span>⚡</span> Generate Application Code
                                </span>
                            </button>
                        ) : (
                            <div className="max-w-md mx-auto">
                                <div className="mb-2 flex justify-between text-sm font-medium text-gray-700 dark:text-gray-300">
                                    <span>{GENERATION_STAGES[stageIndex]}</span>
                                    <span>{Math.round(progress)}%</span>
                                </div>
                                <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700 mb-2">
                                    <div
                                        className="bg-green-600 h-2.5 rounded-full transition-all duration-300 ease-out"
                                        style={{ width: `${progress}%` }}
                                    ></div>
                                </div>
                                <p className="text-xs text-gray-500 dark:text-gray-400 text-right">
                                    ~{Math.ceil(secondsLeft)}s remaining
                                </p>
                            </div>
                        )}

                        {!isGenerating && (
                            <p className="mt-4 text-sm text-gray-600 dark:text-gray-400">
                                This may take 45-60 seconds. AI is writing production-ready code for your entire application.
                            </p>
                        )}
                    </div>
                )}

                {/* Code Display */}
                {files.length > 0 && (
                    <div className="mb-12">
                        <div className="flex items-center justify-between mb-6">
                            <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                                Generated Files ({files.length})
                            </h3>
                            <button
                                onClick={downloadAll}
                                className="bg-blue-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-blue-700 transition-all flex items-center gap-2"
                            >
                                <span>📥</span> Download All
                            </button>
                        </div>

                        <div className="grid grid-cols-12 gap-6">
                            {/* File List */}
                            <div className="col-span-12 md:col-span-4 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-4 max-h-[600px] overflow-y-auto">
                                <h4 className="font-semibold text-gray-900 dark:text-white mb-4">Files</h4>
                                <div className="space-y-1">
                                    {files.map((file, index) => (
                                        <button
                                            key={index}
                                            onClick={() => setSelectedFile(file)}
                                            className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-all ${selectedFile?.path === file.path
                                                ? 'bg-blue-100 dark:bg-blue-900 text-blue-900 dark:text-blue-100 font-semibold'
                                                : 'hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300'
                                                }`}
                                        >
                                            {file.path}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Code Viewer */}
                            <div className="col-span-12 md:col-span-8 bg-gray-900 border border-gray-700 rounded-xl overflow-hidden">
                                {selectedFile ? (
                                    <>
                                        <div className="bg-gray-800 px-4 py-3 border-b border-gray-700 flex items-center justify-between">
                                            <span className="text-gray-300 font-mono text-sm">{selectedFile.path}</span>
                                            <span className="text-xs px-2 py-1 rounded bg-gray-700 text-gray-300">{selectedFile.language}</span>
                                        </div>
                                        <pre className="p-4 overflow-x-auto max-h-[550px] overflow-y-auto">
                                            <code className="text-gray-100 font-mono text-sm">{selectedFile.content}</code>
                                        </pre>
                                    </>
                                ) : (
                                    <div className="p-8 text-center text-gray-500">
                                        Select a file to view its contents
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                )}

                {/* Next Steps */}
                {generationComplete && (
                    <div className="text-center">
                        <p className="text-gray-600 dark:text-gray-400 mb-4">
                            Code generated successfully! Ready to deploy your application?
                        </p>
                        <button
                            onClick={() => window.location.hash = 'manifest'}
                            className="bg-gradient-to-r from-green-600 to-emerald-600 text-white px-8 py-3 rounded-lg font-semibold hover:opacity-90 transition-all shadow-lg"
                        >
                            Continue to Manifest →
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}
