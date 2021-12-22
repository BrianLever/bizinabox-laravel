export default {
  data: {
    elements: {
      title: 'Our History',
      subtitle: 'Write your subtitle here',
      description: 'Things that definitely happened'
    },
    items: [
      {
        image: {
          src: '/images/sample/6.jpg'
        },
        title: 'Starting off',
        date: '2018',
        description: 'Add a description here'
      },
      {
        image: {
          src: '/images/sample/6.jpg'
        },
        title: 'First employees',
        date: '2019',
        description: 'Add a description here'
      },
      {
        image: {
          src: '/images/sample/6.jpg'
        },
        title: 'Phase two',
        date: '2020',
        description: 'Add a description here'
      }
    ]
  },
  setting: {
    layout: 3,
    alignment: 'right',
    alignments: ['left', 'alternate', 'right'],
    elements: {
      title: true,
      subtitle: false,
      description: false
    },
    layouts: {
      sectionSize: 'l',
      alignment: 'center',
      shadow: false,
      shape: 'circle',
      shapes: ['circle', 'square', 'hexagon']
    },
    listElements: {
      date: true,
      title: true,
      description: true
    }
  },
  background: {}
}
