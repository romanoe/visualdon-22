import * as d3 from "d3";
import life from "../data/life_expectancy_years.csv";
import map from "../data/worldmap.json";

let w = screen.availWidth;
let h = screen.availHeight - 50;

var svg = d3.select("svg").attr("width", w).attr("height", h);

// Map and projection
// création de la projection de la carte
var projection = d3
    .geoMercator()
    .center([0, 10])
    .scale([w / (2 * Math.PI)])
    .translate([w / 2, h / 2]);

var path = d3.geoPath().projection(projection);

// Data and color scale
// Permet de donner la couleur d'un pays en fonction de son nombre d'habitants
// scaleLinear permet de créer une échelle linéaire de couleur entre deux valeurs qui sont dans le tableau range
var myColor = d3.scaleLinear().domain([50, 100]).range(["#e4d7f3", "#4a168b"]);

// Draw the map
// Dessine la carte a partir du fichier json
svg
    .append("g")
    .selectAll("path")
    .data(map.features)
    .enter()
    .append("path")
    // draw each country
    // dessine chaque pays
    .attr("d", path)
    // set the color of each country
    // met en place les couleurs des pays selon l'espérence de vie
    .attr("fill", function(d) {
        const data = monEsperanceDeVie(d["properties"]["name"]);
        if (data) {
            return myColor(data);
        }
        return "red";
    });

// va chercher les données de l'esperance de vie
// si le pays est dans le tableau, on va chercher la valeur de l'esperance de vie
// Si le nom du pays dans le csv est identique au nom du pays dans le json, on va chercher la valeur de l'esperance de vie
// si le nom du pays dans le csv n'est pas identique au nom du pays dans le json, alors on retourne le pays en null. Ce qui va donner une couleur rouge
function monEsperanceDeVie(country) {
    try {
        const c = life.find((myLifeCountry) => myLifeCountry.country === country);
        return c["2021"];
    } catch (e) {
        console.log("pays", country);
        return null;
    }
}