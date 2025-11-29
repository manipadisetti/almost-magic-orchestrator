import React from 'react';
import { Badge } from './Badge';

export const Header: React.FC<{
    theme: 'default' | 'high-contrast';
    setTheme: (t: 'default' | 'high-contrast') => void;
    largeText: boolean;
    setLargeText: (b: boolean) => void;
    simplified: boolean;
    setSimplified: (b: boolean) => void;
}> = ({ theme, setTheme, largeText, setLargeText, simplified, setSimplified }) => {
    const toggleTheme = () => setTheme(theme === 'default' ? 'high-contrast' : 'default');
    const toggleLargeText = () => setLargeText(!largeText);
    const toggleSimplified = () => setSimplified(!simplified);

    return (
        <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-800">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <div className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
                        Thin Air
                    </div>
                    <div className="hidden md:flex gap-2">
                        <Badge label="Proprietary Technology" color="blue" />
                        <Badge label="Patent Pending" color="purple" />
                    </div>
                </div>

                <div className="flex items-center gap-3">
                    <button
                        onClick={toggleTheme}
                        aria-label="Toggle high contrast theme"
                        className="px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white rounded text-sm font-medium transition-colors"
                    >
                        {theme === 'high-contrast' ? 'Default' : 'High Contrast'}
                    </button>
                    <button
                        onClick={toggleLargeText}
                        aria-label="Toggle large text"
                        className="px-3 py-1 bg-purple-600 hover:bg-purple-700 text-white rounded text-sm font-medium transition-colors"
                    >
                        {largeText ? 'Normal' : 'Large Text'}
                    </button>
                    <button
                        onClick={toggleSimplified}
                        aria-label="Toggle simplified UI"
                        className="px-3 py-1 bg-green-600 hover:bg-green-700 text-white rounded text-sm font-medium transition-colors"
                    >
                        {simplified ? 'Full' : 'Simplified'}
                    </button>
                </div>
            </div>
        </header>
    );
};
