<template>
  <div class="versionWrap">
    <Input placeholder="" size="small" @on-focus="focusBakInput" />
      <div class="inputWrap" >
        <input ref="input1"   type="text" id="inputP1" onKeypress="return (/[\d]/.test(String.fromCharCode(event.keyCode)))"  v-model="inputP1" maxlength="2" @input="updateVersion" @blur="blurInput" @focus="focusInput" class="inputP"></input>.
        <input  type="text" id="inputP2" onKeypress="return (/[\d]/.test(String.fromCharCode(event.keyCode)))" v-model="inputP2" maxlength="2" @input="updateVersion" @blur="blurInput" @focus="focusInput" class="inputP"></input>.
        <input  type="text" id="inputP3" onKeypress="return (/[\d]/.test(String.fromCharCode(event.keyCode)))" v-model="inputP3" maxlength="2" @input="updateVersion" @blur="blurInput" @focus="focusInput" class="inputP"></input>.
        <input  type="text" id="inputP4" onKeypress="return (/[\d]/.test(String.fromCharCode(event.keyCode)))" v-model="inputP4" maxlength="2" @input="updateVersion" @blur="blurInput" @focus="focusInput" class="inputP"></input>
      </div>
  </div>
</template>

<script>
  // import { mapActions } from 'vuex'
  export default {
    data: function () {
      return {
        inputP1: '0',
        inputP2: '00',
        inputP3: '00',
        inputP4: '00'
      }
    },
    watch: {
      version () {
        this.inputP1 = '0'
        this.inputP2 = '00'
        this.inputP3 = '00'
        this.inputP4 = '00'
      }
    },
    props: ['version'],
    methods: {
      updateVersion (event) {
        if (event.target.value.length > 2) {
          // id绑定data
          this[event.target.id] = event.target.value.slice(0, 2)
        }
        let versionData = this.inputP1 + '.' + this.inputP2 + '.' + this.inputP3 + '.' + this.inputP4
        this.$emit('updateVersionEvent', versionData)
      },
      blurInput (event) {
        // console.log('blurInput')
        if (event.target.value.length === 1 && event.target.id !== 'inputP1') {
          this[event.target.id] = '0' + event.target.value
        } else if (event.target.value.length === 0) {
          this[event.target.id] = '00'
        }
      },
      focusInput (event) {
        // console.log('focusInput' + event.target)
        event.target.setSelectionRange(0, event.target.value.length)
      },
      focusBakInput () {
        // console.log(this.$refs.input1)
        this.$refs.input1.focus()
      }
    }
  }
</script>

<style scoped>
.versionWrap{
  position: relative;
}
.inputWrap{
  position: absolute;
  left: 4px;
  top: 1px;
  z-index: 99;
}
.inputP{
  color: #333;
  background: #fff;
  width: 20px;
  height: 22px;
  border: 0  #333 solid;
  outline: none;
  text-align: center;
}
.inputP[type=number]::-webkit-inner-spin-button,
.inputP[type=number]::-webkit-outer-spin-button {
    -webkit-appearance: none;
}
</style>
