export default {
  data: {
    elements: {
      title: 'Testimonials',
      subtitle: 'What our customers write about us',
      description:
        'You can edit text on your website by clicking on a text box on your website. If you have any questions, please visit our Support Center where we have lots of helpful articles that will assist you in creating the website of your dreams!'
    },
    items: [
      {
        icon: 'fa fa-home',
        description: 'You can edit text on your website by double clicking on a text box on your website. Alternatively, when you select a text box a settings menu will appear.',
        image: {
          src: '/images/sample/7.jpg'
        },
        author: 'Lorena Watson',
        authorTitle: 'Job title'
      },
      {
        icon: 'fa fa-home',
        description: 'You can edit text on your website by double clicking on a text box on your website. Alternatively, when you select a text box a settings menu will appear.',
        image: {
          src: '/images/sample/7.jpg'
        },
        author: 'Emma Brown',
        authorTitle: 'Job title'
      }
    ]
  },
  setting: {
    layout: 1,
    column: 2,
    columns: [1, 2],
    elements: {
      title: true,
      subtitle: true,
      description: true
    },
    layouts: {
      sectionSize: 'l',
      shape: 'circle',
      alignment: 'left'
    },
    listElements: {
      icon: true,
      description: true,
      image: true,
      line: true,
      author: true
    }
  },
  background: {}
}
