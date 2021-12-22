export default {
  data: {
    elements: {
      icon: 'fa fa-home',
      image: {
        src: '/images/sample/10.jpg'
      },
      title: 'Welcome to hour website',
      subtitle: 'Lean more about what we do',
      description: 'Explain your call to action or hide this element by clicking the option on the right panel.',
      address: 'Address',
      phone: 'Phone',
      email: 'Email',
      buttons: [
        {
          title: 'Read more'
        }
      ]
    },
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
    ],
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
    }
  },
  setting: {
    layout: 1,
    alignments: ['left', 'right'],
    alignment: 'left',
    elements: {
      image: true,
      title: true,
      subtitle: true,
      description: false,
      buttons: true,
      phoneNumber: true,
      email: true,
      dividerLine: true,
      phone: true,
      businessHours: true,
      address: true,
      navigation: true,
      autoPlay: true
    },
    layouts: {
      sectionSize: 'l',
      alignment: 'left',
      animation: 'bouncy',
      interval: 4,
      fullSize: false,
      aspectRatio: 'original',
      fullWidth: false,
      shadow: true,
      contentAlignment: 'left',
      shape: 'square',
      spacing: true
    },
    listElements: {
      title: true,
      subtitle: true,
      description: true,
      date: true,
      venue: true,
      location: true,
      image: true,
      buttons: true,
      question: true,
      answer: false
    },
    map: {
      zoomLevel: 15,
      type: 'roadmap'
    },
    businessInformation: {
      location: ''
    },
    facebook: {
      cover: true,
      timeline: true,
      events: false,
      messages: false,
      feedHeight: 'small'
    },
    card: {
      opacity: 20
    }
  },
  background: {
    type: 'image',
    image: '/images/sample/15.jpg'
  }
}
