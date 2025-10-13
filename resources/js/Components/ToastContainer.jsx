import Toast from './Toast';

const ToastContainer = ({ toasts, onRemoveToast }) => {
    return (
        <div className="fixed top-0 right-0 z-50 p-6 space-y-3 pointer-events-none">
            {toasts.map((toast, index) => (
                <div 
                    key={toast.id} 
                    className="pointer-events-auto"
                    style={{ 
                        transform: `translateY(${index * 10}px)`,
                        zIndex: 1000 - index 
                    }}
                >
                    <Toast
                        message={toast.message}
                        type={toast.type}
                        isVisible={toast.isVisible}
                        onClose={() => onRemoveToast(toast.id)}
                        duration={toast.duration}
                        position="top-right"
                    />
                </div>
            ))}
        </div>
    );
};

export default ToastContainer;