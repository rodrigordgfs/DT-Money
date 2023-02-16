import { ReactNode, useEffect, useState, useCallback } from 'react'
import { ITransaction } from '../../interfaces/ITransaction'
import { api } from '../../lib/axios'
import { createContext } from 'use-context-selector'

interface IpostTransactionProps {
  description: string
  category: string
  price: number
  type: 'income' | 'outcome'
}

interface ITransactionContextType {
  transactions: ITransaction[]
  getTransactions: (query?: string) => Promise<void>
  postTransaction: (transaction: IpostTransactionProps) => Promise<void>
}

interface ItransactionProviderProps {
  children: ReactNode
}

export const TransactionsContext = createContext({} as ITransactionContextType)

export function TransactionsProvider({ children }: ItransactionProviderProps) {
  const [transactions, setTransactions] = useState<ITransaction[]>([])

  const getTransactions = useCallback(async (query?: string) => {
    api
      .get('/transactions', {
        params: {
          _sort: 'createdAt',
          q: query,
        },
      })
      .then(({ data }) => setTransactions(data))
  }, [])

  const postTransaction = useCallback(
    async (transaction: IpostTransactionProps) => {
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
    },
    [],
  )

  useEffect(() => {
    getTransactions()
  }, [getTransactions])

  return (
    <TransactionsContext.Provider
      value={{ transactions, getTransactions, postTransaction }}
    >
      {children}
    </TransactionsContext.Provider>
  )
}
