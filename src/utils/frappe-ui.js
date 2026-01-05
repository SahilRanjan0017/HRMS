import { ref, reactive, onMounted } from 'vue'

export const createResource = (options) => {
    const data = ref(options.initialData || null)
    const loading = ref(false)
    const error = ref(null)

    const fetch = async () => {
        loading.value = true
        error.value = null
        try {
            // Fake network latency
            await new Promise(resolve => setTimeout(resolve, 300))

            console.log(`[MockResource] Local fetch for: ${options.url}`)

            // If data is null but we have initialData, restore it
            if (data.value === null && options.initialData) {
                data.value = options.initialData
            }

            if (options.onSuccess) {
                options.onSuccess(data.value)
            }
            return data.value
        } catch (e) {
            error.value = e
            if (options.onError) options.onError(e)
            throw e
        } finally {
            loading.value = false
        }
    }

    const reload = fetch
    const submit = (params) => {
        console.log(`[MockResource] Submit called for ${options.url}`, params)
        return fetch()
    }
    const reset = () => {
        data.value = options.initialData || null
    }

    if (options.auto) {
        onMounted(() => {
            fetch()
        })
    }

    return reactive({
        data,
        loading,
        error,
        fetch,
        reload,
        submit,
        reset,
        update: (newValue) => { data.value = newValue },
        promise: Promise.resolve(data.value)
    })
}

export const createDocumentResource = (options) => {
    const doc = ref(options.initialData?.doc || {})
    return reactive({
        doc,
        loading: false,
        error: null,
        reload: () => { },
        submit: () => Promise.resolve({}),
        update: (newValue) => { doc.value = newValue },
    })
}

export const createListResource = (options) => {
    const list = ref(options.initialData || [])
    return reactive({
        data: list,
        loading: false,
        error: null,
        reload: () => { },
        fetch: () => Promise.resolve(list.value),
        submit: () => Promise.resolve({}),
        update: (newValue) => { list.value = newValue },
        hasNextPage: false,
        list: {
            fetch: () => Promise.resolve(list.value)
        }
    })
}

export const call = async (method, params) => {
    console.log(`[MockCall] Calling ${method}`, params)
    await new Promise(resolve => setTimeout(resolve, 300))

    // Mock login success
    if (method === 'login') {
        return { message: 'Logged In' }
    }

    return { message: 'Success' }
}

export const frappeRequest = async (options) => {
    console.log('[MockRequest]', options)
    return {}
}

export const convertToCurrency = (value, currency) => {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: currency || 'USD' }).format(value)
}

export const setConfig = () => { }
export const resourcesPlugin = { install: () => { } }

// Dummy exports for global components
export const Button = 'Button'
export const Input = 'Input'
export const FormControl = 'FormControl'
export const FeatherIcon = 'FeatherIcon'
export const Dialog = 'div'
export const ErrorMessage = 'div'
export const Autocomplete = 'div'
export const Avatar = 'div'
export const Badge = 'div'
export const Checkbox = 'input'
export const Dropdown = 'div'
export const FileUploader = 'div'
export const ListView = 'div'
export const LoadingIndicator = 'div'
export const Modal = 'div'
export const Popover = 'div'
export const TextEditor = 'div'
export const Toast = 'div'
export const Toasts = 'div'
export const Tooltip = 'div'
export const Switch = 'div'
export const Breadcrumbs = 'div'
export const toast = (options) => console.log('[MockToast]', options)
