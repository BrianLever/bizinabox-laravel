export default {
  data: {
    elements: {
      icon: 'fa fa-home',
      title: 'Get a discount on your next order',
      subtitle: "Enter your e-mail address and we'll send you discount code",
      description: 'Click here to edit your description.',
      image: {
        src: '/images/sample/1.jpg'
      },
      button: {
        title: 'Get your code'
      }
    }
  },
  setting: {
    layout: 3,
    elements: {
      icon: true,
      title: true,
      subtitle: true,
      description: false,
      button: true
    },
    layouts: {
      alignment: 'left',
      sectionSize: 'l',
      shadow: true
    },
    promotion: {
      promotionalCode: 'DISCOUNT25'
    }
  },
  background: {}
}
