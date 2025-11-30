const REVIEWS_KEY = 'steam_saved_reviews'

export const getReviews = () => {
  try {
    const saved = localStorage.getItem(REVIEWS_KEY)
    return saved ? JSON.parse(saved) : []
  } catch (e) {
    console.error('Failed to load reviews:', e)
    return []
  }
}

export const getReviewById = (id) => {
  const reviews = getReviews()
  return reviews.find(r => r.id === id) || null
}

export const saveReview = (name, content) => {
  const reviews = getReviews()
  const newReview = {
    id: Date.now().toString(),
    name: name.trim(),
    content,
    createdAt: Date.now(),
    updatedAt: Date.now()
  }
  reviews.push(newReview)
  localStorage.setItem(REVIEWS_KEY, JSON.stringify(reviews))
  return newReview
}

export const updateReview = (id, updates) => {
  const reviews = getReviews()
  const index = reviews.findIndex(r => r.id === id)
  if (index !== -1) {
    reviews[index] = {
      ...reviews[index],
      ...updates,
      updatedAt: Date.now()
    }
    localStorage.setItem(REVIEWS_KEY, JSON.stringify(reviews))
    return reviews[index]
  }
  return null
}

export const deleteReview = (id) => {
  const reviews = getReviews()
  const filtered = reviews.filter(r => r.id !== id)
  localStorage.setItem(REVIEWS_KEY, JSON.stringify(filtered))
}
