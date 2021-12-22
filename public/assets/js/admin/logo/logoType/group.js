var deleteUrl

$(function () {
  function custom_template(obj) {
    var data = $(obj.element).data()
    var text = $(obj.element).text()
    if (data && data['img_src']) {
      img_src = data['img_src']
      template = $('<div><img src="' + img_src + '" style="width:100px;"/><p class=\'border-top mb-0 pl-3\'>' + text + '</p></div>')
      return template
    }
  }

  var options = {
    templateSelection: custom_template,
    templateResult: custom_template,
    width: '100%'
  }

  $('.select2').select2(options)
  getDatatableTable()
})

function getDatatableTable() {
  $.ajax({
    url: '/admin/logotypes/group',
    type: 'get',
    dataType: 'JSON',
    contentType: false,
    cache: false,
    processData: false,
    success: function (result) {
      if (result.status === 1) {
        $('.show_checked').addClass('d-none')

        $('#all_area .m-portlet__body').html(result.all)
        $('.all_count').html(result.count.all)
        $('.datatable').dataTable(dataTblSet())
      }
    },
    error: function (e) {
      console.log(e)
    }
  })
}

$('.createBtn').click(function () {
  $('#category_id').val(null)
  $('#group_id').val(null)
  $('#name').val(null)
  $('#description').val(null)
  $('#create_modal').modal('toggle')
})
$('#create_modal_form').submit(function (event) {
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
        $('#create_modal').modal('toggle')
        getDatatableTable()
      }
    },
    error: function (e) {
      console.log(e)
    }
  })
})
$(document).on('click', '.edit_btn', function () {
  let group_id = $(this).data('id')
  let name = $(this).data('name')
  let types = $(this).data('types')
  let main = $(this).data('main')

  $('#group_id').val(group_id)
  $('#name').val(name)
  $('#logoTypes').val(types).trigger('change.select2')
  $('#mainLogo')
    .val(main[0] ?? 0)
    .selectpicker('refresh')

  $('#create_modal').modal('toggle')
})
$(document).on('click', '.deleteBtn', function (e) {
  e.preventDefault()
  deleteUrl = $(this).attr('href')
  askToast.question('Confirm', 'Are you sure?', 'switchAction')
})
function switchAction() {
  $.ajax({
    url: deleteUrl,
    data: { _token: token },
    method: 'delete',
    success: function (result) {
      console.log(result)
      if (result.status === 1) {
        itoastr('success', 'Successfully deleted!')
        getDatatableTable()
      } else {
        dispErrors(result.data)
      }
    },
    error: function (e) {
      console.log(e)
    }
  })
}
