import * as d3 from "d3";

// Pour importer les données
import PIB from "../data/income_per_person_gdppercapita_ppp_inflation_adjusted.csv";
import life from "../data/life_expectancy_years.csv";
import population from "../data/population_total.csv";

// set the dimensions and margins of the graph
const margin = { top: 10, right: 20, bottom: 30, left: 50 },
  width = 1000 - margin.left - margin.right,
  height = 1000 - margin.top - margin.bottom;

// append the svg object to the body of the page
const svg = d3
  .select("#my_dataviz")
  .append("svg")
  .attr("width", width + margin.left + margin.right)
  .attr("height", height + margin.top + margin.bottom)
  .append("g")
  .attr("transform", `translate(${margin.left},${margin.top})`);

buildData(PIB, life, population);

// Promise.all([
//   d3.csv("../data/income_per_person_gdppercapita_ppp_inflation_adjusted.csv"),
//   d3.csv("../data/life_expectancy_years.csv"),
//   d3.csv("../data/population_total.csv"),
// ]).then(([PIB, life, population]) => {
//   buildData(PIB, life, population);
// });

function buildData(PIB, life, population) {
  console.log("PIB", PIB[0]["2021"]);
  console.log("life", life[0]["2021"]);
  console.log("population", population[0]["2021"]);

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

//Read the data
// d3.csv(
//   "https://raw.githubusercontent.com/holtzy/data_to_viz/master/Example_dataset/4_ThreeNum.csv"
// ).then(function (data) {

function readData(data) {
  // Add X axis
  const x = d3.scaleLinear().domain([0, 12000]).range([0, width]);
  svg
    .append("g")
    .attr("transform", `translate(0, ${height})`)
    .call(d3.axisBottom(x));

  // Add Y axis
  const y = d3.scaleLinear().domain([40, 100]).range([height, 0]);
  svg.append("g").call(d3.axisLeft(y));
  // });

  // Add a scale for bubble size
  const z = d3.scaleLinear().domain([200000, 1310000000]).range([1, 40]);

  console.log("test", data);
  // Add dots
  svg
    .append("g")
    .selectAll("dot")
    .data(data)
    .join("circle")
    .attr("cx", (d) => x(d.PIB))
    .attr("cy", (d) => y(d.esperance_vie))
    .attr("r", (d) => z(d.population))
    .attr("r", 10)
    .style("fill", "#69b3a2")
    .style("opacity", "0.7")
    .attr("stroke", "black");
}
