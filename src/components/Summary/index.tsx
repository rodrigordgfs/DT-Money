import { SummaryCard, SummaryContainer } from "./styles";
import { ArrowCircleUp, ArrowCircleDown, CurrencyDollar } from "phosphor-react";

export function Summary() {
  return (
    <SummaryContainer>
      <SummaryCard>
        <header>
          <span>Entradas</span>
          <ArrowCircleUp size={32} color="#00B73E" />
        </header>
        <strong>R$ 17.400,00</strong>
      </SummaryCard>
      <SummaryCard>
        <header>
          <span>Entradas</span>
          <ArrowCircleDown size={32} color="#F75A68" />
        </header>
        <strong>R$ 17.400,00</strong>
      </SummaryCard>
      <SummaryCard variant="green">
        <header>
          <span>Entradas</span>
          <CurrencyDollar size={32} color="#FFF" />
        </header>
        <strong>R$ 17.400,00</strong>
      </SummaryCard>
    </SummaryContainer>
  );
}
