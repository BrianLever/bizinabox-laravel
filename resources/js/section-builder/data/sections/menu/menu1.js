export default {
  data: {
    elements: {
      title: 'Menu',
      subtitle: 'Click here to edit your subtitle',
      description: 'Click here to edit your description'
    },
    items: [
      {
        title: 'Tom Yom Goong',
        subtitle: 'Add a description here',
        price: 19
      },
      {
        title: 'Tom Yom Goong',
        subtitle: 'Add a description here',
        price: 19
      },
      {
        title: 'Piri Piri Chicken',
        subtitle: 'Add a description here',
        price: 21
      }
    ]
  },
  setting: {
    layout: 1,
    alignments: ['left', 'right'],
    alignment: 'left',
    elements: {
      title: true,
      subtitle: false,
      description: false
    },
    layouts: {
      alignment: 'left'
    },
    listElements: {
      title: true,
      description: true,
      price: true
    }
  },
  background: {
    type: 'image',
    image: '/images/sample/15.jpg'
  }
}
