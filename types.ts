import { Hash } from './holochain'
import { Map, List } from "immutable"  // import { List, Map } from "immutable"

// ================================
//       App State Types
// ================================

export type WelcomeMsg = string;

export type HCHCState = {
  currentAgent: {agent: {Hash: Hash, Name: string}}| null,
  AllMyApps: [{Entry:AppDetailState, Hash: Hash}] | null, // pairing of the app hash and the an obj with its title and thumbanil url path
  currentAppDetails: {Entry: AppDetailState, Hash: Hash} | null,
  reviewEntries: [ReviewLog] | [{}],
  currentCategory: string | null,
  appsByCategory: Array<{Entry: AppDetailState, Hash: Hash}> | null, // A map parigin of the category string AND the array of app hashes and names(titles), belonging to that app Category...
  allAppCategories: [string] | null,
  appCode: AppDNACode | null,
  UIappLink: uiLinkParams | null,
};

export type AppDetailState = {
  uuid: string,
  title: string,
  author: {Hash: Hash, Name: string},
  description: HTMLInputElement | string,
  thumbnail: string,
  created?: string,
  updated?: string,
}

export type AppDNACode = {
  fileload: Map<Hash, {dna: string}>,
}

export type uiLinkParams = {
  title: string,
  link: string, // ui url link
  thumbnail: string,
  appHash: Hash,
}

export type coreCodeFile = {
  fileload: Map<Hash, CodeParams>,
}

export type CodeParams = {
  dna: string,
  test: string
}

export type ProfileState = {
  email?: string,
  avatar?: string,
  // avatar?: {file:{}, fileurl: string},
  handle: string,
  memberSince?: string,
}

export type ReviewLog = {
  authorHash: Hash,
  authorName: string,
  rating: number,
  review: string,
  timestamp?: number
} | null


// ================================
//      Redux Action Typing
// ================================

export type ReduxAction
  = {type: 'RETURN_STATE'}
  | {type: 'UPLOAD_FILE_REQUEST'}
  | {type: 'UPLOAD_FILE_SUCCESS'}
  | {type: 'UPLOAD_FILE_ERROR'}

  | { type: 'FETCH_AGENT', agent: {Hash: Hash, Name: string}}
  | { type: 'REGISTER_CATEGORY', category: string }
  | { type: 'REGISTER_APP_HASH', appHash: string }

  | { type: 'FETCH_ALL_APPS', myApps: [{Entry:AppDetailState, Hash: Hash}] }  // {Hash:Hash, icon: string}
  | { type: 'GET_APPS_BY_CATEGORY', appsByCurrentCategory: Array<{Entry: AppDetailState, Hash: Hash}> }

  | { type: 'VIEW_APP', details: AppDetailState }
  | { type: 'FETCH_CURRENT_APP_CATEGORIES', categories: [string] }
  | { type: 'FETCH_APP_CODE', code: CodeParams }

  | { type: 'CREATE_NEW_PROFILE', hash: Hash }
  | { type: 'UPDATE_PROFILE', hash: Hash}
  | { type: 'FETCH_PROFILE', profileInfo: ProfileParams}
  | { type: 'FETCH_PROFILE_HASH', hash: Hash }

  | { type: 'FETCH_REVIEWS', reviewEntries: [ReviewLog]}

  | { type: 'CREATE_NEW_APP_DETAILS', params: AppParams }
  | { type: 'CREATE_NEW_APP_CODE', params: AppDNACode }
  | { type: 'SET_CURRENT_APP', agent: string }


export interface AppParams {
 author: string,
 description: string,
 fileload: string
}


export interface ProfileParams {
  email?: string,
  avatar?: string,
  // avatar?: {file:{}, fileurl: string},
  handle: string,
}

export interface ReviewParams {
 appHash: Hash,
 // author: Map<Hash, string>,
 authorHash: Hash,
 authorName: string,
 rating: number,
 review: string,
timestamp?: number
}
