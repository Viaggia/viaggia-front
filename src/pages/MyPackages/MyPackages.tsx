import { useEffect, useState } from 'react';
import { deletePackage, getPackagesByUserId } from '../../services/packageService';
import { PackageDTO, PackageCreateDTO, PackageUpdateDTO } from '../../types/Package';
import { FaBoxOpen } from 'react-icons/fa';
import ToastForm from '../../components/Toast/ToastForm';
import PackageAdmCard from '../../components/cards/PackageAdmCard/PackageAdmCard';
import CreatePackageForm from '../../components/forms/CreatePackageForm/CreatePackageForm';
import ConfirmDeleteModal from '../../components/Modals/ConfirmDeleteModal/ConfirmDeleteModal';

interface Props {
    userId: number;
}

function MyPackages({ userId }: Props) {
    const [packages, setPackages] = useState<PackageDTO[]>([]);
    const [loading, setLoading] = useState(true);
    const [showDeleteToast, setShowDeleteToast] = useState(false);
    const [showEditToast, setShowEditToast] = useState(false);
    const [deletingId, setDeletingId] = useState<number | null>(null);
    const [editingPackage, setEditingPackage] = useState<PackageDTO | null>(null);
    const [showEditModal, setShowEditModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [selectedDeleteId, setSelectedDeleteId] = useState<number | null>(null);

    useEffect(() => {
        getPackagesByUserId()
            .then(setPackages)
            .finally(() => setLoading(false));
    }, [userId]);

    const backendUrl = import.meta.env.VITE_API_URL;

    const handleEdit = (packageId: number) => {
        const pkg = packages.find(p => p.packageId === packageId);
        if (pkg) {
            setEditingPackage(pkg);
            setShowEditModal(true);
        }
    };

    const handleDeleteClick = (packageId: number) => {
        setSelectedDeleteId(packageId);
        setShowDeleteModal(true);
    };

    const handleConfirmDelete = async () => {
        if (!selectedDeleteId) return;
        setDeletingId(selectedDeleteId);
        try {
            await deletePackage(selectedDeleteId);
            setPackages(prev => prev.filter(p => p.packageId !== selectedDeleteId));
            setShowDeleteToast(true);
            setShowDeleteModal(false);
            setSelectedDeleteId(null);
            setTimeout(() => setShowDeleteToast(false), 2000);
        } catch (error) {
            setShowDeleteModal(false);
            setSelectedDeleteId(null);
            setDeletingId(null);
            // Você pode mostrar um toast de erro se quiser
        } finally {
            setDeletingId(null);
        }
    };

    const handleCancelDelete = () => {
        setShowDeleteModal(false);
        setSelectedDeleteId(null);
    };

    const handleCloseEditModal = () => {
        setShowEditModal(false);
        setEditingPackage(null);
    };

    const getInitialUpdateData = (pkg: PackageDTO): PackageUpdateDTO => ({
        name: pkg.name,
        destination: pkg.destination,
        description: pkg.description ?? '',
        basePrice: pkg.basePrice,
        hotelName: pkg.hotelName,
        isActive: pkg.isActive,
        startDate: pkg.packageDates?.[0]?.startDate ?? '',
        endDate: pkg.packageDates?.[0]?.endDate ?? '',
        mediaIdsToDelete: [],
        newMediaFiles: [],
    });

    if (loading)
        return (
            <div className="container">
                <div className="card shadow-sm mt-4">
                    <div className="card-header bg-primary text-white d-flex align-items-center">
                        <FaBoxOpen size={28} className="me-2" />
                        <h4 className="mb-0">Meus Pacotes</h4>
                    </div>
                    <div className="card-body text-center py-5">
                        <div className="spinner-border text-primary" role="status"></div>
                        <div className="mt-3">Carregando pacotes...</div>
                    </div>
                </div>
            </div>
        );

    if (packages.length === 0)
        return (
            <div className="container">
                <div className="card shadow-sm mt-4">
                    <div className="card-header bg-primary text-white d-flex align-items-center">
                        <FaBoxOpen size={28} className="me-2" />
                        <h4 className="mb-0">Meus Pacotes</h4>
                    </div>
                    <div className="card-body text-center py-5">
                        <FaBoxOpen size={48} className="mb-3 text-secondary" />
                        <h5>Nenhum pacote cadastrado ainda.</h5>
                        <p className="text-muted">Clique em "Cadastrar Pacote" para criar seu primeiro pacote.</p>
                    </div>
                </div>
            </div>
        );

    return (
    <div className="container">
        <ToastForm
            show={showDeleteToast}
            message="Pacote excluído com sucesso!"
            onClose={() => setShowDeleteToast(false)}
        />
        <ToastForm
            show={showEditToast}
            message="Pacote editado com sucesso!"
            onClose={() => setShowEditToast(false)}
        />
        <div className="card shadow-sm mt-4">
            <div className="card-header bg-primary text-white d-flex align-items-center">
                <FaBoxOpen size={28} className="me-2" />
                <h4 className="mb-0">Meus Pacotes</h4>
            </div>
            <div className="card-body">
                <div className="row g-3">
                    {packages.map(pkg => (
                        <div className="col-12 col-md-6 col-lg-4" key={pkg.packageId}>
                            <PackageAdmCard
                                pkg={pkg}
                                onEdit={handleEdit}
                                onDelete={handleDeleteClick}
                                deleting={deletingId === pkg.packageId}
                                backendUrl={backendUrl}
                            />
                        </div>
                    ))}
                </div>
            </div>
        </div>
        {/* Modal de edição */}
        {showEditModal && editingPackage && (
            <div className="modal fade show" style={{ display: 'block', backgroundColor: 'rgba(0,0,0,0.5)' }}>
                <div className="modal-dialog modal-xl">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Editar Pacote</h5>
                            <button type="button" className="btn-close" onClick={handleCloseEditModal}></button>
                        </div>
                        <div className="modal-body">
                            <CreatePackageForm
                                mode="edit"
                                initialData={getInitialUpdateData(editingPackage)}
                                packageId={editingPackage.packageId}
                                onClose={handleCloseEditModal}
                                onSubmitSuccess={updatedPackage => {
                                    setShowEditModal(false);
                                    setEditingPackage(null);
                                    setShowEditToast(true);
                                    if (updatedPackage) {
                                        setPackages(prev =>
                                            prev.map(pkg =>
                                                pkg.packageId === updatedPackage.packageId
                                                    ? updatedPackage
                                                    : pkg
                                            )
                                        );
                                    }
                                    setTimeout(() => setShowEditToast(false), 2000);
                                }}
                            />
                        </div>
                    </div>
                </div>
            </div>
        )}
        <ConfirmDeleteModal
            show={showDeleteModal}
            title="Confirmar Exclusão"
            message="Tem certeza que deseja excluir este pacote? Esta ação não pode ser desfeita."
            onCancel={handleCancelDelete}
            onConfirm={handleConfirmDelete}
            loading={deletingId !== null}
        />
    </div>
);
}

export default MyPackages;