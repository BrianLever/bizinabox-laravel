let dataTable
$(function () {
  slimCropper = new Slim(document.getElementById('slimInput'), {
    ratio: '1:1',
    download: true,
    buttonRemoveTitle: 'upload',
    instantEdit: false,
    maxFileSize: 50,
    label: 'Drop or choose image'
  })

  dataTable = $('#faviconCategoryTable').crud({
    deleteUrl: '/admin/favicon/categories',
    ajaxOption: {
      ajax: '/admin/favicon/category'
    },
    fnEdit: (e) => {
      const data = e.editItemData
      $('#category_id').val(data.id)
      $('#name').val(data.name)
      $('#description').val(data.description)
      slimCropper.load(data.thumbnail + '?1')
    }
  })
})

let sort_cat_id

$('.sortBtn').click(function () {
  sort_cat_id = 0
  getOrder()
})

$(document).on('click', '.sort-order', function (e) {
  e.preventDefault()
  sort_cat_id = $(this).data('id')
  getOrder()
})

function getOrder() {
  $.ajax({
    url: '/admin/favicon/category/sort',
    method: 'GET',
    data: { cat_id: sort_cat_id },
    success: function (result) {
      $('#sortable').html(result.view)
      $('#sort-modal').modal('toggle')
      $('#sortable').sortable()
      $('#sortable').disableSelection()
    },
    error: function (err) {
      console.log('Error!', err)
    }
  })
}
$('#sort_submit').click(function () {
  mApp.block('#sort-modal .modal-content', {})
  let sorts = []
  $('#sortable li').each(function (index) {
    sorts.push($(this).data('id'))
  })
  $.ajax({
    url: '/admin/favicon/category/sort',
    method: 'POST',
    data: { _token: token, sorts: sorts, cat_id: sort_cat_id },
    success: function (result) {
      mApp.unblock('#sort-modal .modal-content', {})
      if (result.status === 1) {
        itoastr('success', 'Successfully Updated!')
        $('#sort-modal').modal('toggle')
        dataTable.table.api().ajax.reload()
      } else {
        dispErrors(result.data)
      }
    },
    error: function (err) {
      console.log('Error!', err)
    }
  })
})
