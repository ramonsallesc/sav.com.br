import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import Logo from "@/components/Logo";
import StyleButton from "@/components/StyleButton";
import PageLayout from "@/components/PageLayout";

const Index = () => {
  const navigate = useNavigate();

  return (
    <PageLayout className="justify-start">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <Logo size="lg" />
      </motion.div>

      <div className="absolute inset-x-0 top-1/2 flex -translate-y-1/2 flex-col items-center px-6">
        <motion.p
          className="font-body-light text-sm tracking-widest text-foreground"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          Escolha seu estilo
        </motion.p>

        <motion.div
          className="mt-6 flex w-full flex-col items-center gap-5"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <StyleButton
            label="Handcrafted"
            onClick={() => navigate("/style/handcrafted")}
          />
          <StyleButton
            label="Fashion Essentials"
            onClick={() => navigate("/style/fashion-essentials")}
          />
        </motion.div>
      </div>

      <motion.p
        className="font-body-ultralight fixed left-1/2 z-20 -translate-x-1/2 text-[10px] tracking-widest text-muted-foreground"
        style={{ bottom: "max(0.75rem, env(safe-area-inset-bottom))" }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.7 }}
      >
        <a
          href="https://www.instagram.com/bysavbr/"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-foreground transition-colors duration-300"
        >
          @bysavbr
        </a>
      </motion.p>
    </PageLayout>
  );
};

export default Index;
