export default {
  data: {
    elements: {
      title: 'Products',
      subtitle: 'Click here to edit your subtitle',
      description: 'Add a description here'
    },
    items: [
      {
        image: {
          src: '/images/sample/5.jpg'
        },
        title: 'Product',
        description: 'Describe your product or give more information',
        button: {
          title: 'Read more'
        }
      },
      {
        image: {
          src: '/images/sample/5.jpg'
        },
        title: 'Product',
        description: 'Describe your product or give more information',
        button: {
          title: 'Read more'
        }
      },
      {
        image: {
          src: '/images/sample/5.jpg'
        },
        title: 'Product',
        description: 'Describe your product or give more information',
        button: {
          title: 'Read more'
        }
      }
    ]
  },
  setting: {
    layout: 1,
    columns: [2, 3],
    column: 2,
    elements: {
      title: true,
      subtitle: true,
      description: false
    },
    layouts: {
      sectionSize: 'l',
      shadow: true,
      alignment: 'left',
      aspectRatio: 'square',
      aspectRatios: ['circle', 'square', 'landscape', 'portrait', 'original']
    },
    listElements: {
      image: true,
      title: true,
      description: true,
      buttons: true
    }
  },
  background: {}
}
