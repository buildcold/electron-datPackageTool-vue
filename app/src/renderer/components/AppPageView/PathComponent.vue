<template>
<div>
  <div class="top-Row" >
    <Row class-name="Row" >
      <Col class-name="Col-label" span="5">文件路径：</Col>
      <Col class-name="Col" span="14"> <Input disabled  v-model.trim="pathInfo" size="small" placeholder="路径名称..." ></Input></Col>
      <Col class-name="Col-button" span="5"><Button type="ghost" @click="getFileInfo" size="small">选择文件</Button></Col>
    </Row>
  </div>
  <div class="circle-border">
    <div class="circle-border-label">文件信息：</div>
    <Row class-name="Row" >
      <Col class-name="Col-label" span="5">文件名：</Col>
      <Col class-name="Col-txt" span="10">{{fileName}}&nbsp;</Col>
      <Col class-name="Col-label" span="5">文件大小：</Col>
      <Col class-name="Col-txt" span="4">{{fileSize}}MB</Col>
    </Row>
    <Row class-name="Row" >
      <Col class-name="Col-label" span="5">校验值：</Col>
      <Col class-name="Col-txt" span="19">{{fileMD5}}</Col>
    </Row>
  </div>
</div>
</template>

<script>
  import fs from 'fs'
  import toolUtil from './ToolUtil'
  import path from 'path'

  export default {
    computed: {
      pathInfo () {
        return this.$store.state.counters.originalFilePath
      },
      fileName () {
        return this.$store.state.counters.originalFileName
      },
      fileSize () {
        return this.$store.state.counters.originalFileSize
      },
      fileMD5 () {
        return this.$store.state.counters.originalFileMD5
      }
    },

    methods: {
      getFileInfo () {
        let pathInfo = this.$electron.ipcRenderer.sendSync('show-open-dialog', 'dat,zip')
        this.readFileInfo(pathInfo)
      },
      readFileInfo (filePathInfo) {
        if (filePathInfo) {
          let fileBuffer = fs.readFileSync(filePathInfo)
          let fileSize = (fs.statSync(filePathInfo).size / 1000000).toFixed(3)
          let fileMD5 = toolUtil.md5(fileBuffer)
          let fileName = path.basename(filePathInfo)
          //  stroe中设置读取的文件信息
          this.$store.dispatch({
            type: 'changeOriginalFilePath', // actions中的函数名
            filePath: filePathInfo, // 附带的参数
            fileSize: fileSize,
            fileMD5: fileMD5,
            fileName: fileName
          })
        } else {
          this.$Message.warning('(ᵒ̤̑ ₀̑ ᵒ̤̑)已取消', 3)
        }
      }
    }
  }
</script>

<style scoped>

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
.Col-txt{
  line-height: 28px;
  height: 24px;
}
.Col{
  line-height: 24px;
}
</style>
