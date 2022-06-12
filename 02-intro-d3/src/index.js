import * as d3 from "d3";

function domForEach(selector, callback) {
  document.querySelectorAll(selector).forEach(callback);
}
function domOn(selector, event, callback, options) {
  domForEach(selector, (ele) => ele.addEventListener(event, callback, options));
}

// C'est ici que vous allez écrire les premières lignes en d3!

const svg = d3
  .select(".mesCercles")
  .append("svg")
  .attr("width", 500)
  .attr("height", 500);

const g1 = d3.select("svg").append("g");
const g2 = d3.select("svg").append("g");
const g3 = d3.select("svg").append("g");

const cercle1 = g1
  .append("circle")
  .attr("class", "cercle1")
  .attr("cx", 50 + 50)
  .attr("cy", 50)
  .attr("r", 40)
  .attr("fill", "#ff0000");

const cercle2 = g2
  .append("circle")
  .attr("class", "cercle2")
  .attr("cx", 150 + 50)
  .attr("cy", 150)
  .attr("r", 40)
  .attr("fill", "#0000ff");

const cercle3 = g3
  .append("circle")
  .attr("class", "cercle3")
  .attr("cx", 250)
  .attr("cy", 250)
  .attr("r", 40)
  .attr("fill", "#ff0000");

g1.append("text")
  .attr("transform", function (d) {
    return (
      "translate(" +
      (parseInt(cercle1.attr("cx")) - 10) +
      "," +
      (parseInt(cercle1.attr("cy")) + parseInt(cercle1.attr("r")) + 20) +
      ")"
    );
  })
  .text("ok");

g2.append("text")
  .attr("transform", function (d) {
    return (
      "translate(" +
      (parseInt(cercle2.attr("cx")) - 10) +
      "," +
      (parseInt(cercle2.attr("cy")) + parseInt(cercle2.attr("r")) + 20) +
      ")"
    );
  })
  .text("ok");

g3.append("text")

  .attr("transform", function (d) {
    return (
      "translate(" +
      (parseInt(cercle3.attr("cx")) - 10) +
      "," +
      (parseInt(cercle3.attr("cy")) + parseInt(cercle3.attr("r")) + 20) +
      ")"
    );
  })
  .text("ok");

cercle3.on("click", function () {
  if (cercle3.attr("cx") == 250) {
    cercle1.attr("cx", 100);
    cercle2.attr("cx", 100);
    cercle3.attr("cx", 100);
  } else if (cercle3.attr("cx") == 100) {
    cercle1.attr("cx", 100);
    cercle2.attr("cx", 200);
    cercle3.attr("cx", 250);
  }
});

////// Barre DATA

// Entrée des DATA
var dataset = [20, 5, 25, 8, 15];

var svg2 = d3
  .select("#bar-chart")
  .append("svg")
  .attr("width", 200)
  .attr("height", 100);

var bars = svg2.append("g").attr("class", "bars");

bars
  .selectAll("rect")
  .data(dataset)
  .enter()
  .append("rect")
  .attr("x", (d, i) => i * 25)
  .attr("y", (d) => 100 - d)
  .attr("width", 20)
  .attr("height", (d) => d)
  .attr("fill", "#ff4f01");
