/**
 * API service layer — all backend communication lives here.
 *
 * Components never call fetch() directly. They import and call
 * these functions, keeping HTTP details out of the UI layer.
 *
 * Base path is relative (/api) so the backend URL is never
 * exposed in the browser bundle. In development, Vite proxies
 * /api → localhost:3001. In production, Azure Static Web Apps
 * routes /api/* to the backend app service automatically.
 */

const BASE = '/api'

async function post(endpoint, body) {
  const res = await fetch(`${BASE}${endpoint}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  })
  return res.json()
}

export async function submitContactForm(formData) {
  return post('/contact', formData)
}

export async function submitDataDeletionRequest(formData) {
  return post('/data-deletion', formData)
}
