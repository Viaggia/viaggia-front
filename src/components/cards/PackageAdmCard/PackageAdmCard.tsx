import { FaBoxOpen, FaTrash, FaEdit, FaHotel, FaStar, FaRegStar, FaClock, FaChevronDown, FaChevronUp, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { useState, useEffect } from 'react';
import { PackageDTO } from '../../../types/Package';
import { HotelDTO, RoomTypeEnum } from '../../../types/Hotel';
import { formatPhone, formatCNPJ, formatCEP, formatCurrencyBRL } from '../../../utils/formatMask';
import { comoditiesIcons } from '../../../utils/commoditiesIcons';
import { getHotelById } from '../../../services/hotelService';
import HotelCommoditiesIcons from '../HotelAdmCard/HotelCommoditiesIcons';
import CustomCommodityCardList from '../HotelAdmCard/CustomCommodityCardList';
import RoomTypeCardList from '../HotelAdmCard/RoomTypeCardList';

const comoditiesLabels: Record<string, string> = {
    hasParking: 'Estacionamento',
    hasBreakfast: 'Café da manhã',
    hasLunch: 'Almoço',
    hasDinner: 'Jantar',
    hasSpa: 'Spa',
    hasPool: 'Piscina',
    hasGym: 'Academia',
    hasWiFi: 'Wi-Fi',
    hasAirConditioning: 'Ar-condicionado',
    hasAccessibilityFeatures: 'Acessibilidade',
    isPetFriendly: 'Aceita pets',
};

const roomTypeLabels: Record<RoomTypeEnum, string> = {
    Single: 'Solteiro',
    Double: 'Duplo',
    Suite: 'Suíte',
    Deluxe: 'Deluxe',
    Family: 'Família',
};

interface Props {
    pkg: PackageDTO;
    onEdit: (packageId: number) => void;
    onDelete: (packageId: number) => void;
    deleting: boolean;
    backendUrl?: string;
}

function truncateTextLines(text: string, maxChars: number) {
    if (!text) return '';
    if (text.length <= maxChars) return text;
    return text.substring(0, maxChars) + '...';
}

const PackageAdmCard = ({ pkg, onEdit, onDelete, deleting, backendUrl }: Props) => {
    const [showHotel, setShowHotel] = useState(false);
    const [hotel, setHotel] = useState<HotelDTO | null>(null);
    const [loadingHotel, setLoadingHotel] = useState(false);
    const [hotelDescHovered, setHotelDescHovered] = useState(false);
    const [pkgDescHovered, setPkgDescHovered] = useState(false);

    // Carousel state
    const [imgIndex, setImgIndex] = useState(0);
    const images = pkg.medias && pkg.medias.length > 0
        ? pkg.medias.map(m => backendUrl ? backendUrl + m.mediaUrl : m.mediaUrl)
        : ['/img/default.jpg'];

    const precoFormatado = Number(pkg.basePrice).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
    const datas = pkg.packageDates && pkg.packageDates.length > 0
        ? `${pkg.packageDates[0].startDate} até ${pkg.packageDates[0].endDate}`
        : 'Datas não informadas';

    useEffect(() => {
        if (showHotel && pkg.hotelId && !hotel && !loadingHotel) {
            setLoadingHotel(true);
            getHotelById(pkg.hotelId)
                .then(setHotel)
                .finally(() => setLoadingHotel(false));
        }
    }, [showHotel, pkg.hotelId, hotel, loadingHotel]);

    function renderHotelSection() {
        if (!showHotel) return null;
        if (loadingHotel) {
            return (
                <div className="border rounded p-3 mt-2 bg-light text-center">
                    <span className="spinner-border spinner-border-sm me-2" /> Carregando dados do hotel...
                </div>
            );
        }
        if (!hotel) {
            return (
                <div className="border rounded p-3 mt-2 bg-light text-danger">
                    Não foi possível carregar os dados do hotel.
                </div>
            );
        }

        const enderecoCompleto = `${hotel.street}, ${hotel.city} - ${hotel.state}, CEP: ${formatCEP(hotel.zipCode)}`;
        const hotelCommodities = hotel.commodities?.[0] ?? {};

        return (
            <div className="border rounded p-3 mt-2 bg-light">
                <div className="d-flex align-items-center mb-2">
                    <FaHotel className="me-2 text-primary" size={20} />
                    <span style={{ fontWeight: 600 }}>{hotel.name}</span>
                </div>
                <div className="mb-2">
                    {[...Array(5)].map((_, i) =>
                        i < hotel.starRating ? (
                            <FaStar key={i} className="text-warning" />
                        ) : (
                            <FaRegStar key={i} className="text-warning" />
                        )
                    )}
                </div>
                <div className="mb-2 d-flex flex-wrap align-items-center gap-2">
                    <HotelCommoditiesIcons
                        commodities={hotelCommodities}
                        comoditiesIcons={comoditiesIcons}
                        comoditiesLabels={comoditiesLabels}
                        formatCurrencyBRL={formatCurrencyBRL}
                    />
                </div>
                <p className="mb-1" title={enderecoCompleto}>
                    <strong>Endereço:</strong> {enderecoCompleto}
                </p>
                <p className="mb-1"><strong>CNPJ:</strong> {formatCNPJ(hotel.cnpj)}</p>
                <div className="mb-1 d-flex flex-wrap align-items-center gap-3">
                    <span className="d-flex align-items-center">
                        <FaClock className="me-1" /> <strong>Check-in:</strong> {hotel.checkInTime}
                    </span>
                    <span className="d-flex align-items-center">
                        <FaClock className="me-1" /> <strong>Check-out:</strong> {hotel.checkOutTime}
                    </span>
                </div>
                <p className="mb-1"><strong>Telefone:</strong> {formatPhone(hotel.contactPhone ?? '')}</p>
                <p className="mb-1"><strong>E-mail:</strong> {hotel.contactEmail}</p>
                {/* Descrição do hotel */}
                <div
                    className="mb-1"
                    style={{
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        display: '-webkit-box',
                        WebkitLineClamp: 3,
                        WebkitBoxOrient: 'vertical',
                        maxWidth: '100%',
                        cursor: 'pointer',
                        position: 'relative',
                        whiteSpace: 'normal'
                    }}
                    title={hotel.description}
                    onMouseEnter={() => setHotelDescHovered(true)}
                    onMouseLeave={() => setHotelDescHovered(false)}
                >
                    <strong>Descrição:</strong> {truncateTextLines(hotel.description ?? '', 240)}
                    {hotelDescHovered && hotel.description && (
                        <div
                            style={{
                                position: 'absolute',
                                left: 0,
                                top: '110%',
                                zIndex: 30,
                                background: '#fff',
                                border: '1px solid #e0e0e0',
                                boxShadow: '0 2px 8px rgba(0,0,0,0.12)',
                                padding: '12px 16px',
                                minWidth: 220,
                                maxWidth: 400,
                                fontSize: '0.97em',
                                color: '#333',
                                whiteSpace: 'normal'
                            }}
                        >
                            {hotel.description}
                        </div>
                    )}
                </div>
                {/* Quartos */}
                {hotel.roomTypes && hotel.roomTypes.length > 0 && (
                    <>
                        <hr className="my-3" />
                        <div>
                            <strong>Quartos:</strong>
                            <div className="d-flex flex-wrap mt-2">
                                <RoomTypeCardList roomTypes={hotel.roomTypes} roomTypeLabels={roomTypeLabels} />
                            </div>
                        </div>
                    </>
                )}
                {/* Custom Commodities */}
                {hotel.customCommodities && hotel.customCommodities.length > 0 && (
                    <>
                        <hr className="my-3" />
                        <div>
                            <strong>Serviços customizados:</strong>
                            <div className="d-flex flex-column mt-2">
                                <CustomCommodityCardList customCommodities={hotel.customCommodities} />
                            </div>
                        </div>
                    </>
                )}
            </div>
        );
    }

    // Carousel controls
    function handlePrevImg() {
        setImgIndex(i => (i === 0 ? images.length - 1 : i - 1));
    }
    function handleNextImg() {
        setImgIndex(i => (i === images.length - 1 ? 0 : i + 1));
    }

    return (
        <div className="card shadow-sm h-100 d-flex flex-column">
            <div style={{ position: 'relative', height: 180 }}>
                <img
                    src={images[imgIndex]}
                    alt={pkg.name}
                    className="card-img-top"
                    style={{ objectFit: 'cover', height: 180, width: '100%' }}
                />
                {images.length > 1 && (
                    <>
                        <button
                            type="button"
                            onClick={handlePrevImg}
                            style={{
                                position: 'absolute',
                                top: '50%',
                                left: 8,
                                transform: 'translateY(-50%)',
                                background: 'rgba(255,255,255,0.7)',
                                border: 'none',
                                borderRadius: '50%',
                                padding: 6,
                                cursor: 'pointer',
                                zIndex: 2
                            }}
                        >
                            <FaChevronLeft />
                        </button>
                        <button
                            type="button"
                            onClick={handleNextImg}
                            style={{
                                position: 'absolute',
                                top: '50%',
                                right: 8,
                                transform: 'translateY(-50%)',
                                background: 'rgba(255,255,255,0.7)',
                                border: 'none',
                                borderRadius: '50%',
                                padding: 6,
                                cursor: 'pointer',
                                zIndex: 2
                            }}
                        >
                            <FaChevronRight />
                        </button>
                        <div
                            style={{
                                position: 'absolute',
                                bottom: 8,
                                left: '50%',
                                transform: 'translateX(-50%)',
                                background: 'rgba(0,0,0,0.5)',
                                color: '#fff',
                                borderRadius: 12,
                                fontSize: '0.95em',
                                padding: '2px 10px',
                                zIndex: 2
                            }}
                        >
                            {imgIndex + 1} / {images.length}
                        </div>
                    </>
                )}
            </div>
            <div className="card-body d-flex flex-column flex-grow-1">
                <div>
                    <div className="d-flex align-items-center mb-2">
                        <FaBoxOpen className="me-2 text-primary" size={24} />
                        <h5 className="card-title mb-0">{pkg.name}</h5>
                    </div>
                    {/* Data acima do destino, visual destacado */}
                    <div className="mb-2">
                        <span
                            style={{
                                background: '#e3f2fd',
                                color: '#1976d2',
                                fontWeight: 600,
                                fontSize: '1em',
                                padding: '4px 12px',
                                borderRadius: 8,
                                border: '1px solid #bbdefb',
                                display: 'inline-block'
                            }}
                        >
                            {datas}
                        </span>
                    </div>
                    <p className="mb-1"><strong>Destino:</strong> {pkg.destination}</p>
                    <p className="mb-1"><strong>Hotel:</strong> {pkg.hotelName}</p>
                    <p className="mb-1"><strong>Preço Base:</strong> {precoFormatado}</p>
                    {/* Descrição do pacote com até 3 linhas e hover */}
                    <div
                        className="mb-1"
                        style={{
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            display: '-webkit-box',
                            WebkitLineClamp: 3,
                            WebkitBoxOrient: 'vertical',
                            maxWidth: '100%',
                            cursor: 'pointer',
                            position: 'relative',
                            whiteSpace: 'normal'
                        }}
                        title={pkg.description}
                        onMouseEnter={() => setPkgDescHovered(true)}
                        onMouseLeave={() => setPkgDescHovered(false)}
                    >
                        <strong>Descrição:</strong> {truncateTextLines(pkg.description ?? '', 240)}
                        {pkgDescHovered && pkg.description && (
                            <div
                                style={{
                                    position: 'absolute',
                                    left: 0,
                                    top: '110%',
                                    zIndex: 30,
                                    background: '#fff',
                                    border: '1px solid #e0e0e0',
                                    boxShadow: '0 2px 8px rgba(0,0,0,0.12)',
                                    padding: '12px 16px',
                                    minWidth: 220,
                                    maxWidth: 400,
                                    fontSize: '0.97em',
                                    color: '#333',
                                    whiteSpace: 'normal'
                                }}
                            >
                                {pkg.description}
                            </div>
                        )}
                    </div>
                </div>
                <div className="mt-3">
                    <button
                        className="btn btn-link text-decoration-none px-0"
                        type="button"
                        onClick={() => setShowHotel(v => !v)}
                        aria-expanded={showHotel}
                    >
                        <FaHotel className="me-1" />
                        Dados do hotel
                        {showHotel ? <FaChevronUp className="ms-1" /> : <FaChevronDown className="ms-1" />}
                    </button>
                    {renderHotelSection()}
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