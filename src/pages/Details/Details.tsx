import React from 'react';
import CarouselCards from '../../components/cards/Carrossel/CarouselCards';
import AdditionalServicesCard from '../../components/Plus/AdditionalServicesCard';
import 'bootstrap/dist/css/bootstrap.min.css';

const Details: React.FC = () => {
  return (

    <div className="container-fluid py-5">
      <div className="m-3">
        <div>
          <h1 className="text-around mb-4">Porto Bahia Hotel</h1>
        </div>
        <div>
          <h3 className="text-around mb-4">Bahia, Porto Seguro</h3>
        </div>
      </div>
      <div className="row justify-content-around">
        <div className="col-lg-6 mb-5">
          <CarouselCards />
        </div>
       <div className="col-lg-3" style={{ marginTop: '-20px' }}>
         <AdditionalServicesCard />
        </div>
      </div>
       <div className="col-md-6 m-3">
  <div>
    <p className="fw-bold padding-left-3">
     O Hotel Mar à Vista está convenientemente localizado na popular área de Porto Seguro. Tanto viajantes a negócios quanto turistas podem desfrutar das instalações e serviços do hotel.
    </p>
  </div>
</div>
<div className="container mt-3">
  <div className="row row-cols-1 row-cols-sm-2 row-cols-md-4 gx-0 gy-1">

    <div className="col">
      <h6 className="mb-1">Serviços inclusos</h6>
      <ul className="list-unstyled small mb-0">
        <li>Wi-Fi</li>
        <li>Café da manhã</li>
        <li>Estacionamento</li>
        <li>Acessibilidade</li>
      </ul>
    </div>

    <div className="col">
      <h6 className="mb-1">Status</h6>
      <ul className="list-unstyled small mb-0">
        <li>Incluso</li>
        <li>Incluso</li>
        <li>Incluso</li>
        <li>Incluso</li>
      </ul>
    </div>

    <div className="col">
      <h6 className="mb-1">Serviços à parte</h6>
      <ul className="list-unstyled small mb-0">
        <li>Passeio de Buggy</li>
        <li>Almoço</li>
        <li>Janta ou Almoço</li>
        <li>Passeio Turístico</li>
        <li>Aceita animais</li>
        <li>Tem piscina</li>
        <li>Sala de jogo</li>
        <li>Spa</li>
        <li>Academia</li>
      </ul>
    </div>

    <div className="col">
      <h6 className="mb-1">Valores</h6>
      <ul className="list-unstyled small mb-0">
        <li>R$120</li>
        <li>R$40</li>
        <li>R$45</li>
        <li>R$100</li>
        <li>R$50</li>
        <li>R$30</li>
        <li>R$25</li>
        <li>R$60</li>
        <li>R$70</li>
      </ul>
    </div>

  </div>
</div>

    </div>
  );
};

export default Details;
