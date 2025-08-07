import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { DatePicker } from "@mui/x-date-pickers";

interface TravelFormProps {
  initialValues?: {
    city?: string;
    checkInDate?: string;
    checkOutDate?: string;
    numberOfPeople?: number;
    numberOfRooms?: number;
    children?: number;
  };
}

export default function TravelForm({ initialValues }: TravelFormProps) {
  const navigate = useNavigate();
  const [city, setCity] = useState(initialValues?.city || '');
  const [checkInDate, setCheckInDate] = useState<Date | null>(
    initialValues?.checkInDate ? new Date(initialValues.checkInDate) : null
  );
  const [checkOutDate, setCheckOutDate] = useState<Date | null>(
    initialValues?.checkOutDate ? new Date(initialValues.checkOutDate) : null
  );
  const [adults, setAdults] = useState(
    initialValues?.numberOfPeople !== undefined
      ? Math.max(1, (initialValues.numberOfPeople ?? 1) - (initialValues?.children ?? 0))
      : 1
  );
  const [children, setChildren] = useState(0);
  const [rooms, setRooms] = useState(initialValues?.numberOfRooms || 1);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    navigate('/search', {
      state: {
        city,
        checkInDate: checkInDate ? checkInDate.toISOString().split('T')[0] : '',
        checkOutDate: checkOutDate ? checkOutDate.toISOString().split('T')[0] : '',
        numberOfPeople: adults + children,
        numberOfRooms: rooms,
      }
    });
  };

  // Altura padrão do input do Bootstrap 5: 38px
  const inputHeight = 38;

  return (
    <form className="row g-3 d-flex justify-content-center p-3 rounded" onSubmit={handleSubmit}>
      <div className="col-md-2">
        <label className="form-label text-white">Destino</label>
        <input type="text" className="form-control" placeholder="Digite o destino" value={city} onChange={e => setCity(e.target.value)} />
      </div>
      <div className="col-md-2 d-flex flex-column">
        <label className="form-label text-white">Check-in</label>
        <DatePicker
          value={checkInDate}
          onChange={setCheckInDate}
          format="dd/MM/yyyy"
          slotProps={{
            textField: {
              fullWidth: true,
              size: "small", // <-- deixa o campo menor
              sx: {
                '& .MuiInputBase-root': {
                  minHeight: '38px',
                  height: '38px',
                  fontSize: '1rem',
                  padding: 0,
                },
                '& input': {
                  minHeight: '36px',
                  height: '36px',
                  padding: '6px 12px',
                  fontSize: '1rem',
                }
              },
              InputLabelProps: { style: { color: "#fff" } },
              InputProps: { style: { background: "#fff" } }
            }
          }}
        />
      </div>
      <div className="col-md-2 d-flex flex-column">
        <label className="form-label text-white">Check-out</label>
        <DatePicker
          value={checkOutDate}
          onChange={setCheckOutDate}
          format="dd/MM/yyyy"
          slotProps={{
            textField: {
              fullWidth: true,
              size: "small", // <-- deixa o campo menor
              sx: {
                '& .MuiInputBase-root': {
                  minHeight: '38px',
                  height: '38px',
                  fontSize: '1rem',
                  padding: 0,
                },
                '& input': {
                  minHeight: '36px',
                  height: '36px',
                  padding: '6px 12px',
                  fontSize: '1rem',
                }
              },
              InputLabelProps: { style: { color: "#fff" } },
              InputProps: { style: { background: "#fff" } }
            }
          }}
        />
      </div>
      <div className="col-md-1">
        <label className="form-label text-white">Adultos</label>
        <input type="number" className="form-control" min="1" value={adults} onChange={e => setAdults(Number(e.target.value))} />
      </div>
      <div className="col-md-1">
        <label className="form-label text-white">Crianças</label>
        <input type="number" className="form-control" min="0" value={children} onChange={e => setChildren(Number(e.target.value))} />
      </div>
      <div className="col-md-1">
        <label className="form-label text-white">Quartos</label>
        <input type="number" className="form-control" min="1" value={rooms} onChange={e => setRooms(Number(e.target.value))} />
      </div>
      <div className="col-md-1 d-flex align-items-end">
        <button type="submit" className="btn btn-info botao-buscar-grande px-4">Buscar</button>
      </div>
    </form>
  );
}