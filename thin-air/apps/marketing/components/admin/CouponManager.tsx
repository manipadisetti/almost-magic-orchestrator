'use client'

import { useState, useEffect } from 'react'

export default function CouponManager() {
    const [coupons, setCoupons] = useState([])
    const [loading, setLoading] = useState(true)
    const [isCreating, setIsCreating] = useState(false)
    const [newCoupon, setNewCoupon] = useState({ code: '', type: 'percent', value: 20, maxUses: 100, expiry: '' })

    useEffect(() => {
        fetchCoupons()
    }, [])

    const fetchCoupons = async () => {
        try {
            const res = await fetch('/api/admin/coupons')
            const data = await res.json()
            setCoupons(data)
        } catch (error) {
            console.error('Failed to fetch coupons', error)
        } finally {
            setLoading(false)
        }
    }

    const createCoupon = async () => {
        try {
            const res = await fetch('/api/admin/coupons', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newCoupon),
            })
            if (res.ok) {
                setIsCreating(false)
                fetchCoupons()
                setNewCoupon({ code: '', type: 'percent', value: 20, maxUses: 100, expiry: '' })
            }
        } catch (error) {
            console.error('Failed to create coupon', error)
        }
    }

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <p className="text-sm text-gray-500 dark:text-gray-400">Manage discount codes</p>
                <button
                    onClick={() => setIsCreating(!isCreating)}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-semibold"
                >
                    {isCreating ? 'Cancel' : '+ Create Coupon'}
                </button>
            </div>

            {isCreating && (
                <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg mb-6">
                    <div className="grid grid-cols-2 gap-4 mb-4">
                        <input
                            type="text"
                            placeholder="Code (e.g. SAVE20)"
                            className="p-2 rounded border dark:bg-gray-800 dark:border-gray-600"
                            value={newCoupon.code}
                            onChange={(e) => setNewCoupon({ ...newCoupon, code: e.target.value })}
                        />
                        <select
                            className="p-2 rounded border dark:bg-gray-800 dark:border-gray-600"
                            value={newCoupon.type}
                            onChange={(e) => setNewCoupon({ ...newCoupon, type: e.target.value })}
                        >
                            <option value="percent">Percentage (%)</option>
                            <option value="amount">Fixed Amount ($)</option>
                        </select>
                        <input
                            type="number"
                            placeholder="Value"
                            className="p-2 rounded border dark:bg-gray-800 dark:border-gray-600"
                            value={newCoupon.value}
                            onChange={(e) => setNewCoupon({ ...newCoupon, value: Number(e.target.value) })}
                        />
                        <input
                            type="number"
                            placeholder="Max Uses"
                            className="p-2 rounded border dark:bg-gray-800 dark:border-gray-600"
                            value={newCoupon.maxUses}
                            onChange={(e) => setNewCoupon({ ...newCoupon, maxUses: Number(e.target.value) })}
                        />
                    </div>
                    <button
                        onClick={createCoupon}
                        className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-sm font-semibold w-full"
                    >
                        Save Coupon
                    </button>
                </div>
            )}

            <div className="overflow-x-auto">
                <table className="w-full text-sm text-left">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-100 dark:bg-gray-700 dark:text-gray-300">
                        <tr>
                            <th className="px-4 py-3 rounded-l-lg">Code</th>
                            <th className="px-4 py-3">Discount</th>
                            <th className="px-4 py-3">Usage</th>
                            <th className="px-4 py-3 rounded-r-lg">Expiry</th>
                        </tr>
                    </thead>
                    <tbody>
                        {loading ? (
                            <tr><td colSpan={4} className="text-center py-4">Loading...</td></tr>
                        ) : coupons.map((coupon: any) => (
                            <tr key={coupon.id} className="border-b dark:border-gray-700">
                                <td className="px-4 py-3 font-medium">{coupon.code}</td>
                                <td className="px-4 py-3">
                                    {coupon.type === 'percent' ? `${coupon.value}%` : `$${coupon.value}`}
                                </td>
                                <td className="px-4 py-3">
                                    {coupon.usedCount} / {coupon.maxUses || '∞'}
                                </td>
                                <td className="px-4 py-3 text-gray-500">
                                    {coupon.expiresAt ? new Date(coupon.expiresAt).toLocaleDateString() : 'Never'}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}
