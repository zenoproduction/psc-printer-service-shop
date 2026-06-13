export interface ShopInfo {
  id: number;
  shop_nome: string;
  shop_descrizione: string | null;
  shop_logo: string | null;
  shop_colore_primario: string;
  shop_slug: string;
}

export interface Prodotto {
  id: number;
  nome: string;
  descrizione: string | null;
  descrizione_breve: string | null;
  immagine_url: string | null;
  slug: string;
  prezzo_da: number | null;
  ordine: number;
  categoria_nome: string | null;
  categoria_slug: string | null;
}

export interface Categoria {
  id: number;
  nome: string;
  slug: string;
  descrizione: string | null;
  immagine_url: string | null;
  ordine: number;
  prodotti_count: number;
}
