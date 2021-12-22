export default {
  init: function () {
    // String ProtoTypes

    String.prototype.isURL = function () {
      let pattern = new RegExp(
        '^(https?:\\/\\/)?' + // protocol
          '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.?)+[a-z]{2,}|' + // domain name
          '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
          '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
          '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
          '(\\#[-a-z\\d_]*)?$',
        'i'
      ) // fragment locator
      return pattern.test(this)
    }

    String.prototype.dashed = function () {
      return this.replace(/[A-Z]/g, (m) => '-' + m.toLowerCase())
    }

    String.prototype.darken = function (p) {
      let originalColor = tinycolor(this)
      return originalColor.darken(p).toString()
    }

    String.prototype.brighten = function (p) {
      let originalColor = tinycolor(this)
      return originalColor.brighten(p).toString()
    }

    // Array Prototypes
    Array.prototype.insert = function (index, item) {
      this.splice(index, 0, item)
    }

    Array.prototype.swap = function (x, y) {
      let b = this[x]
      this[x] = this[y]
      this[y] = b
      return this
    }

    Array.prototype.toggle = function (item) {
      let index = this.indexOf(item)
      if (index === -1) {
        this.push(item)
      } else {
        this.splice(index, 1)
      }
    }

    Array.prototype.last = function () {
      return this[this.length - 1]
    }

    Array.prototype.first = function () {
      return this[0]
    }

    // Global Functions

    window._get = function (object, path = '', defaultValue = null) {
      // Cache the current object
      let current = object
      let pack = path.split('.')
      // For each item in the path, dig into the object
      for (let i = 0; i < pack.length; i++) {
        let key = pack[i]
        if (Array.isArray(current)) {
          key = parseInt(key)
        }
        // If the item isn't found, return the default (or null)
        if (!current[key]) return defaultValue
        current = current[key]
      }
      return current
    }

    window._update = function (object, newValue, path) {
      let stack = path.split('.')
      let key = stack.shift()
      if (stack.length === 0) {
        if (newValue) {
          if (Array.isArray(object)) {
            key = parseInt(key)
          }
          object[key] = newValue
        } else {
          if (Array.isArray(object)) {
            object.splice(key, 1)
          } else {
            delete object[key]
          }
        }
      } else {
        object[key] = _update(object[key], newValue, stack.join('.'))
      }
      return object
    }

    window._update = function (object, newValue, path) {
      let stack = path.split('.')
      const key = stack.shift()
      if (stack.length === 0) {
        object[key] = newValue
      } else {
        object[key] = _update(object[key], newValue, stack.join('.'))
      }
      return object
    }

    window._copy = (value) => {
      let object
      if (typeof object === 'object') {
        return value
      }
      if (Array.isArray(value)) {
        object = []
        value.forEach((item, index) => {
          if (typeof value[index] === 'object') {
            object[index] = _copy(value[index])
          } else {
            object[index] = value[index]
          }
        })
      } else {
        object = {}
        for (let key in value) {
          if (typeof value[key] === 'object') {
            object[key] = _copy(value[key])
          } else {
            object[key] = value[key]
          }
        }
      }
      return object
    }
    window.getRandomInt = (max) => {
      return Math.floor(Math.random() * max)
    }

    window._take = (toObject, fromObject, exceptions = []) => {
      if (Array.isArray(toObject)) {
        toObject.forEach((item, index) => {
          if (typeof toObject[index] === 'object') {
            toObject[index] = _take(toObject[index], fromObject[index] || toObject[index])
          } else {
            toObject[index] = fromObject[index] || toObject[index]
          }
        })
      } else {
        for (let key in toObject) {
          if (exceptions.includes(key)) {
            continue
          }
          if (typeof toObject[key] === 'object') {
            toObject[key] = fromObject[key] ? _take(toObject[key], fromObject[key]) : toObject[key]
          } else {
            toObject[key] = fromObject[key] || toObject[key]
          }
        }
      }
      return toObject
    }

    window._setThemeColors = (theme) => {
      document.documentElement.style.setProperty('--bz-primary-color', theme.primaryColor)
      document.documentElement.style.setProperty('--bz-secondary-color', theme.secondaryColor)
      document.documentElement.style.setProperty('--bz-dark-mode-color', theme.darkModeColor)
      document.documentElement.style.setProperty('--bz-light-mode-color', theme.lightModeColor)
    }

    window.componentFromStr = (numStr, percent) => {
      let num = Math.max(0, parseInt(numStr, 10))
      return percent ? Math.floor((255 * Math.min(100, num)) / 100) : Math.min(255, num)
    }

    window.rgbToHex = (rgb) => {
      let rgbRegex = /^rgb\(\s*(-?\d+)(%?)\s*,\s*(-?\d+)(%?)\s*,\s*(-?\d+)(%?)\s*\)$/
      let result,
        r,
        g,
        b,
        hex = ''
      if ((result = rgbRegex.exec(rgb))) {
        r = componentFromStr(result[1], result[2])
        g = componentFromStr(result[3], result[4])
        b = componentFromStr(result[5], result[6])
        hex = '#' + (0x1000000 + (r << 16) + (g << 8) + b).toString(16).slice(1)
      }
      return hex
    }

    window.getBrightness = (color) => {
      if (!color) {
        return 0
      }
      if (color.includes('rgb')) {
        color = rgbToHex(color)
      }
      color = color.replace(/ /g, '').replace('#', '')
      let r = parseInt(color.substring(0, 2), 16)
      let g = parseInt(color.substring(2, 4), 16)
      let b = parseInt(color.substring(4, 6), 16)

      return (299 * r + 587 * g + 114 * b) / 1000
    }

    window.isBrighter = (color1, color2) => {
      return getBrightness(color1) > getBrightness(color2)
    }

    window.getColor = (bgColor) => {
      bgColor = bgColor.replace(/ /g, '')
      if (bgColor.includes('rgb')) {
        bgColor = rgbToHex(bgColor)
      }
      let color = bgColor.charAt(0) === '#' ? bgColor.substring(1, 7) : bgColor
      let r = parseInt(color.substring(0, 2), 16) // hexToR
      let g = parseInt(color.substring(2, 4), 16) // hexToG
      let b = parseInt(color.substring(4, 6), 16) // hexToB
      return r * 0.299 + g * 0.587 + b * 0.114 > 186 ? '#555555' : '#ffffff'
    }

    // left: 37, up: 38, right: 39, down: 40,
    // space bar: 32, pageup: 33, pagedown: 34, end: 35, home: 36
    let keys = { 37: 1, 38: 1, 39: 1, 40: 1 }

    window.isScrollable = (element, direction) => {
      if (direction === 'down') {
        return element.scrollHeight > element.clientHeight + element.scrollTop
      }

      return element.scrollTop > 0
    }

    function preventDefault(e) {
      let direction = e.wheelDelta > 0 ? 'up' : 'down'

      if (!isScrollable(window.scrollingTarget, direction) || !(window.scrollingTarget === e.target || window.scrollingTarget.contains(e.target))) {
        e.preventDefault()
      }
    }

    function preventDefaultForScrollKeys(e) {
      if (keys[e.keyCode]) {
        preventDefault(e)
        return false
      }
    }

    // modern Chrome requires { passive: false } when adding event
    let supportsPassive = false
    try {
      window.addEventListener(
        'test',
        null,
        Object.defineProperty({}, 'passive', {
          get: function () {
            supportsPassive = true
          }
        })
      )
    } catch (e) {}

    let wheelOpt = supportsPassive ? { passive: false } : false
    let wheelEvent = 'onwheel' in document.createElement('div') ? 'wheel' : 'mousewheel'

    // call this to Disable
    window.disableScroll = (target) => {
      window.scrollingTarget = target
      window.addEventListener('DOMMouseScroll', preventDefault, false) // older FF
      window.addEventListener(wheelEvent, preventDefault, wheelOpt) // modern desktop
      window.addEventListener('touchmove', preventDefault, wheelOpt) // mobile
      window.addEventListener('keydown', preventDefaultForScrollKeys, false)
    }

    // call this to Enable
    window.enableScroll = () => {
      window.removeEventListener('DOMMouseScroll', preventDefault, false)
      window.removeEventListener(wheelEvent, preventDefault, wheelOpt)
      window.removeEventListener('touchmove', preventDefault, wheelOpt)
      window.removeEventListener('keydown', preventDefaultForScrollKeys, false)
    }

    window.getImageLightness = (imageSrc, callback) => {
      let img = document.createElement('img')
      img.src = imageSrc
      img.style.display = 'none'
      document.body.appendChild(img)

      let colorSum = 0

      img.onload = function () {
        // create canvas
        let canvas = document.createElement('canvas')
        canvas.width = this.width
        canvas.height = this.height

        let ctx = canvas.getContext('2d')
        ctx.drawImage(this, 0, 0)

        let imageData = ctx.getImageData(0, 0, canvas.width, canvas.height)
        let data = imageData.data
        let r, g, b, avg

        for (let x = 0, len = data.length; x < len; x += 4) {
          r = data[x]
          g = data[x + 1]
          b = data[x + 2]

          avg = Math.floor((r + g + b) / 3)
          colorSum += avg
        }
        let brightness = Math.floor(colorSum / (this.width * this.height))
        callback(brightness)
      }
    }

    window.LOG = {
      error: (message, ...data) => {
        console.log('%cERROR: ' + message, 'color:Red', ...data)
      },
      success: (message, ...data) => {
        console.log('%cSUCCESS: ' + message, 'color:Green', ...data)
      },
      warn: (message, ...data) => {
        console.log('%cWARNING: ' + message, 'color:#fb8817', ...data)
      },
      info: (...data) => {
        console.log(...data)
      }
    }
  }
}
