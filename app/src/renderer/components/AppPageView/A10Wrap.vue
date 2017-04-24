A10Name<template>
  <div class="wrap">
      <PathComponent></PathComponent>
      <div class="circle-border">
        <div class="circle-border-label">更新信息：</div>
        <Row class-name="input-Row" >
          <Col class-name="Col Col-label" span="5">应用名称：</Col>
          <Col class-name="Col" span="19"><Input v-model="a10Name" size="small" placeholder="请输入..." ></Input></Col>
        </Row>
        <Row class-name="input-Row" >
          <Col class-name="Col Col-label" span="5">版本代号：</Col>
          <Col class-name="Col" span="19"><VersionComponent :version=versionFlag @updateVersionEvent="updateVersionEventHandler"></VersionComponent></Col>
        </Row>
        <Row class-name="input-Row" >
          <Col class-name="Col Col-label" span="5">适用版本：</Col>
          <Col class-name="Col" span="19"><VersionComponent :version=versionFlag @updateVersionEvent="updateLastversionEventHandler"></VersionComponent></Col>
        </Row>
        <Row class-name="input-Row" >
          <Col class-name="Col Col-label" span="5">更新日志：</Col>
          <Col class-name="Col" span="19"><Input v-model="description"   type="textarea" :rows="4"   placeholder="请输入..." ></Input></Col>
        </Row>
      </div>
      <Row class-name="bottom-Row" >
           <Button type="primary" @click="generateDat"  size="small" >生成DAT文件</Button>
      </Row>
  </div>
</template>

<script>
  import PathComponent from './PathComponent'
  import VersionComponent from './VersionComponent'

  export default {
    data: function () {
      return {
        devicesList: [
          {
            value: '免填单客户端',
            label: '免填单客户端'
          },
          {
            value: '柜员评价客户端',
            label: '柜员评价客户端'
          },
          {
            value: '影像双录客户端',
            label: '影像双录客户端'
          },
          {
            value: '电子签章客户端',
            label: '电子签章客户端'
          },
          {
            value: '设备通信客户端',
            label: '设备通信客户端'
          }],
        a10Name: '',
        device: '',
        version: '',
        lastVersion: '',
        description: '',
        versionFlag: ''
      }
    },
    props: ['DataClearFlag'],
    watch: {
      DataClearFlag () {
        this.a10Name = ''
        this.device = ''
        this.version = ''
        this.lastVersion = ''
        this.description = ''
        this.versionFlag = Date.now()
      }
    },
    methods: {
      generateDat () {
        // stroe中设置json
        let vueState = this.$store.state.counters
        if (!vueState.originalFilePath || !this.a10Name || !this.device || !this.version || !this.description) {
          this.$Message.info('(ಠ‿ಠ)，字段不完整啊～')
          return
        } else {
          // stroe中设置json
          let vueState = this.$store.state.counters
          this.$store.dispatch({
            type: 'changeJson', // actions中的函数名
            jsonObj: {
              FileName: vueState.originalFileName,
              FileSize: vueState.originalFileSize,
              MD5: vueState.originalFileMD5,
              Device: this.device,
              A10Name: this.a10Name,
              A10Code: this.a10Code,
              Version: this.version,
              Description: this.description
            } // 附带的参数
          })
          // 向 main请求保存路径；
          this.$electron.ipcRenderer.send('show-save-dialog', '')
        }
      },
      updateVersionEventHandler (data) {
        this.version = data
      },
      updateLastversionEventHandler (data) {
        this.lastVersion = data
      }
    },
    components: {
      PathComponent,
      VersionComponent
    }
  }
</script>

<style scoped>
.wrap{
  margin: 10px
}
.Row{
}
.input-Row{

}
.top-Row{
  padding: 10px 10px 0 10px;
}
.bottom-Row{
  padding: 10px;
  display: flex;
  flex-direction: row-reverse;
}
.input-Row .Col{
   margin: 5px 0;
}
.Col-label{
  text-align: right;
  line-height: 28px;
  height: 24px;
}
.Col-button{
  text-align: right;
  line-height: 24px;
}
.circle-border{
  position: relative;
  margin:20px 0 0 0;
  border-radius: 5px;
  border: solid #eee 1px;
  padding: 10px;
}
.circle-border-label{
  position: absolute;
  top:-10px;
  left: 20px;
  background: #fff;
  font-weight: bold;
}
.Col{
  line-height: 24px;
}
</style>
