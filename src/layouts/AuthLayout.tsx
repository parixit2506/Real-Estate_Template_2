import { Outlet } from 'react-router-dom';

const AuthLayout = () => {
    return (
        <div className="min-h-screen flex flex-col bg-white dark:bg-gray-900 transition-colors duration-300">
            <main className="flex-1">
                <Outlet />
            </main>
        </div>
    );
};

export default AuthLayout;

