$(document).ready(function () {
  $('.selectpicker').selectpicker()
})

$('#submit_form').on('submit', function (event) {
  event.preventDefault()
  var formData = new FormData(this)
  if (previewCropped !== '') {
    formData.append('image', previewCropped)
  }
  btnLoading()
  $.ajax({
    url: $(this).attr('action'),
    method: 'POST',
    data: formData,
    dataType: 'JSON',
    contentType: false,
    cache: false,
    processData: false,
    success: function (result) {
      console.log(result)
      btnLoadingStop()
      clearError()

      if (result.status === 0) {
        dispValidErrors(result.data)
        dispErrors(result.data)
      } else {
        itoastr('success', 'Success!')
        setTimeout(function () {
          window.location.href = '/admin/palette-idea/item'
        }, 1000)
      }
    },
    error: function (e) {
      console.log(e)
    }
  })
})
