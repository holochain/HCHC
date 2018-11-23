'use strict';
export = 0;
let module = {};
// -----------------------------------------------------------------
//  Public Functions
// Author : Zo-El
// -----------------------------------------------------------------
// Description :
// -----------------------------------------------------------------

//////////////////////////////////////////////////////////
// function addCategory({ category, tags, hash }) {
//   // debug("Catagory : "+category+" | "+"tag"+tags)
//   const category_base = anchor(category, "");
//   const tag_base =s anchor(category, tags);
//   // debug("Catagory_base: "+category_base+" | "+"tag_base: "+tag_base)
//   const commit_hash = commit("tag_link", {
//     Links: [{ Base: category_base, Link: hash, Tag: "category" },
//     { Base: tag_base, Link: hash, Tag: "tag_category" },
//     { Base: hash, Link: tag_base, Tag: "app_category" }]
//   });
//   return commit_hash;
// }
//////////////////////////////////////////////////////////

function pushAppDetailsToStore({ appParam }) {
  const hash = bridge(getBackupAppsHash()[0].CalleeApp, 'bridge_replies', 'addAppDetails', { appParam });
  // debug("Return from HApps(For app that was created):" + JSON.parse(hash));
  return JSON.parse(hash);
}

// Should return all the details including the stats for the app
function getAppDetails({ app_hash }) {
  const app_details = bridge(getBackupAppsHash()[0].CalleeApp, 'bridge_replies', 'getAppDetails', { app_hash });
  debug("App_details from the App Store"+app_details);
  return app_details
}

function requestAddCategories(payload){
  return JSON.parse(bridge(getBackupAppsHash()[0].CalleeApp, 'bridge_replies', 'replyToAddCategories', payload));
}

function requestGetAppCategories(payload){
  const categories = bridge(getBackupAppsHash()[0].CalleeApp, 'bridge_replies', 'replyToGetAppCategories', payload);
  debug("Categories recieved from the App Store: "+categories);
  return JSON.parse(categories)

}

function getBackupAppsHash() {
  return getBridges().filter(function(elem) {
    return elem.CalleeName === 'HApps-Store'
  });
}

// -----------------------------------------------------------------
//  The Genesis Function https://developer.holochain.org/genesis
// -----------------------------------------------------------------

function genesis() {
  return true;
}

function bridgeGenesis(side, dna, appData) {
  debug("HCHC: " + side + " " + dna + " " + appData);
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
