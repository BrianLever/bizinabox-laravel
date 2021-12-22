module.exports = {
  /**
   * Send the form to the back-end server.
   *
   * This function will clear old errors, update "busy" status, etc.
   */
  send(uri, form, method) {
    return new Promise((resolve, reject) => {
      form.startProcessing()

      return this.request(uri, form, method)
        .then((response) => {
          // Finish processing form
          form.finishProcessing()

          // Resolve response
          resolve(response.data)
        })
        .catch((response) => {
          // Set errors to form
          form.setErrors(response.data.errors)

          // Too many request error
          if (response.status === 429) {
            app.__vue__.notification('error', response.data.message)
          }

          // Reject error from response
          reject(response)
        })
    })
  }
}
