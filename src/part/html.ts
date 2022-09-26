/**
 * @name HTML
 */

/* private */

import Cheerio from 'cheerio'

/* public */

/**
 * @name 载入HTML
 * @type Function
 * @param html HTML文本
 * @return DOM结构
 */
function load(html: string): cheerio.Root {
  return Cheerio.load(html)
}
/**
 * @name 提取
 * @type Function
 * @param source 源。HTML文本或DOM结构
 * @param rule 规则
 * @return 元素数组
 */
function extract(source: string | cheerio.Root, rule: string): cheerio.TagElement[] {
  if (typeof source === 'string') {
    return Array.from(load(source)(rule)) as cheerio.TagElement[]
  } else {
    return Array.from(source(rule)) as cheerio.TagElement[]
  }
}

/* construct */

export default { load, extract }
