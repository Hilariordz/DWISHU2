import ApplicationLogo from '@/Components/ApplicationLogo';
import { Link } from '@inertiajs/react';

export default function GuestLayout({ children }) {
    return (
        <div className="min-h-screen flex">
            {/* Left side - Dark architectural background */}
            <div className="hidden lg:flex lg:w-1/2 xl:w-2/3 relative overflow-hidden">
                {/* Background image with overlay */}
                <div
                    className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                    style={{
                        backgroundImage: `url('https://images.unsplash.com/photo-1688768645044-dd574258f9ef?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=580')`
                    }}
                >
                </div>

                {/* Dark overlay */}
                <div className="absolute inset-0 bg-black/40"></div>

                {/* Logo in top left */}
                <div className="absolute top-8 left-8 z-10">
                    <Link href="/" className="flex items-center space-x-2">
                        <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center backdrop-blur-sm">
                            <ApplicationLogo className="h-5 w-5 fill-current text-white" />
                        </div>
                    </Link>
                </div>
            </div>

            {/* Right side - White form panel */}
            <div className="w-full lg:w-1/2 xl:w-1/3 flex flex-col bg-white">
                {/* Top navbar */}
                <div className="flex items-center justify-between p-6 border-b border-gray-100">
                    {/* Mobile logo */}
                    <div className="lg:hidden flex items-center space-x-2">
                        <div className="w-6 h-6 bg-gray-900 rounded flex items-center justify-center">
                            <ApplicationLogo className="h-3 w-3 fill-current text-white" />
                        </div>
                    </div>

                    {/* Spacer for desktop */}
                    <div className="hidden lg:block">
                    </div>

                    {/* Back to home button */}
                    <Link
                        href="/"
                        className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors"
                    >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                        </svg>
                        <span className="text-sm font-medium">Volver al Inicio</span>
                    </Link>
                </div>

                {/* Form content */}
                <div className="flex-1 flex items-center justify-center px-8 py-12">
                    <div className="w-full max-w-sm">
                        {children}
                    </div>
                </div>
            </div>
        </div>
    );
}
