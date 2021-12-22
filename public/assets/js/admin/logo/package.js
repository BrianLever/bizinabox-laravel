var deleteUrl

$('.free_offer_logo_btn').click(function (e) {
  e.preventDefault()
  $('#freeOfferModal').modal('show')
})
$('.freeOfferSmtBtn').click(function (e) {
  e.preventDefault()
  let count = $('#free_offer_logo').val()
  window.location.href = `/admin/logotypes/package/freeOffer?count=${count}`
})
$('.createBtn').click(function (e) {
  e.preventDefault()
  $('#priceModal').modal('show')
  $('#package_id').val(null)
  $('#name').val(null)
  $('#price').val(null)
  $('#recurrent').val(1)
  $('#description').val(null)
  $('#status').prop('checked', true)
})
function recurrentInit(val) {
  if (val) {
    $('.period_area').removeClass('d-none')
  } else {
    $('.period_area').addClass('d-none')
  }
}
function freeUnlimitedInit(val) {
  if (val) {
    $('.free_limit_area').addClass('d-none')
  } else {
    $('.free_limit_area').removeClass('d-none')
  }
}
function premiumUnlimitedInit(val) {
  if (val) {
    $('.premium_limit_area').addClass('d-none')
  } else {
    $('.premium_limit_area').removeClass('d-none')
  }
}
$('#recurrent').change(function (e) {
  recurrentInit($(this).val() === '1')
})
$('#free_unlimited').change(function (e) {
  freeUnlimitedInit($(this).prop('checked'))
})
$('#premium_unlimited').change(function (e) {
  premiumUnlimitedInit($(this).prop('checked'))
})
$('.edit_btn').click(function (e) {
  e.preventDefault()
  $('#priceModal').modal('show')
  let pkg = $(this).data('package')
  $('#package_id').val(pkg.id)
  $('#recurrent').val(pkg.recurrent)

  recurrentInit(pkg.recurrent === 1)
  $('#period').val(pkg.period)
  $('#period_unit').val(pkg.period_unit)
  $('#price').val(pkg.price)
  $('#name').val(pkg.name)
  $('#description').val(pkg.description)
  if (pkg.free_limit === '-1') {
    $('#free_unlimited').prop('checked', true)
    freeUnlimitedInit(true)
  } else {
    $('#free_unlimited').prop('checked', false)
    freeUnlimitedInit(false)
    $('#free_limit').val(pkg.free_limit)
  }
  if (pkg.premium_limit === '-1') {
    $('#premium_unlimited').prop('checked', true)
    premiumUnlimitedInit(true)
  } else {
    $('#premium_unlimited').prop('checked', false)
    premiumUnlimitedInit(false)
    $('#premium_limit').val(pkg.premium_limit)
  }
  if (pkg.status === 1) {
    $('#status').prop('checked', true)
  } else {
    $('#status').prop('checked', false)
  }
  if (pkg.recommend === 1) {
    $('#recommend').prop('checked', true)
  } else {
    $('#recommend').prop('checked', false)
  }
  $('.selectpicker').selectpicker('refresh')
})
$('.delete_btn').click(function (e) {
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
      if (result.status === 0) {
        dispErrors(result.message)
      } else {
        itoastr('success', 'Success!')
        reloadAfterDelay()
      }
    },
    error: function (e) {
      console.log(e)
    }
  })
}

$('#pricing_form').on('submit', function (e) {
  e.preventDefault()
  btnLoading()

  $.ajax({
    url: $(this).attr('action'),
    type: 'POST',
    data: new FormData(this),
    dataType: 'JSON',
    contentType: false,
    cache: false,
    processData: false,
    success: function (result) {
      btnLoadingStop()
      clearError()

      if (result.status === 1) {
        itoastr('success', 'Success!')
        reloadAfterDelay()
      } else {
        dispErrors(result.data)
      }
    },
    error: function (e) {
      console.log(e)
    }
  })
})

$('.sortBtn').click(function () {
  mApp.blockPage()
  sort_cat_id = 0
  getOrder()
})
$(document).on('click', '.cat_sort_order', function (e) {
  e.preventDefault()
  sort_cat_id = $(this).data('id')
  getOrder()
})
function getOrder() {
  $.ajax({
    url: '/admin/logotypes/package/sort',
    method: 'GET',
    data: { cat_id: sort_cat_id },
    success: function (result) {
      mApp.unblockPage()

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
  var sorts = []
  $('#sortable li').each(function (index) {
    sorts.push($(this).data('id'))
  })
  $.ajax({
    url: '/admin/logotypes/package/sort',
    method: 'POST',
    data: { _token: token, sorts: sorts, cat_id: sort_cat_id },
    success: function (result) {
      mApp.unblock('#sort-modal .modal-content', {})
      if (result.status === 1) {
        itoastr('success', 'Success!')
        $('#sort-modal').modal('toggle')
        reloadAfterDelay()
      } else {
        dispErrors(result.data)
      }
    },
    error: function (err) {
      console.log('Error!', err)
    }
  })
})
