import { FaBoxOpen, FaTrash, FaEdit } from 'react-icons/fa';
import { PackageDTO } from '../../../types/Package';

interface Props {
    pkg: PackageDTO;
    onEdit: (packageId: number) => void;
    onDelete: (packageId: number) => void;
    deleting: boolean;
    backendUrl?: string;
}

function truncateText(text: string, maxLength: number) {
    if (!text) return '';
    return text.length > maxLength ? text.substring(0, maxLength) + '...' : text;
}

const PackageAdmCard = ({ pkg, onEdit, onDelete, deleting, backendUrl }: Props) => {
    const precoFormatado = Number(pkg.basePrice).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
    const imagem = pkg.medias && pkg.medias.length > 0
        ? (backendUrl ? backendUrl + pkg.medias[0].mediaUrl : pkg.medias[0].mediaUrl)
        : '/img/default.jpg';
    const datas = pkg.packageDates && pkg.packageDates.length > 0
        ? `${pkg.packageDates[0].startDate} até ${pkg.packageDates[0].endDate}`
        : 'Datas não informadas';

    return (
        <div className="card shadow-sm h-100 d-flex flex-column">
            <img
                src={imagem}
                alt={pkg.name}
                className="card-img-top"
                style={{ objectFit: 'cover', height: 180 }}
            />
            <div className="card-body d-flex flex-column flex-grow-1">
                <div>
                    <div className="d-flex align-items-center mb-2">
                        <FaBoxOpen className="me-2 text-primary" size={24} />
                        <h5 className="card-title mb-0">{pkg.name}</h5>
                    </div>
                    <p className="mb-1"><strong>Destino:</strong> {pkg.destination}</p>
                    <p className="mb-1"><strong>Hotel:</strong> {pkg.hotelName}</p>
                    <p className="mb-1"><strong>Preço Base:</strong> {precoFormatado}</p>
                    <p className="mb-1"><strong>Período:</strong> {datas}</p>
                    <p className="mb-1"><strong>Descrição:</strong> {truncateText(pkg.description ?? '', 120)}</p>
                </div>
                <div className="d-flex justify-content-end gap-2 mt-3 mt-auto">
                    <button
                        className="btn btn-outline-primary btn-sm"
                        onClick={() => onEdit(pkg.packageId)}
                    >
                        <FaEdit /> Editar
                    </button>
                    <button
                        className="btn btn-outline-danger btn-sm"
                        onClick={() => onDelete(pkg.packageId)}
                        disabled={deleting}
                    >
                        <FaTrash /> {deleting ? 'Excluindo...' : 'Excluir'}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default PackageAdmCard;