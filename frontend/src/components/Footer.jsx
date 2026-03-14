import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <footer className="bg-gray-900 text-white pt-12 pb-8 mt-auto">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div>
                        <span className="font-serif text-2xl font-bold text-[var(--color-deep-red)] block mb-4">
                            Gahoi<span className="text-[var(--color-saffron)]">Connect</span>
                        </span>
                        <p className="text-gray-400 text-sm">
                            A secure and modern platform dedicated to bringing the Gahoi community closer together through directory, events, and matrimonial services.
                        </p>
                    </div>
                    <div>
                        <h3 className="text-sm font-semibold text-gray-300 tracking-wider uppercase mb-4">Quick Links</h3>
                        <ul className="space-y-2 text-sm text-gray-400">
                            <li><Link to="/" className="hover:text-white transition">Home</Link></li>
                            <li><Link to="/members" className="hover:text-white transition">Member Directory</Link></li>
                            <li><Link to="/matrimonial" className="hover:text-white transition">Marriage Profiles</Link></li>
                            <li><Link to="/events" className="hover:text-white transition">Events</Link></li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="text-sm font-semibold text-gray-300 tracking-wider uppercase mb-4">Contact</h3>
                        <ul className="space-y-2 text-sm text-gray-400">
                            <li>Email: support@gahoiconnect.org</li>
                            <li>Privacy Policy</li>
                            <li>Terms of Service</li>
                        </ul>
                    </div>
                </div>
                <div className="mt-8 border-t border-gray-700 pt-8 flex flex-col md:flex-row justify-between items-center">
                    <p className="text-base text-gray-400">&copy; {new Date().getFullYear()} Gahoi Samaj Connect. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
