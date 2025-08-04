import CreateAdminForm from '../../components/forms/CreateAdminForm/CreateAdminForm'
import CreateAttendantForm from '../../components/forms/CreateAttendantForm/CreateAttendantForm'
import CreateHotelForm from '../../components/forms/CreateHotelForm/CreateHotelForm'
import CreateHotelStepper from '../../components/forms/CreateHotelForm/CreateHotelStepper'
import CreatePackageForm from '../../components/forms/CreatePackageForm/CreatePackageForm'
import CreateServiceProviderForm from '../../components/forms/CreateServiceProviderForm/CreateServiceProviderForm'
import { useAuth } from '../../context/AuthContext'
import { useState } from 'react'
import MyReservations from '../MyReservations/MyReservations'

function Profile() {
  const { user, role } = useAuth();
  const [activeButton, setActiveButton] = useState('meu-perfil')
  const [hover, setHover] = useState(false)
  const [showModal, setShowModal] = useState(false)

  if (!user) {
    return (
      <div className="container mt-5 mb-5">
        <div className="alert alert-info text-center">Carregando...</div>
      </div>
    )
  }

  // Opções do menu lateral
  const menuOptions = [
    { value: 'meu-perfil', label: 'Meu Perfil' },
    { value: 'minhas-reservas', label: 'Minhas Reservas' },
    { value: 'atualizar-perfil', label: 'Atualizar Perfil' },
    ...(role !== 'CLIENT'
      ? [
          { value: 'cadastrar-adm', label: 'Cadastrar Administrador' },
          { value: 'cadastrar-attendant', label: 'Cadastrar Atendente' },
          { value: 'cadastrar-service-provider', label: 'Cadastrar Prestador de Serviço' },
          { value: 'cadastrar-hotel', label: 'Cadastrar Hotel' },
          { value: 'cadastrar-pacote', label: 'Cadastrar Pacote' },
        ]
      : []),
  ];

  return (
    <div className="row m-0">
      {/* Barra lateral (desktop) */}
      <div
        className="profile-left col-2 text-white d-none d-md-flex flex-column align-items-center"
        style={{ backgroundColor: '#2577f2', minHeight: '100vh' }}
      >
        <div className="mt-4 text-center w-100 d-none d-md-block">
          <div className="d-flex flex-column align-items-center w-100">
            <div
              className="position-relative rounded-circle shadow mb-2"
              style={{ width: '100px', height: '100px', overflow: 'hidden' }}
              onMouseEnter={() => setHover(true)}
              onMouseLeave={() => setHover(false)}
            >
              <img
                src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
                alt="imagem-perfil"
                width={100}
                height={100}
              />
              <div
                className="position-absolute top-0 start-0 w-100 h-100 d-flex justify-content-center align-items-center rounded-circle"
                style={{
                  backgroundColor: hover ? 'rgba(0, 0, 0, 0.4)' : 'rgba(0, 0, 0, 0)',
                  opacity: hover ? 1 : 0,
                  transition: 'background-color 0.3s, opacity 0.3s',
                  cursor: hover ? 'pointer' : 'default'
                }}
                onClick={() => setShowModal(true)}
              >
                <i className="bi bi-pencil-fill text-white fs-4"></i>
              </div>
            </div>
            <div className="text-center mt-2">
              <h5 className="h5 mb-1">{user.name}</h5>
              <p className="mb-1">{user.email}</p>
            </div>
            {/* Espaço entre email e botões */}
            <div style={{ height: 32 }} />
          </div>
        </div>
        {/* Mobile: mantém o antigo */}
        <div className="mt-4 text-center d-md-none">
          <div
            className="position-relative rounded-circle shadow mb-2"
            style={{ width: '100px', height: '100px', overflow: 'hidden' }}
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
          >
            <img
              src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
              alt="imagem-perfil"
              width={100}
              height={100}
            />
            <div
              className="position-absolute top-0 start-0 w-100 h-100 d-flex justify-content-center align-items-center rounded-circle"
              style={{
                backgroundColor: hover ? 'rgba(0, 0, 0, 0.4)' : 'rgba(0, 0, 0, 0)',
                opacity: hover ? 1 : 0,
                transition: 'background-color 0.3s, opacity 0.3s',
                cursor: hover ? 'pointer' : 'default'
              }}
              onClick={() => setShowModal(true)}
            >
              <i className="bi bi-pencil-fill text-white fs-4"></i>
            </div>
          </div>
          <h5 className="text-white mb-2">{user.name}</h5>
          <p className="text-white mb-2">{user.email}</p>
        </div>

        {/* Botões com espaçamento vertical */}
        <div className="w-100 d-flex flex-column align-items-center gap-2 mt-0">
          {menuOptions.map(opt => (
            <button
              key={opt.value}
              className={`btn w-100 ${activeButton === opt.value ? 'btn-light text-primary fw-bold' : 'btn-outline-light'}`}
              onClick={() => setActiveButton(opt.value)}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>

      {/* Conteúdo principal */}
      <div className="profile-right col-12 col-md-10">
        <div className="container mt-5 mb-5">
          {activeButton === 'meu-perfil' && (
            <div>
              <div className="card shadow-sm">
                <div className="card-header bg-primary text-white">
                  <h4 className="mb-0">Perfil do Usuário</h4>
                </div>
                <div className="card-body">
                  <div className="row mb-3">
                    <div className="col-md-6"><strong>Nome:</strong> {user.name}</div>
                    <div className="col-md-6"><strong>Email:</strong> {user.email}</div>
                  </div>
                  <div className="row mb-3">
                    <div className="col-md-6"><strong>Telefone:</strong> {user.phoneNumber}</div>
                    {user.cpf && <div className="col-md-6"><strong>CPF:</strong> {user.cpf}</div>}
                  </div>
                  {user.addressStreet && (
                    <div className="row mb-3">
                      <div className="col-md-12">
                        <strong>Endereço:</strong> {user.addressStreet}, {user.addressCity} - {user.addressState}, {user.addressZipCode}
                      </div>
                    </div>
                  )}
                  {user.companyName && (
                    <div className="row mb-3">
                      <div className="col-md-6"><strong>Empresa:</strong> {user.companyName}</div>
                      {user.companyLegalName && <div className="col-md-6"><strong>Razão Social:</strong> {user.companyLegalName}</div>}
                    </div>
                  )}
                  {user.employerCompanyName && (
                    <div className="row mb-3">
                      <div className="col-md-6"><strong>Empresa Empregadora:</strong> {user.employerCompanyName}</div>
                      {user.employeeId && <div className="col-md-6"><strong>ID do Funcionário:</strong> {user.employeeId}</div>}
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {activeButton === 'atualizar-perfil' && (
            <div className="card shadow-sm">
              <div className="card-header bg-warning text-dark">
                <h4 className="mb-0">Atualizar Perfil</h4>
              </div>
              <div className="card-body">
                <form>
                  <div className="mb-3">
                    <label className="form-label">Nome</label>
                    <input type="text" className="form-control" defaultValue={user.name} />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Email</label>
                    <input type="email" className="form-control" defaultValue={user.email} />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Telefone</label>
                    <input type="text" className="form-control" defaultValue={user.phoneNumber} />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">CPF</label>
                    <input type="text" className="form-control" defaultValue={user.cpf} />
                  </div>
                  <button type="submit" className="btn btn-primary">Salvar</button>
                </form>
              </div>
            </div>
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
                <input type="file" className="form-control mb-3" />
                <button className="btn btn-primary">Adicionar Imagem</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Profile