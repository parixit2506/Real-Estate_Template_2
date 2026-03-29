import { createContext, useContext, useState } from 'react';
import type { ReactNode } from 'react';

interface User {
    id: string;
    name: string;
    email: string;
    avatar: string;
    role: 'user' | 'admin';
}

interface Account extends User {
    passwordHash: string;
}

interface AuthContextType {
    user: User | null;
    login: (email: string, password: string) => Promise<void>;
    register: (name: string, email: string, password: string) => Promise<void>;
    logout: () => void;
    isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const SESSION_KEY = 'luxe_user';
const ACCOUNTS_KEY = 'luxe_accounts';

const normalizeEmail = (email: string) => email.trim().toLowerCase();

const getAccounts = (): Account[] => {
    const raw = localStorage.getItem(ACCOUNTS_KEY);
    if (!raw) return [];
    try {
        const parsed = JSON.parse(raw) as Account[];
        return Array.isArray(parsed) ? parsed : [];
    } catch {
        return [];
    }
};

const setAccounts = (accounts: Account[]) => {
    localStorage.setItem(ACCOUNTS_KEY, JSON.stringify(accounts));
};

const getInitialsAvatar = (name: string) =>
    `https://api.dicebear.com/9.x/initials/svg?seed=${encodeURIComponent(name.trim() || 'User')}`;

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<User | null>(() => {
        if (typeof window === 'undefined') return null;
        const storedUser = localStorage.getItem(SESSION_KEY);
        if (storedUser) {
            try {
                return JSON.parse(storedUser);
            } catch {
                localStorage.removeItem(SESSION_KEY);
            }
        }
        return null;
    });



    const login = async (email: string, password: string) => {
        // Template Logic: Simple delay for effect
        await new Promise((resolve) => setTimeout(resolve, 800));

        const normalizedEmail = normalizeEmail(email);
        if (!normalizedEmail || !password) throw new Error('Please enter credentials');

        const accounts = getAccounts();
        let account = accounts.find((a) => normalizeEmail(a.email) === normalizedEmail);

        // Auto-create if not found for template purposes
        if (!account) {
            const name = normalizedEmail.split('@')[0].charAt(0).toUpperCase() + normalizedEmail.split('@')[0].slice(1);
            account = {
                id: `u_${Math.random().toString(36).substr(2, 9)}`,
                name,
                email: normalizedEmail,
                avatar: getInitialsAvatar(name),
                role: 'user',
                passwordHash: 'nopass',
            };
            setAccounts([account, ...accounts]);
        }

        const sessionUser: User = {
            id: account.id,
            name: account.name,
            email: account.email,
            avatar: account.avatar,
            role: account.role,
        };

        setUser(sessionUser);
        localStorage.setItem(SESSION_KEY, JSON.stringify(sessionUser));
    };

    const register = async (name: string, email: string, _password: string) => {
        await new Promise((resolve) => setTimeout(resolve, 800));

        const cleanName = name.trim();
        const normalizedEmail = normalizeEmail(email);
        if (!cleanName) throw new Error('Please enter your full name.');
        if (!normalizedEmail) throw new Error('Please enter your email address.');

        const accounts = getAccounts();
        if (accounts.some((a) => normalizeEmail(a.email) === normalizedEmail)) {
            throw new Error('An account with this email already exists.');
        }

        const newAccount: Account = {
            id: `u_${Math.random().toString(36).substr(2, 9)}`,
            name: cleanName,
            email: normalizedEmail,
            avatar: getInitialsAvatar(cleanName),
            role: 'user',
            passwordHash: 'nopass',
        };

        setAccounts([newAccount, ...accounts]);

        const sessionUser: User = {
            id: newAccount.id,
            name: newAccount.name,
            email: newAccount.email,
            avatar: newAccount.avatar,
            role: newAccount.role,
        };

        setUser(sessionUser);
        localStorage.setItem(SESSION_KEY, JSON.stringify(sessionUser));
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem(SESSION_KEY);
    };

    return (
        <AuthContext.Provider value={{ user, login, register, logout, isAuthenticated: !!user }}>
            {children}
        </AuthContext.Provider>
    );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
