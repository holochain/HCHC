// ========================
//      UI Constants
// ========================s
export const ICON_SIZE = "100px";


// ========================
//        API CALLS
// ========================

export const fetchPOST = (url: string, data?: any, extraPayload?: any): Promise<any> => {
  extraPayload = extraPayload || {}
  return fetch(url, {
    ...extraPayload,
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json'
    },
    method: 'post',
  }).then(r => r.json())
}

export const fetchFormPOST = (url: string, data?: any, extraPayload?: any): Promise<any> => {
  extraPayload = extraPayload || {}
  return fetch(url, {
    ...extraPayload,
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'multipart/form-data'
    },
    method: 'post',
  }).then(r => r.json())
}
