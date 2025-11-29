import Script from 'next/script'

export function Analytics() {
    const domain = process.env.NEXT_PUBLIC_SITE_DOMAIN || 'thinair.dev'

    return (
        <>
            {/* Plausible Analytics - Privacy-friendly, GDPR compliant */}
            <Script
                defer
                data-domain={domain}
                src="https://plausible.io/js/script.js"
            />

            {/* Custom event tracking helper */}
            <Script id="plausible-events" strategy="afterInteractive">
                {`
                    window.plausible = window.plausible || function() { 
                        (window.plausible.q = window.plausible.q || []).push(arguments) 
                    }
                `}
            </Script>
        </>
    )
}

// Helper function for tracking custom events
export function trackEvent(eventName: string, props?: Record<string, any>) {
    if (typeof window !== 'undefined' && (window as any).plausible) {
        (window as any).plausible(eventName, { props })
    }
}

// Predefined events for Thin Air
export const Events = {
    // Vapour Phase
    INPUT_CAPTURED: 'Input Captured',
    VOICE_RECORDING_STARTED: 'Voice Recording Started',
    VOICE_RECORDING_STOPPED: 'Voice Recording Stopped',
    IMAGE_UPLOADED: 'Image Uploaded',

    // Condenser Phase
    ANALYSIS_STARTED: 'Analysis Started',
    ANALYSIS_COMPLETED: 'Analysis Completed',
    REQUIREMENTS_VIEWED: 'Requirements Viewed',

    // Mirage Phase
    ARCHITECTURE_DESIGN_STARTED: 'Architecture Design Started',
    ARCHITECTURE_DESIGN_COMPLETED: 'Architecture Design Completed',
    COMPONENT_VIEWED: 'Component Viewed',

    // Materialiser Phase
    CODE_GENERATION_STARTED: 'Code Generation Started',
    CODE_GENERATION_COMPLETED: 'Code Generation Completed',
    FILE_DOWNLOADED: 'File Downloaded',
    ALL_FILES_DOWNLOADED: 'All Files Downloaded',

    // Manifest Phase
    DEPLOYMENT_STARTED: 'Deployment Started',
    DEPLOYMENT_COMPLETED: 'Deployment Completed',
    APP_VISITED: 'App Visited',

    // User Actions
    PHASE_COMPLETED: 'Phase Completed',
    ERROR_OCCURRED: 'Error Occurred',
    FEEDBACK_SUBMITTED: 'Feedback Submitted',
}
