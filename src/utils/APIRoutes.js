const host = "http://localhost:5000"
export const signupRoute = `${host}/api/auth/signup`
export const loginRoute = `${host}/api/auth/login`
export const shortenRoute = `${host}/api/urls/shorten`
export const clicksRoute = `${host}/api/urls/click/:shortUrl`
export const fetchRoute = `${host}/api/urls/fetchUrl`