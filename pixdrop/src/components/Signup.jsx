import { useState } from 'react'
import { supabase } from '../supabase/client'
import { useNavigate } from 'react-router-dom'
import backgroundImage from '../assets/background.jpg'

function SignUpForm() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [name, setName] = useState('')
    const [repeatPassword, setRepeatPassword] = useState('')
    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(false)
    const [success, setSuccess] = useState(false)
    const navigate = useNavigate()

    const handleSignUp = async (e) => {
        e.preventDefault()
        setError(null)

        if (password !== repeatPassword) {
            setError('Passwords do not match')
            return
        }

        setIsLoading(true)

        try {
            const { error } = await supabase.auth.signUp({
                email,
                password,
                options: {
                    data: { full_name: name }, 
                },
            })
            if (error) throw error
            // navigate('/')
            setSuccess(true)
        } catch (err) {
            setError(err.message || 'Something went wrong')
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4"
        style={{ backgroundImage: `url(${backgroundImage})`, backgroundSize: 'cover' }}
        >
            {success ? (
                <div className="bg-green-100 p-6 rounded-lg shadow">
                    <h2 className="text-xl font-semibold text-green-700">Thanks for signing up!</h2>
                    <p className="text-sm mt-2 text-green-600">
                        Please check your email to confirm your account.
                    </p>
                </div>
            ) : (

                <div className="w-full max-w-md bg-pink-100/80 backdrop-blur-sm p-8 rounded-2xl shadow-xl">
                    <h2 className="text-2xl font-bold mb-2 text-center">Create Account</h2>
                    <form
                        onSubmit={handleSignUp}
                        className=" p-6 rounded-lg space-y-6"
                    >
                        <div>
                            <label className="block text-sm font-medium mb-1" htmlFor="name">
                                Name
                            </label>
                            <input
                                id="name"
                                type="text"
                                className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm px-3 py-2 focus:outline-none focus:ring-2 focus:ring-pink-500"
                                required
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                placeholder="Full Name"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-1" htmlFor="email">
                                Email
                            </label>
                            <input
                                id="email"
                                type="email"
                                className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm px-3 py-2 focus:outline-none focus:ring-2 focus:ring-pink-500"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="you@example.com"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-1" htmlFor="password">
                                Password
                            </label>
                            <input
                                id="password"
                                type="password"
                                className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm px-3 py-2 focus:outline-none focus:ring-2 focus:ring-pink-500"
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="••••••••"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-1" htmlFor="repeat-password">
                                Repeat Password
                            </label>
                            <input
                                id="repeat-password"
                                type="password"
                                className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm px-3 py-2 focus:outline-none focus:ring-2 focus:ring-pink-500"
                                required
                                value={repeatPassword}
                                onChange={(e) => setRepeatPassword(e.target.value)}
                                placeholder="••••••••"
                            />
                        </div>

                        {error && <p className="text-red-500 text-sm">{error}</p>}

                        <button
                            type="submit"
                            className="w-full bg-pink-600 text-white py-2 px-4 rounded-md hover:bg-pink-700 transition disabled:opacity-50"
                            disabled={isLoading}
                        >
                            {isLoading ? 'Creating an account...' : 'Sign Up'}
                        </button>

                        <p className="text-sm text-center">
                            Already have an account?{' '}
                            <a href="/" className="text-pink-600 underline">
                                Login
                            </a>
                        </p>
                    </form>
                </div>

            )}
        </div>
    )
}

export default SignUpForm;