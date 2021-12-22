export default {
  data: {
    elements: {
      title: 'Product',
      subtitle: 'CLick here to edit your subtitle',
      description: 'Add a description here',
      button: {
        title: 'View Cart'
      }
    },
    items: [
      {
        title: 'Product 1',
        description: 'Product description',
        button: {
          title: 'Add to cart'
        },
        image: {
          src: '/images/sample/5.jpg'
        }
      },
      {
        title: 'Product 2',
        description: 'Product description',
        button: {
          title: 'Add to cart'
        },
        image: {
          src: '/images/sample/5.jpg'
        }
      },
      {
        title: 'Product 3',
        description: 'Product description',
        button: {
          title: 'Add to cart'
        },
        image: {
          src: '/images/sample/5.jpg'
        }
      }
    ]
  },
  setting: {
    layout: 1,
    columns: [2, 3, 4],
    column: 3,
    paypal: {
      paypalAccount: '',
      currency: '$',
      cartButton: false
    },
    layouts: {
      sectionSize: 'l',
      alignment: 'left',
      shadow: true
    },
    elements: {
      description: false,
      title: true,
      subtitle: true
    },
    listElements: {
      image: true,
      description: true,
      title: true
    }
  },
  background: {}
}
