import { useContext, createContext, useState, type ReactNode, useEffect } from "react";
import { loginUser, registerUser, setAuthToken } from "../libs/api";

type AuthContextType = {
    token: string;
    isLoggedIn: boolean;
    handleLogin: (username: string, password: string) => Promise<void>;
    handleRegister: (username: string, password: string) => Promise<void>;
    handleLogout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const TOKEN_KEY = 'task_manager_token'

    const [token, setToken] = useState<string>(
        localStorage.getItem(TOKEN_KEY) || ''
    )

    const isLoggedIn = Boolean(token)

    // 🔥 Keep axios in sync with token
    useEffect(() => {
        if (token) {
            setAuthToken(token)
            localStorage.setItem(TOKEN_KEY, token)
        } else {
            setAuthToken(null)
            localStorage.removeItem(TOKEN_KEY)
        }
    }, [token])

    const handleLogin = async (username: string, password: string) => {
        try {
            const data = await loginUser(username, password)

            // JWT: { access, refresh }
            setToken(data.access)
        } catch (error) {
            console.error('login error', error)
        }
    }

    const handleRegister = async (username: string, password: string) => {
        try {
            await registerUser(username, password)
        } catch (error) {
            console.error(error)
        }
    }

    const handleLogout = () => {
        setToken('')
    }

    return (
        <AuthContext.Provider value={{ token, isLoggedIn, handleLogin, handleRegister, handleLogout }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuthContext = () => {
    const context = useContext(AuthContext)
    if (!context) throw new Error('useAuthContext must be used within AuthProvider')
    return context
}