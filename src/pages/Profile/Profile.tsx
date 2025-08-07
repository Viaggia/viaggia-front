import CreateAdminForm from '../../components/forms/CreateAdminForm/CreateAdminForm'
import CreateAttendantForm from '../../components/forms/CreateAttendantForm/CreateAttendantForm'
import CreateHotelStepper from '../../components/forms/CreateHotelForm/CreateHotelStepper'
import CreatePackageForm from '../../components/forms/CreatePackageForm/CreatePackageForm'
import CreateServiceProviderForm from '../../components/forms/CreateServiceProviderForm/CreateServiceProviderForm'
import { useAuth } from '../../context/AuthContext'
import { useState } from 'react'
import MyReservations from '../MyReservations/MyReservations'
import ProfileSidebar from '../../components/Sidebars/ProfileSidebar'
import ProfileMobileMenu from '../../components/Sidebars/ProfileMobileMenu'
import ProfileUserInfoCard from '../../components/cards/ProfileUserInfoCard/ProfileUserInfoCard'
import { updateUser } from '../../services/userService'
import MyHotels from '../MyHotels/MyHotels'

function Profile() {
  const { user, role, setUser } = useAuth();
  const [activeButton, setActiveButton] = useState('meu-perfil')
  const [hover, setHover] = useState(false)
  const [showModal, setShowModal] = useState(false)
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  


  if (!user) {
    return (
      <div className="container mt-5 mb-5">
        <div className="alert alert-info text-center">Carregando...</div>
      </div>
    )
  }

  const menuOptions = [
    { value: 'meu-perfil', label: 'Meu Perfil' },
    { value: 'minhas-reservas', label: 'Minhas Reservas' },
    ...(role !== 'CLIENT'
      ? [
        { value: 'meus-hoteis', label: 'Meus Hotéis' },
        { value: 'cadastrar-adm', label: 'Cadastrar Administrador' },
        { value: 'cadastrar-attendant', label: 'Cadastrar Atendente' },
        { value: 'cadastrar-service-provider', label: 'Cadastrar Prestador de Serviço' },
        { value: 'cadastrar-hotel', label: 'Cadastrar Hotel' },
        { value: 'cadastrar-pacote', label: 'Cadastrar Pacote' },
      ]
      : []),
  ];

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setAvatarFile(e.target.files[0]);
    }
  };

    const handleAvatarUpload = async () => {
    if (!avatarFile) return;
    setUploading(true);
    try {
      const updatedUser = await updateUser(user.id, { name: user.name }, avatarFile);
      setUser(updatedUser); // atualiza o contexto com os dados mais recentes
    } finally {
      setUploading(false);
      setShowModal(false);
      setAvatarFile(null);
    }
  };


  return (
    <div className="row m-0">
      {/* Barra lateral (desktop) */}
      <div
        className="profile-left col-2 text-white d-none d-md-flex flex-column align-items-center"
        style={{ backgroundColor: '#2577f2', minHeight: '100vh' }}
      >
        <ProfileSidebar
          user={user}
          menuOptions={menuOptions}
          activeButton={activeButton}
          setActiveButton={setActiveButton}
          hover={hover}
          setHover={setHover}
          setShowModal={setShowModal}
        />
      </div>

      {/* Menu mobile: avatar + select */}
      <div className="d-md-none col-12 p-0">
        <ProfileMobileMenu
          user={user}
          hover={hover}
          setHover={setHover}
          setShowModal={setShowModal}
          activeButton={activeButton}
          setActiveButton={setActiveButton}
          menuOptions={menuOptions}
        />
      </div>

      {/* Conteúdo principal */}
      <div className="profile-right col-12 col-md-10">
        <div className="container mt-5 mb-5">
          {activeButton === 'meu-perfil' && (
            <ProfileUserInfoCard user={user} role={role || ''} />
          )}

          {activeButton === 'cadastrar-adm' && (
            <div>
              <CreateAdminForm />
            </div>
          )}

          {activeButton === 'cadastrar-attendant' && (
            <div>
              <CreateAttendantForm />
            </div>
          )}

          {activeButton === 'minhas-reservas' && (
            <div>
              <MyReservations />
            </div>
          )}

          {activeButton === 'cadastrar-service-provider' && (
            <div>
              <CreateServiceProviderForm />
            </div>
          )}

          {activeButton === 'cadastrar-hotel' && (
            <div>
              <CreateHotelStepper />
            </div>
          )}
          {activeButton === 'cadastrar-pacote' && (
            <div>
              <CreatePackageForm />
            </div>
          )}
          {activeButton === 'meus-hoteis' && (
            <div>
              <MyHotels userId={user.id} />
            </div>
          )}
        </div>
      </div>
      {showModal && (
        <div
          className="modal fade show"
          style={{ display: 'block', backgroundColor: 'rgba(0,0,0,0.5)' }}
          tabIndex={-1}
          role="dialog"
        >
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Atualizar Imagem de Perfil</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setShowModal(false)}
                ></button>
              </div>
              <div className="modal-body text-center">
                <p>Escolha uma nova imagem de perfil:</p>
                <input type="file" className="form-control mb-3" onChange={handleAvatarChange} />
                <button
                  className="btn btn-primary"
                  onClick={handleAvatarUpload}
                  disabled={uploading || !avatarFile}
                >
                  {uploading ? 'Enviando...' : 'Adicionar Imagem'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Profile