import { motion } from "framer-motion";

interface StyleButtonProps {
  label: string;
  /** Se true, usa estilo "preenchido" (fundo escuro) */
  filled?: boolean;
  onClick: () => void;
}

const StyleButton = ({ label, filled = false, onClick }: StyleButtonProps) => {
  return (
    <motion.button
      onClick={onClick}
      className={`w-full max-w-[280px] rounded-full border border-foreground px-8 py-4 text-sm font-body-light tracking-[0.2em] transition-colors duration-300 ${
        filled
          ? "bg-foreground text-primary-foreground hover:bg-background hover:text-foreground"
          : "bg-background text-foreground hover:bg-foreground hover:text-primary-foreground"
      }`}
      whileTap={{ scale: 0.97 }}
      transition={{ duration: 0.15 }}
    >
      {label}
    </motion.button>
  );
};

export default StyleButton;
