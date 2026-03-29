import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import Logo from "@/components/Logo";
import ProductCard from "@/components/ProductCard";
import PageLayout from "@/components/PageLayout";
import { getProductsByStyle, type Style } from "@/data/products";
import { useOrderStore } from "@/store/orderStore";

const StylePage = () => {
  const { style } = useParams<{ style: string }>();
  const navigate = useNavigate();
  const setOrder = useOrderStore((s) => s.setOrder);

  const filtered = getProductsByStyle(style as Style);

  const handleSelect = (productId: string) => {
    const styleLabel = style === "handcrafted" ? "Handcrafted" : "Fashion Essentials";
    setOrder({ style: style ?? "", productId });
    navigate(`/product/${productId}`);
  };

  return (
    <PageLayout>
      <Logo size="sm" />

      <motion.p
        className="font-body-light mt-5 text-sm tracking-widest text-foreground"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4, delay: 0.2 }}
      >
        Escolha o modelo
      </motion.p>

      <div className="mt-8 flex w-full flex-col items-center gap-6 pb-10">
        {filtered.map((product, i) => (
          <ProductCard
            key={product.id}
            product={product}
            index={i}
            onClick={() => handleSelect(product.id)}
          />
        ))}

        {filtered.length === 0 && (
          <p className="font-body-thin mt-10 text-xs text-muted-foreground">
            Nenhum modelo disponível nesta categoria.
          </p>
        )}
      </div>
    </PageLayout>
  );
};

export default StylePage;
