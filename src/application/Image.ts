/**
 * @name 图片
 */

/* private */

import Fs from 'fs'
import ImageInfo from 'imageinfo'
import Html from '../part/html'
import Request from '../part/request'
import Batch from '../component/batch'

/**
 * @name 从URL获取图片地址
 * @param url 地址
 * @return 地址字符串数组
 */
async function getSrcs(url: string) {
  let html = await Request.getHtml(url)

  let srcs = Html.extract(html, 'img')
    .map(a => a.attribs.src)
    .filter(a => a)

  return srcs
}

/* public */

/**
 * @name 从URL下载
 * @param url 地址
 * @param names 图片命名
 * @param dirname 目录
 * @param filter 过滤器
 */
async function fetch(
  url: string,
  { names = [], dirname = './', filter = null }: { names?: string[]; dirname?: string; filter?: ((path: string) => void) | null } = {}
) {
  let data = await getSrcs(url)
  await Batch.fetchFiles(data, names, dirname, filter)
}
/**
 * @name 以尺寸过滤
 * @param minWidth 最小宽度
 * @param minHeight 最小高度
 * @return 过滤函数
 */
function generateFilterBySize(minWidth: number, minHeight: number): (path: string) => void {
  return path => {
    Fs.readFile(path, (er, data) => {
      if (er) {
        console.log(er)
        return
      }

      let imageInfo = ImageInfo(data)
      if (imageInfo.width && imageInfo.height && (imageInfo.width < minWidth || imageInfo.height < minHeight))
        Fs.unlink(path, er => {
          if (er) {
            console.log(er)
          }
        })
    })
  }
}

/*构造*/

export default { fetch, generateFilterBySize }
