import { Metadata } from 'next'
import Header from '../../components/Header'
import Breadcrumbs from '../../components/Breadcrumbs'
import Footer from '../../components/Footer'

export const metadata: Metadata = {
    title: 'Cookie Policy - Thin Air',
    description: 'How we use cookies. Mostly just to keep you logged in.',
}

export default function CookiesPage() {
    return (
        <main className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-white">
            <Header />
            <Breadcrumbs items={[{ label: 'Cookie Policy' }]} />

            <section className="py-20 px-4">
                <div className="max-w-4xl mx-auto prose dark:prose-invert">
                    <h1 className="text-4xl font-bold mb-8">Cookie Policy</h1>
                    <p className="text-lg mb-8">Last updated: November 26, 2025</p>

                    <h2>1. What Are Cookies?</h2>
                    <p>
                        Cookies are small text files stored on your device when you visit a website. They help the site remember you.
                    </p>

                    <h2>2. How We Use Cookies</h2>
                    <p>We use cookies for essential purposes only:</p>
                    <ul>
                        <li><strong>Authentication:</strong> To keep you logged in as you move between pages.</li>
                        <li><strong>Preferences:</strong> To remember your theme preference (Light/Dark mode).</li>
                        <li><strong>Security:</strong> To prevent Cross-Site Request Forgery (CSRF) attacks.</li>
                    </ul>

                    <h2>3. Third-Party Cookies</h2>
                    <p>
                        We may use third-party services (like analytics or payment providers) that set their own cookies. We do not control these cookies.
                    </p>

                    <h2>4. Managing Cookies</h2>
                    <p>
                        You can control or delete cookies through your browser settings. However, disabling essential cookies will prevent you from logging in or using the core features of Thin Air.
                    </p>
                </div>
            </section>

            <Footer />
        </main>
    )
}
