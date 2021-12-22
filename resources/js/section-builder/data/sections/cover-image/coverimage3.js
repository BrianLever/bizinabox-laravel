export default {
  data: {
    elements: {
      title: 'Welcome to our website',
      subtitle: 'Lean more about what we do',
      description: 'Add a description here.',
      image: {
        src: '/images/sample/4.jpg'
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
      buttons: true,
      image: true
    },
    layouts: {
      fullPage: false
    }
  },
  background: {
    type: 'image',
    image: '/images/sample/5.jpg'
  }
}
