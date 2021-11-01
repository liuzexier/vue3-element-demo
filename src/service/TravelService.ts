import { getJson, postJson } from "@/utils";

/**
 * 出行列表
 * @param data 
 * @returns 
 */
export function getTravelList(data: {
  pageUtil: {
    page: number,
    limit: number
  },
  data?: {
    [x: string]: any,
    userId?: string | number,
    status?: number | string
  }
}) {
  return postJson('f-apply/list', data)
}

/**
 * 申请出行
 * @param data 
 * @returns 
 */
export function addTravel(data: {
  id?: string | number,
  place: string,
  temperature: string | number,
  status: number, // 状态(1:申请中,2:已通过,3:已驳回)
  applyDate: string
}) {
  return postJson('f-apply/add', data)
}
/**
 * 出行详情
 * @param data 
 * @returns 
 */
export function getTravel(data: {
  id: string | number
}) {
  // return postJson('f-apply/apply', data)
  return getJson(`f-apply/get?id=${data.id}`)
}

/**
 * 出行审核
 * @param data 
 * @returns 
 */
export function travelApply(data: {
  id: string | number
  status: number, // 状态(1:申请中,2:已通过,3:已驳回)
}) {
  return postJson('f-apply/apply', data)
}