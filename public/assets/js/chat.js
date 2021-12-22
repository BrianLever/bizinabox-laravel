;(() => {
  var t = {
      34155: (t) => {
        var e,
          n,
          r = (t.exports = {})
        function i() {
          throw new Error('setTimeout has not been defined')
        }
        function o() {
          throw new Error('clearTimeout has not been defined')
        }
        function s(t) {
          if (e === setTimeout) return setTimeout(t, 0)
          if ((e === i || !e) && setTimeout) return (e = setTimeout), setTimeout(t, 0)
          try {
            return e(t, 0)
          } catch (n) {
            try {
              return e.call(null, t, 0)
            } catch (n) {
              return e.call(this, t, 0)
            }
          }
        }
        !(function () {
          try {
            e = 'function' == typeof setTimeout ? setTimeout : i
          } catch (t) {
            e = i
          }
          try {
            n = 'function' == typeof clearTimeout ? clearTimeout : o
          } catch (t) {
            n = o
          }
        })()
        var c,
          a = [],
          u = !1,
          h = -1
        function l() {
          u && c && ((u = !1), c.length ? (a = c.concat(a)) : (h = -1), a.length && p())
        }
        function p() {
          if (!u) {
            var t = s(l)
            u = !0
            for (var e = a.length; e; ) {
              for (c = a, a = []; ++h < e; ) c && c[h].run()
              ;(h = -1), (e = a.length)
            }
            ;(c = null),
              (u = !1),
              (function (t) {
                if (n === clearTimeout) return clearTimeout(t)
                if ((n === o || !n) && clearTimeout) return (n = clearTimeout), clearTimeout(t)
                try {
                  n(t)
                } catch (e) {
                  try {
                    return n.call(null, t)
                  } catch (e) {
                    return n.call(this, t)
                  }
                }
              })(t)
          }
        }
        function f(t, e) {
          ;(this.fun = t), (this.array = e)
        }
        function d() {}
        ;(r.nextTick = function (t) {
          var e = new Array(arguments.length - 1)
          if (arguments.length > 1) for (var n = 1; n < arguments.length; n++) e[n - 1] = arguments[n]
          a.push(new f(t, e)), 1 !== a.length || u || s(p)
        }),
          (f.prototype.run = function () {
            this.fun.apply(null, this.array)
          }),
          (r.title = 'browser'),
          (r.browser = !0),
          (r.env = {}),
          (r.argv = []),
          (r.version = ''),
          (r.versions = {}),
          (r.on = d),
          (r.addListener = d),
          (r.once = d),
          (r.off = d),
          (r.removeListener = d),
          (r.removeAllListeners = d),
          (r.emit = d),
          (r.prependListener = d),
          (r.prependOnceListener = d),
          (r.listeners = function (t) {
            return []
          }),
          (r.binding = function (t) {
            throw new Error('process.binding is not supported')
          }),
          (r.cwd = function () {
            return '/'
          }),
          (r.chdir = function (t) {
            throw new Error('process.chdir is not supported')
          }),
          (r.umask = function () {
            return 0
          })
      },
      86606: (t) => {
        /*!
         * Pusher JavaScript Library v7.0.3
         * https://pusher.com/
         *
         * Copyright 2020, Pusher
         * Released under the MIT licence.
         */
        var e
        window,
          (e = function () {
            return (function (t) {
              var e = {}
              function n(r) {
                if (e[r]) return e[r].exports
                var i = (e[r] = { i: r, l: !1, exports: {} })
                return t[r].call(i.exports, i, i.exports, n), (i.l = !0), i.exports
              }
              return (
                (n.m = t),
                (n.c = e),
                (n.d = function (t, e, r) {
                  n.o(t, e) || Object.defineProperty(t, e, { enumerable: !0, get: r })
                }),
                (n.r = function (t) {
                  'undefined' != typeof Symbol && Symbol.toStringTag && Object.defineProperty(t, Symbol.toStringTag, { value: 'Module' }),
                    Object.defineProperty(t, '__esModule', { value: !0 })
                }),
                (n.t = function (t, e) {
                  if ((1 & e && (t = n(t)), 8 & e)) return t
                  if (4 & e && 'object' == typeof t && t && t.__esModule) return t
                  var r = Object.create(null)
                  if ((n.r(r), Object.defineProperty(r, 'default', { enumerable: !0, value: t }), 2 & e && 'string' != typeof t))
                    for (var i in t)
                      n.d(
                        r,
                        i,
                        function (e) {
                          return t[e]
                        }.bind(null, i)
                      )
                  return r
                }),
                (n.n = function (t) {
                  var e =
                    t && t.__esModule
                      ? function () {
                          return t.default
                        }
                      : function () {
                          return t
                        }
                  return n.d(e, 'a', e), e
                }),
                (n.o = function (t, e) {
                  return Object.prototype.hasOwnProperty.call(t, e)
                }),
                (n.p = ''),
                n((n.s = 2))
              )
            })([
              function (t, e, n) {
                'use strict'
                var r,
                  i =
                    (this && this.__extends) ||
                    ((r = function (t, e) {
                      return (r =
                        Object.setPrototypeOf ||
                        ({ __proto__: [] } instanceof Array &&
                          function (t, e) {
                            t.__proto__ = e
                          }) ||
                        function (t, e) {
                          for (var n in e) e.hasOwnProperty(n) && (t[n] = e[n])
                        })(t, e)
                    }),
                    function (t, e) {
                      function n() {
                        this.constructor = t
                      }
                      r(t, e), (t.prototype = null === e ? Object.create(e) : ((n.prototype = e.prototype), new n()))
                    })
                Object.defineProperty(e, '__esModule', { value: !0 })
                var o = 256,
                  s = (function () {
                    function t(t) {
                      void 0 === t && (t = '='), (this._paddingCharacter = t)
                    }
                    return (
                      (t.prototype.encodedLength = function (t) {
                        return this._paddingCharacter ? (((t + 2) / 3) * 4) | 0 : ((8 * t + 5) / 6) | 0
                      }),
                      (t.prototype.encode = function (t) {
                        for (var e = '', n = 0; n < t.length - 2; n += 3) {
                          var r = (t[n] << 16) | (t[n + 1] << 8) | t[n + 2]
                          ;(e += this._encodeByte((r >>> 18) & 63)),
                            (e += this._encodeByte((r >>> 12) & 63)),
                            (e += this._encodeByte((r >>> 6) & 63)),
                            (e += this._encodeByte((r >>> 0) & 63))
                        }
                        var i = t.length - n
                        return (
                          i > 0 &&
                            ((r = (t[n] << 16) | (2 === i ? t[n + 1] << 8 : 0)),
                            (e += this._encodeByte((r >>> 18) & 63)),
                            (e += this._encodeByte((r >>> 12) & 63)),
                            (e += 2 === i ? this._encodeByte((r >>> 6) & 63) : this._paddingCharacter || ''),
                            (e += this._paddingCharacter || '')),
                          e
                        )
                      }),
                      (t.prototype.maxDecodedLength = function (t) {
                        return this._paddingCharacter ? ((t / 4) * 3) | 0 : ((6 * t + 7) / 8) | 0
                      }),
                      (t.prototype.decodedLength = function (t) {
                        return this.maxDecodedLength(t.length - this._getPaddingLength(t))
                      }),
                      (t.prototype.decode = function (t) {
                        if (0 === t.length) return new Uint8Array(0)
                        for (
                          var e = this._getPaddingLength(t), n = t.length - e, r = new Uint8Array(this.maxDecodedLength(n)), i = 0, s = 0, c = 0, a = 0, u = 0, h = 0, l = 0;
                          s < n - 4;
                          s += 4
                        )
                          (a = this._decodeChar(t.charCodeAt(s + 0))),
                            (u = this._decodeChar(t.charCodeAt(s + 1))),
                            (h = this._decodeChar(t.charCodeAt(s + 2))),
                            (l = this._decodeChar(t.charCodeAt(s + 3))),
                            (r[i++] = (a << 2) | (u >>> 4)),
                            (r[i++] = (u << 4) | (h >>> 2)),
                            (r[i++] = (h << 6) | l),
                            (c |= a & o),
                            (c |= u & o),
                            (c |= h & o),
                            (c |= l & o)
                        if (
                          (s < n - 1 &&
                            ((a = this._decodeChar(t.charCodeAt(s))), (u = this._decodeChar(t.charCodeAt(s + 1))), (r[i++] = (a << 2) | (u >>> 4)), (c |= a & o), (c |= u & o)),
                          s < n - 2 && ((h = this._decodeChar(t.charCodeAt(s + 2))), (r[i++] = (u << 4) | (h >>> 2)), (c |= h & o)),
                          s < n - 3 && ((l = this._decodeChar(t.charCodeAt(s + 3))), (r[i++] = (h << 6) | l), (c |= l & o)),
                          0 !== c)
                        )
                          throw new Error('Base64Coder: incorrect characters for decoding')
                        return r
                      }),
                      (t.prototype._encodeByte = function (t) {
                        var e = t
                        return (
                          (e += 65), (e += ((25 - t) >>> 8) & 6), (e += ((51 - t) >>> 8) & -75), (e += ((61 - t) >>> 8) & -15), (e += ((62 - t) >>> 8) & 3), String.fromCharCode(e)
                        )
                      }),
                      (t.prototype._decodeChar = function (t) {
                        var e = o
                        return (
                          (e += (((42 - t) & (t - 44)) >>> 8) & (-256 + t - 43 + 62)),
                          (e += (((46 - t) & (t - 48)) >>> 8) & (-256 + t - 47 + 63)),
                          (e += (((47 - t) & (t - 58)) >>> 8) & (-256 + t - 48 + 52)),
                          (e += (((64 - t) & (t - 91)) >>> 8) & (-256 + t - 65 + 0)),
                          (e += (((96 - t) & (t - 123)) >>> 8) & (-256 + t - 97 + 26))
                        )
                      }),
                      (t.prototype._getPaddingLength = function (t) {
                        var e = 0
                        if (this._paddingCharacter) {
                          for (var n = t.length - 1; n >= 0 && t[n] === this._paddingCharacter; n--) e++
                          if (t.length < 4 || e > 2) throw new Error('Base64Coder: incorrect padding')
                        }
                        return e
                      }),
                      t
                    )
                  })()
                e.Coder = s
                var c = new s()
                ;(e.encode = function (t) {
                  return c.encode(t)
                }),
                  (e.decode = function (t) {
                    return c.decode(t)
                  })
                var a = (function (t) {
                  function e() {
                    return (null !== t && t.apply(this, arguments)) || this
                  }
                  return (
                    i(e, t),
                    (e.prototype._encodeByte = function (t) {
                      var e = t
                      return (
                        (e += 65), (e += ((25 - t) >>> 8) & 6), (e += ((51 - t) >>> 8) & -75), (e += ((61 - t) >>> 8) & -13), (e += ((62 - t) >>> 8) & 49), String.fromCharCode(e)
                      )
                    }),
                    (e.prototype._decodeChar = function (t) {
                      var e = o
                      return (
                        (e += (((44 - t) & (t - 46)) >>> 8) & (-256 + t - 45 + 62)),
                        (e += (((94 - t) & (t - 96)) >>> 8) & (-256 + t - 95 + 63)),
                        (e += (((47 - t) & (t - 58)) >>> 8) & (-256 + t - 48 + 52)),
                        (e += (((64 - t) & (t - 91)) >>> 8) & (-256 + t - 65 + 0)),
                        (e += (((96 - t) & (t - 123)) >>> 8) & (-256 + t - 97 + 26))
                      )
                    }),
                    e
                  )
                })(s)
                e.URLSafeCoder = a
                var u = new a()
                ;(e.encodeURLSafe = function (t) {
                  return u.encode(t)
                }),
                  (e.decodeURLSafe = function (t) {
                    return u.decode(t)
                  }),
                  (e.encodedLength = function (t) {
                    return c.encodedLength(t)
                  }),
                  (e.maxDecodedLength = function (t) {
                    return c.maxDecodedLength(t)
                  }),
                  (e.decodedLength = function (t) {
                    return c.decodedLength(t)
                  })
              },
              function (t, e, n) {
                'use strict'
                Object.defineProperty(e, '__esModule', { value: !0 })
                var r = 'utf8: invalid string',
                  i = 'utf8: invalid source encoding'
                function o(t) {
                  for (var e = 0, n = 0; n < t.length; n++) {
                    var i = t.charCodeAt(n)
                    if (i < 128) e += 1
                    else if (i < 2048) e += 2
                    else if (i < 55296) e += 3
                    else {
                      if (!(i <= 57343)) throw new Error(r)
                      if (n >= t.length - 1) throw new Error(r)
                      n++, (e += 4)
                    }
                  }
                  return e
                }
                ;(e.encode = function (t) {
                  for (var e = new Uint8Array(o(t)), n = 0, r = 0; r < t.length; r++) {
                    var i = t.charCodeAt(r)
                    i < 128
                      ? (e[n++] = i)
                      : i < 2048
                      ? ((e[n++] = 192 | (i >> 6)), (e[n++] = 128 | (63 & i)))
                      : i < 55296
                      ? ((e[n++] = 224 | (i >> 12)), (e[n++] = 128 | ((i >> 6) & 63)), (e[n++] = 128 | (63 & i)))
                      : (r++,
                        (i = (1023 & i) << 10),
                        (i |= 1023 & t.charCodeAt(r)),
                        (i += 65536),
                        (e[n++] = 240 | (i >> 18)),
                        (e[n++] = 128 | ((i >> 12) & 63)),
                        (e[n++] = 128 | ((i >> 6) & 63)),
                        (e[n++] = 128 | (63 & i)))
                  }
                  return e
                }),
                  (e.encodedLength = o),
                  (e.decode = function (t) {
                    for (var e = [], n = 0; n < t.length; n++) {
                      var r = t[n]
                      if (128 & r) {
                        var o = void 0
                        if (r < 224) {
                          if (n >= t.length) throw new Error(i)
                          if (128 != (192 & (s = t[++n]))) throw new Error(i)
                          ;(r = ((31 & r) << 6) | (63 & s)), (o = 128)
                        } else if (r < 240) {
                          if (n >= t.length - 1) throw new Error(i)
                          var s = t[++n],
                            c = t[++n]
                          if (128 != (192 & s) || 128 != (192 & c)) throw new Error(i)
                          ;(r = ((15 & r) << 12) | ((63 & s) << 6) | (63 & c)), (o = 2048)
                        } else {
                          if (!(r < 248)) throw new Error(i)
                          if (n >= t.length - 2) throw new Error(i)
                          ;(s = t[++n]), (c = t[++n])
                          var a = t[++n]
                          if (128 != (192 & s) || 128 != (192 & c) || 128 != (192 & a)) throw new Error(i)
                          ;(r = ((15 & r) << 18) | ((63 & s) << 12) | ((63 & c) << 6) | (63 & a)), (o = 65536)
                        }
                        if (r < o || (r >= 55296 && r <= 57343)) throw new Error(i)
                        if (r >= 65536) {
                          if (r > 1114111) throw new Error(i)
                          ;(r -= 65536), e.push(String.fromCharCode(55296 | (r >> 10))), (r = 56320 | (1023 & r))
                        }
                      }
                      e.push(String.fromCharCode(r))
                    }
                    return e.join('')
                  })
              },
              function (t, e, n) {
                t.exports = n(3).default
              },
              function (t, e, n) {
                'use strict'
                n.r(e)
                for (
                  var r,
                    i = (function () {
                      function t(t, e) {
                        ;(this.lastId = 0), (this.prefix = t), (this.name = e)
                      }
                      return (
                        (t.prototype.create = function (t) {
                          this.lastId++
                          var e = this.lastId,
                            n = this.prefix + e,
                            r = this.name + '[' + e + ']',
                            i = !1,
                            o = function () {
                              i || (t.apply(null, arguments), (i = !0))
                            }
                          return (this[e] = o), { number: e, id: n, name: r, callback: o }
                        }),
                        (t.prototype.remove = function (t) {
                          delete this[t.number]
                        }),
                        t
                      )
                    })(),
                    o = new i('_pusher_script_', 'Pusher.ScriptReceivers'),
                    s = {
                      VERSION: '7.0.3',
                      PROTOCOL: 7,
                      wsPort: 80,
                      wssPort: 443,
                      wsPath: '',
                      httpHost: 'sockjs.pusher.com',
                      httpPort: 80,
                      httpsPort: 443,
                      httpPath: '/pusher',
                      stats_host: 'stats.pusher.com',
                      authEndpoint: '/pusher/auth',
                      authTransport: 'ajax',
                      activityTimeout: 12e4,
                      pongTimeout: 3e4,
                      unavailableTimeout: 1e4,
                      cluster: 'mt1',
                      cdn_http: 'http://js.pusher.com',
                      cdn_https: 'https://js.pusher.com',
                      dependency_suffix: ''
                    },
                    c = (function () {
                      function t(t) {
                        ;(this.options = t), (this.receivers = t.receivers || o), (this.loading = {})
                      }
                      return (
                        (t.prototype.load = function (t, e, n) {
                          var r = this
                          if (r.loading[t] && r.loading[t].length > 0) r.loading[t].push(n)
                          else {
                            r.loading[t] = [n]
                            var i = ke.createScriptRequest(r.getPath(t, e)),
                              o = r.receivers.create(function (e) {
                                if ((r.receivers.remove(o), r.loading[t])) {
                                  var n = r.loading[t]
                                  delete r.loading[t]
                                  for (
                                    var s = function (t) {
                                        t || i.cleanup()
                                      },
                                      c = 0;
                                    c < n.length;
                                    c++
                                  )
                                    n[c](e, s)
                                }
                              })
                            i.send(o)
                          }
                        }),
                        (t.prototype.getRoot = function (t) {
                          var e = ke.getDocument().location.protocol
                          return ((t && t.useTLS) || 'https:' === e ? this.options.cdn_https : this.options.cdn_http).replace(/\/*$/, '') + '/' + this.options.version
                        }),
                        (t.prototype.getPath = function (t, e) {
                          return this.getRoot(e) + '/' + t + this.options.suffix + '.js'
                        }),
                        t
                      )
                    })(),
                    a = new i('_pusher_dependencies', 'Pusher.DependenciesReceivers'),
                    u = new c({ cdn_http: s.cdn_http, cdn_https: s.cdn_https, version: s.VERSION, suffix: s.dependency_suffix, receivers: a }),
                    h = {
                      baseUrl: 'https://pusher.com',
                      urls: {
                        authenticationEndpoint: { path: '/docs/authenticating_users' },
                        javascriptQuickStart: { path: '/docs/javascript_quick_start' },
                        triggeringClientEvents: { path: '/docs/client_api_guide/client_events#trigger-events' },
                        encryptedChannelSupport: { fullUrl: 'https://github.com/pusher/pusher-js/tree/cc491015371a4bde5743d1c87a0fbac0feb53195#encrypted-channel-support' }
                      }
                    },
                    l = function (t) {
                      var e,
                        n = h.urls[t]
                      return n ? (n.fullUrl ? (e = n.fullUrl) : n.path && (e = h.baseUrl + n.path), e ? 'See: ' + e : '') : ''
                    },
                    p =
                      ((r = function (t, e) {
                        return (r =
                          Object.setPrototypeOf ||
                          ({ __proto__: [] } instanceof Array &&
                            function (t, e) {
                              t.__proto__ = e
                            }) ||
                          function (t, e) {
                            for (var n in e) e.hasOwnProperty(n) && (t[n] = e[n])
                          })(t, e)
                      }),
                      function (t, e) {
                        function n() {
                          this.constructor = t
                        }
                        r(t, e), (t.prototype = null === e ? Object.create(e) : ((n.prototype = e.prototype), new n()))
                      }),
                    f = (function (t) {
                      function e(e) {
                        var n = this.constructor,
                          r = t.call(this, e) || this
                        return Object.setPrototypeOf(r, n.prototype), r
                      }
                      return p(e, t), e
                    })(Error),
                    d = (function (t) {
                      function e(e) {
                        var n = this.constructor,
                          r = t.call(this, e) || this
                        return Object.setPrototypeOf(r, n.prototype), r
                      }
                      return p(e, t), e
                    })(Error),
                    y = (function (t) {
                      function e(e) {
                        var n = this.constructor,
                          r = t.call(this, e) || this
                        return Object.setPrototypeOf(r, n.prototype), r
                      }
                      return p(e, t), e
                    })(Error),
                    v = (function (t) {
                      function e(e) {
                        var n = this.constructor,
                          r = t.call(this, e) || this
                        return Object.setPrototypeOf(r, n.prototype), r
                      }
                      return p(e, t), e
                    })(Error),
                    g = (function (t) {
                      function e(e) {
                        var n = this.constructor,
                          r = t.call(this, e) || this
                        return Object.setPrototypeOf(r, n.prototype), r
                      }
                      return p(e, t), e
                    })(Error),
                    b = (function (t) {
                      function e(e) {
                        var n = this.constructor,
                          r = t.call(this, e) || this
                        return Object.setPrototypeOf(r, n.prototype), r
                      }
                      return p(e, t), e
                    })(Error),
                    m = (function (t) {
                      function e(e) {
                        var n = this.constructor,
                          r = t.call(this, e) || this
                        return Object.setPrototypeOf(r, n.prototype), r
                      }
                      return p(e, t), e
                    })(Error),
                    w = (function (t) {
                      function e(e, n) {
                        var r = this.constructor,
                          i = t.call(this, n) || this
                        return (i.status = e), Object.setPrototypeOf(i, r.prototype), i
                      }
                      return p(e, t), e
                    })(Error),
                    k = function (t, e, n) {
                      var r,
                        i = this
                      for (var o in ((r = ke.createXHR()).open('POST', i.options.authEndpoint, !0),
                      r.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded'),
                      this.authOptions.headers))
                        r.setRequestHeader(o, this.authOptions.headers[o])
                      return (
                        (r.onreadystatechange = function () {
                          if (4 === r.readyState)
                            if (200 === r.status) {
                              var t = void 0,
                                e = !1
                              try {
                                ;(t = JSON.parse(r.responseText)), (e = !0)
                              } catch (t) {
                                n(new w(200, 'JSON returned from auth endpoint was invalid, yet status code was 200. Data was: ' + r.responseText), { auth: '' })
                              }
                              e && n(null, t)
                            } else {
                              var o = l('authenticationEndpoint')
                              n(
                                new w(
                                  r.status,
                                  'Unable to retrieve auth string from auth endpoint - received status: ' +
                                    r.status +
                                    ' from ' +
                                    i.options.authEndpoint +
                                    '. Clients must be authenticated to join private or presence channels. ' +
                                    o
                                ),
                                { auth: '' }
                              )
                            }
                        }),
                        r.send(this.composeQuery(e)),
                        r
                      )
                    },
                    _ = String.fromCharCode,
                    S = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/',
                    T = {},
                    C = 0,
                    O = S.length;
                  C < O;
                  C++
                )
                  T[S.charAt(C)] = C
                var P = function (t) {
                    var e = t.charCodeAt(0)
                    return e < 128 ? t : e < 2048 ? _(192 | (e >>> 6)) + _(128 | (63 & e)) : _(224 | ((e >>> 12) & 15)) + _(128 | ((e >>> 6) & 63)) + _(128 | (63 & e))
                  },
                  E = function (t) {
                    return t.replace(/[^\x00-\x7F]/g, P)
                  },
                  L = function (t) {
                    var e = [0, 2, 1][t.length % 3],
                      n = (t.charCodeAt(0) << 16) | ((t.length > 1 ? t.charCodeAt(1) : 0) << 8) | (t.length > 2 ? t.charCodeAt(2) : 0)
                    return [S.charAt(n >>> 18), S.charAt((n >>> 12) & 63), e >= 2 ? '=' : S.charAt((n >>> 6) & 63), e >= 1 ? '=' : S.charAt(63 & n)].join('')
                  },
                  x =
                    window.btoa ||
                    function (t) {
                      return t.replace(/[\s\S]{1,3}/g, L)
                    },
                  A = (function () {
                    function t(t, e, n, r) {
                      var i = this
                      ;(this.clear = e),
                        (this.timer = t(function () {
                          i.timer && (i.timer = r(i.timer))
                        }, n))
                    }
                    return (
                      (t.prototype.isRunning = function () {
                        return null !== this.timer
                      }),
                      (t.prototype.ensureAborted = function () {
                        this.timer && (this.clear(this.timer), (this.timer = null))
                      }),
                      t
                    )
                  })(),
                  R = (function () {
                    var t = function (e, n) {
                      return (t =
                        Object.setPrototypeOf ||
                        ({ __proto__: [] } instanceof Array &&
                          function (t, e) {
                            t.__proto__ = e
                          }) ||
                        function (t, e) {
                          for (var n in e) e.hasOwnProperty(n) && (t[n] = e[n])
                        })(e, n)
                    }
                    return function (e, n) {
                      function r() {
                        this.constructor = e
                      }
                      t(e, n), (e.prototype = null === n ? Object.create(n) : ((r.prototype = n.prototype), new r()))
                    }
                  })()
                function j(t) {
                  window.clearTimeout(t)
                }
                function I(t) {
                  window.clearInterval(t)
                }
                var D = (function (t) {
                    function e(e, n) {
                      return (
                        t.call(this, setTimeout, j, e, function (t) {
                          return n(), null
                        }) || this
                      )
                    }
                    return R(e, t), e
                  })(A),
                  N = (function (t) {
                    function e(e, n) {
                      return (
                        t.call(this, setInterval, I, e, function (t) {
                          return n(), t
                        }) || this
                      )
                    }
                    return R(e, t), e
                  })(A),
                  M = {
                    now: function () {
                      return Date.now ? Date.now() : new Date().valueOf()
                    },
                    defer: function (t) {
                      return new D(0, t)
                    },
                    method: function (t) {
                      for (var e = [], n = 1; n < arguments.length; n++) e[n - 1] = arguments[n]
                      var r = Array.prototype.slice.call(arguments, 1)
                      return function (e) {
                        return e[t].apply(e, r.concat(arguments))
                      }
                    }
                  }
                function H(t) {
                  for (var e = [], n = 1; n < arguments.length; n++) e[n - 1] = arguments[n]
                  for (var r = 0; r < e.length; r++) {
                    var i = e[r]
                    for (var o in i) i[o] && i[o].constructor && i[o].constructor === Object ? (t[o] = H(t[o] || {}, i[o])) : (t[o] = i[o])
                  }
                  return t
                }
                function q() {
                  for (var t = ['Pusher'], e = 0; e < arguments.length; e++) 'string' == typeof arguments[e] ? t.push(arguments[e]) : t.push(K(arguments[e]))
                  return t.join(' : ')
                }
                function B(t, e) {
                  var n = Array.prototype.indexOf
                  if (null === t) return -1
                  if (n && t.indexOf === n) return t.indexOf(e)
                  for (var r = 0, i = t.length; r < i; r++) if (t[r] === e) return r
                  return -1
                }
                function U(t, e) {
                  for (var n in t) Object.prototype.hasOwnProperty.call(t, n) && e(t[n], n, t)
                }
                function z(t) {
                  var e = []
                  return (
                    U(t, function (t, n) {
                      e.push(n)
                    }),
                    e
                  )
                }
                function F(t, e, n) {
                  for (var r = 0; r < t.length; r++) e.call(n || window, t[r], r, t)
                }
                function X(t, e) {
                  for (var n = [], r = 0; r < t.length; r++) n.push(e(t[r], r, t, n))
                  return n
                }
                function J(t, e) {
                  e =
                    e ||
                    function (t) {
                      return !!t
                    }
                  for (var n = [], r = 0; r < t.length; r++) e(t[r], r, t, n) && n.push(t[r])
                  return n
                }
                function W(t, e) {
                  var n = {}
                  return (
                    U(t, function (r, i) {
                      ;((e && e(r, i, t, n)) || Boolean(r)) && (n[i] = r)
                    }),
                    n
                  )
                }
                function Q(t, e) {
                  for (var n = 0; n < t.length; n++) if (e(t[n], n, t)) return !0
                  return !1
                }
                function V(t) {
                  return (
                    (e = function (t) {
                      return 'object' == typeof t && (t = K(t)), encodeURIComponent(((e = t.toString()), x(E(e))))
                      var e
                    }),
                    (n = {}),
                    U(t, function (t, r) {
                      n[r] = e(t)
                    }),
                    n
                  )
                  var e, n
                }
                function G(t) {
                  var e,
                    n,
                    r = W(t, function (t) {
                      return void 0 !== t
                    })
                  return X(
                    ((e = V(r)),
                    (n = []),
                    U(e, function (t, e) {
                      n.push([e, t])
                    }),
                    n),
                    M.method('join', '=')
                  ).join('&')
                }
                function K(t) {
                  try {
                    return JSON.stringify(t)
                  } catch (r) {
                    return JSON.stringify(
                      ((e = []),
                      (n = []),
                      (function t(r, i) {
                        var o, s, c
                        switch (typeof r) {
                          case 'object':
                            if (!r) return null
                            for (o = 0; o < e.length; o += 1) if (e[o] === r) return { $ref: n[o] }
                            if ((e.push(r), n.push(i), '[object Array]' === Object.prototype.toString.apply(r)))
                              for (c = [], o = 0; o < r.length; o += 1) c[o] = t(r[o], i + '[' + o + ']')
                            else for (s in ((c = {}), r)) Object.prototype.hasOwnProperty.call(r, s) && (c[s] = t(r[s], i + '[' + JSON.stringify(s) + ']'))
                            return c
                          case 'number':
                          case 'string':
                          case 'boolean':
                            return r
                        }
                      })(t, '$'))
                    )
                  }
                  var e, n
                }
                var Y = new ((function () {
                    function t() {
                      this.globalLog = function (t) {
                        window.console && window.console.log && window.console.log(t)
                      }
                    }
                    return (
                      (t.prototype.debug = function () {
                        for (var t = [], e = 0; e < arguments.length; e++) t[e] = arguments[e]
                        this.log(this.globalLog, t)
                      }),
                      (t.prototype.warn = function () {
                        for (var t = [], e = 0; e < arguments.length; e++) t[e] = arguments[e]
                        this.log(this.globalLogWarn, t)
                      }),
                      (t.prototype.error = function () {
                        for (var t = [], e = 0; e < arguments.length; e++) t[e] = arguments[e]
                        this.log(this.globalLogError, t)
                      }),
                      (t.prototype.globalLogWarn = function (t) {
                        window.console && window.console.warn ? window.console.warn(t) : this.globalLog(t)
                      }),
                      (t.prototype.globalLogError = function (t) {
                        window.console && window.console.error ? window.console.error(t) : this.globalLogWarn(t)
                      }),
                      (t.prototype.log = function (t) {
                        for (var e = [], n = 1; n < arguments.length; n++) e[n - 1] = arguments[n]
                        var r = q.apply(this, arguments)
                        if (De.log) De.log(r)
                        else if (De.logToConsole) {
                          var i = t.bind(this)
                          i(r)
                        }
                      }),
                      t
                    )
                  })())(),
                  $ = function (t, e, n) {
                    void 0 !== this.authOptions.headers && Y.warn('To send headers with the auth request, you must use AJAX, rather than JSONP.')
                    var r = t.nextAuthCallbackID.toString()
                    t.nextAuthCallbackID++
                    var i = t.getDocument(),
                      o = i.createElement('script')
                    t.auth_callbacks[r] = function (t) {
                      n(null, t)
                    }
                    var s = "Pusher.auth_callbacks['" + r + "']"
                    o.src = this.options.authEndpoint + '?callback=' + encodeURIComponent(s) + '&' + this.composeQuery(e)
                    var c = i.getElementsByTagName('head')[0] || i.documentElement
                    c.insertBefore(o, c.firstChild)
                  },
                  Z = (function () {
                    function t(t) {
                      this.src = t
                    }
                    return (
                      (t.prototype.send = function (t) {
                        var e = this,
                          n = 'Error loading ' + e.src
                        ;(e.script = document.createElement('script')),
                          (e.script.id = t.id),
                          (e.script.src = e.src),
                          (e.script.type = 'text/javascript'),
                          (e.script.charset = 'UTF-8'),
                          e.script.addEventListener
                            ? ((e.script.onerror = function () {
                                t.callback(n)
                              }),
                              (e.script.onload = function () {
                                t.callback(null)
                              }))
                            : (e.script.onreadystatechange = function () {
                                ;('loaded' !== e.script.readyState && 'complete' !== e.script.readyState) || t.callback(null)
                              }),
                          void 0 === e.script.async && document.attachEvent && /opera/i.test(navigator.userAgent)
                            ? ((e.errorScript = document.createElement('script')),
                              (e.errorScript.id = t.id + '_error'),
                              (e.errorScript.text = t.name + "('" + n + "');"),
                              (e.script.async = e.errorScript.async = !1))
                            : (e.script.async = !0)
                        var r = document.getElementsByTagName('head')[0]
                        r.insertBefore(e.script, r.firstChild), e.errorScript && r.insertBefore(e.errorScript, e.script.nextSibling)
                      }),
                      (t.prototype.cleanup = function () {
                        this.script && ((this.script.onload = this.script.onerror = null), (this.script.onreadystatechange = null)),
                          this.script && this.script.parentNode && this.script.parentNode.removeChild(this.script),
                          this.errorScript && this.errorScript.parentNode && this.errorScript.parentNode.removeChild(this.errorScript),
                          (this.script = null),
                          (this.errorScript = null)
                      }),
                      t
                    )
                  })(),
                  tt = (function () {
                    function t(t, e) {
                      ;(this.url = t), (this.data = e)
                    }
                    return (
                      (t.prototype.send = function (t) {
                        if (!this.request) {
                          var e = G(this.data),
                            n = this.url + '/' + t.number + '?' + e
                          ;(this.request = ke.createScriptRequest(n)), this.request.send(t)
                        }
                      }),
                      (t.prototype.cleanup = function () {
                        this.request && this.request.cleanup()
                      }),
                      t
                    )
                  })(),
                  et = {
                    name: 'jsonp',
                    getAgent: function (t, e) {
                      return function (n, r) {
                        var i = 'http' + (e ? 's' : '') + '://' + (t.host || t.options.host) + t.options.path,
                          s = ke.createJSONPRequest(i, n),
                          c = ke.ScriptReceivers.create(function (e, n) {
                            o.remove(c), s.cleanup(), n && n.host && (t.host = n.host), r && r(e, n)
                          })
                        s.send(c)
                      }
                    }
                  }
                function nt(t, e, n) {
                  return t + (e.useTLS ? 's' : '') + '://' + (e.useTLS ? e.hostTLS : e.hostNonTLS) + n
                }
                function rt(t, e) {
                  return '/app/' + t + '?protocol=' + s.PROTOCOL + '&client=js&version=' + s.VERSION + (e ? '&' + e : '')
                }
                var it = {
                    getInitial: function (t, e) {
                      return nt('ws', e, (e.httpPath || '') + rt(t, 'flash=false'))
                    }
                  },
                  ot = {
                    getInitial: function (t, e) {
                      return nt('http', e, (e.httpPath || '/pusher') + rt(t))
                    }
                  },
                  st = {
                    getInitial: function (t, e) {
                      return nt('http', e, e.httpPath || '/pusher')
                    },
                    getPath: function (t, e) {
                      return rt(t)
                    }
                  },
                  ct = (function () {
                    function t() {
                      this._callbacks = {}
                    }
                    return (
                      (t.prototype.get = function (t) {
                        return this._callbacks[at(t)]
                      }),
                      (t.prototype.add = function (t, e, n) {
                        var r = at(t)
                        ;(this._callbacks[r] = this._callbacks[r] || []), this._callbacks[r].push({ fn: e, context: n })
                      }),
                      (t.prototype.remove = function (t, e, n) {
                        if (t || e || n) {
                          var r = t ? [at(t)] : z(this._callbacks)
                          e || n ? this.removeCallback(r, e, n) : this.removeAllCallbacks(r)
                        } else this._callbacks = {}
                      }),
                      (t.prototype.removeCallback = function (t, e, n) {
                        F(
                          t,
                          function (t) {
                            ;(this._callbacks[t] = J(this._callbacks[t] || [], function (t) {
                              return (e && e !== t.fn) || (n && n !== t.context)
                            })),
                              0 === this._callbacks[t].length && delete this._callbacks[t]
                          },
                          this
                        )
                      }),
                      (t.prototype.removeAllCallbacks = function (t) {
                        F(
                          t,
                          function (t) {
                            delete this._callbacks[t]
                          },
                          this
                        )
                      }),
                      t
                    )
                  })()
                function at(t) {
                  return '_' + t
                }
                var ut = (function () {
                    function t(t) {
                      ;(this.callbacks = new ct()), (this.global_callbacks = []), (this.failThrough = t)
                    }
                    return (
                      (t.prototype.bind = function (t, e, n) {
                        return this.callbacks.add(t, e, n), this
                      }),
                      (t.prototype.bind_global = function (t) {
                        return this.global_callbacks.push(t), this
                      }),
                      (t.prototype.unbind = function (t, e, n) {
                        return this.callbacks.remove(t, e, n), this
                      }),
                      (t.prototype.unbind_global = function (t) {
                        return t
                          ? ((this.global_callbacks = J(this.global_callbacks || [], function (e) {
                              return e !== t
                            })),
                            this)
                          : ((this.global_callbacks = []), this)
                      }),
                      (t.prototype.unbind_all = function () {
                        return this.unbind(), this.unbind_global(), this
                      }),
                      (t.prototype.emit = function (t, e, n) {
                        for (var r = 0; r < this.global_callbacks.length; r++) this.global_callbacks[r](t, e)
                        var i = this.callbacks.get(t),
                          o = []
                        if ((n ? o.push(e, n) : e && o.push(e), i && i.length > 0)) for (r = 0; r < i.length; r++) i[r].fn.apply(i[r].context || window, o)
                        else this.failThrough && this.failThrough(t, e)
                        return this
                      }),
                      t
                    )
                  })(),
                  ht = (function () {
                    var t = function (e, n) {
                      return (t =
                        Object.setPrototypeOf ||
                        ({ __proto__: [] } instanceof Array &&
                          function (t, e) {
                            t.__proto__ = e
                          }) ||
                        function (t, e) {
                          for (var n in e) e.hasOwnProperty(n) && (t[n] = e[n])
                        })(e, n)
                    }
                    return function (e, n) {
                      function r() {
                        this.constructor = e
                      }
                      t(e, n), (e.prototype = null === n ? Object.create(n) : ((r.prototype = n.prototype), new r()))
                    }
                  })(),
                  lt = (function (t) {
                    function e(e, n, r, i, o) {
                      var s = t.call(this) || this
                      return (
                        (s.initialize = ke.transportConnectionInitializer),
                        (s.hooks = e),
                        (s.name = n),
                        (s.priority = r),
                        (s.key = i),
                        (s.options = o),
                        (s.state = 'new'),
                        (s.timeline = o.timeline),
                        (s.activityTimeout = o.activityTimeout),
                        (s.id = s.timeline.generateUniqueID()),
                        s
                      )
                    }
                    return (
                      ht(e, t),
                      (e.prototype.handlesActivityChecks = function () {
                        return Boolean(this.hooks.handlesActivityChecks)
                      }),
                      (e.prototype.supportsPing = function () {
                        return Boolean(this.hooks.supportsPing)
                      }),
                      (e.prototype.connect = function () {
                        var t = this
                        if (this.socket || 'initialized' !== this.state) return !1
                        var e = this.hooks.urls.getInitial(this.key, this.options)
                        try {
                          this.socket = this.hooks.getSocket(e, this.options)
                        } catch (e) {
                          return (
                            M.defer(function () {
                              t.onError(e), t.changeState('closed')
                            }),
                            !1
                          )
                        }
                        return this.bindListeners(), Y.debug('Connecting', { transport: this.name, url: e }), this.changeState('connecting'), !0
                      }),
                      (e.prototype.close = function () {
                        return !!this.socket && (this.socket.close(), !0)
                      }),
                      (e.prototype.send = function (t) {
                        var e = this
                        return (
                          'open' === this.state &&
                          (M.defer(function () {
                            e.socket && e.socket.send(t)
                          }),
                          !0)
                        )
                      }),
                      (e.prototype.ping = function () {
                        'open' === this.state && this.supportsPing() && this.socket.ping()
                      }),
                      (e.prototype.onOpen = function () {
                        this.hooks.beforeOpen && this.hooks.beforeOpen(this.socket, this.hooks.urls.getPath(this.key, this.options)),
                          this.changeState('open'),
                          (this.socket.onopen = void 0)
                      }),
                      (e.prototype.onError = function (t) {
                        this.emit('error', { type: 'WebSocketError', error: t }), this.timeline.error(this.buildTimelineMessage({ error: t.toString() }))
                      }),
                      (e.prototype.onClose = function (t) {
                        t ? this.changeState('closed', { code: t.code, reason: t.reason, wasClean: t.wasClean }) : this.changeState('closed'),
                          this.unbindListeners(),
                          (this.socket = void 0)
                      }),
                      (e.prototype.onMessage = function (t) {
                        this.emit('message', t)
                      }),
                      (e.prototype.onActivity = function () {
                        this.emit('activity')
                      }),
                      (e.prototype.bindListeners = function () {
                        var t = this
                        ;(this.socket.onopen = function () {
                          t.onOpen()
                        }),
                          (this.socket.onerror = function (e) {
                            t.onError(e)
                          }),
                          (this.socket.onclose = function (e) {
                            t.onClose(e)
                          }),
                          (this.socket.onmessage = function (e) {
                            t.onMessage(e)
                          }),
                          this.supportsPing() &&
                            (this.socket.onactivity = function () {
                              t.onActivity()
                            })
                      }),
                      (e.prototype.unbindListeners = function () {
                        this.socket &&
                          ((this.socket.onopen = void 0),
                          (this.socket.onerror = void 0),
                          (this.socket.onclose = void 0),
                          (this.socket.onmessage = void 0),
                          this.supportsPing() && (this.socket.onactivity = void 0))
                      }),
                      (e.prototype.changeState = function (t, e) {
                        ;(this.state = t), this.timeline.info(this.buildTimelineMessage({ state: t, params: e })), this.emit(t, e)
                      }),
                      (e.prototype.buildTimelineMessage = function (t) {
                        return H({ cid: this.id }, t)
                      }),
                      e
                    )
                  })(ut),
                  pt = (function () {
                    function t(t) {
                      this.hooks = t
                    }
                    return (
                      (t.prototype.isSupported = function (t) {
                        return this.hooks.isSupported(t)
                      }),
                      (t.prototype.createConnection = function (t, e, n, r) {
                        return new lt(this.hooks, t, e, n, r)
                      }),
                      t
                    )
                  })(),
                  ft = new pt({
                    urls: it,
                    handlesActivityChecks: !1,
                    supportsPing: !1,
                    isInitialized: function () {
                      return Boolean(ke.getWebSocketAPI())
                    },
                    isSupported: function () {
                      return Boolean(ke.getWebSocketAPI())
                    },
                    getSocket: function (t) {
                      return ke.createWebSocket(t)
                    }
                  }),
                  dt = {
                    urls: ot,
                    handlesActivityChecks: !1,
                    supportsPing: !0,
                    isInitialized: function () {
                      return !0
                    }
                  },
                  yt = H(
                    {
                      getSocket: function (t) {
                        return ke.HTTPFactory.createStreamingSocket(t)
                      }
                    },
                    dt
                  ),
                  vt = H(
                    {
                      getSocket: function (t) {
                        return ke.HTTPFactory.createPollingSocket(t)
                      }
                    },
                    dt
                  ),
                  gt = {
                    isSupported: function () {
                      return ke.isXHRSupported()
                    }
                  },
                  bt = { ws: ft, xhr_streaming: new pt(H({}, yt, gt)), xhr_polling: new pt(H({}, vt, gt)) },
                  mt = new pt({
                    file: 'sockjs',
                    urls: st,
                    handlesActivityChecks: !0,
                    supportsPing: !1,
                    isSupported: function () {
                      return !0
                    },
                    isInitialized: function () {
                      return void 0 !== window.SockJS
                    },
                    getSocket: function (t, e) {
                      return new window.SockJS(t, null, { js_path: u.getPath('sockjs', { useTLS: e.useTLS }), ignore_null_origin: e.ignoreNullOrigin })
                    },
                    beforeOpen: function (t, e) {
                      t.send(JSON.stringify({ path: e }))
                    }
                  }),
                  wt = {
                    isSupported: function (t) {
                      return ke.isXDRSupported(t.useTLS)
                    }
                  },
                  kt = new pt(H({}, yt, wt)),
                  _t = new pt(H({}, vt, wt))
                ;(bt.xdr_streaming = kt), (bt.xdr_polling = _t), (bt.sockjs = mt)
                var St = bt,
                  Tt = (function () {
                    var t = function (e, n) {
                      return (t =
                        Object.setPrototypeOf ||
                        ({ __proto__: [] } instanceof Array &&
                          function (t, e) {
                            t.__proto__ = e
                          }) ||
                        function (t, e) {
                          for (var n in e) e.hasOwnProperty(n) && (t[n] = e[n])
                        })(e, n)
                    }
                    return function (e, n) {
                      function r() {
                        this.constructor = e
                      }
                      t(e, n), (e.prototype = null === n ? Object.create(n) : ((r.prototype = n.prototype), new r()))
                    }
                  })(),
                  Ct = new ((function (t) {
                    function e() {
                      var e = t.call(this) || this,
                        n = e
                      return (
                        void 0 !== window.addEventListener &&
                          (window.addEventListener(
                            'online',
                            function () {
                              n.emit('online')
                            },
                            !1
                          ),
                          window.addEventListener(
                            'offline',
                            function () {
                              n.emit('offline')
                            },
                            !1
                          )),
                        e
                      )
                    }
                    return (
                      Tt(e, t),
                      (e.prototype.isOnline = function () {
                        return void 0 === window.navigator.onLine || window.navigator.onLine
                      }),
                      e
                    )
                  })(ut))(),
                  Ot = (function () {
                    function t(t, e, n) {
                      ;(this.manager = t), (this.transport = e), (this.minPingDelay = n.minPingDelay), (this.maxPingDelay = n.maxPingDelay), (this.pingDelay = void 0)
                    }
                    return (
                      (t.prototype.createConnection = function (t, e, n, r) {
                        var i = this
                        r = H({}, r, { activityTimeout: this.pingDelay })
                        var o = this.transport.createConnection(t, e, n, r),
                          s = null,
                          c = function () {
                            o.unbind('open', c), o.bind('closed', a), (s = M.now())
                          },
                          a = function (t) {
                            if ((o.unbind('closed', a), 1002 === t.code || 1003 === t.code)) i.manager.reportDeath()
                            else if (!t.wasClean && s) {
                              var e = M.now() - s
                              e < 2 * i.maxPingDelay && (i.manager.reportDeath(), (i.pingDelay = Math.max(e / 2, i.minPingDelay)))
                            }
                          }
                        return o.bind('open', c), o
                      }),
                      (t.prototype.isSupported = function (t) {
                        return this.manager.isAlive() && this.transport.isSupported(t)
                      }),
                      t
                    )
                  })(),
                  Pt = {
                    decodeMessage: function (t) {
                      try {
                        var e = JSON.parse(t.data),
                          n = e.data
                        if ('string' == typeof n)
                          try {
                            n = JSON.parse(e.data)
                          } catch (t) {}
                        var r = { event: e.event, channel: e.channel, data: n }
                        return e.user_id && (r.user_id = e.user_id), r
                      } catch (e) {
                        throw { type: 'MessageParseError', error: e, data: t.data }
                      }
                    },
                    encodeMessage: function (t) {
                      return JSON.stringify(t)
                    },
                    processHandshake: function (t) {
                      var e = Pt.decodeMessage(t)
                      if ('pusher:connection_established' === e.event) {
                        if (!e.data.activity_timeout) throw 'No activity timeout specified in handshake'
                        return { action: 'connected', id: e.data.socket_id, activityTimeout: 1e3 * e.data.activity_timeout }
                      }
                      if ('pusher:error' === e.event) return { action: this.getCloseAction(e.data), error: this.getCloseError(e.data) }
                      throw 'Invalid handshake'
                    },
                    getCloseAction: function (t) {
                      return t.code < 4e3
                        ? t.code >= 1002 && t.code <= 1004
                          ? 'backoff'
                          : null
                        : 4e3 === t.code
                        ? 'tls_only'
                        : t.code < 4100
                        ? 'refused'
                        : t.code < 4200
                        ? 'backoff'
                        : t.code < 4300
                        ? 'retry'
                        : 'refused'
                    },
                    getCloseError: function (t) {
                      return 1e3 !== t.code && 1001 !== t.code ? { type: 'PusherError', data: { code: t.code, message: t.reason || t.message } } : null
                    }
                  },
                  Et = Pt,
                  Lt = (function () {
                    var t = function (e, n) {
                      return (t =
                        Object.setPrototypeOf ||
                        ({ __proto__: [] } instanceof Array &&
                          function (t, e) {
                            t.__proto__ = e
                          }) ||
                        function (t, e) {
                          for (var n in e) e.hasOwnProperty(n) && (t[n] = e[n])
                        })(e, n)
                    }
                    return function (e, n) {
                      function r() {
                        this.constructor = e
                      }
                      t(e, n), (e.prototype = null === n ? Object.create(n) : ((r.prototype = n.prototype), new r()))
                    }
                  })(),
                  xt = (function (t) {
                    function e(e, n) {
                      var r = t.call(this) || this
                      return (r.id = e), (r.transport = n), (r.activityTimeout = n.activityTimeout), r.bindListeners(), r
                    }
                    return (
                      Lt(e, t),
                      (e.prototype.handlesActivityChecks = function () {
                        return this.transport.handlesActivityChecks()
                      }),
                      (e.prototype.send = function (t) {
                        return this.transport.send(t)
                      }),
                      (e.prototype.send_event = function (t, e, n) {
                        var r = { event: t, data: e }
                        return n && (r.channel = n), Y.debug('Event sent', r), this.send(Et.encodeMessage(r))
                      }),
                      (e.prototype.ping = function () {
                        this.transport.supportsPing() ? this.transport.ping() : this.send_event('pusher:ping', {})
                      }),
                      (e.prototype.close = function () {
                        this.transport.close()
                      }),
                      (e.prototype.bindListeners = function () {
                        var t = this,
                          e = {
                            message: function (e) {
                              var n
                              try {
                                n = Et.decodeMessage(e)
                              } catch (n) {
                                t.emit('error', { type: 'MessageParseError', error: n, data: e.data })
                              }
                              if (void 0 !== n) {
                                switch ((Y.debug('Event recd', n), n.event)) {
                                  case 'pusher:error':
                                    t.emit('error', { type: 'PusherError', data: n.data })
                                    break
                                  case 'pusher:ping':
                                    t.emit('ping')
                                    break
                                  case 'pusher:pong':
                                    t.emit('pong')
                                }
                                t.emit('message', n)
                              }
                            },
                            activity: function () {
                              t.emit('activity')
                            },
                            error: function (e) {
                              t.emit('error', e)
                            },
                            closed: function (e) {
                              n(), e && e.code && t.handleCloseEvent(e), (t.transport = null), t.emit('closed')
                            }
                          },
                          n = function () {
                            U(e, function (e, n) {
                              t.transport.unbind(n, e)
                            })
                          }
                        U(e, function (e, n) {
                          t.transport.bind(n, e)
                        })
                      }),
                      (e.prototype.handleCloseEvent = function (t) {
                        var e = Et.getCloseAction(t),
                          n = Et.getCloseError(t)
                        n && this.emit('error', n), e && this.emit(e, { action: e, error: n })
                      }),
                      e
                    )
                  })(ut),
                  At = (function () {
                    function t(t, e) {
                      ;(this.transport = t), (this.callback = e), this.bindListeners()
                    }
                    return (
                      (t.prototype.close = function () {
                        this.unbindListeners(), this.transport.close()
                      }),
                      (t.prototype.bindListeners = function () {
                        var t = this
                        ;(this.onMessage = function (e) {
                          var n
                          t.unbindListeners()
                          try {
                            n = Et.processHandshake(e)
                          } catch (e) {
                            return t.finish('error', { error: e }), void t.transport.close()
                          }
                          'connected' === n.action
                            ? t.finish('connected', { connection: new xt(n.id, t.transport), activityTimeout: n.activityTimeout })
                            : (t.finish(n.action, { error: n.error }), t.transport.close())
                        }),
                          (this.onClosed = function (e) {
                            t.unbindListeners()
                            var n = Et.getCloseAction(e) || 'backoff',
                              r = Et.getCloseError(e)
                            t.finish(n, { error: r })
                          }),
                          this.transport.bind('message', this.onMessage),
                          this.transport.bind('closed', this.onClosed)
                      }),
                      (t.prototype.unbindListeners = function () {
                        this.transport.unbind('message', this.onMessage), this.transport.unbind('closed', this.onClosed)
                      }),
                      (t.prototype.finish = function (t, e) {
                        this.callback(H({ transport: this.transport, action: t }, e))
                      }),
                      t
                    )
                  })(),
                  Rt = (function () {
                    function t(t, e) {
                      this.channel = t
                      var n = e.authTransport
                      if (void 0 === ke.getAuthorizers()[n]) throw "'" + n + "' is not a recognized auth transport"
                      ;(this.type = n), (this.options = e), (this.authOptions = e.auth || {})
                    }
                    return (
                      (t.prototype.composeQuery = function (t) {
                        var e = 'socket_id=' + encodeURIComponent(t) + '&channel_name=' + encodeURIComponent(this.channel.name)
                        for (var n in this.authOptions.params) e += '&' + encodeURIComponent(n) + '=' + encodeURIComponent(this.authOptions.params[n])
                        return e
                      }),
                      (t.prototype.authorize = function (e, n) {
                        ;(t.authorizers = t.authorizers || ke.getAuthorizers()), t.authorizers[this.type].call(this, ke, e, n)
                      }),
                      t
                    )
                  })(),
                  jt = (function () {
                    function t(t, e) {
                      ;(this.timeline = t), (this.options = e || {})
                    }
                    return (
                      (t.prototype.send = function (t, e) {
                        this.timeline.isEmpty() || this.timeline.send(ke.TimelineTransport.getAgent(this, t), e)
                      }),
                      t
                    )
                  })(),
                  It = (function () {
                    var t = function (e, n) {
                      return (t =
                        Object.setPrototypeOf ||
                        ({ __proto__: [] } instanceof Array &&
                          function (t, e) {
                            t.__proto__ = e
                          }) ||
                        function (t, e) {
                          for (var n in e) e.hasOwnProperty(n) && (t[n] = e[n])
                        })(e, n)
                    }
                    return function (e, n) {
                      function r() {
                        this.constructor = e
                      }
                      t(e, n), (e.prototype = null === n ? Object.create(n) : ((r.prototype = n.prototype), new r()))
                    }
                  })(),
                  Dt = (function (t) {
                    function e(e, n) {
                      var r =
                        t.call(this, function (t, n) {
                          Y.debug('No callbacks on ' + e + ' for ' + t)
                        }) || this
                      return (r.name = e), (r.pusher = n), (r.subscribed = !1), (r.subscriptionPending = !1), (r.subscriptionCancelled = !1), r
                    }
                    return (
                      It(e, t),
                      (e.prototype.authorize = function (t, e) {
                        return e(null, { auth: '' })
                      }),
                      (e.prototype.trigger = function (t, e) {
                        if (0 !== t.indexOf('client-')) throw new f("Event '" + t + "' does not start with 'client-'")
                        if (!this.subscribed) {
                          var n = l('triggeringClientEvents')
                          Y.warn("Client event triggered before channel 'subscription_succeeded' event . " + n)
                        }
                        return this.pusher.send_event(t, e, this.name)
                      }),
                      (e.prototype.disconnect = function () {
                        ;(this.subscribed = !1), (this.subscriptionPending = !1)
                      }),
                      (e.prototype.handleEvent = function (t) {
                        var e = t.event,
                          n = t.data
                        'pusher_internal:subscription_succeeded' === e ? this.handleSubscriptionSucceededEvent(t) : 0 !== e.indexOf('pusher_internal:') && this.emit(e, n, {})
                      }),
                      (e.prototype.handleSubscriptionSucceededEvent = function (t) {
                        ;(this.subscriptionPending = !1),
                          (this.subscribed = !0),
                          this.subscriptionCancelled ? this.pusher.unsubscribe(this.name) : this.emit('pusher:subscription_succeeded', t.data)
                      }),
                      (e.prototype.subscribe = function () {
                        var t = this
                        this.subscribed ||
                          ((this.subscriptionPending = !0),
                          (this.subscriptionCancelled = !1),
                          this.authorize(this.pusher.connection.socket_id, function (e, n) {
                            e
                              ? ((t.subscriptionPending = !1),
                                Y.error(e.toString()),
                                t.emit('pusher:subscription_error', Object.assign({}, { type: 'AuthError', error: e.message }, e instanceof w ? { status: e.status } : {})))
                              : t.pusher.send_event('pusher:subscribe', { auth: n.auth, channel_data: n.channel_data, channel: t.name })
                          }))
                      }),
                      (e.prototype.unsubscribe = function () {
                        ;(this.subscribed = !1), this.pusher.send_event('pusher:unsubscribe', { channel: this.name })
                      }),
                      (e.prototype.cancelSubscription = function () {
                        this.subscriptionCancelled = !0
                      }),
                      (e.prototype.reinstateSubscription = function () {
                        this.subscriptionCancelled = !1
                      }),
                      e
                    )
                  })(ut),
                  Nt = (function () {
                    var t = function (e, n) {
                      return (t =
                        Object.setPrototypeOf ||
                        ({ __proto__: [] } instanceof Array &&
                          function (t, e) {
                            t.__proto__ = e
                          }) ||
                        function (t, e) {
                          for (var n in e) e.hasOwnProperty(n) && (t[n] = e[n])
                        })(e, n)
                    }
                    return function (e, n) {
                      function r() {
                        this.constructor = e
                      }
                      t(e, n), (e.prototype = null === n ? Object.create(n) : ((r.prototype = n.prototype), new r()))
                    }
                  })(),
                  Mt = (function (t) {
                    function e() {
                      return (null !== t && t.apply(this, arguments)) || this
                    }
                    return (
                      Nt(e, t),
                      (e.prototype.authorize = function (t, e) {
                        return Vt.createAuthorizer(this, this.pusher.config).authorize(t, e)
                      }),
                      e
                    )
                  })(Dt),
                  Ht = (function () {
                    function t() {
                      this.reset()
                    }
                    return (
                      (t.prototype.get = function (t) {
                        return Object.prototype.hasOwnProperty.call(this.members, t) ? { id: t, info: this.members[t] } : null
                      }),
                      (t.prototype.each = function (t) {
                        var e = this
                        U(this.members, function (n, r) {
                          t(e.get(r))
                        })
                      }),
                      (t.prototype.setMyID = function (t) {
                        this.myID = t
                      }),
                      (t.prototype.onSubscription = function (t) {
                        ;(this.members = t.presence.hash), (this.count = t.presence.count), (this.me = this.get(this.myID))
                      }),
                      (t.prototype.addMember = function (t) {
                        return null === this.get(t.user_id) && this.count++, (this.members[t.user_id] = t.user_info), this.get(t.user_id)
                      }),
                      (t.prototype.removeMember = function (t) {
                        var e = this.get(t.user_id)
                        return e && (delete this.members[t.user_id], this.count--), e
                      }),
                      (t.prototype.reset = function () {
                        ;(this.members = {}), (this.count = 0), (this.myID = null), (this.me = null)
                      }),
                      t
                    )
                  })(),
                  qt = (function () {
                    var t = function (e, n) {
                      return (t =
                        Object.setPrototypeOf ||
                        ({ __proto__: [] } instanceof Array &&
                          function (t, e) {
                            t.__proto__ = e
                          }) ||
                        function (t, e) {
                          for (var n in e) e.hasOwnProperty(n) && (t[n] = e[n])
                        })(e, n)
                    }
                    return function (e, n) {
                      function r() {
                        this.constructor = e
                      }
                      t(e, n), (e.prototype = null === n ? Object.create(n) : ((r.prototype = n.prototype), new r()))
                    }
                  })(),
                  Bt = (function (t) {
                    function e(e, n) {
                      var r = t.call(this, e, n) || this
                      return (r.members = new Ht()), r
                    }
                    return (
                      qt(e, t),
                      (e.prototype.authorize = function (e, n) {
                        var r = this
                        t.prototype.authorize.call(this, e, function (t, e) {
                          if (!t) {
                            if (void 0 === (e = e).channel_data) {
                              var i = l('authenticationEndpoint')
                              return Y.error("Invalid auth response for channel '" + r.name + "',expected 'channel_data' field. " + i), void n('Invalid auth response')
                            }
                            var o = JSON.parse(e.channel_data)
                            r.members.setMyID(o.user_id)
                          }
                          n(t, e)
                        })
                      }),
                      (e.prototype.handleEvent = function (t) {
                        var e = t.event
                        if (0 === e.indexOf('pusher_internal:')) this.handleInternalEvent(t)
                        else {
                          var n = t.data,
                            r = {}
                          t.user_id && (r.user_id = t.user_id), this.emit(e, n, r)
                        }
                      }),
                      (e.prototype.handleInternalEvent = function (t) {
                        var e = t.event,
                          n = t.data
                        switch (e) {
                          case 'pusher_internal:subscription_succeeded':
                            this.handleSubscriptionSucceededEvent(t)
                            break
                          case 'pusher_internal:member_added':
                            var r = this.members.addMember(n)
                            this.emit('pusher:member_added', r)
                            break
                          case 'pusher_internal:member_removed':
                            var i = this.members.removeMember(n)
                            i && this.emit('pusher:member_removed', i)
                        }
                      }),
                      (e.prototype.handleSubscriptionSucceededEvent = function (t) {
                        ;(this.subscriptionPending = !1),
                          (this.subscribed = !0),
                          this.subscriptionCancelled
                            ? this.pusher.unsubscribe(this.name)
                            : (this.members.onSubscription(t.data), this.emit('pusher:subscription_succeeded', this.members))
                      }),
                      (e.prototype.disconnect = function () {
                        this.members.reset(), t.prototype.disconnect.call(this)
                      }),
                      e
                    )
                  })(Mt),
                  Ut = n(1),
                  zt = n(0),
                  Ft = (function () {
                    var t = function (e, n) {
                      return (t =
                        Object.setPrototypeOf ||
                        ({ __proto__: [] } instanceof Array &&
                          function (t, e) {
                            t.__proto__ = e
                          }) ||
                        function (t, e) {
                          for (var n in e) e.hasOwnProperty(n) && (t[n] = e[n])
                        })(e, n)
                    }
                    return function (e, n) {
                      function r() {
                        this.constructor = e
                      }
                      t(e, n), (e.prototype = null === n ? Object.create(n) : ((r.prototype = n.prototype), new r()))
                    }
                  })(),
                  Xt = (function (t) {
                    function e(e, n, r) {
                      var i = t.call(this, e, n) || this
                      return (i.key = null), (i.nacl = r), i
                    }
                    return (
                      Ft(e, t),
                      (e.prototype.authorize = function (e, n) {
                        var r = this
                        t.prototype.authorize.call(this, e, function (t, e) {
                          if (t) n(t, e)
                          else {
                            var i = e.shared_secret
                            i
                              ? ((r.key = Object(zt.decode)(i)), delete e.shared_secret, n(null, e))
                              : n(new Error('No shared_secret key in auth payload for encrypted channel: ' + r.name), null)
                          }
                        })
                      }),
                      (e.prototype.trigger = function (t, e) {
                        throw new g('Client events are not currently supported for encrypted channels')
                      }),
                      (e.prototype.handleEvent = function (e) {
                        var n = e.event,
                          r = e.data
                        0 !== n.indexOf('pusher_internal:') && 0 !== n.indexOf('pusher:') ? this.handleEncryptedEvent(n, r) : t.prototype.handleEvent.call(this, e)
                      }),
                      (e.prototype.handleEncryptedEvent = function (t, e) {
                        var n = this
                        if (this.key)
                          if (e.ciphertext && e.nonce) {
                            var r = Object(zt.decode)(e.ciphertext)
                            if (r.length < this.nacl.secretbox.overheadLength)
                              Y.error('Expected encrypted event ciphertext length to be ' + this.nacl.secretbox.overheadLength + ', got: ' + r.length)
                            else {
                              var i = Object(zt.decode)(e.nonce)
                              if (i.length < this.nacl.secretbox.nonceLength)
                                Y.error('Expected encrypted event nonce length to be ' + this.nacl.secretbox.nonceLength + ', got: ' + i.length)
                              else {
                                var o = this.nacl.secretbox.open(r, i, this.key)
                                if (null === o)
                                  return (
                                    Y.debug('Failed to decrypt an event, probably because it was encrypted with a different key. Fetching a new key from the authEndpoint...'),
                                    void this.authorize(this.pusher.connection.socket_id, function (e, s) {
                                      e
                                        ? Y.error('Failed to make a request to the authEndpoint: ' + s + '. Unable to fetch new key, so dropping encrypted event')
                                        : null !== (o = n.nacl.secretbox.open(r, i, n.key))
                                        ? n.emit(t, n.getDataToEmit(o))
                                        : Y.error('Failed to decrypt event with new key. Dropping encrypted event')
                                    })
                                  )
                                this.emit(t, this.getDataToEmit(o))
                              }
                            }
                          } else Y.error('Unexpected format for encrypted event, expected object with `ciphertext` and `nonce` fields, got: ' + e)
                        else Y.debug('Received encrypted event before key has been retrieved from the authEndpoint')
                      }),
                      (e.prototype.getDataToEmit = function (t) {
                        var e = Object(Ut.decode)(t)
                        try {
                          return JSON.parse(e)
                        } catch (t) {
                          return e
                        }
                      }),
                      e
                    )
                  })(Mt),
                  Jt = (function () {
                    var t = function (e, n) {
                      return (t =
                        Object.setPrototypeOf ||
                        ({ __proto__: [] } instanceof Array &&
                          function (t, e) {
                            t.__proto__ = e
                          }) ||
                        function (t, e) {
                          for (var n in e) e.hasOwnProperty(n) && (t[n] = e[n])
                        })(e, n)
                    }
                    return function (e, n) {
                      function r() {
                        this.constructor = e
                      }
                      t(e, n), (e.prototype = null === n ? Object.create(n) : ((r.prototype = n.prototype), new r()))
                    }
                  })(),
                  Wt = (function (t) {
                    function e(e, n) {
                      var r = t.call(this) || this
                      ;(r.state = 'initialized'),
                        (r.connection = null),
                        (r.key = e),
                        (r.options = n),
                        (r.timeline = r.options.timeline),
                        (r.usingTLS = r.options.useTLS),
                        (r.errorCallbacks = r.buildErrorCallbacks()),
                        (r.connectionCallbacks = r.buildConnectionCallbacks(r.errorCallbacks)),
                        (r.handshakeCallbacks = r.buildHandshakeCallbacks(r.errorCallbacks))
                      var i = ke.getNetwork()
                      return (
                        i.bind('online', function () {
                          r.timeline.info({ netinfo: 'online' }), ('connecting' !== r.state && 'unavailable' !== r.state) || r.retryIn(0)
                        }),
                        i.bind('offline', function () {
                          r.timeline.info({ netinfo: 'offline' }), r.connection && r.sendActivityCheck()
                        }),
                        r.updateStrategy(),
                        r
                      )
                    }
                    return (
                      Jt(e, t),
                      (e.prototype.connect = function () {
                        this.connection ||
                          this.runner ||
                          (this.strategy.isSupported() ? (this.updateState('connecting'), this.startConnecting(), this.setUnavailableTimer()) : this.updateState('failed'))
                      }),
                      (e.prototype.send = function (t) {
                        return !!this.connection && this.connection.send(t)
                      }),
                      (e.prototype.send_event = function (t, e, n) {
                        return !!this.connection && this.connection.send_event(t, e, n)
                      }),
                      (e.prototype.disconnect = function () {
                        this.disconnectInternally(), this.updateState('disconnected')
                      }),
                      (e.prototype.isUsingTLS = function () {
                        return this.usingTLS
                      }),
                      (e.prototype.startConnecting = function () {
                        var t = this,
                          e = function (n, r) {
                            n
                              ? (t.runner = t.strategy.connect(0, e))
                              : 'error' === r.action
                              ? (t.emit('error', { type: 'HandshakeError', error: r.error }), t.timeline.error({ handshakeError: r.error }))
                              : (t.abortConnecting(), t.handshakeCallbacks[r.action](r))
                          }
                        this.runner = this.strategy.connect(0, e)
                      }),
                      (e.prototype.abortConnecting = function () {
                        this.runner && (this.runner.abort(), (this.runner = null))
                      }),
                      (e.prototype.disconnectInternally = function () {
                        this.abortConnecting(), this.clearRetryTimer(), this.clearUnavailableTimer(), this.connection && this.abandonConnection().close()
                      }),
                      (e.prototype.updateStrategy = function () {
                        this.strategy = this.options.getStrategy({ key: this.key, timeline: this.timeline, useTLS: this.usingTLS })
                      }),
                      (e.prototype.retryIn = function (t) {
                        var e = this
                        this.timeline.info({ action: 'retry', delay: t }),
                          t > 0 && this.emit('connecting_in', Math.round(t / 1e3)),
                          (this.retryTimer = new D(t || 0, function () {
                            e.disconnectInternally(), e.connect()
                          }))
                      }),
                      (e.prototype.clearRetryTimer = function () {
                        this.retryTimer && (this.retryTimer.ensureAborted(), (this.retryTimer = null))
                      }),
                      (e.prototype.setUnavailableTimer = function () {
                        var t = this
                        this.unavailableTimer = new D(this.options.unavailableTimeout, function () {
                          t.updateState('unavailable')
                        })
                      }),
                      (e.prototype.clearUnavailableTimer = function () {
                        this.unavailableTimer && this.unavailableTimer.ensureAborted()
                      }),
                      (e.prototype.sendActivityCheck = function () {
                        var t = this
                        this.stopActivityCheck(),
                          this.connection.ping(),
                          (this.activityTimer = new D(this.options.pongTimeout, function () {
                            t.timeline.error({ pong_timed_out: t.options.pongTimeout }), t.retryIn(0)
                          }))
                      }),
                      (e.prototype.resetActivityCheck = function () {
                        var t = this
                        this.stopActivityCheck(),
                          this.connection &&
                            !this.connection.handlesActivityChecks() &&
                            (this.activityTimer = new D(this.activityTimeout, function () {
                              t.sendActivityCheck()
                            }))
                      }),
                      (e.prototype.stopActivityCheck = function () {
                        this.activityTimer && this.activityTimer.ensureAborted()
                      }),
                      (e.prototype.buildConnectionCallbacks = function (t) {
                        var e = this
                        return H({}, t, {
                          message: function (t) {
                            e.resetActivityCheck(), e.emit('message', t)
                          },
                          ping: function () {
                            e.send_event('pusher:pong', {})
                          },
                          activity: function () {
                            e.resetActivityCheck()
                          },
                          error: function (t) {
                            e.emit('error', t)
                          },
                          closed: function () {
                            e.abandonConnection(), e.shouldRetry() && e.retryIn(1e3)
                          }
                        })
                      }),
                      (e.prototype.buildHandshakeCallbacks = function (t) {
                        var e = this
                        return H({}, t, {
                          connected: function (t) {
                            ;(e.activityTimeout = Math.min(e.options.activityTimeout, t.activityTimeout, t.connection.activityTimeout || 1 / 0)),
                              e.clearUnavailableTimer(),
                              e.setConnection(t.connection),
                              (e.socket_id = e.connection.id),
                              e.updateState('connected', { socket_id: e.socket_id })
                          }
                        })
                      }),
                      (e.prototype.buildErrorCallbacks = function () {
                        var t = this,
                          e = function (e) {
                            return function (n) {
                              n.error && t.emit('error', { type: 'WebSocketError', error: n.error }), e(n)
                            }
                          }
                        return {
                          tls_only: e(function () {
                            ;(t.usingTLS = !0), t.updateStrategy(), t.retryIn(0)
                          }),
                          refused: e(function () {
                            t.disconnect()
                          }),
                          backoff: e(function () {
                            t.retryIn(1e3)
                          }),
                          retry: e(function () {
                            t.retryIn(0)
                          })
                        }
                      }),
                      (e.prototype.setConnection = function (t) {
                        for (var e in ((this.connection = t), this.connectionCallbacks)) this.connection.bind(e, this.connectionCallbacks[e])
                        this.resetActivityCheck()
                      }),
                      (e.prototype.abandonConnection = function () {
                        if (this.connection) {
                          for (var t in (this.stopActivityCheck(), this.connectionCallbacks)) this.connection.unbind(t, this.connectionCallbacks[t])
                          var e = this.connection
                          return (this.connection = null), e
                        }
                      }),
                      (e.prototype.updateState = function (t, e) {
                        var n = this.state
                        if (((this.state = t), n !== t)) {
                          var r = t
                          'connected' === r && (r += ' with new socket ID ' + e.socket_id),
                            Y.debug('State changed', n + ' -> ' + r),
                            this.timeline.info({ state: t, params: e }),
                            this.emit('state_change', { previous: n, current: t }),
                            this.emit(t, e)
                        }
                      }),
                      (e.prototype.shouldRetry = function () {
                        return 'connecting' === this.state || 'connected' === this.state
                      }),
                      e
                    )
                  })(ut),
                  Qt = (function () {
                    function t() {
                      this.channels = {}
                    }
                    return (
                      (t.prototype.add = function (t, e) {
                        return (
                          this.channels[t] ||
                            (this.channels[t] = (function (t, e) {
                              if (0 === t.indexOf('private-encrypted-')) {
                                if (e.config.nacl) return Vt.createEncryptedChannel(t, e, e.config.nacl)
                                var n = 'Tried to subscribe to a private-encrypted- channel but no nacl implementation available',
                                  r = l('encryptedChannelSupport')
                                throw new g(n + '. ' + r)
                              }
                              return 0 === t.indexOf('private-')
                                ? Vt.createPrivateChannel(t, e)
                                : 0 === t.indexOf('presence-')
                                ? Vt.createPresenceChannel(t, e)
                                : Vt.createChannel(t, e)
                            })(t, e)),
                          this.channels[t]
                        )
                      }),
                      (t.prototype.all = function () {
                        return (function (t) {
                          var e = []
                          return (
                            U(t, function (t) {
                              e.push(t)
                            }),
                            e
                          )
                        })(this.channels)
                      }),
                      (t.prototype.find = function (t) {
                        return this.channels[t]
                      }),
                      (t.prototype.remove = function (t) {
                        var e = this.channels[t]
                        return delete this.channels[t], e
                      }),
                      (t.prototype.disconnect = function () {
                        U(this.channels, function (t) {
                          t.disconnect()
                        })
                      }),
                      t
                    )
                  })(),
                  Vt = {
                    createChannels: function () {
                      return new Qt()
                    },
                    createConnectionManager: function (t, e) {
                      return new Wt(t, e)
                    },
                    createChannel: function (t, e) {
                      return new Dt(t, e)
                    },
                    createPrivateChannel: function (t, e) {
                      return new Mt(t, e)
                    },
                    createPresenceChannel: function (t, e) {
                      return new Bt(t, e)
                    },
                    createEncryptedChannel: function (t, e, n) {
                      return new Xt(t, e, n)
                    },
                    createTimelineSender: function (t, e) {
                      return new jt(t, e)
                    },
                    createAuthorizer: function (t, e) {
                      return e.authorizer ? e.authorizer(t, e) : new Rt(t, e)
                    },
                    createHandshake: function (t, e) {
                      return new At(t, e)
                    },
                    createAssistantToTheTransportManager: function (t, e, n) {
                      return new Ot(t, e, n)
                    }
                  },
                  Gt = (function () {
                    function t(t) {
                      ;(this.options = t || {}), (this.livesLeft = this.options.lives || 1 / 0)
                    }
                    return (
                      (t.prototype.getAssistant = function (t) {
                        return Vt.createAssistantToTheTransportManager(this, t, { minPingDelay: this.options.minPingDelay, maxPingDelay: this.options.maxPingDelay })
                      }),
                      (t.prototype.isAlive = function () {
                        return this.livesLeft > 0
                      }),
                      (t.prototype.reportDeath = function () {
                        this.livesLeft -= 1
                      }),
                      t
                    )
                  })(),
                  Kt = (function () {
                    function t(t, e) {
                      ;(this.strategies = t), (this.loop = Boolean(e.loop)), (this.failFast = Boolean(e.failFast)), (this.timeout = e.timeout), (this.timeoutLimit = e.timeoutLimit)
                    }
                    return (
                      (t.prototype.isSupported = function () {
                        return Q(this.strategies, M.method('isSupported'))
                      }),
                      (t.prototype.connect = function (t, e) {
                        var n = this,
                          r = this.strategies,
                          i = 0,
                          o = this.timeout,
                          s = null,
                          c = function (a, u) {
                            u
                              ? e(null, u)
                              : ((i += 1),
                                n.loop && (i %= r.length),
                                i < r.length
                                  ? (o && ((o *= 2), n.timeoutLimit && (o = Math.min(o, n.timeoutLimit))), (s = n.tryStrategy(r[i], t, { timeout: o, failFast: n.failFast }, c)))
                                  : e(!0))
                          }
                        return (
                          (s = this.tryStrategy(r[i], t, { timeout: o, failFast: this.failFast }, c)),
                          {
                            abort: function () {
                              s.abort()
                            },
                            forceMinPriority: function (e) {
                              ;(t = e), s && s.forceMinPriority(e)
                            }
                          }
                        )
                      }),
                      (t.prototype.tryStrategy = function (t, e, n, r) {
                        var i = null,
                          o = null
                        return (
                          n.timeout > 0 &&
                            (i = new D(n.timeout, function () {
                              o.abort(), r(!0)
                            })),
                          (o = t.connect(e, function (t, e) {
                            ;(t && i && i.isRunning() && !n.failFast) || (i && i.ensureAborted(), r(t, e))
                          })),
                          {
                            abort: function () {
                              i && i.ensureAborted(), o.abort()
                            },
                            forceMinPriority: function (t) {
                              o.forceMinPriority(t)
                            }
                          }
                        )
                      }),
                      t
                    )
                  })(),
                  Yt = (function () {
                    function t(t) {
                      this.strategies = t
                    }
                    return (
                      (t.prototype.isSupported = function () {
                        return Q(this.strategies, M.method('isSupported'))
                      }),
                      (t.prototype.connect = function (t, e) {
                        return (function (t, e, n) {
                          var r = X(t, function (t, r, i, o) {
                            return t.connect(e, n(r, o))
                          })
                          return {
                            abort: function () {
                              F(r, $t)
                            },
                            forceMinPriority: function (t) {
                              F(r, function (e) {
                                e.forceMinPriority(t)
                              })
                            }
                          }
                        })(this.strategies, t, function (t, n) {
                          return function (r, i) {
                            ;(n[t].error = r),
                              r
                                ? (function (t) {
                                    return (function (t, e) {
                                      for (var n = 0; n < t.length; n++) if (!e(t[n], n, t)) return !1
                                      return !0
                                    })(t, function (t) {
                                      return Boolean(t.error)
                                    })
                                  })(n) && e(!0)
                                : (F(n, function (t) {
                                    t.forceMinPriority(i.transport.priority)
                                  }),
                                  e(null, i))
                          }
                        })
                      }),
                      t
                    )
                  })()
                function $t(t) {
                  t.error || t.aborted || (t.abort(), (t.aborted = !0))
                }
                var Zt = (function () {
                  function t(t, e, n) {
                    ;(this.strategy = t), (this.transports = e), (this.ttl = n.ttl || 18e5), (this.usingTLS = n.useTLS), (this.timeline = n.timeline)
                  }
                  return (
                    (t.prototype.isSupported = function () {
                      return this.strategy.isSupported()
                    }),
                    (t.prototype.connect = function (t, e) {
                      var n = this.usingTLS,
                        r = (function (t) {
                          var e = ke.getLocalStorage()
                          if (e)
                            try {
                              var n = e[te(t)]
                              if (n) return JSON.parse(n)
                            } catch (e) {
                              ee(t)
                            }
                          return null
                        })(n),
                        i = [this.strategy]
                      if (r && r.timestamp + this.ttl >= M.now()) {
                        var o = this.transports[r.transport]
                        o && (this.timeline.info({ cached: !0, transport: r.transport, latency: r.latency }), i.push(new Kt([o], { timeout: 2 * r.latency + 1e3, failFast: !0 })))
                      }
                      var s = M.now(),
                        c = i.pop().connect(t, function r(o, a) {
                          o
                            ? (ee(n), i.length > 0 ? ((s = M.now()), (c = i.pop().connect(t, r))) : e(o))
                            : ((function (t, e, n) {
                                var r = ke.getLocalStorage()
                                if (r)
                                  try {
                                    r[te(t)] = K({ timestamp: M.now(), transport: e, latency: n })
                                  } catch (t) {}
                              })(n, a.transport.name, M.now() - s),
                              e(null, a))
                        })
                      return {
                        abort: function () {
                          c.abort()
                        },
                        forceMinPriority: function (e) {
                          ;(t = e), c && c.forceMinPriority(e)
                        }
                      }
                    }),
                    t
                  )
                })()
                function te(t) {
                  return 'pusherTransport' + (t ? 'TLS' : 'NonTLS')
                }
                function ee(t) {
                  var e = ke.getLocalStorage()
                  if (e)
                    try {
                      delete e[te(t)]
                    } catch (t) {}
                }
                var ne = (function () {
                    function t(t, e) {
                      var n = e.delay
                      ;(this.strategy = t), (this.options = { delay: n })
                    }
                    return (
                      (t.prototype.isSupported = function () {
                        return this.strategy.isSupported()
                      }),
                      (t.prototype.connect = function (t, e) {
                        var n,
                          r = this.strategy,
                          i = new D(this.options.delay, function () {
                            n = r.connect(t, e)
                          })
                        return {
                          abort: function () {
                            i.ensureAborted(), n && n.abort()
                          },
                          forceMinPriority: function (e) {
                            ;(t = e), n && n.forceMinPriority(e)
                          }
                        }
                      }),
                      t
                    )
                  })(),
                  re = (function () {
                    function t(t, e, n) {
                      ;(this.test = t), (this.trueBranch = e), (this.falseBranch = n)
                    }
                    return (
                      (t.prototype.isSupported = function () {
                        return (this.test() ? this.trueBranch : this.falseBranch).isSupported()
                      }),
                      (t.prototype.connect = function (t, e) {
                        return (this.test() ? this.trueBranch : this.falseBranch).connect(t, e)
                      }),
                      t
                    )
                  })(),
                  ie = (function () {
                    function t(t) {
                      this.strategy = t
                    }
                    return (
                      (t.prototype.isSupported = function () {
                        return this.strategy.isSupported()
                      }),
                      (t.prototype.connect = function (t, e) {
                        var n = this.strategy.connect(t, function (t, r) {
                          r && n.abort(), e(t, r)
                        })
                        return n
                      }),
                      t
                    )
                  })()
                function oe(t) {
                  return function () {
                    return t.isSupported()
                  }
                }
                var se,
                  ce = function (t, e, n) {
                    var r = {}
                    function i(e, i, o, s, c) {
                      var a = n(t, e, i, o, s, c)
                      return (r[e] = a), a
                    }
                    var o,
                      s = Object.assign({}, e, { hostNonTLS: t.wsHost + ':' + t.wsPort, hostTLS: t.wsHost + ':' + t.wssPort, httpPath: t.wsPath }),
                      c = Object.assign({}, s, { useTLS: !0 }),
                      a = Object.assign({}, e, { hostNonTLS: t.httpHost + ':' + t.httpPort, hostTLS: t.httpHost + ':' + t.httpsPort, httpPath: t.httpPath }),
                      u = { loop: !0, timeout: 15e3, timeoutLimit: 6e4 },
                      h = new Gt({ lives: 2, minPingDelay: 1e4, maxPingDelay: t.activityTimeout }),
                      l = new Gt({ lives: 2, minPingDelay: 1e4, maxPingDelay: t.activityTimeout }),
                      p = i('ws', 'ws', 3, s, h),
                      f = i('wss', 'ws', 3, c, h),
                      d = i('sockjs', 'sockjs', 1, a),
                      y = i('xhr_streaming', 'xhr_streaming', 1, a, l),
                      v = i('xdr_streaming', 'xdr_streaming', 1, a, l),
                      g = i('xhr_polling', 'xhr_polling', 1, a),
                      b = i('xdr_polling', 'xdr_polling', 1, a),
                      m = new Kt([p], u),
                      w = new Kt([f], u),
                      k = new Kt([d], u),
                      _ = new Kt([new re(oe(y), y, v)], u),
                      S = new Kt([new re(oe(g), g, b)], u),
                      T = new Kt([new re(oe(_), new Yt([_, new ne(S, { delay: 4e3 })]), S)], u),
                      C = new re(oe(T), T, k)
                    return (
                      (o = e.useTLS ? new Yt([m, new ne(C, { delay: 2e3 })]) : new Yt([m, new ne(w, { delay: 2e3 }), new ne(C, { delay: 5e3 })])),
                      new Zt(new ie(new re(oe(p), o, C)), r, { ttl: 18e5, timeline: e.timeline, useTLS: e.useTLS })
                    )
                  },
                  ae = {
                    getRequest: function (t) {
                      var e = new window.XDomainRequest()
                      return (
                        (e.ontimeout = function () {
                          t.emit('error', new d()), t.close()
                        }),
                        (e.onerror = function (e) {
                          t.emit('error', e), t.close()
                        }),
                        (e.onprogress = function () {
                          e.responseText && e.responseText.length > 0 && t.onChunk(200, e.responseText)
                        }),
                        (e.onload = function () {
                          e.responseText && e.responseText.length > 0 && t.onChunk(200, e.responseText), t.emit('finished', 200), t.close()
                        }),
                        e
                      )
                    },
                    abortRequest: function (t) {
                      ;(t.ontimeout = t.onerror = t.onprogress = t.onload = null), t.abort()
                    }
                  },
                  ue = (function () {
                    var t = function (e, n) {
                      return (t =
                        Object.setPrototypeOf ||
                        ({ __proto__: [] } instanceof Array &&
                          function (t, e) {
                            t.__proto__ = e
                          }) ||
                        function (t, e) {
                          for (var n in e) e.hasOwnProperty(n) && (t[n] = e[n])
                        })(e, n)
                    }
                    return function (e, n) {
                      function r() {
                        this.constructor = e
                      }
                      t(e, n), (e.prototype = null === n ? Object.create(n) : ((r.prototype = n.prototype), new r()))
                    }
                  })(),
                  he = (function (t) {
                    function e(e, n, r) {
                      var i = t.call(this) || this
                      return (i.hooks = e), (i.method = n), (i.url = r), i
                    }
                    return (
                      ue(e, t),
                      (e.prototype.start = function (t) {
                        var e = this
                        ;(this.position = 0),
                          (this.xhr = this.hooks.getRequest(this)),
                          (this.unloader = function () {
                            e.close()
                          }),
                          ke.addUnloadListener(this.unloader),
                          this.xhr.open(this.method, this.url, !0),
                          this.xhr.setRequestHeader && this.xhr.setRequestHeader('Content-Type', 'application/json'),
                          this.xhr.send(t)
                      }),
                      (e.prototype.close = function () {
                        this.unloader && (ke.removeUnloadListener(this.unloader), (this.unloader = null)), this.xhr && (this.hooks.abortRequest(this.xhr), (this.xhr = null))
                      }),
                      (e.prototype.onChunk = function (t, e) {
                        for (;;) {
                          var n = this.advanceBuffer(e)
                          if (!n) break
                          this.emit('chunk', { status: t, data: n })
                        }
                        this.isBufferTooLong(e) && this.emit('buffer_too_long')
                      }),
                      (e.prototype.advanceBuffer = function (t) {
                        var e = t.slice(this.position),
                          n = e.indexOf('\n')
                        return -1 !== n ? ((this.position += n + 1), e.slice(0, n)) : null
                      }),
                      (e.prototype.isBufferTooLong = function (t) {
                        return this.position === t.length && t.length > 262144
                      }),
                      e
                    )
                  })(ut)
                !(function (t) {
                  ;(t[(t.CONNECTING = 0)] = 'CONNECTING'), (t[(t.OPEN = 1)] = 'OPEN'), (t[(t.CLOSED = 3)] = 'CLOSED')
                })(se || (se = {}))
                var le = se,
                  pe = 1
                function fe(t) {
                  var e = -1 === t.indexOf('?') ? '?' : '&'
                  return t + e + 't=' + +new Date() + '&n=' + pe++
                }
                function de(t) {
                  return Math.floor(Math.random() * t)
                }
                var ye,
                  ve = (function () {
                    function t(t, e) {
                      ;(this.hooks = t),
                        (this.session =
                          de(1e3) +
                          '/' +
                          (function (t) {
                            for (var e = [], n = 0; n < t; n++) e.push(de(32).toString(32))
                            return e.join('')
                          })(8)),
                        (this.location = (function (t) {
                          var e = /([^\?]*)\/*(\??.*)/.exec(t)
                          return { base: e[1], queryString: e[2] }
                        })(e)),
                        (this.readyState = le.CONNECTING),
                        this.openStream()
                    }
                    return (
                      (t.prototype.send = function (t) {
                        return this.sendRaw(JSON.stringify([t]))
                      }),
                      (t.prototype.ping = function () {
                        this.hooks.sendHeartbeat(this)
                      }),
                      (t.prototype.close = function (t, e) {
                        this.onClose(t, e, !0)
                      }),
                      (t.prototype.sendRaw = function (t) {
                        if (this.readyState !== le.OPEN) return !1
                        try {
                          return ke.createSocketRequest('POST', fe(((e = this.location), (n = this.session), e.base + '/' + n + '/xhr_send'))).start(t), !0
                        } catch (t) {
                          return !1
                        }
                        var e, n
                      }),
                      (t.prototype.reconnect = function () {
                        this.closeStream(), this.openStream()
                      }),
                      (t.prototype.onClose = function (t, e, n) {
                        this.closeStream(), (this.readyState = le.CLOSED), this.onclose && this.onclose({ code: t, reason: e, wasClean: n })
                      }),
                      (t.prototype.onChunk = function (t) {
                        var e
                        if (200 === t.status)
                          switch ((this.readyState === le.OPEN && this.onActivity(), t.data.slice(0, 1))) {
                            case 'o':
                              ;(e = JSON.parse(t.data.slice(1) || '{}')), this.onOpen(e)
                              break
                            case 'a':
                              e = JSON.parse(t.data.slice(1) || '[]')
                              for (var n = 0; n < e.length; n++) this.onEvent(e[n])
                              break
                            case 'm':
                              ;(e = JSON.parse(t.data.slice(1) || 'null')), this.onEvent(e)
                              break
                            case 'h':
                              this.hooks.onHeartbeat(this)
                              break
                            case 'c':
                              ;(e = JSON.parse(t.data.slice(1) || '[]')), this.onClose(e[0], e[1], !0)
                          }
                      }),
                      (t.prototype.onOpen = function (t) {
                        var e, n, r
                        this.readyState === le.CONNECTING
                          ? (t &&
                              t.hostname &&
                              (this.location.base = ((e = this.location.base), (n = t.hostname), (r = /(https?:\/\/)([^\/:]+)((\/|:)?.*)/.exec(e))[1] + n + r[3])),
                            (this.readyState = le.OPEN),
                            this.onopen && this.onopen())
                          : this.onClose(1006, 'Server lost session', !0)
                      }),
                      (t.prototype.onEvent = function (t) {
                        this.readyState === le.OPEN && this.onmessage && this.onmessage({ data: t })
                      }),
                      (t.prototype.onActivity = function () {
                        this.onactivity && this.onactivity()
                      }),
                      (t.prototype.onError = function (t) {
                        this.onerror && this.onerror(t)
                      }),
                      (t.prototype.openStream = function () {
                        var t = this
                        ;(this.stream = ke.createSocketRequest('POST', fe(this.hooks.getReceiveURL(this.location, this.session)))),
                          this.stream.bind('chunk', function (e) {
                            t.onChunk(e)
                          }),
                          this.stream.bind('finished', function (e) {
                            t.hooks.onFinished(t, e)
                          }),
                          this.stream.bind('buffer_too_long', function () {
                            t.reconnect()
                          })
                        try {
                          this.stream.start()
                        } catch (e) {
                          M.defer(function () {
                            t.onError(e), t.onClose(1006, 'Could not start streaming', !1)
                          })
                        }
                      }),
                      (t.prototype.closeStream = function () {
                        this.stream && (this.stream.unbind_all(), this.stream.close(), (this.stream = null))
                      }),
                      t
                    )
                  })(),
                  ge = {
                    getReceiveURL: function (t, e) {
                      return t.base + '/' + e + '/xhr_streaming' + t.queryString
                    },
                    onHeartbeat: function (t) {
                      t.sendRaw('[]')
                    },
                    sendHeartbeat: function (t) {
                      t.sendRaw('[]')
                    },
                    onFinished: function (t, e) {
                      t.onClose(1006, 'Connection interrupted (' + e + ')', !1)
                    }
                  },
                  be = {
                    getReceiveURL: function (t, e) {
                      return t.base + '/' + e + '/xhr' + t.queryString
                    },
                    onHeartbeat: function () {},
                    sendHeartbeat: function (t) {
                      t.sendRaw('[]')
                    },
                    onFinished: function (t, e) {
                      200 === e ? t.reconnect() : t.onClose(1006, 'Connection interrupted (' + e + ')', !1)
                    }
                  },
                  me = {
                    getRequest: function (t) {
                      var e = new (ke.getXHRAPI())()
                      return (
                        (e.onreadystatechange = e.onprogress =
                          function () {
                            switch (e.readyState) {
                              case 3:
                                e.responseText && e.responseText.length > 0 && t.onChunk(e.status, e.responseText)
                                break
                              case 4:
                                e.responseText && e.responseText.length > 0 && t.onChunk(e.status, e.responseText), t.emit('finished', e.status), t.close()
                            }
                          }),
                        e
                      )
                    },
                    abortRequest: function (t) {
                      ;(t.onreadystatechange = null), t.abort()
                    }
                  },
                  we = {
                    createStreamingSocket: function (t) {
                      return this.createSocket(ge, t)
                    },
                    createPollingSocket: function (t) {
                      return this.createSocket(be, t)
                    },
                    createSocket: function (t, e) {
                      return new ve(t, e)
                    },
                    createXHR: function (t, e) {
                      return this.createRequest(me, t, e)
                    },
                    createRequest: function (t, e, n) {
                      return new he(t, e, n)
                    },
                    createXDR: function (t, e) {
                      return this.createRequest(ae, t, e)
                    }
                  },
                  ke = {
                    nextAuthCallbackID: 1,
                    auth_callbacks: {},
                    ScriptReceivers: o,
                    DependenciesReceivers: a,
                    getDefaultStrategy: ce,
                    Transports: St,
                    transportConnectionInitializer: function () {
                      var t = this
                      t.timeline.info(t.buildTimelineMessage({ transport: t.name + (t.options.useTLS ? 's' : '') })),
                        t.hooks.isInitialized()
                          ? t.changeState('initialized')
                          : t.hooks.file
                          ? (t.changeState('initializing'),
                            u.load(t.hooks.file, { useTLS: t.options.useTLS }, function (e, n) {
                              t.hooks.isInitialized() ? (t.changeState('initialized'), n(!0)) : (e && t.onError(e), t.onClose(), n(!1))
                            }))
                          : t.onClose()
                    },
                    HTTPFactory: we,
                    TimelineTransport: et,
                    getXHRAPI: function () {
                      return window.XMLHttpRequest
                    },
                    getWebSocketAPI: function () {
                      return window.WebSocket || window.MozWebSocket
                    },
                    setup: function (t) {
                      var e = this
                      window.Pusher = t
                      var n = function () {
                        e.onDocumentBody(t.ready)
                      }
                      window.JSON ? n() : u.load('json2', {}, n)
                    },
                    getDocument: function () {
                      return document
                    },
                    getProtocol: function () {
                      return this.getDocument().location.protocol
                    },
                    getAuthorizers: function () {
                      return { ajax: k, jsonp: $ }
                    },
                    onDocumentBody: function (t) {
                      var e = this
                      document.body
                        ? t()
                        : setTimeout(function () {
                            e.onDocumentBody(t)
                          }, 0)
                    },
                    createJSONPRequest: function (t, e) {
                      return new tt(t, e)
                    },
                    createScriptRequest: function (t) {
                      return new Z(t)
                    },
                    getLocalStorage: function () {
                      try {
                        return window.localStorage
                      } catch (t) {
                        return
                      }
                    },
                    createXHR: function () {
                      return this.getXHRAPI() ? this.createXMLHttpRequest() : this.createMicrosoftXHR()
                    },
                    createXMLHttpRequest: function () {
                      return new (this.getXHRAPI())()
                    },
                    createMicrosoftXHR: function () {
                      return new ActiveXObject('Microsoft.XMLHTTP')
                    },
                    getNetwork: function () {
                      return Ct
                    },
                    createWebSocket: function (t) {
                      return new (this.getWebSocketAPI())(t)
                    },
                    createSocketRequest: function (t, e) {
                      if (this.isXHRSupported()) return this.HTTPFactory.createXHR(t, e)
                      if (this.isXDRSupported(0 === e.indexOf('https:'))) return this.HTTPFactory.createXDR(t, e)
                      throw 'Cross-origin HTTP requests are not supported'
                    },
                    isXHRSupported: function () {
                      var t = this.getXHRAPI()
                      return Boolean(t) && void 0 !== new t().withCredentials
                    },
                    isXDRSupported: function (t) {
                      var e = t ? 'https:' : 'http:',
                        n = this.getProtocol()
                      return Boolean(window.XDomainRequest) && n === e
                    },
                    addUnloadListener: function (t) {
                      void 0 !== window.addEventListener ? window.addEventListener('unload', t, !1) : void 0 !== window.attachEvent && window.attachEvent('onunload', t)
                    },
                    removeUnloadListener: function (t) {
                      void 0 !== window.addEventListener ? window.removeEventListener('unload', t, !1) : void 0 !== window.detachEvent && window.detachEvent('onunload', t)
                    }
                  }
                !(function (t) {
                  ;(t[(t.ERROR = 3)] = 'ERROR'), (t[(t.INFO = 6)] = 'INFO'), (t[(t.DEBUG = 7)] = 'DEBUG')
                })(ye || (ye = {}))
                var _e = ye,
                  Se = (function () {
                    function t(t, e, n) {
                      ;(this.key = t), (this.session = e), (this.events = []), (this.options = n || {}), (this.sent = 0), (this.uniqueID = 0)
                    }
                    return (
                      (t.prototype.log = function (t, e) {
                        t <= this.options.level &&
                          (this.events.push(H({}, e, { timestamp: M.now() })), this.options.limit && this.events.length > this.options.limit && this.events.shift())
                      }),
                      (t.prototype.error = function (t) {
                        this.log(_e.ERROR, t)
                      }),
                      (t.prototype.info = function (t) {
                        this.log(_e.INFO, t)
                      }),
                      (t.prototype.debug = function (t) {
                        this.log(_e.DEBUG, t)
                      }),
                      (t.prototype.isEmpty = function () {
                        return 0 === this.events.length
                      }),
                      (t.prototype.send = function (t, e) {
                        var n = this,
                          r = H(
                            {
                              session: this.session,
                              bundle: this.sent + 1,
                              key: this.key,
                              lib: 'js',
                              version: this.options.version,
                              cluster: this.options.cluster,
                              features: this.options.features,
                              timeline: this.events
                            },
                            this.options.params
                          )
                        return (
                          (this.events = []),
                          t(r, function (t, r) {
                            t || n.sent++, e && e(t, r)
                          }),
                          !0
                        )
                      }),
                      (t.prototype.generateUniqueID = function () {
                        return this.uniqueID++, this.uniqueID
                      }),
                      t
                    )
                  })(),
                  Te = (function () {
                    function t(t, e, n, r) {
                      ;(this.name = t), (this.priority = e), (this.transport = n), (this.options = r || {})
                    }
                    return (
                      (t.prototype.isSupported = function () {
                        return this.transport.isSupported({ useTLS: this.options.useTLS })
                      }),
                      (t.prototype.connect = function (t, e) {
                        var n = this
                        if (!this.isSupported()) return Ce(new m(), e)
                        if (this.priority < t) return Ce(new y(), e)
                        var r = !1,
                          i = this.transport.createConnection(this.name, this.priority, this.options.key, this.options),
                          o = null,
                          s = function () {
                            i.unbind('initialized', s), i.connect()
                          },
                          c = function () {
                            o = Vt.createHandshake(i, function (t) {
                              ;(r = !0), h(), e(null, t)
                            })
                          },
                          a = function (t) {
                            h(), e(t)
                          },
                          u = function () {
                            var t
                            h(), (t = K(i)), e(new v(t))
                          },
                          h = function () {
                            i.unbind('initialized', s), i.unbind('open', c), i.unbind('error', a), i.unbind('closed', u)
                          }
                        return (
                          i.bind('initialized', s),
                          i.bind('open', c),
                          i.bind('error', a),
                          i.bind('closed', u),
                          i.initialize(),
                          {
                            abort: function () {
                              r || (h(), o ? o.close() : i.close())
                            },
                            forceMinPriority: function (t) {
                              r || (n.priority < t && (o ? o.close() : i.close()))
                            }
                          }
                        )
                      }),
                      t
                    )
                  })()
                function Ce(t, e) {
                  return (
                    M.defer(function () {
                      e(t)
                    }),
                    { abort: function () {}, forceMinPriority: function () {} }
                  )
                }
                var Oe = ke.Transports,
                  Pe = function (t, e, n, r, i, o) {
                    var s,
                      c = Oe[n]
                    if (!c) throw new b(n)
                    return (
                      (t.enabledTransports && -1 === B(t.enabledTransports, e)) || (t.disabledTransports && -1 !== B(t.disabledTransports, e))
                        ? (s = Ee)
                        : ((i = Object.assign({ ignoreNullOrigin: t.ignoreNullOrigin }, i)), (s = new Te(e, r, o ? o.getAssistant(c) : c, i))),
                      s
                    )
                  },
                  Ee = {
                    isSupported: function () {
                      return !1
                    },
                    connect: function (t, e) {
                      var n = M.defer(function () {
                        e(new m())
                      })
                      return {
                        abort: function () {
                          n.ensureAborted()
                        },
                        forceMinPriority: function () {}
                      }
                    }
                  }
                function Le(t) {
                  return t.httpHost ? t.httpHost : t.cluster ? 'sockjs-' + t.cluster + '.pusher.com' : s.httpHost
                }
                function xe(t) {
                  return t.wsHost ? t.wsHost : t.cluster ? Ae(t.cluster) : Ae(s.cluster)
                }
                function Ae(t) {
                  return 'ws-' + t + '.pusher.com'
                }
                function Re(t) {
                  return 'https:' === ke.getProtocol() || !1 !== t.forceTLS
                }
                function je(t) {
                  return 'enableStats' in t ? t.enableStats : 'disableStats' in t && !t.disableStats
                }
                var Ie = (function () {
                    function t(e, n) {
                      var r,
                        i,
                        o = this
                      if (
                        ((function (t) {
                          if (null == t) throw 'You must pass your app key when you instantiate Pusher.'
                        })(e),
                        !(n = n || {}).cluster && !n.wsHost && !n.httpHost)
                      ) {
                        var c = l('javascriptQuickStart')
                        Y.warn('You should always specify a cluster when connecting. ' + c)
                      }
                      'disableStats' in n && Y.warn('The disableStats option is deprecated in favor of enableStats'),
                        (this.key = e),
                        (this.config =
                          ((i = {
                            activityTimeout: (r = n).activityTimeout || s.activityTimeout,
                            authEndpoint: r.authEndpoint || s.authEndpoint,
                            authTransport: r.authTransport || s.authTransport,
                            cluster: r.cluster || s.cluster,
                            httpPath: r.httpPath || s.httpPath,
                            httpPort: r.httpPort || s.httpPort,
                            httpsPort: r.httpsPort || s.httpsPort,
                            pongTimeout: r.pongTimeout || s.pongTimeout,
                            statsHost: r.statsHost || s.stats_host,
                            unavailableTimeout: r.unavailableTimeout || s.unavailableTimeout,
                            wsPath: r.wsPath || s.wsPath,
                            wsPort: r.wsPort || s.wsPort,
                            wssPort: r.wssPort || s.wssPort,
                            enableStats: je(r),
                            httpHost: Le(r),
                            useTLS: Re(r),
                            wsHost: xe(r)
                          }),
                          'auth' in r && (i.auth = r.auth),
                          'authorizer' in r && (i.authorizer = r.authorizer),
                          'disabledTransports' in r && (i.disabledTransports = r.disabledTransports),
                          'enabledTransports' in r && (i.enabledTransports = r.enabledTransports),
                          'ignoreNullOrigin' in r && (i.ignoreNullOrigin = r.ignoreNullOrigin),
                          'timelineParams' in r && (i.timelineParams = r.timelineParams),
                          'nacl' in r && (i.nacl = r.nacl),
                          i)),
                        (this.channels = Vt.createChannels()),
                        (this.global_emitter = new ut()),
                        (this.sessionID = Math.floor(1e9 * Math.random())),
                        (this.timeline = new Se(this.key, this.sessionID, {
                          cluster: this.config.cluster,
                          features: t.getClientFeatures(),
                          params: this.config.timelineParams || {},
                          limit: 50,
                          level: _e.INFO,
                          version: s.VERSION
                        })),
                        this.config.enableStats &&
                          (this.timelineSender = Vt.createTimelineSender(this.timeline, { host: this.config.statsHost, path: '/timeline/v2/' + ke.TimelineTransport.name })),
                        (this.connection = Vt.createConnectionManager(this.key, {
                          getStrategy: function (t) {
                            return ke.getDefaultStrategy(o.config, t, Pe)
                          },
                          timeline: this.timeline,
                          activityTimeout: this.config.activityTimeout,
                          pongTimeout: this.config.pongTimeout,
                          unavailableTimeout: this.config.unavailableTimeout,
                          useTLS: Boolean(this.config.useTLS)
                        })),
                        this.connection.bind('connected', function () {
                          o.subscribeAll(), o.timelineSender && o.timelineSender.send(o.connection.isUsingTLS())
                        }),
                        this.connection.bind('message', function (t) {
                          var e = 0 === t.event.indexOf('pusher_internal:')
                          if (t.channel) {
                            var n = o.channel(t.channel)
                            n && n.handleEvent(t)
                          }
                          e || o.global_emitter.emit(t.event, t.data)
                        }),
                        this.connection.bind('connecting', function () {
                          o.channels.disconnect()
                        }),
                        this.connection.bind('disconnected', function () {
                          o.channels.disconnect()
                        }),
                        this.connection.bind('error', function (t) {
                          Y.warn(t)
                        }),
                        t.instances.push(this),
                        this.timeline.info({ instances: t.instances.length }),
                        t.isReady && this.connect()
                    }
                    return (
                      (t.ready = function () {
                        t.isReady = !0
                        for (var e = 0, n = t.instances.length; e < n; e++) t.instances[e].connect()
                      }),
                      (t.getClientFeatures = function () {
                        return z(
                          W({ ws: ke.Transports.ws }, function (t) {
                            return t.isSupported({})
                          })
                        )
                      }),
                      (t.prototype.channel = function (t) {
                        return this.channels.find(t)
                      }),
                      (t.prototype.allChannels = function () {
                        return this.channels.all()
                      }),
                      (t.prototype.connect = function () {
                        if ((this.connection.connect(), this.timelineSender && !this.timelineSenderTimer)) {
                          var t = this.connection.isUsingTLS(),
                            e = this.timelineSender
                          this.timelineSenderTimer = new N(6e4, function () {
                            e.send(t)
                          })
                        }
                      }),
                      (t.prototype.disconnect = function () {
                        this.connection.disconnect(), this.timelineSenderTimer && (this.timelineSenderTimer.ensureAborted(), (this.timelineSenderTimer = null))
                      }),
                      (t.prototype.bind = function (t, e, n) {
                        return this.global_emitter.bind(t, e, n), this
                      }),
                      (t.prototype.unbind = function (t, e, n) {
                        return this.global_emitter.unbind(t, e, n), this
                      }),
                      (t.prototype.bind_global = function (t) {
                        return this.global_emitter.bind_global(t), this
                      }),
                      (t.prototype.unbind_global = function (t) {
                        return this.global_emitter.unbind_global(t), this
                      }),
                      (t.prototype.unbind_all = function (t) {
                        return this.global_emitter.unbind_all(), this
                      }),
                      (t.prototype.subscribeAll = function () {
                        var t
                        for (t in this.channels.channels) this.channels.channels.hasOwnProperty(t) && this.subscribe(t)
                      }),
                      (t.prototype.subscribe = function (t) {
                        var e = this.channels.add(t, this)
                        return (
                          e.subscriptionPending && e.subscriptionCancelled
                            ? e.reinstateSubscription()
                            : e.subscriptionPending || 'connected' !== this.connection.state || e.subscribe(),
                          e
                        )
                      }),
                      (t.prototype.unsubscribe = function (t) {
                        var e = this.channels.find(t)
                        e && e.subscriptionPending ? e.cancelSubscription() : (e = this.channels.remove(t)) && e.subscribed && e.unsubscribe()
                      }),
                      (t.prototype.send_event = function (t, e, n) {
                        return this.connection.send_event(t, e, n)
                      }),
                      (t.prototype.shouldUseTLS = function () {
                        return this.config.useTLS
                      }),
                      (t.instances = []),
                      (t.isReady = !1),
                      (t.logToConsole = !1),
                      (t.Runtime = ke),
                      (t.ScriptReceivers = ke.ScriptReceivers),
                      (t.DependenciesReceivers = ke.DependenciesReceivers),
                      (t.auth_callbacks = ke.auth_callbacks),
                      t
                    )
                  })(),
                  De = (e.default = Ie)
                ke.setup(Ie)
              }
            ])
          }),
          (t.exports = e())
      }
    },
    e = {}
  function n(r) {
    var i = e[r]
    if (void 0 !== i) return i.exports
    var o = (e[r] = { exports: {} })
    return t[r](o, o.exports, n), o.exports
  }
  ;(() => {
    'use strict'
    function t(t, e) {
      if (!(t instanceof e)) throw new TypeError('Cannot call a class as a function')
    }
    function e(t, e) {
      for (var n = 0; n < e.length; n++) {
        var r = e[n]
        ;(r.enumerable = r.enumerable || !1), (r.configurable = !0), 'value' in r && (r.writable = !0), Object.defineProperty(t, r.key, r)
      }
    }
    function r(t, n, r) {
      return n && e(t.prototype, n), r && e(t, r), t
    }
    function i() {
      return (i =
        Object.assign ||
        function (t) {
          for (var e = 1; e < arguments.length; e++) {
            var n = arguments[e]
            for (var r in n) Object.prototype.hasOwnProperty.call(n, r) && (t[r] = n[r])
          }
          return t
        }).apply(this, arguments)
    }
    function o(t, e) {
      if ('function' != typeof e && null !== e) throw new TypeError('Super expression must either be null or a function')
      ;(t.prototype = Object.create(e && e.prototype, { constructor: { value: t, writable: !0, configurable: !0 } })), e && c(t, e)
    }
    function s(t) {
      return (s = Object.setPrototypeOf
        ? Object.getPrototypeOf
        : function (t) {
            return t.__proto__ || Object.getPrototypeOf(t)
          })(t)
    }
    function c(t, e) {
      return (c =
        Object.setPrototypeOf ||
        function (t, e) {
          return (t.__proto__ = e), t
        })(t, e)
    }
    function a(t, e) {
      return !e || ('object' != typeof e && 'function' != typeof e)
        ? (function (t) {
            if (void 0 === t) throw new ReferenceError("this hasn't been initialised - super() hasn't been called")
            return t
          })(t)
        : e
    }
    function u(t) {
      var e = (function () {
        if ('undefined' == typeof Reflect || !Reflect.construct) return !1
        if (Reflect.construct.sham) return !1
        if ('function' == typeof Proxy) return !0
        try {
          return Date.prototype.toString.call(Reflect.construct(Date, [], function () {})), !0
        } catch (t) {
          return !1
        }
      })()
      return function () {
        var n,
          r = s(t)
        if (e) {
          var i = s(this).constructor
          n = Reflect.construct(r, arguments, i)
        } else n = r.apply(this, arguments)
        return a(this, n)
      }
    }
    var h = (function () {
        function e(n) {
          t(this, e),
            (this._defaultOptions = {
              auth: { headers: {} },
              authEndpoint: '/broadcasting/auth',
              broadcaster: 'pusher',
              csrfToken: null,
              host: null,
              key: null,
              namespace: 'App.Events'
            }),
            this.setOptions(n),
            this.connect()
        }
        return (
          r(e, [
            {
              key: 'setOptions',
              value: function (t) {
                return (this.options = i(this._defaultOptions, t)), this.csrfToken() && (this.options.auth.headers['X-CSRF-TOKEN'] = this.csrfToken()), t
              }
            },
            {
              key: 'csrfToken',
              value: function () {
                var t
                return 'undefined' != typeof window && window.Laravel && window.Laravel.csrfToken
                  ? window.Laravel.csrfToken
                  : this.options.csrfToken
                  ? this.options.csrfToken
                  : 'undefined' != typeof document && 'function' == typeof document.querySelector && (t = document.querySelector('meta[name="csrf-token"]'))
                  ? t.getAttribute('content')
                  : null
              }
            }
          ]),
          e
        )
      })(),
      l = (function () {
        function e() {
          t(this, e)
        }
        return (
          r(e, [
            {
              key: 'listenForWhisper',
              value: function (t, e) {
                return this.listen('.client-' + t, e)
              }
            },
            {
              key: 'notification',
              value: function (t) {
                return this.listen('.Illuminate\\Notifications\\Events\\BroadcastNotificationCreated', t)
              }
            },
            {
              key: 'stopListeningForWhisper',
              value: function (t, e) {
                return this.stopListening('.client-' + t, e)
              }
            }
          ]),
          e
        )
      })(),
      p = (function () {
        function e(n) {
          t(this, e), this.setNamespace(n)
        }
        return (
          r(e, [
            {
              key: 'format',
              value: function (t) {
                return '.' === t.charAt(0) || '\\' === t.charAt(0) ? t.substr(1) : (this.namespace && (t = this.namespace + '.' + t), t.replace(/\./g, '\\'))
              }
            },
            {
              key: 'setNamespace',
              value: function (t) {
                this.namespace = t
              }
            }
          ]),
          e
        )
      })(),
      f = (function (e) {
        o(i, e)
        var n = u(i)
        function i(e, r, o) {
          var s
          return t(this, i), ((s = n.call(this)).name = r), (s.pusher = e), (s.options = o), (s.eventFormatter = new p(s.options.namespace)), s.subscribe(), s
        }
        return (
          r(i, [
            {
              key: 'subscribe',
              value: function () {
                this.subscription = this.pusher.subscribe(this.name)
              }
            },
            {
              key: 'unsubscribe',
              value: function () {
                this.pusher.unsubscribe(this.name)
              }
            },
            {
              key: 'listen',
              value: function (t, e) {
                return this.on(this.eventFormatter.format(t), e), this
              }
            },
            {
              key: 'listenToAll',
              value: function (t) {
                var e = this
                return (
                  this.subscription.bind_global(function (n, r) {
                    if (!n.startsWith('pusher:')) {
                      var i = e.options.namespace.replace(/\./g, '\\'),
                        o = n.startsWith(i) ? n.substring(i.length + 1) : '.' + n
                      t(o, r)
                    }
                  }),
                  this
                )
              }
            },
            {
              key: 'stopListening',
              value: function (t, e) {
                return e ? this.subscription.unbind(this.eventFormatter.format(t), e) : this.subscription.unbind(this.eventFormatter.format(t)), this
              }
            },
            {
              key: 'stopListeningToAll',
              value: function (t) {
                return t ? this.subscription.unbind_global(t) : this.subscription.unbind_global(), this
              }
            },
            {
              key: 'subscribed',
              value: function (t) {
                return (
                  this.on('pusher:subscription_succeeded', function () {
                    t()
                  }),
                  this
                )
              }
            },
            {
              key: 'error',
              value: function (t) {
                return (
                  this.on('pusher:subscription_error', function (e) {
                    t(e)
                  }),
                  this
                )
              }
            },
            {
              key: 'on',
              value: function (t, e) {
                return this.subscription.bind(t, e), this
              }
            }
          ]),
          i
        )
      })(l),
      d = (function (e) {
        o(i, e)
        var n = u(i)
        function i() {
          return t(this, i), n.apply(this, arguments)
        }
        return (
          r(i, [
            {
              key: 'whisper',
              value: function (t, e) {
                return this.pusher.channels.channels[this.name].trigger('client-'.concat(t), e), this
              }
            }
          ]),
          i
        )
      })(f),
      y = (function (e) {
        o(i, e)
        var n = u(i)
        function i() {
          return t(this, i), n.apply(this, arguments)
        }
        return (
          r(i, [
            {
              key: 'whisper',
              value: function (t, e) {
                return this.pusher.channels.channels[this.name].trigger('client-'.concat(t), e), this
              }
            }
          ]),
          i
        )
      })(f),
      v = (function (e) {
        o(i, e)
        var n = u(i)
        function i() {
          return t(this, i), n.apply(this, arguments)
        }
        return (
          r(i, [
            {
              key: 'here',
              value: function (t) {
                return (
                  this.on('pusher:subscription_succeeded', function (e) {
                    t(
                      Object.keys(e.members).map(function (t) {
                        return e.members[t]
                      })
                    )
                  }),
                  this
                )
              }
            },
            {
              key: 'joining',
              value: function (t) {
                return (
                  this.on('pusher:member_added', function (e) {
                    t(e.info)
                  }),
                  this
                )
              }
            },
            {
              key: 'leaving',
              value: function (t) {
                return (
                  this.on('pusher:member_removed', function (e) {
                    t(e.info)
                  }),
                  this
                )
              }
            },
            {
              key: 'whisper',
              value: function (t, e) {
                return this.pusher.channels.channels[this.name].trigger('client-'.concat(t), e), this
              }
            }
          ]),
          i
        )
      })(f),
      g = (function (e) {
        o(i, e)
        var n = u(i)
        function i(e, r, o) {
          var s
          return (
            t(this, i),
            ((s = n.call(this)).events = {}),
            (s.listeners = {}),
            (s.name = r),
            (s.socket = e),
            (s.options = o),
            (s.eventFormatter = new p(s.options.namespace)),
            s.subscribe(),
            s
          )
        }
        return (
          r(i, [
            {
              key: 'subscribe',
              value: function () {
                this.socket.emit('subscribe', { channel: this.name, auth: this.options.auth || {} })
              }
            },
            {
              key: 'unsubscribe',
              value: function () {
                this.unbind(), this.socket.emit('unsubscribe', { channel: this.name, auth: this.options.auth || {} })
              }
            },
            {
              key: 'listen',
              value: function (t, e) {
                return this.on(this.eventFormatter.format(t), e), this
              }
            },
            {
              key: 'stopListening',
              value: function (t, e) {
                return this.unbindEvent(this.eventFormatter.format(t), e), this
              }
            },
            {
              key: 'subscribed',
              value: function (t) {
                return (
                  this.on('connect', function (e) {
                    t(e)
                  }),
                  this
                )
              }
            },
            {
              key: 'error',
              value: function (t) {
                return this
              }
            },
            {
              key: 'on',
              value: function (t, e) {
                var n = this
                return (
                  (this.listeners[t] = this.listeners[t] || []),
                  this.events[t] ||
                    ((this.events[t] = function (e, r) {
                      n.name === e &&
                        n.listeners[t] &&
                        n.listeners[t].forEach(function (t) {
                          return t(r)
                        })
                    }),
                    this.socket.on(t, this.events[t])),
                  this.listeners[t].push(e),
                  this
                )
              }
            },
            {
              key: 'unbind',
              value: function () {
                var t = this
                Object.keys(this.events).forEach(function (e) {
                  t.unbindEvent(e)
                })
              }
            },
            {
              key: 'unbindEvent',
              value: function (t, e) {
                ;(this.listeners[t] = this.listeners[t] || []),
                  e &&
                    (this.listeners[t] = this.listeners[t].filter(function (t) {
                      return t !== e
                    })),
                  (e && 0 !== this.listeners[t].length) || (this.events[t] && (this.socket.removeListener(t, this.events[t]), delete this.events[t]), delete this.listeners[t])
              }
            }
          ]),
          i
        )
      })(l),
      b = (function (e) {
        o(i, e)
        var n = u(i)
        function i() {
          return t(this, i), n.apply(this, arguments)
        }
        return (
          r(i, [
            {
              key: 'whisper',
              value: function (t, e) {
                return this.socket.emit('client event', { channel: this.name, event: 'client-'.concat(t), data: e }), this
              }
            }
          ]),
          i
        )
      })(g),
      m = (function (e) {
        o(i, e)
        var n = u(i)
        function i() {
          return t(this, i), n.apply(this, arguments)
        }
        return (
          r(i, [
            {
              key: 'here',
              value: function (t) {
                return (
                  this.on('presence:subscribed', function (e) {
                    t(
                      e.map(function (t) {
                        return t.user_info
                      })
                    )
                  }),
                  this
                )
              }
            },
            {
              key: 'joining',
              value: function (t) {
                return (
                  this.on('presence:joining', function (e) {
                    return t(e.user_info)
                  }),
                  this
                )
              }
            },
            {
              key: 'leaving',
              value: function (t) {
                return (
                  this.on('presence:leaving', function (e) {
                    return t(e.user_info)
                  }),
                  this
                )
              }
            }
          ]),
          i
        )
      })(b),
      w = (function (e) {
        o(i, e)
        var n = u(i)
        function i() {
          return t(this, i), n.apply(this, arguments)
        }
        return (
          r(i, [
            { key: 'subscribe', value: function () {} },
            { key: 'unsubscribe', value: function () {} },
            {
              key: 'listen',
              value: function (t, e) {
                return this
              }
            },
            {
              key: 'stopListening',
              value: function (t, e) {
                return this
              }
            },
            {
              key: 'subscribed',
              value: function (t) {
                return this
              }
            },
            {
              key: 'error',
              value: function (t) {
                return this
              }
            },
            {
              key: 'on',
              value: function (t, e) {
                return this
              }
            }
          ]),
          i
        )
      })(l),
      k = (function (e) {
        o(i, e)
        var n = u(i)
        function i() {
          return t(this, i), n.apply(this, arguments)
        }
        return (
          r(i, [
            {
              key: 'whisper',
              value: function (t, e) {
                return this
              }
            }
          ]),
          i
        )
      })(w),
      _ = (function (e) {
        o(i, e)
        var n = u(i)
        function i() {
          return t(this, i), n.apply(this, arguments)
        }
        return (
          r(i, [
            {
              key: 'here',
              value: function (t) {
                return this
              }
            },
            {
              key: 'joining',
              value: function (t) {
                return this
              }
            },
            {
              key: 'leaving',
              value: function (t) {
                return this
              }
            },
            {
              key: 'whisper',
              value: function (t, e) {
                return this
              }
            }
          ]),
          i
        )
      })(w),
      S = (function (e) {
        o(i, e)
        var n = u(i)
        function i() {
          var e
          return t(this, i), ((e = n.apply(this, arguments)).channels = {}), e
        }
        return (
          r(i, [
            {
              key: 'connect',
              value: function () {
                void 0 !== this.options.client ? (this.pusher = this.options.client) : (this.pusher = new Pusher(this.options.key, this.options))
              }
            },
            {
              key: 'listen',
              value: function (t, e, n) {
                return this.channel(t).listen(e, n)
              }
            },
            {
              key: 'channel',
              value: function (t) {
                return this.channels[t] || (this.channels[t] = new f(this.pusher, t, this.options)), this.channels[t]
              }
            },
            {
              key: 'privateChannel',
              value: function (t) {
                return this.channels['private-' + t] || (this.channels['private-' + t] = new d(this.pusher, 'private-' + t, this.options)), this.channels['private-' + t]
              }
            },
            {
              key: 'encryptedPrivateChannel',
              value: function (t) {
                return (
                  this.channels['private-encrypted-' + t] || (this.channels['private-encrypted-' + t] = new y(this.pusher, 'private-encrypted-' + t, this.options)),
                  this.channels['private-encrypted-' + t]
                )
              }
            },
            {
              key: 'presenceChannel',
              value: function (t) {
                return this.channels['presence-' + t] || (this.channels['presence-' + t] = new v(this.pusher, 'presence-' + t, this.options)), this.channels['presence-' + t]
              }
            },
            {
              key: 'leave',
              value: function (t) {
                var e = this
                ;[t, 'private-' + t, 'presence-' + t].forEach(function (t, n) {
                  e.leaveChannel(t)
                })
              }
            },
            {
              key: 'leaveChannel',
              value: function (t) {
                this.channels[t] && (this.channels[t].unsubscribe(), delete this.channels[t])
              }
            },
            {
              key: 'socketId',
              value: function () {
                return this.pusher.connection.socket_id
              }
            },
            {
              key: 'disconnect',
              value: function () {
                this.pusher.disconnect()
              }
            }
          ]),
          i
        )
      })(h),
      T = (function (e) {
        o(i, e)
        var n = u(i)
        function i() {
          var e
          return t(this, i), ((e = n.apply(this, arguments)).channels = {}), e
        }
        return (
          r(i, [
            {
              key: 'connect',
              value: function () {
                var t = this,
                  e = this.getSocketIO()
                return (
                  (this.socket = e(this.options.host, this.options)),
                  this.socket.on('reconnect', function () {
                    Object.values(t.channels).forEach(function (t) {
                      t.subscribe()
                    })
                  }),
                  this.socket
                )
              }
            },
            {
              key: 'getSocketIO',
              value: function () {
                if (void 0 !== this.options.client) return this.options.client
                if ('undefined' != typeof io) return io
                throw new Error('Socket.io client not found. Should be globally available or passed via options.client')
              }
            },
            {
              key: 'listen',
              value: function (t, e, n) {
                return this.channel(t).listen(e, n)
              }
            },
            {
              key: 'channel',
              value: function (t) {
                return this.channels[t] || (this.channels[t] = new g(this.socket, t, this.options)), this.channels[t]
              }
            },
            {
              key: 'privateChannel',
              value: function (t) {
                return this.channels['private-' + t] || (this.channels['private-' + t] = new b(this.socket, 'private-' + t, this.options)), this.channels['private-' + t]
              }
            },
            {
              key: 'presenceChannel',
              value: function (t) {
                return this.channels['presence-' + t] || (this.channels['presence-' + t] = new m(this.socket, 'presence-' + t, this.options)), this.channels['presence-' + t]
              }
            },
            {
              key: 'leave',
              value: function (t) {
                var e = this
                ;[t, 'private-' + t, 'presence-' + t].forEach(function (t) {
                  e.leaveChannel(t)
                })
              }
            },
            {
              key: 'leaveChannel',
              value: function (t) {
                this.channels[t] && (this.channels[t].unsubscribe(), delete this.channels[t])
              }
            },
            {
              key: 'socketId',
              value: function () {
                return this.socket.id
              }
            },
            {
              key: 'disconnect',
              value: function () {
                this.socket.disconnect()
              }
            }
          ]),
          i
        )
      })(h),
      C = (function (e) {
        o(i, e)
        var n = u(i)
        function i() {
          var e
          return t(this, i), ((e = n.apply(this, arguments)).channels = {}), e
        }
        return (
          r(i, [
            { key: 'connect', value: function () {} },
            {
              key: 'listen',
              value: function (t, e, n) {
                return new w()
              }
            },
            {
              key: 'channel',
              value: function (t) {
                return new w()
              }
            },
            {
              key: 'privateChannel',
              value: function (t) {
                return new k()
              }
            },
            {
              key: 'presenceChannel',
              value: function (t) {
                return new _()
              }
            },
            { key: 'leave', value: function (t) {} },
            { key: 'leaveChannel', value: function (t) {} },
            {
              key: 'socketId',
              value: function () {
                return 'fake-socket-id'
              }
            },
            { key: 'disconnect', value: function () {} }
          ]),
          i
        )
      })(h)
    const O = (function () {
      function e(n) {
        t(this, e), (this.options = n), this.connect(), this.options.withoutInterceptors || this.registerInterceptors()
      }
      return (
        r(e, [
          {
            key: 'channel',
            value: function (t) {
              return this.connector.channel(t)
            }
          },
          {
            key: 'connect',
            value: function () {
              'pusher' == this.options.broadcaster
                ? (this.connector = new S(this.options))
                : 'socket.io' == this.options.broadcaster
                ? (this.connector = new T(this.options))
                : 'null' == this.options.broadcaster
                ? (this.connector = new C(this.options))
                : 'function' == typeof this.options.broadcaster && (this.connector = new this.options.broadcaster(this.options))
            }
          },
          {
            key: 'disconnect',
            value: function () {
              this.connector.disconnect()
            }
          },
          {
            key: 'join',
            value: function (t) {
              return this.connector.presenceChannel(t)
            }
          },
          {
            key: 'leave',
            value: function (t) {
              this.connector.leave(t)
            }
          },
          {
            key: 'leaveChannel',
            value: function (t) {
              this.connector.leaveChannel(t)
            }
          },
          {
            key: 'listen',
            value: function (t, e, n) {
              return this.connector.listen(t, e, n)
            }
          },
          {
            key: 'private',
            value: function (t) {
              return this.connector.privateChannel(t)
            }
          },
          {
            key: 'encryptedPrivate',
            value: function (t) {
              return this.connector.encryptedPrivateChannel(t)
            }
          },
          {
            key: 'socketId',
            value: function () {
              return this.connector.socketId()
            }
          },
          {
            key: 'registerInterceptors',
            value: function () {
              'function' == typeof Vue && Vue.http && this.registerVueRequestInterceptor(),
                'function' == typeof axios && this.registerAxiosRequestInterceptor(),
                'function' == typeof jQuery && this.registerjQueryAjaxSetup()
            }
          },
          {
            key: 'registerVueRequestInterceptor',
            value: function () {
              var t = this
              Vue.http.interceptors.push(function (e, n) {
                t.socketId() && e.headers.set('X-Socket-ID', t.socketId()), n()
              })
            }
          },
          {
            key: 'registerAxiosRequestInterceptor',
            value: function () {
              var t = this
              axios.interceptors.request.use(function (e) {
                return t.socketId() && (e.headers['X-Socket-Id'] = t.socketId()), e
              })
            }
          },
          {
            key: 'registerjQueryAjaxSetup',
            value: function () {
              var t = this
              void 0 !== jQuery.ajax &&
                jQuery.ajaxPrefilter(function (e, n, r) {
                  t.socketId() && r.setRequestHeader('X-Socket-Id', t.socketId())
                })
            }
          }
        ]),
        e
      )
    })()
    var P = n(34155)
    ;(window.Pusher = n(86606)),
      (window.Echo = new O({
        broadcaster: 'pusher',
        key: P.env.MIX_PUSHER_APP_KEY,
        wsHost: window.location.hostname,
        wsPort: P.env.MIX_PUSHER_APP_PORT,
        disableStats: !0,
        forceTLS: !1,
        auth: { headers: { 'X-CSRF-TOKEN': token } }
      }))
  })()
})()
