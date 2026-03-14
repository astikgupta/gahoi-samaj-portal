import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';

const Members = () => {
    const [members, setMembers] = useState([]);
    const [keyword, setKeyword] = useState('');
    const [loading, setLoading] = useState(true);
    const { user } = useContext(AuthContext);

    useEffect(() => {
        const fetchMembers = async () => {
            try {
                const config = {
                    headers: {
                        Authorization: `Bearer ${user.token}`
                    }
                };
                const { data } = await axios.get(`http://localhost:5000/api/users?keyword=${keyword}`, config);
                setMembers(data);
                setLoading(false);
            } catch (error) {
                console.error(error);
                setLoading(false);
            }
        };

        if (user) {
            fetchMembers();
        }
    }, [keyword, user]);

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
            <div className="flex flex-col md:flex-row justify-between items-center mb-10">
                <h1 className="text-4xl font-serif font-bold text-[var(--color-deep-red)] mb-4 md:mb-0">
                    Member Directory
                </h1>
                <div className="w-full md:w-1/3">
                    <input
                        type="text"
                        placeholder="Search by name, city, or profession..."
                        value={keyword}
                        onChange={(e) => setKeyword(e.target.value)}
                        className="w-full px-4 py-3 rounded-full border border-orange-200 focus:outline-none focus:ring-2 focus:ring-[var(--color-saffron)] shadow-sm"
                    />
                </div>
            </div>

            {loading ? (
                <div className="flex justify-center my-20">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[var(--color-saffron)]"></div>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {members.map((member) => (
                        <div key={member._id} className="bg-white rounded-xl shadow-md p-6 border border-orange-50 hover:shadow-lg transition">
                            <div className="flex items-center space-x-4 mb-4">
                                <div className="h-16 w-16 rounded-full bg-orange-100 flex justify-center items-center text-xl font-bold text-[var(--color-deep-red)]">
                                    {member.name.charAt(0).toUpperCase()}
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold text-gray-900">{member.name}</h3>
                                    <p className="text-sm text-gray-500">{member.gender}, {member.age} yrs</p>
                                </div>
                            </div>
                            <div className="space-y-2 text-sm text-gray-600">
                                <p><strong className="text-gray-800">Father's Name:</strong> {member.fatherName}</p>
                                <p><strong className="text-gray-800">City:</strong> {member.city}, {member.state}</p>
                                {member.profession && <p><strong className="text-gray-800">Profession:</strong> {member.profession}</p>}
                                <p><strong className="text-gray-800">Contact:</strong> {member.phoneNumber}</p>
                            </div>
                        </div>
                    ))}
                    {members.length === 0 && (
                        <div className="col-span-full text-center py-10 text-gray-500">
                            No members found matching your search.
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default Members;
