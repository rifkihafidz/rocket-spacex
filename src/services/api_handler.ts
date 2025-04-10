export const fetchClient = (
  header: Record<string, string> | null = null,
  timeout: number | null = null
) => {
  const defaultHeaders = header || {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${localStorage.getItem('authToken')}`,
  }

  const requestHandler = async (
    url: string,
    options: RequestInit
  ): Promise<Response | never> => {
    try {
      const controller = new AbortController()
      const timeoutId = setTimeout(() => controller.abort(), timeout || 10000)

      const response = await fetch(url, {
        ...options,
        headers: {
          ...defaultHeaders,
          ...(options.body instanceof FormData ? {} : options.headers),
        },
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
    get: (url: string, config: RequestInit = {}): Promise<Response> =>
      requestHandler(url, { method: 'GET', ...config }),

    post: (
      url: string,
      data: Record<string, unknown>,
      config: RequestInit = {}
    ): Promise<Response> => {
      return requestHandler(url, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
          'Content-Type': 'application/json',
          ...config.headers,
        },
        ...config,
      })
    },

    put: (
      url: string,
      data: Record<string, unknown>,
      config: RequestInit = {}
    ): Promise<Response> => {
      return requestHandler(url, {
        method: 'PUT',
        body: JSON.stringify(data),
        headers: {
          'Content-Type': 'application/json',
          ...config.headers,
        },
        ...config,
      })
    },

    delete: (url: string, config: RequestInit = {}): Promise<Response> =>
      requestHandler(url, { method: 'DELETE', ...config }),
  }
}
