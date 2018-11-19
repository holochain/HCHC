// ======================================
//      Type and Action Imports
// ======================================
import { Hash } from '../../holochain'
import store from './store'

// ========================
//      UI Constants
// ========================s
export const ICON_SIZE = "100px";

const date = new Date();
const year = date.getFullYear();

export const SETTINGS_CONFIG = {
  brand: "Holo",
  year: "2018",
  productLink: "https://holo.host/",
  autoCloseMobileNav: true,
  showCustomizer: true,
  settings: {
    layoutBoxed: false,
    navCollapsed: false,
    navBehind: false,
    fixedHeader: true,
    sidebarWidth: 'middle',
    theme: 'light',
  }
};

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
      'Content-Type': `multipart/form-data; boundary=${data}._boundary`,
    },
    method: 'post',
  }).then(r => r.json())
}


export const uploadFileRequest = (data) => {
  console.log("data from inside helpers (UPLOAD) : ");
  const keys = data.get("file");
  console.log("formData file keys : ", keys);
  return fetchPOST(`http://localhost:3001/console/api/files`, data, {
    headers: {
      'Content-Type': `multipart/form-data; boundary=${data}._boundary`,
    },
    timeout: 30000,
  });
};

export const downloadFileRequest = () => {
  console.log("data from inside helpers (DOWNLOAD) : ");

  return fetchPOST(`http://localhost:3001/console/api/files`, {
    headers: {
      responseType: 'blob',
    },
    method: 'get',
    timeout: 30000,
  });
};
