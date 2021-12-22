export default {
  data: {
    elements: {
      title: 'Meet out goals',
      subtitle: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit.',
      description: 'Delectus nesciunt, quam adipisci quidem maiores molestias neque iste maxime! Rem ad voluptatibus ipsa quidem quia odio mollitia dignissimos, eius amet cum.'
    },
    items: [
      {
        title: 'James Watson',
        value: 20
      },
      {
        title: 'Peter Johnson',
        value: 60
      },
      {
        title: 'Tyler Grant',
        value: 80
      }
    ]
  },
  setting: {
    layout: 1,
    elements: {
      title: true,
      subtitle: true,
      description: true
    },
    layouts: {
      alignment: 'left',
      sectionSize: 'l'
    },
    listElements: {
      title: true,
      value: true
    }
  },
  background: {}
}
