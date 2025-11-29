import { mockGenerate } from './ai';

export interface ExtractedIntent {
    appType: string;
    description: string;
    features: string[];
    techStack: {
        frontend: string[];
        backend: string[];
        database: string;
    };
    complexity: 'low' | 'medium' | 'high';
    estimatedCredits: number;
    confidence: number;
}

export async function mockExtractIntent(input: string): Promise<ExtractedIntent> {
    console.log("🧠 [MOCK CONDENSER] Extracting intent from:", input.substring(0, 50) + "...");

    // Simulate processing time
    await new Promise((resolve) => setTimeout(resolve, 1000));

    const lowerInput = input.toLowerCase();

    // Detect app type based on keywords
    let appType = "Web Application";
    let features: string[] = [];
    let complexity: 'low' | 'medium' | 'high' = 'medium';
    let estimatedCredits = 5;

    if (lowerInput.includes('crm') || lowerInput.includes('customer')) {
        appType = "CRM System";
        features = ["Contact Management", "Pipeline Tracking", "Email Integration", "Reporting Dashboard"];
        complexity = 'high';
        estimatedCredits = 9;
    } else if (lowerInput.includes('todo') || lowerInput.includes('task')) {
        appType = "Task Manager";
        features = ["Task Lists", "Priority Levels", "Due Dates", "Categories"];
        complexity = 'low';
        estimatedCredits = 3;
    } else if (lowerInput.includes('shop') || lowerInput.includes('ecommerce') || lowerInput.includes('e-commerce')) {
        appType = "E-commerce Platform";
        features = ["Product Catalogue", "Shopping Cart", "Checkout", "Payment Integration", "Order Management"];
        complexity = 'high';
        estimatedCredits = 12;
    } else if (lowerInput.includes('blog') || lowerInput.includes('content')) {
        appType = "Content Management System";
        features = ["Post Editor", "Categories & Tags", "Comments", "User Roles"];
        complexity = 'medium';
        estimatedCredits = 6;
    } else if (lowerInput.includes('dashboard') || lowerInput.includes('analytics')) {
        appType = "Analytics Dashboard";
        features = ["Data Visualisation", "Real-time Updates", "Custom Reports", "Export Functionality"];
        complexity = 'medium';
        estimatedCredits = 7;
    } else {
        // Generic app
        features = ["User Authentication", "Data Management", "Responsive UI"];
        estimatedCredits = 5;
    }

    // Add features mentioned in input
    if (lowerInput.includes('auth') || lowerInput.includes('login')) {
        if (!features.includes("User Authentication")) features.push("User Authentication");
    }
    if (lowerInput.includes('payment')) {
        if (!features.includes("Payment Integration")) features.push("Payment Integration");
    }
    if (lowerInput.includes('notification')) {
        features.push("Notifications");
    }
    if (lowerInput.includes('search')) {
        features.push("Search Functionality");
    }

    // Calculate confidence based on input clarity
    const wordCount = input.split(/\s+/).length;
    let confidence = Math.min(95, 60 + wordCount * 3);

    return {
        appType,
        description: `A ${complexity}-complexity ${appType.toLowerCase()} with ${features.length} core features`,
        features,
        techStack: {
            frontend: ["React 19", "TypeScript", "Tailwind CSS"],
            backend: ["Node.js", "tRPC", "PostgreSQL"],
            database: "PostgreSQL"
        },
        complexity,
        estimatedCredits,
        confidence
    };
}
