import { createContext, useEffect, useState } from "react";
import { ITransaction } from "../../interfaces/ITransaction";

interface ITransactionContextType {
  transactions: ITransaction[];
}

interface ItransactionProviderProps {
  children: React.ReactNode;
}

export const TransactionsContext = createContext({} as ITransactionContextType);

export function TransactionsProvider({ children }: ItransactionProviderProps) {
  const [transactions, setTransactions] = useState<ITransaction[]>([]);

  useEffect(() => {
    fetch("http://localhost:3000/transactions")
      .then((response) => response.json())
      .then((data) => {
        setTransactions(data);
      });
  }, []);

  return (
    <TransactionsContext.Provider value={{ transactions }}>
      {children}
    </TransactionsContext.Provider>
  );
}
