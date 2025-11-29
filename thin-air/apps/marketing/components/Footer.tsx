import Image from 'next/image'

export default function Footer() {
    return (
        <footer className="bg-gray-900 border-t border-gray-800 py-12 px-4">
            <div className="max-w-6xl mx-auto">
                <div className="grid md:grid-cols-4 gap-8 mb-8">
                    {/* Logo & About */}
                    <div className="md:col-span-2">
                        <Image
                            src="/logo.png"
                            alt="Almost Magic Tech Lab"
                            width={150}
                            height={45}
                            className="h-12 w-auto mb-4"
                        />
                        <p className="text-gray-400 mb-4">
                            Turn your scattered ideas into working software. Built in Australia with clarity over cynicism.
                        </p>
                        <Image
                            src="/seal.jpg"
                            alt="Clarity over cynicism"
                            width={80}
                            height={80}
                            className="rounded-full opacity-70"
                        />
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="text-white font-semibold mb-4">Quick Links</h4>
                        <ul className="space-y-2">
                            <li><a href="/" className="text-gray-400 hover:text-white transition-colors">Home</a></li>
                            <li><a href="/how-it-works" className="text-gray-400 hover:text-white transition-colors">How It Works</a></li>
                            <li><a href="/pricing" className="text-gray-400 hover:text-white transition-colors">Pricing</a></li>
                            <li><a href="/faq" className="text-gray-400 hover:text-white transition-colors">FAQ</a></li>
                            <li><a href="/contact" className="text-gray-400 hover:text-white transition-colors">Contact</a></li>
                        </ul>
                    </div>

                    {/* Contact */}
                    <div>
                        <h4 className="text-white font-semibold mb-4">Contact</h4>
                        <ul className="space-y-2">
                            <li className="text-gray-400">
                                <strong>Support:</strong><br />
                                <a href="mailto:support@almostmagic.net.au" className="hover:text-white transition-colors">
                                    support@almostmagic.net.au
                                </a>
                            </li>
                            <li className="text-gray-400">
                                <strong>Advisory:</strong><br />
                                <a href="mailto:advisory@almostmagic.net.au" className="hover:text-white transition-colors">
                                    advisory@almostmagic.net.au
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* AI Disclaimer */}
                <div className="border-t border-gray-800 pt-8">
                    <p className="text-sm text-gray-500 mb-4">
                        <strong>AI Transparency:</strong> Thin Air uses advanced AI systems to generate code. While we include automatic security hardening and testing, you should review all code before production use.
                    </p>

                    {/* Trust Badges */}
                    <div className="flex flex-wrap gap-4 mb-6">
                        <div className="text-sm text-gray-400">✓ No Lock-In Contracts</div>
                        <div className="text-sm text-gray-400">✓ You Own All Code & IP</div>
                        <div className="text-sm text-gray-400">✓ 30-Day Data Deletion</div>
                        <div className="text-sm text-gray-400">✓ Australian-Built</div>
                    </div>

                    {/* Copyright & Links */}
                    <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-gray-800 text-sm text-gray-400">
                        <div className="mb-4 md:mb-0">
                            © {new Date().getFullYear()} Almost Magic Tech Lab. All rights reserved.
                        </div>
                        <div className="flex gap-6">
                            <a href="/terms" className="hover:text-white transition-colors">Terms</a>
                            <a href="/privacy" className="hover:text-white transition-colors">Privacy</a>
                            <a href="/cookies" className="hover:text-white transition-colors">Cookies</a>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    )
}
