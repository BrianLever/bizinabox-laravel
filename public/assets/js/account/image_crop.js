var isInitialized = false
var previewCropped = ''
var cropper = ''
var file = ''

var i = 0
var j = 0
var k = 0

$(document).on('click', '#addImage', function () {
  $('#image_area').append(
    '<tr><td><input type="file" accept="image/*" name=\'images[]\' class="form-control m-input--square uploadImageBox" data-target=\'image-' +
      i +
      "'></td><td><img id='image-" +
      i +
      "' class='width-150' /></td><td><button class='btn btn-danger btn-sm delBtn'>X</button></td></tr>"
  )
  i++
})
$(document).on('click', '#addVideo', function () {
  $('#video_area').append(
    '<tr><td><input type="file" accept="video/*" name=\'videos[]\' class="form-control m-input--square"></td><td><button class=\'btn btn-danger btn-sm delBtn\'>X</button></td></tr>'
  )
  j++
})
$(document).on('click', '#addLink', function () {
  $('#link_area').append(
    '<tr><td><input type="url" name=\'links[]\' class="form-control m-input--square"></td><td><button class=\'btn btn-danger btn-sm delBtn\'>X</button></td></tr>'
  )
  k++
})
$(document).on('click', '.delBtn', function () {
  $(this).parent().parent().remove()
})
