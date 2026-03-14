import { useState, useEffect, useContext } from 'react';
import api from '../utils/api';
import { AuthContext } from '../context/AuthContext';

const Profile = () => {
    const { user } = useContext(AuthContext);
    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const { data } = await api.get('/auth/me');
                setProfile(data);
                setLoading(false);
            } catch (error) {
                console.error(error);
                setLoading(false);
            }
        };

        if (user) {
            fetchProfile();
        }
    }, [user]);

    const [showMatrimonialForm, setShowMatrimonialForm] = useState(false);
    const [matrimonialData, setMatrimonialData] = useState({
        fullName: '',
        age: '',
        height: '',
        education: '',
        profession: '',
        city: '',
        familyBackground: '',
        contactDetails: ''
    });

    const handleMatrimonialChange = (e) => {
        setMatrimonialData({ ...matrimonialData, [e.target.name]: e.target.value });
    };

    const submitMatrimonialProfile = async (e) => {
        e.preventDefault();
        try {
            await api.post('/matrimonial', matrimonialData);
            alert('Matrimonial profile submitted for approval!');
            setShowMatrimonialForm(false);
        } catch (error) {
            alert('Error creating profile: ' + (error.response?.data?.message || 'Server error'));
        }
    };

    if (loading) {
        return (
            <div className="flex justify-center mt-20 min-h-[calc(100vh-4rem)]">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[var(--color-saffron)]"></div>
            </div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto px-4 py-10 min-h-[calc(100vh-4rem)]">
            <h1 className="text-4xl font-serif font-bold text-[var(--color-deep-red)] mb-8">My Profile</h1>
            
            <div className="bg-white rounded-2xl shadow-md overflow-hidden border border-orange-50">
                <div className="h-32 bg-gradient-to-r from-orange-100 to-red-100"></div>
                <div className="px-8 pb-8">
                    <div className="relative flex justify-between items-end -mt-16 mb-6">
                        <div className="h-32 w-32 rounded-full bg-white p-2 shadow-lg">
                            <div className="h-full w-full rounded-full bg-[var(--color-saffron)] flex items-center justify-center text-5xl font-bold text-white">
                                {profile?.name?.charAt(0).toUpperCase()}
                            </div>
                        </div>
                        <span className={`px-4 py-1 rounded-full text-sm font-medium ${profile?.isApproved ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                            {profile?.isApproved ? 'Approved Member' : 'Pending Approval'}
                        </span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="space-y-4">
                            <h3 className="text-xl font-bold text-gray-900 border-b pb-2">Personal Details</h3>
                            <p><strong className="text-gray-700">Name:</strong> {profile?.name}</p>
                            <p><strong className="text-gray-700">Email:</strong> {profile?.email}</p>
                            <p><strong className="text-gray-700">Phone:</strong> {profile?.phoneNumber}</p>
                            <p><strong className="text-gray-700">Gender:</strong> {profile?.gender}</p>
                            <p><strong className="text-gray-700">Age:</strong> {profile?.age} years</p>
                        </div>
                        
                        <div className="space-y-4">
                            <h3 className="text-xl font-bold text-gray-900 border-b pb-2">Background</h3>
                            <p><strong className="text-gray-700">Father's Name:</strong> {profile?.fatherName}</p>
                            <p><strong className="text-gray-700">City:</strong> {profile?.city}</p>
                            <p><strong className="text-gray-700">State:</strong> {profile?.state}</p>
                            <p><strong className="text-gray-700">Profession:</strong> {profile?.profession || 'N/A'}</p>
                        </div>
                    </div>
                    
                    <div className="mt-8 pt-8 border-t border-gray-200">
                        <h3 className="text-xl font-bold text-gray-900 mb-4">Matrimonial Setup</h3>
                        {profile?.age >= 18 ? (
                            !showMatrimonialForm ? (
                                <button 
                                    onClick={() => setShowMatrimonialForm(true)}
                                    className="px-6 py-2 bg-[var(--color-saffron)] text-white rounded-md font-medium hover:bg-orange-600 transition shadow-sm"
                                >
                                    Create Matrimonial Profile
                                </button>
                            ) : (
                                <form onSubmit={submitMatrimonialProfile} className="space-y-4 bg-gray-50 p-6 rounded-lg border border-gray-100">
                                    <h4 className="text-lg font-bold text-[var(--color-deep-red)] mb-4">New Matrimonial Profile</h4>
                                    
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                                            <input type="text" name="fullName" required value={matrimonialData.fullName} onChange={handleMatrimonialChange} className="w-full px-3 py-2 border rounded-md" />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">Age</label>
                                            <input type="number" name="age" required min="18" value={matrimonialData.age} onChange={handleMatrimonialChange} className="w-full px-3 py-2 border rounded-md" />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">Height</label>
                                            <input type="text" name="height" placeholder="e.g. 5'8&quot;" value={matrimonialData.height} onChange={handleMatrimonialChange} className="w-full px-3 py-2 border rounded-md" />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">Education</label>
                                            <input type="text" name="education" value={matrimonialData.education} onChange={handleMatrimonialChange} className="w-full px-3 py-2 border rounded-md" />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">Profession</label>
                                            <input type="text" name="profession" value={matrimonialData.profession} onChange={handleMatrimonialChange} className="w-full px-3 py-2 border rounded-md" />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">City</label>
                                            <input type="text" name="city" value={matrimonialData.city} onChange={handleMatrimonialChange} className="w-full px-3 py-2 border rounded-md" />
                                        </div>
                                        <div className="md:col-span-2">
                                            <label className="block text-sm font-medium text-gray-700 mb-1">Family Background</label>
                                            <textarea name="familyBackground" rows="2" value={matrimonialData.familyBackground} onChange={handleMatrimonialChange} className="w-full px-3 py-2 border rounded-md" />
                                        </div>
                                        <div className="md:col-span-2">
                                            <label className="block text-sm font-medium text-gray-700 mb-1">Contact Details</label>
                                            <input type="text" name="contactDetails" placeholder="Phone, Email, etc." required value={matrimonialData.contactDetails} onChange={handleMatrimonialChange} className="w-full px-3 py-2 border rounded-md" />
                                        </div>
                                    </div>

                                    <div className="flex justify-end space-x-3 mt-6">
                                        <button 
                                            type="button" 
                                            onClick={() => setShowMatrimonialForm(false)}
                                            className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-md transition"
                                        >
                                            Cancel
                                        </button>
                                        <button 
                                            type="submit" 
                                            className="px-6 py-2 bg-[var(--color-saffron)] text-white font-medium rounded-md hover:bg-orange-600 transition"
                                        >
                                            Submit Profile
                                        </button>
                                    </div>
                                </form>
                            )
                        ) : (
                            <p className="text-gray-500 italic">You must be 18 or older to create a matrimonial profile.</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;
