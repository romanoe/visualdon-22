import * as d3 from "d3";
import life from "../data/life_expectancy_years.csv";
import map from "./worldmap.json";

let w = screen.availWidth;
let h = screen.availHeight - 50;

var svg = d3.select("svg").attr("width", w).attr("height", h);

// Map and projection
var projection = d3
  .geoMercator()
  .center([0, 10])
  .scale([w / (2 * Math.PI)])
  .translate([w / 2, h / 2]);

var path = d3.geoPath().projection(projection);

// Data and color scale
var myColor = d3.scaleLinear().domain([50, 100]).range(["#e4d7f3", "#4a168b"]);

// Draw the map
svg
  .append("g")
  .selectAll("path")
  .data(map.features)
  .enter()
  .append("path")
  // draw each country
  .attr("d", path)
  // set the color of each country
  .attr("fill", function (d) {
    const data = monEsperanceDeVie(d["properties"]["name"]);
    if (data) {
      return myColor(data);
    }
    return "red";
  });

function monEsperanceDeVie(country) {
  try {
    const c = life.find((myLifeCountry) => myLifeCountry.country === country);
    return c["2021"];
  } catch (e) {
    console.log("pays", country);
    return null;
  }
}
