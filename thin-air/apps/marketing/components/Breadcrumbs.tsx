import Link from 'next/link'

interface BreadcrumbProps {
    items: { label: string; href?: string }[]
}

export default function Breadcrumbs({ items }: BreadcrumbProps) {
    return (
        <nav className="py-4 px-4 bg-gray-50 dark:bg-gray-900/30 border-b border-gray-200 dark:border-gray-800">
            <div className="max-w-6xl mx-auto">
                <ol className="flex items-center gap-2 text-sm">
                    <li>
                        <Link href="/" className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                            Home
                        </Link>
                    </li>
                    {items.map((item, idx) => (
                        <li key={idx} className="flex items-center gap-2">
                            <span className="text-gray-400 dark:text-gray-600">/</span>
                            {item.href ? (
                                <Link href={item.href} className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                                    {item.label}
                                </Link>
                            ) : (
                                <span className="text-gray-900 dark:text-white font-medium">{item.label}</span>
                            )}
                        </li>
                    ))}
                </ol>
            </div>
        </nav>
    )
}
