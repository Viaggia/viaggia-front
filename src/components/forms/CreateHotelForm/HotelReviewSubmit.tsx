import React from 'react';
import {
  CreateHotelDTO,
  CreateHotelRoomTypeDTO,
  CreateCommodityDTO,
  HotelDTO,
  HotelRoomTypeDTO,
  CommodityDTO,
  CustomCommodityDTO,
} from '../../../types/Hotel';
import StarIcon from '@mui/icons-material/Star';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import LocalParkingIcon from '@mui/icons-material/LocalParking';
import BreakfastDiningIcon from '@mui/icons-material/BreakfastDining';
import LunchDiningIcon from '@mui/icons-material/LunchDining';
import DinnerDiningIcon from '@mui/icons-material/DinnerDining';
import SpaIcon from '@mui/icons-material/Spa';
import PoolIcon from '@mui/icons-material/Pool';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import WifiIcon from '@mui/icons-material/Wifi';
import AcUnitIcon from '@mui/icons-material/AcUnit';
import AccessibleIcon from '@mui/icons-material/Accessible';
import PetsIcon from '@mui/icons-material/Pets';

// Tipos genéricos para aceitar tanto criação quanto edição
type HotelFormType = CreateHotelDTO | HotelDTO;
type RoomTypeFormType = CreateHotelRoomTypeDTO | HotelRoomTypeDTO;
type CommodityFormType = Omit<CreateCommodityDTO, 'hotelName'> | CommodityDTO;

interface Props<
  H extends HotelFormType = HotelFormType,
  R extends RoomTypeFormType = RoomTypeFormType,
  C extends CommodityFormType = CommodityFormType
> {
  formData: H;
  roomTypes: R[];
  commodities?: C; // Para create
  commodity?: C;   // Para edit
  customCommodities?: CustomCommodityDTO[]; // Para edit, se necessário
  handleSubmit: () => void;
  prevStep: () => void;
}

const comoditiesIcons: Partial<Record<keyof CommodityFormType, React.ReactNode>> = {
  hasParking: <LocalParkingIcon fontSize="small" />,
  hasBreakfast: <BreakfastDiningIcon fontSize="small" />,
  hasLunch: <LunchDiningIcon fontSize="small" />,
  hasDinner: <DinnerDiningIcon fontSize="small" />,
  hasSpa: <SpaIcon fontSize="small" />,
  hasPool: <PoolIcon fontSize="small" />,
  hasGym: <FitnessCenterIcon fontSize="small" />,
  hasWiFi: <WifiIcon fontSize="small" />,
  hasAirConditioning: <AcUnitIcon fontSize="small" />,
  hasAccessibilityFeatures: <AccessibleIcon fontSize="small" />,
  isPetFriendly: <PetsIcon fontSize="small" />,
};

function renderStars(rating: number) {
  const stars = [];
  for (let i = 1; i <= 5; i++) {
    stars.push(
      i <= rating ? (
        <StarIcon key={i} fontSize="small" htmlColor="#FFD600" />
      ) : (
        <StarBorderIcon key={i} fontSize="small" htmlColor="#FFD600" />
      )
    );
  }
  return stars;
}

function formatBRL(value: number) {
  return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}

const paidToPriceField: Record<string, keyof CommodityFormType> = {
  hasParking: 'parkingPrice',
  hasBreakfast: 'breakfastPrice',
  hasLunch: 'lunchPrice',
  hasDinner: 'dinnerPrice',
  hasSpa: 'spaPrice',
  hasPool: 'poolPrice',
  hasGym: 'gymPrice',
  hasWiFi: 'wiFiPrice',
  hasAirConditioning: 'airConditioningPrice',
  hasAccessibilityFeatures: 'accessibilityFeaturesPrice',
  isPetFriendly: 'petFriendlyPrice',
};

