import { motion } from "framer-motion";
import type { Product } from "@/data/products";

interface ProductCardProps {
  product: Product;
  onClick: () => void;
  /** Index for staggered animation */
  index: number;
}

const ProductCard = ({ product, onClick, index }: ProductCardProps) => {
  return (
    <motion.button
      onClick={onClick}
      className="group w-full max-w-[280px] overflow-hidden rounded-2xl border border-border bg-card p-4 text-left transition-colors duration-300 hover:border-foreground"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      whileHover={{ y: -4 }}
      whileTap={{ scale: 1.2 }}
    >
      <div className="flex aspect-square items-center justify-center overflow-hidden rounded-xl bg-secondary/50">
        <img
          src={product.image}
          alt={product.name}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
      </div>
      <h3 className="font-body-regular mt-3 text-sm tracking-wide text-foreground">
        {product.name}
      </h3>
      <p className="font-body-thin mt-1 text-xs leading-relaxed text-muted-foreground">
        {product.description}
      </p>
    </motion.button>
  );
};

export default ProductCard;
