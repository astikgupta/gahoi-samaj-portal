import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';

const Matrimonial = () => {
    const [profiles, setProfiles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const { user } = useContext(AuthContext);

    const [filters, setFilters] = useState({
        minAge: '',
        maxAge: '',
        education: '',
        profession: '',
        city: ''
    });

    const [showFilters, setShowFilters] = useState(false);

    useEffect(() => {
        const fetchProfiles = async () => {
            try {
                // Build query string
                const queryParams = new URLSearchParams();
                Object.keys(filters).forEach(key => {
                    if (filters[key]) queryParams.append(key, filters[key]);
                });

                const config = {
                    headers: {
                        Authorization: `Bearer ${user.token}`
                    }
                };
                const { data } = await axios.get(`http://localhost:5000/api/matrimonial?${queryParams.toString()}`, config);
                setProfiles(data);
                setLoading(false);
                setError('');
            } catch (error) {
                console.error(error);
                setError(error.response?.data?.message || 'Failed to load profiles');
                setLoading(false);
            }
        };

        if (user && user.age >= 18) {
            fetchProfiles();
        } else {
            setLoading(false);
        }
    }, [filters, user]);

    const handleFilterChange = (e) => {
        setFilters({ ...filters, [e.target.name]: e.target.value });
    };

    const clearFilters = () => {
        setFilters({ minAge: '', maxAge: '', education: '', profession: '', city: '' });
    };

    if (user && user.age < 18) {
        return (
            <div className="min-h-[calc(100vh-4rem)] flex flex-col items-center justify-center p-8 text-center bg-gray-50 border border-gray-200">
                <div className="text-6xl mb-6">🔒</div>
                <h1 className="text-3xl font-bold text-[var(--color-deep-red)] mb-4">Restricted Access</h1>
                <p className="text-xl text-gray-700">You must be 18 or older to access the matrimonial section.</p>
            </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
            <div className="flex justify-between items-center mb-8 border-b pb-4">
                <div>
                    <h1 className="text-4xl font-serif font-bold text-[var(--color-deep-red)]">
                        Marriage Profiles
                    </h1>
                    <p className="text-gray-600 mt-2">Find your perfect match within the Gahoi community.</p>
                </div>
                <button
                    onClick={() => setShowFilters(!showFilters)}
                    className="flex items-center space-x-2 bg-orange-100 text-orange-800 px-4 py-2 rounded-lg hover:bg-orange-200 transition"
                >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" /></svg>
                    <span>{showFilters ? 'Hide Filters' : 'Show Filters'}</span>
                </button>
            </div>

            {error && (
                <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-8">
                    <p className="text-red-700">{error}</p>
                </div>
            )}

            <div className="flex flex-col lg:flex-row gap-8">
                {/* Filters Sidebar */}
                {showFilters && (
                    <div className="w-full lg:w-1/4 bg-white p-6 rounded-xl shadow-md border border-orange-50 h-fit sticky top-24">
                        <div className="flex justify-between items-center mb-6">
                            <h3 className="text-lg font-bold text-gray-800">Filter Profiles</h3>
                            <button onClick={clearFilters} className="text-sm text-[var(--color-deep-red)] hover:underline">Clear All</button>
                        </div>
                        
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Age Range</label>
                                <div className="flex space-x-2">
                                    <input type="number" name="minAge" placeholder="Min" value={filters.minAge} onChange={handleFilterChange} className="w-1/2 px-3 py-2 border border-gray-300 rounded-md text-sm" />
                                    <input type="number" name="maxAge" placeholder="Max" value={filters.maxAge} onChange={handleFilterChange} className="w-1/2 px-3 py-2 border border-gray-300 rounded-md text-sm" />
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">City</label>
                                <input type="text" name="city" value={filters.city} onChange={handleFilterChange} className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm" placeholder="e.g. Bhopal" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Education</label>
                                <input type="text" name="education" value={filters.education} onChange={handleFilterChange} className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm" placeholder="e.g. B.Tech" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Profession</label>
                                <input type="text" name="profession" value={filters.profession} onChange={handleFilterChange} className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm" placeholder="e.g. Engineer" />
                            </div>
                        </div>
                    </div>
                )}

                {/* Profiles Grid */}
                <div className={`w-full ${showFilters ? 'lg:w-3/4' : ''}`}>
                    {loading ? (
                        <div className="flex justify-center mt-20">
                            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[var(--color-saffron)]"></div>
                        </div>
                    ) : profiles.length === 0 ? (
                        <div className="bg-white rounded-xl p-10 text-center border border-gray-200 shadow-sm">
                            <div className="text-5xl mb-4 text-gray-300">🔍</div>
                            <h3 className="text-xl font-medium text-gray-800 mb-2">No Profiles Found</h3>
                            <p className="text-gray-500">Try adjusting your filters to see more results.</p>
                        </div>
                    ) : (
                        <div className={`grid grid-cols-1 md:grid-cols-2 ${showFilters ? 'xl:grid-cols-2' : 'lg:grid-cols-3 xl:grid-cols-3'} gap-6`}>
                            {profiles.map(profile => (
                                <div key={profile._id} className="bg-white rounded-xl overflow-hidden shadow-md border border-orange-50 hover:shadow-xl transition group">
                                    <div className="h-48 bg-orange-100 flex items-center justify-center relative overflow-hidden">
                                        {profile.photoUrl ? (
                                            <img src={profile.photoUrl} alt={profile.fullName} className="w-full h-full object-cover group-hover:scale-105 transition duration-500" />
                                        ) : (
                                            <div className="text-5xl text-orange-300">👤</div>
                                        )}
                                        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                                            <h3 className="text-xl font-bold text-white">{profile.fullName}</h3>
                                            <p className="text-orange-200">{profile.age} yrs • {profile.city}</p>
                                        </div>
                                    </div>
                                    <div className="p-5">
                                        <div className="space-y-3 text-sm">
                                            <div className="flex items-start">
                                                <span className="w-6 text-gray-400">🎓</span>
                                                <span className="text-gray-700">{profile.education || 'Not specified'}</span>
                                            </div>
                                            <div className="flex items-start">
                                                <span className="w-6 text-gray-400">💼</span>
                                                <span className="text-gray-700">{profile.profession || 'Not specified'}</span>
                                            </div>
                                            <div className="flex items-start">
                                                <span className="w-6 text-gray-400">📏</span>
                                                <span className="text-gray-700">{profile.height || 'Not specified'}</span>
                                            </div>
                                        </div>
                                        <div className="mt-6 pt-4 border-t border-gray-100 flex justify-between items-center">
                                            <button className="text-[var(--color-deep-red)] hover:text-red-800 font-medium text-sm flex items-center">
                                                View Full Profile <span className="ml-1">→</span>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Matrimonial;
