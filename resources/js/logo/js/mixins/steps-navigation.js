export default {
  data() {
    return {
      login: route('login'),
      register: route('register')
    }
  },

  computed: {
    currentStep: function () {
      return _.find(this.steps, ['name', route().current()])
    },
    steps() {
      return {
        index: {
          name: 'index',
          route: route('home'),
          priority: 1
        },
        choose: {
          name: `user.${this.editorType}.live`,
          route: route(`user.${this.editorType}.live`),
          priority: 2
        },
        edit: {
          name: this.editorType + '.edit',
          route: null,
          priority: 3
        },
        userEdit: {
          name: `user.${this.editorType}.edit`,
          route: null,
          priority: 3
        },
        buy: {
          name: 'logo.buy',
          route: null,
          priority: 4
        }
      }
    }
  },

  mounted() {
    // Set edit url on footer button
    EventBus.$on('logotype.set.edit-url', (editorUrl) => {
      // Set company if exists
      let company = this.$root.getParameterByName('company')
      if (company) {
        editorUrl = editorUrl + '?company=' + company
      }

      // Set edit url
      this.steps.edit.route = editorUrl
    })

    // Disable preloader from preview button
    EventBus.$on('logotype.preview.popup.showed', () => {
      this.states.buttons.preview.available = true
    })
  },

  methods: {
    isActive(step) {
      if (this.currentStep) {
        return step.name === this.currentStep.name || 'user.' + step.name === this.currentStep.name
      }
      return false
    },

    isSuccess(step) {
      if (this.currentStep) {
        return this.currentStep !== step && this.currentStep.priority > step.priority
      }
      return false
    }
  }
}
