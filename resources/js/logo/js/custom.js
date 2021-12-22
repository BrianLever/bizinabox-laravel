// Polyfill URLSearchParams
window.URLSearchParams =
  window.URLSearchParams ||
  function (searchString) {
    let self = this
    self.searchString = searchString
    self.get = function (name) {
      let results = new RegExp('[?&]' + name + '=([^&#]*)').exec(self.searchString)
      if (results == null) {
        return null
      } else {
        return decodeURI(results[1]) || 0
      }
    }
  }

if (!SVGElement.prototype.contains) {
  SVGElement.prototype.contains = HTMLDivElement.prototype.contains
}
