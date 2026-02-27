import React from "react";
import "./Categories.css";

// Dados mockados - substituir por chamada API
const data = [
  { id: "fixos", icon: "fa-home", title: "Gastos Fixos", percent: 45, amount: "R$ 900,00" },
  { id: "meds", icon: "fa-pills", title: "Medicamentos", percent: 30, amount: "R$ 600,00" },
  { id: "study", icon: "fa-book", title: "Estudos", percent: 15, amount: "R$ 300,00" },
  { id: "fun", icon: "fa-gamepad", title: "Lazer", percent: 10, amount: "R$ 200,00" },
];

const Categories: React.FC = () => (
  <section className="Categories row mt-4">
    <div className="col-12">
      <h3 className="title-accent mb-3">Suas Categorias</h3>
      <div className="row g-3">
        {data.map((c) => (
          <div className="col-6" key={c.id}>
            <div className="card cat-card h-100">
              <div className="card-body d-flex flex-column">
                <i className={`fas ${c.icon} cat-icon`} aria-hidden="true" />
                <h4 className="cat-title">{c.title}</h4>
                <div className="cat-progress">
                  <div 
                    className="cat-progress-bar" 
                    style={{ width: `${c.percent}%` }} 
                    role="progressbar"
                    aria-valuenow={c.percent}
                    aria-valuemin={0}
                    aria-valuemax={100}
                  />
                </div>
                <p className="cat-amount mt-auto mb-0">{c.amount}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default Categories;