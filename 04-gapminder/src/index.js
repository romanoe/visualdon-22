import * as d3 from "d3";

// Pour importer les données
// Permet d'importer les données lors ce qu'elles viennt d'un fichier CSV en local
import PIB from "../data/income_per_person_gdppercapita_ppp_inflation_adjusted.csv";
import life from "../data/life_expectancy_years.csv";
import population from "../data/population_total.csv";

// Autre technique de récupération des donné CSV, fonctionne comme si les fichier proviennet du web
// Promise.all([
//   d3.csv("../data/income_per_person_gdppercapita_ppp_inflation_adjusted.csv"),
//   d3.csv("../data/life_expectancy_years.csv"),
//   d3.csv("../data/population_total.csv"),
// ]).then(([PIB, life, population]) => {
//   buildData(PIB, life, population);
// });

// Configuration des dimensions en marge et hauteur du graphique
const margin = { top: 10, right: 20, bottom: 30, left: 50 },
  width = 1000 - margin.left - margin.right,
  height = 1000 - margin.top - margin.bottom;

// appel l'objet svg sur le body de la page
const svg = d3
  .select("#mes_datas")
  .append("svg")
  .attr("width", width + margin.left + margin.right)
  .attr("height", height + margin.top + margin.bottom)
  .append("g")
  .attr("transform", `translate(${margin.left},${margin.top})`);

buildData(PIB, life, population);

function buildData(PIB, life, population) {
  console.log("PIB", PIB[0]["2021"]);
  console.log("life", life[0]["2021"]);
  console.log("population", population[0]["2021"]);

  // Je créer un nouveau tableau a partir de mes 3 fichier CSV
  // ce qui me permet d'obtenir un tableau qui contient les 3 éléments que je souhaite utiliser
  // qui sont contenu dans chacun des CSV

  let datas = [];
  PIB.map((e) => {
    datas.push({
      pays: e.country,
      PIB: e["2021"],
      esperance_vie: d3
        .filter(life, (l) => l.country == e.country)
        .map((d) => d["2021"])[0],
      population: d3
        .filter(population, (pop) => pop.country == e.country)
        .map((d) => d["2021"])[0],
    });
  });
  console.log("DATAS", datas);
  readData(datas);
}

function readData(data) {
  // Ajout X axis
  const x = d3.scaleLinear().domain([0, 100000]).range([0, width]);
  svg
    .append("g")
    .attr("transform", `translate(0, ${height})`)
    .call(d3.axisBottom(x));

  // Ajout Y axis
  const y = d3.scaleLinear().domain([40, 100]).range([height, 0]);
  svg.append("g").call(d3.axisLeft(y));
  // });

  // Ajoute une grandeure aux ronds
  const z = d3.scaleLinear().domain([200000, 1310000000]).range([1, 40]);

  console.log("test", data);

  // Ajout des points
  svg
    .append("g")
    .selectAll("dot")
    .data(data)
    .join("circle")
    .attr("cx", (d) => x(cleanData(d.PIB)))
    .attr("cy", (d) => y(cleanData(d.esperance_vie)))
    .attr("r", (d) => z(cleanData(d.population) * 5))
    .style("fill", "#69b3a2")
    .style("opacity", "0.7")
    .attr("stroke", "black");
}

// Permet de nétoyer les donnés pour obtenir des chiffres et non plus des charactères

function cleanData(data) {
  if (isNaN(data)) {
    if (data.includes("k")) {
      const n = data.split("k")[0];
      return Number.parseFloat(n) * 1000;
    } else if (data.includes("M")) {
      const n = data.split("M")[0];
      return Number.parseFloat(n) * 1000000;
    }
    //   else if (data.includes("B")) {
    //   const n = data.split("B")[0];
    //   return Number.parseFloat(n) * 1000000000;
    // }
  }

  return data;
}
