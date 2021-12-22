export default {
  data: {
    elements: {
      title: 'Welcome to our website',
      subtitle: 'Lean more about what we do',
      description: 'Add a description here.',
      image: {
        src: '/images/sample/6.jpg'
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
      buttons: true,
      image: true
    },
    layouts: {
      fullPage: false,
      alignment: 'center',
      sectionSize: 'l'
    }
  },
  background: {}
}
