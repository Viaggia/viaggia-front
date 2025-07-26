import { useAuth } from '../../context/AuthContext'

function Profile() {
  const { user } = useAuth()

  if (!user) {
    return (
      <div className="container mt-5 mb-5">
        <div className="alert alert-info text-center">Carregando...</div>
      </div>
    )
  }

  return (
    <div className="container mt-5 mb-5">
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
  )
}

export default Profile
