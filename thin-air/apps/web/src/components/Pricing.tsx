import { useState } from 'react';
import { trpc } from '../utils/trpc';

export function Pricing() {
    const [credits, setCredits] = useState(10);
    const [couponCode, setCouponCode] = useState('');
    const [redemptionMessage, setRedemptionMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);

    const pricePerCredit = 9; // $9 per credit
    const gstRate = 0.1;

    const utils = trpc.useContext();
    const redeemCoupon = trpc.billing.redeemCoupon.useMutation({
        onSuccess: (data) => {
            setRedemptionMessage({ type: 'success', text: data.message });
            setCouponCode('');
            // Invalidate user query to update credit balance in header (if we had one)
            // utils.user.me.invalidate(); 
        },
        onError: (error) => {
            setRedemptionMessage({ type: 'error', text: error.message });
        }
    });

    const calculateTotal = () => {
        const subtotal = credits * pricePerCredit;
        const gst = subtotal * gstRate;
        return { subtotal, gst, total: subtotal + gst };
    };

    const { subtotal, gst, total } = calculateTotal();

    const handleRedeemCoupon = (e: React.FormEvent) => {
        e.preventDefault();
        if (!couponCode.trim()) return;
        redeemCoupon.mutate({ code: couponCode });
    };

    return (
        <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-700 max-w-md mx-auto">
            <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white text-center">Purchase Credits</h2>

            <div className="mb-8">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Number of Credits
                </label>
                <div className="flex items-center justify-between bg-gray-50 dark:bg-gray-900 rounded-lg p-2 border border-gray-200 dark:border-gray-700">
                    <button
                        onClick={() => setCredits(Math.max(1, credits - 1))}
                        className="w-10 h-10 flex items-center justify-center rounded-md bg-white dark:bg-gray-800 shadow-sm text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                        aria-label="Decrease credits"
                    >
                        -
                    </button>
                    <span className="text-xl font-bold text-gray-900 dark:text-white">{credits}</span>
                    <button
                        onClick={() => setCredits(credits + 1)}
                        className="w-10 h-10 flex items-center justify-center rounded-md bg-white dark:bg-gray-800 shadow-sm text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                        aria-label="Increase credits"
                    >
                        +
                    </button>
                </div>
            </div>

            {/* Coupon Redemption Section */}
            <div className="mb-8 border-t border-gray-100 dark:border-gray-700 pt-6">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Have a coupon?
                </label>
                <form onSubmit={handleRedeemCoupon} className="flex gap-2">
                    <input
                        type="text"
                        value={couponCode}
                        onChange={(e) => setCouponCode(e.target.value)}
                        placeholder="Enter code"
                        className="flex-1 bg-gray-50 dark:bg-gray-900 border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 text-sm text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                    <button
                        type="submit"
                        disabled={redeemCoupon.isLoading || !couponCode.trim()}
                        className="bg-gray-900 dark:bg-gray-700 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-gray-800 dark:hover:bg-gray-600 disabled:opacity-50 transition-all"
                    >
                        {redeemCoupon.isLoading ? '...' : 'Redeem'}
                    </button>
                </form>
                {redemptionMessage && (
                    <p className={`text-xs mt-2 ${redemptionMessage.type === 'success' ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
                        {redemptionMessage.text}
                    </p>
                )}
            </div>

            {/* License Activation Section */}
            <div className="mb-8 border-t border-gray-100 dark:border-gray-700 pt-6">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Activate License Key
                </label>
                <form onSubmit={handleActivateLicense} className="flex gap-2">
                    <input
                        type="text"
                        value={licenseKey}
                        onChange={(e) => setLicenseKey(e.target.value)}
                        placeholder="Enter license key"
                        className="flex-1 bg-gray-50 dark:bg-gray-900 border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 text-sm text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                    <button
                        type="submit"
                        disabled={activateLicense.isLoading || !licenseKey.trim()}
                        className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-blue-700 disabled:opacity-50 transition-all"
                    >
                        {activateLicense.isLoading ? '...' : 'Activate'}
                    </button>
                </form>
                {licenseMessage && (
                    <p className={`text-xs mt-2 ${licenseMessage.type === 'success' ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
                        {licenseMessage.text}
                    </p>
                )}
            </div>

            <div className="space-y-3 mb-8 border-t border-gray-100 dark:border-gray-700 pt-6">
                <div className="flex justify-between text-gray-600 dark:text-gray-400">
                    <span>Price ({credits} x ${pricePerCredit})</span>
                    <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-600 dark:text-gray-400 text-sm">
                    <span>GST (10%)</span>
                    <span>${gst.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-xl font-bold text-gray-900 dark:text-white pt-3 border-t border-gray-100 dark:border-gray-700">
                    <span>Total</span>
                    <span>${total.toFixed(2)}</span>
                </div>
                <p className="text-xs text-gray-500 text-center mt-2">* Prices exclude GST where applicable</p>
            </div>

            <button
                className="w-full py-4 px-6 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl transition-all shadow-lg hover:shadow-blue-500/30 transform hover:-translate-y-0.5"
                onClick={() => alert(`Proceeding to checkout for $${total.toFixed(2)}`)}
            >
                Proceed to Checkout
            </button>

            <div className="mt-6 text-center">
                <p className="text-sm text-gray-500 mb-2">New here?</p>
                <div className="inline-block bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 px-3 py-1 rounded-full text-sm font-medium">
                    🎁 Get 10 Free Credits ($90 Value) on Signup
                </div>
            </div>
        </div>
    );
}
