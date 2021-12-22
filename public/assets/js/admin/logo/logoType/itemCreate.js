let previewCropper
$(function () {
  $('.select2').select2({
    width: '100%',
    placeholder: 'Select Categories'
  })

  let previewImage = $('#preview_image')
  let previewImageUrl = previewImage.data('url')
  previewCropper = new Slim(previewImage[0], {
    ratio: '2:1',
    download: true,
    buttonRemoveTitle: 'upload',
    instantEdit: false,
    maxFileSize: 50,
    label: 'Drop or choose image'
  })
  if (previewImageUrl) {
    previewCropper.load(previewImageUrl + '?' + new Date().getTime())
  }
})

$('#font_names').change(function (e) {
  let formData = new FormData()
  formData.append('font', e.currentTarget.files[0])
  formData.append('_token', token)

  $.ajax({
    url: '/admin/logotypes/item/getFontName',
    method: 'POST',
    data: formData,
    dataType: 'JSON',
    contentType: false,
    cache: false,
    processData: false,
    success: function (result) {
      if (result.status === 1) {
        $('.font_name_result').html('<b>Font Name:' + result.data + '</b>')
      } else {
        dispValidErrors(result.data)
        dispErrors(result.data)
      }
    },
    error: function (err) {
      console.log('Error!', err)
    }
  })
})
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
      console.log(result)
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
