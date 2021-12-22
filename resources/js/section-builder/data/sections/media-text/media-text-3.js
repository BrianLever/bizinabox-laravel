export default {
  data: {
    elements: {
      image: {
        src: '/images/sample/10.jpg'
      },
      title: 'Welcome to hour website',
      subtitle: 'Do you have more to say and show? You can do it in this section. Add pictures and a short description to show visitors more of whatever it is you want.',
      description: 'Add a description here.',
      address: 'Address',
      phone: 'Phone',
      email: 'Email',
      buttons: [
        {
          title: 'Read more'
        }
      ]
    }
  },
  setting: {
    layout: 3,
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
