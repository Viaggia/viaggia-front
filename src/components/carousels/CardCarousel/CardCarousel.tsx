import 'bootstrap/dist/css/bootstrap.min.css'
import React from 'react'

interface CardCarouselProps {
  items: any[]
  CardComponent: React.FC<any>,
  text: string
}

function CardCarousel({ items, CardComponent, text }: CardCarouselProps) {
  return (
    <div className="container my-5">
      <h2 className="text-center mb-4">{ text }</h2>
      <div
        className="d-flex overflow-auto gap-4 px-2 py-3"
        style={{ scrollSnapType: 'x mandatory' }}
      >
        {items.map((item, index) => (
          <div
            key={index}
            style={{
              flex: '0 0 auto',
              scrollSnapAlign: 'start',
              width: '300px',
            }}
          >
            <CardComponent {...item} />
          </div>
        ))}
      </div>
    </div>
  )
}

export default CardCarousel
