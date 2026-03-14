import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import { Navigate } from 'react-router-dom';

const AdminDashboard = () => {
    const { user } = useContext(AuthContext);
    const [stats, setStats] = useState(null);
    const [pendingUsers, setPendingUsers] = useState([]);
    const [pendingProfiles, setPendingProfiles] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchAdminData = async () => {
            try {
                const config = {
                    headers: {
                        Authorization: `Bearer ${user.token}`
                    }
                };
                
                const [statsRes, pendingRes] = await Promise.all([
                    axios.get('http://localhost:5000/api/admin/stats', config),
                    axios.get('http://localhost:5000/api/admin/pending-approvals', config)
                ]);
                
                setStats(statsRes.data);
                setPendingUsers(pendingRes.data.pendingUsers);
                setPendingProfiles(pendingRes.data.pendingProfiles);
                setLoading(false);
            } catch (error) {
                console.error(error);
                setLoading(false);
            }
        };

        if (user && user.role === 'admin') {
            fetchAdminData();
        }
    }, [user]);

    const handleApproveUser = async (id) => {
        if(window.confirm('Are you sure you want to approve this user?')) {
            try {
                const config = {
                    headers: { Authorization: `Bearer ${user.token}` }
                };
                await axios.put(`http://localhost:5000/api/admin/approve-user/${id}`, {}, config);
                setPendingUsers(pendingUsers.filter(u => u._id !== id));
                setStats(prev => ({...prev, users: {...prev.users, pending: prev.users.pending - 1, approved: prev.users.approved + 1}}));
            } catch (error) {
                console.error("Approval error details:", error.response?.data || error);
                alert('Error approving user: ' + (error.response?.data?.message || error.message));
            }
        }
    };

    if (user && user.role !== 'admin') {
        return <Navigate to="/" />;
    }

    if (loading) {
        return (
            <div className="flex justify-center mt-20 min-h-[calc(100vh-4rem)]">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600"></div>
            </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 min-h-[calc(100vh-4rem)]">
            <h1 className="text-3xl font-bold text-gray-900 mb-8">Admin Dashboard</h1>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
                <div className="bg-white p-6 rounded-xl shadow border border-gray-100">
                    <h3 className="text-gray-500 text-sm font-medium uppercase">Total Users</h3>
                    <p className="text-3xl font-bold text-gray-900 mt-2">{stats?.users?.total}</p>
                </div>
                <div className="bg-green-50 p-6 rounded-xl shadow border border-green-100">
                    <h3 className="text-green-600 text-sm font-medium uppercase">Approved Users</h3>
                    <p className="text-3xl font-bold text-green-700 mt-2">{stats?.users?.approved}</p>
                </div>
                <div className="bg-yellow-50 p-6 rounded-xl shadow border border-yellow-100">
                    <h3 className="text-yellow-600 text-sm font-medium uppercase">Pending Users</h3>
                    <p className="text-3xl font-bold text-yellow-700 mt-2">{stats?.users?.pending}</p>
                </div>
                <div className="bg-purple-50 p-6 rounded-xl shadow border border-purple-100">
                    <h3 className="text-purple-600 text-sm font-medium uppercase">Matrimonial Profiles</h3>
                    <p className="text-3xl font-bold text-purple-700 mt-2">{stats?.profiles?.total}</p>
                </div>
            </div>

            {/* Pending Approvals Section */}
            <div className="bg-white shadow rounded-xl overflow-hidden border border-gray-200">
                <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
                    <h2 className="text-lg font-bold text-gray-800">Pending User Approvals ({pendingUsers.length})</h2>
                </div>
                {pendingUsers.length === 0 ? (
                    <div className="p-6 text-center text-gray-500">No pending users</div>
                ) : (
                    <ul className="divide-y divide-gray-200">
                        {pendingUsers.map(u => (
                            <li key={u._id} className="p-6 flex items-center justify-between hover:bg-gray-50">
                                <div>
                                    <h4 className="text-lg font-medium text-gray-900">{u.name}</h4>
                                    <p className="text-sm text-gray-500">{u.email} • {u.city}, {u.state} • {u.age} yrs</p>
                                </div>
                                <button
                                    onClick={() => handleApproveUser(u._id)}
                                    className="px-4 py-2 bg-green-600 text-white rounded-md text-sm font-medium hover:bg-green-700 transition"
                                >
                                    Approve
                                </button>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
            
        </div>
    );
};

export default AdminDashboard;
