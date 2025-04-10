import { URLS } from "@/utils/urls"
import { fetchClient } from "./api_handler"

const defaultHeader = {
  'Content-Type': 'application/json',
}

const authHeader = {
  ...defaultHeader,
  'spacex-key': 'spacex-key'
}

export async function createRocket(data: Record<string, unknown>) {
  try {
    const response = await fetchClient(authHeader).post(URLS.BASE_ROCKETS, data)
    return response
  } catch (error: unknown) {
    return error
  }
}

export async function getDataRocket() {
  try {
    const response = await fetchClient(defaultHeader).get(URLS.BASE_ROCKETS)
    return await response.json()
  } catch (error: unknown) {
    return error
  }
}

export async function getDetailRocket(id: string) {
  try {
    const response = await fetchClient(defaultHeader).get(`${URLS.BASE_ROCKETS}/${id}`)
    return await response.json()
  } catch (error: unknown) {
    return error
  }
}
