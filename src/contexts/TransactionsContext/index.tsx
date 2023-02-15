import { ReactNode, createContext, useEffect, useState } from 'react'
import { ITransaction } from '../../interfaces/ITransaction'
import { api } from '../../lib/axios'

interface ICreateTransactionProps {
  description: string
  category: string
  price: number
  type: 'income' | 'outcome'
}

interface ITransactionContextType {
  transactions: ITransaction[]
  fetchTransactions: (query?: string) => Promise<void>
  createTransaction: (transaction: ICreateTransactionProps) => Promise<void>
}

interface ItransactionProviderProps {
  children: ReactNode
}

export const TransactionsContext = createContext({} as ITransactionContextType)

export function TransactionsProvider({ children }: ItransactionProviderProps) {
  const [transactions, setTransactions] = useState<ITransaction[]>([])

  async function fetchTransactions(query?: string) {
    api
      .get('/transactions', {
        params: {
          _sort: 'createdAt',
          q: query,
        },
      })
      .then(({ data }) => setTransactions(data))
  }

  async function createTransaction(transaction: ICreateTransactionProps) {
    const { description, category, price, type } = transaction

    api
      .post('/transactions', {
        description,
        category,
        price,
        type,
        createdAt: new Date(),
      })
      .then(({ data }) => setTransactions((state) => [...state, data]))
  }

  useEffect(() => {
    fetchTransactions()
  }, [])

  return (
    <TransactionsContext.Provider
      value={{ transactions, fetchTransactions, createTransaction }}
    >
      {children}
    </TransactionsContext.Provider>
  )
}
