import { createContext, useContext, useEffect, useState } from 'react';

type Direction = 'ltr' | 'rtl';

interface DirectionContextValue {
    dir: Direction;
    toggleDir: () => void;
    isRTL: boolean;
}

const DirectionContext = createContext<DirectionContextValue>({
    dir: 'ltr',
    toggleDir: () => { },
    isRTL: false,
});

export function DirectionProvider({ children }: { children: React.ReactNode }) {
    const [dir, setDir] = useState<Direction>(() => {
        if (typeof window !== 'undefined') {
            const saved = localStorage.getItem('showcase-dir');
            return (saved === 'rtl' || saved === 'ltr') ? saved : 'ltr';
        }
        return 'ltr';
    });

    useEffect(() => {
        document.documentElement.setAttribute('dir', dir);
        document.documentElement.setAttribute('lang', dir === 'rtl' ? 'ar' : 'en');
        localStorage.setItem('showcase-dir', dir);
    }, [dir]);

    const toggleDir = () => setDir((d) => (d === 'ltr' ? 'rtl' : 'ltr'));

    return (
        <DirectionContext.Provider value={{ dir, toggleDir, isRTL: dir === 'rtl' }}>
            {children}
        </DirectionContext.Provider>
    );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useDirection() {
    return useContext(DirectionContext);
}

