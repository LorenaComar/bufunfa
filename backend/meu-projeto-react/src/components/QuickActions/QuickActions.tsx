import React from "react";
import "./QuickActions.css";


type ActionBtnProps = { icon: string; label: string; onClick?: () => void };
const ActionBtn: React.FC<ActionBtnProps> = ({ icon, label, onClick }) => (
<div className="col-4">
<button className="btn qa-btn w-100" onClick={onClick}>
<i className={`fas ${icon} fa-2x mb-2`} aria-hidden="true" />
<span>{label}</span>
</button>
</div>
);


const QuickActions: React.FC = () => (
<section className="QuickActions row mt-4">
<div className="col-12 px-0">
<h3 className="title-accent">Ações Rápidas</h3>
<div className="row g-3">
<ActionBtn icon="fa-exchange-alt" label="PIX" />
<ActionBtn icon="fa-money-bill-wave" label="Depositar" />
<ActionBtn icon="fa-piggy-bank" label="Reservas" />
</div>
</div>
</section>
);
export default QuickActions;