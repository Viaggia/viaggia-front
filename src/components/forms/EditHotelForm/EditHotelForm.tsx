import { UpdateHotelDTO } from "../../../types/Hotel";

interface EditHotelFormProps {
  form: UpdateHotelDTO;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => void;
  onSubmit: (e: React.FormEvent) => void;
  onCancel: () => void;
}

function EditHotelForm({ form, onChange, onSubmit, onCancel }: EditHotelFormProps) {
  return (
    <form onSubmit={onSubmit}>
      <div className="modal-body">
        <div className="mb-2">
          <label className="form-label">Nome</label>
          <input className="form-control" name="name" value={form.name} onChange={onChange} required />
        </div>
        <div className="mb-2">
          <label className="form-label">CNPJ</label>
          <input className="form-control" name="cnpj" value={form.cnpj} onChange={onChange} required />
        </div>
        <div className="mb-2">
          <label className="form-label">Endereço</label>
          <input className="form-control" name="street" value={form.street} onChange={onChange} required />
        </div>
        <div className="mb-2">
          <label className="form-label">Cidade</label>
          <input className="form-control" name="city" value={form.city} onChange={onChange} required />
        </div>
        <div className="mb-2">
          <label className="form-label">Estado</label>
          <input className="form-control" name="state" value={form.state} onChange={onChange} required />
        </div>
        <div className="mb-2">
          <label className="form-label">CEP</label>
          <input className="form-control" name="zipCode" value={form.zipCode} onChange={onChange} required />
        </div>
        <div className="mb-2">
          <label className="form-label">Descrição</label>
          <textarea className="form-control" name="description" value={form.description} onChange={onChange} />
        </div>
        <div className="mb-2">
          <label className="form-label">Estrelas</label>
          <select className="form-select" name="starRating" value={form.starRating} onChange={onChange}>
            {[1, 2, 3, 4, 5].map(n => <option key={n} value={n}>{n}</option>)}
          </select>
        </div>
        <div className="mb-2">
          <label className="form-label">Check-in</label>
          <input className="form-control" name="checkInTime" value={form.checkInTime} onChange={onChange} />
        </div>
        <div className="mb-2">
          <label className="form-label">Check-out</label>
          <input className="form-control" name="checkOutTime" value={form.checkOutTime} onChange={onChange} />
        </div>
        <div className="mb-2">
          <label className="form-label">Telefone</label>
          <input className="form-control" name="contactPhone" value={form.contactPhone} onChange={onChange} />
        </div>
        <div className="mb-2">
          <label className="form-label">E-mail</label>
          <input className="form-control" name="contactEmail" value={form.contactEmail} onChange={onChange} />
        </div>
        <div className="form-check mb-2">
          <input className="form-check-input" type="checkbox" name="isActive" checked={form.isActive} onChange={onChange} id="isActiveCheck" />
          <label className="form-check-label" htmlFor="isActiveCheck">
            Ativo
          </label>
        </div>
      </div>
      <div className="modal-footer">
        <button type="button" className="btn btn-secondary" onClick={onCancel}>Cancelar</button>
        <button type="submit" className="btn btn-primary">Salvar</button>
      </div>
    </form>
  );
}

export default EditHotelForm;