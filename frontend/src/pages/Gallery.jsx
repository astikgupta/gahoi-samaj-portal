const Gallery = () => {
    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 min-h-[calc(100vh-4rem)]">
            <div className="text-center mb-12">
                <h1 className="text-4xl font-serif font-bold text-[var(--color-deep-red)] mb-4">
                    Photo Gallery
                </h1>
                <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                    Memories from our recent Gahoi Samaj community events and gatherings.
                </p>
            </div>
            
            <div className="bg-white rounded-xl p-16 text-center shadow-sm border border-orange-50">
                <div className="text-6xl mb-6">📸</div>
                <h3 className="text-2xl font-medium text-gray-800 mb-2">Coming Soon</h3>
                <p className="text-gray-500">The photo gallery is currently being curated.</p>
            </div>
        </div>
    );
};

export default Gallery;
