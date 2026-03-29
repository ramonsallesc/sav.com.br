import { useParams, useNavigate } from "react-router-dom";
import Logo from "@/components/Logo";
import PageLayout from "@/components/PageLayout";
import { products, type Category } from "@/data/products";

const ProductList = () => {
  const { category } = useParams<{ category: string }>();
  const navigate = useNavigate();

  const filtered = products.filter((p) => p.category === (category as Category));

  return (
    <PageLayout>
      <Logo size="sm" />

      <p className="font-body-light mt-4 text-sm tracking-wide text-foreground">
        Escolha o modelo
      </p>

      <div className="mt-6 flex w-full flex-col items-center gap-6">
        {filtered.map((product) => (
          <button
            key={product.id}
            onClick={() => navigate(`/personalizar/${product.id}`)}
            className="group w-full max-w-[260px] overflow-hidden rounded-2xl border border-border bg-background p-4 transition-all duration-300 hover:border-foreground hover:shadow-lg"
          >
            <div className="flex aspect-square items-center justify-center overflow-hidden rounded-xl bg-secondary/40">
              <img
                src={product.image}
                alt={product.name}
                className="h-4/5 w-4/5 object-contain transition-transform duration-300 group-hover:scale-105"
              />
            </div>
            <h3 className="font-body-regular mt-3 text-sm text-foreground">{product.name}</h3>
            <p className="font-body-thin mt-1 text-xs text-muted-foreground">{product.description}</p>
          </button>
        ))}
      </div>
    </PageLayout>
  );
};

export default ProductList;
