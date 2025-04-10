export const fetchClient = (header: Record<string, string> | null = null) => {
  const requestHandler = async (
    url: string,
    options: RequestInit
  ): Promise<Response | never> => {
    try {
      const controller = new AbortController()
      const timeoutId = setTimeout(() => controller.abort(), 10000)
      const isFormData = options.body instanceof FormData

      const combinedHeaders = isFormData
        ? header ?? undefined
        : { ...(header ?? {}), ...(options.headers ?? {}) }


      const response = await fetch(url, {
        ...options,
        headers: combinedHeaders,
        signal: controller.signal,
      })

      clearTimeout(timeoutId)

      if (!response.ok) {
        const errorData = await response.json()
        return Promise.reject(errorData)
      }

      return response
    } catch (error: unknown) {
      if (error instanceof Error) {
        if (error.name === 'AbortError') {
          return Promise.reject(new Error('Request timeout'))
        } else {
          return Promise.reject(error.message || 'Unknown error')
        }
      } else {
        return Promise.reject(new Error('Unexpected error'))
      }
    }
  }

  return {
    get: (url: string,) =>
      requestHandler(url, { method: 'GET' }),

    post: (
      url: string,
      data: Record<string, unknown>,
    ) =>
      requestHandler(url, {
        method: 'POST',
        body: JSON.stringify(data),
      }),

    put: (
      url: string,
      data: Record<string, unknown>,
    ) =>
      requestHandler(url, {
        method: 'PUT',
        body: JSON.stringify(data),
      }),

    delete: (url: string) =>
      requestHandler(url, { method: 'DELETE' }),
  }
}
