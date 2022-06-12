import * as d3 from "d3";
import { json } from "d3-fetch";

Promise.all([
  json("https://jsonplaceholder.typicode.com/users"),
  json("https://jsonplaceholder.typicode.com/posts"),
]).then(([user, post]) => {
  buildDatas(user, post);
});

function buildDatas(users, posts) {
  let datas = [];
  users.map((e) => {
    datas.push({
      nom_utilisateur: e.name,
      ville: e.address.city,
      nom_companie: e.company.name,
      titres_post: d3
        .filter(posts, (p) => p.userId == e.id)
        .map((post) => post.title),
      posts: d3.filter(posts, (p) => p.userId == e.id),
    });
  });
  displayOnDom(datas);
}

function displayOnDom(datas) {
  d3.select("#content")
    .data(datas)
    .enter()
    .append("p")
    .text(function (d) {
      return d.nom_utilisateur + " : " + d.posts.length;
    });

  let maxIndex = d3.maxIndex(datas, function (data) {
    return d3.max(data.posts, function (post) {
      return post.body.length;
    });
  });

  d3.select("#content")
    .append("p")
    .text(function (d) {
      return "Best writer : " + datas[maxIndex].nom_utilisateur;
    });

  const chart = d3.select("#content").append("svg").append("g");

  datas.forEach((element) => chart.append("g").append("rect"));

  const factor = 8;
  const widthRect = 20;

  chart
    .selectAll("rect")
    .data(datas)
    .attr("x", (d, i) => widthRect * i)
    .attr("y", (d) => {
      return 100 - factor * d.posts.length;
    })
    .attr("width", widthRect)
    .attr("height", (d) => factor * d.posts.length)
    .attr("stroke", "black")
    .attr("fill", "#69a3b2");

  chart
    .selectAll("g")
    .data(datas)
    .append("text")
    .attr("x", (d, i) => widthRect * i)
    .attr("y", (d) => {
      return 100 + 20;
    })
    .text(function (d) {
      return d.posts.length;
    });
}
