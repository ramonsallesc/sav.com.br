/**
 * ============================================================
 * UTILITÁRIO DE WHATSAPP — SÀV
 * ============================================================
 *
 * ⚠️ ALTERE O NÚMERO DO WHATSAPP ABAIXO
 * Formato: código do país + DDD + número (sem espaços ou traços)
 * ============================================================
 */

// ⚠️ NÚMERO DO WHATSAPP — ALTERE AQUI
export const WHATSAPP_NUMBER = "5521965593697";

export interface WhatsAppOrderData {
  style: string;
  productName: string;
  color: string;
  handle?: string;
  price: string;
  customerName: string;
  customerWhatsApp: string;
  notes: string;
}

/**
 * Gera a mensagem formatada para envio via WhatsApp.
 * ⚠️ Modifique o template abaixo para alterar o formato da mensagem.
 */
export function buildWhatsAppMessage(data: WhatsAppOrderData): string {
  const handleLine = data.handle ? `Alça: ${data.handle}` : "";

  return `Olá, meu nome é ${data.customerName} e gostaria de fazer um pedido!

Estilo: ${data.style}
Modelo: ${data.productName}
Cor: ${data.color}
${handleLine}

Observações: ${data.notes || "Nenhuma"}
${data.customerWhatsApp}`;
}

/** Abre o WhatsApp com a mensagem formatada */
export function openWhatsApp(data: WhatsAppOrderData): void {
  const message = buildWhatsAppMessage(data);
  const encoded = encodeURIComponent(message);
  window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encoded}`, "_blank");
}
