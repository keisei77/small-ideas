import { generateQuotes } from '../utils';
const quotes = generateQuotes();
export const Quotes = () => (
  <div className="p-8">
    {quotes.map((quote, index) => (
      <div className="my-2" key={index}>
        <p className="italic font-medium">{quote.text}</p>
        {quote.author && (
          <p className="text-xs text-right">-- {quote.author}</p>
        )}
      </div>
    ))}
  </div>
);
