<template>
  <div class="NavTopWrap">
    <div  class="title-bar">升级打包工具Vue版
        <div class="title-bar-miniBtn" @click="miniWindow()"><Icon type="minus-round"></Icon></div>
        <div class="title-bar-closeBtn" @click="closeWindow()"><Icon type="close-round"></Icon></div>
    </div>
    <Row class-name="navRow">
        <Col class-name="navCol" :class="{actived:firmwareIsActive}" span="6">
          <div @click="switchFirmwareTab" >
            <Icon type="disc" size="32"></Icon><br/>(固件)升级包
          </div>
        </Col>
        <Col class-name="navCol" :class="{actived:appIsActive}" span="6">
          <div @click="switchAppTab" >
            <Icon type="social-android" size="32"></Icon><br/>(App)升级包
          </div>
        </Col>
        <Col class-name="navCol" :class="{actived:telnetIsActive}"  span="6">
          <div @click="switchTelnetTab" >
            <Icon type="social-dropbox" size="32"></Icon><br/>(柜面应用)升级包
          </div>
        </Col>
        <Col class-name="navCol" :class="{actived:a10IsActive}"  span="6">
          <div @click="switchA10Tab" >
            <Icon type="android-phone-landscape" size="32"></Icon><br/>(A10)升级包
          </div>
        </Col>
    </Row>
  </div>
</template>

<script>
  // import { mapActions } from 'vuex'
  export default {
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
      closeWindow: function () {
        this.$electron.ipcRenderer.send('synchronous-message', 'close-main-window')
      },
      miniWindow: function () {
        this.$electron.ipcRenderer.send('synchronous-message', 'mini-window')
      },
      switchAppTab: function () {
        this.$emit('switchTabEvent'/* , this.somedata */)
        this.$store.dispatch('switchAppTab')
      },
      switchFirmwareTab: function () {
        this.$emit('switchTabEvent'/* , this.somedata */)
        this.$store.dispatch('switchFirmwareTab')
      },
      switchTelnetTab: function () {
        this.$emit('switchTabEvent'/* , this.somedata */)
        this.$store.dispatch('switchTelnetTab')
      },
      switchA10Tab: function () {
        this.$emit('switchTabEvent'/* , this.somedata */)
        this.$store.dispatch('switchA10Tab')
      }
      // 在组件中分发 Action
      // ...mapActions([
        // 'incrementMain',
        // 'decrementMain'
        // 'switchFirmwareTab',
        // 'switchAppTab',
        // 'switchTelnetTab',
        // 'switchA10Tab'
      // ])
    }
  }
</script>

<style scoped>
  .NavTopWrap{
      background: #3d0ab7;
      -webkit-app-region: drag;
  }
  .actived{
    color: #cacaca;
  }
  .title-bar{
    display: flex;
    flex-flow: row;
    position: relative;
    height: 36px;
    line-height: 36px;
    padding-left: 10px;
  }
  .title-bar-miniBtn{
    -webkit-app-region: no-drag;
    position: absolute;
    right: 30px;
    top:0px;
  }
  .title-bar-closeBtn{
    -webkit-app-region: no-drag;
    position: absolute;
    right: 10px;
    top:0px;
  }
  .title-bar-miniBtn:hover,.title-bar-closeBtn:hover{
    color: #fff;
    opacity: 0.5;

  }
  .navRow{
    padding: 10px 0;
    color: #7180fb;
    -webkit-app-region: no-drag;
  }
  .navCol{
    text-align: center;
  }
</style>
