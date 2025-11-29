import { Metadata } from 'next'
import Header from '../../components/Header'
import Breadcrumbs from '../../components/Breadcrumbs'
import Footer from '../../components/Footer'

export const metadata: Metadata = {
    title: 'FAQ - Thin Air',
    description: 'Frequently asked questions about Thin Air. Learn about pricing, hosting, ownership, and the development process.',
}

export default function FAQPage() {
    const faqCategories = [
        {
            category: "Getting Started",
            faqs: [
                {
                    question: "What is Thin Air?",
                    answer: "Thin Air turns your scattered ideas into working software. Speak your vision, sketch your concept, and we build a fully deployed application—complete with marketing site and documentation. You own all the code. No technical skills required."
                },
                {
                    question: "Who is Thin Air for?",
                    answer: "Small business owners and small tech teams who need custom software but can't afford $50,000+ development costs or don't want to be locked into no-code platforms."
                },
                {
                    question: "Do I need technical skills?",
                    answer: "No. Just explain what you want to build. We handle all the technical complexity."
                },
                {
                    question: "How long does it take?",
                    answer: "Typically 5-10 business days from start to deployment, including your review time. However, this depends entirely on how quickly you review and approve. If you move fast, you could potentially complete your entire application in hours."
                }
            ]
        },
        {
            category: "Hosting & Ownership",
            faqs: [
                {
                    question: "How long do you host my application?",
                    answer: "30 days only. After 30 days, your application is deleted from our servers. You must download everything before then."
                },
                {
                    question: "Where should I host my application?",
                    answer: "Anywhere you want. Popular options include your own servers, AWS, Google Cloud, Azure, Vercel, or on-premises if required. We provide deployment instructions for common platforms."
                },
                {
                    question: "Do I own the code?",
                    answer: "Yes. Completely. Forever. Your code, your IP, your data, your control. We have no ongoing rights to your application."
                },
                {
                    question: "Is the code open source?",
                    answer: "Your code is yours. You decide if you want to open source it."
                }
            ]
        },
        {
            category: "Credits & Pricing",
            faqs: [
                {
                    question: "How much does an application cost?",
                    answer: "6-9 credits ($57-77 AUD) depending on complexity. Simple applications: 6-7 credits. Standard applications: 7-8 credits. Complex applications: 8-9 credits. We'll tell you the estimated credit cost during Phase 2 (Condenser). You approve before we proceed."
                },
                {
                    question: "Can I buy just one application?",
                    answer: "Yes! Buy any quantity from 1 to 100+. Single application purchases are absolutely supported."
                },
                {
                    question: "Will you tell me before using my credits?",
                    answer: "Always. Every time. Our process: (1) We assess what's needed, (2) We tell you the credit cost, (3) You review and approve, (4) Only then do we proceed and use credits. No surprises. Ever."
                },
                {
                    question: "Do credits expire?",
                    answer: "Yes. 12 months after purchase. Example: Purchase 50 credits on March 1, 2026 → Expire March 1, 2027 → Unused credits are forfeited. Track your expiry date in your dashboard."
                },
                {
                    question: "Why do credits expire?",
                    answer: "To keep our pricing sustainable and encourage you to use what you buy."
                },
                {
                    question: "Can I get a refund?",
                    answer: "Unused credits: Yes, within 30 days of purchase. Used credits: No (you got the application). Free credits: Non-refundable (but you didn't pay for them)."
                },
                {
                    question: "Are there volume discounts?",
                    answer: "Yes! 50 credits: 6% off. 100 credits: 11% off. 250+ credits: Custom pricing."
                },
                {
                    question: "Can I buy credits for my team?",
                    answer: "Yes. One account can build multiple applications. Your team shares the outputs. For larger teams, contact support@almostmagic.net.au for enterprise arrangements."
                }
            ]
        },
        {
            category: "Technical Questions",
            faqs: [
                {
                    question: "What if my application has a bug?",
                    answer: "During the 30-day testing window: We fix it for free (within your 5 included iterations). After 30 days: You own the code. You can fix it yourself or hire us (or any developer) to fix it. If you need us after 30 days, we'll quote the work and wait for your approval."
                },
                {
                    question: "Do you provide ongoing support?",
                    answer: "During development and 30-day window: Yes, full support. After you download: No ongoing support. You own the code. You're in control. Need help later? Contact support@almostmagic.net.au for a quote."
                },
                {
                    question: "Can I modify the code after downloading?",
                    answer: "Yes! It's your code. Modify anything you want. We provide well-commented code, README files, technical documentation, and setup instructions. Any developer can work with it."
                },
                {
                    question: "What if I need additional features later?",
                    answer: "Three options: (1) Come back to us—we'll quote the additional work and wait for your approval. (2) Hire any developer—the code is yours. (3) Build it yourself—if you have technical skills."
                },
                {
                    question: "How secure is my application?",
                    answer: "Every application includes automatic security hardening: input validation, SQL injection prevention, XSS protection, CSRF tokens, secure authentication, encrypted connections, and environment variables for secrets. Plus code reviewed for efficiency, comprehensive auto-testing, and professional error handling. Your responsibility: Keep dependencies updated, monitor for vulnerabilities, and conduct your own security audits before production."
                },
                {
                    question: "Is my data safe?",
                    answer: "During development: Your data stays on our servers, encrypted. After download: Your data, your responsibility. Host securely. We never sell your data, share your data with third parties, or train models on your private data."
                },
                {
                    question: "Can you integrate with my existing systems?",
                    answer: "Yes, but integrations are separately chargeable. Process: (1) Provide integration details during Phase 1 (Vapour), (2) We assess complexity and quote the fee, (3) You review and approve the fee, (4) Once you pay, we commence the integration work. Common integrations: APIs (RESTful, GraphQL), databases (MySQL, PostgreSQL, MongoDB), authentication systems (OAuth, SAML, SSO), payment processors (Stripe, PayPal), and email services (SendGrid, Mailgun). We always tell you the cost before doing any work."
                }
            ]
        },
        {
            category: "Account & Access",
            faqs: [
                {
                    question: "Can I change my email address?",
                    answer: "Contact support@almostmagic.net.au. We'll verify and update it."
                },
                {
                    question: "Can I transfer credits to another account?",
                    answer: "No. Credits are non-transferable."
                },
                {
                    question: "What if I forget my password?",
                    answer: "Use the 'Forgot Password' link. We'll email you a reset link."
                },
                {
                    question: "Can multiple team members use one account?",
                    answer: "Yes. Share login credentials securely with your team. For enterprise teams, contact support@almostmagic.net.au for multi-user account options."
                },
                {
                    question: "Is there SSO integration?",
                    answer: "Yes! If you're logged into another Almost Magic application, you're automatically logged into Thin Air. One account. Everywhere."
                }
            ]
        },
        {
            category: "Specific Use Cases",
            faqs: [
                {
                    question: "Can Thin Air build internal tools?",
                    answer: "Yes. That's our sweet spot. Examples: operations dashboards, client portals, lead trackers, inventory systems, booking systems, and approval workflows. All with automatic security hardening and comprehensive testing."
                },
                {
                    question: "Can Thin Air build customer-facing applications?",
                    answer: "Yes. Examples: SaaS products, marketplaces, booking platforms, e-commerce sites, and community platforms. All with production-grade security and testing."
                },
                {
                    question: "Can Thin Air build APIs?",
                    answer: "Yes. Your application includes API endpoints if needed. Complete API documentation included."
                },
                {
                    question: "Can I white-label the application?",
                    answer: "Yes. Add 20 credits per application ($180 AUD) to remove 'Built with Thin Air' mentions and add your branding throughout."
                }
            ]
        },
        {
            category: "Comparisons",
            faqs: [
                {
                    question: "How is Thin Air different from Bubble, Webflow, or other no-code tools?",
                    answer: "Three key differences: (1) You own the code—not locked into a platform. (2) No feature limitations—build what you need, not what's available. (3) No ongoing hosting fees—host wherever you want after 30 days. (4) Automatic security hardening—built into every application."
                },
                {
                    question: "How is Thin Air different from hiring developers?",
                    answer: "Thin Air: Cost $57-77 AUD per app, Time 5-10 business days (or hours if you approve quickly), Outcome: Working application + code + documentation + security + testing. Hiring developers: Cost $50,000+ per app, Time 3-6 months, Outcome: Same, but more expensive and slower. When to hire developers instead: Complex enterprise systems, highly specialised requirements, or ongoing development team needed."
                },
                {
                    question: "Can developers review the code quality?",
                    answer: "Yes! We encourage it. The code is production-grade, security-hardened, and well-documented. Have a technical team member review it during your 30-day testing window."
                }
            ]
        },
        {
            category: "Support & Contact",
            faqs: [
                {
                    question: "How do I get help?",
                    answer: "During development: Direct support via your project dashboard. General questions: support@almostmagic.net.au. Advisory services: advisory@almostmagic.net.au."
                },
                {
                    question: "What are your support hours?",
                    answer: "Business hours, Australian Eastern Time (AET). Monday-Friday: 9 AM - 5 PM AET. Weekends: Limited support."
                },
                {
                    question: "Do you offer consulting?",
                    answer: "Yes. If you need help defining requirements, planning architecture, or understanding what's possible, contact advisory@almostmagic.net.au."
                }
            ]
        }
    ]

    return (
        <main className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-white">
            <Header />
            <Breadcrumbs items={[{ label: 'FAQ' }]} />

            {/* Hero */}
            <section className="py-20 px-4 text-center bg-gray-50 dark:bg-gray-800">
                <h1 className="text-5xl md:text-6xl font-bold mb-6 text-gray-900 dark:text-white">
                    Frequently Asked Questions
                </h1>
                <p className="text-xl text-gray-700 dark:text-gray-300 max-w-3xl mx-auto">
                    Everything you need to know about Thin Air. Can't find your answer? <a href="/contact" className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-semibold">Contact us</a>.
                </p>
            </section>

            {/* FAQ Categories */}
            <section className="py-16 px-4">
                <div className="max-w-4xl mx-auto space-y-16">
                    {faqCategories.map((category, catIdx) => (
                        <div key={catIdx}>
                            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 pb-3 border-b-2 border-blue-600 dark:border-blue-400">
                                {category.category}
                            </h2>
                            <div className="space-y-6">
                                {category.faqs.map((faq, faqIdx) => (
                                    <div
                                        key={faqIdx}
                                        className="bg-gray-50 dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 rounded-lg p-6 hover:border-blue-500 dark:hover:border-blue-400 transition-all"
                                    >
                                        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                                            {faq.question}
                                        </h3>
                                        <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                                            {faq.answer}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* CTA */}
            <section className="py-16 px-4 bg-blue-600 dark:bg-blue-700 text-white text-center">
                <h2 className="text-4xl font-bold mb-4">
                    Didn't Find Your Answer?
                </h2>
                <p className="text-xl mb-8 text-blue-100">
                    Contact us at <a href="mailto:support@almostmagic.net.au" className="underline font-semibold">support@almostmagic.net.au</a>
                </p>
                <p className="text-blue-100 mb-8">
                    We typically respond within 1 business day.
                </p>
                <a
                    href="http://localhost:5173"
                    className="inline-block bg-white text-blue-600 px-8 py-4 rounded-lg font-bold text-lg hover:bg-gray-100 transition-colors"
                >
                    Start Building Now
                </a>
                <p className="text-sm text-blue-100 mt-4">
                    20 Free Credits • $180 AUD Value • Business Email Required • No Card Needed
                </p>
            </section>

            <Footer />
        </main>
    )
}
