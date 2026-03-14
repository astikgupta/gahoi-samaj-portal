import { Link, useNavigate } from 'react-router-dom';
import { useContext, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import { FaBars, FaTimes } from 'react-icons/fa';

const Navbar = () => {
    const { user, logout } = useContext(AuthContext);
    const navigate = useNavigate();
    const [isOpen, setIsOpen] = useState(false);

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    const navLinks = [
        { name: 'Home', path: '/' },
        { name: 'Members', path: '/members' },
        { name: 'Marriage Profiles', path: '/matrimonial' },
        { name: 'Events', path: '/events' },
        { name: 'Gallery', path: '/gallery' },
    ];

    return (
        <nav className="bg-white shadow-md sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16">
                    <div className="flex items-center">
                        <Link to="/" className="flex-shrink-0 flex items-center">
                            <span className="font-serif text-2xl font-bold text-[var(--color-deep-red)]">
                                Gahoi<span className="text-[var(--color-saffron)]">Connect</span>
                            </span>
                        </Link>
                    </div>

                    {/* Desktop Menu */}
                    <div className="hidden md:ml-6 md:flex md:items-center md:space-x-4">
                        {navLinks.map((link) => (
                            <Link
                                key={link.name}
                                to={link.path}
                                className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-[var(--color-deep-red)] hover:bg-orange-50 transition"
                            >
                                {link.name}
                            </Link>
                        ))}
                        {user ? (
                            <div className="flex items-center space-x-4 ml-4">
                                <Link to="/profile" className="text-gray-700 hover:text-[var(--color-saffron)] font-medium">
                                    {user.name}
                                </Link>
                                {user.role === 'admin' && (
                                    <Link to="/admin" className="text-sm font-bold text-red-600 hover:text-red-800">
                                        Admin
                                    </Link>
                                )}
                                <button
                                    onClick={handleLogout}
                                    className="px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-[var(--color-deep-red)] hover:bg-red-700 transition"
                                >
                                    Log out
                                </button>
                            </div>
                        ) : (
                            <div className="flex items-center space-x-2 ml-4">
                                <Link
                                    to="/login"
                                    className="px-4 py-2 text-sm font-medium text-[var(--color-deep-red)] hover:text-red-700"
                                >
                                    Login
                                </Link>
                                <Link
                                    to="/register"
                                    className="px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-[var(--color-saffron)] hover:bg-orange-500 shadow-sm transition"
                                >
                                    Register
                                </Link>
                            </div>
                        )}
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="flex items-center md:hidden">
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none"
                        >
                            {isOpen ? <FaTimes className="block h-6 w-6" /> : <FaBars className="block h-6 w-6" />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            {isOpen && (
                <div className="md:hidden">
                    <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                        {navLinks.map((link) => (
                            <Link
                                key={link.name}
                                to={link.path}
                                className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-[var(--color-deep-red)] hover:bg-orange-50"
                                onClick={() => setIsOpen(false)}
                            >
                                {link.name}
                            </Link>
                        ))}
                    </div>
                    <div className="pt-4 pb-3 border-t border-gray-200">
                        {user ? (
                            <div className="px-5 space-y-1">
                                <div className="text-base font-medium text-gray-800">{user.name}</div>
                                <Link to="/profile" className="block px-3 py-2 text-base font-medium text-gray-500 hover:text-gray-800 hover:bg-gray-100">Profile</Link>
                                {user.role === 'admin' && (
                                    <Link to="/admin" className="block px-3 py-2 text-base font-medium text-red-600 hover:bg-gray-100">Admin Dashboard</Link>
                                )}
                                <button onClick={handleLogout} className="block w-full text-left px-3 py-2 text-base font-medium text-gray-500 hover:text-gray-800 hover:bg-gray-100">Log out</button>
                            </div>
                        ) : (
                            <div className="px-5 space-y-2 flex flex-col">
                                <Link to="/login" className="block w-full text-center px-4 py-2 border border-[var(--color-deep-red)] text-sm font-medium rounded-md text-[var(--color-deep-red)]">Login</Link>
                                <Link to="/register" className="block w-full text-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-[var(--color-saffron)]">Register</Link>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
