import { useState } from 'react';
import { trpc } from '../utils/trpc';
import { InputCapture } from '../components/vapor/InputCapture';

// Hardcoded project ID for Phase 1 (we'll implement project creation later)
const DEMO_PROJECT_ID = "00000000-0000-0000-0000-000000000000";

export function VaporPage() {
    // In a real app, we'd get this from the URL or context
    const projectId = DEMO_PROJECT_ID;

    const { data: inputs, isLoading } = trpc.vapor.list.useQuery({ projectId });

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
            {/* Header matching marketing site */}
            <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 py-4 px-6">
                <div className="max-w-7xl mx-auto flex items-center justify-between">
                    <div className="flex items-center gap-3 text-sm">
                        <span className="font-bold text-gray-900 dark:text-white">Thin Air</span>
                        <span className="text-gray-400">/</span>
                        <span className="text-blue-600 font-medium">Vapour</span>
                    </div>
                    <div className="flex items-center gap-4">
                        <span className="text-sm text-gray-600 dark:text-gray-400">Step 1 of 5</span>
                    </div>
                </div>
            </header>

            {/* Progress Bar */}
            <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
                <div className="max-w-7xl mx-auto px-6 py-3">
                    <div className="flex items-center gap-2">
                        <div className="flex-1 h-2 bg-blue-600 rounded-full"></div>
                        <div className="flex-1 h-2 bg-gray-200 dark:bg-gray-700 rounded-full"></div>
                        <div className="flex-1 h-2 bg-gray-200 dark:bg-gray-700 rounded-full"></div>
                        <div className="flex-1 h-2 bg-gray-200 dark:bg-gray-700 rounded-full"></div>
                        <div className="flex-1 h-2 bg-gray-200 dark:bg-gray-700 rounded-full"></div>
                    </div>
                    <div className="flex justify-between mt-2 text-xs text-gray-600 dark:text-gray-400">
                        <span className="font-semibold text-blue-600 dark:text-blue-400">Vapour</span>
                        <span>Condenser</span>
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
                        💭 Phase 1: Vapour
                    </h2>
                    <p className="text-xl text-gray-700 dark:text-gray-300 mb-6 max-w-3xl mx-auto">
                        Capture your idea however it comes out. Don't worry about being perfect—just share your thoughts.
                    </p>

                    {/* Helpful Tips */}
                    <div className="bg-blue-50 dark:bg-blue-900/20 border-2 border-blue-200 dark:border-blue-800 rounded-xl p-6 mb-8 text-left max-w-3xl mx-auto">
                        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
                            <span>💡</span> How to share your requirements:
                        </h3>
                        <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                            <li className="flex items-start gap-2">
                                <span className="text-blue-600 dark:text-blue-400 font-bold">•</span>
                                <span><strong>Type</strong> your ideas in the text box below</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="text-blue-600 dark:text-blue-400 font-bold">•</span>
                                <span><strong>Record voice notes</strong> by clicking the Voice button</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="text-blue-600 dark:text-blue-400 font-bold">•</span>
                                <span><strong>Upload images</strong> of sketches or wireframes</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="text-blue-600 dark:text-blue-400 font-bold">•</span>
                                <span><strong>Drag and drop PDFs</strong> with specifications or requirements</span>
                            </li>
                        </ul>
                        <p className="mt-4 text-sm text-gray-600 dark:text-gray-400 italic">
                            Don't worry about structure or completeness. We'll help you refine everything in the next steps.
                        </p>
                    </div>
                </div>

                {/* Input Capture Component */}
                <InputCapture projectId={projectId} />

                {/* Captured Inputs Section */}
                {inputs && inputs.length > 0 && (
                    <div className="mt-12">
                        <div className="flex items-center justify-between mb-6">
                            <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                                Your Captured Inputs ({inputs.length})
                            </h3>
                            <button
                                className="text-sm text-blue-600 dark:text-blue-400 hover:underline"
                                aria-label="Clear all captured inputs"
                            >
                                Clear all
                            </button>
                        </div>

                        {isLoading ? (
                            <div className="text-gray-500 dark:text-gray-400 text-center py-8">Loading inputs...</div>
                        ) : (
                            <div className="grid gap-4">
                                {inputs.map((input) => (
                                    <div key={input.id} className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 p-6 rounded-xl hover:border-blue-300 dark:hover:border-blue-600 transition-all">
                                        <div className="flex justify-between items-start mb-3">
                                            <span className={`text-xs px-3 py-1 rounded-full font-semibold uppercase ${input.type === 'voice' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300' :
                                                input.type === 'pdf' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300' :
                                                    input.type === 'image' ? 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300' :
                                                        'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300'
                                                }`}>
                                                {input.type === 'voice' ? '🎙️ Voice' :
                                                    input.type === 'pdf' ? '📄 PDF' :
                                                        input.type === 'image' ? '🖼️ Image' :
                                                            '✍️ Text'}
                                            </span>
                                            <span className="text-xs text-gray-500 dark:text-gray-400">
                                                {new Date(input.createdAt).toLocaleString()}
                                            </span>
                                        </div>
                                        <p className="text-gray-700 dark:text-gray-300 whitespace-pre-wrap leading-relaxed">
                                            {input.content}
                                        </p>
                                        {input.processed && (
                                            <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                                                <p className="text-sm text-purple-600 dark:text-purple-400 font-mono">
                                                    ✓ Processed: {JSON.stringify(input.metadata)}
                                                </p>
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                )}

                {/* Next Steps */}
                {inputs && inputs.length > 0 && (
                    <div className="mt-12 text-center">
                        <p className="text-gray-600 dark:text-gray-400 mb-4">
                            Ready to move to the next phase?
                        </p>
                        <button
                            onClick={() => window.location.hash = 'condenser'}
                            className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-3 rounded-lg font-semibold hover:opacity-90 transition-all shadow-lg"
                            aria-label="Continue to Phase 2: Condenser"
                        >
                            Continue to Condenser →
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}
