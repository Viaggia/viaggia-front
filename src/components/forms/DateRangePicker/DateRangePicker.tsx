import React, { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, IconButton, Typography, TextField } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

interface DateRangePickerProps {
  checkIn: string;
  checkOut: string;
  onCheckInChange: (date: string) => void;
  onCheckOutChange: (date: string) => void;
  adults: number;
  children: number;
  rooms: number;
  onAdultsChange: (value: number) => void;
  onChildrenChange: (value: number) => void;
  onRoomsChange: (value: number) => void;
  onSearch: () => void;
}

function getTodayISO() {
  return new Date().toISOString().split('T')[0];
}

function getFutureISO(days: number) {
  const d = new Date();
  d.setDate(d.getDate() + days);
  return d.toISOString().split('T')[0];
}

const DateRangePicker: React.FC<DateRangePickerProps> = ({
  checkIn,
  checkOut,
  onCheckInChange,
  onCheckOutChange,
  adults,
  children,
  rooms,
  onAdultsChange,
  onChildrenChange,
  onRoomsChange,
  onSearch,
}) => {
  const [open, setOpen] = useState(false);

  // Estados locais para edição no modal
  const checkInValue = checkIn || getTodayISO();
  const checkOutValue = checkOut || getFutureISO(7);

  const [localAdults, setLocalAdults] = useState(adults || 2);
  const [localChildren, setLocalChildren] = useState(children || 0);
  const [localRooms, setLocalRooms] = useState(rooms || 1);

  const handleOpen = () => {
    setLocalAdults(adults || 2);
    setLocalChildren(children || 0);
    setLocalRooms(rooms || 1);
    setOpen(true);
  };

  const handleSave = () => {
    onAdultsChange(localAdults);
    onChildrenChange(localChildren);
    onRoomsChange(localRooms);
    setOpen(false);
  };

  // Utilitário para converter string yyyy-mm-dd para Date e vice-versa
  const parseDate = (str: string) => (str ? new Date(str) : null);
  const formatDate = (date: Date | null) =>
    date ? date.toISOString().split('T')[0] : '';

  return (
    <div className="d-flex align-items-end gap-2 mb-3 flex-wrap">
      {/* Check-in */}
      <div style={{ minWidth: 140, maxWidth: 180 }}>
        <DatePicker
          label="Check-in"
          value={checkInValue ? new Date(checkInValue) : null}
          onChange={date => onCheckInChange(date ? date.toISOString().split('T')[0] : '')}
          format="dd/MM/yyyy"
          slotProps={{ textField: { size: 'small', fullWidth: true } }}
        />
      </div>
      {/* Check-out */}
      <div style={{ minWidth: 140, maxWidth: 180 }}>
        <DatePicker
          label="Check-out"
          value={checkOutValue ? new Date(checkOutValue) : null}
          onChange={date => onCheckOutChange(date ? date.toISOString().split('T')[0] : '')}
          format="dd/MM/yyyy"
          slotProps={{ textField: { size: 'small', fullWidth: true } }}
        />
      </div>
      {/* Pessoas e quartos */}
      <div className="d-flex flex-column justify-content-end" style={{ minWidth: 210, maxWidth: 260 }}>
        <label className="form-label mb-1" style={{ minHeight: 22, visibility: 'hidden' }}> </label>
        <Button
          variant="outlined"
          onClick={handleOpen}
          style={{
            minWidth: 180,
            maxWidth: 260,
            padding: '6px 12px',
            textTransform: 'none',
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis'
          }}
        >
          {`${adults} adulto(s), ${children} criança(s), ${rooms} quarto(s)`}
        </Button>
      </div>
      {/* Botão pesquisar */}
      <div className="d-flex flex-column justify-content-end" style={{ minWidth: 120 }}>
        <label className="form-label mb-1" style={{ minHeight: 22, visibility: 'hidden' }}> </label>
        <Button
          variant="contained"
          color="primary"
          onClick={onSearch}
          style={{ minWidth: 110 }}
        >
          Pesquisar
        </Button>
      </div>

      {/* Modal */}
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Hóspedes e Quartos</DialogTitle>
        <DialogContent>
          <div style={{ display: 'flex', alignItems: 'center', marginBottom: 16 }}>
            <Typography style={{ flex: 1 }}>Adultos</Typography>
            <IconButton onClick={() => setLocalAdults(Math.max(1, localAdults - 1))}>
              <RemoveIcon />
            </IconButton>
            <Typography>{localAdults}</Typography>
            <IconButton onClick={() => setLocalAdults(localAdults + 1)}>
              <AddIcon />
            </IconButton>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', marginBottom: 16 }}>
            <Typography style={{ flex: 1 }}>Crianças</Typography>
            <IconButton onClick={() => setLocalChildren(Math.max(0, localChildren - 1))}>
              <RemoveIcon />
            </IconButton>
            <Typography>{localChildren}</Typography>
            <IconButton onClick={() => setLocalChildren(localChildren + 1)}>
              <AddIcon />
            </IconButton>
          </div>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <Typography style={{ flex: 1 }}>Quartos</Typography>
            <IconButton onClick={() => setLocalRooms(Math.max(1, localRooms - 1))}>
              <RemoveIcon />
            </IconButton>
            <Typography>{localRooms}</Typography>
            <IconButton onClick={() => setLocalRooms(localRooms + 1)}>
              <AddIcon />
            </IconButton>
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cancelar</Button>
          <Button onClick={handleSave} variant="contained">Salvar</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default DateRangePicker;