var sort_gradient
var deleteId
$(function () {
  hashUpdate(window.location.hash)
  getDatatableTable()

  $.contextMenu({
    selector: '.color_cat_item',
    callback: function (key, options) {
      let id = $(this).data('id')
      let name = $(this).data('name')
      let status = $(this).data('status')
      handleContext(id, name, status, key)
    },
    items: {
      view: { name: 'View' },
      edit: { name: 'Edit' },
      delete: { name: 'Delete' }
    }
  })
})
function handleContext(id, name, status, key) {
  if (key === 'view') {
    window.location.href = '/admin/logotypes/color/item/' + id
  } else if (key === 'edit') {
    $('#category_id').val(id)
    $('#name').val(name)
    if (status === 1) {
      $('#status').prop('checked', true)
    } else {
      $('#status').prop('checked', false)
    }
    $('#category_modal').modal('show')
  } else if (key === 'delete') {
    deleteId = id
    askToast.question('Confirm', `Are you sure to delete "${name}" category?`, 'switchAction')
  }
}

function switchAction() {
  $.ajax({
    url: '/admin/logotypes/color/category/delete/' + deleteId,
    data: { _token: token },
    method: 'delete',
    success: function (result) {
      console.log(result)
      if (result.status === 1) {
        itoastr('success', 'Success!')

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
function getDatatableTable() {
  $.ajax({
    url: '/admin/logotypes/color',
    type: 'get',
    dataType: 'JSON',
    contentType: false,
    cache: false,
    processData: false,
    success: function (result) {
      console.log(result)
      if (result.status === 1) {
        $('.gradient_body').html(result.gradient)
        $('.solid_body').html(result.solid)
        $('.gradient_count').html(result.count.gradient)
        $('.solid_count').html(result.count.solid)
      }
    },
    error: function (e) {
      console.log(e)
    }
  })
}
$('.create_cat_btn').click(function (e) {
  e.preventDefault()
  $('#category_id').val(null)
  $('#gradient').val($(this).data('gradient'))
  $('#name').val(null)
  $('#status').prop('checked', true)
  $('#category_modal').modal('show')
})
$('.sortBtn').click(function (e) {
  e.preventDefault()
  sort_gradient = $(this).data('gradient')
  getOrder()
})
function getOrder() {
  $.ajax({
    url: '/admin/logotypes/color/category/sort',
    method: 'GET',
    data: { gradient: sort_gradient },
    success: function (result) {
      mApp.unblockPage()
      if (result.status === 1) {
        $('#sortable').html(result.data)
        $('#sort-modal').modal('toggle')
        $('#sortable').sortable()
        $('#sortable').disableSelection()
      } else {
        dispErrors(result.data)
      }
    },
    error: function (err) {
      console.log('Error!', err)
    }
  })
}

$('#sort_submit').click(function () {
  mApp.block('#sort-modal .modal-content', {})
  var sorts = []
  $('#sortable li').each(function (index) {
    sorts.push($(this).data('id'))
  })
  $.ajax({
    url: '/admin/logotypes/color/category/sort',
    method: 'POST',
    data: { _token: token, sorts: sorts, gradient: sort_gradient },
    success: function (result) {
      mApp.unblock('#sort-modal .modal-content', {})
      if (result.status === 1) {
        itoastr('success', 'Success!')
        $('#sort-modal').modal('toggle')
        getDatatableTable()
      } else {
        dispErrors(result.data)
      }
    },
    error: function (err) {
      console.log('Error!', err)
    }
  })
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
        $('#category_modal').modal('toggle')
        getDatatableTable()
      }
    },
    error: function (e) {
      console.log(e)
    }
  })
})
