import { useState, useContext, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const Register = () => {
    const [formData, setFormData] = useState({
        name: '',
        fatherName: '',
        email: '',
        phoneNumber: '',
        city: '',
        state: '',
        profession: '',
        age: '',
        gender: 'Male',
        password: '',
        confirmPassword: ''
    });
    const [error, setError] = useState('');
    
    const { register, user } = useContext(AuthContext);
    const navigate = useNavigate();
    const location = useLocation();
    
    const redirect = location.search ? location.search.split('=')[1] : '/';

    useEffect(() => {
        if (user) {
            navigate(redirect);
        }
    }, [user, navigate, redirect]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const submitHandler = async (e) => {
        e.preventDefault();
        if (formData.password !== formData.confirmPassword) {
            setError('Passwords do not match');
            return;
        }
        
        try {
            // Remove confirmPassword before sending
            const { confirmPassword, ...submitData } = formData;
            await register(submitData);
        } catch (err) {
            setError(err.response?.data?.message || 'Error creating account');
        }
    };

    return (
        <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-2xl w-full space-y-8 bg-white p-10 rounded-xl shadow-xl border border-orange-100">
                <div>
                    <h2 className="mt-6 text-center text-3xl font-serif font-extrabold text-gray-900">
                        Join Gahoi Samaj Connect
                    </h2>
                    <p className="mt-2 text-center text-sm text-gray-600">
                        Already have an account?{' '}
                        <Link to={`/login?redirect=${redirect}`} className="font-medium text-[var(--color-deep-red)] hover:text-red-700">
                            Sign in here
                        </Link>
                    </p>
                </div>
                <form className="mt-8 space-y-6" onSubmit={submitHandler}>
                    {error && (
                        <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-4">
                            <p className="text-sm text-red-700">{error}</p>
                        </div>
                    )}
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Full Name *</label>
                            <input type="text" name="name" required value={formData.name} onChange={handleChange}
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[var(--color-saffron)] focus:border-[var(--color-saffron)]" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Father's Name *</label>
                            <input type="text" name="fatherName" required value={formData.fatherName} onChange={handleChange}
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[var(--color-saffron)] focus:border-[var(--color-saffron)]" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Email Address *</label>
                            <input type="email" name="email" required value={formData.email} onChange={handleChange}
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[var(--color-saffron)] focus:border-[var(--color-saffron)]" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Phone Number *</label>
                            <input type="text" name="phoneNumber" required value={formData.phoneNumber} onChange={handleChange}
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[var(--color-saffron)] focus:border-[var(--color-saffron)]" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">City *</label>
                            <input type="text" name="city" required value={formData.city} onChange={handleChange}
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[var(--color-saffron)] focus:border-[var(--color-saffron)]" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">State *</label>
                            <input type="text" name="state" required value={formData.state} onChange={handleChange}
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[var(--color-saffron)] focus:border-[var(--color-saffron)]" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Profession</label>
                            <input type="text" name="profession" value={formData.profession} onChange={handleChange}
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[var(--color-saffron)] focus:border-[var(--color-saffron)]" />
                        </div>
                        <div className="flex space-x-4">
                            <div className="w-1/2">
                                <label className="block text-sm font-medium text-gray-700">Age *</label>
                                <input type="number" name="age" required min="1" value={formData.age} onChange={handleChange}
                                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[var(--color-saffron)] focus:border-[var(--color-saffron)]" />
                            </div>
                            <div className="w-1/2">
                                <label className="block text-sm font-medium text-gray-700">Gender *</label>
                                <select name="gender" required value={formData.gender} onChange={handleChange}
                                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[var(--color-saffron)] focus:border-[var(--color-saffron)]">
                                    <option value="Male">Male</option>
                                    <option value="Female">Female</option>
                                </select>
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Password *</label>
                            <input type="password" name="password" required value={formData.password} onChange={handleChange}
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[var(--color-saffron)] focus:border-[var(--color-saffron)]" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Confirm Password *</label>
                            <input type="password" name="confirmPassword" required value={formData.confirmPassword} onChange={handleChange}
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[var(--color-saffron)] focus:border-[var(--color-saffron)]" />
                        </div>
                    </div>

                    <div>
                        <button
                            type="submit"
                            className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-bold rounded-md text-white bg-[var(--color-saffron)] hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 transition shadow-md"
                        >
                            Create Account
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Register;
