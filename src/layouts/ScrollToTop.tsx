import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const ScrollToTop = () => {
    const { pathname } = useLocation();

    useEffect(() => {
        // We use a small timeout to ensure the scroll happens after the new page has started rendering
        // and to bypass any smooth scroll behavior if desired, though standard scrollTo(0,0) is usually fine.
        window.scrollTo(0, 0);
    }, [pathname]);

    return null;
};

export default ScrollToTop;

