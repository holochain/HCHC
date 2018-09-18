'use strict';
export = 0;
let module = {};
// -----------------------------------------------------------------
//  Public Functions
// Author : Zo-El
// -----------------------------------------------------------------
// Description :
// -----------------------------------------------------------------

function getAppDNA({ app_hash }) {
  const hash = JSON.parse(call("hchc", "getAppCode", { app_hash }));
  return hash;
}

function getAppUISkin({ app_hash }) {
  const hash = JSON.parse(call("hchc", "getUISkin", { app_hash }));
  return hash;
}

// -----------------------------------------------------------------
//  The Genesis Function https://developer.holochain.org/genesis
// -----------------------------------------------------------------

function genesis() {
  return true;
}

function bridgeGenesis(side, dna, appData) {
  debug("HCHC Replies Bridge: " + side + " " + dna + " " + appData);
  return true;
}
