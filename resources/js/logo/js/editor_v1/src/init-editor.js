import Canvas from '../../editor_v2/svgcanvas'
import '../../editor_v2/touch'
import { isMac, isTouch } from '../../editor_v2/browser'

let initEditor = new Promise(function (resolve, reject) {
  if (!window.editor)
    window.editor = (function ($) {
      var svgCanvas
      var Editor = {}
      var is_ready = false

      // Set global editor config
      window.app = new App()

      const curConfig = {
        canvas_expansion: 1,
        initFill: {
          color: app.config.fill.color,
          opacity: app.config.fill.opacity
        },
        dimensions: [app.config.canvas.width, app.config.canvas.height],
        initStroke: {
          width: app.config.stroke.width,
          color: app.config.stroke.color,
          opacity: app.config.stroke.opacity
        },
        initOpacity: 1,
        imgPath: app.config.path.images,
        extensions: [],
        initTool: 'select',
        wireframe: false,
        gridSnapping: false,
        snappingStep: 5,
        gridColor: '#000',
        baseUnit: 'px',

        show_outside_canvas: app.config.canvas.show_outside,
        no_save_warning: true,
        initFont: 'Courier New'
      }

      Editor.curConfig = curConfig
      Editor.tool_scale = 1

      Editor.setConfig = function (opts) {
        $.extend(true, curConfig, opts)
      }

      Editor.init = function () {
        // Not rendered on mobile
        let canvas = document.getElementById('svgcanvas')

        if (!canvas) {
          return
        }

        Editor.canvas = svgCanvas = new Canvas(canvas, curConfig)

        Editor.show_save_warning = false
        Editor.paintBox = {
          fill: null,
          stroke: null,
          canvas: null
        }

        var isMac = navigator.platform.indexOf('Mac') >= 0,
          modKey = isMac ? 'meta+' : 'ctrl+', // ⌘
          undoMgr = svgCanvas.undoMgr,
          workarea = $('#workarea'),
          ui_context = 'toolbars'

        var setSelectMode = function () {
          svgCanvas.setMode('select')
        }

        // used to make the flyouts stay on the screen longer the very first time
        var selectedElement = null
        var multiselected = false

        // called when we've selected a different element
        let selectedChanged = function (window, elems) {
          // Event for getting the selected items
          EventBus.$emit('selected.changed')

          // Run extension
          svgCanvas.runExtensions('selectedChanged', {
            elems: elems,
            selectedElement: selectedElement,
            multiselected: multiselected
          })
        }

        // Call when part of element is in process of changing, generally
        // on mousemove actions like rotate, move, etc.
        var elementTransition = function (window, elems) {
          var mode = svgCanvas.getMode()
          var elem = elems[0]

          if (!elem) return

          multiselected = elems.length >= 2 && elems[1] != null ? elems : null
          // Only updating fields for single elements for now
          if (!multiselected) {
            switch (
              mode
              //            case "select":
              //            case "resize":
              //              break;
            ) {
            }
          }
          svgCanvas.runExtensions('elementTransition', {
            elems: elems
          })
        }

        // called when any element has changed
        var elementChanged = function (window, elems) {
          var mode = svgCanvas.getMode()
          if (mode === 'select') {
            setSelectMode()
          }

          for (var i = 0; i < elems.length; ++i) {
            var elem = elems[i]

            if (elem && elem.tagName === 'svg') {
              updateCanvas()
            } else if (elem && selectedElement && selectedElement.parentNode == null) {
              selectedElement = elem
            }
          }

          focusText()

          svgCanvas.runExtensions('elementChanged', {
            elems: elems
          })
        }

        var zoomChanged = function (window, bbox, autoCenter) {
          var scrbar = 15,
            res = svgCanvas.getResolution(),
            w_area = workarea,
            z_info = svgCanvas.setBBoxZoom(bbox, w_area.width() - scrbar, w_area.height() - scrbar)
          if (!z_info) return
          var zoomlevel = z_info.zoom,
            bb = z_info.bbox

          if (zoomlevel < 0.001) {
            changeZoom({
              value: 0.1
            })
            return
          }
          if (typeof animatedZoom != 'undefined') window.cancelAnimationFrame(animatedZoom)
          // zoom duration 500ms
          var start = Date.now()
          var duration = 50
          var diff = zoomlevel - res.zoom
          var zoom = $('#zoom')[0]
          var current_zoom = res.zoom
          var animateZoom = function (timestamp) {
            var progress = Date.now() - start
            var tick = progress / duration
            tick = Math.pow(tick - 1, 3) + 1
            svgCanvas.setZoom(current_zoom + diff * tick)
            updateCanvas()
            if (tick < 1 && tick > -0.9) {
              window.animatedZoom = requestAnimationFrame(animateZoom)
            } else {
              $('#zoom').val(parseInt(zoomlevel * 100))
            }
          }
          animateZoom()

          if (svgCanvas.getMode() == 'zoom' && bb.width) {
            // Go to select if a zoom box was drawn
            setSelectMode()
          }

          zoomDone()
        }

        // set the canvas properties at init
        var res = svgCanvas.getResolution()
        if (curConfig.baseUnit !== 'px') {
          res.w = svgedit.units.convertUnit(res.w) + curConfig.baseUnit
          res.h = svgedit.units.convertUnit(res.h) + curConfig.baseUnit
        }

        var createBackground = function (fill) {
          svgCanvas.createLayer('background')
          const cur_shape = svgCanvas.addSVGElementFromJson({
            element: 'rect',
            attr: {
              x: -1,
              y: -1,
              width: res.w + 2,
              height: res.h + 2,
              stroke: 'none',
              id: 'canvasBackground',
              opacity: 1,
              fill: fill || '#fff',
              style: 'pointer-events:none'
            }
          })
          svgCanvas.setCurrentLayer('Layer 1')
          svgCanvas.setCurrentLayerPosition('1')
        }

        // create a new layer background if it doesn't exist
        //if (!document.getElementById('canvasBackground')) createBackground();
        //var fill = document.getElementById('canvasBackground').getAttribute('fill');

        // updates the context panel tools based on the selected element
        var focusText = function (e) {
          //                if (svgCanvas.addedNew) {
          //                    // Timeout needed for IE9
          //                    setTimeout(function() {
          //                        $('#text').focus().select();
          //                    }, 100);
          //                }
          //                svgCanvas.addedNew = false;
        }

        // bind the selected event to our function that handles updates to the UI
        svgCanvas.bind('selected', selectedChanged)
        svgCanvas.bind('transition', elementTransition)
        svgCanvas.bind('changed', elementChanged)
        svgCanvas.bind('zoomed', zoomChanged)
        svgCanvas.textActions.setInputElem($('#text')[0])

        var changeZoom = function (ctl) {
          var zoomlevel = ctl.value / 100
          if (zoomlevel < 0.001) {
            ctl.value = 0.1
            return
          }
          var zoom = svgCanvas.getZoom()
          var w_area = workarea
          zoomChanged(
            window,
            {
              width: 0,
              height: 0,
              // center pt of scroll position
              x: (w_area[0].scrollLeft + w_area.width() / 2) / zoom,
              y: (w_area[0].scrollTop + w_area.height() / 2) / zoom,
              zoom: zoomlevel
            },
            true
          )
        }

        // Lose focus for select elements when changed (Allows keyboard shortcuts to work better)
        $('select').change(function () {
          //setSelectMode();
          $(this).blur()
        })

        //            $('#text').keyup(function() {
        //                svgCanvas.setTextContent(this.value);
        //            });

        const changeAttribute = function (el, completed) {
          var attr = el.getAttribute('data-attr')
          var multiplier = el.getAttribute('data-multiplier') || 1
          multiplier = parseFloat(multiplier)
          var val = el.value * multiplier
          var valid = svgedit.units.isValidUnit(attr, val, selectedElement)
          if (!valid) {
            el.value = selectedElement.getAttribute(attr)
            return false
          }
          //if (!noUndo) svgCanvas.changeSelectedAttribute(attr, val);
          svgCanvas.changeSelectedAttributeNoUndo(attr, val)
        }

        //            let picking = false;
        //            $(document).on('mouseup', function() {
        //                picking = false;
        //            });

        //            (function() {
        //                var last_x = null,
        //                        last_y = null,
        //                        w_area = workarea[0],
        //                        panning = false,
        //                        keypan = false;
        //
        //                var move_pan = function(evt) {
        //                    if (panning === false) return;
        //
        //                    w_area.scrollLeft -= (evt.clientX - last_x);
        //                    w_area.scrollTop -= (evt.clientY - last_y);
        //                    last_x = evt.clientX;
        //                    last_y = evt.clientY;
        //                    if (evt.type === 'mouseup' || evt.type === 'touchend') panning = false;
        //                    return false;
        //                };
        //
        //                var start_pan = function(evt) {
        //                    if (evt.button === 1 || keypan === true || (evt.originalEvent.touches && evt.originalEvent.touches.length >= 2)) {
        //                        panning = true;
        //                        last_x = evt.clientX;
        //                        last_y = evt.clientY;
        //                        return false;
        //                    }
        //                };
        //
        //                $('#svgcanvas').on('mousemove mouseup touchend', move_pan).on('mousedown touchmove', start_pan);
        //
        //                $(window).mouseup(function() {
        //                    panning = false;
        //                });
        //
        //                $(document).bind('keydown', 'space', function(evt) {
        //                    evt.preventDefault();
        //                    svgCanvas.spaceKey = keypan = true;
        //
        //                }).bind('keyup', 'space', function(evt) {
        //                    evt.preventDefault();
        //                    svgCanvas.spaceKey = keypan = false;
        //                }).bind('keydown', 'alt', function(evt) {
        //                    if (svgCanvas.getMode() === 'zoom') {
        //                        workarea.addClass('out');
        //                    }
        //                }).bind('keyup', 'alt', function(evt) {
        //                    if (svgCanvas.getMode() === 'zoom') {
        //                        workarea.removeClass('out');
        //                    }
        //                });
        //            }());

        //            var closer = function(e) {
        //                if (e.target.nodeName && e.target.nodeName.toLowerCase() === 'input') return false;
        //            };
        //
        //            $('svg, body').on('mousedown  touchstart', function(e) {
        //                closer(e);
        //            });

        //            $('#workarea').on('mousewheel', function(e, delta, deltaX, deltaY) {
        //                if (e.altKey || e.ctrlKey) {
        //                    e.preventDefault();
        //                    let zoom = parseInt($('#zoom').val());
        //                    $('#zoom').val(parseInt(zoom + deltaY * (e.altKey ? 10 : 5))).change();
        //                }
        //            });

        var deleteSelected = function () {
          svgCanvas.deleteSelectedElements()
        }

        var cutSelected = function () {
          svgCanvas.cutSelectedElements()
        }

        var copySelected = function () {
          svgCanvas.copySelectedElements()
        }

        var pasteSelected = function () {
          var zoom = svgCanvas.getZoom()
          var x = (workarea[0].scrollLeft + workarea.width() / 2) / zoom - svgCanvas.contentW
          var y = (workarea[0].scrollTop + workarea.height() / 2) / zoom - svgCanvas.contentH
          svgCanvas.pasteElements('point', x, y)
        }

        var moveToTopSelected = function () {
          if (selectedElement != null) {
            svgCanvas.moveToTopSelectedElement()
          }
        }

        var moveToBottomSelected = function () {
          if (selectedElement != null) {
            svgCanvas.moveToBottomSelectedElement()
          }
        }

        var moveUpSelected = function () {
          if (selectedElement != null) {
            svgCanvas.moveUpDownSelected('Up')
          }
        }

        var moveDownSelected = function () {
          if (selectedElement != null) {
            svgCanvas.moveUpDownSelected('Down')
          }
        }

        var moveSelected = function (dx, dy) {
          let selected = svgCanvas.getSelectedElems()

          if (selected || multiselected) {
            if (curConfig.gridSnapping) {
              // Use grid snap value regardless of zoom level
              var multi = svgCanvas.getZoom() * curConfig.snappingStep
              dx *= multi
              dy *= multi
            }
            svgCanvas.moveSelectedElements(dx, dy)
          }
        }

        var selectNext = function () {
          svgCanvas.cycleElement(1)
        }

        var selectPrev = function () {
          svgCanvas.cycleElement(0)
        }

        var groupSelected = function () {
          svgCanvas.groupSelectedElements()
        }

        var ungroupSelected = function () {
          svgCanvas.ungroupSelectedElement()
        }

        var clickUndo = function () {
          if (undoMgr.getUndoStackSize() > 0) {
            undoMgr.undo()
          }
        }

        var clickRedo = function () {
          if (undoMgr.getRedoStackSize() > 0) {
            undoMgr.redo()
          }
        }

        var zoomDone = function () {
          console.log('zoom done')
        }

        $(window).resize(function (evt) {
          updateCanvas()
        })

        var centerCanvas = function () {
          // this centers the canvas vertically in the workarea (horizontal handled in CSS)
          workarea.css('line-height', workarea.height() + 'px')
        }

        $(window).bind('load resize', centerCanvas)

        $('#zoom').change(function () {
          changeZoom(this)
        })

        //Prevent browser from erroneously repopulating fields
        //            $('input,select').attr('autocomplete', 'off');

        // Associate all button actions as well as non-button keyboard shortcuts
        var Actions = (function () {
          // sel:'selector', fn:function, evt:'event', key:[key, preventDefault, NoDisableInInput]
          var tool_buttons = [
            {
              fn: clickUndo,
              key: modKey + 'z'
            },
            {
              fn: clickRedo,
              key: [modKey + 'shift+z', true]
            },
            // Shortcuts not associated with buttons
            {
              fn: copySelected,
              key: modKey + 'c'
            },
            {
              fn: cutSelected,
              key: [modKey + 'x', true]
            },
            {
              fn: pasteSelected,
              key: modKey + 'v'
            },
            {
              fn: deleteSelected,
              key: ['del/backspace', true]
            },
            {
              fn: groupSelected,
              key: [modKey + 'G', true]
            },
            {
              fn: ungroupSelected,
              key: modKey + 'shift+G'
            },
            {
              key: ['up', true],
              fn: function () {
                moveSelected(0, -1)
              }
            },
            {
              key: ['down', true],
              fn: function () {
                moveSelected(0, 1)
              }
            },
            {
              key: ['left', true],
              fn: function () {
                moveSelected(-1, 0)
              }
            },
            {
              key: ['right', true],
              fn: function () {
                moveSelected(1, 0)
              }
            },
            {
              key: 'shift+up',
              fn: function () {
                moveSelected(0, -10)
              }
            },
            {
              key: 'shift+down',
              fn: function () {
                moveSelected(0, 10)
              }
            },
            {
              key: 'shift+left',
              fn: function () {
                moveSelected(-10, 0)
              }
            },
            {
              key: 'shift+right',
              fn: function () {
                moveSelected(10, 0)
              }
            },
            {
              key: modKey + 'A',
              fn: function () {
                svgCanvas.selectAllInCurrentLayer()
              }
            },

            // Standard shortcuts
            {
              key: 'esc',
              fn: setSelectMode
            }
          ]

          return {
            setAll: function () {
              var flyouts = {}

              $.each(tool_buttons, function (i, opts) {
                // Bind function to button
                if (opts.sel) {
                  var btn = $(opts.sel)
                  if (btn.length == 0) return true // Skip if markup does not exist
                  if (opts.evt) {
                    if (svgedit.browser.isTouch() && opts.evt === 'click') opts.evt = 'mousedown'
                    btn[opts.evt](opts.fn)
                  }

                  // Add to parent flyout menu, if able to be displayed
                  if (opts.parent && $(opts.parent + '_show').length != 0) {
                    var f_h = $(opts.parent)
                    if (!f_h.length) {
                      f_h = makeFlyoutHolder(opts.parent.substr(1))
                    }

                    f_h.append(btn)

                    if (!$.isArray(flyouts[opts.parent])) {
                      flyouts[opts.parent] = []
                    }
                    flyouts[opts.parent].push(opts)
                  }
                }

                // Bind function to shortcut key
                if (opts.key) {
                  // Set shortcut based on options
                  var keyval,
                    shortcut = '',
                    disInInp = true,
                    fn = opts.fn,
                    pd = false
                  if ($.isArray(opts.key)) {
                    keyval = opts.key[0]
                    if (opts.key.length > 1) pd = opts.key[1]
                    if (opts.key.length > 2) disInInp = opts.key[2]
                  } else {
                    keyval = opts.key
                  }
                  keyval += ''
                  //                                if (svgedit.browser.isMac && keyval.indexOf('+') != -1) {
                  //                                    var modifier_key = keyval.split('+')[0];
                  //                                    if (modifier_key == 'ctrl') keyval.replace('ctrl', 'cmd');
                  //                                }

                  $.each(keyval.split('/'), function (i, key) {
                    $(document).bind('keydown', key, function (e) {
                      fn()
                      if (pd) {
                        e.preventDefault()
                      }
                      // Prevent default on ALL keys?
                      return false
                    })
                  })
                }
              })

              $(window)
                .bind('keydown', 'tab', function (e) {
                  if (ui_context === 'canvas') {
                    e.preventDefault()
                    selectNext()
                  }
                })
                .bind('keydown', 'shift+tab', function (e) {
                  if (ui_context === 'canvas') {
                    e.preventDefault()
                    selectPrev()
                  }
                })
            }
          }
        })()

        //            Actions.setAll();

        // Set default zoom
        $('#zoom').val(svgCanvas.getZoom() * 100)

        window.onbeforeunload = function () {
          // Suppress warning if page is empty
          if (undoMgr.getUndoStackSize() === 0) {
            Editor.show_save_warning = false
          }
        }

        Editor.openPrep = function (func) {
          if (undoMgr.getUndoStackSize() === 0) {
            func(true)
          } else {
            func()
          }
        }

        //            if (window.FileReader) {
        //                function onDragEnter(e) {
        //                    e.stopPropagation();
        //                    e.preventDefault();
        //                }
        //
        //                function onDragOver(e) {
        //                    e.stopPropagation();
        //                    e.preventDefault();
        //                }
        //
        //                function onDragLeave(e) {
        //                    workarea.removeAttr('style');
        //                    e.stopPropagation();
        //                    e.preventDefault();
        //                }
        //
        //                workarea[0].addEventListener('dragenter', onDragEnter, false);
        //                workarea[0].addEventListener('dragover', onDragOver, false);
        //                workarea[0].addEventListener('dragleave', onDragLeave, false);
        //            }

        EventBus.$on('zoom.increment', function (e) {
          updateZoom(1.25, e)
        })

        EventBus.$on('zoom.decrement', function (e) {
          updateZoom(-1.25, e)
        })

        let updateZoom = function (delta, e) {
          let zoom = parseInt($('#zoom').val())

          $('#zoom')
            .val(parseInt(zoom + delta * (e.altKey ? 10 : 5)))
            .change()
        }

        var updateCanvas = (Editor.updateCanvas = function (center, new_ctr) {
          return

          var w = workarea.width(),
            h = workarea.height()
          var w_orig = w,
            h_orig = h
          var zoom = svgCanvas.getZoom()
          var w_area = workarea
          var cnvs = $('#svgcanvas')

          var old_ctr = {
            x: w_area[0].scrollLeft + w_orig / 2,
            y: w_area[0].scrollTop + h_orig / 2
          }

          var multi = curConfig.canvas_expansion
          w = Math.max(w_orig, svgCanvas.contentW * zoom * multi)
          h = Math.max(h_orig, svgCanvas.contentH * zoom * multi)

          if (w == w_orig && h == h_orig) {
            workarea.css('overflow', 'hidden')
          } else {
            workarea.css('overflow', 'scroll')
          }

          var old_can_y = cnvs.height() / 2
          var old_can_x = cnvs.width() / 2
          cnvs.width(w).height(h)
          var new_can_y = h / 2
          var new_can_x = w / 2
          var offset = svgCanvas.updateCanvas(w, h)

          var ratio = new_can_x / old_can_x

          var scroll_x = w / 2 - w_orig / 2
          var scroll_y = h / 2 - h_orig / 2

          if (!new_ctr) {
            var old_dist_x = old_ctr.x - old_can_x
            var new_x = new_can_x + old_dist_x * ratio

            var old_dist_y = old_ctr.y - old_can_y
            var new_y = new_can_y + old_dist_y * ratio

            new_ctr = {
              x: new_x,
              y: new_y
            }
          } else {
            ;(new_ctr.x += offset.x), (new_ctr.y += offset.y)
          }

          //width.val(offset.x)
          //height.val(offset.y)

          if (center) {
            // Go to top-left for larger documents
            if (svgCanvas.contentW > w_area.width()) {
              // Top-left
              workarea[0].scrollLeft = offset.x - 10
              workarea[0].scrollTop = offset.y - 10
            } else {
              // Center
              w_area[0].scrollLeft = scroll_x
              w_area[0].scrollTop = scroll_y
            }
          } else {
            w_area[0].scrollLeft = new_ctr.x - w_orig / 2
            w_area[0].scrollTop = new_ctr.y - h_orig / 2
          }
        })

        // Make [1,2,5] array
        var r_intervals = []
        for (var i = 0.1; i < 1e5; i *= 10) {
          r_intervals.push(1 * i)
          r_intervals.push(2 * i)
          r_intervals.push(5 * i)
        }

        updateCanvas(true)

        // For Compatibility with older extensions
        $(function () {
          window.svgCanvas = svgCanvas
          svgCanvas.ready = editor.ready
        })
      }

      var callbacks = []

      function loadSvgString(str, callback) {
        //            var success = svgCanvas.setSvgString(str) !== false;
        //            callback = callback || $.noop;
        //            if (success) {
        //                callback(true);
        //            } else {
        //                callback(false);
        //            }
      }

      Editor.ready = function (cb) {
        if (!is_ready) {
          callbacks.push(cb)
        } else {
          cb()
        }
      }

      Editor.runCallbacks = function () {
        $.each(callbacks, function () {
          this()
        })
        is_ready = true
      }

      Editor.loadFromString = function (str) {
        Editor.ready(function () {
          loadSvgString(str)
        })
      }

      resolve(Editor)

      return Editor
    })(jQuery)
})

