/**
 * ============================================================
 * DADOS DOS PRODUTOS — SÀV
 * ============================================================
 *
 * ⚠️ ONDE ALTERAR PRODUTOS:
 * Modifique o array `products` abaixo.
 *
 * ⚠️ PARA CONECTAR COM BANCO DE DADOS:
 * Substitua este array por chamadas à API / queries.
 * Exemplo: const { data: products } = useQuery(...)
 * ============================================================
 */

import bagAllureWine from "@/assets/bag-allure-vinho.png";
import bagVenusCoffe from "@/assets/bag-venus-cafe.png";
import bagNuitCaramelo from "@/assets/bag-nuit-caramelo.png";
import bagLivBlack from "@/assets/bag-liv-preta.png";

export type Style = "handcrafted" | "fashion-essentials";

export interface Product {
  id: string;
  name: string;
  description: string;
  style: Style;
  image: string;
  /** Preço em reais (ex: 100 = R$ 100,00) */
  price: number;
}

const livColorPrices: Record<string, number> = {
  preta: 249.9,
  offwhite: 219.9,
};

// ⚠️ ALTERE OS PRODUTOS AQUI — ou substitua por fetch do banco de dados
export const products: Product[] = [
  {
    id: "bag-venus-fe",
    name: "Bag Vênus",
    description: "Entrelaçado de couro sintético.",
    style: "fashion-essentials",
    image: bagVenusCoffe,
    price: 229.9,
  },
  {
    id: "bag-allure-fe",
    name: "Bag Allure",
    description: "Estilo baguete com apliques frontais com feicho magnético e zíper, com dois bolsos internos.",
    style: "fashion-essentials",
    image: bagAllureWine,
    price: 189.9,
  },
  {
    id: "bag-nuit-hc",
    name: "Bag Nuit",
    description: "Técnica em crochê com fio de malha de 25mm com alça em crochê entrelaçada em corrente.",
    style: "handcrafted",
    image: bagNuitCaramelo,
    price: 199.9,
  },
  {
    id: "bag-liv-hc",
    name: "Bag Liv",
    description: "Técnica de macramê com fio de algodão de 5mm com alça transversal e alça de mão.",
    style: "handcrafted",
    image: bagLivBlack,
    price: 219.9,
  },
];

/** Busca produto por ID */
export function getProductById(id: string): Product | undefined {
  return products.find((p) => p.id === id);
}

/** Filtra produtos por estilo */
export function getProductsByStyle(style: Style): Product[] {
  return products.filter((p) => p.style === style);
}

/** Resolve preço final por produto+cor */
export function getProductPrice(productId: string, colorValue: string, fallbackPrice: number): number {
  if (productId === "bag-liv-hc") {
    return livColorPrices[colorValue] ?? fallbackPrice;
  }

  return fallbackPrice;
}

/** Formata preço para BRL */
export function formatPrice(value: number): string {
  return `R$ ${value.toFixed(2).replace(".", ",")}`;
}
