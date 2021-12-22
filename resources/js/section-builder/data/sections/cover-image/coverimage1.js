export default {
  data: {
    elements: {
      title: 'Welcome to our website',
      subtitle: 'Lean more about what we do',
      description: 'Add a description here.',
      image: {
        src: '/images/sample/1.jpg'
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
    alignment: 'left',
    elements: {
      title: true,
      subtitle: false,
      description: true,
      buttons: true
    },
    layouts: {
      sectionSize: 'l',
      fullPage: false
    }
  },
  background: {
    type: 'image',
    image: '/images/sample/1.jpg'
  }
}
