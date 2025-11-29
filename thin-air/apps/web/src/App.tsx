import { LiquidAudio } from './components/LiquidAudio';

// ... (existing imports)

function App() {
    // ... (existing state)

    return (
        <ErrorBoundary>
            <Header
                theme={theme}
                setTheme={setTheme}
                largeText={largeText}
                setLargeText={setLargeText}
                simplified={simplified}
                setSimplified={setSimplified}
            />
            <trpc.Provider client={trpcClient} queryClient={queryClient}>
                <QueryClientProvider client={queryClient}>
                    <div className={`min-h-screen ${largeText ? 'text-lg' : ''} ${simplified ? 'simplified' : ''}`}>
                        {currentPage === 'vapor' && <VaporPage />}
                        {currentPage === 'condenser' && <CondenserPage />}
                        {currentPage === 'mirage' && <MiragePage />}
                        {currentPage === 'materialiser' && <MaterialiserPage />}
                        {currentPage === 'manifest' && <ManifestPage />}
                        {currentPage === 'about' && <AboutPage />}

                        {/* Fallback UI for unknown hash */}
                        {!['vapor', 'condenser', 'mirage', 'materialiser', 'manifest', 'about'].includes(currentPage) && (
                            <div className="flex flex-col items-center justify-center min-h-screen text-center">
                                <h1 className="text-3xl font-bold mb-4">Welcome to Thin Air</h1>
                                <p className="text-lg mb-2">Create software from ideas in minutes.</p>
                                <p className="text-sm text-gray-500">Select a phase from the URL hash (e.g., #condenser) to begin.</p>
                            </div>
                        )}
                    </div>
                    <LiquidAudio />
                </QueryClientProvider>
            </trpc.Provider>
        </ErrorBoundary>
    );
}

export default App;
