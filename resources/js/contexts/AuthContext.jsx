import React, { createContext, useContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';

const AuthContext = createContext();

export function useAuth() {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [isAdmin, setIsAdmin] = useState(false);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const checkAuth = async () => {
            try {
                // First check CSRF token
                await fetch('/sanctum/csrf-cookie', {
                    credentials: 'include',
                });

                const response = await fetch('/api/user', {
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                        'X-Requested-With': 'XMLHttpRequest'
                    },
                    credentials: 'include'
                });

                // Check if response is JSON
                const contentType = response.headers.get('content-type');
                if (!contentType || !contentType.includes('application/json')) {
                    // Not authenticated, but don't throw an error
                    setUser(null);
                    setIsAdmin(false);
                    return;
                }

                if (!response.ok) {
                    if (response.status === 401) {
                        // Unauthorized but expected
                        setUser(null);
                        setIsAdmin(false);
                        return;
                    }
                    throw new Error('Authentication check failed');
                }

                const data = await response.json();
                if (data.user) {
                    setUser(data.user);
                    setIsAdmin(data.user.is_admin || false);
                } else {
                    setUser(null);
                    setIsAdmin(false);
                }
            } catch (err) {
                console.error('Auth check error:', err);
                setError(err.message);
                setUser(null);
                setIsAdmin(false);
            } finally {
                setLoading(false);
            }
        };

        checkAuth();
    }, []);

    const value = {
        user,
        isAdmin,
        loading,
        error,
        setUser,
        setIsAdmin,
        isAuthenticated: !!user
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-gray-900"></div>
            </div>
        );
    }

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
}

AuthProvider.propTypes = {
    children: PropTypes.node.isRequired
};