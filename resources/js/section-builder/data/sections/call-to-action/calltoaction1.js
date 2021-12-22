export default {
  data: {
    elements: {
      icon: 'fa fa-home',
      image: {
        src: '/images/sample/10.jpg'
      },
      title: 'Welcome to hour website',
      subtitle: 'Lean more about what we do',
      description: 'Explain your call to action or hide this element by clicking the option on the right panel.',
      buttons: [
        {
          title: 'Read more'
        }
      ]
    }
  },
  setting: {
    layout: 1,
    elements: {
      title: true,
      subtitle: true,
      description: false,
      buttons: true
    },
    layouts: {
      sectionSize: 'l',
      alignment: 'left'
    }
  },
  background: {}
}
