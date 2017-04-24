import * as types from './mutation-types'

export const decrementMain = ({ commit }) => {
  commit(types.DECREMENT_MAIN_COUNTER)
}

export const incrementMain = ({ commit }) => {
  commit(types.INCREMENT_MAIN_COUNTER)
}

export const switchFirmwareTab = ({ commit }) => {
  commit(types.SWITCH_FIRMWARE)
}

export const switchAppTab = ({ commit }) => {
  commit(types.SWITCH_APP)
}

export const switchTelnetTab = ({ commit }) => {
  commit(types.SWITCH_TELNET)
}

export const switchA10Tab = ({ commit }) => {
  commit(types.SWITCH_A10)
}

export const clearPathData = ({ commit }) => {
  commit(types.CLEAR_PATH_DATA)
}

export const changeOriginalFilePath = ({ commit }, playload) => {
  commit(types.CHANGE_ORIGINAL_FILEPATH, {filePath: playload.filePath, fileName: playload.fileName, fileSize: playload.fileSize, fileMD5: playload.fileMD5})
}

export const changeJson = ({ commit }, playload) => {
  commit(types.CHANGE_JSON, {jsonObj: playload.jsonObj})
}
