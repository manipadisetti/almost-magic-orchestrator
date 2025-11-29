import { useState, useEffect } from 'react';
import { trpc } from '../utils/trpc';

const DEMO_PROJECT_ID = "00000000-0000-0000-0000-000000000000";

const DEPLOYMENT_STAGES = [
    "Preparing build assets...",
    "Optimising images...",
    "Minifying bundles...",
    "Uploading to Digital Pacific...",
    "Configuring DNS...",
    "Finalising deployment..."
];

export function ManifestPage() {
    const projectId = DEMO_PROJECT_ID;
    const [isDeploying, setIsDeploying] = useState(false);
    const [deploymentUrl, setDeploymentUrl] = useState('');
    const [deploymentComplete, setDeploymentComplete] = useState(false);
    const [progress, setProgress] = useState(0);
    const [stageIndex, setStageIndex] = useState(0);
    const [secondsLeft, setSecondsLeft] = useState(30);
    const [error, setError] = useState<string | null>(null);

    // Deployment Credentials State
    const [host, setHost] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [remotePath, setRemotePath] = useState('/public_html');

    const deploy = trpc.manifest.deploy.useMutation({
        onSuccess: (data) => {
            setDeploymentUrl(data.url);
            setDeploymentComplete(true);
            setIsDeploying(false);
            setProgress(100);
        },
        onError: (err) => {
            setIsDeploying(false);
            setError(err.message);
        }
    });

    useEffect(() => {
        let interval: NodeJS.Timeout;
        if (isDeploying) {
            setProgress(0);
            setSecondsLeft(30);
            setStageIndex(0);

            interval = setInterval(() => {
                setProgress(prev => {
                    if (prev >= 95) return prev;
                    return prev + (100 / 300); // Approx 30 seconds
                });
                setSecondsLeft(prev => Math.max(0, prev - 0.1));
                setStageIndex(prev => {
                    const newIndex = Math.floor((100 - (secondsLeft / 30 * 100)) / 16);
                    return Math.min(newIndex, DEPLOYMENT_STAGES.length - 1);
                });
            }, 100);
        }
        return () => clearInterval(interval);
    }, [isDeploying]);

    const handleDeploy = () => {
        if (!host || !username || !password) {
            setError("Please fill in all deployment credentials.");
            return;
        }

        setIsDeploying(true);
        setError(null);
        deploy.mutate({
            projectId,
            host,
            username,
            password,
            remotePath
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
                        <a href="#materialiser" className="text-gray-600 hover:text-blue-600 dark:text-gray-400">Materialiser</a>
                        <span className="text-gray-400">/</span>
                        <span className="text-blue-600 font-medium">Manifest</span>
                    </div>
                    <div className="flex items-center gap-4">
                        <span className="text-sm text-gray-600 dark:text-gray-400">Step 5 of 5</span>
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
                        <div className="flex-1 h-2 bg-blue-600 rounded-full"></div>
                    </div>
                    <div className="flex justify-between mt-2 text-xs text-gray-600 dark:text-gray-400">
                        <span>Vapour</span>
                        <span>Condenser</span>
                        <span>Mirage</span>
                        <span>Materialiser</span>
                        <span className="font-semibold text-blue-600 dark:text-blue-400">Manifest</span>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="max-w-5xl mx-auto px-6 py-12">
                {/* Success Section */}
                {!deploymentComplete ? (
                    <>
                        <div className="text-center mb-12">
                            <div className="inline-block p-4 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full mb-6">
                                <span className="text-6xl">🎉</span>
                            </div>
                            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900 dark:text-white">
                                Phase 5: Manifest
                            </h2>
                            <p className="text-xl text-gray-700 dark:text-gray-300 mb-6 max-w-3xl mx-auto">
                                Your application is ready! Deploy it to the cloud with one click.
                            </p>
                        </div>

                        {/* Error Message */}
                        {error && (
                            <div className="max-w-3xl mx-auto mb-8 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded relative" role="alert">
                                <strong className="font-bold">Error: </strong>
                                <span className="block sm:inline">{error}</span>
                            </div>
                        )}

                        {/* Deployment Credentials Form */}
                        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-8 mb-8">
                            <div className="flex items-center gap-4 mb-6">
                                <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center flex-shrink-0">
                                    <span className="text-white font-bold">DP</span>
                                </div>
                                <div>
                                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                                        Digital Pacific Deployment
                                    </h3>
                                    <p className="text-sm text-gray-600 dark:text-gray-400">
                                        Enter your SFTP credentials to deploy directly to your Australian hosting.
                                    </p>
                                </div>
                            </div>

                            <div className="grid gap-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                        Host / Server Address
                                    </label>
                                    <input
                                        type="text"
                                        value={host}
                                        onChange={(e) => setHost(e.target.value)}
                                        placeholder="ftp.yourdomain.com"
                                        className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                                    />
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                            Username
                                        </label>
                                        <input
                                            type="text"
                                            value={username}
                                            onChange={(e) => setUsername(e.target.value)}
                                            className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                            Password
                                        </label>
                                        <input
                                            type="password"
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                        Remote Path
                                    </label>
                                    <input
                                        type="text"
                                        value={remotePath}
                                        onChange={(e) => setRemotePath(e.target.value)}
                                        placeholder="/public_html"
                                        className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                                    />
                                    <p className="text-xs text-gray-500 mt-1">
                                        Usually /public_html for cPanel hosting.
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Deploy Button & Progress */}
                        <div className="text-center">
                            {!isDeploying ? (
                                <button
                                    onClick={handleDeploy}
                                    className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-12 py-4 rounded-lg font-semibold hover:opacity-90 transition-all shadow-lg text-lg"
                                >
                                    <span className="flex items-center gap-3">
                                        <span>🚀</span> Deploy to Digital Pacific
                                    </span>
                                </button>
                            ) : (
                                <div className="max-w-md mx-auto">
                                    <div className="mb-2 flex justify-between text-sm font-medium text-gray-700 dark:text-gray-300">
                                        <span>{DEPLOYMENT_STAGES[stageIndex]}</span>
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

                            {!isDeploying && (
                                <p className="mt-4 text-sm text-gray-600 dark:text-gray-400">
                                    We'll deploy your app to Digital Pacific and give you a live URL
                                </p>
                            )}
                        </div>
                    </>
                ) : (
                    /* Deployment Success */
                    <div className="text-center">
                        <div className="inline-block p-4 bg-green-100 dark:bg-green-900/20 rounded-full mb-6">
                            <span className="text-6xl">✅</span>
                        </div>
                        <h2 className="text-4xl font-bold mb-4 text-gray-900 dark:text-white">
                            Deployment Successful!
                        </h2>
                        <p className="text-xl text-gray-700 dark:text-gray-300 mb-8">
                            Your application is now live and accessible to the world.
                        </p>

                        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-8 mb-8 max-w-2xl mx-auto">
                            <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Your app is live at:</p>
                            <a
                                href={deploymentUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-2xl font-bold text-blue-600 dark:text-blue-400 hover:underline break-all"
                            >
                                {deploymentUrl}
                            </a>
                        </div>

                        <div className="flex justify-center gap-4">
                            <button
                                onClick={() => window.open(deploymentUrl, '_blank')}
                                className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-all"
                            >
                                Visit Your App →
                            </button>
                            <button
                                onClick={() => window.location.hash = 'vapor'}
                                className="bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white px-8 py-3 rounded-lg font-semibold hover:bg-gray-300 dark:hover:bg-gray-600 transition-all"
                            >
                                Start New Project
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
