import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import NotasTable from '@/Components/Dashboard/NotasTable';
import { Head } from '@inertiajs/react';

export default function Dashboard() {
    return (
        <AuthenticatedLayout>
            <Head title="Dashboard" />

            <div className="min-h-screen bg-gray-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    <NotasTable />
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
