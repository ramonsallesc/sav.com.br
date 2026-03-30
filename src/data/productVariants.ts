/**
 * ============================================================
 * VARIANTES DE PERSONALIZACAO - SAV
 * ============================================================
 *
 * ONDE ALTERAR OPCOES DE PERSONALIZACAO:
 * Modifique os mapas de cores por produto abaixo.
 *
 * ONDE ALTERAR IMAGENS POR VARIACAO:
 * Modifique `imageVariants` para mapear produto+cor para imagem.
 *
 * PARA CONECTAR COM BANCO DE DADOS:
 * Substitua estes objetos por dados dinamicos da API.
 * ============================================================
 */

import bagAllureCamel from "@/assets/bag-allure-caramelo.png";
import bagAllureOffwhite from "@/assets/bag-allure-offwhite.png";
import bagAllureBlack from "@/assets/bag-allure-preta.png";
import bagAllureWine from "@/assets/bag-allure-vinho.png";
import bagNuitCaramelo from "@/assets/bag-nuit-caramelo.png";
import bagNuitMarrom from "@/assets/bag-nuit-marrom.png";
import bagNuitVinho from "@/assets/bag-nuit-vinho.png";
import bagNuitOffwhite from "@/assets/bag-nuit-offwhite.png";
import bagNuitBlack from "@/assets/bag-nuit-preta.png";
import bagNuitOlive from "@/assets/bag-nuit-verdeoliva.png";
import bagLivOffwhite from "@/assets/bag-liv-offwhite.png";
import bagLivOffwhiteMadeira from "@/assets/bag-liv-offwhite-madeira.png";
import bagLivBlack from "@/assets/bag-liv-preta.png";
import bagLivBlackMadeira from "@/assets/bag-liv-preta-madeira.png";
import bagVenusCafe from "@/assets/bag-venus-cafe.png";
import bagVenusCamel from "@/assets/bag-venus-caramelo.png";
import bagVenusOffwhite from "@/assets/bag-venus-offwhite.png";
import bagVenusBlack from "@/assets/bag-venus-preta.png";

/* ---------- Tipos ---------- */

export interface ColorOption {
  name: string;
  value: string;
  hex: string;
}

export interface TextOption {
  name: string;
  value: string;
}

export interface CustomizationTab {
  id: string;
  label: string;
  type: "color" | "text";
}

/* ---------- Abas ---------- */

export const baseTabs: CustomizationTab[] = [
  { id: "color", label: "Cor", type: "color" },
];

export const handcraftedTabs: CustomizationTab[] = [
  ...baseTabs,
  { id: "handle", label: "Alça", type: "text" },
];

/* ---------- Opcoes ---------- */
export const colors: ColorOption[] = [
  { name: "Preta", value: "preta", hex: "#1A1A1A" },
  { name: "Vermelha", value: "vermelha", hex: "#8B1A1A" },
  { name: "Caramelo", value: "caramelo", hex: "#A67B3D" },
];

export const venusColors: ColorOption[] = [
  { name: "Cafe", value: "cafe", hex: "#6B4A3A" },
  { name: "Caramelo", value: "caramelo", hex: "#A67B3D" },
  { name: "Off-white", value: "offwhite", hex: "#E8DECF" },
  { name: "Preta", value: "preta", hex: "#1A1A1A" },
];

export const allureColors: ColorOption[] = [
  { name: "Vinho", value: "vinho", hex: "#6C2230" },
  { name: "Caramelo", value: "caramelo", hex: "#A67B3D" },
  { name: "Off-white", value: "offwhite", hex: "#E8DECF" },
  { name: "Preta", value: "preta", hex: "#1A1A1A" },
];

export const nuitColors: ColorOption[] = [
  { name: "Caramelo", value: "caramelo", hex: "#A67B3D" },
  { name: "Marrom", value: "marrom", hex: "#4B2828" },
  { name: "Vinho", value: "vinho", hex: "#6f201c" },
  { name: "Off-white", value: "offwhite", hex: "#E8DECF" },
  { name: "Preta", value: "preta", hex: "#1A1A1A" },
  { name: "Verde Oliva", value: "verdeoliva", hex: "#556B2F" },
];

export const livColors: ColorOption[] = [
  { name: "Preta", value: "preta", hex: "#1A1A1A" },
  { name: "Off-white", value: "offwhite", hex: "#E8DECF" },
];

export const handles: TextOption[] = [
  { name: "Couro", value: "couro" },
  { name: "Corrente", value: "corrente" },
  { name: "Tecido", value: "tecido" },
];

export const nuitHandles: TextOption[] = [
  { name: "Com alça transversal", value: "com-alca" },
  { name: "Sem alça transversal", value: "sem-alca" },
];

export const livHandles: TextOption[] = [
  { name: "Metal", value: "metal" },
  { name: "Madeira", value: "madeira" },
];

/**
 * MAPEAMENTO DE IMAGENS POR VARIACAO
 * Chave: productId -> colorValue -> caminho da imagem
 * Adicione novos produtos/cores aqui.
 */
export const imageVariants: Record<string, Record<string, string>> = {
  "bag-venus-fe": {
    cafe: bagVenusCafe,
    caramelo: bagVenusCamel,
    offwhite: bagVenusOffwhite,
    preta: bagVenusBlack,
  },
  "bag-allure-fe": {
    caramelo: bagAllureCamel,
    offwhite: bagAllureOffwhite,
    preta: bagAllureBlack,
    vinho: bagAllureWine,
  },
  "bag-nuit-hc": {
    caramelo: bagNuitCaramelo,
    marrom: bagNuitMarrom,
    vinho: bagNuitVinho,
    offwhite: bagNuitOffwhite,
    preta: bagNuitBlack,
    verdeoliva: bagNuitOlive,
  },
  "bag-liv-hc": {
    "preta|metal": bagLivBlack,
    "preta|madeira": bagLivBlackMadeira,
    "offwhite|metal": bagLivOffwhite,
    "offwhite|madeira": bagLivOffwhiteMadeira,
  },
};

export const productColorOptions: Record<string, ColorOption[]> = {
  "bag-venus-fe": venusColors,
  "bag-allure-fe": allureColors,
  "bag-nuit-hc": nuitColors,
  "bag-liv-hc": livColors,
};

export const productHandleOptions: Record<string, TextOption[]> = {
  "bag-nuit-hc": nuitHandles,
  "bag-liv-hc": livHandles,
};

export function getColorOptions(productId: string): ColorOption[] {
  return productColorOptions[productId] ?? colors;
}

export function getColorLabel(productId: string, colorValue: string): string {
  return getColorOptions(productId).find((option) => option.value === colorValue)?.name ?? colorValue;
}

export function getHandleOptions(productId: string): TextOption[] {
  return productHandleOptions[productId] ?? handles;
}

export function getHandleLabel(productId: string, handleValue: string): string {
  return getHandleOptions(productId).find((option) => option.value === handleValue)?.name ?? handleValue;
}

/** Retorna imagem para produto+cor+alca, com fallback */
export function getVariantImage(
  productId: string,
  colorValue: string,
  fallback: string,
  handleValue?: string,
): string {
  if (productId === "bag-liv-hc" && handleValue) {
    return imageVariants[productId]?.[`${colorValue}|${handleValue}`] ?? fallback;
  }

  return imageVariants[productId]?.[colorValue] ?? fallback;
}

