import Link from 'next/link';

export default function Navbar() {
    return (
        <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16">
                    <div className="flex">
                        <div className="flex-shrink-0 flex items-center">
                            <span className="text-2xl font-extrabold bg-gradient-to-r from-emerald-600 to-teal-500 bg-clip-text text-transparent">
                                Release Management
                            </span>
                        </div>
                        <div className="hidden sm:ml-8 sm:flex sm:space-x-8">
                            <Link
                                href="/"
                                className="border-transparent text-gray-500 hover:border-emerald-500 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium transition-colors"
                            >
                                Dashboard
                            </Link>
                            <Link
                                href="/eligibility"
                                className="border-transparent text-gray-500 hover:border-emerald-500 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium transition-colors"
                            >
                                Éligibilité
                            </Link>
                            <Link
                                href="/releases"
                                className="border-transparent text-gray-500 hover:border-emerald-500 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium transition-colors"
                            >
                                Releases
                            </Link>
                            <Link
                                href="/delivery"
                                className="border-transparent text-gray-500 hover:border-emerald-500 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium transition-colors"
                            >
                                Flux Livraison
                            </Link>
                            <div className="relative flex items-center group">
                                <button className="border-transparent text-gray-500 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium transition-colors h-full">
                                    Administration
                                </button>
                                <div className="absolute top-full left-0 hidden group-hover:block bg-white shadow-xl rounded-lg border border-gray-100 p-2 min-w-[200px] animate-in fade-in slide-in-from-top-2">
                                    <Link href="/delivery/admin" className="block px-4 py-2 text-sm text-gray-600 hover:bg-slate-50 hover:text-emerald-600 rounded">Admin Couloirs</Link>
                                    <Link href="/mapping/admin" className="block px-4 py-2 text-sm text-gray-600 hover:bg-slate-50 hover:text-emerald-600 rounded">Admin Mapping</Link>
                                    <Link href="/mapping" className="block px-4 py-2 text-sm text-gray-600 hover:bg-slate-50 hover:text-emerald-600 rounded">Vue Mapping</Link>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="flex items-center">
                        <div className="flex-shrink-0">
                            <span className="inline-flex items-center px-3 py-0.5 rounded-full text-sm font-medium bg-emerald-100 text-emerald-800">
                                v2.0 Beta
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
}
