async function createModal({ title, description }) {
  return new Promise((resolve) => {
    const overLayer = document.createElement('div')
    overLayer.className = 'over-layer'
    const modal = document.createElement('div')
    modal.className = 'bz-modal'
    const closeBtn = document.createElement('div')
    closeBtn.className = 'bz-modal-close'

    const modalHeader = document.createElement('div')
    modalHeader.className = 'bz-modal-header'
    modalHeader.innerHTML = title

    const modalBody = document.createElement('div')
    modalBody.className = 'bz-modal-body'
    modalBody.innerHTML = description

    const modalFooter = document.createElement('div')
    modalFooter.className = 'bz-modal-footer'

    const btnYes = document.createElement('button')
    btnYes.className = 'bz-btn-yes'
    btnYes.innerHTML = 'Yes'

    const btnNo = document.createElement('button')
    btnNo.className = 'bz-btn-no'
    btnNo.innerHTML = 'No'

    modalFooter.appendChild(btnYes)
    modalFooter.appendChild(btnNo)

    modal.appendChild(closeBtn)
    modal.appendChild(modalHeader)
    modal.appendChild(modalBody)
    modal.appendChild(modalFooter)
    overLayer.appendChild(modal)
    document.body.appendChild(overLayer)

    function onCancel() {
      resolve(false)
      overLayer.remove()
    }

    function onContinue() {
      resolve(true)
      overLayer.remove()
    }

    btnYes.addEventListener('click', onContinue)
    closeBtn.addEventListener('click', onCancel)
    btnNo.addEventListener('click', onCancel)
    overLayer.addEventListener('click', (e) => {
      const target = e.target
      if (target && target.nodeType === 1 && target.parentNode && !target.closest('.bz-modal')) {
        onCancel()
      }
    })
  })
}

export default {
  install(Vue) {
    Vue.prototype.$dialog = {
      confirm: async ({ title, description } = {}) => {
        return new Promise((resolve) => {
          createModal({
            title: title || 'Confirmation',
            description: description || 'Are you sure with this action?'
          }).then((res) => {
            resolve(res)
          })
        })
      }
    }
  }
}
