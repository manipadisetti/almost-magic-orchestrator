import Link from 'next/link'
import Image from 'next/image'
import ThemeToggle from './ThemeToggle'

export default function Header() {
    return (
        <header className="sticky top-0 z-50 bg-white border-b border-gray-200 py-4 px-4 dark:bg-gray-900 dark:border-gray-800">
            <div className="max-w-6xl mx-auto flex justify-between items-center">
                <Link href="/" className="flex items-center gap-3">
                    <Image
                        src="/logo.png"
                        alt="Almost Magic Tech Lab"
                        width={40}
                        height={40}
                        className="h-10 w-auto"
                    />
                    <span className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                        Thin Air
                    </span>
                </Link>

                <nav className="hidden md:flex gap-6 items-center">
                    <Link href="/" className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors font-medium">
                        Home
                    </Link>
                    <Link href="/how-it-works" className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors font-medium">
                        How It Works
                    </Link>
                    <Link href="/pricing" className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors font-medium">
                        Pricing
                    </Link>
                    <Link href="/faq" className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors font-medium">
                        FAQ
                    </Link>
                    <Link href="/contact" className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors font-medium">
                        Contact
                    </Link>

                    <ThemeToggle />

                    <a
                        href="http://localhost:5173"
                        className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-semibold transition-colors"
                    >
                        Start Building
                    </a>
                </nav>
            </div>
        </header>
    )
}
