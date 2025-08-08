import React, { useState } from 'react';
import CreateAdminForm from '../forms/CreateAdminForm/CreateAdminForm';
import CreateAttendantForm from '../forms/CreateAttendantForm/CreateAttendantForm';
import CreateHotelStepper from '../forms/CreateHotelForm/CreateHotelStepper';
import CreatePackageForm from '../forms/CreatePackageForm/CreatePackageForm';
import CreateServiceProviderForm from '../forms/CreateServiceProviderForm/CreateServiceProviderForm';
import MyHotels from '../../pages/MyHotels/MyHotels';
import MyPackages from '../../pages/MyPackages/MyPackages';
import { useAuth } from '../../context/AuthContext';
import RequestsPanel from '../RequestsPanel/RequestsPanel';

interface AdminPanelProps {
  userId: number;
}

const adminButtons = [
  { value: 'my-hotels', label: 'Meus Hotéis' },
  { value: 'my-packages', label: 'Meus Pacotes' },
  { value: 'create-admin', label: 'Cadastrar Admin' },
  { value: 'create-attendant', label: 'Cadastrar Atendente' },
  { value: 'create-service-provider', label: 'Cadastrar Prestador de Serviço' },
  { value: 'create-hotel', label: 'Cadastrar Hotel' },
  { value: 'create-package', label: 'Cadastrar Pacote' },
];

const serviceProviderButtons = [
  { value: 'my-hotels', label: 'Meus Hotéis' },
  { value: 'my-packages', label: 'Meus Pacotes' },
  { value: 'create-hotel', label: 'Cadastrar Hotel' },
  { value: 'create-package', label: 'Cadastrar Pacote' },
];

const attendantButtons = [
  { value: 'requests', label: 'Solicitações' }, 
];

const AdminPanel: React.FC<AdminPanelProps> = ({ userId }) => {
  const { role } = useAuth();
  const [activePanel, setActivePanel] = useState<string>(
    role === 'ATTENDANT' ? 'requests' : 'my-hotels'
  );

  let buttons: { value: string; label: string }[];
  if (role === 'ADMIN') {
    buttons = adminButtons;
  } else if (role === 'SERVICE_PROVIDER') {
    buttons = serviceProviderButtons;
  } else if (role === 'ATTENDANT') {
    buttons = attendantButtons;
  } else {
    buttons = [];
  }

  return (
    <div>
      <div className="d-flex gap-2 mb-4 flex-wrap">
        {buttons.map(btn => (
          <button
            key={btn.value}
            className={`btn ${activePanel === btn.value ? 'btn-primary' : 'btn-outline-primary'}`}
            onClick={() => setActivePanel(btn.value)}
          >
            {btn.label}
          </button>
        ))}
      </div>
      <div>
        {activePanel === 'my-hotels' && <MyHotels userId={userId} />}
        {activePanel === 'my-packages' && <MyPackages userId={userId} />}
        {activePanel === 'create-admin' && <CreateAdminForm />}
        {activePanel === 'create-attendant' && <CreateAttendantForm />}
        {activePanel === 'create-service-provider' && <CreateServiceProviderForm />}
        {activePanel === 'create-hotel' && <CreateHotelStepper />}
        {activePanel === 'create-package' && <CreatePackageForm />}
        {activePanel === 'requests' && <RequestsPanel />}
      </div>
    </div>
  );
};

export default AdminPanel;