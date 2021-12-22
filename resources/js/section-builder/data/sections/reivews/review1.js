export default {
  data: {
    elements: {
      title: 'Get a discount on your next order',
      subtitle: "Enter your e-mail address and we'll send you discount code",
      description: 'Click here to edit your description.'
    },
    items: [
      {
        image: {
          src: '/images/sample/1.jpg'
        },
        title: 'Frances McCopy',
        description: 'You can edit text on your website by double clicking on a text box on your website. Alternatively, when you select a text box a settings menu will appear',
        review: 3,
        date: '12-07-2021',
        button: {
          title: 'More'
        }
      },
      {
        image: {
          src: '/images/sample/1.jpg'
        },
        title: 'Avery woodard',
        description: 'You can edit text on your website by double clicking on a text box on your website. Alternatively, when you select a text box a settings menu will appear',
        review: 3,
        date: '12-07-2021',
        button: {
          title: 'More'
        }
      }
    ]
  },
  setting: {
    layout: 1,
    column: 2,
    columns: [1, 2, 3],
    elements: {
      title: true,
      subtitle: false,
      description: true
    },
    layouts: {
      shape: 'circle',
      alignment: 'left',
      sectionSize: 'l'
    },
    listElements: {
      image: true,
      title: true,
      description: false,
      buttons: true,
      date: true
    }
  },
  background: {}
}
