import CreateAdminForm from '../../components/forms/CreateAdminForm/CreateAdminForm'
import CreateAttendantForm from '../../components/forms/CreateAttendantForm/CreateAttendantForm'
import CreateHotelForm from '../../components/forms/CreateHotelForm/CreateHotelForm'
import CreatePackageForm from '../../components/forms/CreatePackageForm/CreatePackageForm'
import CreateServiceProviderForm from '../../components/forms/CreateServiceProviderForm/CreateServiceProviderForm'
import { useAuth } from '../../context/AuthContext'
import { useState } from 'react'

function Profile() {
  const { user } = useAuth()
  const [activeButton, setActiveButton] = useState('meu-perfil')

  if (!user) {
    return (
      <div className="container mt-5 mb-5">
        <div className="alert alert-info text-center">Carregando...</div>
      </div>
    )
  }

  return (
    <div className="row m-0">
      <div
        className="profile-left col-2 text-white d-flex flex-column align-items-center"
        style={{ backgroundColor: '#2577f2', minHeight: '100vh' }}
      >
        <div className="mt-4 text-center">
          <h3 className="h3">{user.name}</h3>
          <p className="p">{user.email}</p>
        </div>

        <button
          className={`btn w-100 mb-2 ${activeButton === 'meu-perfil' ? 'btn-light text-primary fw-bold' : 'btn-outline-light'}`}
          onClick={() => setActiveButton('meu-perfil')}
        >
          Meu Perfil
        </button>

        <button
          className={`btn w-100 ${activeButton === 'atualizar-perfil' ? 'btn-light text-primary fw-bold' : 'btn-outline-light'}`}
          onClick={() => setActiveButton('atualizar-perfil')}
        >
          Atualizar Perfil
        </button>

        <button
          className={`btn w-100 ${activeButton === 'cadastrar-adm' ? 'btn-light text-primary fw-bold' : 'btn-outline-light'}`}
          onClick={() => setActiveButton('cadastrar-adm')}
        >
          Cadastrar Administrador
        </button>

        <button
          className={`btn w-100 ${activeButton === 'cadastrar-attendant' ? 'btn-light text-primary fw-bold' : 'btn-outline-light'}`}
          onClick={() => setActiveButton('cadastrar-attendant')}
        >
          Cadastrar Atendente
        </button>

        <button
          className={`btn w-100 ${activeButton === 'cadastrar-service-provider' ? 'btn-light text-primary fw-bold' : 'btn-outline-light'}`}
          onClick={() => setActiveButton('cadastrar-service-provider')}
        >
          Cadastrar Prestador de Serviço
        </button>
        <button
          className={`btn w-100 ${activeButton === 'cadastrar-hotel' ? 'btn-light text-primary fw-bold' : 'btn-outline-light'}`}
          onClick={() => setActiveButton('cadastrar-hotel')}
        >
          Cadastrar Hotel
        </button>
        <button
          className={`btn w-100 ${activeButton === 'cadastrar-pacote' ? 'btn-light text-primary fw-bold' : 'btn-outline-light'}`}
          onClick={() => setActiveButton('cadastrar-pacote')}
        >
          Cadastrar Pacote
        </button>


      </div>

      <div className="profile-right col-10">
        <div className="container mt-5 mb-5">
          {activeButton === 'meu-perfil' && (
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

          {activeButton === 'cadastrar-service-provider' && (
            <div>
              <CreateServiceProviderForm />
            </div>
          )}
          {activeButton === 'cadastrar-hotel' && (
            <div>
              <CreateHotelForm />
            </div>
          )}
          {activeButton === 'cadastrar-pacote' && (
            <div>
              <CreatePackageForm />
            </div>
          )}


        </div>
      </div>
    </div>
  )
}

export default Profile
