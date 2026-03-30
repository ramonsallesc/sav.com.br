import { formatPrice } from "@/data/products";
import { getColorLabel, getHandleLabel } from "@/data/productVariants";
import type { OrderState } from "@/store/orderStore";

interface OrderSummaryProps {
  order: OrderState;
}

const labelMap: Record<string, string> = {
  "handcrafted": "Handcrafted",
  "fashion-essentials": "Fashion Essentials",
};

const OrderSummary = ({ order }: OrderSummaryProps) => {
  return (
    <div className="w-full rounded-2xl border border-border bg-card p-5">
      <div className="flex items-center justify-between">
        <h3 className="font-body-regular text-sm tracking-wide text-foreground">
          Resumo do pedido
        </h3>
        <span className="font-body-regular text-sm text-foreground">
          {formatPrice(order.price)}
        </span>
      </div>
      <div className="mt-4 space-y-2 text-xs">
        <SummaryRow label="Estilo:" value={labelMap[order.style] ?? order.style} />
        <SummaryRow label="Modelo:" value={order.productName} />
        <SummaryRow label="Cor:" value={getColorLabel(order.productId, order.color)} />
        {order.style === "handcrafted" && order.handle && (
          <SummaryRow label="Alça:" value={getHandleLabel(order.productId, order.handle)} />
        )}
      </div>
    </div>
  );
};

const SummaryRow = ({ label, value }: { label: string; value: string }) => (
  <div className="flex gap-4">
    <span className="font-body-light w-24 shrink-0 text-muted-foreground">{label}</span>
    <span className="font-body-regular capitalize text-foreground">{value}</span>
  </div>
);

export default OrderSummary;
