<<<<<<< HEAD
function Register() {
  return (
    <div>
      <h1>Register</h1>
      <p>Create your account to start your journey with Viaggia!</p>
    </div>
=======
import '@fortawesome/fontawesome-free/css/all.min.css';
import './Register.css'

function Register() {
  return (
    <div>
      <header className="header-register">
        <div className="logo-area">
          <h1 className="name-header">Viaggia</h1>
          <i className="fas fa-plane icon-plane"></i>
        </div>
        <i className="fas fa-user icon-user"></i>
      </header>
    
    <div className='register-container'>
      <div className="card-register">
        <div className="register-content">
          <form className="form-card" >
            <p>Faça seu Cadastro</p>

            <div className="inputs-register">
              <input type="text" id="nomeCompleto" name="nomeCompleto" placeholder="Nome Completo" required />
            </div>
            <div className="inputs-register">
              <input type="email" id="email" name="email" placeholder="Email" required />
            </div>
            <div className="inputs-register">
              <input type="password" id="password" name="password" placeholder="Password" required />
            </div>
            <div className="inputs-register">
              <input type="text" id="cpforpassport" name="cpforpassport" placeholder="CPF ou PASSPORT" required />
            </div>
            <div className="inputs-register">
              <input type="tel" id="phone" name="phone" placeholder="Telefone" required />
            </div>
           <div className="inputs-register">
              <input
                type="date"
                id="data"
                name="data"
                required
                onFocus={(e) => e.target.showPicker()}
              />
            </div>
            <button type="submit">Cadastrar</button>
            <span>Ja é cadastrado? <a href="#" className="link-login">Fazer Login</a></span>
          </form>

        </div>
      </div>
        <div className='img-register'>
            <img src="https://i.pinimg.com/736x/99/de/98/99de98eb4e7bd078d39db104da78444e.jpg" alt="imagem-register" />
          </div>
    </div>
          
  </div>
>>>>>>> 2f9dfc5be039df7a8bad215ee67acc02b451ad8c
  )
}

export default Register