const comoditiesLabels: { field: keyof CommodityFormType; label: string }[] = [
  { field: 'hasParking', label: 'Estacionamento' },
  { field: 'isParkingPaid', label: 'Estacionamento é pago' },
  { field: 'hasBreakfast', label: 'Café da Manhã' },
  { field: 'isBreakfastPaid', label: 'Café da Manhã é pago' },
  { field: 'hasLunch', label: 'Almoço' },
  { field: 'isLunchPaid', label: 'Almoço é pago' },
  { field: 'hasDinner', label: 'Jantar' },
  { field: 'isDinnerPaid', label: 'Jantar é pago' },
  { field: 'hasSpa', label: 'Spa' },
  { field: 'isSpaPaid', label: 'Spa é pago' },
  { field: 'hasPool', label: 'Piscina' },
  { field: 'isPoolPaid', label: 'Piscina é paga' },
  { field: 'hasGym', label: 'Academia' },
  { field: 'isGymPaid', label: 'Academia é paga' },
  { field: 'hasWiFi', label: 'Wi-Fi' },
  { field: 'isWiFiPaid', label: 'Wi-Fi é pago' },
  { field: 'hasAirConditioning', label: 'Ar-condicionado' },
  { field: 'isAirConditioningPaid', label: 'Ar-condicionado é pago' },
  { field: 'hasAccessibilityFeatures', label: 'Acessibilidade' },
  { field: 'isAccessibilityFeaturesPaid', label: 'Acessibilidade é paga' },
  { field: 'isPetFriendly', label: 'Aceita Pets' },
  { field: 'isPetFriendlyPaid', label: 'Taxa para Pets' }
];

