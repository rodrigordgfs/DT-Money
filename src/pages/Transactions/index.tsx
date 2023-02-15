import { useContext, useEffect, useState } from "react";
import { Header } from "../../components/Header";
import { Summary } from "../../components/Summary";
import { SearchForm } from "./components/SearchForm";
import {
  PriceHighlight,
  TransactionsContainer,
  TransactionsTable,
} from "./styles";
import { TransactionsContext } from "../../contexts/TransactionsContext";
import { currencyFormatter, dateFormatter } from "../../utils/formatter";

export function Transactions() {
  const { transactions } = useContext(TransactionsContext);

  return (
    <>
      <Header />
      <Summary />
      <TransactionsContainer>
        <SearchForm />
        <TransactionsTable>
          <tbody>
            {transactions.map(
              ({ id, description, category, type, price, createdAt }) => {
                return (
                  <tr key={id}>
                    <td width="50%">{description}</td>
                    <td>
                      <PriceHighlight variant={type}>
                        {type === "outcome" && "-"}
                        {" "}
                        {currencyFormatter.format(price)}
                      </PriceHighlight>
                    </td>
                    <td>{category}</td>
                    <td>{dateFormatter.format(new Date(createdAt))}</td>
                  </tr>
                );
              }
            )}
          </tbody>
        </TransactionsTable>
      </TransactionsContainer>
    </>
  );
}
