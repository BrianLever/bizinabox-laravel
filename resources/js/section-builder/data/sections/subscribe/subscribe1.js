export default {
  data: {
    elements: {
      icon: 'fa fa-home',
      title: 'Subscribe',
      subtitle: 'Sign up to our newsletter and stay up to date',
      description: 'Click here to edit your description',
      button: {
        title: 'subscribe'
      },
      image: {
        src: '/images/sample/1.jpg'
      }
    },
    subscribe: {
      formAddress: '',
      successMessage: {
        title: 'Subscribed!',
        message: 'Thank you for subscribing to our newsletter.'
      },
      permissionMessage: 'By submitting your information, you are granting us permission to email you. You may unsubscribe at any time'
    }
  },
  setting: {
    layout: 1,
    elements: {
      icon: true,
      title: true,
      subtitle: true,
      description: false
    },
    form: {
      contactList: 'all'
    },
    layouts: {
      sectionSize: 'l',
      shadow: false
    },
    popover: {
      popover: false,
      displayPopover: 0,
      timing: 0
    }
  },
  background: {}
}
