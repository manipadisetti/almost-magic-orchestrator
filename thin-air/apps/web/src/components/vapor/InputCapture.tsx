import { useState } from 'react';
import { trpc } from '../../utils/trpc';

export function InputCapture({ projectId }: { projectId: string }) {
    const [content, setContent] = useState('');
    const [inputType, setInputType] = useState<'text' | 'voice' | 'image' | 'pdf'>('text');
    const [isRecording, setIsRecording] = useState(false);

    const utils = trpc.useContext();
    const createVapor = trpc.vapor.create.useMutation({
        onSuccess: () => {
            setContent('');
            utils.vapor.list.invalidate();
        },
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!content.trim()) return;

        createVapor.mutate({
            projectId,
            content,
            inputType,
        });
    };

    const toggleRecording = () => {
        if (isRecording) {
            // Stop recording (Simulated)
            setIsRecording(false);
            setContent("Simulated voice transcription: I want to build a CRM for dentists.");
            setInputType('voice');
        } else {
            setIsRecording(true);
            setContent("Listening...");
        }
    };

    return (
        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 p-8 rounded-xl shadow-sm">
            <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">
                Share Your Requirements
            </h2>

            {/* Input Type Tabs */}
            <div className="flex gap-3 mb-6 border-b border-gray-200 dark:border-gray-700">
                <button
                    onClick={() => setInputType('text')}
                    aria-label="Select Text Input Mode"
                    className={`px-6 py-3 font-semibold transition-all border-b-2 ${inputType === 'text'
                        ? 'border-blue-600 text-blue-600 dark:text-blue-400'
                        : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
                        }`}
                >
                    ✍️ Text
                </button>
                <button
                    onClick={() => setInputType('voice')}
                    aria-label="Select Voice Input Mode"
                    className={`px-6 py-3 font-semibold transition-all border-b-2 ${inputType === 'voice'
                        ? 'border-blue-600 text-blue-600 dark:text-blue-400'
                        : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
                        }`}
                >
                    🎙️ Voice
                </button>
                <button
                    onClick={() => setInputType('image')}
                    aria-label="Select Image Input Mode"
                    className={`px-6 py-3 font-semibold transition-all border-b-2 ${inputType === 'image'
                        ? 'border-blue-600 text-blue-600 dark:text-blue-400'
                        : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
                        }`}
                >
                    🖼️ Image
                </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
                {inputType === 'voice' && (
                    <div className="flex flex-col items-center py-12 bg-gray-50 dark:bg-gray-900/50 rounded-lg">
                        <button
                            type="button"
                            onClick={toggleRecording}
                            aria-label={isRecording ? "Stop Recording" : "Start Recording"}
                            className={`w-20 h-20 rounded-full flex items-center justify-center text-3xl transition-all shadow-lg ${isRecording
                                ? 'bg-red-500 hover:bg-red-600 animate-pulse'
                                : 'bg-blue-600 hover:bg-blue-700'
                                }`}
                        >
                            {isRecording ? '⏹️' : '🎙️'}
                        </button>
                        <p className="mt-4 text-sm text-gray-600 dark:text-gray-400">
                            {isRecording ? 'Recording... Click to stop' : 'Click to start recording'}
                        </p>
                    </div>
                )}

                <div>
                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                        {inputType === 'voice' ? 'Transcription' :
                            inputType === 'image' ? 'Image Description' :
                                'Your Requirements'}
                    </label>
                    <textarea
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        className="w-full h-40 bg-gray-50 dark:bg-gray-900 border border-gray-300 dark:border-gray-600 rounded-lg p-4 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none"
                        placeholder={
                            inputType === 'voice' ? "Transcription will appear here..." :
                                inputType === 'image' ? "Describe what you see in the image..." :
                                    "Example: I need a CRM for my dental practice. It should track patient appointments, send reminders, and manage billing..."
                        }
                    />
                    <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">
                        Don't worry about being perfect. Just share your thoughts naturally.
                    </p>
                </div>

                <div className="flex justify-between items-center pt-4 border-t border-gray-200 dark:border-gray-700">
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                        {content.length} characters
                    </div>
                    <button
                        type="submit"
                        disabled={createVapor.isLoading || !content.trim()}
                        aria-label="Capture Input"
                        className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-3 rounded-lg font-semibold hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg"
                    >
                        {createVapor.isLoading ? (
                            <span className="flex items-center gap-2">
                                <span className="animate-spin">⏳</span> Processing...
                            </span>
                        ) : (
                            'Capture Input'
                        )}
                    </button>
                </div>
            </form>

            {createVapor.error && (
                <div className="mt-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-300 rounded-lg">
                    <p className="font-semibold">Error</p>
                    <p className="text-sm mt-1">{createVapor.error.message}</p>
                </div>
            )}

            {createVapor.isSuccess && (
                <div className="mt-6 p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 text-green-700 dark:text-green-300 rounded-lg">
                    <p className="font-semibold">✓ Input captured successfully!</p>
                    <p className="text-sm mt-1">Your requirements have been saved. Add more or continue to the next phase.</p>
                </div>
            )}
        </div>
    );
}
