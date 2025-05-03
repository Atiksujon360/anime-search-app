export interface CardData {
  id: number;
  title: string;
  description: string;
  score: string;
}

export interface SelectActionCardProps {
  cards: CardData[]; // Array of card data
  cardBackgroundColors: string[];
  cardTitleColors: string[];
  cardDescriptColors: string[];
}