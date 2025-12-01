const WORKER_URL = 'https://broad-credit-f7b3.nolopp4.workers.dev'

export const submitFeedback = async (type, name, message) => {
  const response = await fetch(`${WORKER_URL}/feedback`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ type, name, message })
  })
  
  const data = await response.json()
  
  if (!response.ok) {
    throw new Error(data.error || 'Ошибка отправки')
  }
  
  return data
}

export const getFeedbacks = async (password) => {
  const response = await fetch(`${WORKER_URL}/admin/feedback`, {
    method: 'GET',
    headers: { 
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${password}`
    }
  })
  
  const data = await response.json()
  
  if (!response.ok) {
    throw new Error(data.error || 'Ошибка загрузки')
  }
  
  return data.feedbacks
}

export const deleteFeedback = async (id, password) => {
  const response = await fetch(`${WORKER_URL}/admin/feedback`, {
    method: 'DELETE',
    headers: { 
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${password}`
    },
    body: JSON.stringify({ id })
  })
  
  const data = await response.json()
  
  if (!response.ok) {
    throw new Error(data.error || 'Ошибка удаления')
  }
  
  return data
}

export const updateFeedbackStatus = async (id, status, password) => {
  const response = await fetch(`${WORKER_URL}/admin/feedback`, {
    method: 'POST',
    headers: { 
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${password}`
    },
    body: JSON.stringify({ id, status })
  })
  
  const data = await response.json()
  
  if (!response.ok) {
    throw new Error(data.error || 'Ошибка обновления')
  }
  
  return data
}
