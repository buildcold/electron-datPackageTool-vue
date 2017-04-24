let fs = require('fs')
let toolUtil = require('./ToolUtil')

function writeDatFile (filePath, buffer, xmlBuffer, callback) {
  // 输出xml文件
  let xmlFileName = filePath.substring(0, filePath.lastIndexOf('.')) + '.xml'
  fs.writeFile(xmlFileName, xmlBuffer, function (err) {
    if (err) {
      callback('fail: ' + err)
    }
  // callback('成功Xml生成文件！');
  })
  // 输出dat文件
  fs.writeFile(filePath, buffer, function (err) {
    if (err) {
      callback('fail: ' + err)
    } else {
      callback('成功生成文件！')
    }
  })
}

function combinerXmlBuffer (headStr, filePath, paramsJson) {
  let xmlBuffer
  if (headStr === 'firmware') {
    xmlBuffer = toolUtil.createFirmXml(paramsJson)
  }
  if (headStr === 'app') {
    xmlBuffer = toolUtil.createAppXml(paramsJson)
  }
  if (headStr === 'telnet') {
    xmlBuffer = toolUtil.createTelnetXml(paramsJson)
  }
  if (headStr === 'a10') {
    xmlBuffer = toolUtil.createTelnetXml(paramsJson)
  }
  return xmlBuffer
}

function combinerBuffer (headStr, filePath, writePath, xmlBuffer) {
  let headStrBuffer = toolUtil.headStr2Buffer(headStr)
  let fileBuffer = fs.readFileSync(filePath)

  let xmlLenBuffer = toolUtil.length2Buffer(xmlBuffer.length)
  // xml文件+xml长度字节数+文件长度
  let dataLen = xmlBuffer.length + 4 + fileBuffer.length
  let dataLenBuffer = toolUtil.length2Buffer(dataLen)

  let buffers = [headStrBuffer, dataLenBuffer, xmlLenBuffer, xmlBuffer, fileBuffer]
  let resultBuf = Buffer.concat(buffers)
  return resultBuf
}

exports.combineAppDat = function (filePath, writePath, paramsJson, callback) {
  let xmlBuffer = combinerXmlBuffer('app', filePath, paramsJson)
  let datBuffer = combinerBuffer('app', filePath, writePath, xmlBuffer)
  writeDatFile(writePath, datBuffer, xmlBuffer, callback)
}

exports.combineFirmDat = function (filePath, writePath, paramsJson, callback) {
  let xmlBuffer = combinerXmlBuffer('firmware', filePath, paramsJson)
  let datBuffer = combinerBuffer('firmware', filePath, writePath, xmlBuffer)
  writeDatFile(writePath, datBuffer, xmlBuffer, callback)
}

exports.combineTelnetDat = function (filePath, writePath, paramsJson, callback) {
  let xmlBuffer = combinerXmlBuffer('telnet', filePath, paramsJson)
  let datBuffer = combinerBuffer(paramsJson['code'], filePath, writePath, xmlBuffer)
  writeDatFile(writePath, datBuffer, xmlBuffer, callback)
}
exports.combineAppDat = function (filePath, writePath, paramsJson, callback) {
  let xmlBuffer = combinerXmlBuffer('a10', filePath, paramsJson)
  let datBuffer = combinerBuffer('a10', filePath, writePath, xmlBuffer)
  writeDatFile(writePath, datBuffer, xmlBuffer, callback)
}
