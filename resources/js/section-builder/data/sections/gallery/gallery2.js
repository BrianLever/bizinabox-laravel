export default {
  data: {
    items: [
      {
        src: '/images/sample/1.jpg'
      },
      {
        src: '/images/sample/2.jpg'
      },
      {
        src: '/images/sample/3.jpg'
      }
    ],
    elements: {
      title: 'Gallery',
      subtitle: 'Our latest and best photos',
      description: 'We love to take pictures and show them to the world'
    }
  },
  setting: {
    layout: 2,
    columns: [3, 4, 5, 6],
    column: 3,
    elements: {
      title: true,
      subtitle: true,
      description: true
    },
    layouts: {
      fullWidth: false,
      sectionSize: 'M',
      shadow: true,
      contentAlignment: 'left',
      shape: 'square',
      spacing: true
    }
  },
  background: {}
}
