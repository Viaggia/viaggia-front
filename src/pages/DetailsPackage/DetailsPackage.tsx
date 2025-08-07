import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate, useParams } from 'react-router-dom';
import { getPackageById } from '../../services/packageService';
import { PackageDTO } from '../../types/Package';
import Carousel from '../../components/cards/Carrossel/CarouselCards';
import { getHotelById } from '../../services/hotelService';
import { HotelDTO } from '../../types/Hotel';
import RoomTypeList from '../../components/lists/RoomTypeList/RoomTypeList';

const backendUrl = import.meta.env.VITE_API_URL;

const DetailsPackage: React.FC = () => {
    const navigate = useNavigate();
    const { packageId } = useParams<{ packageId: string }>();
    const [pkg, setPkg] = useState<PackageDTO | null>(null);
    const [hotel, setHotel] = useState<HotelDTO | null>(null);

    // Estado para seleção de quartos
    const [selectedQuantities, setSelectedQuantities] = useState<{ [roomTypeId: number]: number }>({});
    const [showError, setShowError] = useState(false);

    useEffect(() => {
        if (packageId) {
            getPackageById(Number(packageId)).then(data => setPkg(data));
        }
    }, [packageId]);

    useEffect(() => {
        if (pkg?.hotelId) {
            getHotelById(pkg.hotelId).then(setHotel);
        }
    }, [pkg]);

    if (!pkg) return <div>Carregando...</div>;

    const images = pkg.medias.map(m => backendUrl + m.mediaUrl);

    // Datas do pacote
    const datas = pkg.packageDates.length > 0
        ? `${pkg.packageDates[0].startDate} até ${pkg.packageDates[0].endDate}`
        : 'Datas não informadas';

    // Soma total de quartos selecionados
    const totalSelected = Object.values(selectedQuantities).reduce((sum, q) => sum + q, 0);

    // Função para alterar quantidade de quartos
    const handleQuantityChange = (roomTypeId: number, quantity: number) => {
        setSelectedQuantities(prev => ({
            ...prev,
            [roomTypeId]: quantity
        }));
        if (showError && quantity > 0) setShowError(false);
    };

    // Monta array de quartos selecionados para enviar ao pagamento
    const selectedRooms = hotel?.roomTypes
        .filter(rt => selectedQuantities[rt.roomTypeId] > 0)
        .map(rt => ({
            ...rt,
            quantity: selectedQuantities[rt.roomTypeId]
        })) || [];

        console.log("selected rooms", selectedRooms)

    return (
        <div className="container-fluid py-5">
            <div className="m-3">
                <h1 className="mb-2">{pkg.name}</h1>
                <h3 className="mb-1">{pkg.destination}</h3>
                <div className="mb-2 text-muted">{datas}</div>
            </div>

            {/* Carrossel de imagens */}
            <div className="row justify-content-around align-items-start">
                <div className="col-lg-6 mb-4">
                    <Carousel images={images} />
                </div>

                {/* Card de preço e ação */}
                <div className="col-lg-3 mt-0">
                    <div className="card p-3">
                        <h5>Preço do Pacote</h5>
                        <h2 className="text-primary">
                            {pkg.basePrice.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                        </h2>
                        <div className="mb-2 text-muted" style={{ fontSize: '0.95rem' }}>
                            *Taxas e impostos não inclusos
                        </div>
                        <button
                            className="btn btn-primary mt-4 w-100"
                            onClick={() => {
                                if (totalSelected === 0) {
                                    setShowError(true);
                                    return;
                                }
                                navigate('/payment', {
                                    state: {
                                        pkg,
                                        hotel,
                                        selectedRooms,
                                        checkInDate: pkg.packageDates?.[0]?.startDate,
                                        checkOutDate: pkg.packageDates?.[0]?.endDate,
                                    }
                                });
                            }}
                        >
                            Comprar Pacote
                        </button>
                        {showError && (
                            <div className="alert alert-danger mt-3" role="alert">
                                Selecione pelo menos um quarto para continuar.
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Descrição */}
            <div className="col-md-8 m-3 mt-0">
                <p className="fw-bold">{pkg.description}</p>
            </div>

            {/* Hotel vinculado */}
            {hotel && (
                <div className="container mt-4">
                    <h4>Hotel Incluso</h4>
                    <div className="card p-3 mb-3">
                        <h5>{hotel.name}</h5>
                        <div>{hotel.city}, {hotel.state}</div>
                        <div>Classificação: {hotel.starRating} ★</div>
                        <div className="mt-2">{hotel.description}</div>
                        <button
                            className="btn btn-outline-primary mt-2"
                            onClick={() => navigate(`/details/${hotel.hotelId}`)}
                        >
                            Ver detalhes do hotel
                        </button>
                    </div>
                    {/* Listagem de quartos do hotel */}
                    <RoomTypeList
                        roomTypes={hotel.roomTypes}
                        selectedQuantities={selectedQuantities}
                        onQuantityChange={handleQuantityChange}
                        showError={showError}
                    />
                </div>
            )}

            {/* Outras informações do pacote, se desejar */}
        </div>
    );
};

export default DetailsPackage;