import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export function LiquidAudio() {
    const [isConnected, setIsConnected] = useState(false);
    const [isExpanded, setIsExpanded] = useState(false);
    const [participants, setParticipants] = useState([
        { id: 1, name: 'You', speaking: false },
        { id: 2, name: 'AI Architect', speaking: false },
        { id: 3, name: 'System', speaking: false },
    ]);

    // Simulate speaking activity
    useEffect(() => {
        if (!isConnected) return;

        const interval = setInterval(() => {
            setParticipants(prev => prev.map(p => ({
                ...p,
                speaking: Math.random() > 0.7
            })));
        }, 500);

        return () => clearInterval(interval);
    }, [isConnected]);

    return (
        <div className="fixed bottom-6 right-6 z-50">
            <AnimatePresence>
                {isExpanded && (
                    <motion.div
                        initial={{ opacity: 0, y: 20, scale: 0.9 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 20, scale: 0.9 }}
                        className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-700 p-4 mb-4 w-72"
                    >
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="font-bold text-gray-900 dark:text-white flex items-center gap-2">
                                <span className="text-blue-500">💧</span> Liquid Audio
                            </h3>
                            <div className="flex items-center gap-2">
                                <span className={`w-2 h-2 rounded-full ${isConnected ? 'bg-green-500 animate-pulse' : 'bg-gray-400'}`}></span>
                                <span className="text-xs text-gray-500">{isConnected ? 'Live' : 'Offline'}</span>
                            </div>
                        </div>

                        <div className="space-y-3">
                            {participants.map(p => (
                                <div key={p.id} className="flex items-center justify-between">
                                    <div className="flex items-center gap-2">
                                        <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${p.speaking ? 'bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-300 ring-2 ring-blue-500' : 'bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-300'}`}>
                                            {p.name[0]}
                                        </div>
                                        <span className="text-sm text-gray-700 dark:text-gray-300">{p.name}</span>
                                    </div>
                                    {isConnected && p.speaking && (
                                        <div className="flex gap-0.5 items-end h-4">
                                            <motion.div animate={{ height: [4, 12, 4] }} transition={{ repeat: Infinity, duration: 0.5 }} className="w-1 bg-blue-500 rounded-full" />
                                            <motion.div animate={{ height: [4, 16, 4] }} transition={{ repeat: Infinity, duration: 0.4 }} className="w-1 bg-blue-500 rounded-full" />
                                            <motion.div animate={{ height: [4, 10, 4] }} transition={{ repeat: Infinity, duration: 0.6 }} className="w-1 bg-blue-500 rounded-full" />
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>

                        <div className="mt-4 pt-4 border-t border-gray-100 dark:border-gray-700">
                            <button
                                onClick={() => setIsConnected(!isConnected)}
                                className={`w-full py-2 rounded-lg text-sm font-semibold transition-colors ${isConnected
                                    ? 'bg-red-100 text-red-600 hover:bg-red-200 dark:bg-red-900/30 dark:text-red-400'
                                    : 'bg-blue-600 text-white hover:bg-blue-700'
                                    }`}
                            >
                                {isConnected ? 'Disconnect Audio' : 'Join Voice Channel'}
                            </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="bg-white dark:bg-gray-800 p-3 rounded-full shadow-lg border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-all hover:scale-105 active:scale-95 group"
                aria-label="Toggle Liquid Audio"
            >
                <div className="relative">
                    <span className="text-2xl group-hover:scale-110 transition-transform block">💧</span>
                    {isConnected && (
                        <span className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-white dark:border-gray-800 animate-pulse"></span>
                    )}
                </div>
            </button>
        </div>
    );
}
