<template lang="pug">
  .hekr-list(
    :class="getClass",
    @click="click"
  )
    slot(name="list")
      .hekr-list-left(:class="getChecked")
        slot(name="left")
          span.hekr-list-left-text(
            v-if="leftText || leftText === 0"
          ) {{ leftText }}
      .hekr-list-right
        slot(name="right")
          .hekr-list-right-text()
            span(v-if="rightText || rightText === 0") {{ rightText }}
</template>

<script>
export default {
  name: 'alphaList',
  data () {
    return {
      check: this.model
    }
  },
  props: {
    type: {
      type: String,
      default: 'text',
      validator (val) {
        return [
          'text'
        ].indexOf(val) !== -1
      }
    },
    leftText: {
      type: [String, Number]
    },
    rightText: {
      type: [String, Number]
    },
    border: {
      type: Boolean,
      default: false
    },
    label: {
      type: String,
      default: ''
    },
    model: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    getClass () {
      return {
        'hekr-list-border': this.border
      }
    },
    getInputType () {
      return (this.inputProps || {}).type || 'text'
    },
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
      if (!this.disabled) {
        this.check = !this.check
        this.$emit('update:model', this.check)
        let params = {
          label: this.label,
          value: this.check
        }
        this.$emit('click', params)
      }
    }
  }
}
</script>

<style lang="stylus">
ellipsis() {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.hekr-list {
  display: flex;
  margin-left: 1rem;
  height: 1.7rem;
  line-height: 1.7rem;
  padding: 0 1rem 0 0;
  font-size: 16px;
  ellipsis();

  &-border {
    border-bottom: 1px solid #dedede;
  }

  &-left {
    width: 70%;
    ellipsis();

    &-icon {
      padding-right: 0.2rem;
    }

    .hk-icons-check-checked, .icon {
      visibility: hidden;
      margin-right: 6px;
    }

    &.checked {
      color: $color-blue;

      .hk-icons-check-checked, .icon {
        visibility: visible;
      }
    }
  }

  &-right {
    width: 30%;
    ellipsis();
    text-align: right;

    &-icon {
      padding-left: 0.2rem;
    }

    &-input {
      width: 100%;
      background: none;
      outline: none;
      border: 0;
    }

    .hekr-switch {
      padding-top: 0.8rem;
    }
  }
}
</style>
