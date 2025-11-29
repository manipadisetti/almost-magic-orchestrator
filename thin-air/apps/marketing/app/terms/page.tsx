import { Metadata } from 'next'
import Header from '../../components/Header'
import Breadcrumbs from '../../components/Breadcrumbs'
import Footer from '../../components/Footer'

export const metadata: Metadata = {
    title: 'Terms of Service - Thin Air',
    description: 'Terms and conditions for using Thin Air. Clear, fair, and transparent.',
}

export default function TermsPage() {
    return (
        <main className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-white">
            <Header />
            <Breadcrumbs items={[{ label: 'Terms of Service' }]} />

            <section className="py-20 px-4">
                <div className="max-w-4xl mx-auto prose dark:prose-invert">
                    <h1 className="text-4xl font-bold mb-8">Terms of Service</h1>
                    <p className="text-lg mb-8">Last updated: November 26, 2025</p>

                    <h2>1. Introduction</h2>
                    <p>
                        Welcome to Thin Air, a service provided by Almost Magic Tech Lab ("we," "us," or "our"). By using our service, you agree to these terms. We believe in transparency and fairness, so we've kept these terms as clear as possible.
                    </p>

                    <h2>2. No Lock-In Contracts</h2>
                    <p>
                        We do not believe in locking you into long-term contracts. You purchase credits as needed and use them to build applications. There are no recurring subscription fees for the software generation service itself.
                    </p>

                    <h2>3. Credits and Payments</h2>
                    <ul>
                        <li><strong>Credit Value:</strong> 1 Credit = $9 AUD (unless otherwise specified or discounted).</li>
                        <li><strong>Expiry:</strong> All purchased credits expire <strong>12 months</strong> from the date of purchase. Unused credits after this period are forfeited.</li>
                        <li><strong>Refunds:</strong> Unused credits may be refunded within 30 days of purchase. Used credits are non-refundable as the service has been performed.</li>
                        <li><strong>Volume Discounts:</strong> We may offer discounts for volume purchases (e.g., 5-10% off). These are subject to change and will be clearly displayed at checkout.</li>
                    </ul>

                    <h2>4. AI Transparency</h2>
                    <p>
                        <strong>Transparency Notice:</strong> Thin Air uses advanced Artificial Intelligence (AI) models (including but not limited to Google Gemini) to analyse your requirements and generate code. While we strive for high accuracy, AI can make mistakes. You are responsible for reviewing and testing the generated application before deploying it to a production environment.
                    </p>

                    <h2>5. Data Retention and Deletion</h2>
                    <p>
                        <strong>30-Day Retention Policy:</strong> To protect your privacy and security, we do not store your generated application data indefinitely.
                    </p>
                    <ul>
                        <li>Any client-created data and generated application code hosted on our testing servers will be <strong>permanently deleted 30 days</strong> after creation.</li>
                        <li>You are responsible for downloading your code and data before this 30-day period expires.</li>
                        <li>We are not liable for any data loss if you fail to download your assets within this timeframe.</li>
                    </ul>

                    <h2>6. Intellectual Property</h2>
                    <p>
                        <strong>You Own the Code:</strong> Upon downloading your generated application, you grant you full ownership of the code. You are free to host, modify, sell, or distribute it as you see fit. We retain no ongoing rights to your specific application code.
                    </p>

                    <h2>7. Limitation of Liability</h2>
                    <p>
                        To the maximum extent permitted by law, Almost Magic Tech Lab is not liable for any indirect, incidental, or consequential damages arising from your use of Thin Air. Our total liability is limited to the amount you paid for the service in the 12 months preceding the claim.
                    </p>

                    <h2>8. Contact</h2>
                    <p>
                        For any questions regarding these terms, please contact us at <a href="mailto:support@almostmagic.net.au">support@almostmagic.net.au</a>.
                    </p>
                </div>
            </section>

            <Footer />
        </main>
    )
}
