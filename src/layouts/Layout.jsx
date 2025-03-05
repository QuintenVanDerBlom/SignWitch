import { Link, Outlet } from 'react-router';

function Layout() {
    return (
        <div className="min-h-screen bg-nav-bar text-white">
            {/* Header */}
            <header className="bg-nav-bar shadow-lg py-4">
                <nav className="container mx-auto flex justify-between items-center px-4">
                    <Link
                        to={`/`}
                        className="font-semibold text-2xl hover:underline transition-all duration-300"
                    >
                        Home
                    </Link>
                    <Link
                        to={`/create`}
                        className="font-semibold text-2xl hover:underline transition-all duration-300"
                    >
                        Create New Song
                    </Link>
                </nav>
            </header>

            {/* Main Content */}
            <main className="container mx-auto px-4 py-8">
                <Outlet />
            </main>

            {/* Footer (Optioneel, maar kan toegevoegd worden voor een meer dynamische ervaring) */}
            <footer className="text-center py-4 mt-8 text-gray-400">
                <p>&copy; 2025 Music App - All Rights Reserved</p>
            </footer>
        </div>
    );
}

export default Layout;
