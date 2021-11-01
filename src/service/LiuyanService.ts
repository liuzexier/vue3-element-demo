import { getJson, postJson } from "@/utils";

/**
 * 添加留言
 * @param data 
 * @returns 
 */
export function addMessage(data: {
  id?: number | string,
  body: string,
  lastId?: number | string,
  tid?: string | number,
  status?: number
}) {
  return postJson('/f-message/add', data)
}
/**
 * 留言列表 interface
 */
export interface MessageQuery extends PageQuery {
  data?: {
    tid?: number | string,
    status?: number
  }
}
/**
 * 留言列表
 * @param data 
 * @returns 
 */
export function getMessageList(data: MessageQuery) {
  return postJson('f-message/list', data)
}

/**
 * 留言列表
 * @param data 
 * @returns 
 */
export function getMessage(data: {
  id: string | number
}) {
  return getJson('f-message/get?id=' + data.id,)
}