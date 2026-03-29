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

import bagWestBlack from "@/assets/bag-west-preta.png";
import bagAllureWine from "@/assets/bag-allure-vinho.png";
import bagVenusCoffe from "@/assets/bag-venus-cafe.png";
import bagNuitCaramelo from "@/assets/bag-nuit-caramelo.png";
import bagLivBlack from "@/assets/bag-liv-preta.png";

export type Style = "handcrafted" | "fashion-essential";

export interface Product {
  id: string;
  name: string;
  description: string;
  style: Style;
  image: string;
  /** Preço em reais (ex: 100 = R$ 100,00) */
  price: number;
}

// ⚠️ ALTERE OS PRODUTOS AQUI — ou substitua por fetch do banco de dados
export const products: Product[] = [
  {
    id: "bag-venus-fe",
    name: "Bag Vênus",
    description: "Entrelaçado de couro sintético.",
    style: "fashion-essential",
    image: bagVenusCoffe,
    price: 120,
  },
  {
    id: "bag-allure-fe",
    name: "Bag Allure",
    description: "Estilo baguete com apliques frontais com feicho magnético e zíper, com dois bolsos internos.",
    style: "fashion-essential",
    image: bagAllureWine,
    price: 120,
  },
  {
    id: "bag-west-fe",
    name: "Bag West",
    description: "Modelo east-west em couro sintético com dois bolsos internos",
    style: "fashion-essential",
    image: bagWestBlack,
    price: 100,
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
    price: 180,
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

/** Formata preço para BRL */
export function formatPrice(value: number): string {
  return `R$ ${value.toFixed(2).replace(".", ",")}`;
}
