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
  immagine_url: string | null;
  slug: string;
  categoria_shop: string | null;
  ordine_visualizzazione: number;
  prezzo_pubblico: number | null;
}
