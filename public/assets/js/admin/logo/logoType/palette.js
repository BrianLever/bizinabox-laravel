var sort_gradient
var deleteId
$(function () {
  getDatatableTable()

  $.contextMenu({
    selector: '.palette_item_div',
    callback: function (key, options) {
      let id = $(this).data('id')
      let name = $(this).data('name')
      handleContext(id, name, key)
    },
    items: {
      edit: { name: 'Edit' },
      delete: { name: 'Delete' }
    }
  })
})
function handleContext(id, name, key) {
  if (key === 'edit') {
    window.location.href = '/admin/logotypes/color/item/edit/' + id
  } else if (key === 'delete') {
    deleteId = id
    askToast.question('Confirm', `Are you sure to delete "${name}" category?`, 'switchAction')
  }
}

function switchAction() {
  $.ajax({
    url: '/admin/logotypes/color/item/delete/' + deleteId,
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
    url: '/admin/logotypes/color/item/' + category_id,
    type: 'get',
    dataType: 'JSON',
    contentType: false,
    cache: false,
    processData: false,
    success: function (result) {
      console.log(result)
      if (result.status === 1) {
        $('.palette_body').html(result.palette)
        $('.palette_count').html(result.count.palette)
      }
    },
    error: function (e) {
      console.log(e)
    }
  })
}
$('.sortBtn').click(function (e) {
  e.preventDefault()
  sort_gradient = $(this).data('gradient')
  getOrder()
})
function getOrder() {
  $.ajax({
    url: '/admin/logotypes/color/item/sort/get',
    method: 'GET',
    data: { category: category_id },
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
    url: '/admin/logotypes/color/item/sort/get',
    method: 'POST',
    data: { _token: token, sorts: sorts, category: category_id },
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
