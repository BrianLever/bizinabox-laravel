export default {
  data: {
    elements: {
      title: 'Frequently Asked Questions',
      subtitle: 'Edit your subtitle',
      description: 'You can edit text on your website by clicking on a text box on your website.'
    },
    items: [
      {
        question: 'What primary services do you offer?',
        answer: 'Add an answer here'
      },
      {
        question: 'What do you specialize in?',
        answer: 'Add an answer here'
      },
      {
        question: 'What are the rates of your services?',
        answer: 'Add an answer here'
      },
      {
        question: 'What type of warranty do you provide (on custom work)?',
        answer: 'Add an answer here'
      }
    ]
  },
  setting: {
    layout: 1,
    columns: [1, 2],
    column: 1,
    elements: {
      title: true,
      subtitle: false,
      description: false
    },
    layouts: {
      sectionSize: 'l',
      alignment: 'left'
    },
    listElements: {
      question: true,
      answer: true
    }
  },
  background: {}
}
