// New data layer replacement for frappe-ui.js
// Uses standard async/await patterns with mock data support

const API_BASE_URL = process.env.REACT_APP_API_URL || '/api'
const MOCK_DELAY = 300 // Simulate network latency

// Toast notification system
const notificationListeners = []

export const toast = (options) => {
  const notification = {
    id: Date.now(),
    message: typeof options === 'string' ? options : options.message,
    type: options?.type || 'info',
    duration: options?.duration || 3000,
  }
  
  notificationListeners.forEach(listener => listener(notification))
  
  if (notification.duration) {
    setTimeout(() => {
      notificationListeners.forEach(listener => listener({ ...notification, id: null }))
    }, notification.duration)
  }
  
  return notification
}

export const onNotification = (callback) => {
  notificationListeners.push(callback)
  return () => {
    notificationListeners.splice(notificationListeners.indexOf(callback), 1)
  }
}

// HTTP request handler
export const request = async (options) => {
  const {
    method = 'GET',
    url,
    data,
    headers = {},
  } = options

  try {
    // Simulate network latency
    await new Promise(resolve => setTimeout(resolve, MOCK_DELAY))

    const response = await fetch(`${API_BASE_URL}${url}`, {
      method,
      headers: {
        'Content-Type': 'application/json',
        ...headers,
      },
      body: data ? JSON.stringify(data) : undefined,
    })

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`)
    }

    return await response.json()
  } catch (error) {
    console.error('[Request Error]', error)
    throw error
  }
}

// RPC call handler (for method-based API)
export const call = async (method, params = {}) => {
  console.log(`[RPC Call] ${method}`, params)

  try {
    // Simulate network latency
    await new Promise(resolve => setTimeout(resolve, MOCK_DELAY))

    // Mock login response
    if (method === 'login') {
      return { message: 'Logged In', success: true }
    }

    // Default success response
    return { message: 'Success', success: true }
  } catch (error) {
    console.error(`[RPC Error] ${method}:`, error)
    throw error
  }
}

// Document resource handler (for single document CRUD)
export class DocumentResource {
  constructor(options = {}) {
    this.doctype = options.doctype
    this.name = options.name
    this.url = options.url
    this.initialData = options.initialData || {}
    this.onSuccess = options.onSuccess
    this.onError = options.onError
    this.auto = options.auto || false

    this.data = this.initialData
    this.loading = false
    this.error = null
  }

  async fetch() {
    this.loading = true
    this.error = null

    try {
      await new Promise(resolve => setTimeout(resolve, MOCK_DELAY))
      
      if (this.onSuccess) {
        this.onSuccess(this.data)
      }
      return this.data
    } catch (error) {
      this.error = error
      if (this.onError) {
        this.onError(error)
      }
      throw error
    } finally {
      this.loading = false
    }
  }

  async submit(params) {
    this.loading = true
    this.error = null

    try {
      await new Promise(resolve => setTimeout(resolve, MOCK_DELAY))
      this.data = { ...this.data, ...params }
      
      if (this.onSuccess) {
        this.onSuccess(this.data)
      }
      return this.data
    } catch (error) {
      this.error = error
      if (this.onError) {
        this.onError(error)
      }
      throw error
    } finally {
      this.loading = false
    }
  }

  reload() {
    return this.fetch()
  }

  update(newValue) {
    this.data = newValue
  }

  reset() {
    this.data = this.initialData
  }
}

// List resource handler (for list/table data)
export class ListResource {
  constructor(options = {}) {
    this.doctype = options.doctype
    this.url = options.url
    this.initialData = options.initialData || []
    this.fields = options.fields || []
    this.filters = options.filters || []
    this.orderBy = options.orderBy
    this.pageLength = options.pageLength || 20
    this.onSuccess = options.onSuccess
    this.onError = options.onError
    this.auto = options.auto || false

    this.data = this.initialData
    this.loading = false
    this.error = null
    this.hasNextPage = false
  }

  async fetch(params = {}) {
    this.loading = true
    this.error = null

    try {
      await new Promise(resolve => setTimeout(resolve, MOCK_DELAY))
      
      if (this.onSuccess) {
        this.onSuccess(this.data)
      }
      return this.data
    } catch (error) {
      this.error = error
      if (this.onError) {
        this.onError(error)
      }
      throw error
    } finally {
      this.loading = false
    }
  }

  async submit(params) {
    this.loading = true
    this.error = null

    try {
      await new Promise(resolve => setTimeout(resolve, MOCK_DELAY))
      
      if (this.onSuccess) {
        this.onSuccess(this.data)
      }
      return this.data
    } catch (error) {
      this.error = error
      if (this.onError) {
        this.onError(error)
      }
      throw error
    } finally {
      this.loading = false
    }
  }

  reload() {
    return this.fetch()
  }

  update(newValue) {
    this.data = newValue
  }

  reset() {
    this.data = this.initialData
  }
}

// Resource factory functions
export const createResource = (options) => {
  const resource = new DocumentResource(options)
  
  if (options.auto) {
    resource.fetch()
  }

  return {
    data: resource.data,
    loading: resource.loading,
    error: resource.error,
    fetch: () => resource.fetch(),
    reload: () => resource.reload(),
    submit: (params) => resource.submit(params),
    reset: () => resource.reset(),
    update: (newValue) => resource.update(newValue),
    promise: Promise.resolve(resource.data),
  }
}

export const createDocumentResource = (options) => {
  const resource = new DocumentResource(options)

  return {
    doc: resource.data,
    loading: resource.loading,
    error: resource.error,
    reload: () => resource.reload(),
    submit: (params) => resource.submit(params),
    update: (newValue) => resource.update(newValue),
  }
}

export const createListResource = (options) => {
  const resource = new ListResource(options)
  
  if (options.auto) {
    resource.fetch()
  }

  return {
    data: resource.data,
    loading: resource.loading,
    error: resource.error,
    fetch: () => resource.fetch(),
    reload: () => resource.reload(),
    submit: (params) => resource.submit(params),
    update: (newValue) => resource.update(newValue),
    hasNextPage: resource.hasNextPage,
    list: {
      fetch: () => resource.fetch(),
    },
  }
}

// Utility function for currency formatting
export const convertToCurrency = (value, currency = 'USD') => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency,
  }).format(value || 0)
}

// Config setter (for future use)
export const setConfig = (key, value) => {
  console.log(`[Config] ${key} = ${value}`)
}

// Resources plugin for Vue (can be removed in React migration)
export const resourcesPlugin = {
  install: () => {},
}
