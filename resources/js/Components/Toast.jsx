import { useEffect, useState } from 'react';

const Toast = ({ 
    message, 
    type = 'success', 
    isVisible, 
    onClose, 
    duration = 4000,
    position = 'top-right' 
}) => {
    const [isShowing, setIsShowing] = useState(false);

    useEffect(() => {
        if (isVisible) {
            setIsShowing(true);
            const timer = setTimeout(() => {
                setIsShowing(false);
                setTimeout(onClose, 300); // Wait for animation to complete
            }, duration);

            return () => clearTimeout(timer);
        }
    }, [isVisible, duration, onClose]);

    if (!isVisible) return null;

    const getToastStyles = () => {
        const baseStyles = "fixed z-50 flex items-center gap-3 px-4 py-3 rounded-lg shadow-lg backdrop-blur-sm border transition-all duration-300 ease-out max-w-sm";
        
        const positions = {
            'top-right': 'top-6 right-6',
            'top-left': 'top-6 left-6',
            'top-center': 'top-6 left-1/2 transform -translate-x-1/2',
            'bottom-right': 'bottom-6 right-6',
        };

        const types = {
            success: 'bg-white/95 border-green-200 text-green-800',
            error: 'bg-white/95 border-red-200 text-red-800',
            warning: 'bg-white/95 border-yellow-200 text-yellow-800',
            info: 'bg-white/95 border-blue-200 text-blue-800',
        };

        const animation = isShowing 
            ? 'translate-x-0 opacity-100' 
            : 'translate-x-full opacity-0';

        return `${baseStyles} ${positions[position]} ${types[type]} ${animation}`;
    };

    const getIcon = () => {
        const iconStyles = "w-5 h-5 flex-shrink-0";
        
        switch (type) {
            case 'success':
                return (
                    <svg className={`${iconStyles} text-green-600`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                );
            case 'error':
                return (
                    <svg className={`${iconStyles} text-red-600`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                );
            case 'warning':
                return (
                    <svg className={`${iconStyles} text-yellow-600`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                    </svg>
                );
            case 'info':
                return (
                    <svg className={`${iconStyles} text-blue-600`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                );
            default:
                return null;
        }
    };

    return (
        <div className={getToastStyles()}>
            {getIcon()}
            <span className="text-sm font-medium flex-1">{message}</span>
            <button
                onClick={() => {
                    setIsShowing(false);
                    setTimeout(onClose, 300);
                }}
                className="text-gray-400 hover:text-gray-600 transition-colors ml-2"
            >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
            </button>
        </div>
    );
};

export default Toast;