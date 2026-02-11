import type { Biomarker } from "../../../shared/types";

export type Category = {
  name: string;
  value: Biomarker["category"] | "all";
};

const CATEGORIES: Category[] = [
  {
    name: "All Categories",
    value: "all",
  },
  {
    name: "Cardiovascular",
    value: "cardiovascular",
  },
  {
    name: "Metabolic",
    value: "metabolic",
  },
  {
    name: "Hormonal",
    value: "hormonal",
  },
];

export default CATEGORIES;