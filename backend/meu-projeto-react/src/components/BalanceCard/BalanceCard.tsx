import React from "react";
import "./BalanceCard.css";

const BalanceCard: React.FC = () => (
  <section className="row mt-4">
    <div className="col-12">
      <div className="BalanceCard card bufunfa-card-base">
        <div className="card-body">
          <h2 className="card-title title-accent">Saldo Disponível</h2>
          <p className="balance-value">R$ 2.000,00</p>
          <p className="balance-info">
            Kauany Violin<br />
            Limite diário: R$ 6,99<br />
            AG 0001 C/C 12345-6
          </p>
        </div>
      </div>
    </div>
  </section>
);

export default BalanceCard;