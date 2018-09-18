'use strict';
export = 0;
let module = {};
// -----------------------------------------------------------------
//  Public Functions
// Author : Zo-El
// -----------------------------------------------------------------
// Description : Helps you create a user profile
// -----------------------------------------------------------------

function createProfile(payload: { handle, email, avatar }) {
  const hash = commit("profile", payload);
  commit("profileLink", {
    Links: [
      { Base: App.Key.Hash, Link: hash, Tag: 'profile_tag' }
    ]
  });
  return hash;
}

function getProfile() {
  const hash = getLinks(App.Key.Hash, "profile_tag", { Load: true });
  if (hash.length > 0) {
    // debug("Profiles" + JSON.stringify(hash.map(e => e.Entry)))
    return hash.map(e => e.Entry)[0]
  }
  else {
    return { "handle": App.Agent.String }
  }
}

function getProfileHash(): Hash | "ERROR" {
  const hash = getLinks(App.Key.Hash, "profile_tag");
  if (hash.length > 0) {
    return hash.map(e => e.Hash)[0]
  }
  else {
    return "ERROR" // : Profile Not Created
  }
}

function updateProfile(payload: { handle, email, avatar }): Hash | "ERROR" {
  const profile_hash = getProfileHash();
  if (profile_hash == "ERROR") {
    return "ERROR";
  } else {
    const hash: Hash = update("profile", payload, profile_hash)
    return hash;
  }

}
// -----------------------------------------------------------------
//  The Genesis Function https://developer.holochain.org/genesis
// -----------------------------------------------------------------

function genesis() {
  return true;
}

//-----------------------------------------------------
//  Validation functions for every change to the local chain or DHT
// -----------------------------------------------------------------

function validateCommit(entryName, entry, header, pkg, sources) {
  // debug("entryName: " + entryName + " entry: " + entry + " header: " + header + " pkg: " + pkg + " sources: " + sources)
  switch (entryName) {
    case "profile":
      return true;
    case "profileLink":
      return true;
    default:
      return false;
  }
}

function validatePut(entryName, entry, header, pkg, sources) {
  // debug("entryName: " + entryName + " entry: " + entry + " header: " + header + " pkg: " + pkg + " sources: " + sources)
  switch (entryName) {
    case "profile":
      return true;
    case "profileLink":
      return true;
    default:
      return false;
  }
}

function validateMod(entryName, entry, header, replaces, pkg, sources) {
  switch (entryName) {
    case "profile":
      return true;
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
    case "profileLink":
      return true;
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
