import { postJson } from "@/utils";

export function getTravelList(data: {
  pageUtil: {
    page: number,
    limit: number
  },
  data?: {
    [x: string]: any,
    userId?: string | number
  }
}) {
  return postJson('f-apply/list', data)
}