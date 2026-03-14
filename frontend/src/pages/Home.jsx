import { Link } from 'react-router-dom';

const Home = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-[calc(100vh-4rem)] text-center px-4 py-20 bg-gradient-to-b from-orange-50 to-[var(--color-cream)]">
            <h1 className="text-5xl md:text-7xl font-serif font-bold text-[var(--color-deep-red)] mb-6">
                Connecting Our Community
            </h1>
            <p className="text-xl md:text-2xl text-gray-700 mb-10 max-w-3xl font-light">
                Join Gahoi Samaj Connect to discover members, find your life partner in our secure matrimonial section, and stay updated with community events.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/register" className="px-8 py-4 bg-[var(--color-saffron)] hover:bg-orange-500 text-white font-bold rounded-lg shadow-lg transition transform hover:-translate-y-1">
                    Join the Community
                </Link>
                <Link to="/members" className="px-8 py-4 bg-white border border-[var(--color-deep-red)] text-[var(--color-deep-red)] hover:bg-orange-50 font-bold rounded-lg shadow-lg transition transform hover:-translate-y-1">
                    Browse Members
                </Link>
            </div>
            
            <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-7xl">
                <div className="bg-white p-8 rounded-2xl shadow-sm border border-orange-100 flex flex-col items-center text-center">
                    <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mb-6">
                        <span className="text-3xl">👥</span>
                    </div>
                    <h3 className="text-xl font-bold text-gray-800 mb-3">Member Directory</h3>
                    <p className="text-gray-600">Connect with Gahoi members across the globe. Search by city and profession.</p>
                </div>
                <div className="bg-white p-8 rounded-2xl shadow-sm border border-orange-100 flex flex-col items-center text-center">
                    <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-6">
                        <span className="text-3xl">💖</span>
                    </div>
                    <h3 className="text-xl font-bold text-gray-800 mb-3">Matrimonial</h3>
                    <p className="text-gray-600">A dedicated, secure platform for finding life partners within our trusted community.</p>
                </div>
                <div className="bg-white p-8 rounded-2xl shadow-sm border border-orange-100 flex flex-col items-center text-center">
                    <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mb-6">
                        <span className="text-3xl">📅</span>
                    </div>
                    <h3 className="text-xl font-bold text-gray-800 mb-3">Community Events</h3>
                    <p className="text-gray-600">Stay informed about meetings, charity programs, and temple events.</p>
                </div>
            </div>
        </div>
    );
};

export default Home;
