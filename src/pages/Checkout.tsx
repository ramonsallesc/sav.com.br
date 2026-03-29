import { useState } from "react";
import { motion } from "framer-motion";
import Logo from "@/components/Logo";
import OrderSummary from "@/components/OrderSummary";
import InputField from "@/components/InputField";
import PageLayout from "@/components/PageLayout";
import { useOrderStore } from "@/store/orderStore";
import { formatPrice } from "@/data/products";
import { getColorLabel, getHandleLabel } from "@/data/productVariants";
import { openWhatsApp } from "@/utils/whatsappMessage";

const Checkout = () => {
  const order = useOrderStore((s) => s.order);

  const [name, setName] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [notes, setNotes] = useState("");

  /** Máscara de telefone simples: (XX) XXXXX-XXXX */
  const handleWhatsappChange = (val: string) => {
    const digits = val.replace(/\D/g, "").slice(0, 11);
    let masked = digits;
    if (digits.length > 2) masked = `(${digits.slice(0, 2)}) ${digits.slice(2)}`;
    if (digits.length > 7)
      masked = `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7)}`;
    setWhatsapp(masked);
  };

  const styleLabel =
    order.style === "handcrafted" ? "Handcrafted" : "Fashion Essentials";

  const handleSubmit = () => {
    openWhatsApp({
      style: styleLabel,
      productName: order.productName,
      color: getColorLabel(order.productId, order.color),
      handle: order.style === "handcrafted" ? getHandleLabel(order.productId, order.handle) : undefined,
      price: formatPrice(order.price),
      customerName: name,
      customerWhatsApp: whatsapp,
      notes,
    });
  };

  const isValid = name.trim().length > 0 && whatsapp.replace(/\D/g, "").length >= 10;

  return (
    <PageLayout>
      <motion.div
        initial={{ opacity: 0, y: -15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Logo size="lg" />
      </motion.div>

      <motion.p
        className="font-body-light mt-5 text-sm tracking-widest text-foreground"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        Revise e envie seu pedido
      </motion.p>

      {/* Resumo */}
      <motion.div
        className="mt-6 w-full"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <OrderSummary order={order} />
      </motion.div>

      {/* Formulário */}
      <motion.div
        className="mt-6 flex w-full flex-col gap-4"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <InputField
          placeholder="Seu nome"
          value={name}
          onChange={setName}
        />
        <InputField
          type="tel"
          placeholder="WhatsApp (XX) XXXXX-XXXX"
          value={whatsapp}
          onChange={handleWhatsappChange}
        />
        <InputField
          placeholder="Observações (opcional)"
          value={notes}
          onChange={setNotes}
          multiline
        />
      </motion.div>

      {/* Botão final */}
      <motion.button
        onClick={handleSubmit}
        disabled={!isValid}
        className="mt-8 w-full rounded-full bg-foreground py-4 text-xs font-body-regular tracking-[0.3em] text-primary-foreground transition-colors duration-300 hover:bg-background hover:text-foreground hover:ring-1 hover:ring-foreground disabled:pointer-events-none disabled:opacity-40"
        whileTap={{ scale: 0.97 }}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        ENVIAR PEDIDO
      </motion.button>

      <p className="font-body-ultralight mt-8 pb-6 text-[10px] tracking-widest text-muted-foreground">
        <a
          href="https://www.instagram.com/bysavbr/"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-foreground transition-colors duration-300"
        >
          @bysavbr
        </a>
      </p>
    </PageLayout>
  );
};

export default Checkout;
