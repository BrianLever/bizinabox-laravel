export class Snapper {
  constructor(config) {
    this.svgContent = config.svgContent
    this.currentZoom = config.currentZoom
  }

  initSnapElements() {
    let lines = this.createLines()
    let lineX = lines.lineX
    let lineY = lines.lineY

    EventBus.$on('snap.lines.show', (data) => {
      let action = data.action

      // Hide lines
      if (action === 'hide') {
        lineX.style.display = 'none'
        lineY.style.display = 'none'

        return
      }

      // Show lines
      if (action === 'show') {
        lineX.style.display = 'block'
        lineY.style.display = 'block'

        return
      }

      let lineBorder = 1
      let bbox = this.getOffset(data.visible)
      let targetBbox = this.getOffset(data.target)
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
        this.showLine(lineX)
      } else if (gluingSide === 'right') {
        lineX.attributes.x1.value = x + width
        lineX.attributes.x2.value = x + width

        let y1 = _.min([targetY, y])
        let y2 = _.max([y + height, targetY + targetHeight])

        lineX.attributes.y1.value = y1
        lineX.attributes.y2.value = y2

        this.showLine(lineX)
      } else if (gluingSide === 'top') {
        lineY.attributes.y1.value = y
        lineY.attributes.y2.value = y

        let x1 = _.min([targetX, x])
        let x2 = _.max([x + width, targetX + targetWidth])

        lineY.attributes.x1.value = x1
        lineY.attributes.x2.value = x2

        this.showLine(lineY)
      } else if (gluingSide === 'bot') {
        lineY.attributes.y1.value = y + height
        lineY.attributes.y2.value = y + height

        let x1 = _.min([targetX, x])
        let x2 = _.max([x + width, targetX + targetWidth])

        lineY.attributes.x1.value = x1
        lineY.attributes.x2.value = x2

        this.showLine(lineY)
      } else if (gluingSide === 'center_x') {
        lineY.attributes.y1.value = y + height / 2
        lineY.attributes.y2.value = y + height / 2

        let x1 = _.min([targetX, x])
        let x2 = _.max([x + width, targetX + targetWidth])

        lineY.attributes.x1.value = x1 - Math.round(lineBorder / 2)
        lineY.attributes.x2.value = x2 - Math.round(lineBorder / 2)

        this.showLine(lineY)
      } else if (gluingSide === 'center_y') {
        lineX.attributes.x1.value = x + width / 2
        lineX.attributes.x2.value = x + width / 2

        let y1 = _.min([targetY, y])
        let y2 = _.max([y + height, targetY + targetHeight])

        lineX.attributes.y1.value = y1 - Math.round(lineBorder / 2)
        lineX.attributes.y2.value = y2 - Math.round(lineBorder / 2)

        this.showLine(lineX)
      }
    })
  }

  getOffset(element) {
    let zoom = this.currentZoom
    let bound = element.getBoundingClientRect()
    let html = document.getElementById('canvasBackground').getBoundingClientRect()

    return {
      top: bound.top / zoom - html.top / zoom,
      left: bound.left / zoom - html.left / zoom,
      width: bound.width / zoom,
      height: bound.height / zoom
    }
  }

  showLine(line) {
    // Show line
    line.style.display = 'block'
  }

  createLines() {
    let lineX = document.getElementById('snap-line-x')
    let lineY = document.getElementById('snap-line-y')
    let group = document.createElementNS('http://www.w3.org/2000/svg', 'g')

    // Add identification class for snap lines group
    group.classList.add('snap-lines')

    if (!lineX) {
      let line = document.createElementNS('http://www.w3.org/2000/svg', 'line')
      line.setAttribute('id', 'snap-line-x')
      line.setAttribute('x1', 0)
      line.setAttribute('y1', 0)
      line.setAttribute('x2', 0)
      line.setAttribute('y2', '100%')
      line.setAttribute('opacity', 0.7)
      line.setAttribute('stroke', '#3A58F9')
      line.setAttribute('stroke-width', 1)

      lineX = line
    }

    if (!lineY) {
      let line = document.createElementNS('http://www.w3.org/2000/svg', 'line')
      line.setAttribute('id', 'snap-line-y')
      line.setAttribute('x1', 0)
      line.setAttribute('y1', 0)
      line.setAttribute('x2', '100%')
      line.setAttribute('y2', 0)
      line.setAttribute('stroke', '#3A58F9')
      line.setAttribute('opacity', 0.7)
      line.setAttribute('stroke-width', 1)

      lineY = line
    }

    group.append(lineX)
    group.append(lineY)

    $(this.svgContent).append(group)

    lineX.style.display = 'none'
    lineY.style.display = 'none'

    return { lineX, lineY }
  }
}

export const initSnapper = (svgContent, currentZoom) =>
  new Snapper({
    svgContent,
    currentZoom
  }).initSnapElements()
