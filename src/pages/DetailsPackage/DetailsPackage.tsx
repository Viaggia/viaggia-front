import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate, useParams } from 'react-router-dom';
import { getPackageById } from '../../services/packageService';
import { PackageDTO } from '../../types/Package';
import Carousel from '../../components/cards/Carrossel/CarouselCards';
import { getHotelById } from '../../services/hotelService';
import { HotelDTO } from '../../types/Hotel';

const backendUrl = import.meta.env.VITE_API_URL;

const DetailsPackage: React.FC = () => {
    const navigate = useNavigate();
    const { packageId } = useParams<{ packageId: string }>();
    const [pkg, setPkg] = useState<PackageDTO | null>(null);
    const [hotel, setHotel] = useState<HotelDTO | null>(null);

    useEffect(() => {
        if (pkg?.hotelId) {
            getHotelById(pkg.hotelId).then(setHotel);
        }
    }, [pkg]);

    useEffect(() => {
        if (packageId) {
            getPackageById(Number(packageId)).then(data => setPkg(data));
        }
    }, [packageId]);

    if (!pkg) return <div>Carregando...</div>;

    const images = pkg.medias.map(m => backendUrl + m.mediaUrl);

    // Datas do pacote
    const datas = pkg.packageDates.length > 0
        ? `${pkg.packageDates[0].startDate} até ${pkg.packageDates[0].endDate}`
        : 'Datas não informadas';

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
                            onClick={() => navigate('/payment', { state: { pkg, hotel } })}
                        >
                            Comprar Pacote
                        </button>
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
                </div>
            )}

            {/* Outras informações do pacote, se desejar */}
        </div>
    );
};

export default DetailsPackage;