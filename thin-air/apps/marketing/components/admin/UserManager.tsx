'use client'

import { useState, useEffect } from 'react'

export default function UserManager() {
    const [users, setUsers] = useState([])
    const [loading, setLoading] = useState(true)
    const [isCreating, setIsCreating] = useState(false)
    const [newUser, setNewUser] = useState({ name: '', email: '', unlimitedAccess: false })

    useEffect(() => {
        fetchUsers()
    }, [])

    const fetchUsers = async () => {
        try {
            const res = await fetch('/api/admin/users')
            const data = await res.json()
            setUsers(data)
        } catch (error) {
            console.error('Failed to fetch users', error)
        } finally {
            setLoading(false)
        }
    }

    const createUser = async () => {
        try {
            console.log('Sending create request:', newUser)
            const res = await fetch('/api/admin/users', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newUser),
            })
            const data = await res.json()
            console.log('Create response:', data)

            if (res.ok) {
                setIsCreating(false)
                fetchUsers()
                setNewUser({ name: '', email: '', unlimitedAccess: false })
            }
        } catch (error) {
            console.error('Failed to create user', error)
        }
    }

    const toggleUnlimited = async (userId: string, currentStatus: boolean) => {
        try {
            const res = await fetch('/api/admin/users', {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ id: userId, unlimitedAccess: !currentStatus }),
            })
            if (res.ok) {
                fetchUsers()
            }
        } catch (error) {
            console.error('Failed to update user', error)
        }
    }

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <p className="text-sm text-gray-500 dark:text-gray-400">Manage users & access</p>
                <button
                    onClick={() => setIsCreating(!isCreating)}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-semibold"
                >
                    {isCreating ? 'Cancel' : '+ Add User'}
                </button>
            </div>

            {isCreating && (
                <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg mb-6">
                    <div className="grid grid-cols-2 gap-4 mb-4">
                        <input
                            type="text"
                            placeholder="Name"
                            className="p-2 rounded border dark:bg-gray-800 dark:border-gray-600"
                            value={newUser.name}
                            onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
                        />
                        <input
                            type="email"
                            placeholder="Email"
                            className="p-2 rounded border dark:bg-gray-800 dark:border-gray-600"
                            value={newUser.email}
                            onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                        />
                        <div className="flex items-center gap-2">
                            <input
                                type="checkbox"
                                id="unlimited"
                                checked={newUser.unlimitedAccess}
                                onChange={(e) => setNewUser({ ...newUser, unlimitedAccess: e.target.checked })}
                                className="w-4 h-4"
                            />
                            <label htmlFor="unlimited" className="text-sm text-gray-700 dark:text-gray-300">Grant Unlimited Access</label>
                        </div>
                    </div>
                    <button
                        onClick={createUser}
                        className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-sm font-semibold w-full"
                    >
                        Add User
                    </button>
                </div>
            )}

            <div className="overflow-x-auto">
                <table className="w-full text-sm text-left">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-100 dark:bg-gray-700 dark:text-gray-300">
                        <tr>
                            <th className="px-4 py-3 rounded-l-lg">Name</th>
                            <th className="px-4 py-3">Email</th>
                            <th className="px-4 py-3">Role</th>
                            <th className="px-4 py-3">Access</th>
                            <th className="px-4 py-3 rounded-r-lg">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {loading ? (
                            <tr><td colSpan={5} className="text-center py-4">Loading...</td></tr>
                        ) : users.map((user: any) => (
                            <tr key={user.id} className="border-b dark:border-gray-700">
                                <td className="px-4 py-3 font-medium">{user.name || 'N/A'}</td>
                                <td className="px-4 py-3">{user.email}</td>
                                <td className="px-4 py-3">
                                    <span className={`text-xs font-medium px-2.5 py-0.5 rounded ${user.role === 'admin' ? 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300' : 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300'}`}>
                                        {user.role}
                                    </span>
                                </td>
                                <td className="px-4 py-3">
                                    {user.unlimitedAccess ? (
                                        <span className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded dark:bg-green-900 dark:text-green-300">
                                            Unlimited
                                        </span>
                                    ) : (
                                        <span className="text-gray-500">Standard</span>
                                    )}
                                </td>
                                <td className="px-4 py-3">
                                    <button
                                        onClick={() => toggleUnlimited(user.id, user.unlimitedAccess)}
                                        className="text-blue-600 hover:underline text-xs"
                                    >
                                        {user.unlimitedAccess ? 'Revoke Unlimited' : 'Grant Unlimited'}
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}
