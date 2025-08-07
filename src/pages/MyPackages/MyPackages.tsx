import { useEffect, useState } from 'react';
import { getPackagesByUserId, getPackages } from '../../services/packageService';
import { PackageDTO } from '../../types/Package';
import { FaBoxOpen } from 'react-icons/fa';
import ToastForm from '../../components/Toast/ToastForm';

interface Props {
    userId: number;
}

function MyPackages({ userId }: Props) {
    const [packages, setPackages] = useState<PackageDTO[]>([]);
    const [loading, setLoading] = useState(true);
    const [showToast, setShowToast] = useState(false);

    useEffect(() => {
        getPackagesByUserId()
            .then(setPackages)
            .finally(() => setLoading(false));
    }, [userId]);

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
                show={showToast}
                message="Pacote atualizado com sucesso!"
                onClose={() => setShowToast(false)}
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
                                <div className="card h-100">
                                    <div className="card-body">
                                        <h5 className="card-title">{pkg.name}</h5>
                                        <p className="card-text">{pkg.description}</p>
                                        <p className="card-text"><strong>Destino:</strong> {pkg.destination}</p>
                                        <p className="card-text"><strong>Preço Base:</strong> R${Number(pkg.basePrice).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</p>
                                        <p className="card-text"><strong>Hotel:</strong> {pkg.hotelName}</p>
                                        <span className={`badge ${pkg.isActive ? 'bg-success' : 'bg-secondary'}`}>
                                            {pkg.isActive ? 'Ativo' : 'Inativo'}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default MyPackages;