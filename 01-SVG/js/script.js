function domForEach(selector, callback) {
  document.querySelectorAll(selector).forEach(callback);
}
function domOn(selector, event, callback, options) {
  domForEach(selector, (ele) => ele.addEventListener(event, callback, options));
}

domOn("svg .changecolor", "click", (evt) => {
  const ele = evt.currentTarget;
  ele.classList.toggle("onclickcolor");
});
