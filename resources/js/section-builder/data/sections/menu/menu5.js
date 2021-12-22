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
    layout: 5,
    columns: [1, 2, 3],
    column: 3,
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
      price: true,
      dividerLine: true
    }
  },
  background: {}
}
