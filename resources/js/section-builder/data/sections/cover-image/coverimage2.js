export default {
  data: {
    elements: {
      title: 'Welcome to our website',
      subtitle: 'Lean more about what we do',
      description: 'Add a description here.',
      image: {
        src: '/images/sample/2.jpg'
      },
      buttons: [
        {
          title: 'Read More'
        }
      ]
    }
  },
  setting: {
    layout: 1,
    elements: {
      title: true,
      subtitle: false,
      description: true,
      buttons: true
    },
    layouts: {
      sectionSize: 'l',
      fullSize: false,
      alignment: 'center'
    }
  },
  background: {}
}
