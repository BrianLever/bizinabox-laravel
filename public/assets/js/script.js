!(function (t, e) {
  'use strict'
  'object' == typeof module && 'object' == typeof module.exports
    ? (module.exports = t.document
        ? e(t, !0)
        : function (t) {
            if (!t.document) throw new Error('jQuery requires a window with a document')
            return e(t)
          })
    : e(t)
})('undefined' != typeof window ? window : this, function (t, e) {
  'use strict'
  function i(t) {
    return null != t && t === t.window
  }
  var n = [],
    o = Object.getPrototypeOf,
    r = n.slice,
    s = n.flat
      ? function (t) {
          return n.flat.call(t)
        }
      : function (t) {
          return n.concat.apply([], t)
        },
    a = n.push,
    l = n.indexOf,
    c = {},
    u = c.toString,
    d = c.hasOwnProperty,
    h = d.toString,
    f = h.call(Object),
    p = {},
    g = function (t) {
      return 'function' == typeof t && 'number' != typeof t.nodeType
    },
    m = t.document,
    v = { type: !0, src: !0, nonce: !0, noModule: !0 }
  function y(t, e, i) {
    var n,
      o,
      r = (i = i || m).createElement('script')
    if (((r.text = t), e)) for (n in v) (o = e[n] || (e.getAttribute && e.getAttribute(n))) && r.setAttribute(n, o)
    i.head.appendChild(r).parentNode.removeChild(r)
  }
  function b(t) {
    return null == t ? t + '' : 'object' == typeof t || 'function' == typeof t ? c[u.call(t)] || 'object' : typeof t
  }
  var _ = '3.5.1',
    w = function (t, e) {
      return new w.fn.init(t, e)
    }
  function x(t) {
    var e = !!t && 'length' in t && t.length,
      n = b(t)
    return !g(t) && !i(t) && ('array' === n || 0 === e || ('number' == typeof e && 0 < e && e - 1 in t))
  }
  ;(w.fn = w.prototype =
    {
      jquery: _,
      constructor: w,
      length: 0,
      toArray: function () {
        return r.call(this)
      },
      get: function (t) {
        return null == t ? r.call(this) : t < 0 ? this[t + this.length] : this[t]
      },
      pushStack: function (t) {
        var e = w.merge(this.constructor(), t)
        return (e.prevObject = this), e
      },
      each: function (t) {
        return w.each(this, t)
      },
      map: function (t) {
        return this.pushStack(
          w.map(this, function (e, i) {
            return t.call(e, i, e)
          })
        )
      },
      slice: function () {
        return this.pushStack(r.apply(this, arguments))
      },
      first: function () {
        return this.eq(0)
      },
      last: function () {
        return this.eq(-1)
      },
      even: function () {
        return this.pushStack(
          w.grep(this, function (t, e) {
            return (e + 1) % 2
          })
        )
      },
      odd: function () {
        return this.pushStack(
          w.grep(this, function (t, e) {
            return e % 2
          })
        )
      },
      eq: function (t) {
        var e = this.length,
          i = +t + (t < 0 ? e : 0)
        return this.pushStack(0 <= i && i < e ? [this[i]] : [])
      },
      end: function () {
        return this.prevObject || this.constructor()
      },
      push: a,
      sort: n.sort,
      splice: n.splice
    }),
    (w.extend = w.fn.extend =
      function () {
        var t,
          e,
          i,
          n,
          o,
          r,
          s = arguments[0] || {},
          a = 1,
          l = arguments.length,
          c = !1
        for ('boolean' == typeof s && ((c = s), (s = arguments[a] || {}), a++), 'object' == typeof s || g(s) || (s = {}), a === l && ((s = this), a--); a < l; a++)
          if (null != (t = arguments[a]))
            for (e in t)
              (n = t[e]),
                '__proto__' !== e &&
                  s !== n &&
                  (c && n && (w.isPlainObject(n) || (o = Array.isArray(n)))
                    ? ((i = s[e]), (r = o && !Array.isArray(i) ? [] : o || w.isPlainObject(i) ? i : {}), (o = !1), (s[e] = w.extend(c, r, n)))
                    : void 0 !== n && (s[e] = n))
        return s
      }),
    w.extend({
      expando: 'jQuery' + (_ + Math.random()).replace(/\D/g, ''),
      isReady: !0,
      error: function (t) {
        throw new Error(t)
      },
      noop: function () {},
      isPlainObject: function (t) {
        var e, i
        return !(!t || '[object Object]' !== u.call(t) || ((e = o(t)) && ('function' != typeof (i = d.call(e, 'constructor') && e.constructor) || h.call(i) !== f)))
      },
      isEmptyObject: function (t) {
        var e
        for (e in t) return !1
        return !0
      },
      globalEval: function (t, e, i) {
        y(t, { nonce: e && e.nonce }, i)
      },
      each: function (t, e) {
        var i,
          n = 0
        if (x(t)) for (i = t.length; n < i && !1 !== e.call(t[n], n, t[n]); n++);
        else for (n in t) if (!1 === e.call(t[n], n, t[n])) break
        return t
      },
      makeArray: function (t, e) {
        var i = e || []
        return null != t && (x(Object(t)) ? w.merge(i, 'string' == typeof t ? [t] : t) : a.call(i, t)), i
      },
      inArray: function (t, e, i) {
        return null == e ? -1 : l.call(e, t, i)
      },
      merge: function (t, e) {
        for (var i = +e.length, n = 0, o = t.length; n < i; n++) t[o++] = e[n]
        return (t.length = o), t
      },
      grep: function (t, e, i) {
        for (var n = [], o = 0, r = t.length, s = !i; o < r; o++) !e(t[o], o) != s && n.push(t[o])
        return n
      },
      map: function (t, e, i) {
        var n,
          o,
          r = 0,
          a = []
        if (x(t)) for (n = t.length; r < n; r++) null != (o = e(t[r], r, i)) && a.push(o)
        else for (r in t) null != (o = e(t[r], r, i)) && a.push(o)
        return s(a)
      },
      guid: 1,
      support: p
    }),
    'function' == typeof Symbol && (w.fn[Symbol.iterator] = n[Symbol.iterator]),
    w.each('Boolean Number String Function Array Date RegExp Object Error Symbol'.split(' '), function (t, e) {
      c['[object ' + e + ']'] = e.toLowerCase()
    })
  var C = (function (t) {
    function e(t, e) {
      var i = '0x' + t.slice(1) - 65536
      return e || (i < 0 ? String.fromCharCode(65536 + i) : String.fromCharCode((i >> 10) | 55296, (1023 & i) | 56320))
    }
    function i() {
      p()
    }
    var n,
      o,
      r,
      s,
      a,
      l,
      c,
      u,
      d,
      h,
      f,
      p,
      g,
      m,
      v,
      y,
      b,
      _,
      w,
      x = 'sizzle' + +new Date(),
      C = t.document,
      k = 0,
      T = 0,
      S = lt(),
      E = lt(),
      I = lt(),
      A = lt(),
      D = function (t, e) {
        return t === e && (f = !0), 0
      },
      O = {}.hasOwnProperty,
      M = [],
      P = M.pop,
      L = M.push,
      z = M.push,
      F = M.slice,
      N = function (t, e) {
        for (var i = 0, n = t.length; i < n; i++) if (t[i] === e) return i
        return -1
      },
      R = 'checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped',
      j = '[\\x20\\t\\r\\n\\f]',
      $ = '(?:\\\\[\\da-fA-F]{1,6}' + j + '?|\\\\[^\\r\\n\\f]|[\\w-]|[^\0-\\x7f])+',
      B = '\\[' + j + '*(' + $ + ')(?:' + j + '*([*^$|!~]?=)' + j + '*(?:\'((?:\\\\.|[^\\\\\'])*)\'|"((?:\\\\.|[^\\\\"])*)"|(' + $ + '))|)' + j + '*\\]',
      W = ':(' + $ + ')(?:\\(((\'((?:\\\\.|[^\\\\\'])*)\'|"((?:\\\\.|[^\\\\"])*)")|((?:\\\\.|[^\\\\()[\\]]|' + B + ')*)|.*)\\)|)',
      H = new RegExp(j + '+', 'g'),
      q = new RegExp('^' + j + '+|((?:^|[^\\\\])(?:\\\\.)*)' + j + '+$', 'g'),
      V = new RegExp('^' + j + '*,' + j + '*'),
      U = new RegExp('^' + j + '*([>+~]|' + j + ')' + j + '*'),
      Y = new RegExp(j + '|>'),
      Q = new RegExp(W),
      G = new RegExp('^' + $ + '$'),
      X = {
        ID: new RegExp('^#(' + $ + ')'),
        CLASS: new RegExp('^\\.(' + $ + ')'),
        TAG: new RegExp('^(' + $ + '|[*])'),
        ATTR: new RegExp('^' + B),
        PSEUDO: new RegExp('^' + W),
        CHILD: new RegExp('^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(' + j + '*(even|odd|(([+-]|)(\\d*)n|)' + j + '*(?:([+-]|)' + j + '*(\\d+)|))' + j + '*\\)|)', 'i'),
        bool: new RegExp('^(?:' + R + ')$', 'i'),
        needsContext: new RegExp('^' + j + '*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(' + j + '*((?:-\\d)?\\d*)' + j + '*\\)|)(?=[^-]|$)', 'i')
      },
      K = /HTML$/i,
      Z = /^(?:input|select|textarea|button)$/i,
      J = /^h\d$/i,
      tt = /^[^{]+\{\s*\[native \w/,
      et = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,
      it = /[+~]/,
      nt = new RegExp('\\\\[\\da-fA-F]{1,6}' + j + '?|\\\\([^\\r\\n\\f])', 'g'),
      ot = /([\0-\x1f\x7f]|^-?\d)|^-$|[^\0-\x1f\x7f-\uFFFF\w-]/g,
      rt = function (t, e) {
        return e ? ('\0' === t ? '�' : t.slice(0, -1) + '\\' + t.charCodeAt(t.length - 1).toString(16) + ' ') : '\\' + t
      },
      st = _t(
        function (t) {
          return !0 === t.disabled && 'fieldset' === t.nodeName.toLowerCase()
        },
        { dir: 'parentNode', next: 'legend' }
      )
    try {
      z.apply((M = F.call(C.childNodes)), C.childNodes), M[C.childNodes.length].nodeType
    } catch (n) {
      z = {
        apply: M.length
          ? function (t, e) {
              L.apply(t, F.call(e))
            }
          : function (t, e) {
              for (var i = t.length, n = 0; (t[i++] = e[n++]); );
              t.length = i - 1
            }
      }
    }
    function at(t, e, i, n) {
      var r,
        s,
        a,
        c,
        d,
        h,
        f,
        m = e && e.ownerDocument,
        b = e ? e.nodeType : 9
      if (((i = i || []), 'string' != typeof t || !t || (1 !== b && 9 !== b && 11 !== b))) return i
      if (!n && (p(e), (e = e || g), v)) {
        if (11 !== b && (d = et.exec(t)))
          if ((r = d[1])) {
            if (9 === b) {
              if (!(a = e.getElementById(r))) return i
              if (a.id === r) return i.push(a), i
            } else if (m && (a = m.getElementById(r)) && w(e, a) && a.id === r) return i.push(a), i
          } else {
            if (d[2]) return z.apply(i, e.getElementsByTagName(t)), i
            if ((r = d[3]) && o.getElementsByClassName && e.getElementsByClassName) return z.apply(i, e.getElementsByClassName(r)), i
          }
        if (o.qsa && !A[t + ' '] && (!y || !y.test(t)) && (1 !== b || 'object' !== e.nodeName.toLowerCase())) {
          if (((f = t), (m = e), 1 === b && (Y.test(t) || U.test(t)))) {
            for (
              ((m = (it.test(t) && vt(e.parentNode)) || e) === e && o.scope) || ((c = e.getAttribute('id')) ? (c = c.replace(ot, rt)) : e.setAttribute('id', (c = x))),
                s = (h = l(t)).length;
              s--;

            )
              h[s] = (c ? '#' + c : ':scope') + ' ' + bt(h[s])
            f = h.join(',')
          }
          try {
            return z.apply(i, m.querySelectorAll(f)), i
          } catch (e) {
            A(t, !0)
          } finally {
            c === x && e.removeAttribute('id')
          }
        }
      }
      return u(t.replace(q, '$1'), e, i, n)
    }
    function lt() {
      var t = []
      return function e(i, n) {
        return t.push(i + ' ') > r.cacheLength && delete e[t.shift()], (e[i + ' '] = n)
      }
    }
    function ct(t) {
      return (t[x] = !0), t
    }
    function ut(t) {
      var e = g.createElement('fieldset')
      try {
        return !!t(e)
      } catch (t) {
        return !1
      } finally {
        e.parentNode && e.parentNode.removeChild(e), (e = null)
      }
    }
    function dt(t, e) {
      for (var i = t.split('|'), n = i.length; n--; ) r.attrHandle[i[n]] = e
    }
    function ht(t, e) {
      var i = e && t,
        n = i && 1 === t.nodeType && 1 === e.nodeType && t.sourceIndex - e.sourceIndex
      if (n) return n
      if (i) for (; (i = i.nextSibling); ) if (i === e) return -1
      return t ? 1 : -1
    }
    function ft(t) {
      return function (e) {
        return 'input' === e.nodeName.toLowerCase() && e.type === t
      }
    }
    function pt(t) {
      return function (e) {
        var i = e.nodeName.toLowerCase()
        return ('input' === i || 'button' === i) && e.type === t
      }
    }
    function gt(t) {
      return function (e) {
        return 'form' in e
          ? e.parentNode && !1 === e.disabled
            ? 'label' in e
              ? 'label' in e.parentNode
                ? e.parentNode.disabled === t
                : e.disabled === t
              : e.isDisabled === t || (e.isDisabled !== !t && st(e) === t)
            : e.disabled === t
          : 'label' in e && e.disabled === t
      }
    }
    function mt(t) {
      return ct(function (e) {
        return (
          (e = +e),
          ct(function (i, n) {
            for (var o, r = t([], i.length, e), s = r.length; s--; ) i[(o = r[s])] && (i[o] = !(n[o] = i[o]))
          })
        )
      })
    }
    function vt(t) {
      return t && void 0 !== t.getElementsByTagName && t
    }
    for (n in ((o = at.support = {}),
    (a = at.isXML =
      function (t) {
        var e = t.namespaceURI,
          i = (t.ownerDocument || t).documentElement
        return !K.test(e || (i && i.nodeName) || 'HTML')
      }),
    (p = at.setDocument =
      function (t) {
        var n,
          s,
          l = t ? t.ownerDocument || t : C
        return (
          l != g &&
            9 === l.nodeType &&
            l.documentElement &&
            ((m = (g = l).documentElement),
            (v = !a(g)),
            C != g && (s = g.defaultView) && s.top !== s && (s.addEventListener ? s.addEventListener('unload', i, !1) : s.attachEvent && s.attachEvent('onunload', i)),
            (o.scope = ut(function (t) {
              return m.appendChild(t).appendChild(g.createElement('div')), void 0 !== t.querySelectorAll && !t.querySelectorAll(':scope fieldset div').length
            })),
            (o.attributes = ut(function (t) {
              return (t.className = 'i'), !t.getAttribute('className')
            })),
            (o.getElementsByTagName = ut(function (t) {
              return t.appendChild(g.createComment('')), !t.getElementsByTagName('*').length
            })),
            (o.getElementsByClassName = tt.test(g.getElementsByClassName)),
            (o.getById = ut(function (t) {
              return (m.appendChild(t).id = x), !g.getElementsByName || !g.getElementsByName(x).length
            })),
            o.getById
              ? ((r.filter.ID = function (t) {
                  var i = t.replace(nt, e)
                  return function (t) {
                    return t.getAttribute('id') === i
                  }
                }),
                (r.find.ID = function (t, e) {
                  if (void 0 !== e.getElementById && v) {
                    var i = e.getElementById(t)
                    return i ? [i] : []
                  }
                }))
              : ((r.filter.ID = function (t) {
                  var i = t.replace(nt, e)
                  return function (t) {
                    var e = void 0 !== t.getAttributeNode && t.getAttributeNode('id')
                    return e && e.value === i
                  }
                }),
                (r.find.ID = function (t, e) {
                  if (void 0 !== e.getElementById && v) {
                    var i,
                      n,
                      o,
                      r = e.getElementById(t)
                    if (r) {
                      if ((i = r.getAttributeNode('id')) && i.value === t) return [r]
                      for (o = e.getElementsByName(t), n = 0; (r = o[n++]); ) if ((i = r.getAttributeNode('id')) && i.value === t) return [r]
                    }
                    return []
                  }
                })),
            (r.find.TAG = o.getElementsByTagName
              ? function (t, e) {
                  return void 0 !== e.getElementsByTagName ? e.getElementsByTagName(t) : o.qsa ? e.querySelectorAll(t) : void 0
                }
              : function (t, e) {
                  var i,
                    n = [],
                    o = 0,
                    r = e.getElementsByTagName(t)
                  if ('*' !== t) return r
                  for (; (i = r[o++]); ) 1 === i.nodeType && n.push(i)
                  return n
                }),
            (r.find.CLASS =
              o.getElementsByClassName &&
              function (t, e) {
                if (void 0 !== e.getElementsByClassName && v) return e.getElementsByClassName(t)
              }),
            (b = []),
            (y = []),
            (o.qsa = tt.test(g.querySelectorAll)) &&
              (ut(function (t) {
                var e
                ;(m.appendChild(t).innerHTML = "<a id='" + x + "'></a><select id='" + x + "-\r\\' msallowcapture=''><option selected=''></option></select>"),
                  t.querySelectorAll("[msallowcapture^='']").length && y.push('[*^$]=' + j + '*(?:\'\'|"")'),
                  t.querySelectorAll('[selected]').length || y.push('\\[' + j + '*(?:value|' + R + ')'),
                  t.querySelectorAll('[id~=' + x + '-]').length || y.push('~='),
                  (e = g.createElement('input')).setAttribute('name', ''),
                  t.appendChild(e),
                  t.querySelectorAll("[name='']").length || y.push('\\[' + j + '*name' + j + '*=' + j + '*(?:\'\'|"")'),
                  t.querySelectorAll(':checked').length || y.push(':checked'),
                  t.querySelectorAll('a#' + x + '+*').length || y.push('.#.+[+~]'),
                  t.querySelectorAll('\\\f'),
                  y.push('[\\r\\n\\f]')
              }),
              ut(function (t) {
                t.innerHTML = "<a href='' disabled='disabled'></a><select disabled='disabled'><option/></select>"
                var e = g.createElement('input')
                e.setAttribute('type', 'hidden'),
                  t.appendChild(e).setAttribute('name', 'D'),
                  t.querySelectorAll('[name=d]').length && y.push('name' + j + '*[*^$|!~]?='),
                  2 !== t.querySelectorAll(':enabled').length && y.push(':enabled', ':disabled'),
                  (m.appendChild(t).disabled = !0),
                  2 !== t.querySelectorAll(':disabled').length && y.push(':enabled', ':disabled'),
                  t.querySelectorAll('*,:x'),
                  y.push(',.*:')
              })),
            (o.matchesSelector = tt.test((_ = m.matches || m.webkitMatchesSelector || m.mozMatchesSelector || m.oMatchesSelector || m.msMatchesSelector))) &&
              ut(function (t) {
                ;(o.disconnectedMatch = _.call(t, '*')), _.call(t, "[s!='']:x"), b.push('!=', W)
              }),
            (y = y.length && new RegExp(y.join('|'))),
            (b = b.length && new RegExp(b.join('|'))),
            (n = tt.test(m.compareDocumentPosition)),
            (w =
              n || tt.test(m.contains)
                ? function (t, e) {
                    var i = 9 === t.nodeType ? t.documentElement : t,
                      n = e && e.parentNode
                    return t === n || !(!n || 1 !== n.nodeType || !(i.contains ? i.contains(n) : t.compareDocumentPosition && 16 & t.compareDocumentPosition(n)))
                  }
                : function (t, e) {
                    if (e) for (; (e = e.parentNode); ) if (e === t) return !0
                    return !1
                  }),
            (D = n
              ? function (t, e) {
                  if (t === e) return (f = !0), 0
                  var i = !t.compareDocumentPosition - !e.compareDocumentPosition
                  return (
                    i ||
                    (1 & (i = (t.ownerDocument || t) == (e.ownerDocument || e) ? t.compareDocumentPosition(e) : 1) || (!o.sortDetached && e.compareDocumentPosition(t) === i)
                      ? t == g || (t.ownerDocument == C && w(C, t))
                        ? -1
                        : e == g || (e.ownerDocument == C && w(C, e))
                        ? 1
                        : h
                        ? N(h, t) - N(h, e)
                        : 0
                      : 4 & i
                      ? -1
                      : 1)
                  )
                }
              : function (t, e) {
                  if (t === e) return (f = !0), 0
                  var i,
                    n = 0,
                    o = t.parentNode,
                    r = e.parentNode,
                    s = [t],
                    a = [e]
                  if (!o || !r) return t == g ? -1 : e == g ? 1 : o ? -1 : r ? 1 : h ? N(h, t) - N(h, e) : 0
                  if (o === r) return ht(t, e)
                  for (i = t; (i = i.parentNode); ) s.unshift(i)
                  for (i = e; (i = i.parentNode); ) a.unshift(i)
                  for (; s[n] === a[n]; ) n++
                  return n ? ht(s[n], a[n]) : s[n] == C ? -1 : a[n] == C ? 1 : 0
                })),
          g
        )
      }),
    (at.matches = function (t, e) {
      return at(t, null, null, e)
    }),
    (at.matchesSelector = function (t, e) {
      if ((p(t), o.matchesSelector && v && !A[e + ' '] && (!b || !b.test(e)) && (!y || !y.test(e))))
        try {
          var i = _.call(t, e)
          if (i || o.disconnectedMatch || (t.document && 11 !== t.document.nodeType)) return i
        } catch (t) {
          A(e, !0)
        }
      return 0 < at(e, g, null, [t]).length
    }),
    (at.contains = function (t, e) {
      return (t.ownerDocument || t) != g && p(t), w(t, e)
    }),
    (at.attr = function (t, e) {
      ;(t.ownerDocument || t) != g && p(t)
      var i = r.attrHandle[e.toLowerCase()],
        n = i && O.call(r.attrHandle, e.toLowerCase()) ? i(t, e, !v) : void 0
      return void 0 !== n ? n : o.attributes || !v ? t.getAttribute(e) : (n = t.getAttributeNode(e)) && n.specified ? n.value : null
    }),
    (at.escape = function (t) {
      return (t + '').replace(ot, rt)
    }),
    (at.error = function (t) {
      throw new Error('Syntax error, unrecognized expression: ' + t)
    }),
    (at.uniqueSort = function (t) {
      var e,
        i = [],
        n = 0,
        r = 0
      if (((f = !o.detectDuplicates), (h = !o.sortStable && t.slice(0)), t.sort(D), f)) {
        for (; (e = t[r++]); ) e === t[r] && (n = i.push(r))
        for (; n--; ) t.splice(i[n], 1)
      }
      return (h = null), t
    }),
    (s = at.getText =
      function (t) {
        var e,
          i = '',
          n = 0,
          o = t.nodeType
        if (o) {
          if (1 === o || 9 === o || 11 === o) {
            if ('string' == typeof t.textContent) return t.textContent
            for (t = t.firstChild; t; t = t.nextSibling) i += s(t)
          } else if (3 === o || 4 === o) return t.nodeValue
        } else for (; (e = t[n++]); ) i += s(e)
        return i
      }),
    ((r = at.selectors =
      {
        cacheLength: 50,
        createPseudo: ct,
        match: X,
        attrHandle: {},
        find: {},
        relative: { '>': { dir: 'parentNode', first: !0 }, ' ': { dir: 'parentNode' }, '+': { dir: 'previousSibling', first: !0 }, '~': { dir: 'previousSibling' } },
        preFilter: {
          ATTR: function (t) {
            return (t[1] = t[1].replace(nt, e)), (t[3] = (t[3] || t[4] || t[5] || '').replace(nt, e)), '~=' === t[2] && (t[3] = ' ' + t[3] + ' '), t.slice(0, 4)
          },
          CHILD: function (t) {
            return (
              (t[1] = t[1].toLowerCase()),
              'nth' === t[1].slice(0, 3)
                ? (t[3] || at.error(t[0]), (t[4] = +(t[4] ? t[5] + (t[6] || 1) : 2 * ('even' === t[3] || 'odd' === t[3]))), (t[5] = +(t[7] + t[8] || 'odd' === t[3])))
                : t[3] && at.error(t[0]),
              t
            )
          },
          PSEUDO: function (t) {
            var e,
              i = !t[6] && t[2]
            return X.CHILD.test(t[0])
              ? null
              : (t[3]
                  ? (t[2] = t[4] || t[5] || '')
                  : i && Q.test(i) && (e = l(i, !0)) && (e = i.indexOf(')', i.length - e) - i.length) && ((t[0] = t[0].slice(0, e)), (t[2] = i.slice(0, e))),
                t.slice(0, 3))
          }
        },
        filter: {
          TAG: function (t) {
            var i = t.replace(nt, e).toLowerCase()
            return '*' === t
              ? function () {
                  return !0
                }
              : function (t) {
                  return t.nodeName && t.nodeName.toLowerCase() === i
                }
          },
          CLASS: function (t) {
            var e = S[t + ' ']
            return (
              e ||
              ((e = new RegExp('(^|' + j + ')' + t + '(' + j + '|$)')) &&
                S(t, function (t) {
                  return e.test(('string' == typeof t.className && t.className) || (void 0 !== t.getAttribute && t.getAttribute('class')) || '')
                }))
            )
          },
          ATTR: function (t, e, i) {
            return function (n) {
              var o = at.attr(n, t)
              return null == o
                ? '!=' === e
                : !e ||
                    ((o += ''),
                    '=' === e
                      ? o === i
                      : '!=' === e
                      ? o !== i
                      : '^=' === e
                      ? i && 0 === o.indexOf(i)
                      : '*=' === e
                      ? i && -1 < o.indexOf(i)
                      : '$=' === e
                      ? i && o.slice(-i.length) === i
                      : '~=' === e
                      ? -1 < (' ' + o.replace(H, ' ') + ' ').indexOf(i)
                      : '|=' === e && (o === i || o.slice(0, i.length + 1) === i + '-'))
            }
          },
          CHILD: function (t, e, i, n, o) {
            var r = 'nth' !== t.slice(0, 3),
              s = 'last' !== t.slice(-4),
              a = 'of-type' === e
            return 1 === n && 0 === o
              ? function (t) {
                  return !!t.parentNode
                }
              : function (e, i, l) {
                  var c,
                    u,
                    d,
                    h,
                    f,
                    p,
                    g = r != s ? 'nextSibling' : 'previousSibling',
                    m = e.parentNode,
                    v = a && e.nodeName.toLowerCase(),
                    y = !l && !a,
                    b = !1
                  if (m) {
                    if (r) {
                      for (; g; ) {
                        for (h = e; (h = h[g]); ) if (a ? h.nodeName.toLowerCase() === v : 1 === h.nodeType) return !1
                        p = g = 'only' === t && !p && 'nextSibling'
                      }
                      return !0
                    }
                    if (((p = [s ? m.firstChild : m.lastChild]), s && y)) {
                      for (
                        b = (f = (c = (u = (d = (h = m)[x] || (h[x] = {}))[h.uniqueID] || (d[h.uniqueID] = {}))[t] || [])[0] === k && c[1]) && c[2], h = f && m.childNodes[f];
                        (h = (++f && h && h[g]) || (b = f = 0) || p.pop());

                      )
                        if (1 === h.nodeType && ++b && h === e) {
                          u[t] = [k, f, b]
                          break
                        }
                    } else if ((y && (b = f = (c = (u = (d = (h = e)[x] || (h[x] = {}))[h.uniqueID] || (d[h.uniqueID] = {}))[t] || [])[0] === k && c[1]), !1 === b))
                      for (
                        ;
                        (h = (++f && h && h[g]) || (b = f = 0) || p.pop()) &&
                        ((a ? h.nodeName.toLowerCase() !== v : 1 !== h.nodeType) ||
                          !++b ||
                          (y && ((u = (d = h[x] || (h[x] = {}))[h.uniqueID] || (d[h.uniqueID] = {}))[t] = [k, b]), h !== e));

                      );
                    return (b -= o) === n || (b % n == 0 && 0 <= b / n)
                  }
                }
          },
          PSEUDO: function (t, e) {
            var i,
              n = r.pseudos[t] || r.setFilters[t.toLowerCase()] || at.error('unsupported pseudo: ' + t)
            return n[x]
              ? n(e)
              : 1 < n.length
              ? ((i = [t, t, '', e]),
                r.setFilters.hasOwnProperty(t.toLowerCase())
                  ? ct(function (t, i) {
                      for (var o, r = n(t, e), s = r.length; s--; ) t[(o = N(t, r[s]))] = !(i[o] = r[s])
                    })
                  : function (t) {
                      return n(t, 0, i)
                    })
              : n
          }
        },
        pseudos: {
          not: ct(function (t) {
            var e = [],
              i = [],
              n = c(t.replace(q, '$1'))
            return n[x]
              ? ct(function (t, e, i, o) {
                  for (var r, s = n(t, null, o, []), a = t.length; a--; ) (r = s[a]) && (t[a] = !(e[a] = r))
                })
              : function (t, o, r) {
                  return (e[0] = t), n(e, null, r, i), (e[0] = null), !i.pop()
                }
          }),
          has: ct(function (t) {
            return function (e) {
              return 0 < at(t, e).length
            }
          }),
          contains: ct(function (t) {
            return (
              (t = t.replace(nt, e)),
              function (e) {
                return -1 < (e.textContent || s(e)).indexOf(t)
              }
            )
          }),
          lang: ct(function (t) {
            return (
              G.test(t || '') || at.error('unsupported lang: ' + t),
              (t = t.replace(nt, e).toLowerCase()),
              function (e) {
                var i
                do {
                  if ((i = v ? e.lang : e.getAttribute('xml:lang') || e.getAttribute('lang'))) return (i = i.toLowerCase()) === t || 0 === i.indexOf(t + '-')
                } while ((e = e.parentNode) && 1 === e.nodeType)
                return !1
              }
            )
          }),
          target: function (e) {
            var i = t.location && t.location.hash
            return i && i.slice(1) === e.id
          },
          root: function (t) {
            return t === m
          },
          focus: function (t) {
            return t === g.activeElement && (!g.hasFocus || g.hasFocus()) && !!(t.type || t.href || ~t.tabIndex)
          },
          enabled: gt(!1),
          disabled: gt(!0),
          checked: function (t) {
            var e = t.nodeName.toLowerCase()
            return ('input' === e && !!t.checked) || ('option' === e && !!t.selected)
          },
          selected: function (t) {
            return t.parentNode && t.parentNode.selectedIndex, !0 === t.selected
          },
          empty: function (t) {
            for (t = t.firstChild; t; t = t.nextSibling) if (t.nodeType < 6) return !1
            return !0
          },
          parent: function (t) {
            return !r.pseudos.empty(t)
          },
          header: function (t) {
            return J.test(t.nodeName)
          },
          input: function (t) {
            return Z.test(t.nodeName)
          },
          button: function (t) {
            var e = t.nodeName.toLowerCase()
            return ('input' === e && 'button' === t.type) || 'button' === e
          },
          text: function (t) {
            var e
            return 'input' === t.nodeName.toLowerCase() && 'text' === t.type && (null == (e = t.getAttribute('type')) || 'text' === e.toLowerCase())
          },
          first: mt(function () {
            return [0]
          }),
          last: mt(function (t, e) {
            return [e - 1]
          }),
          eq: mt(function (t, e, i) {
            return [i < 0 ? i + e : i]
          }),
          even: mt(function (t, e) {
            for (var i = 0; i < e; i += 2) t.push(i)
            return t
          }),
          odd: mt(function (t, e) {
            for (var i = 1; i < e; i += 2) t.push(i)
            return t
          }),
          lt: mt(function (t, e, i) {
            for (var n = i < 0 ? i + e : e < i ? e : i; 0 <= --n; ) t.push(n)
            return t
          }),
          gt: mt(function (t, e, i) {
            for (var n = i < 0 ? i + e : i; ++n < e; ) t.push(n)
            return t
          })
        }
      }).pseudos.nth = r.pseudos.eq),
    { radio: !0, checkbox: !0, file: !0, password: !0, image: !0 }))
      r.pseudos[n] = ft(n)
    for (n in { submit: !0, reset: !0 }) r.pseudos[n] = pt(n)
    function yt() {}
    function bt(t) {
      for (var e = 0, i = t.length, n = ''; e < i; e++) n += t[e].value
      return n
    }
    function _t(t, e, i) {
      var n = e.dir,
        o = e.next,
        r = o || n,
        s = i && 'parentNode' === r,
        a = T++
      return e.first
        ? function (e, i, o) {
            for (; (e = e[n]); ) if (1 === e.nodeType || s) return t(e, i, o)
            return !1
          }
        : function (e, i, l) {
            var c,
              u,
              d,
              h = [k, a]
            if (l) {
              for (; (e = e[n]); ) if ((1 === e.nodeType || s) && t(e, i, l)) return !0
            } else
              for (; (e = e[n]); )
                if (1 === e.nodeType || s)
                  if (((u = (d = e[x] || (e[x] = {}))[e.uniqueID] || (d[e.uniqueID] = {})), o && o === e.nodeName.toLowerCase())) e = e[n] || e
                  else {
                    if ((c = u[r]) && c[0] === k && c[1] === a) return (h[2] = c[2])
                    if (((u[r] = h)[2] = t(e, i, l))) return !0
                  }
            return !1
          }
    }
    function wt(t) {
      return 1 < t.length
        ? function (e, i, n) {
            for (var o = t.length; o--; ) if (!t[o](e, i, n)) return !1
            return !0
          }
        : t[0]
    }
    function xt(t, e, i, n, o) {
      for (var r, s = [], a = 0, l = t.length, c = null != e; a < l; a++) (r = t[a]) && ((i && !i(r, n, o)) || (s.push(r), c && e.push(a)))
      return s
    }
    function Ct(t, e, i, n, o, r) {
      return (
        n && !n[x] && (n = Ct(n)),
        o && !o[x] && (o = Ct(o, r)),
        ct(function (r, s, a, l) {
          var c,
            u,
            d,
            h = [],
            f = [],
            p = s.length,
            g =
              r ||
              (function (t, e, i) {
                for (var n = 0, o = e.length; n < o; n++) at(t, e[n], i)
                return i
              })(e || '*', a.nodeType ? [a] : a, []),
            m = !t || (!r && e) ? g : xt(g, h, t, a, l),
            v = i ? (o || (r ? t : p || n) ? [] : s) : m
          if ((i && i(m, v, a, l), n)) for (c = xt(v, f), n(c, [], a, l), u = c.length; u--; ) (d = c[u]) && (v[f[u]] = !(m[f[u]] = d))
          if (r) {
            if (o || t) {
              if (o) {
                for (c = [], u = v.length; u--; ) (d = v[u]) && c.push((m[u] = d))
                o(null, (v = []), c, l)
              }
              for (u = v.length; u--; ) (d = v[u]) && -1 < (c = o ? N(r, d) : h[u]) && (r[c] = !(s[c] = d))
            }
          } else (v = xt(v === s ? v.splice(p, v.length) : v)), o ? o(null, s, v, l) : z.apply(s, v)
        })
      )
    }
    function kt(t) {
      for (
        var e,
          i,
          n,
          o = t.length,
          s = r.relative[t[0].type],
          a = s || r.relative[' '],
          l = s ? 1 : 0,
          c = _t(
            function (t) {
              return t === e
            },
            a,
            !0
          ),
          u = _t(
            function (t) {
              return -1 < N(e, t)
            },
            a,
            !0
          ),
          h = [
            function (t, i, n) {
              var o = (!s && (n || i !== d)) || ((e = i).nodeType ? c : u)(t, i, n)
              return (e = null), o
            }
          ];
        l < o;
        l++
      )
        if ((i = r.relative[t[l].type])) h = [_t(wt(h), i)]
        else {
          if ((i = r.filter[t[l].type].apply(null, t[l].matches))[x]) {
            for (n = ++l; n < o && !r.relative[t[n].type]; n++);
            return Ct(
              1 < l && wt(h),
              1 < l && bt(t.slice(0, l - 1).concat({ value: ' ' === t[l - 2].type ? '*' : '' })).replace(q, '$1'),
              i,
              l < n && kt(t.slice(l, n)),
              n < o && kt((t = t.slice(n))),
              n < o && bt(t)
            )
          }
          h.push(i)
        }
      return wt(h)
    }
    return (
      (yt.prototype = r.filters = r.pseudos),
      (r.setFilters = new yt()),
      (l = at.tokenize =
        function (t, e) {
          var i,
            n,
            o,
            s,
            a,
            l,
            c,
            u = E[t + ' ']
          if (u) return e ? 0 : u.slice(0)
          for (a = t, l = [], c = r.preFilter; a; ) {
            for (s in ((i && !(n = V.exec(a))) || (n && (a = a.slice(n[0].length) || a), l.push((o = []))),
            (i = !1),
            (n = U.exec(a)) && ((i = n.shift()), o.push({ value: i, type: n[0].replace(q, ' ') }), (a = a.slice(i.length))),
            r.filter))
              !(n = X[s].exec(a)) || (c[s] && !(n = c[s](n))) || ((i = n.shift()), o.push({ value: i, type: s, matches: n }), (a = a.slice(i.length)))
            if (!i) break
          }
          return e ? a.length : a ? at.error(t) : E(t, l).slice(0)
        }),
      (c = at.compile =
        function (t, e) {
          var i,
            n,
            o,
            s,
            a,
            c,
            u = [],
            h = [],
            f = I[t + ' ']
          if (!f) {
            for (i = (e = e || l(t)).length; i--; ) (f = kt(e[i]))[x] ? u.push(f) : h.push(f)
            ;(f = I(
              t,
              ((n = h),
              (s = 0 < (o = u).length),
              (a = 0 < n.length),
              (c = function (t, e, i, l, c) {
                var u,
                  h,
                  f,
                  m = 0,
                  y = '0',
                  b = t && [],
                  _ = [],
                  w = d,
                  x = t || (a && r.find.TAG('*', c)),
                  C = (k += null == w ? 1 : Math.random() || 0.1),
                  T = x.length
                for (c && (d = e == g || e || c); y !== T && null != (u = x[y]); y++) {
                  if (a && u) {
                    for (h = 0, e || u.ownerDocument == g || (p(u), (i = !v)); (f = n[h++]); )
                      if (f(u, e || g, i)) {
                        l.push(u)
                        break
                      }
                    c && (k = C)
                  }
                  s && ((u = !f && u) && m--, t && b.push(u))
                }
                if (((m += y), s && y !== m)) {
                  for (h = 0; (f = o[h++]); ) f(b, _, e, i)
                  if (t) {
                    if (0 < m) for (; y--; ) b[y] || _[y] || (_[y] = P.call(l))
                    _ = xt(_)
                  }
                  z.apply(l, _), c && !t && 0 < _.length && 1 < m + o.length && at.uniqueSort(l)
                }
                return c && ((k = C), (d = w)), b
              }),
              s ? ct(c) : c)
            )).selector = t
          }
          return f
        }),
      (u = at.select =
        function (t, i, n, o) {
          var s,
            a,
            u,
            d,
            h,
            f = 'function' == typeof t && t,
            p = !o && l((t = f.selector || t))
          if (((n = n || []), 1 === p.length)) {
            if (2 < (a = p[0] = p[0].slice(0)).length && 'ID' === (u = a[0]).type && 9 === i.nodeType && v && r.relative[a[1].type]) {
              if (!(i = (r.find.ID(u.matches[0].replace(nt, e), i) || [])[0])) return n
              f && (i = i.parentNode), (t = t.slice(a.shift().value.length))
            }
            for (s = X.needsContext.test(t) ? 0 : a.length; s-- && ((u = a[s]), !r.relative[(d = u.type)]); )
              if ((h = r.find[d]) && (o = h(u.matches[0].replace(nt, e), (it.test(a[0].type) && vt(i.parentNode)) || i))) {
                if ((a.splice(s, 1), !(t = o.length && bt(a)))) return z.apply(n, o), n
                break
              }
          }
          return (f || c(t, p))(o, i, !v, n, !i || (it.test(t) && vt(i.parentNode)) || i), n
        }),
      (o.sortStable = x.split('').sort(D).join('') === x),
      (o.detectDuplicates = !!f),
      p(),
      (o.sortDetached = ut(function (t) {
        return 1 & t.compareDocumentPosition(g.createElement('fieldset'))
      })),
      ut(function (t) {
        return (t.innerHTML = "<a href='#'></a>"), '#' === t.firstChild.getAttribute('href')
      }) ||
        dt('type|href|height|width', function (t, e, i) {
          if (!i) return t.getAttribute(e, 'type' === e.toLowerCase() ? 1 : 2)
        }),
      (o.attributes &&
        ut(function (t) {
          return (t.innerHTML = '<input/>'), t.firstChild.setAttribute('value', ''), '' === t.firstChild.getAttribute('value')
        })) ||
        dt('value', function (t, e, i) {
          if (!i && 'input' === t.nodeName.toLowerCase()) return t.defaultValue
        }),
      ut(function (t) {
        return null == t.getAttribute('disabled')
      }) ||
        dt(R, function (t, e, i) {
          var n
          if (!i) return !0 === t[e] ? e.toLowerCase() : (n = t.getAttributeNode(e)) && n.specified ? n.value : null
        }),
      at
    )
  })(t)
  function k(t, e, i) {
    for (var n = [], o = void 0 !== i; (t = t[e]) && 9 !== t.nodeType; )
      if (1 === t.nodeType) {
        if (o && w(t).is(i)) break
        n.push(t)
      }
    return n
  }
  function T(t, e) {
    for (var i = []; t; t = t.nextSibling) 1 === t.nodeType && t !== e && i.push(t)
    return i
  }
  ;(w.find = C),
    (w.expr = C.selectors),
    (w.expr[':'] = w.expr.pseudos),
    (w.uniqueSort = w.unique = C.uniqueSort),
    (w.text = C.getText),
    (w.isXMLDoc = C.isXML),
    (w.contains = C.contains),
    (w.escapeSelector = C.escape)
  var S = w.expr.match.needsContext
  function E(t, e) {
    return t.nodeName && t.nodeName.toLowerCase() === e.toLowerCase()
  }
  var I = /^<([a-z][^\/\0>:\x20\t\r\n\f]*)[\x20\t\r\n\f]*\/?>(?:<\/\1>|)$/i
  function A(t, e, i) {
    return g(e)
      ? w.grep(t, function (t, n) {
          return !!e.call(t, n, t) !== i
        })
      : e.nodeType
      ? w.grep(t, function (t) {
          return (t === e) !== i
        })
      : 'string' != typeof e
      ? w.grep(t, function (t) {
          return -1 < l.call(e, t) !== i
        })
      : w.filter(e, t, i)
  }
  ;(w.filter = function (t, e, i) {
    var n = e[0]
    return (
      i && (t = ':not(' + t + ')'),
      1 === e.length && 1 === n.nodeType
        ? w.find.matchesSelector(n, t)
          ? [n]
          : []
        : w.find.matches(
            t,
            w.grep(e, function (t) {
              return 1 === t.nodeType
            })
          )
    )
  }),
    w.fn.extend({
      find: function (t) {
        var e,
          i,
          n = this.length,
          o = this
        if ('string' != typeof t)
          return this.pushStack(
            w(t).filter(function () {
              for (e = 0; e < n; e++) if (w.contains(o[e], this)) return !0
            })
          )
        for (i = this.pushStack([]), e = 0; e < n; e++) w.find(t, o[e], i)
        return 1 < n ? w.uniqueSort(i) : i
      },
      filter: function (t) {
        return this.pushStack(A(this, t || [], !1))
      },
      not: function (t) {
        return this.pushStack(A(this, t || [], !0))
      },
      is: function (t) {
        return !!A(this, 'string' == typeof t && S.test(t) ? w(t) : t || [], !1).length
      }
    })
  var D,
    O = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]+))$/
  ;((w.fn.init = function (t, e, i) {
    var n, o
    if (!t) return this
    if (((i = i || D), 'string' != typeof t)) return t.nodeType ? ((this[0] = t), (this.length = 1), this) : g(t) ? (void 0 !== i.ready ? i.ready(t) : t(w)) : w.makeArray(t, this)
    if (!(n = '<' === t[0] && '>' === t[t.length - 1] && 3 <= t.length ? [null, t, null] : O.exec(t)) || (!n[1] && e))
      return !e || e.jquery ? (e || i).find(t) : this.constructor(e).find(t)
    if (n[1]) {
      if (((e = e instanceof w ? e[0] : e), w.merge(this, w.parseHTML(n[1], e && e.nodeType ? e.ownerDocument || e : m, !0)), I.test(n[1]) && w.isPlainObject(e)))
        for (n in e) g(this[n]) ? this[n](e[n]) : this.attr(n, e[n])
      return this
    }
    return (o = m.getElementById(n[2])) && ((this[0] = o), (this.length = 1)), this
  }).prototype = w.fn),
    (D = w(m))
  var M = /^(?:parents|prev(?:Until|All))/,
    P = { children: !0, contents: !0, next: !0, prev: !0 }
  function L(t, e) {
    for (; (t = t[e]) && 1 !== t.nodeType; );
    return t
  }
  w.fn.extend({
    has: function (t) {
      var e = w(t, this),
        i = e.length
      return this.filter(function () {
        for (var t = 0; t < i; t++) if (w.contains(this, e[t])) return !0
      })
    },
    closest: function (t, e) {
      var i,
        n = 0,
        o = this.length,
        r = [],
        s = 'string' != typeof t && w(t)
      if (!S.test(t))
        for (; n < o; n++)
          for (i = this[n]; i && i !== e; i = i.parentNode)
            if (i.nodeType < 11 && (s ? -1 < s.index(i) : 1 === i.nodeType && w.find.matchesSelector(i, t))) {
              r.push(i)
              break
            }
      return this.pushStack(1 < r.length ? w.uniqueSort(r) : r)
    },
    index: function (t) {
      return t ? ('string' == typeof t ? l.call(w(t), this[0]) : l.call(this, t.jquery ? t[0] : t)) : this[0] && this[0].parentNode ? this.first().prevAll().length : -1
    },
    add: function (t, e) {
      return this.pushStack(w.uniqueSort(w.merge(this.get(), w(t, e))))
    },
    addBack: function (t) {
      return this.add(null == t ? this.prevObject : this.prevObject.filter(t))
    }
  }),
    w.each(
      {
        parent: function (t) {
          var e = t.parentNode
          return e && 11 !== e.nodeType ? e : null
        },
        parents: function (t) {
          return k(t, 'parentNode')
        },
        parentsUntil: function (t, e, i) {
          return k(t, 'parentNode', i)
        },
        next: function (t) {
          return L(t, 'nextSibling')
        },
        prev: function (t) {
          return L(t, 'previousSibling')
        },
        nextAll: function (t) {
          return k(t, 'nextSibling')
        },
        prevAll: function (t) {
          return k(t, 'previousSibling')
        },
        nextUntil: function (t, e, i) {
          return k(t, 'nextSibling', i)
        },
        prevUntil: function (t, e, i) {
          return k(t, 'previousSibling', i)
        },
        siblings: function (t) {
          return T((t.parentNode || {}).firstChild, t)
        },
        children: function (t) {
          return T(t.firstChild)
        },
        contents: function (t) {
          return null != t.contentDocument && o(t.contentDocument) ? t.contentDocument : (E(t, 'template') && (t = t.content || t), w.merge([], t.childNodes))
        }
      },
      function (t, e) {
        w.fn[t] = function (i, n) {
          var o = w.map(this, e, i)
          return (
            'Until' !== t.slice(-5) && (n = i),
            n && 'string' == typeof n && (o = w.filter(n, o)),
            1 < this.length && (P[t] || w.uniqueSort(o), M.test(t) && o.reverse()),
            this.pushStack(o)
          )
        }
      }
    )
  var z = /[^\x20\t\r\n\f]+/g
  function F(t) {
    return t
  }
  function N(t) {
    throw t
  }
  function R(t, e, i, n) {
    var o
    try {
      t && g((o = t.promise)) ? o.call(t).done(e).fail(i) : t && g((o = t.then)) ? o.call(t, e, i) : e.apply(void 0, [t].slice(n))
    } catch (t) {
      i.apply(void 0, [t])
    }
  }
  ;(w.Callbacks = function (t) {
    var e
    function i() {
      for (s = s || t.once, r = n = !0; l.length; c = -1) for (o = l.shift(); ++c < a.length; ) !1 === a[c].apply(o[0], o[1]) && t.stopOnFalse && ((c = a.length), (o = !1))
      t.memory || (o = !1), (n = !1), s && (a = o ? [] : '')
    }
    t =
      'string' == typeof t
        ? ((e = {}),
          w.each(t.match(z) || [], function (t, i) {
            e[i] = !0
          }),
          e)
        : w.extend({}, t)
    var n,
      o,
      r,
      s,
      a = [],
      l = [],
      c = -1,
      u = {
        add: function () {
          return (
            a &&
              (o && !n && ((c = a.length - 1), l.push(o)),
              (function e(i) {
                w.each(i, function (i, n) {
                  g(n) ? (t.unique && u.has(n)) || a.push(n) : n && n.length && 'string' !== b(n) && e(n)
                })
              })(arguments),
              o && !n && i()),
            this
          )
        },
        remove: function () {
          return (
            w.each(arguments, function (t, e) {
              for (var i; -1 < (i = w.inArray(e, a, i)); ) a.splice(i, 1), i <= c && c--
            }),
            this
          )
        },
        has: function (t) {
          return t ? -1 < w.inArray(t, a) : 0 < a.length
        },
        empty: function () {
          return (a = a && []), this
        },
        disable: function () {
          return (s = l = []), (a = o = ''), this
        },
        disabled: function () {
          return !a
        },
        lock: function () {
          return (s = l = []), o || n || (a = o = ''), this
        },
        locked: function () {
          return !!s
        },
        fireWith: function (t, e) {
          return s || ((e = [t, (e = e || []).slice ? e.slice() : e]), l.push(e), n || i()), this
        },
        fire: function () {
          return u.fireWith(this, arguments), this
        },
        fired: function () {
          return !!r
        }
      }
    return u
  }),
    w.extend({
      Deferred: function (e) {
        var i = [
            ['notify', 'progress', w.Callbacks('memory'), w.Callbacks('memory'), 2],
            ['resolve', 'done', w.Callbacks('once memory'), w.Callbacks('once memory'), 0, 'resolved'],
            ['reject', 'fail', w.Callbacks('once memory'), w.Callbacks('once memory'), 1, 'rejected']
          ],
          n = 'pending',
          o = {
            state: function () {
              return n
            },
            always: function () {
              return r.done(arguments).fail(arguments), this
            },
            catch: function (t) {
              return o.then(null, t)
            },
            pipe: function () {
              var t = arguments
              return w
                .Deferred(function (e) {
                  w.each(i, function (i, n) {
                    var o = g(t[n[4]]) && t[n[4]]
                    r[n[1]](function () {
                      var t = o && o.apply(this, arguments)
                      t && g(t.promise) ? t.promise().progress(e.notify).done(e.resolve).fail(e.reject) : e[n[0] + 'With'](this, o ? [t] : arguments)
                    })
                  }),
                    (t = null)
                })
                .promise()
            },
            then: function (e, n, o) {
              var r = 0
              function s(e, i, n, o) {
                return function () {
                  function a() {
                    var t, a
                    if (!(e < r)) {
                      if ((t = n.apply(l, c)) === i.promise()) throw new TypeError('Thenable self-resolution')
                      ;(a = t && ('object' == typeof t || 'function' == typeof t) && t.then),
                        g(a)
                          ? o
                            ? a.call(t, s(r, i, F, o), s(r, i, N, o))
                            : (r++, a.call(t, s(r, i, F, o), s(r, i, N, o), s(r, i, F, i.notifyWith)))
                          : (n !== F && ((l = void 0), (c = [t])), (o || i.resolveWith)(l, c))
                    }
                  }
                  var l = this,
                    c = arguments,
                    u = o
                      ? a
                      : function () {
                          try {
                            a()
                          } catch (t) {
                            w.Deferred.exceptionHook && w.Deferred.exceptionHook(t, u.stackTrace), r <= e + 1 && (n !== N && ((l = void 0), (c = [t])), i.rejectWith(l, c))
                          }
                        }
                  e ? u() : (w.Deferred.getStackHook && (u.stackTrace = w.Deferred.getStackHook()), t.setTimeout(u))
                }
              }
              return w
                .Deferred(function (t) {
                  i[0][3].add(s(0, t, g(o) ? o : F, t.notifyWith)), i[1][3].add(s(0, t, g(e) ? e : F)), i[2][3].add(s(0, t, g(n) ? n : N))
                })
                .promise()
            },
            promise: function (t) {
              return null != t ? w.extend(t, o) : o
            }
          },
          r = {}
        return (
          w.each(i, function (t, e) {
            var s = e[2],
              a = e[5]
            ;(o[e[1]] = s.add),
              a &&
                s.add(
                  function () {
                    n = a
                  },
                  i[3 - t][2].disable,
                  i[3 - t][3].disable,
                  i[0][2].lock,
                  i[0][3].lock
                ),
              s.add(e[3].fire),
              (r[e[0]] = function () {
                return r[e[0] + 'With'](this === r ? void 0 : this, arguments), this
              }),
              (r[e[0] + 'With'] = s.fireWith)
          }),
          o.promise(r),
          e && e.call(r, r),
          r
        )
      },
      when: function (t) {
        function e(t) {
          return function (e) {
            ;(o[t] = this), (s[t] = 1 < arguments.length ? r.call(arguments) : e), --i || a.resolveWith(o, s)
          }
        }
        var i = arguments.length,
          n = i,
          o = Array(n),
          s = r.call(arguments),
          a = w.Deferred()
        if (i <= 1 && (R(t, a.done(e(n)).resolve, a.reject, !i), 'pending' === a.state() || g(s[n] && s[n].then))) return a.then()
        for (; n--; ) R(s[n], e(n), a.reject)
        return a.promise()
      }
    })
  var j = /^(Eval|Internal|Range|Reference|Syntax|Type|URI)Error$/
  ;(w.Deferred.exceptionHook = function (e, i) {
    t.console && t.console.warn && e && j.test(e.name) && t.console.warn('jQuery.Deferred exception: ' + e.message, e.stack, i)
  }),
    (w.readyException = function (e) {
      t.setTimeout(function () {
        throw e
      })
    })
  var $ = w.Deferred()
  function B() {
    m.removeEventListener('DOMContentLoaded', B), t.removeEventListener('load', B), w.ready()
  }
  ;(w.fn.ready = function (t) {
    return (
      $.then(t).catch(function (t) {
        w.readyException(t)
      }),
      this
    )
  }),
    w.extend({
      isReady: !1,
      readyWait: 1,
      ready: function (t) {
        ;(!0 === t ? --w.readyWait : w.isReady) || ((w.isReady = !0) !== t && 0 < --w.readyWait) || $.resolveWith(m, [w])
      }
    }),
    (w.ready.then = $.then),
    'complete' === m.readyState || ('loading' !== m.readyState && !m.documentElement.doScroll)
      ? t.setTimeout(w.ready)
      : (m.addEventListener('DOMContentLoaded', B), t.addEventListener('load', B))
  var W = function (t, e, i, n, o, r, s) {
      var a = 0,
        l = t.length,
        c = null == i
      if ('object' === b(i)) for (a in ((o = !0), i)) W(t, e, a, i[a], !0, r, s)
      else if (
        void 0 !== n &&
        ((o = !0),
        g(n) || (s = !0),
        c &&
          (e = s
            ? (e.call(t, n), null)
            : ((c = e),
              function (t, e, i) {
                return c.call(w(t), i)
              })),
        e)
      )
        for (; a < l; a++) e(t[a], i, s ? n : n.call(t[a], a, e(t[a], i)))
      return o ? t : c ? e.call(t) : l ? e(t[0], i) : r
    },
    H = /^-ms-/,
    q = /-([a-z])/g
  function V(t, e) {
    return e.toUpperCase()
  }
  function U(t) {
    return t.replace(H, 'ms-').replace(q, V)
  }
  function Y(t) {
    return 1 === t.nodeType || 9 === t.nodeType || !+t.nodeType
  }
  function Q() {
    this.expando = w.expando + Q.uid++
  }
  ;(Q.uid = 1),
    (Q.prototype = {
      cache: function (t) {
        var e = t[this.expando]
        return e || ((e = {}), Y(t) && (t.nodeType ? (t[this.expando] = e) : Object.defineProperty(t, this.expando, { value: e, configurable: !0 }))), e
      },
      set: function (t, e, i) {
        var n,
          o = this.cache(t)
        if ('string' == typeof e) o[U(e)] = i
        else for (n in e) o[U(n)] = e[n]
        return o
      },
      get: function (t, e) {
        return void 0 === e ? this.cache(t) : t[this.expando] && t[this.expando][U(e)]
      },
      access: function (t, e, i) {
        return void 0 === e || (e && 'string' == typeof e && void 0 === i) ? this.get(t, e) : (this.set(t, e, i), void 0 !== i ? i : e)
      },
      remove: function (t, e) {
        var i,
          n = t[this.expando]
        if (void 0 !== n) {
          if (void 0 !== e) {
            i = (e = Array.isArray(e) ? e.map(U) : (e = U(e)) in n ? [e] : e.match(z) || []).length
            for (; i--; ) delete n[e[i]]
          }
          ;(void 0 !== e && !w.isEmptyObject(n)) || (t.nodeType ? (t[this.expando] = void 0) : delete t[this.expando])
        }
      },
      hasData: function (t) {
        var e = t[this.expando]
        return void 0 !== e && !w.isEmptyObject(e)
      }
    })
  var G = new Q(),
    X = new Q(),
    K = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,
    Z = /[A-Z]/g
  function J(t, e, i) {
    var n, o
    if (void 0 === i && 1 === t.nodeType)
      if (((n = 'data-' + e.replace(Z, '-$&').toLowerCase()), 'string' == typeof (i = t.getAttribute(n)))) {
        try {
          i = 'true' === (o = i) || ('false' !== o && ('null' === o ? null : o === +o + '' ? +o : K.test(o) ? JSON.parse(o) : o))
        } catch (t) {}
        X.set(t, e, i)
      } else i = void 0
    return i
  }
  w.extend({
    hasData: function (t) {
      return X.hasData(t) || G.hasData(t)
    },
    data: function (t, e, i) {
      return X.access(t, e, i)
    },
    removeData: function (t, e) {
      X.remove(t, e)
    },
    _data: function (t, e, i) {
      return G.access(t, e, i)
    },
    _removeData: function (t, e) {
      G.remove(t, e)
    }
  }),
    w.fn.extend({
      data: function (t, e) {
        var i,
          n,
          o,
          r = this[0],
          s = r && r.attributes
        if (void 0 !== t)
          return 'object' == typeof t
            ? this.each(function () {
                X.set(this, t)
              })
            : W(
                this,
                function (e) {
                  var i
                  if (r && void 0 === e) return void 0 !== (i = X.get(r, t)) || void 0 !== (i = J(r, t)) ? i : void 0
                  this.each(function () {
                    X.set(this, t, e)
                  })
                },
                null,
                e,
                1 < arguments.length,
                null,
                !0
              )
        if (this.length && ((o = X.get(r)), 1 === r.nodeType && !G.get(r, 'hasDataAttrs'))) {
          for (i = s.length; i--; ) s[i] && 0 === (n = s[i].name).indexOf('data-') && ((n = U(n.slice(5))), J(r, n, o[n]))
          G.set(r, 'hasDataAttrs', !0)
        }
        return o
      },
      removeData: function (t) {
        return this.each(function () {
          X.remove(this, t)
        })
      }
    }),
    w.extend({
      queue: function (t, e, i) {
        var n
        if (t) return (e = (e || 'fx') + 'queue'), (n = G.get(t, e)), i && (!n || Array.isArray(i) ? (n = G.access(t, e, w.makeArray(i))) : n.push(i)), n || []
      },
      dequeue: function (t, e) {
        e = e || 'fx'
        var i = w.queue(t, e),
          n = i.length,
          o = i.shift(),
          r = w._queueHooks(t, e)
        'inprogress' === o && ((o = i.shift()), n--),
          o &&
            ('fx' === e && i.unshift('inprogress'),
            delete r.stop,
            o.call(
              t,
              function () {
                w.dequeue(t, e)
              },
              r
            )),
          !n && r && r.empty.fire()
      },
      _queueHooks: function (t, e) {
        var i = e + 'queueHooks'
        return (
          G.get(t, i) ||
          G.access(t, i, {
            empty: w.Callbacks('once memory').add(function () {
              G.remove(t, [e + 'queue', i])
            })
          })
        )
      }
    }),
    w.fn.extend({
      queue: function (t, e) {
        var i = 2
        return (
          'string' != typeof t && ((e = t), (t = 'fx'), i--),
          arguments.length < i
            ? w.queue(this[0], t)
            : void 0 === e
            ? this
            : this.each(function () {
                var i = w.queue(this, t, e)
                w._queueHooks(this, t), 'fx' === t && 'inprogress' !== i[0] && w.dequeue(this, t)
              })
        )
      },
      dequeue: function (t) {
        return this.each(function () {
          w.dequeue(this, t)
        })
      },
      clearQueue: function (t) {
        return this.queue(t || 'fx', [])
      },
      promise: function (t, e) {
        function i() {
          --o || r.resolveWith(s, [s])
        }
        var n,
          o = 1,
          r = w.Deferred(),
          s = this,
          a = this.length
        for ('string' != typeof t && ((e = t), (t = void 0)), t = t || 'fx'; a--; ) (n = G.get(s[a], t + 'queueHooks')) && n.empty && (o++, n.empty.add(i))
        return i(), r.promise(e)
      }
    })
  var tt = /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source,
    et = new RegExp('^(?:([+-])=|)(' + tt + ')([a-z%]*)$', 'i'),
    it = ['Top', 'Right', 'Bottom', 'Left'],
    nt = m.documentElement,
    ot = function (t) {
      return w.contains(t.ownerDocument, t)
    },
    rt = { composed: !0 }
  function st(t, e) {
    return 'none' === (t = e || t).style.display || ('' === t.style.display && ot(t) && 'none' === w.css(t, 'display'))
  }
  function at(t, e, i, n) {
    var o,
      r,
      s = 20,
      a = n
        ? function () {
            return n.cur()
          }
        : function () {
            return w.css(t, e, '')
          },
      l = a(),
      c = (i && i[3]) || (w.cssNumber[e] ? '' : 'px'),
      u = t.nodeType && (w.cssNumber[e] || ('px' !== c && +l)) && et.exec(w.css(t, e))
    if (u && u[3] !== c) {
      for (l /= 2, c = c || u[3], u = +l || 1; s--; ) w.style(t, e, u + c), (1 - r) * (1 - (r = a() / l || 0.5)) <= 0 && (s = 0), (u /= r)
      ;(u *= 2), w.style(t, e, u + c), (i = i || [])
    }
    return i && ((u = +u || +l || 0), (o = i[1] ? u + (i[1] + 1) * i[2] : +i[2]), n && ((n.unit = c), (n.start = u), (n.end = o))), o
  }
  nt.getRootNode &&
    (ot = function (t) {
      return w.contains(t.ownerDocument, t) || t.getRootNode(rt) === t.ownerDocument
    })
  var lt = {}
  function ct(t, e) {
    for (var i, n, o, r, s, a, l = [], c = 0, u = t.length; c < u; c++)
      (n = t[c]).style &&
        ((i = n.style.display),
        e
          ? ('none' === i && ((l[c] = G.get(n, 'display') || null), l[c] || (n.style.display = '')),
            '' === n.style.display &&
              st(n) &&
              (l[c] =
                ((a = r = o = void 0),
                (r = n.ownerDocument),
                (s = n.nodeName),
                (a = lt[s]) || ((o = r.body.appendChild(r.createElement(s))), (a = w.css(o, 'display')), o.parentNode.removeChild(o), 'none' === a && (a = 'block'), (lt[s] = a)))))
          : 'none' !== i && ((l[c] = 'none'), G.set(n, 'display', i)))
    for (c = 0; c < u; c++) null != l[c] && (t[c].style.display = l[c])
    return t
  }
  w.fn.extend({
    show: function () {
      return ct(this, !0)
    },
    hide: function () {
      return ct(this)
    },
    toggle: function (t) {
      return 'boolean' == typeof t
        ? t
          ? this.show()
          : this.hide()
        : this.each(function () {
            st(this) ? w(this).show() : w(this).hide()
          })
    }
  })
  var ut,
    dt = /^(?:checkbox|radio)$/i,
    ht = /<([a-z][^\/\0>\x20\t\r\n\f]*)/i,
    ft = /^$|^module$|\/(?:java|ecma)script/i,
    pt = m.createDocumentFragment().appendChild(m.createElement('div'))
  ;(ut = m.createElement('input')).setAttribute('type', 'radio'),
    ut.setAttribute('checked', 'checked'),
    ut.setAttribute('name', 't'),
    pt.appendChild(ut),
    (p.checkClone = pt.cloneNode(!0).cloneNode(!0).lastChild.checked),
    (pt.innerHTML = '<textarea>x</textarea>'),
    (p.noCloneChecked = !!pt.cloneNode(!0).lastChild.defaultValue),
    (pt.innerHTML = '<option></option>'),
    (p.option = !!pt.lastChild)
  var gt = {
    thead: [1, '<table>', '</table>'],
    col: [2, '<table><colgroup>', '</colgroup></table>'],
    tr: [2, '<table><tbody>', '</tbody></table>'],
    td: [3, '<table><tbody><tr>', '</tr></tbody></table>'],
    _default: [0, '', '']
  }
  function mt(t, e) {
    var i = void 0 !== t.getElementsByTagName ? t.getElementsByTagName(e || '*') : void 0 !== t.querySelectorAll ? t.querySelectorAll(e || '*') : []
    return void 0 === e || (e && E(t, e)) ? w.merge([t], i) : i
  }
  function vt(t, e) {
    for (var i = 0, n = t.length; i < n; i++) G.set(t[i], 'globalEval', !e || G.get(e[i], 'globalEval'))
  }
  ;(gt.tbody = gt.tfoot = gt.colgroup = gt.caption = gt.thead), (gt.th = gt.td), p.option || (gt.optgroup = gt.option = [1, "<select multiple='multiple'>", '</select>'])
  var yt = /<|&#?\w+;/
  function bt(t, e, i, n, o) {
    for (var r, s, a, l, c, u, d = e.createDocumentFragment(), h = [], f = 0, p = t.length; f < p; f++)
      if ((r = t[f]) || 0 === r)
        if ('object' === b(r)) w.merge(h, r.nodeType ? [r] : r)
        else if (yt.test(r)) {
          for (
            s = s || d.appendChild(e.createElement('div')),
              a = (ht.exec(r) || ['', ''])[1].toLowerCase(),
              l = gt[a] || gt._default,
              s.innerHTML = l[1] + w.htmlPrefilter(r) + l[2],
              u = l[0];
            u--;

          )
            s = s.lastChild
          w.merge(h, s.childNodes), ((s = d.firstChild).textContent = '')
        } else h.push(e.createTextNode(r))
    for (d.textContent = '', f = 0; (r = h[f++]); )
      if (n && -1 < w.inArray(r, n)) o && o.push(r)
      else if (((c = ot(r)), (s = mt(d.appendChild(r), 'script')), c && vt(s), i)) for (u = 0; (r = s[u++]); ) ft.test(r.type || '') && i.push(r)
    return d
  }
  var _t = /^key/,
    wt = /^(?:mouse|pointer|contextmenu|drag|drop)|click/,
    xt = /^([^.]*)(?:\.(.+)|)/
  function Ct() {
    return !0
  }
  function kt() {
    return !1
  }
  function Tt(t, e) {
    return (
      (t ===
        (function () {
          try {
            return m.activeElement
          } catch (t) {}
        })()) ==
      ('focus' === e)
    )
  }
  function St(t, e, i, n, o, r) {
    var s, a
    if ('object' == typeof e) {
      for (a in ('string' != typeof i && ((n = n || i), (i = void 0)), e)) St(t, a, i, n, e[a], r)
      return t
    }
    if ((null == n && null == o ? ((o = i), (n = i = void 0)) : null == o && ('string' == typeof i ? ((o = n), (n = void 0)) : ((o = n), (n = i), (i = void 0))), !1 === o)) o = kt
    else if (!o) return t
    return (
      1 === r &&
        ((s = o),
        ((o = function (t) {
          return w().off(t), s.apply(this, arguments)
        }).guid = s.guid || (s.guid = w.guid++))),
      t.each(function () {
        w.event.add(this, e, o, n, i)
      })
    )
  }
  function Et(t, e, i) {
    i
      ? (G.set(t, e, !1),
        w.event.add(t, e, {
          namespace: !1,
          handler: function (t) {
            var n,
              o,
              s = G.get(this, e)
            if (1 & t.isTrigger && this[e]) {
              if (s.length) (w.event.special[e] || {}).delegateType && t.stopPropagation()
              else if (((s = r.call(arguments)), G.set(this, e, s), (n = i(this, e)), this[e](), s !== (o = G.get(this, e)) || n ? G.set(this, e, !1) : (o = {}), s !== o))
                return t.stopImmediatePropagation(), t.preventDefault(), o.value
            } else s.length && (G.set(this, e, { value: w.event.trigger(w.extend(s[0], w.Event.prototype), s.slice(1), this) }), t.stopImmediatePropagation())
          }
        }))
      : void 0 === G.get(t, e) && w.event.add(t, e, Ct)
  }
  ;(w.event = {
    global: {},
    add: function (t, e, i, n, o) {
      var r,
        s,
        a,
        l,
        c,
        u,
        d,
        h,
        f,
        p,
        g,
        m = G.get(t)
      if (Y(t))
        for (
          i.handler && ((i = (r = i).handler), (o = r.selector)),
            o && w.find.matchesSelector(nt, o),
            i.guid || (i.guid = w.guid++),
            (l = m.events) || (l = m.events = Object.create(null)),
            (s = m.handle) ||
              (s = m.handle =
                function (e) {
                  return void 0 !== w && w.event.triggered !== e.type ? w.event.dispatch.apply(t, arguments) : void 0
                }),
            c = (e = (e || '').match(z) || ['']).length;
          c--;

        )
          (f = g = (a = xt.exec(e[c]) || [])[1]),
            (p = (a[2] || '').split('.').sort()),
            f &&
              ((d = w.event.special[f] || {}),
              (f = (o ? d.delegateType : d.bindType) || f),
              (d = w.event.special[f] || {}),
              (u = w.extend(
                { type: f, origType: g, data: n, handler: i, guid: i.guid, selector: o, needsContext: o && w.expr.match.needsContext.test(o), namespace: p.join('.') },
                r
              )),
              (h = l[f]) || (((h = l[f] = []).delegateCount = 0), (d.setup && !1 !== d.setup.call(t, n, p, s)) || (t.addEventListener && t.addEventListener(f, s))),
              d.add && (d.add.call(t, u), u.handler.guid || (u.handler.guid = i.guid)),
              o ? h.splice(h.delegateCount++, 0, u) : h.push(u),
              (w.event.global[f] = !0))
    },
    remove: function (t, e, i, n, o) {
      var r,
        s,
        a,
        l,
        c,
        u,
        d,
        h,
        f,
        p,
        g,
        m = G.hasData(t) && G.get(t)
      if (m && (l = m.events)) {
        for (c = (e = (e || '').match(z) || ['']).length; c--; )
          if (((f = g = (a = xt.exec(e[c]) || [])[1]), (p = (a[2] || '').split('.').sort()), f)) {
            for (
              d = w.event.special[f] || {},
                h = l[(f = (n ? d.delegateType : d.bindType) || f)] || [],
                a = a[2] && new RegExp('(^|\\.)' + p.join('\\.(?:.*\\.|)') + '(\\.|$)'),
                s = r = h.length;
              r--;

            )
              (u = h[r]),
                (!o && g !== u.origType) ||
                  (i && i.guid !== u.guid) ||
                  (a && !a.test(u.namespace)) ||
                  (n && n !== u.selector && ('**' !== n || !u.selector)) ||
                  (h.splice(r, 1), u.selector && h.delegateCount--, d.remove && d.remove.call(t, u))
            s && !h.length && ((d.teardown && !1 !== d.teardown.call(t, p, m.handle)) || w.removeEvent(t, f, m.handle), delete l[f])
          } else for (f in l) w.event.remove(t, f + e[c], i, n, !0)
        w.isEmptyObject(l) && G.remove(t, 'handle events')
      }
    },
    dispatch: function (t) {
      var e,
        i,
        n,
        o,
        r,
        s,
        a = new Array(arguments.length),
        l = w.event.fix(t),
        c = (G.get(this, 'events') || Object.create(null))[l.type] || [],
        u = w.event.special[l.type] || {}
      for (a[0] = l, e = 1; e < arguments.length; e++) a[e] = arguments[e]
      if (((l.delegateTarget = this), !u.preDispatch || !1 !== u.preDispatch.call(this, l))) {
        for (s = w.event.handlers.call(this, l, c), e = 0; (o = s[e++]) && !l.isPropagationStopped(); )
          for (l.currentTarget = o.elem, i = 0; (r = o.handlers[i++]) && !l.isImmediatePropagationStopped(); )
            (l.rnamespace && !1 !== r.namespace && !l.rnamespace.test(r.namespace)) ||
              ((l.handleObj = r),
              (l.data = r.data),
              void 0 !== (n = ((w.event.special[r.origType] || {}).handle || r.handler).apply(o.elem, a)) && !1 === (l.result = n) && (l.preventDefault(), l.stopPropagation()))
        return u.postDispatch && u.postDispatch.call(this, l), l.result
      }
    },
    handlers: function (t, e) {
      var i,
        n,
        o,
        r,
        s,
        a = [],
        l = e.delegateCount,
        c = t.target
      if (l && c.nodeType && !('click' === t.type && 1 <= t.button))
        for (; c !== this; c = c.parentNode || this)
          if (1 === c.nodeType && ('click' !== t.type || !0 !== c.disabled)) {
            for (r = [], s = {}, i = 0; i < l; i++)
              void 0 === s[(o = (n = e[i]).selector + ' ')] && (s[o] = n.needsContext ? -1 < w(o, this).index(c) : w.find(o, this, null, [c]).length), s[o] && r.push(n)
            r.length && a.push({ elem: c, handlers: r })
          }
      return (c = this), l < e.length && a.push({ elem: c, handlers: e.slice(l) }), a
    },
    addProp: function (t, e) {
      Object.defineProperty(w.Event.prototype, t, {
        enumerable: !0,
        configurable: !0,
        get: g(e)
          ? function () {
              if (this.originalEvent) return e(this.originalEvent)
            }
          : function () {
              if (this.originalEvent) return this.originalEvent[t]
            },
        set: function (e) {
          Object.defineProperty(this, t, { enumerable: !0, configurable: !0, writable: !0, value: e })
        }
      })
    },
    fix: function (t) {
      return t[w.expando] ? t : new w.Event(t)
    },
    special: {
      load: { noBubble: !0 },
      click: {
        setup: function (t) {
          var e = this || t
          return dt.test(e.type) && e.click && E(e, 'input') && Et(e, 'click', Ct), !1
        },
        trigger: function (t) {
          var e = this || t
          return dt.test(e.type) && e.click && E(e, 'input') && Et(e, 'click'), !0
        },
        _default: function (t) {
          var e = t.target
          return (dt.test(e.type) && e.click && E(e, 'input') && G.get(e, 'click')) || E(e, 'a')
        }
      },
      beforeunload: {
        postDispatch: function (t) {
          void 0 !== t.result && t.originalEvent && (t.originalEvent.returnValue = t.result)
        }
      }
    }
  }),
    (w.removeEvent = function (t, e, i) {
      t.removeEventListener && t.removeEventListener(e, i)
    }),
    (w.Event = function (t, e) {
      if (!(this instanceof w.Event)) return new w.Event(t, e)
      t && t.type
        ? ((this.originalEvent = t),
          (this.type = t.type),
          (this.isDefaultPrevented = t.defaultPrevented || (void 0 === t.defaultPrevented && !1 === t.returnValue) ? Ct : kt),
          (this.target = t.target && 3 === t.target.nodeType ? t.target.parentNode : t.target),
          (this.currentTarget = t.currentTarget),
          (this.relatedTarget = t.relatedTarget))
        : (this.type = t),
        e && w.extend(this, e),
        (this.timeStamp = (t && t.timeStamp) || Date.now()),
        (this[w.expando] = !0)
    }),
    (w.Event.prototype = {
      constructor: w.Event,
      isDefaultPrevented: kt,
      isPropagationStopped: kt,
      isImmediatePropagationStopped: kt,
      isSimulated: !1,
      preventDefault: function () {
        var t = this.originalEvent
        ;(this.isDefaultPrevented = Ct), t && !this.isSimulated && t.preventDefault()
      },
      stopPropagation: function () {
        var t = this.originalEvent
        ;(this.isPropagationStopped = Ct), t && !this.isSimulated && t.stopPropagation()
      },
      stopImmediatePropagation: function () {
        var t = this.originalEvent
        ;(this.isImmediatePropagationStopped = Ct), t && !this.isSimulated && t.stopImmediatePropagation(), this.stopPropagation()
      }
    }),
    w.each(
      {
        altKey: !0,
        bubbles: !0,
        cancelable: !0,
        changedTouches: !0,
        ctrlKey: !0,
        detail: !0,
        eventPhase: !0,
        metaKey: !0,
        pageX: !0,
        pageY: !0,
        shiftKey: !0,
        view: !0,
        char: !0,
        code: !0,
        charCode: !0,
        key: !0,
        keyCode: !0,
        button: !0,
        buttons: !0,
        clientX: !0,
        clientY: !0,
        offsetX: !0,
        offsetY: !0,
        pointerId: !0,
        pointerType: !0,
        screenX: !0,
        screenY: !0,
        targetTouches: !0,
        toElement: !0,
        touches: !0,
        which: function (t) {
          var e = t.button
          return null == t.which && _t.test(t.type)
            ? null != t.charCode
              ? t.charCode
              : t.keyCode
            : !t.which && void 0 !== e && wt.test(t.type)
            ? 1 & e
              ? 1
              : 2 & e
              ? 3
              : 4 & e
              ? 2
              : 0
            : t.which
        }
      },
      w.event.addProp
    ),
    w.each({ focus: 'focusin', blur: 'focusout' }, function (t, e) {
      w.event.special[t] = {
        setup: function () {
          return Et(this, t, Tt), !1
        },
        trigger: function () {
          return Et(this, t), !0
        },
        delegateType: e
      }
    }),
    w.each({ mouseenter: 'mouseover', mouseleave: 'mouseout', pointerenter: 'pointerover', pointerleave: 'pointerout' }, function (t, e) {
      w.event.special[t] = {
        delegateType: e,
        bindType: e,
        handle: function (t) {
          var i,
            n = t.relatedTarget,
            o = t.handleObj
          return (n && (n === this || w.contains(this, n))) || ((t.type = o.origType), (i = o.handler.apply(this, arguments)), (t.type = e)), i
        }
      }
    }),
    w.fn.extend({
      on: function (t, e, i, n) {
        return St(this, t, e, i, n)
      },
      one: function (t, e, i, n) {
        return St(this, t, e, i, n, 1)
      },
      off: function (t, e, i) {
        var n, o
        if (t && t.preventDefault && t.handleObj)
          return (n = t.handleObj), w(t.delegateTarget).off(n.namespace ? n.origType + '.' + n.namespace : n.origType, n.selector, n.handler), this
        if ('object' != typeof t)
          return (
            (!1 !== e && 'function' != typeof e) || ((i = e), (e = void 0)),
            !1 === i && (i = kt),
            this.each(function () {
              w.event.remove(this, t, i, e)
            })
          )
        for (o in t) this.off(o, e, t[o])
        return this
      }
    })
  var It = /<script|<style|<link/i,
    At = /checked\s*(?:[^=]|=\s*.checked.)/i,
    Dt = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g
  function Ot(t, e) {
    return (E(t, 'table') && E(11 !== e.nodeType ? e : e.firstChild, 'tr') && w(t).children('tbody')[0]) || t
  }
  function Mt(t) {
    return (t.type = (null !== t.getAttribute('type')) + '/' + t.type), t
  }
  function Pt(t) {
    return 'true/' === (t.type || '').slice(0, 5) ? (t.type = t.type.slice(5)) : t.removeAttribute('type'), t
  }
  function Lt(t, e) {
    var i, n, o, r, s, a
    if (1 === e.nodeType) {
      if (G.hasData(t) && (a = G.get(t).events)) for (o in (G.remove(e, 'handle events'), a)) for (i = 0, n = a[o].length; i < n; i++) w.event.add(e, o, a[o][i])
      X.hasData(t) && ((r = X.access(t)), (s = w.extend({}, r)), X.set(e, s))
    }
  }
  function zt(t, e, i, n) {
    e = s(e)
    var o,
      r,
      a,
      l,
      c,
      u,
      d = 0,
      h = t.length,
      f = h - 1,
      m = e[0],
      v = g(m)
    if (v || (1 < h && 'string' == typeof m && !p.checkClone && At.test(m)))
      return t.each(function (o) {
        var r = t.eq(o)
        v && (e[0] = m.call(this, o, r.html())), zt(r, e, i, n)
      })
    if (h && ((r = (o = bt(e, t[0].ownerDocument, !1, t, n)).firstChild), 1 === o.childNodes.length && (o = r), r || n)) {
      for (l = (a = w.map(mt(o, 'script'), Mt)).length; d < h; d++) (c = o), d !== f && ((c = w.clone(c, !0, !0)), l && w.merge(a, mt(c, 'script'))), i.call(t[d], c, d)
      if (l)
        for (u = a[a.length - 1].ownerDocument, w.map(a, Pt), d = 0; d < l; d++)
          (c = a[d]),
            ft.test(c.type || '') &&
              !G.access(c, 'globalEval') &&
              w.contains(u, c) &&
              (c.src && 'module' !== (c.type || '').toLowerCase()
                ? w._evalUrl && !c.noModule && w._evalUrl(c.src, { nonce: c.nonce || c.getAttribute('nonce') }, u)
                : y(c.textContent.replace(Dt, ''), c, u))
    }
    return t
  }
  function Ft(t, e, i) {
    for (var n, o = e ? w.filter(e, t) : t, r = 0; null != (n = o[r]); r++)
      i || 1 !== n.nodeType || w.cleanData(mt(n)), n.parentNode && (i && ot(n) && vt(mt(n, 'script')), n.parentNode.removeChild(n))
    return t
  }
  function Nt(t, e, i) {
    var n,
      o,
      r = {}
    for (o in e) (r[o] = t.style[o]), (t.style[o] = e[o])
    for (o in ((n = i.call(t)), e)) t.style[o] = r[o]
    return n
  }
  w.extend({
    htmlPrefilter: function (t) {
      return t
    },
    clone: function (t, e, i) {
      var n,
        o,
        r,
        s,
        a,
        l,
        c,
        u = t.cloneNode(!0),
        d = ot(t)
      if (!(p.noCloneChecked || (1 !== t.nodeType && 11 !== t.nodeType) || w.isXMLDoc(t)))
        for (s = mt(u), n = 0, o = (r = mt(t)).length; n < o; n++)
          (a = r[n]),
            'input' === (c = (l = s[n]).nodeName.toLowerCase()) && dt.test(a.type)
              ? (l.checked = a.checked)
              : ('input' !== c && 'textarea' !== c) || (l.defaultValue = a.defaultValue)
      if (e)
        if (i) for (r = r || mt(t), s = s || mt(u), n = 0, o = r.length; n < o; n++) Lt(r[n], s[n])
        else Lt(t, u)
      return 0 < (s = mt(u, 'script')).length && vt(s, !d && mt(t, 'script')), u
    },
    cleanData: function (t) {
      for (var e, i, n, o = w.event.special, r = 0; void 0 !== (i = t[r]); r++)
        if (Y(i)) {
          if ((e = i[G.expando])) {
            if (e.events) for (n in e.events) o[n] ? w.event.remove(i, n) : w.removeEvent(i, n, e.handle)
            i[G.expando] = void 0
          }
          i[X.expando] && (i[X.expando] = void 0)
        }
    }
  }),
    w.fn.extend({
      detach: function (t) {
        return Ft(this, t, !0)
      },
      remove: function (t) {
        return Ft(this, t)
      },
      text: function (t) {
        return W(
          this,
          function (t) {
            return void 0 === t
              ? w.text(this)
              : this.empty().each(function () {
                  ;(1 !== this.nodeType && 11 !== this.nodeType && 9 !== this.nodeType) || (this.textContent = t)
                })
          },
          null,
          t,
          arguments.length
        )
      },
      append: function () {
        return zt(this, arguments, function (t) {
          ;(1 !== this.nodeType && 11 !== this.nodeType && 9 !== this.nodeType) || Ot(this, t).appendChild(t)
        })
      },
      prepend: function () {
        return zt(this, arguments, function (t) {
          var e
          ;(1 !== this.nodeType && 11 !== this.nodeType && 9 !== this.nodeType) || (e = Ot(this, t)).insertBefore(t, e.firstChild)
        })
      },
      before: function () {
        return zt(this, arguments, function (t) {
          this.parentNode && this.parentNode.insertBefore(t, this)
        })
      },
      after: function () {
        return zt(this, arguments, function (t) {
          this.parentNode && this.parentNode.insertBefore(t, this.nextSibling)
        })
      },
      empty: function () {
        for (var t, e = 0; null != (t = this[e]); e++) 1 === t.nodeType && (w.cleanData(mt(t, !1)), (t.textContent = ''))
        return this
      },
      clone: function (t, e) {
        return (
          (t = null != t && t),
          (e = null == e ? t : e),
          this.map(function () {
            return w.clone(this, t, e)
          })
        )
      },
      html: function (t) {
        return W(
          this,
          function (t) {
            var e = this[0] || {},
              i = 0,
              n = this.length
            if (void 0 === t && 1 === e.nodeType) return e.innerHTML
            if ('string' == typeof t && !It.test(t) && !gt[(ht.exec(t) || ['', ''])[1].toLowerCase()]) {
              t = w.htmlPrefilter(t)
              try {
                for (; i < n; i++) 1 === (e = this[i] || {}).nodeType && (w.cleanData(mt(e, !1)), (e.innerHTML = t))
                e = 0
              } catch (t) {}
            }
            e && this.empty().append(t)
          },
          null,
          t,
          arguments.length
        )
      },
      replaceWith: function () {
        var t = []
        return zt(
          this,
          arguments,
          function (e) {
            var i = this.parentNode
            w.inArray(this, t) < 0 && (w.cleanData(mt(this)), i && i.replaceChild(e, this))
          },
          t
        )
      }
    }),
    w.each({ appendTo: 'append', prependTo: 'prepend', insertBefore: 'before', insertAfter: 'after', replaceAll: 'replaceWith' }, function (t, e) {
      w.fn[t] = function (t) {
        for (var i, n = [], o = w(t), r = o.length - 1, s = 0; s <= r; s++) (i = s === r ? this : this.clone(!0)), w(o[s])[e](i), a.apply(n, i.get())
        return this.pushStack(n)
      }
    })
  var Rt,
    jt,
    $t,
    Bt,
    Wt,
    Ht,
    qt,
    Vt,
    Ut = new RegExp('^(' + tt + ')(?!px)[a-z%]+$', 'i'),
    Yt = function (e) {
      var i = e.ownerDocument.defaultView
      return (i && i.opener) || (i = t), i.getComputedStyle(e)
    },
    Qt = new RegExp(it.join('|'), 'i')
  function Gt(t, e, i) {
    var n,
      o,
      r,
      s,
      a = t.style
    return (
      (i = i || Yt(t)) &&
        ('' !== (s = i.getPropertyValue(e) || i[e]) || ot(t) || (s = w.style(t, e)),
        !p.pixelBoxStyles() &&
          Ut.test(s) &&
          Qt.test(e) &&
          ((n = a.width), (o = a.minWidth), (r = a.maxWidth), (a.minWidth = a.maxWidth = a.width = s), (s = i.width), (a.width = n), (a.minWidth = o), (a.maxWidth = r))),
      void 0 !== s ? s + '' : s
    )
  }
  function Xt(t, e) {
    return {
      get: function () {
        if (!t()) return (this.get = e).apply(this, arguments)
        delete this.get
      }
    }
  }
  function Kt() {
    var e
    Vt &&
      ((qt.style.cssText = 'position:absolute;left:-11111px;width:60px;margin-top:1px;padding:0;border:0'),
      (Vt.style.cssText = 'position:relative;display:block;box-sizing:border-box;overflow:scroll;margin:auto;border:1px;padding:1px;width:60%;top:1%'),
      nt.appendChild(qt).appendChild(Vt),
      (e = t.getComputedStyle(Vt)),
      (Rt = '1%' !== e.top),
      (Ht = 12 === Zt(e.marginLeft)),
      (Vt.style.right = '60%'),
      (Bt = 36 === Zt(e.right)),
      (jt = 36 === Zt(e.width)),
      (Vt.style.position = 'absolute'),
      ($t = 12 === Zt(Vt.offsetWidth / 3)),
      nt.removeChild(qt),
      (Vt = null))
  }
  function Zt(t) {
    return Math.round(parseFloat(t))
  }
  ;(qt = m.createElement('div')),
    (Vt = m.createElement('div')).style &&
      ((Vt.style.backgroundClip = 'content-box'),
      (Vt.cloneNode(!0).style.backgroundClip = ''),
      (p.clearCloneStyle = 'content-box' === Vt.style.backgroundClip),
      w.extend(p, {
        boxSizingReliable: function () {
          return Kt(), jt
        },
        pixelBoxStyles: function () {
          return Kt(), Bt
        },
        pixelPosition: function () {
          return Kt(), Rt
        },
        reliableMarginLeft: function () {
          return Kt(), Ht
        },
        scrollboxSize: function () {
          return Kt(), $t
        },
        reliableTrDimensions: function () {
          var e, i, n, o
          return (
            null == Wt &&
              ((e = m.createElement('table')),
              (i = m.createElement('tr')),
              (n = m.createElement('div')),
              (e.style.cssText = 'position:absolute;left:-11111px'),
              (i.style.height = '1px'),
              (n.style.height = '9px'),
              nt.appendChild(e).appendChild(i).appendChild(n),
              (o = t.getComputedStyle(i)),
              (Wt = 3 < parseInt(o.height)),
              nt.removeChild(e)),
            Wt
          )
        }
      }))
  var Jt = ['Webkit', 'Moz', 'ms'],
    te = m.createElement('div').style,
    ee = {}
  function ie(t) {
    return (
      w.cssProps[t] ||
      ee[t] ||
      (t in te
        ? t
        : (ee[t] =
            (function (t) {
              for (var e = t[0].toUpperCase() + t.slice(1), i = Jt.length; i--; ) if ((t = Jt[i] + e) in te) return t
            })(t) || t))
    )
  }
  var ne = /^(none|table(?!-c[ea]).+)/,
    oe = /^--/,
    re = { position: 'absolute', visibility: 'hidden', display: 'block' },
    se = { letterSpacing: '0', fontWeight: '400' }
  function ae(t, e, i) {
    var n = et.exec(e)
    return n ? Math.max(0, n[2] - (i || 0)) + (n[3] || 'px') : e
  }
  function le(t, e, i, n, o, r) {
    var s = 'width' === e ? 1 : 0,
      a = 0,
      l = 0
    if (i === (n ? 'border' : 'content')) return 0
    for (; s < 4; s += 2)
      'margin' === i && (l += w.css(t, i + it[s], !0, o)),
        n
          ? ('content' === i && (l -= w.css(t, 'padding' + it[s], !0, o)), 'margin' !== i && (l -= w.css(t, 'border' + it[s] + 'Width', !0, o)))
          : ((l += w.css(t, 'padding' + it[s], !0, o)), 'padding' !== i ? (l += w.css(t, 'border' + it[s] + 'Width', !0, o)) : (a += w.css(t, 'border' + it[s] + 'Width', !0, o)))
    return !n && 0 <= r && (l += Math.max(0, Math.ceil(t['offset' + e[0].toUpperCase() + e.slice(1)] - r - l - a - 0.5)) || 0), l
  }
  function ce(t, e, i) {
    var n = Yt(t),
      o = (!p.boxSizingReliable() || i) && 'border-box' === w.css(t, 'boxSizing', !1, n),
      r = o,
      s = Gt(t, e, n),
      a = 'offset' + e[0].toUpperCase() + e.slice(1)
    if (Ut.test(s)) {
      if (!i) return s
      s = 'auto'
    }
    return (
      ((!p.boxSizingReliable() && o) || (!p.reliableTrDimensions() && E(t, 'tr')) || 'auto' === s || (!parseFloat(s) && 'inline' === w.css(t, 'display', !1, n))) &&
        t.getClientRects().length &&
        ((o = 'border-box' === w.css(t, 'boxSizing', !1, n)), (r = a in t) && (s = t[a])),
      (s = parseFloat(s) || 0) + le(t, e, i || (o ? 'border' : 'content'), r, n, s) + 'px'
    )
  }
  function ue(t, e, i, n, o) {
    return new ue.prototype.init(t, e, i, n, o)
  }
  w.extend({
    cssHooks: {
      opacity: {
        get: function (t, e) {
          if (e) {
            var i = Gt(t, 'opacity')
            return '' === i ? '1' : i
          }
        }
      }
    },
    cssNumber: {
      animationIterationCount: !0,
      columnCount: !0,
      fillOpacity: !0,
      flexGrow: !0,
      flexShrink: !0,
      fontWeight: !0,
      gridArea: !0,
      gridColumn: !0,
      gridColumnEnd: !0,
      gridColumnStart: !0,
      gridRow: !0,
      gridRowEnd: !0,
      gridRowStart: !0,
      lineHeight: !0,
      opacity: !0,
      order: !0,
      orphans: !0,
      widows: !0,
      zIndex: !0,
      zoom: !0
    },
    cssProps: {},
    style: function (t, e, i, n) {
      if (t && 3 !== t.nodeType && 8 !== t.nodeType && t.style) {
        var o,
          r,
          s,
          a = U(e),
          l = oe.test(e),
          c = t.style
        if ((l || (e = ie(a)), (s = w.cssHooks[e] || w.cssHooks[a]), void 0 === i)) return s && 'get' in s && void 0 !== (o = s.get(t, !1, n)) ? o : c[e]
        'string' == (r = typeof i) && (o = et.exec(i)) && o[1] && ((i = at(t, e, o)), (r = 'number')),
          null != i &&
            i == i &&
            ('number' !== r || l || (i += (o && o[3]) || (w.cssNumber[a] ? '' : 'px')),
            p.clearCloneStyle || '' !== i || 0 !== e.indexOf('background') || (c[e] = 'inherit'),
            (s && 'set' in s && void 0 === (i = s.set(t, i, n))) || (l ? c.setProperty(e, i) : (c[e] = i)))
      }
    },
    css: function (t, e, i, n) {
      var o,
        r,
        s,
        a = U(e)
      return (
        oe.test(e) || (e = ie(a)),
        (s = w.cssHooks[e] || w.cssHooks[a]) && 'get' in s && (o = s.get(t, !0, i)),
        void 0 === o && (o = Gt(t, e, n)),
        'normal' === o && e in se && (o = se[e]),
        '' === i || i ? ((r = parseFloat(o)), !0 === i || isFinite(r) ? r || 0 : o) : o
      )
    }
  }),
    w.each(['height', 'width'], function (t, e) {
      w.cssHooks[e] = {
        get: function (t, i, n) {
          if (i)
            return !ne.test(w.css(t, 'display')) || (t.getClientRects().length && t.getBoundingClientRect().width)
              ? ce(t, e, n)
              : Nt(t, re, function () {
                  return ce(t, e, n)
                })
        },
        set: function (t, i, n) {
          var o,
            r = Yt(t),
            s = !p.scrollboxSize() && 'absolute' === r.position,
            a = (s || n) && 'border-box' === w.css(t, 'boxSizing', !1, r),
            l = n ? le(t, e, n, a, r) : 0
          return (
            a && s && (l -= Math.ceil(t['offset' + e[0].toUpperCase() + e.slice(1)] - parseFloat(r[e]) - le(t, e, 'border', !1, r) - 0.5)),
            l && (o = et.exec(i)) && 'px' !== (o[3] || 'px') && ((t.style[e] = i), (i = w.css(t, e))),
            ae(0, i, l)
          )
        }
      }
    }),
    (w.cssHooks.marginLeft = Xt(p.reliableMarginLeft, function (t, e) {
      if (e)
        return (
          (parseFloat(Gt(t, 'marginLeft')) ||
            t.getBoundingClientRect().left -
              Nt(t, { marginLeft: 0 }, function () {
                return t.getBoundingClientRect().left
              })) + 'px'
        )
    })),
    w.each({ margin: '', padding: '', border: 'Width' }, function (t, e) {
      ;(w.cssHooks[t + e] = {
        expand: function (i) {
          for (var n = 0, o = {}, r = 'string' == typeof i ? i.split(' ') : [i]; n < 4; n++) o[t + it[n] + e] = r[n] || r[n - 2] || r[0]
          return o
        }
      }),
        'margin' !== t && (w.cssHooks[t + e].set = ae)
    }),
    w.fn.extend({
      css: function (t, e) {
        return W(
          this,
          function (t, e, i) {
            var n,
              o,
              r = {},
              s = 0
            if (Array.isArray(e)) {
              for (n = Yt(t), o = e.length; s < o; s++) r[e[s]] = w.css(t, e[s], !1, n)
              return r
            }
            return void 0 !== i ? w.style(t, e, i) : w.css(t, e)
          },
          t,
          e,
          1 < arguments.length
        )
      }
    }),
    (((w.Tween = ue).prototype = {
      constructor: ue,
      init: function (t, e, i, n, o, r) {
        ;(this.elem = t),
          (this.prop = i),
          (this.easing = o || w.easing._default),
          (this.options = e),
          (this.start = this.now = this.cur()),
          (this.end = n),
          (this.unit = r || (w.cssNumber[i] ? '' : 'px'))
      },
      cur: function () {
        var t = ue.propHooks[this.prop]
        return t && t.get ? t.get(this) : ue.propHooks._default.get(this)
      },
      run: function (t) {
        var e,
          i = ue.propHooks[this.prop]
        return (
          this.options.duration ? (this.pos = e = w.easing[this.easing](t, this.options.duration * t, 0, 1, this.options.duration)) : (this.pos = e = t),
          (this.now = (this.end - this.start) * e + this.start),
          this.options.step && this.options.step.call(this.elem, this.now, this),
          i && i.set ? i.set(this) : ue.propHooks._default.set(this),
          this
        )
      }
    }).init.prototype = ue.prototype),
    ((ue.propHooks = {
      _default: {
        get: function (t) {
          var e
          return 1 !== t.elem.nodeType || (null != t.elem[t.prop] && null == t.elem.style[t.prop]) ? t.elem[t.prop] : (e = w.css(t.elem, t.prop, '')) && 'auto' !== e ? e : 0
        },
        set: function (t) {
          w.fx.step[t.prop]
            ? w.fx.step[t.prop](t)
            : 1 !== t.elem.nodeType || (!w.cssHooks[t.prop] && null == t.elem.style[ie(t.prop)])
            ? (t.elem[t.prop] = t.now)
            : w.style(t.elem, t.prop, t.now + t.unit)
        }
      }
    }).scrollTop = ue.propHooks.scrollLeft =
      {
        set: function (t) {
          t.elem.nodeType && t.elem.parentNode && (t.elem[t.prop] = t.now)
        }
      }),
    (w.easing = {
      linear: function (t) {
        return t
      },
      swing: function (t) {
        return 0.5 - Math.cos(t * Math.PI) / 2
      },
      _default: 'swing'
    }),
    (w.fx = ue.prototype.init),
    (w.fx.step = {})
  var de,
    he,
    fe,
    pe,
    ge = /^(?:toggle|show|hide)$/,
    me = /queueHooks$/
  function ve() {
    he && (!1 === m.hidden && t.requestAnimationFrame ? t.requestAnimationFrame(ve) : t.setTimeout(ve, w.fx.interval), w.fx.tick())
  }
  function ye() {
    return (
      t.setTimeout(function () {
        de = void 0
      }),
      (de = Date.now())
    )
  }
  function be(t, e) {
    var i,
      n = 0,
      o = { height: t }
    for (e = e ? 1 : 0; n < 4; n += 2 - e) o['margin' + (i = it[n])] = o['padding' + i] = t
    return e && (o.opacity = o.width = t), o
  }
  function _e(t, e, i) {
    for (var n, o = (we.tweeners[e] || []).concat(we.tweeners['*']), r = 0, s = o.length; r < s; r++) if ((n = o[r].call(i, e, t))) return n
  }
  function we(t, e, i) {
    var n,
      o,
      r = 0,
      s = we.prefilters.length,
      a = w.Deferred().always(function () {
        delete l.elem
      }),
      l = function () {
        if (o) return !1
        for (var e = de || ye(), i = Math.max(0, c.startTime + c.duration - e), n = 1 - (i / c.duration || 0), r = 0, s = c.tweens.length; r < s; r++) c.tweens[r].run(n)
        return a.notifyWith(t, [c, n, i]), n < 1 && s ? i : (s || a.notifyWith(t, [c, 1, 0]), a.resolveWith(t, [c]), !1)
      },
      c = a.promise({
        elem: t,
        props: w.extend({}, e),
        opts: w.extend(!0, { specialEasing: {}, easing: w.easing._default }, i),
        originalProperties: e,
        originalOptions: i,
        startTime: de || ye(),
        duration: i.duration,
        tweens: [],
        createTween: function (e, i) {
          var n = w.Tween(t, c.opts, e, i, c.opts.specialEasing[e] || c.opts.easing)
          return c.tweens.push(n), n
        },
        stop: function (e) {
          var i = 0,
            n = e ? c.tweens.length : 0
          if (o) return this
          for (o = !0; i < n; i++) c.tweens[i].run(1)
          return e ? (a.notifyWith(t, [c, 1, 0]), a.resolveWith(t, [c, e])) : a.rejectWith(t, [c, e]), this
        }
      }),
      u = c.props
    for (
      (function (t, e) {
        var i, n, o, r, s
        for (i in t)
          if (((o = e[(n = U(i))]), (r = t[i]), Array.isArray(r) && ((o = r[1]), (r = t[i] = r[0])), i !== n && ((t[n] = r), delete t[i]), (s = w.cssHooks[n]) && ('expand' in s)))
            for (i in ((r = s.expand(r)), delete t[n], r)) (i in t) || ((t[i] = r[i]), (e[i] = o))
          else e[n] = o
      })(u, c.opts.specialEasing);
      r < s;
      r++
    )
      if ((n = we.prefilters[r].call(c, t, u, c.opts))) return g(n.stop) && (w._queueHooks(c.elem, c.opts.queue).stop = n.stop.bind(n)), n
    return (
      w.map(u, _e, c),
      g(c.opts.start) && c.opts.start.call(t, c),
      c.progress(c.opts.progress).done(c.opts.done, c.opts.complete).fail(c.opts.fail).always(c.opts.always),
      w.fx.timer(w.extend(l, { elem: t, anim: c, queue: c.opts.queue })),
      c
    )
  }
  ;(w.Animation = w.extend(we, {
    tweeners: {
      '*': [
        function (t, e) {
          var i = this.createTween(t, e)
          return at(i.elem, t, et.exec(e), i), i
        }
      ]
    },
    tweener: function (t, e) {
      for (var i, n = 0, o = (t = g(t) ? ((e = t), ['*']) : t.match(z)).length; n < o; n++) (i = t[n]), (we.tweeners[i] = we.tweeners[i] || []), we.tweeners[i].unshift(e)
    },
    prefilters: [
      function (t, e, i) {
        var n,
          o,
          r,
          s,
          a,
          l,
          c,
          u,
          d = 'width' in e || 'height' in e,
          h = this,
          f = {},
          p = t.style,
          g = t.nodeType && st(t),
          m = G.get(t, 'fxshow')
        for (n in (i.queue ||
          (null == (s = w._queueHooks(t, 'fx')).unqueued &&
            ((s.unqueued = 0),
            (a = s.empty.fire),
            (s.empty.fire = function () {
              s.unqueued || a()
            })),
          s.unqueued++,
          h.always(function () {
            h.always(function () {
              s.unqueued--, w.queue(t, 'fx').length || s.empty.fire()
            })
          })),
        e))
          if (((o = e[n]), ge.test(o))) {
            if ((delete e[n], (r = r || 'toggle' === o), o === (g ? 'hide' : 'show'))) {
              if ('show' !== o || !m || void 0 === m[n]) continue
              g = !0
            }
            f[n] = (m && m[n]) || w.style(t, n)
          }
        if ((l = !w.isEmptyObject(e)) || !w.isEmptyObject(f))
          for (n in (d &&
            1 === t.nodeType &&
            ((i.overflow = [p.overflow, p.overflowX, p.overflowY]),
            null == (c = m && m.display) && (c = G.get(t, 'display')),
            'none' === (u = w.css(t, 'display')) && (c ? (u = c) : (ct([t], !0), (c = t.style.display || c), (u = w.css(t, 'display')), ct([t]))),
            ('inline' === u || ('inline-block' === u && null != c)) &&
              'none' === w.css(t, 'float') &&
              (l ||
                (h.done(function () {
                  p.display = c
                }),
                null == c && ((u = p.display), (c = 'none' === u ? '' : u))),
              (p.display = 'inline-block'))),
          i.overflow &&
            ((p.overflow = 'hidden'),
            h.always(function () {
              ;(p.overflow = i.overflow[0]), (p.overflowX = i.overflow[1]), (p.overflowY = i.overflow[2])
            })),
          (l = !1),
          f))
            l ||
              (m ? 'hidden' in m && (g = m.hidden) : (m = G.access(t, 'fxshow', { display: c })),
              r && (m.hidden = !g),
              g && ct([t], !0),
              h.done(function () {
                for (n in (g || ct([t]), G.remove(t, 'fxshow'), f)) w.style(t, n, f[n])
              })),
              (l = _e(g ? m[n] : 0, n, h)),
              n in m || ((m[n] = l.start), g && ((l.end = l.start), (l.start = 0)))
      }
    ],
    prefilter: function (t, e) {
      e ? we.prefilters.unshift(t) : we.prefilters.push(t)
    }
  })),
    (w.speed = function (t, e, i) {
      var n = t && 'object' == typeof t ? w.extend({}, t) : { complete: i || (!i && e) || (g(t) && t), duration: t, easing: (i && e) || (e && !g(e) && e) }
      return (
        w.fx.off ? (n.duration = 0) : 'number' != typeof n.duration && (n.duration in w.fx.speeds ? (n.duration = w.fx.speeds[n.duration]) : (n.duration = w.fx.speeds._default)),
        (null != n.queue && !0 !== n.queue) || (n.queue = 'fx'),
        (n.old = n.complete),
        (n.complete = function () {
          g(n.old) && n.old.call(this), n.queue && w.dequeue(this, n.queue)
        }),
        n
      )
    }),
    w.fn.extend({
      fadeTo: function (t, e, i, n) {
        return this.filter(st).css('opacity', 0).show().end().animate({ opacity: e }, t, i, n)
      },
      animate: function (t, e, i, n) {
        function o() {
          var e = we(this, w.extend({}, t), s)
          ;(r || G.get(this, 'finish')) && e.stop(!0)
        }
        var r = w.isEmptyObject(t),
          s = w.speed(e, i, n)
        return (o.finish = o), r || !1 === s.queue ? this.each(o) : this.queue(s.queue, o)
      },
      stop: function (t, e, i) {
        function n(t) {
          var e = t.stop
          delete t.stop, e(i)
        }
        return (
          'string' != typeof t && ((i = e), (e = t), (t = void 0)),
          e && this.queue(t || 'fx', []),
          this.each(function () {
            var e = !0,
              o = null != t && t + 'queueHooks',
              r = w.timers,
              s = G.get(this)
            if (o) s[o] && s[o].stop && n(s[o])
            else for (o in s) s[o] && s[o].stop && me.test(o) && n(s[o])
            for (o = r.length; o--; ) r[o].elem !== this || (null != t && r[o].queue !== t) || (r[o].anim.stop(i), (e = !1), r.splice(o, 1))
            ;(!e && i) || w.dequeue(this, t)
          })
        )
      },
      finish: function (t) {
        return (
          !1 !== t && (t = t || 'fx'),
          this.each(function () {
            var e,
              i = G.get(this),
              n = i[t + 'queue'],
              o = i[t + 'queueHooks'],
              r = w.timers,
              s = n ? n.length : 0
            for (i.finish = !0, w.queue(this, t, []), o && o.stop && o.stop.call(this, !0), e = r.length; e--; )
              r[e].elem === this && r[e].queue === t && (r[e].anim.stop(!0), r.splice(e, 1))
            for (e = 0; e < s; e++) n[e] && n[e].finish && n[e].finish.call(this)
            delete i.finish
          })
        )
      }
    }),
    w.each(['toggle', 'show', 'hide'], function (t, e) {
      var i = w.fn[e]
      w.fn[e] = function (t, n, o) {
        return null == t || 'boolean' == typeof t ? i.apply(this, arguments) : this.animate(be(e, !0), t, n, o)
      }
    }),
    w.each(
      { slideDown: be('show'), slideUp: be('hide'), slideToggle: be('toggle'), fadeIn: { opacity: 'show' }, fadeOut: { opacity: 'hide' }, fadeToggle: { opacity: 'toggle' } },
      function (t, e) {
        w.fn[t] = function (t, i, n) {
          return this.animate(e, t, i, n)
        }
      }
    ),
    (w.timers = []),
    (w.fx.tick = function () {
      var t,
        e = 0,
        i = w.timers
      for (de = Date.now(); e < i.length; e++) (t = i[e])() || i[e] !== t || i.splice(e--, 1)
      i.length || w.fx.stop(), (de = void 0)
    }),
    (w.fx.timer = function (t) {
      w.timers.push(t), w.fx.start()
    }),
    (w.fx.interval = 13),
    (w.fx.start = function () {
      he || ((he = !0), ve())
    }),
    (w.fx.stop = function () {
      he = null
    }),
    (w.fx.speeds = { slow: 600, fast: 200, _default: 400 }),
    (w.fn.delay = function (e, i) {
      return (
        (e = (w.fx && w.fx.speeds[e]) || e),
        (i = i || 'fx'),
        this.queue(i, function (i, n) {
          var o = t.setTimeout(i, e)
          n.stop = function () {
            t.clearTimeout(o)
          }
        })
      )
    }),
    (fe = m.createElement('input')),
    (pe = m.createElement('select').appendChild(m.createElement('option'))),
    (fe.type = 'checkbox'),
    (p.checkOn = '' !== fe.value),
    (p.optSelected = pe.selected),
    ((fe = m.createElement('input')).value = 't'),
    (fe.type = 'radio'),
    (p.radioValue = 't' === fe.value)
  var xe,
    Ce = w.expr.attrHandle
  w.fn.extend({
    attr: function (t, e) {
      return W(this, w.attr, t, e, 1 < arguments.length)
    },
    removeAttr: function (t) {
      return this.each(function () {
        w.removeAttr(this, t)
      })
    }
  }),
    w.extend({
      attr: function (t, e, i) {
        var n,
          o,
          r = t.nodeType
        if (3 !== r && 8 !== r && 2 !== r)
          return void 0 === t.getAttribute
            ? w.prop(t, e, i)
            : ((1 === r && w.isXMLDoc(t)) || (o = w.attrHooks[e.toLowerCase()] || (w.expr.match.bool.test(e) ? xe : void 0)),
              void 0 !== i
                ? null === i
                  ? void w.removeAttr(t, e)
                  : o && 'set' in o && void 0 !== (n = o.set(t, i, e))
                  ? n
                  : (t.setAttribute(e, i + ''), i)
                : (o && 'get' in o && null !== (n = o.get(t, e))) || null != (n = w.find.attr(t, e))
                ? n
                : void 0)
      },
      attrHooks: {
        type: {
          set: function (t, e) {
            if (!p.radioValue && 'radio' === e && E(t, 'input')) {
              var i = t.value
              return t.setAttribute('type', e), i && (t.value = i), e
            }
          }
        }
      },
      removeAttr: function (t, e) {
        var i,
          n = 0,
          o = e && e.match(z)
        if (o && 1 === t.nodeType) for (; (i = o[n++]); ) t.removeAttribute(i)
      }
    }),
    (xe = {
      set: function (t, e, i) {
        return !1 === e ? w.removeAttr(t, i) : t.setAttribute(i, i), i
      }
    }),
    w.each(w.expr.match.bool.source.match(/\w+/g), function (t, e) {
      var i = Ce[e] || w.find.attr
      Ce[e] = function (t, e, n) {
        var o,
          r,
          s = e.toLowerCase()
        return n || ((r = Ce[s]), (Ce[s] = o), (o = null != i(t, e, n) ? s : null), (Ce[s] = r)), o
      }
    })
  var ke = /^(?:input|select|textarea|button)$/i,
    Te = /^(?:a|area)$/i
  function Se(t) {
    return (t.match(z) || []).join(' ')
  }
  function Ee(t) {
    return (t.getAttribute && t.getAttribute('class')) || ''
  }
  function Ie(t) {
    return Array.isArray(t) ? t : ('string' == typeof t && t.match(z)) || []
  }
  w.fn.extend({
    prop: function (t, e) {
      return W(this, w.prop, t, e, 1 < arguments.length)
    },
    removeProp: function (t) {
      return this.each(function () {
        delete this[w.propFix[t] || t]
      })
    }
  }),
    w.extend({
      prop: function (t, e, i) {
        var n,
          o,
          r = t.nodeType
        if (3 !== r && 8 !== r && 2 !== r)
          return (
            (1 === r && w.isXMLDoc(t)) || ((e = w.propFix[e] || e), (o = w.propHooks[e])),
            void 0 !== i ? (o && 'set' in o && void 0 !== (n = o.set(t, i, e)) ? n : (t[e] = i)) : o && 'get' in o && null !== (n = o.get(t, e)) ? n : t[e]
          )
      },
      propHooks: {
        tabIndex: {
          get: function (t) {
            var e = w.find.attr(t, 'tabindex')
            return e ? parseInt(e, 10) : ke.test(t.nodeName) || (Te.test(t.nodeName) && t.href) ? 0 : -1
          }
        }
      },
      propFix: { for: 'htmlFor', class: 'className' }
    }),
    p.optSelected ||
      (w.propHooks.selected = {
        get: function (t) {
          var e = t.parentNode
          return e && e.parentNode && e.parentNode.selectedIndex, null
        },
        set: function (t) {
          var e = t.parentNode
          e && (e.selectedIndex, e.parentNode && e.parentNode.selectedIndex)
        }
      }),
    w.each(['tabIndex', 'readOnly', 'maxLength', 'cellSpacing', 'cellPadding', 'rowSpan', 'colSpan', 'useMap', 'frameBorder', 'contentEditable'], function () {
      w.propFix[this.toLowerCase()] = this
    }),
    w.fn.extend({
      addClass: function (t) {
        var e,
          i,
          n,
          o,
          r,
          s,
          a,
          l = 0
        if (g(t))
          return this.each(function (e) {
            w(this).addClass(t.call(this, e, Ee(this)))
          })
        if ((e = Ie(t)).length)
          for (; (i = this[l++]); )
            if (((o = Ee(i)), (n = 1 === i.nodeType && ' ' + Se(o) + ' '))) {
              for (s = 0; (r = e[s++]); ) n.indexOf(' ' + r + ' ') < 0 && (n += r + ' ')
              o !== (a = Se(n)) && i.setAttribute('class', a)
            }
        return this
      },
      removeClass: function (t) {
        var e,
          i,
          n,
          o,
          r,
          s,
          a,
          l = 0
        if (g(t))
          return this.each(function (e) {
            w(this).removeClass(t.call(this, e, Ee(this)))
          })
        if (!arguments.length) return this.attr('class', '')
        if ((e = Ie(t)).length)
          for (; (i = this[l++]); )
            if (((o = Ee(i)), (n = 1 === i.nodeType && ' ' + Se(o) + ' '))) {
              for (s = 0; (r = e[s++]); ) for (; -1 < n.indexOf(' ' + r + ' '); ) n = n.replace(' ' + r + ' ', ' ')
              o !== (a = Se(n)) && i.setAttribute('class', a)
            }
        return this
      },
      toggleClass: function (t, e) {
        var i = typeof t,
          n = 'string' == i || Array.isArray(t)
        return 'boolean' == typeof e && n
          ? e
            ? this.addClass(t)
            : this.removeClass(t)
          : g(t)
          ? this.each(function (i) {
              w(this).toggleClass(t.call(this, i, Ee(this), e), e)
            })
          : this.each(function () {
              var e, o, r, s
              if (n) for (o = 0, r = w(this), s = Ie(t); (e = s[o++]); ) r.hasClass(e) ? r.removeClass(e) : r.addClass(e)
              else
                (void 0 !== t && 'boolean' != i) ||
                  ((e = Ee(this)) && G.set(this, '__className__', e), this.setAttribute && this.setAttribute('class', (!e && !1 !== t && G.get(this, '__className__')) || ''))
            })
      },
      hasClass: function (t) {
        for (var e, i = 0, n = ' ' + t + ' '; (e = this[i++]); ) if (1 === e.nodeType && -1 < (' ' + Se(Ee(e)) + ' ').indexOf(n)) return !0
        return !1
      }
    })
  var Ae = /\r/g
  function De(t) {
    t.stopPropagation()
  }
  w.fn.extend({
    val: function (t) {
      var e,
        i,
        n,
        o = this[0]
      return arguments.length
        ? ((n = g(t)),
          this.each(function (i) {
            var o
            1 === this.nodeType &&
              (null == (o = n ? t.call(this, i, w(this).val()) : t)
                ? (o = '')
                : 'number' == typeof o
                ? (o += '')
                : Array.isArray(o) &&
                  (o = w.map(o, function (t) {
                    return null == t ? '' : t + ''
                  })),
              ((e = w.valHooks[this.type] || w.valHooks[this.nodeName.toLowerCase()]) && 'set' in e && void 0 !== e.set(this, o, 'value')) || (this.value = o))
          }))
        : o
        ? (e = w.valHooks[o.type] || w.valHooks[o.nodeName.toLowerCase()]) && 'get' in e && void 0 !== (i = e.get(o, 'value'))
          ? i
          : 'string' == typeof (i = o.value)
          ? i.replace(Ae, '')
          : null == i
          ? ''
          : i
        : void 0
    }
  }),
    w.extend({
      valHooks: {
        option: {
          get: function (t) {
            var e = w.find.attr(t, 'value')
            return null != e ? e : Se(w.text(t))
          }
        },
        select: {
          get: function (t) {
            for (var e, i, n = t.options, o = t.selectedIndex, r = 'select-one' === t.type, s = r ? null : [], a = r ? o + 1 : n.length, l = o < 0 ? a : r ? o : 0; l < a; l++)
              if (((i = n[l]).selected || l === o) && !i.disabled && (!i.parentNode.disabled || !E(i.parentNode, 'optgroup'))) {
                if (((e = w(i).val()), r)) return e
                s.push(e)
              }
            return s
          },
          set: function (t, e) {
            for (var i, n, o = t.options, r = w.makeArray(e), s = o.length; s--; ) ((n = o[s]).selected = -1 < w.inArray(w.valHooks.option.get(n), r)) && (i = !0)
            return i || (t.selectedIndex = -1), r
          }
        }
      }
    }),
    w.each(['radio', 'checkbox'], function () {
      ;(w.valHooks[this] = {
        set: function (t, e) {
          if (Array.isArray(e)) return (t.checked = -1 < w.inArray(w(t).val(), e))
        }
      }),
        p.checkOn ||
          (w.valHooks[this].get = function (t) {
            return null === t.getAttribute('value') ? 'on' : t.value
          })
    }),
    (p.focusin = 'onfocusin' in t)
  var Oe = /^(?:focusinfocus|focusoutblur)$/
  w.extend(w.event, {
    trigger: function (e, n, o, r) {
      var s,
        a,
        l,
        c,
        u,
        h,
        f,
        p = [o || m],
        v = d.call(e, 'type') ? e.type : e,
        y = d.call(e, 'namespace') ? e.namespace.split('.') : [],
        b = (f = a = o = o || m)
      if (
        3 !== o.nodeType &&
        8 !== o.nodeType &&
        !Oe.test(v + w.event.triggered) &&
        (-1 < v.indexOf('.') && ((v = (y = v.split('.')).shift()), y.sort()),
        (c = v.indexOf(':') < 0 && 'on' + v),
        ((e = e[w.expando] ? e : new w.Event(v, 'object' == typeof e && e)).isTrigger = r ? 2 : 3),
        (e.namespace = y.join('.')),
        (e.rnamespace = e.namespace ? new RegExp('(^|\\.)' + y.join('\\.(?:.*\\.|)') + '(\\.|$)') : null),
        (e.result = void 0),
        e.target || (e.target = o),
        (n = null == n ? [e] : w.makeArray(n, [e])),
        (h = w.event.special[v] || {}),
        r || !h.trigger || !1 !== h.trigger.apply(o, n))
      ) {
        if (!r && !h.noBubble && !i(o)) {
          for (l = h.delegateType || v, Oe.test(l + v) || (b = b.parentNode); b; b = b.parentNode) p.push(b), (a = b)
          a === (o.ownerDocument || m) && p.push(a.defaultView || a.parentWindow || t)
        }
        for (s = 0; (b = p[s++]) && !e.isPropagationStopped(); )
          (f = b),
            (e.type = 1 < s ? l : h.bindType || v),
            (u = (G.get(b, 'events') || Object.create(null))[e.type] && G.get(b, 'handle')) && u.apply(b, n),
            (u = c && b[c]) && u.apply && Y(b) && ((e.result = u.apply(b, n)), !1 === e.result && e.preventDefault())
        return (
          (e.type = v),
          r ||
            e.isDefaultPrevented() ||
            (h._default && !1 !== h._default.apply(p.pop(), n)) ||
            !Y(o) ||
            (c &&
              g(o[v]) &&
              !i(o) &&
              ((a = o[c]) && (o[c] = null),
              (w.event.triggered = v),
              e.isPropagationStopped() && f.addEventListener(v, De),
              o[v](),
              e.isPropagationStopped() && f.removeEventListener(v, De),
              (w.event.triggered = void 0),
              a && (o[c] = a))),
          e.result
        )
      }
    },
    simulate: function (t, e, i) {
      var n = w.extend(new w.Event(), i, { type: t, isSimulated: !0 })
      w.event.trigger(n, null, e)
    }
  }),
    w.fn.extend({
      trigger: function (t, e) {
        return this.each(function () {
          w.event.trigger(t, e, this)
        })
      },
      triggerHandler: function (t, e) {
        var i = this[0]
        if (i) return w.event.trigger(t, e, i, !0)
      }
    }),
    p.focusin ||
      w.each({ focus: 'focusin', blur: 'focusout' }, function (t, e) {
        function i(t) {
          w.event.simulate(e, t.target, w.event.fix(t))
        }
        w.event.special[e] = {
          setup: function () {
            var n = this.ownerDocument || this.document || this,
              o = G.access(n, e)
            o || n.addEventListener(t, i, !0), G.access(n, e, (o || 0) + 1)
          },
          teardown: function () {
            var n = this.ownerDocument || this.document || this,
              o = G.access(n, e) - 1
            o ? G.access(n, e, o) : (n.removeEventListener(t, i, !0), G.remove(n, e))
          }
        }
      })
  var Me = t.location,
    Pe = { guid: Date.now() },
    Le = /\?/
  w.parseXML = function (e) {
    var i
    if (!e || 'string' != typeof e) return null
    try {
      i = new t.DOMParser().parseFromString(e, 'text/xml')
    } catch (e) {
      i = void 0
    }
    return (i && !i.getElementsByTagName('parsererror').length) || w.error('Invalid XML: ' + e), i
  }
  var ze = /\[\]$/,
    Fe = /\r?\n/g,
    Ne = /^(?:submit|button|image|reset|file)$/i,
    Re = /^(?:input|select|textarea|keygen)/i
  function je(t, e, i, n) {
    var o
    if (Array.isArray(e))
      w.each(e, function (e, o) {
        i || ze.test(t) ? n(t, o) : je(t + '[' + ('object' == typeof o && null != o ? e : '') + ']', o, i, n)
      })
    else if (i || 'object' !== b(e)) n(t, e)
    else for (o in e) je(t + '[' + o + ']', e[o], i, n)
  }
  ;(w.param = function (t, e) {
    function i(t, e) {
      var i = g(e) ? e() : e
      o[o.length] = encodeURIComponent(t) + '=' + encodeURIComponent(null == i ? '' : i)
    }
    var n,
      o = []
    if (null == t) return ''
    if (Array.isArray(t) || (t.jquery && !w.isPlainObject(t)))
      w.each(t, function () {
        i(this.name, this.value)
      })
    else for (n in t) je(n, t[n], e, i)
    return o.join('&')
  }),
    w.fn.extend({
      serialize: function () {
        return w.param(this.serializeArray())
      },
      serializeArray: function () {
        return this.map(function () {
          var t = w.prop(this, 'elements')
          return t ? w.makeArray(t) : this
        })
          .filter(function () {
            var t = this.type
            return this.name && !w(this).is(':disabled') && Re.test(this.nodeName) && !Ne.test(t) && (this.checked || !dt.test(t))
          })
          .map(function (t, e) {
            var i = w(this).val()
            return null == i
              ? null
              : Array.isArray(i)
              ? w.map(i, function (t) {
                  return { name: e.name, value: t.replace(Fe, '\r\n') }
                })
              : { name: e.name, value: i.replace(Fe, '\r\n') }
          })
          .get()
      }
    })
  var $e = /%20/g,
    Be = /#.*$/,
    We = /([?&])_=[^&]*/,
    He = /^(.*?):[ \t]*([^\r\n]*)$/gm,
    qe = /^(?:GET|HEAD)$/,
    Ve = /^\/\//,
    Ue = {},
    Ye = {},
    Qe = '*/'.concat('*'),
    Ge = m.createElement('a')
  function Xe(t) {
    return function (e, i) {
      'string' != typeof e && ((i = e), (e = '*'))
      var n,
        o = 0,
        r = e.toLowerCase().match(z) || []
      if (g(i)) for (; (n = r[o++]); ) '+' === n[0] ? ((n = n.slice(1) || '*'), (t[n] = t[n] || []).unshift(i)) : (t[n] = t[n] || []).push(i)
    }
  }
  function Ke(t, e, i, n) {
    var o = {},
      r = t === Ye
    function s(a) {
      var l
      return (
        (o[a] = !0),
        w.each(t[a] || [], function (t, a) {
          var c = a(e, i, n)
          return 'string' != typeof c || r || o[c] ? (r ? !(l = c) : void 0) : (e.dataTypes.unshift(c), s(c), !1)
        }),
        l
      )
    }
    return s(e.dataTypes[0]) || (!o['*'] && s('*'))
  }
  function Ze(t, e) {
    var i,
      n,
      o = w.ajaxSettings.flatOptions || {}
    for (i in e) void 0 !== e[i] && ((o[i] ? t : (n = n || {}))[i] = e[i])
    return n && w.extend(!0, t, n), t
  }
  ;(Ge.href = Me.href),
    w.extend({
      active: 0,
      lastModified: {},
      etag: {},
      ajaxSettings: {
        url: Me.href,
        type: 'GET',
        isLocal: /^(?:about|app|app-storage|.+-extension|file|res|widget):$/.test(Me.protocol),
        global: !0,
        processData: !0,
        async: !0,
        contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
        accepts: { '*': Qe, text: 'text/plain', html: 'text/html', xml: 'application/xml, text/xml', json: 'application/json, text/javascript' },
        contents: { xml: /\bxml\b/, html: /\bhtml/, json: /\bjson\b/ },
        responseFields: { xml: 'responseXML', text: 'responseText', json: 'responseJSON' },
        converters: { '* text': String, 'text html': !0, 'text json': JSON.parse, 'text xml': w.parseXML },
        flatOptions: { url: !0, context: !0 }
      },
      ajaxSetup: function (t, e) {
        return e ? Ze(Ze(t, w.ajaxSettings), e) : Ze(w.ajaxSettings, t)
      },
      ajaxPrefilter: Xe(Ue),
      ajaxTransport: Xe(Ye),
      ajax: function (e, i) {
        'object' == typeof e && ((i = e), (e = void 0)), (i = i || {})
        var n,
          o,
          r,
          s,
          a,
          l,
          c,
          u,
          d,
          h,
          f = w.ajaxSetup({}, i),
          p = f.context || f,
          g = f.context && (p.nodeType || p.jquery) ? w(p) : w.event,
          v = w.Deferred(),
          y = w.Callbacks('once memory'),
          b = f.statusCode || {},
          _ = {},
          x = {},
          C = 'canceled',
          k = {
            readyState: 0,
            getResponseHeader: function (t) {
              var e
              if (c) {
                if (!s) for (s = {}; (e = He.exec(r)); ) s[e[1].toLowerCase() + ' '] = (s[e[1].toLowerCase() + ' '] || []).concat(e[2])
                e = s[t.toLowerCase() + ' ']
              }
              return null == e ? null : e.join(', ')
            },
            getAllResponseHeaders: function () {
              return c ? r : null
            },
            setRequestHeader: function (t, e) {
              return null == c && ((t = x[t.toLowerCase()] = x[t.toLowerCase()] || t), (_[t] = e)), this
            },
            overrideMimeType: function (t) {
              return null == c && (f.mimeType = t), this
            },
            statusCode: function (t) {
              var e
              if (t)
                if (c) k.always(t[k.status])
                else for (e in t) b[e] = [b[e], t[e]]
              return this
            },
            abort: function (t) {
              var e = t || C
              return n && n.abort(e), T(0, e), this
            }
          }
        if (
          (v.promise(k),
          (f.url = ((e || f.url || Me.href) + '').replace(Ve, Me.protocol + '//')),
          (f.type = i.method || i.type || f.method || f.type),
          (f.dataTypes = (f.dataType || '*').toLowerCase().match(z) || ['']),
          null == f.crossDomain)
        ) {
          l = m.createElement('a')
          try {
            ;(l.href = f.url), (l.href = l.href), (f.crossDomain = Ge.protocol + '//' + Ge.host != l.protocol + '//' + l.host)
          } catch (e) {
            f.crossDomain = !0
          }
        }
        if ((f.data && f.processData && 'string' != typeof f.data && (f.data = w.param(f.data, f.traditional)), Ke(Ue, f, i, k), c)) return k
        for (d in ((u = w.event && f.global) && 0 == w.active++ && w.event.trigger('ajaxStart'),
        (f.type = f.type.toUpperCase()),
        (f.hasContent = !qe.test(f.type)),
        (o = f.url.replace(Be, '')),
        f.hasContent
          ? f.data && f.processData && 0 === (f.contentType || '').indexOf('application/x-www-form-urlencoded') && (f.data = f.data.replace($e, '+'))
          : ((h = f.url.slice(o.length)),
            f.data && (f.processData || 'string' == typeof f.data) && ((o += (Le.test(o) ? '&' : '?') + f.data), delete f.data),
            !1 === f.cache && ((o = o.replace(We, '$1')), (h = (Le.test(o) ? '&' : '?') + '_=' + Pe.guid++ + h)),
            (f.url = o + h)),
        f.ifModified && (w.lastModified[o] && k.setRequestHeader('If-Modified-Since', w.lastModified[o]), w.etag[o] && k.setRequestHeader('If-None-Match', w.etag[o])),
        ((f.data && f.hasContent && !1 !== f.contentType) || i.contentType) && k.setRequestHeader('Content-Type', f.contentType),
        k.setRequestHeader(
          'Accept',
          f.dataTypes[0] && f.accepts[f.dataTypes[0]] ? f.accepts[f.dataTypes[0]] + ('*' !== f.dataTypes[0] ? ', ' + Qe + '; q=0.01' : '') : f.accepts['*']
        ),
        f.headers))
          k.setRequestHeader(d, f.headers[d])
        if (f.beforeSend && (!1 === f.beforeSend.call(p, k, f) || c)) return k.abort()
        if (((C = 'abort'), y.add(f.complete), k.done(f.success), k.fail(f.error), (n = Ke(Ye, f, i, k)))) {
          if (((k.readyState = 1), u && g.trigger('ajaxSend', [k, f]), c)) return k
          f.async &&
            0 < f.timeout &&
            (a = t.setTimeout(function () {
              k.abort('timeout')
            }, f.timeout))
          try {
            ;(c = !1), n.send(_, T)
          } catch (e) {
            if (c) throw e
            T(-1, e)
          }
        } else T(-1, 'No Transport')
        function T(e, i, s, l) {
          var d,
            h,
            m,
            _,
            x,
            C = i
          c ||
            ((c = !0),
            a && t.clearTimeout(a),
            (n = void 0),
            (r = l || ''),
            (k.readyState = 0 < e ? 4 : 0),
            (d = (200 <= e && e < 300) || 304 === e),
            s &&
              (_ = (function (t, e, i) {
                for (var n, o, r, s, a = t.contents, l = t.dataTypes; '*' === l[0]; ) l.shift(), void 0 === n && (n = t.mimeType || e.getResponseHeader('Content-Type'))
                if (n)
                  for (o in a)
                    if (a[o] && a[o].test(n)) {
                      l.unshift(o)
                      break
                    }
                if (l[0] in i) r = l[0]
                else {
                  for (o in i) {
                    if (!l[0] || t.converters[o + ' ' + l[0]]) {
                      r = o
                      break
                    }
                    s = s || o
                  }
                  r = r || s
                }
                if (r) return r !== l[0] && l.unshift(r), i[r]
              })(f, k, s)),
            !d && -1 < w.inArray('script', f.dataTypes) && (f.converters['text script'] = function () {}),
            (_ = (function (t, e, i, n) {
              var o,
                r,
                s,
                a,
                l,
                c = {},
                u = t.dataTypes.slice()
              if (u[1]) for (s in t.converters) c[s.toLowerCase()] = t.converters[s]
              for (r = u.shift(); r; )
                if ((t.responseFields[r] && (i[t.responseFields[r]] = e), !l && n && t.dataFilter && (e = t.dataFilter(e, t.dataType)), (l = r), (r = u.shift())))
                  if ('*' === r) r = l
                  else if ('*' !== l && l !== r) {
                    if (!(s = c[l + ' ' + r] || c['* ' + r]))
                      for (o in c)
                        if ((a = o.split(' '))[1] === r && (s = c[l + ' ' + a[0]] || c['* ' + a[0]])) {
                          !0 === s ? (s = c[o]) : !0 !== c[o] && ((r = a[0]), u.unshift(a[1]))
                          break
                        }
                    if (!0 !== s)
                      if (s && t.throws) e = s(e)
                      else
                        try {
                          e = s(e)
                        } catch (t) {
                          return { state: 'parsererror', error: s ? t : 'No conversion from ' + l + ' to ' + r }
                        }
                  }
              return { state: 'success', data: e }
            })(f, _, k, d)),
            d
              ? (f.ifModified && ((x = k.getResponseHeader('Last-Modified')) && (w.lastModified[o] = x), (x = k.getResponseHeader('etag')) && (w.etag[o] = x)),
                204 === e || 'HEAD' === f.type ? (C = 'nocontent') : 304 === e ? (C = 'notmodified') : ((C = _.state), (h = _.data), (d = !(m = _.error))))
              : ((m = C), (!e && C) || ((C = 'error'), e < 0 && (e = 0))),
            (k.status = e),
            (k.statusText = (i || C) + ''),
            d ? v.resolveWith(p, [h, C, k]) : v.rejectWith(p, [k, C, m]),
            k.statusCode(b),
            (b = void 0),
            u && g.trigger(d ? 'ajaxSuccess' : 'ajaxError', [k, f, d ? h : m]),
            y.fireWith(p, [k, C]),
            u && (g.trigger('ajaxComplete', [k, f]), --w.active || w.event.trigger('ajaxStop')))
        }
        return k
      },
      getJSON: function (t, e, i) {
        return w.get(t, e, i, 'json')
      },
      getScript: function (t, e) {
        return w.get(t, void 0, e, 'script')
      }
    }),
    w.each(['get', 'post'], function (t, e) {
      w[e] = function (t, i, n, o) {
        return g(i) && ((o = o || n), (n = i), (i = void 0)), w.ajax(w.extend({ url: t, type: e, dataType: o, data: i, success: n }, w.isPlainObject(t) && t))
      }
    }),
    w.ajaxPrefilter(function (t) {
      var e
      for (e in t.headers) 'content-type' === e.toLowerCase() && (t.contentType = t.headers[e] || '')
    }),
    (w._evalUrl = function (t, e, i) {
      return w.ajax({
        url: t,
        type: 'GET',
        dataType: 'script',
        cache: !0,
        async: !1,
        global: !1,
        converters: { 'text script': function () {} },
        dataFilter: function (t) {
          w.globalEval(t, e, i)
        }
      })
    }),
    w.fn.extend({
      wrapAll: function (t) {
        var e
        return (
          this[0] &&
            (g(t) && (t = t.call(this[0])),
            (e = w(t, this[0].ownerDocument).eq(0).clone(!0)),
            this[0].parentNode && e.insertBefore(this[0]),
            e
              .map(function () {
                for (var t = this; t.firstElementChild; ) t = t.firstElementChild
                return t
              })
              .append(this)),
          this
        )
      },
      wrapInner: function (t) {
        return g(t)
          ? this.each(function (e) {
              w(this).wrapInner(t.call(this, e))
            })
          : this.each(function () {
              var e = w(this),
                i = e.contents()
              i.length ? i.wrapAll(t) : e.append(t)
            })
      },
      wrap: function (t) {
        var e = g(t)
        return this.each(function (i) {
          w(this).wrapAll(e ? t.call(this, i) : t)
        })
      },
      unwrap: function (t) {
        return (
          this.parent(t)
            .not('body')
            .each(function () {
              w(this).replaceWith(this.childNodes)
            }),
          this
        )
      }
    }),
    (w.expr.pseudos.hidden = function (t) {
      return !w.expr.pseudos.visible(t)
    }),
    (w.expr.pseudos.visible = function (t) {
      return !!(t.offsetWidth || t.offsetHeight || t.getClientRects().length)
    }),
    (w.ajaxSettings.xhr = function () {
      try {
        return new t.XMLHttpRequest()
      } catch (t) {}
    })
  var Je = { 0: 200, 1223: 204 },
    ti = w.ajaxSettings.xhr()
  ;(p.cors = !!ti && 'withCredentials' in ti),
    (p.ajax = ti = !!ti),
    w.ajaxTransport(function (e) {
      var i, n
      if (p.cors || (ti && !e.crossDomain))
        return {
          send: function (o, r) {
            var s,
              a = e.xhr()
            if ((a.open(e.type, e.url, e.async, e.username, e.password), e.xhrFields)) for (s in e.xhrFields) a[s] = e.xhrFields[s]
            for (s in (e.mimeType && a.overrideMimeType && a.overrideMimeType(e.mimeType), e.crossDomain || o['X-Requested-With'] || (o['X-Requested-With'] = 'XMLHttpRequest'), o))
              a.setRequestHeader(s, o[s])
            ;(i = function (t) {
              return function () {
                i &&
                  ((i = n = a.onload = a.onerror = a.onabort = a.ontimeout = a.onreadystatechange = null),
                  'abort' === t
                    ? a.abort()
                    : 'error' === t
                    ? 'number' != typeof a.status
                      ? r(0, 'error')
                      : r(a.status, a.statusText)
                    : r(
                        Je[a.status] || a.status,
                        a.statusText,
                        'text' !== (a.responseType || 'text') || 'string' != typeof a.responseText ? { binary: a.response } : { text: a.responseText },
                        a.getAllResponseHeaders()
                      ))
              }
            }),
              (a.onload = i()),
              (n = a.onerror = a.ontimeout = i('error')),
              void 0 !== a.onabort
                ? (a.onabort = n)
                : (a.onreadystatechange = function () {
                    4 === a.readyState &&
                      t.setTimeout(function () {
                        i && n()
                      })
                  }),
              (i = i('abort'))
            try {
              a.send((e.hasContent && e.data) || null)
            } catch (o) {
              if (i) throw o
            }
          },
          abort: function () {
            i && i()
          }
        }
    }),
    w.ajaxPrefilter(function (t) {
      t.crossDomain && (t.contents.script = !1)
    }),
    w.ajaxSetup({
      accepts: { script: 'text/javascript, application/javascript, application/ecmascript, application/x-ecmascript' },
      contents: { script: /\b(?:java|ecma)script\b/ },
      converters: {
        'text script': function (t) {
          return w.globalEval(t), t
        }
      }
    }),
    w.ajaxPrefilter('script', function (t) {
      void 0 === t.cache && (t.cache = !1), t.crossDomain && (t.type = 'GET')
    }),
    w.ajaxTransport('script', function (t) {
      var e, i
      if (t.crossDomain || t.scriptAttrs)
        return {
          send: function (n, o) {
            ;(e = w('<script>')
              .attr(t.scriptAttrs || {})
              .prop({ charset: t.scriptCharset, src: t.url })
              .on(
                'load error',
                (i = function (t) {
                  e.remove(), (i = null), t && o('error' === t.type ? 404 : 200, t.type)
                })
              )),
              m.head.appendChild(e[0])
          },
          abort: function () {
            i && i()
          }
        }
    })
  var ei,
    ii = [],
    ni = /(=)\?(?=&|$)|\?\?/
  w.ajaxSetup({
    jsonp: 'callback',
    jsonpCallback: function () {
      var t = ii.pop() || w.expando + '_' + Pe.guid++
      return (this[t] = !0), t
    }
  }),
    w.ajaxPrefilter('json jsonp', function (e, i, n) {
      var o,
        r,
        s,
        a =
          !1 !== e.jsonp &&
          (ni.test(e.url) ? 'url' : 'string' == typeof e.data && 0 === (e.contentType || '').indexOf('application/x-www-form-urlencoded') && ni.test(e.data) && 'data')
      if (a || 'jsonp' === e.dataTypes[0])
        return (
          (o = e.jsonpCallback = g(e.jsonpCallback) ? e.jsonpCallback() : e.jsonpCallback),
          a ? (e[a] = e[a].replace(ni, '$1' + o)) : !1 !== e.jsonp && (e.url += (Le.test(e.url) ? '&' : '?') + e.jsonp + '=' + o),
          (e.converters['script json'] = function () {
            return s || w.error(o + ' was not called'), s[0]
          }),
          (e.dataTypes[0] = 'json'),
          (r = t[o]),
          (t[o] = function () {
            s = arguments
          }),
          n.always(function () {
            void 0 === r ? w(t).removeProp(o) : (t[o] = r), e[o] && ((e.jsonpCallback = i.jsonpCallback), ii.push(o)), s && g(r) && r(s[0]), (s = r = void 0)
          }),
          'script'
        )
    }),
    (p.createHTMLDocument = (((ei = m.implementation.createHTMLDocument('').body).innerHTML = '<form></form><form></form>'), 2 === ei.childNodes.length)),
    (w.parseHTML = function (t, e, i) {
      return 'string' != typeof t
        ? []
        : ('boolean' == typeof e && ((i = e), (e = !1)),
          e || (p.createHTMLDocument ? (((n = (e = m.implementation.createHTMLDocument('')).createElement('base')).href = m.location.href), e.head.appendChild(n)) : (e = m)),
          (r = !i && []),
          (o = I.exec(t)) ? [e.createElement(o[1])] : ((o = bt([t], e, r)), r && r.length && w(r).remove(), w.merge([], o.childNodes)))
      var n, o, r
    }),
    (w.fn.load = function (t, e, i) {
      var n,
        o,
        r,
        s = this,
        a = t.indexOf(' ')
      return (
        -1 < a && ((n = Se(t.slice(a))), (t = t.slice(0, a))),
        g(e) ? ((i = e), (e = void 0)) : e && 'object' == typeof e && (o = 'POST'),
        0 < s.length &&
          w
            .ajax({ url: t, type: o || 'GET', dataType: 'html', data: e })
            .done(function (t) {
              ;(r = arguments), s.html(n ? w('<div>').append(w.parseHTML(t)).find(n) : t)
            })
            .always(
              i &&
                function (t, e) {
                  s.each(function () {
                    i.apply(this, r || [t.responseText, e, t])
                  })
                }
            ),
        this
      )
    }),
    (w.expr.pseudos.animated = function (t) {
      return w.grep(w.timers, function (e) {
        return t === e.elem
      }).length
    }),
    (w.offset = {
      setOffset: function (t, e, i) {
        var n,
          o,
          r,
          s,
          a,
          l,
          c = w.css(t, 'position'),
          u = w(t),
          d = {}
        'static' === c && (t.style.position = 'relative'),
          (a = u.offset()),
          (r = w.css(t, 'top')),
          (l = w.css(t, 'left')),
          (o = ('absolute' === c || 'fixed' === c) && -1 < (r + l).indexOf('auto') ? ((s = (n = u.position()).top), n.left) : ((s = parseFloat(r) || 0), parseFloat(l) || 0)),
          g(e) && (e = e.call(t, i, w.extend({}, a))),
          null != e.top && (d.top = e.top - a.top + s),
          null != e.left && (d.left = e.left - a.left + o),
          'using' in e ? e.using.call(t, d) : ('number' == typeof d.top && (d.top += 'px'), 'number' == typeof d.left && (d.left += 'px'), u.css(d))
      }
    }),
    w.fn.extend({
      offset: function (t) {
        if (arguments.length)
          return void 0 === t
            ? this
            : this.each(function (e) {
                w.offset.setOffset(this, t, e)
              })
        var e,
          i,
          n = this[0]
        return n
          ? n.getClientRects().length
            ? ((e = n.getBoundingClientRect()), (i = n.ownerDocument.defaultView), { top: e.top + i.pageYOffset, left: e.left + i.pageXOffset })
            : { top: 0, left: 0 }
          : void 0
      },
      position: function () {
        if (this[0]) {
          var t,
            e,
            i,
            n = this[0],
            o = { top: 0, left: 0 }
          if ('fixed' === w.css(n, 'position')) e = n.getBoundingClientRect()
          else {
            for (
              e = this.offset(), i = n.ownerDocument, t = n.offsetParent || i.documentElement;
              t && (t === i.body || t === i.documentElement) && 'static' === w.css(t, 'position');

            )
              t = t.parentNode
            t && t !== n && 1 === t.nodeType && (((o = w(t).offset()).top += w.css(t, 'borderTopWidth', !0)), (o.left += w.css(t, 'borderLeftWidth', !0)))
          }
          return { top: e.top - o.top - w.css(n, 'marginTop', !0), left: e.left - o.left - w.css(n, 'marginLeft', !0) }
        }
      },
      offsetParent: function () {
        return this.map(function () {
          for (var t = this.offsetParent; t && 'static' === w.css(t, 'position'); ) t = t.offsetParent
          return t || nt
        })
      }
    }),
    w.each({ scrollLeft: 'pageXOffset', scrollTop: 'pageYOffset' }, function (t, e) {
      var n = 'pageYOffset' === e
      w.fn[t] = function (o) {
        return W(
          this,
          function (t, o, r) {
            var s
            if ((i(t) ? (s = t) : 9 === t.nodeType && (s = t.defaultView), void 0 === r)) return s ? s[e] : t[o]
            s ? s.scrollTo(n ? s.pageXOffset : r, n ? r : s.pageYOffset) : (t[o] = r)
          },
          t,
          o,
          arguments.length
        )
      }
    }),
    w.each(['top', 'left'], function (t, e) {
      w.cssHooks[e] = Xt(p.pixelPosition, function (t, i) {
        if (i) return (i = Gt(t, e)), Ut.test(i) ? w(t).position()[e] + 'px' : i
      })
    }),
    w.each({ Height: 'height', Width: 'width' }, function (t, e) {
      w.each({ padding: 'inner' + t, content: e, '': 'outer' + t }, function (n, o) {
        w.fn[o] = function (r, s) {
          var a = arguments.length && (n || 'boolean' != typeof r),
            l = n || (!0 === r || !0 === s ? 'margin' : 'border')
          return W(
            this,
            function (e, n, r) {
              var s
              return i(e)
                ? 0 === o.indexOf('outer')
                  ? e['inner' + t]
                  : e.document.documentElement['client' + t]
                : 9 === e.nodeType
                ? ((s = e.documentElement), Math.max(e.body['scroll' + t], s['scroll' + t], e.body['offset' + t], s['offset' + t], s['client' + t]))
                : void 0 === r
                ? w.css(e, n, l)
                : w.style(e, n, r, l)
            },
            e,
            a ? r : void 0,
            a
          )
        }
      })
    }),
    w.each(['ajaxStart', 'ajaxStop', 'ajaxComplete', 'ajaxError', 'ajaxSuccess', 'ajaxSend'], function (t, e) {
      w.fn[e] = function (t) {
        return this.on(e, t)
      }
    }),
    w.fn.extend({
      bind: function (t, e, i) {
        return this.on(t, null, e, i)
      },
      unbind: function (t, e) {
        return this.off(t, null, e)
      },
      delegate: function (t, e, i, n) {
        return this.on(e, t, i, n)
      },
      undelegate: function (t, e, i) {
        return 1 === arguments.length ? this.off(t, '**') : this.off(e, t || '**', i)
      },
      hover: function (t, e) {
        return this.mouseenter(t).mouseleave(e || t)
      }
    }),
    w.each(
      'blur focus focusin focusout resize scroll click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup contextmenu'.split(
        ' '
      ),
      function (t, e) {
        w.fn[e] = function (t, i) {
          return 0 < arguments.length ? this.on(e, null, t, i) : this.trigger(e)
        }
      }
    )
  var oi = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g
  ;(w.proxy = function (t, e) {
    var i, n, o
    if (('string' == typeof e && ((i = t[e]), (e = t), (t = i)), g(t)))
      return (
        (n = r.call(arguments, 2)),
        ((o = function () {
          return t.apply(e || this, n.concat(r.call(arguments)))
        }).guid = t.guid =
          t.guid || w.guid++),
        o
      )
  }),
    (w.holdReady = function (t) {
      t ? w.readyWait++ : w.ready(!0)
    }),
    (w.isArray = Array.isArray),
    (w.parseJSON = JSON.parse),
    (w.nodeName = E),
    (w.isFunction = g),
    (w.isWindow = i),
    (w.camelCase = U),
    (w.type = b),
    (w.now = Date.now),
    (w.isNumeric = function (t) {
      var e = w.type(t)
      return ('number' === e || 'string' === e) && !isNaN(t - parseFloat(t))
    }),
    (w.trim = function (t) {
      return null == t ? '' : (t + '').replace(oi, '')
    }),
    'function' == typeof define &&
      define.amd &&
      define('jquery', [], function () {
        return w
      })
  var ri = t.jQuery,
    si = t.$
  return (
    (w.noConflict = function (e) {
      return t.$ === w && (t.$ = si), e && t.jQuery === w && (t.jQuery = ri), w
    }),
    void 0 === e && (t.jQuery = t.$ = w),
    w
  )
}),
  (function (t, e) {
    'object' == typeof exports && 'undefined' != typeof module ? (module.exports = e()) : 'function' == typeof define && define.amd ? define(e) : (t.Popper = e())
  })(this, function () {
    'use strict'
    function t(t) {
      return t && '[object Function]' === {}.toString.call(t)
    }
    function e(t, e) {
      if (1 !== t.nodeType) return []
      var i = t.ownerDocument.defaultView.getComputedStyle(t, null)
      return e ? i[e] : i
    }
    function i(t) {
      return 'HTML' === t.nodeName ? t : t.parentNode || t.host
    }
    function n(t) {
      if (!t) return document.body
      switch (t.nodeName) {
        case 'HTML':
        case 'BODY':
          return t.ownerDocument.body
        case '#document':
          return t.body
      }
      var o = e(t),
        r = o.overflow,
        s = o.overflowX,
        a = o.overflowY
      return /(auto|scroll|overlay)/.test(r + a + s) ? t : n(i(t))
    }
    function o(t) {
      return t && t.referenceNode ? t.referenceNode : t
    }
    function r(t) {
      return 11 === t ? B : (10 !== t && B) || W
    }
    function s(t) {
      if (!t) return document.documentElement
      for (var i = r(10) ? document.body : null, n = t.offsetParent || null; n === i && t.nextElementSibling; ) n = (t = t.nextElementSibling).offsetParent
      var o = n && n.nodeName
      return o && 'BODY' !== o && 'HTML' !== o
        ? -1 !== ['TH', 'TD', 'TABLE'].indexOf(n.nodeName) && 'static' === e(n, 'position')
          ? s(n)
          : n
        : t
        ? t.ownerDocument.documentElement
        : document.documentElement
    }
    function a(t) {
      return null === t.parentNode ? t : a(t.parentNode)
    }
    function l(t, e) {
      if (!(t && t.nodeType && e && e.nodeType)) return document.documentElement
      var i = t.compareDocumentPosition(e) & Node.DOCUMENT_POSITION_FOLLOWING,
        n = i ? t : e,
        o = i ? e : t,
        r = document.createRange()
      r.setStart(n, 0), r.setEnd(o, 0)
      var c,
        u,
        d = r.commonAncestorContainer
      if ((t !== d && e !== d) || n.contains(o)) return 'BODY' === (u = (c = d).nodeName) || ('HTML' !== u && s(c.firstElementChild) !== c) ? s(d) : d
      var h = a(t)
      return h.host ? l(h.host, e) : l(t, a(e).host)
    }
    function c(t, e) {
      var i = 'top' === (1 < arguments.length && void 0 !== e ? e : 'top') ? 'scrollTop' : 'scrollLeft',
        n = t.nodeName
      if ('BODY' !== n && 'HTML' !== n) return t[i]
      var o = t.ownerDocument.documentElement
      return (t.ownerDocument.scrollingElement || o)[i]
    }
    function u(t, e) {
      var i = 'x' === e ? 'Left' : 'Top',
        n = 'Left' == i ? 'Right' : 'Bottom'
      return parseFloat(t['border' + i + 'Width'], 10) + parseFloat(t['border' + n + 'Width'], 10)
    }
    function d(t, e, i, n) {
      return N(
        e['offset' + t],
        e['scroll' + t],
        i['client' + t],
        i['offset' + t],
        i['scroll' + t],
        r(10) ? parseInt(i['offset' + t]) + parseInt(n['margin' + ('Height' === t ? 'Top' : 'Left')]) + parseInt(n['margin' + ('Height' === t ? 'Bottom' : 'Right')]) : 0
      )
    }
    function h(t) {
      var e = t.body,
        i = t.documentElement,
        n = r(10) && getComputedStyle(i)
      return { height: d('Height', e, i, n), width: d('Width', e, i, n) }
    }
    function f(t) {
      return H({}, t, { right: t.left + t.width, bottom: t.top + t.height })
    }
    function p(t) {
      var i,
        n,
        o = {}
      try {
        r(10)
          ? ((o = t.getBoundingClientRect()), (i = c(t, 'top')), (n = c(t, 'left')), (o.top += i), (o.left += n), (o.bottom += i), (o.right += n))
          : (o = t.getBoundingClientRect())
      } catch (t) {}
      var s,
        a = { left: o.left, top: o.top, width: o.right - o.left, height: o.bottom - o.top },
        l = 'HTML' === t.nodeName ? h(t.ownerDocument) : {},
        d = l.width || t.clientWidth || a.width,
        p = l.height || t.clientHeight || a.height,
        g = t.offsetWidth - d,
        m = t.offsetHeight - p
      return (g || m) && ((g -= u((s = e(t)), 'x')), (m -= u(s, 'y')), (a.width -= g), (a.height -= m)), f(a)
    }
    function g(t, i, o) {
      var s = 2 < arguments.length && void 0 !== o && o,
        a = r(10),
        l = 'HTML' === i.nodeName,
        u = p(t),
        d = p(i),
        h = n(t),
        g = e(i),
        m = parseFloat(g.borderTopWidth, 10),
        v = parseFloat(g.borderLeftWidth, 10)
      s && l && ((d.top = N(d.top, 0)), (d.left = N(d.left, 0)))
      var y,
        b,
        _ = f({ top: u.top - d.top - m, left: u.left - d.left - v, width: u.width, height: u.height })
      return (
        (_.marginTop = 0),
        (_.marginLeft = 0),
        !a &&
          l &&
          ((y = parseFloat(g.marginTop, 10)),
          (b = parseFloat(g.marginLeft, 10)),
          (_.top -= m - y),
          (_.bottom -= m - y),
          (_.left -= v - b),
          (_.right -= v - b),
          (_.marginTop = y),
          (_.marginLeft = b)),
        (a && !s ? i.contains(h) : i === h && 'BODY' !== h.nodeName) &&
          (_ = (function (t, e, i) {
            var n = 2 < arguments.length && void 0 !== i && i,
              o = c(e, 'top'),
              r = c(e, 'left'),
              s = n ? -1 : 1
            return (t.top += o * s), (t.bottom += o * s), (t.left += r * s), (t.right += r * s), t
          })(_, i)),
        _
      )
    }
    function m(t) {
      if (!t || !t.parentElement || r()) return document.documentElement
      for (var i = t.parentElement; i && 'none' === e(i, 'transform'); ) i = i.parentElement
      return i || document.documentElement
    }
    function v(t, r, s, a, u) {
      var d,
        p,
        v,
        y,
        b,
        _ = 4 < arguments.length && void 0 !== u && u,
        w = { top: 0, left: 0 },
        x = _ ? m(t) : l(t, o(r))
      'viewport' === a
        ? (w = (function (t, e) {
            var i = 1 < arguments.length && void 0 !== e && e,
              n = t.ownerDocument.documentElement,
              o = g(t, n),
              r = N(n.clientWidth, window.innerWidth || 0),
              s = N(n.clientHeight, window.innerHeight || 0),
              a = i ? 0 : c(n),
              l = i ? 0 : c(n, 'left')
            return f({ top: a - o.top + o.marginTop, left: l - o.left + o.marginLeft, width: r, height: s })
          })(x, _))
        : ('scrollParent' === a ? 'BODY' === (d = n(i(r))).nodeName && (d = t.ownerDocument.documentElement) : (d = 'window' === a ? t.ownerDocument.documentElement : a),
          (p = g(d, x, _)),
          'HTML' !== d.nodeName ||
          (function t(n) {
            var o = n.nodeName
            if ('BODY' === o || 'HTML' === o) return !1
            if ('fixed' === e(n, 'position')) return !0
            var r = i(n)
            return !!r && t(r)
          })(x)
            ? (w = p)
            : ((y = (v = h(t.ownerDocument)).height),
              (b = v.width),
              (w.top += p.top - p.marginTop),
              (w.bottom = y + p.top),
              (w.left += p.left - p.marginLeft),
              (w.right = b + p.left)))
      var C = 'number' == typeof (s = s || 0)
      return (w.left += C ? s : s.left || 0), (w.top += C ? s : s.top || 0), (w.right -= C ? s : s.right || 0), (w.bottom -= C ? s : s.bottom || 0), w
    }
    function y(t, e, i, n, o, r) {
      var s = 5 < arguments.length && void 0 !== r ? r : 0
      if (-1 === t.indexOf('auto')) return t
      var a = v(i, n, s, o),
        l = {
          top: { width: a.width, height: e.top - a.top },
          right: { width: a.right - e.right, height: a.height },
          bottom: { width: a.width, height: a.bottom - e.bottom },
          left: { width: e.left - a.left, height: a.height }
        },
        c = Object.keys(l)
          .map(function (t) {
            return H({ key: t }, l[t], { area: (e = l[t]).width * e.height })
            var e
          })
          .sort(function (t, e) {
            return e.area - t.area
          }),
        u = c.filter(function (t) {
          var e = t.width,
            n = t.height
          return e >= i.clientWidth && n >= i.clientHeight
        }),
        d = 0 < u.length ? u[0].key : c[0].key,
        h = t.split('-')[1]
      return d + (h ? '-' + h : '')
    }
    function b(t, e, i, n) {
      var r = 3 < arguments.length && void 0 !== n ? n : null
      return g(i, r ? m(e) : l(e, o(i)), r)
    }
    function _(t) {
      var e = t.ownerDocument.defaultView.getComputedStyle(t),
        i = parseFloat(e.marginTop || 0) + parseFloat(e.marginBottom || 0),
        n = parseFloat(e.marginLeft || 0) + parseFloat(e.marginRight || 0)
      return { width: t.offsetWidth + n, height: t.offsetHeight + i }
    }
    function w(t) {
      var e = { left: 'right', right: 'left', bottom: 'top', top: 'bottom' }
      return t.replace(/left|right|bottom|top/g, function (t) {
        return e[t]
      })
    }
    function x(t, e, i) {
      i = i.split('-')[0]
      var n = _(t),
        o = { width: n.width, height: n.height },
        r = -1 !== ['right', 'left'].indexOf(i),
        s = r ? 'top' : 'left',
        a = r ? 'left' : 'top',
        l = r ? 'height' : 'width',
        c = r ? 'width' : 'height'
      return (o[s] = e[s] + e[l] / 2 - n[l] / 2), (o[a] = i === a ? e[a] - n[c] : e[w(a)]), o
    }
    function C(t, e) {
      return Array.prototype.find ? t.find(e) : t.filter(e)[0]
    }
    function k(e, i, n) {
      return (
        (void 0 === n
          ? e
          : e.slice(
              0,
              (function (t, e, i) {
                if (Array.prototype.findIndex)
                  return t.findIndex(function (t) {
                    return t[e] === i
                  })
                var n = C(t, function (t) {
                  return t[e] === i
                })
                return t.indexOf(n)
              })(e, 'name', n)
            )
        ).forEach(function (e) {
          e.function && console.warn('`modifier.function` is deprecated, use `modifier.fn`!')
          var n = e.function || e.fn
          e.enabled && t(n) && ((i.offsets.popper = f(i.offsets.popper)), (i.offsets.reference = f(i.offsets.reference)), (i = n(i, e)))
        }),
        i
      )
    }
    function T(t, e) {
      return t.some(function (t) {
        var i = t.name
        return t.enabled && i === e
      })
    }
    function S(t) {
      for (var e = [!1, 'ms', 'Webkit', 'Moz', 'O'], i = t.charAt(0).toUpperCase() + t.slice(1), n = 0; n < e.length; n++) {
        var o = e[n],
          r = o ? '' + o + i : t
        if (void 0 !== document.body.style[r]) return r
      }
      return null
    }
    function E(t) {
      var e = t.ownerDocument
      return e ? e.defaultView : window
    }
    function I() {
      var t, e
      this.state.eventsEnabled &&
        (cancelAnimationFrame(this.scheduleUpdate),
        (this.state =
          ((t = this.reference),
          (e = this.state),
          E(t).removeEventListener('resize', e.updateBound),
          e.scrollParents.forEach(function (t) {
            t.removeEventListener('scroll', e.updateBound)
          }),
          (e.updateBound = null),
          (e.scrollParents = []),
          (e.scrollElement = null),
          (e.eventsEnabled = !1),
          e)))
    }
    function A(t) {
      return '' !== t && !isNaN(parseFloat(t)) && isFinite(t)
    }
    function D(t, e) {
      Object.keys(e).forEach(function (i) {
        var n = ''
        ;-1 !== ['width', 'height', 'top', 'right', 'bottom', 'left'].indexOf(i) && A(e[i]) && (n = 'px'), (t.style[i] = e[i] + n)
      })
    }
    function O(t, e, i) {
      var n,
        o = C(t, function (t) {
          return t.name === e
        }),
        r =
          !!o &&
          t.some(function (t) {
            return t.name === i && t.enabled && t.order < o.order
          })
      return r || ((n = '`' + e + '`'), console.warn('`' + i + '` modifier is required by ' + n + ' modifier in order to work, be sure to include it before ' + n + '!')), r
    }
    function M(t, e) {
      var i = 1 < arguments.length && void 0 !== e && e,
        n = U.indexOf(t),
        o = U.slice(n + 1).concat(U.slice(0, n))
      return i ? o.reverse() : o
    }
    function P(t, e, i) {
      return e in t ? Object.defineProperty(t, e, { value: i, enumerable: !0, configurable: !0, writable: !0 }) : (t[e] = i), t
    }
    var L = Math.min,
      z = Math.floor,
      F = Math.round,
      N = Math.max,
      R = 'undefined' != typeof window && 'undefined' != typeof document && 'undefined' != typeof navigator,
      j = (function () {
        for (var t = ['Edge', 'Trident', 'Firefox'], e = 0; e < t.length; e += 1) if (R && 0 <= navigator.userAgent.indexOf(t[e])) return 1
        return 0
      })(),
      $ =
        R && window.Promise
          ? function (t) {
              var e = !1
              return function () {
                e ||
                  ((e = !0),
                  window.Promise.resolve().then(function () {
                    ;(e = !1), t()
                  }))
              }
            }
          : function (t) {
              var e = !1
              return function () {
                e ||
                  ((e = !0),
                  setTimeout(function () {
                    ;(e = !1), t()
                  }, j))
              }
            },
      B = R && !(!window.MSInputMethodContext || !document.documentMode),
      W = R && /MSIE 10/.test(navigator.userAgent),
      H =
        Object.assign ||
        function (t) {
          for (var e, i = 1; i < arguments.length; i++) for (var n in (e = arguments[i])) Object.prototype.hasOwnProperty.call(e, n) && (t[n] = e[n])
          return t
        },
      q = R && /Firefox/i.test(navigator.userAgent),
      V = [
        'auto-start',
        'auto',
        'auto-end',
        'top-start',
        'top',
        'top-end',
        'right-start',
        'right',
        'right-end',
        'bottom-end',
        'bottom',
        'bottom-start',
        'left-end',
        'left',
        'left-start'
      ],
      U = V.slice(3),
      Y =
        ((function (t, e, i) {
          e && G(t.prototype, e), i && G(t, i)
        })(Q, [
          {
            key: 'update',
            value: function () {
              return function () {
                var t
                this.state.isDestroyed ||
                  (((t = { instance: this, styles: {}, arrowStyles: {}, attributes: {}, flipped: !1, offsets: {} }).offsets.reference = b(
                    this.state,
                    this.popper,
                    this.reference,
                    this.options.positionFixed
                  )),
                  (t.placement = y(
                    this.options.placement,
                    t.offsets.reference,
                    this.popper,
                    this.reference,
                    this.options.modifiers.flip.boundariesElement,
                    this.options.modifiers.flip.padding
                  )),
                  (t.originalPlacement = t.placement),
                  (t.positionFixed = this.options.positionFixed),
                  (t.offsets.popper = x(this.popper, t.offsets.reference, t.placement)),
                  (t.offsets.popper.position = this.options.positionFixed ? 'fixed' : 'absolute'),
                  (t = k(this.modifiers, t)),
                  this.state.isCreated ? this.options.onUpdate(t) : ((this.state.isCreated = !0), this.options.onCreate(t)))
              }.call(this)
            }
          },
          {
            key: 'destroy',
            value: function () {
              return function () {
                return (
                  (this.state.isDestroyed = !0),
                  T(this.modifiers, 'applyStyle') &&
                    (this.popper.removeAttribute('x-placement'),
                    (this.popper.style.position = ''),
                    (this.popper.style.top = ''),
                    (this.popper.style.left = ''),
                    (this.popper.style.right = ''),
                    (this.popper.style.bottom = ''),
                    (this.popper.style.willChange = ''),
                    (this.popper.style[S('transform')] = '')),
                  this.disableEventListeners(),
                  this.options.removeOnDestroy && this.popper.parentNode.removeChild(this.popper),
                  this
                )
              }.call(this)
            }
          },
          {
            key: 'enableEventListeners',
            value: function () {
              return function () {
                this.state.eventsEnabled ||
                  (this.state = (function (t, e, i, o) {
                    ;(i.updateBound = o), E(t).addEventListener('resize', i.updateBound, { passive: !0 })
                    var r = n(t)
                    return (
                      (function t(e, i, o, r) {
                        var s = 'BODY' === e.nodeName,
                          a = s ? e.ownerDocument.defaultView : e
                        a.addEventListener(i, o, { passive: !0 }), s || t(n(a.parentNode), i, o, r), r.push(a)
                      })(r, 'scroll', i.updateBound, i.scrollParents),
                      (i.scrollElement = r),
                      (i.eventsEnabled = !0),
                      i
                    )
                  })(this.reference, this.options, this.state, this.scheduleUpdate))
              }.call(this)
            }
          },
          {
            key: 'disableEventListeners',
            value: function () {
              return I.call(this)
            }
          }
        ]),
        Q)
    function Q(e, i) {
      var n = this,
        o = 2 < arguments.length && void 0 !== arguments[2] ? arguments[2] : {}
      ;(function (t, e) {
        if (!(t instanceof e)) throw new TypeError('Cannot call a class as a function')
      })(this, Q),
        (this.scheduleUpdate = function () {
          return requestAnimationFrame(n.update)
        }),
        (this.update = $(this.update.bind(this))),
        (this.options = H({}, Q.Defaults, o)),
        (this.state = { isDestroyed: !1, isCreated: !1, scrollParents: [] }),
        (this.reference = e && e.jquery ? e[0] : e),
        (this.popper = i && i.jquery ? i[0] : i),
        (this.options.modifiers = {}),
        Object.keys(H({}, Q.Defaults.modifiers, o.modifiers)).forEach(function (t) {
          n.options.modifiers[t] = H({}, Q.Defaults.modifiers[t] || {}, o.modifiers ? o.modifiers[t] : {})
        }),
        (this.modifiers = Object.keys(this.options.modifiers)
          .map(function (t) {
            return H({ name: t }, n.options.modifiers[t])
          })
          .sort(function (t, e) {
            return t.order - e.order
          })),
        this.modifiers.forEach(function (e) {
          e.enabled && t(e.onLoad) && e.onLoad(n.reference, n.popper, n.options, e, n.state)
        }),
        this.update()
      var r = this.options.eventsEnabled
      r && this.enableEventListeners(), (this.state.eventsEnabled = r)
    }
    function G(t, e) {
      for (var i, n = 0; n < e.length; n++)
        ((i = e[n]).enumerable = i.enumerable || !1), (i.configurable = !0), 'value' in i && (i.writable = !0), Object.defineProperty(t, i.key, i)
    }
    return (
      (Y.Utils = ('undefined' == typeof window ? global : window).PopperUtils),
      (Y.placements = V),
      (Y.Defaults = {
        placement: 'bottom',
        positionFixed: !1,
        eventsEnabled: !0,
        removeOnDestroy: !1,
        onCreate: function () {},
        onUpdate: function () {},
        modifiers: {
          shift: {
            order: 100,
            enabled: !0,
            fn: function (t) {
              var e,
                i,
                n,
                o,
                r,
                s,
                a,
                l = t.placement,
                c = l.split('-')[0],
                u = l.split('-')[1]
              return (
                u &&
                  ((i = (e = t.offsets).reference),
                  (n = e.popper),
                  (s = (o = -1 !== ['bottom', 'top'].indexOf(c)) ? 'width' : 'height'),
                  (a = { start: P({}, (r = o ? 'left' : 'top'), i[r]), end: P({}, r, i[r] + i[s] - n[s]) }),
                  (t.offsets.popper = H({}, n, a[u]))),
                t
              )
            }
          },
          offset: {
            order: 200,
            enabled: !0,
            fn: function (t, e) {
              var i = e.offset,
                n = t.placement,
                o = t.offsets,
                r = o.popper,
                s = o.reference,
                a = n.split('-')[0],
                l = A(+i)
                  ? [+i, 0]
                  : (function (t, e, i, n) {
                      var o = [0, 0],
                        r = -1 !== ['right', 'left'].indexOf(n),
                        s = t.split(/(\+|\-)/).map(function (t) {
                          return t.trim()
                        }),
                        a = s.indexOf(
                          C(s, function (t) {
                            return -1 !== t.search(/,|\s/)
                          })
                        )
                      s[a] && -1 === s[a].indexOf(',') && console.warn('Offsets separated by white space(s) are deprecated, use a comma (,) instead.')
                      var l = /\s*,\s*|\s+/
                      return (
                        (-1 === a ? [s] : [s.slice(0, a).concat([s[a].split(l)[0]]), [s[a].split(l)[1]].concat(s.slice(a + 1))])
                          .map(function (t, n) {
                            var o = (1 === n ? !r : r) ? 'height' : 'width',
                              s = !1
                            return t
                              .reduce(function (t, e) {
                                return '' === t[t.length - 1] && -1 !== ['+', '-'].indexOf(e)
                                  ? ((t[t.length - 1] = e), (s = !0), t)
                                  : s
                                  ? ((t[t.length - 1] += e), (s = !1), t)
                                  : t.concat(e)
                              }, [])
                              .map(function (t) {
                                return (function (t, e, i, n) {
                                  var o,
                                    r = t.match(/((?:\-|\+)?\d*\.?\d*)(.*)/),
                                    s = +r[1],
                                    a = r[2]
                                  if (!s) return t
                                  if (0 !== a.indexOf('%'))
                                    return 'vh' !== a && 'vw' !== a
                                      ? s
                                      : (('vh' === a
                                          ? N(document.documentElement.clientHeight, window.innerHeight || 0)
                                          : N(document.documentElement.clientWidth, window.innerWidth || 0)) /
                                          100) *
                                          s
                                  switch (a) {
                                    case '%p':
                                      o = i
                                      break
                                    case '%':
                                    case '%r':
                                    default:
                                      o = n
                                  }
                                  return (f(o)[e] / 100) * s
                                })(t, o, e, i)
                              })
                          })
                          .forEach(function (t, e) {
                            t.forEach(function (i, n) {
                              A(i) && (o[e] += i * ('-' === t[n - 1] ? -1 : 1))
                            })
                          }),
                        o
                      )
                    })(i, r, s, a)
              return (
                'left' === a
                  ? ((r.top += l[0]), (r.left -= l[1]))
                  : 'right' === a
                  ? ((r.top += l[0]), (r.left += l[1]))
                  : 'top' === a
                  ? ((r.left += l[0]), (r.top -= l[1]))
                  : 'bottom' === a && ((r.left += l[0]), (r.top += l[1])),
                (t.popper = r),
                t
              )
            },
            offset: 0
          },
          preventOverflow: {
            order: 300,
            enabled: !0,
            fn: function (t, e) {
              var i = e.boundariesElement || s(t.instance.popper)
              t.instance.reference === i && (i = s(i))
              var n = S('transform'),
                o = t.instance.popper.style,
                r = o.top,
                a = o.left,
                l = o[n]
              ;(o.top = ''), (o.left = ''), (o[n] = '')
              var c = v(t.instance.popper, t.instance.reference, e.padding, i, t.positionFixed)
              ;(o.top = r), (o.left = a), (o[n] = l), (e.boundaries = c)
              var u = e.priority,
                d = t.offsets.popper,
                h = {
                  primary: function (t) {
                    var i = d[t]
                    return d[t] < c[t] && !e.escapeWithReference && (i = N(d[t], c[t])), P({}, t, i)
                  },
                  secondary: function (t) {
                    var i = 'right' === t ? 'left' : 'top',
                      n = d[i]
                    return d[t] > c[t] && !e.escapeWithReference && (n = L(d[i], c[t] - ('right' === t ? d.width : d.height))), P({}, i, n)
                  }
                }
              return (
                u.forEach(function (t) {
                  var e = -1 === ['left', 'top'].indexOf(t) ? 'secondary' : 'primary'
                  d = H({}, d, h[e](t))
                }),
                (t.offsets.popper = d),
                t
              )
            },
            priority: ['left', 'right', 'top', 'bottom'],
            padding: 5,
            boundariesElement: 'scrollParent'
          },
          keepTogether: {
            order: 400,
            enabled: !0,
            fn: function (t) {
              var e = t.offsets,
                i = e.popper,
                n = e.reference,
                o = t.placement.split('-')[0],
                r = z,
                s = -1 !== ['top', 'bottom'].indexOf(o),
                a = s ? 'right' : 'bottom',
                l = s ? 'left' : 'top',
                c = s ? 'width' : 'height'
              return i[a] < r(n[l]) && (t.offsets.popper[l] = r(n[l]) - i[c]), i[l] > r(n[a]) && (t.offsets.popper[l] = r(n[a])), t
            }
          },
          arrow: {
            order: 500,
            enabled: !0,
            fn: function (t, i) {
              var n
              if (!O(t.instance.modifiers, 'arrow', 'keepTogether')) return t
              var o = i.element
              if ('string' == typeof o) {
                if (!(o = t.instance.popper.querySelector(o))) return t
              } else if (!t.instance.popper.contains(o)) return console.warn('WARNING: `arrow.element` must be child of its popper element!'), t
              var r = t.placement.split('-')[0],
                s = t.offsets,
                a = s.popper,
                l = s.reference,
                c = -1 !== ['left', 'right'].indexOf(r),
                u = c ? 'height' : 'width',
                d = c ? 'Top' : 'Left',
                h = d.toLowerCase(),
                p = c ? 'left' : 'top',
                g = c ? 'bottom' : 'right',
                m = _(o)[u]
              l[g] - m < a[h] && (t.offsets.popper[h] -= a[h] - (l[g] - m)), l[h] + m > a[g] && (t.offsets.popper[h] += l[h] + m - a[g]), (t.offsets.popper = f(t.offsets.popper))
              var v = l[h] + l[u] / 2 - m / 2,
                y = e(t.instance.popper),
                b = parseFloat(y['margin' + d], 10),
                w = parseFloat(y['border' + d + 'Width'], 10),
                x = v - t.offsets.popper[h] - b - w
              x = N(L(a[u] - m, x), 0)
              return (t.arrowElement = o), (t.offsets.arrow = (P((n = {}), h, F(x)), P(n, p, ''), n)), t
            },
            element: '[x-arrow]'
          },
          flip: {
            order: 600,
            enabled: !0,
            fn: function (t, e) {
              if (T(t.instance.modifiers, 'inner')) return t
              if (t.flipped && t.placement === t.originalPlacement) return t
              var i = v(t.instance.popper, t.instance.reference, e.padding, e.boundariesElement, t.positionFixed),
                n = t.placement.split('-')[0],
                o = w(n),
                r = t.placement.split('-')[1] || '',
                s = []
              switch (e.behavior) {
                case 'flip':
                  s = [n, o]
                  break
                case 'clockwise':
                  s = M(n)
                  break
                case 'counterclockwise':
                  s = M(n, !0)
                  break
                default:
                  s = e.behavior
              }
              return (
                s.forEach(function (a, l) {
                  if (n !== a || s.length === l + 1) return t
                  ;(n = t.placement.split('-')[0]), (o = w(n))
                  var c,
                    u = t.offsets.popper,
                    d = t.offsets.reference,
                    h = z,
                    f =
                      ('left' === n && h(u.right) > h(d.left)) ||
                      ('right' === n && h(u.left) < h(d.right)) ||
                      ('top' === n && h(u.bottom) > h(d.top)) ||
                      ('bottom' === n && h(u.top) < h(d.bottom)),
                    p = h(u.left) < h(i.left),
                    g = h(u.right) > h(i.right),
                    m = h(u.top) < h(i.top),
                    v = h(u.bottom) > h(i.bottom),
                    y = ('left' === n && p) || ('right' === n && g) || ('top' === n && m) || ('bottom' === n && v),
                    b = -1 !== ['top', 'bottom'].indexOf(n),
                    _ = !!e.flipVariations && ((b && 'start' === r && p) || (b && 'end' === r && g) || (!b && 'start' === r && m) || (!b && 'end' === r && v)),
                    C = !!e.flipVariationsByContent && ((b && 'start' === r && g) || (b && 'end' === r && p) || (!b && 'start' === r && v) || (!b && 'end' === r && m)),
                    T = _ || C
                  ;(f || y || T) &&
                    ((t.flipped = !0),
                    (f || y) && (n = s[l + 1]),
                    T && (r = 'end' === (c = r) ? 'start' : 'start' === c ? 'end' : c),
                    (t.placement = n + (r ? '-' + r : '')),
                    (t.offsets.popper = H({}, t.offsets.popper, x(t.instance.popper, t.offsets.reference, t.placement))),
                    (t = k(t.instance.modifiers, t, 'flip')))
                }),
                t
              )
            },
            behavior: 'flip',
            padding: 5,
            boundariesElement: 'viewport',
            flipVariations: !1,
            flipVariationsByContent: !1
          },
          inner: {
            order: 700,
            enabled: !1,
            fn: function (t) {
              var e = t.placement,
                i = e.split('-')[0],
                n = t.offsets,
                o = n.popper,
                r = n.reference,
                s = -1 !== ['left', 'right'].indexOf(i),
                a = -1 === ['top', 'left'].indexOf(i)
              return (o[s ? 'left' : 'top'] = r[i] - (a ? o[s ? 'width' : 'height'] : 0)), (t.placement = w(e)), (t.offsets.popper = f(o)), t
            }
          },
          hide: {
            order: 800,
            enabled: !0,
            fn: function (t) {
              if (!O(t.instance.modifiers, 'hide', 'preventOverflow')) return t
              var e = t.offsets.reference,
                i = C(t.instance.modifiers, function (t) {
                  return 'preventOverflow' === t.name
                }).boundaries
              if (e.bottom < i.top || e.left > i.right || e.top > i.bottom || e.right < i.left) {
                if (!0 === t.hide) return t
                ;(t.hide = !0), (t.attributes['x-out-of-boundaries'] = '')
              } else {
                if (!1 === t.hide) return t
                ;(t.hide = !1), (t.attributes['x-out-of-boundaries'] = !1)
              }
              return t
            }
          },
          computeStyle: {
            order: 850,
            enabled: !0,
            fn: function (t, e) {
              var i = e.x,
                n = e.y,
                o = t.offsets.popper,
                r = C(t.instance.modifiers, function (t) {
                  return 'applyStyle' === t.name
                }).gpuAcceleration
              void 0 !== r && console.warn('WARNING: `gpuAcceleration` option moved to `computeStyle` modifier and will not be supported in future versions of Popper.js!')
              var a,
                l,
                c = void 0 === r ? e.gpuAcceleration : r,
                u = s(t.instance.popper),
                d = p(u),
                h = { position: o.position },
                f = (function (t, e) {
                  function i(t) {
                    return t
                  }
                  var n = t.offsets,
                    o = n.popper,
                    r = n.reference,
                    s = F,
                    a = s(r.width),
                    l = s(o.width),
                    c = -1 !== ['left', 'right'].indexOf(t.placement),
                    u = -1 !== t.placement.indexOf('-'),
                    d = e ? (c || u || a % 2 == l % 2 ? s : z) : i,
                    h = e ? s : i
                  return { left: d(1 == a % 2 && 1 == l % 2 && !u && e ? o.left - 1 : o.left), top: h(o.top), bottom: h(o.bottom), right: d(o.right) }
                })(t, window.devicePixelRatio < 2 || !q),
                g = 'bottom' === i ? 'top' : 'bottom',
                m = 'right' === n ? 'left' : 'right',
                v = S('transform'),
                y = 'bottom' == g ? ('HTML' === u.nodeName ? -u.clientHeight + f.bottom : -d.height + f.bottom) : f.top,
                b = 'right' == m ? ('HTML' === u.nodeName ? -u.clientWidth + f.right : -d.width + f.right) : f.left
              c && v
                ? ((h[v] = 'translate3d(' + b + 'px, ' + y + 'px, 0)'), (h[g] = 0), (h[m] = 0), (h.willChange = 'transform'))
                : ((a = 'bottom' == g ? -1 : 1), (l = 'right' == m ? -1 : 1), (h[g] = y * a), (h[m] = b * l), (h.willChange = g + ', ' + m))
              var _ = { 'x-placement': t.placement }
              return (t.attributes = H({}, _, t.attributes)), (t.styles = H({}, h, t.styles)), (t.arrowStyles = H({}, t.offsets.arrow, t.arrowStyles)), t
            },
            gpuAcceleration: !0,
            x: 'bottom',
            y: 'right'
          },
          applyStyle: {
            order: 900,
            enabled: !0,
            fn: function (t) {
              return (
                D(t.instance.popper, t.styles),
                (e = t.instance.popper),
                (i = t.attributes),
                Object.keys(i).forEach(function (t) {
                  !1 === i[t] ? e.removeAttribute(t) : e.setAttribute(t, i[t])
                }),
                t.arrowElement && Object.keys(t.arrowStyles).length && D(t.arrowElement, t.arrowStyles),
                t
              )
              var e, i
            },
            onLoad: function (t, e, i, n, o) {
              var r = b(o, e, t, i.positionFixed),
                s = y(i.placement, r, e, t, i.modifiers.flip.boundariesElement, i.modifiers.flip.padding)
              return e.setAttribute('x-placement', s), D(e, { position: i.positionFixed ? 'fixed' : 'absolute' }), i
            },
            gpuAcceleration: void 0
          }
        }
      }),
      Y
    )
  }),
  (function (t, e) {
    'object' == typeof exports && 'undefined' != typeof module
      ? e(exports, require('jquery'), require('popper.js'))
      : 'function' == typeof define && define.amd
      ? define(['exports', 'jquery', 'popper.js'], e)
      : e(((t = t || self).bootstrap = {}), t.jQuery, t.Popper)
  })(this, function (t, e, i) {
    'use strict'
    function n(t, e) {
      for (var i = 0; i < e.length; i++) {
        var n = e[i]
        ;(n.enumerable = n.enumerable || !1), (n.configurable = !0), 'value' in n && (n.writable = !0), Object.defineProperty(t, n.key, n)
      }
    }
    function o(t, e, i) {
      return e && n(t.prototype, e), i && n(t, i), t
    }
    function r(t, e) {
      var i,
        n = Object.keys(t)
      return (
        Object.getOwnPropertySymbols &&
          ((i = Object.getOwnPropertySymbols(t)),
          e &&
            (i = i.filter(function (e) {
              return Object.getOwnPropertyDescriptor(t, e).enumerable
            })),
          n.push.apply(n, i)),
        n
      )
    }
    function s(t) {
      for (var e = 1; e < arguments.length; e++) {
        var i = null != arguments[e] ? arguments[e] : {}
        e % 2
          ? r(Object(i), !0).forEach(function (e) {
              var n, o, r
              ;(n = t), (r = i[(o = e)]), o in n ? Object.defineProperty(n, o, { value: r, enumerable: !0, configurable: !0, writable: !0 }) : (n[o] = r)
            })
          : Object.getOwnPropertyDescriptors
          ? Object.defineProperties(t, Object.getOwnPropertyDescriptors(i))
          : r(Object(i)).forEach(function (e) {
              Object.defineProperty(t, e, Object.getOwnPropertyDescriptor(i, e))
            })
      }
      return t
    }
    ;(e = e && Object.prototype.hasOwnProperty.call(e, 'default') ? e.default : e), (i = i && Object.prototype.hasOwnProperty.call(i, 'default') ? i.default : i)
    var a = {
      TRANSITION_END: 'bsTransitionEnd',
      getUID: function (t) {
        for (; (t += ~~(1e6 * Math.random())), document.getElementById(t); );
        return t
      },
      getSelectorFromElement: function (t) {
        var e,
          i = t.getAttribute('data-target')
        ;(i && '#' !== i) || (i = (e = t.getAttribute('href')) && '#' !== e ? e.trim() : '')
        try {
          return document.querySelector(i) ? i : null
        } catch (t) {
          return null
        }
      },
      getTransitionDurationFromElement: function (t) {
        if (!t) return 0
        var i = e(t).css('transition-duration'),
          n = e(t).css('transition-delay'),
          o = parseFloat(i),
          r = parseFloat(n)
        return o || r ? ((i = i.split(',')[0]), (n = n.split(',')[0]), 1e3 * (parseFloat(i) + parseFloat(n))) : 0
      },
      reflow: function (t) {
        return t.offsetHeight
      },
      triggerTransitionEnd: function (t) {
        e(t).trigger('transitionend')
      },
      supportsTransitionEnd: function () {
        return Boolean('transitionend')
      },
      isElement: function (t) {
        return (t[0] || t).nodeType
      },
      typeCheckConfig: function (t, e, i) {
        for (var n in i)
          if (Object.prototype.hasOwnProperty.call(i, n)) {
            var o = i[n],
              r = e[n],
              s =
                r && a.isElement(r)
                  ? 'element'
                  : null == r
                  ? '' + r
                  : {}.toString
                      .call(r)
                      .match(/\s([a-z]+)/i)[1]
                      .toLowerCase()
            if (!new RegExp(o).test(s)) throw new Error(t.toUpperCase() + ': Option "' + n + '" provided type "' + s + '" but expected type "' + o + '".')
          }
      },
      findShadowRoot: function (t) {
        if (!document.documentElement.attachShadow) return null
        if ('function' != typeof t.getRootNode) return t instanceof ShadowRoot ? t : t.parentNode ? a.findShadowRoot(t.parentNode) : null
        var e = t.getRootNode()
        return e instanceof ShadowRoot ? e : null
      },
      jQueryDetection: function () {
        if (void 0 === e) throw new TypeError("Bootstrap's JavaScript requires jQuery. jQuery must be included before Bootstrap's JavaScript.")
        var t = e.fn.jquery.split(' ')[0].split('.')
        if ((t[0] < 2 && t[1] < 9) || (1 === t[0] && 9 === t[1] && t[2] < 1) || 4 <= t[0])
          throw new Error("Bootstrap's JavaScript requires at least jQuery v1.9.1 but less than v4.0.0")
      }
    }
    a.jQueryDetection(),
      (e.fn.emulateTransitionEnd = function (t) {
        var i = this,
          n = !1
        return (
          e(this).one(a.TRANSITION_END, function () {
            n = !0
          }),
          setTimeout(function () {
            n || a.triggerTransitionEnd(i)
          }, t),
          this
        )
      }),
      (e.event.special[a.TRANSITION_END] = {
        bindType: 'transitionend',
        delegateType: 'transitionend',
        handle: function (t) {
          if (e(t.target).is(this)) return t.handleObj.handler.apply(this, arguments)
        }
      })
    var l,
      c = 'alert',
      u = e.fn[c],
      d =
        (((l = h.prototype).close = function (t) {
          var e = this._element
          t && (e = this._getRootElement(t)), this._triggerCloseEvent(e).isDefaultPrevented() || this._removeElement(e)
        }),
        (l.dispose = function () {
          e.removeData(this._element, 'bs.alert'), (this._element = null)
        }),
        (l._getRootElement = function (t) {
          var i = a.getSelectorFromElement(t),
            n = !1
          return i && (n = document.querySelector(i)), n || e(t).closest('.alert')[0]
        }),
        (l._triggerCloseEvent = function (t) {
          var i = e.Event('close.bs.alert')
          return e(t).trigger(i), i
        }),
        (l._removeElement = function (t) {
          var i,
            n = this
          e(t).removeClass('show'),
            e(t).hasClass('fade')
              ? ((i = a.getTransitionDurationFromElement(t)),
                e(t)
                  .one(a.TRANSITION_END, function (e) {
                    return n._destroyElement(t, e)
                  })
                  .emulateTransitionEnd(i))
              : this._destroyElement(t)
        }),
        (l._destroyElement = function (t) {
          e(t).detach().trigger('closed.bs.alert').remove()
        }),
        (h._jQueryInterface = function (t) {
          return this.each(function () {
            var i = e(this),
              n = i.data('bs.alert')
            n || ((n = new h(this)), i.data('bs.alert', n)), 'close' === t && n[t](this)
          })
        }),
        (h._handleDismiss = function (t) {
          return function (e) {
            e && e.preventDefault(), t.close(this)
          }
        }),
        o(h, null, [
          {
            key: 'VERSION',
            get: function () {
              return '4.5.0'
            }
          }
        ]),
        h)
    function h(t) {
      this._element = t
    }
    e(document).on('click.bs.alert.data-api', '[data-dismiss="alert"]', d._handleDismiss(new d())),
      (e.fn[c] = d._jQueryInterface),
      (e.fn[c].Constructor = d),
      (e.fn[c].noConflict = function () {
        return (e.fn[c] = u), d._jQueryInterface
      })
    var f,
      p = e.fn.button,
      g =
        (((f = m.prototype).toggle = function () {
          var t,
            i,
            n = !0,
            o = !0,
            r = e(this._element).closest('[data-toggle="buttons"]')[0]
          !r ||
            ((t = this._element.querySelector('input:not([type="hidden"])')) &&
              ('radio' === t.type && (t.checked && this._element.classList.contains('active') ? (n = !1) : (i = r.querySelector('.active')) && e(i).removeClass('active')),
              n && (('checkbox' !== t.type && 'radio' !== t.type) || (t.checked = !this._element.classList.contains('active')), e(t).trigger('change')),
              t.focus(),
              (o = !1))),
            this._element.hasAttribute('disabled') ||
              this._element.classList.contains('disabled') ||
              (o && this._element.setAttribute('aria-pressed', !this._element.classList.contains('active')), n && e(this._element).toggleClass('active'))
        }),
        (f.dispose = function () {
          e.removeData(this._element, 'bs.button'), (this._element = null)
        }),
        (m._jQueryInterface = function (t) {
          return this.each(function () {
            var i = e(this).data('bs.button')
            i || ((i = new m(this)), e(this).data('bs.button', i)), 'toggle' === t && i[t]()
          })
        }),
        o(m, null, [
          {
            key: 'VERSION',
            get: function () {
              return '4.5.0'
            }
          }
        ]),
        m)
    function m(t) {
      this._element = t
    }
    e(document)
      .on('click.bs.button.data-api', '[data-toggle^="button"]', function (t) {
        var i = t.target,
          n = i
        if ((e(i).hasClass('btn') || (i = e(i).closest('.btn')[0]), !i || i.hasAttribute('disabled') || i.classList.contains('disabled'))) t.preventDefault()
        else {
          var o = i.querySelector('input:not([type="hidden"])')
          if (o && (o.hasAttribute('disabled') || o.classList.contains('disabled'))) return void t.preventDefault()
          'LABEL' === n.tagName && o && 'checkbox' === o.type && t.preventDefault(), g._jQueryInterface.call(e(i), 'toggle')
        }
      })
      .on('focus.bs.button.data-api blur.bs.button.data-api', '[data-toggle^="button"]', function (t) {
        var i = e(t.target).closest('.btn')[0]
        e(i).toggleClass('focus', /^focus(in)?$/.test(t.type))
      }),
      e(window).on('load.bs.button.data-api', function () {
        for (var t = [].slice.call(document.querySelectorAll('[data-toggle="buttons"] .btn')), e = 0, i = t.length; e < i; e++) {
          var n = t[e],
            o = n.querySelector('input:not([type="hidden"])')
          o.checked || o.hasAttribute('checked') ? n.classList.add('active') : n.classList.remove('active')
        }
        for (var r = 0, s = (t = [].slice.call(document.querySelectorAll('[data-toggle="button"]'))).length; r < s; r++) {
          var a = t[r]
          'true' === a.getAttribute('aria-pressed') ? a.classList.add('active') : a.classList.remove('active')
        }
      }),
      (e.fn.button = g._jQueryInterface),
      (e.fn.button.Constructor = g),
      (e.fn.button.noConflict = function () {
        return (e.fn.button = p), g._jQueryInterface
      })
    var v,
      y = 'carousel',
      b = e.fn[y],
      _ = { interval: 5e3, keyboard: !0, slide: !1, pause: 'hover', wrap: !0, touch: !0 },
      w = { interval: '(number|boolean)', keyboard: 'boolean', slide: '(boolean|string)', pause: '(string|boolean)', wrap: 'boolean', touch: 'boolean' },
      x = { TOUCH: 'touch', PEN: 'pen' },
      C =
        (((v = k.prototype).next = function () {
          this._isSliding || this._slide('next')
        }),
        (v.nextWhenVisible = function () {
          !document.hidden && e(this._element).is(':visible') && 'hidden' !== e(this._element).css('visibility') && this.next()
        }),
        (v.prev = function () {
          this._isSliding || this._slide('prev')
        }),
        (v.pause = function (t) {
          t || (this._isPaused = !0),
            this._element.querySelector('.carousel-item-next, .carousel-item-prev') && (a.triggerTransitionEnd(this._element), this.cycle(!0)),
            clearInterval(this._interval),
            (this._interval = null)
        }),
        (v.cycle = function (t) {
          t || (this._isPaused = !1),
            this._interval && (clearInterval(this._interval), (this._interval = null)),
            this._config.interval &&
              !this._isPaused &&
              (this._interval = setInterval((document.visibilityState ? this.nextWhenVisible : this.next).bind(this), this._config.interval))
        }),
        (v.to = function (t) {
          var i = this
          this._activeElement = this._element.querySelector('.active.carousel-item')
          var n = this._getItemIndex(this._activeElement)
          if (!(t > this._items.length - 1 || t < 0))
            if (this._isSliding)
              e(this._element).one('slid.bs.carousel', function () {
                return i.to(t)
              })
            else {
              if (n === t) return this.pause(), void this.cycle()
              var o = n < t ? 'next' : 'prev'
              this._slide(o, this._items[t])
            }
        }),
        (v.dispose = function () {
          e(this._element).off('.bs.carousel'),
            e.removeData(this._element, 'bs.carousel'),
            (this._items = null),
            (this._config = null),
            (this._element = null),
            (this._interval = null),
            (this._isPaused = null),
            (this._isSliding = null),
            (this._activeElement = null),
            (this._indicatorsElement = null)
        }),
        (v._getConfig = function (t) {
          return (t = s(s({}, _), t)), a.typeCheckConfig(y, t, w), t
        }),
        (v._handleSwipe = function () {
          var t,
            e = Math.abs(this.touchDeltaX)
          e <= 40 || ((t = e / this.touchDeltaX), (this.touchDeltaX = 0) < t && this.prev(), t < 0 && this.next())
        }),
        (v._addEventListeners = function () {
          var t = this
          this._config.keyboard &&
            e(this._element).on('keydown.bs.carousel', function (e) {
              return t._keydown(e)
            }),
            'hover' === this._config.pause &&
              e(this._element)
                .on('mouseenter.bs.carousel', function (e) {
                  return t.pause(e)
                })
                .on('mouseleave.bs.carousel', function (e) {
                  return t.cycle(e)
                }),
            this._config.touch && this._addTouchEventListeners()
        }),
        (v._addTouchEventListeners = function () {
          var t,
            i,
            n = this
          this._touchSupported &&
            ((t = function (t) {
              n._pointerEvent && x[t.originalEvent.pointerType.toUpperCase()]
                ? (n.touchStartX = t.originalEvent.clientX)
                : n._pointerEvent || (n.touchStartX = t.originalEvent.touches[0].clientX)
            }),
            (i = function (t) {
              n._pointerEvent && x[t.originalEvent.pointerType.toUpperCase()] && (n.touchDeltaX = t.originalEvent.clientX - n.touchStartX),
                n._handleSwipe(),
                'hover' === n._config.pause &&
                  (n.pause(),
                  n.touchTimeout && clearTimeout(n.touchTimeout),
                  (n.touchTimeout = setTimeout(function (t) {
                    return n.cycle(t)
                  }, 500 + n._config.interval)))
            }),
            e(this._element.querySelectorAll('.carousel-item img')).on('dragstart.bs.carousel', function (t) {
              return t.preventDefault()
            }),
            this._pointerEvent
              ? (e(this._element).on('pointerdown.bs.carousel', t), e(this._element).on('pointerup.bs.carousel', i), this._element.classList.add('pointer-event'))
              : (e(this._element).on('touchstart.bs.carousel', t),
                e(this._element).on('touchmove.bs.carousel', function (t) {
                  var e
                  ;(e = t).originalEvent.touches && 1 < e.originalEvent.touches.length ? (n.touchDeltaX = 0) : (n.touchDeltaX = e.originalEvent.touches[0].clientX - n.touchStartX)
                }),
                e(this._element).on('touchend.bs.carousel', i)))
        }),
        (v._keydown = function (t) {
          if (!/input|textarea/i.test(t.target.tagName))
            switch (t.which) {
              case 37:
                t.preventDefault(), this.prev()
                break
              case 39:
                t.preventDefault(), this.next()
            }
        }),
        (v._getItemIndex = function (t) {
          return (this._items = t && t.parentNode ? [].slice.call(t.parentNode.querySelectorAll('.carousel-item')) : []), this._items.indexOf(t)
        }),
        (v._getItemByDirection = function (t, e) {
          var i = 'next' === t,
            n = 'prev' === t,
            o = this._getItemIndex(e),
            r = this._items.length - 1
          if (((n && 0 === o) || (i && o === r)) && !this._config.wrap) return e
          var s = (o + ('prev' === t ? -1 : 1)) % this._items.length
          return -1 == s ? this._items[this._items.length - 1] : this._items[s]
        }),
        (v._triggerSlideEvent = function (t, i) {
          var n = this._getItemIndex(t),
            o = this._getItemIndex(this._element.querySelector('.active.carousel-item')),
            r = e.Event('slide.bs.carousel', { relatedTarget: t, direction: i, from: o, to: n })
          return e(this._element).trigger(r), r
        }),
        (v._setActiveIndicatorElement = function (t) {
          var i, n
          this._indicatorsElement &&
            ((i = [].slice.call(this._indicatorsElement.querySelectorAll('.active'))),
            e(i).removeClass('active'),
            (n = this._indicatorsElement.children[this._getItemIndex(t)]) && e(n).addClass('active'))
        }),
        (v._slide = function (t, i) {
          var n,
            o,
            r,
            s,
            l,
            c = this,
            u = this._element.querySelector('.active.carousel-item'),
            d = this._getItemIndex(u),
            h = i || (u && this._getItemByDirection(t, u)),
            f = this._getItemIndex(h),
            p = Boolean(this._interval),
            g = 'next' === t ? ((n = 'carousel-item-left'), (o = 'carousel-item-next'), 'left') : ((n = 'carousel-item-right'), (o = 'carousel-item-prev'), 'right')
          h && e(h).hasClass('active')
            ? (this._isSliding = !1)
            : !this._triggerSlideEvent(h, g).isDefaultPrevented() &&
              u &&
              h &&
              ((this._isSliding = !0),
              p && this.pause(),
              this._setActiveIndicatorElement(h),
              (r = e.Event('slid.bs.carousel', { relatedTarget: h, direction: g, from: d, to: f })),
              e(this._element).hasClass('slide')
                ? (e(h).addClass(o),
                  a.reflow(h),
                  e(u).addClass(n),
                  e(h).addClass(n),
                  (s = parseInt(h.getAttribute('data-interval'), 10))
                    ? ((this._config.defaultInterval = this._config.defaultInterval || this._config.interval), (this._config.interval = s))
                    : (this._config.interval = this._config.defaultInterval || this._config.interval),
                  (l = a.getTransitionDurationFromElement(u)),
                  e(u)
                    .one(a.TRANSITION_END, function () {
                      e(h)
                        .removeClass(n + ' ' + o)
                        .addClass('active'),
                        e(u).removeClass('active ' + o + ' ' + n),
                        (c._isSliding = !1),
                        setTimeout(function () {
                          return e(c._element).trigger(r)
                        }, 0)
                    })
                    .emulateTransitionEnd(l))
                : (e(u).removeClass('active'), e(h).addClass('active'), (this._isSliding = !1), e(this._element).trigger(r)),
              p && this.cycle())
        }),
        (k._jQueryInterface = function (t) {
          return this.each(function () {
            var i = e(this).data('bs.carousel'),
              n = s(s({}, _), e(this).data())
            'object' == typeof t && (n = s(s({}, n), t))
            var o = 'string' == typeof t ? t : n.slide
            if ((i || ((i = new k(this, n)), e(this).data('bs.carousel', i)), 'number' == typeof t)) i.to(t)
            else if ('string' == typeof o) {
              if (void 0 === i[o]) throw new TypeError('No method named "' + o + '"')
              i[o]()
            } else n.interval && n.ride && (i.pause(), i.cycle())
          })
        }),
        (k._dataApiClickHandler = function (t) {
          var i,
            n,
            o,
            r = a.getSelectorFromElement(this)
          !r ||
            ((i = e(r)[0]) &&
              e(i).hasClass('carousel') &&
              ((n = s(s({}, e(i).data()), e(this).data())),
              (o = this.getAttribute('data-slide-to')) && (n.interval = !1),
              k._jQueryInterface.call(e(i), n),
              o && e(i).data('bs.carousel').to(o),
              t.preventDefault()))
        }),
        o(k, null, [
          {
            key: 'VERSION',
            get: function () {
              return '4.5.0'
            }
          },
          {
            key: 'Default',
            get: function () {
              return _
            }
          }
        ]),
        k)
    function k(t, e) {
      ;(this._items = null),
        (this._interval = null),
        (this._activeElement = null),
        (this._isPaused = !1),
        (this._isSliding = !1),
        (this.touchTimeout = null),
        (this.touchStartX = 0),
        (this.touchDeltaX = 0),
        (this._config = this._getConfig(e)),
        (this._element = t),
        (this._indicatorsElement = this._element.querySelector('.carousel-indicators')),
        (this._touchSupported = 'ontouchstart' in document.documentElement || 0 < navigator.maxTouchPoints),
        (this._pointerEvent = Boolean(window.PointerEvent || window.MSPointerEvent)),
        this._addEventListeners()
    }
    e(document).on('click.bs.carousel.data-api', '[data-slide], [data-slide-to]', C._dataApiClickHandler),
      e(window).on('load.bs.carousel.data-api', function () {
        for (var t = [].slice.call(document.querySelectorAll('[data-ride="carousel"]')), i = 0, n = t.length; i < n; i++) {
          var o = e(t[i])
          C._jQueryInterface.call(o, o.data())
        }
      }),
      (e.fn[y] = C._jQueryInterface),
      (e.fn[y].Constructor = C),
      (e.fn[y].noConflict = function () {
        return (e.fn[y] = b), C._jQueryInterface
      })
    var T,
      S = 'collapse',
      E = e.fn[S],
      I = { toggle: !0, parent: '' },
      A = { toggle: 'boolean', parent: '(string|element)' },
      D =
        (((T = O.prototype).toggle = function () {
          e(this._element).hasClass('show') ? this.hide() : this.show()
        }),
        (T.show = function () {
          var t,
            i,
            n,
            o,
            r,
            s,
            l = this
          this._isTransitioning ||
            e(this._element).hasClass('show') ||
            (this._parent &&
              0 ===
                (t = [].slice.call(this._parent.querySelectorAll('.show, .collapsing')).filter(function (t) {
                  return 'string' == typeof l._config.parent ? t.getAttribute('data-parent') === l._config.parent : t.classList.contains('collapse')
                })).length &&
              (t = null),
            t && (i = e(t).not(this._selector).data('bs.collapse')) && i._isTransitioning) ||
            ((n = e.Event('show.bs.collapse')),
            e(this._element).trigger(n),
            n.isDefaultPrevented() ||
              (t && (O._jQueryInterface.call(e(t).not(this._selector), 'hide'), i || e(t).data('bs.collapse', null)),
              (o = this._getDimension()),
              e(this._element).removeClass('collapse').addClass('collapsing'),
              (this._element.style[o] = 0),
              this._triggerArray.length && e(this._triggerArray).removeClass('collapsed').attr('aria-expanded', !0),
              this.setTransitioning(!0),
              (r = 'scroll' + (o[0].toUpperCase() + o.slice(1))),
              (s = a.getTransitionDurationFromElement(this._element)),
              e(this._element)
                .one(a.TRANSITION_END, function () {
                  e(l._element).removeClass('collapsing').addClass('collapse show'), (l._element.style[o] = ''), l.setTransitioning(!1), e(l._element).trigger('shown.bs.collapse')
                })
                .emulateTransitionEnd(s),
              (this._element.style[o] = this._element[r] + 'px')))
        }),
        (T.hide = function () {
          var t = this
          if (!this._isTransitioning && e(this._element).hasClass('show')) {
            var i = e.Event('hide.bs.collapse')
            if ((e(this._element).trigger(i), !i.isDefaultPrevented())) {
              var n = this._getDimension()
              ;(this._element.style[n] = this._element.getBoundingClientRect()[n] + 'px'),
                a.reflow(this._element),
                e(this._element).addClass('collapsing').removeClass('collapse show')
              var o = this._triggerArray.length
              if (0 < o)
                for (var r = 0; r < o; r++) {
                  var s = this._triggerArray[r],
                    l = a.getSelectorFromElement(s)
                  null !== l && (e([].slice.call(document.querySelectorAll(l))).hasClass('show') || e(s).addClass('collapsed').attr('aria-expanded', !1))
                }
              this.setTransitioning(!0), (this._element.style[n] = '')
              var c = a.getTransitionDurationFromElement(this._element)
              e(this._element)
                .one(a.TRANSITION_END, function () {
                  t.setTransitioning(!1), e(t._element).removeClass('collapsing').addClass('collapse').trigger('hidden.bs.collapse')
                })
                .emulateTransitionEnd(c)
            }
          }
        }),
        (T.setTransitioning = function (t) {
          this._isTransitioning = t
        }),
        (T.dispose = function () {
          e.removeData(this._element, 'bs.collapse'),
            (this._config = null),
            (this._parent = null),
            (this._element = null),
            (this._triggerArray = null),
            (this._isTransitioning = null)
        }),
        (T._getConfig = function (t) {
          return ((t = s(s({}, I), t)).toggle = Boolean(t.toggle)), a.typeCheckConfig(S, t, A), t
        }),
        (T._getDimension = function () {
          return e(this._element).hasClass('width') ? 'width' : 'height'
        }),
        (T._getParent = function () {
          var t,
            i = this
          a.isElement(this._config.parent)
            ? ((t = this._config.parent), void 0 !== this._config.parent.jquery && (t = this._config.parent[0]))
            : (t = document.querySelector(this._config.parent))
          var n = '[data-toggle="collapse"][data-parent="' + this._config.parent + '"]',
            o = [].slice.call(t.querySelectorAll(n))
          return (
            e(o).each(function (t, e) {
              i._addAriaAndCollapsedClass(O._getTargetFromElement(e), [e])
            }),
            t
          )
        }),
        (T._addAriaAndCollapsedClass = function (t, i) {
          var n = e(t).hasClass('show')
          i.length && e(i).toggleClass('collapsed', !n).attr('aria-expanded', n)
        }),
        (O._getTargetFromElement = function (t) {
          var e = a.getSelectorFromElement(t)
          return e ? document.querySelector(e) : null
        }),
        (O._jQueryInterface = function (t) {
          return this.each(function () {
            var i = e(this),
              n = i.data('bs.collapse'),
              o = s(s(s({}, I), i.data()), 'object' == typeof t && t ? t : {})
            if ((!n && o.toggle && 'string' == typeof t && /show|hide/.test(t) && (o.toggle = !1), n || ((n = new O(this, o)), i.data('bs.collapse', n)), 'string' == typeof t)) {
              if (void 0 === n[t]) throw new TypeError('No method named "' + t + '"')
              n[t]()
            }
          })
        }),
        o(O, null, [
          {
            key: 'VERSION',
            get: function () {
              return '4.5.0'
            }
          },
          {
            key: 'Default',
            get: function () {
              return I
            }
          }
        ]),
        O)
    function O(t, e) {
      ;(this._isTransitioning = !1),
        (this._element = t),
        (this._config = this._getConfig(e)),
        (this._triggerArray = [].slice.call(document.querySelectorAll('[data-toggle="collapse"][href="#' + t.id + '"],[data-toggle="collapse"][data-target="#' + t.id + '"]')))
      for (var i = [].slice.call(document.querySelectorAll('[data-toggle="collapse"]')), n = 0, o = i.length; n < o; n++) {
        var r = i[n],
          s = a.getSelectorFromElement(r),
          l = [].slice.call(document.querySelectorAll(s)).filter(function (e) {
            return e === t
          })
        null !== s && 0 < l.length && ((this._selector = s), this._triggerArray.push(r))
      }
      ;(this._parent = this._config.parent ? this._getParent() : null),
        this._config.parent || this._addAriaAndCollapsedClass(this._element, this._triggerArray),
        this._config.toggle && this.toggle()
    }
    e(document).on('click.bs.collapse.data-api', '[data-toggle="collapse"]', function (t) {
      'A' === t.currentTarget.tagName && t.preventDefault()
      var i = e(this),
        n = a.getSelectorFromElement(this),
        o = [].slice.call(document.querySelectorAll(n))
      e(o).each(function () {
        var t = e(this),
          n = t.data('bs.collapse') ? 'toggle' : i.data()
        D._jQueryInterface.call(t, n)
      })
    }),
      (e.fn[S] = D._jQueryInterface),
      (e.fn[S].Constructor = D),
      (e.fn[S].noConflict = function () {
        return (e.fn[S] = E), D._jQueryInterface
      })
    var M,
      P = 'dropdown',
      L = e.fn[P],
      z = new RegExp('38|40|27'),
      F = { offset: 0, flip: !0, boundary: 'scrollParent', reference: 'toggle', display: 'dynamic', popperConfig: null },
      N = { offset: '(number|string|function)', flip: 'boolean', boundary: '(string|element)', reference: '(string|element)', display: 'string', popperConfig: '(null|object)' },
      R =
        (((M = j.prototype).toggle = function () {
          var t
          this._element.disabled || e(this._element).hasClass('disabled') || ((t = e(this._menu).hasClass('show')), j._clearMenus(), t || this.show(!0))
        }),
        (M.show = function (t) {
          if ((void 0 === t && (t = !1), !(this._element.disabled || e(this._element).hasClass('disabled') || e(this._menu).hasClass('show')))) {
            var n = { relatedTarget: this._element },
              o = e.Event('show.bs.dropdown', n),
              r = j._getParentFromElement(this._element)
            if ((e(r).trigger(o), !o.isDefaultPrevented())) {
              if (!this._inNavbar && t) {
                if (void 0 === i) throw new TypeError("Bootstrap's dropdowns require Popper.js (https://popper.js.org/)")
                var s = this._element
                'parent' === this._config.reference
                  ? (s = r)
                  : a.isElement(this._config.reference) && ((s = this._config.reference), void 0 !== this._config.reference.jquery && (s = this._config.reference[0])),
                  'scrollParent' !== this._config.boundary && e(r).addClass('position-static'),
                  (this._popper = new i(s, this._menu, this._getPopperConfig()))
              }
              'ontouchstart' in document.documentElement && 0 === e(r).closest('.navbar-nav').length && e(document.body).children().on('mouseover', null, e.noop),
                this._element.focus(),
                this._element.setAttribute('aria-expanded', !0),
                e(this._menu).toggleClass('show'),
                e(r).toggleClass('show').trigger(e.Event('shown.bs.dropdown', n))
            }
          }
        }),
        (M.hide = function () {
          var t, i, n
          this._element.disabled ||
            e(this._element).hasClass('disabled') ||
            !e(this._menu).hasClass('show') ||
            ((t = { relatedTarget: this._element }),
            (i = e.Event('hide.bs.dropdown', t)),
            (n = j._getParentFromElement(this._element)),
            e(n).trigger(i),
            i.isDefaultPrevented() ||
              (this._popper && this._popper.destroy(), e(this._menu).toggleClass('show'), e(n).toggleClass('show').trigger(e.Event('hidden.bs.dropdown', t))))
        }),
        (M.dispose = function () {
          e.removeData(this._element, 'bs.dropdown'),
            e(this._element).off('.bs.dropdown'),
            (this._element = null),
            (this._menu = null) !== this._popper && (this._popper.destroy(), (this._popper = null))
        }),
        (M.update = function () {
          ;(this._inNavbar = this._detectNavbar()), null !== this._popper && this._popper.scheduleUpdate()
        }),
        (M._addEventListeners = function () {
          var t = this
          e(this._element).on('click.bs.dropdown', function (e) {
            e.preventDefault(), e.stopPropagation(), t.toggle()
          })
        }),
        (M._getConfig = function (t) {
          return (t = s(s(s({}, this.constructor.Default), e(this._element).data()), t)), a.typeCheckConfig(P, t, this.constructor.DefaultType), t
        }),
        (M._getMenuElement = function () {
          var t
          return this._menu || ((t = j._getParentFromElement(this._element)) && (this._menu = t.querySelector('.dropdown-menu'))), this._menu
        }),
        (M._getPlacement = function () {
          var t = e(this._element.parentNode),
            i = 'bottom-start'
          return (
            t.hasClass('dropup')
              ? (i = e(this._menu).hasClass('dropdown-menu-right') ? 'top-end' : 'top-start')
              : t.hasClass('dropright')
              ? (i = 'right-start')
              : t.hasClass('dropleft')
              ? (i = 'left-start')
              : e(this._menu).hasClass('dropdown-menu-right') && (i = 'bottom-end'),
            i
          )
        }),
        (M._detectNavbar = function () {
          return 0 < e(this._element).closest('.navbar').length
        }),
        (M._getOffset = function () {
          var t = this,
            e = {}
          return (
            'function' == typeof this._config.offset
              ? (e.fn = function (e) {
                  return (e.offsets = s(s({}, e.offsets), t._config.offset(e.offsets, t._element) || {})), e
                })
              : (e.offset = this._config.offset),
            e
          )
        }),
        (M._getPopperConfig = function () {
          var t = {
            placement: this._getPlacement(),
            modifiers: { offset: this._getOffset(), flip: { enabled: this._config.flip }, preventOverflow: { boundariesElement: this._config.boundary } }
          }
          return 'static' === this._config.display && (t.modifiers.applyStyle = { enabled: !1 }), s(s({}, t), this._config.popperConfig)
        }),
        (j._jQueryInterface = function (t) {
          return this.each(function () {
            var i = e(this).data('bs.dropdown')
            if ((i || ((i = new j(this, 'object' == typeof t ? t : null)), e(this).data('bs.dropdown', i)), 'string' == typeof t)) {
              if (void 0 === i[t]) throw new TypeError('No method named "' + t + '"')
              i[t]()
            }
          })
        }),
        (j._clearMenus = function (t) {
          if (!t || (3 !== t.which && ('keyup' !== t.type || 9 === t.which)))
            for (var i = [].slice.call(document.querySelectorAll('[data-toggle="dropdown"]')), n = 0, o = i.length; n < o; n++) {
              var r,
                s,
                a = j._getParentFromElement(i[n]),
                l = e(i[n]).data('bs.dropdown'),
                c = { relatedTarget: i[n] }
              t && 'click' === t.type && (c.clickEvent = t),
                l &&
                  ((r = l._menu),
                  !e(a).hasClass('show') ||
                    (t && (('click' === t.type && /input|textarea/i.test(t.target.tagName)) || ('keyup' === t.type && 9 === t.which)) && e.contains(a, t.target)) ||
                    ((s = e.Event('hide.bs.dropdown', c)),
                    e(a).trigger(s),
                    s.isDefaultPrevented() ||
                      ('ontouchstart' in document.documentElement && e(document.body).children().off('mouseover', null, e.noop),
                      i[n].setAttribute('aria-expanded', 'false'),
                      l._popper && l._popper.destroy(),
                      e(r).removeClass('show'),
                      e(a).removeClass('show').trigger(e.Event('hidden.bs.dropdown', c)))))
            }
        }),
        (j._getParentFromElement = function (t) {
          var e,
            i = a.getSelectorFromElement(t)
          return i && (e = document.querySelector(i)), e || t.parentNode
        }),
        (j._dataApiKeydownHandler = function (t) {
          if (
            !(/input|textarea/i.test(t.target.tagName)
              ? 32 === t.which || (27 !== t.which && ((40 !== t.which && 38 !== t.which) || e(t.target).closest('.dropdown-menu').length))
              : !z.test(t.which)) &&
            !this.disabled &&
            !e(this).hasClass('disabled')
          ) {
            var i = j._getParentFromElement(this),
              n = e(i).hasClass('show')
            if (n || 27 !== t.which) {
              if ((t.preventDefault(), t.stopPropagation(), !n || (n && (27 === t.which || 32 === t.which))))
                return 27 === t.which && e(i.querySelector('[data-toggle="dropdown"]')).trigger('focus'), void e(this).trigger('click')
              var o,
                r = [].slice.call(i.querySelectorAll('.dropdown-menu .dropdown-item:not(.disabled):not(:disabled)')).filter(function (t) {
                  return e(t).is(':visible')
                })
              0 !== r.length && ((o = r.indexOf(t.target)), 38 === t.which && 0 < o && o--, 40 === t.which && o < r.length - 1 && o++, o < 0 && (o = 0), r[o].focus())
            }
          }
        }),
        o(j, null, [
          {
            key: 'VERSION',
            get: function () {
              return '4.5.0'
            }
          },
          {
            key: 'Default',
            get: function () {
              return F
            }
          },
          {
            key: 'DefaultType',
            get: function () {
              return N
            }
          }
        ]),
        j)
    function j(t, e) {
      ;(this._element = t),
        (this._popper = null),
        (this._config = this._getConfig(e)),
        (this._menu = this._getMenuElement()),
        (this._inNavbar = this._detectNavbar()),
        this._addEventListeners()
    }
    e(document)
      .on('keydown.bs.dropdown.data-api', '[data-toggle="dropdown"]', R._dataApiKeydownHandler)
      .on('keydown.bs.dropdown.data-api', '.dropdown-menu', R._dataApiKeydownHandler)
      .on('click.bs.dropdown.data-api keyup.bs.dropdown.data-api', R._clearMenus)
      .on('click.bs.dropdown.data-api', '[data-toggle="dropdown"]', function (t) {
        t.preventDefault(), t.stopPropagation(), R._jQueryInterface.call(e(this), 'toggle')
      })
      .on('click.bs.dropdown.data-api', '.dropdown form', function (t) {
        t.stopPropagation()
      }),
      (e.fn[P] = R._jQueryInterface),
      (e.fn[P].Constructor = R),
      (e.fn[P].noConflict = function () {
        return (e.fn[P] = L), R._jQueryInterface
      })
    var $,
      B = e.fn.modal,
      W = { backdrop: !0, keyboard: !0, focus: !0, show: !0 },
      H = { backdrop: '(boolean|string)', keyboard: 'boolean', focus: 'boolean', show: 'boolean' },
      q =
        ((($ = V.prototype).toggle = function (t) {
          return this._isShown ? this.hide() : this.show(t)
        }),
        ($.show = function (t) {
          var i,
            n = this
          this._isShown ||
            this._isTransitioning ||
            (e(this._element).hasClass('fade') && (this._isTransitioning = !0),
            (i = e.Event('show.bs.modal', { relatedTarget: t })),
            e(this._element).trigger(i),
            this._isShown ||
              i.isDefaultPrevented() ||
              ((this._isShown = !0),
              this._checkScrollbar(),
              this._setScrollbar(),
              this._adjustDialog(),
              this._setEscapeEvent(),
              this._setResizeEvent(),
              e(this._element).on('click.dismiss.bs.modal', '[data-dismiss="modal"]', function (t) {
                return n.hide(t)
              }),
              e(this._dialog).on('mousedown.dismiss.bs.modal', function () {
                e(n._element).one('mouseup.dismiss.bs.modal', function (t) {
                  e(t.target).is(n._element) && (n._ignoreBackdropClick = !0)
                })
              }),
              this._showBackdrop(function () {
                return n._showElement(t)
              })))
        }),
        ($.hide = function (t) {
          var i,
            n,
            o,
            r = this
          t && t.preventDefault(),
            this._isShown &&
              !this._isTransitioning &&
              ((i = e.Event('hide.bs.modal')),
              e(this._element).trigger(i),
              this._isShown &&
                !i.isDefaultPrevented() &&
                ((this._isShown = !1),
                (n = e(this._element).hasClass('fade')) && (this._isTransitioning = !0),
                this._setEscapeEvent(),
                this._setResizeEvent(),
                e(document).off('focusin.bs.modal'),
                e(this._element).removeClass('show'),
                e(this._element).off('click.dismiss.bs.modal'),
                e(this._dialog).off('mousedown.dismiss.bs.modal'),
                n
                  ? ((o = a.getTransitionDurationFromElement(this._element)),
                    e(this._element)
                      .one(a.TRANSITION_END, function (t) {
                        return r._hideModal(t)
                      })
                      .emulateTransitionEnd(o))
                  : this._hideModal()))
        }),
        ($.dispose = function () {
          ;[window, this._element, this._dialog].forEach(function (t) {
            return e(t).off('.bs.modal')
          }),
            e(document).off('focusin.bs.modal'),
            e.removeData(this._element, 'bs.modal'),
            (this._config = null),
            (this._element = null),
            (this._dialog = null),
            (this._backdrop = null),
            (this._isShown = null),
            (this._isBodyOverflowing = null),
            (this._ignoreBackdropClick = null),
            (this._isTransitioning = null),
            (this._scrollbarWidth = null)
        }),
        ($.handleUpdate = function () {
          this._adjustDialog()
        }),
        ($._getConfig = function (t) {
          return (t = s(s({}, W), t)), a.typeCheckConfig('modal', t, H), t
        }),
        ($._triggerBackdropTransition = function () {
          var t = this
          if ('static' === this._config.backdrop) {
            var i = e.Event('hidePrevented.bs.modal')
            if ((e(this._element).trigger(i), i.defaultPrevented)) return
            this._element.classList.add('modal-static')
            var n = a.getTransitionDurationFromElement(this._element)
            e(this._element)
              .one(a.TRANSITION_END, function () {
                t._element.classList.remove('modal-static')
              })
              .emulateTransitionEnd(n),
              this._element.focus()
          } else this.hide()
        }),
        ($._showElement = function (t) {
          var i = this,
            n = e(this._element).hasClass('fade'),
            o = this._dialog ? this._dialog.querySelector('.modal-body') : null
          function r() {
            i._config.focus && i._element.focus(), (i._isTransitioning = !1), e(i._element).trigger(l)
          }
          ;(this._element.parentNode && this._element.parentNode.nodeType === Node.ELEMENT_NODE) || document.body.appendChild(this._element),
            (this._element.style.display = 'block'),
            this._element.removeAttribute('aria-hidden'),
            this._element.setAttribute('aria-modal', !0),
            e(this._dialog).hasClass('modal-dialog-scrollable') && o ? (o.scrollTop = 0) : (this._element.scrollTop = 0),
            n && a.reflow(this._element),
            e(this._element).addClass('show'),
            this._config.focus && this._enforceFocus()
          var s,
            l = e.Event('shown.bs.modal', { relatedTarget: t })
          n ? ((s = a.getTransitionDurationFromElement(this._dialog)), e(this._dialog).one(a.TRANSITION_END, r).emulateTransitionEnd(s)) : r()
        }),
        ($._enforceFocus = function () {
          var t = this
          e(document)
            .off('focusin.bs.modal')
            .on('focusin.bs.modal', function (i) {
              document !== i.target && t._element !== i.target && 0 === e(t._element).has(i.target).length && t._element.focus()
            })
        }),
        ($._setEscapeEvent = function () {
          var t = this
          this._isShown
            ? e(this._element).on('keydown.dismiss.bs.modal', function (e) {
                t._config.keyboard && 27 === e.which ? (e.preventDefault(), t.hide()) : t._config.keyboard || 27 !== e.which || t._triggerBackdropTransition()
              })
            : this._isShown || e(this._element).off('keydown.dismiss.bs.modal')
        }),
        ($._setResizeEvent = function () {
          var t = this
          this._isShown
            ? e(window).on('resize.bs.modal', function (e) {
                return t.handleUpdate(e)
              })
            : e(window).off('resize.bs.modal')
        }),
        ($._hideModal = function () {
          var t = this
          ;(this._element.style.display = 'none'),
            this._element.setAttribute('aria-hidden', !0),
            this._element.removeAttribute('aria-modal'),
            (this._isTransitioning = !1),
            this._showBackdrop(function () {
              e(document.body).removeClass('modal-open'), t._resetAdjustments(), t._resetScrollbar(), e(t._element).trigger('hidden.bs.modal')
            })
        }),
        ($._removeBackdrop = function () {
          this._backdrop && (e(this._backdrop).remove(), (this._backdrop = null))
        }),
        ($._showBackdrop = function (t) {
          var i,
            n,
            o = this,
            r = e(this._element).hasClass('fade') ? 'fade' : ''
          if (this._isShown && this._config.backdrop) {
            if (
              ((this._backdrop = document.createElement('div')),
              (this._backdrop.className = 'modal-backdrop'),
              r && this._backdrop.classList.add(r),
              e(this._backdrop).appendTo(document.body),
              e(this._element).on('click.dismiss.bs.modal', function (t) {
                o._ignoreBackdropClick ? (o._ignoreBackdropClick = !1) : t.target === t.currentTarget && o._triggerBackdropTransition()
              }),
              r && a.reflow(this._backdrop),
              e(this._backdrop).addClass('show'),
              !t)
            )
              return
            if (!r) return void t()
            var s = a.getTransitionDurationFromElement(this._backdrop)
            e(this._backdrop).one(a.TRANSITION_END, t).emulateTransitionEnd(s)
          } else
            !this._isShown && this._backdrop
              ? (e(this._backdrop).removeClass('show'),
                (i = function () {
                  o._removeBackdrop(), t && t()
                }),
                e(this._element).hasClass('fade')
                  ? ((n = a.getTransitionDurationFromElement(this._backdrop)), e(this._backdrop).one(a.TRANSITION_END, i).emulateTransitionEnd(n))
                  : i())
              : t && t()
        }),
        ($._adjustDialog = function () {
          var t = this._element.scrollHeight > document.documentElement.clientHeight
          !this._isBodyOverflowing && t && (this._element.style.paddingLeft = this._scrollbarWidth + 'px'),
            this._isBodyOverflowing && !t && (this._element.style.paddingRight = this._scrollbarWidth + 'px')
        }),
        ($._resetAdjustments = function () {
          ;(this._element.style.paddingLeft = ''), (this._element.style.paddingRight = '')
        }),
        ($._checkScrollbar = function () {
          var t = document.body.getBoundingClientRect()
          ;(this._isBodyOverflowing = Math.round(t.left + t.right) < window.innerWidth), (this._scrollbarWidth = this._getScrollbarWidth())
        }),
        ($._setScrollbar = function () {
          var t,
            i,
            n,
            o,
            r = this
          this._isBodyOverflowing &&
            ((t = [].slice.call(document.querySelectorAll('.fixed-top, .fixed-bottom, .is-fixed, .sticky-top'))),
            (i = [].slice.call(document.querySelectorAll('.sticky-top'))),
            e(t).each(function (t, i) {
              var n = i.style.paddingRight,
                o = e(i).css('padding-right')
              e(i)
                .data('padding-right', n)
                .css('padding-right', parseFloat(o) + r._scrollbarWidth + 'px')
            }),
            e(i).each(function (t, i) {
              var n = i.style.marginRight,
                o = e(i).css('margin-right')
              e(i)
                .data('margin-right', n)
                .css('margin-right', parseFloat(o) - r._scrollbarWidth + 'px')
            }),
            (n = document.body.style.paddingRight),
            (o = e(document.body).css('padding-right')),
            e(document.body)
              .data('padding-right', n)
              .css('padding-right', parseFloat(o) + this._scrollbarWidth + 'px')),
            e(document.body).addClass('modal-open')
        }),
        ($._resetScrollbar = function () {
          var t = [].slice.call(document.querySelectorAll('.fixed-top, .fixed-bottom, .is-fixed, .sticky-top'))
          e(t).each(function (t, i) {
            var n = e(i).data('padding-right')
            e(i).removeData('padding-right'), (i.style.paddingRight = n || '')
          })
          var i = [].slice.call(document.querySelectorAll('.sticky-top'))
          e(i).each(function (t, i) {
            var n = e(i).data('margin-right')
            void 0 !== n && e(i).css('margin-right', n).removeData('margin-right')
          })
          var n = e(document.body).data('padding-right')
          e(document.body).removeData('padding-right'), (document.body.style.paddingRight = n || '')
        }),
        ($._getScrollbarWidth = function () {
          var t = document.createElement('div')
          ;(t.className = 'modal-scrollbar-measure'), document.body.appendChild(t)
          var e = t.getBoundingClientRect().width - t.clientWidth
          return document.body.removeChild(t), e
        }),
        (V._jQueryInterface = function (t, i) {
          return this.each(function () {
            var n = e(this).data('bs.modal'),
              o = s(s(s({}, W), e(this).data()), 'object' == typeof t && t ? t : {})
            if ((n || ((n = new V(this, o)), e(this).data('bs.modal', n)), 'string' == typeof t)) {
              if (void 0 === n[t]) throw new TypeError('No method named "' + t + '"')
              n[t](i)
            } else o.show && n.show(i)
          })
        }),
        o(V, null, [
          {
            key: 'VERSION',
            get: function () {
              return '4.5.0'
            }
          },
          {
            key: 'Default',
            get: function () {
              return W
            }
          }
        ]),
        V)
    function V(t, e) {
      ;(this._config = this._getConfig(e)),
        (this._element = t),
        (this._dialog = t.querySelector('.modal-dialog')),
        (this._backdrop = null),
        (this._isShown = !1),
        (this._isBodyOverflowing = !1),
        (this._ignoreBackdropClick = !1),
        (this._isTransitioning = !1),
        (this._scrollbarWidth = 0)
    }
    e(document).on('click.bs.modal.data-api', '[data-toggle="modal"]', function (t) {
      var i,
        n = this,
        o = a.getSelectorFromElement(this)
      o && (i = document.querySelector(o))
      var r = e(i).data('bs.modal') ? 'toggle' : s(s({}, e(i).data()), e(this).data())
      ;('A' !== this.tagName && 'AREA' !== this.tagName) || t.preventDefault()
      var l = e(i).one('show.bs.modal', function (t) {
        t.isDefaultPrevented() ||
          l.one('hidden.bs.modal', function () {
            e(n).is(':visible') && n.focus()
          })
      })
      q._jQueryInterface.call(e(i), r, this)
    }),
      (e.fn.modal = q._jQueryInterface),
      (e.fn.modal.Constructor = q),
      (e.fn.modal.noConflict = function () {
        return (e.fn.modal = B), q._jQueryInterface
      })
    var U = ['background', 'cite', 'href', 'itemtype', 'longdesc', 'poster', 'src', 'xlink:href'],
      Y = /^(?:(?:https?|mailto|ftp|tel|file):|[^#&/:?]*(?:[#/?]|$))/gi,
      Q = /^data:(?:image\/(?:bmp|gif|jpeg|jpg|png|tiff|webp)|video\/(?:mpeg|mp4|ogg|webm)|audio\/(?:mp3|oga|ogg|opus));base64,[\d+/a-z]+=*$/i
    function G(t, e, i) {
      if (0 === t.length) return t
      if (i && 'function' == typeof i) return i(t)
      for (
        var n = new window.DOMParser().parseFromString(t, 'text/html'),
          o = Object.keys(e),
          r = [].slice.call(n.body.querySelectorAll('*')),
          s = function (t, i) {
            var n = r[t],
              s = n.nodeName.toLowerCase()
            if (-1 === o.indexOf(n.nodeName.toLowerCase())) return n.parentNode.removeChild(n), 'continue'
            var a = [].slice.call(n.attributes),
              l = [].concat(e['*'] || [], e[s] || [])
            a.forEach(function (t) {
              !(function (t, e) {
                var i = t.nodeName.toLowerCase()
                if (-1 !== e.indexOf(i)) return -1 === U.indexOf(i) || Boolean(t.nodeValue.match(Y) || t.nodeValue.match(Q))
                for (
                  var n = e.filter(function (t) {
                      return t instanceof RegExp
                    }),
                    o = 0,
                    r = n.length;
                  o < r;
                  o++
                )
                  if (i.match(n[o])) return 1
              })(t, l) && n.removeAttribute(t.nodeName)
            })
          },
          a = 0,
          l = r.length;
        a < l;
        a++
      )
        s(a)
      return n.body.innerHTML
    }
    var X,
      K = 'tooltip',
      Z = e.fn[K],
      J = new RegExp('(^|\\s)bs-tooltip\\S+', 'g'),
      tt = ['sanitize', 'whiteList', 'sanitizeFn'],
      et = {
        animation: 'boolean',
        template: 'string',
        title: '(string|element|function)',
        trigger: 'string',
        delay: '(number|object)',
        html: 'boolean',
        selector: '(string|boolean)',
        placement: '(string|function)',
        offset: '(number|string|function)',
        container: '(string|element|boolean)',
        fallbackPlacement: '(string|array)',
        boundary: '(string|element)',
        sanitize: 'boolean',
        sanitizeFn: '(null|function)',
        whiteList: 'object',
        popperConfig: '(null|object)'
      },
      it = { AUTO: 'auto', TOP: 'top', RIGHT: 'right', BOTTOM: 'bottom', LEFT: 'left' },
      nt = {
        animation: !0,
        template: '<div class="tooltip" role="tooltip"><div class="arrow"></div><div class="tooltip-inner"></div></div>',
        trigger: 'hover focus',
        title: '',
        delay: 0,
        html: !1,
        selector: !1,
        placement: 'top',
        offset: 0,
        container: !1,
        fallbackPlacement: 'flip',
        boundary: 'scrollParent',
        sanitize: !0,
        sanitizeFn: null,
        whiteList: {
          '*': ['class', 'dir', 'id', 'lang', 'role', /^aria-[\w-]*$/i],
          a: ['target', 'href', 'title', 'rel'],
          area: [],
          b: [],
          br: [],
          col: [],
          code: [],
          div: [],
          em: [],
          hr: [],
          h1: [],
          h2: [],
          h3: [],
          h4: [],
          h5: [],
          h6: [],
          i: [],
          img: ['src', 'srcset', 'alt', 'title', 'width', 'height'],
          li: [],
          ol: [],
          p: [],
          pre: [],
          s: [],
          small: [],
          span: [],
          sub: [],
          sup: [],
          strong: [],
          u: [],
          ul: []
        },
        popperConfig: null
      },
      ot = {
        HIDE: 'hide.bs.tooltip',
        HIDDEN: 'hidden.bs.tooltip',
        SHOW: 'show.bs.tooltip',
        SHOWN: 'shown.bs.tooltip',
        INSERTED: 'inserted.bs.tooltip',
        CLICK: 'click.bs.tooltip',
        FOCUSIN: 'focusin.bs.tooltip',
        FOCUSOUT: 'focusout.bs.tooltip',
        MOUSEENTER: 'mouseenter.bs.tooltip',
        MOUSELEAVE: 'mouseleave.bs.tooltip'
      },
      rt =
        (((X = st.prototype).enable = function () {
          this._isEnabled = !0
        }),
        (X.disable = function () {
          this._isEnabled = !1
        }),
        (X.toggleEnabled = function () {
          this._isEnabled = !this._isEnabled
        }),
        (X.toggle = function (t) {
          if (this._isEnabled)
            if (t) {
              var i = this.constructor.DATA_KEY,
                n = e(t.currentTarget).data(i)
              n || ((n = new this.constructor(t.currentTarget, this._getDelegateConfig())), e(t.currentTarget).data(i, n)),
                (n._activeTrigger.click = !n._activeTrigger.click),
                n._isWithActiveTrigger() ? n._enter(null, n) : n._leave(null, n)
            } else {
              if (e(this.getTipElement()).hasClass('show')) return void this._leave(null, this)
              this._enter(null, this)
            }
        }),
        (X.dispose = function () {
          clearTimeout(this._timeout),
            e.removeData(this.element, this.constructor.DATA_KEY),
            e(this.element).off(this.constructor.EVENT_KEY),
            e(this.element).closest('.modal').off('hide.bs.modal', this._hideModalHandler),
            this.tip && e(this.tip).remove(),
            (this._isEnabled = null),
            (this._timeout = null),
            (this._hoverState = null),
            (this._activeTrigger = null),
            this._popper && this._popper.destroy(),
            (this._popper = null),
            (this.element = null),
            (this.config = null),
            (this.tip = null)
        }),
        (X.show = function () {
          var t = this
          if ('none' === e(this.element).css('display')) throw new Error('Please use show on visible elements')
          var n = e.Event(this.constructor.Event.SHOW)
          if (this.isWithContent() && this._isEnabled) {
            e(this.element).trigger(n)
            var o = a.findShadowRoot(this.element),
              r = e.contains(null !== o ? o : this.element.ownerDocument.documentElement, this.element)
            if (n.isDefaultPrevented() || !r) return
            var s = this.getTipElement(),
              l = a.getUID(this.constructor.NAME)
            s.setAttribute('id', l), this.element.setAttribute('aria-describedby', l), this.setContent(), this.config.animation && e(s).addClass('fade')
            var c = 'function' == typeof this.config.placement ? this.config.placement.call(this, s, this.element) : this.config.placement,
              u = this._getAttachment(c)
            this.addAttachmentClass(u)
            var d = this._getContainer()
            e(s).data(this.constructor.DATA_KEY, this),
              e.contains(this.element.ownerDocument.documentElement, this.tip) || e(s).appendTo(d),
              e(this.element).trigger(this.constructor.Event.INSERTED),
              (this._popper = new i(this.element, s, this._getPopperConfig(u))),
              e(s).addClass('show'),
              'ontouchstart' in document.documentElement && e(document.body).children().on('mouseover', null, e.noop)
            var h,
              f = function () {
                t.config.animation && t._fixTransition()
                var i = t._hoverState
                ;(t._hoverState = null), e(t.element).trigger(t.constructor.Event.SHOWN), 'out' === i && t._leave(null, t)
              }
            e(this.tip).hasClass('fade') ? ((h = a.getTransitionDurationFromElement(this.tip)), e(this.tip).one(a.TRANSITION_END, f).emulateTransitionEnd(h)) : f()
          }
        }),
        (X.hide = function (t) {
          function i() {
            'show' !== o._hoverState && r.parentNode && r.parentNode.removeChild(r),
              o._cleanTipClass(),
              o.element.removeAttribute('aria-describedby'),
              e(o.element).trigger(o.constructor.Event.HIDDEN),
              null !== o._popper && o._popper.destroy(),
              t && t()
          }
          var n,
            o = this,
            r = this.getTipElement(),
            s = e.Event(this.constructor.Event.HIDE)
          e(this.element).trigger(s),
            s.isDefaultPrevented() ||
              (e(r).removeClass('show'),
              'ontouchstart' in document.documentElement && e(document.body).children().off('mouseover', null, e.noop),
              (this._activeTrigger.click = !1),
              (this._activeTrigger.focus = !1),
              (this._activeTrigger.hover = !1),
              e(this.tip).hasClass('fade') ? ((n = a.getTransitionDurationFromElement(r)), e(r).one(a.TRANSITION_END, i).emulateTransitionEnd(n)) : i(),
              (this._hoverState = ''))
        }),
        (X.update = function () {
          null !== this._popper && this._popper.scheduleUpdate()
        }),
        (X.isWithContent = function () {
          return Boolean(this.getTitle())
        }),
        (X.addAttachmentClass = function (t) {
          e(this.getTipElement()).addClass('bs-tooltip-' + t)
        }),
        (X.getTipElement = function () {
          return (this.tip = this.tip || e(this.config.template)[0]), this.tip
        }),
        (X.setContent = function () {
          var t = this.getTipElement()
          this.setElementContent(e(t.querySelectorAll('.tooltip-inner')), this.getTitle()), e(t).removeClass('fade show')
        }),
        (X.setElementContent = function (t, i) {
          'object' != typeof i || (!i.nodeType && !i.jquery)
            ? this.config.html
              ? (this.config.sanitize && (i = G(i, this.config.whiteList, this.config.sanitizeFn)), t.html(i))
              : t.text(i)
            : this.config.html
            ? e(i).parent().is(t) || t.empty().append(i)
            : t.text(e(i).text())
        }),
        (X.getTitle = function () {
          return this.element.getAttribute('data-original-title') || ('function' == typeof this.config.title ? this.config.title.call(this.element) : this.config.title)
        }),
        (X._getPopperConfig = function (t) {
          var e = this
          return s(
            s(
              {},
              {
                placement: t,
                modifiers: {
                  offset: this._getOffset(),
                  flip: { behavior: this.config.fallbackPlacement },
                  arrow: { element: '.arrow' },
                  preventOverflow: { boundariesElement: this.config.boundary }
                },
                onCreate: function (t) {
                  t.originalPlacement !== t.placement && e._handlePopperPlacementChange(t)
                },
                onUpdate: function (t) {
                  return e._handlePopperPlacementChange(t)
                }
              }
            ),
            this.config.popperConfig
          )
        }),
        (X._getOffset = function () {
          var t = this,
            e = {}
          return (
            'function' == typeof this.config.offset
              ? (e.fn = function (e) {
                  return (e.offsets = s(s({}, e.offsets), t.config.offset(e.offsets, t.element) || {})), e
                })
              : (e.offset = this.config.offset),
            e
          )
        }),
        (X._getContainer = function () {
          return !1 === this.config.container ? document.body : a.isElement(this.config.container) ? e(this.config.container) : e(document).find(this.config.container)
        }),
        (X._getAttachment = function (t) {
          return it[t.toUpperCase()]
        }),
        (X._setListeners = function () {
          var t = this
          this.config.trigger.split(' ').forEach(function (i) {
            var n, o
            'click' === i
              ? e(t.element).on(t.constructor.Event.CLICK, t.config.selector, function (e) {
                  return t.toggle(e)
                })
              : 'manual' !== i &&
                ((n = 'hover' === i ? t.constructor.Event.MOUSEENTER : t.constructor.Event.FOCUSIN),
                (o = 'hover' === i ? t.constructor.Event.MOUSELEAVE : t.constructor.Event.FOCUSOUT),
                e(t.element)
                  .on(n, t.config.selector, function (e) {
                    return t._enter(e)
                  })
                  .on(o, t.config.selector, function (e) {
                    return t._leave(e)
                  }))
          }),
            (this._hideModalHandler = function () {
              t.element && t.hide()
            }),
            e(this.element).closest('.modal').on('hide.bs.modal', this._hideModalHandler),
            this.config.selector ? (this.config = s(s({}, this.config), {}, { trigger: 'manual', selector: '' })) : this._fixTitle()
        }),
        (X._fixTitle = function () {
          var t = typeof this.element.getAttribute('data-original-title')
          ;(!this.element.getAttribute('title') && 'string' == t) ||
            (this.element.setAttribute('data-original-title', this.element.getAttribute('title') || ''), this.element.setAttribute('title', ''))
        }),
        (X._enter = function (t, i) {
          var n = this.constructor.DATA_KEY
          ;(i = i || e(t.currentTarget).data(n)) || ((i = new this.constructor(t.currentTarget, this._getDelegateConfig())), e(t.currentTarget).data(n, i)),
            t && (i._activeTrigger['focusin' === t.type ? 'focus' : 'hover'] = !0),
            e(i.getTipElement()).hasClass('show') || 'show' === i._hoverState
              ? (i._hoverState = 'show')
              : (clearTimeout(i._timeout),
                (i._hoverState = 'show'),
                i.config.delay && i.config.delay.show
                  ? (i._timeout = setTimeout(function () {
                      'show' === i._hoverState && i.show()
                    }, i.config.delay.show))
                  : i.show())
        }),
        (X._leave = function (t, i) {
          var n = this.constructor.DATA_KEY
          ;(i = i || e(t.currentTarget).data(n)) || ((i = new this.constructor(t.currentTarget, this._getDelegateConfig())), e(t.currentTarget).data(n, i)),
            t && (i._activeTrigger['focusout' === t.type ? 'focus' : 'hover'] = !1),
            i._isWithActiveTrigger() ||
              (clearTimeout(i._timeout),
              (i._hoverState = 'out'),
              i.config.delay && i.config.delay.hide
                ? (i._timeout = setTimeout(function () {
                    'out' === i._hoverState && i.hide()
                  }, i.config.delay.hide))
                : i.hide())
        }),
        (X._isWithActiveTrigger = function () {
          for (var t in this._activeTrigger) if (this._activeTrigger[t]) return !0
          return !1
        }),
        (X._getConfig = function (t) {
          var i = e(this.element).data()
          return (
            Object.keys(i).forEach(function (t) {
              ;-1 !== tt.indexOf(t) && delete i[t]
            }),
            'number' == typeof (t = s(s(s({}, this.constructor.Default), i), 'object' == typeof t && t ? t : {})).delay && (t.delay = { show: t.delay, hide: t.delay }),
            'number' == typeof t.title && (t.title = t.title.toString()),
            'number' == typeof t.content && (t.content = t.content.toString()),
            a.typeCheckConfig(K, t, this.constructor.DefaultType),
            t.sanitize && (t.template = G(t.template, t.whiteList, t.sanitizeFn)),
            t
          )
        }),
        (X._getDelegateConfig = function () {
          var t = {}
          if (this.config) for (var e in this.config) this.constructor.Default[e] !== this.config[e] && (t[e] = this.config[e])
          return t
        }),
        (X._cleanTipClass = function () {
          var t = e(this.getTipElement()),
            i = t.attr('class').match(J)
          null !== i && i.length && t.removeClass(i.join(''))
        }),
        (X._handlePopperPlacementChange = function (t) {
          ;(this.tip = t.instance.popper), this._cleanTipClass(), this.addAttachmentClass(this._getAttachment(t.placement))
        }),
        (X._fixTransition = function () {
          var t = this.getTipElement(),
            i = this.config.animation
          null === t.getAttribute('x-placement') && (e(t).removeClass('fade'), (this.config.animation = !1), this.hide(), this.show(), (this.config.animation = i))
        }),
        (st._jQueryInterface = function (t) {
          return this.each(function () {
            var i = e(this).data('bs.tooltip'),
              n = 'object' == typeof t && t
            if ((i || !/dispose|hide/.test(t)) && (i || ((i = new st(this, n)), e(this).data('bs.tooltip', i)), 'string' == typeof t)) {
              if (void 0 === i[t]) throw new TypeError('No method named "' + t + '"')
              i[t]()
            }
          })
        }),
        o(st, null, [
          {
            key: 'VERSION',
            get: function () {
              return '4.5.0'
            }
          },
          {
            key: 'Default',
            get: function () {
              return nt
            }
          },
          {
            key: 'NAME',
            get: function () {
              return K
            }
          },
          {
            key: 'DATA_KEY',
            get: function () {
              return 'bs.tooltip'
            }
          },
          {
            key: 'Event',
            get: function () {
              return ot
            }
          },
          {
            key: 'EVENT_KEY',
            get: function () {
              return '.bs.tooltip'
            }
          },
          {
            key: 'DefaultType',
            get: function () {
              return et
            }
          }
        ]),
        st)
    function st(t, e) {
      if (void 0 === i) throw new TypeError("Bootstrap's tooltips require Popper.js (https://popper.js.org/)")
      ;(this._isEnabled = !0),
        (this._timeout = 0),
        (this._hoverState = ''),
        (this._activeTrigger = {}),
        (this._popper = null),
        (this.element = t),
        (this.config = this._getConfig(e)),
        (this.tip = null),
        this._setListeners()
    }
    ;(e.fn[K] = rt._jQueryInterface),
      (e.fn[K].Constructor = rt),
      (e.fn[K].noConflict = function () {
        return (e.fn[K] = Z), rt._jQueryInterface
      })
    var at = 'popover',
      lt = e.fn[at],
      ct = new RegExp('(^|\\s)bs-popover\\S+', 'g'),
      ut = s(
        s({}, rt.Default),
        {},
        {
          placement: 'right',
          trigger: 'click',
          content: '',
          template: '<div class="popover" role="tooltip"><div class="arrow"></div><h3 class="popover-header"></h3><div class="popover-body"></div></div>'
        }
      ),
      dt = s(s({}, rt.DefaultType), {}, { content: '(string|element|function)' }),
      ht = {
        HIDE: 'hide.bs.popover',
        HIDDEN: 'hidden.bs.popover',
        SHOW: 'show.bs.popover',
        SHOWN: 'shown.bs.popover',
        INSERTED: 'inserted.bs.popover',
        CLICK: 'click.bs.popover',
        FOCUSIN: 'focusin.bs.popover',
        FOCUSOUT: 'focusout.bs.popover',
        MOUSEENTER: 'mouseenter.bs.popover',
        MOUSELEAVE: 'mouseleave.bs.popover'
      },
      ft = (function (t) {
        var i, n
        function r() {
          return t.apply(this, arguments) || this
        }
        ;(n = t), ((i = r).prototype = Object.create(n.prototype)), ((i.prototype.constructor = i).__proto__ = n)
        var s = r.prototype
        return (
          (s.isWithContent = function () {
            return this.getTitle() || this._getContent()
          }),
          (s.addAttachmentClass = function (t) {
            e(this.getTipElement()).addClass('bs-popover-' + t)
          }),
          (s.getTipElement = function () {
            return (this.tip = this.tip || e(this.config.template)[0]), this.tip
          }),
          (s.setContent = function () {
            var t = e(this.getTipElement())
            this.setElementContent(t.find('.popover-header'), this.getTitle())
            var i = this._getContent()
            'function' == typeof i && (i = i.call(this.element)), this.setElementContent(t.find('.popover-body'), i), t.removeClass('fade show')
          }),
          (s._getContent = function () {
            return this.element.getAttribute('data-content') || this.config.content
          }),
          (s._cleanTipClass = function () {
            var t = e(this.getTipElement()),
              i = t.attr('class').match(ct)
            null !== i && 0 < i.length && t.removeClass(i.join(''))
          }),
          (r._jQueryInterface = function (t) {
            return this.each(function () {
              var i = e(this).data('bs.popover'),
                n = 'object' == typeof t ? t : null
              if ((i || !/dispose|hide/.test(t)) && (i || ((i = new r(this, n)), e(this).data('bs.popover', i)), 'string' == typeof t)) {
                if (void 0 === i[t]) throw new TypeError('No method named "' + t + '"')
                i[t]()
              }
            })
          }),
          o(r, null, [
            {
              key: 'VERSION',
              get: function () {
                return '4.5.0'
              }
            },
            {
              key: 'Default',
              get: function () {
                return ut
              }
            },
            {
              key: 'NAME',
              get: function () {
                return at
              }
            },
            {
              key: 'DATA_KEY',
              get: function () {
                return 'bs.popover'
              }
            },
            {
              key: 'Event',
              get: function () {
                return ht
              }
            },
            {
              key: 'EVENT_KEY',
              get: function () {
                return '.bs.popover'
              }
            },
            {
              key: 'DefaultType',
              get: function () {
                return dt
              }
            }
          ]),
          r
        )
      })(rt)
    ;(e.fn[at] = ft._jQueryInterface),
      (e.fn[at].Constructor = ft),
      (e.fn[at].noConflict = function () {
        return (e.fn[at] = lt), ft._jQueryInterface
      })
    var pt,
      gt = 'scrollspy',
      mt = e.fn[gt],
      vt = { offset: 10, method: 'auto', target: '' },
      yt = { offset: 'number', method: 'string', target: '(string|element)' },
      bt =
        (((pt = _t.prototype).refresh = function () {
          var t = this,
            i = this._scrollElement === this._scrollElement.window ? 'offset' : 'position',
            n = 'auto' === this._config.method ? i : this._config.method,
            o = 'position' === n ? this._getScrollTop() : 0
          ;(this._offsets = []),
            (this._targets = []),
            (this._scrollHeight = this._getScrollHeight()),
            [].slice
              .call(document.querySelectorAll(this._selector))
              .map(function (t) {
                var i,
                  r = a.getSelectorFromElement(t)
                if ((r && (i = document.querySelector(r)), i)) {
                  var s = i.getBoundingClientRect()
                  if (s.width || s.height) return [e(i)[n]().top + o, r]
                }
                return null
              })
              .filter(function (t) {
                return t
              })
              .sort(function (t, e) {
                return t[0] - e[0]
              })
              .forEach(function (e) {
                t._offsets.push(e[0]), t._targets.push(e[1])
              })
        }),
        (pt.dispose = function () {
          e.removeData(this._element, 'bs.scrollspy'),
            e(this._scrollElement).off('.bs.scrollspy'),
            (this._element = null),
            (this._scrollElement = null),
            (this._config = null),
            (this._selector = null),
            (this._offsets = null),
            (this._targets = null),
            (this._activeTarget = null),
            (this._scrollHeight = null)
        }),
        (pt._getConfig = function (t) {
          var i
          return (
            'string' != typeof (t = s(s({}, vt), 'object' == typeof t && t ? t : {})).target &&
              a.isElement(t.target) &&
              ((i = e(t.target).attr('id')) || ((i = a.getUID(gt)), e(t.target).attr('id', i)), (t.target = '#' + i)),
            a.typeCheckConfig(gt, t, yt),
            t
          )
        }),
        (pt._getScrollTop = function () {
          return this._scrollElement === window ? this._scrollElement.pageYOffset : this._scrollElement.scrollTop
        }),
        (pt._getScrollHeight = function () {
          return this._scrollElement.scrollHeight || Math.max(document.body.scrollHeight, document.documentElement.scrollHeight)
        }),
        (pt._getOffsetHeight = function () {
          return this._scrollElement === window ? window.innerHeight : this._scrollElement.getBoundingClientRect().height
        }),
        (pt._process = function () {
          var t = this._getScrollTop() + this._config.offset,
            e = this._getScrollHeight(),
            i = this._config.offset + e - this._getOffsetHeight()
          if ((this._scrollHeight !== e && this.refresh(), i <= t)) {
            var n = this._targets[this._targets.length - 1]
            this._activeTarget !== n && this._activate(n)
          } else {
            if (this._activeTarget && t < this._offsets[0] && 0 < this._offsets[0]) return (this._activeTarget = null), void this._clear()
            for (var o = this._offsets.length; o--; )
              this._activeTarget !== this._targets[o] && t >= this._offsets[o] && (void 0 === this._offsets[o + 1] || t < this._offsets[o + 1]) && this._activate(this._targets[o])
          }
        }),
        (pt._activate = function (t) {
          ;(this._activeTarget = t), this._clear()
          var i = this._selector.split(',').map(function (e) {
              return e + '[data-target="' + t + '"],' + e + '[href="' + t + '"]'
            }),
            n = e([].slice.call(document.querySelectorAll(i.join(','))))
          n.hasClass('dropdown-item')
            ? (n.closest('.dropdown').find('.dropdown-toggle').addClass('active'), n.addClass('active'))
            : (n.addClass('active'),
              n.parents('.nav, .list-group').prev('.nav-link, .list-group-item').addClass('active'),
              n.parents('.nav, .list-group').prev('.nav-item').children('.nav-link').addClass('active')),
            e(this._scrollElement).trigger('activate.bs.scrollspy', { relatedTarget: t })
        }),
        (pt._clear = function () {
          ;[].slice
            .call(document.querySelectorAll(this._selector))
            .filter(function (t) {
              return t.classList.contains('active')
            })
            .forEach(function (t) {
              return t.classList.remove('active')
            })
        }),
        (_t._jQueryInterface = function (t) {
          return this.each(function () {
            var i = e(this).data('bs.scrollspy')
            if ((i || ((i = new _t(this, 'object' == typeof t && t)), e(this).data('bs.scrollspy', i)), 'string' == typeof t)) {
              if (void 0 === i[t]) throw new TypeError('No method named "' + t + '"')
              i[t]()
            }
          })
        }),
        o(_t, null, [
          {
            key: 'VERSION',
            get: function () {
              return '4.5.0'
            }
          },
          {
            key: 'Default',
            get: function () {
              return vt
            }
          }
        ]),
        _t)
    function _t(t, i) {
      var n = this
      ;(this._element = t),
        (this._scrollElement = 'BODY' === t.tagName ? window : t),
        (this._config = this._getConfig(i)),
        (this._selector = this._config.target + ' .nav-link,' + this._config.target + ' .list-group-item,' + this._config.target + ' .dropdown-item'),
        (this._offsets = []),
        (this._targets = []),
        (this._activeTarget = null),
        (this._scrollHeight = 0),
        e(this._scrollElement).on('scroll.bs.scrollspy', function (t) {
          return n._process(t)
        }),
        this.refresh(),
        this._process()
    }
    e(window).on('load.bs.scrollspy.data-api', function () {
      for (var t = [].slice.call(document.querySelectorAll('[data-spy="scroll"]')), i = t.length; i--; ) {
        var n = e(t[i])
        bt._jQueryInterface.call(n, n.data())
      }
    }),
      (e.fn[gt] = bt._jQueryInterface),
      (e.fn[gt].Constructor = bt),
      (e.fn[gt].noConflict = function () {
        return (e.fn[gt] = mt), bt._jQueryInterface
      })
    var wt,
      xt = e.fn.tab,
      Ct =
        (((wt = kt.prototype).show = function () {
          var t,
            i,
            n,
            o,
            r,
            s,
            l,
            c,
            u = this
          ;(this._element.parentNode && this._element.parentNode.nodeType === Node.ELEMENT_NODE && e(this._element).hasClass('active')) ||
            e(this._element).hasClass('disabled') ||
            ((i = e(this._element).closest('.nav, .list-group')[0]),
            (n = a.getSelectorFromElement(this._element)),
            i && ((o = 'UL' === i.nodeName || 'OL' === i.nodeName ? '> li > .active' : '.active'), (r = (r = e.makeArray(e(i).find(o)))[r.length - 1])),
            (s = e.Event('hide.bs.tab', { relatedTarget: this._element })),
            (l = e.Event('show.bs.tab', { relatedTarget: r })),
            r && e(r).trigger(s),
            e(this._element).trigger(l),
            l.isDefaultPrevented() ||
              s.isDefaultPrevented() ||
              (n && (t = document.querySelector(n)),
              this._activate(this._element, i),
              (c = function () {
                var t = e.Event('hidden.bs.tab', { relatedTarget: u._element }),
                  i = e.Event('shown.bs.tab', { relatedTarget: r })
                e(r).trigger(t), e(u._element).trigger(i)
              }),
              t ? this._activate(t, t.parentNode, c) : c()))
        }),
        (wt.dispose = function () {
          e.removeData(this._element, 'bs.tab'), (this._element = null)
        }),
        (wt._activate = function (t, i, n) {
          function o() {
            return s._transitionComplete(t, l, n)
          }
          var r,
            s = this,
            l = (!i || ('UL' !== i.nodeName && 'OL' !== i.nodeName) ? e(i).children('.active') : e(i).find('> li > .active'))[0],
            c = n && l && e(l).hasClass('fade')
          l && c ? ((r = a.getTransitionDurationFromElement(l)), e(l).removeClass('show').one(a.TRANSITION_END, o).emulateTransitionEnd(r)) : o()
        }),
        (wt._transitionComplete = function (t, i, n) {
          var o, r, s
          i &&
            (e(i).removeClass('active'),
            (o = e(i.parentNode).find('> .dropdown-menu .active')[0]) && e(o).removeClass('active'),
            'tab' === i.getAttribute('role') && i.setAttribute('aria-selected', !1)),
            e(t).addClass('active'),
            'tab' === t.getAttribute('role') && t.setAttribute('aria-selected', !0),
            a.reflow(t),
            t.classList.contains('fade') && t.classList.add('show'),
            t.parentNode &&
              e(t.parentNode).hasClass('dropdown-menu') &&
              ((r = e(t).closest('.dropdown')[0]) && ((s = [].slice.call(r.querySelectorAll('.dropdown-toggle'))), e(s).addClass('active')), t.setAttribute('aria-expanded', !0)),
            n && n()
        }),
        (kt._jQueryInterface = function (t) {
          return this.each(function () {
            var i = e(this),
              n = i.data('bs.tab')
            if ((n || ((n = new kt(this)), i.data('bs.tab', n)), 'string' == typeof t)) {
              if (void 0 === n[t]) throw new TypeError('No method named "' + t + '"')
              n[t]()
            }
          })
        }),
        o(kt, null, [
          {
            key: 'VERSION',
            get: function () {
              return '4.5.0'
            }
          }
        ]),
        kt)
    function kt(t) {
      this._element = t
    }
    e(document).on('click.bs.tab.data-api', '[data-toggle="tab"], [data-toggle="pill"], [data-toggle="list"]', function (t) {
      t.preventDefault(), Ct._jQueryInterface.call(e(this), 'show')
    }),
      (e.fn.tab = Ct._jQueryInterface),
      (e.fn.tab.Constructor = Ct),
      (e.fn.tab.noConflict = function () {
        return (e.fn.tab = xt), Ct._jQueryInterface
      })
    var Tt,
      St = e.fn.toast,
      Et = { animation: 'boolean', autohide: 'boolean', delay: 'number' },
      It = { animation: !0, autohide: !0, delay: 500 },
      At =
        (((Tt = Dt.prototype).show = function () {
          var t,
            i,
            n = this,
            o = e.Event('show.bs.toast')
          e(this._element).trigger(o),
            o.isDefaultPrevented() ||
              (this._config.animation && this._element.classList.add('fade'),
              (t = function () {
                n._element.classList.remove('showing'),
                  n._element.classList.add('show'),
                  e(n._element).trigger('shown.bs.toast'),
                  n._config.autohide &&
                    (n._timeout = setTimeout(function () {
                      n.hide()
                    }, n._config.delay))
              }),
              this._element.classList.remove('hide'),
              a.reflow(this._element),
              this._element.classList.add('showing'),
              this._config.animation ? ((i = a.getTransitionDurationFromElement(this._element)), e(this._element).one(a.TRANSITION_END, t).emulateTransitionEnd(i)) : t())
        }),
        (Tt.hide = function () {
          var t
          this._element.classList.contains('show') && ((t = e.Event('hide.bs.toast')), e(this._element).trigger(t), t.isDefaultPrevented() || this._close())
        }),
        (Tt.dispose = function () {
          clearTimeout(this._timeout),
            (this._timeout = null),
            this._element.classList.contains('show') && this._element.classList.remove('show'),
            e(this._element).off('click.dismiss.bs.toast'),
            e.removeData(this._element, 'bs.toast'),
            (this._element = null),
            (this._config = null)
        }),
        (Tt._getConfig = function (t) {
          return (t = s(s(s({}, It), e(this._element).data()), 'object' == typeof t && t ? t : {})), a.typeCheckConfig('toast', t, this.constructor.DefaultType), t
        }),
        (Tt._setListeners = function () {
          var t = this
          e(this._element).on('click.dismiss.bs.toast', '[data-dismiss="toast"]', function () {
            return t.hide()
          })
        }),
        (Tt._close = function () {
          function t() {
            n._element.classList.add('hide'), e(n._element).trigger('hidden.bs.toast')
          }
          var i,
            n = this
          this._element.classList.remove('show'),
            this._config.animation ? ((i = a.getTransitionDurationFromElement(this._element)), e(this._element).one(a.TRANSITION_END, t).emulateTransitionEnd(i)) : t()
        }),
        (Dt._jQueryInterface = function (t) {
          return this.each(function () {
            var i = e(this),
              n = i.data('bs.toast')
            if ((n || ((n = new Dt(this, 'object' == typeof t && t)), i.data('bs.toast', n)), 'string' == typeof t)) {
              if (void 0 === n[t]) throw new TypeError('No method named "' + t + '"')
              n[t](this)
            }
          })
        }),
        o(Dt, null, [
          {
            key: 'VERSION',
            get: function () {
              return '4.5.0'
            }
          },
          {
            key: 'DefaultType',
            get: function () {
              return Et
            }
          },
          {
            key: 'Default',
            get: function () {
              return It
            }
          }
        ]),
        Dt)
    function Dt(t, e) {
      ;(this._element = t), (this._config = this._getConfig(e)), (this._timeout = null), this._setListeners()
    }
    ;(e.fn.toast = At._jQueryInterface),
      (e.fn.toast.Constructor = At),
      (e.fn.toast.noConflict = function () {
        return (e.fn.toast = St), At._jQueryInterface
      }),
      (t.Alert = d),
      (t.Button = g),
      (t.Carousel = C),
      (t.Collapse = D),
      (t.Dropdown = R),
      (t.Modal = q),
      (t.Popover = ft),
      (t.Scrollspy = bt),
      (t.Tab = Ct),
      (t.Toast = At),
      (t.Tooltip = rt),
      (t.Util = a),
      Object.defineProperty(t, '__esModule', { value: !0 })
  }),
  (function (t) {
    'use strict'
    ;(t.fn.menumaker = function (e) {
      var i = t(this),
        n = t.extend({ format: 'dropdown', sticky: !1 }, e)
      return this.each(function () {
        function e() {
          991 < t(window).width() && i.find('ul').show()
        }
        return (
          t(this)
            .find('.navbar-toggler')
            .on('click', function () {
              t(this).toggleClass('menu-opened')
              var e = t(this).next('ul')
              e.hasClass('open') ? e.slideToggle().removeClass('open') : (e.slideToggle().addClass('open'), 'dropdown' === n.format && e.find('ul').show())
            }),
          i.find('.navbar-nav li ul').parent().addClass('has-sub'),
          i.find('.navbar-nav li ul li').parent().addClass('sub-menu'),
          'multitoggle' === n.format
            ? (i.find('.has-sub').prepend('<span class="submenu-button"></span>'),
              i.find('.navbar-nav > li.has-sub > .submenu-button').on('click', function () {
                t(this).next('.sub-menu').slideToggle(),
                  t(this).siblings('ul').addClass('open').slideToggle(),
                  t(this)
                    .parents('.navbar-nav > li.has-sub')
                    .toggleClass('active')
                    .siblings('.has-sub')
                    .children('.sub-menu')
                    .slideUp()
                    .removeClass('open')
                    .parents('li')
                    .removeClass('active')
              }),
              i.find('.sub-menu > li.has-sub > .submenu-button').on('click', function () {
                t(this).next('.sub-menu').slideToggle(),
                  t(this).siblings('ul').addClass('open').slideToggle(),
                  t(this)
                    .parents('.sub-menu > li')
                    .toggleClass('active')
                    .siblings('.has-sub')
                    .children('.sub-menu')
                    .slideUp()
                    .removeClass('open')
                    .parents('li')
                    .removeClass('active'),
                  t(this).siblings('ul').hasClass('open') && t(this).parents('li').eq(1).addClass('active')
              }))
            : i.addClass('dropdown'),
          !0 === n.sticky && i.css('position', 'fixed'),
          e(),
          t(window).on('resize', e)
        )
      })
    }),
      t(document).ready(function () {
        t('nav').menumaker({ format: 'multitoggle' })
        var e = window.location.pathname.split('/'),
          i = window.location.pathname
        i = 0 < e[e.length - 1].length ? e[e.length - 1] : e[e.length - 2]
        t('.navbar-nav li')
          .find('a[href="' + i + '"]')
          .closest('li')
          .addClass('active')
          .parents()
          .eq(1)
          .addClass('current'),
          t('.navbar-nav li.has-sub ul li')
            .find('a[href="' + i + '"]')
            .parents()
            .eq(4)
            .addClass('current')
      }),
      t('.navbar-default .attr-nav').each(function () {
        t('li.search > a', this).on('click', function (e) {
          e.preventDefault(), t('.top-search').slideToggle()
        })
      }),
      t('.input-group-addon.close-search').on('click', function () {
        t('.top-search').slideUp()
      })
  })(jQuery),
  (function (t) {
    t.fn.extend({
      easyResponsiveTabs: function (e) {
        var i = (e = t.extend({ type: 'default', width: 'auto', fit: !0, closed: !1, tabidentify: '', activate: function () {} }, e)).type,
          n = e.fit,
          o = e.width,
          r = window.location.hash,
          s = !(!window.history || !history.replaceState)
        t(this).on('bind', 'tabactivate', function (t, i) {
          'function' == typeof e.activate && e.activate.call(i, t)
        }),
          this.each(function () {
            var a,
              l = t(this),
              c = l.find('ul.resp-tabs-list.' + e.tabidentify),
              u = l.attr('id')
            l
              .find('ul.resp-tabs-list.' + e.tabidentify + ' li')
              .addClass('resp-tab-item')
              .addClass(e.tabidentify),
              l.css({ display: 'block', width: o }),
              'vertical' == e.type && l.find('.resp-tabs-container.' + e.tabidentify).css('border-color', e.active_content_border_color),
              l
                .find('.resp-tabs-container.' + e.tabidentify + ' > div')
                .addClass('resp-tab-content')
                .addClass(e.tabidentify),
              'vertical' == i && l.addClass('resp-vtabs').addClass(e.tabidentify),
              1 == n && l.css({ width: '100%', margin: '0px' }),
              'accordion' == i && (l.addClass('resp-easy-accordion').addClass(e.tabidentify), l.find('.resp-tabs-list').css('display', 'none')),
              l.find('.resp-tab-content.' + e.tabidentify).before("<h2 class='resp-accordion " + e.tabidentify + "' role='tab'><span class='resp-arrow'></span></h2>"),
              l
                .find('.resp-tab-content.' + e.tabidentify)
                .prev('h2')
                .css({ 'background-color': e.inactive_bg, 'border-color': e.active_border_color })
            var d = 0
            l.find('.resp-accordion').each(function () {
              a = t(this)
              var i = l.find('.resp-tab-item:eq(' + d + ')'),
                n = l.find('.resp-accordion:eq(' + d + ')')
              n.append(i.html()), n.data(i.data()), a.attr('aria-controls', e.tabidentify + '_tab_item-' + d), d++
            })
            var h = 0
            l.find('.resp-tab-item').each(function () {
              ;($tabItem = t(this)),
                $tabItem.attr('aria-controls', e.tabidentify + '_tab_item-' + h),
                $tabItem.attr('role', 'tab'),
                $tabItem.css({ 'background-color': e.inactive_bg, 'border-color': 'none' })
              var i = 0
              l.find('.resp-tab-content.' + e.tabidentify).each(function () {
                t(this)
                  .attr('aria-labelledby', e.tabidentify + '_tab_item-' + i)
                  .css({ 'border-color': e.active_border_color }),
                  i++
              }),
                h++
            })
            var f,
              p = 0
            '' == r || (null !== (f = r.match(new RegExp(u + '([0-9]+)'))) && 2 === f.length && ((p = parseInt(f[1], 10) - 1), h < p && (p = 0))),
              t(l.find('.resp-tab-item.' + e.tabidentify)[p])
                .addClass('resp-tab-active')
                .css({ 'background-color': e.activetab_bg, 'border-color': e.active_border_color }),
              !0 === e.closed ||
                ('accordion' === e.closed && !c.is(':visible')) ||
                ('tabs' === e.closed && c.is(':visible')) ||
                (t(l.find('.resp-accordion.' + e.tabidentify)[p])
                  .addClass('resp-tab-active')
                  .css({ 'background-color': e.activetab_bg + ' !important', 'border-color': e.active_border_color, background: 'none' }),
                t(l.find('.resp-tab-content.' + e.tabidentify)[p])
                  .addClass('resp-tab-content-active')
                  .addClass(e.tabidentify)
                  .attr('style', 'display:block')),
              l.find('[role=tab]').each(function () {
                t(this).on('click', function () {
                  var i,
                    n,
                    o,
                    r = t(this),
                    a = r.attr('aria-controls')
                  if (r.hasClass('resp-accordion') && r.hasClass('resp-tab-active'))
                    return (
                      l.find('.resp-tab-content-active.' + e.tabidentify).slideUp('', function () {
                        t(this).addClass('resp-accordion-closed')
                      }),
                      r.removeClass('resp-tab-active').css({}),
                      !1
                    )
                  !r.hasClass('resp-tab-active') && r.hasClass('resp-accordion')
                    ? (l
                        .find('.resp-tab-active.' + e.tabidentify)
                        .removeClass('resp-tab-active')
                        .css({}),
                      l
                        .find('.resp-tab-content-active.' + e.tabidentify)
                        .slideUp()
                        .removeClass('resp-tab-content-active resp-accordion-closed'),
                      l
                        .find('[aria-controls=' + a + ']')
                        .addClass('resp-tab-active')
                        .css({}),
                      l
                        .find('.resp-tab-content[aria-labelledby = ' + a + '].' + e.tabidentify)
                        .slideDown()
                        .addClass('resp-tab-content-active'))
                    : (l
                        .find('.resp-tab-active.' + e.tabidentify)
                        .removeClass('resp-tab-active')
                        .css({}),
                      l
                        .find('.resp-tab-content-active.' + e.tabidentify)
                        .removeAttr('style')
                        .removeClass('resp-tab-content-active')
                        .removeClass('resp-accordion-closed'),
                      l
                        .find('[aria-controls=' + a + ']')
                        .addClass('resp-tab-active')
                        .css({}),
                      l
                        .find('.resp-tab-content[aria-labelledby = ' + a + '].' + e.tabidentify)
                        .addClass('resp-tab-content-active')
                        .attr('style', 'display:block')),
                    r.trigger('tabactivate', r),
                    s &&
                      ((i = window.location.hash),
                      a.split('tab_item-'),
                      (o = (o = '') != i ? ((n = new RegExp(u + '[0-9]+')), null != i.match(n) ? i.replace(n, o) : i + '|' + o) : '' + o),
                      history.replaceState(null, null, o))
                })
              }),
              t(window).resize(function () {
                l.find('.resp-accordion-closed').removeAttr('style')
              })
          })
      }
    })
  })(jQuery),
  (function (t, e, i) {
    function n(e, i) {
      ;(this.settings = null),
        (this.options = t.extend({}, n.Defaults, i)),
        (this.$element = t(e)),
        (this._handlers = {}),
        (this._plugins = {}),
        (this._supress = {}),
        (this._current = null),
        (this._speed = null),
        (this._coordinates = []),
        (this._breakpoint = null),
        (this._width = null),
        (this._items = []),
        (this._clones = []),
        (this._mergers = []),
        (this._widths = []),
        (this._invalidated = {}),
        (this._pipe = []),
        (this._drag = { time: null, target: null, pointer: null, stage: { start: null, current: null }, direction: null }),
        (this._states = { current: {}, tags: { initializing: ['busy'], animating: ['busy'], dragging: ['interacting'] } }),
        t.each(
          ['onResize', 'onThrottledResize'],
          t.proxy(function (e, i) {
            this._handlers[i] = t.proxy(this[i], this)
          }, this)
        ),
        t.each(
          n.Plugins,
          t.proxy(function (t, e) {
            this._plugins[t.charAt(0).toLowerCase() + t.slice(1)] = new e(this)
          }, this)
        ),
        t.each(
          n.Workers,
          t.proxy(function (e, i) {
            this._pipe.push({ filter: i.filter, run: t.proxy(i.run, this) })
          }, this)
        ),
        this.setup(),
        this.initialize()
    }
    ;(n.Defaults = {
      items: 3,
      loop: !1,
      center: !1,
      rewind: !1,
      mouseDrag: !0,
      touchDrag: !0,
      pullDrag: !0,
      freeDrag: !1,
      margin: 0,
      stagePadding: 0,
      merge: !1,
      mergeFit: !0,
      autoWidth: !1,
      startPosition: 0,
      rtl: !1,
      smartSpeed: 250,
      fluidSpeed: !1,
      dragEndSpeed: !1,
      responsive: {},
      responsiveRefreshRate: 200,
      responsiveBaseElement: e,
      fallbackEasing: 'swing',
      info: !1,
      nestedItemSelector: !1,
      itemElement: 'div',
      stageElement: 'div',
      refreshClass: 'owl-refresh',
      loadedClass: 'owl-loaded',
      loadingClass: 'owl-loading',
      rtlClass: 'owl-rtl',
      responsiveClass: 'owl-responsive',
      dragClass: 'owl-drag',
      itemClass: 'owl-item',
      stageClass: 'owl-stage',
      stageOuterClass: 'owl-stage-outer',
      grabClass: 'owl-grab'
    }),
      (n.Width = { Default: 'default', Inner: 'inner', Outer: 'outer' }),
      (n.Type = { Event: 'event', State: 'state' }),
      (n.Plugins = {}),
      (n.Workers = [
        {
          filter: ['width', 'settings'],
          run: function () {
            this._width = this.$element.width()
          }
        },
        {
          filter: ['width', 'items', 'settings'],
          run: function (t) {
            t.current = this._items && this._items[this.relative(this._current)]
          }
        },
        {
          filter: ['items', 'settings'],
          run: function () {
            this.$stage.children('.cloned').remove()
          }
        },
        {
          filter: ['width', 'items', 'settings'],
          run: function (t) {
            var e = this.settings.margin || '',
              i = !this.settings.autoWidth,
              n = this.settings.rtl,
              o = { width: 'auto', 'margin-left': n ? e : '', 'margin-right': n ? '' : e }
            i || this.$stage.children().css(o), (t.css = o)
          }
        },
        {
          filter: ['width', 'items', 'settings'],
          run: function (t) {
            var e = (this.width() / this.settings.items).toFixed(3) - this.settings.margin,
              i = null,
              n = this._items.length,
              o = !this.settings.autoWidth,
              r = []
            for (t.items = { merge: !1, width: e }; n--; )
              (i = this._mergers[n]),
                (i = (this.settings.mergeFit && Math.min(i, this.settings.items)) || i),
                (t.items.merge = 1 < i || t.items.merge),
                (r[n] = o ? e * i : this._items[n].width())
            this._widths = r
          }
        },
        {
          filter: ['items', 'settings'],
          run: function () {
            var e = [],
              i = this._items,
              n = this.settings,
              o = Math.max(2 * n.items, 4),
              r = 2 * Math.ceil(i.length / 2),
              s = n.loop && i.length ? (n.rewind ? o : Math.max(o, r)) : 0,
              a = '',
              l = ''
            for (s /= 2; s--; )
              e.push(this.normalize(e.length / 2, !0)),
                (a += i[e[e.length - 1]][0].outerHTML),
                e.push(this.normalize(i.length - 1 - (e.length - 1) / 2, !0)),
                (l = i[e[e.length - 1]][0].outerHTML + l)
            ;(this._clones = e), t(a).addClass('cloned').appendTo(this.$stage), t(l).addClass('cloned').prependTo(this.$stage)
          }
        },
        {
          filter: ['width', 'items', 'settings'],
          run: function () {
            for (var t = this.settings.rtl ? 1 : -1, e = this._clones.length + this._items.length, i = -1, n = 0, o = 0, r = []; ++i < e; )
              (n = r[i - 1] || 0), (o = this._widths[this.relative(i)] + this.settings.margin), r.push(n + o * t)
            this._coordinates = r
          }
        },
        {
          filter: ['width', 'items', 'settings'],
          run: function () {
            var t = this.settings.stagePadding,
              e = this._coordinates,
              i = { width: Math.ceil(Math.abs(e[e.length - 1])) + 2 * t, 'padding-left': t || '', 'padding-right': t || '' }
            this.$stage.css(i)
          }
        },
        {
          filter: ['width', 'items', 'settings'],
          run: function (t) {
            var e = this._coordinates.length,
              i = !this.settings.autoWidth,
              n = this.$stage.children()
            if (i && t.items.merge) for (; e--; ) (t.css.width = this._widths[this.relative(e)]), n.eq(e).css(t.css)
            else i && ((t.css.width = t.items.width), n.css(t.css))
          }
        },
        {
          filter: ['items'],
          run: function () {
            this._coordinates.length < 1 && this.$stage.removeAttr('style')
          }
        },
        {
          filter: ['width', 'items', 'settings'],
          run: function (t) {
            ;(t.current = t.current ? this.$stage.children().index(t.current) : 0),
              (t.current = Math.max(this.minimum(), Math.min(this.maximum(), t.current))),
              this.reset(t.current)
          }
        },
        {
          filter: ['position'],
          run: function () {
            this.animate(this.coordinates(this._current))
          }
        },
        {
          filter: ['width', 'position', 'items', 'settings'],
          run: function () {
            for (
              var t,
                e,
                i = this.settings.rtl ? 1 : -1,
                n = 2 * this.settings.stagePadding,
                o = this.coordinates(this.current()) + n,
                r = o + this.width() * i,
                s = [],
                a = 0,
                l = this._coordinates.length;
              a < l;
              a++
            )
              (t = this._coordinates[a - 1] || 0),
                (e = Math.abs(this._coordinates[a]) + n * i),
                ((this.op(t, '<=', o) && this.op(t, '>', r)) || (this.op(e, '<', o) && this.op(e, '>', r))) && s.push(a)
            this.$stage.children('.active').removeClass('active'),
              this.$stage.children(':eq(' + s.join('), :eq(') + ')').addClass('active'),
              this.settings.center && (this.$stage.children('.center').removeClass('center'), this.$stage.children().eq(this.current()).addClass('center'))
          }
        }
      ]),
      (n.prototype.initialize = function () {
        var e, i, n
        this.enter('initializing'),
          this.trigger('initialize'),
          this.$element.toggleClass(this.settings.rtlClass, this.settings.rtl),
          this.settings.autoWidth &&
            !this.is('pre-loading') &&
            ((e = this.$element.find('img')),
            (i = this.settings.nestedItemSelector ? '.' + this.settings.nestedItemSelector : void 0),
            (n = this.$element.children(i).width()),
            e.length && n <= 0 && this.preloadAutoWidthImages(e)),
          this.$element.addClass(this.options.loadingClass),
          (this.$stage = t('<' + this.settings.stageElement + ' class="' + this.settings.stageClass + '"/>').wrap('<div class="' + this.settings.stageOuterClass + '"/>')),
          this.$element.append(this.$stage.parent()),
          this.replace(this.$element.children().not(this.$stage.parent())),
          this.$element.is(':visible') ? this.refresh() : this.invalidate('width'),
          this.$element.removeClass(this.options.loadingClass).addClass(this.options.loadedClass),
          this.registerEventHandlers(),
          this.leave('initializing'),
          this.trigger('initialized')
      }),
      (n.prototype.setup = function () {
        var e = this.viewport(),
          i = this.options.responsive,
          n = -1,
          o = null
        i
          ? (t.each(i, function (t) {
              t <= e && n < t && (n = Number(t))
            }),
            'function' == typeof (o = t.extend({}, this.options, i[n])).stagePadding && (o.stagePadding = o.stagePadding()),
            delete o.responsive,
            o.responsiveClass && this.$element.attr('class', this.$element.attr('class').replace(new RegExp('(' + this.options.responsiveClass + '-)\\S+\\s', 'g'), '$1' + n)))
          : (o = t.extend({}, this.options)),
          this.trigger('change', { property: { name: 'settings', value: o } }),
          (this._breakpoint = n),
          (this.settings = o),
          this.invalidate('settings'),
          this.trigger('changed', { property: { name: 'settings', value: this.settings } })
      }),
      (n.prototype.optionsLogic = function () {
        this.settings.autoWidth && ((this.settings.stagePadding = !1), (this.settings.merge = !1))
      }),
      (n.prototype.prepare = function (e) {
        var i = this.trigger('prepare', { content: e })
        return (
          i.data ||
            (i.data = t('<' + this.settings.itemElement + '/>')
              .addClass(this.options.itemClass)
              .append(e)),
          this.trigger('prepared', { content: i.data }),
          i.data
        )
      }),
      (n.prototype.update = function () {
        for (
          var e = 0,
            i = this._pipe.length,
            n = t.proxy(function (t) {
              return this[t]
            }, this._invalidated),
            o = {};
          e < i;

        )
          (this._invalidated.all || 0 < t.grep(this._pipe[e].filter, n).length) && this._pipe[e].run(o), e++
        ;(this._invalidated = {}), this.is('valid') || this.enter('valid')
      }),
      (n.prototype.width = function (t) {
        switch ((t = t || n.Width.Default)) {
          case n.Width.Inner:
          case n.Width.Outer:
            return this._width
          default:
            return this._width - 2 * this.settings.stagePadding + this.settings.margin
        }
      }),
      (n.prototype.refresh = function () {
        this.enter('refreshing'),
          this.trigger('refresh'),
          this.setup(),
          this.optionsLogic(),
          this.$element.addClass(this.options.refreshClass),
          this.update(),
          this.$element.removeClass(this.options.refreshClass),
          this.leave('refreshing'),
          this.trigger('refreshed')
      }),
      (n.prototype.onThrottledResize = function () {
        e.clearTimeout(this.resizeTimer), (this.resizeTimer = e.setTimeout(this._handlers.onResize, this.settings.responsiveRefreshRate))
      }),
      (n.prototype.onResize = function () {
        return (
          !!this._items.length &&
          this._width !== this.$element.width() &&
          !!this.$element.is(':visible') &&
          (this.enter('resizing'),
          this.trigger('resize').isDefaultPrevented()
            ? (this.leave('resizing'), !1)
            : (this.invalidate('width'), this.refresh(), this.leave('resizing'), void this.trigger('resized')))
        )
      }),
      (n.prototype.registerEventHandlers = function () {
        t.support.transition && this.$stage.on(t.support.transition.end + '.owl.core', t.proxy(this.onTransitionEnd, this)),
          !1 !== this.settings.responsive && this.on(e, 'resize', this._handlers.onThrottledResize),
          this.settings.mouseDrag &&
            (this.$element.addClass(this.options.dragClass),
            this.$stage.on('mousedown.owl.core', t.proxy(this.onDragStart, this)),
            this.$stage.on('dragstart.owl.core selectstart.owl.core', function () {
              return !1
            })),
          this.settings.touchDrag && (this.$stage.on('touchstart.owl.core', t.proxy(this.onDragStart, this)), this.$stage.on('touchcancel.owl.core', t.proxy(this.onDragEnd, this)))
      }),
      (n.prototype.onDragStart = function (e) {
        var n = null
        3 !== e.which &&
          ((n = t.support.transform
            ? {
                x: (n = this.$stage
                  .css('transform')
                  .replace(/.*\(|\)| /g, '')
                  .split(','))[16 === n.length ? 12 : 4],
                y: n[16 === n.length ? 13 : 5]
              }
            : ((n = this.$stage.position()), { x: this.settings.rtl ? n.left + this.$stage.width() - this.width() + this.settings.margin : n.left, y: n.top })),
          this.is('animating') && (t.support.transform ? this.animate(n.x) : this.$stage.stop(), this.invalidate('position')),
          this.$element.toggleClass(this.options.grabClass, 'mousedown' === e.type),
          this.speed(0),
          (this._drag.time = new Date().getTime()),
          (this._drag.target = t(e.target)),
          (this._drag.stage.start = n),
          (this._drag.stage.current = n),
          (this._drag.pointer = this.pointer(e)),
          t(i).on('mouseup.owl.core touchend.owl.core', t.proxy(this.onDragEnd, this)),
          t(i).one(
            'mousemove.owl.core touchmove.owl.core',
            t.proxy(function (e) {
              var n = this.difference(this._drag.pointer, this.pointer(e))
              t(i).on('mousemove.owl.core touchmove.owl.core', t.proxy(this.onDragMove, this)),
                (Math.abs(n.x) < Math.abs(n.y) && this.is('valid')) || (e.preventDefault(), this.enter('dragging'), this.trigger('drag'))
            }, this)
          ))
      }),
      (n.prototype.onDragMove = function (t) {
        var e = null,
          i = null,
          n = null,
          o = this.difference(this._drag.pointer, this.pointer(t)),
          r = this.difference(this._drag.stage.start, o)
        this.is('dragging') &&
          (t.preventDefault(),
          this.settings.loop
            ? ((e = this.coordinates(this.minimum())), (i = this.coordinates(this.maximum() + 1) - e), (r.x = ((((r.x - e) % i) + i) % i) + e))
            : ((e = this.settings.rtl ? this.coordinates(this.maximum()) : this.coordinates(this.minimum())),
              (i = this.settings.rtl ? this.coordinates(this.minimum()) : this.coordinates(this.maximum())),
              (n = this.settings.pullDrag ? (-1 * o.x) / 5 : 0),
              (r.x = Math.max(Math.min(r.x, e + n), i + n))),
          (this._drag.stage.current = r),
          this.animate(r.x))
      }),
      (n.prototype.onDragEnd = function (e) {
        var n = this.difference(this._drag.pointer, this.pointer(e)),
          o = this._drag.stage.current,
          r = (0 < n.x) ^ this.settings.rtl ? 'left' : 'right'
        t(i).off('.owl.core'),
          this.$element.removeClass(this.options.grabClass),
          ((0 !== n.x && this.is('dragging')) || !this.is('valid')) &&
            (this.speed(this.settings.dragEndSpeed || this.settings.smartSpeed),
            this.current(this.closest(o.x, 0 !== n.x ? r : this._drag.direction)),
            this.invalidate('position'),
            this.update(),
            (this._drag.direction = r),
            (3 < Math.abs(n.x) || 300 < new Date().getTime() - this._drag.time) &&
              this._drag.target.one('click.owl.core', function () {
                return !1
              })),
          this.is('dragging') && (this.leave('dragging'), this.trigger('dragged'))
      }),
      (n.prototype.closest = function (e, i) {
        var n = -1,
          o = this.width(),
          r = this.coordinates()
        return (
          this.settings.freeDrag ||
            t.each(
              r,
              t.proxy(function (t, s) {
                return (
                  'left' === i && s - 30 < e && e < s + 30
                    ? (n = t)
                    : 'right' === i && s - o - 30 < e && e < s - o + 30
                    ? (n = t + 1)
                    : this.op(e, '<', s) && this.op(e, '>', r[t + 1] || s - o) && (n = 'left' === i ? t + 1 : t),
                  -1 === n
                )
              }, this)
            ),
          this.settings.loop || (this.op(e, '>', r[this.minimum()]) ? (n = e = this.minimum()) : this.op(e, '<', r[this.maximum()]) && (n = e = this.maximum())),
          n
        )
      }),
      (n.prototype.animate = function (e) {
        var i = 0 < this.speed()
        this.is('animating') && this.onTransitionEnd(),
          i && (this.enter('animating'), this.trigger('translate')),
          t.support.transform3d && t.support.transition
            ? this.$stage.css({ transform: 'translate3d(' + e + 'px,0px,0px)', transition: this.speed() / 1e3 + 's' })
            : i
            ? this.$stage.animate({ left: e + 'px' }, this.speed(), this.settings.fallbackEasing, t.proxy(this.onTransitionEnd, this))
            : this.$stage.css({ left: e + 'px' })
      }),
      (n.prototype.is = function (t) {
        return this._states.current[t] && 0 < this._states.current[t]
      }),
      (n.prototype.current = function (t) {
        return void 0 === t
          ? this._current
          : 0 !== this._items.length
          ? ((t = this.normalize(t)),
            this._current !== t &&
              (void 0 !== (e = this.trigger('change', { property: { name: 'position', value: t } })).data && (t = this.normalize(e.data)),
              (this._current = t),
              this.invalidate('position'),
              this.trigger('changed', { property: { name: 'position', value: this._current } })),
            this._current)
          : void 0
        var e
      }),
      (n.prototype.invalidate = function (e) {
        return (
          'string' === t.type(e) && ((this._invalidated[e] = !0), this.is('valid') && this.leave('valid')),
          t.map(this._invalidated, function (t, e) {
            return e
          })
        )
      }),
      (n.prototype.reset = function (t) {
        void 0 !== (t = this.normalize(t)) &&
          ((this._speed = 0), (this._current = t), this.suppress(['translate', 'translated']), this.animate(this.coordinates(t)), this.release(['translate', 'translated']))
      }),
      (n.prototype.normalize = function (t, e) {
        var i = this._items.length,
          n = e ? 0 : this._clones.length
        return !this.isNumeric(t) || i < 1 ? (t = void 0) : (t < 0 || i + n <= t) && (t = ((((t - n / 2) % i) + i) % i) + n / 2), t
      }),
      (n.prototype.relative = function (t) {
        return (t -= this._clones.length / 2), this.normalize(t, !0)
      }),
      (n.prototype.maximum = function (t) {
        var e,
          i,
          n,
          o = this.settings,
          r = this._coordinates.length
        if (o.loop) r = this._clones.length / 2 + this._items.length - 1
        else if (o.autoWidth || o.merge) {
          for (e = this._items.length, i = this._items[--e].width(), n = this.$element.width(); e-- && !((i += this._items[e].width() + this.settings.margin) > n); );
          r = e + 1
        } else r = o.center ? this._items.length - 1 : this._items.length - o.items
        return t && (r -= this._clones.length / 2), Math.max(r, 0)
      }),
      (n.prototype.minimum = function (t) {
        return t ? 0 : this._clones.length / 2
      }),
      (n.prototype.items = function (t) {
        return void 0 === t ? this._items.slice() : ((t = this.normalize(t, !0)), this._items[t])
      }),
      (n.prototype.mergers = function (t) {
        return void 0 === t ? this._mergers.slice() : ((t = this.normalize(t, !0)), this._mergers[t])
      }),
      (n.prototype.clones = function (e) {
        function i(t) {
          return t % 2 == 0 ? o + t / 2 : n - (t + 1) / 2
        }
        var n = this._clones.length / 2,
          o = n + this._items.length
        return void 0 === e
          ? t.map(this._clones, function (t, e) {
              return i(e)
            })
          : t.map(this._clones, function (t, n) {
              return t === e ? i(n) : null
            })
      }),
      (n.prototype.speed = function (t) {
        return void 0 !== t && (this._speed = t), this._speed
      }),
      (n.prototype.coordinates = function (e) {
        var i,
          n = 1,
          o = e - 1
        return void 0 === e
          ? t.map(
              this._coordinates,
              t.proxy(function (t, e) {
                return this.coordinates(e)
              }, this)
            )
          : (this.settings.center
              ? (this.settings.rtl && ((n = -1), (o = e + 1)), (i = this._coordinates[e]), (i += ((this.width() - i + (this._coordinates[o] || 0)) / 2) * n))
              : (i = this._coordinates[o] || 0),
            (i = Math.ceil(i)))
      }),
      (n.prototype.duration = function (t, e, i) {
        return 0 === i ? 0 : Math.min(Math.max(Math.abs(e - t), 1), 6) * Math.abs(i || this.settings.smartSpeed)
      }),
      (n.prototype.to = function (t, e) {
        var i = this.current(),
          n = null,
          o = t - this.relative(i),
          r = (0 < o) - (o < 0),
          s = this._items.length,
          a = this.minimum(),
          l = this.maximum()
        this.settings.loop
          ? (!this.settings.rewind && Math.abs(o) > s / 2 && (o += -1 * r * s),
            (n = (((((t = i + o) - a) % s) + s) % s) + a) !== t && n - o <= l && 0 < n - o && ((i = n - o), (t = n), this.reset(i)))
          : (t = this.settings.rewind ? ((t % (l += 1)) + l) % l : Math.max(a, Math.min(l, t))),
          this.speed(this.duration(i, t, e)),
          this.current(t),
          this.$element.is(':visible') && this.update()
      }),
      (n.prototype.next = function (t) {
        ;(t = t || !1), this.to(this.relative(this.current()) + 1, t)
      }),
      (n.prototype.prev = function (t) {
        ;(t = t || !1), this.to(this.relative(this.current()) - 1, t)
      }),
      (n.prototype.onTransitionEnd = function (t) {
        if (void 0 !== t && (t.stopPropagation(), (t.target || t.srcElement || t.originalTarget) !== this.$stage.get(0))) return !1
        this.leave('animating'), this.trigger('translated')
      }),
      (n.prototype.viewport = function () {
        var n
        return (
          this.options.responsiveBaseElement !== e
            ? (n = t(this.options.responsiveBaseElement).width())
            : e.innerWidth
            ? (n = e.innerWidth)
            : i.documentElement && i.documentElement.clientWidth
            ? (n = i.documentElement.clientWidth)
            : console.warn('Can not detect viewport width.'),
          n
        )
      }),
      (n.prototype.replace = function (e) {
        this.$stage.empty(),
          (this._items = []),
          (e = e && (e instanceof jQuery ? e : t(e))),
          this.settings.nestedItemSelector && (e = e.find('.' + this.settings.nestedItemSelector)),
          e
            .filter(function () {
              return 1 === this.nodeType
            })
            .each(
              t.proxy(function (t, e) {
                ;(e = this.prepare(e)), this.$stage.append(e), this._items.push(e), this._mergers.push(+e.find('[data-merge]').addBack('[data-merge]').attr('data-merge') || 1)
              }, this)
            ),
          this.reset(this.isNumeric(this.settings.startPosition) ? this.settings.startPosition : 0),
          this.invalidate('items')
      }),
      (n.prototype.add = function (e, i) {
        var n = this.relative(this._current)
        ;(i = void 0 === i ? this._items.length : this.normalize(i, !0)),
          (e = e instanceof jQuery ? e : t(e)),
          this.trigger('add', { content: e, position: i }),
          (e = this.prepare(e)),
          0 === this._items.length || i === this._items.length
            ? (0 === this._items.length && this.$stage.append(e),
              0 !== this._items.length && this._items[i - 1].after(e),
              this._items.push(e),
              this._mergers.push(+e.find('[data-merge]').addBack('[data-merge]').attr('data-merge') || 1))
            : (this._items[i].before(e), this._items.splice(i, 0, e), this._mergers.splice(i, 0, +e.find('[data-merge]').addBack('[data-merge]').attr('data-merge') || 1)),
          this._items[n] && this.reset(this._items[n].index()),
          this.invalidate('items'),
          this.trigger('added', { content: e, position: i })
      }),
      (n.prototype.remove = function (t) {
        void 0 !== (t = this.normalize(t, !0)) &&
          (this.trigger('remove', { content: this._items[t], position: t }),
          this._items[t].remove(),
          this._items.splice(t, 1),
          this._mergers.splice(t, 1),
          this.invalidate('items'),
          this.trigger('removed', { content: null, position: t }))
      }),
      (n.prototype.preloadAutoWidthImages = function (e) {
        e.each(
          t.proxy(function (e, i) {
            this.enter('pre-loading'),
              (i = t(i)),
              t(new Image())
                .one(
                  'load',
                  t.proxy(function (t) {
                    i.attr('src', t.target.src), i.css('opacity', 1), this.leave('pre-loading'), this.is('pre-loading') || this.is('initializing') || this.refresh()
                  }, this)
                )
                .attr('src', i.attr('src') || i.attr('data-src') || i.attr('data-src-retina'))
          }, this)
        )
      }),
      (n.prototype.destroy = function () {
        for (var n in (this.$element.off('.owl.core'),
        this.$stage.off('.owl.core'),
        t(i).off('.owl.core'),
        !1 !== this.settings.responsive && (e.clearTimeout(this.resizeTimer), this.off(e, 'resize', this._handlers.onThrottledResize)),
        this._plugins))
          this._plugins[n].destroy()
        this.$stage.children('.cloned').remove(),
          this.$stage.unwrap(),
          this.$stage.children().contents().unwrap(),
          this.$stage.children().unwrap(),
          this.$element
            .removeClass(this.options.refreshClass)
            .removeClass(this.options.loadingClass)
            .removeClass(this.options.loadedClass)
            .removeClass(this.options.rtlClass)
            .removeClass(this.options.dragClass)
            .removeClass(this.options.grabClass)
            .attr('class', this.$element.attr('class').replace(new RegExp(this.options.responsiveClass + '-\\S+\\s', 'g'), ''))
            .removeData('owl.carousel')
      }),
      (n.prototype.op = function (t, e, i) {
        var n = this.settings.rtl
        switch (e) {
          case '<':
            return n ? i < t : t < i
          case '>':
            return n ? t < i : i < t
          case '>=':
            return n ? t <= i : i <= t
          case '<=':
            return n ? i <= t : t <= i
        }
      }),
      (n.prototype.on = function (t, e, i, n) {
        t.addEventListener ? t.addEventListener(e, i, n) : t.attachEvent && t.attachEvent('on' + e, i)
      }),
      (n.prototype.off = function (t, e, i, n) {
        t.removeEventListener ? t.removeEventListener(e, i, n) : t.detachEvent && t.detachEvent('on' + e, i)
      }),
      (n.prototype.trigger = function (e, i, o, r, s) {
        var a = { item: { count: this._items.length, index: this.current() } },
          l = t.camelCase(
            t
              .grep(['on', e, o], function (t) {
                return t
              })
              .join('-')
              .toLowerCase()
          ),
          c = t.Event([e, 'owl', o || 'carousel'].join('.').toLowerCase(), t.extend({ relatedTarget: this }, a, i))
        return (
          this._supress[e] ||
            (t.each(this._plugins, function (t, e) {
              e.onTrigger && e.onTrigger(c)
            }),
            this.register({ type: n.Type.Event, name: e }),
            this.$element.trigger(c),
            this.settings && 'function' == typeof this.settings[l] && this.settings[l].call(this, c)),
          c
        )
      }),
      (n.prototype.enter = function (e) {
        t.each(
          [e].concat(this._states.tags[e] || []),
          t.proxy(function (t, e) {
            void 0 === this._states.current[e] && (this._states.current[e] = 0), this._states.current[e]++
          }, this)
        )
      }),
      (n.prototype.leave = function (e) {
        t.each(
          [e].concat(this._states.tags[e] || []),
          t.proxy(function (t, e) {
            this._states.current[e]--
          }, this)
        )
      }),
      (n.prototype.register = function (e) {
        var i
        e.type === n.Type.Event
          ? (t.event.special[e.name] || (t.event.special[e.name] = {}),
            t.event.special[e.name].owl ||
              ((i = t.event.special[e.name]._default),
              (t.event.special[e.name]._default = function (t) {
                return !i || !i.apply || (t.namespace && -1 !== t.namespace.indexOf('owl')) ? t.namespace && -1 < t.namespace.indexOf('owl') : i.apply(this, arguments)
              }),
              (t.event.special[e.name].owl = !0)))
          : e.type === n.Type.State &&
            (this._states.tags[e.name] ? (this._states.tags[e.name] = this._states.tags[e.name].concat(e.tags)) : (this._states.tags[e.name] = e.tags),
            (this._states.tags[e.name] = t.grep(
              this._states.tags[e.name],
              t.proxy(function (i, n) {
                return t.inArray(i, this._states.tags[e.name]) === n
              }, this)
            )))
      }),
      (n.prototype.suppress = function (e) {
        t.each(
          e,
          t.proxy(function (t, e) {
            this._supress[e] = !0
          }, this)
        )
      }),
      (n.prototype.release = function (e) {
        t.each(
          e,
          t.proxy(function (t, e) {
            delete this._supress[e]
          }, this)
        )
      }),
      (n.prototype.pointer = function (t) {
        var i = { x: null, y: null }
        return (
          (t = (t = t.originalEvent || t || e.event).touches && t.touches.length ? t.touches[0] : t.changedTouches && t.changedTouches.length ? t.changedTouches[0] : t).pageX
            ? ((i.x = t.pageX), (i.y = t.pageY))
            : ((i.x = t.clientX), (i.y = t.clientY)),
          i
        )
      }),
      (n.prototype.isNumeric = function (t) {
        return !isNaN(parseFloat(t))
      }),
      (n.prototype.difference = function (t, e) {
        return { x: t.x - e.x, y: t.y - e.y }
      }),
      (t.fn.owlCarousel = function (e) {
        var i = Array.prototype.slice.call(arguments, 1)
        return this.each(function () {
          var o = t(this),
            r = o.data('owl.carousel')
          r ||
            ((r = new n(this, 'object' == typeof e && e)),
            o.data('owl.carousel', r),
            t.each(['next', 'prev', 'to', 'destroy', 'refresh', 'replace', 'add', 'remove'], function (e, i) {
              r.register({ type: n.Type.Event, name: i }),
                r.$element.on(
                  i + '.owl.carousel.core',
                  t.proxy(function (t) {
                    t.namespace && t.relatedTarget !== this && (this.suppress([i]), r[i].apply(this, [].slice.call(arguments, 1)), this.release([i]))
                  }, r)
                )
            })),
            'string' == typeof e && '_' !== e.charAt(0) && r[e].apply(r, i)
        })
      }),
      (t.fn.owlCarousel.Constructor = n)
  })(window.Zepto || window.jQuery, window, document),
  (function (t, e) {
    var i = function (e) {
      ;(this._core = e),
        (this._interval = null),
        (this._visible = null),
        (this._handlers = {
          'initialized.owl.carousel': t.proxy(function (t) {
            t.namespace && this._core.settings.autoRefresh && this.watch()
          }, this)
        }),
        (this._core.options = t.extend({}, i.Defaults, this._core.options)),
        this._core.$element.on(this._handlers)
    }
    ;(i.Defaults = { autoRefresh: !0, autoRefreshInterval: 500 }),
      (i.prototype.watch = function () {
        this._interval ||
          ((this._visible = this._core.$element.is(':visible')), (this._interval = e.setInterval(t.proxy(this.refresh, this), this._core.settings.autoRefreshInterval)))
      }),
      (i.prototype.refresh = function () {
        this._core.$element.is(':visible') !== this._visible &&
          ((this._visible = !this._visible), this._core.$element.toggleClass('owl-hidden', !this._visible), this._visible && this._core.invalidate('width') && this._core.refresh())
      }),
      (i.prototype.destroy = function () {
        var t, i
        for (t in (e.clearInterval(this._interval), this._handlers)) this._core.$element.off(t, this._handlers[t])
        for (i in Object.getOwnPropertyNames(this)) 'function' != typeof this[i] && (this[i] = null)
      }),
      (t.fn.owlCarousel.Constructor.Plugins.AutoRefresh = i)
  })(window.Zepto || window.jQuery, window, document),
  (function (t, e) {
    var i = function (e) {
      ;(this._core = e),
        (this._loaded = []),
        (this._handlers = {
          'initialized.owl.carousel change.owl.carousel resized.owl.carousel': t.proxy(function (e) {
            if (e.namespace && this._core.settings && this._core.settings.lazyLoad && ((e.property && 'position' == e.property.name) || 'initialized' == e.type))
              for (
                var i = this._core.settings,
                  n = (i.center && Math.ceil(i.items / 2)) || i.items,
                  o = (i.center && -1 * n) || 0,
                  r = (e.property && void 0 !== e.property.value ? e.property.value : this._core.current()) + o,
                  s = this._core.clones().length,
                  a = t.proxy(function (t, e) {
                    this.load(e)
                  }, this);
                o++ < n;

              )
                this.load(s / 2 + this._core.relative(r)), s && t.each(this._core.clones(this._core.relative(r)), a), r++
          }, this)
        }),
        (this._core.options = t.extend({}, i.Defaults, this._core.options)),
        this._core.$element.on(this._handlers)
    }
    ;(i.Defaults = { lazyLoad: !1 }),
      (i.prototype.load = function (i) {
        var n = this._core.$stage.children().eq(i),
          o = n && n.find('.owl-lazy')
        !o ||
          -1 < t.inArray(n.get(0), this._loaded) ||
          (o.each(
            t.proxy(function (i, n) {
              var o,
                r = t(n),
                s = (1 < e.devicePixelRatio && r.attr('data-src-retina')) || r.attr('data-src')
              this._core.trigger('load', { element: r, url: s }, 'lazy'),
                r.is('img')
                  ? r
                      .one(
                        'load.owl.lazy',
                        t.proxy(function () {
                          r.css('opacity', 1), this._core.trigger('loaded', { element: r, url: s }, 'lazy')
                        }, this)
                      )
                      .attr('src', s)
                  : (((o = new Image()).onload = t.proxy(function () {
                      r.css({ 'background-image': 'url("' + s + '")', opacity: '1' }), this._core.trigger('loaded', { element: r, url: s }, 'lazy')
                    }, this)),
                    (o.src = s))
            }, this)
          ),
          this._loaded.push(n.get(0)))
      }),
      (i.prototype.destroy = function () {
        var t, e
        for (t in this.handlers) this._core.$element.off(t, this.handlers[t])
        for (e in Object.getOwnPropertyNames(this)) 'function' != typeof this[e] && (this[e] = null)
      }),
      (t.fn.owlCarousel.Constructor.Plugins.Lazy = i)
  })(window.Zepto || window.jQuery, window, document),
  (function (t) {
    var e = function (i) {
      ;(this._core = i),
        (this._handlers = {
          'initialized.owl.carousel refreshed.owl.carousel': t.proxy(function (t) {
            t.namespace && this._core.settings.autoHeight && this.update()
          }, this),
          'changed.owl.carousel': t.proxy(function (t) {
            t.namespace && this._core.settings.autoHeight && 'position' == t.property.name && this.update()
          }, this),
          'loaded.owl.lazy': t.proxy(function (t) {
            t.namespace && this._core.settings.autoHeight && t.element.closest('.' + this._core.settings.itemClass).index() === this._core.current() && this.update()
          }, this)
        }),
        (this._core.options = t.extend({}, e.Defaults, this._core.options)),
        this._core.$element.on(this._handlers)
    }
    ;(e.Defaults = { autoHeight: !1, autoHeightClass: 'owl-height' }),
      (e.prototype.update = function () {
        var e,
          i = this._core._current,
          n = i + this._core.settings.items,
          o = this._core.$stage.children().toArray().slice(i, n),
          r = []
        t.each(o, function (e, i) {
          r.push(t(i).height())
        }),
          (e = Math.max.apply(null, r)),
          this._core.$stage.parent().height(e).addClass(this._core.settings.autoHeightClass)
      }),
      (e.prototype.destroy = function () {
        var t, e
        for (t in this._handlers) this._core.$element.off(t, this._handlers[t])
        for (e in Object.getOwnPropertyNames(this)) 'function' != typeof this[e] && (this[e] = null)
      }),
      (t.fn.owlCarousel.Constructor.Plugins.AutoHeight = e)
  })(window.Zepto || window.jQuery, (window, document)),
  (function (t, e) {
    var i = function (e) {
      ;(this._core = e),
        (this._videos = {}),
        (this._playing = null),
        (this._handlers = {
          'initialized.owl.carousel': t.proxy(function (t) {
            t.namespace && this._core.register({ type: 'state', name: 'playing', tags: ['interacting'] })
          }, this),
          'resize.owl.carousel': t.proxy(function (t) {
            t.namespace && this._core.settings.video && this.isInFullScreen() && t.preventDefault()
          }, this),
          'refreshed.owl.carousel': t.proxy(function (t) {
            t.namespace && this._core.is('resizing') && this._core.$stage.find('.cloned .owl-video-frame').remove()
          }, this),
          'changed.owl.carousel': t.proxy(function (t) {
            t.namespace && 'position' === t.property.name && this._playing && this.stop()
          }, this),
          'prepared.owl.carousel': t.proxy(function (e) {
            var i
            !e.namespace || ((i = t(e.content).find('.owl-video')).length && (i.css('display', 'none'), this.fetch(i, t(e.content))))
          }, this)
        }),
        (this._core.options = t.extend({}, i.Defaults, this._core.options)),
        this._core.$element.on(this._handlers),
        this._core.$element.on(
          'click.owl.video',
          '.owl-video-play-icon',
          t.proxy(function (t) {
            this.play(t)
          }, this)
        )
    }
    ;(i.Defaults = { video: !1, videoHeight: !1, videoWidth: !1 }),
      (i.prototype.fetch = function (t, e) {
        var i = t.attr('data-vimeo-id') ? 'vimeo' : t.attr('data-vzaar-id') ? 'vzaar' : 'youtube',
          n = t.attr('data-vimeo-id') || t.attr('data-youtube-id') || t.attr('data-vzaar-id'),
          o = t.attr('data-width') || this._core.settings.videoWidth,
          r = t.attr('data-height') || this._core.settings.videoHeight,
          s = t.attr('href')
        if (!s) throw new Error('Missing video URL.')
        if (
          -1 <
          (n = s.match(
            /(http:|https:|)\/\/(player.|www.|app.)?(vimeo\.com|youtu(be\.com|\.be|be\.googleapis\.com)|vzaar\.com)\/(video\/|videos\/|embed\/|channels\/.+\/|groups\/.+\/|watch\?v=|v\/)?([A-Za-z0-9._%-]*)(\&\S+)?/
          ))[3].indexOf('youtu')
        )
          i = 'youtube'
        else if (-1 < n[3].indexOf('vimeo')) i = 'vimeo'
        else {
          if (!(-1 < n[3].indexOf('vzaar'))) throw new Error('Video URL not supported.')
          i = 'vzaar'
        }
        ;(n = n[6]), (this._videos[s] = { type: i, id: n, width: o, height: r }), e.attr('data-video', s), this.thumbnail(t, this._videos[s])
      }),
      (i.prototype.thumbnail = function (e, i) {
        function n(t) {
          ;(o = c.lazyLoad
            ? '<div class="owl-video-tn ' + l + '" ' + a + '="' + t + '"></div>'
            : '<div class="owl-video-tn" style="opacity:1;background-image:url(' + t + ')"></div>'),
            e.after(o),
            e.after('<div class="owl-video-play-icon"></div>')
        }
        var o,
          r = i.width && i.height ? 'style="width:' + i.width + 'px;height:' + i.height + 'px;"' : '',
          s = e.find('img'),
          a = 'src',
          l = '',
          c = this._core.settings
        if ((e.wrap('<div class="owl-video-wrapper"' + r + '></div>'), this._core.settings.lazyLoad && ((a = 'data-src'), (l = 'owl-lazy')), s.length))
          return n(s.attr(a)), s.remove(), !1
        'youtube' === i.type
          ? n('//img.youtube.com/vi/' + i.id + '/hqdefault.jpg')
          : 'vimeo' === i.type
          ? t.ajax({
              type: 'GET',
              url: '//vimeo.com/api/v2/video/' + i.id + '.json',
              jsonp: 'callback',
              dataType: 'jsonp',
              success: function (t) {
                n(t[0].thumbnail_large)
              }
            })
          : 'vzaar' === i.type &&
            t.ajax({
              type: 'GET',
              url: '//vzaar.com/api/videos/' + i.id + '.json',
              jsonp: 'callback',
              dataType: 'jsonp',
              success: function (t) {
                n(t.framegrab_url)
              }
            })
      }),
      (i.prototype.stop = function () {
        this._core.trigger('stop', null, 'video'),
          this._playing.find('.owl-video-frame').remove(),
          this._playing.removeClass('owl-video-playing'),
          (this._playing = null),
          this._core.leave('playing'),
          this._core.trigger('stopped', null, 'video')
      }),
      (i.prototype.play = function (e) {
        var i,
          n = t(e.target).closest('.' + this._core.settings.itemClass),
          o = this._videos[n.attr('data-video')],
          r = o.width || '100%',
          s = o.height || this._core.$stage.height()
        this._playing ||
          (this._core.enter('playing'),
          this._core.trigger('play', null, 'video'),
          (n = this._core.items(this._core.relative(n.index()))),
          this._core.reset(n.index()),
          'youtube' === o.type
            ? (i =
                '<iframe width="' + r + '" height="' + s + '" src="//www.youtube.com/embed/' + o.id + '?autoplay=1&rel=0&v=' + o.id + '" frameborder="0" allowfullscreen></iframe>')
            : 'vimeo' === o.type
            ? (i =
                '<iframe src="//player.vimeo.com/video/' +
                o.id +
                '?autoplay=1" width="' +
                r +
                '" height="' +
                s +
                '" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>')
            : 'vzaar' === o.type &&
              (i =
                '<iframe frameborder="0"height="' +
                s +
                '"width="' +
                r +
                '" allowfullscreen mozallowfullscreen webkitAllowFullScreen src="//view.vzaar.com/' +
                o.id +
                '/player?autoplay=true"></iframe>'),
          t('<div class="owl-video-frame">' + i + '</div>').insertAfter(n.find('.owl-video')),
          (this._playing = n.addClass('owl-video-playing')))
      }),
      (i.prototype.isInFullScreen = function () {
        var i = e.fullscreenElement || e.mozFullScreenElement || e.webkitFullscreenElement
        return i && t(i).parent().hasClass('owl-video-frame')
      }),
      (i.prototype.destroy = function () {
        var t, e
        for (t in (this._core.$element.off('click.owl.video'), this._handlers)) this._core.$element.off(t, this._handlers[t])
        for (e in Object.getOwnPropertyNames(this)) 'function' != typeof this[e] && (this[e] = null)
      }),
      (t.fn.owlCarousel.Constructor.Plugins.Video = i)
  })(window.Zepto || window.jQuery, (window, document)),
  (function (t) {
    var e = function (i) {
      ;(this.core = i),
        (this.core.options = t.extend({}, e.Defaults, this.core.options)),
        (this.swapping = !0),
        (this.previous = void 0),
        (this.next = void 0),
        (this.handlers = {
          'change.owl.carousel': t.proxy(function (t) {
            t.namespace && 'position' == t.property.name && ((this.previous = this.core.current()), (this.next = t.property.value))
          }, this),
          'drag.owl.carousel dragged.owl.carousel translated.owl.carousel': t.proxy(function (t) {
            t.namespace && (this.swapping = 'translated' == t.type)
          }, this),
          'translate.owl.carousel': t.proxy(function (t) {
            t.namespace && this.swapping && (this.core.options.animateOut || this.core.options.animateIn) && this.swap()
          }, this)
        }),
        this.core.$element.on(this.handlers)
    }
    ;(e.Defaults = { animateOut: !1, animateIn: !1 }),
      (e.prototype.swap = function () {
        var e, i, n, o, r, s
        1 === this.core.settings.items &&
          t.support.animation &&
          t.support.transition &&
          (this.core.speed(0),
          (i = t.proxy(this.clear, this)),
          (n = this.core.$stage.children().eq(this.previous)),
          (o = this.core.$stage.children().eq(this.next)),
          (r = this.core.settings.animateIn),
          (s = this.core.settings.animateOut),
          this.core.current() !== this.previous &&
            (s &&
              ((e = this.core.coordinates(this.previous) - this.core.coordinates(this.next)),
              n
                .one(t.support.animation.end, i)
                .css({ left: e + 'px' })
                .addClass('animated owl-animated-out')
                .addClass(s)),
            r && o.one(t.support.animation.end, i).addClass('animated owl-animated-in').addClass(r)))
      }),
      (e.prototype.clear = function (e) {
        t(e.target).css({ left: '' }).removeClass('animated owl-animated-out owl-animated-in').removeClass(this.core.settings.animateIn).removeClass(this.core.settings.animateOut),
          this.core.onTransitionEnd()
      }),
      (e.prototype.destroy = function () {
        var t, e
        for (t in this.handlers) this.core.$element.off(t, this.handlers[t])
        for (e in Object.getOwnPropertyNames(this)) 'function' != typeof this[e] && (this[e] = null)
      }),
      (t.fn.owlCarousel.Constructor.Plugins.Animate = e)
  })(window.Zepto || window.jQuery, (window, document)),
  (function (t, e, i) {
    var n = function (e) {
      ;(this._core = e),
        (this._timeout = null),
        (this._paused = !1),
        (this._handlers = {
          'changed.owl.carousel': t.proxy(function (t) {
            t.namespace && 'settings' === t.property.name
              ? this._core.settings.autoplay
                ? this.play()
                : this.stop()
              : t.namespace && 'position' === t.property.name && this._core.settings.autoplay && this._setAutoPlayInterval()
          }, this),
          'initialized.owl.carousel': t.proxy(function (t) {
            t.namespace && this._core.settings.autoplay && this.play()
          }, this),
          'play.owl.autoplay': t.proxy(function (t, e, i) {
            t.namespace && this.play(e, i)
          }, this),
          'stop.owl.autoplay': t.proxy(function (t) {
            t.namespace && this.stop()
          }, this),
          'mouseover.owl.autoplay': t.proxy(function () {
            this._core.settings.autoplayHoverPause && this._core.is('rotating') && this.pause()
          }, this),
          'mouseleave.owl.autoplay': t.proxy(function () {
            this._core.settings.autoplayHoverPause && this._core.is('rotating') && this.play()
          }, this),
          'touchstart.owl.core': t.proxy(function () {
            this._core.settings.autoplayHoverPause && this._core.is('rotating') && this.pause()
          }, this),
          'touchend.owl.core': t.proxy(function () {
            this._core.settings.autoplayHoverPause && this.play()
          }, this)
        }),
        this._core.$element.on(this._handlers),
        (this._core.options = t.extend({}, n.Defaults, this._core.options))
    }
    ;(n.Defaults = { autoplay: !1, autoplayTimeout: 5e3, autoplayHoverPause: !1, autoplaySpeed: !1 }),
      (n.prototype.play = function (t, e) {
        ;(this._paused = !1), this._core.is('rotating') || (this._core.enter('rotating'), this._setAutoPlayInterval())
      }),
      (n.prototype._getNextTimeout = function (n, o) {
        return (
          this._timeout && e.clearTimeout(this._timeout),
          e.setTimeout(
            t.proxy(function () {
              this._paused || this._core.is('busy') || this._core.is('interacting') || i.hidden || this._core.next(o || this._core.settings.autoplaySpeed)
            }, this),
            n || this._core.settings.autoplayTimeout
          )
        )
      }),
      (n.prototype._setAutoPlayInterval = function () {
        this._timeout = this._getNextTimeout()
      }),
      (n.prototype.stop = function () {
        this._core.is('rotating') && (e.clearTimeout(this._timeout), this._core.leave('rotating'))
      }),
      (n.prototype.pause = function () {
        this._core.is('rotating') && (this._paused = !0)
      }),
      (n.prototype.destroy = function () {
        var t, e
        for (t in (this.stop(), this._handlers)) this._core.$element.off(t, this._handlers[t])
        for (e in Object.getOwnPropertyNames(this)) 'function' != typeof this[e] && (this[e] = null)
      }),
      (t.fn.owlCarousel.Constructor.Plugins.autoplay = n)
  })(window.Zepto || window.jQuery, window, document),
  (function (t) {
    'use strict'
    var e = function (i) {
      ;(this._core = i),
        (this._initialized = !1),
        (this._pages = []),
        (this._controls = {}),
        (this._templates = []),
        (this.$element = this._core.$element),
        (this._overrides = { next: this._core.next, prev: this._core.prev, to: this._core.to }),
        (this._handlers = {
          'prepared.owl.carousel': t.proxy(function (e) {
            e.namespace &&
              this._core.settings.dotsData &&
              this._templates.push('<div class="' + this._core.settings.dotClass + '">' + t(e.content).find('[data-dot]').addBack('[data-dot]').attr('data-dot') + '</div>')
          }, this),
          'added.owl.carousel': t.proxy(function (t) {
            t.namespace && this._core.settings.dotsData && this._templates.splice(t.position, 0, this._templates.pop())
          }, this),
          'remove.owl.carousel': t.proxy(function (t) {
            t.namespace && this._core.settings.dotsData && this._templates.splice(t.position, 1)
          }, this),
          'changed.owl.carousel': t.proxy(function (t) {
            t.namespace && 'position' == t.property.name && this.draw()
          }, this),
          'initialized.owl.carousel': t.proxy(function (t) {
            t.namespace &&
              !this._initialized &&
              (this._core.trigger('initialize', null, 'navigation'),
              this.initialize(),
              this.update(),
              this.draw(),
              (this._initialized = !0),
              this._core.trigger('initialized', null, 'navigation'))
          }, this),
          'refreshed.owl.carousel': t.proxy(function (t) {
            t.namespace && this._initialized && (this._core.trigger('refresh', null, 'navigation'), this.update(), this.draw(), this._core.trigger('refreshed', null, 'navigation'))
          }, this)
        }),
        (this._core.options = t.extend({}, e.Defaults, this._core.options)),
        this.$element.on(this._handlers)
    }
    ;(e.Defaults = {
      nav: !1,
      navText: ['prev', 'next'],
      navSpeed: !1,
      navElement: 'div',
      navContainer: !1,
      navContainerClass: 'owl-nav',
      navClass: ['owl-prev', 'owl-next'],
      slideBy: 1,
      dotClass: 'custom-dot',
      dotsClass: 'owl-dots',
      dots: !0,
      dotsEach: !1,
      dotsData: !1,
      dotsSpeed: !1,
      dotsContainer: !1
    }),
      (e.prototype.initialize = function () {
        var e,
          i = this._core.settings
        for (e in ((this._controls.$relative = (i.navContainer ? t(i.navContainer) : t('<div>').addClass(i.navContainerClass).appendTo(this.$element)).addClass('disabled')),
        (this._controls.$previous = t('<' + i.navElement + '>')
          .addClass(i.navClass[0])
          .html(i.navText[0])
          .prependTo(this._controls.$relative)
          .on(
            'click',
            t.proxy(function (t) {
              this.prev(i.navSpeed)
            }, this)
          )),
        (this._controls.$next = t('<' + i.navElement + '>')
          .addClass(i.navClass[1])
          .html(i.navText[1])
          .appendTo(this._controls.$relative)
          .on(
            'click',
            t.proxy(function (t) {
              this.next(i.navSpeed)
            }, this)
          )),
        i.dotsData || (this._templates = [t('<div>').addClass(i.dotClass).append(t('<span>')).prop('outerHTML')]),
        (this._controls.$absolute = (i.dotsContainer ? t(i.dotsContainer) : t('<div>').addClass(i.dotsClass).appendTo(this.$element)).addClass('disabled')),
        this._controls.$absolute.on(
          'click',
          'div',
          t.proxy(function (e) {
            var n = t(e.target).parent().is(this._controls.$absolute) ? t(e.target).index() : t(e.target).parent().index()
            e.preventDefault(), this.to(n, i.dotsSpeed)
          }, this)
        ),
        this._overrides))
          this._core[e] = t.proxy(this[e], this)
      }),
      (e.prototype.destroy = function () {
        var t, e, i, n
        for (t in this._handlers) this.$element.off(t, this._handlers[t])
        for (e in this._controls) this._controls[e].remove()
        for (n in this.overides) this._core[n] = this._overrides[n]
        for (i in Object.getOwnPropertyNames(this)) 'function' != typeof this[i] && (this[i] = null)
      }),
      (e.prototype.update = function () {
        var t,
          e,
          i = this._core.clones().length / 2,
          n = i + this._core.items().length,
          o = this._core.maximum(!0),
          r = this._core.settings,
          s = r.center || r.autoWidth || r.dotsData ? 1 : r.dotsEach || r.items
        if (('page' !== r.slideBy && (r.slideBy = Math.min(r.slideBy, r.items)), r.dots || 'page' == r.slideBy))
          for (this._pages = [], t = i, e = 0; t < n; t++) {
            if (s <= e || 0 === e) {
              if ((this._pages.push({ start: Math.min(o, t - i), end: t - i + s - 1 }), Math.min(o, t - i) === o)) break
              e = 0
            }
            e += this._core.mergers(this._core.relative(t))
          }
      }),
      (e.prototype.draw = function () {
        var e,
          i = this._core.settings,
          n = this._core.items().length <= i.items,
          o = this._core.relative(this._core.current()),
          r = i.loop || i.rewind
        this._controls.$relative.toggleClass('disabled', !i.nav || n),
          i.nav &&
            (this._controls.$previous.toggleClass('disabled', !r && o <= this._core.minimum(!0)), this._controls.$next.toggleClass('disabled', !r && o >= this._core.maximum(!0))),
          this._controls.$absolute.toggleClass('disabled', !i.dots || n),
          i.dots &&
            ((e = this._pages.length - this._controls.$absolute.children().length),
            i.dotsData && 0 != e
              ? this._controls.$absolute.html(this._templates.join(''))
              : 0 < e
              ? this._controls.$absolute.append(new Array(1 + e).join(this._templates[0]))
              : e < 0 && this._controls.$absolute.children().slice(e).remove(),
            this._controls.$absolute.find('.active').removeClass('active'),
            this._controls.$absolute.children().eq(t.inArray(this.current(), this._pages)).addClass('active'))
      }),
      (e.prototype.onTrigger = function (e) {
        var i = this._core.settings
        e.page = { index: t.inArray(this.current(), this._pages), count: this._pages.length, size: i && (i.center || i.autoWidth || i.dotsData ? 1 : i.dotsEach || i.items) }
      }),
      (e.prototype.current = function () {
        var e = this._core.relative(this._core.current())
        return t
          .grep(
            this._pages,
            t.proxy(function (t, i) {
              return t.start <= e && t.end >= e
            }, this)
          )
          .pop()
      }),
      (e.prototype.getPosition = function (e) {
        var i,
          n,
          o = this._core.settings
        return (
          'page' == o.slideBy
            ? ((i = t.inArray(this.current(), this._pages)), (n = this._pages.length), e ? ++i : --i, (i = this._pages[((i % n) + n) % n].start))
            : ((i = this._core.relative(this._core.current())), (n = this._core.items().length), e ? (i += o.slideBy) : (i -= o.slideBy)),
          i
        )
      }),
      (e.prototype.next = function (e) {
        t.proxy(this._overrides.to, this._core)(this.getPosition(!0), e)
      }),
      (e.prototype.prev = function (e) {
        t.proxy(this._overrides.to, this._core)(this.getPosition(!1), e)
      }),
      (e.prototype.to = function (e, i, n) {
        var o
        !n && this._pages.length
          ? ((o = this._pages.length), t.proxy(this._overrides.to, this._core)(this._pages[((e % o) + o) % o].start, i))
          : t.proxy(this._overrides.to, this._core)(e, i)
      }),
      (t.fn.owlCarousel.Constructor.Plugins.Navigation = e)
  })(window.Zepto || window.jQuery, (window, document)),
  (function (t, e) {
    'use strict'
    var i = function (n) {
      ;(this._core = n),
        (this._hashes = {}),
        (this.$element = this._core.$element),
        (this._handlers = {
          'initialized.owl.carousel': t.proxy(function (i) {
            i.namespace && 'URLHash' === this._core.settings.startPosition && t(e).trigger('hashchange.owl.navigation')
          }, this),
          'prepared.owl.carousel': t.proxy(function (e) {
            if (e.namespace) {
              var i = t(e.content).find('[data-hash]').addBack('[data-hash]').attr('data-hash')
              if (!i) return
              this._hashes[i] = e.content
            }
          }, this),
          'changed.owl.carousel': t.proxy(function (i) {
            if (i.namespace && 'position' === i.property.name) {
              var n = this._core.items(this._core.relative(this._core.current())),
                o = t
                  .map(this._hashes, function (t, e) {
                    return t === n ? e : null
                  })
                  .join()
              if (!o || e.location.hash.slice(1) === o) return
              e.location.hash = o
            }
          }, this)
        }),
        (this._core.options = t.extend({}, i.Defaults, this._core.options)),
        this.$element.on(this._handlers),
        t(e).on(
          'hashchange.owl.navigation',
          t.proxy(function (t) {
            var i = e.location.hash.substring(1),
              n = this._core.$stage.children(),
              o = this._hashes[i] && n.index(this._hashes[i])
            void 0 !== o && o !== this._core.current() && this._core.to(this._core.relative(o), !1, !0)
          }, this)
        )
    }
    ;(i.Defaults = { URLhashListener: !1 }),
      (i.prototype.destroy = function () {
        var i, n
        for (i in (t(e).off('hashchange.owl.navigation'), this._handlers)) this._core.$element.off(i, this._handlers[i])
        for (n in Object.getOwnPropertyNames(this)) 'function' != typeof this[n] && (this[n] = null)
      }),
      (t.fn.owlCarousel.Constructor.Plugins.Hash = i)
  })(window.Zepto || window.jQuery, window, document),
  (function (t, e) {
    var i = t('<support>').get(0).style,
      n = 'Webkit Moz O ms'.split(' '),
      o = {
        transition: { end: { WebkitTransition: 'webkitTransitionEnd', MozTransition: 'transitionend', OTransition: 'oTransitionEnd', transition: 'transitionend' } },
        animation: { end: { WebkitAnimation: 'webkitAnimationEnd', MozAnimation: 'animationend', OAnimation: 'oAnimationEnd', animation: 'animationend' } }
      }
    function r(o, r) {
      var s = !1,
        a = o.charAt(0).toUpperCase() + o.slice(1)
      return (
        t.each((o + ' ' + n.join(a + ' ') + a).split(' '), function (t, n) {
          if (i[n] !== e) return (s = !r || n), !1
        }),
        s
      )
    }
    function s(t) {
      return r(t, !0)
    }
    r('transition') && ((t.support.transition = new String(s('transition'))), (t.support.transition.end = o.transition.end[t.support.transition])),
      r('animation') && ((t.support.animation = new String(s('animation'))), (t.support.animation.end = o.animation.end[t.support.animation])),
      r('transform') && ((t.support.transform = new String(s('transform'))), (t.support.transform3d = !!r('perspective')))
  })(window.Zepto || window.jQuery, (window, void document)),
  (function (t) {
    'use strict'
    t.fn.counterUp = function (e) {
      var i = t.extend({ time: 400, delay: 10 }, e)
      return this.each(function () {
        var e = t(this),
          n = i
        e.waypoint(
          function () {
            for (
              var t = [],
                i = n.time / n.delay,
                o = e.text(),
                r = /[0-9]+,[0-9]+/.test(o),
                s = ((o = o.replace(/,/g, '')), /^[0-9]+$/.test(o), /^[0-9]+.[0-9]+$/.test(o)),
                a = s ? (o.split('.')[1] || []).length : 0,
                l = i;
              1 <= l;
              l--
            ) {
              var c = parseInt((o / i) * l)
              if ((s && (c = parseFloat((o / i) * l).toFixed(a)), r)) for (; /(d+)(d{3})/.test(c.toString()); ) c = c.toString().replace(/(d+)(d{3})/, '$1,$2')
              t.unshift(c)
            }
            e.data('counterup-nums', t),
              e.text('0'),
              e.data('counterup-func', function () {
                e.text(e.data('counterup-nums').shift()),
                  e.data('counterup-nums').length
                    ? setTimeout(e.data('counterup-func'), n.delay)
                    : (e.data('counterup-nums'), e.data('counterup-nums', null), e.data('counterup-func', null))
              }),
              setTimeout(e.data('counterup-func'), n.delay),
              this.destroy()
          },
          { offset: '100%' }
        )
      })
    }
  })(jQuery),
  (function (t, e, i, n) {
    var o = 'stellar',
      r = {
        scrollProperty: 'scroll',
        positionProperty: 'position',
        horizontalScrolling: !0,
        verticalScrolling: !0,
        horizontalOffset: 0,
        verticalOffset: 0,
        responsive: !1,
        parallaxBackgrounds: !0,
        parallaxElements: !0,
        hideDistantElements: !0,
        hideElement: function (t) {
          t.hide()
        },
        showElement: function (t) {
          t.show()
        }
      },
      s = {
        scroll: {
          getLeft: function (t) {
            return t.scrollLeft()
          },
          setLeft: function (t, e) {
            t.scrollLeft(e)
          },
          getTop: function (t) {
            return t.scrollTop()
          },
          setTop: function (t, e) {
            t.scrollTop(e)
          }
        },
        position: {
          getLeft: function (t) {
            return -1 * parseInt(t.css('left'), 10)
          },
          getTop: function (t) {
            return -1 * parseInt(t.css('top'), 10)
          }
        },
        margin: {
          getLeft: function (t) {
            return -1 * parseInt(t.css('margin-left'), 10)
          },
          getTop: function (t) {
            return -1 * parseInt(t.css('margin-top'), 10)
          }
        },
        transform: {
          getLeft: function (t) {
            var e = getComputedStyle(t[0])[l]
            return 'none' !== e ? -1 * parseInt(e.match(/(-?[0-9]+)/g)[4], 10) : 0
          },
          getTop: function (t) {
            var e = getComputedStyle(t[0])[l]
            return 'none' !== e ? -1 * parseInt(e.match(/(-?[0-9]+)/g)[5], 10) : 0
          }
        }
      },
      a = {
        position: {
          setLeft: function (t, e) {
            t.css('left', e)
          },
          setTop: function (t, e) {
            t.css('top', e)
          }
        },
        transform: {
          setPosition: function (t, e, i, n, o) {
            t[0].style[l] = 'translate3d(' + (e - i) + 'px, ' + (n - o) + 'px, 0)'
          }
        }
      },
      l = (function () {
        var e,
          i = /^(Moz|Webkit|Khtml|O|ms|Icab)(?=[A-Z])/,
          n = t('script')[0].style,
          o = ''
        for (e in n)
          if (i.test(e)) {
            o = e.match(i)[0]
            break
          }
        return (
          'WebkitOpacity' in n && (o = 'Webkit'),
          'KhtmlOpacity' in n && (o = 'Khtml'),
          function (t) {
            return o + (0 < o.length ? t.charAt(0).toUpperCase() + t.slice(1) : t)
          }
        )
      })()('transform'),
      c = t('<div />', { style: 'background:#fff' }).css('background-position-x') !== n,
      u = c
        ? function (t, e, i) {
            t.css({ 'background-position-x': e, 'background-position-y': i })
          }
        : function (t, e, i) {
            t.css('background-position', e + ' ' + i)
          },
      d = c
        ? function (t) {
            return [t.css('background-position-x'), t.css('background-position-y')]
          }
        : function (t) {
            return t.css('background-position').split(' ')
          },
      h =
        e.requestAnimationFrame ||
        e.webkitRequestAnimationFrame ||
        e.mozRequestAnimationFrame ||
        e.oRequestAnimationFrame ||
        e.msRequestAnimationFrame ||
        function (t) {
          setTimeout(t, 1e3 / 60)
        }
    function f(e, i) {
      ;(this.element = e), (this.options = t.extend({}, r, i)), (this._defaults = r), (this._name = o), this.init()
    }
    ;(f.prototype = {
      init: function () {
        ;(this.options.name = o + '_' + Math.floor(1e9 * Math.random())),
          this._defineElements(),
          this._defineGetters(),
          this._defineSetters(),
          this._handleWindowLoadAndResize(),
          this._detectViewport(),
          this.refresh({ firstLoad: !0 }),
          'scroll' === this.options.scrollProperty ? this._handleScrollEvent() : this._startAnimationLoop()
      },
      _defineElements: function () {
        this.element === i.body && (this.element = e),
          (this.$scrollElement = t(this.element)),
          (this.$element = this.element === e ? t('body') : this.$scrollElement),
          (this.$viewportElement =
            this.options.viewportElement !== n
              ? t(this.options.viewportElement)
              : this.$scrollElement[0] === e || 'scroll' === this.options.scrollProperty
              ? this.$scrollElement
              : this.$scrollElement.parent())
      },
      _defineGetters: function () {
        var t = this,
          e = s[t.options.scrollProperty]
        ;(this._getScrollLeft = function () {
          return e.getLeft(t.$scrollElement)
        }),
          (this._getScrollTop = function () {
            return e.getTop(t.$scrollElement)
          })
      },
      _defineSetters: function () {
        var e = this,
          i = s[e.options.scrollProperty],
          n = a[e.options.positionProperty],
          o = i.setLeft,
          r = i.setTop
        ;(this._setScrollLeft =
          'function' == typeof o
            ? function (t) {
                o(e.$scrollElement, t)
              }
            : t.noop),
          (this._setScrollTop =
            'function' == typeof r
              ? function (t) {
                  r(e.$scrollElement, t)
                }
              : t.noop),
          (this._setPosition =
            n.setPosition ||
            function (t, i, o, r, s) {
              e.options.horizontalScrolling && n.setLeft(t, i, o), e.options.verticalScrolling && n.setTop(t, r, s)
            })
      },
      _handleWindowLoadAndResize: function () {
        var i = this,
          n = t(e)
        i.options.responsive &&
          n.bind('load.' + this.name, function () {
            i.refresh()
          }),
          n.bind('resize.' + this.name, function () {
            i._detectViewport(), i.options.responsive && i.refresh()
          })
      },
      refresh: function (i) {
        var n = this,
          o = n._getScrollLeft(),
          r = n._getScrollTop()
        ;(i && i.firstLoad) || this._reset(),
          this._setScrollLeft(0),
          this._setScrollTop(0),
          this._setOffsets(),
          this._findParticles(),
          this._findBackgrounds(),
          i &&
            i.firstLoad &&
            /WebKit/.test(navigator.userAgent) &&
            t(e).on('load', function () {
              var t = n._getScrollLeft(),
                e = n._getScrollTop()
              n._setScrollLeft(t + 1), n._setScrollTop(e + 1), n._setScrollLeft(t), n._setScrollTop(e)
            }),
          this._setScrollLeft(o),
          this._setScrollTop(r)
      },
      _detectViewport: function () {
        var t = { left: this.$viewportElement.scrollLeft(), top: this.$viewportElement.scrollTop() },
          e = null !== t && t !== n
        ;(this.viewportWidth = this.$viewportElement.width()),
          (this.viewportHeight = this.$viewportElement.height()),
          (this.viewportOffsetTop = e ? t.top : 0),
          (this.viewportOffsetLeft = e ? t.left : 0)
      },
      _findParticles: function () {
        var e = this
        if ((this._getScrollLeft(), this._getScrollTop(), this.particles !== n))
          for (var i = this.particles.length - 1; 0 <= i; i--) this.particles[i].$element.data('stellar-elementIsActive', n)
        ;(this.particles = []),
          this.options.parallaxElements &&
            this.$element.find('[data-stellar-ratio]').each(function (i) {
              var o,
                r,
                s,
                a,
                l,
                c,
                u,
                d,
                h,
                f = t(this),
                p = 0,
                g = 0,
                m = 0,
                v = 0
              if (f.data('stellar-elementIsActive')) {
                if (f.data('stellar-elementIsActive') !== this) return
              } else f.data('stellar-elementIsActive', this)
              e.options.showElement(f),
                f.data('stellar-startingLeft')
                  ? (f.css('left', f.data('stellar-startingLeft')), f.css('top', f.data('stellar-startingTop')))
                  : (f.data('stellar-startingLeft', f.css('left')), f.data('stellar-startingTop', f.css('top'))),
                (s = f.position().left),
                (a = f.position().top),
                (l = 'auto' === f.css('margin-left') ? 0 : parseInt(f.css('margin-left'), 10)),
                (c = 'auto' === f.css('margin-top') ? 0 : parseInt(f.css('margin-top'), 10)),
                (d = f.offset().left - l),
                (h = f.offset().top - c),
                f.parents().each(function () {
                  var e = t(this)
                  if (!0 === e.data('stellar-offset-parent')) return (p = m), (g = v), (u = e), !1
                  ;(m += e.position().left), (v += e.position().top)
                }),
                (o =
                  f.data('stellar-horizontal-offset') !== n
                    ? f.data('stellar-horizontal-offset')
                    : u !== n && u.data('stellar-horizontal-offset') !== n
                    ? u.data('stellar-horizontal-offset')
                    : e.horizontalOffset),
                (r =
                  f.data('stellar-vertical-offset') !== n
                    ? f.data('stellar-vertical-offset')
                    : u !== n && u.data('stellar-vertical-offset') !== n
                    ? u.data('stellar-vertical-offset')
                    : e.verticalOffset),
                e.particles.push({
                  $element: f,
                  $offsetParent: u,
                  isFixed: 'fixed' === f.css('position'),
                  horizontalOffset: o,
                  verticalOffset: r,
                  startingPositionLeft: s,
                  startingPositionTop: a,
                  startingOffsetLeft: d,
                  startingOffsetTop: h,
                  parentOffsetLeft: p,
                  parentOffsetTop: g,
                  stellarRatio: f.data('stellar-ratio') !== n ? f.data('stellar-ratio') : 1,
                  width: f.outerWidth(!0),
                  height: f.outerHeight(!0),
                  isHidden: !1
                })
            })
      },
      _findBackgrounds: function () {
        var e,
          i = this,
          o = this._getScrollLeft(),
          r = this._getScrollTop()
        ;(this.backgrounds = []),
          this.options.parallaxBackgrounds &&
            ((e = this.$element.find('[data-stellar-background-ratio]')),
            this.$element.data('stellar-background-ratio') && (e = e.add(this.$element)),
            e.each(function () {
              var e,
                s,
                a,
                l,
                c,
                h,
                f,
                p = t(this),
                g = d(p),
                m = 0,
                v = 0,
                y = 0,
                b = 0
              if (p.data('stellar-backgroundIsActive')) {
                if (p.data('stellar-backgroundIsActive') !== this) return
              } else p.data('stellar-backgroundIsActive', this)
              p.data('stellar-backgroundStartingLeft')
                ? u(p, p.data('stellar-backgroundStartingLeft'), p.data('stellar-backgroundStartingTop'))
                : (p.data('stellar-backgroundStartingLeft', g[0]), p.data('stellar-backgroundStartingTop', g[1])),
                (a = 'auto' === p.css('margin-left') ? 0 : parseInt(p.css('margin-left'), 10)),
                (l = 'auto' === p.css('margin-top') ? 0 : parseInt(p.css('margin-top'), 10)),
                (c = p.offset().left - a - o),
                (h = p.offset().top - l - r),
                p.parents().each(function () {
                  var e = t(this)
                  if (!0 === e.data('stellar-offset-parent')) return (m = y), (v = b), (f = e), !1
                  ;(y += e.position().left), (b += e.position().top)
                }),
                (e =
                  p.data('stellar-horizontal-offset') !== n
                    ? p.data('stellar-horizontal-offset')
                    : f !== n && f.data('stellar-horizontal-offset') !== n
                    ? f.data('stellar-horizontal-offset')
                    : i.horizontalOffset),
                (s =
                  p.data('stellar-vertical-offset') !== n
                    ? p.data('stellar-vertical-offset')
                    : f !== n && f.data('stellar-vertical-offset') !== n
                    ? f.data('stellar-vertical-offset')
                    : i.verticalOffset),
                i.backgrounds.push({
                  $element: p,
                  $offsetParent: f,
                  isFixed: 'fixed' === p.css('background-attachment'),
                  horizontalOffset: e,
                  verticalOffset: s,
                  startingValueLeft: g[0],
                  startingValueTop: g[1],
                  startingBackgroundPositionLeft: isNaN(parseInt(g[0], 10)) ? 0 : parseInt(g[0], 10),
                  startingBackgroundPositionTop: isNaN(parseInt(g[1], 10)) ? 0 : parseInt(g[1], 10),
                  startingPositionLeft: p.position().left,
                  startingPositionTop: p.position().top,
                  startingOffsetLeft: c,
                  startingOffsetTop: h,
                  parentOffsetLeft: m,
                  parentOffsetTop: v,
                  stellarRatio: p.data('stellar-background-ratio') === n ? 1 : p.data('stellar-background-ratio')
                })
            }))
      },
      _reset: function () {
        for (var t, e, i, n, o = this.particles.length - 1; 0 <= o; o--)
          (e = (t = this.particles[o]).$element.data('stellar-startingLeft')),
            (i = t.$element.data('stellar-startingTop')),
            this._setPosition(t.$element, e, e, i, i),
            this.options.showElement(t.$element),
            t.$element.data('stellar-startingLeft', null).data('stellar-elementIsActive', null).data('stellar-backgroundIsActive', null)
        for (o = this.backgrounds.length - 1; 0 <= o; o--)
          (n = this.backgrounds[o]).$element.data('stellar-backgroundStartingLeft', null).data('stellar-backgroundStartingTop', null),
            u(n.$element, n.startingValueLeft, n.startingValueTop)
      },
      destroy: function () {
        this._reset(),
          this.$scrollElement.unbind('resize.' + this.name).unbind('scroll.' + this.name),
          (this._animationLoop = t.noop),
          t(e)
            .unbind('load.' + this.name)
            .unbind('resize.' + this.name)
      },
      _setOffsets: function () {
        var i = this,
          n = t(e)
        n.unbind('resize.horizontal-' + this.name).unbind('resize.vertical-' + this.name),
          'function' == typeof this.options.horizontalOffset
            ? ((this.horizontalOffset = this.options.horizontalOffset()),
              n.bind('resize.horizontal-' + this.name, function () {
                i.horizontalOffset = i.options.horizontalOffset()
              }))
            : (this.horizontalOffset = this.options.horizontalOffset),
          'function' == typeof this.options.verticalOffset
            ? ((this.verticalOffset = this.options.verticalOffset()),
              n.bind('resize.vertical-' + this.name, function () {
                i.verticalOffset = i.options.verticalOffset()
              }))
            : (this.verticalOffset = this.options.verticalOffset)
      },
      _repositionElements: function () {
        var t,
          e,
          i,
          n,
          o,
          r,
          s,
          a,
          l,
          c,
          d = this._getScrollLeft(),
          h = this._getScrollTop(),
          f = !0,
          p = !0
        if (this.currentScrollLeft !== d || this.currentScrollTop !== h || this.currentWidth !== this.viewportWidth || this.currentHeight !== this.viewportHeight) {
          for (
            this.currentScrollLeft = d, this.currentScrollTop = h, this.currentWidth = this.viewportWidth, this.currentHeight = this.viewportHeight, c = this.particles.length - 1;
            0 <= c;
            c--
          )
            (e = (t = this.particles[c]).isFixed ? 1 : 0),
              (a = this.options.horizontalScrolling
                ? (r =
                    (d + t.horizontalOffset + this.viewportOffsetLeft + t.startingPositionLeft - t.startingOffsetLeft + t.parentOffsetLeft) * -(t.stellarRatio + e - 1) +
                    t.startingPositionLeft) -
                  t.startingPositionLeft +
                  t.startingOffsetLeft
                : ((r = t.startingPositionLeft), t.startingOffsetLeft)),
              (l = this.options.verticalScrolling
                ? (s =
                    (h + t.verticalOffset + this.viewportOffsetTop + t.startingPositionTop - t.startingOffsetTop + t.parentOffsetTop) * -(t.stellarRatio + e - 1) +
                    t.startingPositionTop) -
                  t.startingPositionTop +
                  t.startingOffsetTop
                : ((s = t.startingPositionTop), t.startingOffsetTop)),
              this.options.hideDistantElements &&
                ((p = !this.options.horizontalScrolling || (a + t.width > (t.isFixed ? 0 : d) && a < (t.isFixed ? 0 : d) + this.viewportWidth + this.viewportOffsetLeft)),
                (f = !this.options.verticalScrolling || (l + t.height > (t.isFixed ? 0 : h) && l < (t.isFixed ? 0 : h) + this.viewportHeight + this.viewportOffsetTop))),
              p && f
                ? (t.isHidden && (this.options.showElement(t.$element), (t.isHidden = !1)), this._setPosition(t.$element, r, t.startingPositionLeft, s, t.startingPositionTop))
                : t.isHidden || (this.options.hideElement(t.$element), (t.isHidden = !0))
          for (c = this.backgrounds.length - 1; 0 <= c; c--)
            (e = (i = this.backgrounds[c]).isFixed ? 0 : 1),
              (n = this.options.horizontalScrolling
                ? (d + i.horizontalOffset - this.viewportOffsetLeft - i.startingOffsetLeft + i.parentOffsetLeft - i.startingBackgroundPositionLeft) * (e - i.stellarRatio) + 'px'
                : i.startingValueLeft),
              (o = this.options.verticalScrolling
                ? (h + i.verticalOffset - this.viewportOffsetTop - i.startingOffsetTop + i.parentOffsetTop - i.startingBackgroundPositionTop) * (e - i.stellarRatio) + 'px'
                : i.startingValueTop),
              u(i.$element, n, o)
        }
      },
      _handleScrollEvent: function () {
        function t() {
          i._repositionElements(), (n = !1)
        }
        function e() {
          n || (h(t), (n = !0))
        }
        var i = this,
          n = !1
        this.$scrollElement.bind('scroll.' + this.name, e), e()
      },
      _startAnimationLoop: function () {
        var t = this
        ;(this._animationLoop = function () {
          h(t._animationLoop), t._repositionElements()
        }),
          this._animationLoop()
      }
    }),
      (t.fn[o] = function (e) {
        var i = arguments
        return e === n || 'object' == typeof e
          ? this.each(function () {
              t.data(this, 'plugin_' + o) || t.data(this, 'plugin_' + o, new f(this, e))
            })
          : 'string' == typeof e && '_' !== e[0] && 'init' !== e
          ? this.each(function () {
              var n = t.data(this, 'plugin_' + o)
              n instanceof f && 'function' == typeof n[e] && n[e].apply(n, Array.prototype.slice.call(i, 1)), 'destroy' === e && t.data(this, 'plugin_' + o, null)
            })
          : void 0
      }),
      (t[o] = function (i) {
        var n = t(e)
        return n.stellar.apply(n, Array.prototype.slice.call(arguments, 0))
      }),
      (t[o].scrollProperty = s),
      (t[o].positionProperty = a),
      (e.Stellar = f)
  })(jQuery, this, document),
  (function () {
    'use strict'
    function t(n) {
      if (!n) throw new Error('No options passed to Waypoint constructor')
      if (!n.element) throw new Error('No element option passed to Waypoint constructor')
      if (!n.handler) throw new Error('No handler option passed to Waypoint constructor')
      ;(this.key = 'waypoint-' + e),
        (this.options = t.Adapter.extend({}, t.defaults, n)),
        (this.element = this.options.element),
        (this.adapter = new t.Adapter(this.element)),
        (this.callback = n.handler),
        (this.axis = this.options.horizontal ? 'horizontal' : 'vertical'),
        (this.enabled = this.options.enabled),
        (this.triggerPoint = null),
        (this.group = t.Group.findOrCreate({ name: this.options.group, axis: this.axis })),
        (this.context = t.Context.findOrCreateByElement(this.options.context)),
        t.offsetAliases[this.options.offset] && (this.options.offset = t.offsetAliases[this.options.offset]),
        this.group.add(this),
        this.context.add(this),
        (i[this.key] = this),
        (e += 1)
    }
    var e = 0,
      i = {}
    ;(t.prototype.queueTrigger = function (t) {
      this.group.queueTrigger(this, t)
    }),
      (t.prototype.trigger = function (t) {
        this.enabled && this.callback && this.callback.apply(this, t)
      }),
      (t.prototype.destroy = function () {
        this.context.remove(this), this.group.remove(this), delete i[this.key]
      }),
      (t.prototype.disable = function () {
        return (this.enabled = !1), this
      }),
      (t.prototype.enable = function () {
        return this.context.refresh(), (this.enabled = !0), this
      }),
      (t.prototype.next = function () {
        return this.group.next(this)
      }),
      (t.prototype.previous = function () {
        return this.group.previous(this)
      }),
      (t.invokeAll = function (t) {
        var e = []
        for (var n in i) e.push(i[n])
        for (var o = 0, r = e.length; o < r; o++) e[o][t]()
      }),
      (t.destroyAll = function () {
        t.invokeAll('destroy')
      }),
      (t.disableAll = function () {
        t.invokeAll('disable')
      }),
      (t.enableAll = function () {
        for (var e in (t.Context.refreshAll(), i)) i[e].enabled = !0
        return this
      }),
      (t.refreshAll = function () {
        t.Context.refreshAll()
      }),
      (t.viewportHeight = function () {
        return window.innerHeight || document.documentElement.clientHeight
      }),
      (t.viewportWidth = function () {
        return document.documentElement.clientWidth
      }),
      (t.adapters = []),
      (t.defaults = { context: window, continuous: !0, enabled: !0, group: 'default', horizontal: !1, offset: 0 }),
      (t.offsetAliases = {
        'bottom-in-view': function () {
          return this.context.innerHeight() - this.adapter.outerHeight()
        },
        'right-in-view': function () {
          return this.context.innerWidth() - this.adapter.outerWidth()
        }
      }),
      (window.Waypoint = t)
  })(),
  (function () {
    'use strict'
    function t(t) {
      window.setTimeout(t, 1e3 / 60)
    }
    function e(t) {
      ;(this.element = t),
        (this.Adapter = o.Adapter),
        (this.adapter = new this.Adapter(t)),
        (this.key = 'waypoint-context-' + i),
        (this.didScroll = !1),
        (this.didResize = !1),
        (this.oldScroll = { x: this.adapter.scrollLeft(), y: this.adapter.scrollTop() }),
        (this.waypoints = { vertical: {}, horizontal: {} }),
        (t.waypointContextKey = this.key),
        (n[t.waypointContextKey] = this),
        (i += 1),
        o.windowContext || ((o.windowContext = !0), (o.windowContext = new e(window))),
        this.createThrottledScrollHandler(),
        this.createThrottledResizeHandler()
    }
    var i = 0,
      n = {},
      o = window.Waypoint,
      r = window.onload
    ;(e.prototype.add = function (t) {
      var e = t.options.horizontal ? 'horizontal' : 'vertical'
      ;(this.waypoints[e][t.key] = t), this.refresh()
    }),
      (e.prototype.checkEmpty = function () {
        var t = this.Adapter.isEmptyObject(this.waypoints.horizontal),
          e = this.Adapter.isEmptyObject(this.waypoints.vertical),
          i = this.element == this.element.window
        t && e && !i && (this.adapter.off('.waypoints'), delete n[this.key])
      }),
      (e.prototype.createThrottledResizeHandler = function () {
        function t() {
          e.handleResize(), (e.didResize = !1)
        }
        var e = this
        this.adapter.on('resize.waypoints', function () {
          e.didResize || ((e.didResize = !0), o.requestAnimationFrame(t))
        })
      }),
      (e.prototype.createThrottledScrollHandler = function () {
        function t() {
          e.handleScroll(), (e.didScroll = !1)
        }
        var e = this
        this.adapter.on('scroll.waypoints', function () {
          ;(e.didScroll && !o.isTouch) || ((e.didScroll = !0), o.requestAnimationFrame(t))
        })
      }),
      (e.prototype.handleResize = function () {
        o.Context.refreshAll()
      }),
      (e.prototype.handleScroll = function () {
        var t = {},
          e = {
            horizontal: { newScroll: this.adapter.scrollLeft(), oldScroll: this.oldScroll.x, forward: 'right', backward: 'left' },
            vertical: { newScroll: this.adapter.scrollTop(), oldScroll: this.oldScroll.y, forward: 'down', backward: 'up' }
          }
        for (var i in e) {
          var n = e[i],
            o = n.newScroll > n.oldScroll ? n.forward : n.backward
          for (var r in this.waypoints[i]) {
            var s,
              a,
              l = this.waypoints[i][r]
            null !== l.triggerPoint &&
              ((s = n.oldScroll < l.triggerPoint), (a = n.newScroll >= l.triggerPoint), ((s && a) || (!s && !a)) && (l.queueTrigger(o), (t[l.group.id] = l.group)))
          }
        }
        for (var c in t) t[c].flushTriggers()
        this.oldScroll = { x: e.horizontal.newScroll, y: e.vertical.newScroll }
      }),
      (e.prototype.innerHeight = function () {
        return this.element == this.element.window ? o.viewportHeight() : this.adapter.innerHeight()
      }),
      (e.prototype.remove = function (t) {
        delete this.waypoints[t.axis][t.key], this.checkEmpty()
      }),
      (e.prototype.innerWidth = function () {
        return this.element == this.element.window ? o.viewportWidth() : this.adapter.innerWidth()
      }),
      (e.prototype.destroy = function () {
        var t = []
        for (var e in this.waypoints) for (var i in this.waypoints[e]) t.push(this.waypoints[e][i])
        for (var n = 0, o = t.length; n < o; n++) t[n].destroy()
      }),
      (e.prototype.refresh = function () {
        var t,
          e = this.element == this.element.window,
          i = e ? void 0 : this.adapter.offset(),
          n = {}
        for (var r in (this.handleScroll(),
        (t = {
          horizontal: {
            contextOffset: e ? 0 : i.left,
            contextScroll: e ? 0 : this.oldScroll.x,
            contextDimension: this.innerWidth(),
            oldScroll: this.oldScroll.x,
            forward: 'right',
            backward: 'left',
            offsetProp: 'left'
          },
          vertical: {
            contextOffset: e ? 0 : i.top,
            contextScroll: e ? 0 : this.oldScroll.y,
            contextDimension: this.innerHeight(),
            oldScroll: this.oldScroll.y,
            forward: 'down',
            backward: 'up',
            offsetProp: 'top'
          }
        }))) {
          var s = t[r]
          for (var a in this.waypoints[r]) {
            var l,
              c,
              u,
              d,
              h = this.waypoints[r][a],
              f = h.options.offset,
              p = h.triggerPoint,
              g = 0,
              m = null == p
            h.element !== h.element.window && (g = h.adapter.offset()[s.offsetProp]),
              'function' == typeof f
                ? (f = f.apply(h))
                : 'string' == typeof f && ((f = parseFloat(f)), -1 < h.options.offset.indexOf('%') && (f = Math.ceil((s.contextDimension * f) / 100))),
              (l = s.contextScroll - s.contextOffset),
              (h.triggerPoint = Math.floor(g + l - f)),
              (c = p < s.oldScroll),
              (u = h.triggerPoint >= s.oldScroll),
              (d = !c && !u),
              !m && c && u
                ? (h.queueTrigger(s.backward), (n[h.group.id] = h.group))
                : ((!m && d) || (m && s.oldScroll >= h.triggerPoint)) && (h.queueTrigger(s.forward), (n[h.group.id] = h.group))
          }
        }
        return (
          o.requestAnimationFrame(function () {
            for (var t in n) n[t].flushTriggers()
          }),
          this
        )
      }),
      (e.findOrCreateByElement = function (t) {
        return e.findByElement(t) || new e(t)
      }),
      (e.refreshAll = function () {
        for (var t in n) n[t].refresh()
      }),
      (e.findByElement = function (t) {
        return n[t.waypointContextKey]
      }),
      (window.onload = function () {
        r && r(), e.refreshAll()
      }),
      (o.requestAnimationFrame = function (e) {
        ;(window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || t).call(window, e)
      }),
      (o.Context = e)
  })(),
  (function () {
    'use strict'
    function t(t, e) {
      return t.triggerPoint - e.triggerPoint
    }
    function e(t, e) {
      return e.triggerPoint - t.triggerPoint
    }
    function i(t) {
      ;(this.name = t.name), (this.axis = t.axis), (this.id = this.name + '-' + this.axis), (this.waypoints = []), this.clearTriggerQueues(), (n[this.axis][this.name] = this)
    }
    var n = { vertical: {}, horizontal: {} },
      o = window.Waypoint
    ;(i.prototype.add = function (t) {
      this.waypoints.push(t)
    }),
      (i.prototype.clearTriggerQueues = function () {
        this.triggerQueues = { up: [], down: [], left: [], right: [] }
      }),
      (i.prototype.flushTriggers = function () {
        for (var i in this.triggerQueues) {
          var n = this.triggerQueues[i],
            o = 'up' === i || 'left' === i
          n.sort(o ? e : t)
          for (var r = 0, s = n.length; r < s; r += 1) {
            var a = n[r]
            ;(!a.options.continuous && r !== n.length - 1) || a.trigger([i])
          }
        }
        this.clearTriggerQueues()
      }),
      (i.prototype.next = function (e) {
        this.waypoints.sort(t)
        var i = o.Adapter.inArray(e, this.waypoints)
        return i === this.waypoints.length - 1 ? null : this.waypoints[i + 1]
      }),
      (i.prototype.previous = function (e) {
        this.waypoints.sort(t)
        var i = o.Adapter.inArray(e, this.waypoints)
        return i ? this.waypoints[i - 1] : null
      }),
      (i.prototype.queueTrigger = function (t, e) {
        this.triggerQueues[e].push(t)
      }),
      (i.prototype.remove = function (t) {
        var e = o.Adapter.inArray(t, this.waypoints)
        ;-1 < e && this.waypoints.splice(e, 1)
      }),
      (i.prototype.first = function () {
        return this.waypoints[0]
      }),
      (i.prototype.last = function () {
        return this.waypoints[this.waypoints.length - 1]
      }),
      (i.findOrCreate = function (t) {
        return n[t.axis][t.name] || new i(t)
      }),
      (o.Group = i)
  })(),
  (function () {
    'use strict'
    function t(t) {
      this.$element = e(t)
    }
    var e = window.jQuery,
      i = window.Waypoint
    e.each(['innerHeight', 'innerWidth', 'off', 'offset', 'on', 'outerHeight', 'outerWidth', 'scrollLeft', 'scrollTop'], function (e, i) {
      t.prototype[i] = function () {
        var t = Array.prototype.slice.call(arguments)
        return this.$element[i].apply(this.$element, t)
      }
    }),
      e.each(['extend', 'inArray', 'isEmptyObject'], function (i, n) {
        t[n] = e[n]
      }),
      i.adapters.push({ name: 'jquery', Adapter: t }),
      (i.Adapter = t)
  })(),
  (function () {
    'use strict'
    function t(t) {
      return function () {
        var i = [],
          n = arguments[0]
        return (
          t.isFunction(arguments[0]) && ((n = t.extend({}, arguments[1])).handler = arguments[0]),
          this.each(function () {
            var o = t.extend({}, n, { element: this })
            'string' == typeof o.context && (o.context = t(this).closest(o.context)[0]), i.push(new e(o))
          }),
          i
        )
      }
    }
    var e = window.Waypoint
    window.jQuery && (window.jQuery.fn.waypoint = t(window.jQuery)), window.Zepto && (window.Zepto.fn.waypoint = t(window.Zepto))
  })(),
  (function (t) {
    'use strict'
    t.fn.countdown = function (e, i) {
      var n = t(this),
        o = { date: null, format: null }
      function r() {
        var e = Date.parse(o.date) / 1e3,
          r = Math.floor(t.now() / 1e3)
        e <= r && (i.call(this), clearInterval(s))
        var a,
          l,
          c,
          u = e - r
        ;(u -= 60 * (a = Math.floor(u / 86400)) * 60 * 24),
          (u -= 60 * (l = Math.floor(u / 3600)) * 60),
          (u -= 60 * (c = Math.floor(u / 60))),
          1 == a ? n.find('.timeRefDays').text('day') : n.find('.timeRefDays').text('days'),
          1 == l ? n.find('.timeRefHours').text('hour') : n.find('.timeRefHours').text('hours'),
          1 == c ? n.find('.timeRefMinutes').text('minute') : n.find('.timeRefMinutes').text('minutes'),
          1 == u ? n.find('.timeRefSeconds').text('second') : n.find('.timeRefSeconds').text('seconds'),
          'on' == o.format &&
            ((a = 2 <= String(a).length ? a : '0' + a),
            (l = 2 <= String(l).length ? l : '0' + l),
            (c = 2 <= String(c).length ? c : '0' + c),
            (u = 2 <= String(u).length ? u : '0' + u)),
          isNaN(e)
            ? (alert("Invalid date. Here's an example: 12 Tuesday 2012 17:30:00"), clearInterval(s))
            : (n.find('.days').text(a), n.find('.hours').text(l), n.find('.minutes').text(c), n.find('.seconds').text(u))
      }
      e && t.extend(o, e), r()
      var s = setInterval(r, 1e3)
    }
  })(jQuery),
  (function (t) {
    'function' == typeof define && define.amd ? define(['jquery'], t) : t('object' == typeof exports ? require('jquery') : window.jQuery || window.Zepto)
  })(function (t) {
    function e() {}
    function i(t, e) {
      a.ev.on('mfp' + t + m, e)
    }
    function n(e, i, n, o) {
      var r = document.createElement('div')
      return (r.className = 'mfp-' + e), n && (r.innerHTML = n), o ? i && i.appendChild(r) : ((r = t(r)), i && r.appendTo(i)), r
    }
    function o(e, i) {
      a.ev.triggerHandler('mfp' + e, i), a.st.callbacks && ((e = e.charAt(0).toLowerCase() + e.slice(1)), a.st.callbacks[e] && a.st.callbacks[e].apply(a, t.isArray(i) ? i : [i]))
    }
    function r(e) {
      return (e === h && a.currTemplate.closeBtn) || ((a.currTemplate.closeBtn = t(a.st.closeMarkup.replace('%title%', a.st.tClose))), (h = e)), a.currTemplate.closeBtn
    }
    function s() {
      t.magnificPopup.instance || ((a = new e()).init(), (t.magnificPopup.instance = a))
    }
    var a,
      l,
      c,
      u,
      d,
      h,
      f = 'Close',
      p = 'BeforeClose',
      g = 'MarkupParse',
      m = '.mfp',
      v = 'mfp-ready',
      y = 'mfp-removing',
      b = 'mfp-prevent-close',
      _ = !!window.jQuery,
      w = t(window)
    function x() {
      T && (k.after(T.addClass(C)).detach(), (T = null))
    }
    ;(e.prototype = {
      constructor: e,
      init: function () {
        var e = navigator.appVersion
        ;(a.isLowIE = a.isIE8 = document.all && !document.addEventListener),
          (a.isAndroid = /android/gi.test(e)),
          (a.isIOS = /iphone|ipad|ipod/gi.test(e)),
          (a.supportsTransition = (function () {
            var t = document.createElement('p').style,
              e = ['ms', 'O', 'Moz', 'Webkit']
            if (void 0 !== t.transition) return !0
            for (; e.length; ) if (e.pop() + 'Transition' in t) return !0
            return !1
          })()),
          (a.probablyMobile = a.isAndroid || a.isIOS || /(Opera Mini)|Kindle|webOS|BlackBerry|(Opera Mobi)|(Windows Phone)|IEMobile/i.test(navigator.userAgent)),
          (c = t(document)),
          (a.popupsCache = {})
      },
      open: function (e) {
        if (!1 === e.isObj) {
          ;(a.items = e.items.toArray()), (a.index = 0)
          for (var s, l = e.items, u = 0; u < l.length; u++)
            if (((s = l[u]).parsed && (s = s.el[0]), s === e.el[0])) {
              a.index = u
              break
            }
        } else (a.items = t.isArray(e.items) ? e.items : [e.items]), (a.index = e.index || 0)
        if (!a.isOpen) {
          ;(a.types = []),
            (d = ''),
            e.mainEl && e.mainEl.length ? (a.ev = e.mainEl.eq(0)) : (a.ev = c),
            e.key ? (a.popupsCache[e.key] || (a.popupsCache[e.key] = {}), (a.currTemplate = a.popupsCache[e.key])) : (a.currTemplate = {}),
            (a.st = t.extend(!0, {}, t.magnificPopup.defaults, e)),
            (a.fixedContentPos = 'auto' === a.st.fixedContentPos ? !a.probablyMobile : a.st.fixedContentPos),
            a.st.modal && ((a.st.closeOnContentClick = !1), (a.st.closeOnBgClick = !1), (a.st.showCloseBtn = !1), (a.st.enableEscapeKey = !1)),
            a.bgOverlay ||
              ((a.bgOverlay = n('bg').on('click.mfp', function () {
                a.close()
              })),
              (a.wrap = n('wrap')
                .attr('tabindex', -1)
                .on('click.mfp', function (t) {
                  a._checkIfClose(t.target) && a.close()
                })),
              (a.container = n('container', a.wrap))),
            (a.contentContainer = n('content')),
            a.st.preloader && (a.preloader = n('preloader', a.container, a.st.tLoading))
          var h = t.magnificPopup.modules
          for (u = 0; u < h.length; u++) {
            var f = (f = h[u]).charAt(0).toUpperCase() + f.slice(1)
            a['init' + f].call(a)
          }
          o('BeforeOpen'),
            a.st.showCloseBtn &&
              (a.st.closeBtnInside
                ? (i(g, function (t, e, i, n) {
                    i.close_replaceWith = r(n.type)
                  }),
                  (d += ' mfp-close-btn-in'))
                : a.wrap.append(r())),
            a.st.alignTop && (d += ' mfp-align-top'),
            a.fixedContentPos ? a.wrap.css({ overflow: a.st.overflowY, overflowX: 'hidden', overflowY: a.st.overflowY }) : a.wrap.css({ top: w.scrollTop(), position: 'absolute' }),
            (!1 !== a.st.fixedBgPos && ('auto' !== a.st.fixedBgPos || a.fixedContentPos)) || a.bgOverlay.css({ height: c.height(), position: 'absolute' }),
            a.st.enableEscapeKey &&
              c.on('keyup.mfp', function (t) {
                27 === t.keyCode && a.close()
              }),
            w.on('resize.mfp', function () {
              a.updateSize()
            }),
            a.st.closeOnContentClick || (d += ' mfp-auto-cursor'),
            d && a.wrap.addClass(d)
          var p,
            m = (a.wH = w.height()),
            y = {}
          a.fixedContentPos && a._hasScrollBar(m) && (p = a._getScrollbarSize()) && (y.marginRight = p),
            a.fixedContentPos && (a.isIE7 ? t('body, html').css('overflow', 'hidden') : (y.overflow = 'hidden'))
          var b = a.st.mainClass
          return (
            a.isIE7 && (b += ' mfp-ie7'),
            b && a._addClassToMFP(b),
            a.updateItemHTML(),
            o('BuildControls'),
            t('html').css(y),
            a.bgOverlay.add(a.wrap).prependTo(a.st.prependTo || t(document.body)),
            (a._lastFocusedEl = document.activeElement),
            setTimeout(function () {
              a.content ? (a._addClassToMFP(v), a._setFocus()) : a.bgOverlay.addClass(v), c.on('focusin.mfp', a._onFocusIn)
            }, 16),
            (a.isOpen = !0),
            a.updateSize(m),
            o('Open'),
            e
          )
        }
        a.updateItemHTML()
      },
      close: function () {
        a.isOpen &&
          (o(p),
          (a.isOpen = !1),
          a.st.removalDelay && !a.isLowIE && a.supportsTransition
            ? (a._addClassToMFP(y),
              setTimeout(function () {
                a._close()
              }, a.st.removalDelay))
            : a._close())
      },
      _close: function () {
        o(f)
        var e,
          i = y + ' ' + v + ' '
        a.bgOverlay.detach(),
          a.wrap.detach(),
          a.container.empty(),
          a.st.mainClass && (i += a.st.mainClass + ' '),
          a._removeClassFromMFP(i),
          a.fixedContentPos && ((e = { marginRight: '' }), a.isIE7 ? t('body, html').css('overflow', '') : (e.overflow = ''), t('html').css(e)),
          c.off('keyup.mfp focusin.mfp'),
          a.ev.off(m),
          a.wrap.attr('class', 'mfp-wrap').removeAttr('style'),
          a.bgOverlay.attr('class', 'mfp-bg'),
          a.container.attr('class', 'mfp-container'),
          !a.st.showCloseBtn || (a.st.closeBtnInside && !0 !== a.currTemplate[a.currItem.type]) || (a.currTemplate.closeBtn && a.currTemplate.closeBtn.detach()),
          a.st.autoFocusLast && a._lastFocusedEl && t(a._lastFocusedEl).focus(),
          (a.currItem = null),
          (a.content = null),
          (a.currTemplate = null),
          (a.prevHeight = 0),
          o('AfterClose')
      },
      updateSize: function (t) {
        var e, i
        a.isIOS ? ((e = document.documentElement.clientWidth / window.innerWidth), (i = window.innerHeight * e), a.wrap.css('height', i), (a.wH = i)) : (a.wH = t || w.height()),
          a.fixedContentPos || a.wrap.css('height', a.wH),
          o('Resize')
      },
      updateItemHTML: function () {
        var e = a.items[a.index]
        a.contentContainer.detach(), a.content && a.content.detach(), e.parsed || (e = a.parseEl(a.index))
        var i,
          n = e.type
        o('BeforeChange', [a.currItem ? a.currItem.type : '', n]),
          (a.currItem = e),
          a.currTemplate[n] || (o('FirstMarkupParse', (i = !!a.st[n] && a.st[n].markup)), (a.currTemplate[n] = !i || t(i))),
          u && u !== e.type && a.container.removeClass('mfp-' + u + '-holder')
        var r = a['get' + n.charAt(0).toUpperCase() + n.slice(1)](e, a.currTemplate[n])
        a.appendContent(r, n), (e.preloaded = !0), o('Change', e), (u = e.type), a.container.prepend(a.contentContainer), o('AfterChange')
      },
      appendContent: function (t, e) {
        ;(a.content = t)
          ? a.st.showCloseBtn && a.st.closeBtnInside && !0 === a.currTemplate[e]
            ? a.content.find('.mfp-close').length || a.content.append(r())
            : (a.content = t)
          : (a.content = ''),
          o('BeforeAppend'),
          a.container.addClass('mfp-' + e + '-holder'),
          a.contentContainer.append(a.content)
      },
      parseEl: function (e) {
        var i,
          n = a.items[e]
        if ((n = n.tagName ? { el: t(n) } : ((i = n.type), { data: n, src: n.src })).el) {
          for (var r = a.types, s = 0; s < r.length; s++)
            if (n.el.hasClass('mfp-' + r[s])) {
              i = r[s]
              break
            }
          ;(n.src = n.el.attr('data-mfp-src')), n.src || (n.src = n.el.attr('href'))
        }
        return (n.type = i || a.st.type || 'inline'), (n.index = e), (n.parsed = !0), (a.items[e] = n), o('ElementParse', n), a.items[e]
      },
      addGroup: function (t, e) {
        function i(i) {
          ;(i.mfpEl = this), a._openClick(i, t, e)
        }
        var n = 'click.magnificPopup'
        ;((e = e || {}).mainEl = t), e.items ? ((e.isObj = !0), t.off(n).on(n, i)) : ((e.isObj = !1), e.delegate ? t.off(n).on(n, e.delegate, i) : (e.items = t).off(n).on(n, i))
      },
      _openClick: function (e, i, n) {
        if ((void 0 !== n.midClick ? n.midClick : t.magnificPopup.defaults.midClick) || !(2 === e.which || e.ctrlKey || e.metaKey || e.altKey || e.shiftKey)) {
          var o = void 0 !== n.disableOn ? n.disableOn : t.magnificPopup.defaults.disableOn
          if (o)
            if (t.isFunction(o)) {
              if (!o.call(a)) return !0
            } else if (w.width() < o) return !0
          e.type && (e.preventDefault(), a.isOpen && e.stopPropagation()), (n.el = t(e.mfpEl)), n.delegate && (n.items = i.find(n.delegate)), a.open(n)
        }
      },
      updateStatus: function (t, e) {
        var i
        a.preloader &&
          (l !== t && a.container.removeClass('mfp-s-' + l),
          e || 'loading' !== t || (e = a.st.tLoading),
          o('UpdateStatus', (i = { status: t, text: e })),
          (t = i.status),
          (e = i.text),
          a.preloader.html(e),
          a.preloader.find('a').on('click', function (t) {
            t.stopImmediatePropagation()
          }),
          a.container.addClass('mfp-s-' + t),
          (l = t))
      },
      _checkIfClose: function (e) {
        if (!t(e).hasClass(b)) {
          var i = a.st.closeOnContentClick,
            n = a.st.closeOnBgClick
          if (i && n) return !0
          if (!a.content || t(e).hasClass('mfp-close') || (a.preloader && e === a.preloader[0])) return !0
          if (e === a.content[0] || t.contains(a.content[0], e)) {
            if (i) return !0
          } else if (n && t.contains(document, e)) return !0
          return !1
        }
      },
      _addClassToMFP: function (t) {
        a.bgOverlay.addClass(t), a.wrap.addClass(t)
      },
      _removeClassFromMFP: function (t) {
        this.bgOverlay.removeClass(t), a.wrap.removeClass(t)
      },
      _hasScrollBar: function (t) {
        return (a.isIE7 ? c.height() : document.body.scrollHeight) > (t || w.height())
      },
      _setFocus: function () {
        ;(a.st.focus ? a.content.find(a.st.focus).eq(0) : a.wrap).focus()
      },
      _onFocusIn: function (e) {
        return e.target === a.wrap[0] || t.contains(a.wrap[0], e.target) ? void 0 : (a._setFocus(), !1)
      },
      _parseMarkup: function (e, i, n) {
        var r
        n.data && (i = t.extend(n.data, i)),
          o(g, [e, i, n]),
          t.each(i, function (i, n) {
            if (void 0 === n || !1 === n) return !0
            var o, s
            1 < (r = i.split('_')).length
              ? 0 < (o = e.find('.mfp-' + r[0])).length &&
                ('replaceWith' === (s = r[1])
                  ? o[0] !== n[0] && o.replaceWith(n)
                  : 'img' === s
                  ? o.is('img')
                    ? o.attr('src', n)
                    : o.replaceWith(t('<img>').attr('src', n).attr('class', o.attr('class')))
                  : o.attr(r[1], n))
              : e.find('.mfp-' + i).html(n)
          })
      },
      _getScrollbarSize: function () {
        var t
        return (
          void 0 === a.scrollbarSize &&
            (((t = document.createElement('div')).style.cssText = 'width: 99px; height: 99px; overflow: scroll; position: absolute; top: -9999px;'),
            document.body.appendChild(t),
            (a.scrollbarSize = t.offsetWidth - t.clientWidth),
            document.body.removeChild(t)),
          a.scrollbarSize
        )
      }
    }),
      (t.magnificPopup = {
        instance: null,
        proto: e.prototype,
        modules: [],
        open: function (e, i) {
          return s(), ((e = e ? t.extend(!0, {}, e) : {}).isObj = !0), (e.index = i || 0), this.instance.open(e)
        },
        close: function () {
          return t.magnificPopup.instance && t.magnificPopup.instance.close()
        },
        registerModule: function (e, i) {
          i.options && (t.magnificPopup.defaults[e] = i.options), t.extend(this.proto, i.proto), this.modules.push(e)
        },
        defaults: {
          disableOn: 0,
          key: null,
          midClick: !1,
          mainClass: '',
          preloader: !0,
          focus: '',
          closeOnContentClick: !1,
          closeOnBgClick: !0,
          closeBtnInside: !0,
          showCloseBtn: !0,
          enableEscapeKey: !0,
          modal: !1,
          alignTop: !1,
          removalDelay: 0,
          prependTo: null,
          fixedContentPos: 'auto',
          fixedBgPos: 'auto',
          overflowY: 'auto',
          closeMarkup: '<button title="%title%" type="button" class="mfp-close">&#215;</button>',
          tClose: 'Close (Esc)',
          tLoading: 'Loading...',
          autoFocusLast: !0
        }
      }),
      (t.fn.magnificPopup = function (e) {
        s()
        var i,
          n,
          o,
          r = t(this)
        return (
          'string' == typeof e
            ? 'open' === e
              ? ((i = _ ? r.data('magnificPopup') : r[0].magnificPopup),
                (n = parseInt(arguments[1], 10) || 0),
                (o = i.items ? i.items[n] : ((o = r), i.delegate && (o = o.find(i.delegate)), o.eq(n))),
                a._openClick({ mfpEl: o }, r, i))
              : a.isOpen && a[e].apply(a, Array.prototype.slice.call(arguments, 1))
            : ((e = t.extend(!0, {}, e)), _ ? r.data('magnificPopup', e) : (r[0].magnificPopup = e), a.addGroup(r, e)),
          r
        )
      })
    var C,
      k,
      T,
      S = 'inline'
    function E() {
      A && t(document.body).removeClass(A)
    }
    function I() {
      E(), a.req && a.req.abort()
    }
    t.magnificPopup.registerModule(S, {
      options: { hiddenClass: 'hide', markup: '', tNotFound: 'Content not found' },
      proto: {
        initInline: function () {
          a.types.push(S),
            i(f + '.' + S, function () {
              x()
            })
        },
        getInline: function (e, i) {
          if ((x(), e.src)) {
            var o,
              r = a.st.inline,
              s = t(e.src)
            return (
              s.length
                ? ((o = s[0].parentNode) && o.tagName && (k || ((C = r.hiddenClass), (k = n(C)), (C = 'mfp-' + C)), (T = s.after(k).detach().removeClass(C))),
                  a.updateStatus('ready'))
                : (a.updateStatus('error', r.tNotFound), (s = t('<div>'))),
              (e.inlineElement = s)
            )
          }
          return a.updateStatus('ready'), a._parseMarkup(i, {}, e), i
        }
      }
    })
    var A,
      D,
      O,
      M = 'ajax'
    function P(t) {
      var e
      !a.currTemplate[L] || ((e = a.currTemplate[L].find('iframe')).length && (t || (e[0].src = '//about:blank'), a.isIE8 && e.css('display', t ? 'block' : 'none')))
    }
    t.magnificPopup.registerModule(M, {
      options: { settings: null, cursor: 'mfp-ajax-cur', tError: '<a href="%url%">The content</a> could not be loaded.' },
      proto: {
        initAjax: function () {
          a.types.push(M), (A = a.st.ajax.cursor), i(f + '.' + M, I), i('BeforeChange.ajax', I)
        },
        getAjax: function (e) {
          A && t(document.body).addClass(A), a.updateStatus('loading')
          var i = t.extend(
            {
              url: e.src,
              success: function (i, n, r) {
                var s = { data: i, xhr: r }
                o('ParseAjax', s),
                  a.appendContent(t(s.data), M),
                  (e.finished = !0),
                  E(),
                  a._setFocus(),
                  setTimeout(function () {
                    a.wrap.addClass(v)
                  }, 16),
                  a.updateStatus('ready'),
                  o('AjaxContentAdded')
              },
              error: function () {
                E(), (e.finished = e.loadError = !0), a.updateStatus('error', a.st.ajax.tError.replace('%url%', e.src))
              }
            },
            a.st.ajax.settings
          )
          return (a.req = t.ajax(i)), ''
        }
      }
    }),
      t.magnificPopup.registerModule('image', {
        options: {
          markup:
            '<div class="mfp-figure"><div class="mfp-close"></div><figure><div class="mfp-img"></div><figcaption><div class="mfp-bottom-bar"><div class="mfp-title"></div><div class="mfp-counter"></div></div></figcaption></figure></div>',
          cursor: 'mfp-zoom-out-cur',
          titleSrc: 'title',
          verticalFit: !0,
          tError: '<a href="%url%">The image</a> could not be loaded.'
        },
        proto: {
          initImage: function () {
            var e = a.st.image,
              n = '.image'
            a.types.push('image'),
              i('Open' + n, function () {
                'image' === a.currItem.type && e.cursor && t(document.body).addClass(e.cursor)
              }),
              i(f + n, function () {
                e.cursor && t(document.body).removeClass(e.cursor), w.off('resize.mfp')
              }),
              i('Resize' + n, a.resizeImage),
              a.isLowIE && i('AfterChange', a.resizeImage)
          },
          resizeImage: function () {
            var t,
              e = a.currItem
            e &&
              e.img &&
              a.st.image.verticalFit &&
              ((t = 0), a.isLowIE && (t = parseInt(e.img.css('padding-top'), 10) + parseInt(e.img.css('padding-bottom'), 10)), e.img.css('max-height', a.wH - t))
          },
          _onImageHasSize: function (t) {
            t.img &&
              ((t.hasSize = !0),
              D && clearInterval(D),
              (t.isCheckingImgSize = !1),
              o('ImageHasSize', t),
              t.imgHidden && (a.content && a.content.removeClass('mfp-loading'), (t.imgHidden = !1)))
          },
          findImageSize: function (t) {
            var e = 0,
              i = t.img[0],
              n = function (o) {
                D && clearInterval(D),
                  (D = setInterval(function () {
                    return 0 < i.naturalWidth ? void a._onImageHasSize(t) : (200 < e && clearInterval(D), void (3 == ++e ? n(10) : 40 === e ? n(50) : 100 === e && n(500)))
                  }, o))
              }
            n(1)
          },
          getImage: function (e, i) {
            var n,
              r = 0,
              s = function () {
                e &&
                  (e.img[0].complete
                    ? (e.img.off('.mfploader'), e === a.currItem && (a._onImageHasSize(e), a.updateStatus('ready')), (e.hasSize = !0), (e.loaded = !0), o('ImageLoadComplete'))
                    : ++r < 200
                    ? setTimeout(s, 100)
                    : l())
              },
              l = function () {
                e &&
                  (e.img.off('.mfploader'),
                  e === a.currItem && (a._onImageHasSize(e), a.updateStatus('error', c.tError.replace('%url%', e.src))),
                  (e.hasSize = !0),
                  (e.loaded = !0),
                  (e.loadError = !0))
              },
              c = a.st.image,
              u = i.find('.mfp-img')
            return (
              u.length &&
                (((n = document.createElement('img')).className = 'mfp-img'),
                e.el && e.el.find('img').length && (n.alt = e.el.find('img').attr('alt')),
                (e.img = t(n).on('load.mfploader', s).on('error.mfploader', l)),
                (n.src = e.src),
                u.is('img') && (e.img = e.img.clone()),
                0 < (n = e.img[0]).naturalWidth ? (e.hasSize = !0) : n.width || (e.hasSize = !1)),
              a._parseMarkup(
                i,
                {
                  title: (function (e) {
                    if (e.data && void 0 !== e.data.title) return e.data.title
                    var i = a.st.image.titleSrc
                    if (i) {
                      if (t.isFunction(i)) return i.call(a, e)
                      if (e.el) return e.el.attr(i) || ''
                    }
                    return ''
                  })(e),
                  img_replaceWith: e.img
                },
                e
              ),
              a.resizeImage(),
              e.hasSize
                ? (D && clearInterval(D),
                  e.loadError ? (i.addClass('mfp-loading'), a.updateStatus('error', c.tError.replace('%url%', e.src))) : (i.removeClass('mfp-loading'), a.updateStatus('ready')))
                : (a.updateStatus('loading'), (e.loading = !0), e.hasSize || ((e.imgHidden = !0), i.addClass('mfp-loading'), a.findImageSize(e))),
              i
            )
          }
        }
      }),
      t.magnificPopup.registerModule('zoom', {
        options: {
          enabled: !1,
          easing: 'ease-in-out',
          duration: 300,
          opener: function (t) {
            return t.is('img') ? t : t.find('img')
          }
        },
        proto: {
          initZoom: function () {
            var t,
              e,
              n,
              r,
              s,
              l,
              c = a.st.zoom
            c.enabled &&
              a.supportsTransition &&
              ((r = c.duration),
              (s = function (t) {
                var e = t.clone().removeAttr('style').removeAttr('class').addClass('mfp-animated-image'),
                  i = 'all ' + c.duration / 1e3 + 's ' + c.easing,
                  n = { position: 'fixed', zIndex: 9999, left: 0, top: 0, '-webkit-backface-visibility': 'hidden' },
                  o = 'transition'
                return (n['-webkit-' + o] = n['-moz-' + o] = n['-o-' + o] = n[o] = i), e.css(n), e
              }),
              (l = function () {
                a.content.css('visibility', 'visible')
              }),
              i('BuildControls.zoom', function () {
                if (a._allowZoom()) {
                  if ((clearTimeout(e), a.content.css('visibility', 'hidden'), !(t = a._getItemToZoom()))) return void l()
                  ;(n = s(t)).css(a._getOffset()),
                    a.wrap.append(n),
                    (e = setTimeout(function () {
                      n.css(a._getOffset(!0)),
                        (e = setTimeout(function () {
                          l(),
                            setTimeout(function () {
                              n.remove(), (t = n = null), o('ZoomAnimationEnded')
                            }, 16)
                        }, r))
                    }, 16))
                }
              }),
              i(p + '.zoom', function () {
                if (a._allowZoom()) {
                  if ((clearTimeout(e), (a.st.removalDelay = r), !t)) {
                    if (!(t = a._getItemToZoom())) return
                    n = s(t)
                  }
                  n.css(a._getOffset(!0)),
                    a.wrap.append(n),
                    a.content.css('visibility', 'hidden'),
                    setTimeout(function () {
                      n.css(a._getOffset())
                    }, 16)
                }
              }),
              i(f + '.zoom', function () {
                a._allowZoom() && (l(), n && n.remove(), (t = null))
              }))
          },
          _allowZoom: function () {
            return 'image' === a.currItem.type
          },
          _getItemToZoom: function () {
            return !!a.currItem.hasSize && a.currItem.img
          },
          _getOffset: function (e) {
            var i = e ? a.currItem.img : a.st.zoom.opener(a.currItem.el || a.currItem),
              n = i.offset(),
              o = parseInt(i.css('padding-top'), 10),
              r = parseInt(i.css('padding-bottom'), 10)
            n.top -= t(window).scrollTop() - o
            var s = { width: i.width(), height: (_ ? i.innerHeight() : i[0].offsetHeight) - r - o }
            return (
              void 0 === O && (O = void 0 !== document.createElement('p').style.MozTransform),
              O ? (s['-moz-transform'] = s.transform = 'translate(' + n.left + 'px,' + n.top + 'px)') : ((s.left = n.left), (s.top = n.top)),
              s
            )
          }
        }
      })
    var L = 'iframe'
    function z(t) {
      var e = a.items.length
      return e - 1 < t ? t - e : t < 0 ? e + t : t
    }
    function F(t, e, i) {
      return t.replace(/%curr%/gi, e + 1).replace(/%total%/gi, i)
    }
    t.magnificPopup.registerModule(L, {
      options: {
        markup: '<div class="mfp-iframe-scaler"><div class="mfp-close"></div><iframe class="mfp-iframe" src="//about:blank" frameborder="0" allowfullscreen></iframe></div>',
        srcAction: 'iframe_src',
        patterns: {
          youtube: { index: 'youtube.com', id: 'v=', src: '//www.youtube.com/embed/%id%?autoplay=1' },
          vimeo: { index: 'vimeo.com/', id: '/', src: '//player.vimeo.com/video/%id%?autoplay=1' },
          gmaps: { index: '//maps.google.', src: '%id%&output=embed' }
        }
      },
      proto: {
        initIframe: function () {
          a.types.push(L),
            i('BeforeChange', function (t, e, i) {
              e !== i && (e === L ? P() : i === L && P(!0))
            }),
            i(f + '.' + L, function () {
              P()
            })
        },
        getIframe: function (e, i) {
          var n = e.src,
            o = a.st.iframe
          t.each(o.patterns, function () {
            return -1 < n.indexOf(this.index)
              ? (this.id && (n = 'string' == typeof this.id ? n.substr(n.lastIndexOf(this.id) + this.id.length, n.length) : this.id.call(this, n)),
                (n = this.src.replace('%id%', n)),
                !1)
              : void 0
          })
          var r = {}
          return o.srcAction && (r[o.srcAction] = n), a._parseMarkup(i, r, e), a.updateStatus('ready'), i
        }
      }
    }),
      t.magnificPopup.registerModule('gallery', {
        options: {
          enabled: !1,
          arrowMarkup: '<button title="%title%" type="button" class="mfp-arrow mfp-arrow-%dir%"></button>',
          preload: [0, 2],
          navigateByImgClick: !0,
          arrows: !0,
          tPrev: 'Previous (Left arrow key)',
          tNext: 'Next (Right arrow key)',
          tCounter: '%curr% of %total%'
        },
        proto: {
          initGallery: function () {
            var e = a.st.gallery,
              n = '.mfp-gallery'
            return (
              (a.direction = !0),
              !(!e || !e.enabled) &&
                ((d += ' mfp-gallery'),
                i('Open' + n, function () {
                  e.navigateByImgClick &&
                    a.wrap.on('click' + n, '.mfp-img', function () {
                      return 1 < a.items.length ? (a.next(), !1) : void 0
                    }),
                    c.on('keydown' + n, function (t) {
                      37 === t.keyCode ? a.prev() : 39 === t.keyCode && a.next()
                    })
                }),
                i('UpdateStatus' + n, function (t, e) {
                  e.text && (e.text = F(e.text, a.currItem.index, a.items.length))
                }),
                i(g + n, function (t, i, n, o) {
                  var r = a.items.length
                  n.counter = 1 < r ? F(e.tCounter, o.index, r) : ''
                }),
                i('BuildControls' + n, function () {
                  var i, n, o
                  1 < a.items.length &&
                    e.arrows &&
                    !a.arrowLeft &&
                    ((i = e.arrowMarkup),
                    (n = a.arrowLeft = t(i.replace(/%title%/gi, e.tPrev).replace(/%dir%/gi, 'left')).addClass(b)),
                    (o = a.arrowRight = t(i.replace(/%title%/gi, e.tNext).replace(/%dir%/gi, 'right')).addClass(b)),
                    n.click(function () {
                      a.prev()
                    }),
                    o.click(function () {
                      a.next()
                    }),
                    a.container.append(n.add(o)))
                }),
                i('Change' + n, function () {
                  a._preloadTimeout && clearTimeout(a._preloadTimeout),
                    (a._preloadTimeout = setTimeout(function () {
                      a.preloadNearbyImages(), (a._preloadTimeout = null)
                    }, 16))
                }),
                void i(f + n, function () {
                  c.off(n), a.wrap.off('click' + n), (a.arrowRight = a.arrowLeft = null)
                }))
            )
          },
          next: function () {
            ;(a.direction = !0), (a.index = z(a.index + 1)), a.updateItemHTML()
          },
          prev: function () {
            ;(a.direction = !1), (a.index = z(a.index - 1)), a.updateItemHTML()
          },
          goTo: function (t) {
            ;(a.direction = t >= a.index), (a.index = t), a.updateItemHTML()
          },
          preloadNearbyImages: function () {
            for (var t = a.st.gallery.preload, e = Math.min(t[0], a.items.length), i = Math.min(t[1], a.items.length), n = 1; n <= (a.direction ? i : e); n++)
              a._preloadItem(a.index + n)
            for (n = 1; n <= (a.direction ? e : i); n++) a._preloadItem(a.index - n)
          },
          _preloadItem: function (e) {
            var i
            ;(e = z(e)),
              a.items[e].preloaded ||
                ((i = a.items[e]).parsed || (i = a.parseEl(e)),
                o('LazyLoad', i),
                'image' === i.type &&
                  (i.img = t('<img class="mfp-img" />')
                    .on('load.mfploader', function () {
                      i.hasSize = !0
                    })
                    .on('error.mfploader', function () {
                      ;(i.hasSize = !0), (i.loadError = !0), o('LazyLoadError', i)
                    })
                    .attr('src', i.src)),
                (i.preloaded = !0))
          }
        }
      })
    var N = 'retina'
    t.magnificPopup.registerModule(N, {
      options: {
        replaceSrc: function (t) {
          return t.src.replace(/\.\w+$/, function (t) {
            return '@2x' + t
          })
        },
        ratio: 1
      },
      proto: {
        initRetina: function () {
          var t, e
          1 < window.devicePixelRatio &&
            ((t = a.st.retina),
            (e = t.ratio),
            1 < (e = isNaN(e) ? e() : e) &&
              (i('ImageHasSize.' + N, function (t, i) {
                i.img.css({ 'max-width': i.img[0].naturalWidth / e, width: '100%' })
              }),
              i('ElementParse.' + N, function (i, n) {
                n.src = t.replaceSrc(n, e)
              })))
        }
      }
    }),
      s()
  }),
  (function (t, e) {
    'function' == typeof define && define.amd
      ? define('jquery-bridget/jquery-bridget', ['jquery'], function (i) {
          return e(t, i)
        })
      : 'object' == typeof module && module.exports
      ? (module.exports = e(t, require('jquery')))
      : (t.jQueryBridget = e(t, t.jQuery))
  })(window, function (t, e) {
    'use strict'
    function i(i, r, a) {
      ;(a = a || e || t.jQuery) &&
        (r.prototype.option ||
          (r.prototype.option = function (t) {
            a.isPlainObject(t) && (this.options = a.extend(!0, this.options, t))
          }),
        (a.fn[i] = function (t) {
          if ('string' != typeof t)
            return (
              (d = t),
              this.each(function (t, e) {
                var n = a.data(e, i)
                n ? (n.option(d), n._init()) : ((n = new r(e, d)), a.data(e, i, n))
              }),
              this
            )
          var e,
            n,
            l,
            c,
            u,
            d,
            h = o.call(arguments, 1)
          return (
            (l = h),
            (u = '$().' + i + '("' + (n = t) + '")'),
            (e = this).each(function (t, e) {
              var o,
                r,
                d = a.data(e, i)
              d
                ? (o = d[n]) && '_' != n.charAt(0)
                  ? ((r = o.apply(d, l)), (c = void 0 === c ? r : c))
                  : s(u + ' is not a valid method')
                : s(i + ' not initialized. Cannot call methods, i.e. ' + u)
            }),
            void 0 !== c ? c : e
          )
        }),
        n(a))
    }
    function n(t) {
      !t || (t && t.bridget) || (t.bridget = i)
    }
    var o = Array.prototype.slice,
      r = t.console,
      s =
        void 0 === r
          ? function () {}
          : function (t) {
              r.error(t)
            }
    return n(e || t.jQuery), i
  }),
  (function (t, e) {
    'function' == typeof define && define.amd ? define('ev-emitter/ev-emitter', e) : 'object' == typeof module && module.exports ? (module.exports = e()) : (t.EvEmitter = e())
  })('undefined' != typeof window ? window : this, function () {
    function t() {}
    var e = t.prototype
    return (
      (e.on = function (t, e) {
        if (t && e) {
          var i = (this._events = this._events || {}),
            n = (i[t] = i[t] || [])
          return -1 == n.indexOf(e) && n.push(e), this
        }
      }),
      (e.once = function (t, e) {
        if (t && e) {
          this.on(t, e)
          var i = (this._onceEvents = this._onceEvents || {})
          return ((i[t] = i[t] || {})[e] = !0), this
        }
      }),
      (e.off = function (t, e) {
        var i = this._events && this._events[t]
        if (i && i.length) {
          var n = i.indexOf(e)
          return -1 != n && i.splice(n, 1), this
        }
      }),
      (e.emitEvent = function (t, e) {
        var i = this._events && this._events[t]
        if (i && i.length) {
          var n = 0,
            o = i[n]
          e = e || []
          for (var r = this._onceEvents && this._onceEvents[t]; o; ) {
            var s = r && r[o]
            s && (this.off(t, o), delete r[o]), o.apply(this, e), (o = i[(n += s ? 0 : 1)])
          }
          return this
        }
      }),
      t
    )
  }),
  (function (t, e) {
    'use strict'
    'function' == typeof define && define.amd ? define('get-size/get-size', [], e) : 'object' == typeof module && module.exports ? (module.exports = e()) : (t.getSize = e())
  })(window, function () {
    'use strict'
    function t(t) {
      var e = parseFloat(t)
      return -1 == t.indexOf('%') && !isNaN(e) && e
    }
    function e(t) {
      var e = getComputedStyle(t)
      return e || n('Style returned ' + e + '. Are you running this code in a hidden iframe on Firefox? See http://bit.ly/getsizebug1'), e
    }
    var i,
      n =
        'undefined' == typeof console
          ? function () {}
          : function (t) {
              console.error(t)
            },
      o = [
        'paddingLeft',
        'paddingRight',
        'paddingTop',
        'paddingBottom',
        'marginLeft',
        'marginRight',
        'marginTop',
        'marginBottom',
        'borderLeftWidth',
        'borderRightWidth',
        'borderTopWidth',
        'borderBottomWidth'
      ],
      r = o.length,
      s = !1
    return function n(a) {
      if (
        (s ||
          ((s = !0),
          ((k = document.createElement('div')).style.width = '200px'),
          (k.style.padding = '1px 2px 3px 4px'),
          (k.style.borderStyle = 'solid'),
          (k.style.borderWidth = '1px 2px 3px 4px'),
          (k.style.boxSizing = 'border-box'),
          (T = document.body || document.documentElement).appendChild(k),
          (S = e(k)),
          (n.isBoxSizeOuter = i = 200 == t(S.width)),
          T.removeChild(k)),
        'string' == typeof a && (a = document.querySelector(a)),
        a && 'object' == typeof a && a.nodeType)
      ) {
        var l = e(a)
        if ('none' == l.display)
          return (function () {
            for (var t = { width: 0, height: 0, innerWidth: 0, innerHeight: 0, outerWidth: 0, outerHeight: 0 }, e = 0; e < r; e++) t[o[e]] = 0
            return t
          })()
        var c = {}
        ;(c.width = a.offsetWidth), (c.height = a.offsetHeight)
        for (var u = (c.isBorderBox = 'border-box' == l.boxSizing), d = 0; d < r; d++) {
          var h = o[d],
            f = l[h],
            p = parseFloat(f)
          c[h] = isNaN(p) ? 0 : p
        }
        var g = c.paddingLeft + c.paddingRight,
          m = c.paddingTop + c.paddingBottom,
          v = c.marginLeft + c.marginRight,
          y = c.marginTop + c.marginBottom,
          b = c.borderLeftWidth + c.borderRightWidth,
          _ = c.borderTopWidth + c.borderBottomWidth,
          w = u && i,
          x = t(l.width)
        !1 !== x && (c.width = x + (w ? 0 : g + b))
        var C = t(l.height)
        return (
          !1 !== C && (c.height = C + (w ? 0 : m + _)),
          (c.innerWidth = c.width - (g + b)),
          (c.innerHeight = c.height - (m + _)),
          (c.outerWidth = c.width + v),
          (c.outerHeight = c.height + y),
          c
        )
      }
      var k, T, S
    }
  }),
  (function (t, e) {
    'use strict'
    'function' == typeof define && define.amd
      ? define('desandro-matches-selector/matches-selector', e)
      : 'object' == typeof module && module.exports
      ? (module.exports = e())
      : (t.matchesSelector = e())
  })(window, function () {
    'use strict'
    var t = (function () {
      var t = window.Element.prototype
      if (t.matches) return 'matches'
      if (t.matchesSelector) return 'matchesSelector'
      for (var e = ['webkit', 'moz', 'ms', 'o'], i = 0; i < e.length; i++) {
        var n = e[i] + 'MatchesSelector'
        if (t[n]) return n
      }
    })()
    return function (e, i) {
      return e[t](i)
    }
  }),
  (function (t, e) {
    'function' == typeof define && define.amd
      ? define('fizzy-ui-utils/utils', ['desandro-matches-selector/matches-selector'], function (i) {
          return e(t, i)
        })
      : 'object' == typeof module && module.exports
      ? (module.exports = e(t, require('desandro-matches-selector')))
      : (t.fizzyUIUtils = e(t, t.matchesSelector))
  })(window, function (t, e) {
    var i = {
        extend: function (t, e) {
          for (var i in e) t[i] = e[i]
          return t
        },
        modulo: function (t, e) {
          return ((t % e) + e) % e
        },
        makeArray: function (t) {
          var e = []
          if (Array.isArray(t)) e = t
          else if (t && 'object' == typeof t && 'number' == typeof t.length) for (var i = 0; i < t.length; i++) e.push(t[i])
          else e.push(t)
          return e
        },
        removeFrom: function (t, e) {
          var i = t.indexOf(e)
          ;-1 != i && t.splice(i, 1)
        },
        getParent: function (t, i) {
          for (; t.parentNode && t != document.body; ) if (((t = t.parentNode), e(t, i))) return t
        },
        getQueryElement: function (t) {
          return 'string' == typeof t ? document.querySelector(t) : t
        },
        handleEvent: function (t) {
          var e = 'on' + t.type
          this[e] && this[e](t)
        },
        filterFindElements: function (t, n) {
          t = i.makeArray(t)
          var o = []
          return (
            t.forEach(function (t) {
              if (t instanceof HTMLElement) {
                if (!n) return void o.push(t)
                e(t, n) && o.push(t)
                for (var i = t.querySelectorAll(n), r = 0; r < i.length; r++) o.push(i[r])
              }
            }),
            o
          )
        },
        debounceMethod: function (t, e, i) {
          var n = t.prototype[e],
            o = e + 'Timeout'
          t.prototype[e] = function () {
            var t = this[o]
            t && clearTimeout(t)
            var e = arguments,
              r = this
            this[o] = setTimeout(function () {
              n.apply(r, e), delete r[o]
            }, i || 100)
          }
        },
        docReady: function (t) {
          var e = document.readyState
          'complete' == e || 'interactive' == e ? setTimeout(t) : document.addEventListener('DOMContentLoaded', t)
        },
        toDashed: function (t) {
          return t
            .replace(/(.)([A-Z])/g, function (t, e, i) {
              return e + '-' + i
            })
            .toLowerCase()
        }
      },
      n = t.console
    return (
      (i.htmlInit = function (e, o) {
        i.docReady(function () {
          var r = i.toDashed(o),
            s = 'data-' + r,
            a = document.querySelectorAll('[' + s + ']'),
            l = document.querySelectorAll('.js-' + r),
            c = i.makeArray(a).concat(i.makeArray(l)),
            u = s + '-options',
            d = t.jQuery
          c.forEach(function (t) {
            var i,
              r = t.getAttribute(s) || t.getAttribute(u)
            try {
              i = r && JSON.parse(r)
            } catch (i) {
              return void (n && n.error('Error parsing ' + s + ' on ' + t.className + ': ' + i))
            }
            var a = new e(t, i)
            d && d.data(t, o, a)
          })
        })
      }),
      i
    )
  }),
  (function (t, e) {
    'function' == typeof define && define.amd
      ? define('outlayer/item', ['ev-emitter/ev-emitter', 'get-size/get-size'], e)
      : 'object' == typeof module && module.exports
      ? (module.exports = e(require('ev-emitter'), require('get-size')))
      : ((t.Outlayer = {}), (t.Outlayer.Item = e(t.EvEmitter, t.getSize)))
  })(window, function (t, e) {
    'use strict'
    function i(t, e) {
      t && ((this.element = t), (this.layout = e), (this.position = { x: 0, y: 0 }), this._create())
    }
    var n = document.documentElement.style,
      o = 'string' == typeof n.transition ? 'transition' : 'WebkitTransition',
      r = 'string' == typeof n.transform ? 'transform' : 'WebkitTransform',
      s = { WebkitTransition: 'webkitTransitionEnd', transition: 'transitionend' }[o],
      a = { transform: r, transition: o, transitionDuration: o + 'Duration', transitionProperty: o + 'Property', transitionDelay: o + 'Delay' },
      l = (i.prototype = Object.create(t.prototype))
    ;(l.constructor = i),
      (l._create = function () {
        ;(this._transn = { ingProperties: {}, clean: {}, onEnd: {} }), this.css({ position: 'absolute' })
      }),
      (l.handleEvent = function (t) {
        var e = 'on' + t.type
        this[e] && this[e](t)
      }),
      (l.getSize = function () {
        this.size = e(this.element)
      }),
      (l.css = function (t) {
        var e = this.element.style
        for (var i in t) e[a[i] || i] = t[i]
      }),
      (l.getPosition = function () {
        var t = getComputedStyle(this.element),
          e = this.layout._getOption('originLeft'),
          i = this.layout._getOption('originTop'),
          n = t[e ? 'left' : 'right'],
          o = t[i ? 'top' : 'bottom'],
          r = this.layout.size,
          s = -1 != n.indexOf('%') ? (parseFloat(n) / 100) * r.width : parseInt(n, 10),
          a = -1 != o.indexOf('%') ? (parseFloat(o) / 100) * r.height : parseInt(o, 10)
        ;(s = isNaN(s) ? 0 : s), (a = isNaN(a) ? 0 : a)
        ;(s -= e ? r.paddingLeft : r.paddingRight), (a -= i ? r.paddingTop : r.paddingBottom), (this.position.x = s), (this.position.y = a)
      }),
      (l.layoutPosition = function () {
        var t = this.layout.size,
          e = {},
          i = this.layout._getOption('originLeft'),
          n = this.layout._getOption('originTop'),
          o = i ? 'paddingLeft' : 'paddingRight',
          r = i ? 'left' : 'right',
          s = i ? 'right' : 'left',
          a = this.position.x + t[o]
        ;(e[r] = this.getXValue(a)), (e[s] = '')
        var l = n ? 'paddingTop' : 'paddingBottom',
          c = n ? 'top' : 'bottom',
          u = n ? 'bottom' : 'top',
          d = this.position.y + t[l]
        ;(e[c] = this.getYValue(d)), (e[u] = ''), this.css(e), this.emitEvent('layout', [this])
      }),
      (l.getXValue = function (t) {
        var e = this.layout._getOption('horizontal')
        return this.layout.options.percentPosition && !e ? (t / this.layout.size.width) * 100 + '%' : t + 'px'
      }),
      (l.getYValue = function (t) {
        var e = this.layout._getOption('horizontal')
        return this.layout.options.percentPosition && e ? (t / this.layout.size.height) * 100 + '%' : t + 'px'
      }),
      (l._transitionTo = function (t, e) {
        this.getPosition()
        var i,
          n,
          o,
          r = this.position.x,
          s = this.position.y,
          a = parseInt(t, 10),
          l = parseInt(e, 10),
          c = a === this.position.x && l === this.position.y
        this.setPosition(t, e),
          !c || this.isTransitioning
            ? ((i = t - r),
              (n = e - s),
              ((o = {}).transform = this.getTranslate(i, n)),
              this.transition({ to: o, onTransitionEnd: { transform: this.layoutPosition }, isCleaning: !0 }))
            : this.layoutPosition()
      }),
      (l.getTranslate = function (t, e) {
        return 'translate3d(' + (t = this.layout._getOption('originLeft') ? t : -t) + 'px, ' + (e = this.layout._getOption('originTop') ? e : -e) + 'px, 0)'
      }),
      (l.goTo = function (t, e) {
        this.setPosition(t, e), this.layoutPosition()
      }),
      (l.moveTo = l._transitionTo),
      (l.setPosition = function (t, e) {
        ;(this.position.x = parseInt(t, 10)), (this.position.y = parseInt(e, 10))
      }),
      (l._nonTransition = function (t) {
        for (var e in (this.css(t.to), t.isCleaning && this._removeStyles(t.to), t.onTransitionEnd)) t.onTransitionEnd[e].call(this)
      }),
      (l.transition = function (t) {
        if (parseFloat(this.layout.options.transitionDuration)) {
          var e = this._transn
          for (var i in t.onTransitionEnd) e.onEnd[i] = t.onTransitionEnd[i]
          for (i in t.to) (e.ingProperties[i] = !0), t.isCleaning && (e.clean[i] = !0)
          t.from && (this.css(t.from), this.element.offsetHeight), this.enableTransition(t.to), this.css(t.to), (this.isTransitioning = !0)
        } else this._nonTransition(t)
      })
    var c =
      'opacity,' +
      r.replace(/([A-Z])/g, function (t) {
        return '-' + t.toLowerCase()
      })
    ;(l.enableTransition = function () {
      var t
      this.isTransitioning ||
        ((t = 'number' == typeof (t = this.layout.options.transitionDuration) ? t + 'ms' : t),
        this.css({ transitionProperty: c, transitionDuration: t, transitionDelay: this.staggerDelay || 0 }),
        this.element.addEventListener(s, this, !1))
    }),
      (l.onwebkitTransitionEnd = function (t) {
        this.ontransitionend(t)
      }),
      (l.onotransitionend = function (t) {
        this.ontransitionend(t)
      })
    var u = { '-webkit-transform': 'transform' }
    ;(l.ontransitionend = function (t) {
      var e, i
      t.target === this.element &&
        ((e = this._transn),
        (i = u[t.propertyName] || t.propertyName),
        delete e.ingProperties[i],
        (function (t) {
          for (var e in t) return
          return 1
        })(e.ingProperties) && this.disableTransition(),
        i in e.clean && ((this.element.style[t.propertyName] = ''), delete e.clean[i]),
        i in e.onEnd && (e.onEnd[i].call(this), delete e.onEnd[i]),
        this.emitEvent('transitionEnd', [this]))
    }),
      (l.disableTransition = function () {
        this.removeTransitionStyles(), this.element.removeEventListener(s, this, !1), (this.isTransitioning = !1)
      }),
      (l._removeStyles = function (t) {
        var e = {}
        for (var i in t) e[i] = ''
        this.css(e)
      })
    var d = { transitionProperty: '', transitionDuration: '', transitionDelay: '' }
    return (
      (l.removeTransitionStyles = function () {
        this.css(d)
      }),
      (l.stagger = function (t) {
        ;(t = isNaN(t) ? 0 : t), (this.staggerDelay = t + 'ms')
      }),
      (l.removeElem = function () {
        this.element.parentNode.removeChild(this.element), this.css({ display: '' }), this.emitEvent('remove', [this])
      }),
      (l.remove = function () {
        return o && parseFloat(this.layout.options.transitionDuration)
          ? (this.once('transitionEnd', function () {
              this.removeElem()
            }),
            void this.hide())
          : void this.removeElem()
      }),
      (l.reveal = function () {
        delete this.isHidden, this.css({ display: '' })
        var t = this.layout.options,
          e = {}
        ;(e[this.getHideRevealTransitionEndProperty('visibleStyle')] = this.onRevealTransitionEnd),
          this.transition({ from: t.hiddenStyle, to: t.visibleStyle, isCleaning: !0, onTransitionEnd: e })
      }),
      (l.onRevealTransitionEnd = function () {
        this.isHidden || this.emitEvent('reveal')
      }),
      (l.getHideRevealTransitionEndProperty = function (t) {
        var e = this.layout.options[t]
        if (e.opacity) return 'opacity'
        for (var i in e) return i
      }),
      (l.hide = function () {
        ;(this.isHidden = !0), this.css({ display: '' })
        var t = this.layout.options,
          e = {}
        ;(e[this.getHideRevealTransitionEndProperty('hiddenStyle')] = this.onHideTransitionEnd),
          this.transition({ from: t.visibleStyle, to: t.hiddenStyle, isCleaning: !0, onTransitionEnd: e })
      }),
      (l.onHideTransitionEnd = function () {
        this.isHidden && (this.css({ display: 'none' }), this.emitEvent('hide'))
      }),
      (l.destroy = function () {
        this.css({ position: '', left: '', right: '', top: '', bottom: '', transition: '', transform: '' })
      }),
      i
    )
  }),
  (function (t, e) {
    'use strict'
    'function' == typeof define && define.amd
      ? define('outlayer/outlayer', ['ev-emitter/ev-emitter', 'get-size/get-size', 'fizzy-ui-utils/utils', './item'], function (i, n, o, r) {
          return e(t, i, n, o, r)
        })
      : 'object' == typeof module && module.exports
      ? (module.exports = e(t, require('ev-emitter'), require('get-size'), require('fizzy-ui-utils'), require('./item')))
      : (t.Outlayer = e(t, t.EvEmitter, t.getSize, t.fizzyUIUtils, t.Outlayer.Item))
  })(window, function (t, e, i, n, o) {
    'use strict'
    function r(t, e) {
      var i,
        o = n.getQueryElement(t)
      o
        ? ((this.element = o),
          c && (this.$element = c(this.element)),
          (this.options = n.extend({}, this.constructor.defaults)),
          this.option(e),
          (i = ++u),
          (this.element.outlayerGUID = i),
          (d[i] = this)._create(),
          this._getOption('initLayout') && this.layout())
        : l && l.error('Bad element for ' + this.constructor.namespace + ': ' + (o || t))
    }
    function s(t) {
      function e() {
        t.apply(this, arguments)
      }
      return ((e.prototype = Object.create(t.prototype)).constructor = e)
    }
    function a() {}
    var l = t.console,
      c = t.jQuery,
      u = 0,
      d = {}
    ;(r.namespace = 'outlayer'),
      (r.Item = o),
      (r.defaults = {
        containerStyle: { position: 'relative' },
        initLayout: !0,
        originLeft: !0,
        originTop: !0,
        resize: !0,
        resizeContainer: !0,
        transitionDuration: '0.4s',
        hiddenStyle: { opacity: 0, transform: 'scale(0.001)' },
        visibleStyle: { opacity: 1, transform: 'scale(1)' }
      })
    var h = r.prototype
    n.extend(h, e.prototype),
      (h.option = function (t) {
        n.extend(this.options, t)
      }),
      (h._getOption = function (t) {
        var e = this.constructor.compatOptions[t]
        return e && void 0 !== this.options[e] ? this.options[e] : this.options[t]
      }),
      (r.compatOptions = {
        initLayout: 'isInitLayout',
        horizontal: 'isHorizontal',
        layoutInstant: 'isLayoutInstant',
        originLeft: 'isOriginLeft',
        originTop: 'isOriginTop',
        resize: 'isResizeBound',
        resizeContainer: 'isResizingContainer'
      }),
      (h._create = function () {
        this.reloadItems(),
          (this.stamps = []),
          this.stamp(this.options.stamp),
          n.extend(this.element.style, this.options.containerStyle),
          this._getOption('resize') && this.bindResize()
      }),
      (h.reloadItems = function () {
        this.items = this._itemize(this.element.children)
      }),
      (h._itemize = function (t) {
        for (var e = this._filterFindItemElements(t), i = this.constructor.Item, n = [], o = 0; o < e.length; o++) {
          var r = new i(e[o], this)
          n.push(r)
        }
        return n
      }),
      (h._filterFindItemElements = function (t) {
        return n.filterFindElements(t, this.options.itemSelector)
      }),
      (h.getItemElements = function () {
        return this.items.map(function (t) {
          return t.element
        })
      }),
      (h.layout = function () {
        this._resetLayout(), this._manageStamps()
        var t = this._getOption('layoutInstant'),
          e = void 0 !== t ? t : !this._isLayoutInited
        this.layoutItems(this.items, e), (this._isLayoutInited = !0)
      }),
      (h._init = h.layout),
      (h._resetLayout = function () {
        this.getSize()
      }),
      (h.getSize = function () {
        this.size = i(this.element)
      }),
      (h._getMeasurement = function (t, e) {
        var n,
          o = this.options[t]
        o ? ('string' == typeof o ? (n = this.element.querySelector(o)) : o instanceof HTMLElement && (n = o), (this[t] = n ? i(n)[e] : o)) : (this[t] = 0)
      }),
      (h.layoutItems = function (t, e) {
        ;(t = this._getItemsForLayout(t)), this._layoutItems(t, e), this._postLayout()
      }),
      (h._getItemsForLayout = function (t) {
        return t.filter(function (t) {
          return !t.isIgnored
        })
      }),
      (h._layoutItems = function (t, e) {
        var i
        this._emitCompleteOnItems('layout', t),
          t &&
            t.length &&
            ((i = []),
            t.forEach(function (t) {
              var n = this._getItemLayoutPosition(t)
              ;(n.item = t), (n.isInstant = e || t.isLayoutInstant), i.push(n)
            }, this),
            this._processLayoutQueue(i))
      }),
      (h._getItemLayoutPosition = function () {
        return { x: 0, y: 0 }
      }),
      (h._processLayoutQueue = function (t) {
        this.updateStagger(),
          t.forEach(function (t, e) {
            this._positionItem(t.item, t.x, t.y, t.isInstant, e)
          }, this)
      }),
      (h.updateStagger = function () {
        var t = this.options.stagger
        return null == t
          ? void (this.stagger = 0)
          : ((this.stagger = (function (t) {
              if ('number' == typeof t) return t
              var e = t.match(/(^\d*\.?\d*)(\w*)/),
                i = e && e[1],
                n = e && e[2]
              return i.length ? (i = parseFloat(i)) * (f[n] || 1) : 0
            })(t)),
            this.stagger)
      }),
      (h._positionItem = function (t, e, i, n, o) {
        n ? t.goTo(e, i) : (t.stagger(o * this.stagger), t.moveTo(e, i))
      }),
      (h._postLayout = function () {
        this.resizeContainer()
      }),
      (h.resizeContainer = function () {
        var t
        !this._getOption('resizeContainer') || ((t = this._getContainerSize()) && (this._setContainerMeasure(t.width, !0), this._setContainerMeasure(t.height, !1)))
      }),
      (h._getContainerSize = a),
      (h._setContainerMeasure = function (t, e) {
        var i
        void 0 !== t &&
          ((i = this.size).isBorderBox &&
            (t += e ? i.paddingLeft + i.paddingRight + i.borderLeftWidth + i.borderRightWidth : i.paddingBottom + i.paddingTop + i.borderTopWidth + i.borderBottomWidth),
          (t = Math.max(t, 0)),
          (this.element.style[e ? 'width' : 'height'] = t + 'px'))
      }),
      (h._emitCompleteOnItems = function (t, e) {
        function i() {
          r.dispatchEvent(t + 'Complete', null, [e])
        }
        function n() {
          ++o == s && i()
        }
        var o,
          r = this,
          s = e.length
        e && s
          ? ((o = 0),
            e.forEach(function (e) {
              e.once(t, n)
            }))
          : i()
      }),
      (h.dispatchEvent = function (t, e, i) {
        var n,
          o = e ? [e].concat(i) : i
        this.emitEvent(t, o),
          c && ((this.$element = this.$element || c(this.element)), e ? (((n = c.Event(e)).type = t), this.$element.trigger(n, i)) : this.$element.trigger(t, i))
      }),
      (h.ignore = function (t) {
        var e = this.getItem(t)
        e && (e.isIgnored = !0)
      }),
      (h.unignore = function (t) {
        var e = this.getItem(t)
        e && delete e.isIgnored
      }),
      (h.stamp = function (t) {
        ;(t = this._find(t)) && ((this.stamps = this.stamps.concat(t)), t.forEach(this.ignore, this))
      }),
      (h.unstamp = function (t) {
        ;(t = this._find(t)) &&
          t.forEach(function (t) {
            n.removeFrom(this.stamps, t), this.unignore(t)
          }, this)
      }),
      (h._find = function (t) {
        if (t) return 'string' == typeof t && (t = this.element.querySelectorAll(t)), n.makeArray(t)
      }),
      (h._manageStamps = function () {
        this.stamps && this.stamps.length && (this._getBoundingRect(), this.stamps.forEach(this._manageStamp, this))
      }),
      (h._getBoundingRect = function () {
        var t = this.element.getBoundingClientRect(),
          e = this.size
        this._boundingRect = {
          left: t.left + e.paddingLeft + e.borderLeftWidth,
          top: t.top + e.paddingTop + e.borderTopWidth,
          right: t.right - (e.paddingRight + e.borderRightWidth),
          bottom: t.bottom - (e.paddingBottom + e.borderBottomWidth)
        }
      }),
      (h._manageStamp = a),
      (h._getElementOffset = function (t) {
        var e = t.getBoundingClientRect(),
          n = this._boundingRect,
          o = i(t)
        return { left: e.left - n.left - o.marginLeft, top: e.top - n.top - o.marginTop, right: n.right - e.right - o.marginRight, bottom: n.bottom - e.bottom - o.marginBottom }
      }),
      (h.handleEvent = n.handleEvent),
      (h.bindResize = function () {
        t.addEventListener('resize', this), (this.isResizeBound = !0)
      }),
      (h.unbindResize = function () {
        t.removeEventListener('resize', this), (this.isResizeBound = !1)
      }),
      (h.onresize = function () {
        this.resize()
      }),
      n.debounceMethod(r, 'onresize', 100),
      (h.resize = function () {
        this.isResizeBound && this.needsResizeLayout() && this.layout()
      }),
      (h.needsResizeLayout = function () {
        var t = i(this.element)
        return this.size && t && t.innerWidth !== this.size.innerWidth
      }),
      (h.addItems = function (t) {
        var e = this._itemize(t)
        return e.length && (this.items = this.items.concat(e)), e
      }),
      (h.appended = function (t) {
        var e = this.addItems(t)
        e.length && (this.layoutItems(e, !0), this.reveal(e))
      }),
      (h.prepended = function (t) {
        var e,
          i = this._itemize(t)
        i.length && ((e = this.items.slice(0)), (this.items = i.concat(e)), this._resetLayout(), this._manageStamps(), this.layoutItems(i, !0), this.reveal(i), this.layoutItems(e))
      }),
      (h.reveal = function (t) {
        var e
        this._emitCompleteOnItems('reveal', t),
          t &&
            t.length &&
            ((e = this.updateStagger()),
            t.forEach(function (t, i) {
              t.stagger(i * e), t.reveal()
            }))
      }),
      (h.hide = function (t) {
        var e
        this._emitCompleteOnItems('hide', t),
          t &&
            t.length &&
            ((e = this.updateStagger()),
            t.forEach(function (t, i) {
              t.stagger(i * e), t.hide()
            }))
      }),
      (h.revealItemElements = function (t) {
        var e = this.getItems(t)
        this.reveal(e)
      }),
      (h.hideItemElements = function (t) {
        var e = this.getItems(t)
        this.hide(e)
      }),
      (h.getItem = function (t) {
        for (var e = 0; e < this.items.length; e++) {
          var i = this.items[e]
          if (i.element == t) return i
        }
      }),
      (h.getItems = function (t) {
        t = n.makeArray(t)
        var e = []
        return (
          t.forEach(function (t) {
            var i = this.getItem(t)
            i && e.push(i)
          }, this),
          e
        )
      }),
      (h.remove = function (t) {
        var e = this.getItems(t)
        this._emitCompleteOnItems('remove', e),
          e &&
            e.length &&
            e.forEach(function (t) {
              t.remove(), n.removeFrom(this.items, t)
            }, this)
      }),
      (h.destroy = function () {
        var t = this.element.style
        ;(t.height = ''),
          (t.position = ''),
          (t.width = ''),
          this.items.forEach(function (t) {
            t.destroy()
          }),
          this.unbindResize()
        var e = this.element.outlayerGUID
        delete d[e], delete this.element.outlayerGUID, c && c.removeData(this.element, this.constructor.namespace)
      }),
      (r.data = function (t) {
        var e = (t = n.getQueryElement(t)) && t.outlayerGUID
        return e && d[e]
      }),
      (r.create = function (t, e) {
        var i = s(r)
        return (
          (i.defaults = n.extend({}, r.defaults)),
          n.extend(i.defaults, e),
          (i.compatOptions = n.extend({}, r.compatOptions)),
          (i.namespace = t),
          (i.data = r.data),
          (i.Item = s(o)),
          n.htmlInit(i, t),
          c && c.bridget && c.bridget(t, i),
          i
        )
      })
    var f = { ms: 1, s: 1e3 }
    return (r.Item = o), r
  }),
  (function (t, e) {
    'function' == typeof define && define.amd
      ? define('isotope/js/item', ['outlayer/outlayer'], e)
      : 'object' == typeof module && module.exports
      ? (module.exports = e(require('outlayer')))
      : ((t.Isotope = t.Isotope || {}), (t.Isotope.Item = e(t.Outlayer)))
  })(window, function (t) {
    'use strict'
    function e() {
      t.Item.apply(this, arguments)
    }
    var i = (e.prototype = Object.create(t.Item.prototype)),
      n = i._create
    ;(i._create = function () {
      ;(this.id = this.layout.itemGUID++), n.call(this), (this.sortData = {})
    }),
      (i.updateSortData = function () {
        if (!this.isIgnored) {
          ;(this.sortData.id = this.id), (this.sortData['original-order'] = this.id), (this.sortData.random = Math.random())
          var t = this.layout.options.getSortData,
            e = this.layout._sorters
          for (var i in t) {
            var n = e[i]
            this.sortData[i] = n(this.element, this)
          }
        }
      })
    var o = i.destroy
    return (
      (i.destroy = function () {
        o.apply(this, arguments), this.css({ display: '' })
      }),
      e
    )
  }),
  (function (t, e) {
    'function' == typeof define && define.amd
      ? define('isotope/js/layout-mode', ['get-size/get-size', 'outlayer/outlayer'], e)
      : 'object' == typeof module && module.exports
      ? (module.exports = e(require('get-size'), require('outlayer')))
      : ((t.Isotope = t.Isotope || {}), (t.Isotope.LayoutMode = e(t.getSize, t.Outlayer)))
  })(window, function (t, e) {
    'use strict'
    function i(t) {
      ;(this.isotope = t) && ((this.options = t.options[this.namespace]), (this.element = t.element), (this.items = t.filteredItems), (this.size = t.size))
    }
    var n = i.prototype
    return (
      ['_resetLayout', '_getItemLayoutPosition', '_manageStamp', '_getContainerSize', '_getElementOffset', 'needsResizeLayout', '_getOption'].forEach(function (t) {
        n[t] = function () {
          return e.prototype[t].apply(this.isotope, arguments)
        }
      }),
      (n.needsVerticalResizeLayout = function () {
        var e = t(this.isotope.element)
        return this.isotope.size && e && e.innerHeight != this.isotope.size.innerHeight
      }),
      (n._getMeasurement = function () {
        this.isotope._getMeasurement.apply(this, arguments)
      }),
      (n.getColumnWidth = function () {
        this.getSegmentSize('column', 'Width')
      }),
      (n.getRowHeight = function () {
        this.getSegmentSize('row', 'Height')
      }),
      (n.getSegmentSize = function (t, e) {
        var i,
          n = t + e,
          o = 'outer' + e
        this._getMeasurement(n, o), this[n] || ((i = this.getFirstItemSize()), (this[n] = (i && i[o]) || this.isotope.size['inner' + e]))
      }),
      (n.getFirstItemSize = function () {
        var e = this.isotope.filteredItems[0]
        return e && e.element && t(e.element)
      }),
      (n.layout = function () {
        this.isotope.layout.apply(this.isotope, arguments)
      }),
      (n.getSize = function () {
        this.isotope.getSize(), (this.size = this.isotope.size)
      }),
      (i.modes = {}),
      (i.create = function (t, e) {
        function o() {
          i.apply(this, arguments)
        }
        return ((o.prototype = Object.create(n)).constructor = o), e && (o.options = e), (i.modes[(o.prototype.namespace = t)] = o)
      }),
      i
    )
  }),
  (function (t, e) {
    'function' == typeof define && define.amd
      ? define('masonry/masonry', ['outlayer/outlayer', 'get-size/get-size'], e)
      : 'object' == typeof module && module.exports
      ? (module.exports = e(require('outlayer'), require('get-size')))
      : (t.Masonry = e(t.Outlayer, t.getSize))
  })(window, function (t, e) {
    var i = t.create('masonry')
    i.compatOptions.fitWidth = 'isFitWidth'
    var n = i.prototype
    return (
      (n._resetLayout = function () {
        this.getSize(), this._getMeasurement('columnWidth', 'outerWidth'), this._getMeasurement('gutter', 'outerWidth'), this.measureColumns(), (this.colYs = [])
        for (var t = 0; t < this.cols; t++) this.colYs.push(0)
        ;(this.maxY = 0), (this.horizontalColIndex = 0)
      }),
      (n.measureColumns = function () {
        var t, i
        this.getContainerWidth(), this.columnWidth || ((i = (t = this.items[0]) && t.element), (this.columnWidth = (i && e(i).outerWidth) || this.containerWidth))
        var n = (this.columnWidth += this.gutter),
          o = this.containerWidth + this.gutter,
          r = o / n,
          s = n - (o % n)
        r = Math[s && s < 1 ? 'round' : 'floor'](r)
        this.cols = Math.max(r, 1)
      }),
      (n.getContainerWidth = function () {
        var t = this._getOption('fitWidth') ? this.element.parentNode : this.element,
          i = e(t)
        this.containerWidth = i && i.innerWidth
      }),
      (n._getItemLayoutPosition = function (t) {
        t.getSize()
        for (
          var e = t.size.outerWidth % this.columnWidth,
            i = Math[e && e < 1 ? 'round' : 'ceil'](t.size.outerWidth / this.columnWidth),
            n = ((i = Math.min(i, this.cols)), this[this.options.horizontalOrder ? '_getHorizontalColPosition' : '_getTopColPosition'](i, t)),
            o = { x: this.columnWidth * n.col, y: n.y },
            r = n.y + t.size.outerHeight,
            s = i + n.col,
            a = n.col;
          a < s;
          a++
        )
          this.colYs[a] = r
        return o
      }),
      (n._getTopColPosition = function (t) {
        var e = this._getTopColGroup(t),
          i = Math.min.apply(Math, e)
        return { col: e.indexOf(i), y: i }
      }),
      (n._getTopColGroup = function (t) {
        if (t < 2) return this.colYs
        for (var e = [], i = this.cols + 1 - t, n = 0; n < i; n++) e[n] = this._getColGroupY(n, t)
        return e
      }),
      (n._getColGroupY = function (t, e) {
        if (e < 2) return this.colYs[t]
        var i = this.colYs.slice(t, t + e)
        return Math.max.apply(Math, i)
      }),
      (n._getHorizontalColPosition = function (t, e) {
        var i = this.horizontalColIndex % this.cols,
          n = ((i = 1 < t && i + t > this.cols ? 0 : i), e.size.outerWidth && e.size.outerHeight)
        return (this.horizontalColIndex = n ? i + t : this.horizontalColIndex), { col: i, y: this._getColGroupY(i, t) }
      }),
      (n._manageStamp = function (t) {
        var i = e(t),
          n = this._getElementOffset(t),
          o = this._getOption('originLeft') ? n.left : n.right,
          r = o + i.outerWidth,
          s = Math.floor(o / this.columnWidth),
          a = ((s = Math.max(0, s)), Math.floor(r / this.columnWidth))
        ;(a -= r % this.columnWidth ? 0 : 1), (a = Math.min(this.cols - 1, a))
        for (var l = (this._getOption('originTop') ? n.top : n.bottom) + i.outerHeight, c = s; c <= a; c++) this.colYs[c] = Math.max(l, this.colYs[c])
      }),
      (n._getContainerSize = function () {
        this.maxY = Math.max.apply(Math, this.colYs)
        var t = { height: this.maxY }
        return this._getOption('fitWidth') && (t.width = this._getContainerFitWidth()), t
      }),
      (n._getContainerFitWidth = function () {
        for (var t = 0, e = this.cols; --e && 0 === this.colYs[e]; ) t++
        return (this.cols - t) * this.columnWidth - this.gutter
      }),
      (n.needsResizeLayout = function () {
        var t = this.containerWidth
        return this.getContainerWidth(), t != this.containerWidth
      }),
      i
    )
  }),
  (function (t, e) {
    'function' == typeof define && define.amd
      ? define('isotope/js/layout-modes/masonry', ['../layout-mode', 'masonry/masonry'], e)
      : 'object' == typeof module && module.exports
      ? (module.exports = e(require('../layout-mode'), require('masonry-layout')))
      : e(t.Isotope.LayoutMode, t.Masonry)
  })(window, function (t, e) {
    'use strict'
    var i = t.create('masonry'),
      n = i.prototype,
      o = { _getElementOffset: !0, layout: !0, _getMeasurement: !0 }
    for (var r in e.prototype) o[r] || (n[r] = e.prototype[r])
    var s = n.measureColumns
    n.measureColumns = function () {
      ;(this.items = this.isotope.filteredItems), s.call(this)
    }
    var a = n._getOption
    return (
      (n._getOption = function (t) {
        return 'fitWidth' == t ? (void 0 !== this.options.isFitWidth ? this.options.isFitWidth : this.options.fitWidth) : a.apply(this.isotope, arguments)
      }),
      i
    )
  }),
  (function (t, e) {
    'function' == typeof define && define.amd
      ? define('isotope/js/layout-modes/fit-rows', ['../layout-mode'], e)
      : 'object' == typeof exports
      ? (module.exports = e(require('../layout-mode')))
      : e(t.Isotope.LayoutMode)
  })(window, function (t) {
    'use strict'
    var e = t.create('fitRows'),
      i = e.prototype
    return (
      (i._resetLayout = function () {
        ;(this.x = 0), (this.y = 0), (this.maxY = 0), this._getMeasurement('gutter', 'outerWidth')
      }),
      (i._getItemLayoutPosition = function (t) {
        t.getSize()
        var e = t.size.outerWidth + this.gutter,
          i = this.isotope.size.innerWidth + this.gutter
        0 !== this.x && e + this.x > i && ((this.x = 0), (this.y = this.maxY))
        var n = { x: this.x, y: this.y }
        return (this.maxY = Math.max(this.maxY, this.y + t.size.outerHeight)), (this.x += e), n
      }),
      (i._getContainerSize = function () {
        return { height: this.maxY }
      }),
      e
    )
  }),
  (function (t, e) {
    'function' == typeof define && define.amd
      ? define('isotope/js/layout-modes/vertical', ['../layout-mode'], e)
      : 'object' == typeof module && module.exports
      ? (module.exports = e(require('../layout-mode')))
      : e(t.Isotope.LayoutMode)
  })(window, function (t) {
    'use strict'
    var e = t.create('vertical', { horizontalAlignment: 0 }),
      i = e.prototype
    return (
      (i._resetLayout = function () {
        this.y = 0
      }),
      (i._getItemLayoutPosition = function (t) {
        t.getSize()
        var e = (this.isotope.size.innerWidth - t.size.outerWidth) * this.options.horizontalAlignment,
          i = this.y
        return (this.y += t.size.outerHeight), { x: e, y: i }
      }),
      (i._getContainerSize = function () {
        return { height: this.y }
      }),
      e
    )
  }),
  (function (t, e) {
    'function' == typeof define && define.amd
      ? define(
          [
            'outlayer/outlayer',
            'get-size/get-size',
            'desandro-matches-selector/matches-selector',
            'fizzy-ui-utils/utils',
            'isotope/js/item',
            'isotope/js/layout-mode',
            'isotope/js/layout-modes/masonry',
            'isotope/js/layout-modes/fit-rows',
            'isotope/js/layout-modes/vertical'
          ],
          function (i, n, o, r, s, a) {
            return e(t, i, 0, o, r, s, a)
          }
        )
      : 'object' == typeof module && module.exports
      ? (module.exports = e(
          t,
          require('outlayer'),
          require('get-size'),
          require('desandro-matches-selector'),
          require('fizzy-ui-utils'),
          require('isotope/js/item'),
          require('isotope/js/layout-mode'),
          require('isotope/js/layout-modes/masonry'),
          require('isotope/js/layout-modes/fit-rows'),
          require('isotope/js/layout-modes/vertical')
        ))
      : (t.Isotope = e(t, t.Outlayer, t.getSize, t.matchesSelector, t.fizzyUIUtils, t.Isotope.Item, t.Isotope.LayoutMode))
  })(window, function (t, e, i, n, o, r, s) {
    var a = t.jQuery,
      l = String.prototype.trim
        ? function (t) {
            return t.trim()
          }
        : function (t) {
            return t.replace(/^\s+|\s+$/g, '')
          },
      c = e.create('isotope', { layoutMode: 'masonry', isJQueryFiltering: !0, sortAscending: !0 })
    ;(c.Item = r), (c.LayoutMode = s)
    var u = c.prototype
    ;(u._create = function () {
      for (var t in ((this.itemGUID = 0),
      (this._sorters = {}),
      this._getSorters(),
      e.prototype._create.call(this),
      (this.modes = {}),
      (this.filteredItems = this.items),
      (this.sortHistory = ['original-order']),
      s.modes))
        this._initLayoutMode(t)
    }),
      (u.reloadItems = function () {
        ;(this.itemGUID = 0), e.prototype.reloadItems.call(this)
      }),
      (u._itemize = function () {
        for (var t = e.prototype._itemize.apply(this, arguments), i = 0; i < t.length; i++) t[i].id = this.itemGUID++
        return this._updateItemsSortData(t), t
      }),
      (u._initLayoutMode = function (t) {
        var e = s.modes[t],
          i = this.options[t] || {}
        ;(this.options[t] = e.options ? o.extend(e.options, i) : i), (this.modes[t] = new e(this))
      }),
      (u.layout = function () {
        return !this._isLayoutInited && this._getOption('initLayout') ? void this.arrange() : void this._layout()
      }),
      (u._layout = function () {
        var t = this._getIsInstant()
        this._resetLayout(), this._manageStamps(), this.layoutItems(this.filteredItems, t), (this._isLayoutInited = !0)
      }),
      (u.arrange = function (t) {
        this.option(t), this._getIsInstant()
        var e = this._filter(this.items)
        ;(this.filteredItems = e.matches),
          this._bindArrangeComplete(),
          this._isInstant ? this._noTransition(this._hideReveal, [e]) : this._hideReveal(e),
          this._sort(),
          this._layout()
      }),
      (u._init = u.arrange),
      (u._hideReveal = function (t) {
        this.reveal(t.needReveal), this.hide(t.needHide)
      }),
      (u._getIsInstant = function () {
        var t = this._getOption('layoutInstant'),
          e = void 0 !== t ? t : !this._isLayoutInited
        return (this._isInstant = e)
      }),
      (u._bindArrangeComplete = function () {
        function t() {
          e && i && n && o.dispatchEvent('arrangeComplete', null, [o.filteredItems])
        }
        var e,
          i,
          n,
          o = this
        this.once('layoutComplete', function () {
          ;(e = !0), t()
        }),
          this.once('hideComplete', function () {
            ;(i = !0), t()
          }),
          this.once('revealComplete', function () {
            ;(n = !0), t()
          })
      }),
      (u._filter = function (t) {
        for (var e = (e = this.options.filter) || '*', i = [], n = [], o = [], r = this._getFilterTest(e), s = 0; s < t.length; s++) {
          var a,
            l = t[s]
          l.isIgnored || ((a = r(l)) && i.push(l), a && l.isHidden ? n.push(l) : a || l.isHidden || o.push(l))
        }
        return { matches: i, needReveal: n, needHide: o }
      }),
      (u._getFilterTest = function (t) {
        return a && this.options.isJQueryFiltering
          ? function (e) {
              return a(e.element).is(t)
            }
          : 'function' == typeof t
          ? function (e) {
              return t(e.element)
            }
          : function (e) {
              return n(e.element, t)
            }
      }),
      (u.updateSortData = function (t) {
        var e = t ? ((t = o.makeArray(t)), this.getItems(t)) : this.items
        this._getSorters(), this._updateItemsSortData(e)
      }),
      (u._getSorters = function () {
        var t = this.options.getSortData
        for (var e in t) {
          var i = t[e]
          this._sorters[e] = d(i)
        }
      }),
      (u._updateItemsSortData = function (t) {
        for (var e = t && t.length, i = 0; e && i < e; i++) t[i].updateSortData()
      })
    var d = function (t) {
      if ('string' != typeof t) return t
      var e,
        i,
        n = l(t).split(' '),
        o = n[0],
        r = o.match(/^\[(.+)\]$/),
        s = r && r[1],
        a =
          ((i = o),
          (e = s)
            ? function (t) {
                return t.getAttribute(e)
              }
            : function (t) {
                var e = t.querySelector(i)
                return e && e.textContent
              }),
        u = c.sortDataParsers[n[1]]
      return u
        ? function (t) {
            return t && u(a(t))
          }
        : function (t) {
            return t && a(t)
          }
    }
    ;(c.sortDataParsers = {
      parseInt: function (t) {
        return parseInt(t, 10)
      },
      parseFloat: function (t) {
        return parseFloat(t)
      }
    }),
      (u._sort = function () {
        var t, e, i, n
        this.options.sortBy &&
          ((t = o.makeArray(this.options.sortBy)),
          this._getIsSameSortBy(t) || (this.sortHistory = t.concat(this.sortHistory)),
          (i = this.sortHistory),
          (n = this.options.sortAscending),
          (e = function (t, e) {
            for (var o = 0; o < i.length; o++) {
              var r = i[o],
                s = t.sortData[r],
                a = e.sortData[r]
              if (a < s || s < a) return (a < s ? 1 : -1) * ((void 0 !== n[r] ? n[r] : n) ? 1 : -1)
            }
            return 0
          }),
          this.filteredItems.sort(e))
      }),
      (u._getIsSameSortBy = function (t) {
        for (var e = 0; e < t.length; e++) if (t[e] != this.sortHistory[e]) return !1
        return !0
      }),
      (u._mode = function () {
        var t = this.options.layoutMode,
          e = this.modes[t]
        if (!e) throw new Error('No layout mode: ' + t)
        return (e.options = this.options[t]), e
      }),
      (u._resetLayout = function () {
        e.prototype._resetLayout.call(this), this._mode()._resetLayout()
      }),
      (u._getItemLayoutPosition = function (t) {
        return this._mode()._getItemLayoutPosition(t)
      }),
      (u._manageStamp = function (t) {
        this._mode()._manageStamp(t)
      }),
      (u._getContainerSize = function () {
        return this._mode()._getContainerSize()
      }),
      (u.needsResizeLayout = function () {
        return this._mode().needsResizeLayout()
      }),
      (u.appended = function (t) {
        var e,
          i = this.addItems(t)
        i.length && ((e = this._filterRevealAdded(i)), (this.filteredItems = this.filteredItems.concat(e)))
      }),
      (u.prepended = function (t) {
        var e,
          i = this._itemize(t)
        i.length &&
          (this._resetLayout(),
          this._manageStamps(),
          (e = this._filterRevealAdded(i)),
          this.layoutItems(this.filteredItems),
          (this.filteredItems = e.concat(this.filteredItems)),
          (this.items = i.concat(this.items)))
      }),
      (u._filterRevealAdded = function (t) {
        var e = this._filter(t)
        return this.hide(e.needHide), this.reveal(e.matches), this.layoutItems(e.matches, !0), e.matches
      }),
      (u.insert = function (t) {
        var e = this.addItems(t)
        if (e.length) {
          for (var i, n = e.length, o = 0; o < n; o++) (i = e[o]), this.element.appendChild(i.element)
          var r = this._filter(e).matches
          for (o = 0; o < n; o++) e[o].isLayoutInstant = !0
          for (this.arrange(), o = 0; o < n; o++) delete e[o].isLayoutInstant
          this.reveal(r)
        }
      })
    var h = u.remove
    return (
      (u.remove = function (t) {
        t = o.makeArray(t)
        var e = this.getItems(t)
        h.call(this, t)
        for (var i = e && e.length, n = 0; i && n < i; n++) {
          var r = e[n]
          o.removeFrom(this.filteredItems, r)
        }
      }),
      (u.shuffle = function () {
        for (var t = 0; t < this.items.length; t++) this.items[t].sortData.random = Math.random()
        ;(this.options.sortBy = 'random'), this._sort(), this._layout()
      }),
      (u._noTransition = function (t, e) {
        var i = this.options.transitionDuration
        this.options.transitionDuration = 0
        var n = t.apply(this, e)
        return (this.options.transitionDuration = i), n
      }),
      (u.getFilteredItemElements = function () {
        return this.filteredItems.map(function (t) {
          return t.element
        })
      }),
      c
    )
  }),
  (function (t) {
    'object' == typeof exports && 'undefined' != typeof module
      ? (module.exports = t())
      : 'function' == typeof define && define.amd
      ? define([], t)
      : (('undefined' != typeof window ? window : 'undefined' != typeof global ? global : 'undefined' != typeof self ? self : this).Chart = t())
  })(function () {
    return (function t(e, i, n) {
      function o(s, a) {
        if (!i[s]) {
          if (!e[s]) {
            var l = 'function' == typeof require && require
            if (!a && l) return l(s, !0)
            if (r) return r(s, !0)
            var c = new Error("Cannot find module '" + s + "'")
            throw ((c.code = 'MODULE_NOT_FOUND'), c)
          }
          var u = (i[s] = { exports: {} })
          e[s][0].call(
            u.exports,
            function (t) {
              return o(e[s][1][t] || t)
            },
            u,
            u.exports,
            t,
            e,
            i,
            n
          )
        }
        return i[s].exports
      }
      for (var r = 'function' == typeof require && require, s = 0; s < n.length; s++) o(n[s])
      return o
    })(
      {
        1: [function (t, e, i) {}, {}],
        2: [
          function (t, e, i) {
            function n(t) {
              if (t) {
                var e = [0, 0, 0],
                  i = 1,
                  n = t.match(/^#([a-fA-F0-9]{3})$/)
                if (n) {
                  n = n[1]
                  for (var o = 0; o < e.length; o++) e[o] = parseInt(n[o] + n[o], 16)
                } else if ((n = t.match(/^#([a-fA-F0-9]{6})$/))) for (n = n[1], o = 0; o < e.length; o++) e[o] = parseInt(n.slice(2 * o, 2 * o + 2), 16)
                else if ((n = t.match(/^rgba?\(\s*([+-]?\d+)\s*,\s*([+-]?\d+)\s*,\s*([+-]?\d+)\s*(?:,\s*([+-]?[\d\.]+)\s*)?\)$/))) {
                  for (o = 0; o < e.length; o++) e[o] = parseInt(n[o + 1])
                  i = parseFloat(n[4])
                } else if ((n = t.match(/^rgba?\(\s*([+-]?[\d\.]+)\%\s*,\s*([+-]?[\d\.]+)\%\s*,\s*([+-]?[\d\.]+)\%\s*(?:,\s*([+-]?[\d\.]+)\s*)?\)$/))) {
                  for (o = 0; o < e.length; o++) e[o] = Math.round(2.55 * parseFloat(n[o + 1]))
                  i = parseFloat(n[4])
                } else if ((n = t.match(/(\w+)/))) {
                  if ('transparent' == n[1]) return [0, 0, 0, 0]
                  if (!(e = d[n[1]])) return
                }
                for (o = 0; o < e.length; o++) e[o] = c(e[o], 0, 255)
                return (i = i || 0 == i ? c(i, 0, 1) : 1), (e[3] = i), e
              }
            }
            function o(t) {
              if (t) {
                var e = t.match(/^hsla?\(\s*([+-]?\d+)(?:deg)?\s*,\s*([+-]?[\d\.]+)%\s*,\s*([+-]?[\d\.]+)%\s*(?:,\s*([+-]?[\d\.]+)\s*)?\)/)
                if (e) {
                  var i = parseFloat(e[4])
                  return [c(parseInt(e[1]), 0, 360), c(parseFloat(e[2]), 0, 100), c(parseFloat(e[3]), 0, 100), c(isNaN(i) ? 1 : i, 0, 1)]
                }
              }
            }
            function r(t) {
              if (t) {
                var e = t.match(/^hwb\(\s*([+-]?\d+)(?:deg)?\s*,\s*([+-]?[\d\.]+)%\s*,\s*([+-]?[\d\.]+)%\s*(?:,\s*([+-]?[\d\.]+)\s*)?\)/)
                if (e) {
                  var i = parseFloat(e[4])
                  return [c(parseInt(e[1]), 0, 360), c(parseFloat(e[2]), 0, 100), c(parseFloat(e[3]), 0, 100), c(isNaN(i) ? 1 : i, 0, 1)]
                }
              }
            }
            function s(t, e) {
              return void 0 === e && (e = void 0 !== t[3] ? t[3] : 1), 'rgba(' + t[0] + ', ' + t[1] + ', ' + t[2] + ', ' + e + ')'
            }
            function a(t, e) {
              return 'rgba(' + Math.round((t[0] / 255) * 100) + '%, ' + Math.round((t[1] / 255) * 100) + '%, ' + Math.round((t[2] / 255) * 100) + '%, ' + (e || t[3] || 1) + ')'
            }
            function l(t, e) {
              return void 0 === e && (e = void 0 !== t[3] ? t[3] : 1), 'hsla(' + t[0] + ', ' + t[1] + '%, ' + t[2] + '%, ' + e + ')'
            }
            function c(t, e, i) {
              return Math.min(Math.max(e, t), i)
            }
            function u(t) {
              var e = t.toString(16).toUpperCase()
              return e.length < 2 ? '0' + e : e
            }
            var d = t(6)
            e.exports = {
              getRgba: n,
              getHsla: o,
              getRgb: function (t) {
                var e = n(t)
                return e && e.slice(0, 3)
              },
              getHsl: function (t) {
                var e = o(t)
                return e && e.slice(0, 3)
              },
              getHwb: r,
              getAlpha: function (t) {
                var e = n(t)
                return (e = e || o(t)) || (e = r(t)) ? e[3] : void 0
              },
              hexString: function (t) {
                return '#' + u(t[0]) + u(t[1]) + u(t[2])
              },
              rgbString: function (t, e) {
                return e < 1 || (t[3] && t[3] < 1) ? s(t, e) : 'rgb(' + t[0] + ', ' + t[1] + ', ' + t[2] + ')'
              },
              rgbaString: s,
              percentString: function (t, e) {
                return e < 1 || (t[3] && t[3] < 1)
                  ? a(t, e)
                  : 'rgb(' + Math.round((t[0] / 255) * 100) + '%, ' + Math.round((t[1] / 255) * 100) + '%, ' + Math.round((t[2] / 255) * 100) + '%)'
              },
              percentaString: a,
              hslString: function (t, e) {
                return e < 1 || (t[3] && t[3] < 1) ? l(t, e) : 'hsl(' + t[0] + ', ' + t[1] + '%, ' + t[2] + '%)'
              },
              hslaString: l,
              hwbString: function (t, e) {
                return void 0 === e && (e = void 0 !== t[3] ? t[3] : 1), 'hwb(' + t[0] + ', ' + t[1] + '%, ' + t[2] + '%' + (void 0 !== e && 1 !== e ? ', ' + e : '') + ')'
              },
              keyword: function (t) {
                return h[t.slice(0, 3)]
              }
            }
            var h = {}
            for (var f in d) h[d[f]] = f
          },
          { 6: 6 }
        ],
        3: [
          function (t, e, i) {
            var n = t(5),
              o = t(2),
              r = function (t) {
                if (t instanceof r) return t
                if (!(this instanceof r)) return new r(t)
                var e
                if (((this.values = { rgb: [0, 0, 0], hsl: [0, 0, 0], hsv: [0, 0, 0], hwb: [0, 0, 0], cmyk: [0, 0, 0, 0], alpha: 1 }), 'string' == typeof t))
                  if ((e = o.getRgba(t))) this.setValues('rgb', e)
                  else if ((e = o.getHsla(t))) this.setValues('hsl', e)
                  else {
                    if (!(e = o.getHwb(t))) throw new Error('Unable to parse color from string "' + t + '"')
                    this.setValues('hwb', e)
                  }
                else if ('object' == typeof t)
                  if (void 0 !== (e = t).r || void 0 !== e.red) this.setValues('rgb', e)
                  else if (void 0 !== e.l || void 0 !== e.lightness) this.setValues('hsl', e)
                  else if (void 0 !== e.v || void 0 !== e.value) this.setValues('hsv', e)
                  else if (void 0 !== e.w || void 0 !== e.whiteness) this.setValues('hwb', e)
                  else {
                    if (void 0 === e.c && void 0 === e.cyan) throw new Error('Unable to parse color from object ' + JSON.stringify(t))
                    this.setValues('cmyk', e)
                  }
              }
            ;(r.prototype = {
              rgb: function () {
                return this.setSpace('rgb', arguments)
              },
              hsl: function () {
                return this.setSpace('hsl', arguments)
              },
              hsv: function () {
                return this.setSpace('hsv', arguments)
              },
              hwb: function () {
                return this.setSpace('hwb', arguments)
              },
              cmyk: function () {
                return this.setSpace('cmyk', arguments)
              },
              rgbArray: function () {
                return this.values.rgb
              },
              hslArray: function () {
                return this.values.hsl
              },
              hsvArray: function () {
                return this.values.hsv
              },
              hwbArray: function () {
                var t = this.values
                return 1 !== t.alpha ? t.hwb.concat([t.alpha]) : t.hwb
              },
              cmykArray: function () {
                return this.values.cmyk
              },
              rgbaArray: function () {
                var t = this.values
                return t.rgb.concat([t.alpha])
              },
              hslaArray: function () {
                var t = this.values
                return t.hsl.concat([t.alpha])
              },
              alpha: function (t) {
                return void 0 === t ? this.values.alpha : (this.setValues('alpha', t), this)
              },
              red: function (t) {
                return this.setChannel('rgb', 0, t)
              },
              green: function (t) {
                return this.setChannel('rgb', 1, t)
              },
              blue: function (t) {
                return this.setChannel('rgb', 2, t)
              },
              hue: function (t) {
                return t && (t = (t %= 360) < 0 ? 360 + t : t), this.setChannel('hsl', 0, t)
              },
              saturation: function (t) {
                return this.setChannel('hsl', 1, t)
              },
              lightness: function (t) {
                return this.setChannel('hsl', 2, t)
              },
              saturationv: function (t) {
                return this.setChannel('hsv', 1, t)
              },
              whiteness: function (t) {
                return this.setChannel('hwb', 1, t)
              },
              blackness: function (t) {
                return this.setChannel('hwb', 2, t)
              },
              value: function (t) {
                return this.setChannel('hsv', 2, t)
              },
              cyan: function (t) {
                return this.setChannel('cmyk', 0, t)
              },
              magenta: function (t) {
                return this.setChannel('cmyk', 1, t)
              },
              yellow: function (t) {
                return this.setChannel('cmyk', 2, t)
              },
              black: function (t) {
                return this.setChannel('cmyk', 3, t)
              },
              hexString: function () {
                return o.hexString(this.values.rgb)
              },
              rgbString: function () {
                return o.rgbString(this.values.rgb, this.values.alpha)
              },
              rgbaString: function () {
                return o.rgbaString(this.values.rgb, this.values.alpha)
              },
              percentString: function () {
                return o.percentString(this.values.rgb, this.values.alpha)
              },
              hslString: function () {
                return o.hslString(this.values.hsl, this.values.alpha)
              },
              hslaString: function () {
                return o.hslaString(this.values.hsl, this.values.alpha)
              },
              hwbString: function () {
                return o.hwbString(this.values.hwb, this.values.alpha)
              },
              keyword: function () {
                return o.keyword(this.values.rgb, this.values.alpha)
              },
              rgbNumber: function () {
                var t = this.values.rgb
                return (t[0] << 16) | (t[1] << 8) | t[2]
              },
              luminosity: function () {
                for (var t = this.values.rgb, e = [], i = 0; i < t.length; i++) {
                  var n = t[i] / 255
                  e[i] = n <= 0.03928 ? n / 12.92 : Math.pow((0.055 + n) / 1.055, 2.4)
                }
                return 0.2126 * e[0] + 0.7152 * e[1] + 0.0722 * e[2]
              },
              contrast: function (t) {
                var e = this.luminosity(),
                  i = t.luminosity()
                return i < e ? (e + 0.05) / (i + 0.05) : (i + 0.05) / (e + 0.05)
              },
              level: function (t) {
                var e = this.contrast(t)
                return 7.1 <= e ? 'AAA' : 4.5 <= e ? 'AA' : ''
              },
              dark: function () {
                var t = this.values.rgb
                return (299 * t[0] + 587 * t[1] + 114 * t[2]) / 1e3 < 128
              },
              light: function () {
                return !this.dark()
              },
              negate: function () {
                for (var t = [], e = 0; e < 3; e++) t[e] = 255 - this.values.rgb[e]
                return this.setValues('rgb', t), this
              },
              lighten: function (t) {
                var e = this.values.hsl
                return (e[2] += e[2] * t), this.setValues('hsl', e), this
              },
              darken: function (t) {
                var e = this.values.hsl
                return (e[2] -= e[2] * t), this.setValues('hsl', e), this
              },
              saturate: function (t) {
                var e = this.values.hsl
                return (e[1] += e[1] * t), this.setValues('hsl', e), this
              },
              desaturate: function (t) {
                var e = this.values.hsl
                return (e[1] -= e[1] * t), this.setValues('hsl', e), this
              },
              whiten: function (t) {
                var e = this.values.hwb
                return (e[1] += e[1] * t), this.setValues('hwb', e), this
              },
              blacken: function (t) {
                var e = this.values.hwb
                return (e[2] += e[2] * t), this.setValues('hwb', e), this
              },
              greyscale: function () {
                var t = this.values.rgb,
                  e = 0.3 * t[0] + 0.59 * t[1] + 0.11 * t[2]
                return this.setValues('rgb', [e, e, e]), this
              },
              clearer: function (t) {
                var e = this.values.alpha
                return this.setValues('alpha', e - e * t), this
              },
              opaquer: function (t) {
                var e = this.values.alpha
                return this.setValues('alpha', e + e * t), this
              },
              rotate: function (t) {
                var e = this.values.hsl,
                  i = (e[0] + t) % 360
                return (e[0] = i < 0 ? 360 + i : i), this.setValues('hsl', e), this
              },
              mix: function (t, e) {
                var i = t,
                  n = void 0 === e ? 0.5 : e,
                  o = 2 * n - 1,
                  r = this.alpha() - i.alpha(),
                  s = (1 + (o * r == -1 ? o : (o + r) / (1 + o * r))) / 2,
                  a = 1 - s
                return this.rgb(s * this.red() + a * i.red(), s * this.green() + a * i.green(), s * this.blue() + a * i.blue()).alpha(this.alpha() * n + i.alpha() * (1 - n))
              },
              toJSON: function () {
                return this.rgb()
              },
              clone: function () {
                var t,
                  e,
                  i = new r(),
                  n = this.values,
                  o = i.values
                for (var s in n)
                  n.hasOwnProperty(s) &&
                    ((t = n[s]),
                    '[object Array]' === (e = {}.toString.call(t)) ? (o[s] = t.slice(0)) : '[object Number]' === e ? (o[s] = t) : console.error('unexpected color value:', t))
                return i
              }
            }),
              (r.prototype.spaces = {
                rgb: ['red', 'green', 'blue'],
                hsl: ['hue', 'saturation', 'lightness'],
                hsv: ['hue', 'saturation', 'value'],
                hwb: ['hue', 'whiteness', 'blackness'],
                cmyk: ['cyan', 'magenta', 'yellow', 'black']
              }),
              (r.prototype.maxes = { rgb: [255, 255, 255], hsl: [360, 100, 100], hsv: [360, 100, 100], hwb: [360, 100, 100], cmyk: [100, 100, 100, 100] }),
              (r.prototype.getValues = function (t) {
                for (var e = this.values, i = {}, n = 0; n < t.length; n++) i[t.charAt(n)] = e[t][n]
                return 1 !== e.alpha && (i.a = e.alpha), i
              }),
              (r.prototype.setValues = function (t, e) {
                var i,
                  o = this.values,
                  r = this.spaces,
                  s = this.maxes,
                  a = 1
                if ('alpha' === t) a = e
                else if (e.length) (o[t] = e.slice(0, t.length)), (a = e[t.length])
                else if (void 0 !== e[t.charAt(0)]) {
                  for (c = 0; c < t.length; c++) o[t][c] = e[t.charAt(c)]
                  a = e.a
                } else if (void 0 !== e[r[t][0]]) {
                  for (var l = r[t], c = 0; c < t.length; c++) o[t][c] = e[l[c]]
                  a = e.alpha
                }
                if (((o.alpha = Math.max(0, Math.min(1, void 0 === a ? o.alpha : a))), 'alpha' === t)) return !1
                for (c = 0; c < t.length; c++) (i = Math.max(0, Math.min(s[t][c], o[t][c]))), (o[t][c] = Math.round(i))
                for (var u in r) u !== t && (o[u] = n[t][u](o[t]))
                return !0
              }),
              (r.prototype.setSpace = function (t, e) {
                var i = e[0]
                return void 0 === i ? this.getValues(t) : ('number' == typeof i && (i = Array.prototype.slice.call(e)), this.setValues(t, i), this)
              }),
              (r.prototype.setChannel = function (t, e, i) {
                var n = this.values[t]
                return void 0 === i ? n[e] : (i === n[e] || ((n[e] = i), this.setValues(t, n)), this)
              }),
              'undefined' != typeof window && (window.Color = r),
              (e.exports = r)
          },
          { 2: 2, 5: 5 }
        ],
        4: [
          function (t, e, i) {
            function n(t) {
              var e,
                i,
                n = t[0] / 255,
                o = t[1] / 255,
                r = t[2] / 255,
                s = Math.min(n, o, r),
                a = Math.max(n, o, r),
                l = a - s
              return (
                a == s ? (e = 0) : n == a ? (e = (o - r) / l) : o == a ? (e = 2 + (r - n) / l) : r == a && (e = 4 + (n - o) / l),
                (e = Math.min(60 * e, 360)) < 0 && (e += 360),
                (i = (s + a) / 2),
                [e, 100 * (a == s ? 0 : i <= 0.5 ? l / (a + s) : l / (2 - a - s)), 100 * i]
              )
            }
            function o(t) {
              var e,
                i = t[0],
                n = t[1],
                o = t[2],
                r = Math.min(i, n, o),
                s = Math.max(i, n, o),
                a = s - r,
                l = 0 == s ? 0 : ((a / s) * 1e3) / 10
              return (
                s == r ? (e = 0) : i == s ? (e = (n - o) / a) : n == s ? (e = 2 + (o - i) / a) : o == s && (e = 4 + (i - n) / a),
                (e = Math.min(60 * e, 360)) < 0 && (e += 360),
                [e, l, ((s / 255) * 1e3) / 10]
              )
            }
            function s(t) {
              var e = t[0],
                i = t[1],
                o = t[2]
              return [n(t)[0], (1 / 255) * Math.min(e, Math.min(i, o)) * 100, 100 * (o = 1 - (1 / 255) * Math.max(e, Math.max(i, o)))]
            }
            function a(t) {
              var e = t[0] / 255,
                i = t[1] / 255,
                n = t[2] / 255,
                o = Math.min(1 - e, 1 - i, 1 - n)
              return [100 * ((1 - e - o) / (1 - o) || 0), 100 * ((1 - i - o) / (1 - o) || 0), 100 * ((1 - n - o) / (1 - o) || 0), 100 * o]
            }
            function l(t) {
              return T[JSON.stringify(t)]
            }
            function c(t) {
              var e = t[0] / 255,
                i = t[1] / 255,
                n = t[2] / 255
              return [
                100 *
                  (0.4124 * (e = 0.04045 < e ? Math.pow((e + 0.055) / 1.055, 2.4) : e / 12.92) +
                    0.3576 * (i = 0.04045 < i ? Math.pow((i + 0.055) / 1.055, 2.4) : i / 12.92) +
                    0.1805 * (n = 0.04045 < n ? Math.pow((n + 0.055) / 1.055, 2.4) : n / 12.92)),
                100 * (0.2126 * e + 0.7152 * i + 0.0722 * n),
                100 * (0.0193 * e + 0.1192 * i + 0.9505 * n)
              ]
            }
            function u(t) {
              var e = c(t),
                i = e[0],
                n = e[1],
                o = e[2]
              return (
                (n /= 100),
                (o /= 108.883),
                (i = 0.008856 < (i /= 95.047) ? Math.pow(i, 1 / 3) : 7.787 * i + 16 / 116),
                [
                  116 * (n = 0.008856 < n ? Math.pow(n, 1 / 3) : 7.787 * n + 16 / 116) - 16,
                  500 * (i - n),
                  200 * (n - (o = 0.008856 < o ? Math.pow(o, 1 / 3) : 7.787 * o + 16 / 116))
                ]
              )
            }
            function d(t) {
              var e,
                i,
                n,
                o,
                r,
                s = t[0] / 360,
                a = t[1] / 100,
                l = t[2] / 100
              if (0 == a) return [(r = 255 * l), r, r]
              ;(e = 2 * l - (i = l < 0.5 ? l * (1 + a) : l + a - l * a)), (o = [0, 0, 0])
              for (var c = 0; c < 3; c++)
                (n = s + (1 / 3) * -(c - 1)) < 0 && n++,
                  1 < n && n--,
                  (r = 6 * n < 1 ? e + 6 * (i - e) * n : 2 * n < 1 ? i : 3 * n < 2 ? e + (i - e) * (2 / 3 - n) * 6 : e),
                  (o[c] = 255 * r)
              return o
            }
            function h(t) {
              var e = t[0] / 60,
                i = t[1] / 100,
                n = t[2] / 100,
                o = Math.floor(e) % 6,
                r = e - Math.floor(e),
                s = 255 * n * (1 - i),
                a = 255 * n * (1 - i * r),
                l = 255 * n * (1 - i * (1 - r))
              n *= 255
              switch (o) {
                case 0:
                  return [n, l, s]
                case 1:
                  return [a, n, s]
                case 2:
                  return [s, n, l]
                case 3:
                  return [s, a, n]
                case 4:
                  return [l, s, n]
                case 5:
                  return [n, s, a]
              }
            }
            function f(t) {
              var e,
                i,
                n,
                o,
                s = t[0] / 360,
                a = t[1] / 100,
                l = t[2] / 100,
                c = a + l
              switch ((1 < c && ((a /= c), (l /= c)), (n = 6 * s - (e = Math.floor(6 * s))), 0 != (1 & e) && (n = 1 - n), (o = a + n * ((i = 1 - l) - a)), e)) {
                default:
                case 6:
                case 0:
                  ;(r = i), (g = o), (b = a)
                  break
                case 1:
                  ;(r = o), (g = i), (b = a)
                  break
                case 2:
                  ;(r = a), (g = i), (b = o)
                  break
                case 3:
                  ;(r = a), (g = o), (b = i)
                  break
                case 4:
                  ;(r = o), (g = a), (b = i)
                  break
                case 5:
                  ;(r = i), (g = a), (b = o)
              }
              return [255 * r, 255 * g, 255 * b]
            }
            function p(t) {
              var e = t[0] / 100,
                i = t[1] / 100,
                n = t[2] / 100,
                o = t[3] / 100
              return [255 * (1 - Math.min(1, e * (1 - o) + o)), 255 * (1 - Math.min(1, i * (1 - o) + o)), 255 * (1 - Math.min(1, n * (1 - o) + o))]
            }
            function m(t) {
              var e = t[0] / 100,
                i = t[1] / 100,
                n = t[2] / 100,
                o = 3.2406 * e + -1.5372 * i + -0.4986 * n,
                r = -0.9689 * e + 1.8758 * i + 0.0415 * n,
                s = 0.0557 * e + -0.204 * i + 1.057 * n
              return (
                (o = 0.0031308 < o ? 1.055 * Math.pow(o, 1 / 2.4) - 0.055 : (o *= 12.92)),
                (r = 0.0031308 < r ? 1.055 * Math.pow(r, 1 / 2.4) - 0.055 : (r *= 12.92)),
                (s = 0.0031308 < s ? 1.055 * Math.pow(s, 1 / 2.4) - 0.055 : (s *= 12.92)),
                [255 * (o = Math.min(Math.max(0, o), 1)), 255 * (r = Math.min(Math.max(0, r), 1)), 255 * (s = Math.min(Math.max(0, s), 1))]
              )
            }
            function v(t) {
              var e = t[0],
                i = t[1],
                n = t[2]
              return (
                (i /= 100),
                (n /= 108.883),
                (e = 0.008856 < (e /= 95.047) ? Math.pow(e, 1 / 3) : 7.787 * e + 16 / 116),
                [
                  116 * (i = 0.008856 < i ? Math.pow(i, 1 / 3) : 7.787 * i + 16 / 116) - 16,
                  500 * (e - i),
                  200 * (i - (n = 0.008856 < n ? Math.pow(n, 1 / 3) : 7.787 * n + 16 / 116))
                ]
              )
            }
            function y(t) {
              var e,
                i = t[0],
                n = t[1],
                o = t[2],
                r = i <= 8 ? ((e = (100 * i) / 903.3) / 100) * 7.787 + 16 / 116 : ((e = 100 * Math.pow((i + 16) / 116, 3)), Math.pow(e / 100, 1 / 3)),
                s = s / 95.047 <= 0.008856 ? (s = (95.047 * (n / 500 + r - 16 / 116)) / 7.787) : 95.047 * Math.pow(n / 500 + r, 3),
                a = a / 108.883 <= 0.008859 ? (a = (108.883 * (r - o / 200 - 16 / 116)) / 7.787) : 108.883 * Math.pow(r - o / 200, 3)
              return [s, e, a]
            }
            function _(t) {
              var e = t[0],
                i = t[1],
                n = t[2],
                o = (360 * Math.atan2(n, i)) / 2 / Math.PI
              return o < 0 && (o += 360), [e, Math.sqrt(i * i + n * n), o]
            }
            function w(t) {
              return m(y(t))
            }
            function x(t) {
              var e = t[0],
                i = t[1],
                n = (t[2] / 360) * 2 * Math.PI
              return [e, i * Math.cos(n), i * Math.sin(n)]
            }
            function C(t) {
              return k[t]
            }
            e.exports = {
              rgb2hsl: n,
              rgb2hsv: o,
              rgb2hwb: s,
              rgb2cmyk: a,
              rgb2keyword: l,
              rgb2xyz: c,
              rgb2lab: u,
              rgb2lch: function (t) {
                return _(u(t))
              },
              hsl2rgb: d,
              hsl2hsv: function (t) {
                var e = t[0],
                  i = t[1] / 100,
                  n = t[2] / 100
                return 0 === n ? [0, 0, 0] : [e, ((2 * (i *= (n *= 2) <= 1 ? n : 2 - n)) / (n + i)) * 100, ((n + i) / 2) * 100]
              },
              hsl2hwb: function (t) {
                return s(d(t))
              },
              hsl2cmyk: function (t) {
                return a(d(t))
              },
              hsl2keyword: function (t) {
                return l(d(t))
              },
              hsv2rgb: h,
              hsv2hsl: function (t) {
                var e = t[0],
                  i = t[1] / 100,
                  n = t[2] / 100,
                  o = (2 - i) * n,
                  r = i * n
                return [e, 100 * (r = (r /= o <= 1 ? o : 2 - o) || 0), 100 * (o /= 2)]
              },
              hsv2hwb: function (t) {
                return s(h(t))
              },
              hsv2cmyk: function (t) {
                return a(h(t))
              },
              hsv2keyword: function (t) {
                return l(h(t))
              },
              hwb2rgb: f,
              hwb2hsl: function (t) {
                return n(f(t))
              },
              hwb2hsv: function (t) {
                return o(f(t))
              },
              hwb2cmyk: function (t) {
                return a(f(t))
              },
              hwb2keyword: function (t) {
                return l(f(t))
              },
              cmyk2rgb: p,
              cmyk2hsl: function (t) {
                return n(p(t))
              },
              cmyk2hsv: function (t) {
                return o(p(t))
              },
              cmyk2hwb: function (t) {
                return s(p(t))
              },
              cmyk2keyword: function (t) {
                return l(p(t))
              },
              keyword2rgb: C,
              keyword2hsl: function (t) {
                return n(C(t))
              },
              keyword2hsv: function (t) {
                return o(C(t))
              },
              keyword2hwb: function (t) {
                return s(C(t))
              },
              keyword2cmyk: function (t) {
                return a(C(t))
              },
              keyword2lab: function (t) {
                return u(C(t))
              },
              keyword2xyz: function (t) {
                return c(C(t))
              },
              xyz2rgb: m,
              xyz2lab: v,
              xyz2lch: function (t) {
                return _(v(t))
              },
              lab2xyz: y,
              lab2rgb: w,
              lab2lch: _,
              lch2lab: x,
              lch2xyz: function (t) {
                return y(x(t))
              },
              lch2rgb: function (t) {
                return w(x(t))
              }
            }
            var k = {
                aliceblue: [240, 248, 255],
                antiquewhite: [250, 235, 215],
                aqua: [0, 255, 255],
                aquamarine: [127, 255, 212],
                azure: [240, 255, 255],
                beige: [245, 245, 220],
                bisque: [255, 228, 196],
                black: [0, 0, 0],
                blanchedalmond: [255, 235, 205],
                blue: [0, 0, 255],
                blueviolet: [138, 43, 226],
                brown: [165, 42, 42],
                burlywood: [222, 184, 135],
                cadetblue: [95, 158, 160],
                chartreuse: [127, 255, 0],
                chocolate: [210, 105, 30],
                coral: [255, 127, 80],
                cornflowerblue: [100, 149, 237],
                cornsilk: [255, 248, 220],
                crimson: [220, 20, 60],
                cyan: [0, 255, 255],
                darkblue: [0, 0, 139],
                darkcyan: [0, 139, 139],
                darkgoldenrod: [184, 134, 11],
                darkgray: [169, 169, 169],
                darkgreen: [0, 100, 0],
                darkgrey: [169, 169, 169],
                darkkhaki: [189, 183, 107],
                darkmagenta: [139, 0, 139],
                darkolivegreen: [85, 107, 47],
                darkorange: [255, 140, 0],
                darkorchid: [153, 50, 204],
                darkred: [139, 0, 0],
                darksalmon: [233, 150, 122],
                darkseagreen: [143, 188, 143],
                darkslateblue: [72, 61, 139],
                darkslategray: [47, 79, 79],
                darkslategrey: [47, 79, 79],
                darkturquoise: [0, 206, 209],
                darkviolet: [148, 0, 211],
                deeppink: [255, 20, 147],
                deepskyblue: [0, 191, 255],
                dimgray: [105, 105, 105],
                dimgrey: [105, 105, 105],
                dodgerblue: [30, 144, 255],
                firebrick: [178, 34, 34],
                floralwhite: [255, 250, 240],
                forestgreen: [34, 139, 34],
                fuchsia: [255, 0, 255],
                gainsboro: [220, 220, 220],
                ghostwhite: [248, 248, 255],
                gold: [255, 215, 0],
                goldenrod: [218, 165, 32],
                gray: [128, 128, 128],
                green: [0, 128, 0],
                greenyellow: [173, 255, 47],
                grey: [128, 128, 128],
                honeydew: [240, 255, 240],
                hotpink: [255, 105, 180],
                indianred: [205, 92, 92],
                indigo: [75, 0, 130],
                ivory: [255, 255, 240],
                khaki: [240, 230, 140],
                lavender: [230, 230, 250],
                lavenderblush: [255, 240, 245],
                lawngreen: [124, 252, 0],
                lemonchiffon: [255, 250, 205],
                lightblue: [173, 216, 230],
                lightcoral: [240, 128, 128],
                lightcyan: [224, 255, 255],
                lightgoldenrodyellow: [250, 250, 210],
                lightgray: [211, 211, 211],
                lightgreen: [144, 238, 144],
                lightgrey: [211, 211, 211],
                lightpink: [255, 182, 193],
                lightsalmon: [255, 160, 122],
                lightseagreen: [32, 178, 170],
                lightskyblue: [135, 206, 250],
                lightslategray: [119, 136, 153],
                lightslategrey: [119, 136, 153],
                lightsteelblue: [176, 196, 222],
                lightyellow: [255, 255, 224],
                lime: [0, 255, 0],
                limegreen: [50, 205, 50],
                linen: [250, 240, 230],
                magenta: [255, 0, 255],
                maroon: [128, 0, 0],
                mediumaquamarine: [102, 205, 170],
                mediumblue: [0, 0, 205],
                mediumorchid: [186, 85, 211],
                mediumpurple: [147, 112, 219],
                mediumseagreen: [60, 179, 113],
                mediumslateblue: [123, 104, 238],
                mediumspringgreen: [0, 250, 154],
                mediumturquoise: [72, 209, 204],
                mediumvioletred: [199, 21, 133],
                midnightblue: [25, 25, 112],
                mintcream: [245, 255, 250],
                mistyrose: [255, 228, 225],
                moccasin: [255, 228, 181],
                navajowhite: [255, 222, 173],
                navy: [0, 0, 128],
                oldlace: [253, 245, 230],
                olive: [128, 128, 0],
                olivedrab: [107, 142, 35],
                orange: [255, 165, 0],
                orangered: [255, 69, 0],
                orchid: [218, 112, 214],
                palegoldenrod: [238, 232, 170],
                palegreen: [152, 251, 152],
                paleturquoise: [175, 238, 238],
                palevioletred: [219, 112, 147],
                papayawhip: [255, 239, 213],
                peachpuff: [255, 218, 185],
                peru: [205, 133, 63],
                pink: [255, 192, 203],
                plum: [221, 160, 221],
                powderblue: [176, 224, 230],
                purple: [128, 0, 128],
                rebeccapurple: [102, 51, 153],
                red: [255, 0, 0],
                rosybrown: [188, 143, 143],
                royalblue: [65, 105, 225],
                saddlebrown: [139, 69, 19],
                salmon: [250, 128, 114],
                sandybrown: [244, 164, 96],
                seagreen: [46, 139, 87],
                seashell: [255, 245, 238],
                sienna: [160, 82, 45],
                silver: [192, 192, 192],
                skyblue: [135, 206, 235],
                slateblue: [106, 90, 205],
                slategray: [112, 128, 144],
                slategrey: [112, 128, 144],
                snow: [255, 250, 250],
                springgreen: [0, 255, 127],
                steelblue: [70, 130, 180],
                tan: [210, 180, 140],
                teal: [0, 128, 128],
                thistle: [216, 191, 216],
                tomato: [255, 99, 71],
                turquoise: [64, 224, 208],
                violet: [238, 130, 238],
                wheat: [245, 222, 179],
                white: [255, 255, 255],
                whitesmoke: [245, 245, 245],
                yellow: [255, 255, 0],
                yellowgreen: [154, 205, 50]
              },
              T = {}
            for (var S in k) T[JSON.stringify(k[S])] = S
          },
          {}
        ],
        5: [
          function (t, e, i) {
            function n() {
              return new c()
            }
            var o = t(4)
            for (var r in o) {
              n[r + 'Raw'] = (function (t) {
                return function (e) {
                  return 'number' == typeof e && (e = Array.prototype.slice.call(arguments)), o[t](e)
                }
              })(r)
              var s = /(\w+)2(\w+)/.exec(r),
                a = s[1],
                l = s[2]
              ;(n[a] = n[a] || {})[l] = n[r] = (function (t) {
                return function (e) {
                  'number' == typeof e && (e = Array.prototype.slice.call(arguments))
                  var i = o[t](e)
                  if ('string' == typeof i || void 0 === i) return i
                  for (var n = 0; n < i.length; n++) i[n] = Math.round(i[n])
                  return i
                }
              })(r)
            }
            var c = function () {
              this.convs = {}
            }
            ;(c.prototype.routeSpace = function (t, e) {
              var i = e[0]
              return void 0 === i ? this.getValues(t) : ('number' == typeof i && (i = Array.prototype.slice.call(e)), this.setValues(t, i))
            }),
              (c.prototype.setValues = function (t, e) {
                return (this.space = t), (this.convs = {}), (this.convs[t] = e), this
              }),
              (c.prototype.getValues = function (t) {
                var e,
                  i,
                  o = this.convs[t]
                return o || ((e = this.space), (i = this.convs[e]), (o = n[e][t](i)), (this.convs[t] = o)), o
              }),
              ['rgb', 'hsl', 'hsv', 'cmyk', 'keyword'].forEach(function (t) {
                c.prototype[t] = function (e) {
                  return this.routeSpace(t, arguments)
                }
              }),
              (e.exports = n)
          },
          { 4: 4 }
        ],
        6: [
          function (t, e, i) {
            e.exports = {
              aliceblue: [240, 248, 255],
              antiquewhite: [250, 235, 215],
              aqua: [0, 255, 255],
              aquamarine: [127, 255, 212],
              azure: [240, 255, 255],
              beige: [245, 245, 220],
              bisque: [255, 228, 196],
              black: [0, 0, 0],
              blanchedalmond: [255, 235, 205],
              blue: [0, 0, 255],
              blueviolet: [138, 43, 226],
              brown: [165, 42, 42],
              burlywood: [222, 184, 135],
              cadetblue: [95, 158, 160],
              chartreuse: [127, 255, 0],
              chocolate: [210, 105, 30],
              coral: [255, 127, 80],
              cornflowerblue: [100, 149, 237],
              cornsilk: [255, 248, 220],
              crimson: [220, 20, 60],
              cyan: [0, 255, 255],
              darkblue: [0, 0, 139],
              darkcyan: [0, 139, 139],
              darkgoldenrod: [184, 134, 11],
              darkgray: [169, 169, 169],
              darkgreen: [0, 100, 0],
              darkgrey: [169, 169, 169],
              darkkhaki: [189, 183, 107],
              darkmagenta: [139, 0, 139],
              darkolivegreen: [85, 107, 47],
              darkorange: [255, 140, 0],
              darkorchid: [153, 50, 204],
              darkred: [139, 0, 0],
              darksalmon: [233, 150, 122],
              darkseagreen: [143, 188, 143],
              darkslateblue: [72, 61, 139],
              darkslategray: [47, 79, 79],
              darkslategrey: [47, 79, 79],
              darkturquoise: [0, 206, 209],
              darkviolet: [148, 0, 211],
              deeppink: [255, 20, 147],
              deepskyblue: [0, 191, 255],
              dimgray: [105, 105, 105],
              dimgrey: [105, 105, 105],
              dodgerblue: [30, 144, 255],
              firebrick: [178, 34, 34],
              floralwhite: [255, 250, 240],
              forestgreen: [34, 139, 34],
              fuchsia: [255, 0, 255],
              gainsboro: [220, 220, 220],
              ghostwhite: [248, 248, 255],
              gold: [255, 215, 0],
              goldenrod: [218, 165, 32],
              gray: [128, 128, 128],
              green: [0, 128, 0],
              greenyellow: [173, 255, 47],
              grey: [128, 128, 128],
              honeydew: [240, 255, 240],
              hotpink: [255, 105, 180],
              indianred: [205, 92, 92],
              indigo: [75, 0, 130],
              ivory: [255, 255, 240],
              khaki: [240, 230, 140],
              lavender: [230, 230, 250],
              lavenderblush: [255, 240, 245],
              lawngreen: [124, 252, 0],
              lemonchiffon: [255, 250, 205],
              lightblue: [173, 216, 230],
              lightcoral: [240, 128, 128],
              lightcyan: [224, 255, 255],
              lightgoldenrodyellow: [250, 250, 210],
              lightgray: [211, 211, 211],
              lightgreen: [144, 238, 144],
              lightgrey: [211, 211, 211],
              lightpink: [255, 182, 193],
              lightsalmon: [255, 160, 122],
              lightseagreen: [32, 178, 170],
              lightskyblue: [135, 206, 250],
              lightslategray: [119, 136, 153],
              lightslategrey: [119, 136, 153],
              lightsteelblue: [176, 196, 222],
              lightyellow: [255, 255, 224],
              lime: [0, 255, 0],
              limegreen: [50, 205, 50],
              linen: [250, 240, 230],
              magenta: [255, 0, 255],
              maroon: [128, 0, 0],
              mediumaquamarine: [102, 205, 170],
              mediumblue: [0, 0, 205],
              mediumorchid: [186, 85, 211],
              mediumpurple: [147, 112, 219],
              mediumseagreen: [60, 179, 113],
              mediumslateblue: [123, 104, 238],
              mediumspringgreen: [0, 250, 154],
              mediumturquoise: [72, 209, 204],
              mediumvioletred: [199, 21, 133],
              midnightblue: [25, 25, 112],
              mintcream: [245, 255, 250],
              mistyrose: [255, 228, 225],
              moccasin: [255, 228, 181],
              navajowhite: [255, 222, 173],
              navy: [0, 0, 128],
              oldlace: [253, 245, 230],
              olive: [128, 128, 0],
              olivedrab: [107, 142, 35],
              orange: [255, 165, 0],
              orangered: [255, 69, 0],
              orchid: [218, 112, 214],
              palegoldenrod: [238, 232, 170],
              palegreen: [152, 251, 152],
              paleturquoise: [175, 238, 238],
              palevioletred: [219, 112, 147],
              papayawhip: [255, 239, 213],
              peachpuff: [255, 218, 185],
              peru: [205, 133, 63],
              pink: [255, 192, 203],
              plum: [221, 160, 221],
              powderblue: [176, 224, 230],
              purple: [128, 0, 128],
              rebeccapurple: [102, 51, 153],
              red: [255, 0, 0],
              rosybrown: [188, 143, 143],
              royalblue: [65, 105, 225],
              saddlebrown: [139, 69, 19],
              salmon: [250, 128, 114],
              sandybrown: [244, 164, 96],
              seagreen: [46, 139, 87],
              seashell: [255, 245, 238],
              sienna: [160, 82, 45],
              silver: [192, 192, 192],
              skyblue: [135, 206, 235],
              slateblue: [106, 90, 205],
              slategray: [112, 128, 144],
              slategrey: [112, 128, 144],
              snow: [255, 250, 250],
              springgreen: [0, 255, 127],
              steelblue: [70, 130, 180],
              tan: [210, 180, 140],
              teal: [0, 128, 128],
              thistle: [216, 191, 216],
              tomato: [255, 99, 71],
              turquoise: [64, 224, 208],
              violet: [238, 130, 238],
              wheat: [245, 222, 179],
              white: [255, 255, 255],
              whitesmoke: [245, 245, 245],
              yellow: [255, 255, 0],
              yellowgreen: [154, 205, 50]
            }
          },
          {}
        ],
        7: [
          function (t, e, i) {
            var n = t(28)()
            t(26)(n),
              t(42)(n),
              t(22)(n),
              t(31)(n),
              t(25)(n),
              t(21)(n),
              t(23)(n),
              t(24)(n),
              t(29)(n),
              t(33)(n),
              t(34)(n),
              t(32)(n),
              t(35)(n),
              t(30)(n),
              t(27)(n),
              t(36)(n),
              t(37)(n),
              t(38)(n),
              t(39)(n),
              t(40)(n),
              t(45)(n),
              t(43)(n),
              t(44)(n),
              t(46)(n),
              t(47)(n),
              t(48)(n),
              t(15)(n),
              t(16)(n),
              t(17)(n),
              t(18)(n),
              t(19)(n),
              t(20)(n),
              t(8)(n),
              t(9)(n),
              t(10)(n),
              t(11)(n),
              t(12)(n),
              t(13)(n),
              t(14)(n),
              (window.Chart = e.exports = n)
          },
          {
            10: 10,
            11: 11,
            12: 12,
            13: 13,
            14: 14,
            15: 15,
            16: 16,
            17: 17,
            18: 18,
            19: 19,
            20: 20,
            21: 21,
            22: 22,
            23: 23,
            24: 24,
            25: 25,
            26: 26,
            27: 27,
            28: 28,
            29: 29,
            30: 30,
            31: 31,
            32: 32,
            33: 33,
            34: 34,
            35: 35,
            36: 36,
            37: 37,
            38: 38,
            39: 39,
            40: 40,
            42: 42,
            43: 43,
            44: 44,
            45: 45,
            46: 46,
            47: 47,
            48: 48,
            8: 8,
            9: 9
          }
        ],
        8: [
          function (t, e, i) {
            'use strict'
            e.exports = function (t) {
              t.Bar = function (e, i) {
                return (i.type = 'bar'), new t(e, i)
              }
            }
          },
          {}
        ],
        9: [
          function (t, e, i) {
            'use strict'
            e.exports = function (t) {
              t.Bubble = function (e, i) {
                return (i.type = 'bubble'), new t(e, i)
              }
            }
          },
          {}
        ],
        10: [
          function (t, e, i) {
            'use strict'
            e.exports = function (t) {
              t.Doughnut = function (e, i) {
                return (i.type = 'doughnut'), new t(e, i)
              }
            }
          },
          {}
        ],
        11: [
          function (t, e, i) {
            'use strict'
            e.exports = function (t) {
              t.Line = function (e, i) {
                return (i.type = 'line'), new t(e, i)
              }
            }
          },
          {}
        ],
        12: [
          function (t, e, i) {
            'use strict'
            e.exports = function (t) {
              t.PolarArea = function (e, i) {
                return (i.type = 'polarArea'), new t(e, i)
              }
            }
          },
          {}
        ],
        13: [
          function (t, e, i) {
            'use strict'
            e.exports = function (t) {
              t.Radar = function (e, i) {
                return (i.type = 'radar'), new t(e, i)
              }
            }
          },
          {}
        ],
        14: [
          function (t, e, i) {
            'use strict'
            e.exports = function (t) {
              ;(t.defaults.scatter = {
                hover: { mode: 'single' },
                scales: { xAxes: [{ type: 'linear', position: 'bottom', id: 'x-axis-1' }], yAxes: [{ type: 'linear', position: 'left', id: 'y-axis-1' }] },
                tooltips: {
                  callbacks: {
                    title: function () {
                      return ''
                    },
                    label: function (t) {
                      return '(' + t.xLabel + ', ' + t.yLabel + ')'
                    }
                  }
                }
              }),
                (t.controllers.scatter = t.controllers.line),
                (t.Scatter = function (e, i) {
                  return (i.type = 'scatter'), new t(e, i)
                })
            }
          },
          {}
        ],
        15: [
          function (t, e, i) {
            'use strict'
            e.exports = function (t) {
              var e = t.helpers
              ;(t.defaults.bar = {
                hover: { mode: 'label' },
                scales: { xAxes: [{ type: 'category', categoryPercentage: 0.8, barPercentage: 0.9, gridLines: { offsetGridLines: !0 } }], yAxes: [{ type: 'linear' }] }
              }),
                (t.controllers.bar = t.DatasetController.extend({
                  dataElementType: t.elements.Rectangle,
                  initialize: function (e, i) {
                    t.DatasetController.prototype.initialize.call(this, e, i)
                    var n = this.getMeta(),
                      o = this.getDataset()
                    ;(n.stack = o.stack), (n.bar = !0)
                  },
                  getStackCount: function () {
                    var t = this,
                      i = t.getMeta(),
                      n = t.getScaleForId(i.yAxisID),
                      o = []
                    return (
                      e.each(
                        t.chart.data.datasets,
                        function (e, i) {
                          var r = t.chart.getDatasetMeta(i)
                          r.bar &&
                            t.chart.isDatasetVisible(i) &&
                            (!1 === n.options.stacked ||
                              (!0 === n.options.stacked && -1 === o.indexOf(r.stack)) ||
                              (void 0 === n.options.stacked && (void 0 === r.stack || -1 === o.indexOf(r.stack)))) &&
                            o.push(r.stack)
                        },
                        t
                      ),
                      o.length
                    )
                  },
                  update: function (t) {
                    var i = this
                    e.each(
                      i.getMeta().data,
                      function (e, n) {
                        i.updateElement(e, n, t)
                      },
                      i
                    )
                  },
                  updateElement: function (t, i, n) {
                    var o = this,
                      r = o.getMeta(),
                      s = o.getScaleForId(r.xAxisID),
                      a = o.getScaleForId(r.yAxisID),
                      l = a.getBasePixel(),
                      c = o.chart.options.elements.rectangle,
                      u = t.custom || {},
                      d = o.getDataset()
                    ;(t._xScale = s), (t._yScale = a), (t._datasetIndex = o.index), (t._index = i)
                    var h = o.getRuler(i)
                    ;(t._model = {
                      x: o.calculateBarX(i, o.index, h),
                      y: n ? l : o.calculateBarY(i, o.index),
                      label: o.chart.data.labels[i],
                      datasetLabel: d.label,
                      horizontal: !1,
                      base: n ? l : o.calculateBarBase(o.index, i),
                      width: o.calculateBarWidth(h),
                      backgroundColor: u.backgroundColor ? u.backgroundColor : e.getValueAtIndexOrDefault(d.backgroundColor, i, c.backgroundColor),
                      borderSkipped: u.borderSkipped ? u.borderSkipped : c.borderSkipped,
                      borderColor: u.borderColor ? u.borderColor : e.getValueAtIndexOrDefault(d.borderColor, i, c.borderColor),
                      borderWidth: u.borderWidth ? u.borderWidth : e.getValueAtIndexOrDefault(d.borderWidth, i, c.borderWidth)
                    }),
                      t.pivot()
                  },
                  calculateBarBase: function (t, e) {
                    var i = this.getMeta(),
                      n = this.getScaleForId(i.yAxisID),
                      o = n.getBaseValue(),
                      r = o
                    if (!0 === n.options.stacked || (void 0 === n.options.stacked && void 0 !== i.stack)) {
                      for (var s = this.chart, a = s.data.datasets, l = Number(a[t].data[e]), c = 0; c < t; c++) {
                        var u,
                          d = a[c],
                          h = s.getDatasetMeta(c)
                        h.bar && h.yAxisID === n.id && s.isDatasetVisible(c) && i.stack === h.stack && ((u = Number(d.data[e])), (o += l < 0 ? Math.min(u, r) : Math.max(u, r)))
                      }
                      return n.getPixelForValue(o)
                    }
                    return n.getBasePixel()
                  },
                  getRuler: function () {
                    var t = this.getMeta(),
                      e = this.getScaleForId(t.xAxisID),
                      i = this.getStackCount(),
                      n = e.width / e.ticks.length,
                      o = n * e.options.categoryPercentage,
                      r = o / i
                    return {
                      stackCount: i,
                      tickWidth: n,
                      categoryWidth: o,
                      categorySpacing: (n - n * e.options.categoryPercentage) / 2,
                      fullBarWidth: r,
                      barWidth: r * e.options.barPercentage,
                      barSpacing: r - r * e.options.barPercentage
                    }
                  },
                  calculateBarWidth: function (t) {
                    var e = this.getMeta(),
                      i = this.getScaleForId(e.xAxisID)
                    return i.options.barThickness ? i.options.barThickness : t.barWidth
                  },
                  getStackIndex: function (t) {
                    for (var e, i = this.chart.getDatasetMeta(t), n = this.getScaleForId(i.yAxisID), o = [i.stack], r = 0; r < t; ++r)
                      (e = this.chart.getDatasetMeta(r)).bar &&
                        this.chart.isDatasetVisible(r) &&
                        (!1 === n.options.stacked ||
                          (!0 === n.options.stacked && -1 === o.indexOf(e.stack)) ||
                          (void 0 === n.options.stacked && (void 0 === e.stack || -1 === o.indexOf(e.stack)))) &&
                        o.push(e.stack)
                    return o.length - 1
                  },
                  calculateBarX: function (t, e, i) {
                    var n = this.getMeta(),
                      o = this.getScaleForId(n.xAxisID),
                      r = this.getStackIndex(e),
                      s = o.getPixelForValue(null, t, e, this.chart.isCombo)
                    return (s -= this.chart.isCombo ? i.tickWidth / 2 : 0) + i.barWidth / 2 + i.categorySpacing + i.barWidth * r + i.barSpacing / 2 + i.barSpacing * r
                  },
                  calculateBarY: function (t, e) {
                    var i = this.getMeta(),
                      n = this.getScaleForId(i.yAxisID),
                      o = Number(this.getDataset().data[t])
                    if (n.options.stacked || (void 0 === n.options.stacked && void 0 !== i.stack)) {
                      for (var r = n.getBaseValue(), s = r, a = r, l = 0; l < e; l++) {
                        var c,
                          u = this.chart.data.datasets[l],
                          d = this.chart.getDatasetMeta(l)
                        d.bar && d.yAxisID === n.id && this.chart.isDatasetVisible(l) && i.stack === d.stack && ((c = Number(u.data[t])) < 0 ? (a += c || 0) : (s += c || 0))
                      }
                      return o < 0 ? n.getPixelForValue(a + o) : n.getPixelForValue(s + o)
                    }
                    return n.getPixelForValue(o)
                  },
                  draw: function (e) {
                    var i,
                      n,
                      o = e || 1,
                      r = this.getMeta().data,
                      s = this.getDataset()
                    for (t.canvasHelpers.clipArea(this.chart.chart.ctx, this.chart.chartArea), i = 0, n = r.length; i < n; ++i) {
                      var a = s.data[i]
                      null == a || isNaN(a) || r[i].transition(o).draw()
                    }
                    t.canvasHelpers.unclipArea(this.chart.chart.ctx)
                  },
                  setHoverStyle: function (t) {
                    var i = this.chart.data.datasets[t._datasetIndex],
                      n = t._index,
                      o = t.custom || {},
                      r = t._model
                    ;(r.backgroundColor = o.hoverBackgroundColor
                      ? o.hoverBackgroundColor
                      : e.getValueAtIndexOrDefault(i.hoverBackgroundColor, n, e.getHoverColor(r.backgroundColor))),
                      (r.borderColor = o.hoverBorderColor ? o.hoverBorderColor : e.getValueAtIndexOrDefault(i.hoverBorderColor, n, e.getHoverColor(r.borderColor))),
                      (r.borderWidth = o.hoverBorderWidth ? o.hoverBorderWidth : e.getValueAtIndexOrDefault(i.hoverBorderWidth, n, r.borderWidth))
                  },
                  removeHoverStyle: function (t) {
                    var i = this.chart.data.datasets[t._datasetIndex],
                      n = t._index,
                      o = t.custom || {},
                      r = t._model,
                      s = this.chart.options.elements.rectangle
                    ;(r.backgroundColor = o.backgroundColor ? o.backgroundColor : e.getValueAtIndexOrDefault(i.backgroundColor, n, s.backgroundColor)),
                      (r.borderColor = o.borderColor ? o.borderColor : e.getValueAtIndexOrDefault(i.borderColor, n, s.borderColor)),
                      (r.borderWidth = o.borderWidth ? o.borderWidth : e.getValueAtIndexOrDefault(i.borderWidth, n, s.borderWidth))
                  }
                })),
                (t.defaults.horizontalBar = {
                  hover: { mode: 'label' },
                  scales: {
                    xAxes: [{ type: 'linear', position: 'bottom' }],
                    yAxes: [{ position: 'left', type: 'category', categoryPercentage: 0.8, barPercentage: 0.9, gridLines: { offsetGridLines: !0 } }]
                  },
                  elements: { rectangle: { borderSkipped: 'left' } },
                  tooltips: {
                    callbacks: {
                      title: function (t, e) {
                        var i = ''
                        return 0 < t.length && (t[0].yLabel ? (i = t[0].yLabel) : 0 < e.labels.length && t[0].index < e.labels.length && (i = e.labels[t[0].index])), i
                      },
                      label: function (t, e) {
                        return (e.datasets[t.datasetIndex].label || '') + ': ' + t.xLabel
                      }
                    }
                  }
                }),
                (t.controllers.horizontalBar = t.controllers.bar.extend({
                  getStackCount: function () {
                    var t = this,
                      i = t.getMeta(),
                      n = t.getScaleForId(i.xAxisID),
                      o = []
                    return (
                      e.each(
                        t.chart.data.datasets,
                        function (e, i) {
                          var r = t.chart.getDatasetMeta(i)
                          r.bar &&
                            t.chart.isDatasetVisible(i) &&
                            (!1 === n.options.stacked ||
                              (!0 === n.options.stacked && -1 === o.indexOf(r.stack)) ||
                              (void 0 === n.options.stacked && (void 0 === r.stack || -1 === o.indexOf(r.stack)))) &&
                            o.push(r.stack)
                        },
                        t
                      ),
                      o.length
                    )
                  },
                  updateElement: function (t, i, n) {
                    var o = this,
                      r = o.getMeta(),
                      s = o.getScaleForId(r.xAxisID),
                      a = o.getScaleForId(r.yAxisID),
                      l = s.getBasePixel(),
                      c = t.custom || {},
                      u = o.getDataset(),
                      d = o.chart.options.elements.rectangle
                    ;(t._xScale = s), (t._yScale = a), (t._datasetIndex = o.index), (t._index = i)
                    var h = o.getRuler(i)
                    ;(t._model = {
                      x: n ? l : o.calculateBarX(i, o.index),
                      y: o.calculateBarY(i, o.index, h),
                      label: o.chart.data.labels[i],
                      datasetLabel: u.label,
                      horizontal: !0,
                      base: n ? l : o.calculateBarBase(o.index, i),
                      height: o.calculateBarHeight(h),
                      backgroundColor: c.backgroundColor ? c.backgroundColor : e.getValueAtIndexOrDefault(u.backgroundColor, i, d.backgroundColor),
                      borderSkipped: c.borderSkipped ? c.borderSkipped : d.borderSkipped,
                      borderColor: c.borderColor ? c.borderColor : e.getValueAtIndexOrDefault(u.borderColor, i, d.borderColor),
                      borderWidth: c.borderWidth ? c.borderWidth : e.getValueAtIndexOrDefault(u.borderWidth, i, d.borderWidth)
                    }),
                      t.pivot()
                  },
                  calculateBarBase: function (t, e) {
                    var i = this.getMeta(),
                      n = this.getScaleForId(i.xAxisID),
                      o = n.getBaseValue(),
                      r = o
                    if (n.options.stacked || (void 0 === n.options.stacked && void 0 !== i.stack)) {
                      for (var s = this.chart, a = s.data.datasets, l = Number(a[t].data[e]), c = 0; c < t; c++) {
                        var u,
                          d = a[c],
                          h = s.getDatasetMeta(c)
                        h.bar && h.xAxisID === n.id && s.isDatasetVisible(c) && i.stack === h.stack && ((u = Number(d.data[e])), (o += l < 0 ? Math.min(u, r) : Math.max(u, r)))
                      }
                      return n.getPixelForValue(o)
                    }
                    return n.getBasePixel()
                  },
                  getRuler: function () {
                    var t = this.getMeta(),
                      e = this.getScaleForId(t.yAxisID),
                      i = this.getStackCount(),
                      n = e.height / e.ticks.length,
                      o = n * e.options.categoryPercentage,
                      r = o / i
                    return {
                      stackCount: i,
                      tickHeight: n,
                      categoryHeight: o,
                      categorySpacing: (n - n * e.options.categoryPercentage) / 2,
                      fullBarHeight: r,
                      barHeight: r * e.options.barPercentage,
                      barSpacing: r - r * e.options.barPercentage
                    }
                  },
                  calculateBarHeight: function (t) {
                    var e = this.getMeta(),
                      i = this.getScaleForId(e.yAxisID)
                    return i.options.barThickness ? i.options.barThickness : t.barHeight
                  },
                  getStackIndex: function (t) {
                    for (var e, i = this.chart.getDatasetMeta(t), n = this.getScaleForId(i.xAxisID), o = [i.stack], r = 0; r < t; ++r)
                      (e = this.chart.getDatasetMeta(r)).bar &&
                        this.chart.isDatasetVisible(r) &&
                        (!1 === n.options.stacked ||
                          (!0 === n.options.stacked && -1 === o.indexOf(e.stack)) ||
                          (void 0 === n.options.stacked && (void 0 === e.stack || -1 === o.indexOf(e.stack)))) &&
                        o.push(e.stack)
                    return o.length - 1
                  },
                  calculateBarX: function (t, e) {
                    var i = this.getMeta(),
                      n = this.getScaleForId(i.xAxisID),
                      o = Number(this.getDataset().data[t])
                    if (n.options.stacked || (void 0 === n.options.stacked && void 0 !== i.stack)) {
                      for (var r = n.getBaseValue(), s = r, a = r, l = 0; l < e; l++) {
                        var c,
                          u = this.chart.data.datasets[l],
                          d = this.chart.getDatasetMeta(l)
                        d.bar && d.xAxisID === n.id && this.chart.isDatasetVisible(l) && i.stack === d.stack && ((c = Number(u.data[t])) < 0 ? (a += c || 0) : (s += c || 0))
                      }
                      return o < 0 ? n.getPixelForValue(a + o) : n.getPixelForValue(s + o)
                    }
                    return n.getPixelForValue(o)
                  },
                  calculateBarY: function (t, e, i) {
                    var n = this.getMeta(),
                      o = this.getScaleForId(n.yAxisID),
                      r = this.getStackIndex(e),
                      s = o.getPixelForValue(null, t, e, this.chart.isCombo)
                    return (s -= this.chart.isCombo ? i.tickHeight / 2 : 0) + i.barHeight / 2 + i.categorySpacing + i.barHeight * r + i.barSpacing / 2 + i.barSpacing * r
                  }
                }))
            }
          },
          {}
        ],
        16: [
          function (t, e, i) {
            'use strict'
            e.exports = function (t) {
              var e = t.helpers
              ;(t.defaults.bubble = {
                hover: { mode: 'single' },
                scales: { xAxes: [{ type: 'linear', position: 'bottom', id: 'x-axis-0' }], yAxes: [{ type: 'linear', position: 'left', id: 'y-axis-0' }] },
                tooltips: {
                  callbacks: {
                    title: function () {
                      return ''
                    },
                    label: function (t, e) {
                      var i = e.datasets[t.datasetIndex].label || '',
                        n = e.datasets[t.datasetIndex].data[t.index]
                      return i + ': (' + t.xLabel + ', ' + t.yLabel + ', ' + n.r + ')'
                    }
                  }
                }
              }),
                (t.controllers.bubble = t.DatasetController.extend({
                  dataElementType: t.elements.Point,
                  update: function (t) {
                    var i = this,
                      n = i.getMeta().data
                    e.each(n, function (e, n) {
                      i.updateElement(e, n, t)
                    })
                  },
                  updateElement: function (i, n, o) {
                    var r = this.getMeta(),
                      s = this.getScaleForId(r.xAxisID),
                      a = this.getScaleForId(r.yAxisID),
                      l = i.custom || {},
                      c = this.getDataset(),
                      u = c.data[n],
                      d = this.chart.options.elements.point,
                      h = this.index
                    e.extend(i, {
                      _xScale: s,
                      _yScale: a,
                      _datasetIndex: h,
                      _index: n,
                      _model: {
                        x: o ? s.getPixelForDecimal(0.5) : s.getPixelForValue('object' == typeof u ? u : NaN, n, h, this.chart.isCombo),
                        y: o ? a.getBasePixel() : a.getPixelForValue(u, n, h),
                        radius: o ? 0 : l.radius ? l.radius : this.getRadius(u),
                        hitRadius: l.hitRadius ? l.hitRadius : e.getValueAtIndexOrDefault(c.hitRadius, n, d.hitRadius)
                      }
                    }),
                      t.DatasetController.prototype.removeHoverStyle.call(this, i, d)
                    var f = i._model
                    ;(f.skip = l.skip ? l.skip : isNaN(f.x) || isNaN(f.y)), i.pivot()
                  },
                  getRadius: function (t) {
                    return t.r || this.chart.options.elements.point.radius
                  },
                  setHoverStyle: function (i) {
                    t.DatasetController.prototype.setHoverStyle.call(this, i)
                    var n = this.chart.data.datasets[i._datasetIndex],
                      o = i._index,
                      r = i.custom || {}
                    i._model.radius = r.hoverRadius
                      ? r.hoverRadius
                      : e.getValueAtIndexOrDefault(n.hoverRadius, o, this.chart.options.elements.point.hoverRadius) + this.getRadius(n.data[o])
                  },
                  removeHoverStyle: function (e) {
                    t.DatasetController.prototype.removeHoverStyle.call(this, e, this.chart.options.elements.point)
                    var i = this.chart.data.datasets[e._datasetIndex].data[e._index],
                      n = e.custom || {}
                    e._model.radius = n.radius ? n.radius : this.getRadius(i)
                  }
                }))
            }
          },
          {}
        ],
        17: [
          function (t, e, i) {
            'use strict'
            e.exports = function (t) {
              var e = t.helpers,
                i = t.defaults
              ;(i.doughnut = {
                animation: { animateRotate: !0, animateScale: !1 },
                aspectRatio: 1,
                hover: { mode: 'single' },
                legendCallback: function (t) {
                  var e = []
                  e.push('<ul class="' + t.id + '-legend">')
                  var i = t.data,
                    n = i.datasets,
                    o = i.labels
                  if (n.length)
                    for (var r = 0; r < n[0].data.length; ++r)
                      e.push('<li><span style="background-color:' + n[0].backgroundColor[r] + '"></span>'), o[r] && e.push(o[r]), e.push('</li>')
                  return e.push('</ul>'), e.join('')
                },
                legend: {
                  labels: {
                    generateLabels: function (t) {
                      var i = t.data
                      return i.labels.length && i.datasets.length
                        ? i.labels.map(function (n, o) {
                            var r = t.getDatasetMeta(0),
                              s = i.datasets[0],
                              a = r.data[o],
                              l = (a && a.custom) || {},
                              c = e.getValueAtIndexOrDefault,
                              u = t.options.elements.arc
                            return {
                              text: n,
                              fillStyle: l.backgroundColor ? l.backgroundColor : c(s.backgroundColor, o, u.backgroundColor),
                              strokeStyle: l.borderColor ? l.borderColor : c(s.borderColor, o, u.borderColor),
                              lineWidth: l.borderWidth ? l.borderWidth : c(s.borderWidth, o, u.borderWidth),
                              hidden: isNaN(s.data[o]) || r.data[o].hidden,
                              index: o
                            }
                          })
                        : []
                    }
                  },
                  onClick: function (t, e) {
                    for (var i, n = e.index, o = this.chart, r = 0, s = (o.data.datasets || []).length; r < s; ++r)
                      (i = o.getDatasetMeta(r)).data[n] && (i.data[n].hidden = !i.data[n].hidden)
                    o.update()
                  }
                },
                cutoutPercentage: 50,
                rotation: -0.5 * Math.PI,
                circumference: 2 * Math.PI,
                tooltips: {
                  callbacks: {
                    title: function () {
                      return ''
                    },
                    label: function (t, i) {
                      var n = i.labels[t.index],
                        o = ': ' + i.datasets[t.datasetIndex].data[t.index]
                      return e.isArray(n) ? ((n = n.slice())[0] += o) : (n += o), n
                    }
                  }
                }
              }),
                (i.pie = e.clone(i.doughnut)),
                e.extend(i.pie, { cutoutPercentage: 0 }),
                (t.controllers.doughnut = t.controllers.pie =
                  t.DatasetController.extend({
                    dataElementType: t.elements.Arc,
                    linkScales: e.noop,
                    getRingIndex: function (t) {
                      for (var e = 0, i = 0; i < t; ++i) this.chart.isDatasetVisible(i) && ++e
                      return e
                    },
                    update: function (t) {
                      var i,
                        n,
                        o,
                        r,
                        s,
                        a,
                        l,
                        c,
                        u,
                        d,
                        h,
                        f,
                        p,
                        g,
                        m,
                        v,
                        y,
                        b = this,
                        _ = b.chart,
                        w = _.chartArea,
                        x = _.options,
                        C = x.elements.arc,
                        k = w.right - w.left - C.borderWidth,
                        T = w.bottom - w.top - C.borderWidth,
                        S = Math.min(k, T),
                        E = { x: 0, y: 0 },
                        I = b.getMeta(),
                        A = x.cutoutPercentage,
                        D = x.circumference
                      D < 2 * Math.PI &&
                        ((i = x.rotation % (2 * Math.PI)),
                        (n = (i += 2 * Math.PI * (i >= Math.PI ? -1 : i < -Math.PI ? 1 : 0)) + D),
                        (o = Math.cos(i)),
                        (r = Math.sin(i)),
                        (s = Math.cos(n)),
                        (a = Math.sin(n)),
                        (l = (i <= 0 && 0 <= n) || (i <= 2 * Math.PI && 2 * Math.PI <= n)),
                        (c = (i <= 0.5 * Math.PI && 0.5 * Math.PI <= n) || (i <= 2.5 * Math.PI && 2.5 * Math.PI <= n)),
                        (u = (i <= -Math.PI && -Math.PI <= n) || (i <= Math.PI && Math.PI <= n)),
                        (d = (i <= 0.5 * -Math.PI && 0.5 * -Math.PI <= n) || (i <= 1.5 * Math.PI && 1.5 * Math.PI <= n)),
                        (h = A / 100),
                        (f = u ? -1 : Math.min(o * (o < 0 ? 1 : h), s * (s < 0 ? 1 : h))),
                        (p = d ? -1 : Math.min(r * (r < 0 ? 1 : h), a * (a < 0 ? 1 : h))),
                        (v = 0.5 * ((g = l ? 1 : Math.max(o * (0 < o ? 1 : h), s * (0 < s ? 1 : h))) - f)),
                        (y = 0.5 * ((m = c ? 1 : Math.max(r * (0 < r ? 1 : h), a * (0 < a ? 1 : h))) - p)),
                        (S = Math.min(k / v, T / y)),
                        (E = { x: -0.5 * (g + f), y: -0.5 * (m + p) })),
                        (_.borderWidth = b.getMaxBorderWidth(I.data)),
                        (_.outerRadius = Math.max((S - _.borderWidth) / 2, 0)),
                        (_.innerRadius = Math.max(A ? (_.outerRadius / 100) * A : 0, 0)),
                        (_.radiusLength = (_.outerRadius - _.innerRadius) / _.getVisibleDatasetCount()),
                        (_.offsetX = E.x * _.outerRadius),
                        (_.offsetY = E.y * _.outerRadius),
                        (I.total = b.calculateTotal()),
                        (b.outerRadius = _.outerRadius - _.radiusLength * b.getRingIndex(b.index)),
                        (b.innerRadius = Math.max(b.outerRadius - _.radiusLength, 0)),
                        e.each(I.data, function (e, i) {
                          b.updateElement(e, i, t)
                        })
                    },
                    updateElement: function (t, i, n) {
                      var o = this.chart,
                        r = o.chartArea,
                        s = o.options,
                        a = s.animation,
                        l = (r.left + r.right) / 2,
                        c = (r.top + r.bottom) / 2,
                        u = s.rotation,
                        d = s.rotation,
                        h = this.getDataset(),
                        f = (n && a.animateRotate) || t.hidden ? 0 : this.calculateCircumference(h.data[i]) * (s.circumference / (2 * Math.PI)),
                        p = n && a.animateScale ? 0 : this.innerRadius,
                        g = n && a.animateScale ? 0 : this.outerRadius,
                        m = e.getValueAtIndexOrDefault
                      e.extend(t, {
                        _datasetIndex: this.index,
                        _index: i,
                        _model: {
                          x: l + o.offsetX,
                          y: c + o.offsetY,
                          startAngle: u,
                          endAngle: d,
                          circumference: f,
                          outerRadius: g,
                          innerRadius: p,
                          label: m(h.label, i, o.data.labels[i])
                        }
                      })
                      var v = t._model
                      this.removeHoverStyle(t),
                        (n && a.animateRotate) ||
                          ((v.startAngle = 0 === i ? s.rotation : this.getMeta().data[i - 1]._model.endAngle), (v.endAngle = v.startAngle + v.circumference)),
                        t.pivot()
                    },
                    removeHoverStyle: function (e) {
                      t.DatasetController.prototype.removeHoverStyle.call(this, e, this.chart.options.elements.arc)
                    },
                    calculateTotal: function () {
                      var t,
                        i = this.getDataset(),
                        n = this.getMeta(),
                        o = 0
                      return (
                        e.each(n.data, function (e, n) {
                          ;(t = i.data[n]), isNaN(t) || e.hidden || (o += Math.abs(t))
                        }),
                        o
                      )
                    },
                    calculateCircumference: function (t) {
                      var e = this.getMeta().total
                      return 0 < e && !isNaN(t) ? 2 * Math.PI * (t / e) : 0
                    },
                    getMaxBorderWidth: function (t) {
                      for (var e, i, n = 0, o = this.index, r = t.length, s = 0; s < r; s++)
                        n = (n = n < (e = t[s]._model ? t[s]._model.borderWidth : 0) ? e : n) < (i = t[s]._chart ? t[s]._chart.config.data.datasets[o].hoverBorderWidth : 0) ? i : n
                      return n
                    }
                  }))
            }
          },
          {}
        ],
        18: [
          function (t, e, i) {
            'use strict'
            e.exports = function (t) {
              function e(t, e) {
                return i.getValueOrDefault(t.showLine, e.showLines)
              }
              var i = t.helpers
              ;(t.defaults.line = {
                showLines: !0,
                spanGaps: !1,
                hover: { mode: 'label' },
                scales: { xAxes: [{ type: 'category', id: 'x-axis-0' }], yAxes: [{ type: 'linear', id: 'y-axis-0' }] }
              }),
                (t.controllers.line = t.DatasetController.extend({
                  datasetElementType: t.elements.Line,
                  dataElementType: t.elements.Point,
                  update: function (t) {
                    var n,
                      o,
                      r,
                      s = this.getMeta(),
                      a = s.dataset,
                      l = s.data || [],
                      c = this.chart.options,
                      u = c.elements.line,
                      d = this.getScaleForId(s.yAxisID),
                      h = this.getDataset(),
                      f = e(h, c)
                    for (
                      f &&
                        ((r = a.custom || {}),
                        void 0 !== h.tension && void 0 === h.lineTension && (h.lineTension = h.tension),
                        (a._scale = d),
                        (a._datasetIndex = this.index),
                        (a._children = l),
                        (a._model = {
                          spanGaps: h.spanGaps ? h.spanGaps : c.spanGaps,
                          tension: r.tension ? r.tension : i.getValueOrDefault(h.lineTension, u.tension),
                          backgroundColor: r.backgroundColor ? r.backgroundColor : h.backgroundColor || u.backgroundColor,
                          borderWidth: r.borderWidth ? r.borderWidth : h.borderWidth || u.borderWidth,
                          borderColor: r.borderColor ? r.borderColor : h.borderColor || u.borderColor,
                          borderCapStyle: r.borderCapStyle ? r.borderCapStyle : h.borderCapStyle || u.borderCapStyle,
                          borderDash: r.borderDash ? r.borderDash : h.borderDash || u.borderDash,
                          borderDashOffset: r.borderDashOffset ? r.borderDashOffset : h.borderDashOffset || u.borderDashOffset,
                          borderJoinStyle: r.borderJoinStyle ? r.borderJoinStyle : h.borderJoinStyle || u.borderJoinStyle,
                          fill: r.fill ? r.fill : void 0 !== h.fill ? h.fill : u.fill,
                          steppedLine: r.steppedLine ? r.steppedLine : i.getValueOrDefault(h.steppedLine, u.stepped),
                          cubicInterpolationMode: r.cubicInterpolationMode ? r.cubicInterpolationMode : i.getValueOrDefault(h.cubicInterpolationMode, u.cubicInterpolationMode),
                          scaleTop: d.top,
                          scaleBottom: d.bottom,
                          scaleZero: d.getBasePixel()
                        }),
                        a.pivot()),
                        n = 0,
                        o = l.length;
                      n < o;
                      ++n
                    )
                      this.updateElement(l[n], n, t)
                    for (f && 0 !== a._model.tension && this.updateBezierControlPoints(), n = 0, o = l.length; n < o; ++n) l[n].pivot()
                  },
                  getPointBackgroundColor: function (t, e) {
                    var n = this.chart.options.elements.point.backgroundColor,
                      o = this.getDataset(),
                      r = t.custom || {}
                    return (
                      r.backgroundColor
                        ? (n = r.backgroundColor)
                        : o.pointBackgroundColor
                        ? (n = i.getValueAtIndexOrDefault(o.pointBackgroundColor, e, n))
                        : o.backgroundColor && (n = o.backgroundColor),
                      n
                    )
                  },
                  getPointBorderColor: function (t, e) {
                    var n = this.chart.options.elements.point.borderColor,
                      o = this.getDataset(),
                      r = t.custom || {}
                    return (
                      r.borderColor ? (n = r.borderColor) : o.pointBorderColor ? (n = i.getValueAtIndexOrDefault(o.pointBorderColor, e, n)) : o.borderColor && (n = o.borderColor),
                      n
                    )
                  },
                  getPointBorderWidth: function (t, e) {
                    var n = this.chart.options.elements.point.borderWidth,
                      o = this.getDataset(),
                      r = t.custom || {}
                    return (
                      isNaN(r.borderWidth)
                        ? isNaN(o.pointBorderWidth)
                          ? isNaN(o.borderWidth) || (n = o.borderWidth)
                          : (n = i.getValueAtIndexOrDefault(o.pointBorderWidth, e, n))
                        : (n = r.borderWidth),
                      n
                    )
                  },
                  updateElement: function (t, e, n) {
                    var o,
                      r,
                      s = this,
                      a = s.getMeta(),
                      l = t.custom || {},
                      c = s.getDataset(),
                      u = s.index,
                      d = c.data[e],
                      h = s.getScaleForId(a.yAxisID),
                      f = s.getScaleForId(a.xAxisID),
                      p = s.chart.options.elements.point,
                      g = 1 === (s.chart.data.labels || []).length || 1 === c.data.length || s.chart.isCombo
                    void 0 !== c.radius && void 0 === c.pointRadius && (c.pointRadius = c.radius),
                      void 0 !== c.hitRadius && void 0 === c.pointHitRadius && (c.pointHitRadius = c.hitRadius),
                      (o = f.getPixelForValue('object' == typeof d ? d : NaN, e, u, g)),
                      (r = n ? h.getBasePixel() : s.calculatePointY(d, e, u)),
                      (t._xScale = f),
                      (t._yScale = h),
                      (t._datasetIndex = u),
                      (t._index = e),
                      (t._model = {
                        x: o,
                        y: r,
                        skip: l.skip || isNaN(o) || isNaN(r),
                        radius: l.radius || i.getValueAtIndexOrDefault(c.pointRadius, e, p.radius),
                        pointStyle: l.pointStyle || i.getValueAtIndexOrDefault(c.pointStyle, e, p.pointStyle),
                        backgroundColor: s.getPointBackgroundColor(t, e),
                        borderColor: s.getPointBorderColor(t, e),
                        borderWidth: s.getPointBorderWidth(t, e),
                        tension: a.dataset._model ? a.dataset._model.tension : 0,
                        steppedLine: !!a.dataset._model && a.dataset._model.steppedLine,
                        hitRadius: l.hitRadius || i.getValueAtIndexOrDefault(c.pointHitRadius, e, p.hitRadius)
                      })
                  },
                  calculatePointY: function (t, e, i) {
                    var n,
                      o = this.chart,
                      r = this.getMeta(),
                      s = this.getScaleForId(r.yAxisID),
                      a = 0,
                      l = 0
                    if (s.options.stacked) {
                      for (n = 0; n < i; n++) {
                        var c,
                          u,
                          d = o.data.datasets[n]
                        'line' === (u = o.getDatasetMeta(n)).type &&
                          u.yAxisID === s.id &&
                          o.isDatasetVisible(n) &&
                          ((c = Number(s.getRightValue(d.data[e]))) < 0 ? (l += c || 0) : (a += c || 0))
                      }
                      var h = Number(s.getRightValue(t))
                      return h < 0 ? s.getPixelForValue(l + h) : s.getPixelForValue(a + h)
                    }
                    return s.getPixelForValue(t)
                  },
                  updateBezierControlPoints: function () {
                    function t(t, e, i) {
                      return Math.max(Math.min(t, i), e)
                    }
                    var e,
                      n,
                      o,
                      r,
                      s = this.getMeta(),
                      a = this.chart.chartArea,
                      l = s.data || []
                    if (
                      (s.dataset._model.spanGaps &&
                        (l = l.filter(function (t) {
                          return !t._model.skip
                        })),
                      'monotone' === s.dataset._model.cubicInterpolationMode)
                    )
                      i.splineCurveMonotone(l)
                    else
                      for (e = 0, n = l.length; e < n; ++e)
                        (o = l[e]._model),
                          (r = i.splineCurve(i.previousItem(l, e)._model, o, i.nextItem(l, e)._model, s.dataset._model.tension)),
                          (o.controlPointPreviousX = r.previous.x),
                          (o.controlPointPreviousY = r.previous.y),
                          (o.controlPointNextX = r.next.x),
                          (o.controlPointNextY = r.next.y)
                    if (this.chart.options.elements.line.capBezierPoints)
                      for (e = 0, n = l.length; e < n; ++e)
                        ((o = l[e]._model).controlPointPreviousX = t(o.controlPointPreviousX, a.left, a.right)),
                          (o.controlPointPreviousY = t(o.controlPointPreviousY, a.top, a.bottom)),
                          (o.controlPointNextX = t(o.controlPointNextX, a.left, a.right)),
                          (o.controlPointNextY = t(o.controlPointNextY, a.top, a.bottom))
                  },
                  draw: function (i) {
                    for (var n = this.getMeta(), o = n.data || [], r = i || 1, s = 0, a = o.length; s < a; ++s) o[s].transition(r)
                    for (
                      t.canvasHelpers.clipArea(this.chart.chart.ctx, this.chart.chartArea),
                        e(this.getDataset(), this.chart.options) && n.dataset.transition(r).draw(),
                        t.canvasHelpers.unclipArea(this.chart.chart.ctx),
                        s = 0,
                        a = o.length;
                      s < a;
                      ++s
                    )
                      o[s].draw(this.chart.chartArea)
                  },
                  setHoverStyle: function (t) {
                    var e = this.chart.data.datasets[t._datasetIndex],
                      n = t._index,
                      o = t.custom || {},
                      r = t._model
                    ;(r.radius = o.hoverRadius || i.getValueAtIndexOrDefault(e.pointHoverRadius, n, this.chart.options.elements.point.hoverRadius)),
                      (r.backgroundColor = o.hoverBackgroundColor || i.getValueAtIndexOrDefault(e.pointHoverBackgroundColor, n, i.getHoverColor(r.backgroundColor))),
                      (r.borderColor = o.hoverBorderColor || i.getValueAtIndexOrDefault(e.pointHoverBorderColor, n, i.getHoverColor(r.borderColor))),
                      (r.borderWidth = o.hoverBorderWidth || i.getValueAtIndexOrDefault(e.pointHoverBorderWidth, n, r.borderWidth))
                  },
                  removeHoverStyle: function (t) {
                    var e = this.chart.data.datasets[t._datasetIndex],
                      n = t._index,
                      o = t.custom || {},
                      r = t._model
                    void 0 !== e.radius && void 0 === e.pointRadius && (e.pointRadius = e.radius),
                      (r.radius = o.radius || i.getValueAtIndexOrDefault(e.pointRadius, n, this.chart.options.elements.point.radius)),
                      (r.backgroundColor = this.getPointBackgroundColor(t, n)),
                      (r.borderColor = this.getPointBorderColor(t, n)),
                      (r.borderWidth = this.getPointBorderWidth(t, n))
                  }
                }))
            }
          },
          {}
        ],
        19: [
          function (t, e, i) {
            'use strict'
            e.exports = function (t) {
              var e = t.helpers
              ;(t.defaults.polarArea = {
                scale: { type: 'radialLinear', lineArc: !0, ticks: { beginAtZero: !0 } },
                animation: { animateRotate: !0, animateScale: !0 },
                startAngle: -0.5 * Math.PI,
                aspectRatio: 1,
                legendCallback: function (t) {
                  var e = []
                  e.push('<ul class="' + t.id + '-legend">')
                  var i = t.data,
                    n = i.datasets,
                    o = i.labels
                  if (n.length)
                    for (var r = 0; r < n[0].data.length; ++r)
                      e.push('<li><span style="background-color:' + n[0].backgroundColor[r] + '"></span>'), o[r] && e.push(o[r]), e.push('</li>')
                  return e.push('</ul>'), e.join('')
                },
                legend: {
                  labels: {
                    generateLabels: function (t) {
                      var i = t.data
                      return i.labels.length && i.datasets.length
                        ? i.labels.map(function (n, o) {
                            var r = t.getDatasetMeta(0),
                              s = i.datasets[0],
                              a = r.data[o].custom || {},
                              l = e.getValueAtIndexOrDefault,
                              c = t.options.elements.arc
                            return {
                              text: n,
                              fillStyle: a.backgroundColor ? a.backgroundColor : l(s.backgroundColor, o, c.backgroundColor),
                              strokeStyle: a.borderColor ? a.borderColor : l(s.borderColor, o, c.borderColor),
                              lineWidth: a.borderWidth ? a.borderWidth : l(s.borderWidth, o, c.borderWidth),
                              hidden: isNaN(s.data[o]) || r.data[o].hidden,
                              index: o
                            }
                          })
                        : []
                    }
                  },
                  onClick: function (t, e) {
                    for (var i, n = e.index, o = this.chart, r = 0, s = (o.data.datasets || []).length; r < s; ++r) (i = o.getDatasetMeta(r)).data[n].hidden = !i.data[n].hidden
                    o.update()
                  }
                },
                tooltips: {
                  callbacks: {
                    title: function () {
                      return ''
                    },
                    label: function (t, e) {
                      return e.labels[t.index] + ': ' + t.yLabel
                    }
                  }
                }
              }),
                (t.controllers.polarArea = t.DatasetController.extend({
                  dataElementType: t.elements.Arc,
                  linkScales: e.noop,
                  update: function (t) {
                    var i = this,
                      n = i.chart,
                      o = n.chartArea,
                      r = i.getMeta(),
                      s = n.options,
                      a = s.elements.arc,
                      l = Math.min(o.right - o.left, o.bottom - o.top)
                    ;(n.outerRadius = Math.max((l - a.borderWidth / 2) / 2, 0)),
                      (n.innerRadius = Math.max(s.cutoutPercentage ? (n.outerRadius / 100) * s.cutoutPercentage : 1, 0)),
                      (n.radiusLength = (n.outerRadius - n.innerRadius) / n.getVisibleDatasetCount()),
                      (i.outerRadius = n.outerRadius - n.radiusLength * i.index),
                      (i.innerRadius = i.outerRadius - n.radiusLength),
                      (r.count = i.countVisibleElements()),
                      e.each(r.data, function (e, n) {
                        i.updateElement(e, n, t)
                      })
                  },
                  updateElement: function (t, i, n) {
                    for (
                      var o = this.chart,
                        r = this.getDataset(),
                        s = o.options,
                        a = s.animation,
                        l = o.scale,
                        c = e.getValueAtIndexOrDefault,
                        u = o.data.labels,
                        d = this.calculateCircumference(r.data[i]),
                        h = l.xCenter,
                        f = l.yCenter,
                        p = 0,
                        g = this.getMeta(),
                        m = 0;
                      m < i;
                      ++m
                    )
                      isNaN(r.data[m]) || g.data[m].hidden || ++p
                    var v = s.startAngle,
                      y = t.hidden ? 0 : l.getDistanceFromCenterForValue(r.data[i]),
                      b = v + d * p,
                      _ = b + (t.hidden ? 0 : d),
                      w = a.animateScale ? 0 : l.getDistanceFromCenterForValue(r.data[i])
                    e.extend(t, {
                      _datasetIndex: this.index,
                      _index: i,
                      _scale: l,
                      _model: {
                        x: h,
                        y: f,
                        innerRadius: 0,
                        outerRadius: n ? w : y,
                        startAngle: n && a.animateRotate ? v : b,
                        endAngle: n && a.animateRotate ? v : _,
                        label: c(u, i, u[i])
                      }
                    }),
                      this.removeHoverStyle(t),
                      t.pivot()
                  },
                  removeHoverStyle: function (e) {
                    t.DatasetController.prototype.removeHoverStyle.call(this, e, this.chart.options.elements.arc)
                  },
                  countVisibleElements: function () {
                    var t = this.getDataset(),
                      i = this.getMeta(),
                      n = 0
                    return (
                      e.each(i.data, function (e, i) {
                        isNaN(t.data[i]) || e.hidden || n++
                      }),
                      n
                    )
                  },
                  calculateCircumference: function (t) {
                    var e = this.getMeta().count
                    return 0 < e && !isNaN(t) ? (2 * Math.PI) / e : 0
                  }
                }))
            }
          },
          {}
        ],
        20: [
          function (t, e, i) {
            'use strict'
            e.exports = function (t) {
              var e = t.helpers
              ;(t.defaults.radar = { aspectRatio: 1, scale: { type: 'radialLinear' }, elements: { line: { tension: 0 } } }),
                (t.controllers.radar = t.DatasetController.extend({
                  datasetElementType: t.elements.Line,
                  dataElementType: t.elements.Point,
                  linkScales: e.noop,
                  update: function (t) {
                    var i = this,
                      n = i.getMeta(),
                      o = n.dataset,
                      r = n.data,
                      s = o.custom || {},
                      a = i.getDataset(),
                      l = i.chart.options.elements.line,
                      c = i.chart.scale
                    void 0 !== a.tension && void 0 === a.lineTension && (a.lineTension = a.tension),
                      e.extend(n.dataset, {
                        _datasetIndex: i.index,
                        _children: r,
                        _loop: !0,
                        _model: {
                          tension: s.tension ? s.tension : e.getValueOrDefault(a.lineTension, l.tension),
                          backgroundColor: s.backgroundColor ? s.backgroundColor : a.backgroundColor || l.backgroundColor,
                          borderWidth: s.borderWidth ? s.borderWidth : a.borderWidth || l.borderWidth,
                          borderColor: s.borderColor ? s.borderColor : a.borderColor || l.borderColor,
                          fill: s.fill ? s.fill : void 0 !== a.fill ? a.fill : l.fill,
                          borderCapStyle: s.borderCapStyle ? s.borderCapStyle : a.borderCapStyle || l.borderCapStyle,
                          borderDash: s.borderDash ? s.borderDash : a.borderDash || l.borderDash,
                          borderDashOffset: s.borderDashOffset ? s.borderDashOffset : a.borderDashOffset || l.borderDashOffset,
                          borderJoinStyle: s.borderJoinStyle ? s.borderJoinStyle : a.borderJoinStyle || l.borderJoinStyle,
                          scaleTop: c.top,
                          scaleBottom: c.bottom,
                          scaleZero: c.getBasePosition()
                        }
                      }),
                      n.dataset.pivot(),
                      e.each(
                        r,
                        function (e, n) {
                          i.updateElement(e, n, t)
                        },
                        i
                      ),
                      i.updateBezierControlPoints()
                  },
                  updateElement: function (t, i, n) {
                    var o = t.custom || {},
                      r = this.getDataset(),
                      s = this.chart.scale,
                      a = this.chart.options.elements.point,
                      l = s.getPointPositionForValue(i, r.data[i])
                    e.extend(t, {
                      _datasetIndex: this.index,
                      _index: i,
                      _scale: s,
                      _model: {
                        x: n ? s.xCenter : l.x,
                        y: n ? s.yCenter : l.y,
                        tension: o.tension ? o.tension : e.getValueOrDefault(r.lineTension, this.chart.options.elements.line.tension),
                        radius: o.radius ? o.radius : e.getValueAtIndexOrDefault(r.pointRadius, i, a.radius),
                        backgroundColor: o.backgroundColor ? o.backgroundColor : e.getValueAtIndexOrDefault(r.pointBackgroundColor, i, a.backgroundColor),
                        borderColor: o.borderColor ? o.borderColor : e.getValueAtIndexOrDefault(r.pointBorderColor, i, a.borderColor),
                        borderWidth: o.borderWidth ? o.borderWidth : e.getValueAtIndexOrDefault(r.pointBorderWidth, i, a.borderWidth),
                        pointStyle: o.pointStyle ? o.pointStyle : e.getValueAtIndexOrDefault(r.pointStyle, i, a.pointStyle),
                        hitRadius: o.hitRadius ? o.hitRadius : e.getValueAtIndexOrDefault(r.hitRadius, i, a.hitRadius)
                      }
                    }),
                      (t._model.skip = o.skip ? o.skip : isNaN(t._model.x) || isNaN(t._model.y))
                  },
                  updateBezierControlPoints: function () {
                    var t = this.chart.chartArea,
                      i = this.getMeta()
                    e.each(i.data, function (n, o) {
                      var r = n._model,
                        s = e.splineCurve(e.previousItem(i.data, o, !0)._model, r, e.nextItem(i.data, o, !0)._model, r.tension)
                      ;(r.controlPointPreviousX = Math.max(Math.min(s.previous.x, t.right), t.left)),
                        (r.controlPointPreviousY = Math.max(Math.min(s.previous.y, t.bottom), t.top)),
                        (r.controlPointNextX = Math.max(Math.min(s.next.x, t.right), t.left)),
                        (r.controlPointNextY = Math.max(Math.min(s.next.y, t.bottom), t.top)),
                        n.pivot()
                    })
                  },
                  draw: function (t) {
                    var i = this.getMeta(),
                      n = t || 1
                    e.each(i.data, function (t) {
                      t.transition(n)
                    }),
                      i.dataset.transition(n).draw(),
                      e.each(i.data, function (t) {
                        t.draw()
                      })
                  },
                  setHoverStyle: function (t) {
                    var i = this.chart.data.datasets[t._datasetIndex],
                      n = t.custom || {},
                      o = t._index,
                      r = t._model
                    ;(r.radius = n.hoverRadius ? n.hoverRadius : e.getValueAtIndexOrDefault(i.pointHoverRadius, o, this.chart.options.elements.point.hoverRadius)),
                      (r.backgroundColor = n.hoverBackgroundColor
                        ? n.hoverBackgroundColor
                        : e.getValueAtIndexOrDefault(i.pointHoverBackgroundColor, o, e.getHoverColor(r.backgroundColor))),
                      (r.borderColor = n.hoverBorderColor ? n.hoverBorderColor : e.getValueAtIndexOrDefault(i.pointHoverBorderColor, o, e.getHoverColor(r.borderColor))),
                      (r.borderWidth = n.hoverBorderWidth ? n.hoverBorderWidth : e.getValueAtIndexOrDefault(i.pointHoverBorderWidth, o, r.borderWidth))
                  },
                  removeHoverStyle: function (t) {
                    var i = this.chart.data.datasets[t._datasetIndex],
                      n = t.custom || {},
                      o = t._index,
                      r = t._model,
                      s = this.chart.options.elements.point
                    ;(r.radius = n.radius ? n.radius : e.getValueAtIndexOrDefault(i.radius, o, s.radius)),
                      (r.backgroundColor = n.backgroundColor ? n.backgroundColor : e.getValueAtIndexOrDefault(i.pointBackgroundColor, o, s.backgroundColor)),
                      (r.borderColor = n.borderColor ? n.borderColor : e.getValueAtIndexOrDefault(i.pointBorderColor, o, s.borderColor)),
                      (r.borderWidth = n.borderWidth ? n.borderWidth : e.getValueAtIndexOrDefault(i.pointBorderWidth, o, s.borderWidth))
                  }
                }))
            }
          },
          {}
        ],
        21: [
          function (t, e, i) {
            'use strict'
            e.exports = function (t) {
              var e = t.helpers
              ;(t.defaults.global.animation = { duration: 1e3, easing: 'easeOutQuart', onProgress: e.noop, onComplete: e.noop }),
                (t.Animation = t.Element.extend({ currentStep: null, numSteps: 60, easing: '', render: null, onAnimationProgress: null, onAnimationComplete: null })),
                (t.animationService = {
                  frameDuration: 17,
                  animations: [],
                  dropFrames: 0,
                  request: null,
                  addAnimation: function (t, e, i, n) {
                    n || (t.animating = !0)
                    for (var o = 0; o < this.animations.length; ++o) if (this.animations[o].chartInstance === t) return void (this.animations[o].animationObject = e)
                    this.animations.push({ chartInstance: t, animationObject: e }), 1 === this.animations.length && this.requestAnimationFrame()
                  },
                  cancelAnimation: function (t) {
                    var i = e.findIndex(this.animations, function (e) {
                      return e.chartInstance === t
                    })
                    ;-1 !== i && (this.animations.splice(i, 1), (t.animating = !1))
                  },
                  requestAnimationFrame: function () {
                    var t = this
                    null === t.request &&
                      (t.request = e.requestAnimFrame.call(window, function () {
                        ;(t.request = null), t.startDigest()
                      }))
                  },
                  startDigest: function () {
                    var t = this,
                      e = Date.now(),
                      i = 0
                    1 < t.dropFrames && ((i = Math.floor(t.dropFrames)), (t.dropFrames = t.dropFrames % 1))
                    for (var n = 0; n < t.animations.length; )
                      null === t.animations[n].animationObject.currentStep && (t.animations[n].animationObject.currentStep = 0),
                        (t.animations[n].animationObject.currentStep += 1 + i),
                        t.animations[n].animationObject.currentStep > t.animations[n].animationObject.numSteps &&
                          (t.animations[n].animationObject.currentStep = t.animations[n].animationObject.numSteps),
                        t.animations[n].animationObject.render(t.animations[n].chartInstance, t.animations[n].animationObject),
                        t.animations[n].animationObject.onAnimationProgress &&
                          t.animations[n].animationObject.onAnimationProgress.call &&
                          t.animations[n].animationObject.onAnimationProgress.call(t.animations[n].chartInstance, t.animations[n]),
                        t.animations[n].animationObject.currentStep === t.animations[n].animationObject.numSteps
                          ? (t.animations[n].animationObject.onAnimationComplete &&
                              t.animations[n].animationObject.onAnimationComplete.call &&
                              t.animations[n].animationObject.onAnimationComplete.call(t.animations[n].chartInstance, t.animations[n]),
                            (t.animations[n].chartInstance.animating = !1),
                            t.animations.splice(n, 1))
                          : ++n
                    var o = (Date.now() - e) / t.frameDuration
                    ;(t.dropFrames += o), 0 < t.animations.length && t.requestAnimationFrame()
                  }
                })
            }
          },
          {}
        ],
        22: [
          function (t, e, i) {
            'use strict'
            e.exports = function (t) {
              var e = (t.canvasHelpers = {})
              ;(e.drawPoint = function (e, i, n, o, r) {
                var s, a, l, c, u, d
                if ('object' != typeof i || ('[object HTMLImageElement]' !== (s = i.toString()) && '[object HTMLCanvasElement]' !== s)) {
                  if (!(isNaN(n) || n <= 0)) {
                    switch (i) {
                      default:
                        e.beginPath(), e.arc(o, r, n, 0, 2 * Math.PI), e.closePath(), e.fill()
                        break
                      case 'triangle':
                        e.beginPath(),
                          (u = ((a = (3 * n) / Math.sqrt(3)) * Math.sqrt(3)) / 2),
                          e.moveTo(o - a / 2, r + u / 3),
                          e.lineTo(o + a / 2, r + u / 3),
                          e.lineTo(o, r - (2 * u) / 3),
                          e.closePath(),
                          e.fill()
                        break
                      case 'rect':
                        ;(d = (1 / Math.SQRT2) * n), e.beginPath(), e.fillRect(o - d, r - d, 2 * d, 2 * d), e.strokeRect(o - d, r - d, 2 * d, 2 * d)
                        break
                      case 'rectRounded':
                        var h = n / Math.SQRT2,
                          f = o - h,
                          p = r - h,
                          g = Math.SQRT2 * n
                        t.helpers.drawRoundedRectangle(e, f, p, g, g, n / 2), e.fill()
                        break
                      case 'rectRot':
                        ;(d = (1 / Math.SQRT2) * n), e.beginPath(), e.moveTo(o - d, r), e.lineTo(o, r + d), e.lineTo(o + d, r), e.lineTo(o, r - d), e.closePath(), e.fill()
                        break
                      case 'cross':
                        e.beginPath(), e.moveTo(o, r + n), e.lineTo(o, r - n), e.moveTo(o - n, r), e.lineTo(o + n, r), e.closePath()
                        break
                      case 'crossRot':
                        e.beginPath(),
                          (l = Math.cos(Math.PI / 4) * n),
                          (c = Math.sin(Math.PI / 4) * n),
                          e.moveTo(o - l, r - c),
                          e.lineTo(o + l, r + c),
                          e.moveTo(o - l, r + c),
                          e.lineTo(o + l, r - c),
                          e.closePath()
                        break
                      case 'star':
                        e.beginPath(),
                          e.moveTo(o, r + n),
                          e.lineTo(o, r - n),
                          e.moveTo(o - n, r),
                          e.lineTo(o + n, r),
                          (l = Math.cos(Math.PI / 4) * n),
                          (c = Math.sin(Math.PI / 4) * n),
                          e.moveTo(o - l, r - c),
                          e.lineTo(o + l, r + c),
                          e.moveTo(o - l, r + c),
                          e.lineTo(o + l, r - c),
                          e.closePath()
                        break
                      case 'line':
                        e.beginPath(), e.moveTo(o - n, r), e.lineTo(o + n, r), e.closePath()
                        break
                      case 'dash':
                        e.beginPath(), e.moveTo(o, r), e.lineTo(o + n, r), e.closePath()
                    }
                    e.stroke()
                  }
                } else e.drawImage(i, o - i.width / 2, r - i.height / 2)
              }),
                (e.clipArea = function (t, e) {
                  t.save(), t.beginPath(), t.rect(e.left, e.top, e.right - e.left, e.bottom - e.top), t.clip()
                }),
                (e.unclipArea = function (t) {
                  t.restore()
                })
            }
          },
          {}
        ],
        23: [
          function (t, e, i) {
            'use strict'
            e.exports = function (t) {
              var e = t.helpers,
                i = t.plugins,
                n = t.platform
              ;(t.types = {}),
                (t.instances = {}),
                (t.controllers = {}),
                (t.Controller = function (i, o, r) {
                  var s,
                    a,
                    l = this
                  ;((a = (s = (s = o) || {}).data = s.data || {}).datasets = a.datasets || []),
                    (a.labels = a.labels || []),
                    (s.options = e.configMerge(t.defaults.global, t.defaults[s.type], s.options || {})),
                    (o = s)
                  var c = n.acquireContext(i, o),
                    u = c && c.canvas,
                    d = u && u.height,
                    h = u && u.width
                  return (
                    (r.ctx = c),
                    (r.canvas = u),
                    (r.config = o),
                    (r.width = h),
                    (r.height = d),
                    (r.aspectRatio = d ? h / d : null),
                    (l.id = e.uid()),
                    (l.chart = r),
                    (l.config = o),
                    (l.options = o.options),
                    (l._bufferedRender = !1),
                    (t.instances[l.id] = l),
                    Object.defineProperty(l, 'data', {
                      get: function () {
                        return l.config.data
                      }
                    }),
                    c && u ? (l.initialize(), l.update()) : console.error("Failed to create chart: can't acquire context from the given item"),
                    l
                  )
                }),
                e.extend(t.Controller.prototype, {
                  initialize: function () {
                    var t = this
                    return (
                      i.notify(t, 'beforeInit'),
                      e.retinaScale(t.chart),
                      t.bindEvents(),
                      t.options.responsive && t.resize(!0),
                      t.ensureScalesHaveIDs(),
                      t.buildScales(),
                      t.initToolTip(),
                      i.notify(t, 'afterInit'),
                      t
                    )
                  },
                  clear: function () {
                    return e.clear(this.chart), this
                  },
                  stop: function () {
                    return t.animationService.cancelAnimation(this), this
                  },
                  resize: function (t) {
                    var n,
                      o = this.chart,
                      r = this.options,
                      s = o.canvas,
                      a = (r.maintainAspectRatio && o.aspectRatio) || null,
                      l = Math.floor(e.getMaximumWidth(s)),
                      c = Math.floor(a ? l / a : e.getMaximumHeight(s))
                    ;(o.width === l && o.height === c) ||
                      ((s.width = o.width = l), (s.height = o.height = c), (s.style.width = l + 'px'), (s.style.height = c + 'px'), e.retinaScale(o), t) ||
                      ((n = { width: l, height: c }),
                      i.notify(this, 'resize', [n]),
                      this.options.onResize && this.options.onResize(this, n),
                      this.stop(),
                      this.update(this.options.responsiveAnimationDuration))
                  },
                  ensureScalesHaveIDs: function () {
                    var t = this.options,
                      i = t.scales || {},
                      n = t.scale
                    e.each(i.xAxes, function (t, e) {
                      t.id = t.id || 'x-axis-' + e
                    }),
                      e.each(i.yAxes, function (t, e) {
                        t.id = t.id || 'y-axis-' + e
                      }),
                      n && (n.id = n.id || 'scale')
                  },
                  buildScales: function () {
                    var i = this,
                      n = i.options,
                      o = (i.scales = {}),
                      r = []
                    n.scales &&
                      (r = r.concat(
                        (n.scales.xAxes || []).map(function (t) {
                          return { options: t, dtype: 'category' }
                        }),
                        (n.scales.yAxes || []).map(function (t) {
                          return { options: t, dtype: 'linear' }
                        })
                      )),
                      n.scale && r.push({ options: n.scale, dtype: 'radialLinear', isDefault: !0 }),
                      e.each(r, function (n) {
                        var r,
                          s = n.options,
                          a = e.getValueOrDefault(s.type, n.dtype),
                          l = t.scaleService.getScaleConstructor(a)
                        l && ((r = new l({ id: s.id, options: s, ctx: i.chart.ctx, chart: i })), (o[r.id] = r), n.isDefault && (i.scale = r))
                      }),
                      t.scaleService.addScalesToLayout(this)
                  },
                  buildOrUpdateControllers: function () {
                    var i = this,
                      n = [],
                      o = []
                    if (
                      (e.each(
                        i.data.datasets,
                        function (e, r) {
                          var s = i.getDatasetMeta(r)
                          s.type || (s.type = e.type || i.config.type),
                            n.push(s.type),
                            s.controller ? s.controller.updateIndex(r) : ((s.controller = new t.controllers[s.type](i, r)), o.push(s.controller))
                        },
                        i
                      ),
                      1 < n.length)
                    )
                      for (var r = 1; r < n.length; r++)
                        if (n[r] !== n[r - 1]) {
                          i.isCombo = !0
                          break
                        }
                    return o
                  },
                  resetElements: function () {
                    var t = this
                    e.each(
                      t.data.datasets,
                      function (e, i) {
                        t.getDatasetMeta(i).controller.reset()
                      },
                      t
                    )
                  },
                  reset: function () {
                    this.resetElements(), this.tooltip.initialize()
                  },
                  update: function (t, n) {
                    var o,
                      r,
                      s,
                      a = this
                    ;(s = (r = a).options).scale
                      ? (r.scale.options = s.scale)
                      : s.scales &&
                        s.scales.xAxes.concat(s.scales.yAxes).forEach(function (t) {
                          r.scales[t.id].options = t
                        }),
                      (r.tooltip._options = s.tooltips),
                      !1 !== i.notify(a, 'beforeUpdate') &&
                        ((a.tooltip._data = a.data),
                        (o = a.buildOrUpdateControllers()),
                        e.each(
                          a.data.datasets,
                          function (t, e) {
                            a.getDatasetMeta(e).controller.buildOrUpdateElements()
                          },
                          a
                        ),
                        a.updateLayout(),
                        e.each(o, function (t) {
                          t.reset()
                        }),
                        a.updateDatasets(),
                        i.notify(a, 'afterUpdate'),
                        a._bufferedRender ? (a._bufferedRequest = { lazy: n, duration: t }) : a.render(t, n))
                  },
                  updateLayout: function () {
                    !1 !== i.notify(this, 'beforeLayout') &&
                      (t.layoutService.update(this, this.chart.width, this.chart.height), i.notify(this, 'afterScaleUpdate'), i.notify(this, 'afterLayout'))
                  },
                  updateDatasets: function () {
                    if (!1 !== i.notify(this, 'beforeDatasetsUpdate')) {
                      for (var t = 0, e = this.data.datasets.length; t < e; ++t) this.getDatasetMeta(t).controller.update()
                      i.notify(this, 'afterDatasetsUpdate')
                    }
                  },
                  render: function (n, o) {
                    var r = this
                    if (!1 !== i.notify(r, 'beforeRender')) {
                      var s,
                        a = r.options.animation,
                        l = function () {
                          i.notify(r, 'afterRender')
                          var t = a && a.onComplete
                          t && t.call && t.call(r)
                        }
                      return (
                        a && ((void 0 !== n && 0 !== n) || (void 0 === n && 0 !== a.duration))
                          ? (((s = new t.Animation()).numSteps = (n || a.duration) / 16.66),
                            (s.easing = a.easing),
                            (s.render = function (t, i) {
                              var n = e.easingEffects[i.easing],
                                o = i.currentStep / i.numSteps,
                                r = n(o)
                              t.draw(r, o, i.currentStep)
                            }),
                            (s.onAnimationProgress = a.onProgress),
                            (s.onAnimationComplete = l),
                            t.animationService.addAnimation(r, s, n, o))
                          : (r.draw(), l()),
                        r
                      )
                    }
                  },
                  draw: function (t) {
                    var n = this
                    n.clear(),
                      null != t || (t = 1),
                      !1 !== i.notify(n, 'beforeDraw', [t]) &&
                        (e.each(
                          n.boxes,
                          function (t) {
                            t.draw(n.chartArea)
                          },
                          n
                        ),
                        n.scale && n.scale.draw(),
                        n.drawDatasets(t),
                        n.tooltip.transition(t).draw(),
                        i.notify(n, 'afterDraw', [t]))
                  },
                  drawDatasets: function (t) {
                    var n = this
                    !1 !== i.notify(n, 'beforeDatasetsDraw', [t]) &&
                      (e.each(
                        n.data.datasets,
                        function (e, i) {
                          n.isDatasetVisible(i) && n.getDatasetMeta(i).controller.draw(t)
                        },
                        n,
                        !0
                      ),
                      i.notify(n, 'afterDatasetsDraw', [t]))
                  },
                  getElementAtEvent: function (e) {
                    return t.Interaction.modes.single(this, e)
                  },
                  getElementsAtEvent: function (e) {
                    return t.Interaction.modes.label(this, e, { intersect: !0 })
                  },
                  getElementsAtXAxis: function (e) {
                    return t.Interaction.modes['x-axis'](this, e, { intersect: !0 })
                  },
                  getElementsAtEventForMode: function (e, i, n) {
                    var o = t.Interaction.modes[i]
                    return 'function' == typeof o ? o(this, e, n) : []
                  },
                  getDatasetAtEvent: function (e) {
                    return t.Interaction.modes.dataset(this, e, { intersect: !0 })
                  },
                  getDatasetMeta: function (t) {
                    var e = this.data.datasets[t]
                    return (
                      e._meta || (e._meta = {}),
                      e._meta[this.id] || (e._meta[this.id] = { type: null, data: [], dataset: null, controller: null, hidden: null, xAxisID: null, yAxisID: null })
                    )
                  },
                  getVisibleDatasetCount: function () {
                    for (var t = 0, e = 0, i = this.data.datasets.length; e < i; ++e) this.isDatasetVisible(e) && t++
                    return t
                  },
                  isDatasetVisible: function (t) {
                    var e = this.getDatasetMeta(t)
                    return 'boolean' == typeof e.hidden ? !e.hidden : !this.data.datasets[t].hidden
                  },
                  generateLegend: function () {
                    return this.options.legendCallback(this)
                  },
                  destroy: function () {
                    var o,
                      r,
                      s,
                      a = this,
                      l = a.chart.canvas
                    for (a.stop(), r = 0, s = a.data.datasets.length; r < s; ++r) (o = a.getDatasetMeta(r)).controller && (o.controller.destroy(), (o.controller = null))
                    l && (a.unbindEvents(), e.clear(a.chart), n.releaseContext(a.chart.ctx), (a.chart.canvas = null), (a.chart.ctx = null)),
                      i.notify(a, 'destroy'),
                      delete t.instances[a.id]
                  },
                  toBase64Image: function () {
                    return this.chart.canvas.toDataURL.apply(this.chart.canvas, arguments)
                  },
                  initToolTip: function () {
                    ;(this.tooltip = new t.Tooltip({ _chart: this.chart, _chartInstance: this, _data: this.data, _options: this.options.tooltips }, this)),
                      this.tooltip.initialize()
                  },
                  bindEvents: function () {
                    var t = this,
                      i = (t._listeners = {}),
                      o = function () {
                        t.eventHandler.apply(t, arguments)
                      }
                    e.each(t.options.events, function (e) {
                      n.addEventListener(t, e, o), (i[e] = o)
                    }),
                      t.options.responsive &&
                        ((o = function () {
                          t.resize()
                        }),
                        n.addEventListener(t, 'resize', o),
                        (i.resize = o))
                  },
                  unbindEvents: function () {
                    var t = this,
                      i = t._listeners
                    i &&
                      (delete t._listeners,
                      e.each(i, function (e, i) {
                        n.removeEventListener(t, i, e)
                      }))
                  },
                  updateHoverStyle: function (t, e, i) {
                    for (var n, o = i ? 'setHoverStyle' : 'removeHoverStyle', r = 0, s = t.length; r < s; ++r) (n = t[r]) && this.getDatasetMeta(n._datasetIndex).controller[o](n)
                  },
                  eventHandler: function (t) {
                    var e = this,
                      n = e.tooltip
                    if (!1 !== i.notify(e, 'beforeEvent', [t])) {
                      ;(e._bufferedRender = !0), (e._bufferedRequest = null)
                      var o = e.handleEvent(t)
                      ;(o |= n && n.handleEvent(t)), i.notify(e, 'afterEvent', [t])
                      var r = e._bufferedRequest
                      return (
                        r ? e.render(r.duration, r.lazy) : o && !e.animating && (e.stop(), e.render(e.options.hover.animationDuration, !0)),
                        (e._bufferedRender = !1),
                        (e._bufferedRequest = null),
                        e
                      )
                    }
                  },
                  handleEvent: function (t) {
                    var i,
                      n = this,
                      o = n.options || {},
                      r = o.hover
                    return (
                      (n.lastActive = n.lastActive || []),
                      'mouseout' === t.type ? (n.active = []) : (n.active = n.getElementsAtEventForMode(t, r.mode, r)),
                      r.onHover && r.onHover.call(n, t.native, n.active),
                      ('mouseup' !== t.type && 'click' !== t.type) || (o.onClick && o.onClick.call(n, t.native, n.active)),
                      n.lastActive.length && n.updateHoverStyle(n.lastActive, r.mode, !1),
                      n.active.length && r.mode && n.updateHoverStyle(n.active, r.mode, !0),
                      (i = !e.arrayEquals(n.active, n.lastActive)),
                      (n.lastActive = n.active),
                      i
                    )
                  }
                })
            }
          },
          {}
        ],
        24: [
          function (t, e, i) {
            'use strict'
            e.exports = function (t) {
              function e(t, e) {
                var i,
                  o,
                  r = t._chartjs
                r &&
                  (-1 !== (o = (i = r.listeners).indexOf(e)) && i.splice(o, 1),
                  0 < i.length ||
                    (n.forEach(function (e) {
                      delete t[e]
                    }),
                    delete t._chartjs))
              }
              var i = t.helpers,
                n = ['push', 'pop', 'shift', 'splice', 'unshift']
              ;(t.DatasetController = function (t, e) {
                this.initialize(t, e)
              }),
                i.extend(t.DatasetController.prototype, {
                  datasetElementType: null,
                  dataElementType: null,
                  initialize: function (t, e) {
                    ;(this.chart = t), (this.index = e), this.linkScales(), this.addElements()
                  },
                  updateIndex: function (t) {
                    this.index = t
                  },
                  linkScales: function () {
                    var t = this.getMeta(),
                      e = this.getDataset()
                    null === t.xAxisID && (t.xAxisID = e.xAxisID || this.chart.options.scales.xAxes[0].id),
                      null === t.yAxisID && (t.yAxisID = e.yAxisID || this.chart.options.scales.yAxes[0].id)
                  },
                  getDataset: function () {
                    return this.chart.data.datasets[this.index]
                  },
                  getMeta: function () {
                    return this.chart.getDatasetMeta(this.index)
                  },
                  getScaleForId: function (t) {
                    return this.chart.scales[t]
                  },
                  reset: function () {
                    this.update(!0)
                  },
                  destroy: function () {
                    this._data && e(this._data, this)
                  },
                  createMetaDataset: function () {
                    var t = this.datasetElementType
                    return t && new t({ _chart: this.chart.chart, _datasetIndex: this.index })
                  },
                  createMetaData: function (t) {
                    var e = this.dataElementType
                    return e && new e({ _chart: this.chart.chart, _datasetIndex: this.index, _index: t })
                  },
                  addElements: function () {
                    for (var t = this.getMeta(), e = this.getDataset().data || [], i = t.data, n = 0, o = e.length; n < o; ++n) i[n] = i[n] || this.createMetaData(n)
                    t.dataset = t.dataset || this.createMetaDataset()
                  },
                  addElementAndReset: function (t) {
                    var e = this.createMetaData(t)
                    this.getMeta().data.splice(t, 0, e), this.updateElement(e, t, !0)
                  },
                  buildOrUpdateElements: function () {
                    var t,
                      o = this.getDataset(),
                      r = o.data || (o.data = [])
                    this._data !== r &&
                      (this._data && e(this._data, this),
                      this,
                      (t = r)._chartjs
                        ? t._chartjs.listeners.push(this)
                        : (Object.defineProperty(t, '_chartjs', { configurable: !0, enumerable: !1, value: { listeners: [this] } }),
                          n.forEach(function (e) {
                            var n = 'onData' + e.charAt(0).toUpperCase() + e.slice(1),
                              o = t[e]
                            Object.defineProperty(t, e, {
                              configurable: !0,
                              enumerable: !1,
                              value: function () {
                                var e = Array.prototype.slice.call(arguments),
                                  r = o.apply(this, e)
                                return (
                                  i.each(t._chartjs.listeners, function (t) {
                                    'function' == typeof t[n] && t[n].apply(t, e)
                                  }),
                                  r
                                )
                              }
                            })
                          })),
                      (this._data = r)),
                      this.resyncElements()
                  },
                  update: i.noop,
                  draw: function (t) {
                    for (var e = t || 1, i = this.getMeta().data, n = 0, o = i.length; n < o; ++n) i[n].transition(e).draw()
                  },
                  removeHoverStyle: function (t, e) {
                    var n = this.chart.data.datasets[t._datasetIndex],
                      o = t._index,
                      r = t.custom || {},
                      s = i.getValueAtIndexOrDefault,
                      a = t._model
                    ;(a.backgroundColor = r.backgroundColor ? r.backgroundColor : s(n.backgroundColor, o, e.backgroundColor)),
                      (a.borderColor = r.borderColor ? r.borderColor : s(n.borderColor, o, e.borderColor)),
                      (a.borderWidth = r.borderWidth ? r.borderWidth : s(n.borderWidth, o, e.borderWidth))
                  },
                  setHoverStyle: function (t) {
                    var e = this.chart.data.datasets[t._datasetIndex],
                      n = t._index,
                      o = t.custom || {},
                      r = i.getValueAtIndexOrDefault,
                      s = i.getHoverColor,
                      a = t._model
                    ;(a.backgroundColor = o.hoverBackgroundColor ? o.hoverBackgroundColor : r(e.hoverBackgroundColor, n, s(a.backgroundColor))),
                      (a.borderColor = o.hoverBorderColor ? o.hoverBorderColor : r(e.hoverBorderColor, n, s(a.borderColor))),
                      (a.borderWidth = o.hoverBorderWidth ? o.hoverBorderWidth : r(e.hoverBorderWidth, n, a.borderWidth))
                  },
                  resyncElements: function () {
                    var t = this.getMeta(),
                      e = this.getDataset().data,
                      i = t.data.length,
                      n = e.length
                    n < i ? t.data.splice(n, i - n) : i < n && this.insertElements(i, n - i)
                  },
                  insertElements: function (t, e) {
                    for (var i = 0; i < e; ++i) this.addElementAndReset(t + i)
                  },
                  onDataPush: function () {
                    this.insertElements(this.getDataset().data.length - 1, arguments.length)
                  },
                  onDataPop: function () {
                    this.getMeta().data.pop()
                  },
                  onDataShift: function () {
                    this.getMeta().data.shift()
                  },
                  onDataSplice: function (t, e) {
                    this.getMeta().data.splice(t, e), this.insertElements(t, arguments.length - 2)
                  },
                  onDataUnshift: function () {
                    this.insertElements(0, arguments.length)
                  }
                }),
                (t.DatasetController.extend = i.inherits)
            }
          },
          {}
        ],
        25: [
          function (t, e, i) {
            'use strict'
            e.exports = function (t) {
              var e = t.helpers
              ;(t.elements = {}),
                (t.Element = function (t) {
                  e.extend(this, t), this.initialize.apply(this, arguments)
                }),
                e.extend(t.Element.prototype, {
                  initialize: function () {
                    this.hidden = !1
                  },
                  pivot: function () {
                    return this._view || (this._view = e.clone(this._model)), (this._start = e.clone(this._view)), this
                  },
                  transition: function (t) {
                    var i = this
                    return (
                      i._view || (i._view = e.clone(i._model)),
                      1 === t
                        ? ((i._view = i._model), (i._start = null))
                        : (i._start || i.pivot(),
                          e.each(
                            i._model,
                            function (n, o) {
                              if ('_' !== o[0])
                                if (i._view.hasOwnProperty(o)) {
                                  if (n !== i._view[o])
                                    if ('string' == typeof n)
                                      try {
                                        var r = e.color(i._model[o]).mix(e.color(i._start[o]), t)
                                        i._view[o] = r.rgbString()
                                      } catch (r) {
                                        i._view[o] = n
                                      }
                                    else {
                                      var s
                                      'number' == typeof n
                                        ? ((s = void 0 !== i._start[o] && !1 === isNaN(i._start[o]) ? i._start[o] : 0), (i._view[o] = (i._model[o] - s) * t + s))
                                        : (i._view[o] = n)
                                    }
                                } else 'number' != typeof n || isNaN(i._view[o]) ? (i._view[o] = n) : (i._view[o] = n * t)
                            },
                            i
                          )),
                      i
                    )
                  },
                  tooltipPosition: function () {
                    return { x: this._model.x, y: this._model.y }
                  },
                  hasValue: function () {
                    return e.isNumber(this._model.x) && e.isNumber(this._model.y)
                  }
                }),
                (t.Element.extend = e.inherits)
            }
          },
          {}
        ],
        26: [
          function (t, e, i) {
            'use strict'
            var n = t(3)
            e.exports = function (t) {
              function e(t, e, i) {
                var n
                return 'string' == typeof t ? ((n = parseInt(t, 10)), -1 !== t.indexOf('%') && (n = (n / 100) * e.parentNode[i])) : (n = t), n
              }
              function i(t) {
                return null != t && 'none' !== t
              }
              function o(t, n, o) {
                var r = document.defaultView,
                  s = t.parentNode,
                  a = r.getComputedStyle(t)[n],
                  l = r.getComputedStyle(s)[n],
                  c = i(a),
                  u = i(l),
                  d = Number.POSITIVE_INFINITY
                return c || u ? Math.min(c ? e(a, t, o) : d, u ? e(l, s, o) : d) : 'none'
              }
              var r,
                s = (t.helpers = {})
              ;(s.each = function (t, e, i, n) {
                if (s.isArray(t))
                  if (((r = t.length), n)) for (a = r - 1; 0 <= a; a--) e.call(i, t[a], a)
                  else for (a = 0; a < r; a++) e.call(i, t[a], a)
                else if ('object' == typeof t) for (var o = Object.keys(t), r = o.length, a = 0; a < r; a++) e.call(i, t[o[a]], o[a])
              }),
                (s.clone = function (t) {
                  var e = {}
                  return (
                    s.each(t, function (t, i) {
                      s.isArray(t) ? (e[i] = t.slice(0)) : (e[i] = 'object' == typeof t && null !== t ? s.clone(t) : t)
                    }),
                    e
                  )
                }),
                (s.extend = function (t) {
                  for (
                    var e = function (e, i) {
                        t[i] = e
                      },
                      i = 1,
                      n = arguments.length;
                    i < n;
                    i++
                  )
                    s.each(arguments[i], e)
                  return t
                }),
                (s.configMerge = function (e) {
                  var i = s.clone(e)
                  return (
                    s.each(Array.prototype.slice.call(arguments, 1), function (e) {
                      s.each(e, function (e, n) {
                        var o = i.hasOwnProperty(n),
                          r = o ? i[n] : {}
                        'scales' === n
                          ? (i[n] = s.scaleMerge(r, e))
                          : 'scale' === n
                          ? (i[n] = s.configMerge(r, t.scaleService.getScaleDefaults(e.type), e))
                          : !o || 'object' != typeof r || s.isArray(r) || null === r || 'object' != typeof e || s.isArray(e)
                          ? (i[n] = e)
                          : (i[n] = s.configMerge(r, e))
                      })
                    }),
                    i
                  )
                }),
                (s.scaleMerge = function (e, i) {
                  var n = s.clone(e)
                  return (
                    s.each(i, function (e, i) {
                      'xAxes' === i || 'yAxes' === i
                        ? n.hasOwnProperty(i)
                          ? s.each(e, function (e, o) {
                              var r = s.getValueOrDefault(e.type, 'xAxes' === i ? 'category' : 'linear'),
                                a = t.scaleService.getScaleDefaults(r)
                              o >= n[i].length || !n[i][o].type
                                ? n[i].push(s.configMerge(a, e))
                                : e.type && e.type !== n[i][o].type
                                ? (n[i][o] = s.configMerge(n[i][o], a, e))
                                : (n[i][o] = s.configMerge(n[i][o], e))
                            })
                          : ((n[i] = []),
                            s.each(e, function (e) {
                              var o = s.getValueOrDefault(e.type, 'xAxes' === i ? 'category' : 'linear')
                              n[i].push(s.configMerge(t.scaleService.getScaleDefaults(o), e))
                            }))
                        : n.hasOwnProperty(i) && 'object' == typeof n[i] && null !== n[i] && 'object' == typeof e
                        ? (n[i] = s.configMerge(n[i], e))
                        : (n[i] = e)
                    }),
                    n
                  )
                }),
                (s.getValueAtIndexOrDefault = function (t, e, i) {
                  return null == t ? i : s.isArray(t) ? (e < t.length ? t[e] : i) : t
                }),
                (s.getValueOrDefault = function (t, e) {
                  return void 0 === t ? e : t
                }),
                (s.indexOf = Array.prototype.indexOf
                  ? function (t, e) {
                      return t.indexOf(e)
                    }
                  : function (t, e) {
                      for (var i = 0, n = t.length; i < n; ++i) if (t[i] === e) return i
                      return -1
                    }),
                (s.where = function (t, e) {
                  if (s.isArray(t) && Array.prototype.filter) return t.filter(e)
                  var i = []
                  return (
                    s.each(t, function (t) {
                      e(t) && i.push(t)
                    }),
                    i
                  )
                }),
                (s.findIndex = Array.prototype.findIndex
                  ? function (t, e, i) {
                      return t.findIndex(e, i)
                    }
                  : function (t, e, i) {
                      i = void 0 === i ? t : i
                      for (var n = 0, o = t.length; n < o; ++n) if (e.call(i, t[n], n, t)) return n
                      return -1
                    }),
                (s.findNextWhere = function (t, e, i) {
                  null != i || (i = -1)
                  for (var n = i + 1; n < t.length; n++) {
                    var o = t[n]
                    if (e(o)) return o
                  }
                }),
                (s.findPreviousWhere = function (t, e, i) {
                  null != i || (i = t.length)
                  for (var n = i - 1; 0 <= n; n--) {
                    var o = t[n]
                    if (e(o)) return o
                  }
                }),
                (s.inherits = function (t) {
                  function e() {
                    this.constructor = n
                  }
                  var i = this,
                    n =
                      t && t.hasOwnProperty('constructor')
                        ? t.constructor
                        : function () {
                            return i.apply(this, arguments)
                          }
                  return (e.prototype = i.prototype), (n.prototype = new e()), (n.extend = s.inherits), t && s.extend(n.prototype, t), (n.__super__ = i.prototype), n
                }),
                (s.noop = function () {}),
                (s.uid =
                  ((r = 0),
                  function () {
                    return r++
                  })),
                (s.isNumber = function (t) {
                  return !isNaN(parseFloat(t)) && isFinite(t)
                }),
                (s.almostEquals = function (t, e, i) {
                  return Math.abs(t - e) < i
                }),
                (s.almostWhole = function (t, e) {
                  var i = Math.round(t)
                  return i - e < t && t < i + e
                }),
                (s.max = function (t) {
                  return t.reduce(function (t, e) {
                    return isNaN(e) ? t : Math.max(t, e)
                  }, Number.NEGATIVE_INFINITY)
                }),
                (s.min = function (t) {
                  return t.reduce(function (t, e) {
                    return isNaN(e) ? t : Math.min(t, e)
                  }, Number.POSITIVE_INFINITY)
                }),
                (s.sign = Math.sign
                  ? function (t) {
                      return Math.sign(t)
                    }
                  : function (t) {
                      return 0 == (t = +t) || isNaN(t) ? t : 0 < t ? 1 : -1
                    }),
                (s.log10 = Math.log10
                  ? function (t) {
                      return Math.log10(t)
                    }
                  : function (t) {
                      return Math.log(t) / Math.LN10
                    }),
                (s.toRadians = function (t) {
                  return t * (Math.PI / 180)
                }),
                (s.toDegrees = function (t) {
                  return t * (180 / Math.PI)
                }),
                (s.getAngleFromPoint = function (t, e) {
                  var i = e.x - t.x,
                    n = e.y - t.y,
                    o = Math.sqrt(i * i + n * n),
                    r = Math.atan2(n, i)
                  return r < -0.5 * Math.PI && (r += 2 * Math.PI), { angle: r, distance: o }
                }),
                (s.distanceBetweenPoints = function (t, e) {
                  return Math.sqrt(Math.pow(e.x - t.x, 2) + Math.pow(e.y - t.y, 2))
                }),
                (s.aliasPixel = function (t) {
                  return t % 2 == 0 ? 0 : 0.5
                }),
                (s.splineCurve = function (t, e, i, n) {
                  var o = t.skip ? e : t,
                    r = e,
                    s = i.skip ? e : i,
                    a = Math.sqrt(Math.pow(r.x - o.x, 2) + Math.pow(r.y - o.y, 2)),
                    l = Math.sqrt(Math.pow(s.x - r.x, 2) + Math.pow(s.y - r.y, 2)),
                    c = a / (a + l),
                    u = l / (a + l),
                    d = n * (c = isNaN(c) ? 0 : c),
                    h = n * (u = isNaN(u) ? 0 : u)
                  return { previous: { x: r.x - d * (s.x - o.x), y: r.y - d * (s.y - o.y) }, next: { x: r.x + h * (s.x - o.x), y: r.y + h * (s.y - o.y) } }
                }),
                (s.EPSILON = Number.EPSILON || 1e-14),
                (s.splineCurveMonotone = function (t) {
                  for (
                    var e,
                      i,
                      n,
                      o,
                      r,
                      a,
                      l,
                      c,
                      u,
                      d = (t || []).map(function (t) {
                        return { model: t._model, deltaK: 0, mK: 0 }
                      }),
                      h = d.length,
                      f = 0;
                    f < h;
                    ++f
                  )
                    (o = d[f]).model.skip ||
                      ((i = 0 < f ? d[f - 1] : null),
                      (n = f < h - 1 ? d[f + 1] : null) && !n.model.skip && ((e = n.model.x - o.model.x), (o.deltaK = 0 != e ? (n.model.y - o.model.y) / e : 0)),
                      !i || i.model.skip
                        ? (o.mK = o.deltaK)
                        : !n || n.model.skip
                        ? (o.mK = i.deltaK)
                        : this.sign(i.deltaK) !== this.sign(o.deltaK)
                        ? (o.mK = 0)
                        : (o.mK = (i.deltaK + o.deltaK) / 2))
                  for (f = 0; f < h - 1; ++f)
                    (o = d[f]),
                      (n = d[f + 1]),
                      o.model.skip ||
                        n.model.skip ||
                        (s.almostEquals(o.deltaK, 0, this.EPSILON)
                          ? (o.mK = n.mK = 0)
                          : ((r = o.mK / o.deltaK),
                            (a = n.mK / o.deltaK),
                            (c = Math.pow(r, 2) + Math.pow(a, 2)) <= 9 || ((l = 3 / Math.sqrt(c)), (o.mK = r * l * o.deltaK), (n.mK = a * l * o.deltaK))))
                  for (f = 0; f < h; ++f)
                    (o = d[f]).model.skip ||
                      ((i = 0 < f ? d[f - 1] : null),
                      (n = f < h - 1 ? d[f + 1] : null),
                      i &&
                        !i.model.skip &&
                        ((u = (o.model.x - i.model.x) / 3), (o.model.controlPointPreviousX = o.model.x - u), (o.model.controlPointPreviousY = o.model.y - u * o.mK)),
                      n && !n.model.skip && ((u = (n.model.x - o.model.x) / 3), (o.model.controlPointNextX = o.model.x + u), (o.model.controlPointNextY = o.model.y + u * o.mK)))
                }),
                (s.nextItem = function (t, e, i) {
                  return i ? (e >= t.length - 1 ? t[0] : t[e + 1]) : e >= t.length - 1 ? t[t.length - 1] : t[e + 1]
                }),
                (s.previousItem = function (t, e, i) {
                  return i ? (e <= 0 ? t[t.length - 1] : t[e - 1]) : e <= 0 ? t[0] : t[e - 1]
                }),
                (s.niceNum = function (t, e) {
                  var i = Math.floor(s.log10(t)),
                    n = t / Math.pow(10, i)
                  return (e ? (n < 1.5 ? 1 : n < 3 ? 2 : n < 7 ? 5 : 10) : n <= 1 ? 1 : n <= 2 ? 2 : n <= 5 ? 5 : 10) * Math.pow(10, i)
                })
              var a = (s.easingEffects = {
                linear: function (t) {
                  return t
                },
                easeInQuad: function (t) {
                  return t * t
                },
                easeOutQuad: function (t) {
                  return -1 * t * (t - 2)
                },
                easeInOutQuad: function (t) {
                  return (t /= 0.5) < 1 ? 0.5 * t * t : -0.5 * (--t * (t - 2) - 1)
                },
                easeInCubic: function (t) {
                  return t * t * t
                },
                easeOutCubic: function (t) {
                  return --t * t * t + 1
                },
                easeInOutCubic: function (t) {
                  return (t /= 0.5) < 1 ? 0.5 * t * t * t : 0.5 * ((t -= 2) * t * t + 2)
                },
                easeInQuart: function (t) {
                  return t * t * t * t
                },
                easeOutQuart: function (t) {
                  return -1 * (--t * t * t * t - 1)
                },
                easeInOutQuart: function (t) {
                  return (t /= 0.5) < 1 ? 0.5 * t * t * t * t : -0.5 * ((t -= 2) * t * t * t - 2)
                },
                easeInQuint: function (t) {
                  return (t /= 1) * t * t * t * t
                },
                easeOutQuint: function (t) {
                  return --t * t * t * t * t + 1
                },
                easeInOutQuint: function (t) {
                  return (t /= 0.5) < 1 ? 0.5 * t * t * t * t * t : 0.5 * ((t -= 2) * t * t * t * t + 2)
                },
                easeInSine: function (t) {
                  return -1 * Math.cos(t * (Math.PI / 2)) + 1
                },
                easeOutSine: function (t) {
                  return +Math.sin(t * (Math.PI / 2))
                },
                easeInOutSine: function (t) {
                  return -0.5 * (Math.cos(Math.PI * t) - 1)
                },
                easeInExpo: function (t) {
                  return 0 === t ? 1 : +Math.pow(2, 10 * (t - 1))
                },
                easeOutExpo: function (t) {
                  return 1 === t ? 1 : 1 - Math.pow(2, -10 * t)
                },
                easeInOutExpo: function (t) {
                  return 0 === t ? 0 : 1 === t ? 1 : (t /= 0.5) < 1 ? 0.5 * Math.pow(2, 10 * (t - 1)) : 0.5 * (2 - Math.pow(2, -10 * --t))
                },
                easeInCirc: function (t) {
                  return 1 <= t ? t : -1 * (Math.sqrt(1 - (t /= 1) * t) - 1)
                },
                easeOutCirc: function (t) {
                  return +Math.sqrt(1 - --t * t)
                },
                easeInOutCirc: function (t) {
                  return (t /= 0.5) < 1 ? -0.5 * (Math.sqrt(1 - t * t) - 1) : 0.5 * (Math.sqrt(1 - (t -= 2) * t) + 1)
                },
                easeInElastic: function (t) {
                  var e = 1.70158,
                    i = 0,
                    n = 1
                  return 0 === t
                    ? 0
                    : 1 == (t /= 1)
                    ? 1
                    : ((i = i || 0.3),
                      (e = n < Math.abs(1) ? ((n = 1), i / 4) : (i / (2 * Math.PI)) * Math.asin(1 / n)),
                      -n * Math.pow(2, 10 * --t) * Math.sin(((t - e) * (2 * Math.PI)) / i))
                },
                easeOutElastic: function (t) {
                  var e = 1.70158,
                    i = 0,
                    n = 1
                  return 0 === t
                    ? 0
                    : 1 == (t /= 1)
                    ? 1
                    : ((i = i || 0.3),
                      (e = n < Math.abs(1) ? ((n = 1), i / 4) : (i / (2 * Math.PI)) * Math.asin(1 / n)),
                      n * Math.pow(2, -10 * t) * Math.sin(((t - e) * (2 * Math.PI)) / i) + 1)
                },
                easeInOutElastic: function (t) {
                  var e = 1.70158,
                    i = 0,
                    n = 1
                  return 0 === t
                    ? 0
                    : 2 == (t /= 0.5)
                    ? 1
                    : ((i = i || 0.3 * 1.5 * 1),
                      (e = n < Math.abs(1) ? ((n = 1), i / 4) : (i / (2 * Math.PI)) * Math.asin(1 / n)),
                      t < 1
                        ? n * Math.pow(2, 10 * --t) * Math.sin(((t - e) * (2 * Math.PI)) / i) * -0.5
                        : n * Math.pow(2, -10 * --t) * Math.sin(((t - e) * (2 * Math.PI)) / i) * 0.5 + 1)
                },
                easeInBack: function (t) {
                  return (t /= 1) * t * (2.70158 * t - 1.70158)
                },
                easeOutBack: function (t) {
                  return --t * t * (2.70158 * t + 1.70158) + 1
                },
                easeInOutBack: function (t) {
                  var e = 1.70158
                  return (t /= 0.5) < 1 ? t * t * ((1 + (e *= 1.525)) * t - e) * 0.5 : 0.5 * ((t -= 2) * t * ((1 + (e *= 1.525)) * t + e) + 2)
                },
                easeInBounce: function (t) {
                  return 1 - a.easeOutBounce(1 - t)
                },
                easeOutBounce: function (t) {
                  return (t /= 1) < 1 / 2.75
                    ? 7.5625 * t * t * 1
                    : t < 2 / 2.75
                    ? 7.5625 * (t -= 1.5 / 2.75) * t + 0.75
                    : t < 2.5 / 2.75
                    ? 7.5625 * (t -= 2.25 / 2.75) * t + 0.9375
                    : 7.5625 * (t -= 2.625 / 2.75) * t + 0.984375
                },
                easeInOutBounce: function (t) {
                  return t < 0.5 ? 0.5 * a.easeInBounce(2 * t) : 0.5 * a.easeOutBounce(2 * t - 1) + 0.5
                }
              })
              ;(s.requestAnimFrame =
                window.requestAnimationFrame ||
                window.webkitRequestAnimationFrame ||
                window.mozRequestAnimationFrame ||
                window.oRequestAnimationFrame ||
                window.msRequestAnimationFrame ||
                function (t) {
                  return window.setTimeout(t, 1e3 / 60)
                }),
                (s.getRelativePosition = function (t, e) {
                  var i = t.originalEvent || t,
                    n = t.currentTarget || t.srcElement,
                    o = n.getBoundingClientRect(),
                    r = i.touches,
                    a = r && 0 < r.length ? ((p = r[0].clientX), r[0].clientY) : ((p = i.clientX), i.clientY),
                    l = parseFloat(s.getStyle(n, 'padding-left')),
                    c = parseFloat(s.getStyle(n, 'padding-top')),
                    u = parseFloat(s.getStyle(n, 'padding-right')),
                    d = parseFloat(s.getStyle(n, 'padding-bottom')),
                    h = o.right - o.left - l - u,
                    f = o.bottom - o.top - c - d,
                    p = Math.round((((p - o.left - l) / h) * n.width) / e.currentDevicePixelRatio)
                  return { x: p, y: (a = Math.round((((a - o.top - c) / f) * n.height) / e.currentDevicePixelRatio)) }
                }),
                (s.addEvent = function (t, e, i) {
                  t.addEventListener ? t.addEventListener(e, i) : t.attachEvent ? t.attachEvent('on' + e, i) : (t['on' + e] = i)
                }),
                (s.removeEvent = function (t, e, i) {
                  t.removeEventListener ? t.removeEventListener(e, i, !1) : t.detachEvent ? t.detachEvent('on' + e, i) : (t['on' + e] = s.noop)
                }),
                (s.getConstraintWidth = function (t) {
                  return o(t, 'max-width', 'clientWidth')
                }),
                (s.getConstraintHeight = function (t) {
                  return o(t, 'max-height', 'clientHeight')
                }),
                (s.getMaximumWidth = function (t) {
                  var e = t.parentNode,
                    i = parseInt(s.getStyle(e, 'padding-left'), 10),
                    n = parseInt(s.getStyle(e, 'padding-right'), 10),
                    o = e.clientWidth - i - n,
                    r = s.getConstraintWidth(t)
                  return isNaN(r) ? o : Math.min(o, r)
                }),
                (s.getMaximumHeight = function (t) {
                  var e = t.parentNode,
                    i = parseInt(s.getStyle(e, 'padding-top'), 10),
                    n = parseInt(s.getStyle(e, 'padding-bottom'), 10),
                    o = e.clientHeight - i - n,
                    r = s.getConstraintHeight(t)
                  return isNaN(r) ? o : Math.min(o, r)
                }),
                (s.getStyle = function (t, e) {
                  return t.currentStyle ? t.currentStyle[e] : document.defaultView.getComputedStyle(t, null).getPropertyValue(e)
                }),
                (s.retinaScale = function (t) {
                  var e,
                    i,
                    n,
                    o = (t.currentDevicePixelRatio = window.devicePixelRatio || 1)
                  1 !== o &&
                    ((e = t.canvas),
                    (i = t.height),
                    (n = t.width),
                    (e.height = i * o),
                    (e.width = n * o),
                    t.ctx.scale(o, o),
                    (e.style.height = i + 'px'),
                    (e.style.width = n + 'px'))
                }),
                (s.clear = function (t) {
                  t.ctx.clearRect(0, 0, t.width, t.height)
                }),
                (s.fontString = function (t, e, i) {
                  return e + ' ' + t + 'px ' + i
                }),
                (s.longestText = function (t, e, i, n) {
                  var o = ((n = n || {}).data = n.data || {}),
                    r = (n.garbageCollect = n.garbageCollect || [])
                  n.font !== e && ((o = n.data = {}), (r = n.garbageCollect = []), (n.font = e)), (t.font = e)
                  var a = 0
                  s.each(i, function (e) {
                    null != e && !0 !== s.isArray(e)
                      ? (a = s.measureText(t, o, r, a, e))
                      : s.isArray(e) &&
                        s.each(e, function (e) {
                          null == e || s.isArray(e) || (a = s.measureText(t, o, r, a, e))
                        })
                  })
                  var l = r.length / 2
                  if (l > i.length) {
                    for (var c = 0; c < l; c++) delete o[r[c]]
                    r.splice(0, l)
                  }
                  return a
                }),
                (s.measureText = function (t, e, i, n, o) {
                  var r = e[o]
                  return r || ((r = e[o] = t.measureText(o).width), i.push(o)), n < r && (n = r), n
                }),
                (s.numberOfLabelLines = function (t) {
                  var e = 1
                  return (
                    s.each(t, function (t) {
                      s.isArray(t) && t.length > e && (e = t.length)
                    }),
                    e
                  )
                }),
                (s.drawRoundedRectangle = function (t, e, i, n, o, r) {
                  t.beginPath(),
                    t.moveTo(e + r, i),
                    t.lineTo(e + n - r, i),
                    t.quadraticCurveTo(e + n, i, e + n, i + r),
                    t.lineTo(e + n, i + o - r),
                    t.quadraticCurveTo(e + n, i + o, e + n - r, i + o),
                    t.lineTo(e + r, i + o),
                    t.quadraticCurveTo(e, i + o, e, i + o - r),
                    t.lineTo(e, i + r),
                    t.quadraticCurveTo(e, i, e + r, i),
                    t.closePath()
                }),
                (s.color = function (e) {
                  return n ? n(e instanceof CanvasGradient ? t.defaults.global.defaultColor : e) : (console.error('Color.js not found!'), e)
                }),
                (s.isArray = Array.isArray
                  ? function (t) {
                      return Array.isArray(t)
                    }
                  : function (t) {
                      return '[object Array]' === Object.prototype.toString.call(t)
                    }),
                (s.arrayEquals = function (t, e) {
                  var i, n, o, r
                  if (!t || !e || t.length !== e.length) return !1
                  for (i = 0, n = t.length; i < n; ++i)
                    if (((o = t[i]), (r = e[i]), o instanceof Array && r instanceof Array)) {
                      if (!s.arrayEquals(o, r)) return !1
                    } else if (o !== r) return !1
                  return !0
                }),
                (s.callCallback = function (t, e, i) {
                  t && 'function' == typeof t.call && t.apply(i, e)
                }),
                (s.getHoverColor = function (t) {
                  return t instanceof CanvasPattern ? t : s.color(t).saturate(0.5).darken(0.1).rgbString()
                })
            }
          },
          { 3: 3 }
        ],
        27: [
          function (t, e, i) {
            'use strict'
            e.exports = function (t) {
              function e(t, e) {
                return t.native ? { x: t.x, y: t.y } : s.getRelativePosition(t, e)
              }
              function i(t, e) {
                for (var i, n, o, r = 0, s = t.data.datasets.length; r < s; ++r)
                  if (t.isDatasetVisible(r))
                    for (n = 0, o = (i = t.getDatasetMeta(r)).data.length; n < o; ++n) {
                      var a = i.data[n]
                      a._view.skip || e(a)
                    }
              }
              function n(t, e) {
                var n = []
                return (
                  i(t, function (t) {
                    t.inRange(e.x, e.y) && n.push(t)
                  }),
                  n
                )
              }
              function o(t, e, n, o) {
                var r = Number.POSITIVE_INFINITY,
                  a = []
                return (
                  (o = o || s.distanceBetweenPoints),
                  i(t, function (t) {
                    var i, s
                    ;(n && !t.inRange(e.x, e.y)) || ((i = t.getCenterPoint()), (s = o(e, i)) < r ? ((a = [t]), (r = s)) : s === r && a.push(t))
                  }),
                  a
                )
              }
              function r(t, i, r) {
                var s = e(i, t.chart),
                  a = r.intersect
                    ? n(t, s)
                    : o(t, s, !1, function (t, e) {
                        return Math.abs(t.x - e.x)
                      }),
                  l = []
                return a.length
                  ? (t.data.datasets.forEach(function (e, i) {
                      var n
                      !t.isDatasetVisible(i) || ((n = t.getDatasetMeta(i).data[a[0]._index]) && !n._view.skip && l.push(n))
                    }),
                    l)
                  : []
              }
              var s = t.helpers
              t.Interaction = {
                modes: {
                  single: function (t, n) {
                    var o = e(n, t.chart),
                      r = []
                    return (
                      i(t, function (t) {
                        return t.inRange(o.x, o.y) && (r.push(t), r)
                      }),
                      r.slice(0, 1)
                    )
                  },
                  label: r,
                  index: r,
                  dataset: function (t, i, r) {
                    var s = e(i, t.chart),
                      a = r.intersect ? n(t, s) : o(t, s, !1)
                    return 0 < a.length && (a = t.getDatasetMeta(a[0]._datasetIndex).data), a
                  },
                  'x-axis': function (t, e) {
                    return r(t, e, !0)
                  },
                  point: function (t, i) {
                    return n(t, e(i, t.chart))
                  },
                  nearest: function (t, i, n) {
                    var r = o(t, e(i, t.chart), n.intersect)
                    return (
                      1 < r.length &&
                        r.sort(function (t, e) {
                          var i = t.getArea() - e.getArea()
                          return 0 === i && (i = t._datasetIndex - e._datasetIndex), i
                        }),
                      r.slice(0, 1)
                    )
                  },
                  x: function (t, n, o) {
                    var r = e(n, t.chart),
                      s = [],
                      a = !1
                    return (
                      i(t, function (t) {
                        t.inXRange(r.x) && s.push(t), t.inRange(r.x, r.y) && (a = !0)
                      }),
                      o.intersect && !a && (s = []),
                      s
                    )
                  },
                  y: function (t, n, o) {
                    var r = e(n, t.chart),
                      s = [],
                      a = !1
                    return (
                      i(t, function (t) {
                        t.inYRange(r.y) && s.push(t), t.inRange(r.x, r.y) && (a = !0)
                      }),
                      o.intersect && !a && (s = []),
                      s
                    )
                  }
                }
              }
            }
          },
          {}
        ],
        28: [
          function (t, e, i) {
            'use strict'
            e.exports = function () {
              var t = function (e, i) {
                return (this.controller = new t.Controller(e, i, this)), this.controller
              }
              return (
                (t.defaults = {
                  global: {
                    responsive: !0,
                    responsiveAnimationDuration: 0,
                    maintainAspectRatio: !0,
                    events: ['mousemove', 'mouseout', 'click', 'touchstart', 'touchmove'],
                    hover: { onHover: null, mode: 'nearest', intersect: !0, animationDuration: 400 },
                    onClick: null,
                    defaultColor: 'rgba(0,0,0,0.1)',
                    defaultFontColor: '#666',
                    defaultFontFamily: "'Helvetica Neue', 'Helvetica', 'Arial', sans-serif",
                    defaultFontSize: 12,
                    defaultFontStyle: 'normal',
                    showLines: !0,
                    elements: {},
                    legendCallback: function (t) {
                      var e = []
                      e.push('<ul class="' + t.id + '-legend">')
                      for (var i = 0; i < t.data.datasets.length; i++)
                        e.push('<li><span style="background-color:' + t.data.datasets[i].backgroundColor + '"></span>'),
                          t.data.datasets[i].label && e.push(t.data.datasets[i].label),
                          e.push('</li>')
                      return e.push('</ul>'), e.join('')
                    }
                  }
                }),
                (t.Chart = t)
              )
            }
          },
          {}
        ],
        29: [
          function (t, e, i) {
            'use strict'
            e.exports = function (t) {
              var e = t.helpers
              t.layoutService = {
                defaults: {},
                addBox: function (t, e) {
                  t.boxes || (t.boxes = []), t.boxes.push(e)
                },
                removeBox: function (t, e) {
                  t.boxes && t.boxes.splice(t.boxes.indexOf(e), 1)
                },
                update: function (t, i, n) {
                  function o(t) {
                    var i,
                      n = e.findNextWhere(k, function (e) {
                        return e.box === t
                      })
                    n &&
                      (t.isHorizontal()
                        ? ((i = { left: Math.max(A, T), right: Math.max(D, S), top: 0, bottom: 0 }), t.update(t.options.fullWidth ? v : x, y / 2, i))
                        : t.update(n.minSize.width, C))
                  }
                  function r(t) {
                    t.isHorizontal()
                      ? ((t.left = t.options.fullWidth ? l : A), (t.right = t.options.fullWidth ? i - c : A + x), (t.top = R), (t.bottom = R + t.height), (R = t.bottom))
                      : ((t.left = N), (t.right = N + t.width), (t.top = O), (t.bottom = O + C), (N = t.right))
                  }
                  var s, a, l, c, u, d, h, f, p, g, m, v, y, b, _, w, x, C, k, T, S, E, I, A, D, O, M, P, L, z, F, N, R
                  t &&
                    ((a = (s = t.options.layout) ? s.padding : null),
                    (u = c = l = 0),
                    (d = isNaN(a) ? ((l = a.left || 0), (c = a.right || 0), (u = a.top || 0), a.bottom || 0) : (u = c = l = a)),
                    (h = e.where(t.boxes, function (t) {
                      return 'left' === t.options.position
                    })),
                    (f = e.where(t.boxes, function (t) {
                      return 'right' === t.options.position
                    })),
                    (p = e.where(t.boxes, function (t) {
                      return 'top' === t.options.position
                    })),
                    (g = e.where(t.boxes, function (t) {
                      return 'bottom' === t.options.position
                    })),
                    (m = e.where(t.boxes, function (t) {
                      return 'chartArea' === t.options.position
                    })),
                    p.sort(function (t, e) {
                      return (e.options.fullWidth ? 1 : 0) - (t.options.fullWidth ? 1 : 0)
                    }),
                    g.sort(function (t, e) {
                      return (t.options.fullWidth ? 1 : 0) - (e.options.fullWidth ? 1 : 0)
                    }),
                    (b = (y = n - u - d) / 2),
                    (_ = (i - (v = i - l - c) / 2) / (h.length + f.length)),
                    (w = (n - b) / (p.length + g.length)),
                    (x = v),
                    (C = y),
                    (k = []),
                    e.each(h.concat(f, p, g), function (t) {
                      var e,
                        i = t.isHorizontal()
                      i ? ((e = t.update(t.options.fullWidth ? v : x, w)), (C -= e.height)) : ((e = t.update(_, b)), (x -= e.width)), k.push({ horizontal: i, minSize: e, box: t })
                    }),
                    (I = E = S = T = 0),
                    e.each(p.concat(g), function (t) {
                      var e
                      t.getPadding && ((e = t.getPadding()), (T = Math.max(T, e.left)), (S = Math.max(S, e.right)))
                    }),
                    e.each(h.concat(f), function (t) {
                      var e
                      t.getPadding && ((e = t.getPadding()), (E = Math.max(E, e.top)), (I = Math.max(I, e.bottom)))
                    }),
                    (A = l),
                    (D = c),
                    (O = u),
                    (M = d),
                    e.each(h.concat(f), o),
                    e.each(h, function (t) {
                      A += t.width
                    }),
                    e.each(f, function (t) {
                      D += t.width
                    }),
                    e.each(p.concat(g), o),
                    e.each(p, function (t) {
                      O += t.height
                    }),
                    e.each(g, function (t) {
                      M += t.height
                    }),
                    e.each(h.concat(f), function (t) {
                      var i = e.findNextWhere(k, function (e) {
                          return e.box === t
                        }),
                        n = { left: 0, right: 0, top: O, bottom: M }
                      i && t.update(i.minSize.width, C, n)
                    }),
                    (A = l),
                    (D = c),
                    (O = u),
                    (M = d),
                    e.each(h, function (t) {
                      A += t.width
                    }),
                    e.each(f, function (t) {
                      D += t.width
                    }),
                    e.each(p, function (t) {
                      O += t.height
                    }),
                    e.each(g, function (t) {
                      M += t.height
                    }),
                    (P = Math.max(T - A, 0)),
                    (A += P),
                    (D += Math.max(S - D, 0)),
                    (L = Math.max(E - O, 0)),
                    (O += L),
                    (M += Math.max(I - M, 0)),
                    (z = n - O - M),
                    ((F = i - A - D) === x && z === C) ||
                      (e.each(h, function (t) {
                        t.height = z
                      }),
                      e.each(f, function (t) {
                        t.height = z
                      }),
                      e.each(p, function (t) {
                        t.options.fullWidth || (t.width = F)
                      }),
                      e.each(g, function (t) {
                        t.options.fullWidth || (t.width = F)
                      }),
                      (C = z),
                      (x = F)),
                    (N = l + P),
                    (R = u + L),
                    e.each(h.concat(p), r),
                    (N += x),
                    (R += C),
                    e.each(f, r),
                    e.each(g, r),
                    (t.chartArea = { left: A, top: O, right: A + x, bottom: O + C }),
                    e.each(m, function (e) {
                      ;(e.left = t.chartArea.left), (e.top = t.chartArea.top), (e.right = t.chartArea.right), (e.bottom = t.chartArea.bottom), e.update(x, C)
                    }))
                }
              }
            }
          },
          {}
        ],
        30: [
          function (t, e, i) {
            'use strict'
            e.exports = function (t) {
              function e(t, e) {
                return t.usePointStyle ? e * Math.SQRT2 : t.boxWidth
              }
              function i(e, i) {
                var n = new t.Legend({ ctx: e.chart.ctx, options: i, chart: e })
                ;(e.legend = n), t.layoutService.addBox(e, n)
              }
              var n = t.helpers,
                o = n.noop
              ;(t.defaults.global.legend = {
                display: !0,
                position: 'top',
                fullWidth: !0,
                reverse: !1,
                onClick: function (t, e) {
                  var i = e.datasetIndex,
                    n = this.chart,
                    o = n.getDatasetMeta(i)
                  ;(o.hidden = null === o.hidden ? !n.data.datasets[i].hidden : null), n.update()
                },
                onHover: null,
                labels: {
                  boxWidth: 40,
                  padding: 10,
                  generateLabels: function (t) {
                    var e = t.data
                    return n.isArray(e.datasets)
                      ? e.datasets.map(function (e, i) {
                          return {
                            text: e.label,
                            fillStyle: n.isArray(e.backgroundColor) ? e.backgroundColor[0] : e.backgroundColor,
                            hidden: !t.isDatasetVisible(i),
                            lineCap: e.borderCapStyle,
                            lineDash: e.borderDash,
                            lineDashOffset: e.borderDashOffset,
                            lineJoin: e.borderJoinStyle,
                            lineWidth: e.borderWidth,
                            strokeStyle: e.borderColor,
                            pointStyle: e.pointStyle,
                            datasetIndex: i
                          }
                        }, this)
                      : []
                  }
                }
              }),
                (t.Legend = t.Element.extend({
                  initialize: function (t) {
                    n.extend(this, t), (this.legendHitBoxes = []), (this.doughnutMode = !1)
                  },
                  beforeUpdate: o,
                  update: function (t, e, i) {
                    var n = this
                    return (
                      n.beforeUpdate(),
                      (n.maxWidth = t),
                      (n.maxHeight = e),
                      (n.margins = i),
                      n.beforeSetDimensions(),
                      n.setDimensions(),
                      n.afterSetDimensions(),
                      n.beforeBuildLabels(),
                      n.buildLabels(),
                      n.afterBuildLabels(),
                      n.beforeFit(),
                      n.fit(),
                      n.afterFit(),
                      n.afterUpdate(),
                      n.minSize
                    )
                  },
                  afterUpdate: o,
                  beforeSetDimensions: o,
                  setDimensions: function () {
                    var t = this
                    t.isHorizontal() ? ((t.width = t.maxWidth), (t.left = 0), (t.right = t.width)) : ((t.height = t.maxHeight), (t.top = 0), (t.bottom = t.height)),
                      (t.paddingLeft = 0),
                      (t.paddingTop = 0),
                      (t.paddingRight = 0),
                      (t.paddingBottom = 0),
                      (t.minSize = { width: 0, height: 0 })
                  },
                  afterSetDimensions: o,
                  beforeBuildLabels: o,
                  buildLabels: function () {
                    var t = this,
                      e = t.options.labels,
                      i = e.generateLabels.call(t, t.chart)
                    e.filter &&
                      (i = i.filter(function (i) {
                        return e.filter(i, t.chart.data)
                      })),
                      t.options.reverse && i.reverse(),
                      (t.legendItems = i)
                  },
                  afterBuildLabels: o,
                  beforeFit: o,
                  fit: function () {
                    var i,
                      o,
                      r,
                      s,
                      a,
                      l,
                      c,
                      u,
                      d = this,
                      h = d.options,
                      f = h.labels,
                      p = h.display,
                      g = d.ctx,
                      m = t.defaults.global,
                      v = n.getValueOrDefault,
                      y = v(f.fontSize, m.defaultFontSize),
                      b = v(f.fontStyle, m.defaultFontStyle),
                      _ = v(f.fontFamily, m.defaultFontFamily),
                      w = n.fontString(y, b, _),
                      x = (d.legendHitBoxes = []),
                      C = d.minSize,
                      k = d.isHorizontal()
                    k ? ((C.width = d.maxWidth), (C.height = p ? 10 : 0)) : ((C.width = p ? 10 : 0), (C.height = d.maxHeight)),
                      p &&
                        ((g.font = w),
                        k
                          ? ((i = d.lineWidths = [0]),
                            (o = d.legendItems.length ? y + f.padding : 0),
                            (g.textAlign = 'left'),
                            (g.textBaseline = 'top'),
                            n.each(d.legendItems, function (t, n) {
                              var r = e(f, y) + y / 2 + g.measureText(t.text).width
                              i[i.length - 1] + r + f.padding >= d.width && ((o += y + f.padding), (i[i.length] = d.left)),
                                (x[n] = { left: 0, top: 0, width: r, height: y }),
                                (i[i.length - 1] += r + f.padding)
                            }),
                            (C.height += o))
                          : ((r = f.padding),
                            (s = d.columnWidths = []),
                            (a = f.padding),
                            (c = l = 0),
                            (u = y + r),
                            n.each(d.legendItems, function (t, i) {
                              var n = e(f, y) + y / 2 + g.measureText(t.text).width
                              c + u > C.height && ((a += l + f.padding), s.push(l), (c = l = 0)), (l = Math.max(l, n)), (c += u), (x[i] = { left: 0, top: 0, width: n, height: y })
                            }),
                            (a += l),
                            s.push(l),
                            (C.width += a))),
                      (d.width = C.width),
                      (d.height = C.height)
                  },
                  afterFit: o,
                  isHorizontal: function () {
                    return 'top' === this.options.position || 'bottom' === this.options.position
                  },
                  draw: function () {
                    var i,
                      o,
                      r,
                      s,
                      a,
                      l,
                      c,
                      u,
                      d,
                      h,
                      f,
                      p,
                      g = this,
                      m = g.options,
                      v = m.labels,
                      y = t.defaults.global,
                      b = y.elements.line,
                      _ = g.width,
                      w = g.lineWidths
                    m.display &&
                      ((i = g.ctx),
                      (r = (o = n.getValueOrDefault)(v.fontColor, y.defaultFontColor)),
                      (s = o(v.fontSize, y.defaultFontSize)),
                      (a = o(v.fontStyle, y.defaultFontStyle)),
                      (l = o(v.fontFamily, y.defaultFontFamily)),
                      (c = n.fontString(s, a, l)),
                      (i.textAlign = 'left'),
                      (i.textBaseline = 'top'),
                      (i.lineWidth = 0.5),
                      (i.strokeStyle = r),
                      (i.fillStyle = r),
                      (i.font = c),
                      (u = e(v, s)),
                      (d = g.legendHitBoxes),
                      (h = g.isHorizontal()),
                      (f = h ? { x: g.left + (_ - w[0]) / 2, y: g.top + v.padding, line: 0 } : { x: g.left + v.padding, y: g.top + v.padding, line: 0 }),
                      (p = s + v.padding),
                      n.each(g.legendItems, function (e, n) {
                        var r,
                          a,
                          l,
                          c,
                          x,
                          C,
                          k,
                          T,
                          S,
                          E,
                          I,
                          A,
                          D = i.measureText(e.text).width,
                          O = u + s / 2 + D,
                          M = f.x,
                          P = f.y
                        h
                          ? _ <= M + O && ((P = f.y += p), f.line++, (M = f.x = g.left + (_ - w[f.line]) / 2))
                          : P + p > g.bottom && ((M = f.x = M + g.columnWidths[f.line] + v.padding), (P = f.y = g.top + v.padding), f.line++),
                          (x = M),
                          (C = P),
                          (k = e),
                          isNaN(u) ||
                            u <= 0 ||
                            (i.save(),
                            (i.fillStyle = o(k.fillStyle, y.defaultColor)),
                            (i.lineCap = o(k.lineCap, b.borderCapStyle)),
                            (i.lineDashOffset = o(k.lineDashOffset, b.borderDashOffset)),
                            (i.lineJoin = o(k.lineJoin, b.borderJoinStyle)),
                            (i.lineWidth = o(k.lineWidth, b.borderWidth)),
                            (i.strokeStyle = o(k.strokeStyle, y.defaultColor)),
                            (T = 0 === o(k.lineWidth, b.borderWidth)),
                            i.setLineDash && i.setLineDash(o(k.lineDash, b.borderDash)),
                            m.labels && m.labels.usePointStyle
                              ? ((I = x + (E = (S = (s * Math.SQRT2) / 2) / Math.SQRT2)), (A = C + E), t.canvasHelpers.drawPoint(i, k.pointStyle, S, I, A))
                              : (T || i.strokeRect(x, C, u, s), i.fillRect(x, C, u, s)),
                            i.restore()),
                          (d[n].left = M),
                          (d[n].top = P),
                          (r = M),
                          (a = P),
                          (l = e),
                          (c = D),
                          i.fillText(l.text, u + s / 2 + r, a),
                          l.hidden && (i.beginPath(), (i.lineWidth = 2), i.moveTo(u + s / 2 + r, a + s / 2), i.lineTo(u + s / 2 + r + c, a + s / 2), i.stroke()),
                          h ? (f.x += O + v.padding) : (f.y += p)
                      }))
                  },
                  handleEvent: function (t) {
                    var e = this,
                      i = e.options,
                      n = 'mouseup' === t.type ? 'click' : t.type,
                      o = !1
                    if ('mousemove' === n) {
                      if (!i.onHover) return
                    } else {
                      if ('click' !== n) return
                      if (!i.onClick) return
                    }
                    var r = t.x,
                      s = t.y
                    if (r >= e.left && r <= e.right && s >= e.top && s <= e.bottom)
                      for (var a = e.legendHitBoxes, l = 0; l < a.length; ++l) {
                        var c = a[l]
                        if (r >= c.left && r <= c.left + c.width && s >= c.top && s <= c.top + c.height) {
                          if ('click' === n) {
                            i.onClick.call(e, t.native, e.legendItems[l]), (o = !0)
                            break
                          }
                          if ('mousemove' === n) {
                            i.onHover.call(e, t.native, e.legendItems[l]), (o = !0)
                            break
                          }
                        }
                      }
                    return o
                  }
                })),
                t.plugins.register({
                  beforeInit: function (t) {
                    var e = t.options.legend
                    e && i(t, e)
                  },
                  beforeUpdate: function (e) {
                    var o = e.options.legend
                    o ? ((o = n.configMerge(t.defaults.global.legend, o)), e.legend ? (e.legend.options = o) : i(e, o)) : (t.layoutService.removeBox(e, e.legend), delete e.legend)
                  },
                  afterEvent: function (t, e) {
                    var i = t.legend
                    i && i.handleEvent(e)
                  }
                })
            }
          },
          {}
        ],
        31: [
          function (t, e, i) {
            'use strict'
            e.exports = function (t) {
              var e = t.helpers
              ;(t.defaults.global.plugins = {}),
                (t.plugins = {
                  _plugins: [],
                  _cacheId: 0,
                  register: function (t) {
                    var e = this._plugins
                    ;[].concat(t).forEach(function (t) {
                      ;-1 === e.indexOf(t) && e.push(t)
                    }),
                      this._cacheId++
                  },
                  unregister: function (t) {
                    var e = this._plugins
                    ;[].concat(t).forEach(function (t) {
                      var i = e.indexOf(t)
                      ;-1 !== i && e.splice(i, 1)
                    }),
                      this._cacheId++
                  },
                  clear: function () {
                    ;(this._plugins = []), this._cacheId++
                  },
                  count: function () {
                    return this._plugins.length
                  },
                  getAll: function () {
                    return this._plugins
                  },
                  notify: function (t, e, i) {
                    for (var n, o, r, s, a = this.descriptors(t), l = a.length, c = 0; c < l; ++c)
                      if ('function' == typeof (s = (o = (n = a[c]).plugin)[e]) && ((r = [t].concat(i || [])).push(n.options), !1 === s.apply(o, r))) return !1
                    return !0
                  },
                  descriptors: function (i) {
                    var n = i._plugins || (i._plugins = {})
                    if (n.id === this._cacheId) return n.descriptors
                    var o = [],
                      r = [],
                      s = (i && i.config) || {},
                      a = t.defaults.global.plugins,
                      l = (s.options && s.options.plugins) || {}
                    return (
                      this._plugins.concat(s.plugins || []).forEach(function (t) {
                        var i, n
                        ;-1 === o.indexOf(t) && ((i = t.id), !1 !== (n = l[i]) && (!0 === n && (n = e.clone(a[i])), o.push(t), r.push({ plugin: t, options: n || {} })))
                      }),
                      (n.descriptors = r),
                      (n.id = this._cacheId),
                      r
                    )
                  }
                }),
                (t.pluginService = t.plugins),
                (t.PluginBase = e.inherits({}))
            }
          },
          {}
        ],
        32: [
          function (t, e, i) {
            'use strict'
            e.exports = function (t) {
              function e(t, e, i) {
                return n.isArray(e) ? n.longestText(t, i, e) : t.measureText(e).width
              }
              function i(e) {
                var i = n.getValueOrDefault,
                  o = t.defaults.global,
                  r = i(e.fontSize, o.defaultFontSize),
                  s = i(e.fontStyle, o.defaultFontStyle),
                  a = i(e.fontFamily, o.defaultFontFamily)
                return { size: r, style: s, family: a, font: n.fontString(r, s, a) }
              }
              var n = t.helpers
              ;(t.defaults.scale = {
                display: !0,
                position: 'left',
                gridLines: {
                  display: !0,
                  color: 'rgba(0, 0, 0, 0.1)',
                  lineWidth: 1,
                  drawBorder: !0,
                  drawOnChartArea: !0,
                  drawTicks: !0,
                  tickMarkLength: 10,
                  zeroLineWidth: 1,
                  zeroLineColor: 'rgba(0,0,0,0.25)',
                  offsetGridLines: !1,
                  borderDash: [],
                  borderDashOffset: 0
                },
                scaleLabel: { labelString: '', display: !1 },
                ticks: {
                  beginAtZero: !1,
                  minRotation: 0,
                  maxRotation: 50,
                  mirror: !1,
                  padding: 0,
                  reverse: !1,
                  display: !0,
                  autoSkip: !0,
                  autoSkipPadding: 0,
                  labelOffset: 0,
                  callback: t.Ticks.formatters.values
                }
              }),
                (t.Scale = t.Element.extend({
                  getPadding: function () {
                    return { left: this.paddingLeft || 0, top: this.paddingTop || 0, right: this.paddingRight || 0, bottom: this.paddingBottom || 0 }
                  },
                  beforeUpdate: function () {
                    n.callCallback(this.options.beforeUpdate, [this])
                  },
                  update: function (t, e, i) {
                    var o = this
                    return (
                      o.beforeUpdate(),
                      (o.maxWidth = t),
                      (o.maxHeight = e),
                      (o.margins = n.extend({ left: 0, right: 0, top: 0, bottom: 0 }, i)),
                      (o.longestTextCache = o.longestTextCache || {}),
                      o.beforeSetDimensions(),
                      o.setDimensions(),
                      o.afterSetDimensions(),
                      o.beforeDataLimits(),
                      o.determineDataLimits(),
                      o.afterDataLimits(),
                      o.beforeBuildTicks(),
                      o.buildTicks(),
                      o.afterBuildTicks(),
                      o.beforeTickToLabelConversion(),
                      o.convertTicksToLabels(),
                      o.afterTickToLabelConversion(),
                      o.beforeCalculateTickRotation(),
                      o.calculateTickRotation(),
                      o.afterCalculateTickRotation(),
                      o.beforeFit(),
                      o.fit(),
                      o.afterFit(),
                      o.afterUpdate(),
                      o.minSize
                    )
                  },
                  afterUpdate: function () {
                    n.callCallback(this.options.afterUpdate, [this])
                  },
                  beforeSetDimensions: function () {
                    n.callCallback(this.options.beforeSetDimensions, [this])
                  },
                  setDimensions: function () {
                    var t = this
                    t.isHorizontal() ? ((t.width = t.maxWidth), (t.left = 0), (t.right = t.width)) : ((t.height = t.maxHeight), (t.top = 0), (t.bottom = t.height)),
                      (t.paddingLeft = 0),
                      (t.paddingTop = 0),
                      (t.paddingRight = 0),
                      (t.paddingBottom = 0)
                  },
                  afterSetDimensions: function () {
                    n.callCallback(this.options.afterSetDimensions, [this])
                  },
                  beforeDataLimits: function () {
                    n.callCallback(this.options.beforeDataLimits, [this])
                  },
                  determineDataLimits: n.noop,
                  afterDataLimits: function () {
                    n.callCallback(this.options.afterDataLimits, [this])
                  },
                  beforeBuildTicks: function () {
                    n.callCallback(this.options.beforeBuildTicks, [this])
                  },
                  buildTicks: n.noop,
                  afterBuildTicks: function () {
                    n.callCallback(this.options.afterBuildTicks, [this])
                  },
                  beforeTickToLabelConversion: function () {
                    n.callCallback(this.options.beforeTickToLabelConversion, [this])
                  },
                  convertTicksToLabels: function () {
                    var t = this.options.ticks
                    this.ticks = this.ticks.map(t.userCallback || t.callback)
                  },
                  afterTickToLabelConversion: function () {
                    n.callCallback(this.options.afterTickToLabelConversion, [this])
                  },
                  beforeCalculateTickRotation: function () {
                    n.callCallback(this.options.beforeCalculateTickRotation, [this])
                  },
                  calculateTickRotation: function () {
                    var t = this,
                      e = t.ctx,
                      o = t.options.ticks,
                      r = i(o)
                    e.font = r.font
                    var s = o.minRotation || 0
                    if (t.options.display && t.isHorizontal())
                      for (
                        var a = n.longestText(e, r.font, t.ticks, t.longestTextCache), l = a, c = t.getPixelForTick(1) - t.getPixelForTick(0) - 6;
                        c < l && s < o.maxRotation;

                      ) {
                        var u = n.toRadians(s),
                          d = Math.cos(u)
                        if (Math.sin(u) * a > t.maxHeight) {
                          s--
                          break
                        }
                        s++, (l = d * a)
                      }
                    t.labelRotation = s
                  },
                  afterCalculateTickRotation: function () {
                    n.callCallback(this.options.afterCalculateTickRotation, [this])
                  },
                  beforeFit: function () {
                    n.callCallback(this.options.beforeFit, [this])
                  },
                  fit: function () {
                    var t,
                      o,
                      r,
                      s,
                      a,
                      l,
                      c,
                      u,
                      d,
                      h,
                      f = this,
                      p = (f.minSize = { width: 0, height: 0 }),
                      g = f.options,
                      m = g.ticks,
                      v = g.scaleLabel,
                      y = g.gridLines,
                      b = g.display,
                      _ = f.isHorizontal(),
                      w = i(m),
                      x = 1.5 * i(v).size,
                      C = g.gridLines.tickMarkLength
                    ;(p.width = _ ? (f.isFullWidth() ? f.maxWidth - f.margins.left - f.margins.right : f.maxWidth) : b && y.drawTicks ? C : 0),
                      (p.height = _ ? (b && y.drawTicks ? C : 0) : f.maxHeight),
                      v.display && b && (_ ? (p.height += x) : (p.width += x)),
                      m.display &&
                        b &&
                        ((t = n.longestText(f.ctx, w.font, f.ticks, f.longestTextCache)),
                        (o = n.numberOfLabelLines(f.ticks)),
                        (r = 0.5 * w.size),
                        _
                          ? ((f.longestLabelWidth = t),
                            (s = n.toRadians(f.labelRotation)),
                            (a = Math.cos(s)),
                            (l = Math.sin(s) * t + w.size * o + r * o),
                            (p.height = Math.min(f.maxHeight, p.height + l)),
                            (f.ctx.font = w.font),
                            (c = f.ticks[0]),
                            (u = e(f.ctx, c, w.font)),
                            (d = f.ticks[f.ticks.length - 1]),
                            (h = e(f.ctx, d, w.font)),
                            0 !== f.labelRotation
                              ? ((f.paddingLeft = 'bottom' === g.position ? a * u + 3 : a * r + 3), (f.paddingRight = 'bottom' === g.position ? a * r + 3 : a * h + 3))
                              : ((f.paddingLeft = u / 2 + 3), (f.paddingRight = h / 2 + 3)))
                          : (m.mirror ? (t = 0) : (t += f.options.ticks.padding), (p.width += t), (f.paddingTop = w.size / 2), (f.paddingBottom = w.size / 2))),
                      f.handleMargins(),
                      (f.width = p.width),
                      (f.height = p.height)
                  },
                  handleMargins: function () {
                    var t = this
                    t.margins &&
                      ((t.paddingLeft = Math.max(t.paddingLeft - t.margins.left, 0)),
                      (t.paddingTop = Math.max(t.paddingTop - t.margins.top, 0)),
                      (t.paddingRight = Math.max(t.paddingRight - t.margins.right, 0)),
                      (t.paddingBottom = Math.max(t.paddingBottom - t.margins.bottom, 0)))
                  },
                  afterFit: function () {
                    n.callCallback(this.options.afterFit, [this])
                  },
                  isHorizontal: function () {
                    return 'top' === this.options.position || 'bottom' === this.options.position
                  },
                  isFullWidth: function () {
                    return this.options.fullWidth
                  },
                  getRightValue: function (t) {
                    return null == t || ('number' == typeof t && !isFinite(t))
                      ? NaN
                      : 'object' != typeof t || t instanceof Date || t.isValid
                      ? t
                      : this.getRightValue(this.isHorizontal() ? t.x : t.y)
                  },
                  getLabelForIndex: n.noop,
                  getPixelForValue: n.noop,
                  getValueForPixel: n.noop,
                  getPixelForTick: function (t, e) {
                    var i = this
                    if (i.isHorizontal()) {
                      var n = (i.width - (i.paddingLeft + i.paddingRight)) / Math.max(i.ticks.length - (i.options.gridLines.offsetGridLines ? 0 : 1), 1),
                        o = n * t + i.paddingLeft
                      return e && (o += n / 2), i.left + Math.round(o) + (i.isFullWidth() ? i.margins.left : 0)
                    }
                    var r = i.height - (i.paddingTop + i.paddingBottom)
                    return i.top + t * (r / (i.ticks.length - 1))
                  },
                  getPixelForDecimal: function (t) {
                    var e = this
                    if (e.isHorizontal()) {
                      var i = (e.width - (e.paddingLeft + e.paddingRight)) * t + e.paddingLeft
                      return e.left + Math.round(i) + (e.isFullWidth() ? e.margins.left : 0)
                    }
                    return e.top + t * e.height
                  },
                  getBasePixel: function () {
                    return this.getPixelForValue(this.getBaseValue())
                  },
                  getBaseValue: function () {
                    var t = this.min,
                      e = this.max
                    return this.beginAtZero ? 0 : t < 0 && e < 0 ? e : 0 < t && 0 < e ? t : 0
                  },
                  draw: function (e) {
                    var o = this,
                      r = o.options
                    if (r.display) {
                      var s,
                        a,
                        l = o.ctx,
                        c = t.defaults.global,
                        u = r.ticks,
                        d = r.gridLines,
                        h = r.scaleLabel,
                        f = 0 !== o.labelRotation,
                        p = u.autoSkip,
                        g = o.isHorizontal()
                      u.maxTicksLimit && (a = u.maxTicksLimit)
                      var m = n.getValueOrDefault(u.fontColor, c.defaultFontColor),
                        v = i(u),
                        y = d.drawTicks ? d.tickMarkLength : 0,
                        b = n.getValueOrDefault(d.borderDash, c.borderDash),
                        _ = n.getValueOrDefault(d.borderDashOffset, c.borderDashOffset),
                        w = n.getValueOrDefault(h.fontColor, c.defaultFontColor),
                        x = i(h),
                        C = n.toRadians(o.labelRotation),
                        k = Math.cos(C),
                        T = o.longestLabelWidth * k
                      l.fillStyle = m
                      var S = []
                      if (g) {
                        if (
                          ((s = !1),
                          f && (T /= 2),
                          (T + u.autoSkipPadding) * o.ticks.length > o.width - (o.paddingLeft + o.paddingRight) &&
                            (s = 1 + Math.floor(((T + u.autoSkipPadding) * o.ticks.length) / (o.width - (o.paddingLeft + o.paddingRight)))),
                          a && o.ticks.length > a)
                        )
                          for (; !s || o.ticks.length / (s || 1) > a; ) (s = s || 1), (s += 1)
                        p || (s = !1)
                      }
                      var E,
                        I,
                        A,
                        D,
                        O,
                        M,
                        P,
                        L,
                        z,
                        F = 'right' === r.position ? o.left : o.right - y,
                        N = 'right' === r.position ? o.left + y : o.right,
                        R = 'bottom' === r.position ? o.top : o.bottom - y,
                        j = 'bottom' === r.position ? o.top + y : o.bottom
                      n.each(o.ticks, function (t, i) {
                        var a, l, c, h, p, m, v, w, x, k, T, E, I, A, D, O, M, P, L, z
                        null != t &&
                          ((a = o.ticks.length === i + 1),
                          (((1 < s && 0 < i % s) || (i % s == 0 && i + s >= o.ticks.length)) && !a) ||
                            null == t ||
                            ((c =
                              i === (void 0 !== o.zeroLineIndex ? o.zeroLineIndex : 0)
                                ? ((l = d.zeroLineWidth), d.zeroLineColor)
                                : ((l = n.getValueAtIndexOrDefault(d.lineWidth, i)), n.getValueAtIndexOrDefault(d.color, i))),
                            (x = w = 'middle'),
                            g
                              ? ((v =
                                  'bottom' === r.position
                                    ? ((x = f ? 'middle' : 'top'), (w = f ? 'right' : 'center'), o.top + y)
                                    : ((x = f ? 'middle' : 'bottom'), (w = f ? 'left' : 'center'), o.bottom - y)),
                                (k = o.getPixelForTick(i) + n.aliasPixel(l)),
                                (T = o.getPixelForTick(i, d.offsetGridLines) + u.labelOffset),
                                (E = h = p = m = k),
                                (I = R),
                                (A = j),
                                (D = e.top),
                                (O = e.bottom))
                              : ((M = 'left' === r.position),
                                (P = u.padding),
                                (L = u.mirror ? ((w = M ? 'left' : 'right'), P) : ((w = M ? 'right' : 'left'), y + P)),
                                (T = M ? o.right - L : o.left + L),
                                (z = o.getPixelForTick(i)),
                                (z += n.aliasPixel(l)),
                                (v = o.getPixelForTick(i, d.offsetGridLines)),
                                (E = F),
                                (h = N),
                                (p = e.left),
                                (m = e.right),
                                (I = A = D = O = z)),
                            S.push({
                              tx1: E,
                              ty1: I,
                              tx2: h,
                              ty2: A,
                              x1: p,
                              y1: D,
                              x2: m,
                              y2: O,
                              labelX: T,
                              labelY: v,
                              glWidth: l,
                              glColor: c,
                              glBorderDash: b,
                              glBorderDashOffset: _,
                              rotation: -1 * C,
                              label: t,
                              textBaseline: x,
                              textAlign: w
                            })))
                      }),
                        n.each(S, function (t) {
                          if (
                            (d.display &&
                              (l.save(),
                              (l.lineWidth = t.glWidth),
                              (l.strokeStyle = t.glColor),
                              l.setLineDash && (l.setLineDash(t.glBorderDash), (l.lineDashOffset = t.glBorderDashOffset)),
                              l.beginPath(),
                              d.drawTicks && (l.moveTo(t.tx1, t.ty1), l.lineTo(t.tx2, t.ty2)),
                              d.drawOnChartArea && (l.moveTo(t.x1, t.y1), l.lineTo(t.x2, t.y2)),
                              l.stroke(),
                              l.restore()),
                            u.display)
                          ) {
                            l.save(), l.translate(t.labelX, t.labelY), l.rotate(t.rotation), (l.font = v.font), (l.textBaseline = t.textBaseline), (l.textAlign = t.textAlign)
                            var e = t.label
                            if (n.isArray(e)) for (var i = 0, o = 0; i < e.length; ++i) l.fillText('' + e[i], 0, o), (o += 1.5 * v.size)
                            else l.fillText(e, 0, 0)
                            l.restore()
                          }
                        }),
                        h.display &&
                          ((D = 0),
                          g
                            ? ((I = o.left + (o.right - o.left) / 2), (A = 'bottom' === r.position ? o.bottom - x.size / 2 : o.top + x.size / 2))
                            : ((I = (E = 'left' === r.position) ? o.left + x.size / 2 : o.right - x.size / 2),
                              (A = o.top + (o.bottom - o.top) / 2),
                              (D = E ? -0.5 * Math.PI : 0.5 * Math.PI)),
                          l.save(),
                          l.translate(I, A),
                          l.rotate(D),
                          (l.textAlign = 'center'),
                          (l.textBaseline = 'middle'),
                          (l.fillStyle = w),
                          (l.font = x.font),
                          l.fillText(h.labelString, 0, 0),
                          l.restore()),
                        d.drawBorder &&
                          ((l.lineWidth = n.getValueAtIndexOrDefault(d.lineWidth, 0)),
                          (l.strokeStyle = n.getValueAtIndexOrDefault(d.color, 0)),
                          (O = o.left),
                          (M = o.right),
                          (P = o.top),
                          (L = o.bottom),
                          (z = n.aliasPixel(l.lineWidth)),
                          g ? ((P = L = 'top' === r.position ? o.bottom : o.top), (P += z), (L += z)) : ((O = M = 'left' === r.position ? o.right : o.left), (O += z), (M += z)),
                          l.beginPath(),
                          l.moveTo(O, P),
                          l.lineTo(M, L),
                          l.stroke())
                    }
                  }
                }))
            }
          },
          {}
        ],
        33: [
          function (t, e, i) {
            'use strict'
            e.exports = function (t) {
              var e = t.helpers
              t.scaleService = {
                constructors: {},
                defaults: {},
                registerScaleType: function (t, i, n) {
                  ;(this.constructors[t] = i), (this.defaults[t] = e.clone(n))
                },
                getScaleConstructor: function (t) {
                  return this.constructors.hasOwnProperty(t) ? this.constructors[t] : void 0
                },
                getScaleDefaults: function (i) {
                  return this.defaults.hasOwnProperty(i) ? e.scaleMerge(t.defaults.scale, this.defaults[i]) : {}
                },
                updateScaleDefaults: function (t, i) {
                  var n = this.defaults
                  n.hasOwnProperty(t) && (n[t] = e.extend(n[t], i))
                },
                addScalesToLayout: function (i) {
                  e.each(i.scales, function (e) {
                    t.layoutService.addBox(i, e)
                  })
                }
              }
            }
          },
          {}
        ],
        34: [
          function (t, e, i) {
            'use strict'
            e.exports = function (t) {
              var e = t.helpers
              t.Ticks = {
                generators: {
                  linear: function (t, i) {
                    var n,
                      o,
                      r = []
                    o = t.stepSize && 0 < t.stepSize ? t.stepSize : ((n = e.niceNum(i.max - i.min, !1)), e.niceNum(n / (t.maxTicks - 1), !0))
                    var s = Math.floor(i.min / o) * o,
                      a = Math.ceil(i.max / o) * o
                    t.min && t.max && t.stepSize && e.almostWhole((t.max - t.min) / t.stepSize, o / 1e3) && ((s = t.min), (a = t.max))
                    var l = (a - s) / o
                    l = e.almostEquals(l, Math.round(l), o / 1e3) ? Math.round(l) : Math.ceil(l)
                    r.push(void 0 !== t.min ? t.min : s)
                    for (var c = 1; c < l; ++c) r.push(s + c * o)
                    return r.push(void 0 !== t.max ? t.max : a), r
                  },
                  logarithmic: function (t, i) {
                    var n,
                      o,
                      r = [],
                      s = e.getValueOrDefault,
                      a = s(t.min, Math.pow(10, Math.floor(e.log10(i.min)))),
                      l = Math.floor(e.log10(i.max)),
                      c = Math.ceil(i.max / Math.pow(10, l))
                    for (
                      0 === a
                        ? ((n = Math.floor(e.log10(i.minNotZero))), (o = Math.floor(i.minNotZero / Math.pow(10, n))), r.push(a), (a = o * Math.pow(10, n)))
                        : ((n = Math.floor(e.log10(a))), (o = Math.floor(a / Math.pow(10, n))));
                      r.push(a), 10 == ++o && ((o = 1), ++n), (a = o * Math.pow(10, n)), n < l || (n === l && o < c);

                    );
                    var u = s(t.max, a)
                    return r.push(u), r
                  }
                },
                formatters: {
                  values: function (t) {
                    return e.isArray(t) ? t : '' + t
                  },
                  linear: function (t, i, n) {
                    var o = 3 < n.length ? n[2] - n[1] : n[1] - n[0]
                    1 < Math.abs(o) && t !== Math.floor(t) && (o = t - Math.floor(t))
                    var r,
                      s = e.log10(Math.abs(o))
                    return 0 !== t ? ((r = -1 * Math.floor(s)), (r = Math.max(Math.min(r, 20), 0)), t.toFixed(r)) : '0'
                  },
                  logarithmic: function (t, i, n) {
                    var o = t / Math.pow(10, Math.floor(e.log10(t)))
                    return 0 === t ? '0' : 1 == o || 2 == o || 5 == o || 0 === i || i === n.length - 1 ? t.toExponential() : ''
                  }
                }
              }
            }
          },
          {}
        ],
        35: [
          function (t, e, i) {
            'use strict'
            e.exports = function (t) {
              function e(e, i) {
                var n = new t.Title({ ctx: e.chart.ctx, options: i, chart: e })
                ;(e.titleBlock = n), t.layoutService.addBox(e, n)
              }
              var i = t.helpers
              t.defaults.global.title = { display: !1, position: 'top', fullWidth: !0, fontStyle: 'bold', padding: 10, text: '' }
              var n = i.noop
              ;(t.Title = t.Element.extend({
                initialize: function (t) {
                  i.extend(this, t), (this.legendHitBoxes = [])
                },
                beforeUpdate: n,
                update: function (t, e, i) {
                  var n = this
                  return (
                    n.beforeUpdate(),
                    (n.maxWidth = t),
                    (n.maxHeight = e),
                    (n.margins = i),
                    n.beforeSetDimensions(),
                    n.setDimensions(),
                    n.afterSetDimensions(),
                    n.beforeBuildLabels(),
                    n.buildLabels(),
                    n.afterBuildLabels(),
                    n.beforeFit(),
                    n.fit(),
                    n.afterFit(),
                    n.afterUpdate(),
                    n.minSize
                  )
                },
                afterUpdate: n,
                beforeSetDimensions: n,
                setDimensions: function () {
                  var t = this
                  t.isHorizontal() ? ((t.width = t.maxWidth), (t.left = 0), (t.right = t.width)) : ((t.height = t.maxHeight), (t.top = 0), (t.bottom = t.height)),
                    (t.paddingLeft = 0),
                    (t.paddingTop = 0),
                    (t.paddingRight = 0),
                    (t.paddingBottom = 0),
                    (t.minSize = { width: 0, height: 0 })
                },
                afterSetDimensions: n,
                beforeBuildLabels: n,
                buildLabels: n,
                afterBuildLabels: n,
                beforeFit: n,
                fit: function () {
                  var e = i.getValueOrDefault,
                    n = this.options,
                    o = t.defaults.global,
                    r = n.display,
                    s = e(n.fontSize, o.defaultFontSize),
                    a = this.minSize
                  this.isHorizontal() ? ((a.width = this.maxWidth), (a.height = r ? s + 2 * n.padding : 0)) : ((a.width = r ? s + 2 * n.padding : 0), (a.height = this.maxHeight)),
                    (this.width = a.width),
                    (this.height = a.height)
                },
                afterFit: n,
                isHorizontal: function () {
                  var t = this.options.position
                  return 'top' === t || 'bottom' === t
                },
                draw: function () {
                  var e,
                    n,
                    o,
                    r,
                    s,
                    a,
                    l,
                    c,
                    u,
                    d,
                    h,
                    f,
                    p = this.ctx,
                    g = i.getValueOrDefault,
                    m = this.options,
                    v = t.defaults.global
                  m.display &&
                    ((r = g(m.fontSize, v.defaultFontSize)),
                    (s = g(m.fontStyle, v.defaultFontStyle)),
                    (a = g(m.fontFamily, v.defaultFontFamily)),
                    (l = i.fontString(r, s, a)),
                    (c = 0),
                    (u = this.top),
                    (d = this.left),
                    (h = this.bottom),
                    (f = this.right),
                    (p.fillStyle = g(m.fontColor, v.defaultFontColor)),
                    (p.font = l),
                    this.isHorizontal()
                      ? ((e = d + (f - d) / 2), (n = u + (h - u) / 2), (o = f - d))
                      : ((e = 'left' === m.position ? d + r / 2 : f - r / 2), (n = u + (h - u) / 2), (o = h - u), (c = Math.PI * ('left' === m.position ? -0.5 : 0.5))),
                    p.save(),
                    p.translate(e, n),
                    p.rotate(c),
                    (p.textAlign = 'center'),
                    (p.textBaseline = 'middle'),
                    p.fillText(m.text, 0, 0, o),
                    p.restore())
                }
              })),
                t.plugins.register({
                  beforeInit: function (t) {
                    var i = t.options.title
                    i && e(t, i)
                  },
                  beforeUpdate: function (n) {
                    var o = n.options.title
                    o
                      ? ((o = i.configMerge(t.defaults.global.title, o)), n.titleBlock ? (n.titleBlock.options = o) : e(n, o))
                      : (t.layoutService.removeBox(n, n.titleBlock), delete n.titleBlock)
                  }
                })
            }
          },
          {}
        ],
        36: [
          function (t, e, i) {
            'use strict'
            e.exports = function (t) {
              function e(t, e) {
                var i = o.color(t)
                return i.alpha(e * i.alpha()).rgbaString()
              }
              function i(t, e) {
                return e && (o.isArray(e) ? Array.prototype.push.apply(t, e) : t.push(e)), t
              }
              function n(e) {
                var i = t.defaults.global,
                  n = o.getValueOrDefault
                return {
                  xPadding: e.xPadding,
                  yPadding: e.yPadding,
                  xAlign: e.xAlign,
                  yAlign: e.yAlign,
                  bodyFontColor: e.bodyFontColor,
                  _bodyFontFamily: n(e.bodyFontFamily, i.defaultFontFamily),
                  _bodyFontStyle: n(e.bodyFontStyle, i.defaultFontStyle),
                  _bodyAlign: e.bodyAlign,
                  bodyFontSize: n(e.bodyFontSize, i.defaultFontSize),
                  bodySpacing: e.bodySpacing,
                  titleFontColor: e.titleFontColor,
                  _titleFontFamily: n(e.titleFontFamily, i.defaultFontFamily),
                  _titleFontStyle: n(e.titleFontStyle, i.defaultFontStyle),
                  titleFontSize: n(e.titleFontSize, i.defaultFontSize),
                  _titleAlign: e.titleAlign,
                  titleSpacing: e.titleSpacing,
                  titleMarginBottom: e.titleMarginBottom,
                  footerFontColor: e.footerFontColor,
                  _footerFontFamily: n(e.footerFontFamily, i.defaultFontFamily),
                  _footerFontStyle: n(e.footerFontStyle, i.defaultFontStyle),
                  footerFontSize: n(e.footerFontSize, i.defaultFontSize),
                  _footerAlign: e.footerAlign,
                  footerSpacing: e.footerSpacing,
                  footerMarginTop: e.footerMarginTop,
                  caretSize: e.caretSize,
                  cornerRadius: e.cornerRadius,
                  backgroundColor: e.backgroundColor,
                  opacity: 0,
                  legendColorBackground: e.multiKeyBackground,
                  displayColors: e.displayColors
                }
              }
              var o = t.helpers
              ;(t.defaults.global.tooltips = {
                enabled: !0,
                custom: null,
                mode: 'nearest',
                position: 'average',
                intersect: !0,
                backgroundColor: 'rgba(0,0,0,0.8)',
                titleFontStyle: 'bold',
                titleSpacing: 2,
                titleMarginBottom: 6,
                titleFontColor: '#fff',
                titleAlign: 'left',
                bodySpacing: 2,
                bodyFontColor: '#fff',
                bodyAlign: 'left',
                footerFontStyle: 'bold',
                footerSpacing: 2,
                footerMarginTop: 6,
                footerFontColor: '#fff',
                footerAlign: 'left',
                yPadding: 6,
                xPadding: 6,
                caretSize: 5,
                cornerRadius: 6,
                multiKeyBackground: '#fff',
                displayColors: !0,
                callbacks: {
                  beforeTitle: o.noop,
                  title: function (t, e) {
                    var i,
                      n = '',
                      o = e.labels,
                      r = o ? o.length : 0
                    return 0 < t.length && ((i = t[0]).xLabel ? (n = i.xLabel) : 0 < r && i.index < r && (n = o[i.index])), n
                  },
                  afterTitle: o.noop,
                  beforeBody: o.noop,
                  beforeLabel: o.noop,
                  label: function (t, e) {
                    return (e.datasets[t.datasetIndex].label || '') + ': ' + t.yLabel
                  },
                  labelColor: function (t, e) {
                    var i = e.getDatasetMeta(t.datasetIndex).data[t.index]._view
                    return { borderColor: i.borderColor, backgroundColor: i.backgroundColor }
                  },
                  afterLabel: o.noop,
                  afterBody: o.noop,
                  beforeFooter: o.noop,
                  footer: o.noop,
                  afterFooter: o.noop
                }
              }),
                (t.Tooltip = t.Element.extend({
                  initialize: function () {
                    this._model = n(this._options)
                  },
                  getTitle: function () {
                    var t = this._options.callbacks,
                      e = t.beforeTitle.apply(this, arguments),
                      n = t.title.apply(this, arguments),
                      o = t.afterTitle.apply(this, arguments),
                      r = i((r = []), e)
                    return (r = i(r, n)), i(r, o)
                  },
                  getBeforeBody: function () {
                    var t = this._options.callbacks.beforeBody.apply(this, arguments)
                    return o.isArray(t) ? t : void 0 !== t ? [t] : []
                  },
                  getBody: function (t, e) {
                    var n = this,
                      r = n._options.callbacks,
                      s = []
                    return (
                      o.each(t, function (t) {
                        var o = { before: [], lines: [], after: [] }
                        i(o.before, r.beforeLabel.call(n, t, e)), i(o.lines, r.label.call(n, t, e)), i(o.after, r.afterLabel.call(n, t, e)), s.push(o)
                      }),
                      s
                    )
                  },
                  getAfterBody: function () {
                    var t = this._options.callbacks.afterBody.apply(this, arguments)
                    return o.isArray(t) ? t : void 0 !== t ? [t] : []
                  },
                  getFooter: function () {
                    var t = this._options.callbacks,
                      e = t.beforeFooter.apply(this, arguments),
                      n = t.footer.apply(this, arguments),
                      o = t.afterFooter.apply(this, arguments),
                      r = i((r = []), e)
                    return (r = i(r, n)), i(r, o)
                  },
                  update: function (e) {
                    var i,
                      r,
                      s,
                      a,
                      l,
                      c,
                      u,
                      d,
                      h,
                      f,
                      p,
                      g,
                      m,
                      v,
                      y,
                      b,
                      _,
                      w = this,
                      x = w._options,
                      C = w._model,
                      k = (w._model = n(x)),
                      T = w._active,
                      S = w._data,
                      E = w._chartInstance,
                      I = { xAlign: C.xAlign, yAlign: C.yAlign },
                      A = { x: C.x, y: C.y },
                      D = { width: C.width, height: C.height },
                      O = { x: C.caretX, y: C.caretY }
                    if (T.length) {
                      k.opacity = 1
                      for (var M = [], P = ((O = t.Tooltip.positioners[x.position](T, w._eventPosition)), []), L = 0, z = T.length; L < z; ++L)
                        P.push(
                          ((y = v = void 0),
                          (v = (m = T[L])._xScale),
                          (y = m._yScale || m._scale),
                          (b = m._index),
                          (_ = m._datasetIndex),
                          { xLabel: v ? v.getLabelForIndex(b, _) : '', yLabel: y ? y.getLabelForIndex(b, _) : '', index: b, datasetIndex: _, x: m._model.x, y: m._model.y })
                        )
                      x.filter &&
                        (P = P.filter(function (t) {
                          return x.filter(t, S)
                        })),
                        x.itemSort &&
                          (P = P.sort(function (t, e) {
                            return x.itemSort(t, e, S)
                          })),
                        o.each(P, function (t) {
                          M.push(x.callbacks.labelColor.call(w, t, E))
                        }),
                        (k.title = w.getTitle(P, S)),
                        (k.beforeBody = w.getBeforeBody(P, S)),
                        (k.body = w.getBody(P, S)),
                        (k.afterBody = w.getAfterBody(P, S)),
                        (k.footer = w.getFooter(P, S)),
                        (k.x = Math.round(O.x)),
                        (k.y = Math.round(O.y)),
                        (k.caretPadding = o.getValueOrDefault(O.padding, 2)),
                        (k.labelColors = M),
                        (k.dataPoints = P),
                        (I = (function (t, e) {
                          var i = t._model,
                            n = t._chart,
                            o = t._chartInstance.chartArea,
                            r = 'center',
                            s = 'center'
                          function a(t) {
                            return t <= u ? 'top' : 'bottom'
                          }
                          i.y < e.height ? (s = 'top') : i.y > n.height - e.height && (s = 'bottom')
                          var l,
                            c = (o.left + o.right) / 2,
                            u = (o.top + o.bottom) / 2,
                            d =
                              'center' === s
                                ? ((l = function (t) {
                                    return t <= c
                                  }),
                                  function (t) {
                                    return c < t
                                  })
                                : ((l = function (t) {
                                    return t <= e.width / 2
                                  }),
                                  function (t) {
                                    return t >= n.width - e.width / 2
                                  })
                          l(i.x)
                            ? ((r = 'left'),
                              (function (t) {
                                return t + e.width > n.width
                              })(i.x) && ((r = 'center'), (s = a(i.y))))
                            : d(i.x) &&
                              ((r = 'right'),
                              (function (t) {
                                return t - e.width < 0
                              })(i.x) && ((r = 'center'), (s = a(i.y))))
                          var h = t._options
                          return { xAlign: h.xAlign ? h.xAlign : r, yAlign: h.yAlign ? h.yAlign : s }
                        })(
                          this,
                          (D = (function (t, e) {
                            var i = t._chart.ctx,
                              n = 2 * e.yPadding,
                              r = 0,
                              s = e.body,
                              a = s.reduce(function (t, e) {
                                return t + e.before.length + e.lines.length + e.after.length
                              }, 0)
                            a += e.beforeBody.length + e.afterBody.length
                            var l = e.title.length,
                              c = e.footer.length,
                              u = e.titleFontSize,
                              d = e.bodyFontSize,
                              h = e.footerFontSize
                            function f(t) {
                              r = Math.max(r, i.measureText(t).width + p)
                            }
                            ;(n += l * u),
                              (n += l ? (l - 1) * e.titleSpacing : 0),
                              (n += l ? e.titleMarginBottom : 0),
                              (n += a * d),
                              (n += a ? (a - 1) * e.bodySpacing : 0),
                              (n += c ? e.footerMarginTop : 0),
                              (n += c * h),
                              (n += c ? (c - 1) * e.footerSpacing : 0)
                            var p = 0
                            return (
                              (i.font = o.fontString(u, e._titleFontStyle, e._titleFontFamily)),
                              o.each(e.title, f),
                              (i.font = o.fontString(d, e._bodyFontStyle, e._bodyFontFamily)),
                              o.each(e.beforeBody.concat(e.afterBody), f),
                              (p = e.displayColors ? d + 2 : 0),
                              o.each(s, function (t) {
                                o.each(t.before, f), o.each(t.lines, f), o.each(t.after, f)
                              }),
                              (p = 0),
                              (i.font = o.fontString(h, e._footerFontStyle, e._footerFontFamily)),
                              o.each(e.footer, f),
                              { width: (r += 2 * e.xPadding), height: n }
                            )
                          })(this, k))
                        )),
                        (r = D),
                        (s = I),
                        (a = (i = k).x),
                        (l = i.y),
                        (c = i.caretSize),
                        (u = i.caretPadding),
                        (d = i.cornerRadius),
                        (h = s.xAlign),
                        (f = s.yAlign),
                        (p = c + u),
                        (g = d + u),
                        'right' === h ? (a -= r.width) : 'center' === h && (a -= r.width / 2),
                        'top' === f ? (l += p) : (l -= 'bottom' === f ? r.height + p : r.height / 2),
                        'center' === f ? ('left' === h ? (a += p) : 'right' === h && (a -= p)) : 'left' === h ? (a -= g) : 'right' === h && (a += g),
                        (A = { x: a, y: l })
                    } else k.opacity = 0
                    return (
                      (k.xAlign = I.xAlign),
                      (k.yAlign = I.yAlign),
                      (k.x = A.x),
                      (k.y = A.y),
                      (k.width = D.width),
                      (k.height = D.height),
                      (k.caretX = O.x),
                      (k.caretY = O.y),
                      (w._model = k),
                      e && x.custom && x.custom.call(w, k),
                      w
                    )
                  },
                  drawCaret: function (t, i, n) {
                    var o,
                      r,
                      s,
                      a,
                      l,
                      c = this._view,
                      u = this._chart.ctx,
                      d = c.caretSize,
                      h = c.cornerRadius,
                      f = c.xAlign,
                      p = c.yAlign,
                      g = t.x,
                      m = t.y,
                      v = i.width,
                      y = i.height,
                      b =
                        'center' === p
                          ? ((r = 'left' === f ? (o = g) - d : (o = g + v) + d), (s = o), (a = (l = m + y / 2) - d), l + d)
                          : ((s = 'left' === f ? (r = (o = g + h) + d) + d : 'right' === f ? (r = (o = g + v - h) - d) - d : ((o = (r = g + v / 2) - d), r + d)),
                            (l = 'top' === p ? (a = m) - d : (a = m + y) + d),
                            a)
                    ;(u.fillStyle = e(c.backgroundColor, n)), u.beginPath(), u.moveTo(o, a), u.lineTo(r, l), u.lineTo(s, b), u.closePath(), u.fill()
                  },
                  drawTitle: function (t, i, n, r) {
                    var s = i.title
                    if (s.length) {
                      ;(n.textAlign = i._titleAlign), (n.textBaseline = 'top')
                      var a,
                        l,
                        c = i.titleFontSize,
                        u = i.titleSpacing
                      for (n.fillStyle = e(i.titleFontColor, r), n.font = o.fontString(c, i._titleFontStyle, i._titleFontFamily), a = 0, l = s.length; a < l; ++a)
                        n.fillText(s[a], t.x, t.y), (t.y += c + u), a + 1 === s.length && (t.y += i.titleMarginBottom - u)
                    }
                  },
                  drawBody: function (t, i, n, r) {
                    var s = i.bodyFontSize,
                      a = i.bodySpacing,
                      l = i.body
                    ;(n.textAlign = i._bodyAlign), (n.textBaseline = 'top')
                    var c = e(i.bodyFontColor, r)
                    function u(e) {
                      n.fillText(e, t.x + d, t.y), (t.y += s + a)
                    }
                    ;(n.fillStyle = c), (n.font = o.fontString(s, i._bodyFontStyle, i._bodyFontFamily))
                    var d = 0
                    o.each(i.beforeBody, u)
                    var h = i.displayColors
                    d = h ? s + 2 : 0
                    o.each(l, function (a, l) {
                      o.each(a.before, u),
                        o.each(a.lines, function (o) {
                          h &&
                            ((n.fillStyle = e(i.legendColorBackground, r)),
                            n.fillRect(t.x, t.y, s, s),
                            (n.strokeStyle = e(i.labelColors[l].borderColor, r)),
                            n.strokeRect(t.x, t.y, s, s),
                            (n.fillStyle = e(i.labelColors[l].backgroundColor, r)),
                            n.fillRect(t.x + 1, t.y + 1, s - 2, s - 2),
                            (n.fillStyle = c)),
                            u(o)
                        }),
                        o.each(a.after, u)
                    }),
                      (d = 0),
                      o.each(i.afterBody, u),
                      (t.y -= a)
                  },
                  drawFooter: function (t, i, n, r) {
                    var s = i.footer
                    s.length &&
                      ((t.y += i.footerMarginTop),
                      (n.textAlign = i._footerAlign),
                      (n.textBaseline = 'top'),
                      (n.fillStyle = e(i.footerFontColor, r)),
                      (n.font = o.fontString(i.footerFontSize, i._footerFontStyle, i._footerFontFamily)),
                      o.each(s, function (e) {
                        n.fillText(e, t.x, t.y), (t.y += i.footerFontSize + i.footerSpacing)
                      }))
                  },
                  drawBackground: function (t, i, n, r, s) {
                    ;(n.fillStyle = e(i.backgroundColor, s)), o.drawRoundedRectangle(n, t.x, t.y, r.width, r.height, i.cornerRadius), n.fill()
                  },
                  draw: function () {
                    var t,
                      e,
                      i,
                      n = this._chart.ctx,
                      o = this._view
                    0 !== o.opacity &&
                      ((t = { width: o.width, height: o.height }),
                      (e = { x: o.x, y: o.y }),
                      (i = Math.abs(o.opacity < 0.001) ? 0 : o.opacity),
                      this._options.enabled &&
                        (this.drawBackground(e, o, n, t, i),
                        this.drawCaret(e, t, i),
                        (e.x += o.xPadding),
                        (e.y += o.yPadding),
                        this.drawTitle(e, o, n, i),
                        this.drawBody(e, o, n, i),
                        this.drawFooter(e, o, n, i)))
                  },
                  handleEvent: function (t) {
                    var e,
                      i = this,
                      n = i._options,
                      r = !1
                    return (
                      (i._lastActive = i._lastActive || []),
                      'mouseout' === t.type ? (i._active = []) : (i._active = i._chartInstance.getElementsAtEventForMode(t, n.mode, n)),
                      (r = !o.arrayEquals(i._active, i._lastActive)),
                      (i._lastActive = i._active),
                      (n.enabled || n.custom) &&
                        ((i._eventPosition = { x: t.x, y: t.y }), (e = i._model), i.update(!0), i.pivot(), (r |= e.x !== i._model.x || e.y !== i._model.y)),
                      r
                    )
                  }
                })),
                (t.Tooltip.positioners = {
                  average: function (t) {
                    if (!t.length) return !1
                    for (var e = 0, i = 0, n = 0, o = 0, r = t.length; o < r; ++o) {
                      var s,
                        a = t[o]
                      a && a.hasValue() && ((e += (s = a.tooltipPosition()).x), (i += s.y), ++n)
                    }
                    return { x: Math.round(e / n), y: Math.round(i / n) }
                  },
                  nearest: function (t, e) {
                    for (var i, n, r = e.x, s = e.y, a = Number.POSITIVE_INFINITY, l = 0, c = t.length; l < c; ++l) {
                      var u,
                        d,
                        h = t[l]
                      h && h.hasValue() && ((u = h.getCenterPoint()), (d = o.distanceBetweenPoints(e, u)) < a && ((a = d), (i = h)))
                    }
                    return i && ((r = (n = i.tooltipPosition()).x), (s = n.y)), { x: r, y: s }
                  }
                })
            }
          },
          {}
        ],
        37: [
          function (t, e, i) {
            'use strict'
            e.exports = function (t) {
              var e = t.helpers,
                i = t.defaults.global
              ;(i.elements.arc = { backgroundColor: i.defaultColor, borderColor: '#fff', borderWidth: 2 }),
                (t.elements.Arc = t.Element.extend({
                  inLabelRange: function (t) {
                    var e = this._view
                    return !!e && Math.pow(t - e.x, 2) < Math.pow(e.radius + e.hoverRadius, 2)
                  },
                  inRange: function (t, i) {
                    var n = this._view
                    if (n) {
                      for (var o = e.getAngleFromPoint(n, { x: t, y: i }), r = o.angle, s = o.distance, a = n.startAngle, l = n.endAngle; l < a; ) l += 2 * Math.PI
                      for (; l < r; ) r -= 2 * Math.PI
                      for (; r < a; ) r += 2 * Math.PI
                      var c = a <= r && r <= l,
                        u = s >= n.innerRadius && s <= n.outerRadius
                      return c && u
                    }
                    return !1
                  },
                  getCenterPoint: function () {
                    var t = this._view,
                      e = (t.startAngle + t.endAngle) / 2,
                      i = (t.innerRadius + t.outerRadius) / 2
                    return { x: t.x + Math.cos(e) * i, y: t.y + Math.sin(e) * i }
                  },
                  getArea: function () {
                    var t = this._view
                    return Math.PI * ((t.endAngle - t.startAngle) / (2 * Math.PI)) * (Math.pow(t.outerRadius, 2) - Math.pow(t.innerRadius, 2))
                  },
                  tooltipPosition: function () {
                    var t = this._view,
                      e = t.startAngle + (t.endAngle - t.startAngle) / 2,
                      i = (t.outerRadius - t.innerRadius) / 2 + t.innerRadius
                    return { x: t.x + Math.cos(e) * i, y: t.y + Math.sin(e) * i }
                  },
                  draw: function () {
                    var t = this._chart.ctx,
                      e = this._view,
                      i = e.startAngle,
                      n = e.endAngle
                    t.beginPath(),
                      t.arc(e.x, e.y, e.outerRadius, i, n),
                      t.arc(e.x, e.y, e.innerRadius, n, i, !0),
                      t.closePath(),
                      (t.strokeStyle = e.borderColor),
                      (t.lineWidth = e.borderWidth),
                      (t.fillStyle = e.backgroundColor),
                      t.fill(),
                      (t.lineJoin = 'bevel'),
                      e.borderWidth && t.stroke()
                  }
                }))
            }
          },
          {}
        ],
        38: [
          function (t, e, i) {
            'use strict'
            e.exports = function (t) {
              var e = t.helpers,
                i = t.defaults.global
              ;(t.defaults.global.elements.line = {
                tension: 0.4,
                backgroundColor: i.defaultColor,
                borderWidth: 3,
                borderColor: i.defaultColor,
                borderCapStyle: 'butt',
                borderDash: [],
                borderDashOffset: 0,
                borderJoinStyle: 'miter',
                capBezierPoints: !0,
                fill: !0
              }),
                (t.elements.Line = t.Element.extend({
                  draw: function () {
                    function t(t, e) {
                      var i = e._view
                      !0 === e._view.steppedLine
                        ? (a.lineTo(i.x, t._view.y), a.lineTo(i.x, i.y))
                        : 0 === e._view.tension
                        ? a.lineTo(i.x, i.y)
                        : a.bezierCurveTo(t._view.controlPointNextX, t._view.controlPointNextY, i.controlPointPreviousX, i.controlPointPreviousY, i.x, i.y)
                    }
                    var n = this._view,
                      o = n.spanGaps,
                      r = n.scaleZero,
                      s = this._loop
                    s || ('top' === n.fill ? (r = n.scaleTop) : 'bottom' === n.fill && (r = n.scaleBottom))
                    var a = this._chart.ctx
                    a.save()
                    var l,
                      c,
                      u,
                      d,
                      h = this._children.slice(),
                      f = -1
                    if ((s && h.length && h.push(h[0]), h.length && n.fill)) {
                      for (a.beginPath(), l = 0; l < h.length; ++l)
                        (c = h[l]),
                          (u = e.previousItem(h, l)),
                          (d = c._view),
                          0 === l
                            ? (s ? a.moveTo(r.x, r.y) : a.moveTo(d.x, r), d.skip || ((f = l), a.lineTo(d.x, d.y)))
                            : ((u = -1 === f ? u : h[f]),
                              d.skip
                                ? o || f !== l - 1 || (s ? a.lineTo(r.x, r.y) : a.lineTo(u._view.x, r))
                                : (f === l - 1 || (o && -1 !== f) ? t(u, c) : (s || a.lineTo(d.x, r), a.lineTo(d.x, d.y)), (f = l)))
                      s || -1 === f || a.lineTo(h[f]._view.x, r), (a.fillStyle = n.backgroundColor || i.defaultColor), a.closePath(), a.fill()
                    }
                    var p = i.elements.line
                    for (
                      a.lineCap = n.borderCapStyle || p.borderCapStyle,
                        a.setLineDash && a.setLineDash(n.borderDash || p.borderDash),
                        a.lineDashOffset = n.borderDashOffset || p.borderDashOffset,
                        a.lineJoin = n.borderJoinStyle || p.borderJoinStyle,
                        a.lineWidth = n.borderWidth || p.borderWidth,
                        a.strokeStyle = n.borderColor || i.defaultColor,
                        a.beginPath(),
                        f = -1,
                        l = 0;
                      l < h.length;
                      ++l
                    )
                      (c = h[l]),
                        (u = e.previousItem(h, l)),
                        (d = c._view),
                        0 === l
                          ? d.skip || (a.moveTo(d.x, d.y), (f = l))
                          : ((u = -1 === f ? u : h[f]), d.skip || ((f !== l - 1 && !o) || -1 === f ? a.moveTo(d.x, d.y) : t(u, c), (f = l)))
                    a.stroke(), a.restore()
                  }
                }))
            }
          },
          {}
        ],
        39: [
          function (t, e, i) {
            'use strict'
            e.exports = function (t) {
              function e(t) {
                var e = this._view
                return !!e && Math.pow(t - e.x, 2) < Math.pow(e.radius + e.hitRadius, 2)
              }
              var i = t.helpers,
                n = t.defaults.global,
                o = n.defaultColor
              ;(n.elements.point = { radius: 3, pointStyle: 'circle', backgroundColor: o, borderWidth: 1, borderColor: o, hitRadius: 1, hoverRadius: 4, hoverBorderWidth: 1 }),
                (t.elements.Point = t.Element.extend({
                  inRange: function (t, e) {
                    var i = this._view
                    return !!i && Math.pow(t - i.x, 2) + Math.pow(e - i.y, 2) < Math.pow(i.hitRadius + i.radius, 2)
                  },
                  inLabelRange: e,
                  inXRange: e,
                  inYRange: function (t) {
                    var e = this._view
                    return !!e && Math.pow(t - e.y, 2) < Math.pow(e.radius + e.hitRadius, 2)
                  },
                  getCenterPoint: function () {
                    var t = this._view
                    return { x: t.x, y: t.y }
                  },
                  getArea: function () {
                    return Math.PI * Math.pow(this._view.radius, 2)
                  },
                  tooltipPosition: function () {
                    var t = this._view
                    return { x: t.x, y: t.y, padding: t.radius + t.borderWidth }
                  },
                  draw: function (e) {
                    var r = this._view,
                      s = this._model,
                      a = this._chart.ctx,
                      l = r.pointStyle,
                      c = r.radius,
                      u = r.x,
                      d = r.y,
                      h = t.helpers.color,
                      f = 0
                    r.skip ||
                      ((a.strokeStyle = r.borderColor || o),
                      (a.lineWidth = i.getValueOrDefault(r.borderWidth, n.elements.point.borderWidth)),
                      (a.fillStyle = r.backgroundColor || o),
                      void 0 !== e &&
                        (s.x < e.left || 1.01 * e.right < s.x || s.y < e.top || 1.01 * e.bottom < s.y) &&
                        (s.x < e.left
                          ? (f = (u - s.x) / (e.left - s.x))
                          : 1.01 * e.right < s.x
                          ? (f = (s.x - u) / (s.x - e.right))
                          : s.y < e.top
                          ? (f = (d - s.y) / (e.top - s.y))
                          : 1.01 * e.bottom < s.y && (f = (s.y - d) / (s.y - e.bottom)),
                        (f = Math.round(100 * f) / 100),
                        (a.strokeStyle = h(a.strokeStyle).alpha(f).rgbString()),
                        (a.fillStyle = h(a.fillStyle).alpha(f).rgbString())),
                      t.canvasHelpers.drawPoint(a, l, c, u, d))
                  }
                }))
            }
          },
          {}
        ],
        40: [
          function (t, e, i) {
            'use strict'
            e.exports = function (t) {
              function e(t) {
                return void 0 !== t._view.width
              }
              function i(t) {
                var i,
                  n,
                  o,
                  r,
                  s,
                  a,
                  l = t._view
                return (
                  (s = e(t)
                    ? ((i = l.width / 2), (n = l.x - i), (o = l.x + i), (r = Math.min(l.y, l.base)), Math.max(l.y, l.base))
                    : ((a = l.height / 2), (n = Math.min(l.x, l.base)), (o = Math.max(l.x, l.base)), (r = l.y - a), l.y + a)),
                  { left: n, top: r, right: o, bottom: s }
                )
              }
              var n = t.defaults.global
              ;(n.elements.rectangle = { backgroundColor: n.defaultColor, borderWidth: 0, borderColor: n.defaultColor, borderSkipped: 'bottom' }),
                (t.elements.Rectangle = t.Element.extend({
                  draw: function () {
                    function t(t) {
                      return v[(y + t) % 4]
                    }
                    var e,
                      i,
                      n,
                      o,
                      r,
                      s,
                      a,
                      l,
                      c,
                      u,
                      d,
                      h,
                      f = this._chart.ctx,
                      p = this._view,
                      g = p.borderWidth,
                      m = p.horizontal
                        ? ((e = p.base), (i = p.x), (n = p.y - p.height / 2), (o = p.y + p.height / 2), (r = e < i ? 1 : -1), (s = 1), p.borderSkipped || 'left')
                        : ((e = p.x - p.width / 2), (i = p.x + p.width / 2), (r = 1), (s = (n = p.y) < (o = p.base) ? 1 : -1), p.borderSkipped || 'bottom')
                    g &&
                      ((l = (g = (a = Math.min(Math.abs(e - i), Math.abs(n - o))) < g ? a : g) / 2),
                      (d = n + ('top' !== m ? l * s : 0)),
                      (h = o + ('bottom' !== m ? -l * s : 0)),
                      (c = e + ('left' !== m ? l * r : 0)) !== (u = i + ('right' !== m ? -l * r : 0)) && ((n = d), (o = h)),
                      d !== h && ((e = c), (i = u))),
                      f.beginPath(),
                      (f.fillStyle = p.backgroundColor),
                      (f.strokeStyle = p.borderColor),
                      (f.lineWidth = g)
                    var v = [
                        [e, o],
                        [e, n],
                        [i, n],
                        [i, o]
                      ],
                      y = ['bottom', 'left', 'top', 'right'].indexOf(m, 0)
                    ;-1 === y && (y = 0)
                    var b = t(0)
                    f.moveTo(b[0], b[1])
                    for (var _ = 1; _ < 4; _++) (b = t(_)), f.lineTo(b[0], b[1])
                    f.fill(), g && f.stroke()
                  },
                  height: function () {
                    var t = this._view
                    return t.base - t.y
                  },
                  inRange: function (t, e) {
                    var n,
                      o = !1
                    return this._view && (o = t >= (n = i(this)).left && t <= n.right && e >= n.top && e <= n.bottom), o
                  },
                  inLabelRange: function (t, n) {
                    if (!this._view) return !1
                    var o = i(this)
                    return e(this) ? t >= o.left && t <= o.right : n >= o.top && n <= o.bottom
                  },
                  inXRange: function (t) {
                    var e = i(this)
                    return t >= e.left && t <= e.right
                  },
                  inYRange: function (t) {
                    var e = i(this)
                    return t >= e.top && t <= e.bottom
                  },
                  getCenterPoint: function () {
                    var t,
                      i = this._view,
                      n = e(this) ? ((t = i.x), (i.y + i.base) / 2) : ((t = (i.x + i.base) / 2), i.y)
                    return { x: t, y: n }
                  },
                  getArea: function () {
                    var t = this._view
                    return t.width * Math.abs(t.y - t.base)
                  },
                  tooltipPosition: function () {
                    var t = this._view
                    return { x: t.x, y: t.y }
                  }
                }))
            }
          },
          {}
        ],
        41: [
          function (t, e, i) {
            'use strict'
            e.exports = function (t) {
              function e(t, e) {
                var i = n.getStyle(t, e),
                  o = i && i.match(/(\d+)px/)
                return o ? Number(o[1]) : void 0
              }
              function i(t, e, i, n, o) {
                return { type: t, chart: e, native: o || null, x: void 0 !== i ? i : null, y: void 0 !== n ? n : null }
              }
              var n = t.helpers,
                o = {
                  touchstart: 'mousedown',
                  touchmove: 'mousemove',
                  touchend: 'mouseup',
                  pointerenter: 'mouseenter',
                  pointerdown: 'mousedown',
                  pointermove: 'mousemove',
                  pointerup: 'mouseup',
                  pointerleave: 'mouseout',
                  pointerout: 'mouseout'
                }
              return {
                acquireContext: function (t, i) {
                  if (('string' == typeof t ? (t = document.getElementById(t)) : t.length && (t = t[0]), t && t.canvas && (t = t.canvas), t instanceof HTMLCanvasElement)) {
                    var n = t.getContext && t.getContext('2d')
                    if (n instanceof CanvasRenderingContext2D)
                      return (
                        (r = i),
                        (l = (o = t).style),
                        (c = o.getAttribute('height')),
                        (u = o.getAttribute('width')),
                        (o._chartjs = { initial: { height: c, width: u, style: { display: l.display, height: l.height, width: l.width } } }),
                        (l.display = l.display || 'block'),
                        (null !== u && '' !== u) || (void 0 !== (s = e(o, 'width')) && (o.width = s)),
                        (null !== c && '' !== c) ||
                          ('' === o.style.height ? (o.height = o.width / (r.options.aspectRatio || 2)) : ((a = e(o, 'height')), void 0 !== s && (o.height = a))),
                        n
                      )
                  }
                  var o, r, s, a, l, c, u
                  return null
                },
                releaseContext: function (t) {
                  var e,
                    i = t.canvas
                  i._chartjs &&
                    ((e = i._chartjs.initial),
                    ['height', 'width'].forEach(function (t) {
                      var n = e[t]
                      null == n ? i.removeAttribute(t) : i.setAttribute(t, n)
                    }),
                    n.each(e.style || {}, function (t, e) {
                      i.style[e] = t
                    }),
                    (i.width = i.width),
                    delete i._chartjs)
                },
                addEventListener: function (t, e, r) {
                  var s,
                    a,
                    l = t.chart.canvas
                  'resize' !== e
                    ? ((a = ((s = r._chartjs || (r._chartjs = {})).proxies || (s.proxies = {}))[t.id + '_' + e] =
                        function (e) {
                          var s, a, l
                          r(((s = e), (a = t.chart), i(o[s.type] || s.type, a, (l = n.getRelativePosition(s, a)).x, l.y, s)))
                        }),
                      n.addEvent(l, e, a))
                    : (function (t, e, o) {
                        var r,
                          s,
                          a = (t._chartjs = { ticking: !1 })
                        ;(a.resizer =
                          ((r = function () {
                            a.ticking ||
                              ((a.ticking = !0),
                              n.requestAnimFrame.call(window, function () {
                                if (a.resizer) return (a.ticking = !1), e(i('resize', o))
                              }))
                          }),
                          ((s = document.createElement('iframe')).className = 'chartjs-hidden-iframe'),
                          (s.style.cssText =
                            'display:block;overflow:hidden;border:0;margin:0;top:0;left:0;bottom:0;right:0;height:100%;width:100%;position:absolute;pointer-events:none;z-index:-1;'),
                          (s.tabIndex = -1),
                          n.addEvent(s, 'load', function () {
                            n.addEvent(s.contentWindow || s, 'resize', r), r()
                          }),
                          s)),
                          t.insertBefore(a.resizer, t.firstChild)
                      })(l.parentNode, r, t.chart)
                },
                removeEventListener: function (t, e, i) {
                  var o,
                    r,
                    s,
                    a = t.chart.canvas
                  'resize' !== e
                    ? (s = ((i._chartjs || {}).proxies || {})[t.id + '_' + e]) && n.removeEvent(a, e, s)
                    : (o = a.parentNode) && o._chartjs && ((r = o._chartjs.resizer) && (r.parentNode.removeChild(r), (o._chartjs.resizer = null)), delete o._chartjs)
                }
              }
            }
          },
          {}
        ],
        42: [
          function (t, e, i) {
            'use strict'
            var n = t(41)
            e.exports = function (t) {
              ;(t.platform = { acquireContext: function () {}, releaseContext: function () {}, addEventListener: function () {}, removeEventListener: function () {} }),
                t.helpers.extend(t.platform, n(t))
            }
          },
          { 41: 41 }
        ],
        43: [
          function (t, e, i) {
            'use strict'
            e.exports = function (t) {
              var e = t.helpers,
                i = t.Scale.extend({
                  getLabels: function () {
                    var t = this.chart.data
                    return (this.isHorizontal() ? t.xLabels : t.yLabels) || t.labels
                  },
                  determineDataLimits: function () {
                    var t,
                      i = this,
                      n = i.getLabels()
                    ;(i.minIndex = 0),
                      (i.maxIndex = n.length - 1),
                      void 0 !== i.options.ticks.min && ((t = e.indexOf(n, i.options.ticks.min)), (i.minIndex = -1 !== t ? t : i.minIndex)),
                      void 0 !== i.options.ticks.max && ((t = e.indexOf(n, i.options.ticks.max)), (i.maxIndex = -1 !== t ? t : i.maxIndex)),
                      (i.min = n[i.minIndex]),
                      (i.max = n[i.maxIndex])
                  },
                  buildTicks: function () {
                    var t = this.getLabels()
                    this.ticks = 0 === this.minIndex && this.maxIndex === t.length - 1 ? t : t.slice(this.minIndex, this.maxIndex + 1)
                  },
                  getLabelForIndex: function (t, e) {
                    var i = this.chart.data,
                      n = this.isHorizontal()
                    return i.yLabels && !n ? this.getRightValue(i.datasets[e].data[t]) : this.ticks[t - this.minIndex]
                  },
                  getPixelForValue: function (t, e, i, n) {
                    var o,
                      r = this,
                      s = Math.max(r.maxIndex + 1 - r.minIndex - (r.options.gridLines.offsetGridLines ? 0 : 1), 1)
                    if ((void 0 !== t && isNaN(e) && (e = -1 !== (o = r.getLabels().indexOf(t)) ? o : e), r.isHorizontal())) {
                      var a = r.width / s,
                        l = a * (e - r.minIndex)
                      return ((r.options.gridLines.offsetGridLines && n) || (r.maxIndex === r.minIndex && n)) && (l += a / 2), r.left + Math.round(l)
                    }
                    var c = r.height / s,
                      u = c * (e - r.minIndex)
                    return r.options.gridLines.offsetGridLines && n && (u += c / 2), r.top + Math.round(u)
                  },
                  getPixelForTick: function (t, e) {
                    return this.getPixelForValue(this.ticks[t], t + this.minIndex, null, e)
                  },
                  getValueForPixel: function (t) {
                    var e = Math.max(this.ticks.length - (this.options.gridLines.offsetGridLines ? 0 : 1), 1),
                      i = this.isHorizontal(),
                      n = (i ? this.width : this.height) / e
                    return (t -= i ? this.left : this.top), this.options.gridLines.offsetGridLines && (t -= n / 2), t <= 0 ? 0 : Math.round(t / n)
                  },
                  getBasePixel: function () {
                    return this.bottom
                  }
                })
              t.scaleService.registerScaleType('category', i, { position: 'bottom' })
            }
          },
          {}
        ],
        44: [
          function (t, e, i) {
            'use strict'
            e.exports = function (t) {
              var e = t.helpers,
                i = { position: 'left', ticks: { callback: t.Ticks.formatters.linear } },
                n = t.LinearScaleBase.extend({
                  determineDataLimits: function () {
                    function t(t) {
                      return s ? t.xAxisID === i.id : t.yAxisID === i.id
                    }
                    var i = this,
                      n = i.options,
                      o = i.chart,
                      r = o.data.datasets,
                      s = i.isHorizontal()
                    ;(i.min = null), (i.max = null)
                    var a,
                      l = n.stacked
                    void 0 === l &&
                      e.each(r, function (e, i) {
                        var n
                        l || ((n = o.getDatasetMeta(i)), o.isDatasetVisible(i) && t(n) && void 0 !== n.stack && (l = !0))
                      }),
                      n.stacked || l
                        ? ((a = {}),
                          e.each(r, function (r, s) {
                            var l = o.getDatasetMeta(s),
                              c = [l.type, void 0 === n.stacked && void 0 === l.stack ? s : '', l.stack].join('.')
                            void 0 === a[c] && (a[c] = { positiveValues: [], negativeValues: [] })
                            var u = a[c].positiveValues,
                              d = a[c].negativeValues
                            o.isDatasetVisible(s) &&
                              t(l) &&
                              e.each(r.data, function (t, e) {
                                var o = +i.getRightValue(t)
                                isNaN(o) || l.data[e].hidden || ((u[e] = u[e] || 0), (d[e] = d[e] || 0), n.relativePoints ? (u[e] = 100) : o < 0 ? (d[e] += o) : (u[e] += o))
                              })
                          }),
                          e.each(a, function (t) {
                            var n = t.positiveValues.concat(t.negativeValues),
                              o = e.min(n),
                              r = e.max(n)
                            ;(i.min = null === i.min ? o : Math.min(i.min, o)), (i.max = null === i.max ? r : Math.max(i.max, r))
                          }))
                        : e.each(r, function (n, r) {
                            var s = o.getDatasetMeta(r)
                            o.isDatasetVisible(r) &&
                              t(s) &&
                              e.each(n.data, function (t, e) {
                                var n = +i.getRightValue(t)
                                isNaN(n) || s.data[e].hidden || ((null === i.min || n < i.min) && (i.min = n), (null === i.max || n > i.max) && (i.max = n))
                              })
                          }),
                      this.handleTickRangeOptions()
                  },
                  getTickLimit: function () {
                    var i,
                      n = this.options.ticks
                    return this.isHorizontal()
                      ? Math.min(n.maxTicksLimit ? n.maxTicksLimit : 11, Math.ceil(this.width / 50))
                      : ((i = e.getValueOrDefault(n.fontSize, t.defaults.global.defaultFontSize)),
                        Math.min(n.maxTicksLimit ? n.maxTicksLimit : 11, Math.ceil(this.height / (2 * i))))
                  },
                  handleDirectionalChanges: function () {
                    this.isHorizontal() || this.ticks.reverse()
                  },
                  getLabelForIndex: function (t, e) {
                    return +this.getRightValue(this.chart.data.datasets[e].data[t])
                  },
                  getPixelForValue: function (t) {
                    var e = this.start,
                      i = +this.getRightValue(t),
                      n = this.end - e,
                      o = this.isHorizontal() ? this.left + (this.width / n) * (i - e) : this.bottom - (this.height / n) * (i - e)
                    return Math.round(o)
                  },
                  getValueForPixel: function (t) {
                    var e = this.isHorizontal(),
                      i = e ? this.width : this.height,
                      n = (e ? t - this.left : this.bottom - t) / i
                    return this.start + (this.end - this.start) * n
                  },
                  getPixelForTick: function (t) {
                    return this.getPixelForValue(this.ticksAsNumbers[t])
                  }
                })
              t.scaleService.registerScaleType('linear', n, i)
            }
          },
          {}
        ],
        45: [
          function (t, e, i) {
            'use strict'
            e.exports = function (t) {
              var e = t.helpers,
                i = e.noop
              t.LinearScaleBase = t.Scale.extend({
                handleTickRangeOptions: function () {
                  var t,
                    i,
                    n = this,
                    o = n.options.ticks
                  o.beginAtZero && ((t = e.sign(n.min)), (i = e.sign(n.max)), t < 0 && i < 0 ? (n.max = 0) : 0 < t && 0 < i && (n.min = 0)),
                    void 0 !== o.min ? (n.min = o.min) : void 0 !== o.suggestedMin && (n.min = Math.min(n.min, o.suggestedMin)),
                    void 0 !== o.max ? (n.max = o.max) : void 0 !== o.suggestedMax && (n.max = Math.max(n.max, o.suggestedMax)),
                    n.min === n.max && (n.max++, o.beginAtZero || n.min--)
                },
                getTickLimit: i,
                handleDirectionalChanges: i,
                buildTicks: function () {
                  var i = this,
                    n = i.options.ticks,
                    o = i.getTickLimit(),
                    r = { maxTicks: (o = Math.max(2, o)), min: n.min, max: n.max, stepSize: e.getValueOrDefault(n.fixedStepSize, n.stepSize) },
                    s = (i.ticks = t.Ticks.generators.linear(r, i))
                  i.handleDirectionalChanges(),
                    (i.max = e.max(s)),
                    (i.min = e.min(s)),
                    n.reverse ? (s.reverse(), (i.start = i.max), (i.end = i.min)) : ((i.start = i.min), (i.end = i.max))
                },
                convertTicksToLabels: function () {
                  ;(this.ticksAsNumbers = this.ticks.slice()), (this.zeroLineIndex = this.ticks.indexOf(0)), t.Scale.prototype.convertTicksToLabels.call(this)
                }
              })
            }
          },
          {}
        ],
        46: [
          function (t, e, i) {
            'use strict'
            e.exports = function (t) {
              var e = t.helpers,
                i = { position: 'left', ticks: { callback: t.Ticks.formatters.logarithmic } },
                n = t.Scale.extend({
                  determineDataLimits: function () {
                    function t(t) {
                      return l ? t.xAxisID === i.id : t.yAxisID === i.id
                    }
                    var i = this,
                      n = i.options,
                      o = n.ticks,
                      r = i.chart,
                      s = r.data.datasets,
                      a = e.getValueOrDefault,
                      l = i.isHorizontal()
                    ;(i.min = null), (i.max = null), (i.minNotZero = null)
                    var c,
                      u = n.stacked
                    void 0 === u &&
                      e.each(s, function (e, i) {
                        var n
                        u || ((n = r.getDatasetMeta(i)), r.isDatasetVisible(i) && t(n) && void 0 !== n.stack && (u = !0))
                      }),
                      n.stacked || u
                        ? ((c = {}),
                          e.each(s, function (o, s) {
                            var a = r.getDatasetMeta(s),
                              l = [a.type, void 0 === n.stacked && void 0 === a.stack ? s : '', a.stack].join('.')
                            r.isDatasetVisible(s) &&
                              t(a) &&
                              (void 0 === c[l] && (c[l] = []),
                              e.each(o.data, function (t, e) {
                                var o = c[l],
                                  r = +i.getRightValue(t)
                                isNaN(r) || a.data[e].hidden || ((o[e] = o[e] || 0), n.relativePoints ? (o[e] = 100) : (o[e] += r))
                              }))
                          }),
                          e.each(c, function (t) {
                            var n = e.min(t),
                              o = e.max(t)
                            ;(i.min = null === i.min ? n : Math.min(i.min, n)), (i.max = null === i.max ? o : Math.max(i.max, o))
                          }))
                        : e.each(s, function (n, o) {
                            var s = r.getDatasetMeta(o)
                            r.isDatasetVisible(o) &&
                              t(s) &&
                              e.each(n.data, function (t, e) {
                                var n = +i.getRightValue(t)
                                isNaN(n) ||
                                  s.data[e].hidden ||
                                  ((null === i.min || n < i.min) && (i.min = n),
                                  (null === i.max || n > i.max) && (i.max = n),
                                  0 != n && (null === i.minNotZero || n < i.minNotZero) && (i.minNotZero = n))
                              })
                          }),
                      (i.min = a(o.min, i.min)),
                      (i.max = a(o.max, i.max)),
                      i.min === i.max &&
                        (0 !== i.min && null !== i.min
                          ? ((i.min = Math.pow(10, Math.floor(e.log10(i.min)) - 1)), (i.max = Math.pow(10, Math.floor(e.log10(i.max)) + 1)))
                          : ((i.min = 1), (i.max = 10)))
                  },
                  buildTicks: function () {
                    var i = this,
                      n = i.options.ticks,
                      o = { min: n.min, max: n.max },
                      r = (i.ticks = t.Ticks.generators.logarithmic(o, i))
                    i.isHorizontal() || r.reverse(),
                      (i.max = e.max(r)),
                      (i.min = e.min(r)),
                      n.reverse ? (r.reverse(), (i.start = i.max), (i.end = i.min)) : ((i.start = i.min), (i.end = i.max))
                  },
                  convertTicksToLabels: function () {
                    ;(this.tickValues = this.ticks.slice()), t.Scale.prototype.convertTicksToLabels.call(this)
                  },
                  getLabelForIndex: function (t, e) {
                    return +this.getRightValue(this.chart.data.datasets[e].data[t])
                  },
                  getPixelForTick: function (t) {
                    return this.getPixelForValue(this.tickValues[t])
                  },
                  getPixelForValue: function (t) {
                    var i,
                      n,
                      o = this,
                      r = o.start,
                      s = +o.getRightValue(t),
                      a = o.options.ticks
                    return o.isHorizontal()
                      ? ((n = e.log10(o.end) - e.log10(r)), 0 == s ? o.left : ((i = o.width), o.left + (i / n) * (e.log10(s) - e.log10(r))))
                      : ((i = o.height),
                        0 !== r || a.reverse
                          ? 0 === o.end && a.reverse
                            ? ((n = e.log10(o.start) - e.log10(o.minNotZero)),
                              s === o.end ? o.top : s === o.minNotZero ? o.top + 0.02 * i : o.top + 0.02 * i + ((0.98 * i) / n) * (e.log10(s) - e.log10(o.minNotZero)))
                            : ((n = e.log10(o.end) - e.log10(r)), (i = o.height), o.bottom - (i / n) * (e.log10(s) - e.log10(r)))
                          : ((n = e.log10(o.end) - e.log10(o.minNotZero)),
                            s === r ? o.bottom : s === o.minNotZero ? o.bottom - 0.02 * i : o.bottom - 0.02 * i - ((0.98 * i) / n) * (e.log10(s) - e.log10(o.minNotZero))))
                  },
                  getValueForPixel: function (t) {
                    var i,
                      n = e.log10(this.end) - e.log10(this.start)
                    return this.isHorizontal()
                      ? ((i = this.width), this.start * Math.pow(10, ((t - this.left) * n) / i))
                      : ((i = this.height), Math.pow(10, ((this.bottom - t) * n) / i) / this.start)
                  }
                })
              t.scaleService.registerScaleType('logarithmic', n, i)
            }
          },
          {}
        ],
        47: [
          function (t, e, i) {
            'use strict'
            e.exports = function (t) {
              function e(t) {
                return t.options.lineArc ? 0 : t.chart.data.labels.length
              }
              function i(t) {
                var e = t.options.pointLabels,
                  i = s.getValueOrDefault(e.fontSize, a.defaultFontSize),
                  n = s.getValueOrDefault(e.fontStyle, a.defaultFontStyle),
                  o = s.getValueOrDefault(e.fontFamily, a.defaultFontFamily)
                return { size: i, style: n, family: o, font: s.fontString(i, n, o) }
              }
              function n(t, e, i, n, o) {
                return t === n || t === o ? { start: e - i / 2, end: e + i / 2 } : t < n || o < t ? { start: e - i - 5, end: e } : { start: e, end: e + i + 5 }
              }
              function o(t, e, i, n) {
                if (s.isArray(e)) for (var o = i.y, r = 1.5 * n, a = 0; a < e.length; ++a) t.fillText(e[a], i.x, o), (o += r)
                else t.fillText(e, i.x, i.y)
              }
              function r(t) {
                return s.isNumber(t) ? t : 0
              }
              var s = t.helpers,
                a = t.defaults.global,
                l = {
                  display: !0,
                  animate: !0,
                  lineArc: !1,
                  position: 'chartArea',
                  angleLines: { display: !0, color: 'rgba(0, 0, 0, 0.1)', lineWidth: 1 },
                  ticks: { showLabelBackdrop: !0, backdropColor: 'rgba(255,255,255,0.75)', backdropPaddingY: 2, backdropPaddingX: 2, callback: t.Ticks.formatters.linear },
                  pointLabels: {
                    fontSize: 10,
                    callback: function (t) {
                      return t
                    }
                  }
                },
                c = t.LinearScaleBase.extend({
                  setDimensions: function () {
                    var t = this,
                      e = t.options,
                      i = e.ticks
                    ;(t.width = t.maxWidth), (t.height = t.maxHeight), (t.xCenter = Math.round(t.width / 2)), (t.yCenter = Math.round(t.height / 2))
                    var n = s.min([t.height, t.width]),
                      o = s.getValueOrDefault(i.fontSize, a.defaultFontSize)
                    t.drawingArea = e.display ? n / 2 - (o / 2 + i.backdropPaddingY) : n / 2
                  },
                  determineDataLimits: function () {
                    var t = this,
                      e = t.chart,
                      i = Number.POSITIVE_INFINITY,
                      n = Number.NEGATIVE_INFINITY
                    s.each(e.data.datasets, function (o, r) {
                      var a
                      e.isDatasetVisible(r) &&
                        ((a = e.getDatasetMeta(r)),
                        s.each(o.data, function (e, o) {
                          var r = +t.getRightValue(e)
                          isNaN(r) || a.data[o].hidden || ((i = Math.min(r, i)), (n = Math.max(r, n)))
                        }))
                    }),
                      (t.min = i === Number.POSITIVE_INFINITY ? 0 : i),
                      (t.max = n === Number.NEGATIVE_INFINITY ? 0 : n),
                      t.handleTickRangeOptions()
                  },
                  getTickLimit: function () {
                    var t = this.options.ticks,
                      e = s.getValueOrDefault(t.fontSize, a.defaultFontSize)
                    return Math.min(t.maxTicksLimit ? t.maxTicksLimit : 11, Math.ceil(this.drawingArea / (1.5 * e)))
                  },
                  convertTicksToLabels: function () {
                    t.LinearScaleBase.prototype.convertTicksToLabels.call(this), (this.pointLabels = this.chart.data.labels.map(this.options.pointLabels.callback, this))
                  },
                  getLabelForIndex: function (t, e) {
                    return +this.getRightValue(this.chart.data.datasets[e].data[t])
                  },
                  fit: function () {
                    var t, o
                    this.options.lineArc
                      ? ((t = this), (o = Math.min(t.height / 2, t.width / 2)), (t.drawingArea = Math.round(o)), t.setCenterPoint(0, 0, 0, 0))
                      : (function (t) {
                          var o,
                            r,
                            a = i(t),
                            l = Math.min(t.height / 2, t.width / 2),
                            c = { l: t.width, r: 0, t: t.height, b: 0 },
                            u = {}
                          ;(t.ctx.font = a.font), (t._pointLabelSizes = [])
                          for (var d, h, f, p = e(t), g = 0; g < p; g++) {
                            ;(r = t.getPointPosition(g, l)),
                              (d = t.ctx),
                              (h = a.size),
                              (f = t.pointLabels[g] || ''),
                              (o = s.isArray(f) ? { w: s.longestText(d, d.font, f), h: f.length * h + 1.5 * (f.length - 1) * h } : { w: d.measureText(f).width, h: h }),
                              (t._pointLabelSizes[g] = o)
                            var m = t.getIndexAngle(g),
                              v = s.toDegrees(m) % 360,
                              y = n(v, r.x, o.w, 0, 180),
                              b = n(v, r.y, o.h, 90, 270)
                            y.start < c.l && ((c.l = y.start), (u.l = m)),
                              y.end > c.r && ((c.r = y.end), (u.r = m)),
                              b.start < c.t && ((c.t = b.start), (u.t = m)),
                              b.end > c.b && ((c.b = b.end), (u.b = m))
                          }
                          t.setReductions(l, c, u)
                        })(this)
                  },
                  setReductions: function (t, e, i) {
                    var n = e.l / Math.sin(i.l),
                      o = Math.max(e.r - this.width, 0) / Math.sin(i.r),
                      s = -e.t / Math.cos(i.t),
                      a = -Math.max(e.b - this.height, 0) / Math.cos(i.b)
                    ;(n = r(n)), (o = r(o)), (s = r(s)), (a = r(a))
                    ;(this.drawingArea = Math.min(Math.round(t - (n + o) / 2), Math.round(t - (s + a) / 2))), this.setCenterPoint(n, o, s, a)
                  },
                  setCenterPoint: function (t, e, i, n) {
                    var o = this,
                      r = o.width - e - o.drawingArea,
                      s = t + o.drawingArea,
                      a = i + o.drawingArea,
                      l = o.height - n - o.drawingArea
                    ;(o.xCenter = Math.round((s + r) / 2 + o.left)), (o.yCenter = Math.round((a + l) / 2 + o.top))
                  },
                  getIndexAngle: function (t) {
                    return t * ((2 * Math.PI) / e(this)) + ((this.chart.options && this.chart.options.startAngle ? this.chart.options.startAngle : 0) * Math.PI * 2) / 360
                  },
                  getDistanceFromCenterForValue: function (t) {
                    if (null === t) return 0
                    var e = this.drawingArea / (this.max - this.min)
                    return this.options.reverse ? (this.max - t) * e : (t - this.min) * e
                  },
                  getPointPosition: function (t, e) {
                    var i = this.getIndexAngle(t) - Math.PI / 2
                    return { x: Math.round(Math.cos(i) * e) + this.xCenter, y: Math.round(Math.sin(i) * e) + this.yCenter }
                  },
                  getPointPositionForValue: function (t, e) {
                    return this.getPointPosition(t, this.getDistanceFromCenterForValue(e))
                  },
                  getBasePosition: function () {
                    var t = this.min,
                      e = this.max
                    return this.getPointPositionForValue(0, this.beginAtZero ? 0 : t < 0 && e < 0 ? e : 0 < t && 0 < e ? t : 0)
                  },
                  draw: function () {
                    var t,
                      n,
                      r,
                      l,
                      c,
                      u = this,
                      d = u.options,
                      h = d.gridLines,
                      f = d.ticks,
                      p = s.getValueOrDefault
                    d.display &&
                      ((t = u.ctx),
                      (n = p(f.fontSize, a.defaultFontSize)),
                      (r = p(f.fontStyle, a.defaultFontStyle)),
                      (l = p(f.fontFamily, a.defaultFontFamily)),
                      (c = s.fontString(n, r, l)),
                      s.each(u.ticks, function (i, o) {
                        var r, l, g, m
                        ;(0 < o || d.reverse) &&
                          ((r = u.getDistanceFromCenterForValue(u.ticksAsNumbers[o])),
                          (l = u.yCenter - r),
                          h.display &&
                            0 !== o &&
                            (function (t, i, n, o) {
                              var r = t.ctx
                              if (((r.strokeStyle = s.getValueAtIndexOrDefault(i.color, o - 1)), (r.lineWidth = s.getValueAtIndexOrDefault(i.lineWidth, o - 1)), t.options.lineArc))
                                r.beginPath(), r.arc(t.xCenter, t.yCenter, n, 0, 2 * Math.PI), r.closePath(), r.stroke()
                              else {
                                var a = e(t)
                                if (0 === a) return
                                r.beginPath()
                                var l = t.getPointPosition(0, n)
                                r.moveTo(l.x, l.y)
                                for (var c = 1; c < a; c++) (l = t.getPointPosition(c, n)), r.lineTo(l.x, l.y)
                                r.closePath(), r.stroke()
                              }
                            })(u, h, r, o),
                          f.display &&
                            ((g = p(f.fontColor, a.defaultFontColor)),
                            (t.font = c),
                            f.showLabelBackdrop &&
                              ((m = t.measureText(i).width),
                              (t.fillStyle = f.backdropColor),
                              t.fillRect(u.xCenter - m / 2 - f.backdropPaddingX, l - n / 2 - f.backdropPaddingY, m + 2 * f.backdropPaddingX, n + 2 * f.backdropPaddingY)),
                            (t.textAlign = 'center'),
                            (t.textBaseline = 'middle'),
                            (t.fillStyle = g),
                            t.fillText(i, u.xCenter, l)))
                      }),
                      d.lineArc ||
                        (function (t) {
                          var n = t.ctx,
                            r = s.getValueOrDefault,
                            l = t.options,
                            c = l.angleLines,
                            u = l.pointLabels
                          ;(n.lineWidth = c.lineWidth), (n.strokeStyle = c.color)
                          var d = t.getDistanceFromCenterForValue(l.reverse ? t.min : t.max),
                            h = i(t)
                          n.textBaseline = 'top'
                          for (var f, p, g, m, v, y = e(t) - 1; 0 <= y; y--) {
                            c.display && ((f = t.getPointPosition(y, d)), n.beginPath(), n.moveTo(t.xCenter, t.yCenter), n.lineTo(f.x, f.y), n.stroke(), n.closePath())
                            var b = t.getPointPosition(y, d + 5),
                              _ = r(u.fontColor, a.defaultFontColor)
                            ;(n.font = h.font), (n.fillStyle = _)
                            var w = t.getIndexAngle(y),
                              x = s.toDegrees(w)
                            ;(n.textAlign = 0 === (v = x) || 180 === v ? 'center' : v < 180 ? 'left' : 'right'),
                              (p = x),
                              (g = t._pointLabelSizes[y]),
                              (m = b),
                              90 === p || 270 === p ? (m.y -= g.h / 2) : (270 < p || p < 90) && (m.y -= g.h),
                              o(n, t.pointLabels[y] || '', b, h.size)
                          }
                        })(u))
                  }
                })
              t.scaleService.registerScaleType('radialLinear', c, l)
            }
          },
          {}
        ],
        48: [
          function (t, e, i) {
            'use strict'
            var n = 'function' == typeof (n = t(1)) ? n : window.moment
            e.exports = function (t) {
              var e = t.helpers,
                i = {
                  units: [
                    { name: 'millisecond', steps: [1, 2, 5, 10, 20, 50, 100, 250, 500] },
                    { name: 'second', steps: [1, 2, 5, 10, 30] },
                    { name: 'minute', steps: [1, 2, 5, 10, 30] },
                    { name: 'hour', steps: [1, 2, 3, 6, 12] },
                    { name: 'day', steps: [1, 2, 5] },
                    { name: 'week', maxStep: 4 },
                    { name: 'month', maxStep: 3 },
                    { name: 'quarter', maxStep: 4 },
                    { name: 'year', maxStep: !1 }
                  ]
                },
                o = t.Scale.extend({
                  initialize: function () {
                    if (!n) throw new Error('Chart.js - Moment.js could not be found! You must include it before Chart.js to use the time scale. Download at https://momentjs.com')
                    t.Scale.prototype.initialize.call(this)
                  },
                  getLabelMoment: function (t, e) {
                    return null !== t && null !== e && void 0 !== this.labelMoments[t] ? this.labelMoments[t][e] : null
                  },
                  getLabelDiff: function (t, e) {
                    return null === t || null === e ? null : (void 0 === this.labelDiffs && this.buildLabelDiffs(), void 0 !== this.labelDiffs[t] ? this.labelDiffs[t][e] : null)
                  },
                  getMomentStartOf: function (t) {
                    return 'week' === this.options.time.unit && !1 !== this.options.time.isoWeekday
                      ? t.clone().startOf('isoWeek').isoWeekday(this.options.time.isoWeekday)
                      : t.clone().startOf(this.tickUnit)
                  },
                  determineDataLimits: function () {
                    var t = this
                    t.labelMoments = []
                    var i = []
                    t.chart.data.labels && 0 < t.chart.data.labels.length
                      ? (e.each(
                          t.chart.data.labels,
                          function (e) {
                            var n = t.parseTime(e)
                            n.isValid() && (t.options.time.round && n.startOf(t.options.time.round), i.push(n))
                          },
                          t
                        ),
                        (t.firstTick = n.min.call(t, i)),
                        (t.lastTick = n.max.call(t, i)))
                      : ((t.firstTick = null), (t.lastTick = null)),
                      e.each(
                        t.chart.data.datasets,
                        function (o, r) {
                          var s = [],
                            a = t.chart.isDatasetVisible(r)
                          'object' == typeof o.data[0] && null !== o.data[0]
                            ? e.each(
                                o.data,
                                function (e) {
                                  var i = t.parseTime(t.getRightValue(e))
                                  i.isValid() &&
                                    (t.options.time.round && i.startOf(t.options.time.round),
                                    s.push(i),
                                    a && ((t.firstTick = null !== t.firstTick ? n.min(t.firstTick, i) : i), (t.lastTick = null !== t.lastTick ? n.max(t.lastTick, i) : i)))
                                },
                                t
                              )
                            : (s = i),
                            t.labelMoments.push(s)
                        },
                        t
                      ),
                      t.options.time.min && (t.firstTick = t.parseTime(t.options.time.min)),
                      t.options.time.max && (t.lastTick = t.parseTime(t.options.time.max)),
                      (t.firstTick = (t.firstTick || n()).clone()),
                      (t.lastTick = (t.lastTick || n()).clone())
                  },
                  buildLabelDiffs: function () {
                    var t = this
                    t.labelDiffs = []
                    var i = []
                    t.chart.data.labels &&
                      0 < t.chart.data.labels.length &&
                      e.each(
                        t.chart.data.labels,
                        function (e) {
                          var n = t.parseTime(e)
                          n.isValid() && (t.options.time.round && n.startOf(t.options.time.round), i.push(n.diff(t.firstTick, t.tickUnit, !0)))
                        },
                        t
                      ),
                      e.each(
                        t.chart.data.datasets,
                        function (n) {
                          var o = []
                          'object' == typeof n.data[0] && null !== n.data[0]
                            ? e.each(
                                n.data,
                                function (e) {
                                  var i = t.parseTime(t.getRightValue(e))
                                  i.isValid() && (t.options.time.round && i.startOf(t.options.time.round), o.push(i.diff(t.firstTick, t.tickUnit, !0)))
                                },
                                t
                              )
                            : (o = i),
                            t.labelDiffs.push(o)
                        },
                        t
                      )
                  },
                  buildTicks: function () {
                    var n = this
                    n.ctx.save()
                    var o = e.getValueOrDefault(n.options.ticks.fontSize, t.defaults.global.defaultFontSize),
                      r = e.getValueOrDefault(n.options.ticks.fontStyle, t.defaults.global.defaultFontStyle),
                      s = e.getValueOrDefault(n.options.ticks.fontFamily, t.defaults.global.defaultFontFamily),
                      a = e.fontString(o, r, s)
                    if (((n.ctx.font = a), (n.ticks = []), (n.unitScale = 1), (n.scaleSizeInUnits = 0), n.options.time.unit))
                      (n.tickUnit = n.options.time.unit || 'day'),
                        (n.displayFormat = n.options.time.displayFormats[n.tickUnit]),
                        (n.scaleSizeInUnits = n.lastTick.diff(n.firstTick, n.tickUnit, !0)),
                        (n.unitScale = e.getValueOrDefault(n.options.time.unitStepSize, 1))
                    else {
                      var l = n.isHorizontal() ? n.width : n.height,
                        c = n.tickFormatFunction(n.firstTick, 0, []),
                        u = l / (n.ctx.measureText(c).width * Math.cos(e.toRadians(n.options.ticks.maxRotation)) + o * Math.sin(e.toRadians(n.options.ticks.maxRotation)))
                      ;(n.tickUnit = n.options.time.minUnit),
                        (n.scaleSizeInUnits = n.lastTick.diff(n.firstTick, n.tickUnit, !0)),
                        (n.displayFormat = n.options.time.displayFormats[n.tickUnit])
                      for (var d = 0, h = i.units[d]; d < i.units.length; ) {
                        if (((n.unitScale = 1), e.isArray(h.steps) && Math.ceil(n.scaleSizeInUnits / u) < e.max(h.steps))) {
                          for (var f = 0; f < h.steps.length; ++f)
                            if (h.steps[f] >= Math.ceil(n.scaleSizeInUnits / u)) {
                              n.unitScale = e.getValueOrDefault(n.options.time.unitStepSize, h.steps[f])
                              break
                            }
                          break
                        }
                        if (!1 === h.maxStep || Math.ceil(n.scaleSizeInUnits / u) < h.maxStep) {
                          n.unitScale = e.getValueOrDefault(n.options.time.unitStepSize, Math.ceil(n.scaleSizeInUnits / u))
                          break
                        }
                        ;(h = i.units[++d]), (n.tickUnit = h.name)
                        var p = n.firstTick.diff(n.getMomentStartOf(n.firstTick), n.tickUnit, !0),
                          g = n.getMomentStartOf(n.lastTick.clone().add(1, n.tickUnit)).diff(n.lastTick, n.tickUnit, !0)
                        ;(n.scaleSizeInUnits = n.lastTick.diff(n.firstTick, n.tickUnit, !0) + p + g), (n.displayFormat = n.options.time.displayFormats[h.name])
                      }
                    }
                    var m,
                      v,
                      y = n.options.time.min ? n.getMomentStartOf(n.firstTick) : ((n.firstTick = n.getMomentStartOf(n.firstTick)), n.firstTick)
                    n.options.time.max ||
                      ((v = (m = n.getMomentStartOf(n.lastTick)).diff(n.lastTick, n.tickUnit, !0)) < 0
                        ? (n.lastTick = n.getMomentStartOf(n.lastTick.add(1, n.tickUnit)))
                        : 0 <= v && (n.lastTick = m),
                      (n.scaleSizeInUnits = n.lastTick.diff(n.firstTick, n.tickUnit, !0))),
                      n.options.time.displayFormat && (n.displayFormat = n.options.time.displayFormat),
                      n.ticks.push(n.firstTick.clone())
                    for (var b = n.unitScale; b <= n.scaleSizeInUnits; b += n.unitScale) {
                      var _ = y.clone().add(b, n.tickUnit)
                      if (n.options.time.max && 0 <= _.diff(n.lastTick, n.tickUnit, !0)) break
                      n.ticks.push(_)
                    }
                    ;(0 === n.ticks[n.ticks.length - 1].diff(n.lastTick, n.tickUnit) && 0 !== n.scaleSizeInUnits) ||
                      (n.options.time.max
                        ? (n.ticks.push(n.lastTick.clone()), (n.scaleSizeInUnits = n.lastTick.diff(n.ticks[0], n.tickUnit, !0)))
                        : (n.ticks.push(n.lastTick.clone()), (n.scaleSizeInUnits = n.lastTick.diff(n.firstTick, n.tickUnit, !0)))),
                      n.ctx.restore(),
                      (n.labelDiffs = void 0)
                  },
                  getLabelForIndex: function (t, e) {
                    var i = this.chart.data.labels && t < this.chart.data.labels.length ? this.chart.data.labels[t] : '',
                      n = this.chart.data.datasets[e].data[t]
                    return (
                      null !== n && 'object' == typeof n && (i = this.getRightValue(n)),
                      this.options.time.tooltipFormat && (i = this.parseTime(i).format(this.options.time.tooltipFormat)),
                      i
                    )
                  },
                  tickFormatFunction: function (t, i, n) {
                    var o = t.format(this.displayFormat),
                      r = this.options.ticks,
                      s = e.getValueOrDefault(r.callback, r.userCallback)
                    return s ? s(o, i, n) : o
                  },
                  convertTicksToLabels: function () {
                    ;(this.tickMoments = this.ticks), (this.ticks = this.ticks.map(this.tickFormatFunction, this))
                  },
                  getPixelForValue: function (t, e, i) {
                    var n = this,
                      o = null
                    if (
                      (void 0 !== e && void 0 !== i && (o = n.getLabelDiff(i, e)),
                      null === o && ((t && t.isValid) || (t = n.parseTime(n.getRightValue(t))), t && t.isValid && t.isValid() && (o = t.diff(n.firstTick, n.tickUnit, !0))),
                      null !== o)
                    ) {
                      var r = 0 !== o ? o / n.scaleSizeInUnits : o
                      if (n.isHorizontal()) {
                        var s = n.width * r
                        return n.left + Math.round(s)
                      }
                      var a = n.height * r
                      return n.top + Math.round(a)
                    }
                  },
                  getPixelForTick: function (t) {
                    return this.getPixelForValue(this.tickMoments[t], null, null)
                  },
                  getValueForPixel: function (t) {
                    var e = this.isHorizontal() ? this.width : this.height,
                      i = (t - (this.isHorizontal() ? this.left : this.top)) / e
                    return (i *= this.scaleSizeInUnits), this.firstTick.clone().add(n.duration(i, this.tickUnit).asSeconds(), 'seconds')
                  },
                  parseTime: function (t) {
                    return 'string' == typeof this.options.time.parser
                      ? n(t, this.options.time.parser)
                      : 'function' == typeof this.options.time.parser
                      ? this.options.time.parser(t)
                      : 'function' == typeof t.getMonth || 'number' == typeof t
                      ? n(t)
                      : t.isValid && t.isValid()
                      ? t
                      : 'string' != typeof this.options.time.format && this.options.time.format.call
                      ? (console.warn('options.time.format is deprecated and replaced by options.time.parser. See http://nnnick.github.io/Chart.js/docs-v2/#scales-time-scale'),
                        this.options.time.format(t))
                      : n(t, this.options.time.format)
                  }
                })
              t.scaleService.registerScaleType('time', o, {
                position: 'bottom',
                time: {
                  parser: !1,
                  format: !1,
                  unit: !1,
                  round: !1,
                  displayFormat: !1,
                  isoWeekday: !1,
                  minUnit: 'millisecond',
                  displayFormats: {
                    millisecond: 'h:mm:ss.SSS a',
                    second: 'h:mm:ss a',
                    minute: 'h:mm:ss a',
                    hour: 'MMM D, hA',
                    day: 'll',
                    week: 'll',
                    month: 'MMM YYYY',
                    quarter: '[Q]Q - YYYY',
                    year: 'YYYY'
                  }
                },
                ticks: { autoSkip: !1 }
              })
            }
          },
          { 1: 1 }
        ]
      },
      {},
      [7]
    )(7)
  }),
  (function (t) {
    'use strict'
    var e = function (i) {
      ;(this.owl = i),
        (this._thumbcontent = []),
        (this._identifier = 0),
        (this.owl_currentitem = this.owl.options.startPosition),
        (this.$element = this.owl.$element),
        (this._handlers = {
          'prepared.owl.carousel': t.proxy(function (e) {
            var i
            !e.namespace || !this.owl.options.thumbs || this.owl.options.thumbImage || this.owl.options.thumbsPrerendered || this.owl.options.thumbImage
              ? e.namespace && this.owl.options.thumbs && this.owl.options.thumbImage && ((i = t(e.content).find('img')), this._thumbcontent.push(i))
              : void 0 !== t(e.content).find('[data-thumb]').attr('data-thumb') && this._thumbcontent.push(t(e.content).find('[data-thumb]').attr('data-thumb'))
          }, this),
          'initialized.owl.carousel': t.proxy(function (t) {
            t.namespace && this.owl.options.thumbs && (this.render(), this.listen(), (this._identifier = this.owl.$element.data('slider-id')), this.setActive())
          }, this),
          'changed.owl.carousel': t.proxy(function (t) {
            t.namespace && 'position' === t.property.name && this.owl.options.thumbs && ((this._identifier = this.owl.$element.data('slider-id')), this.setActive())
          }, this)
        }),
        (this.owl.options = t.extend({}, e.Defaults, this.owl.options)),
        this.owl.$element.on(this._handlers)
    }
    ;(e.Defaults = { thumbs: !0, thumbImage: !1, thumbContainerClass: 'owl-thumbs', thumbItemClass: 'owl-thumb-item', moveThumbsInside: !1 }),
      (e.prototype.listen = function () {
        var e = this.owl.options
        e.thumbsPrerendered && (this._thumbcontent._thumbcontainer = t('.' + e.thumbContainerClass)),
          t(this._thumbcontent._thumbcontainer).on(
            'click',
            this._thumbcontent._thumbcontainer.children(),
            t.proxy(function (i) {
              this._identifier = t(i.target)
                .closest('.' + e.thumbContainerClass)
                .data('slider-id')
              var n = t(i.target).parent().is(this._thumbcontent._thumbcontainer)
                ? t(i.target).index()
                : t(i.target)
                    .closest('.' + e.thumbItemClass)
                    .index()
              e.thumbsPrerendered ? t('[data-slider-id=' + this._identifier + ']').trigger('to.owl.carousel', [n, e.dotsSpeed, !0]) : this.owl.to(n, e.dotsSpeed),
                i.preventDefault()
            }, this)
          )
      }),
      (e.prototype.render = function () {
        var e,
          i = this.owl.options
        if (
          (i.thumbsPrerendered
            ? ((this._thumbcontent._thumbcontainer = t('.' + i.thumbContainerClass)), i.moveThumbsInside && this._thumbcontent._thumbcontainer.appendTo(this.$element))
            : (this._thumbcontent._thumbcontainer = t('<div>').addClass(i.thumbContainerClass).appendTo(this.$element)),
          i.thumbImage)
        )
          for (e = 0; e < this._thumbcontent.length; ++e)
            this._thumbcontent._thumbcontainer.append(
              '<button class=' + i.thumbItemClass + '><img src="' + this._thumbcontent[e].attr('src') + '" alt="' + this._thumbcontent[e].attr('alt') + '" /></button>'
            )
        else
          for (e = 0; e < this._thumbcontent.length; ++e) this._thumbcontent._thumbcontainer.append('<button class=' + i.thumbItemClass + '>' + this._thumbcontent[e] + '</button>')
      }),
      (e.prototype.setActive = function () {
        ;(this.owl_currentitem = this.owl._current - this.owl._clones.length / 2), this.owl_currentitem === this.owl._items.length && (this.owl_currentitem = 0)
        var e = this.owl.options,
          i = e.thumbsPrerendered ? t('.' + e.thumbContainerClass + '[data-slider-id="' + this._identifier + '"]') : this._thumbcontent._thumbcontainer
        i.children().filter('.active').removeClass('active'), i.children().eq(this.owl_currentitem).addClass('active')
      }),
      (e.prototype.destroy = function () {
        var t, e
        for (t in this._handlers) this.owl.$element.off(t, this._handlers[t])
        for (e in Object.getOwnPropertyNames(this)) 'function' != typeof this[e] && (this[e] = null)
      }),
      (t.fn.owlCarousel.Constructor.Plugins.Thumbs = e)
  })(window.Zepto || window.jQuery, (window, document)),
  jQuery(document).ready(function (t) {
    var e = 2500,
      n = 3800
    function o(i) {
      var c,
        u,
        d = a(i)
      i.parents('.cd-headline').hasClass('type')
        ? ((c = i.parent('.cd-words-wrapper')).addClass('selected').removeClass('waiting'),
          setTimeout(function () {
            c.removeClass('selected'), i.removeClass('is-visible').addClass('is-hidden').children('i').removeClass('in').addClass('out')
          }, 500),
          setTimeout(function () {
            r(d, 150)
          }, 1300))
        : i.parents('.cd-headline').hasClass('letters')
        ? ((u = i.children('i').length >= d.children('i').length),
          (function i(n, r, s, c) {
            var u
            n.removeClass('in').addClass('out'),
              n.is(':last-child')
                ? s &&
                  setTimeout(function () {
                    o(a(r))
                  }, e)
                : setTimeout(function () {
                    i(n.next(), r, s, c)
                  }, c),
              n.is(':last-child') && t('html').hasClass('no-csstransitions') && ((u = a(r)), l(r, u))
          })(i.find('i').eq(0), i, u, 50),
          s(d.find('i').eq(0), d, u, 50))
        : i.parents('.cd-headline').hasClass('clip')
        ? i.parents('.cd-words-wrapper').animate({ width: '2px' }, 600, function () {
            l(i, d), r(d)
          })
        : i.parents('.cd-headline').hasClass('loading-bar')
        ? (i.parents('.cd-words-wrapper').removeClass('is-loading'),
          l(i, d),
          setTimeout(function () {
            o(d)
          }, n),
          setTimeout(function () {
            i.parents('.cd-words-wrapper').addClass('is-loading')
          }, 800))
        : (l(i, d),
          setTimeout(function () {
            o(d)
          }, e))
    }
    function r(t, e) {
      t.parents('.cd-headline').hasClass('type')
        ? (s(t.find('i').eq(0), t, !1, e), t.addClass('is-visible').removeClass('is-hidden'))
        : t.parents('.cd-headline').hasClass('clip') &&
          t.parents('.cd-words-wrapper').animate({ width: t.width() + 10 }, 600, function () {
            setTimeout(function () {
              o(t)
            }, 1500)
          })
    }
    function s(t, i, n, r) {
      t.addClass('in').removeClass('out'),
        t.is(':last-child')
          ? (i.parents('.cd-headline').hasClass('type') &&
              setTimeout(function () {
                i.parents('.cd-words-wrapper').addClass('waiting')
              }, 200),
            n ||
              setTimeout(function () {
                o(i)
              }, e))
          : setTimeout(function () {
              s(t.next(), i, n, r)
            }, r)
    }
    function a(t) {
      return t.is(':last-child') ? t.parent().children().eq(0) : t.next()
    }
    function l(t, e) {
      t.removeClass('is-visible').addClass('is-hidden'), e.removeClass('is-hidden').addClass('is-visible')
    }
    t('.cd-headline.letters')
      .find('b')
      .each(function () {
        var e = t(this),
          n = e.text().split(''),
          o = e.hasClass('is-visible')
        for (i in n) 0 < e.parents('.rotate-2').length && (n[i] = '<em>' + n[i] + '</em>'), (n[i] = o ? '<i class="in">' + n[i] + '</i>' : '<i>' + n[i] + '</i>')
        var r = n.join('')
        e.html(r).css('opacity', 1)
      }),
      (function (i) {
        var r = e
        i.each(function () {
          var e,
            i,
            s,
            a,
            l = t(this)
          l.hasClass('loading-bar')
            ? ((r = n),
              setTimeout(function () {
                l.find('.cd-words-wrapper').addClass('is-loading')
              }, 800))
            : l.hasClass('clip')
            ? ((i = (e = l.find('.cd-words-wrapper')).width() + 10), e.css('width', i))
            : l.hasClass('type') ||
              ((s = l.find('.cd-words-wrapper b')),
              (a = 0),
              s.each(function () {
                var e = t(this).width()
                a < e && (a = e)
              }),
              l.find('.cd-words-wrapper').css('width', a)),
            setTimeout(function () {
              o(l.find('.is-visible').eq(0))
            }, r)
        })
      })(t('.cd-headline'))
  }),
  (function (t, e) {
    'object' == typeof exports && 'object' == typeof module
      ? (module.exports = e())
      : 'function' == typeof define && define.amd
      ? define([], e)
      : 'object' == typeof exports
      ? (exports.ClipboardJS = e())
      : (t.ClipboardJS = e())
  })(this, function () {
    return (
      (i = {}),
      (t.m = e =
        [
          function (t, e, i) {
            'use strict'
            var n =
                'function' == typeof Symbol && 'symbol' == typeof Symbol.iterator
                  ? function (t) {
                      return typeof t
                    }
                  : function (t) {
                      return t && 'function' == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? 'symbol' : typeof t
                    },
              o = l(i(1)),
              r = l(i(3)),
              s = l(i(4))
            function a(t, e) {
              for (var i = 0; i < e.length; i++) {
                var n = e[i]
                ;(n.enumerable = n.enumerable || !1), (n.configurable = !0), 'value' in n && (n.writable = !0), Object.defineProperty(t, n.key, n)
              }
            }
            function l(t) {
              return t && t.__esModule ? t : { default: t }
            }
            var c =
              ((function (t, e) {
                if ('function' != typeof e && null !== e) throw new TypeError('Super expression must either be null or a function, not ' + typeof e)
                ;(t.prototype = Object.create(e && e.prototype, { constructor: { value: t, enumerable: !1, writable: !0, configurable: !0 } })),
                  e && (Object.setPrototypeOf ? Object.setPrototypeOf(t, e) : (t.__proto__ = e))
              })(u, r.default),
              (function (t, e, i) {
                e && a(t.prototype, e), i && a(t, i)
              })(
                u,
                [
                  {
                    key: 'resolveOptions',
                    value: function () {
                      var t = 0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : {}
                      ;(this.action = 'function' == typeof t.action ? t.action : this.defaultAction),
                        (this.target = 'function' == typeof t.target ? t.target : this.defaultTarget),
                        (this.text = 'function' == typeof t.text ? t.text : this.defaultText),
                        (this.container = 'object' === n(t.container) ? t.container : document.body)
                    }
                  },
                  {
                    key: 'listenClick',
                    value: function (t) {
                      var e = this
                      this.listener = (0, s.default)(t, 'click', function (t) {
                        return e.onClick(t)
                      })
                    }
                  },
                  {
                    key: 'onClick',
                    value: function (t) {
                      var e = t.delegateTarget || t.currentTarget
                      this.clipboardAction && (this.clipboardAction = null),
                        (this.clipboardAction = new o.default({
                          action: this.action(e),
                          target: this.target(e),
                          text: this.text(e),
                          container: this.container,
                          trigger: e,
                          emitter: this
                        }))
                    }
                  },
                  {
                    key: 'defaultAction',
                    value: function (t) {
                      return d('action', t)
                    }
                  },
                  {
                    key: 'defaultTarget',
                    value: function (t) {
                      var e = d('target', t)
                      if (e) return document.querySelector(e)
                    }
                  },
                  {
                    key: 'defaultText',
                    value: function (t) {
                      return d('text', t)
                    }
                  },
                  {
                    key: 'destroy',
                    value: function () {
                      this.listener.destroy(), this.clipboardAction && (this.clipboardAction.destroy(), (this.clipboardAction = null))
                    }
                  }
                ],
                [
                  {
                    key: 'isSupported',
                    value: function () {
                      var t = 0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : ['copy', 'cut'],
                        e = 'string' == typeof t ? [t] : t,
                        i = !!document.queryCommandSupported
                      return (
                        e.forEach(function (t) {
                          i = i && !!document.queryCommandSupported(t)
                        }),
                        i
                      )
                    }
                  }
                ]
              ),
              u)
            function u(t, e) {
              !(function (t) {
                if (!(t instanceof u)) throw new TypeError('Cannot call a class as a function')
              })(this)
              var i = (function (t, e) {
                if (!t) throw new ReferenceError("this hasn't been initialised - super() hasn't been called")
                return !e || ('object' != typeof e && 'function' != typeof e) ? t : e
              })(this, (u.__proto__ || Object.getPrototypeOf(u)).call(this))
              return i.resolveOptions(e), i.listenClick(t), i
            }
            function d(t, e) {
              var i = 'data-clipboard-' + t
              if (e.hasAttribute(i)) return e.getAttribute(i)
            }
            t.exports = c
          },
          function (t, e, i) {
            'use strict'
            var n =
                'function' == typeof Symbol && 'symbol' == typeof Symbol.iterator
                  ? function (t) {
                      return typeof t
                    }
                  : function (t) {
                      return t && 'function' == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? 'symbol' : typeof t
                    },
              o = i(2),
              r = o && o.__esModule ? o : { default: o }
            function s(t, e) {
              for (var i = 0; i < e.length; i++) {
                var n = e[i]
                ;(n.enumerable = n.enumerable || !1), (n.configurable = !0), 'value' in n && (n.writable = !0), Object.defineProperty(t, n.key, n)
              }
            }
            var a =
              ((function (t, e, i) {
                e && s(t.prototype, e), i && s(t, i)
              })(l, [
                {
                  key: 'resolveOptions',
                  value: function () {
                    var t = 0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : {}
                    ;(this.action = t.action),
                      (this.container = t.container),
                      (this.emitter = t.emitter),
                      (this.target = t.target),
                      (this.text = t.text),
                      (this.trigger = t.trigger),
                      (this.selectedText = '')
                  }
                },
                {
                  key: 'initSelection',
                  value: function () {
                    this.text ? this.selectFake() : this.target && this.selectTarget()
                  }
                },
                {
                  key: 'selectFake',
                  value: function () {
                    var t = this,
                      e = 'rtl' == document.documentElement.getAttribute('dir')
                    this.removeFake(),
                      (this.fakeHandlerCallback = function () {
                        return t.removeFake()
                      }),
                      (this.fakeHandler = this.container.addEventListener('click', this.fakeHandlerCallback) || !0),
                      (this.fakeElem = document.createElement('textarea')),
                      (this.fakeElem.style.fontSize = '12pt'),
                      (this.fakeElem.style.border = '0'),
                      (this.fakeElem.style.padding = '0'),
                      (this.fakeElem.style.margin = '0'),
                      (this.fakeElem.style.position = 'absolute'),
                      (this.fakeElem.style[e ? 'right' : 'left'] = '-9999px')
                    var i = window.pageYOffset || document.documentElement.scrollTop
                    ;(this.fakeElem.style.top = i + 'px'),
                      this.fakeElem.setAttribute('readonly', ''),
                      (this.fakeElem.value = this.text),
                      this.container.appendChild(this.fakeElem),
                      (this.selectedText = (0, r.default)(this.fakeElem)),
                      this.copyText()
                  }
                },
                {
                  key: 'removeFake',
                  value: function () {
                    this.fakeHandler && (this.container.removeEventListener('click', this.fakeHandlerCallback), (this.fakeHandler = null), (this.fakeHandlerCallback = null)),
                      this.fakeElem && (this.container.removeChild(this.fakeElem), (this.fakeElem = null))
                  }
                },
                {
                  key: 'selectTarget',
                  value: function () {
                    ;(this.selectedText = (0, r.default)(this.target)), this.copyText()
                  }
                },
                {
                  key: 'copyText',
                  value: function () {
                    var t = void 0
                    try {
                      t = document.execCommand(this.action)
                    } catch (e) {
                      t = !1
                    }
                    this.handleResult(t)
                  }
                },
                {
                  key: 'handleResult',
                  value: function (t) {
                    this.emitter.emit(t ? 'success' : 'error', {
                      action: this.action,
                      text: this.selectedText,
                      trigger: this.trigger,
                      clearSelection: this.clearSelection.bind(this)
                    })
                  }
                },
                {
                  key: 'clearSelection',
                  value: function () {
                    this.trigger && this.trigger.focus(), window.getSelection().removeAllRanges()
                  }
                },
                {
                  key: 'destroy',
                  value: function () {
                    this.removeFake()
                  }
                },
                {
                  key: 'action',
                  set: function () {
                    var t = 0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : 'copy'
                    if (((this._action = t), 'copy' !== this._action && 'cut' !== this._action)) throw new Error('Invalid "action" value, use either "copy" or "cut"')
                  },
                  get: function () {
                    return this._action
                  }
                },
                {
                  key: 'target',
                  set: function (t) {
                    if (void 0 !== t) {
                      if (!t || 'object' !== (void 0 === t ? 'undefined' : n(t)) || 1 !== t.nodeType) throw new Error('Invalid "target" value, use a valid Element')
                      if ('copy' === this.action && t.hasAttribute('disabled')) throw new Error('Invalid "target" attribute. Please use "readonly" instead of "disabled" attribute')
                      if ('cut' === this.action && (t.hasAttribute('readonly') || t.hasAttribute('disabled')))
                        throw new Error('Invalid "target" attribute. You can\'t cut text from elements with "readonly" or "disabled" attributes')
                      this._target = t
                    }
                  },
                  get: function () {
                    return this._target
                  }
                }
              ]),
              l)
            function l(t) {
              !(function (t) {
                if (!(t instanceof l)) throw new TypeError('Cannot call a class as a function')
              })(this),
                this.resolveOptions(t),
                this.initSelection()
            }
            t.exports = a
          },
          function (t, e) {
            t.exports = function (t) {
              var e, i, n
              return 'SELECT' === t.nodeName
                ? (t.focus(), t.value)
                : 'INPUT' === t.nodeName || 'TEXTAREA' === t.nodeName
                ? ((e = t.hasAttribute('readonly')) || t.setAttribute('readonly', ''),
                  t.select(),
                  t.setSelectionRange(0, t.value.length),
                  e || t.removeAttribute('readonly'),
                  t.value)
                : (t.hasAttribute('contenteditable') && t.focus(),
                  (i = window.getSelection()),
                  (n = document.createRange()).selectNodeContents(t),
                  i.removeAllRanges(),
                  i.addRange(n),
                  i.toString())
            }
          },
          function (t, e) {
            function i() {}
            ;(i.prototype = {
              on: function (t, e, i) {
                var n = this.e || (this.e = {})
                return (n[t] || (n[t] = [])).push({ fn: e, ctx: i }), this
              },
              once: function (t, e, i) {
                var n = this
                function o() {
                  n.off(t, o), e.apply(i, arguments)
                }
                return (o._ = e), this.on(t, o, i)
              },
              emit: function (t) {
                for (var e = [].slice.call(arguments, 1), i = ((this.e || (this.e = {}))[t] || []).slice(), n = 0, o = i.length; n < o; n++) i[n].fn.apply(i[n].ctx, e)
                return this
              },
              off: function (t, e) {
                var i = this.e || (this.e = {}),
                  n = i[t],
                  o = []
                if (n && e) for (var r = 0, s = n.length; r < s; r++) n[r].fn !== e && n[r].fn._ !== e && o.push(n[r])
                return o.length ? (i[t] = o) : delete i[t], this
              }
            }),
              (t.exports = i)
          },
          function (t, e, i) {
            var n = i(5),
              o = i(6)
            t.exports = function (t, e, i) {
              if (!t && !e && !i) throw new Error('Missing required arguments')
              if (!n.string(e)) throw new TypeError('Second argument must be a String')
              if (!n.fn(i)) throw new TypeError('Third argument must be a Function')
              if (n.node(t))
                return (
                  (c = e),
                  (u = i),
                  (l = t).addEventListener(c, u),
                  {
                    destroy: function () {
                      l.removeEventListener(c, u)
                    }
                  }
                )
              if (n.nodeList(t))
                return (
                  (r = t),
                  (s = e),
                  (a = i),
                  Array.prototype.forEach.call(r, function (t) {
                    t.addEventListener(s, a)
                  }),
                  {
                    destroy: function () {
                      Array.prototype.forEach.call(r, function (t) {
                        t.removeEventListener(s, a)
                      })
                    }
                  }
                )
              if (n.string(t)) return o(document.body, t, e, i)
              throw new TypeError('First argument must be a String, HTMLElement, HTMLCollection, or NodeList')
              var r, s, a, l, c, u
            }
          },
          function (t, e) {
            ;(e.node = function (t) {
              return void 0 !== t && t instanceof HTMLElement && 1 === t.nodeType
            }),
              (e.nodeList = function (t) {
                var i = Object.prototype.toString.call(t)
                return void 0 !== t && ('[object NodeList]' === i || '[object HTMLCollection]' === i) && 'length' in t && (0 === t.length || e.node(t[0]))
              }),
              (e.string = function (t) {
                return 'string' == typeof t || t instanceof String
              }),
              (e.fn = function (t) {
                return '[object Function]' === Object.prototype.toString.call(t)
              })
          },
          function (t, e, i) {
            var n = i(7)
            function o(t, e, i, o, r) {
              var s = function (t, e, i, o) {
                return function (i) {
                  ;(i.delegateTarget = n(i.target, e)), i.delegateTarget && o.call(t, i)
                }
              }.apply(this, arguments)
              return (
                t.addEventListener(i, s, r),
                {
                  destroy: function () {
                    t.removeEventListener(i, s, r)
                  }
                }
              )
            }
            t.exports = function (t, e, i, n, r) {
              return 'function' == typeof t.addEventListener
                ? o.apply(null, arguments)
                : 'function' == typeof i
                ? o.bind(null, document).apply(null, arguments)
                : ('string' == typeof t && (t = document.querySelectorAll(t)),
                  Array.prototype.map.call(t, function (t) {
                    return o(t, e, i, n, r)
                  }))
            }
          },
          function (t, e) {
            var i
            'undefined' == typeof Element ||
              Element.prototype.matches ||
              ((i = Element.prototype).matches = i.matchesSelector || i.mozMatchesSelector || i.msMatchesSelector || i.oMatchesSelector || i.webkitMatchesSelector),
              (t.exports = function (t, e) {
                for (; t && 9 !== t.nodeType; ) {
                  if ('function' == typeof t.matches && t.matches(e)) return t
                  t = t.parentNode
                }
              })
          }
        ]),
      (t.c = i),
      (t.d = function (e, i, n) {
        t.o(e, i) || Object.defineProperty(e, i, { enumerable: !0, get: n })
      }),
      (t.r = function (t) {
        'undefined' != typeof Symbol && Symbol.toStringTag && Object.defineProperty(t, Symbol.toStringTag, { value: 'Module' }),
          Object.defineProperty(t, '__esModule', { value: !0 })
      }),
      (t.t = function (e, i) {
        if ((1 & i && (e = t(e)), 8 & i)) return e
        if (4 & i && 'object' == typeof e && e && e.__esModule) return e
        var n = Object.create(null)
        if ((t.r(n), Object.defineProperty(n, 'default', { enumerable: !0, value: e }), 2 & i && 'string' != typeof e))
          for (var o in e)
            t.d(
              n,
              o,
              function (t) {
                return e[t]
              }.bind(null, o)
            )
        return n
      }),
      (t.n = function (e) {
        var i =
          e && e.__esModule
            ? function () {
                return e.default
              }
            : function () {
                return e
              }
        return t.d(i, 'a', i), i
      }),
      (t.o = function (t, e) {
        return Object.prototype.hasOwnProperty.call(t, e)
      }),
      (t.p = ''),
      t((t.s = 0))
    )
    function t(n) {
      if (i[n]) return i[n].exports
      var o = (i[n] = { i: n, l: !1, exports: {} })
      return e[n].call(o.exports, o, o.exports, t), (o.l = !0), o.exports
    }
    var e, i
  })
var _self = 'undefined' != typeof window ? window : 'undefined' != typeof WorkerGlobalScope && self instanceof WorkerGlobalScope ? self : {},
  Prism = (function (t) {
    var e = /\blang(?:uage)?-([\w-]+)\b/i,
      i = 0,
      n = {
        manual: t.Prism && t.Prism.manual,
        disableWorkerMessageHandler: t.Prism && t.Prism.disableWorkerMessageHandler,
        util: {
          encode: function (t) {
            return t instanceof o
              ? new o(t.type, n.util.encode(t.content), t.alias)
              : Array.isArray(t)
              ? t.map(n.util.encode)
              : t
                  .replace(/&/g, '&amp;')
                  .replace(/</g, '&lt;')
                  .replace(/\u00a0/g, ' ')
          },
          type: function (t) {
            return Object.prototype.toString.call(t).slice(8, -1)
          },
          objId: function (t) {
            return t.__id || Object.defineProperty(t, '__id', { value: ++i }), t.__id
          },
          clone: function t(e, i) {
            var o,
              r,
              s = n.util.type(e)
            switch (((i = i || {}), s)) {
              case 'Object':
                if (((r = n.util.objId(e)), i[r])) return i[r]
                for (var a in ((o = {}), (i[r] = o), e)) e.hasOwnProperty(a) && (o[a] = t(e[a], i))
                return o
              case 'Array':
                return (
                  (r = n.util.objId(e)),
                  i[r]
                    ? i[r]
                    : ((o = []),
                      (i[r] = o),
                      e.forEach(function (e, n) {
                        o[n] = t(e, i)
                      }),
                      o)
                )
              default:
                return e
            }
          }
        },
        languages: {
          extend: function (t, e) {
            var i = n.util.clone(n.languages[t])
            for (var o in e) i[o] = e[o]
            return i
          },
          insertBefore: function (t, e, i, o) {
            var r = (o = o || n.languages)[t],
              s = {}
            for (var a in r)
              if (r.hasOwnProperty(a)) {
                if (a == e) for (var l in i) i.hasOwnProperty(l) && (s[l] = i[l])
                i.hasOwnProperty(a) || (s[a] = r[a])
              }
            var c = o[t]
            return (
              (o[t] = s),
              n.languages.DFS(n.languages, function (e, i) {
                i === c && e != t && (this[e] = s)
              }),
              s
            )
          },
          DFS: function t(e, i, o, r) {
            r = r || {}
            var s,
              a,
              l = n.util.objId
            for (var c in e)
              e.hasOwnProperty(c) &&
                (i.call(e, c, e[c], o || c),
                (s = e[c]),
                'Object' !== (a = n.util.type(s)) || r[l(s)] ? 'Array' !== a || r[l(s)] || ((r[l(s)] = !0), t(s, i, c, r)) : ((r[l(s)] = !0), t(s, i, null, r)))
          }
        },
        plugins: {},
        highlightAll: function (t, e) {
          n.highlightAllUnder(document, t, e)
        },
        highlightAllUnder: function (t, e, i) {
          var o = { callback: i, selector: 'code[class*="language-"], [class*="language-"] code, code[class*="lang-"], [class*="lang-"] code' }
          n.hooks.run('before-highlightall', o)
          for (var r, s = o.elements || t.querySelectorAll(o.selector), a = 0; (r = s[a++]); ) n.highlightElement(r, !0 === e, o.callback)
        },
        highlightElement: function (i, o, r) {
          for (var s, a = 'none', l = i; l && !e.test(l.className); ) l = l.parentNode
          function c(t) {
            ;(d.highlightedCode = t),
              n.hooks.run('before-insert', d),
              (d.element.innerHTML = d.highlightedCode),
              n.hooks.run('after-highlight', d),
              n.hooks.run('complete', d),
              r && r.call(d.element)
          }
          l && ((a = (l.className.match(e) || [, 'none'])[1].toLowerCase()), (s = n.languages[a])),
            (i.className = i.className.replace(e, '').replace(/\s+/g, ' ') + ' language-' + a),
            i.parentNode && ((l = i.parentNode), /pre/i.test(l.nodeName) && (l.className = l.className.replace(e, '').replace(/\s+/g, ' ') + ' language-' + a))
          var u,
            d = { element: i, language: a, grammar: s, code: i.textContent }
          n.hooks.run('before-sanity-check', d),
            d.code
              ? (n.hooks.run('before-highlight', d),
                d.grammar
                  ? o && t.Worker
                    ? (((u = new Worker(n.filename)).onmessage = function (t) {
                        c(t.data)
                      }),
                      u.postMessage(JSON.stringify({ language: d.language, code: d.code, immediateClose: !0 })))
                    : c(n.highlight(d.code, d.grammar, d.language))
                  : c(n.util.encode(d.code)))
              : n.hooks.run('complete', d)
        },
        highlight: function (t, e, i) {
          var r = { code: t, grammar: e, language: i }
          return n.hooks.run('before-tokenize', r), (r.tokens = n.tokenize(r.code, r.grammar)), n.hooks.run('after-tokenize', r), o.stringify(n.util.encode(r.tokens), r.language)
        },
        matchGrammar: function (t, e, i, r, s, a, l) {
          for (var c in i)
            if (i.hasOwnProperty(c) && i[c]) {
              if (c == l) return
              for (var u = i[c], d = ((u = 'Array' === n.util.type(u) ? u : [u]), 0); d < u.length; ++d) {
                var h,
                  f = u[d],
                  p = f.inside,
                  g = !!f.lookbehind,
                  m = !!f.greedy,
                  v = 0,
                  y = f.alias
                m && !f.pattern.global && ((h = f.pattern.toString().match(/[imuy]*$/)[0]), (f.pattern = RegExp(f.pattern.source, h + 'g'))), (f = f.pattern || f)
                for (var b = r, _ = s; b < e.length; _ += e[b].length, ++b) {
                  var w = e[b]
                  if (e.length > t.length) return
                  if (!(w instanceof o)) {
                    if (m && b != e.length - 1) {
                      if (((f.lastIndex = _), !(E = f.exec(t)))) break
                      for (
                        var x = E.index + (g ? E[1].length : 0), C = E.index + E[0].length, k = b, T = _, S = e.length;
                        k < S && (T < C || (!e[k].type && !e[k - 1].greedy));
                        ++k
                      )
                        (T += e[k].length) <= x && (++b, (_ = T))
                      if (e[b] instanceof o) continue
                      ;(I = k - b), (w = t.slice(_, T)), (E.index -= _)
                    } else {
                      f.lastIndex = 0
                      var E = f.exec(w),
                        I = 1
                    }
                    if (E) {
                      g && (v = E[1] ? E[1].length : 0), (C = (x = E.index + v) + (E = E[0].slice(v)).length)
                      var A = w.slice(0, x),
                        D = w.slice(C),
                        O = [b, I]
                      A && (++b, (_ += A.length), O.push(A))
                      var M = new o(c, p ? n.tokenize(E, p) : E, y, E, m)
                      if ((O.push(M), D && O.push(D), Array.prototype.splice.apply(e, O), 1 != I && n.matchGrammar(t, e, i, b, _, !0, c), a)) break
                    } else if (a) break
                  }
                }
              }
            }
        },
        tokenize: function (t, e) {
          var i = [t],
            o = e.rest
          if (o) {
            for (var r in o) e[r] = o[r]
            delete e.rest
          }
          return n.matchGrammar(t, i, e, 0, 0, !1), i
        },
        hooks: {
          all: {},
          add: function (t, e) {
            var i = n.hooks.all
            ;(i[t] = i[t] || []), i[t].push(e)
          },
          run: function (t, e) {
            var i = n.hooks.all[t]
            if (i && i.length) for (var o, r = 0; (o = i[r++]); ) o(e)
          }
        },
        Token: o
      }
    function o(t, e, i, n, o) {
      ;(this.type = t), (this.content = e), (this.alias = i), (this.length = 0 | (n || '').length), (this.greedy = !!o)
    }
    if (
      ((t.Prism = n),
      (o.stringify = function (t, e) {
        if ('string' == typeof t) return t
        if (Array.isArray(t))
          return t
            .map(function (t) {
              return o.stringify(t, e)
            })
            .join('')
        var i,
          r = { type: t.type, content: o.stringify(t.content, e), tag: 'span', classes: ['token', t.type], attributes: {}, language: e }
        t.alias && ((i = Array.isArray(t.alias) ? t.alias : [t.alias]), Array.prototype.push.apply(r.classes, i)), n.hooks.run('wrap', r)
        var s = Object.keys(r.attributes)
          .map(function (t) {
            return t + '="' + (r.attributes[t] || '').replace(/"/g, '&quot;') + '"'
          })
          .join(' ')
        return '<' + r.tag + ' class="' + r.classes.join(' ') + '"' + (s ? ' ' + s : '') + '>' + r.content + '</' + r.tag + '>'
      }),
      !t.document)
    )
      return (
        t.addEventListener &&
          (n.disableWorkerMessageHandler ||
            t.addEventListener(
              'message',
              function (e) {
                var i = JSON.parse(e.data),
                  o = i.language,
                  r = i.code,
                  s = i.immediateClose
                t.postMessage(n.highlight(r, n.languages[o], o)), s && t.close()
              },
              !1
            )),
        n
      )
    var r = document.currentScript || [].slice.call(document.getElementsByTagName('script')).pop()
    return (
      r &&
        ((n.filename = r.src),
        n.manual ||
          r.hasAttribute('data-manual') ||
          ('loading' !== document.readyState
            ? window.requestAnimationFrame
              ? window.requestAnimationFrame(n.highlightAll)
              : window.setTimeout(n.highlightAll, 16)
            : document.addEventListener('DOMContentLoaded', n.highlightAll))),
      n
    )
  })(_self)
'undefined' != typeof module && module.exports && (module.exports = Prism),
  'undefined' != typeof global && (global.Prism = Prism),
  (Prism.languages.markup = {
    comment: /<!--[\s\S]*?-->/,
    prolog: /<\?[\s\S]+?\?>/,
    doctype: /<!DOCTYPE[\s\S]+?>/i,
    cdata: /<!\[CDATA\[[\s\S]*?]]>/i,
    tag: {
      pattern: /<\/?(?!\d)[^\s>\/=$<%]+(?:\s(?:\s*[^\s>\/=]+(?:\s*=\s*(?:"[^"]*"|'[^']*'|[^\s'">=]+(?=[\s>]))|(?=[\s/>])))+)?\s*\/?>/i,
      greedy: !0,
      inside: {
        tag: { pattern: /^<\/?[^\s>\/]+/i, inside: { punctuation: /^<\/?/, namespace: /^[^\s>\/:]+:/ } },
        'attr-value': { pattern: /=\s*(?:"[^"]*"|'[^']*'|[^\s'">=]+)/i, inside: { punctuation: [/^=/, { pattern: /^(\s*)["']|["']$/, lookbehind: !0 }] } },
        punctuation: /\/?>/,
        'attr-name': { pattern: /[^\s>\/]+/, inside: { namespace: /^[^\s>\/:]+:/ } }
      }
    },
    entity: /&#?[\da-z]{1,8};/i
  }),
  (Prism.languages.markup.tag.inside['attr-value'].inside.entity = Prism.languages.markup.entity),
  Prism.hooks.add('wrap', function (t) {
    'entity' === t.type && (t.attributes.title = t.content.replace(/&amp;/, '&'))
  }),
  Object.defineProperty(Prism.languages.markup.tag, 'addInlined', {
    value: function (t, e) {
      var i = {}
      ;(i['language-' + e] = { pattern: /(^<!\[CDATA\[)[\s\S]+?(?=\]\]>$)/i, lookbehind: !0, inside: Prism.languages[e] }), (i.cdata = /^<!\[CDATA\[|\]\]>$/i)
      var n = { 'included-cdata': { pattern: /<!\[CDATA\[[\s\S]*?\]\]>/i, inside: i } }
      n['language-' + e] = { pattern: /[\s\S]+/, inside: Prism.languages[e] }
      var o = {}
      ;(o[t] = { pattern: RegExp('(<__[\\s\\S]*?>)(?:<!\\[CDATA\\[[\\s\\S]*?\\]\\]>\\s*|[\\s\\S])*?(?=<\\/__>)'.replace(/__/g, t), 'i'), lookbehind: !0, greedy: !0, inside: n }),
        Prism.languages.insertBefore('markup', 'cdata', o)
    }
  }),
  (Prism.languages.xml = Prism.languages.extend('markup', {})),
  (Prism.languages.html = Prism.languages.markup),
  (Prism.languages.mathml = Prism.languages.markup),
  (Prism.languages.svg = Prism.languages.markup),
  (function (t) {
    var e = /("|')(?:\\(?:\r\n|[\s\S])|(?!\1)[^\\\r\n])*\1/
    ;(t.languages.css = {
      comment: /\/\*[\s\S]*?\*\//,
      atrule: { pattern: /@[\w-]+[\s\S]*?(?:;|(?=\s*\{))/, inside: { rule: /@[\w-]+/ } },
      url: { pattern: RegExp('url\\((?:' + e.source + '|[^\n\r()]*)\\)', 'i'), inside: { function: /^url/i, punctuation: /^\(|\)$/ } },
      selector: RegExp('[^{}\\s](?:[^{};"\']|' + e.source + ')*?(?=\\s*\\{)'),
      string: { pattern: e, greedy: !0 },
      property: /[-_a-z\xA0-\uFFFF][-\w\xA0-\uFFFF]*(?=\s*:)/i,
      important: /!important\b/i,
      function: /[-a-z0-9]+(?=\()/i,
      punctuation: /[(){};:,]/
    }),
      (t.languages.css.atrule.inside.rest = t.languages.css)
    var i = t.languages.markup
    i &&
      (i.tag.addInlined('style', 'css'),
      t.languages.insertBefore(
        'inside',
        'attr-value',
        {
          'style-attr': {
            pattern: /\s*style=("|')(?:\\[\s\S]|(?!\1)[^\\])*\1/i,
            inside: {
              'attr-name': { pattern: /^\s*style/i, inside: i.tag.inside },
              punctuation: /^\s*=\s*['"]|['"]\s*$/,
              'attr-value': { pattern: /.+/i, inside: t.languages.css }
            },
            alias: 'language-css'
          }
        },
        i.tag
      ))
  })(Prism),
  (Prism.languages.clike = {
    comment: [
      { pattern: /(^|[^\\])\/\*[\s\S]*?(?:\*\/|$)/, lookbehind: !0 },
      { pattern: /(^|[^\\:])\/\/.*/, lookbehind: !0, greedy: !0 }
    ],
    string: { pattern: /(["'])(?:\\(?:\r\n|[\s\S])|(?!\1)[^\\\r\n])*\1/, greedy: !0 },
    'class-name': { pattern: /((?:\b(?:class|interface|extends|implements|trait|instanceof|new)\s+)|(?:catch\s+\())[\w.\\]+/i, lookbehind: !0, inside: { punctuation: /[.\\]/ } },
    keyword: /\b(?:if|else|while|do|for|return|in|instanceof|function|new|try|throw|catch|finally|null|break|continue)\b/,
    boolean: /\b(?:true|false)\b/,
    function: /\w+(?=\()/,
    number: /\b0x[\da-f]+\b|(?:\b\d+\.?\d*|\B\.\d+)(?:e[+-]?\d+)?/i,
    operator: /--?|\+\+?|!=?=?|<=?|>=?|==?=?|&&?|\|\|?|\?|\*|\/|~|\^|%/,
    punctuation: /[{}[\];(),.:]/
  }),
  (Prism.languages.javascript = Prism.languages.extend('clike', {
    'class-name': [Prism.languages.clike['class-name'], { pattern: /(^|[^$\w\xA0-\uFFFF])[_$A-Z\xA0-\uFFFF][$\w\xA0-\uFFFF]*(?=\.(?:prototype|constructor))/, lookbehind: !0 }],
    keyword: [
      { pattern: /((?:^|})\s*)(?:catch|finally)\b/, lookbehind: !0 },
      {
        pattern:
          /(^|[^.])\b(?:as|async(?=\s*(?:function\b|\(|[$\w\xA0-\uFFFF]|$))|await|break|case|class|const|continue|debugger|default|delete|do|else|enum|export|extends|for|from|function|get|if|implements|import|in|instanceof|interface|let|new|null|of|package|private|protected|public|return|set|static|super|switch|this|throw|try|typeof|undefined|var|void|while|with|yield)\b/,
        lookbehind: !0
      }
    ],
    number:
      /\b(?:(?:0[xX](?:[\dA-Fa-f](?:_[\dA-Fa-f])?)+|0[bB](?:[01](?:_[01])?)+|0[oO](?:[0-7](?:_[0-7])?)+)n?|(?:\d(?:_\d)?)+n|NaN|Infinity)\b|(?:\b(?:\d(?:_\d)?)+\.?(?:\d(?:_\d)?)*|\B\.(?:\d(?:_\d)?)+)(?:[Ee][+-]?(?:\d(?:_\d)?)+)?/,
    function: /[_$a-zA-Z\xA0-\uFFFF][$\w\xA0-\uFFFF]*(?=\s*(?:\.\s*(?:apply|bind|call)\s*)?\()/,
    operator: /-[-=]?|\+[+=]?|!=?=?|<<?=?|>>?>?=?|=(?:==?|>)?|&[&=]?|\|[|=]?|\*\*?=?|\/=?|~|\^=?|%=?|\?|\.{3}/
  })),
  (Prism.languages.javascript['class-name'][0].pattern = /(\b(?:class|interface|extends|implements|instanceof|new)\s+)[\w.\\]+/),
  Prism.languages.insertBefore('javascript', 'keyword', {
    regex: { pattern: /((?:^|[^$\w\xA0-\uFFFF."'\])\s])\s*)\/(\[(?:[^\]\\\r\n]|\\.)*]|\\.|[^/\\\[\r\n])+\/[gimyus]{0,6}(?=\s*($|[\r\n,.;})\]]))/, lookbehind: !0, greedy: !0 },
    'function-variable': {
      pattern: /[_$a-zA-Z\xA0-\uFFFF][$\w\xA0-\uFFFF]*(?=\s*[=:]\s*(?:async\s*)?(?:\bfunction\b|(?:\((?:[^()]|\([^()]*\))*\)|[_$a-zA-Z\xA0-\uFFFF][$\w\xA0-\uFFFF]*)\s*=>))/,
      alias: 'function'
    },
    parameter: [
      { pattern: /(function(?:\s+[_$A-Za-z\xA0-\uFFFF][$\w\xA0-\uFFFF]*)?\s*\(\s*)(?!\s)(?:[^()]|\([^()]*\))+?(?=\s*\))/, lookbehind: !0, inside: Prism.languages.javascript },
      { pattern: /[_$a-z\xA0-\uFFFF][$\w\xA0-\uFFFF]*(?=\s*=>)/i, inside: Prism.languages.javascript },
      { pattern: /(\(\s*)(?!\s)(?:[^()]|\([^()]*\))+?(?=\s*\)\s*=>)/, lookbehind: !0, inside: Prism.languages.javascript },
      {
        pattern:
          /((?:\b|\s|^)(?!(?:as|async|await|break|case|catch|class|const|continue|debugger|default|delete|do|else|enum|export|extends|finally|for|from|function|get|if|implements|import|in|instanceof|interface|let|new|null|of|package|private|protected|public|return|set|static|super|switch|this|throw|try|typeof|undefined|var|void|while|with|yield)(?![$\w\xA0-\uFFFF]))(?:[_$A-Za-z\xA0-\uFFFF][$\w\xA0-\uFFFF]*\s*)\(\s*)(?!\s)(?:[^()]|\([^()]*\))+?(?=\s*\)\s*\{)/,
        lookbehind: !0,
        inside: Prism.languages.javascript
      }
    ],
    constant: /\b[A-Z](?:[A-Z_]|\dx?)*\b/
  }),
  Prism.languages.insertBefore('javascript', 'string', {
    'template-string': {
      pattern: /`(?:\\[\s\S]|\${(?:[^{}]|{(?:[^{}]|{[^}]*})*})+}|[^\\`])*`/,
      greedy: !0,
      inside: {
        interpolation: {
          pattern: /\${(?:[^{}]|{(?:[^{}]|{[^}]*})*})+}/,
          inside: { 'interpolation-punctuation': { pattern: /^\${|}$/, alias: 'punctuation' }, rest: Prism.languages.javascript }
        },
        string: /[\s\S]+/
      }
    }
  }),
  Prism.languages.markup && Prism.languages.markup.tag.addInlined('script', 'javascript'),
  (Prism.languages.js = Prism.languages.javascript),
  (function (t) {
    'use strict'
    t('.switcher-setting').on('click', function () {
      t('#style-switcher').hasClass('active') ? t('#style-switcher').removeClass('active') : (t('#style-switcher').removeClass('active'), t('#style-switcher').addClass('active'))
    }),
      t('.boxed,.pattren-wrap a').on('click', function () {
        t('.main-wrapper').addClass('wrapper-boxed'), t('.main-wrapper').removeClass('wrapper-wide'), t(window).resize()
      }),
      t('.wide').on('click', function () {
        t('.main-wrapper').addClass('wrapper-wide'), t('.main-wrapper').removeClass('wrapper-boxed'), t(window).resize()
      }),
      t('.bg-list li a').on('click', function () {
        var e = t(this).css('backgroundImage')
        t('body').css('backgroundImage', e), t(window).resize()
      }),
      t('.style1').on('click', function () {
        return (
          t('#colors').attr('href', 'css/styles.css'),
          t('#logo').attr('src', 'img/logos/logo-color-01.png'),
          t('.header-style6 #logo').attr('src', 'img/logos/logo-white.png'),
          t(window).on('scroll', function () {
            t(window).scrollTop(), t('.navbar-brand img').attr('src', 'img/logos/logo-color-01.png'), t('.header-style6 #logo').attr('src', 'img/logos/logo-white.png')
          }),
          !1
        )
      }),
      t('.style2').on('click', function () {
        return (
          t('#colors').attr('href', 'css/styles-2.css'),
          t('#logo').attr('src', 'img/logos/logo-color-02.png'),
          t('.header-style6 #logo').attr('src', 'img/logos/logo-white.png'),
          t(window).on('scroll', function () {
            t(window).scrollTop(), t('.navbar-brand img').attr('src', 'img/logos/logo-color-02.png'), t('.header-style6 #logo').attr('src', 'img/logos/logo-white.png')
          }),
          !1
        )
      }),
      t('.style3').on('click', function () {
        return (
          t('#colors').attr('href', 'css/styles-3.css'),
          t('#logo').attr('src', 'img/logos/logo-color-03.png'),
          t('.header-style6 #logo').attr('src', 'img/logos/logo-white.png'),
          t(window).on('scroll', function () {
            t(window).scrollTop(), t('.navbar-brand img').attr('src', 'img/logos/logo-color-03.png'), t('.header-style6 #logo').attr('src', 'img/logos/logo-white.png')
          }),
          !1
        )
      }),
      t('.style4').on('click', function () {
        return (
          t('#colors').attr('href', 'css/styles-4.css'),
          t('#logo').attr('src', 'img/logos/logo-color-04.png'),
          t('.header-style6 #logo').attr('src', 'img/logos/logo-white.png'),
          t(window).on('scroll', function () {
            t(window).scrollTop(), t('.navbar-brand img').attr('src', 'img/logos/logo-color-04.png'), t('.header-style6 #logo').attr('src', 'img/logos/logo-white.png')
          }),
          !1
        )
      }),
      t('.style5').on('click', function () {
        return (
          t('#colors').attr('href', 'css/styles-5.css'),
          t('#logo').attr('src', 'img/logos/logo-color-05.png'),
          t('.header-style6 #logo').attr('src', 'img/logos/logo-white.png'),
          t(window).on('scroll', function () {
            t(window).scrollTop(), t('.navbar-brand img').attr('src', 'img/logos/logo-color-05.png'), t('.header-style6 #logo').attr('src', 'img/logos/logo-white.png')
          }),
          !1
        )
      }),
      t('.style6').on('click', function () {
        return (
          t('#colors').attr('href', 'css/styles-6.css'),
          t('#logo').attr('src', 'img/logos/logo-color-06.png'),
          t('.header-style6 #logo').attr('src', 'img/logos/logo-white.png'),
          t(window).on('scroll', function () {
            t(window).scrollTop(), t('.navbar-brand img').attr('src', 'img/logos/logo-color-06.png'), t('.header-style6 #logo').attr('src', 'img/logos/logo-white.png')
          }),
          !1
        )
      }),
      t('.style7').on('click', function () {
        return (
          t('#colors').attr('href', 'css/styles-7.css'),
          t('#logo').attr('src', 'img/logos/logo-color-07.png'),
          t('.header-style6 #logo').attr('src', 'img/logos/logo-white.png'),
          t(window).on('scroll', function () {
            t(window).scrollTop(), t('.navbar-brand img').attr('src', 'img/logos/logo-color-07.png'), t('.header-style6 #logo').attr('src', 'img/logos/logo-white.png')
          }),
          !1
        )
      }),
      t('.style8').on('click', function () {
        return (
          t('#colors').attr('href', 'css/styles-8.css'),
          t('#logo').attr('src', 'img/logos/logo-color-08.png'),
          t('.header-style6 #logo').attr('src', 'img/logos/logo-white.png'),
          t(window).on('scroll', function () {
            t(window).scrollTop(), t('.navbar-brand img').attr('src', 'img/logos/logo-color-08.png'), t('.header-style6 #logo').attr('src', 'img/logos/logo-white.png')
          }),
          !1
        )
      })
  })(jQuery),
  (function (t) {
    'use strict'
    var e = t(window)
    function i() {
      var i, n
      ;(i = t('.full-screen')),
        (n = e.height()),
        i.css('min-height', n),
        (function () {
          var i = t('header').height(),
            n = t('.screen-height'),
            o = e.height() - i
          n.css('height', o)
        })()
    }
    t('#preloader').fadeOut('normall', function () {
      t(this).remove()
    }),
      e.on('scroll', function () {
        t(this).scrollTop() > 500 ? t('.scroll-to-top').fadeIn(400) : t('.scroll-to-top').fadeOut(400)
      }),
      t('.scroll-to-top').on('click', function (e) {
        e.preventDefault(), t('html, body').animate({ scrollTop: 0 }, 600)
      }),
      t('.parallax,.bg-img').each(function (e) {
        t(this).attr('data-background') && t(this).css('background-image', 'url(' + t(this).data('background') + ')')
      }),
      t('.story-video,.about-video').magnificPopup({ delegate: '.video', type: 'iframe' }),
      t('.popup-youtube').magnificPopup({ disableOn: 700, type: 'iframe', mainClass: 'mfp-fade', removalDelay: 160, preloader: !1, fixedContentPos: !1 }),
      0 !== t('.copy-clipboard').length &&
        (new ClipboardJS('.copy-clipboard'),
        t('.copy-clipboard').on('click', function () {
          var e = t(this)
          e.text()
          e.text('Copied'),
            setTimeout(function () {
              e.text('Copy')
            }, 2e3)
        })),
      t('.source-modal').magnificPopup({ type: 'inline', mainClass: 'mfp-fade', removalDelay: 160 }),
      t('#tab1').click(function () {
        t('#second, #third').fadeOut(), t('#first').fadeIn(1e3)
      }),
      t('#tab2').click(function () {
        t('#first, #third').fadeOut(), t('#second').fadeIn(1e3)
      }),
      t('#tab3').click(function () {
        t('#second, #first').fadeOut(), t('#third').fadeIn(1e3)
      }),
      e.resize(function (t) {
        setTimeout(function () {
          i()
        }, 500),
          t.preventDefault()
      }),
      i(),
      t(document).ready(function () {
        if (0 !== t('#chBar').length) {
          var e = document.getElementById('chBar')
          e &&
            new Chart(e, {
              type: 'bar',
              data: {
                labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
                datasets: [
                  {
                    data: [350, 365, 425, 475, 525, 575, 625, 675, 725, 775, 825, 875],
                    backgroundColor: [
                      'rgba(28, 51, 65,0.8)',
                      'rgba(0, 135, 115,0.8)',
                      'rgba(107, 185, 131,0.8)',
                      'rgba(242, 201, 117,0.8)',
                      'rgba(237, 99, 83,0.8)',
                      'rgba(242, 190, 84,0.8)',
                      'rgba(240, 217, 207,0.8)',
                      'rgba(135, 174, 180,0.8)',
                      'rgba(21, 62, 92,0.8)',
                      'rgba(237, 85, 96,0.8)',
                      'rgba(201, 223, 241,0.8)',
                      'rgba(240, 217, 207,0.9)'
                    ]
                  }
                ]
              },
              options: { scales: { xAxes: [{ barPercentage: 0.5, categoryPercentage: 1 }], yAxes: [{ ticks: { beginAtZero: !1 } }] }, legend: { display: !1 } }
            })
        }
        if (0 !== t('#myPieChart').length) {
          var i = document.getElementById('myPieChart').getContext('2d')
          new Chart(i, {
            type: 'pie',
            data: {
              labels: ['Red', 'Blue', 'Yellow', 'Green'],
              datasets: [{ data: [10, 15, 20, 30], backgroundColor: ['rgba(255, 99, 132, 0.8)', 'rgba(54, 162, 235, 0.8)', 'rgba(255, 206, 86, 0.8)', 'rgba(75, 192, 192, 0.8)'] }]
            }
          })
        }
        if (
          (t('.testmonials-style1').owlCarousel({
            loop: !0,
            responsiveClass: !0,
            nav: !0,
            dots: !1,
            autoplay: !0,
            margin: 0,
            navText: ["<i class='fa fa-angle-left'></i>", "<i class='fa fa-angle-right'></i>"],
            responsive: { 0: { items: 1 }, 600: { items: 1 }, 1e3: { items: 1 } }
          }),
          t('.testimonial-style2').owlCarousel({
            loop: !1,
            responsiveClass: !0,
            nav: !1,
            dots: !0,
            autoplay: !0,
            autoplayTimeout: 5e3,
            margin: 0,
            responsive: { 0: { items: 1 }, 768: { items: 1 }, 1e3: { items: 1 } }
          }),
          t('.testimonial-style3').owlCarousel({
            loop: !1,
            responsiveClass: !0,
            nav: !0,
            dots: !1,
            margin: 0,
            navText: ["<i class='fa fa-angle-left'></i>", "<i class='fa fa-angle-right'></i>"],
            responsive: { 0: { items: 1 }, 600: { items: 1 }, 1e3: { items: 1 } }
          }),
          t('.testimonial-style4').owlCarousel({
            loop: !1,
            responsiveClass: !0,
            items: 1,
            nav: !0,
            dots: !0,
            margin: 0,
            navText: ["<i class='fa fa-angle-left'></i>", "<i class='fa fa-angle-right'></i>"],
            responsive: { 0: { items: 1, nav: !1, dots: !1 }, 768: { dots: !1 } }
          }),
          t('.testmonial-style5').owlCarousel({
            loop: !0,
            responsiveClass: !0,
            nav: !0,
            dots: !1,
            navText: ["<i class='fa fa-angle-left'></i>", "<i class='fa fa-angle-right'></i>"],
            responsive: { 0: { items: 1, margin: 10 }, 768: { items: 2, margin: 15 }, 992: { items: 2, margin: 40 } }
          }),
          t('.testmonials-style6 .owl-carousel').owlCarousel({ items: 1, loop: !0, margin: 15, mouseDrag: !1, autoplay: !0, smartSpeed: 500 }),
          t('.testimonial-style7').owlCarousel({
            loop: !0,
            responsiveClass: !0,
            nav: !1,
            dots: !1,
            margin: 0,
            autoplay: !0,
            autoplayTimeout: 3e3,
            responsive: { 0: { items: 1 }, 600: { items: 1 }, 1e3: { items: 1 } }
          }),
          t('.testmonials-style8').owlCarousel({
            loop: !0,
            responsiveClass: !0,
            nav: !0,
            dots: !1,
            navText: ["<i class='fa fa-angle-left'></i>", "<i class='fa fa-angle-right'></i>"],
            responsive: { 0: { items: 1, margin: 10 }, 768: { items: 2, margin: 15 }, 992: { items: 2, margin: 40 } }
          }),
          t('.testimonial-style8').owlCarousel({
            loop: !0,
            responsiveClass: !0,
            nav: !1,
            dots: !1,
            margin: 0,
            autoplay: !0,
            thumbs: !0,
            thumbsPrerendered: !0,
            autoplayTimeout: 5e3,
            smartSpeed: 800,
            responsive: { 0: { items: 1 }, 600: { items: 1 }, 1e3: { items: 1 } }
          }),
          t('.testimonial-style9').owlCarousel({
            loop: !0,
            responsiveClass: !0,
            autoplay: !0,
            autoplayTimeout: 3e3,
            smartSpeed: 500,
            dots: !1,
            nav: !1,
            margin: 0,
            navText: ["<i class='fa fa-angle-left'></i>", "<i class='fa fa-angle-right'></i>"],
            responsive: { 0: { items: 1 }, 768: { items: 2 }, 992: { items: 2 }, 1200: { items: 3 } }
          }),
          t('.testimonial-style10').owlCarousel({
            loop: !1,
            responsiveClass: !0,
            nav: !1,
            dots: !0,
            autoplay: !0,
            autoplayTimeout: 3e3,
            smartSpeed: 500,
            margin: 0,
            navText: ["<i class='fa fa-angle-left'></i>", "<i class='fa fa-angle-right'></i>"],
            responsive: { 0: { items: 1 }, 768: { items: 1 }, 992: { items: 2, margin: 45 }, 1200: { items: 3, margin: 45 } }
          }),
          t('.testimonial-style11').owlCarousel({
            loop: !0,
            responsiveClass: !0,
            autoplay: !0,
            smartSpeed: 900,
            nav: !1,
            dots: !0,
            margin: 0,
            responsive: { 0: { items: 1 }, 768: { items: 1 }, 992: { items: 1 } }
          }),
          t('.testimonial-style12').owlCarousel({
            loop: !0,
            responsiveClass: !0,
            autoplay: !0,
            smartSpeed: 900,
            nav: !1,
            dots: !0,
            margin: 0,
            responsive: { 0: { items: 1 }, 768: { items: 1 }, 992: { items: 1 } }
          }),
          t('.featured-products').owlCarousel({
            loop: !0,
            responsiveClass: !0,
            nav: !1,
            dots: !0,
            autoplay: !0,
            autoplayTimeout: 3e3,
            smartSpeed: 500,
            margin: 0,
            navText: ["<i class='ti-arrow-left'></i>Prev", "Next<i class='ti-arrow-right'></i>"],
            responsive: { 0: { items: 1 }, 481: { items: 2, margin: 15 }, 768: { items: 3, margin: 20 }, 992: { items: 4, margin: 30 }, 1200: { items: 4, margin: 30 } }
          }),
          t('.team .owl-carousel').owlCarousel({
            loop: !0,
            margin: 30,
            dots: !1,
            nav: !1,
            autoplay: !0,
            smartSpeed: 500,
            responsiveClass: !0,
            responsive: { 0: { items: 1, margin: 0 }, 700: { items: 2, margin: 15 }, 1e3: { items: 4 } }
          }),
          t('.team-style5').owlCarousel({ loop: !1, responsiveClass: !0, nav: !1, dots: !0, margin: 30, responsive: { 0: { items: 1 }, 768: { items: 1 }, 992: { items: 2 } } }),
          t('#services-carousel').owlCarousel({
            loop: !0,
            responsiveClass: !0,
            dots: !1,
            nav: !0,
            navText: ["<i class='fa fa-angle-left'></i>", "<i class='fa fa-angle-right'></i>"],
            responsive: { 0: { items: 1, margin: 0 }, 768: { items: 2, margin: 0 }, 992: { items: 3, margin: 0 } }
          }),
          t('.carousel-style1 .owl-carousel').owlCarousel({
            loop: !0,
            dots: !1,
            nav: !0,
            navText: ["<i class='fas fa-angle-left'></i>", "<i class='fas fa-angle-right'></i>"],
            autoplay: !0,
            autoplayTimeout: 5e3,
            responsiveClass: !0,
            autoplayHoverPause: !1,
            responsive: { 0: { items: 1, margin: 0 }, 481: { items: 2, margin: 5 }, 500: { items: 2, margin: 20 }, 992: { items: 3, margin: 30 }, 1200: { items: 4, margin: 30 } }
          }),
          t('.carousel-style2 .owl-carousel').owlCarousel({
            loop: !1,
            dots: !0,
            nav: !1,
            autoplay: !0,
            autoplayTimeout: 5e3,
            responsiveClass: !0,
            autoplayHoverPause: !1,
            responsive: { 0: { items: 1, margin: 0 }, 481: { items: 2, margin: 5 }, 500: { items: 2, margin: 20 }, 992: { items: 3, margin: 30 }, 1200: { items: 3, margin: 30 } }
          }),
          t('.blog-style-8').owlCarousel({
            loop: !0,
            dots: !1,
            nav: !1,
            autoplay: !0,
            autoplayTimeout: 4e3,
            responsiveClass: !0,
            smartSpeed: 900,
            autoplayHoverPause: !1,
            responsive: { 0: { items: 1, margin: 15 }, 481: { items: 2, margin: 15 }, 500: { items: 2, margin: 20 }, 992: { items: 2, margin: 30 } }
          }),
          t('#service-grids').owlCarousel({
            loop: !0,
            dots: !1,
            nav: !1,
            autoplay: !0,
            autoplayTimeout: 2500,
            responsiveClass: !0,
            autoplayHoverPause: !1,
            responsive: { 0: { items: 1, margin: 0 }, 768: { items: 2, margin: 20 }, 992: { items: 3, margin: 30 } }
          }),
          t('.home-business-slider').owlCarousel({
            items: 1,
            loop: !0,
            autoplay: !0,
            smartSpeed: 800,
            nav: !0,
            dots: !1,
            navText: ['<span class="fas fa-chevron-left"></span>', '<span class="fas fa-chevron-right"></span>'],
            responsive: { 0: { nav: !1 }, 768: { nav: !0 } }
          }),
          t('#clients').owlCarousel({
            loop: !0,
            nav: !1,
            dots: !1,
            autoplay: !0,
            autoplayTimeout: 3e3,
            responsiveClass: !0,
            autoplayHoverPause: !1,
            responsive: { 0: { items: 2, margin: 20 }, 768: { items: 3, margin: 40 }, 992: { items: 4, margin: 60 }, 1200: { items: 5, margin: 80 } }
          }),
          t('#project-single').owlCarousel({
            loop: !1,
            nav: !1,
            responsiveClass: !0,
            dots: !1,
            responsive: { 0: { items: 1, margin: 15 }, 600: { items: 2, margin: 15 }, 1e3: { items: 3, margin: 15 } }
          }),
          t('.project-single-two .owl-carousel').owlCarousel({
            loop: !1,
            nav: !1,
            responsiveClass: !0,
            dots: !1,
            margin: 15,
            responsive: { 0: { items: 1, margin: 15 }, 576: { items: 2, margin: 20 }, 768: { items: 3, margin: 20 }, 992: { items: 3, margin: 25 }, 1200: { items: 4, margin: 30 } }
          }),
          t('.slider-fade .owl-carousel').owlCarousel({ items: 1, loop: !0, margin: 0, autoplay: !0, smartSpeed: 500, mouseDrag: !1, animateIn: 'fadeIn', animateOut: 'fadeOut' }),
          t('.slider-fade-shop .owl-carousel').owlCarousel({
            items: 1,
            loop: !0,
            margin: 0,
            autoplay: !0,
            nav: !1,
            dots: !0,
            smartSpeed: 500,
            mouseDrag: !1,
            animateIn: 'fadeIn',
            animateOut: 'fadeOut',
            responsive: { 0: { items: 1 }, 1200: { dots: !1, nav: !0, navText: ['<span class="fas fa-chevron-left"></span>', '<span class="fas fa-chevron-right"></span>'] } }
          }),
          t('.services-grids').owlCarousel({
            loop: !1,
            nav: !1,
            responsiveClass: !0,
            dots: !1,
            autoplay: !0,
            smartSpeed: 500,
            mouseDrag: !1,
            responsive: { 0: { items: 1, margin: 15, mouseDrag: !0 }, 768: { items: 2, margin: 20, mouseDrag: !0 }, 1200: { items: 3, margin: 25, mouseDrag: !1 } }
          }),
          t('.owl-carousel').owlCarousel({ items: 1, loop: !0, dots: !1, margin: 0, autoplay: !0, smartSpeed: 500 }),
          t('.slider-fade').on('changed.owl.carousel', function (e) {
            var i = e.item.index - 2
            t('h3').removeClass('animated fadeInUp'),
              t('h1').removeClass('animated fadeInUp'),
              t('p').removeClass('animated fadeInUp'),
              t('.butn').removeClass('animated fadeInUp'),
              t('.owl-item').not('.cloned').eq(i).find('h3').addClass('animated fadeInUp'),
              t('.owl-item').not('.cloned').eq(i).find('h1').addClass('animated fadeInUp'),
              t('.owl-item').not('.cloned').eq(i).find('p').addClass('animated fadeInUp'),
              t('.owl-item').not('.cloned').eq(i).find('.butn').addClass('animated fadeInUp')
          }),
          t('.slider-fade-shop').on('changed.owl.carousel', function (e) {
            var i = e.item.index - 2
            t('p').removeClass('animated fadeInUp'),
              t('h1').removeClass('animated fadeInUp'),
              t('.subheading').removeClass('animated fadeInUp'),
              t('.butn').removeClass('animated fadeInUp'),
              t('.owl-item').not('.cloned').eq(i).find('.subheading').addClass('animated fadeInUp'),
              t('.owl-item').not('.cloned').eq(i).find('h1').addClass('animated fadeInUp'),
              t('.owl-item').not('.cloned').eq(i).find('p').addClass('animated fadeInUp'),
              t('.owl-item').not('.cloned').eq(i).find('.butn').addClass('animated fadeInUp')
          }),
          0 !== t('.horizontaltab').length &&
            t('.horizontaltab').easyResponsiveTabs({
              type: 'default',
              width: 'auto',
              fit: !0,
              tabidentify: 'hor_1',
              activate: function (e) {
                var i = t(this),
                  n = t('#nested-tabInfo')
                t('span', n).text(i.text()), n.show()
              }
            }),
          0 !== t('.childverticaltab').length &&
            t('.childverticaltab').easyResponsiveTabs({
              type: 'vertical',
              width: 'auto',
              fit: !0,
              tabidentify: 'ver_1',
              activetab_bg: '#fff',
              inactive_bg: '#F5F5F5',
              active_border_color: '#c1c1c1',
              active_content_border_color: '#c1c1c1'
            }),
          0 !== t('.verticaltab').length &&
            t('.verticaltab').easyResponsiveTabs({
              type: 'vertical',
              width: 'auto',
              fit: !0,
              closed: 'accordion',
              tabidentify: 'hor_1',
              activate: function (e) {
                var i = t(this),
                  n = t('#nested-tabInfo2')
                t('span', n).text(i.text()), n.show()
              }
            }),
          t('.countup').counterUp({ delay: 25, time: 2e3 }),
          0 !== t('.countdown').length)
        ) {
          var n,
            o = jQuery
          o(document).ready(function () {
            null == o('.countdown').countdown ? n('.countdown') : (n = o('.countdown').show().countdown({ date: '01 Jan 2022 00:01:00', format: 'on' }))
          })
        }
      }),
      e.on('load', function () {
        t('.single-img').magnificPopup({ delegate: '.popimg', type: 'image' }), t('.gallery').magnificPopup({ delegate: '.popimg', type: 'image', gallery: { enabled: !0 } })
        var i = t('.gallery').isotope({})
        t('.filtering').on('click', 'span', function () {
          var e = t(this).attr('data-filter')
          i.isotope({ filter: e })
        }),
          t('.filtering').on('click', 'span', function () {
            t(this).addClass('active').siblings().removeClass('active')
          }),
          e.stellar()
      })
  })(jQuery),
  (function (t, e) {
    'function' == typeof define && define.amd ? define([], e(t)) : 'object' == typeof exports ? (module.exports = e(t)) : (t.iziToast = e(t))
  })('undefined' != typeof global ? global : window || this.window || this.global, function (t) {
    'use strict'
    var e = {},
      i = 'iziToast',
      n = (document.querySelector('body'), !!/Mobi/.test(navigator.userAgent)),
      o = /Chrome/.test(navigator.userAgent) && /Google Inc/.test(navigator.vendor),
      r = 'undefined' != typeof InstallTrigger,
      s = 'ontouchstart' in document.documentElement,
      a = ['bottomRight', 'bottomLeft', 'bottomCenter', 'topRight', 'topLeft', 'topCenter', 'center'],
      l = 568,
      c = {}
    e.children = {}
    var u = {
      id: null,
      class: '',
      title: '',
      titleColor: '',
      titleSize: '',
      titleLineHeight: '',
      message: '',
      messageColor: '',
      messageSize: '',
      messageLineHeight: '',
      backgroundColor: '',
      theme: 'light',
      color: '',
      icon: '',
      iconText: '',
      iconColor: '',
      iconUrl: null,
      image: '',
      imageWidth: 50,
      maxWidth: null,
      zindex: null,
      layout: 1,
      balloon: !1,
      close: !0,
      closeOnEscape: !1,
      closeOnClick: !1,
      displayMode: 0,
      position: 'bottomRight',
      target: '',
      targetFirst: !0,
      timeout: 5e3,
      rtl: !1,
      animateInside: !0,
      drag: !0,
      pauseOnHover: !0,
      resetOnHover: !1,
      progressBar: !0,
      progressBarColor: '',
      progressBarEasing: 'linear',
      overlay: !1,
      overlayClose: !1,
      overlayColor: 'rgba(0, 0, 0, 0.6)',
      transitionIn: 'fadeInUp',
      transitionOut: 'fadeOut',
      transitionInMobile: 'fadeInUp',
      transitionOutMobile: 'fadeOutDown',
      buttons: {},
      inputs: {},
      onOpening: function () {},
      onOpened: function () {},
      onClosing: function () {},
      onClosed: function () {}
    }
    if (
      ('remove' in Element.prototype ||
        (Element.prototype.remove = function () {
          this.parentNode && this.parentNode.removeChild(this)
        }),
      'function' != typeof window.CustomEvent)
    ) {
      var d = function (t, e) {
        e = e || { bubbles: !1, cancelable: !1, detail: void 0 }
        var i = document.createEvent('CustomEvent')
        return i.initCustomEvent(t, e.bubbles, e.cancelable, e.detail), i
      }
      ;(d.prototype = window.Event.prototype), (window.CustomEvent = d)
    }
    var h = function (t, e, i) {
        if ('[object Object]' === Object.prototype.toString.call(t)) for (var n in t) Object.prototype.hasOwnProperty.call(t, n) && e.call(i, t[n], n, t)
        else if (t) for (var o = 0, r = t.length; r > o; o++) e.call(i, t[o], o, t)
      },
      f = function (t, e) {
        var i = {}
        return (
          h(t, function (e, n) {
            i[n] = t[n]
          }),
          h(e, function (t, n) {
            i[n] = e[n]
          }),
          i
        )
      },
      p = function (t) {
        var e = document.createDocumentFragment(),
          i = document.createElement('div')
        for (i.innerHTML = t; i.firstChild; ) e.appendChild(i.firstChild)
        return e
      },
      g = {
        move: function (t, e, n, s) {
          var a,
            l = 0.3,
            c = 180
          0 !== s &&
            (t.classList.add(i + '-dragged'),
            (t.style.transform = 'translateX(' + s + 'px)'),
            s > 0
              ? l > (a = (c - s) / c) && e.hide(f(n, { transitionOut: 'fadeOutRight', transitionOutMobile: 'fadeOutRight' }), t, 'drag')
              : l > (a = (c + s) / c) && e.hide(f(n, { transitionOut: 'fadeOutLeft', transitionOutMobile: 'fadeOutLeft' }), t, 'drag'),
            (t.style.opacity = a),
            l > a && ((o || r) && (t.style.left = s + 'px'), (t.parentNode.style.opacity = l), this.stopMoving(t, null)))
        },
        startMoving: function (t, e, i, n) {
          n = n || window.event
          var o = s ? n.touches[0].clientX : n.clientX,
            r = t.style.transform.replace('px)', ''),
            a = o - (r = r.replace('translateX(', ''))
          i.transitionIn && t.classList.remove(i.transitionIn),
            i.transitionInMobile && t.classList.remove(i.transitionInMobile),
            (t.style.transition = ''),
            s
              ? (document.ontouchmove = function (n) {
                  n.preventDefault()
                  var o = (n = n || window.event).touches[0].clientX - a
                  g.move(t, e, i, o)
                })
              : (document.onmousemove = function (n) {
                  n.preventDefault()
                  var o = (n = n || window.event).clientX - a
                  g.move(t, e, i, o)
                })
        },
        stopMoving: function (t, e) {
          s ? (document.ontouchmove = function () {}) : (document.onmousemove = function () {}),
            (t.style.opacity = ''),
            (t.style.transform = ''),
            t.classList.contains(i + '-dragged') &&
              (t.classList.remove(i + '-dragged'),
              (t.style.transition = 'transform 0.4s ease, opacity 0.4s ease'),
              setTimeout(function () {
                t.style.transition = ''
              }, 400))
        }
      }
    return (
      (e.setSetting = function (t, i, n) {
        e.children[t][i] = n
      }),
      (e.getSetting = function (t, i) {
        return e.children[t][i]
      }),
      (e.destroy = function () {
        h(document.querySelectorAll('.' + i + '-overlay'), function (t, e) {
          t.remove()
        }),
          h(document.querySelectorAll('.' + i + '-wrapper'), function (t, e) {
            t.remove()
          }),
          h(document.querySelectorAll('.' + i), function (t, e) {
            t.remove()
          }),
          (this.children = {}),
          document.removeEventListener(i + '-opened', {}, !1),
          document.removeEventListener(i + '-opening', {}, !1),
          document.removeEventListener(i + '-closing', {}, !1),
          document.removeEventListener(i + '-closed', {}, !1),
          document.removeEventListener('keyup', {}, !1),
          (c = {})
      }),
      (e.settings = function (t) {
        e.destroy(), (c = t), (u = f(u, t || {}))
      }),
      h(
        {
          info: { color: 'blue', icon: 'ico-info' },
          success: { color: 'green', icon: 'ico-success' },
          warning: { color: 'orange', icon: 'ico-warning' },
          error: { color: 'red', icon: 'ico-error' },
          question: { color: 'yellow', icon: 'ico-question' }
        },
        function (t, i) {
          e[i] = function (e) {
            var i = f(c, e || {})
            ;(i = f(t, i || {})), this.show(i)
          }
        }
      ),
      (e.progress = function (t, e, n) {
        var o = this,
          r = e.getAttribute('data-iziToast-ref'),
          s = f(this.children[r], t || {}),
          a = e.querySelector('.' + i + '-progressbar div')
        return {
          start: function () {
            void 0 === s.time.REMAINING &&
              (e.classList.remove(i + '-reseted'),
              null !== a && ((a.style.transition = 'width ' + s.timeout + 'ms ' + s.progressBarEasing), (a.style.width = '0%')),
              (s.time.START = new Date().getTime()),
              (s.time.END = s.time.START + s.timeout),
              (s.time.TIMER = setTimeout(function () {
                clearTimeout(s.time.TIMER), e.classList.contains(i + '-closing') || (o.hide(s, e, 'timeout'), 'function' == typeof n && n.apply(o))
              }, s.timeout)),
              o.setSetting(r, 'time', s.time))
          },
          pause: function () {
            if (void 0 !== s.time.START && !e.classList.contains(i + '-paused') && !e.classList.contains(i + '-reseted')) {
              if (
                (e.classList.add(i + '-paused'), (s.time.REMAINING = s.time.END - new Date().getTime()), clearTimeout(s.time.TIMER), o.setSetting(r, 'time', s.time), null !== a)
              ) {
                var t = window.getComputedStyle(a).getPropertyValue('width')
                ;(a.style.transition = 'none'), (a.style.width = t)
              }
              'function' == typeof n &&
                setTimeout(function () {
                  n.apply(o)
                }, 10)
            }
          },
          resume: function () {
            void 0 !== s.time.REMAINING
              ? (e.classList.remove(i + '-paused'),
                null !== a && ((a.style.transition = 'width ' + s.time.REMAINING + 'ms ' + s.progressBarEasing), (a.style.width = '0%')),
                (s.time.END = new Date().getTime() + s.time.REMAINING),
                (s.time.TIMER = setTimeout(function () {
                  clearTimeout(s.time.TIMER), e.classList.contains(i + '-closing') || (o.hide(s, e, 'timeout'), 'function' == typeof n && n.apply(o))
                }, s.time.REMAINING)),
                o.setSetting(r, 'time', s.time))
              : this.start()
          },
          reset: function () {
            clearTimeout(s.time.TIMER),
              delete s.time.REMAINING,
              o.setSetting(r, 'time', s.time),
              e.classList.add(i + '-reseted'),
              e.classList.remove(i + '-paused'),
              null !== a && ((a.style.transition = 'none'), (a.style.width = '100%')),
              'function' == typeof n &&
                setTimeout(function () {
                  n.apply(o)
                }, 10)
          }
        }
      }),
      (e.hide = function (t, e, o) {
        'object' != typeof e && (e = document.querySelector(e))
        var r = this,
          s = f(this.children[e.getAttribute('data-iziToast-ref')], t || {})
        ;(s.closedBy = o || null),
          delete s.time.REMAINING,
          e.classList.add(i + '-closing'),
          (function () {
            var t = document.querySelector('.' + i + '-overlay')
            if (null !== t) {
              var e = t.getAttribute('data-iziToast-ref'),
                n = (e = e.split(',')).indexOf(String(s.ref))
              ;-1 !== n && e.splice(n, 1),
                t.setAttribute('data-iziToast-ref', e.join()),
                0 === e.length &&
                  (t.classList.remove('fadeIn'),
                  t.classList.add('fadeOut'),
                  setTimeout(function () {
                    t.remove()
                  }, 700))
            }
          })(),
          s.transitionIn && e.classList.remove(s.transitionIn),
          s.transitionInMobile && e.classList.remove(s.transitionInMobile),
          n || window.innerWidth <= l ? s.transitionOutMobile && e.classList.add(s.transitionOutMobile) : s.transitionOut && e.classList.add(s.transitionOut)
        var a = e.parentNode.offsetHeight
        ;(e.parentNode.style.height = a + 'px'), (e.style.pointerEvents = 'none'), (!n || window.innerWidth > l) && (e.parentNode.style.transitionDelay = '0.2s')
        try {
          var c = new CustomEvent(i + '-closing', { detail: s, bubbles: !0, cancelable: !0 })
          document.dispatchEvent(c)
        } catch (t) {
          console.warn(t)
        }
        setTimeout(function () {
          ;(e.parentNode.style.height = '0px'),
            (e.parentNode.style.overflow = ''),
            setTimeout(function () {
              delete r.children[s.ref], e.parentNode.remove()
              try {
                var t = new CustomEvent(i + '-closed', { detail: s, bubbles: !0, cancelable: !0 })
                document.dispatchEvent(t)
              } catch (t) {
                console.warn(t)
              }
              void 0 !== s.onClosed && s.onClosed.apply(null, [s, e, o])
            }, 1e3)
        }, 200),
          void 0 !== s.onClosing && s.onClosing.apply(null, [s, e, o])
      }),
      (e.show = function (t) {
        var o = this,
          r = f(c, t || {})
        if (
          (((r = f(u, r)).time = {}),
          null === r.id &&
            (r.id = (function (t) {
              return btoa(encodeURIComponent(t)).replace(/=/g, '')
            })(r.title + r.message + r.color)),
          1 === r.displayMode || 'once' == r.displayMode)
        )
          try {
            if (document.querySelectorAll('.' + i + '#' + r.id).length > 0) return !1
          } catch (t) {
            console.warn('[' + i + '] Could not find an element with this selector: #' + r.id + '. Try to set an valid id.')
          }
        if (2 === r.displayMode || 'replace' == r.displayMode)
          try {
            h(document.querySelectorAll('.' + i + '#' + r.id), function (t, e) {
              o.hide(r, t, 'replaced')
            })
          } catch (t) {
            console.warn('[' + i + '] Could not find an element with this selector: #' + r.id + '. Try to set an valid id.')
          }
        ;(r.ref = new Date().getTime() + Math.floor(1e7 * Math.random() + 1)), (e.children[r.ref] = r)
        var d,
          m = {
            body: document.querySelector('body'),
            overlay: document.createElement('div'),
            toast: document.createElement('div'),
            toastBody: document.createElement('div'),
            toastTexts: document.createElement('div'),
            toastCapsule: document.createElement('div'),
            cover: document.createElement('div'),
            buttons: document.createElement('div'),
            inputs: document.createElement('div'),
            icon: r.iconUrl ? document.createElement('img') : document.createElement('i'),
            wrapper: null
          }
        m.toast.setAttribute('data-iziToast-ref', r.ref),
          m.toast.appendChild(m.toastBody),
          m.toastCapsule.appendChild(m.toast),
          (function () {
            if (
              (m.toast.classList.add(i),
              m.toast.classList.add(i + '-opening'),
              m.toastCapsule.classList.add(i + '-capsule'),
              m.toastBody.classList.add(i + '-body'),
              m.toastTexts.classList.add(i + '-texts'),
              n || window.innerWidth <= l ? r.transitionInMobile && m.toast.classList.add(r.transitionInMobile) : r.transitionIn && m.toast.classList.add(r.transitionIn),
              r.class)
            ) {
              var t = r.class.split(' ')
              h(t, function (t, e) {
                m.toast.classList.add(t)
              })
            }
            r.id && (m.toast.id = r.id),
              r.rtl && (m.toast.classList.add(i + '-rtl'), m.toast.setAttribute('dir', 'rtl')),
              r.layout > 1 && m.toast.classList.add(i + '-layout' + r.layout),
              r.balloon && m.toast.classList.add(i + '-balloon'),
              r.maxWidth && (isNaN(r.maxWidth) ? (m.toast.style.maxWidth = r.maxWidth) : (m.toast.style.maxWidth = r.maxWidth + 'px')),
              ('' === r.theme && 'light' === r.theme) || m.toast.classList.add(i + '-theme-' + r.theme),
              r.color &&
                ((function (t) {
                  return '#' == t.substring(0, 1) || 'rgb' == t.substring(0, 3) || 'hsl' == t.substring(0, 3)
                })(r.color)
                  ? (m.toast.style.background = r.color)
                  : m.toast.classList.add(i + '-color-' + r.color)),
              r.backgroundColor && ((m.toast.style.background = r.backgroundColor), r.balloon && (m.toast.style.borderColor = r.backgroundColor))
          })(),
          r.image &&
            (m.cover.classList.add(i + '-cover'),
            (m.cover.style.width = r.imageWidth + 'px'),
            (function (t) {
              try {
                return btoa(atob(t)) == t
              } catch (t) {
                return !1
              }
            })(r.image.replace(/ /g, ''))
              ? (m.cover.style.backgroundImage = 'url(data:image/png;base64,' + r.image.replace(/ /g, '') + ')')
              : (m.cover.style.backgroundImage = 'url(' + r.image + ')'),
            r.rtl ? (m.toastBody.style.marginRight = r.imageWidth + 10 + 'px') : (m.toastBody.style.marginLeft = r.imageWidth + 10 + 'px'),
            m.toast.appendChild(m.cover)),
          r.close
            ? ((m.buttonClose = document.createElement('button')),
              (m.buttonClose.type = 'button'),
              m.buttonClose.classList.add(i + '-close'),
              m.buttonClose.addEventListener('click', function (t) {
                t.target, o.hide(r, m.toast, 'button')
              }),
              m.toast.appendChild(m.buttonClose))
            : r.rtl
            ? (m.toast.style.paddingLeft = '18px')
            : (m.toast.style.paddingRight = '18px'),
          r.progressBar &&
            ((m.progressBar = document.createElement('div')),
            (m.progressBarDiv = document.createElement('div')),
            m.progressBar.classList.add(i + '-progressbar'),
            (m.progressBarDiv.style.background = r.progressBarColor),
            m.progressBar.appendChild(m.progressBarDiv),
            m.toast.appendChild(m.progressBar)),
          r.timeout &&
            (r.pauseOnHover &&
              !r.resetOnHover &&
              (m.toast.addEventListener('mouseenter', function (t) {
                o.progress(r, m.toast).pause()
              }),
              m.toast.addEventListener('mouseleave', function (t) {
                o.progress(r, m.toast).resume()
              })),
            r.resetOnHover &&
              (m.toast.addEventListener('mouseenter', function (t) {
                o.progress(r, m.toast).reset()
              }),
              m.toast.addEventListener('mouseleave', function (t) {
                o.progress(r, m.toast).start()
              }))),
          r.iconUrl
            ? (m.icon.setAttribute('class', i + '-icon'), m.icon.setAttribute('src', r.iconUrl))
            : r.icon &&
              (m.icon.setAttribute('class', i + '-icon ' + r.icon),
              r.iconText && m.icon.appendChild(document.createTextNode(r.iconText)),
              r.iconColor && (m.icon.style.color = r.iconColor)),
          (r.icon || r.iconUrl) && (r.rtl ? (m.toastBody.style.paddingRight = '33px') : (m.toastBody.style.paddingLeft = '33px'), m.toastBody.appendChild(m.icon)),
          r.title.length > 0 &&
            ((m.strong = document.createElement('strong')),
            m.strong.classList.add(i + '-title'),
            m.strong.appendChild(p(r.title)),
            m.toastTexts.appendChild(m.strong),
            r.titleColor && (m.strong.style.color = r.titleColor),
            r.titleSize && (isNaN(r.titleSize) ? (m.strong.style.fontSize = r.titleSize) : (m.strong.style.fontSize = r.titleSize + 'px')),
            r.titleLineHeight && (isNaN(r.titleSize) ? (m.strong.style.lineHeight = r.titleLineHeight) : (m.strong.style.lineHeight = r.titleLineHeight + 'px'))),
          r.message.length > 0 &&
            ((m.p = document.createElement('p')),
            m.p.classList.add(i + '-message'),
            m.p.appendChild(p(r.message)),
            m.toastTexts.appendChild(m.p),
            r.messageColor && (m.p.style.color = r.messageColor),
            r.messageSize && (isNaN(r.titleSize) ? (m.p.style.fontSize = r.messageSize) : (m.p.style.fontSize = r.messageSize + 'px')),
            r.messageLineHeight && (isNaN(r.titleSize) ? (m.p.style.lineHeight = r.messageLineHeight) : (m.p.style.lineHeight = r.messageLineHeight + 'px'))),
          r.title.length > 0 && r.message.length > 0 && (r.rtl ? (m.strong.style.marginLeft = '10px') : 2 === r.layout || r.rtl || (m.strong.style.marginRight = '10px')),
          m.toastBody.appendChild(m.toastTexts),
          r.inputs.length > 0 &&
            (m.inputs.classList.add(i + '-inputs'),
            h(r.inputs, function (t, e) {
              m.inputs.appendChild(p(t[0])),
                (d = m.inputs.childNodes)[e].classList.add(i + '-inputs-child'),
                t[3] &&
                  setTimeout(function () {
                    d[e].focus()
                  }, 300),
                d[e].addEventListener(t[1], function (e) {
                  return (0, t[2])(o, m.toast, this, e)
                })
            }),
            m.toastBody.appendChild(m.inputs)),
          r.buttons.length > 0 &&
            (m.buttons.classList.add(i + '-buttons'),
            h(r.buttons, function (t, e) {
              m.buttons.appendChild(p(t[0]))
              var n = m.buttons.childNodes
              n[e].classList.add(i + '-buttons-child'),
                t[2] &&
                  setTimeout(function () {
                    n[e].focus()
                  }, 300),
                n[e].addEventListener('click', function (e) {
                  return e.preventDefault(), (0, t[1])(o, m.toast, this, e, d)
                })
            })),
          m.toastBody.appendChild(m.buttons),
          r.message.length > 0 && (r.inputs.length > 0 || r.buttons.length > 0) && (m.p.style.marginBottom = '0'),
          (r.inputs.length > 0 || r.buttons.length > 0) &&
            (r.rtl ? (m.toastTexts.style.marginLeft = '10px') : (m.toastTexts.style.marginRight = '10px'),
            r.inputs.length > 0 && r.buttons.length > 0 && (r.rtl ? (m.inputs.style.marginLeft = '8px') : (m.inputs.style.marginRight = '8px'))),
          (m.toastCapsule.style.visibility = 'hidden'),
          setTimeout(function () {
            var t = m.toast.offsetHeight,
              e = m.toast.currentStyle || window.getComputedStyle(m.toast),
              i = e.marginTop
            ;(i = i.split('px')), (i = parseInt(i[0]))
            var n = e.marginBottom
            ;(n = n.split('px')),
              (n = parseInt(n[0])),
              (m.toastCapsule.style.visibility = ''),
              (m.toastCapsule.style.height = t + n + i + 'px'),
              setTimeout(function () {
                ;(m.toastCapsule.style.height = 'auto'), r.target && (m.toastCapsule.style.overflow = 'visible')
              }, 500),
              r.timeout && o.progress(r, m.toast).start()
          }, 100),
          (function () {
            var t = r.position
            if (r.target)
              (m.wrapper = document.querySelector(r.target)),
                m.wrapper.classList.add(i + '-target'),
                r.targetFirst ? m.wrapper.insertBefore(m.toastCapsule, m.wrapper.firstChild) : m.wrapper.appendChild(m.toastCapsule)
            else {
              if (-1 == a.indexOf(r.position)) return void console.warn('[' + i + '] Incorrect position.\nIt can be › ' + a)
              ;(t =
                n || window.innerWidth <= l
                  ? 'bottomLeft' == r.position || 'bottomRight' == r.position || 'bottomCenter' == r.position
                    ? i + '-wrapper-bottomCenter'
                    : 'topLeft' == r.position || 'topRight' == r.position || 'topCenter' == r.position
                    ? i + '-wrapper-topCenter'
                    : i + '-wrapper-center'
                  : i + '-wrapper-' + t),
                (m.wrapper = document.querySelector('.' + i + '-wrapper.' + t)),
                m.wrapper ||
                  ((m.wrapper = document.createElement('div')), m.wrapper.classList.add(i + '-wrapper'), m.wrapper.classList.add(t), document.body.appendChild(m.wrapper)),
                'topLeft' == r.position || 'topCenter' == r.position || 'topRight' == r.position
                  ? m.wrapper.insertBefore(m.toastCapsule, m.wrapper.firstChild)
                  : m.wrapper.appendChild(m.toastCapsule)
            }
            isNaN(r.zindex) ? console.warn('[' + i + '] Invalid zIndex.') : (m.wrapper.style.zIndex = r.zindex)
          })(),
          r.overlay &&
            (null !== document.querySelector('.' + i + '-overlay.fadeIn')
              ? ((m.overlay = document.querySelector('.' + i + '-overlay')),
                m.overlay.setAttribute('data-iziToast-ref', m.overlay.getAttribute('data-iziToast-ref') + ',' + r.ref),
                isNaN(r.zindex) || null === r.zindex || (m.overlay.style.zIndex = r.zindex - 1))
              : (m.overlay.classList.add(i + '-overlay'),
                m.overlay.classList.add('fadeIn'),
                (m.overlay.style.background = r.overlayColor),
                m.overlay.setAttribute('data-iziToast-ref', r.ref),
                isNaN(r.zindex) || null === r.zindex || (m.overlay.style.zIndex = r.zindex - 1),
                document.querySelector('body').appendChild(m.overlay)),
            r.overlayClose
              ? (m.overlay.removeEventListener('click', {}),
                m.overlay.addEventListener('click', function (t) {
                  o.hide(r, m.toast, 'overlay')
                }))
              : m.overlay.removeEventListener('click', {})),
          (function () {
            if (r.animateInside) {
              m.toast.classList.add(i + '-animateInside')
              var t = [200, 100, 300]
              ;('bounceInLeft' != r.transitionIn && 'bounceInRight' != r.transitionIn) || (t = [400, 200, 400]),
                r.title.length > 0 &&
                  setTimeout(function () {
                    m.strong.classList.add('slideIn')
                  }, t[0]),
                r.message.length > 0 &&
                  setTimeout(function () {
                    m.p.classList.add('slideIn')
                  }, t[1]),
                (r.icon || r.iconUrl) &&
                  setTimeout(function () {
                    m.icon.classList.add('revealIn')
                  }, t[2])
              var e = 150
              r.buttons.length > 0 &&
                m.buttons &&
                setTimeout(
                  function () {
                    h(m.buttons.childNodes, function (t, i) {
                      setTimeout(function () {
                        t.classList.add('revealIn')
                      }, e),
                        (e += 150)
                    })
                  },
                  r.inputs.length > 0 ? 150 : 0
                ),
                r.inputs.length > 0 &&
                  m.inputs &&
                  ((e = 150),
                  h(m.inputs.childNodes, function (t, i) {
                    setTimeout(function () {
                      t.classList.add('revealIn')
                    }, e),
                      (e += 150)
                  }))
            }
          })(),
          r.onOpening.apply(null, [r, m.toast])
        try {
          var v = new CustomEvent(i + '-opening', { detail: r, bubbles: !0, cancelable: !0 })
          document.dispatchEvent(v)
        } catch (t) {
          console.warn(t)
        }
        setTimeout(function () {
          m.toast.classList.remove(i + '-opening'), m.toast.classList.add(i + '-opened')
          try {
            var t = new CustomEvent(i + '-opened', { detail: r, bubbles: !0, cancelable: !0 })
            document.dispatchEvent(t)
          } catch (t) {
            console.warn(t)
          }
          r.onOpened.apply(null, [r, m.toast])
        }, 1e3),
          r.drag &&
            (s
              ? (m.toast.addEventListener(
                  'touchstart',
                  function (t) {
                    g.startMoving(this, o, r, t)
                  },
                  !1
                ),
                m.toast.addEventListener(
                  'touchend',
                  function (t) {
                    g.stopMoving(this, t)
                  },
                  !1
                ))
              : (m.toast.addEventListener(
                  'mousedown',
                  function (t) {
                    t.preventDefault(), g.startMoving(this, o, r, t)
                  },
                  !1
                ),
                m.toast.addEventListener(
                  'mouseup',
                  function (t) {
                    t.preventDefault(), g.stopMoving(this, t)
                  },
                  !1
                ))),
          r.closeOnEscape &&
            document.addEventListener('keyup', function (t) {
              27 == (t = t || window.event).keyCode && o.hide(r, m.toast, 'esc')
            }),
          r.closeOnClick &&
            m.toast.addEventListener('click', function (t) {
              o.hide(r, m.toast, 'toast')
            }),
          (o.toast = m.toast)
      }),
      e
    )
  }),
  (function (t, e) {
    'function' == typeof define && define.amd
      ? define(['jquery'], function (t) {
          return e(t)
        })
      : 'object' == typeof exports
      ? (module.exports = e(require('jquery')))
      : e(jQuery)
  })(0, function (t) {
    function e(t) {
      this.$container, (this.constraints = null), this.__$tooltip, this.__init(t)
    }
    function i(e, i) {
      var n = !0
      return (
        t.each(e, function (t, o) {
          return void 0 === i[t] || e[t] !== i[t] ? ((n = !1), !1) : void 0
        }),
        n
      )
    }
    function n(e) {
      var i = e.attr('id'),
        n = i ? s.window.document.getElementById(i) : null
      return n ? n === e[0] : t.contains(s.window.document.body, e[0])
    }
    var o = {
        animation: 'fade',
        animationDuration: 350,
        content: null,
        contentAsHTML: !1,
        contentCloning: !1,
        debug: !0,
        delay: 300,
        delayTouch: [300, 500],
        functionInit: null,
        functionBefore: null,
        functionReady: null,
        functionAfter: null,
        functionFormat: null,
        IEmin: 6,
        interactive: !1,
        multiple: !1,
        parent: null,
        plugins: ['sideTip'],
        repositionOnScroll: !1,
        restoration: 'none',
        selfDestruction: !0,
        theme: [],
        timer: 0,
        trackerInterval: 500,
        trackOrigin: !1,
        trackTooltip: !1,
        trigger: 'hover',
        triggerClose: { click: !1, mouseleave: !1, originClick: !1, scroll: !1, tap: !1, touchleave: !1 },
        triggerOpen: { click: !1, mouseenter: !1, tap: !1, touchstart: !1 },
        updateAnimation: 'rotate',
        zIndex: 9999999
      },
      r = 'undefined' != typeof window ? window : null,
      s = {
        hasTouchCapability: !(!r || !('ontouchstart' in r || (r.DocumentTouch && r.document instanceof r.DocumentTouch) || r.navigator.maxTouchPoints)),
        hasTransitions: (function () {
          if (!r) return !1
          var t = (r.document.body || r.document.documentElement).style,
            e = 'transition',
            i = ['Moz', 'Webkit', 'Khtml', 'O', 'ms']
          if ('string' == typeof t[e]) return !0
          e = e.charAt(0).toUpperCase() + e.substr(1)
          for (var n = 0; n < i.length; n++) if ('string' == typeof t[i[n] + e]) return !0
          return !1
        })(),
        IE: !1,
        semVer: '4.2.8',
        window: r
      },
      a = function () {
        ;(this.__$emitterPrivate = t({})), (this.__$emitterPublic = t({})), (this.__instancesLatestArr = []), (this.__plugins = {}), (this._env = s)
      }
    ;(a.prototype = {
      __bridge: function (e, i, n) {
        if (!i[n]) {
          var r = function () {}
          r.prototype = e
          var s = new r()
          s.__init && s.__init(i),
            t.each(e, function (t, e) {
              0 != t.indexOf('__') &&
                (i[t]
                  ? o.debug && console.log('The ' + t + ' method of the ' + n + ' plugin conflicts with another plugin or native methods')
                  : ((i[t] = function () {
                      return s[t].apply(s, Array.prototype.slice.apply(arguments))
                    }),
                    (i[t].bridged = s)))
            }),
            (i[n] = s)
        }
        return this
      },
      __setWindow: function (t) {
        return (s.window = t), this
      },
      _getRuler: function (t) {
        return new e(t)
      },
      _off: function () {
        return this.__$emitterPrivate.off.apply(this.__$emitterPrivate, Array.prototype.slice.apply(arguments)), this
      },
      _on: function () {
        return this.__$emitterPrivate.on.apply(this.__$emitterPrivate, Array.prototype.slice.apply(arguments)), this
      },
      _one: function () {
        return this.__$emitterPrivate.one.apply(this.__$emitterPrivate, Array.prototype.slice.apply(arguments)), this
      },
      _plugin: function (e) {
        var i = this
        if ('string' == typeof e) {
          var n = e,
            o = null
          return (
            n.indexOf('.') > 0
              ? (o = i.__plugins[n])
              : t.each(i.__plugins, function (t, e) {
                  return e.name.substring(e.name.length - n.length - 1) == '.' + n ? ((o = e), !1) : void 0
                }),
            o
          )
        }
        if (e.name.indexOf('.') < 0) throw new Error('Plugins must be namespaced')
        return (i.__plugins[e.name] = e), e.core && i.__bridge(e.core, i, e.name), this
      },
      _trigger: function () {
        var t = Array.prototype.slice.apply(arguments)
        return (
          'string' == typeof t[0] && (t[0] = { type: t[0] }),
          this.__$emitterPrivate.trigger.apply(this.__$emitterPrivate, t),
          this.__$emitterPublic.trigger.apply(this.__$emitterPublic, t),
          this
        )
      },
      instances: function (e) {
        var i = []
        return (
          t(e || '.tooltipstered').each(function () {
            var e = t(this),
              n = e.data('tooltipster-ns')
            n &&
              t.each(n, function (t, n) {
                i.push(e.data(n))
              })
          }),
          i
        )
      },
      instancesLatest: function () {
        return this.__instancesLatestArr
      },
      off: function () {
        return this.__$emitterPublic.off.apply(this.__$emitterPublic, Array.prototype.slice.apply(arguments)), this
      },
      on: function () {
        return this.__$emitterPublic.on.apply(this.__$emitterPublic, Array.prototype.slice.apply(arguments)), this
      },
      one: function () {
        return this.__$emitterPublic.one.apply(this.__$emitterPublic, Array.prototype.slice.apply(arguments)), this
      },
      origins: function (e) {
        return t((e ? e + ' ' : '') + '.tooltipstered').toArray()
      },
      setDefaults: function (e) {
        return t.extend(o, e), this
      },
      triggerHandler: function () {
        return this.__$emitterPublic.triggerHandler.apply(this.__$emitterPublic, Array.prototype.slice.apply(arguments)), this
      }
    }),
      (t.tooltipster = new a()),
      (t.Tooltipster = function (e, i) {
        ;(this.__callbacks = { close: [], open: [] }),
          this.__closingTime,
          this.__Content,
          this.__contentBcr,
          (this.__destroyed = !1),
          (this.__$emitterPrivate = t({})),
          (this.__$emitterPublic = t({})),
          (this.__enabled = !0),
          this.__garbageCollector,
          this.__Geometry,
          this.__lastPosition,
          (this.__namespace = 'tooltipster-' + Math.round(1e6 * Math.random())),
          this.__options,
          this.__$originParents,
          (this.__pointerIsOverOrigin = !1),
          (this.__previousThemes = []),
          (this.__state = 'closed'),
          (this.__timeouts = { close: [], open: null }),
          (this.__touchEvents = []),
          (this.__tracker = null),
          this._$origin,
          this._$tooltip,
          this.__init(e, i)
      }),
      (t.Tooltipster.prototype = {
        __init: function (e, i) {
          var n = this
          if (((n._$origin = t(e)), (n.__options = t.extend(!0, {}, o, i)), n.__optionsFormat(), !s.IE || s.IE >= n.__options.IEmin)) {
            var r = null
            if (
              (void 0 === n._$origin.data('tooltipster-initialTitle') && (void 0 === (r = n._$origin.attr('title')) && (r = null), n._$origin.data('tooltipster-initialTitle', r)),
              null !== n.__options.content)
            )
              n.__contentSet(n.__options.content)
            else {
              var a,
                l = n._$origin.attr('data-tooltip-content')
              l && (a = t(l)), a && a[0] ? n.__contentSet(a.first()) : n.__contentSet(r)
            }
            n._$origin.removeAttr('title').addClass('tooltipstered'),
              n.__prepareOrigin(),
              n.__prepareGC(),
              t.each(n.__options.plugins, function (t, e) {
                n._plug(e)
              }),
              s.hasTouchCapability &&
                t(s.window.document.body).on('touchmove.' + n.__namespace + '-triggerOpen', function (t) {
                  n._touchRecordEvent(t)
                }),
              n
                ._on('created', function () {
                  n.__prepareTooltip()
                })
                ._on('repositioned', function (t) {
                  n.__lastPosition = t.position
                })
          } else n.__options.disabled = !0
        },
        __contentInsert: function () {
          var t = this,
            e = t._$tooltip.find('.tooltipster-content'),
            i = t.__Content
          return (
            t._trigger({
              type: 'format',
              content: t.__Content,
              format: function (t) {
                i = t
              }
            }),
            t.__options.functionFormat && (i = t.__options.functionFormat.call(t, t, { origin: t._$origin[0] }, t.__Content)),
            'string' != typeof i || t.__options.contentAsHTML ? e.empty().append(i) : e.text(i),
            t
          )
        },
        __contentSet: function (e) {
          return e instanceof t && this.__options.contentCloning && (e = e.clone(!0)), (this.__Content = e), this._trigger({ type: 'updated', content: e }), this
        },
        __destroyError: function () {
          throw new Error('This tooltip has been destroyed and cannot execute your method call.')
        },
        __geometry: function () {
          var e = this,
            i = e._$origin,
            n = e._$origin.is('area')
          if (n) {
            var o = e._$origin.parent().attr('name')
            i = t('img[usemap="#' + o + '"]')
          }
          var r = i[0].getBoundingClientRect(),
            a = t(s.window.document),
            l = t(s.window),
            c = i,
            u = {
              available: { document: null, window: null },
              document: { size: { height: a.height(), width: a.width() } },
              window: {
                scroll: { left: s.window.scrollX || s.window.document.documentElement.scrollLeft, top: s.window.scrollY || s.window.document.documentElement.scrollTop },
                size: { height: l.height(), width: l.width() }
              },
              origin: {
                fixedLineage: !1,
                offset: {},
                size: { height: r.bottom - r.top, width: r.right - r.left },
                usemapImage: n ? i[0] : null,
                windowOffset: { bottom: r.bottom, left: r.left, right: r.right, top: r.top }
              }
            }
          if (n) {
            var d = e._$origin.attr('shape'),
              h = e._$origin.attr('coords')
            if (
              (h &&
                ((h = h.split(',')),
                t.map(h, function (t, e) {
                  h[e] = parseInt(t)
                })),
              'default' != d)
            )
              switch (d) {
                case 'circle':
                  var f = h[0],
                    p = h[1],
                    g = h[2],
                    m = p - g,
                    v = f - g
                  ;(u.origin.size.height = 2 * g), (u.origin.size.width = u.origin.size.height), (u.origin.windowOffset.left += v), (u.origin.windowOffset.top += m)
                  break
                case 'rect':
                  var y = h[0],
                    b = h[1],
                    _ = h[2],
                    w = h[3]
                  ;(u.origin.size.height = w - b), (u.origin.size.width = _ - y), (u.origin.windowOffset.left += y), (u.origin.windowOffset.top += b)
                  break
                case 'poly':
                  for (var x = 0, C = 0, k = 0, T = 0, S = 'even', E = 0; E < h.length; E++) {
                    var I = h[E]
                    'even' == S ? (I > k && ((k = I), 0 === E && (x = k)), x > I && (x = I), (S = 'odd')) : (I > T && ((T = I), 1 == E && (C = T)), C > I && (C = I), (S = 'even'))
                  }
                  ;(u.origin.size.height = T - C), (u.origin.size.width = k - x), (u.origin.windowOffset.left += x), (u.origin.windowOffset.top += C)
              }
          }
          for (
            e._trigger({
              type: 'geometry',
              edit: function (t) {
                ;(u.origin.size.height = t.height), (u.origin.windowOffset.left = t.left), (u.origin.windowOffset.top = t.top), (u.origin.size.width = t.width)
              },
              geometry: { height: u.origin.size.height, left: u.origin.windowOffset.left, top: u.origin.windowOffset.top, width: u.origin.size.width }
            }),
              u.origin.windowOffset.right = u.origin.windowOffset.left + u.origin.size.width,
              u.origin.windowOffset.bottom = u.origin.windowOffset.top + u.origin.size.height,
              u.origin.offset.left = u.origin.windowOffset.left + u.window.scroll.left,
              u.origin.offset.top = u.origin.windowOffset.top + u.window.scroll.top,
              u.origin.offset.bottom = u.origin.offset.top + u.origin.size.height,
              u.origin.offset.right = u.origin.offset.left + u.origin.size.width,
              u.available.document = {
                bottom: { height: u.document.size.height - u.origin.offset.bottom, width: u.document.size.width },
                left: { height: u.document.size.height, width: u.origin.offset.left },
                right: { height: u.document.size.height, width: u.document.size.width - u.origin.offset.right },
                top: { height: u.origin.offset.top, width: u.document.size.width }
              },
              u.available.window = {
                bottom: { height: Math.max(u.window.size.height - Math.max(u.origin.windowOffset.bottom, 0), 0), width: u.window.size.width },
                left: { height: u.window.size.height, width: Math.max(u.origin.windowOffset.left, 0) },
                right: { height: u.window.size.height, width: Math.max(u.window.size.width - Math.max(u.origin.windowOffset.right, 0), 0) },
                top: { height: Math.max(u.origin.windowOffset.top, 0), width: u.window.size.width }
              };
            'html' != c[0].tagName.toLowerCase();

          ) {
            if ('fixed' == c.css('position')) {
              u.origin.fixedLineage = !0
              break
            }
            c = c.parent()
          }
          return u
        },
        __optionsFormat: function () {
          return (
            'number' == typeof this.__options.animationDuration && (this.__options.animationDuration = [this.__options.animationDuration, this.__options.animationDuration]),
            'number' == typeof this.__options.delay && (this.__options.delay = [this.__options.delay, this.__options.delay]),
            'number' == typeof this.__options.delayTouch && (this.__options.delayTouch = [this.__options.delayTouch, this.__options.delayTouch]),
            'string' == typeof this.__options.theme && (this.__options.theme = [this.__options.theme]),
            null === this.__options.parent
              ? (this.__options.parent = t(s.window.document.body))
              : 'string' == typeof this.__options.parent && (this.__options.parent = t(this.__options.parent)),
            'hover' == this.__options.trigger
              ? ((this.__options.triggerOpen = { mouseenter: !0, touchstart: !0 }), (this.__options.triggerClose = { mouseleave: !0, originClick: !0, touchleave: !0 }))
              : 'click' == this.__options.trigger && ((this.__options.triggerOpen = { click: !0, tap: !0 }), (this.__options.triggerClose = { click: !0, tap: !0 })),
            this._trigger('options'),
            this
          )
        },
        __prepareGC: function () {
          var e = this
          return (
            e.__options.selfDestruction
              ? (e.__garbageCollector = setInterval(function () {
                  var i = new Date().getTime()
                  ;(e.__touchEvents = t.grep(e.__touchEvents, function (t, e) {
                    return i - t.time > 6e4
                  })),
                    n(e._$origin) ||
                      e.close(function () {
                        e.destroy()
                      })
                }, 2e4))
              : clearInterval(e.__garbageCollector),
            e
          )
        },
        __prepareOrigin: function () {
          var t = this
          if (
            (t._$origin.off('.' + t.__namespace + '-triggerOpen'),
            s.hasTouchCapability &&
              t._$origin.on('touchstart.' + t.__namespace + '-triggerOpen touchend.' + t.__namespace + '-triggerOpen touchcancel.' + t.__namespace + '-triggerOpen', function (e) {
                t._touchRecordEvent(e)
              }),
            t.__options.triggerOpen.click || (t.__options.triggerOpen.tap && s.hasTouchCapability))
          ) {
            var e = ''
            t.__options.triggerOpen.click && (e += 'click.' + t.__namespace + '-triggerOpen '),
              t.__options.triggerOpen.tap && s.hasTouchCapability && (e += 'touchend.' + t.__namespace + '-triggerOpen'),
              t._$origin.on(e, function (e) {
                t._touchIsMeaningfulEvent(e) && t._open(e)
              })
          }
          if (t.__options.triggerOpen.mouseenter || (t.__options.triggerOpen.touchstart && s.hasTouchCapability)) {
            e = ''
            t.__options.triggerOpen.mouseenter && (e += 'mouseenter.' + t.__namespace + '-triggerOpen '),
              t.__options.triggerOpen.touchstart && s.hasTouchCapability && (e += 'touchstart.' + t.__namespace + '-triggerOpen'),
              t._$origin.on(e, function (e) {
                ;(!t._touchIsTouchEvent(e) && t._touchIsEmulatedEvent(e)) || ((t.__pointerIsOverOrigin = !0), t._openShortly(e))
              })
          }
          if (t.__options.triggerClose.mouseleave || (t.__options.triggerClose.touchleave && s.hasTouchCapability)) {
            e = ''
            t.__options.triggerClose.mouseleave && (e += 'mouseleave.' + t.__namespace + '-triggerOpen '),
              t.__options.triggerClose.touchleave && s.hasTouchCapability && (e += 'touchend.' + t.__namespace + '-triggerOpen touchcancel.' + t.__namespace + '-triggerOpen'),
              t._$origin.on(e, function (e) {
                t._touchIsMeaningfulEvent(e) && (t.__pointerIsOverOrigin = !1)
              })
          }
          return t
        },
        __prepareTooltip: function () {
          var e = this,
            i = e.__options.interactive ? 'auto' : ''
          return (
            e._$tooltip.attr('id', e.__namespace).css({ 'pointer-events': i, zIndex: e.__options.zIndex }),
            t.each(e.__previousThemes, function (t, i) {
              e._$tooltip.removeClass(i)
            }),
            t.each(e.__options.theme, function (t, i) {
              e._$tooltip.addClass(i)
            }),
            (e.__previousThemes = t.merge([], e.__options.theme)),
            e
          )
        },
        __scrollHandler: function (e) {
          var i = this
          if (i.__options.triggerClose.scroll) i._close(e)
          else if (n(i._$origin) && n(i._$tooltip)) {
            var o = null
            if (e.target === s.window.document) i.__Geometry.origin.fixedLineage || (i.__options.repositionOnScroll && i.reposition(e))
            else {
              o = i.__geometry()
              var r = !1
              if (
                ('fixed' != i._$origin.css('position') &&
                  i.__$originParents.each(function (e, i) {
                    var n = t(i),
                      s = n.css('overflow-x'),
                      a = n.css('overflow-y')
                    if ('visible' != s || 'visible' != a) {
                      var l = i.getBoundingClientRect()
                      if ('visible' != s && (o.origin.windowOffset.left < l.left || o.origin.windowOffset.right > l.right)) return (r = !0), !1
                      if ('visible' != a && (o.origin.windowOffset.top < l.top || o.origin.windowOffset.bottom > l.bottom)) return (r = !0), !1
                    }
                    return 'fixed' != n.css('position') && void 0
                  }),
                r)
              )
                i._$tooltip.css('visibility', 'hidden')
              else if ((i._$tooltip.css('visibility', 'visible'), i.__options.repositionOnScroll)) i.reposition(e)
              else {
                var a = o.origin.offset.left - i.__Geometry.origin.offset.left,
                  l = o.origin.offset.top - i.__Geometry.origin.offset.top
                i._$tooltip.css({ left: i.__lastPosition.coord.left + a, top: i.__lastPosition.coord.top + l })
              }
            }
            i._trigger({ type: 'scroll', event: e, geo: o })
          }
          return i
        },
        __stateSet: function (t) {
          return (this.__state = t), this._trigger({ type: 'state', state: t }), this
        },
        __timeoutsClear: function () {
          return (
            clearTimeout(this.__timeouts.open),
            (this.__timeouts.open = null),
            t.each(this.__timeouts.close, function (t, e) {
              clearTimeout(e)
            }),
            (this.__timeouts.close = []),
            this
          )
        },
        __trackerStart: function () {
          var t = this,
            e = t._$tooltip.find('.tooltipster-content')
          return (
            t.__options.trackTooltip && (t.__contentBcr = e[0].getBoundingClientRect()),
            (t.__tracker = setInterval(function () {
              if (n(t._$origin) && n(t._$tooltip)) {
                if (t.__options.trackOrigin) {
                  var o = t.__geometry(),
                    r = !1
                  i(o.origin.size, t.__Geometry.origin.size) &&
                    (t.__Geometry.origin.fixedLineage
                      ? i(o.origin.windowOffset, t.__Geometry.origin.windowOffset) && (r = !0)
                      : i(o.origin.offset, t.__Geometry.origin.offset) && (r = !0)),
                    r || (t.__options.triggerClose.mouseleave ? t._close() : t.reposition())
                }
                if (t.__options.trackTooltip) {
                  var s = e[0].getBoundingClientRect()
                  ;(s.height === t.__contentBcr.height && s.width === t.__contentBcr.width) || (t.reposition(), (t.__contentBcr = s))
                }
              } else t._close()
            }, t.__options.trackerInterval)),
            t
          )
        },
        _close: function (e, i, n) {
          var o = this,
            r = !0
          if (
            (o._trigger({
              type: 'close',
              event: e,
              stop: function () {
                r = !1
              }
            }),
            r || n)
          ) {
            i && o.__callbacks.close.push(i), (o.__callbacks.open = []), o.__timeoutsClear()
            var a = function () {
              t.each(o.__callbacks.close, function (t, i) {
                i.call(o, o, { event: e, origin: o._$origin[0] })
              }),
                (o.__callbacks.close = [])
            }
            if ('closed' != o.__state) {
              var l = !0,
                c = new Date().getTime() + o.__options.animationDuration[1]
              if (('disappearing' == o.__state && c > o.__closingTime && o.__options.animationDuration[1] > 0 && (l = !1), l)) {
                ;(o.__closingTime = c), 'disappearing' != o.__state && o.__stateSet('disappearing')
                var u = function () {
                  clearInterval(o.__tracker),
                    o._trigger({ type: 'closing', event: e }),
                    o._$tooltip.off('.' + o.__namespace + '-triggerClose').removeClass('tooltipster-dying'),
                    t(s.window).off('.' + o.__namespace + '-triggerClose'),
                    o.__$originParents.each(function (e, i) {
                      t(i).off('scroll.' + o.__namespace + '-triggerClose')
                    }),
                    (o.__$originParents = null),
                    t(s.window.document.body).off('.' + o.__namespace + '-triggerClose'),
                    o._$origin.off('.' + o.__namespace + '-triggerClose'),
                    o._off('dismissable'),
                    o.__stateSet('closed'),
                    o._trigger({ type: 'after', event: e }),
                    o.__options.functionAfter && o.__options.functionAfter.call(o, o, { event: e, origin: o._$origin[0] }),
                    a()
                }
                s.hasTransitions
                  ? (o._$tooltip.css({
                      '-moz-animation-duration': o.__options.animationDuration[1] + 'ms',
                      '-ms-animation-duration': o.__options.animationDuration[1] + 'ms',
                      '-o-animation-duration': o.__options.animationDuration[1] + 'ms',
                      '-webkit-animation-duration': o.__options.animationDuration[1] + 'ms',
                      'animation-duration': o.__options.animationDuration[1] + 'ms',
                      'transition-duration': o.__options.animationDuration[1] + 'ms'
                    }),
                    o._$tooltip.clearQueue().removeClass('tooltipster-show').addClass('tooltipster-dying'),
                    o.__options.animationDuration[1] > 0 && o._$tooltip.delay(o.__options.animationDuration[1]),
                    o._$tooltip.queue(u))
                  : o._$tooltip.stop().fadeOut(o.__options.animationDuration[1], u)
              }
            } else a()
          }
          return o
        },
        _off: function () {
          return this.__$emitterPrivate.off.apply(this.__$emitterPrivate, Array.prototype.slice.apply(arguments)), this
        },
        _on: function () {
          return this.__$emitterPrivate.on.apply(this.__$emitterPrivate, Array.prototype.slice.apply(arguments)), this
        },
        _one: function () {
          return this.__$emitterPrivate.one.apply(this.__$emitterPrivate, Array.prototype.slice.apply(arguments)), this
        },
        _open: function (e, i) {
          var o = this
          if (!o.__destroying && n(o._$origin) && o.__enabled) {
            var r = !0
            if (
              ('closed' == o.__state &&
                (o._trigger({
                  type: 'before',
                  event: e,
                  stop: function () {
                    r = !1
                  }
                }),
                r && o.__options.functionBefore && (r = o.__options.functionBefore.call(o, o, { event: e, origin: o._$origin[0] }))),
              !1 !== r && null !== o.__Content)
            ) {
              i && o.__callbacks.open.push(i), (o.__callbacks.close = []), o.__timeoutsClear()
              var a,
                l = function () {
                  'stable' != o.__state && o.__stateSet('stable'),
                    t.each(o.__callbacks.open, function (t, e) {
                      e.call(o, o, { origin: o._$origin[0], tooltip: o._$tooltip[0] })
                    }),
                    (o.__callbacks.open = [])
                }
              if ('closed' !== o.__state)
                (a = 0),
                  'disappearing' === o.__state
                    ? (o.__stateSet('appearing'),
                      s.hasTransitions
                        ? (o._$tooltip.clearQueue().removeClass('tooltipster-dying').addClass('tooltipster-show'),
                          o.__options.animationDuration[0] > 0 && o._$tooltip.delay(o.__options.animationDuration[0]),
                          o._$tooltip.queue(l))
                        : o._$tooltip.stop().fadeIn(l))
                    : 'stable' == o.__state && l()
              else {
                if (
                  (o.__stateSet('appearing'),
                  (a = o.__options.animationDuration[0]),
                  o.__contentInsert(),
                  o.reposition(e, !0),
                  s.hasTransitions
                    ? (o._$tooltip
                        .addClass('tooltipster-' + o.__options.animation)
                        .addClass('tooltipster-initial')
                        .css({
                          '-moz-animation-duration': o.__options.animationDuration[0] + 'ms',
                          '-ms-animation-duration': o.__options.animationDuration[0] + 'ms',
                          '-o-animation-duration': o.__options.animationDuration[0] + 'ms',
                          '-webkit-animation-duration': o.__options.animationDuration[0] + 'ms',
                          'animation-duration': o.__options.animationDuration[0] + 'ms',
                          'transition-duration': o.__options.animationDuration[0] + 'ms'
                        }),
                      setTimeout(function () {
                        'closed' != o.__state &&
                          (o._$tooltip.addClass('tooltipster-show').removeClass('tooltipster-initial'),
                          o.__options.animationDuration[0] > 0 && o._$tooltip.delay(o.__options.animationDuration[0]),
                          o._$tooltip.queue(l))
                      }, 0))
                    : o._$tooltip.css('display', 'none').fadeIn(o.__options.animationDuration[0], l),
                  o.__trackerStart(),
                  t(s.window)
                    .on('resize.' + o.__namespace + '-triggerClose', function (e) {
                      var i = t(document.activeElement)
                      ;((i.is('input') || i.is('textarea')) && t.contains(o._$tooltip[0], i[0])) || o.reposition(e)
                    })
                    .on('scroll.' + o.__namespace + '-triggerClose', function (t) {
                      o.__scrollHandler(t)
                    }),
                  (o.__$originParents = o._$origin.parents()),
                  o.__$originParents.each(function (e, i) {
                    t(i).on('scroll.' + o.__namespace + '-triggerClose', function (t) {
                      o.__scrollHandler(t)
                    })
                  }),
                  o.__options.triggerClose.mouseleave || (o.__options.triggerClose.touchleave && s.hasTouchCapability))
                ) {
                  o._on('dismissable', function (t) {
                    t.dismissable
                      ? t.delay
                        ? ((h = setTimeout(function () {
                            o._close(t.event)
                          }, t.delay)),
                          o.__timeouts.close.push(h))
                        : o._close(t)
                      : clearTimeout(h)
                  })
                  var c = o._$origin,
                    u = '',
                    d = '',
                    h = null
                  o.__options.interactive && (c = c.add(o._$tooltip)),
                    o.__options.triggerClose.mouseleave && ((u += 'mouseenter.' + o.__namespace + '-triggerClose '), (d += 'mouseleave.' + o.__namespace + '-triggerClose ')),
                    o.__options.triggerClose.touchleave &&
                      s.hasTouchCapability &&
                      ((u += 'touchstart.' + o.__namespace + '-triggerClose'), (d += 'touchend.' + o.__namespace + '-triggerClose touchcancel.' + o.__namespace + '-triggerClose')),
                    c
                      .on(d, function (t) {
                        if (o._touchIsTouchEvent(t) || !o._touchIsEmulatedEvent(t)) {
                          var e = 'mouseleave' == t.type ? o.__options.delay : o.__options.delayTouch
                          o._trigger({ delay: e[1], dismissable: !0, event: t, type: 'dismissable' })
                        }
                      })
                      .on(u, function (t) {
                        ;(!o._touchIsTouchEvent(t) && o._touchIsEmulatedEvent(t)) || o._trigger({ dismissable: !1, event: t, type: 'dismissable' })
                      })
                }
                o.__options.triggerClose.originClick &&
                  o._$origin.on('click.' + o.__namespace + '-triggerClose', function (t) {
                    o._touchIsTouchEvent(t) || o._touchIsEmulatedEvent(t) || o._close(t)
                  }),
                  (o.__options.triggerClose.click || (o.__options.triggerClose.tap && s.hasTouchCapability)) &&
                    setTimeout(function () {
                      if ('closed' != o.__state) {
                        var e = '',
                          i = t(s.window.document.body)
                        o.__options.triggerClose.click && (e += 'click.' + o.__namespace + '-triggerClose '),
                          o.__options.triggerClose.tap && s.hasTouchCapability && (e += 'touchend.' + o.__namespace + '-triggerClose'),
                          i.on(e, function (e) {
                            o._touchIsMeaningfulEvent(e) && (o._touchRecordEvent(e), (o.__options.interactive && t.contains(o._$tooltip[0], e.target)) || o._close(e))
                          }),
                          o.__options.triggerClose.tap &&
                            s.hasTouchCapability &&
                            i.on('touchstart.' + o.__namespace + '-triggerClose', function (t) {
                              o._touchRecordEvent(t)
                            })
                      }
                    }, 0),
                  o._trigger('ready'),
                  o.__options.functionReady && o.__options.functionReady.call(o, o, { origin: o._$origin[0], tooltip: o._$tooltip[0] })
              }
              if (o.__options.timer > 0) {
                h = setTimeout(function () {
                  o._close()
                }, o.__options.timer + a)
                o.__timeouts.close.push(h)
              }
            }
          }
          return o
        },
        _openShortly: function (t) {
          var e = this,
            i = !0
          if (
            'stable' != e.__state &&
            'appearing' != e.__state &&
            !e.__timeouts.open &&
            (e._trigger({
              type: 'start',
              event: t,
              stop: function () {
                i = !1
              }
            }),
            i)
          ) {
            var n = 0 == t.type.indexOf('touch') ? e.__options.delayTouch : e.__options.delay
            n[0]
              ? (e.__timeouts.open = setTimeout(function () {
                  ;(e.__timeouts.open = null), e.__pointerIsOverOrigin && e._touchIsMeaningfulEvent(t) ? (e._trigger('startend'), e._open(t)) : e._trigger('startcancel')
                }, n[0]))
              : (e._trigger('startend'), e._open(t))
          }
          return e
        },
        _optionsExtract: function (e, i) {
          var n = this,
            o = t.extend(!0, {}, i),
            r = n.__options[e]
          return (
            r ||
              ((r = {}),
              t.each(i, function (t, e) {
                var i = n.__options[t]
                void 0 !== i && (r[t] = i)
              })),
            t.each(o, function (e, i) {
              void 0 !== r[e] &&
                ('object' != typeof i || i instanceof Array || null == i || 'object' != typeof r[e] || r[e] instanceof Array || null == r[e] ? (o[e] = r[e]) : t.extend(o[e], r[e]))
            }),
            o
          )
        },
        _plug: function (e) {
          var i = t.tooltipster._plugin(e)
          if (!i) throw new Error('The "' + e + '" plugin is not defined')
          return i.instance && t.tooltipster.__bridge(i.instance, this, i.name), this
        },
        _touchIsEmulatedEvent: function (t) {
          for (var e = !1, i = new Date().getTime(), n = this.__touchEvents.length - 1; n >= 0; n--) {
            var o = this.__touchEvents[n]
            if (!(i - o.time < 500)) break
            o.target === t.target && (e = !0)
          }
          return e
        },
        _touchIsMeaningfulEvent: function (t) {
          return (this._touchIsTouchEvent(t) && !this._touchSwiped(t.target)) || (!this._touchIsTouchEvent(t) && !this._touchIsEmulatedEvent(t))
        },
        _touchIsTouchEvent: function (t) {
          return 0 == t.type.indexOf('touch')
        },
        _touchRecordEvent: function (t) {
          return this._touchIsTouchEvent(t) && ((t.time = new Date().getTime()), this.__touchEvents.push(t)), this
        },
        _touchSwiped: function (t) {
          for (var e = !1, i = this.__touchEvents.length - 1; i >= 0; i--) {
            var n = this.__touchEvents[i]
            if ('touchmove' == n.type) {
              e = !0
              break
            }
            if ('touchstart' == n.type && t === n.target) break
          }
          return e
        },
        _trigger: function () {
          var e = Array.prototype.slice.apply(arguments)
          return (
            'string' == typeof e[0] && (e[0] = { type: e[0] }),
            (e[0].instance = this),
            (e[0].origin = this._$origin ? this._$origin[0] : null),
            (e[0].tooltip = this._$tooltip ? this._$tooltip[0] : null),
            this.__$emitterPrivate.trigger.apply(this.__$emitterPrivate, e),
            t.tooltipster._trigger.apply(t.tooltipster, e),
            this.__$emitterPublic.trigger.apply(this.__$emitterPublic, e),
            this
          )
        },
        _unplug: function (e) {
          var i = this
          if (i[e]) {
            var n = t.tooltipster._plugin(e)
            n.instance &&
              t.each(n.instance, function (t, n) {
                i[t] && i[t].bridged === i[e] && delete i[t]
              }),
              i[e].__destroy && i[e].__destroy(),
              delete i[e]
          }
          return i
        },
        close: function (t) {
          return this.__destroyed ? this.__destroyError() : this._close(null, t), this
        },
        content: function (t) {
          var e = this
          if (void 0 === t) return e.__Content
          if (e.__destroyed) e.__destroyError()
          else if ((e.__contentSet(t), null !== e.__Content)) {
            if ('closed' !== e.__state && (e.__contentInsert(), e.reposition(), e.__options.updateAnimation))
              if (s.hasTransitions) {
                var i = e.__options.updateAnimation
                e._$tooltip.addClass('tooltipster-update-' + i),
                  setTimeout(function () {
                    'closed' != e.__state && e._$tooltip.removeClass('tooltipster-update-' + i)
                  }, 1e3)
              } else
                e._$tooltip.fadeTo(200, 0.5, function () {
                  'closed' != e.__state && e._$tooltip.fadeTo(200, 1)
                })
          } else e._close()
          return e
        },
        destroy: function () {
          var e = this
          if (e.__destroyed) e.__destroyError()
          else {
            'closed' != e.__state ? e.option('animationDuration', 0)._close(null, null, !0) : e.__timeoutsClear(),
              e._trigger('destroy'),
              (e.__destroyed = !0),
              e._$origin.removeData(e.__namespace).off('.' + e.__namespace + '-triggerOpen'),
              t(s.window.document.body).off('.' + e.__namespace + '-triggerOpen')
            var i = e._$origin.data('tooltipster-ns')
            if (i)
              if (1 === i.length) {
                var n = null
                'previous' == e.__options.restoration
                  ? (n = e._$origin.data('tooltipster-initialTitle'))
                  : 'current' == e.__options.restoration && (n = 'string' == typeof e.__Content ? e.__Content : t('<div></div>').append(e.__Content).html()),
                  n && e._$origin.attr('title', n),
                  e._$origin.removeClass('tooltipstered'),
                  e._$origin.removeData('tooltipster-ns').removeData('tooltipster-initialTitle')
              } else
                (i = t.grep(i, function (t, i) {
                  return t !== e.__namespace
                })),
                  e._$origin.data('tooltipster-ns', i)
            e._trigger('destroyed'),
              e._off(),
              e.off(),
              (e.__Content = null),
              (e.__$emitterPrivate = null),
              (e.__$emitterPublic = null),
              (e.__options.parent = null),
              (e._$origin = null),
              (e._$tooltip = null),
              (t.tooltipster.__instancesLatestArr = t.grep(t.tooltipster.__instancesLatestArr, function (t, i) {
                return e !== t
              })),
              clearInterval(e.__garbageCollector)
          }
          return e
        },
        disable: function () {
          return this.__destroyed ? (this.__destroyError(), this) : (this._close(), (this.__enabled = !1), this)
        },
        elementOrigin: function () {
          return this.__destroyed ? void this.__destroyError() : this._$origin[0]
        },
        elementTooltip: function () {
          return this._$tooltip ? this._$tooltip[0] : null
        },
        enable: function () {
          return (this.__enabled = !0), this
        },
        hide: function (t) {
          return this.close(t)
        },
        instance: function () {
          return this
        },
        off: function () {
          return this.__destroyed || this.__$emitterPublic.off.apply(this.__$emitterPublic, Array.prototype.slice.apply(arguments)), this
        },
        on: function () {
          return this.__destroyed ? this.__destroyError() : this.__$emitterPublic.on.apply(this.__$emitterPublic, Array.prototype.slice.apply(arguments)), this
        },
        one: function () {
          return this.__destroyed ? this.__destroyError() : this.__$emitterPublic.one.apply(this.__$emitterPublic, Array.prototype.slice.apply(arguments)), this
        },
        open: function (t) {
          return this.__destroyed ? this.__destroyError() : this._open(null, t), this
        },
        option: function (e, i) {
          return void 0 === i
            ? this.__options[e]
            : (this.__destroyed
                ? this.__destroyError()
                : ((this.__options[e] = i),
                  this.__optionsFormat(),
                  t.inArray(e, ['trigger', 'triggerClose', 'triggerOpen']) >= 0 && this.__prepareOrigin(),
                  'selfDestruction' === e && this.__prepareGC()),
              this)
        },
        reposition: function (t, e) {
          var i = this
          return (
            i.__destroyed
              ? i.__destroyError()
              : 'closed' != i.__state &&
                n(i._$origin) &&
                (e || n(i._$tooltip)) &&
                (e || i._$tooltip.detach(), (i.__Geometry = i.__geometry()), i._trigger({ type: 'reposition', event: t, helper: { geo: i.__Geometry } })),
            i
          )
        },
        show: function (t) {
          return this.open(t)
        },
        status: function () {
          return { destroyed: this.__destroyed, enabled: this.__enabled, open: 'closed' !== this.__state, state: this.__state }
        },
        triggerHandler: function () {
          return this.__destroyed ? this.__destroyError() : this.__$emitterPublic.triggerHandler.apply(this.__$emitterPublic, Array.prototype.slice.apply(arguments)), this
        }
      }),
      (t.fn.tooltipster = function () {
        var e = Array.prototype.slice.apply(arguments),
          i = 'You are using a single HTML element as content for several tooltips. You probably want to set the contentCloning option to TRUE.'
        if (0 === this.length) return this
        if ('string' == typeof e[0]) {
          var n = '#*$~&'
          return (
            this.each(function () {
              var o = t(this).data('tooltipster-ns'),
                r = o ? t(this).data(o[0]) : null
              if (!r) throw new Error('You called Tooltipster\'s "' + e[0] + '" method on an uninitialized element')
              if ('function' != typeof r[e[0]]) throw new Error('Unknown method "' + e[0] + '"')
              this.length > 1 &&
                'content' == e[0] &&
                (e[1] instanceof t || ('object' == typeof e[1] && null != e[1] && e[1].tagName)) &&
                !r.__options.contentCloning &&
                r.__options.debug &&
                console.log(i)
              var s = r[e[0]](e[1], e[2])
              return s !== r || 'instance' === e[0] ? ((n = s), !1) : void 0
            }),
            '#*$~&' !== n ? n : this
          )
        }
        t.tooltipster.__instancesLatestArr = []
        var r = e[0] && void 0 !== e[0].multiple,
          s = (r && e[0].multiple) || (!r && o.multiple),
          a = e[0] && void 0 !== e[0].content,
          l = (a && e[0].content) || (!a && o.content),
          c = e[0] && void 0 !== e[0].contentCloning,
          u = (c && e[0].contentCloning) || (!c && o.contentCloning),
          d = e[0] && void 0 !== e[0].debug,
          h = (d && e[0].debug) || (!d && o.debug)
        return (
          this.length > 1 && (l instanceof t || ('object' == typeof l && null != l && l.tagName)) && !u && h && console.log(i),
          this.each(function () {
            var i = !1,
              n = t(this),
              o = n.data('tooltipster-ns'),
              r = null
            o ? (s ? (i = !0) : h && (console.log('Tooltipster: one or more tooltips are already attached to the element below. Ignoring.'), console.log(this))) : (i = !0),
              i &&
                ((r = new t.Tooltipster(this, e[0])),
                o || (o = []),
                o.push(r.__namespace),
                n.data('tooltipster-ns', o),
                n.data(r.__namespace, r),
                r.__options.functionInit && r.__options.functionInit.call(r, r, { origin: this }),
                r._trigger('init')),
              t.tooltipster.__instancesLatestArr.push(r)
          }),
          this
        )
      }),
      (e.prototype = {
        __init: function (e) {
          ;(this.__$tooltip = e),
            this.__$tooltip.css({ left: 0, overflow: 'hidden', position: 'absolute', top: 0 }).find('.tooltipster-content').css('overflow', 'auto'),
            (this.$container = t('<div class="tooltipster-ruler"></div>').append(this.__$tooltip).appendTo(s.window.document.body))
        },
        __forceRedraw: function () {
          var t = this.__$tooltip.parent()
          this.__$tooltip.detach(), this.__$tooltip.appendTo(t)
        },
        constrain: function (t, e) {
          return (this.constraints = { width: t, height: e }), this.__$tooltip.css({ display: 'block', height: '', overflow: 'auto', width: t }), this
        },
        destroy: function () {
          this.__$tooltip.detach().find('.tooltipster-content').css({ display: '', overflow: '' }), this.$container.remove()
        },
        free: function () {
          return (this.constraints = null), this.__$tooltip.css({ display: '', height: '', overflow: 'visible', width: '' }), this
        },
        measure: function () {
          this.__forceRedraw()
          var t = this.__$tooltip[0].getBoundingClientRect(),
            e = { size: { height: t.height || t.bottom - t.top, width: t.width || t.right - t.left } }
          if (this.constraints) {
            var i = this.__$tooltip.find('.tooltipster-content'),
              n = this.__$tooltip.outerHeight(),
              o = i[0].getBoundingClientRect(),
              r = { height: n <= this.constraints.height, width: t.width <= this.constraints.width && o.width >= i[0].scrollWidth - 1 }
            e.fits = r.height && r.width
          }
          return s.IE && s.IE <= 11 && e.size.width !== s.window.document.documentElement.clientWidth && (e.size.width = Math.ceil(e.size.width) + 1), e
        }
      })
    var l = navigator.userAgent.toLowerCase()
    ;-1 != l.indexOf('msie')
      ? (s.IE = parseInt(l.split('msie')[1]))
      : -1 !== l.toLowerCase().indexOf('trident') && -1 !== l.indexOf(' rv:11')
      ? (s.IE = 11)
      : -1 != l.toLowerCase().indexOf('edge/') && (s.IE = parseInt(l.toLowerCase().split('edge/')[1]))
    var c = 'tooltipster.sideTip'
    return (
      t.tooltipster._plugin({
        name: c,
        instance: {
          __defaults: function () {
            return { arrow: !0, distance: 6, functionPosition: null, maxWidth: null, minIntersection: 16, minWidth: 0, position: null, side: 'top', viewportAware: !0 }
          },
          __init: function (t) {
            var e = this
            ;(e.__instance = t),
              (e.__namespace = 'tooltipster-sideTip-' + Math.round(1e6 * Math.random())),
              (e.__previousState = 'closed'),
              e.__options,
              e.__optionsFormat(),
              e.__instance._on('state.' + e.__namespace, function (t) {
                'closed' == t.state ? e.__close() : 'appearing' == t.state && 'closed' == e.__previousState && e.__create(), (e.__previousState = t.state)
              }),
              e.__instance._on('options.' + e.__namespace, function () {
                e.__optionsFormat()
              }),
              e.__instance._on('reposition.' + e.__namespace, function (t) {
                e.__reposition(t.event, t.helper)
              })
          },
          __close: function () {
            this.__instance.content() instanceof t && this.__instance.content().detach(), this.__instance._$tooltip.remove(), (this.__instance._$tooltip = null)
          },
          __create: function () {
            var e = t(
              '<div class="tooltipster-base tooltipster-sidetip"><div class="tooltipster-box"><div class="tooltipster-content"></div></div><div class="tooltipster-arrow"><div class="tooltipster-arrow-uncropped"><div class="tooltipster-arrow-border"></div><div class="tooltipster-arrow-background"></div></div></div></div>'
            )
            this.__options.arrow || e.find('.tooltipster-box').css('margin', 0).end().find('.tooltipster-arrow').hide(),
              this.__options.minWidth && e.css('min-width', this.__options.minWidth + 'px'),
              this.__options.maxWidth && e.css('max-width', this.__options.maxWidth + 'px'),
              (this.__instance._$tooltip = e),
              this.__instance._trigger('created')
          },
          __destroy: function () {
            this.__instance._off('.' + self.__namespace)
          },
          __optionsFormat: function () {
            var e = this
            if (
              ((e.__options = e.__instance._optionsExtract(c, e.__defaults())),
              e.__options.position && (e.__options.side = e.__options.position),
              'object' != typeof e.__options.distance && (e.__options.distance = [e.__options.distance]),
              e.__options.distance.length < 4 &&
                (void 0 === e.__options.distance[1] && (e.__options.distance[1] = e.__options.distance[0]),
                void 0 === e.__options.distance[2] && (e.__options.distance[2] = e.__options.distance[0]),
                void 0 === e.__options.distance[3] && (e.__options.distance[3] = e.__options.distance[1])),
              (e.__options.distance = { top: e.__options.distance[0], right: e.__options.distance[1], bottom: e.__options.distance[2], left: e.__options.distance[3] }),
              'string' == typeof e.__options.side)
            ) {
              ;(e.__options.side = [e.__options.side, { top: 'bottom', right: 'left', bottom: 'top', left: 'right' }[e.__options.side]]),
                'left' == e.__options.side[0] || 'right' == e.__options.side[0] ? e.__options.side.push('top', 'bottom') : e.__options.side.push('right', 'left')
            }
            6 === t.tooltipster._env.IE && !0 !== e.__options.arrow && (e.__options.arrow = !1)
          },
          __reposition: function (e, i) {
            var n,
              o = this,
              r = o.__targetFind(i),
              s = []
            o.__instance._$tooltip.detach()
            var a = o.__instance._$tooltip.clone(),
              l = t.tooltipster._getRuler(a),
              c = !1,
              u = o.__instance.option('animation')
            switch (
              (u && a.removeClass('tooltipster-' + u),
              t.each(['window', 'document'], function (n, u) {
                var d = null
                if (
                  (o.__instance._trigger({
                    container: u,
                    helper: i,
                    satisfied: c,
                    takeTest: function (t) {
                      d = t
                    },
                    results: s,
                    type: 'positionTest'
                  }),
                  1 == d || (0 != d && 0 == c && ('window' != u || o.__options.viewportAware)))
                )
                  for (n = 0; n < o.__options.side.length; n++) {
                    var h = { horizontal: 0, vertical: 0 },
                      f = o.__options.side[n]
                    'top' == f || 'bottom' == f ? (h.vertical = o.__options.distance[f]) : (h.horizontal = o.__options.distance[f]),
                      o.__sideChange(a, f),
                      t.each(['natural', 'constrained'], function (t, n) {
                        if (
                          ((d = null),
                          o.__instance._trigger({
                            container: u,
                            event: e,
                            helper: i,
                            mode: n,
                            results: s,
                            satisfied: c,
                            side: f,
                            takeTest: function (t) {
                              d = t
                            },
                            type: 'positionTest'
                          }),
                          1 == d || (0 != d && 0 == c))
                        ) {
                          var a = { container: u, distance: h, fits: null, mode: n, outerSize: null, side: f, size: null, target: r[f], whole: null },
                            p = ('natural' == n ? l.free() : l.constrain(i.geo.available[u][f].width - h.horizontal, i.geo.available[u][f].height - h.vertical)).measure()
                          if (
                            ((a.size = p.size),
                            (a.outerSize = { height: p.size.height + h.vertical, width: p.size.width + h.horizontal }),
                            'natural' == n
                              ? i.geo.available[u][f].width >= a.outerSize.width && i.geo.available[u][f].height >= a.outerSize.height
                                ? (a.fits = !0)
                                : (a.fits = !1)
                              : (a.fits = p.fits),
                            'window' == u &&
                              (a.fits
                                ? (a.whole =
                                    'top' == f || 'bottom' == f
                                      ? i.geo.origin.windowOffset.right >= o.__options.minIntersection &&
                                        i.geo.window.size.width - i.geo.origin.windowOffset.left >= o.__options.minIntersection
                                      : i.geo.origin.windowOffset.bottom >= o.__options.minIntersection &&
                                        i.geo.window.size.height - i.geo.origin.windowOffset.top >= o.__options.minIntersection)
                                : (a.whole = !1)),
                            s.push(a),
                            a.whole)
                          )
                            c = !0
                          else if ('natural' == a.mode && (a.fits || a.size.width <= i.geo.available[u][f].width)) return !1
                        }
                      })
                  }
              }),
              o.__instance._trigger({
                edit: function (t) {
                  s = t
                },
                event: e,
                helper: i,
                results: s,
                type: 'positionTested'
              }),
              s.sort(function (t, e) {
                if (t.whole && !e.whole) return -1
                if (!t.whole && e.whole) return 1
                if (t.whole && e.whole) {
                  var i = o.__options.side.indexOf(t.side)
                  return (n = o.__options.side.indexOf(e.side)) > i ? -1 : i > n ? 1 : 'natural' == t.mode ? -1 : 1
                }
                if (t.fits && !e.fits) return -1
                if (!t.fits && e.fits) return 1
                if (t.fits && e.fits) {
                  var n
                  i = o.__options.side.indexOf(t.side)
                  return (n = o.__options.side.indexOf(e.side)) > i ? -1 : i > n ? 1 : 'natural' == t.mode ? -1 : 1
                }
                return 'document' == t.container && 'bottom' == t.side && 'natural' == t.mode ? -1 : 1
              }),
              ((n = s[0]).coord = {}),
              n.side)
            ) {
              case 'left':
              case 'right':
                n.coord.top = Math.floor(n.target - n.size.height / 2)
                break
              case 'bottom':
              case 'top':
                n.coord.left = Math.floor(n.target - n.size.width / 2)
            }
            switch (n.side) {
              case 'left':
                n.coord.left = i.geo.origin.windowOffset.left - n.outerSize.width
                break
              case 'right':
                n.coord.left = i.geo.origin.windowOffset.right + n.distance.horizontal
                break
              case 'top':
                n.coord.top = i.geo.origin.windowOffset.top - n.outerSize.height
                break
              case 'bottom':
                n.coord.top = i.geo.origin.windowOffset.bottom + n.distance.vertical
            }
            'window' == n.container
              ? 'top' == n.side || 'bottom' == n.side
                ? n.coord.left < 0
                  ? i.geo.origin.windowOffset.right - this.__options.minIntersection >= 0
                    ? (n.coord.left = 0)
                    : (n.coord.left = i.geo.origin.windowOffset.right - this.__options.minIntersection - 1)
                  : n.coord.left > i.geo.window.size.width - n.size.width &&
                    (i.geo.origin.windowOffset.left + this.__options.minIntersection <= i.geo.window.size.width
                      ? (n.coord.left = i.geo.window.size.width - n.size.width)
                      : (n.coord.left = i.geo.origin.windowOffset.left + this.__options.minIntersection + 1 - n.size.width))
                : n.coord.top < 0
                ? i.geo.origin.windowOffset.bottom - this.__options.minIntersection >= 0
                  ? (n.coord.top = 0)
                  : (n.coord.top = i.geo.origin.windowOffset.bottom - this.__options.minIntersection - 1)
                : n.coord.top > i.geo.window.size.height - n.size.height &&
                  (i.geo.origin.windowOffset.top + this.__options.minIntersection <= i.geo.window.size.height
                    ? (n.coord.top = i.geo.window.size.height - n.size.height)
                    : (n.coord.top = i.geo.origin.windowOffset.top + this.__options.minIntersection + 1 - n.size.height))
              : (n.coord.left > i.geo.window.size.width - n.size.width && (n.coord.left = i.geo.window.size.width - n.size.width), n.coord.left < 0 && (n.coord.left = 0)),
              o.__sideChange(a, n.side),
              (i.tooltipClone = a[0]),
              (i.tooltipParent = o.__instance.option('parent').parent[0]),
              (i.mode = n.mode),
              (i.whole = n.whole),
              (i.origin = o.__instance._$origin[0]),
              (i.tooltip = o.__instance._$tooltip[0]),
              delete n.container,
              delete n.fits,
              delete n.mode,
              delete n.outerSize,
              delete n.whole,
              (n.distance = n.distance.horizontal || n.distance.vertical)
            var d,
              h,
              f,
              p = t.extend(!0, {}, n)
            if (
              (o.__instance._trigger({
                edit: function (t) {
                  n = t
                },
                event: e,
                helper: i,
                position: p,
                type: 'position'
              }),
              o.__options.functionPosition)
            ) {
              var g = o.__options.functionPosition.call(o, o.__instance, i, p)
              g && (n = g)
            }
            l.destroy(),
              'top' == n.side || 'bottom' == n.side
                ? ((d = { prop: 'left', val: n.target - n.coord.left }), (h = n.size.width - this.__options.minIntersection))
                : ((d = { prop: 'top', val: n.target - n.coord.top }), (h = n.size.height - this.__options.minIntersection)),
              d.val < this.__options.minIntersection ? (d.val = this.__options.minIntersection) : d.val > h && (d.val = h),
              (f = i.geo.origin.fixedLineage
                ? i.geo.origin.windowOffset
                : { left: i.geo.origin.windowOffset.left + i.geo.window.scroll.left, top: i.geo.origin.windowOffset.top + i.geo.window.scroll.top }),
              (n.coord = { left: f.left + (n.coord.left - i.geo.origin.windowOffset.left), top: f.top + (n.coord.top - i.geo.origin.windowOffset.top) }),
              o.__sideChange(o.__instance._$tooltip, n.side),
              i.geo.origin.fixedLineage ? o.__instance._$tooltip.css('position', 'fixed') : o.__instance._$tooltip.css('position', ''),
              o.__instance._$tooltip
                .css({ left: n.coord.left, top: n.coord.top, height: n.size.height, width: n.size.width })
                .find('.tooltipster-arrow')
                .css({ left: '', top: '' })
                .css(d.prop, d.val),
              o.__instance._$tooltip.appendTo(o.__instance.option('parent')),
              o.__instance._trigger({ type: 'repositioned', event: e, position: n })
          },
          __sideChange: function (t, e) {
            t.removeClass('tooltipster-bottom')
              .removeClass('tooltipster-left')
              .removeClass('tooltipster-right')
              .removeClass('tooltipster-top')
              .addClass('tooltipster-' + e)
          },
          __targetFind: function (t) {
            var e = {},
              i = this.__instance._$origin[0].getClientRects()
            i.length > 1 &&
              1 == this.__instance._$origin.css('opacity') &&
              (this.__instance._$origin.css('opacity', 0.99), (i = this.__instance._$origin[0].getClientRects()), this.__instance._$origin.css('opacity', 1))
            if (i.length < 2)
              (e.top = Math.floor(t.geo.origin.windowOffset.left + t.geo.origin.size.width / 2)),
                (e.bottom = e.top),
                (e.left = Math.floor(t.geo.origin.windowOffset.top + t.geo.origin.size.height / 2)),
                (e.right = e.left)
            else {
              var n = i[0]
              ;(e.top = Math.floor(n.left + (n.right - n.left) / 2)),
                (n = i.length > 2 ? i[Math.ceil(i.length / 2) - 1] : i[0]),
                (e.right = Math.floor(n.top + (n.bottom - n.top) / 2)),
                (n = i[i.length - 1]),
                (e.bottom = Math.floor(n.left + (n.right - n.left) / 2)),
                (n = i.length > 2 ? i[Math.ceil((i.length + 1) / 2) - 1] : i[i.length - 1]),
                (e.left = Math.floor(n.top + (n.bottom - n.top) / 2))
            }
            return e
          }
        }
      }),
      t
    )
  }),
  window.addEventListener &&
    window.addEventListener(
      'load',
      function () {
        'use strict'
        var t = document.body
        if (t.getElementsByClassName && t.querySelector && t.classList && t.getBoundingClientRect) {
          var e,
            i = 'replace',
            n = 'preview',
            o = 'reveal',
            r = document.getElementsByClassName('progressive ' + i),
            s =
              window.requestAnimationFrame ||
              function (t) {
                t()
              }
          ;['pageshow', 'scroll', 'resize'].forEach(function (t) {
            window.addEventListener(t, a, { passive: !0 })
          }),
            window.MutationObserver && new MutationObserver(a).observe(t, { subtree: !0, childList: !0, attributes: !0 }),
            l()
        }
        function a() {
          e =
            e ||
            setTimeout(function () {
              ;(e = null), l()
            }, 300)
        }
        function l() {
          r.length &&
            s(function () {
              for (var t, e, i = window.innerHeight, n = 0; n < r.length; ) 0 < (e = (t = r[n].getBoundingClientRect()).top) + t.height && i > e ? c(r[n]) : n++
            })
        }
        function c(t, e) {
          t.classList.remove(i)
          var r = t.getAttribute('data-href') || t.href,
            a = t.querySelector('img.' + n)
          if (r && a) {
            var l = new Image(),
              u = t.dataset
            u && (u.srcset && (l.srcset = u.srcset), u.sizes && (l.sizes = u.sizes)),
              (l.onload = function () {
                r === t.href &&
                  ((t.style.cursor = 'default'),
                  t.addEventListener('click', function (t) {
                    t.preventDefault()
                  }))
                var e = l.classList
                ;(l.className = a.className),
                  e.remove(n),
                  e.add(o),
                  (l.alt = a.alt || ''),
                  s(function () {
                    t.insertBefore(l, a.nextSibling).addEventListener('animationend', function () {
                      t.removeChild(a), e.remove(o)
                    })
                  })
              }),
              (e = 1 + (e || 0)) < 3 &&
                (l.onerror = function () {
                  setTimeout(function () {
                    c(t, e)
                  }, 3e3 * e)
                }),
              (l.src = r)
          }
        }
      },
      !1
    ),
  $('.filter-widget .category-menu li').hover(function (t) {
    $(this).addClass('active'), t.preventDefault()
  }),
  $('.filter-widget .category-menu li').mouseleave(function (t) {
    $(this).removeClass('active'), t.preventDefault()
  })
var popupSize = { width: 780, height: 550 }
function countTime() {}
function getReviews(t) {
  $.ajax({
    url: t,
    type: 'get',
    data: model_data,
    success: function (t) {
      if ((console.log(t), 1 === t.status)) {
        $('.review_result').html(t.data), $('.review_count').html(t.count)
        var e = $('#review_rating')
        t.avgRating < 1 || null == t.avgRating
          ? e.html('No review yet.')
          : (e.rateYo().rateYo('destroy'),
            e.rateYo({ rating: parseFloat(t.avgRating).toFixed(2), readOnly: !0, starWidth: '20px', ratedFill: '#86bc42' }).attr('title', parseFloat(t.avgRating).toFixed(2))),
          $('.review_rating_item').each(function (t, e) {
            $(this)
              .rateYo({ rating: parseFloat($(this).data('rating')).toFixed(2), readOnly: !0, starWidth: '20px', ratedFill: '#86bc42' })
              .attr('title', parseFloat($(this).data('rating')).toFixed(2))
          })
      }
    },
    error: function (t) {
      console.log(t)
    }
  })
}
function ajaxSearch(t, e) {
  $.ajax({
    url: t,
    method: 'GET',
    data: { keyword: e },
    success: function (t) {
      console.log(t), 1 === t.status && ($('.blog_search_remove_section').remove(), $('.blog_append_section').html(t.data))
    },
    error: function (t) {
      console.log('Error!', t)
    }
  })
}
function getBlogAds(t, e = null) {
  $.ajax({
    url: '/blogAds/getData',
    method: 'POST',
    data: { _token: token, type: t, id: e },
    success: function (t) {
      console.log(t),
        1 === t.status &&
          $.each(t.data, function (t, e) {
            null !== e && $('.blog-ads-position-111' + e.position_id).html(e.frame)
          })
    },
    error: function (t) {
      console.log('Error!', t)
    }
  })
}
function hashUpdate(t) {
  if ('' !== t) {
    var e = t.split('/')
    $('.tab-link').removeClass('tab-active'),
      $('.tab_area').removeClass('area-active'),
      $('.tab-link[data-area="' + e[0] + e[1] + '"]').addClass('tab-active'),
      $(e[0] + e[1] + '_area').addClass('area-active'),
      null == e[2]
        ? $(e[0] + e[1] + '_area').addClass('area-active')
        : ($('.tab-link[data-area="' + e[0] + e[1] + e[2] + '"]').addClass('tab-active'), $(e[0] + e[1] + e[2] + '_area').addClass('area-active')),
      (window.location.hash = t)
  }
}
function dispErrors(t) {
  for (var e in t) {
    itoastr('error', t[e])
  }
}
function clearError() {
  $('.form-control-feedback').html('')
}
function btnLoading(t = '.smtBtn') {
  $(t).append(" <i class='fa fa-spinner fa-spin loading_div'></i>").attr('disabled', !0)
}
function btnLoadingStop(t = '.smtBtn') {
  $(t).attr('disabled', !1), $(t).find('.loading_div').remove()
}
function redirectAfterDelay(t) {
  setTimeout(function () {
    window.location.href = t
  }, 1e3)
}
function reloadAfterDelay(t) {
  setTimeout(function () {
    window.location.reload()
  }, 1e3)
}
function itoastr(t, e, i = null) {
  null == i && (i = t.toLowerCase()),
    'info' === i
      ? iziToast.info({ title: t, message: e, position: 'topCenter' })
      : 'error' === i
      ? iziToast.error({ title: t, message: e, position: 'topCenter' })
      : 'success' === i && iziToast.success({ title: t, message: e, position: 'topCenter' })
}
$(document).on('click', '.social-button', function (t) {
  var e = Math.floor(($(window).width() - popupSize.width) / 2),
    i = Math.floor(($(window).height() - popupSize.height) / 2),
    n = window.open(
      $(this).prop('href'),
      'social',
      'width=' + popupSize.width + ',height=' + popupSize.height + ',left=' + e + ',top=' + i + ',location=0,menubar=0,toolbar=0,status=0,scrollbars=1,resizable=1'
    )
  n && (n.focus(), t.preventDefault())
}),
  $(document).on('click', '.navbar-nav li a', function () {
    $('.navbar-nav li a').removeClass('top-menu-active'), $(this).addClass('top-menu-active')
  }),
  $(document).on('click', '.review_result .pagination a.page-link', function (t) {
    t.preventDefault(), getReviews($(this).attr('href'))
  }),
  $(document).on('submit', '.authentication_form', function () {
    btnLoading('.signupBtn')
  }),
  $(document).on('submit', '#ns_subscribe_form', function (t) {
    $('.ns_smt_btn').html("<i class='fa fa-spin fa-spinner'></i>").prop('disabled', !0)
  }),
  $(document).on('click', '.h_rm_btn', function (t) {
    t.preventDefault(),
      $.ajax({
        url: '/cart/remove',
        data: { id: $(this).data('id') },
        success: function (t) {
          $('.loading_div').remove(),
            0 === t.status ? dispErrors(t.data) : (itoastr('success', 'Successfully removed!'), $('.header_cart_area').html(t.data), $('.header_cart_area .cart_fa').click())
        },
        error: function (t) {
          console.log(t)
        }
      })
  }),
  $('#review_form').on('submit', function (t) {
    t.preventDefault(),
      $('.smtBtn').html("<i class='fa fa-spinner fa-spin fa-fw'></i>").attr('disabled', !0),
      $.post(this.action, new FormData(this), (t) => {
        $('.form-control-feedback').html(''), itoastr('success', 'Success!'), getReviews(pageUrl)
      }).then(() => {
        $('.smtBtn').html('Leave Review').attr('disabled', !1)
      })
  }),
  $(document).on('keyup', '#blog_search_input', function () {
    ajaxSearch('/blog/search', $(this).val())
  }),
  $(document).on('click', '.search_result_area .pagination a', function (t) {
    t.preventDefault()
    var e = $('#blog_search_input').val()
    ajaxSearch($(this).attr('href'), e)
  }),
  $(document).on('click', '.blogAds-click-funnel', function (t) {
    t.preventDefault()
    var e = $(this).data('id')
    window.open($(this).data('url'), '_blank'),
      $.ajax({
        url: '/blogAds/impClick',
        method: 'POST',
        data: { _token: token, id: e },
        success: function (t) {
          console.log(t)
        }
      })
  }),
  $(document).on('click', '.tab-link', function () {
    hashUpdate(this.hash)
  }),
  $('.loadBtn').click(function () {
    $(this).addClass('m-loader m-loader--light m-loader--right').attr('disabled', !0)
  }),
  $('.tooltip_1').tooltipster({ theme: 'tooltipster-noir', trigger: 'click' }),
  $('.tooltip_2').tooltipster({ theme: 'tooltipster-noir', contentAsHTML: 'true', trigger: 'click' }),
  $('.tooltip_3').tooltipster({ theme: 'tooltipster-noir', contentAsHTML: 'true' }),
  iziToast.settings({ timeout: 3e5 })
const askToast = {
  info: function (t, e, i) {
    var n = setObj(t, e, i)
    iziToast.info(n)
  },
  success: function (t, e, i) {
    var n = setObj(t, e, i)
    iziToast.success(n)
  },
  question: function (t, e, i) {
    var n = setObj(t, e, i)
    iziToast.question(n)
  },
  error: function (t, e, i) {
    var n = setObj(t, e, i)
    iziToast.error(n)
  }
}
function setObj(t, e, i) {
  return {
    timeout: 2e4,
    close: !1,
    overlay: !0,
    displayMode: 'once',
    id: 'question',
    zindex: 999,
    message: e,
    title: t,
    position: 'center',
    buttons: [
      [
        '<button><b>YES</b></button>',
        function (t, e) {
          t.hide({ transitionOut: 'fadeOut' }, e, 'button'), 'function' == typeof i ? i() : window[i]()
        },
        !0
      ],
      [
        '<button>NO</button>',
        function (t, e) {
          t.hide({ transitionOut: 'fadeOut' }, e, 'button')
        }
      ]
    ]
  }
}
function dispValidErrors(t) {
  $.each(t, function (t, e) {
    $('.error-' + t).html(e)
  })
}
function pickDate(t, e) {
  var i = [],
    n = 0,
    o = 0
  if (365 === e) (n = moment(t).startOf('year')), (o = moment(t).endOf('year'))
  else if (180 === e) {
    var r = moment(t).month()
    r < 3
      ? ((n = moment(t).startOf('year')), (o = moment(t).add(3, 'M').endOf('quarter')))
      : r < 6
      ? ((n = moment(t).startOf('year')), (o = moment(t).endOf('quarter')))
      : r < 9
      ? ((n = moment(t).startOf('quarter')), (o = moment(t).endOf('year')))
      : ((n = moment(t).sub(3, 'M').startOf('quarter')), (o = moment(t).endOf('year')))
  } else if (90 === e) (n = moment(t).startOf('quarter')), (o = moment(t).endOf('quarter'))
  else if (30 === e) (n = moment(t).startOf('month')), (o = moment(t).endOf('month'))
  else if (14 === e) {
    isEven(moment(t).week()) ? ((n = moment(t).weekday(-7)), (o = moment(t).endOf('week'))) : ((n = moment(t).startOf('week')), (o = moment(t).weekday(13)))
  } else 7 === e ? ((n = moment(t).startOf('week')), (o = moment(t).endOf('week'))) : 1 === e && ((n = moment(t)), (o = moment(t)))
  return (i[0] = n.format('YYYY-MM-DD')), (i[1] = o.format('YYYY-MM-DD')), i
}
function isEven(t) {
  return t % 2 == 0
}
function roundFloat(t) {
  return Math.round(100 * (t + Number.EPSILON)) / 100
}
function uuidv4() {
  return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, (t) => (t ^ (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (t / 4)))).toString(16))
}
$(document).on('click', '.slim-btn.slim-btn-remove', function (t) {
  t.preventDefault(), $(this).parents('div.slimdiv').find('input[type=file]').click()
}),
  $(document).on('click', '.slimdiv .slim-file-hopper img', function (t) {
    t.preventDefault(), $('div.slimdiv input[type=file]').click()
  }),
  ($.post = (t, e = null, i, n) =>
    new Promise((o) => {
      $.ajax({
        headers: { 'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content') },
        url: t,
        type: 'POST',
        data: e,
        contentType: !1,
        cache: !1,
        processData: !1,
        success: (t) => {
          t.status
            ? (i(t), o({ success: !0 }))
            : ('function' == typeof n && n(t.data),
              console.log(t),
              t.errors.forEach((t) => {
                itoastr('error', t)
              }),
              o({ success: !1 }))
        },
        error: function (e) {
          console.error(t, e), o({ success: !1 })
        }
      })
    })),
  $.fn.extend({
    loading(t = !0) {
      t ? $(this).append(" <i class='fa fa-spinner fa-spin loading_div'></i>").attr('disabled', !0) : ($(this).attr('disabled', !1), $(this).find('.loading_div').remove())
    },
    clearForm() {
      $(this).find('input').val(''), $(this).find('textarea').text('')
    }
  }),
  ($.existFile = (t, e) => {
    t &&
      $.ajax({
        type: 'get',
        url: '/check-file-existence/?path=' + t,
        success: e,
        error: function (t) {
          console.log('check file existence error', t)
        }
      })
  }),
  (window.fog = function (t) {
    let e = {}
    t.forEach((t, i) => {
      e[i] = t
    }),
      console.log(e)
  })
