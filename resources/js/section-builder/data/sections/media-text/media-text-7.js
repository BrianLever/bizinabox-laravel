export default {
  data: {
    elements: {
      image: {
        src: '/images/sample/10.jpg'
      },
      title: 'Welcome to hour website',
      subtitle: 'Do you have more to say and show? You can do it in this section. Add pictures and a short description to show visitors more of whatever it is you want.',
      description: 'Add a description here.',
      buttons: [
        {
          title: 'Read more'
        }
      ]
    }
  },
  setting: {
    layout: 7,
    elements: {
      subtitle: true,
      title: true,
      description: true,
      buttons: false,
      dividerLine: true
    },
    layouts: {
      sectionSize: 'l',
      alignment: 'left'
    },
    card: {
      opacity: 20
    }
  },
  background: {
    type: 'image',
    image: '/images/sample/15.jpg'
  }
}
