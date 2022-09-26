/**
 * @name 请求
 */

/* private */

import Fs from 'fs'
import Axios from 'axios'

/* public */

/**
 * @name 获取文件
 * @description 默认数据格式：stream
 * @param url 路径
 * @return stream数据
 */
async function getFile(url: string): Promise<Fs.ReadStream> {
  return await Axios.get(url, { responseType: 'stream' }).then(res => res.data)
}
/**
 * @name 获取HTML
 * @param url 路径
 * @return HTML字符串
 */
async function getHtml(url: string): Promise<string> {
  return await Axios.get(url, { responseType: 'text' }).then(res => res.data)
}

/* construct */

export default { getFile, getHtml }
