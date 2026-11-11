const EXTERNAL_URL = /^(?:[a-z][a-z\d+.-]*:|\/\/|#)/i

// Vite replaces BASE_URL for production builds. Prefixing local public/ files
// keeps them working both at localhost and below a GitHub Pages repository path.
export const publicAsset = (value = '') => {
  if (!value || EXTERNAL_URL.test(value)) return value

  return `${import.meta.env.BASE_URL}${value.replace(/^\.?\//, '')}`
}
