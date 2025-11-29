import { Metadata } from 'next'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import CouponManager from '../../components/admin/CouponManager'
import LicenseManager from '../../components/admin/LicenseManager'
import UserManager from '../../components/admin/UserManager'

export const metadata: Metadata = {
    title: 'Admin Dashboard - Thin Air',
    description: 'Manage coupons and licenses.',
}

export default function AdminPage() {
    // TODO: Add real auth check here
    // const session = await getServerSession(authOptions)
    // if (session?.user?.role !== 'admin') redirect('/')

    return (
        <main className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white">
            <Header />

            <div className="max-w-7xl mx-auto px-4 py-12">
                <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>

                <div className="grid lg:grid-cols-2 gap-8">
                    {/* Coupon Management */}
                    <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
                        <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                            🎟️ Coupon Management
                        </h2>
                        <CouponManager />
                    </div>

                    {/* License Management */}
                    <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
                        <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                            🔑 License Management
                        </h2>
                        <LicenseManager />
                    </div>

                    {/* User Management */}
                    <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700 md:col-span-2">
                        <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                            👥 User Management
                        </h2>
                        <UserManager />
                    </div>
                </div>
            </div>

            <Footer />
        </main>
    )
}
