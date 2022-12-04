import { ElementHandle } from 'puppeteer'

/**
 * 获取属性
 * @param handle 句柄
 * @param attribute 属性
 * @param property JS属性
 * @return 值
 */
async function getAttribute(handle: ElementHandle, attribute: string, property = false) {
  if (property) {
    return (await handle.evaluate<string[]>((element, attribute: string) => (element as Record<string, any>)[attribute], attribute)) ?? undefined
  } else {
    return (await handle.evaluate<string[]>((element, attribute: string) => element.getAttribute(attribute), attribute)) ?? undefined
  }
}

export { getAttribute }
