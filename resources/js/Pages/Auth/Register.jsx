import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import PasswordInput from '@/Components/PasswordInput';
import Alert from '@/Components/Alert';
import ToastContainer from '@/Components/ToastContainer';
import GuestLayout from '@/Layouts/GuestLayout';
import { useToast } from '@/Hooks/useToast';
import { Head, Link, useForm } from '@inertiajs/react';
import { useState } from 'react';

export default function Register() {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
    });

    const { toasts, showSuccess, showError, showWarning, removeToast } = useToast();
    const [registerError, setRegisterError] = useState('');
    const [validationErrors, setValidationErrors] = useState({});

    const validateForm = () => {
        const newErrors = {};

        if (!data.name.trim()) {
            newErrors.name = 'El nombre es requerido';
        }

        if (!data.email.trim()) {
            newErrors.email = 'El correo electrónico es requerido';
        } else if (!/\S+@\S+\.\S+/.test(data.email)) {
            newErrors.email = 'El formato del correo electrónico es inválido';
        }

        if (!data.password) {
            newErrors.password = 'La contraseña es requerida';
        } else if (data.password.length < 8) {
            newErrors.password = 'La contraseña debe tener al menos 8 caracteres';
        }

        if (!data.password_confirmation) {
            newErrors.password_confirmation = 'Debes confirmar tu contraseña';
        } else if (data.password !== data.password_confirmation) {
            newErrors.password_confirmation = 'Las contraseñas no coinciden';
        }

        setValidationErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const submit = (e) => {
        e.preventDefault();
        setRegisterError('');
        setValidationErrors({});

        if (!validateForm()) {
            showWarning('Por favor corrige los errores en el formulario');
            return;
        }

        post(route('register'), {
            onSuccess: () => {
                showSuccess('¡Cuenta creada exitosamente! Redirigiendo al login...');
                setTimeout(() => {
                    window.location.href = route('login');
                }, 1500);
            },
            onError: (errors) => {
                if (errors.email) {
                    setRegisterError('Este correo electrónico ya está registrado');
                } else {
                    setRegisterError('Error al crear la cuenta. Por favor intenta nuevamente.');
                }
                showError('Error al crear la cuenta');
            },
            onFinish: () => reset('password', 'password_confirmation'),
        });
    };

    return (
        <GuestLayout>
            <Head title="Registrarse" />

            {/* Welcome title */}
            <div className="mb-8">
                <h1 className="text-3xl font-light text-gray-900 mb-2">
                    Bienvenido, crea tu cuenta.
                </h1>
            </div>

            {registerError && (
                <Alert 
                    message={registerError} 
                    type="error" 
                    className="mb-6"
                    dismissible={true}
                    onClose={() => setRegisterError('')}
                />
            )}

            <form onSubmit={submit}>
                <div className="mb-6">
                    <InputLabel htmlFor="name" value="Nombre Completo" className="text-gray-600 text-sm mb-2" />

                    <TextInput
                        id="name"
                        name="name"
                        value={data.name}
                        className="mt-1 block w-full bg-gray-100 border-0 rounded-lg px-4 py-3 text-gray-900 placeholder-gray-500 focus:bg-white focus:ring-2 focus:ring-gray-200"
                        placeholder="Tu Nombre Completo"
                        autoComplete="name"
                        isFocused={true}
                        onChange={(e) => setData('name', e.target.value)}
                        required
                    />

                    <InputError message={errors.name || validationErrors.name} className="mt-2" />
                </div>

                <div className="mb-6">
                    <InputLabel htmlFor="email" value="Correo Electrónico" className="text-gray-600 text-sm mb-2" />

                    <TextInput
                        id="email"
                        type="email"
                        name="email"
                        value={data.email}
                        className="mt-1 block w-full bg-gray-100 border-0 rounded-lg px-4 py-3 text-gray-900 placeholder-gray-500 focus:bg-white focus:ring-2 focus:ring-gray-200"
                        placeholder="nombre@dominio.com"
                        autoComplete="username"
                        onChange={(e) => setData('email', e.target.value)}
                        required
                    />

                    <InputError message={errors.email || validationErrors.email} className="mt-2" />
                </div>

                <div className="mb-6">
                    <InputLabel htmlFor="password" value="Contraseña" className="text-gray-600 text-sm mb-2" />

                    <PasswordInput
                        id="password"
                        name="password"
                        value={data.password}
                        className="mt-1 block w-full bg-gray-100 border-0 rounded-lg px-4 py-3 text-gray-900 placeholder-gray-500 focus:bg-white focus:ring-2 focus:ring-gray-200"
                        placeholder="Crea una contraseña segura"
                        autoComplete="new-password"
                        onChange={(e) => setData('password', e.target.value)}
                        required
                    />

                    <InputError message={errors.password || validationErrors.password} className="mt-2" />
                </div>

                <div className="mb-6">
                    <InputLabel
                        htmlFor="password_confirmation"
                        value="Confirmar Contraseña"
                        className="text-gray-600 text-sm mb-2"
                    />

                    <PasswordInput
                        id="password_confirmation"
                        name="password_confirmation"
                        value={data.password_confirmation}
                        className="mt-1 block w-full bg-gray-100 border-0 rounded-lg px-4 py-3 text-gray-900 placeholder-gray-500 focus:bg-white focus:ring-2 focus:ring-gray-200"
                        placeholder="Confirma tu contraseña"
                        autoComplete="new-password"
                        onChange={(e) =>
                            setData('password_confirmation', e.target.value)
                        }
                        required
                    />

                    <InputError
                        message={errors.password_confirmation || validationErrors.password_confirmation}
                        className="mt-2"
                    />
                </div>

                <div className="mb-6">
                    <button
                        type="submit"
                        disabled={processing}
                        className="w-full bg-gray-900 text-white py-3 px-4 rounded-full font-medium hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                        Crear Cuenta
                    </button>
                </div>

                {/* Login link */}
                <div className="text-center border-t border-gray-100 pt-6">
                    <p className="text-gray-600 text-sm mb-2">¿Ya tienes una cuenta?</p>
                    <Link
                        href={route('login')}
                        className="inline-flex items-center justify-center w-full py-3 px-4 border border-gray-300 rounded-full text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-colors font-medium"
                    >
                        Iniciar Sesión
                    </Link>
                </div>
            </form>

            {/* Toast Container */}
            <ToastContainer toasts={toasts} onRemoveToast={removeToast} />
        </GuestLayout>
    );
}
