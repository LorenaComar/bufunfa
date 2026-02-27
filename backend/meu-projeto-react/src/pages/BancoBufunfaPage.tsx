import React from "react";
import Header from "../components/Header/Header";
import BalanceCard from "../components/BalanceCard/BalanceCard"; // Mantenha assim se a pasta for "BalanceCard"
import BottomNav from "../components/BottomNav/BottomNav";
import Categories from "../components/Categories/Categories";
import QuickActions from "../components/QuickActions/QuickActions";
import Transactions from "../components/Transactions/Transactions";
import VirtualAssistant from "../components/VirtualAssistant/VirtualAssistant";

const BancoBufunfaPage: React.FC = () => {
  return (
    <div className="container-fluid container-int">
      <Header title="Banco Bufunfa" userName="Kauany" />
      <BalanceCard />
      <QuickActions />
      <Categories />
      <Transactions />
      <BottomNav />
      <VirtualAssistant />
    </div>
  );
};

export default BancoBufunfaPage;