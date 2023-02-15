import { createContext, useEffect, useState } from "react";
import { ITransaction } from "../../interfaces/ITransaction";

interface ITransactionContextType {
  transactions: ITransaction[];
  fetchTransactions: (query?: string) => Promise<void>;
}

interface ItransactionProviderProps {
  children: React.ReactNode;
}

export const TransactionsContext = createContext({} as ITransactionContextType);

export function TransactionsProvider({ children }: ItransactionProviderProps) {
  const [transactions, setTransactions] = useState<ITransaction[]>([]);

  async function fetchTransactions(query?: string) {
    const url = new URL("http://localhost:3000/transactions");
    if (query) {
      url.searchParams.append("q", query);
    }
    const response = await fetch(url);
    const data = await response.json();
    setTransactions(data);
  }

  useEffect(() => {
    fetchTransactions();
  }, []);

  return (
    <TransactionsContext.Provider value={{ transactions, fetchTransactions }}>
      {children}
    </TransactionsContext.Provider>
  );
}
