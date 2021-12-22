export default {
  data: {
    elements: {
      title: 'Welcome to our website',
      description: 'Add a description here.',
      buttons: [
        {
          title: 'More'
        }
      ],
      subtitle: 'Learn more about what we do.'
    },
    video: {
      source: 'https://www.youtube.com/watch?v=LXb3EKWsInQ',
      setting: {
        autoPlay: false,
        loop: false,
        controls: true
      }
    }
  },
  setting: {
    layout: 1,
    alignment: 'right',
    elements: {
      title: true,
      description: true,
      buttons: true,
      dividerLine: false,
      subtitle: false
    },
    layouts: {
      alignment: 'left'
    }
  },
  background: {}
}
