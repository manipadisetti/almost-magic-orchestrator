import { describe, it, expect } from 'vitest'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { UserManager } from '../UserManager'

// Mock fetch
global.fetch = vi.fn()

describe('UserManager Component', () => {
    beforeEach(() => {
        vi.clearAllMocks()
    })

    it('renders user management interface', () => {
        render(<UserManager />)
        expect(screen.getByText('User Management')).toBeInTheDocument()
        expect(screen.getByText('+ Add User')).toBeInTheDocument()
    })

    it('displays loading state initially', () => {
        (global.fetch as any).mockResolvedValueOnce({
            ok: true,
            json: async () => [],
        })

        render(<UserManager />)
        expect(screen.getByText('Loading...')).toBeInTheDocument()
    })

    it('displays users after loading', async () => {
        const mockUsers = [
            {
                id: '1',
                name: 'Test User',
                email: 'test@example.com',
                role: 'user',
                unlimitedAccess: false,
                createdAt: new Date().toISOString(),
            },
        ]

            (global.fetch as any).mockResolvedValueOnce({
                ok: true,
                json: async () => mockUsers,
            })

        render(<UserManager />)

        await waitFor(() => {
            expect(screen.getByText('Test User')).toBeInTheDocument()
            expect(screen.getByText('test@example.com')).toBeInTheDocument()
        })
    })

    it('can add a new user', async () => {
        (global.fetch as any)
            .mockResolvedValueOnce({
                ok: true,
                json: async () => [],
            })
            .mockResolvedValueOnce({
                ok: true,
                json: async () => ({
                    id: '2',
                    name: 'New User',
                    email: 'new@example.com',
                    unlimitedAccess: true,
                }),
            })

        render(<UserManager />)

        const addButton = screen.getByText('+ Add User')
        fireEvent.click(addButton)

        const nameInput = screen.getByPlaceholderText('Name')
        const emailInput = screen.getByPlaceholderText('Email')
        const unlimitedCheckbox = screen.getByLabelText('Grant Unlimited Access')

        fireEvent.change(nameInput, { target: { value: 'New User' } })
        fireEvent.change(emailInput, { target: { value: 'new@example.com' } })
        fireEvent.click(unlimitedCheckbox)

        const submitButton = screen.getByText('Add User')
        fireEvent.click(submitButton)

        await waitFor(() => {
            expect(global.fetch).toHaveBeenCalledWith(
                '/api/admin/users',
                expect.objectContaining({
                    method: 'POST',
                    body: JSON.stringify({
                        name: 'New User',
                        email: 'new@example.com',
                        unlimitedAccess: true,
                    }),
                })
            )
        })
    })

    it('toggles unlimited access for a user', async () => {
        const mockUser = {
            id: '1',
            name: 'Test User',
            email: 'test@example.com',
            role: 'user',
            unlimitedAccess: false,
            createdAt: new Date().toISOString(),
        }

            (global.fetch as any)
            .mockResolvedValueOnce({
                ok: true,
                json: async () => [mockUser],
            })
            .mockResolvedValueOnce({
                ok: true,
                json: async () => ({ ...mockUser, unlimitedAccess: true }),
            })

        render(<UserManager />)

        await waitFor(() => {
            expect(screen.getByText('Test User')).toBeInTheDocument()
        })

        const toggleButton = screen.getByRole('button', { name: /toggle/i })
        fireEvent.click(toggleButton)

        await waitFor(() => {
            expect(global.fetch).toHaveBeenCalledWith(
                '/api/admin/users',
                expect.objectContaining({
                    method: 'PATCH',
                    body: JSON.stringify({
                        id: '1',
                        unlimitedAccess: true,
                    }),
                })
            )
        })
    })
})
