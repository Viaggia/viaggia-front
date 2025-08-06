import React, { useState } from "react";
import { createSearchParams, useNavigate } from "react-router-dom";
import { DatePicker } from "@mui/x-date-pickers";
import { formatDateToISO, parseLocalDate } from "../../../utils/formatMask";

interface TravelFormProps {
  initialValues?: {
    city?: string;
    checkInDate?: string;
    checkOutDate?: string;
    numberOfPeople?: number;
    numberOfRooms?: number;
    children?: number;
  };
  isSearchPage?: boolean;
  onSearch?: () => void;
}

export default function TravelForm({ initialValues, onSearch }: TravelFormProps) {
  const navigate = useNavigate();
  const [city, setCity] = useState(initialValues?.city || '');

  const [checkInDate, setCheckInDate] = useState<Date | null>(
    parseLocalDate(initialValues?.checkInDate)
  );
  const [checkOutDate, setCheckOutDate] = useState<Date | null>(
    parseLocalDate(initialValues?.checkOutDate)
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
  if (onSearch) onSearch();
  const params = {
    city,
    checkInDate: formatDateToISO(checkInDate),
    checkOutDate: formatDateToISO(checkOutDate),
    numberOfPeople: (adults + children).toString(),
    numberOfRooms: rooms.toString(),
  };
  navigate({
    pathname: '/search',
    search: `?${createSearchParams(params)}`,
  });
};

  return (
    <form className="row g-3 d-flex justify-content-center p-3 rounded" onSubmit={handleSubmit}>
      <div className="col-md-2">
        <label className="form-label text-white">Destino</label>
        <input type="text" className="form-control" placeholder="Digite a Cidade" value={city} onChange={e => setCity(e.target.value)} />
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
              size: "small",
              sx: {
                '& .MuiInputBase-root': {
                  minHeight: '38px',
                  height: '38px',
                  //fontSize: '0.75rem !important',
                  padding: 0,
                },
                '& .MuiInputBase-input': {
                  minHeight: '36px',
                  height: '36px',
                  padding: '6px 12px',
                  fontSize: '0.75rem !important',
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
              size: "small",
              sx: {
                '& .MuiInputBase-root': {
                  minHeight: '38px',
                  height: '38px',
                  fontSize: '0.75rem !important',
                  padding: 0,
                },
                '& input': {
                  minHeight: '36px',
                  height: '36px',
                  padding: '6px 12px',
                  fontSize: '0.75rem !important',
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