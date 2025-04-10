import { URLS } from "@/utils/urls"
import { fetchClient } from "./api_handler"

export async function createRocket (data: Record<string, unknown>) {
  try {
    const header = {
      'Content-Type': 'application/json',
      'spacex-key': 'spacex-key'
    }

    const response = await fetchClient(header).post(URLS.BASE_ROCKETS, data)

    return response
  } catch (error: unknown) {
    return error
  }
}

export async function getDataRocket () {
  try {
    const header = {
      'Content-Type': 'application/json',
    }

    const response = await fetchClient(header).get(URLS.BASE_ROCKETS)

    const jsonResponse = await response.json()

    return jsonResponse
  } catch (error: unknown) {
    return error
  }
}

export async function getDetailRocket (id: string) {
  try {
    const header = {
      'Content-Type': 'application/json',
    }

    const response = await fetchClient(header).get(URLS.BASE_ROCKETS + `/${id}`)

    const jsonResponse = await response.json()

    return jsonResponse
  } catch (error: unknown) {
    return error
  }
}
