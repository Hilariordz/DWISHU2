import { useState, useEffect } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { Fragment } from 'react';

const NotaModal = ({ isOpen, onClose, onSave, nota }) => {
    const [formData, setFormData] = useState({
        titulo: '',
        contenido: '',
        imagen: '',
        fecha: ''
    });

    const [errors, setErrors] = useState({});
    const [imagePreview, setImagePreview] = useState('');

    useEffect(() => {
        if (nota) {
            setFormData({
                titulo: nota.titulo || '',
                contenido: nota.contenido || '',
                imagen: nota.imagen || '',
                fecha: nota.fecha || ''
            });
            setImagePreview(nota.imagen || '');
        } else {
            const today = new Date().toISOString().split('T')[0];
            setFormData({
                titulo: '',
                contenido: '',
                imagen: '',
                fecha: today
            });
            setImagePreview('');
        }
        setErrors({});
    }, [nota, isOpen]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
        if (errors[name]) {
            setErrors(prev => ({
                ...prev,
                [name]: ''
            }));
        }
    };

    const handleImageChange = (e) => {
        const value = e.target.value;
        setFormData(prev => ({
            ...prev,
            imagen: value
        }));
        setImagePreview(value);

        if (errors.imagen) {
            setErrors(prev => ({
                ...prev,
                imagen: ''
            }));
        }
    };

    const validateForm = () => {
        const newErrors = {};

        if (!formData.titulo.trim()) {
            newErrors.titulo = 'El título es requerido';
        } else if (formData.titulo.length > 100) {
            newErrors.titulo = 'El título no puede exceder 100 caracteres';
        }

        if (!formData.contenido.trim()) {
            newErrors.contenido = 'El contenido es requerido';
        }

        if (!formData.fecha) {
            newErrors.fecha = 'La fecha es requerida';
        }

        if (formData.imagen && !isValidUrl(formData.imagen)) {
            newErrors.imagen = 'Debe ser una URL válida de imagen';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const isValidUrl = (string) => {
        try {
            new URL(string);
            return true;
        } catch (_) {
            return false;
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (validateForm()) {
            onSave(formData);
        }
    };

    const handleImageError = () => {
        setImagePreview('');
    };

    return (
        <Transition appear show={isOpen} as={Fragment}>
            <Dialog as="div" className="relative z-50" onClose={onClose}>
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm" />
                </Transition.Child>

                <div className="fixed inset-0 overflow-y-auto">
                    <div className="flex min-h-full items-center justify-center p-4 text-center">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 scale-95"
                            enterTo="opacity-100 scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 scale-100"
                            leaveTo="opacity-0 scale-95"
                        >
                            <Dialog.Panel className="w-full max-w-2xl transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                                <Dialog.Title
                                    as="h3"
                                    className="text-2xl font-semibold leading-6 text-gray-900 mb-6 flex items-center"
                                >
                                    <span className="mr-2">📝</span>
                                    {nota ? 'Editar Nota' : 'Nueva Nota'}
                                </Dialog.Title>

                                <form onSubmit={handleSubmit} className="space-y-6">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        {/* Título */}
                                        <div className="md:col-span-2">
                                            <label htmlFor="titulo" className="block text-sm font-medium text-gray-700 mb-2">
                                                Título *
                                            </label>
                                            <input
                                                type="text"
                                                id="titulo"
                                                name="titulo"
                                                value={formData.titulo}
                                                onChange={handleChange}
                                                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${errors.titulo ? 'border-red-300' : 'border-gray-300'
                                                    }`}
                                                placeholder="Ej: Mi nota importante"
                                                maxLength={100}
                                            />
                                            <div className="flex justify-between mt-1">
                                                {errors.titulo && (
                                                    <p className="text-sm text-red-600">{errors.titulo}</p>
                                                )}
                                                <p className="text-xs text-gray-500 ml-auto">
                                                    {formData.titulo.length}/100
                                                </p>
                                            </div>
                                        </div>

                                        {/* Fecha */}
                                        <div>
                                            <label htmlFor="fecha" className="block text-sm font-medium text-gray-700 mb-2">
                                                Fecha *
                                            </label>
                                            <input
                                                type="date"
                                                id="fecha"
                                                name="fecha"
                                                value={formData.fecha}
                                                onChange={handleChange}
                                                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${errors.fecha ? 'border-red-300' : 'border-gray-300'
                                                    }`}
                                            />
                                            {errors.fecha && (
                                                <p className="mt-1 text-sm text-red-600">{errors.fecha}</p>
                                            )}
                                        </div>

                                        {/* URL de Imagen */}
                                        <div>
                                            <label htmlFor="imagen" className="block text-sm font-medium text-gray-700 mb-2">
                                                URL de Imagen
                                            </label>
                                            <input
                                                type="url"
                                                id="imagen"
                                                name="imagen"
                                                value={formData.imagen}
                                                onChange={handleImageChange}
                                                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${errors.imagen ? 'border-red-300' : 'border-gray-300'
                                                    }`}
                                                placeholder="https://ejemplo.com/imagen.jpg"
                                            />
                                            {errors.imagen && (
                                                <p className="mt-1 text-sm text-red-600">{errors.imagen}</p>
                                            )}
                                        </div>

                                        {/* Preview de Imagen */}
                                        {imagePreview && (
                                            <div className="md:col-span-2">
                                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                                    Vista Previa
                                                </label>
                                                <div className="border border-gray-200 rounded-lg p-4 bg-gray-50">
                                                    <img
                                                        src={imagePreview}
                                                        alt="Vista previa"
                                                        className="max-w-full h-48 object-cover rounded-lg mx-auto"
                                                        onError={handleImageError}
                                                    />
                                                </div>
                                            </div>
                                        )}

                                        {/* Contenido */}
                                        <div className="md:col-span-2">
                                            <label htmlFor="contenido" className="block text-sm font-medium text-gray-700 mb-2">
                                                Contenido *
                                            </label>
                                            <textarea
                                                id="contenido"
                                                name="contenido"
                                                value={formData.contenido}
                                                onChange={handleChange}
                                                rows={6}
                                                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none ${errors.contenido ? 'border-red-300' : 'border-gray-300'
                                                    }`}
                                                placeholder="Escribe el contenido de tu nota aquí..."
                                            />
                                            {errors.contenido && (
                                                <p className="mt-1 text-sm text-red-600">{errors.contenido}</p>
                                            )}
                                        </div>
                                    </div>

                                    {/* Buttons */}
                                    <div className="flex items-center justify-end space-x-4 pt-6 border-t border-gray-200">
                                        <button
                                            type="button"
                                            onClick={onClose}
                                            className="px-6 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 font-medium transition-colors"
                                        >
                                            Cancelar
                                        </button>
                                        <button
                                            type="submit"
                                            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium transition-colors flex items-center space-x-2"
                                        >
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                            </svg>
                                            <span>{nota ? 'Actualizar' : 'Crear'} Nota</span>
                                        </button>
                                    </div>
                                </form>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition>
    );
};

export default NotaModal;