import { postJson } from "@/utils";

export function regisiter(data: {
  phone: string,
  username?: string,
  password: string,
  type?: string
}) {
  return postJson('f-user/register', data)
}

export function login(data: {
  phone: string,
  password: string
}) {
  return postJson('/f-user/login', data)
}

export function getUserInfo() {
  return postJson('/f-user/get')
}