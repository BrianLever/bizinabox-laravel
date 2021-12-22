$(function () {
  getCartItems()
})

$('input[type=radio][name=payment_method]').change(function () {
  $('.pm_label').removeClass('active')
  $(this).parents('.pm_label').addClass('active')
  if (this.value === 'card') {
    $('.stripe_area').slideDown()
  } else {
    $('.stripe_area').slideUp()
  }
})

$('#guest_email_form').submit(function (event) {
  event.preventDefault()
  if ($('#guest_email').val() === '') return itoastr('error', 'Please input email')
  $('.confirmBtn').append(" <i class='fa fa-spinner fa-spin loading_div'></i>").attr('disabled', true)
  $.post(this.action, new FormData(this), () => {
    $('.confirmBtn').prop('disabled', false)
    $('.loading_div').remove()
    itoastr('success', 'Success!')
    $('.checkout_form').removeClass('d-none')
    $('#guest_email_form').remove()
  })
})

$(document).on('click', '.c_rm_btn', function (e) {
  e.preventDefault()
  $.ajax({
    url: `/cart/remove`,
    data: { id: $(this).data('id') },
    success: function (result) {
      $('.loading_div').remove()
      if (result.status === 0) {
        dispErrors(result.data)
      } else {
        itoastr('success', 'Successfully removed!')
        $('.header_cart_area').html(result.data)

        getCartItems()
      }
    },
    error: function (e) {
      console.log(e)
    }
  })
})

$(document).on('click', '#emptyCrtBtn', function () {
  askToast.question('Do you want to clear all the cart items?', '', 'emptyCart')
})

function emptyCart() {
  $.ajax({
    url: `/cart/empty`,
    success: function (result) {
      $('.loading_div').remove()
      if (result.status === 0) {
        dispErrors(result.data)
      } else {
        itoastr('success', 'Successfully removed!')
        $('.header_cart_area').html(result.data)

        getCartItems()
      }
    },
    error: function (e) {
      console.log(e)
    }
  })
}

function getCartItems() {
  $.ajax({
    url: '/cart',
    dataType: 'JSON',
    contentType: false,
    cache: false,
    processData: false,
    success: function (result) {
      if (result.status === 1) {
        $('.cart_item_area').html(result.data['table'])
        $('.c_onetotal_price').html(result.data['oneTotal'])
        $('.c_subtotal_price').html(result.data['subTotal'])
        $('.c_total_price').html(result.data['total'])
      }
    },
    error: function (e) {
      console.log(e)
    }
  })
}

$(document).on('click', '.apply_coupon', function (e) {
  e.preventDefault()
  var code = $('#coupon_code').val()
  if (code === '' || code === null) {
    itoastr('error', 'Coupon code is invalid.')
  } else {
    $.ajax({
      url: '/cart/coupon',
      data: { code: code },
      success: function (result) {
        console.log(result)
        if (result.status === 0) {
          dispErrors(result.data)
        } else {
          itoastr('success', 'Successfully applied!')
        }
      },
      error: function (e) {
        console.log(e)
      }
    })
  }
})

$('#pay_btn').click(function () {
  if ($('input[type=radio][name=payment_method]:checked').val() === 'card') {
    $('#stripe_smt_form').submit()
  } else {
    $('#paypal_submit_form').submit()
  }
})
