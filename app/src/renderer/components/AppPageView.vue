<template>
  <div>
    <MenuNav @switchTabEvent="switchTabEventHandler" ></MenuNav>
    <FirmwareWrap class="switchWrap"  v-bind:class="{ active: firmwareIsActive }" v-bind:DataClearFlag="DataClearFlag" ></FirmwareWrap>
    <AppWrap class="switchWrap" v-bind:class="{ active: appIsActive }" v-bind:DataClearFlag="DataClearFlag"></AppWrap>
    <TelnetWrap class="switchWrap" v-bind:class="{ active: telnetIsActive }" v-bind:DataClearFlag="DataClearFlag"></TelnetWrap>
    <A10Wrap class="switchWrap" v-bind:class="{ active: a10IsActive }" v-bind:DataClearFlag="DataClearFlag"></A10Wrap>
  </div>
</template>

<!-- 脚本 -->
<script>
  import MenuNav from './AppPageView/MenuNav'
  import FirmwareWrap from './AppPageView/FirmwareWrap'
  import AppWrap from './AppPageView/AppWrap'
  import TelnetWrap from './AppPageView/TelnetWrap'
  import A10Wrap from './AppPageView/A10Wrap'
  import combiner from './AppPageView/CombineTool'

  export default {
    data: function () {
      return {
        DataClearFlag: ''
      }
    },
    mounted: function () {
      let that = this
      this.$electron.ipcRenderer.on('show-save-dialog-reply',
        function (event, arg) {
          if (arg !== 'abort') {
            let saveFilePath = arg
            let state = that.$store.state.counters
            if (state.firmwareIsActive) {
              combiner.combineFirmDat(state.originalFilePath, saveFilePath, state.jsonObj, function (msg) {
                that.$Modal.info({
                  title: '提示',
                  content: msg,
                  onOk: () => {
                    that.switchTabEventHandler()
                    that.$store.dispatch('clearPathData')
                  }
                })
              })
            } else if (state.appIsActive) {
              combiner.combineAppDat(state.originalFilePath, saveFilePath, state.jsonObj, function (msg) {
                that.$Modal.info({
                  title: '提示',
                  content: msg,
                  onOk: () => {
                    that.switchTabEventHandler()
                    that.$store.dispatch('clearPathData')
                  }
                })
              })
            } else if (state.telnetIsActive) {
              combiner.combineTelnetDat(state.originalFilePath, saveFilePath, state.jsonObj, function (msg) {
                that.$Modal.info({
                  title: '提示',
                  content: msg,
                  onOk: () => {
                    that.switchTabEventHandler()
                    that.$store.dispatch('clearPathData')
                  }
                })
              })
            } else if (state.a10IsActive) {
              combiner.combineA10Dat(state.originalFilePath, saveFilePath, state.jsonObj, function (msg) {
                that.$Modal.info({
                  title: '提示',
                  content: msg,
                  onOk: () => {
                    that.switchTabEventHandler()
                    that.$store.dispatch('clearPathData')
                  }
                })
              })
            } else {
              that.$Message.error('(ಥ﹏ಥ)保存类型出错', 5)
            }
          } else {
            that.$Message.warning('(ᵒ̤̑ ₀̑ ᵒ̤̑)已取消保存', 3)
          }
        })
    },
    computed: {
      firmwareIsActive () {
        return this.$store.state.counters.firmwareIsActive
      },
      appIsActive () {
        return this.$store.state.counters.appIsActive
      },
      telnetIsActive () {
        return this.$store.state.counters.telnetIsActive
      },
      a10IsActive () {
        return this.$store.state.counters.a10IsActive
      }
    },
    methods: {
      switchTabEventHandler () {
        // console.log('switchTabEventHandler')
        this.DataClearFlag = Date.now()
      }
    },
    components: {
      MenuNav,
      FirmwareWrap,
      AppWrap,
      TelnetWrap,
      A10Wrap
    },
    name: 'app-page'
  }
</script>

<!-- 样式 -->
<style scoped>
.switchWrap{
  display: none;
}
.active{
  display: block;
}
</style>
