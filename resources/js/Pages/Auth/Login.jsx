import Checkbox from '@/Components/Checkbox';
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

export default function Login({ status, canResetPassword }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: false,
    });

    const { toasts, showSuccess, showError, removeToast } = useToast();
    const [loginError, setLoginError] = useState('');

    const submit = (e) => {
        e.preventDefault();
        setLoginError(''); // Clear previous errors

        // Basic validation
        if (!data.email || !data.password) {
            setLoginError('Por favor completa todos los campos requeridos');
            return;
        }

        post(route('login'), {
            onSuccess: () => {
                showSuccess('¡Bienvenido de vuelta! Iniciando sesión...');
            },
            onError: (errors) => {
                if (errors.email) {
                    setLoginError('Credenciales incorrectas. Verifica tu email y contraseña.');
                } else if (errors.password) {
                    setLoginError('Credenciales incorrectas. Verifica tu email y contraseña.');
                } else {
                    setLoginError('Error al iniciar sesión. Por favor intenta nuevamente.');
                }
                showError('Error al iniciar sesión');
            },
            onFinish: () => reset('password'),
        });
    };

    return (
        <GuestLayout>
            <Head title="Iniciar Sesión" />

            {/* Welcome title */}
            <div className="mb-8">
                <h1 className="text-3xl font-light text-gray-900 mb-2">
                    Bienvenido, inicia sesión en tu cuenta.
                </h1>
            </div>

            {status && (
                <Alert
                    message={status}
                    type="info"
                    className="mb-6"
                />
            )}

            {loginError && (
                <Alert
                    message={loginError}
                    type="error"
                    className="mb-6"
                    dismissible={true}
                    onClose={() => setLoginError('')}
                />
            )}

            <form onSubmit={submit}>
                <div className="mb-6">
                    <InputLabel htmlFor="email" value="Usuario o Correo Electrónico" className="text-gray-600 text-sm mb-2" />

                    <TextInput
                        id="email"
                        type="email"
                        name="email"
                        value={data.email}
                        className="mt-1 block w-full bg-gray-100 border-0 rounded-lg px-4 py-3 text-gray-900 placeholder-gray-500 focus:bg-white focus:ring-2 focus:ring-gray-200"
                        placeholder="nombre@dominio.com"
                        autoComplete="username"
                        isFocused={true}
                        onChange={(e) => setData('email', e.target.value)}
                    />

                    <InputError message={errors.email} className="mt-2" />
                </div>

                <div className="mb-6">
                    <InputLabel htmlFor="password" value="Contraseña" className="text-gray-600 text-sm mb-2" />

                    <PasswordInput
                        id="password"
                        name="password"
                        value={data.password}
                        className="mt-1 block w-full bg-gray-100 border-0 rounded-lg px-4 py-3 text-gray-900 placeholder-gray-500 focus:bg-white focus:ring-2 focus:ring-gray-200"
                        placeholder="Ingresa tu contraseña"
                        autoComplete="current-password"
                        onChange={(e) => setData('password', e.target.value)}
                    />

                    <InputError message={errors.password} className="mt-2" />
                </div>



                <div className="mb-6">
                    <button
                        type="submit"
                        disabled={processing}
                        className="w-full bg-gray-900 text-white py-3 px-4 rounded-full font-medium hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                        Iniciar Sesión
                    </button>
                </div>

                <div className="flex items-center justify-between text-sm mb-6">
                    <div className="flex items-center">
                        <Checkbox
                            name="remember"
                            checked={data.remember}
                            onChange={(e) =>
                                setData('remember', e.target.checked)
                            }
                            className="rounded border-gray-300 text-gray-900 focus:ring-gray-500"
                        />
                        <span className="ml-2 text-gray-600">
                            Recordarme
                        </span>
                    </div>

                    {canResetPassword && (
                        <Link
                            href={route('password.request')}
                            className="text-gray-600 hover:text-gray-900 focus:outline-none focus:underline"
                        >
                            ¿Olvidaste tu contraseña?
                        </Link>
                    )}
                </div>

                {/* Register link */}
                <div className="text-center border-t border-gray-100 pt-6">
                    <p className="text-gray-600 text-sm mb-2">¿Aún no tienes una cuenta?</p>
                    <Link
                        href={route('register')}
                        className="inline-flex items-center justify-center w-full py-3 px-4 border border-gray-300 rounded-full text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-colors font-medium"
                    >
                        Crear Nueva Cuenta
                    </Link>
                </div>
            </form>

            {/* Toast Container */}
            <ToastContainer toasts={toasts} onRemoveToast={removeToast} />
        </GuestLayout>
    );
}
