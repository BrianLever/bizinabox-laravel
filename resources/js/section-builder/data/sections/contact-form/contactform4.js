export default {
  data: {
    elements: {
      title: 'Contact me',
      subtitle: 'Get in touch',
      description: 'Write something in this area.',
      image: {
        src: '/images/sample/14.jpg'
      }
    },
    form: {
      formFields: {
        firstName: {
          label: 'First Name',
          enabled: true
        },
        lastName: {
          label: 'Last Name',
          enabled: true
        },
        subject: {
          label: 'Subject',
          enabled: true
        },
        message: {
          label: 'Message',
          enabled: true
        },
        email: {
          label: 'Email',
          enabled: true
        },
        phone: {
          label: 'Phone',
          enabled: false
        },
        date: {
          label: 'Date',
          enabled: false
        },
        address: {
          label: 'Address',
          enabled: false
        }
      },
      formAddress: '',
      successMessage: {
        title: 'Message Sent!',
        message: 'Your message has been sent successfully, I hope to respond within 24 hours. You can also contact us through social media, links can be found below!'
      },
      permissionMessage: 'By checking this box and submitting your information, you are granting us permission to email you. You may unsubscribe at any time.'
    },
    submitButton: {
      title: 'Send Message'
    }
  },
  setting: {
    layout: 4,
    alignment: 'left',
    elements: {
      title: true,
      subtitle: false,
      description: false
    },
    layouts: {
      sectionSize: 'l',
      alignment: 'left'
    }
  },
  background: {}
}
