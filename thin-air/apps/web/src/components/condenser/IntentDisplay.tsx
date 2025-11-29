import { ExtractedIntent } from '../components/condenser/IntentDisplay';

export interface IntentDisplayProps {
    intent: ExtractedIntent;
    onRefine?: () => void;
    onProceed?: () => void;
}

export function IntentDisplay({ intent, onRefine, onProceed }: IntentDisplayProps) {
    const complexityColours = {
        low: 'bg-green-900 text-green-300 border-green-700',
        medium: 'bg-yellow-900 text-yellow-300 border-yellow-700',
        high: 'bg-red-900 text-red-300 border-red-700',
    };

    return (
        <div className="bg-gray-900 p-6 rounded-xl border border-gray-800 space-y-6">
            <div className="flex justify-between items-start">
                <div>
                    <h2 className="text-2xl font-bold text-white mb-2">{intent.appType}</h2>
                    <p className="text-gray-400">{intent.description}</p>
                </div>
                <span className={`px-3 py-1 rounded-lg border ${complexityColours[intent.complexity]}`}>
                    {intent.complexity.toUpperCase()} COMPLEXITY
                </span>
            </div>

            {/* Features */}
            <div>
                <h3 className="text-lg font-semibold text-gray-200 mb-3">Core Features</h3>
                <div className="grid grid-cols-2 gap-2">
                    {intent.features.map((feature, idx) => (
                        <div key={idx} className="flex items-center gap-2 text-gray-300">
                            <span className="text-green-400">✓</span>
                            <span>{feature}</span>
                        </div>
                    ))}
                </div>
            </div>

            {/* Tech Stack */}
            <div>
                <h3 className="text-lg font-semibold text-gray-200 mb-3">Suggested Tech Stack</h3>
                <div className="space-y-2">
                    <div>
                        <span className="text-sm text-gray-400">Frontend:</span>
                        <div className="flex flex-wrap gap-2 mt-1">
                            {intent.techStack.frontend.map((tech, idx) => (
                                <span key={idx} className="px-2 py-1 bg-blue-900/50 text-blue-300 rounded text-sm">
                                    {tech}
                                </span>
                            ))}
                        </div>
                    </div>
                    <div>
                        <span className="text-sm text-gray-400">Backend:</span>
                        <div className="flex flex-wrap gap-2 mt-1">
                            {intent.techStack.backend.map((tech, idx) => (
                                <span key={idx} className="px-2 py-1 bg-purple-900/50 text-purple-300 rounded text-sm">
                                    {tech}
                                </span>
                            ))}
                        </div>
                    </div>
                    <div>
                        <span className="text-sm text-gray-400">Database:</span>
                        <div className="flex flex-wrap gap-2 mt-1">
                            <span className="px-2 py-1 bg-green-900/50 text-green-300 rounded text-sm">
                                {intent.techStack.database}
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Credits & Confidence */}
            <div className="grid grid-cols-2 gap-4">
                <div className="bg-gray-800/50 p-4 rounded-lg">
                    <div className="text-sm text-gray-400 mb-1">Estimated Credits</div>
                    <div className="text-2xl font-bold text-white">{intent.estimatedCredits}</div>
                    <div className="text-xs text-gray-500 mt-1">≈ ${intent.estimatedCredits * 9} AUD</div>
                </div>
                <div className="bg-gray-800/50 p-4 rounded-lg">
                    <div className="text-sm text-gray-400 mb-1">Confidence</div>
                    <div className="text-2xl font-bold text-white">{intent.confidence}%</div>
                    <div className="w-full bg-gray-700 rounded-full h-2 mt-2">
                        <div
                            className="bg-gradient-to-r from-blue-500 to-purple-600 h-2 rounded-full transition-all"
                            style={{ width: `${intent.confidence}%` }}
                        />
                    </div>
                </div>
            </div>

            {/* Actions */}
            {(onRefine || onProceed) && (
                <div className="flex gap-4 pt-4 border-t border-gray-800">
                    {onRefine && (
                        <button
                            onClick={onRefine}
                            className="flex-1 px-6 py-3 bg-gray-800 hover:bg-gray-700 text-white rounded-lg font-medium transition-all"
                        >
                            Refine Intent
                        </button>
                    )}
                    {onProceed && (
                        <button
                            onClick={onProceed}
                            className="flex-1 px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 hover:opacity-90 text-white rounded-lg font-medium transition-all"
                        >
                            Looks Good →
                        </button>
                    )}
                </div>
            )}
        </div>
    );
}
