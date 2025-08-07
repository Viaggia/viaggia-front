import React from 'react';
import { CreateHotelDTO, CreateHotelRoomTypeDTO, CreateCommoditieDTO } from '../../../types/Hotel';
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

interface Props {
  formData: CreateHotelDTO;
  roomTypes: CreateHotelRoomTypeDTO[];
  commodities: Omit<CreateCommoditieDTO, 'HotelName'>;
  handleSubmit: () => void;
  prevStep: () => void;
}

const comoditiesIcons: Partial<Record<keyof Omit<CreateCommoditieDTO, 'HotelName'>, React.ReactNode>> = {
  HasParking: <LocalParkingIcon fontSize="small" />,
  HasBreakfast: <BreakfastDiningIcon fontSize="small" />,
  HasLunch: <LunchDiningIcon fontSize="small" />,
  HasDinner: <DinnerDiningIcon fontSize="small" />,
  HasSpa: <SpaIcon fontSize="small" />,
  HasPool: <PoolIcon fontSize="small" />,
  HasGym: <FitnessCenterIcon fontSize="small" />,
  HasWiFi: <WifiIcon fontSize="small" />,
  HasAirConditioning: <AcUnitIcon fontSize="small" />,
  HasAccessibilityFeatures: <AccessibleIcon fontSize="small" />,
  IsPetFriendly: <PetsIcon fontSize="small" />,
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

const HotelReviewSubmit: React.FC<Props> = ({ formData, roomTypes, commodities, handleSubmit, prevStep }) => {
  const comoditiesLabels: { field: keyof typeof commodities; label: string }[] = [
    { field: 'HasParking', label: 'Estacionamento' },
    { field: 'IsParkingPaid', label: 'Estacionamento é pago' },
    { field: 'HasBreakfast', label: 'Café da Manhã' },
    { field: 'IsBreakfastPaid', label: 'Café da Manhã é pago' },
    { field: 'HasLunch', label: 'Almoço' },
    { field: 'IsLunchPaid', label: 'Almoço é pago' },
    { field: 'HasDinner', label: 'Jantar' },
    { field: 'IsDinnerPaid', label: 'Jantar é pago' },
    { field: 'HasSpa', label: 'Spa' },
    { field: 'IsSpaPaid', label: 'Spa é pago' },
    { field: 'HasPool', label: 'Piscina' },
    { field: 'IsPoolPaid', label: 'Piscina é paga' },
    { field: 'HasGym', label: 'Academia' },
    { field: 'IsGymPaid', label: 'Academia é paga' },
    { field: 'HasWiFi', label: 'Wi-Fi' },
    { field: 'IsWiFiPaid', label: 'Wi-Fi é pago' },
    { field: 'HasAirConditioning', label: 'Ar-condicionado' },
    { field: 'IsAirConditioningPaid', label: 'Ar-condicionado é pago' },
    { field: 'HasAccessibilityFeatures', label: 'Acessibilidade' },
    { field: 'IsAccessibilityFeaturesPaid', label: 'Acessibilidade é paga' },
    { field: 'IsPetFriendly', label: 'Aceita Pets' },
    { field: 'IsPetFriendlyPaid', label: 'Taxa para Pets' }
  ];

  const offered: { label: string; isPaid?: boolean; field: keyof typeof commodities }[] = [];
  const notOffered: { label: string; field: keyof typeof commodities }[] = [];

  for (let i = 0; i < comoditiesLabels.length; i += 2) {
    const offerField = comoditiesLabels[i].field;
    const paidField = comoditiesLabels[i + 1]?.field;
    const label = comoditiesLabels[i].label;
    const isOffered = commodities[offerField];
    const isPaid = paidField && typeof commodities[paidField] === 'boolean'
      ? (commodities[paidField] as boolean)
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
            const icon = comoditiesIcons[item.field];
            return (
              <div key={idx} className="col-12 col-sm-6 col-md-4 col-lg-3">
                <div className="card h-100 p-2 d-flex flex-row align-items-center gap-2">
                  {icon && <span>{icon}</span>}
                  <div className="flex-grow-1">
                    <span>{item.label}</span>
                  </div>
                  {item.isPaid !== undefined && (
                    <span className={`badge ${item.isPaid ? 'bg-warning text-dark' : 'bg-success'}`}>
                      {item.isPaid ? 'Pago' : 'Grátis'}
                    </span>
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
                const icon = comoditiesIcons[item.field];
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
                <p className="mb-1"><strong>Tipo:</strong> {room.Name}</p>
                <p className="mb-1"><strong>Descrição:</strong> {room.Description || '—'}</p>
                <p className="mb-1"><strong>Preço:</strong> {formatBRL(room.Price)}</p>
                <p className="mb-1"><strong>Capacidade:</strong> {room.Capacity} pessoa(s)</p>
                <p className="mb-1"><strong>Tipo de Cama:</strong> {room.BedType}</p>
                <p className="mb-1"><strong>Total de Quartos:</strong> {room.TotalRooms}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {commodities.CustomCommodities && commodities.CustomCommodities.length > 0 && (
        <div className="mb-4">
          <h6>🧩 Serviços Adicionais</h6>
          <div className="row g-2">
            {commodities.CustomCommodities.map((service, index) => (
              <div key={index} className="col-12 col-sm-6 col-md-4 col-lg-3">
                <div className="card h-100 p-2 d-flex flex-column gap-1">
                  <span className="fw-bold">{service.name}</span>
                  <span className="text-muted small">{service.description || '—'}</span>
                  <span className={`badge align-self-start ${service.isPaid ? 'bg-warning text-dark' : 'bg-success'}`}>
                    {service.isPaid ? 'Pago' : 'Grátis'}
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