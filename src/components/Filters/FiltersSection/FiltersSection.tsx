import React, { useState } from 'react'
import { Form } from 'react-bootstrap'

/*interface FiltrosProps {
  preco: number
  cafe: boolean
  almoco: boolean
  jantar: boolean
  cancelamento: boolean
  restaurante: boolean
  quarto: boolean
  recepcao: boolean
  estacionamento: boolean
  SPA: boolean
}
*/

interface FiltersSectionProps {
  filtros: FiltrosProps
  setFiltros: React.Dispatch<React.SetStateAction<FiltrosProps>>
}

function FiltersSection({ filtros, setFiltros }: FiltersSectionProps) {
  return (
    <aside
      className="p-4"
      style={{
        backgroundColor: '#fff',
        border: '1px solid #ddd',
        borderRadius: '12px',
        maxWidth: '280px',
        fontSize: '0.95rem',
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
        position: 'sticky',
        top: '100px',
        height: 'fit-content',
      }}
    >
      <div
        style={{
          fontSize: '1.5rem',         // aumenta o tamanho da fonte (~24px)
          fontWeight: '700',          // peso forte
          marginBottom: '24px',       // espaço inferior
          color: '#333',              // cor mais escura para destacar
        }}
      >
        Filtrar hospedagens
      </div>

      {/* Preço */}
      <div style={{ marginTop: '32px', paddingTop: '16px', borderTop: '1px solid #ccc' }}>
        <Form.Label style={{ fontWeight: '500' }}>Preço por noite</Form.Label>
        <Form.Range
          min={30}
          max={50000}
          value={filtros.preco}
          onChange={(e) =>
            setFiltros({ ...filtros, preco: Number(e.target.value) })
          }
        />
        <div style={{ fontSize: '0.85rem', color: '#555' }}>
          Até <strong>R$ {filtros.preco}</strong>
        </div>
      </div>

      {/* Refeições incluídas */}
      <div style={{ marginTop: '32px', paddingTop: '16px', borderTop: '1px solid #ccc' }}>
        <Form.Label style={{ fontWeight: '500' }}>Refeições incluídas</Form.Label>
        <div className="d-flex flex-column">
          <Form.Check
            type="checkbox"
            label="Café da manhã"
            checked={filtros.cafe}
            onChange={(e) =>
              setFiltros({ ...filtros, cafe: e.target.checked })
            }
          />
          <Form.Check
            type="checkbox"
            label="Almoço"
            checked={filtros.almoco}
            onChange={(e) =>
              setFiltros({ ...filtros, almoco: e.target.checked })
            }
          />
          <Form.Check
            type="checkbox"
            label="Jantar"
            checked={filtros.jantar}
            onChange={(e) =>
              setFiltros({ ...filtros, jantar: e.target.checked })
            }
          />
        </div>
      </div>

      {/* Comodidades */}
      <div style={{ marginTop: '32px', paddingTop: '16px', borderTop: '1px solid #ccc' }}>
        <Form.Label style={{ fontWeight: '500' }}>Comodidades</Form.Label>
        <div className="d-flex flex-column">
          <Form.Check
            type="checkbox"
            label="Acessibilidade"
            checked={filtros.acessibilidade}
            onChange={(e) =>
              setFiltros({ ...filtros, acessibilidade: e.target.checked })
            }
          />
          <Form.Check
            type="checkbox"
            label="Academia"
            checked={filtros.academia}
            onChange={(e) =>
              setFiltros({ ...filtros, academia: e.target.checked })
            }
          />
          <Form.Check
            type="checkbox"
            label="Ar-condicionado"
            checked={filtros.arcondicionado}
            onChange={(e) =>
              setFiltros({ ...filtros, arcondicionado: e.target.checked })
            }
          />
          <Form.Check
            type="checkbox"
            label="Cancelamento gratuito"
            checked={filtros.cancelamento}
            onChange={(e) =>
              setFiltros({ ...filtros, cancelamento: e.target.checked })
            }
          />
          <Form.Check
            type="checkbox"
            label="Estacionamento"
            checked={filtros.estacionamento}
            onChange={(e) =>
              setFiltros({ ...filtros, estacionamento: e.target.checked })
            }
          />
          <Form.Check
            type="checkbox"
            label="Pet-friendly"
            checked={filtros.petfriendly}
            onChange={(e) =>
              setFiltros({ ...filtros, petfriendly: e.target.checked })
            }
          />
          <Form.Check
            type="checkbox"
            label="Piscina"
            checked={filtros.piscina}
            onChange={(e) =>
              setFiltros({ ...filtros, piscina: e.target.checked })
            }
          />
          <Form.Check
            type="checkbox"
            label="Recepção 24h"
            checked={filtros.recepcao}
            onChange={(e) =>
              setFiltros({ ...filtros, recepcao: e.target.checked })
            }
          />
          <Form.Check
            type="checkbox"
            label="Serviço de quarto"
            checked={filtros.quarto}
            onChange={(e) =>
              setFiltros({ ...filtros, quarto: e.target.checked })
            }
          />
          <Form.Check
            type="checkbox"
            label="SPA"
            checked={filtros.SPA}
            onChange={(e) =>
              setFiltros({ ...filtros, SPA: e.target.checked })
            }
          />
          <Form.Check
            type="checkbox"
            label="Wi-Fi"
            checked={filtros.wifi}
            onChange={(e) =>
              setFiltros({ ...filtros, wifi: e.target.checked })
            }
          />
        </div>
      </div>


      {/* Serviços Adicionais */}
      <div style={{ marginTop: '32px', paddingTop: '16px', borderTop: '1px solid #ccc' }}>
        <Form.Label style={{ fontWeight: '500' }}>Serviços Adicionais</Form.Label>
        <div className="d-flex flex-column">
          <Form.Check
            type="checkbox"
            label="Translado aeroporto"
            checked={filtros.translado}
            onChange={(e) =>
              setFiltros({ ...filtros, translado: e.target.checked })
            }
          />
          <Form.Check
            type="checkbox"
            label="Aluguel de bicicletas"
            checked={filtros.bicicleta}
            onChange={(e) =>
              setFiltros({ ...filtros, bicicleta: e.target.checked })
            }
          />
        </div>
      </div>

    </aside>
  )
}

function FiltrosWrapper() {
  const [filtros, setFiltros] = useState<FiltrosProps>({
    preco: 300,
    cafe: false,
    almoco: false,
    jantar: false,
    cancelamento: false,
    quarto: false,
    recepcao: false,
    estacionamento: false,
    SPA: false,
    piscina: false,
    academia: false,
    wifi: false,
    arcondicionado: false,
    acessibilidade: false,
    petfriendly: false,
    translado: false,
    bicicleta: false,
  })

  return (
    <div
      className="d-flex justify-content-start"
      style={{ paddingLeft: '20px', paddingTop: '20px', paddingBottom: '20px', alignItems: 'flex-start' }} // margem interna à esquerda e topo
    >
      <FiltersSection filtros={filtros} setFiltros={setFiltros} />
    </div>
  )
}

export default FiltrosWrapper
