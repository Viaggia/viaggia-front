import React from 'react'
import { Form } from 'react-bootstrap'
import Slider from 'rc-slider'
import 'rc-slider/assets/index.css'
import { FiltrosProps } from '../../../types/Filters'

interface FiltersSectionProps {
  filtros: FiltrosProps
  setFiltros: React.Dispatch<React.SetStateAction<FiltrosProps>>
  minPreco: number
  maxPreco: number
}

function FiltersSection({ filtros, setFiltros, minPreco, maxPreco }: FiltersSectionProps) {
  return (
    <aside className="p-4" style={{
      backgroundColor: '#fff',
      border: '1px solid #ddd',
      borderRadius: '12px',
      maxWidth: '280px',
      fontSize: '0.95rem',
      boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
      position: 'sticky',
      top: '100px',
      height: 'fit-content',
    }}>
      <div style={{
        fontSize: '1.5rem',
        fontWeight: '700',
        marginBottom: '24px',
        color: '#333',
      }}>
        Filtrar hospedagens
      </div>

      {/* Preço */}
      <div style={{ marginTop: '32px', paddingTop: '16px', borderTop: '1px solid #ccc' }}>
        <Form.Label style={{ fontWeight: '500' }}>Preço por noite</Form.Label>
        <Slider
          range
          min={minPreco}
          max={maxPreco}
          value={[filtros.precoMin, filtros.precoMax]}
          onChange={(value: number | number[]) => {
            if (Array.isArray(value)) {
              const [precoMin, precoMax] = value;
              setFiltros({ ...filtros, precoMin, precoMax });
            }
          }}
          step={10}
        />
        <div style={{ fontSize: '0.85rem', color: '#555' }}>
          De <strong>R$ {filtros.precoMin}</strong> até <strong>R$ {filtros.precoMax}</strong>
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
    </aside>
  )
}

export default FiltersSection