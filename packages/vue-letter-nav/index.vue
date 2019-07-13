<template lang="pug">
.alph-nav-page
  .check-all-btn(v-if="multiple" @click="checkAllHandle") 全部
  .alpha-nav(ref="alphaNav")
    .alpha-nav-list(
      v-for="(item, index) in listModify"
      :key="item.value"
    )
      List(
        ref="alphaNavList"
        type="text",
        :disabled="readonly || disabled"
        :label="item.name"
        :model.sync="data[item.name]"
        :rightText="readonly ? item.show : ''"
        :border="index !== listModify.length - 1",
        @click="checkHandle"
      )
        template(slot="left")
          span.alpha-nav-first(
            :data-en="item.alpha"
            :class="{'first': item.alpha}") {{item.alpha}}
          span.icon √
          span {{item.name}}
  .alpha-list(ref="alphaList" v-if="!readonly")
    ul(
      class="char-list"
      ref="charBar"
      @touchstart="e => touchStart(e)"
      @touchmove="e => touchMove(e)"
      @touchend="e => touchEnd(e)"
    )
      li.char-item(
        :class="{'active': activeChar === char}"
        v-for="(char,index) in charList"
        :key="index"
      )
        span {{char}}
  .char-tip(v-show="isTouching" v-if="!readonly") {{lastChar}}
</template>
<script>
import List from './list.vue'
export default {
  name: 'vue-letter-nav',
  components: { List },
  props: {
    check: {
      type: Array,
      default: () => []
    },
    list: {
      type: Array,
      default: () => []
    },
    multiple: {
      type: Boolean,
      default: false
    },
    readonly: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      charList: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
      isTouching: false,
      boxClientTop: 0,
      lastChar: 'A',
      activeChar: 'A',
      checkAll: false,
      checkList: [],
      disabled: false
    }
  },
  computed: {
    listModify () {
      return this.list
    },
    data () {
      let obj = {}
      this.check.forEach(item => {
        obj[item] = true
      })
      return obj
    }
  },
  beforeMount () {
  },
  mounted () {
    this.checkList = [].concat(this.check)
  },
  methods: {
    throttle (methods) {
      setTimeout(() => {
        methods.call()
      }, 150)
    },
    touchStart (e) {
      e.preventDefault()
      this.throttle(() => {
        this.isTouching = true
        this.touchStartMethod(e)
      })
    },
    touchMove (e) {
      e.preventDefault()
      this.touchStartMethod(e)
    },
    touchStartMethod (e) {
      let top = this.$refs.alphaList.offsetTop
      const char = this.getChar(e.touches[0].clientY - top)
      this.activeChar = char
      this.gotoChar(char)
    },
    touchEnd (e) {
      e.preventDefault()
      this.throttle(() => {
        this.isTouching = false
      })
    },
    getChar (clientY) {
      const charHeight = this.$refs.charBar.offsetHeight / this.charList.length
      const index = Math.floor((clientY - this.boxClientTop) / charHeight)
      return this.charList[index]
    },
    gotoChar (char) {
      if (char === this.lastChar) {
        return false
      }
      this.lastChar = char
      const target = document.querySelector('[data-en="' + char + '"]')
      if (target) {
        target.scrollIntoView({
          block: 'center'
        })
      }
    },
    // 选中操作
    checkHandle (val) {
      this.disabled = true
      if (!this.multiple) {
        this.checkList = []
        if (val.value) {
          this.checkList.push(val.label)
        }
      } else {
        if (val.value) {
          this.checkList.push(val.label)
        } else {
          this.checkList.splice(this.checkList.indexOf(val.label), 1)
        }
      }
      this.throttle(() => {
        this.disabled = false
      })
      this.emitData(this.checkList)
    },
    // 全部选中操作
    checkAllHandle () {
      this.checkAll = !this.checkAll
      if (this.checkAll) {
        this.checkList = this.listModify.map(item => {
          return item.name
        })
      } else {
        this.checkList = []
      }
      this.emitData(this.checkList)
    },
    emitData (arr) {
      this.$emit('check', arr)
    }
  }
}
</script>

<style lang="stylus">
.alph-nav-page {
  .check-all-btn {
    height: 1.7rem;
    line-height: 1.7rem;
    padding-left: 1rem;
    font-size: 0.7rem;
    color: blue;
  }

  .alpha-nav {
    font-size: 0.7rem;

    .alpha-nav-first {
      display: inline-block;
      width: 1.2rem;
      visibility: hidden;
      color: blue;

      &.first {
        visibility: visible;
      }
    }
  }

  .alpha-list {
    height: 100vh;
    position: fixed;
    right: 0;
    top: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 2rem;
    // height 100vh
    z-index: 123456;
    margin: 0;
    // padding: 3.8rem 0 4.4rem 0
    box-sizing: border-box;

    // background-color rgba(0, 0, 0, 0.5)
    .char-list {
      width: 100%;
      height: 90%;
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      list-style-type: none;
      padding-left: 0;
      margin: 0;
    }

    .char-item {
      text-align: center;
      width: 100%;
      height: 0.8rem;
      font-size: 0.6rem;

      span {
        display: inline-block;
        width: 0.8rem;
        height: 0.8rem;
        line-height: 0.8rem;
        border-radius: 50%;
      }

      &.active {
        span {
          color: blue;
        }
      }
    }
  }

  .char-tip {
    position: fixed;
    width: 50px;
    height: 50px;
    top: 0;
    right: 0;
    left: 0;
    bottom: 0;
    margin: auto;
    background-color: gray;
    border-radius: 6px;
    color: white;
    font-size: 24px;
    font-weight: 700;
    line-height: 50px;
    text-align: center;
  }
}
</style>
