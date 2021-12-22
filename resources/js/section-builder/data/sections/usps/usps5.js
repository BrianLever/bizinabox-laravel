export default {
  data: {
    elements: {
      image: {
        src: '/images/sample/6.jpg'
      },
      title: 'Introduce the products and/or services you offer',
      subtitle: 'Show your customers what you offer and shortly give a description of each service or product.',
      description: 'Add a description here.'
    },
    items: [
      {
        image: {
          src: '/images/sample/25.jpg'
        },
        icon: 'fa fa-home',
        title: 'Product/service',
        subtitle: 'Subtitle',
        description: 'Describe the product/service'
      },
      {
        image: {
          src: '/images/sample/24.jpg'
        },
        icon: 'fa fa-home',
        title: 'Product/service',
        subtitle: 'Subtitle',
        description: 'Describe the product/service'
      },
      {
        image: {
          src: '/images/sample/23.jpg'
        },
        icon: 'fa fa-home',
        title: 'Product/service',
        subtitle: 'Subtitle',
        description: 'Describe the product/service'
      }
    ]
  },
  setting: {
    layout: 1,
    column: 3,
    columns: [2, 3, 4],
    elements: {
      title: true,
      subtitle: false,
      description: false
    },
    layouts: {
      sectionSize: 'l',
      alignment: 'center'
    },
    listElements: {
      icon: true,
      title: true,
      subtitle: true,
      description: true
    }
  },
  background: {}
}
