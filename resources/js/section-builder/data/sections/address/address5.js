export default {
  data: {
    elements: {
      address: 'Address',
      phone: 'Phone',
      email: 'Email'
    }
  },
  setting: {
    layout: 5,
    alignments: ['left', 'right'],
    alignment: 'left',
    elements: {
      phoneNumber: true,
      email: true,
      phone: true,
      address: true,
      icon: false
    },
    map: {
      zoomLevel: 15,
      type: 'roadmap'
    },
    businessInformation: {
      location: ''
    }
  },
  background: {}
}
