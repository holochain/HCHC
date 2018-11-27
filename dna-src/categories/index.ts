'use strict';
export = 0;
let module = {};
// -----------------------------------------------------------------
//  Public Functions
// Author : Zo-El
// -----------------------------------------------------------------
// Description :
// This zome can be used to add catogorys to the apps
// -----------------------------------------------------------------

// this function links to the bridge_request function and send the info to be linked in the HApps-Store
function addCategory(payload:{ category, tags, hash }){
  // debug("Payload: "+JSON.stringify(payload))
  for (let cat_index in payload.category){
    for (let tag_index in payload.tags){

      let return_payload = (JSON.parse(call("bridge_request","requestAddCategories",{category:payload.category[cat_index],tags:payload.tags[tag_index],hash:payload.hash})));
      // debug("->"+return_payload)
    }
  }
  return true;
}

function getAppCategories(payload:{hash}){
  return JSON.parse(call("bridge_request","requestGetAppCategories",payload));
}
// -----------------------------------------------------------------
//  The Genesis Function https://developer.holochain.org/genesis
// -----------------------------------------------------------------

function genesis() {
  return true;
}

// -----------------------------------------------------------------
//  Validation functions for every change to the local chain or DHT
// -----------------------------------------------------------------

function validateCommit(entryName, entry, header, pkg, sources) {
  // debug("entryName: " + entryName + " entry: " + entry + " header: " + header + " pkg: " + pkg + " sources: " + sources)
  switch (entryName) {
    default:
      return false;
  }
}

function validatePut(entryName, entry, header, pkg, sources) {
  // debug("entryName: " + entryName + " entry: " + entry + " header: " + header + " pkg: " + pkg + " sources: " + sources)
  switch (entryName) {
    default:
      return false;
  }
}

function validateMod(entryName, entry, header, replaces, pkg, sources) {
  switch (entryName) {
    default:
      return false;
  }
}

function validateDel(entryName, hash, pkg, sources) {
  switch (entryName) {
    default:
      return false;
  }
}
function validateLink(entryName, baseHash, links, pkg, sources) {
  // debug("entryName: " + entryName + " baseHash: " + baseHash + " links: " + links + " pkg: " + pkg + " sources: " + sources)
  switch (entryName) {
    default:
      return false;
  }
}
function validatePutPkg(entryName) {
  return null;
}
function validateModPkg(entryName) {
  return null;
}
function validateDelPkg(entryName) {
  return null;
}
function validateLinkPkg(entryName) {
  return null;
}
