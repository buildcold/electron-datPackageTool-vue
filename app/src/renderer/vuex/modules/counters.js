import * as types from '../mutation-types'

const state = {
  main: 0,
  firmwareIsActive: true,
  appIsActive: false,
  telnetIsActive: false,
  a10IsActive: false,
  originalFilePath: '',
  originalFileName: '',
  originalFileMD5: '',
  originalFileSize: '',
  jsonObj: ''
}

const mutations = {
  [types.DECREMENT_MAIN_COUNTER] (state) {
    state.main--
  },
  [types.INCREMENT_MAIN_COUNTER] (state) {
    state.main++
  },
  [types.SWITCH_FIRMWARE] (state) {
    state.firmwareIsActive = true
    state.appIsActive = false
    state.telnetIsActive = false
    state.a10IsActive = false
    // 清空路径信息
    state.originalFilePath = ''
    state.originalFileName = ''
    state.originalFileMD5 = ''
    state.originalFileSize = ''
    state.jsonObj = ''
  },
  [types.SWITCH_APP] (state) {
    state.firmwareIsActive = false
    state.appIsActive = true
    state.telnetIsActive = false
    state.a10IsActive = false
    // 清空路径信息
    state.originalFilePath = ''
    state.originalFileName = ''
    state.originalFileMD5 = ''
    state.originalFileSize = ''
    state.jsonObj = ''
  },
  [types.SWITCH_TELNET] (state) {
    state.firmwareIsActive = false
    state.appIsActive = false
    state.telnetIsActive = true
    state.a10IsActive = false
    // 清空路径信息
    state.originalFilePath = ''
    state.originalFileName = ''
    state.originalFileMD5 = ''
    state.originalFileSize = ''
    state.jsonObj = ''
  },
  [types.SWITCH_A10] (state) {
    state.firmwareIsActive = false
    state.appIsActive = false
    state.telnetIsActive = false
    state.a10IsActive = true
    // 清空路径信息
    state.originalFilePath = ''
    state.originalFileName = ''
    state.originalFileMD5 = ''
    state.originalFileSize = ''
    state.jsonObj = ''
  },
  [types.CLEAR_PATH_DATA] (state) {
    // 清空路径信息
    state.originalFilePath = ''
    state.originalFileName = ''
    state.originalFileMD5 = ''
    state.originalFileSize = ''
  },
  [types.CHANGE_ORIGINAL_FILEPATH] (state, playload) {
    state.originalFilePath = playload.filePath
    state.originalFileName = playload.fileName
    state.originalFileMD5 = playload.fileMD5
    state.originalFileSize = playload.fileSize
  },
  [types.CHANGE_JSON] (state, playload) {
    state.jsonObj = playload.jsonObj
  }
}

export default {
  state,
  mutations
}
