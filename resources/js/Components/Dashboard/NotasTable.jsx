import { useState, useEffect } from 'react';
import NotaModal from './NotaModal';
import { useToast } from '@/Hooks/useToast';
import ToastContainer from '@/Components/ToastContainer';
import axios from 'axios';

const NotasTable = () => {
    const { toasts, showSuccess, showError, removeToast } = useToast();
    const [selectedRows, setSelectedRows] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingNota, setEditingNota] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [loading, setLoading] = useState(true);

    // Estado para las notas desde la base de datos
    const [notas, setNotas] = useState([]);

    // Cargar notas al montar el componente
    useEffect(() => {
        fetchNotas();
    }, []);

    const fetchNotas = async () => {
        try {
            setLoading(true);
            const response = await axios.get('/notas');
            if (response.data.success) {
                setNotas(response.data.data);
            }
        } catch (error) {
            console.error('Error al cargar notas:', error);
            showError('Error al cargar las notas');
        } finally {
            setLoading(false);
        }
    };

    const handleRowSelect = (id) => {
        setSelectedRows(prev =>
            prev.includes(id)
                ? prev.filter(rowId => rowId !== id)
                : [...prev, id]
        );
    };

    const handleSelectAll = () => {
        setSelectedRows(
            selectedRows.length === notas.length ? [] : notas.map(nota => nota.id)
        );
    };

    const handleAddNota = () => {
        setEditingNota(null);
        setIsModalOpen(true);
    };

    const handleEditNota = (nota) => {
        setEditingNota(nota);
        setIsModalOpen(true);
    };

    const handleSaveNota = async (notaData) => {
        try {
            if (editingNota) {
                // Editar nota existente
                const response = await axios.put(`/notas/${editingNota.id}`, notaData);
                if (response.data.success) {
                    setNotas(prev => prev.map(nota =>
                        nota.id === editingNota.id ? response.data.data : nota
                    ));
                    showSuccess('Nota actualizada exitosamente');
                }
            } else {
                // Crear nueva nota
                const response = await axios.post('/notas', notaData);
                if (response.data.success) {
                    setNotas(prev => [...prev, response.data.data]);
                    showSuccess('Nota creada exitosamente');
                }
            }
            setIsModalOpen(false);
        } catch (error) {
            console.error('Error al guardar nota:', error);
            if (error.response?.data?.errors) {
                // Mostrar errores de validación
                const errorMessages = Object.values(error.response.data.errors).flat();
                showError(errorMessages.join(', '));
            } else {
                showError('Error al guardar la nota');
            }
        }
    };

    const handleDeleteSelected = async () => {
        try {
            const response = await axios.delete('/notas-multiple', {
                data: { ids: selectedRows }
            });
            
            if (response.data.success) {
                setNotas(prev => prev.filter(nota => !selectedRows.includes(nota.id)));
                setSelectedRows([]);
                showSuccess(response.data.message);
            }
        } catch (error) {
            console.error('Error al eliminar notas:', error);
            showError('Error al eliminar las notas');
        }
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('es-ES', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    };

    const truncateText = (text, maxLength = 50) => {
        if (text.length <= maxLength) return text;
        return text.substring(0, maxLength) + '...';
    };

    const filteredNotas = notas.filter(nota =>
        nota.titulo.toLowerCase().includes(searchTerm.toLowerCase()) ||
        nota.contenido.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                    <h1 className="text-4xl font-light text-gray-900">📋 Mis Notas</h1>
                    <p className="text-gray-600 mt-1">Gestiona tus notas con imágenes</p>
                </div>

                <div className="flex items-center space-x-4">
                    {/* Search */}
                    <div className="relative">
                        <input
                            type="text"
                            placeholder="Buscar notas..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="border border-gray-300 rounded-lg pl-10 pr-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 w-64"
                        />
                        <svg className="w-4 h-4 text-gray-400 absolute left-3 top-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                    </div>

                    <button
                        onClick={handleAddNota}
                        className="bg-blue-600 text-white px-6 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 flex items-center space-x-2 transition-colors"
                    >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                        </svg>
                        <span>Nueva Nota</span>
                    </button>
                </div>
            </div>

            {/* Actions Bar */}
            {selectedRows.length > 0 && (
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <div className="flex items-center justify-between">
                        <span className="text-sm text-blue-800">
                            {selectedRows.length} nota(s) seleccionada(s)
                        </span>
                        <button
                            onClick={handleDeleteSelected}
                            className="text-red-600 hover:text-red-800 text-sm font-medium flex items-center space-x-1"
                        >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                            <span>Eliminar</span>
                        </button>
                    </div>
                </div>
            )}

            {/* Table */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                <table className="w-full">
                    <thead className="bg-gray-50 border-b border-gray-200">
                        <tr>
                            <th className="w-12 px-6 py-3 text-left">
                                <input
                                    type="checkbox"
                                    checked={selectedRows.length === filteredNotas.length && filteredNotas.length > 0}
                                    onChange={handleSelectAll}
                                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                                />
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Imagen</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Título</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Contenido</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Fecha</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Acciones</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {loading ? (
                            <tr>
                                <td colSpan="6" className="px-6 py-12 text-center text-gray-500">
                                    <div className="flex flex-col items-center">
                                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mb-4"></div>
                                        <p className="text-lg font-medium text-gray-900">Cargando notas...</p>
                                    </div>
                                </td>
                            </tr>
                        ) : filteredNotas.length === 0 ? (
                            <tr>
                                <td colSpan="6" className="px-6 py-12 text-center text-gray-500">
                                    <div className="flex flex-col items-center">
                                        <svg className="w-12 h-12 text-gray-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                        </svg>
                                        <p className="text-lg font-medium text-gray-900 mb-1">
                                            {searchTerm ? 'No se encontraron notas' : 'No hay notas'}
                                        </p>
                                        <p className="text-sm text-gray-500">
                                            {searchTerm ? 'Intenta con otros términos de búsqueda' : 'Comienza creando tu primera nota'}
                                        </p>
                                    </div>
                                </td>
                            </tr>
                        ) : (
                            filteredNotas.map((nota) => (
                                <tr
                                    key={nota.id}
                                    className={`hover:bg-gray-50 transition-colors ${
                                        selectedRows.includes(nota.id) ? 'bg-yellow-50 border-l-4 border-yellow-400' : ''
                                    }`}
                                >
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <input
                                            type="checkbox"
                                            checked={selectedRows.includes(nota.id)}
                                            onChange={() => handleRowSelect(nota.id)}
                                            className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                                        />
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        {nota.imagen ? (
                                            <img 
                                                src={nota.imagen} 
                                                alt={nota.titulo}
                                                className="w-12 h-12 rounded-lg object-cover border border-gray-200"
                                            />
                                        ) : (
                                            <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                                                <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                                </svg>
                                            </div>
                                        )}
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="text-sm font-medium text-gray-900">
                                            {nota.titulo}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="text-sm text-gray-600 max-w-xs">
                                            {truncateText(nota.contenido)}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        {formatDate(nota.fecha)}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                        <div className="flex items-center space-x-2">
                                            <button
                                                onClick={() => handleEditNota(nota)}
                                                className="text-blue-600 hover:text-blue-900 transition-colors"
                                            >
                                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                                </svg>
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>

            {/* Modal */}
            <NotaModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSave={handleSaveNota}
                nota={editingNota}
            />

            {/* Toast Container */}
            <ToastContainer toasts={toasts} onRemoveToast={removeToast} />
        </div>
    );
};

export default NotasTable;