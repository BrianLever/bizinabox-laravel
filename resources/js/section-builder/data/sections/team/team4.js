export default {
  data: {
    elements: {
      title: 'Introduce your team',
      subtitle: 'Do you work with an awesome team? Of course you want to introduce them to your visitors.',
      description: 'Add a description here.'
    },
    items: [
      {
        image: {
          src: '/images/sample/19.jpg'
        },
        title: 'Team member',
        subtitle: 'Job title or function',
        description: 'Write something about this member of your team to introduce them to your visitors.'
      },
      {
        image: {
          src: '/images/sample/19.jpg'
        },
        title: 'Team member',
        subtitle: 'Job title or function',
        description: 'Write something about this member of your team to introduce them to your visitors.'
      },
      {
        image: {
          src: '/images/sample/19.jpg'
        },
        title: 'Team member',
        subtitle: 'Job title or function',
        description: 'Write something about this member of your team to introduce them to your visitors.'
      }
    ]
  },
  setting: {
    layout: 4,
    column: 3,
    columns: [2, 3],
    elements: {
      title: true,
      subtitle: true,
      description: true
    },
    layouts: {
      sectionSize: 'l',
      alignment: 'center',
      aspectRatios: ['circle', 'square', 'landscape', 'portrait', 'original'],
      aspectRatio: 'circle'
    },
    listElements: {
      image: true,
      title: true,
      subtitle: true
    }
  },
  background: {}
}
