module.exports = {
  /**
   *
   * @param url
   * @param params
   * @returns {*|Promise}
   */
  get(url, data = {}) {
    let params = {
      params: data
    }
    return this.send(url, params, 'get')
  },

  /**
   *
   * @param url
   * @param data
   * @returns {Promise}
   */
  post(url, data = {}) {
    return this.send(url, data, 'post')
  },

  /**
   *
   * @param url
   * @param data
   * @returns {*|Promise}
   */
  put(url, data = {}) {
    return this.send(url, data, 'put')
  },

  /**
   *
   * @param url
   * @param data
   * @returns {*|Promise}
   */
  patch(url, data = {}) {
    return this.send(url, data, 'patch')
  },

  /**
   *
   * @param url
   * @param data
   * @returns {*|Promise}
   */
  delete(url, data = {}) {
    return this.send(url, data, 'delete')
  },

  /**
   *
   * @param options
   */
  setOptions(options) {
    if (options) {
      this.options = options
    }
  },

  getOptions() {
    let options = this.options || {}

    return Object.assign(options, {
      headers: {
        Accept: 'application/json',
        'X-Requested-With': 'XMLHttpRequest'
      }
    })
  },

  /**
   * @param url
   * @param data
   * @param method
   * @returns {Promise}
   */
  send(url, data = {}, method = 'get') {
    return this.request(url, data, method)
  },

  /**
   *
   * @param url
   * @param data
   * @param method
   * @returns {Promise}
   */
  request(url, data = {}, method = 'get') {
    return new Promise((resolve, reject) => {
      window.axios[method](url, data, this.getOptions())
        .then((response) => {
          resolve(response)
        })
        .catch((error) => {
          reject(error.response)

          // Unknown status
          if (error.response.status === 419) {
            window.location.reload()
          }
        })
    })
  }
}
