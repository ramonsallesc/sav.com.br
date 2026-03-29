import { motion } from "framer-motion";
import type { TextOption } from "@/data/productVariants";

interface OptionSelectorProps {
  options: TextOption[];
  selected: string;
  onSelect: (value: string) => void;
}

const OptionSelector = ({ options, selected, onSelect }: OptionSelectorProps) => {
  return (
    <div className="flex flex-wrap items-center justify-center gap-3">
      {options.map((opt) => (
        <motion.button
          key={opt.value}
          onClick={() => onSelect(opt.value)}
          className={`rounded-full border px-5 py-2 text-xs font-body-light tracking-wider transition-colors duration-250 ${
            selected === opt.value
              ? "border-foreground bg-foreground text-primary-foreground"
              : "border-border text-foreground hover:border-foreground"
          }`}
          whileTap={{ scale: 0.95 }}
          transition={{ duration: 0.15 }}
        >
          {opt.name}
        </motion.button>
      ))}
    </div>
  );
};

export default OptionSelector;
