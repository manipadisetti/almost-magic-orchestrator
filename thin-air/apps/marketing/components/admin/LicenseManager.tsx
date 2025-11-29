'use client'

import { useState, useEffect } from 'react'

export default function LicenseManager() {
    const [licenses, setLicenses] = useState([])
    const [loading, setLoading] = useState(true)
    const [isCreating, setIsCreating] = useState(false)
    const [newLicense, setNewLicense] = useState({ key: '', type: 'pro', expiresAt: '' })

    useEffect(() => {
        fetchLicenses()
    }, [])

    const fetchLicenses = async () => {
        try {
            const res = await fetch('/api/admin/licenses')
            const data = await res.json()
            setLicenses(data)
        } catch (error) {
            console.error('Failed to fetch licenses', error)
        } finally {
            setLoading(false)
        }
    }

    const createLicense = async () => {
        try {
            const res = await fetch('/api/admin/licenses', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newLicense),
            })
            if (res.ok) {
                setIsCreating(false)
                fetchLicenses()
                setNewLicense({ key: '', type: 'pro', expiresAt: '' })
            }
        } catch (error) {
            console.error('Failed to create license', error)
        }
    }

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <p className="text-sm text-gray-500 dark:text-gray-400">Manage user licenses</p>
                <button
                    onClick={() => setIsCreating(!isCreating)}
                    className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg text-sm font-semibold"
                >
                    {isCreating ? 'Cancel' : '+ Grant License'}
                </button>
            </div>

            {isCreating && (
                <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg mb-6">
                    <div className="grid grid-cols-2 gap-4 mb-4">
                        <input
                            type="text"
                            placeholder="License Key (e.g. LICENSE-123)"
                            className="p-2 rounded border dark:bg-gray-800 dark:border-gray-600"
                            value={newLicense.key}
                            onChange={(e) => setNewLicense({ ...newLicense, key: e.target.value })}
                        />
                        <select
                            className="p-2 rounded border dark:bg-gray-800 dark:border-gray-600"
                            value={newLicense.type}
                            onChange={(e) => setNewLicense({ ...newLicense, type: e.target.value })}
                        >
                            <option value="pro">Pro</option>
                            <option value="enterprise">Enterprise</option>
                        </select>
                    </div>
                    <button
                        onClick={createLicense}
                        className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-sm font-semibold w-full"
                    >
                        Save License
                    </button>
                </div>
            )}

            <div className="overflow-x-auto">
                <table className="w-full text-sm text-left">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-100 dark:bg-gray-700 dark:text-gray-300">
                        <tr>
                            <th className="px-4 py-3 rounded-l-lg">User</th>
                            <th className="px-4 py-3">Key</th>
                            <th className="px-4 py-3">Status</th>
                            <th className="px-4 py-3 rounded-r-lg">Expiry</th>
                        </tr>
                    </thead>
                    <tbody>
                        {loading ? (
                            <tr><td colSpan={4} className="text-center py-4">Loading...</td></tr>
                        ) : licenses.map((license: any) => (
                            <tr key={license.id} className="border-b dark:border-gray-700">
                                <td className="px-4 py-3 font-medium">{license.userId || 'Unassigned'}</td>
                                <td className="px-4 py-3 font-mono text-xs">{license.key}</td>
                                <td className="px-4 py-3">
                                    <span className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded dark:bg-green-900 dark:text-green-300">
                                        {license.status}
                                    </span>
                                </td>
                                <td className="px-4 py-3 text-gray-500">
                                    {license.expiresAt ? new Date(license.expiresAt).toLocaleDateString() : 'Never'}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}
