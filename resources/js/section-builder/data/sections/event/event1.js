export default {
  data: {
    elements: {
      title: 'Events',
      subtitle: 'subtitle',
      description: 'Add a description here.'
    },
    items: [
      {
        image: {
          src: '/images/sample/18.jpg'
        },
        date: '',
        venue: 'Paradise Rock Club',
        location: 'Boston, MA',
        button: {
          title: 'Tickets'
        }
      },
      {
        image: {
          src: '/images/sample/19.jpg'
        },
        date: '',
        venue: "Arlene's Grocery",
        location: 'New York, NY',
        button: {
          title: 'Tickets'
        }
      },
      {
        image: {
          src: '/images/sample/20.jpg'
        },
        date: '',
        venue: 'Bowery Ballroom',
        location: 'New York, NY',
        button: {
          title: 'Tickets'
        }
      }
    ]
  },
  setting: {
    layout: 1,
    elements: {
      title: true,
      subtitle: false,
      description: false
    },
    layouts: {
      sectionSize: 'l',
      alignment: 'left',
      aspectRatio: 'original'
    },
    listElements: {
      date: true,
      venue: true,
      location: true,
      image: true,
      buttons: true
    }
  },
  background: {}
}
