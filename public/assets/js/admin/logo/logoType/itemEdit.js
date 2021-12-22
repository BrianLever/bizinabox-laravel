$('#submit_form').submit(function (event) {
  event.preventDefault()
  btnLoading()
  $.ajax({
    url: $(this).attr('action'),
    method: 'POST',
    data: new FormData(this),
    dataType: 'JSON',
    contentType: false,
    cache: false,
    processData: false,
    success: function (result) {
      btnLoadingStop()
      clearError()

      if (result.status === 0) {
        dispErrors(result.data)
        dispValidErrors(result.data)
      } else {
        itoastr('success', 'Success!')

        redirectAfterDelay('/admin/logotypes/item')
      }
    },
    error: function (e) {
      console.log(e)
    }
  })
})
