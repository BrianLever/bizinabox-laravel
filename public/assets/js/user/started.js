$(document).ready(function () {
  hashUpdate(window.location.hash)
  $('#timezone').val(timezone).selectpicker()
  $('#date_of_birth').inputmask('9999-99-99', {
    placeholder: 'YYYY-MM-DD'
  })
})

$('#username_form').on('submit', function (e) {
  e.preventDefault()
  btnLoading()
  $.ajax({
    url: $(this).attr('action'),
    method: 'post',
    data: new FormData(this),
    dataType: 'json',
    contentType: false,
    cache: false,
    processData: false,
    success: function (result) {
      console.log(result)
      btnLoadingStop()
      clearError()
      if (result.status === 1) {
        updateProgressPercentage(result.data)
        hashUpdate('#/setup-demographic')
      } else {
        dispValidErrors(result.data)
      }
    }
  })
})

$('#demographic_form').on('submit', function (e) {
  e.preventDefault()
  btnLoading()
  $.ajax({
    url: $(this).attr('action'),
    method: 'post',
    data: new FormData(this),
    dataType: 'json',
    contentType: false,
    cache: false,
    processData: false,
    success: function (result) {
      console.log(result)
      btnLoadingStop()
      clearError()
      if (result.status === 1) {
        updateProgressPercentage(result.data)
        hashUpdate('#/setup-time')
      } else {
        dispValidErrors(result.data)
      }
    }
  })
})

$('#time_form').on('submit', function (e) {
  e.preventDefault()
  btnLoading()
  $.ajax({
    url: $(this).attr('action'),
    method: 'post',
    data: new FormData(this),
    dataType: 'json',
    contentType: false,
    cache: false,
    processData: false,
    success: function (result) {
      console.log(result)
      btnLoadingStop()
      clearError()
      if (result.status === 1) {
        updateProgressPercentage(result.data)
        hashUpdate('#/setup-complete')
      } else {
        dispValidErrors(result.data)
      }
    }
  })
})
function updateProgressPercentage(value) {
  $('.progress_percentage').html(value)
  $('.progress_bar').css('width', value + '%')
}
