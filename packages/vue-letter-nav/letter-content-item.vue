<template lang="pug">
  .letter-content-item(
    :class="getChecked"
    @click="click"
  )
    span.letter-content-first(
      :data-en="data.alpha"
      :class="{'first': data.alpha}") {{data.alpha}}
    slot(
      name="content"
      :data="data"
    )
      span.letter-content-icon √
      span {{data.name}}
</template>

<script>
export default {
  name: 'letter-content-item',
  props: {
    model: {
      type: Boolean,
      default: false
    },
    data: {
      type: Object,
      default: () => { }
    },
    readonly: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      check: this.model
    }
  },
  computed: {
    getChecked () {
      return this.check ? 'checked' : ''
    }
  },
  mounted () {
  },
  watch: {
    model () {
      this.check = this.model
    }
  },
  methods: {
    click () {
      if (!this.readonly) {
        this.check = !this.check
        this.$emit('update:model', this.check)
        let params = {
          ...this.data,
          checked: this.check
        }
        this.$emit('click', params)
      }
    }
  }
}
</script>
