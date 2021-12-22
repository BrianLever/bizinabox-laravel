export default {
  data: {
    elements: {
      title: 'Statistics',
      subtitle: 'Show off why visitors should choose you. What sets you apart from others or what would you like to show your visitors?',
      description: 'Add a description here'
    },
    items: [
      {
        subtitle: 'Michelin Stars',
        value: '3'
      },
      {
        subtitle: 'Amazing Dishes',
        value: '50+'
      },
      {
        subtitle: 'Vegetarian Dishes',
        value: '15+'
      }
    ]
  },
  setting: {
    layout: 3,
    column: 3,
    columns: [2, 3, 4, 6],
    elements: {
      title: true,
      description: false,
      subtitle: true
    },
    layouts: {
      sectionSize: 'l',
      alignment: 'center'
    },
    listElements: {
      value: true,
      subtitle: true
    }
  },
  background: {
    type: 'image',
    image: '/images/sample/5.jpg'
  }
}
