import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useLocation, useNavigate } from 'react-router-dom';
import { createPaymentIntent } from '../../services/paymentService';
import { ReserveCreateDTO } from '../../types/Reservation';
import { useAuth } from '../../context/AuthContext';
import {
  brDateToISO,
  getRoomTypeLabel,
  formatPhone,
  formatDateToBR,
  formatCurrencyBRL
} from '../../utils/formatMask';

type SelectedRoom = { roomTypeId: number; quantity: number; name?: string; price?: number };

const Payment: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { hotel, selectedRooms, pkg, totalPrice } = location.state as {
    hotel?: any;
    selectedRooms?: SelectedRoom[];
    pkg?: any;
    totalPrice?: number;
  } || {};

  const { user } = useAuth();

  const [loading, setLoading] = useState(false);
  const isPackage = !!pkg;
  const total = isPackage
    ? pkg.basePrice
    : typeof totalPrice === 'number'
      ? totalPrice
      : 0;

  const checkInDate = isPackage
    ? pkg.packageDates?.[0]?.startDate
    : location.state?.checkInDate;
  const checkOutDate = isPackage
    ? pkg.packageDates?.[0]?.endDate
    : location.state?.checkOutDate;

    console.log("total", total)

  const formatDateUniversal = (dateStr?: string) => {
    if (!dateStr) return '';
    // Se já estiver no formato BR, retorna direto
    if (dateStr.match(/^\d{2}\/\d{2}\/\d{4}$/)) return dateStr;
    // Se estiver no formato ISO, converte para BR
    if (dateStr.match(/^\d{4}-\d{2}-\d{2}/)) {
      const [year, month, day] = dateStr.split('-');
      return `${day}/${month}/${year}`;
    }
    // Se vier outro formato, tenta converter
    try {
      const d = new Date(dateStr);
      return formatDateToBR(d);
    } catch {
      return dateStr;
    }
  };

  // Formata datas para BR
  const formattedCheckIn = formatDateUniversal(checkInDate);
  const formattedCheckOut = formatDateUniversal(checkOutDate);

  const handleGoToPaymentPending = async () => {
    setLoading(true);

    try {
      let dto: ReserveCreateDTO | null = null;

      if (!user) {
        navigate('/login', { state: { from: '/payment', paymentState: location.state } });
        setLoading(false);
        return;
      }

      if (isPackage && pkg) {
        const checkInISO = checkInDate && checkInDate.includes('/') ? brDateToISO(checkInDate) : checkInDate;
        const checkOutISO = checkOutDate && checkOutDate.includes('/') ? brDateToISO(checkOutDate) : checkOutDate;

        dto = {
          userId: user.id,
          packageId: pkg.packageId,
          hotelId: pkg.hotelId,
          checkInDate: checkInISO || '',
          checkOutDate: checkOutISO || '',
          totalPrice: pkg.basePrice,
          numberOfGuests: Array.isArray(selectedRooms)
            ? selectedRooms.reduce((sum: number, r: SelectedRoom) => sum + r.quantity, 0)
            : 2,
          status: 'Confirmado',
          isActive: true,
          reserveRooms: Array.isArray(selectedRooms)
            ? selectedRooms.map((room: SelectedRoom) => ({
              roomTypeId: room.roomTypeId,
              quantity: room.quantity
            }))
            : []
        };
      } else if (hotel && selectedRooms && selectedRooms.length > 0) {
        dto = {
          userId: user.id,
          packageId: 0,
          hotelId: hotel.hotelId,
          checkInDate: checkInDate || new Date().toISOString(),
          checkOutDate: checkOutDate || new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
          totalPrice: total,
          numberOfGuests: selectedRooms.reduce((sum: number, r: SelectedRoom) => sum + r.quantity, 0),
          status: 'Confirmado',
          isActive: true,
          reserveRooms: selectedRooms.map((room: SelectedRoom) => ({
            roomTypeId: room.roomTypeId,
            quantity: room.quantity
          }))
        };
      } else {
        setLoading(false);
        return;
      }

      const result = await createPaymentIntent(dto);
      if (result.url) {
        window.location.href = result.url;
      }
    } catch (err) {
      alert('Erro ao criar pagamento');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container py-5">
      <h2 className="text-center mb-5 fw-bold">Finalizar Pagamento</h2>

      <div className="row g-4">
        {/* CARD ÚNICO: Dados do Cliente + Compra */}
        <div className="col-md-6">
          <div className="card shadow rounded">
            <div className="card-header bg-secondary text-white">
              <h5 className="mb-0">Dados da Reserva</h5>
            </div>
            <div className="card-body">
              <h6 className="mb-3 text-primary">Dados do Cliente</h6>
              <p><strong>Nome:</strong> {user?.name}</p>
              <p><strong>Telefone:</strong> {user?.phoneNumber ? formatPhone(user.phoneNumber) : '(00) 00000-0000'}</p>
              <p><strong>Email:</strong> {user?.email}</p>

              <hr className="my-4" />

              <h6 className="mb-3 text-primary">Informações da Compra</h6>
              {isPackage ? (
                <>
                  <p><strong>Pacote:</strong> {pkg.name}</p>
                  <p><strong>Destino:</strong> {pkg.destination}</p>
                  <p><strong>Hotel:</strong> {hotel?.name || pkg.hotelName}</p>
                  <p><strong>Datas:</strong> {formattedCheckIn} até {formattedCheckOut}</p>
                </>
              ) : (
                <>
                  <p><strong>Hotel:</strong> {hotel?.name}</p>
                  <p>
                    <strong>Endereço:</strong> {hotel?.street}, {hotel?.city} - {hotel?.state}, CEP: {hotel?.zipCode}
                  </p>
                  <p><strong>Check-in:</strong> {formattedCheckIn}</p>
                  <p><strong>Check-out:</strong> {formattedCheckOut}</p>
                </>
              )}
            </div>
          </div>
        </div>

        {/* CARD: Resumo do Pedido */}
        <div className="col-md-6">
          <div className="card shadow-lg rounded">
            <div className="card-header bg-primary text-white">
              <h5 className="mb-0">Detalhes do Pedido</h5>
            </div>
            <div className="card-body">
              {isPackage ? (
                <>
                  <p><strong>Pacote:</strong> {pkg.name}</p>
                  <ul className="list-group mb-3">
                    <li className="list-group-item d-flex justify-content-between">
                      <span>Pacote completo</span>
                      <span>{formatCurrencyBRL(pkg.basePrice)}</span>
                    </li>
                  </ul>
                </>
              ) : (
                <>
                  <p><strong>Hotel:</strong> {hotel?.name}</p>
                  <ul className="list-group mb-3">
  {Array.isArray(selectedRooms) && selectedRooms.map((room) => {
    const roomType = hotel?.roomTypes?.find((rt: any) => rt.roomTypeId === room.roomTypeId);
    const roomName = roomType ? getRoomTypeLabel(roomType.name) : 'Quarto';
    const unitPrice = room.price ?? roomType?.price ?? 0;

    // Calcule o número de diárias
    const getDays = (checkIn?: string, checkOut?: string) => {
      if (!checkIn || !checkOut) return 1;
      const d1 = new Date(checkIn);
      const d2 = new Date(checkOut);
      const diff = Math.ceil((d2.getTime() - d1.getTime()) / (1000 * 60 * 60 * 24));
      return diff > 0 ? diff : 1;
    };
    const numDays = getDays(checkInDate, checkOutDate);

    // Valor total para este tipo de quarto
    const totalRoom = unitPrice * room.quantity * numDays;

    return (
      <li key={room.roomTypeId} className="list-group-item d-flex justify-content-between align-items-center">
        <div>
          <span>{roomName} ({room.quantity}x)</span>
          <div className="text-muted small">
            {formatCurrencyBRL(unitPrice)} por diária × {numDays} diária(s)
          </div>
        </div>
        <span>
          <strong>{formatCurrencyBRL(totalRoom)}</strong>
        </span>
      </li>
    );
  })}
</ul>
                </>
              )}
              <h5 className="text-end mt-3">Total: {formatCurrencyBRL(total)}</h5>
            </div>
            <div className="card-footer text-end">
              <button
                className="btn btn-success px-4 py-2 fw-semibold"
                onClick={handleGoToPaymentPending}
                disabled={loading}
              >
                {loading ? 'Processando...' : 'Ir para o pagamento'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payment;