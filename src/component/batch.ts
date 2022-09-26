/**
 * @name 批量
 */

/* private */

import Path from 'path'
import Fs from 'fs'
import File from '../part/file'
import Request from '../part/request'

/* public */

/**
 * @name 下载文件
 * @param urls 路径
 * @param names 文件名
 * @param dirname 目录名
 * @param singleFinishCallback 单个文件完成回调
 */
async function fetchFiles(urls: string[], names: string[] = [], dirname: string = './', singleFinishCallback: ((path: string) => void) | null = null) {
  dirname = Path.join(process.cwd(), dirname)

  await Fs.promises.mkdir(dirname, { recursive: true })

  for (let i = 0; i < urls.length; i++) {
    let url = urls[i]
    let name = names[i] || Path.basename(url)
    let path = Path.join(dirname, name)
    let data = await Request.getFile(url)
    await File.saveFile(data, path)

    singleFinishCallback && singleFinishCallback(path)
  }
}

/* construct */

export default { fetchFiles }
