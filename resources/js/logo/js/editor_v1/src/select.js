// Dependencies:
// 1) jQuery
// 2) browser.js
// 3) math.js
// 4) svgutils.js

var svgedit = svgedit || {}

;(function () {
  if (!svgedit.select) {
    svgedit.select = {}
  }

  var svgFactory_
  var config_
  var selectorManager_ // A Singleton
  const gripRadius = 4

  // Class: svgedit.select.Selector
  // Private class for DOM element selection boxes
  //
  // Parameters:
  // id - integer to internally indentify the selector
  // elem - DOM element associated with this selector
  svgedit.select.Selector = function (id, elem, bbox) {
    // this is the selector's unique number
    this.id = id

    // this holds a reference to the element for which this selector is being used
    this.selectedElement = elem

    // this is a flag used internally to track whether the selector is being used or not
    this.locked = true

    // this holds a reference to the <g> element that holds all visual elements of the selector
    this.selectorGroup = svgFactory_.createSVGElement({
      element: 'g',
      attr: { id: 'selectorGroup' + this.id }
    })

    // this holds a reference to the path rect
    this.selectorRect = this.selectorGroup.appendChild(
      svgFactory_.createSVGElement({
        element: 'path',
        attr: {
          id: 'selectedBox' + this.id,
          fill: 'none',
          stroke: '#56ccf254',
          'stroke-width': '1',
          style: 'pointer-events:none'
        }
      })
    )

    // this holds a reference to the grip coordinates for this selector
    this.gripCoords = {
      nw: null,
      n: null,
      ne: null,
      e: null,
      se: null,
      s: null,
      sw: null,
      w: null
    }

    this.reset(this.selectedElement, bbox)
  }

  // Function: svgedit.select.Selector.reset
  // Used to reset the id and element that the selector is attached to
  //
  // Parameters:
  // e - DOM element associated with this selector
  svgedit.select.Selector.prototype.reset = function (e, bbox) {
    this.locked = true
    this.selectedElement = e
    this.resize(bbox)
    this.selectorGroup.setAttribute('display', 'inline')
  }

  // Function: svgedit.select.Selector.updateGripCursors
  // Updates cursors for corner grips on rotation so arrows point the right way
  //
  // Parameters:
  // angle - Float indicating current rotation angle in degrees
  svgedit.select.Selector.prototype.updateGripCursors = function (angle) {
    let dir
    const dirArr = []
    let steps = Math.round(angle / 45)
    if (steps < 0) {
      steps += 8
    }
    for (dir in selectorManager_.selectorGrips) {
      dirArr.push(dir)
    }
    while (steps > 0) {
      dirArr.push(dirArr.shift())
      steps--
    }
    let i = 0
    for (dir in selectorManager_.selectorGrips) {
      selectorManager_.selectorGrips[dir].setAttribute('style', 'cursor:' + dirArr[i] + '-resize')
      i++
    }
  }

  // Function: svgedit.select.Selector.showGrips
  // Show the resize grips of this selector
  //
  // Parameters:
  // show - boolean indicating whether grips should be shown or not
  svgedit.select.Selector.prototype.showGrips = function (show) {
    //        var elem = this.selectedElement;
    //        if (elem && elem.nodeName === 'text') {
    //            show = false;
    //        }

    var bShow = show ? 'inline' : 'none'
    selectorManager_.selectorGripsGroup.setAttribute('display', bShow)
    var elem = this.selectedElement
    this.hasGrips = show
    if (elem && show) {
      this.selectorGroup.appendChild(selectorManager_.selectorGripsGroup)
      this.updateGripCursors(svgedit.utilities.getRotationAngle(elem))
    }
  }

  // Function: svgedit.select.Selector.resize
  // Updates the selector to match the element's size
  svgedit.select.Selector.prototype.resize = function (bbox) {
    const selectedBox = this.selectorRect,
      mgr = selectorManager_,
      selectedGrips = mgr.selectorGrips,
      selected = this.selectedElement,
      sw = selected.getAttribute('stroke-width'),
      currentZoom = svgFactory_.currentZoom()
    let offset = 1 / currentZoom
    if (selected.getAttribute('stroke') !== 'none' && !isNaN(sw)) {
      offset += sw / 2
    }

    const { tagName } = selected
    if (tagName === 'text') {
      offset += 2 / currentZoom
    }

    // loop and transform our bounding box until we reach our first rotation
    const tlist = svgedit.transformlist.getTransformList(selected)
    const m = svgedit.math.transformListToTransform(tlist).matrix

    // This should probably be handled somewhere else, but for now
    // it keeps the selection box correctly positioned when zoomed
    m.e *= currentZoom
    m.f *= currentZoom

    if (!bbox) {
      bbox = svgedit.utilities.getBBox(selected)
    }
    // TODO: getBBox (previous line) already knows to call getStrokedBBox when tagName === 'g'. Remove this?
    // TODO: getBBox doesn't exclude 'gsvg' and calls getStrokedBBox for any 'g'. Should getBBox be updated?
    if (tagName === 'g' && !$.data(selected, 'gsvg')) {
      // The bbox for a group does not include stroke vals, so we
      // get the bbox based on its children.
      const strokedBbox = getStrokedBBox([selected.childNodes])
      if (strokedBbox) {
        bbox = strokedBbox
      }
    }

    // apply the transforms
    const l = bbox.x,
      t = bbox.y,
      w = bbox.width,
      h = bbox.height
    // bbox = {x: l, y: t, width: w, height: h}; // Not in use

    // we need to handle temporary transforms too
    // if skewed, get its transformed box, then find its axis-aligned bbox

    // *
    offset *= currentZoom

    const nbox = svgedit.math.transformBox(l * currentZoom, t * currentZoom, w * currentZoom, h * currentZoom, m),
      { aabox } = nbox
    let nbax = aabox.x - offset,
      nbay = aabox.y - offset,
      nbaw = aabox.width + offset * 2,
      nbah = aabox.height + offset * 2

    // now if the shape is rotated, un-rotate it
    const cx = nbax + nbaw / 2,
      cy = nbay + nbah / 2

    const angle = svgedit.utilities.getRotationAngle(selected)
    if (angle) {
      const rot = svgFactory_.svgRoot().createSVGTransform()
      rot.setRotate(-angle, cx, cy)
      const rotm = rot.matrix
      nbox.tl = svgedit.math.transformPoint(nbox.tl.x, nbox.tl.y, rotm)
      nbox.tr = svgedit.math.transformPoint(nbox.tr.x, nbox.tr.y, rotm)
      nbox.bl = svgedit.math.transformPoint(nbox.bl.x, nbox.bl.y, rotm)
      nbox.br = svgedit.math.transformPoint(nbox.br.x, nbox.br.y, rotm)

      // calculate the axis-aligned bbox
      const { tl } = nbox
      let minx = tl.x,
        miny = tl.y,
        maxx = tl.x,
        maxy = tl.y

      const { min, max } = Math

      minx = min(minx, min(nbox.tr.x, min(nbox.bl.x, nbox.br.x))) - offset
      miny = min(miny, min(nbox.tr.y, min(nbox.bl.y, nbox.br.y))) - offset
      maxx = max(maxx, max(nbox.tr.x, max(nbox.bl.x, nbox.br.x))) + offset
      maxy = max(maxy, max(nbox.tr.y, max(nbox.bl.y, nbox.br.y))) + offset

      nbax = minx
      nbay = miny
      nbaw = maxx - minx
      nbah = maxy - miny
    }

    const dstr = 'M' + nbax + ',' + nbay + ' L' + (nbax + nbaw) + ',' + nbay + ' ' + (nbax + nbaw) + ',' + (nbay + nbah) + ' ' + nbax + ',' + (nbay + nbah) + 'z'
    selectedBox.setAttribute('d', dstr)

    const xform = angle ? 'rotate(' + [angle, cx, cy].join(',') + ')' : ''
    this.selectorGroup.setAttribute('transform', xform)

    // TODO(codedread): Is this needed?
    //  if (selected === selectedElements[0]) {
    this.gripCoords = {
      nw: [nbax, nbay],
      ne: [nbax + nbaw, nbay],
      sw: [nbax, nbay + nbah],
      se: [nbax + nbaw, nbay + nbah],
      n: [nbax + nbaw / 2, nbay],
      w: [nbax, nbay + nbah / 2],
      e: [nbax + nbaw, nbay + nbah / 2],
      s: [nbax + nbaw / 2, nbay + nbah]
    }
    Object.entries(this.gripCoords).forEach(([dir, coords]) => {
      selectedGrips[dir].setAttribute('cx', coords[0])
      selectedGrips[dir].setAttribute('cy', coords[1])
    })

    // we want to go 20 pixels in the negative transformed y direction, ignoring scale
    mgr.rotateGripConnector.setAttribute('x1', nbax + nbaw / 2)
    mgr.rotateGripConnector.setAttribute('y1', nbay)
    mgr.rotateGripConnector.setAttribute('x2', nbax + nbaw / 2)
    mgr.rotateGripConnector.setAttribute('y2', nbay - gripRadius * 5)

    mgr.rotateGrip.setAttribute('cx', nbax + nbaw / 2)
    mgr.rotateGrip.setAttribute('cy', nbay - gripRadius * 5)
  }

  // Class: svgedit.select.SelectorManager
  svgedit.select.SelectorManager = function () {
    // this will hold the <g> element that contains all selector rects/grips
    this.selectorParentGroup = null

    // this is a special rect that is used for multi-select
    this.rubberBandBox = null

    // this will hold objects of type svgedit.select.Selector (see above)
    this.selectors = []

    // this holds a map of SVG elements to their Selector object
    this.selectorMap = {}

    // this holds a reference to the grip elements
    this.selectorGrips = {
      nw: null,
      n: null,
      ne: null,
      e: null,
      se: null,
      s: null,
      sw: null,
      w: null
    }

    this.selectorGripsGroup = null
    this.rotateGripConnector = null
    this.rotateGrips = {
      nw: null,
      ne: null,
      se: null,
      sw: null
    }

    this.initGroup()
  }

  // Function: svgedit.select.SelectorManager.initGroup
  // Resets the parent selector group element
  svgedit.select.SelectorManager.prototype.initGroup = function (handler = false) {
    // remove old selector parent group if it existed
    if (this.selectorParentGroup && this.selectorParentGroup.parentNode) {
      this.selectorParentGroup.parentNode.removeChild(this.selectorParentGroup)
    }

    // create parent selector group and add it to svgroot
    this.selectorParentGroup = svgFactory_.createSVGElement({
      element: 'g',
      attr: { id: 'selectorParentGroup' }
    })
    this.selectorGripsGroup = svgFactory_.createSVGElement({
      element: 'g',
      attr: { display: 'none' }
    })
    this.selectorParentGroup.appendChild(this.selectorGripsGroup)
    svgFactory_.svgRoot().appendChild(this.selectorParentGroup)

    this.selectorMap = {}
    this.selectors = []
    this.rubberBandBox = null

    for (var dir in this.rotateGrips) {
      var grip = svgFactory_.createSVGElement({
        element: 'circle',
        attr: {
          id: 'selectorGrip_rotate_' + dir,
          ref: 'rotate-icon',
          fill: '#cdcdcd',
          r: 8,
          stroke: '#cdcdcd',
          'fill-opacity': 0,
          'stroke-opacity': 0,
          'stroke-width': 0,
          style: 'cursor:url(' + config_.imgPath + 'rotate.png) 12 12, auto;'
        }
      })
      $.data(grip, 'dir', dir)
      $.data(grip, 'type', 'rotate')
      this.rotateGrips[dir] = this.selectorGripsGroup.appendChild(grip)
    }

    if (handler) {
      // add the corner grips
      for (const dir in this.selectorGrips) {
        const grip = svgFactory_.createSVGElement({
          element: 'circle',
          attr: {
            id: 'selectorGrip_resize_' + dir,
            fill: '#56ccf2',
            r: gripRadius,
            style: 'cursor:' + dir + '-resize',
            width: 8,
            height: 8,
            stroke: 'rgba(0,0,0,0)',
            'stroke-width': 1,
            'pointer-events': 'all'
          }
        })

        $.data(grip, 'dir', dir)
        $.data(grip, 'type', 'resize')
        this.selectorGrips[dir] = this.selectorGripsGroup.appendChild(grip)
      }

      // add rotator elems
      this.rotateGripConnector = this.selectorGripsGroup.appendChild(
        svgFactory_.createSVGElement({
          element: 'line',
          attr: {
            id: 'selectorGrip_rotateconnector',
            stroke: '#56ccf2',
            'stroke-width': 1
          }
        })
      )
    }

    let m = svgFactory_.createSVGElement({
      element: 'circle',
      attr: {
        id: 'selectorGrip_rotate',
        fill: '#cdcdcd',
        r: 4,
        stroke: '#a3a3a3',
        'stroke-width': 1,
        style: 'cursor:url(' + config_.imgPath + 'rotate.png) 12 12, auto;'
      }
    })

    this.rotateGrip = this.selectorGripsGroup.appendChild(
      svgFactory_.createSVGElement({
        element: 'circle',
        attr: {
          id: 'selectorGrip_rotate',
          'v-tippy': 'true',
          fill: '#cdcdcd',
          r: 4,
          style: 'cursor:url(' + config_.imgPath + 'rotate.png) 12 12, auto;'
        }
      })
    )
    $.data(this.rotateGrip, 'type', 'rotate')

    if ($('#canvasBackground').length) return

    var dims = config_.dimensions
    var canvasbg = svgFactory_.createSVGElement({
      element: 'svg',
      attr: {
        id: 'canvasBackground',
        width: dims[0],
        height: dims[1],
        x: 0,
        y: 0,
        overflow: svgedit.browser.isWebkit() ? 'none' : 'visible', // Chrome 7 has a problem with this when zooming out
        style: 'pointer-events:none'
      }
    })

    var defs = svgFactory_.createSVGElement({
      element: 'defs',
      attr: {
        id: 'placeholder_defs'
      }
    })

    //        var pattern = svgFactory_.createSVGElement({
    //            'element': 'pattern',
    //            'attr': {
    //                'id': 'checkerPattern',
    //                'patternUnits': 'userSpaceOnUse',
    //                'x': 0,
    //                'y': 0,
    //                'width': 20,
    //                'height': 20,
    //                'viewBox': '0 0 10 10',
    //            },
    //        });

    var pattern_bg = svgFactory_.createSVGElement({
      element: 'rect',
      attr: {
        x: 0,
        y: 0,
        width: 10,
        height: 10,
        fill: '#fff'
      }
    })

    var pattern_square1 = svgFactory_.createSVGElement({
      element: 'rect',
      attr: {
        x: 0,
        y: 0,
        width: 5,
        height: 5,
        fill: '#eee'
      }
    })

    var pattern_square2 = svgFactory_.createSVGElement({
      element: 'rect',
      attr: {
        x: 5,
        y: 5,
        width: 5,
        height: 5,
        fill: '#eee'
      }
    })

    var rect = svgFactory_.createSVGElement({
      element: 'rect',
      attr: {
        width: '100%',
        height: '100%',
        x: 0,
        y: 0,
        'stroke-width': 1,
        stroke: '#555555',
        //                'fill': 'url(#checkerPattern)',
        fill: '#FFF',
        style: 'pointer-events:none'
      }
    })

    // Both Firefox and WebKit are too slow with this filter region (especially at higher
    // zoom levels) and Opera has at least one bug
    //  if (!svgedit.browser.isOpera()) rect.setAttribute('filter', 'url(#canvashadow)');
    canvasbg.appendChild(defs)
    //        defs.appendChild(pattern);
    //        pattern.appendChild(pattern_bg);
    //        pattern.appendChild(pattern_square1);
    //        pattern.appendChild(pattern_square2);
    canvasbg.appendChild(rect)

    svgFactory_.svgRoot().insertBefore(canvasbg, svgFactory_.svgContent())
  }

  function getOffset(element) {
    let zoom = svgFactory_.currentZoom()
    let bound = element.getBoundingClientRect()
    let html = document.getElementById('canvas_background').getBoundingClientRect()

    return {
      top: bound.top / zoom - html.top / zoom,
      left: bound.left / zoom - html.left / zoom,
      width: bound.width / zoom,
      height: bound.height / zoom
    }
  }

  svgedit.select.SelectorManager.prototype.initSnapElements = function () {
    let lines = createLines()
    let lineX = lines.lineX
    let lineY = lines.lineY

    EventBus.$on('snap.lines.show', (data) => {
      let action = data.action

      // Hide lines
      if (action === 'hide') {
        lineX.style.display = 'none'
        lineY.style.display = 'none'

        return
      } else if (action === 'show') {
        lineX.style.display = 'block'
        lineY.style.display = 'block'

        return
      }

      let lineBorder = 1
      let bbox = getOffset(data.visible)
      let targetBbox = getOffset(data.target)
      let x = bbox.left - lineBorder
      let y = bbox.top - lineBorder
      let targetX = targetBbox.left - lineBorder
      let targetY = targetBbox.top - lineBorder
      let width = bbox.width
      let height = bbox.height
      let targetWidth = targetBbox.width
      let targetHeight = targetBbox.height

      let gluingSide = data.gluingSide

      if (gluingSide === 'left') {
        lineX.attributes.x1.value = x
        lineX.attributes.x2.value = x

        let y1 = _.min([targetY, y])
        let y2 = _.max([y + height, targetY + targetHeight])

        lineX.attributes.y1.value = y1
        lineX.attributes.y2.value = y2

        // Show line
        showLine(lineX)
      } else if (gluingSide === 'right') {
        lineX.attributes.x1.value = x + width
        lineX.attributes.x2.value = x + width

        let y1 = _.min([targetY, y])
        let y2 = _.max([y + height, targetY + targetHeight])

        lineX.attributes.y1.value = y1
        lineX.attributes.y2.value = y2

        showLine(lineX)
      } else if (gluingSide === 'top') {
        lineY.attributes.y1.value = y
        lineY.attributes.y2.value = y

        let x1 = _.min([targetX, x])
        let x2 = _.max([x + width, targetX + targetWidth])

        lineY.attributes.x1.value = x1
        lineY.attributes.x2.value = x2

        showLine(lineY)
      } else if (gluingSide === 'bot') {
        lineY.attributes.y1.value = y + height
        lineY.attributes.y2.value = y + height

        let x1 = _.min([targetX, x])
        let x2 = _.max([x + width, targetX + targetWidth])

        lineY.attributes.x1.value = x1
        lineY.attributes.x2.value = x2

        showLine(lineY)
      } else if (gluingSide === 'center_x') {
        lineY.attributes.y1.value = y + height / 2
        lineY.attributes.y2.value = y + height / 2

        let x1 = _.min([targetX, x])
        let x2 = _.max([x + width, targetX + targetWidth])

        lineY.attributes.x1.value = x1 - Math.round(lineBorder / 2)
        lineY.attributes.x2.value = x2 - Math.round(lineBorder / 2)

        showLine(lineY)
      } else if (gluingSide === 'center_y') {
        lineX.attributes.x1.value = x + width / 2
        lineX.attributes.x2.value = x + width / 2

        let y1 = _.min([targetY, y])
        let y2 = _.max([y + height, targetY + targetHeight])

        lineX.attributes.y1.value = y1 - Math.round(lineBorder / 2)
        lineX.attributes.y2.value = y2 - Math.round(lineBorder / 2)

        showLine(lineX)
      }
    })
  }

  function showLine(line) {
    // Show line
    line.style.display = 'block'
  }

  function createLines() {
    let lineX = document.getElementById('snap_line_x')
    let lineY = document.getElementById('snap_line_y')

    if (!lineX) {
      let line = document.createElementNS('http://www.w3.org/2000/svg', 'line')
      let svgContent = svgFactory_.svgContent()
      line.setAttribute('id', 'snap_line_x')
      line.setAttribute('x1', 0)
      line.setAttribute('y1', 0)
      line.setAttribute('x2', 0)
      line.setAttribute('y2', '100%')
      line.setAttribute('opacity', 0.7)
      line.setAttribute('stroke', '#3A58F9')
      line.setAttribute('stroke-width', 1)

      svgContent.appendChild(line)

      lineX = line
    }

    if (!lineY) {
      let line = document.createElementNS('http://www.w3.org/2000/svg', 'line')
      let svgContent = svgFactory_.svgContent()
      line.setAttribute('id', 'snap_line_y')
      line.setAttribute('x1', 0)
      line.setAttribute('y1', 0)
      line.setAttribute('x2', '100%')
      line.setAttribute('y2', 0)
      line.setAttribute('stroke', '#3A58F9')
      line.setAttribute('opacity', 0.7)
      line.setAttribute('stroke-width', 1)

      svgContent.appendChild(line)

      lineY = line
    }

    lineX.style.display = 'none'
    lineY.style.display = 'none'

    return { lineX, lineY }
  }

  // Function: svgedit.select.SelectorManager.requestSelector
  // Returns the selector based on the given element
  //
  // Parameters:
  // elem - DOM element to get the selector for
  svgedit.select.SelectorManager.prototype.requestSelector = function (elem) {
    if (!elem) return null
    var N = this.selectors.length
    // If we've already acquired one for this element, return it.
    if (typeof this.selectorMap[elem.id] == 'object') {
      this.selectorMap[elem.id].locked = true
      return this.selectorMap[elem.id]
    }
    for (var i = 0; i < N; ++i) {
      if (this.selectors[i] && !this.selectors[i].locked) {
        this.selectors[i].locked = true
        this.selectors[i].reset(elem)
        this.selectorMap[elem.id] = this.selectors[i]
        return this.selectors[i]
      }
    }
    // if we reached here, no available selectors were found, we create one
    this.selectors[N] = new svgedit.select.Selector(N, elem)
    this.selectorParentGroup.appendChild(this.selectors[N].selectorGroup)
    this.selectorMap[elem.id] = this.selectors[N]
    return this.selectors[N]
  }

  // Function: svgedit.select.SelectorManager.releaseSelector
  // Removes the selector of the given element (hides selection box)
  //
  // Parameters:
  // elem - DOM element to remove the selector for
  svgedit.select.SelectorManager.prototype.releaseSelector = function (elem) {
    if (elem == null) return
    var N = this.selectors.length,
      sel = this.selectorMap[elem.id]
    for (var i = 0; i < N; ++i) {
      if (this.selectors[i] && this.selectors[i] == sel) {
        if (sel.locked == false) {
          // TODO(codedread): Ensure this exists in this module.
          console.log('WARNING! selector was released but was already unlocked')
        }
        delete this.selectorMap[elem.id]
        sel.locked = false
        sel.selectedElement = null
        sel.showGrips(false)

        // remove from DOM and store reference in JS but only if it exists in the DOM
        try {
          sel.selectorGroup.setAttribute('display', 'none')
        } catch (e) {}

        break
      }
    }
  }

  // Function: svgedit.select.SelectorManager.getRubberBandBox
  // Returns the rubberBandBox DOM element. This is the rectangle drawn by the user for selecting/zooming
  svgedit.select.SelectorManager.prototype.getRubberBandBox = function () {
    if (!this.rubberBandBox) {
      this.rubberBandBox = this.selectorParentGroup.appendChild(
        svgFactory_.createSVGElement({
          element: 'rect',
          attr: {
            id: 'selectorRubberBand',
            fill: '#aaccef',
            opacity: '0.5',
            stroke: '#65baef',
            'stroke-width': 2,
            display: 'none'
          }
        })
      )
    }
    return this.rubberBandBox
  }

  /**
   * Function: svgedit.select.init()
   * Initializes this module.
   *
   * Parameters:
   * config - an object containing configurable parameters (imgPath)
   * svgFactory - an object implementing the SVGFactory interface (see above).
   */
  svgedit.select.init = function (config, svgFactory) {
    config_ = config
    svgFactory_ = svgFactory
    selectorManager_ = new svgedit.select.SelectorManager()
    //for hovering elements
    svgFactory_.createSVGElement({
      element: 'g',
      attr: {
        id: 'hover_group'
      }
    })
  }

  /**
   * Function: svgedit.select.getSelectorManager
   *
   * Returns:
   * The SelectorManager instance.
   */
  svgedit.select.getSelectorManager = function () {
    return selectorManager_
  }
})()
