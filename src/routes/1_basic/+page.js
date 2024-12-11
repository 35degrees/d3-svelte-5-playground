import Papa from "papaparse";

export const load = async ({ fetch }) => {
  const res = await fetch(
    "https://docs.google.com/spreadsheets/d/e/2PACX-1vT3OUxePK72-AE8dPgRnU484Z9le5YHkqk6ymSEaTL7YQqi4hxreUbUZV_Nf0PevpBzCYv_eBnlNSRw/pub?gid=0&single=true&output=csv",
    {
      Headers: {
        "Content-Type": "text/csv",
      },
    },
  );

  const res2 = await fetch(
    "https://docs.google.com/spreadsheets/d/e/2PACX-1vRaXxcAtC1Etbt-kdMNOkDcCah0jMr0bntrhqrW7XGDCyp_rHDuI462PihQbvzbu2LwN6Jz_gktRwn8/pub?gid=0&single=true&output=csv",
    {
      Headers: {
        "Content-Type": "text/csv",
      },
    },
  );
  const res3 = await fetch(
    "https://docs.google.com/spreadsheets/d/e/2PACX-1vRI0iBgHSf9a0wYWkmyb5G_R1mcF9GnZtv69zn4tba0fbvjgUdkGJNE20vburOiGwYs7ReQ5E8uCubK/pub?gid=0&single=true&output=csv",
    {
      Headers: {
        "Content-Type": "text/csv",
      },
    },
  );
  const res4 = await fetch(
    "https://docs.google.com/spreadsheets/d/e/2PACX-1vQUieHOxEQiULuZ7LQJn7_M_gkyvF6IyAdCE7qLCQTAXda7u5C0EhjQltxOTy0Ze95oasvJNSdGn3XA/pub?gid=0&single=true&output=csv",
    {
      Headers: {
        "Content-Type": "text/csv",
      },
    },
  );

  const csvData1 = await res.text();
  const parsedCsvData1 = Papa.parse(csvData1, { header: true });
  const csvData2 = await res2.text();
  const parsedCsvData2 = Papa.parse(csvData2, { header: true });
  const csvData3 = await res3.text();
  const parsedCsvData3 = Papa.parse(csvData3, { header: true });
  const csvData4 = await res4.text();
  const parsedCsvData4 = Papa.parse(csvData4, { header: true });

  return {
    data1: parsedCsvData1.data,
    data2: parsedCsvData2.data,
    data3: parsedCsvData3.data,
    data4: parsedCsvData4.data,
  };
};
