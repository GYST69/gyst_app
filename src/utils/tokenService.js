const getLocalToken = () => {
  return JSON.parse(localStorage.getItem('token'))
    ? JSON.parse(localStorage.getItem('token'))
    : null
}

const setLocalToken = (token) => {
  localStorage.setItem('token', JSON.stringify(token))
}

const removeLocalToken = () => {
  localStorage.removeItem('token')
}

export { getLocalToken, setLocalToken, removeLocalToken }
