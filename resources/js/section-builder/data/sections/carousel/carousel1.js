export default {
  data: {
    items: [
      {
        title: 'Type your text',
        subtitle: 'Type your text',
        description: 'Type your text',
        buttons: [
          {
            title: 'more'
          }
        ],
        image: {
          src: '/images/sample/5.jpg'
        }
      },
      {
        title: 'Type your text',
        subtitle: 'Type your text',
        description: 'Type your text',
        buttons: [
          {
            title: 'more'
          }
        ],
        image: {
          src: '/images/sample/4.jpg'
        }
      },
      {
        title: 'Type your text',
        subtitle: 'Type your text',
        description: 'Type your text',
        buttons: [
          {
            title: 'more'
          }
        ],
        image: {
          src: '/images/sample/7.jpg'
        }
      }
    ]
  },
  setting: {
    layout: 1,
    layouts: {
      animation: 'bouncy',
      interval: 4,
      fullSize: false,
      alignment: 'center',
      sectionSize: 'l'
    },
    elements: {
      navigation: true,
      autoPlay: true
    },
    listElements: {
      title: true,
      subtitle: true,
      description: true,
      buttons: true
    }
  },
  background: {}
}
