import { motion } from "framer-motion";
import type { ColorOption } from "@/data/productVariants";

interface ColorSelectorProps {
  options: ColorOption[];
  selected: string;
  onSelect: (value: string) => void;
}

const ColorSelector = ({ options, selected, onSelect }: ColorSelectorProps) => {
  return (
    <div className="flex items-center justify-center gap-5">
      {options.map((opt) => (
        <motion.button
          key={opt.value}
          onClick={() => onSelect(opt.value)}
          aria-label={opt.name}
          className={`h-9 w-9 rounded-full transition-all duration-200 ${
            selected === opt.value
              ? "ring-2 ring-foreground ring-offset-2 ring-offset-background"
              : ""
          }`}
          style={{ backgroundColor: opt.hex }}
          whileHover={{ scale: 1.15 }}
          whileTap={{ scale: 0.95 }}
          animate={selected === opt.value ? { scale: 1.1 } : { scale: 1 }}
          transition={{ duration: 0.2 }}
        />
      ))}
    </div>
  );
};

export default ColorSelector;
