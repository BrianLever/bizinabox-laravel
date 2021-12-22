var pageUrl = '/package' + '?page=1'

$(document).ready(function () {
  updateItems()
})

$(document).on('click', '.gotocart', function (e) {
  e.preventDefault()
  window.location.href = '/cart'
})
$(document).on('click', '.add_to_cart', function (e) {
  e.preventDefault()
  var obj = $(this)
  var id = obj.data('id')
  obj.append('<i class="loading_div fas fa-spinner fa-spin fa-fw"></i>')
  $.ajax({
    url: `/package/${id}/addtocart`,
    data: { quantity: 1, price: 0 },
    success: function (result) {
      if (result.status === 0) {
        dispErrors(result.data)
      } else {
        itoastr('success', 'Successfully added!')
        $('.header_cart_area').html(result.data)
        obj.toggleClass('d-none')
        obj.next().toggleClass('d-none')
      }
    },
    error: function (e) {
      console.log(e)
    }
  })
})

$(document).on('click', '.pagination a.page-link', function (e) {
  e.preventDefault()
  pageUrl = $(this).attr('href')
  updateItems()
})
function updateItems() {
  $.ajax({
    url: pageUrl,
    success: function (result) {
      console.log(result)
      if (result.status === 1) {
        $('.items_result').html(result.view)
      } else {
      }
    },
    error: function (e) {
      console.log(e)
    }
  })
}
