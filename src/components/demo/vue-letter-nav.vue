<template lang="pug">
  .vue-letter-nav-demo
    vue-letter-nav(:check="checkList" :list="allList" :multiple="true" :readonly="false" @check="handleCheck")
      //- template(slot="content" slot-scope="{data}")
      //-   span.letter-content-icon √
      //-   span {{data.name}}
</template>
<script>
import country from './country'
export default {
  name: 'demo-vue-letter-nav',
  data () {
    return {
      checkList: [],
      allList: country
    }
  },
  mounted () {
  },
  methods: {
    handleCheck (data) {
      this.checkList = data
      console.log(data)
    }
  }
}
</script>
