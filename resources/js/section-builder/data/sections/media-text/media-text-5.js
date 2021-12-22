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
    layout: 5,
    alignments: ['left', 'right'],
    alignment: 'left',
    elements: {
      image: true,
      title: true,
      subtitle: true,
      description: true,
      buttons: false
    },
    layouts: {
      sectionSize: 'l',
      alignment: 'left'
    }
  },
  background: {}
}
