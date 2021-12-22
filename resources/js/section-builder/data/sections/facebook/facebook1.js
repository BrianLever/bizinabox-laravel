export default {
  data: {
    elements: {
      title: 'News',
      subtitle: "Check out what's new on hour facebook feed!",
      description: 'Add a description here'
    }
  },
  setting: {
    layout: 1,
    alignment: 'left',
    elements: {
      title: true,
      subtitle: false,
      description: true
    },
    layouts: {
      sectionSize: 'l'
    },
    facebook: {
      cover: true,
      timeline: true,
      events: false,
      messages: false,
      feedHeight: 'small'
    }
  },
  background: {
    type: 'image',
    image: '/images/sample/5.jpg'
  }
}
