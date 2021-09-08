import React, { useState } from 'react';
/**
 * Interface for ethAddress/password
 */
interface LoginInterface {
    ethAddress: string;
    password: string;
}
/**
 * Make request to log in user
 * @param credentials ethAddress/password to login with
 */
async function loginUser(credentials: LoginInterface): Promise<void> {
    localStorage.setItem('loggedIn', credentials.ethAddress)
}
/**
 * Login page
 */
export default function Login(): JSX.Element {
    const [ethAddress, setEthAddress] = useState("");
    const [password, setPassword] = useState("");

    /**
     * Handle sign in button
     * @param e button click event
     */
    const handleSubmit = async (e: React.SyntheticEvent<EventTarget>) => {
        e.preventDefault();
        await loginUser({
            ethAddress,
            password
        });
    }

    return (
        <div className="min-h-screen bg-primary flex flex-col justify-center py-12 sm:px-6 lg:px-8">
            {/* Header */}
            <div className="sm:mx-auto sm:w-full sm:max-w-md">
                <img
                    className="mx-auto h-12 w-auto"
                    src="/instock.png"
                    alt="instock"
                />
            </div>
            {/* Auth Box */}
            <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                <div className="bg-faded py-8 px-4 shadow sm:rounded-lg sm:px-10">
                    <form className="space-y-6" action="#" onSubmit={handleSubmit}>
                        {/* Eth Address */}
                        <div>
                            <label htmlFor="ethAddress" className="block text-sm font-medium text-gray-700">
                                ETH Address
                            </label>
                            <div className="mt-1">
                                <input
                                    onChange={e => setEthAddress(e.target.value)}
                                    id="ethAddress"
                                    name="ethAddress"
                                    type="ethAddress"
                                    autoComplete="ethAddress"
                                    placeholder="0x123456..."
                                    required
                                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                />
                            </div>
                        </div>
                        {/* Password */}
                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                                Password
                            </label>
                            <div className="mt-1">
                                <input
                                    onChange={e => setPassword(e.target.value)}
                                    id="password"
                                    name="password"
                                    type="password"
                                    autoComplete="current-password"
                                    required
                                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                />
                            </div>
                        </div>
                        {/* Sign in button */}
                        <div>
                            <button
                                type="submit"
                                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                            >
                                Sign-in with ETH
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}