const HotelReviewSubmit = <H extends HotelFormType, R extends RoomTypeFormType, C extends CommodityFormType>({
  formData,
  roomTypes,
  commodities,
  commodity,
  customCommodities,
  handleSubmit,
  prevStep,
}: Props<H, R, C>) => {
  // Decide qual objeto usar (commodities para create, commodity para edit)
  const comoditiesObj = commodities ?? commodity;

  console.log("customCommodities")
  console.log(customCommodities)

  // Se não houver comodities, não renderiza nada
  if (!comoditiesObj) return null;

  // Monta as listas de ofertados e não ofertados
  const offered: { label: string; isPaid?: boolean; field: keyof typeof comoditiesObj }[] = [];
  const notOffered: { label: string; field: keyof typeof comoditiesObj }[] = [];

  for (let i = 0; i < comoditiesLabels.length; i += 2) {
    const offerField = comoditiesLabels[i].field;
    const paidField = comoditiesLabels[i + 1]?.field;
    const label = comoditiesLabels[i].label;
    const isOffered = comoditiesObj[offerField];
    const isPaid = paidField && typeof comoditiesObj[paidField] === 'boolean'
      ? (comoditiesObj[paidField] as boolean)
      : undefined;
    if (isOffered) {
      offered.push({
        label,
        isPaid,
        field: offerField
      });
    } else {
      notOffered.push({ label, field: offerField });
    }
  }

  // Serviços adicionais: pega do objeto ou da prop customCommodities
 const customServices =
  Array.isArray(customCommodities) && customCommodities.length > 0
    ? customCommodities
    : Array.isArray((comoditiesObj as any).customCommodities)
      ? (comoditiesObj as any).customCommodities as CustomCommodityDTO[]
      : [];


      console.log("customServices")
      console.log(customServices)
  return (
    <div>
      <h5 className="mb-3">Revisar Dados</h5>

      <div className="mb-4">
        <h6>📌 Informações do Hotel</h6>
        <ul className="list-group">
          <li className="list-group-item d-flex align-items-center justify-content-between flex-wrap">
            <div>
              <strong>Nome:</strong> {formData.name}
            </div>
            <div>
              {renderStars(formData.starRating)}
            </div>
          </li>
          <li className="list-group-item"><strong>CNPJ:</strong> {formData.cnpj}</li>
          <li className="list-group-item"><strong>Endereço:</strong> {formData.street}, {formData.city} - {formData.state}, {formData.zipCode}</li>
          <li className="list-group-item"><strong>Descrição:</strong> {formData.description || '—'}</li>
          <li className="list-group-item">
            <div className="row">
              <div className="col-md-4 col-6"><strong>Check-in:</strong> {formData.checkInTime || '—'}</div>
              <div className="col-md-4 col-6"><strong>Check-out:</strong> {formData.checkOutTime || '—'}</div>
              <div className="col-md-4 col-12 mt-2 mt-md-0">
                <strong>Telefone:</strong> {formData.contactPhone || '—'}<br />
                <strong>Email:</strong> {formData.contactEmail || '—'}
              </div>
            </div>
          </li>
        </ul>
      </div>

      <div className="mb-4">
        <h6>🧾 Comodidades Ofertadas</h6>
        <div className="row g-2">
          {offered.map((item, idx) => {
            const icon = comoditiesIcons[item.field as keyof typeof comoditiesIcons];
            let paidField: keyof typeof comoditiesObj | undefined = undefined;
            const fieldStr = String(item.field);
            paidField = comoditiesLabels.find(
              l => l.field === (fieldStr.startsWith('has') ? fieldStr.replace('has', 'is') + 'Paid' : '')
            )?.field;

            const priceField = paidToPriceField[item.field as string];
            const isPaid = paidField ? (comoditiesObj[paidField as keyof typeof comoditiesObj] as boolean) : false;
            const price =
              typeof priceField === 'string' && priceField in comoditiesObj
                ? (comoditiesObj[priceField as keyof typeof comoditiesObj] as number)
                : undefined;

            return (
              <div key={idx} className="col-12 col-sm-6 col-md-4 col-lg-3">
                <div className="card h-100 p-2 d-flex flex-row align-items-center gap-2">
                  {icon && <span>{icon}</span>}
                  <div className="flex-grow-1">
                    <span>{item.label}</span>
                  </div>
                  {paidField && isPaid ? (
                    <span className="badge bg-warning text-dark">
                      {typeof price === 'number' && !isNaN(price)
                        ? formatBRL(price)
                        : 'Pago'}
                    </span>
                  ) : (
                    <span className="badge bg-success">Grátis</span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
        {notOffered.length > 0 && (
          <>
            <h6 className="mt-3">❌ Não Ofertados</h6>
            <div className="row g-2">
              {notOffered.map((item, idx) => {
                const fieldStr = String(item.field);
                const icon = comoditiesIcons[fieldStr as keyof typeof comoditiesIcons];
                return (
                  <div key={idx} className="col-12 col-sm-6 col-md-4 col-lg-3">
                    <div className="card h-100 p-2 d-flex flex-row align-items-center gap-2 bg-light text-muted">
                      {icon && <span>{icon}</span>}
                      <span>{item.label}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </>
        )}
      </div>

      <div className="mb-4">
        <h6>🛏️ Tipos de Quarto</h6>
        <div className="row">
          {roomTypes.map((room, index) => (
            <div key={index} className="col-md-4 mb-3">
              <div className="border rounded p-3 h-100">
                <p className="mb-1"><strong>Tipo:</strong> {room.name}</p>
                <p className="mb-1"><strong>Descrição:</strong> {room.description || '—'}</p>
                <p className="mb-1"><strong>Preço:</strong> {formatBRL(room.price)}</p>
                <p className="mb-1"><strong>Capacidade:</strong> {room.capacity} pessoa(s)</p>
                <p className="mb-1"><strong>Tipo de Cama:</strong> {room.bedType}</p>
                <p className="mb-1"><strong>Total de Quartos:</strong> {room.totalRooms}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {customServices.length > 0 && (
        <div className="mb-4">
          <h6>🧩 Serviços Adicionais</h6>
          <div className="row g-2">
            {customServices.map((service, index) => (
              <div key={index} className="col-12 col-sm-6 col-md-4 col-lg-3">
                <div className="card h-100 p-2 d-flex flex-column gap-1">
                  <span className="fw-bold">{service.name}</span>
                  <span className="text-muted small">{service.description || '—'}</span>
                  <span className={`badge align-self-start ${service.isPaid ? 'bg-warning text-dark' : 'bg-success'}`}>
                    {service.isPaid && service.price !== undefined
                      ? service.price.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
                      : 'Grátis'}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="d-flex justify-content-between">
        <button type="button" className="btn btn-outline-primary" onClick={prevStep}>Voltar</button>
        <button type="button" className="btn btn-success" onClick={handleSubmit}>Enviar</button>
      </div>
    </div>
  );
};

export default HotelReviewSubmit;