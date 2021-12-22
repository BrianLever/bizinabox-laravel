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
        date: '3/6/2021',
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
        date: '4/6/2021',
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
        date: '5/6/2021',
        venue: 'Bowery Ballroom',
        location: 'New York, NY',
        button: {
          title: 'Tickets'
        }
      }
    ]
  },
  setting: {
    layout: 2,
    elements: {
      title: true,
      subtitle: false,
      description: false
    },
    layouts: {
      sectionSize: 'l',
      alignment: 'left',
      aspectRatio: 'landscape'
    },
    listElements: {
      date: true,
      venue: true,
      location: true,
      image: true,
      dividerLine: true,
      buttons: false
    }
  },
  background: {}
}
