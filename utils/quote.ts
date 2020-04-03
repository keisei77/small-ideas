import Quotes from '../public/quotes.json';

export interface Quote {
  text: string;
  author: string;
}
// https://type.fit/api/quotes
export const generateQuotes = (size = 5): Quote[] => {
  const quotes: Quote[] = [];
  for (let i = 0; i < size; i++) {
    quotes.push(Quotes[Math.floor(Math.random() * Quotes.length)]);
  }
  return quotes;
};
