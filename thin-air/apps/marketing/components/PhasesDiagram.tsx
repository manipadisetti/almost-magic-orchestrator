export default function PhasesDiagram() {
    const phases = [
        { name: 'Vapour', icon: <img src="/human_style_icons.png" alt="Vapour" className="h-8 w-8" />, description: 'Capture your idea' },
        { name: 'Condenser', icon: <img src="/human_style_icons.png" alt="Condenser" className="h-8 w-8" />, description: 'Build the blueprint' },
        { name: 'Mirage', icon: <img src="/human_style_icons.png" alt="Mirage" className="h-8 w-8" />, description: 'Visualise your system' },
        { name: 'Materialiser', icon: <img src="/human_style_icons.png" alt="Materialiser" className="h-8 w-8" />, description: 'We build it' },
        { name: 'Manifest', icon: <img src="/human_style_icons.png" alt="Manifest" className="h-8 w-8" />, description: 'Deploy & download' },
        { name: 'Mirage', icon: '👁️', description: 'Visualise your system' },
        { name: 'Materialiser', icon: '⚙️', description: 'We build it' },
        { name: 'Manifest', icon: '🚀', description: 'Deploy & download' },
    ]

    return (
        <div className="max-w-5xl mx-auto">
            <h3 className="text-2xl font-semibold text-gray-300 mb-8">Five Phases. Complete Ownership.</h3>

            <div className="relative">
                {/* Connection Line */}
                <div className="absolute top-1/2 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 -translate-y-1/2 hidden md:block" />

                {/* Phases */}
                <div className="grid grid-cols-1 md:grid-cols-5 gap-6 relative">
                    {phases.map((phase, idx) => (
                        <div key={idx} className="relative">
                            <div className="bg-gray-900 border border-gray-800 rounded-xl p-6 hover:border-purple-500 transition-all group">
                                {/* Icon */}
                                <div className="text-5xl mb-3 group-hover:scale-110 transition-transform">
                                    {phase.icon}
                                </div>

                                {/* Name - Australian English */}
                                <h4 className="text-lg font-bold text-white mb-2">
                                    {phase.name}
                                </h4>

                                {/* Description */}
                                <p className="text-sm text-gray-400">
                                    {phase.description}
                                </p>
                            </div>

                            {/* Arrow (except last) */}
                            {idx < phases.length - 1 && (
                                <div className="hidden md:block absolute top-1/2 -right-3 -translate-y-1/2 text-purple-500 text-2xl z-10">
                                    →
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
