import { getJson, postJson } from "@/utils";

export function getPublishList(data: {
  pageUtil: {
    page: number,
    limit: number
  },
  data?: any
}) {
  return postJson('/f-release/list', data)
}

export function getPublishInfo(data: {
  id: number | string
}) {
  return getJson(`/f-release/get?id=${data.id}`)
}