export const getEnvInfo = () => {
  const arr = navigator.userAgent.split('/')
  let isInApp = false
  let device = 'web'
  let version = ''
  if (arr.length >= 3) {
    if (arr[0] === 'webApp') {
      isInApp = true
      device = arr[1]
      version = arr[2]
    }
  }
  return { isInApp, device, version }
}
export const objectDelKey = (name, object) => {
  const data = {}
  for (const key in object) {
    if (object.hasOwnProperty(key) && name !== key) data[key] = object[key]
  }
  return data
}

export const minObject = (object) => {
  const data = {}
  for (const key in object) {
    if (object.hasOwnProperty(key)) {
      const item = object[key]
      if (typeof item === 'boolean') { data[key] = item ? 1 : 0 }
      else { data[key] = item }
    }
  }
  return data
}