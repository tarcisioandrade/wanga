import { useState, useCallback } from "react";
import { TabType } from "src/components/Tabs";

const periodTabs: TabType[] = [
  { value: "day", label: "Dia" },
  { value: "week", label: "Semana" },
  { value: "month", label: "Mês" },
  { value: "year", label: "Ano" },
];

const typeMangaTabs: TabType[] = [
  { value: "", label: "Todos" },
  { value: "manga", label: "Mangás" },
  { value: "manhua", label: "Manhuas" },
  { value: "webtoon", label: "Webtoons" },
  { value: "novel", label: "Novels" },
];

export const useTabs = (typeDefault: string) => {
  const [period, setPeriod] = useState("week");
  const [type, setType] = useState(typeDefault);

  const handlePeriodTabChange = useCallback((value: string) => {
    setPeriod(value);
  }, []);

  const handleTypeTabChange = useCallback((value: string) => {
    setType(value);
  }, []);

  return {
    periodTabs,
    typeMangaTabs,
    period,
    type,
    handlePeriodTabChange,
    handleTypeTabChange,
  };
};
