import { createContext, useEffect, useState } from "react";
import { ITransaction } from "../../interfaces/ITransaction";
import { api } from "../../lib/axios";

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
    api
      .get("/transactions", {
        params: {
          q: query,
        },
      })
      .then(({ data }) => setTransactions(data));
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
