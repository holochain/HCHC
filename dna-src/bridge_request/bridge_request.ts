'use strict';
export = 0;
let module = {};
// -----------------------------------------------------------------
//  Public Functions
// Author : Zo-El
// -----------------------------------------------------------------
// Description :
// -----------------------------------------------------------------

function pushAppDetailsToStore({ appParam }) {
  const hash = bridge(getBackupAppsHash()[0].CalleeApp, 'bridge_replies', 'addAppDetails', { appParam });
  //debug("Return from HApps(For app that was created):" + JSON.parse(hash));
  return JSON.parse(hash);
}

// Should return all the details including the stats for the app
function getAppDetails({ app_hash }) {
  const app_details = bridge(getBackupAppsHash()[0].CalleeApp, 'bridge_replies', 'getAppDetails', { app_hash });
  debug("App_details from the App Store"+app_details);
  return JSON.parse(app_details)
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
