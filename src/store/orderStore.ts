/**
 * ============================================================
 * ESTADO GLOBAL DO PEDIDO — Zustand Store
 * ============================================================
 *
 * Armazena todas as seleções do usuário durante o fluxo:
 * estilo → produto → personalização → checkout
 *
 * ⚠️ Para adicionar novas propriedades ao pedido,
 * adicione o campo na interface OrderState e no setOrder.
 * ============================================================
 */

import { create } from "zustand";

export interface OrderState {
  style: string;
  productId: string;
  productName: string;
  color: string;
  handle: string;
  accessory: string;
  other: string;
  price: number;
}

interface OrderStore {
  order: OrderState;
  setOrder: (partial: Partial<OrderState>) => void;
  resetOrder: () => void;
}

const initialOrder: OrderState = {
  style: "",
  productId: "",
  productName: "",
  color: "preta",
  handle: "couro",
  accessory: "nenhum",
  other: "N/A",
  price: 0,
};

export const useOrderStore = create<OrderStore>((set) => ({
  order: { ...initialOrder },
  setOrder: (partial) =>
    set((state) => ({ order: { ...state.order, ...partial } })),
  resetOrder: () => set({ order: { ...initialOrder } }),
}));
