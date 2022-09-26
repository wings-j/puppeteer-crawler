/**
 * @name 文件
 */

/* private */

import Fs from 'fs'

/* public */

/**
 * @name 保存文件
 * @param stream 数据流
 * @param path 路径
 * @return unknown
 */
async function saveFile(stream: Fs.ReadStream, path: string): Promise<void | Error> {
  let promise = new Promise<void>((resolve, reject) => {
    let writeStream = Fs.createWriteStream(path)
    writeStream.on('finish', () => {
      resolve()
    })
    writeStream.on('error', er => {
      reject(er)
    })
    stream.pipe(writeStream)
  })

  return promise as Promise<void | Error>
}

/* construct */

export default { saveFile }
