export default {
  data: {
    elements: {
      title: 'Pricing',
      subtitle: 'Show and overview of pricing plans',
      description: 'Add a description here'
    },
    items: [
      {
        title: 'Plan',
        price: '$99.95',
        subtitle: 'Billed monthly',
        description: 'Add your product features <br/> Feature1 <br/> Feature2',
        button: {
          title: 'Choose'
        }
      },
      {
        title: 'Plan',
        price: '$129.95',
        subtitle: 'Billed monthly',
        description: 'Add your product features <br/> Feature1 <br/> Feature2',
        button: {
          title: 'Choose'
        }
      },
      {
        title: 'Plan',
        price: '$327.95',
        subtitle: 'Billed monthly',
        description: 'Add your product features <br/> Feature1 <br/> Feature2',
        button: {
          title: 'Choose'
        }
      }
    ]
  },
  setting: {
    layout: 1,
    columns: [2, 3, 4],
    column: 3,
    elements: {
      title: true,
      subtitle: true,
      description: false
    },
    layouts: {
      sectionSize: 'l',
      alignment: 'left',
      shadow: true
    },
    listElements: {
      title: true,
      price: true,
      subtitle: true,
      description: true,
      buttons: true
    }
  },
  background: {}
}
