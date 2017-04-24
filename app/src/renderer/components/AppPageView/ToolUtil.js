let iconv = require('iconv-lite')

function xmlStr2Buffer (str) {
  return new Buffer(iconv.encode(str, 'utf-8'))
}

function deleteFirstZero (str) {
  if (str.substring(0, 1) === '0' && str.substring(1, 2) !== '0') {
    return str.substring(1)
  } else {
    return str
  }
}

// 字符串根据编码转换成Buffer
exports.string2Buffer = function (str, encode) {
  return new Buffer(iconv.encode(str, encode))
}

// 转换头部信息为字节数组
exports.headStr2Buffer = function (str) {
  let arr = iconv.encode(str, 'utf-8')
  let headBuffer = new Buffer(32)
  for (let i = 0; i < 32; i++) {
    if (i < arr.length) {
      headBuffer[i] = arr[i]
    } else {
      headBuffer[i] = 0
    }
  }
  return headBuffer
}

// 长度数字转换成4个字节数组
exports.length2Buffer = function (num) {
  let lenBuffer = new Buffer(4)
  lenBuffer[0] = num >> 24
  lenBuffer[1] = num >> 16
  lenBuffer[2] = num >> 8
  lenBuffer[3] = num
  return lenBuffer
}

// 传入字节数组计算md5值
exports.md5 = function (data) {
  let str = data.toString('binary')
  let crypto = require('crypto')
  return crypto.createHash('md5').update(str).digest('hex').toUpperCase()
}

exports.createAppXml = function (paramsJson) {
  let xmlStr = '<?xml version=\'1.0\' encoding=\'UTF-8\'?>\n'
  xmlStr += '<AppInfo>\n'
  xmlStr += '<Name>' + paramsJson['AppName'] + '</Name>\n'
  xmlStr += '<Code>' + paramsJson['AppCode'] + '</Code>\n'
  xmlStr += '<Device>' + paramsJson['Device'] + '</Device>\n'

  xmlStr += '<Version>V' + paramsJson['Version'] + '</Version>\n'
  xmlStr += '<Description>' + paramsJson['Description'] + '</Description>\n'
  xmlStr += '<File>\n'
  xmlStr += '<Name>' + paramsJson['FileName'] + '</Name>\n'
  xmlStr += '<Size>' + paramsJson['FileSize'] + '</Size>\n'
  xmlStr += '<MD5>' + paramsJson['MD5'] + '</MD5>\n'
  xmlStr += '</File>\n'
  xmlStr += '</AppInfo>'
  return xmlStr2Buffer(xmlStr)
}

exports.createFirmXml = function (paramsJson) {
  let xmlStr = '<?xml version=\'1.0\' encoding=\'UTF-8\'?>\n'
  xmlStr += '<FirmwareInfo>\n'
  xmlStr += '<Name>' + paramsJson['FirmwareName'] + '</Name>\n'
  xmlStr += '<FirmwareCode>' + paramsJson['FirmwareCode'] + '</FirmwareCode>\n'
  xmlStr += '<Device>' + paramsJson['Device'] + '</Device>\n'
  let version = deleteFirstZero(paramsJson['Version'])
  xmlStr += '<Version>V' + version + '</Version>\n'
  let lastVersion = deleteFirstZero(paramsJson['LastVersion'])
  xmlStr += '<LastVersion>V' + lastVersion + '</LastVersion>\n'
  xmlStr += '<Description>' + paramsJson['Description'] + '</Description>\n'
  xmlStr += '<File>\n'
  xmlStr += '<Name>' + paramsJson['FileName'] + '</Name>\n'
  xmlStr += '<Size>' + paramsJson['FileSize'] + '</Size>\n'
  xmlStr += '<MD5>' + paramsJson['MD5'] + '</MD5>\n'
  xmlStr += '</File>\n'
  xmlStr += '</FirmwareInfo>'
  return xmlStr2Buffer(xmlStr)
}

exports.createTelnetXml = function (paramsJson) {
  let code = paramsJson['TelnetCode'].substring(0, 1).toUpperCase() + paramsJson['TelnetCode'].substring(1)
  let xmlStr = '<?xml version=\'1.0\' encoding=\'UTF-8\'?>\n'
  xmlStr += '<' + code + 'Info>\n'
  xmlStr += '<Name>' + paramsJson['TelnetName'] + '</Name>\n'
  xmlStr += '<Code>' + paramsJson['TelnetCode'] + '</Code>\n'
  xmlStr += '<Version>V' + paramsJson['Version'] + '</Version>\n'
  xmlStr += '<LastVersion>V' + paramsJson['Lastversion'] + '</LastVersion>\n'
  xmlStr += '<Description>' + paramsJson['Description'] + '</Description>\n'
  xmlStr += '<File>\n'
  xmlStr += '<Name>' + paramsJson['FileName'] + '</Name>\n'
  xmlStr += '<Size>' + paramsJson['FileSize'] + '</Size>\n'
  xmlStr += '<MD5>' + paramsJson['MD5'] + '</MD5>\n'
  xmlStr += '</File>\n'
  xmlStr += '</' + code + 'Info>'
  return xmlStr2Buffer(xmlStr)
}
exports.createA10Xml = function (paramsJson) {
  let xmlStr = '<?xml version=\'1.0\' encoding=\'UTF-8\'?>\n'
  xmlStr += '<SystemInfo>\n'
  xmlStr += '<Name>' + paramsJson['A10Name'] + '</Name>\n'
  xmlStr += '<Device>' + paramsJson['Device'] + '</Device>\n'

  xmlStr += '<Version>V' + paramsJson['Version'] + '</Version>\n'
  xmlStr += '<Description>' + paramsJson['Description'] + '</Description>\n'
  xmlStr += '<File>\n'
  xmlStr += '<Name>' + paramsJson['FileName'] + '</Name>\n'
  xmlStr += '<Size>' + paramsJson['FileSize'] + '</Size>\n'
  xmlStr += '<MD5>' + paramsJson['MD5'] + '</MD5>\n'
  xmlStr += '</File>\n'
  xmlStr += '</SystemInfo>'
  return xmlStr2Buffer(xmlStr)
}
