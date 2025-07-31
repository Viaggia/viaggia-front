import PromotionCard from "../../components/cards/PromotionCard/PromotionCard";
import "bootstrap/dist/css/bootstrap.min.css";

const promotions = [
  {
    title: "Chalês do Sul",
    description: "Chalê em promoção, casa aconchegante. Só hoje!",
    imageUrl: "/img/chale1.jpg",
    price: "R$ 339,90",
  },
  {
    title: "Chalês do Sul",
    description: "Chalê localizado ao topo da montanha.",
    imageUrl: "/img/chale2.jpg",
    price: "R$ 599,90",
  },
  {
    title: "Ofertas de Verão",
    description: "Hospedagem na praia",
    imageUrl: "/img/chale3.jpg",
    price: "R$ 779,90",
  },
  {
    title: "Ofertas de Verão",
    description: "Hospedagem na praia com desconto.",
    imageUrl: "/img/chale3.jpg",
    price: "R$ 779,90",
  },
  // ... outros cards
];

const Promotion = () => {
  return (
    <div className="container py-4">
      <h1 className="text-center mb-4">Promoções Imperdíveis</h1>

      <div
        className="d-flex overflow-auto gap-4 px-2"
        style={{
          scrollSnapType: "x mandatory",
          whiteSpace: "nowrap",
        }}
      >
        {promotions.map((promo, index) => (
          <div
            key={index}
            className="flex-shrink-0"
            style={{
              width: "100%",
              maxWidth: "300px",
              scrollSnapAlign: "start",
              transition: "transform 0.3s",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLDivElement).style.transform = "scale(1.05)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLDivElement).style.transform = "scale(1)";
            }}
          >
            <PromotionCard
              title={promo.title}
              description={promo.description}
              imageUrl={promo.imageUrl}
              price={promo.price}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Promotion;
