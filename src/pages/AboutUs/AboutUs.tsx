import 'bootstrap/dist/css/bootstrap.min.css'

function AboutUs() {
    const teamMembers = [
        {
            name: 'Matheus de Oliveira Santos',
            role: 'Desenvolvedor Full-Stack',
            photo: '/img/matheus.jpg'
        },
        {
            name: 'Hugo Ferreira Silva',
            role: 'Desenvolvedor Frontend',
            photo: '/img/hugo.jpg'
        },
        {
            name: 'Patrícia Vitória Lima de Oliveira',
            role: 'Desenvolvedora Frontend',
            photo: '/img/patricia.jpg'
        },
        {
            name: 'Victor Pereira De Melo',
            role: 'Engenheiro de Integração / DevOps',
            photo: '/img/victor.jpg'
        },
        {
            name: 'Paloma Luíza de Souza França',
            role: 'Desenvolvedora Backend',
            photo: '/img/paloma.jpg'
        },
        {
            name: 'Renan Freitas Dos Anjos',
            role: 'Desenvolvedor Backend',
            photo: '/img/renan.jpg'
        },
        {
            name: 'Rafaella Marques Farias',
            role: 'Desenvolvedora Backend',
            photo: '/img/rafaella.jpg'
        }
    ]


    return (
        <div className="container py-5">
            <h2 className="mb-4">Sobre nós</h2>

            <p>
                A <strong>Viaggia</strong> nasceu com o propósito de transformar a forma como as pessoas planejam e vivenciam suas viagens.
                Somos uma plataforma digital que conecta viajantes a experiências únicas, hospedagens de qualidade e serviços personalizados.
                Nosso foco é oferecer praticidade, segurança e inspiração para cada jornada.
            </p>

            <p>
                Combinamos tecnologia moderna com uma abordagem centrada no usuário, garantindo que cada etapa — da busca ao pagamento —
                seja intuitiva e eficiente. Acreditamos que viajar é mais do que deslocar-se: é descobrir, conectar-se e criar memórias.
            </p>

            <p>
                Nosso time é formado por profissionais apaixonados por inovação, turismo e desenvolvimento de soluções que realmente fazem a diferença.
                Juntos, trabalhamos para que a Viaggia seja referência em experiências de viagem no Brasil.
            </p>

            <hr className="my-5" />

            <h3 className="mb-4">Conheça nosso time</h3>
            <div className="row">
                {teamMembers.map((member, index) => (
                    <div key={index} className="col-md-6 col-lg-4 mb-4">
                        <div className="card h-100 text-center shadow-sm border-0">
                            <div className="p-4">
                                <img
                                    src={member.photo}
                                    alt={member.name}
                                    className="rounded-circle mb-3"
                                    style={{ width: '150px', height: '150px', objectFit: 'cover' }}
                                />
                                <h5 className="card-title">{member.name}</h5>
                                <p className="card-text text-muted">{member.role}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default AboutUs
