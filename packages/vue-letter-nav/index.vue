<template lang="pug">
.vue-letter-nav
  .check-all-btn(v-if="multiple" @click="checkAllHandle") 全部
  .letter-content(ref="alphaNav")
    letter-content-item(
      v-for="(item, index) in listModify"
      :key="item.value"
      :model.sync="data[item.value]"
      :data="item"
      :readonly="readonly || disabled"
      @click="handleCheck"
    )
      template(slot="content")
        slot(
          name="content"
          :data="item"
        )
  .letter-aside(ref="alphaList" v-if="showLetter")
    ul(
      class="letter-list"
      ref="charBar"
      @touchstart="e => touchStart(e)"
      @touchmove="e => touchMove(e)"
      @touchend="e => touchEnd(e)"
    )
      li.letter-item(
        v-for="(item,index) in charList"
        :key="index"
        :class="{'active': activeChar === item}"
      )
        span {{item}}
  .letter-tip(v-show="isTouching" v-if="showLetter") {{lastChar}}
</template>
<script>
import LetterContentItem from './letter-content-item.vue'
export default {
  name: 'vue-letter-nav',
  components: { LetterContentItem },
  props: {
    // 已选中列表
    check: {
      type: Array,
      default: () => []
    },
    // 所有列表
    list: {
      type: Array,
      default: () => []
    },
    // 是否可以多选
    multiple: {
      type: Boolean,
      default: false
    },
    // 是否只读
    readonly: {
      type: Boolean,
      default: false
    },
    // 显示字母导航
    showLetter: {
      type: Boolean,
      default: true
    },
    // 滚动设置
    scrollOptions: {
      type: Object,
      default: () => {
        return {
          behavior: 'auto',
          block: 'center',
          inline: 'center'
        }
      }
    }
  },
  data() {
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
    listModify() {
      return this.list
    },
    data() {
      let obj = {}
      this.checkList.forEach(item => {
        obj[item] = true
      })
      return obj
    }
  },
  beforeMount() {},
  mounted() {
    this.checkList = [].concat(this.check)
  },
  methods: {
    // 节流
    throttle(methods) {
      setTimeout(() => {
        methods.call()
      }, 150)
    },
    touchStart(e) {
      e.preventDefault()
      this.throttle(() => {
        this.isTouching = true
        this.touchStartMethod(e)
      })
    },
    touchMove(e) {
      e.preventDefault()
      this.touchStartMethod(e)
    },
    touchStartMethod(e) {
      let top = this.$refs.charBar.offsetTop
      const char = this.getChar(e.touches[0].clientY - top)
      this.activeChar = char
      this.gotoChar(char)
    },
    touchEnd(e) {
      e.preventDefault()
      this.throttle(() => {
        this.isTouching = false
      })
    },
    getChar(clientY) {
      const charHeight = this.$refs.charBar.offsetHeight / this.charList.length
      const index = Math.floor((clientY - this.boxClientTop) / charHeight)
      return this.charList[index]
    },
    gotoChar(char) {
      if (char === this.lastChar) {
        return false
      }
      this.lastChar = char
      const target = document.querySelector('[data-en="' + char + '"]')
      if (target) {
        target.scrollIntoView(this.scrollOptions)
      }
    },
    // 选中操作
    handleCheck(val) {
      this.disabled = true
      if (!this.multiple) {
        this.checkList = []
        if (val.checked) {
          this.checkList.push(val.value)
        }
      } else {
        if (val.checked) {
          this.checkList.push(val.value)
        } else {
          this.checkList.splice(this.checkList.indexOf(val.value), 1)
        }
      }
      this.disabled = false
      this.emitData(this.checkList)
    },
    // 全部选中操作
    checkAllHandle() {
      this.checkAll = !this.checkAll
      if (this.checkAll) {
        this.checkList = this.listModify.map(item => {
          return item.value
        })
      } else {
        this.checkList = []
      }
      this.emitData(this.checkList)
    },
    emitData(arr) {
      this.$emit('check', arr)
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

.vue-letter-nav {
  .check-all-btn {
    height: 36px;
    line-height: 36px;
    padding-left: 20px;
    font-size: 14px;
    color: blue;
  }

  .letter-content {
    font-size: 14px;

    .letter-content-item {
      display: flex;
      margin-left: 20px;
      height: 36px;
      line-height: 36px;
      padding: 0 20px 0 0;
      font-size: 16px;
      border-bottom: 1px solid #efefef;
      ellipsis();

      .letter-content-icon {
        padding-right: 15px;
        visibility: hidden;
      }

      &.checked {
        .letter-content-icon {
          visibility: visible;
        }
      }
    }

    .letter-content-first {
      display: inline-block;
      width: 24px;
      visibility: hidden;
      color: blue;

      &.first {
        visibility: visible;
      }
    }
  }

  .letter-aside {
    height: 100vh;
    position: fixed;
    right: 0;
    top: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 40px;
    z-index: 123456;
    margin: 0;
    box-sizing: border-box;

    .letter-list {
      width: 100%;
      height: 90%;
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      list-style-type: none;
      padding-left: 0;
      margin: 0;
    }

    .letter-item {
      text-align: center;
      width: 100%;
      height: 16px;
      font-size: 14px;

      span {
        display: inline-block;
        width: 16px;
        height: 16px;
        line-height: 16px;
        border-radius: 50%;
      }

      &.active {
        span {
          color: blue;
        }
      }
    }
  }

  .letter-tip {
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
