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
    layout: 1,
    elements: {
      image: true,
      subtitle: true,
      title: true,
      description: true,
      dividerLine: true,
      buttons: false
    },
    layouts: {
      sectionSize: 'l',
      alignment: 'left'
    },
    card: {
      opacity: 20
    }
  },
  background: {}
}
