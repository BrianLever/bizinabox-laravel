import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations'
import { getters } from './getters'
import { actions } from './actions'

Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
    template: null,
    allCategories: [],
    pages: [],
    indexOfActivePage: 0,
    activePosition: 'header',
    addPosition: null,
    viewMode: 'desktop',
    edit: false,
    openSlider: false,
    activeSlider: 'sections',
    activeTab: 'address',
    activeSubTab: '',
    activeCompanyIndex: 0,
    background: { color: '#fafafa' },
    loading: false,
    loadingData: true,
    stockImages: null,
    imageEditor: {
      open: false,
      value: {},
      onChange: function (value) {
        console.log('image editor', value)
      }
    },
    attachLink: {
      open: false,
      value: {
        type: 'no-link',
        value: '',
        webAddress: ''
      },
      onChange: function (value) {
        console.log('attach link', value)
      }
    },
    altText: {
      open: false,
      value: '',
      onChange: function (value) {
        console.log('alt text', value)
      }
    },
    iconSelector: {
      open: false,
      value: '',
      onChange: function (value) {
        console.log('icon selector', value)
      }
    },
    embedLink: {
      open: false,
      value: '',
      onChange: function (value) {
        console.log('embed link', value)
      }
    },
    manageMarkers: {
      open: false,
      value: [],
      onChange: function (value) {
        console.log('manage markers', value)
      }
    },
    promotion: {
      open: false,
      value: {
        successMessage: {
          title: '',
          message: '',
          footNote: ''
        },
        permissionMessage: 'By submitting your information, you are granting us permission to email you. You may unsubscribe at any time'
      },
      onChange: function (value) {
        console.log('promotion', value)
      }
    },
    subscribe: {
      open: false,
      value: {
        formAddress: '',
        successMessage: {
          title: '',
          message: '',
          footNote: ''
        },
        permissionMessage: 'By submitting your information, you are granting us permission to email you. You may unsubscribe at any time'
      },
      onChange: function (value) {
        console.log('promotion', value)
      }
    },
    youtubeVideo: {
      open: false,
      value: {
        source: '',
        setting: {
          autoPlay: false,
          loop: false,
          controls: true
        }
      },
      onChange: function (value) {
        console.log('promotion', value)
      }
    },
    contactFormSetting: {
      open: false,
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
            enabled: true
          },
          date: {
            label: 'Date',
            enabled: true
          },
          address: {
            label: 'Address',
            enabled: true
          }
        },
        formAddress: '',
        successMessage: {
          title: 'Message Sent!',
          message: 'Your message has been sent successfully, I hope to respond within 24 hours. You can also contact us through social media, links can be found below!'
        },
        permissionMessage: 'By checking this box and submitting your information, you are granting us permission to email you. You may unsubscribe at any time.'
      },
      onChange: function (value) {
        console.log('alt text', value)
      }
    },
    timePicker: {
      open: false,
      time: '00:00 am',
      onChange: (val) => {
        console.log(val)
      }
    },
    // page setting
    openPageSettingModal: false,
    theme: window.template?.data?.theme || {
      mode: 'light', // "dark","light",
      primaryColor: '#E07F10',
      secondaryColor: '#11638F',
      lightModeColor: 'rgb(255, 255, 255)',
      darkModeColor: 'rgb(36, 48, 55)',
      fontSize: 'm', // "small - s","medium - m","large - l",
      titleFont: '',
      paragraphFont: '',
      animation: true,
      animationDuration: 'short' // "Short","Long"
    },
    setting: {
      socialAccounts: {
        facebook: '',
        twitter: '',
        instagram: '',
        linkedin: '',
        pinterest: '',
        youtube: '',
        openTable: ''
      },
      businesses: [
        {
          companyName: 'Bizinabox',
          address: '260-C North El Camino Real',
          zipCode: '92024',
          city: 'Encinitas',
          state: 'California',
          country: 'United States of America',
          contact: {
            email: '',
            phoneNumber: ''
          },
          businessHours: {
            monday: {
              type: 'open',
              label: 'open'
            },
            tuesday: {
              type: 'open',
              label: 'open'
            },
            wednesday: {
              type: 'open',
              label: 'open'
            },
            thursday: {
              type: 'open',
              label: 'open'
            },
            friday: {
              type: 'open',
              label: 'open'
            },
            saturday: {
              type: 'close',
              label: 'close'
            },
            sunday: {
              type: 'close',
              label: 'close'
            }
          }
        }
      ],
      googleAnalyticsTrackingId: '',
      termsOfService: '',
      privacyPolicy: '',
      cookieBannerPosition: 'bottom',
      bannerText: 'This site uses cookies',
      agreeButtonText: 'I am okay with that',
      headHTML: '',
      bodyEndHTML: ''
    },
    header: {
      name: 'Header1',
      data: {
        data: {
          elements: {
            siteTitle: '',
            headerButton: {
              title: 'Call'
            }
          }
        },
        setting: {
          layout: 1,
          elements: {
            siteTitle: true,
            headerButton: true
          },
          header: {
            fixedNavigationBar: true,
            scaleTextToWidth: true
          }
        },
        background: {}
      }
    },
    footer: {
      name: 'Footer1',
      data: {
        data: {
          elements: {
            descriptionTitle: 'About Us',
            description: 'Add a description here',
            siteTitle: 'Site title here',
            title: 'Pate Title',
            subtitle: 'Click here to edit your subtitle',
            addressTitle: 'Address'
          }
        },
        setting: {
          layout: 2,
          elements: {
            siteTitle: true,
            subtitle: true,
            phoneNumber: true,
            email: true,
            socialIcons: true,
            description: true,
            copyrightMessage: true,
            address: true,
            pagesMenu: true,
            dividerLine: true,
            siteMap: true
          },
          businessInformation: {
            location: ''
          }
        },
        background: {}
      }
    }
  },
  mutations: mutations,
  getters: getters,
  actions: actions
})
