export default {
  init: function (Vue) {
    Vue.directive('click-outside', {
      bind: function (el, binding) {
        const { value } = binding
        this.event = function (event) {
          if (!(el === event.target || el.contains(event.target))) {
            value.onClick()
          }
        }
        document.body.addEventListener('click', this.event)
      }.bind(this),
      unbind: function () {
        document.body.removeEventListener('click', this.event)
      }.bind(this)
    })

    // Ripple Effect when clicking
    Vue.directive('ripple', {
      // When the bound element is inserted into the DOM...
      inserted: function (el) {
        // listen for click events to trigger the ripple
        el.addEventListener(
          'click',
          function (e) {
            // Setup
            const target = el.getBoundingClientRect()
            const buttonSize = target.width > target.height ? target.width : target.height
            // remove any previous ripple containers
            const elements = document.getElementsByClassName('bz-ripple')
            while (elements[0]) {
              elements[0].parentNode.removeChild(elements[0])
            }
            // create the ripple container and append it to the target element
            const ripple = document.createElement('span')
            ripple.setAttribute('class', 'bz-ripple')
            el.appendChild(ripple)

            // set the ripple container to the click position and start the animation
            setTimeout(function () {
              ripple.style.width = buttonSize + 'px'
              ripple.style.height = buttonSize + 'px'
              ripple.style.top = e.offsetY - buttonSize / 2 + 'px'
              ripple.style.left = e.offsetX - buttonSize / 2 + 'px'
              ripple.setAttribute('class', 'bz-ripple bz-ripple-effect')
            }, 100)
          },
          false
        )
      }
    })

    // Drop Down when clicking

    Vue.directive('dropdown', {
      bind: function (el, binding) {
        function doClose() {
          if (!isOpen) return
          isOpen = false
          el.classList.remove('show')
          document.removeEventListener('mousedown', onClose, false)
        }
        function onClose(e) {
          if (e && el.contains(e.target)) return
          doClose()
        }
        function onOpen(_e) {
          if (isOpen) return
          isOpen = true
          el.classList.add('show')
          document.addEventListener('mousedown', onClose, false)
        }
        function onToggle(_e) {
          isOpen ? onClose() : onOpen()
        }
        function onBlur(_e) {
          setTimeout(() => {
            const activeEl = document.activeElement
            if (activeEl !== document.body && !el.contains(activeEl)) {
              doClose()
            }
          })
        }
        let isOpen = false
        const toggle = el.querySelector('[dropdown-toggle]')
        const { value } = binding

        const { autoClose, click = 'toggle', focus = false } = value || {}
        if (click === 'toggle') {
          toggle.addEventListener('click', onToggle, false)
        } else if (click === 'open') {
          toggle.addEventListener('click', onOpen, false)
        }
        if (focus === 'open') {
          toggle.addEventListener('focus', onOpen, false)
          toggle.addEventListener('blur', onBlur, false)
        }

        autoClose && el.addEventListener('mouseup', doClose, false)

        el.classList.add('bz-dropdown')
      }
    })
  }
}
