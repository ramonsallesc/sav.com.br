import { useState, useMemo } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Logo from "@/components/Logo";
import PageLayout from "@/components/PageLayout";
import {
  products,
  customizationOptions,
  productVariants,
  formatPrice,
} from "@/data/products";

const Customize = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const product = products.find((p) => p.id === Number(id));

  const [activeTab, setActiveTab] = useState(customizationOptions[0].id);
  const [selections, setSelections] = useState<Record<string, string>>(() => {
    const init: Record<string, string> = {};
    customizationOptions.forEach((tab) => {
      init[tab.id] = tab.options[0]?.value ?? "";
    });
    return init;
  });

  // ⚠️ Imagem muda dinamicamente conforme a cor selecionada
  const currentImage = useMemo(() => {
    if (!product) return "";
    const colorVal = selections.color;
    return productVariants[product.id]?.[colorVal] ?? product.image;
  }, [product, selections.color]);

  if (!product) return <PageLayout><p>Produto não encontrado</p></PageLayout>;

  const handleSelect = (tabId: string, value: string) => {
    setSelections((prev) => ({ ...prev, [tabId]: value }));
  };

  const handleOrder = () => {
    const params = new URLSearchParams({
      productId: String(product.id),
      ...selections,
    });
    navigate(`/checkout?${params.toString()}`);
  };

  const currentTab = customizationOptions.find((t) => t.id === activeTab)!;

  return (
    <PageLayout>
      <Logo size="sm" />

      <h1 className="font-body-regular mt-4 text-lg tracking-widest text-foreground uppercase">
        {product.name}
      </h1>
      <p className="font-body-thin mt-1 text-xs text-muted-foreground">
        {product.description}
      </p>

      {/* Imagem principal */}
      <div className="mt-4 flex w-full items-center justify-center">
        <img
          src={currentImage}
          alt={product.name}
          className="h-64 w-auto object-contain transition-all duration-500"
        />
      </div>

      {/* Abas de personalização */}
      <div className="mt-6 flex w-full border-b border-border">
        {customizationOptions.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex-1 pb-2 text-xs font-body-regular tracking-wider transition-all duration-200 ${
              activeTab === tab.id
                ? "border-b-2 border-foreground text-foreground"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Opções */}
      <div className="mt-5 flex min-h-[60px] w-full items-center justify-center gap-4 animate-fade-in">
        {currentTab.type === "color"
          ? currentTab.options.map((opt) => (
              <button
                key={opt.id}
                onClick={() => handleSelect(currentTab.id, opt.value)}
                aria-label={opt.label}
                className={`h-9 w-9 rounded-full transition-all duration-200 ${
                  selections[currentTab.id] === opt.value
                    ? "ring-2 ring-foreground ring-offset-2 ring-offset-background scale-110"
                    : "hover:scale-105"
                }`}
                style={{ backgroundColor: opt.colorHex }}
              />
            ))
          : currentTab.options.map((opt) => (
              <button
                key={opt.id}
                onClick={() => handleSelect(currentTab.id, opt.value)}
                className={`rounded-full border px-4 py-1.5 text-xs font-body-light tracking-wider transition-all duration-200 ${
                  selections[currentTab.id] === opt.value
                    ? "border-foreground bg-foreground text-primary-foreground"
                    : "border-border text-foreground hover:border-foreground"
                }`}
              >
                {opt.label}
              </button>
            ))}
      </div>

      {/* Preço + CTA */}
      <div className="mt-8 flex w-full items-center justify-between">
        <span className="font-body-regular text-xl text-foreground">
          {formatPrice(product.price)}
        </span>
        <button
          onClick={handleOrder}
          className="rounded-full border border-foreground bg-background px-6 py-2.5 text-xs font-body-regular tracking-widest text-foreground transition-all duration-300 hover:bg-foreground hover:text-primary-foreground"
        >
          Enviar Pedido
        </button>
      </div>
    </PageLayout>
  );
};

export default Customize;
