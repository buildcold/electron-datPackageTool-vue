<template>
  <div class="wrap">
      <PathComponent></PathComponent>
      <div class="circle-border">
        <div class="circle-border-label">更新信息：</div>
        <Row class-name="input-Row" >
          <Col class-name="Col Col-label" span="5">业务名称：</Col>
          <Col class-name="Col" span="19"><Input v-model="appName" size="small" placeholder="请输入..." ></Input></Col>
        </Row>
        <Row class-name="input-Row" >
          <Col class-name="Col Col-label" span="5">业务代码：</Col>
          <Col class-name="Col" span="19"><Input v-model="appCode" size="small" placeholder="请输入..." ></Input></Col>
        </Row>
        <Row class-name="input-Row" >
          <Col class-name="Col Col-label" span="5">设备型号：</Col>
          <Col class-name="Col" span="19">
            <Select v-model="device" size="small">
                <Option v-for="item in devicesList" :value="item.value" :key="item">{{ item.label }}</Option>
            </Select>
          </Col>
        </Row>
        <Row class-name="input-Row" >
          <Col class-name="Col Col-label" span="5">版本代号：</Col>
          <Col class-name="Col" span="19"><VersionComponent :version=versionFlag @updateVersionEvent="updateVersionEventHandler"></VersionComponent></Col>
        </Row>
        <Row class-name="input-Row" >
          <Col class-name="Col Col-label" span="5">更新日志：</Col>
          <Col class-name="Col" span="19"><Input v-model="description"   type="textarea" :rows="2"   placeholder="请输入..." ></Input></Col>
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
            value: 'E10-1',
            label: 'E10-1'
          },
          {
            value: 'E10-2',
            label: 'E10-2'
          }],
        appName: '',
        device: '',
        appCode: '',
        version: '',
        description: '',
        versionFlag: ''
      }
    },
    props: ['DataClearFlag'],
    watch: {
      DataClearFlag () {
        this.appName = ''
        this.device = ''
        this.appCode = ''
        this.version = ''
        this.description = ''
        this.versionFlag = Date.now()
      }
    },
    methods: {
      generateDat () {
        // stroe中设置json
        let vueState = this.$store.state.counters
        if (!vueState.originalFilePath || !this.appName || !this.appCode || !this.device || !this.version || !this.description) {
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
              AppName: this.appName,
              AppCode: this.appCode,
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