// Run init once DOM is loaded
initEditor.then(() => {
  EventBus.$on('editor.mounted', () => {
    $(editor.init)
      .promise()
      .then(() => {
        EventBus.$emit('editor.compilation.completed', editor)
      })
  })
})
;(function () {
  // This fixes $(...).attr() to work as expected with SVG elements.
  // Does not currently use *AttributeNS() since we rarely need that.

  // See http://api.jquery.com/attr/ for basic documentation of .attr()

  // Additional functionality:
  // - When getting attributes, a string that's a number is return as type number.
  // - If an array is supplied as first parameter, multiple values are returned
  // as an object with values for each given attributes
  var proxied = jQuery.fn.attr,
    svgns = 'http://www.w3.org/2000/svg'
  jQuery.fn.attr = function (key, value) {
    var len = this.length
    if (!len) return proxied.apply(this, arguments)
    for (var i = 0; i < len; i++) {
      var elem = this[i]
      // set/get SVG attribute
      if (elem.namespaceURI === svgns) {
        // Setting attribute
        if (value !== undefined) {
          elem.setAttribute(key, value)
        } else if ($.isArray(key)) {
          // Getting attributes from array
          var j = key.length,
            obj = {}

          while (j--) {
            var aname = key[j]
            var attr = elem.getAttribute(aname)
            // This returns a number when appropriate
            if (attr || attr === '0') {
              attr = isNaN(attr) ? attr : attr - 0
            }
            obj[aname] = attr
          }
          return obj
        } else if (typeof key === 'object') {
          // Setting attributes form object
          for (var v in key) {
            elem.setAttribute(v, key[v])
          }
          // Getting attribute
        } else {
          var attr = elem.getAttribute(key)
          if (attr || attr === '0') {
            attr = isNaN(attr) ? attr : attr - 0
          }

          return attr
        }
      } else {
        return proxied.apply(this, arguments)
      }
    }
    return this
  }
})()
