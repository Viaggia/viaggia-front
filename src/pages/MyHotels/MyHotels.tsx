import { useEffect, useState } from 'react';
import { deleteHotel, getHotelsByUserId, updateHotel } from '../../services/hotelService';
import { HotelDTO, UpdateHotelDTO } from '../../types/Hotel';
import { FaHotel } from 'react-icons/fa';
import HotelAdmCard from '../../components/cards/HotelAdmCard/HotelAdmCard';
import EditHotelForm from '../../components/forms/EditHotelForm/EditHotelForm';
import HotelEditStepper from '../../components/forms/EditHotelForm/HotelEditStepper';
import ToastForm from '../../components/Toast/ToastForm';

const backendUrl = import.meta.env.VITE_API_URL;

interface Props {
    userId: number;
}

function MyHotels({ userId }: Props) {
    const [hotels, setHotels] = useState<HotelDTO[]>([]);
    const [loading, setLoading] = useState(true);
    const [deletingId, setDeletingId] = useState<number | null>(null);
    const [editingHotel, setEditingHotel] = useState<HotelDTO | null>(null);
    const [showEditModal, setShowEditModal] = useState(false);
    const [editForm, setEditForm] = useState<UpdateHotelDTO>({
        hotelId: 0,
        name: '',
        cnpj: '',
        street: '',
        city: '',
        state: '',
        zipCode: '',
        description: '',
        starRating: 1,
        checkInTime: '',
        checkOutTime: '',
        contactPhone: '',
        contactEmail: '',
        isActive: true,
    });
    const [showToast, setShowToast] = useState(false);

    useEffect(() => {
        getHotelsByUserId(userId)
            .then(setHotels)
            .finally(() => setLoading(false));
    }, [userId]);

    console.log("hotels", hotels)

    useEffect(() => {
        if (editingHotel) {
            setEditForm({
                hotelId: editingHotel.hotelId,
                name: editingHotel.name,
                cnpj: editingHotel.cnpj,
                street: editingHotel.street,
                city: editingHotel.city,
                state: editingHotel.state,
                zipCode: editingHotel.zipCode,
                description: editingHotel.description || '',
                starRating: editingHotel.starRating,
                checkInTime: editingHotel.checkInTime || '',
                checkOutTime: editingHotel.checkOutTime || '',
                contactPhone: editingHotel.contactPhone || '',
                contactEmail: editingHotel.contactEmail || '',
                isActive: editingHotel.isActive,
            });
        }
    }, [editingHotel]);

    const handleDelete = async (hotelId: number) => {
        if (!window.confirm('Tem certeza que deseja excluir este hotel? Esta ação não pode ser desfeita.')) return;
        setDeletingId(hotelId);
        try {
            await deleteHotel(hotelId);
            setHotels(hotels.filter(h => h.hotelId !== hotelId));
        } finally {
            setDeletingId(null);
        }
    };

    const handleEdit = (hotelId: number) => {
        const hotel = hotels.find(h => h.hotelId === hotelId);
        if (hotel) {
            setEditingHotel(hotel);
            setShowEditModal(true);
        }
    };

    const handleEditChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
    ) => {
        const { name, value, type } = e.target;
        let newValue: string | boolean = value;
        if (type === 'checkbox' && 'checked' in e.target) {
            newValue = (e.target as HTMLInputElement).checked;
        }
        setEditForm(prev => ({
            ...prev,
            [name]: newValue,
        }));
    };

    const handleEditSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!editingHotel) return;
        try {
            await updateHotel(editingHotel.hotelId, {
                ...editForm,
                hotelId: editingHotel.hotelId,
                starRating: Number(editForm.starRating),
                isActive: Boolean(editForm.isActive),
            });
            setHotels(hotels.map(h =>
                h.hotelId === editingHotel.hotelId
                    ? { ...h, ...editForm, starRating: Number(editForm.starRating), isActive: Boolean(editForm.isActive) }
                    : h
            ));
            setShowEditModal(false);
            setShowToast(true);
            setTimeout(() => setShowToast(false), 2000);
        } catch (err) {
            alert('Erro ao atualizar hotel.');
        }
    };

    const handleHotelUpdated = (updatedHotel: HotelDTO) => {
        setHotels(prev =>
            prev.map(h => h.hotelId === updatedHotel.hotelId ? updatedHotel : h)
        );
        setShowEditModal(false);
        setShowToast(true);
        setTimeout(() => setShowToast(false), 2000);
    };

    if (loading)
        return (
            <div className="container">
                <div className="card shadow-sm mt-4">
                    <div className="card-header bg-primary text-white d-flex align-items-center">
                        <FaHotel size={28} className="me-2" />
                        <h4 className="mb-0">Meus Hotéis</h4>
                    </div>
                    <div className="card-body text-center py-5">
                        <div className="spinner-border text-primary" role="status"></div>
                        <div className="mt-3">Carregando hotéis...</div>
                    </div>
                </div>
            </div>
        );

    if (hotels.length === 0)
        return (
            <div className="container">
                <div className="card shadow-sm mt-4">
                    <div className="card-header bg-primary text-white d-flex align-items-center">
                        <FaHotel size={28} className="me-2" />
                        <h4 className="mb-0">Meus Hotéis</h4>
                    </div>
                    <div className="card-body text-center py-5">
                        <FaHotel size={48} className="mb-3 text-secondary" />
                        <h5>Nenhum hotel cadastrado ainda.</h5>
                        <p className="text-muted">Clique em "Cadastrar Hotel" para criar seu primeiro hotel.</p>
                    </div>
                </div>
            </div>
        );

    return (
        <div className="container">
            <ToastForm
                show={showToast}
                message="Hotel atualizado com sucesso!"
                onClose={() => setShowToast(false)}
            />
            <div className="card shadow-sm mt-4">
                <div className="card-header bg-primary text-white d-flex align-items-center">
                    <FaHotel size={28} className="me-2" />
                    <h4 className="mb-0">Meus Hotéis</h4>
                </div>
                <div className="card-body">
                    <div className="row g-3">
                        {hotels.map(hotel => (
                            <div className="col-12 col-md-6 col-lg-4" key={hotel.hotelId}>
                                <HotelAdmCard
                                    hotel={hotel}
                                    onEdit={handleEdit}
                                    onDelete={handleDelete}
                                    deleting={deletingId === hotel.hotelId}
                                    backendUrl={backendUrl}
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            {/* Modal de edição */}
            {showEditModal && editingHotel && (
                <div className="modal fade show" style={{ display: 'block', backgroundColor: 'rgba(0,0,0,0.5)' }}>
                    <div className="modal-dialog modal-xl">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Editar Hotel</h5>
                                <button type="button" className="btn-close" onClick={() => setShowEditModal(false)}></button>
                            </div>
                            <div className="modal-body">
                                <HotelEditStepper
                                    hotelId={editingHotel.hotelId}
                                    onClose={() => setShowEditModal(false)}
                                    onHotelUpdated={handleHotelUpdated}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default MyHotels;