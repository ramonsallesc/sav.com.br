import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

interface LogoProps {
  /** "lg" para Home, "sm" para páginas internas */
  size?: "lg" | "sm";
}

const Logo = ({ size = "lg" }: LogoProps) => {
  const navigate = useNavigate();

  return (
    <motion.button
      onClick={() => navigate("/")}
      className={`font-logo text-foreground tracking-wider select-none ${
        size === "lg" ? "text-5xl md:text-7xl" : "text-2xl md:text-3xl"
      }`}
      whileHover={{ opacity: 0.7 }}
      transition={{ duration: 0.2 }}
    >
      SÀV
    </motion.button>
  );
};

export default Logo;
