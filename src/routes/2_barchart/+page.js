import Papa from "papaparse";

export const load = async ({ fetch }) => {
  const res = await fetch(
    "https://docs.google.com/spreadsheets/d/e/2PACX-1vTXOwCTcWeOUZD8gaC-qMZUfEJCYMyS4R-rziEGLUws_DU3v_-NOSU3O8ozwPoo-7uBd7KehpNsj-g4/pub?gid=0&single=true&output=csv",
    {
      Headers: {
        "Content-Type": "text/csv",
      },
    },
  );
  const res2 = await fetch(
    "https://docs.google.com/spreadsheets/d/e/2PACX-1vSfms5hE8TKxR_xCrkKWezVqEqNLxwdGvdlWGTc8RyT1VchrJ0xhKYeKP1FBQBE4r_ZfWVhcQxXs8Gl/pub?gid=0&single=true&output=csv",
    {
      Headers: {
        "Content-Type": "text/csv",
      },
    },
  );

  const csvBirthrate = await res.text();
  const parsedCsvBirthrate = Papa.parse(csvBirthrate, { header: true });
  const csvRadii = await res2.text();
  const parsedCsvRadii = Papa.parse(csvRadii, { header: true });

  return {
    birthrate: parsedCsvBirthrate.data,
    radii: parsedCsvRadii.data,
  };
};
