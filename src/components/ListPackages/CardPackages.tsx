import 'bootstrap/dist/css/bootstrap.min.css'
import React from 'react'

interface CardPackegesProps {
  items: any[]
  CardComponent: React.FC<any>
  text: string
}

function CardPackeges({ items, CardComponent, text }: CardPackegesProps) {
  return (
    <div className="container my-5">
      <h2 className="text-center mb-4">{text}</h2>
      <div className="row">
        {items.map((item, index) => (
          <div key={index} className="col-12 col-sm-6 col-md-4 col-lg-3 mb-4">
            <CardComponent {...item} />
          </div>
        ))}
      </div>
    </div>
  )
}

export default CardPackeges
