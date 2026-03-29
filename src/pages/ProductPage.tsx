import { useState, useMemo, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import Logo from "@/components/Logo";
import CustomizationTabs from "@/components/CustomizationTabs";
import ColorSelector from "@/components/ColorSelector";
import OptionSelector from "@/components/OptionSelector";
import PageLayout from "@/components/PageLayout";
import { getProductById, formatPrice } from "@/data/products";
import {
  baseTabs,
  getColorOptions,
  getHandleOptions,
  handcraftedTabs,
  getVariantImage,
} from "@/data/productVariants";
import { useOrderStore } from "@/store/orderStore";

const ProductPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { order, setOrder } = useOrderStore();

  const product = getProductById(id ?? "");

  const [activeTab, setActiveTab] = useState("color");
  const [selectedColor, setSelectedColor] = useState(order.color || "preta");
  const [selectedHandle, setSelectedHandle] = useState(order.handle || "");

  const isHandcrafted = product?.style === "handcrafted";
  const availableTabs = isHandcrafted ? handcraftedTabs : baseTabs;
  const availableColors = useMemo(
    () => (product ? getColorOptions(product.id) : []),
    [product],
  );
  const availableHandles = useMemo(
    () => (product ? getHandleOptions(product.id) : []),
    [product],
  );

  // Imagem muda dinamicamente conforme a cor
  const currentImage = useMemo(() => {
    if (!product) return "";
    return getVariantImage(product.id, selectedColor, product.image, selectedHandle);
  }, [product, selectedColor, selectedHandle]);

  // Set product in store on mount
  useEffect(() => {
    if (!product) return;

    const defaultColor = availableColors[0]?.value ?? "preta";
    setSelectedColor(defaultColor);
  }, [availableColors, product]);

  useEffect(() => {
    if (!product) return;

    if (product.style !== "handcrafted") {
      setSelectedHandle("");
      return;
    }

    const defaultHandle = availableHandles[0]?.value ?? "";
    setSelectedHandle(defaultHandle);
  }, [availableHandles, product]);

  useEffect(() => {
    if (product) {
      setOrder({
        productId: product.id,
        productName: product.name,
        price: product.price,
        style: product.style,
        color: selectedColor,
        handle: product.style === "handcrafted" ? selectedHandle : "",
      });
    }
  }, [product, selectedColor, selectedHandle, setOrder]);

  useEffect(() => {
    setActiveTab("color");
  }, [product?.id]);

  if (!product) {
    return (
      <PageLayout className="justify-center">
        <p className="font-body-light text-sm text-muted-foreground">
          Produto não encontrado.
        </p>
      </PageLayout>
    );
  }

  const handleOrder = () => {
    setOrder({
      color: selectedColor,
      handle: isHandcrafted ? selectedHandle : "",
    });
    navigate("/checkout");
  };

  return (
    <PageLayout>
      <Logo size="sm" />

      {/* Nome e descrição */}
      <motion.h1
        className="font-body-regular mt-5 text-lg tracking-[0.25em] text-foreground uppercase"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        {product.name}
      </motion.h1>
      <motion.p
        className="font-body-thin mt-1 text-xs text-muted-foreground"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4, delay: 0.1 }}
      >
        {product.description}
      </motion.p>

      {/* Imagem principal com animação de troca */}
      <div className="mt-5 flex w-full items-center justify-center">
        <AnimatePresence mode="wait">
          <motion.img
            key={currentImage}
            src={currentImage}
            alt={product.name}
            className="max-h-[420px] w-full object-contain"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.35 }}
          />
        </AnimatePresence>
      </div>

      {/* Abas de personalização */}
      <div className="mt-6 w-full">
        <CustomizationTabs
          activeTab={activeTab}
          onTabChange={setActiveTab}
          tabs={availableTabs}
        />
      </div>

      {/* Opções de personalização */}
      <div className="mt-5 flex min-h-[56px] w-full items-center justify-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
          >
            {activeTab === "color" && (
              <ColorSelector
                options={availableColors}
                selected={selectedColor}
                onSelect={setSelectedColor}
              />
            )}
            {activeTab === "handle" && isHandcrafted && (
              <OptionSelector
                options={availableHandles}
                selected={selectedHandle}
                onSelect={setSelectedHandle}
              />
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Preço + CTA */}
      <motion.div
        className="mt-10 flex w-full items-center justify-between"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4, delay: 0.3 }}
      >
        <span className="font-body-regular text-2xl tracking-wide text-foreground">
          {formatPrice(product.price)}
        </span>
        <motion.button
          onClick={handleOrder}
          className="rounded-full border border-foreground bg-background px-6 py-2.5 text-xs font-body-regular tracking-[0.2em] text-foreground transition-colors duration-300 hover:bg-foreground hover:text-primary-foreground"
          whileTap={{ scale: 0.96 }}
        >
          Enviar Pedido
        </motion.button>
      </motion.div>

      <motion.p
        className="font-body-light mt-5 w-full text-center text-xs leading-relaxed text-foreground"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4, delay: 0.4 }}
      >
        🛈 Nossas peças são produzidas exclusivamente sob encomenda e não trabalhamos com pronta entrega. Para consultar prazos e mais informações, entre em contato via WhatsApp ao final do seu pedido.
      </motion.p>
    </PageLayout>
  );
};

export default ProductPage;
