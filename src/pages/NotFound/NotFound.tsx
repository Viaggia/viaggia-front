import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

function NotFound() {
  return (
    <div className="container text-center mt-5">
      <div className="card shadow-sm">
        <div className="card-body">
          <h1 className="display-4 text-danger">404 - Página não encontrada</h1>
          <p className="lead">A página que você está procurando não existe ou foi removida.</p>
          <a href="/" className="btn btn-primary mt-3">Voltar para o início</a>
        </div>
      </div>
    </div>
  );
}

export default NotFound;
