import { useState, useEffect } from 'react';
import axios from 'axios';

const Events = () => {
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const { data } = await axios.get('http://localhost:5000/api/events');
                setEvents(data);
                setLoading(false);
            } catch (error) {
                console.error(error);
                setLoading(false);
            }
        };

        fetchEvents();
    }, []);

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 min-h-[calc(100vh-4rem)]">
            <div className="text-center mb-12">
                <h1 className="text-4xl font-serif font-bold text-[var(--color-deep-red)] mb-4">
                    Community Events
                </h1>
                <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                    Stay connected with the Gahoi community through our regular meetings, festivals, and charity programs.
                </p>
            </div>

            {loading ? (
                <div className="flex justify-center mt-20">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[var(--color-saffron)]"></div>
                </div>
            ) : events.length === 0 ? (
                <div className="bg-white rounded-xl p-10 text-center shadow-sm border border-orange-50">
                    <div className="text-5xl mb-4">📅</div>
                    <h3 className="text-xl font-medium text-gray-800 mb-2">No Upcoming Events</h3>
                    <p className="text-gray-500">Check back later for new announcements.</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {events.map(event => (
                        <div key={event._id} className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-lg transition flex flex-col h-full border border-orange-50">
                            {event.imageUrl ? (
                                <img src={event.imageUrl} alt={event.title} className="w-full h-48 object-cover" />
                            ) : (
                                <div className="w-full h-48 bg-gradient-to-tr from-orange-100 to-red-50 flex items-center justify-center">
                                    <span className="text-5xl opacity-50">🎉</span>
                                </div>
                            )}
                            <div className="p-6 flex flex-col flex-grow">
                                <div className="flex justify-between items-start mb-4">
                                    <span className="inline-block px-3 py-1 bg-orange-100 text-[var(--color-deep-red)] text-xs font-semibold rounded-full uppercase tracking-wider">
                                        {event.eventType}
                                    </span>
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 mb-2">{event.title}</h3>
                                <p className="text-gray-600 mb-6 flex-grow line-clamp-3">{event.description}</p>
                                
                                <div className="space-y-2 mt-auto text-sm text-gray-500 pt-4 border-t border-gray-100">
                                    <div className="flex items-center">
                                        <span className="mr-2">📅</span>
                                        {new Date(event.date).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                                    </div>
                                    <div className="flex items-center mt-2">
                                        <span className="mr-2">📍</span>
                                        <span className="truncate">{event.location}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Events;
