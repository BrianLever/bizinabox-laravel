export default {
  data: {
    elements: {
      title: 'Menu',
      subtitle: 'Click here to edit your subtitle',
      description: 'Click here to edit your description'
    },
    items: [
      {
        title: 'Rendang',
        subtitle: 'Add a description here',
        price: '$19'
      },
      {
        title: 'Pastel de Nata',
        subtitle: 'Add a description here',
        price: '$17'
      },
      {
        title: 'Tom Yom Goong',
        subtitle: 'Add a description here',
        price: '$21'
      },
      {
        title: 'Lobster',
        subtitle: 'Add a description here',
        price: '$34'
      },
      {
        title: 'Piri Piri Chicken',
        subtitle: 'Add a description here',
        price: '$21'
      }
    ]
  },
  setting: {
    layout: 2,
    alignments: ['left', 'right'],
    alignment: 'left',
    elements: {
      title: true,
      subtitle: false,
      description: false
    },
    layouts: {
      alignment: 'left',
      sectionSize: 'l',
      shadow: true
    },
    listElements: {
      title: true,
      description: true,
      price: true
    }
  },
  background: {}
}
