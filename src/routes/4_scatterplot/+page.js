import Papa from "papaparse";

export const load = async ({ fetch }) => {
  const res = await fetch(
    "https://datavisualizationwithsvelte.com/data/world_bank.csv",
    {
      Headers: {
        "Content-Type": "text/csv",
      },
    },
  );

  const csvLife = await res.text();
  const parsedCsvLife = Papa.parse(csvLife, { header: true });

  return {
    data: parsedCsvLife.data,
  };
};
