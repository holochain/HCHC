'use strict';
export = 0;
let module = {};
// -----------------------------------------------------------------
//  Public Functions
// Author : Zo-El
//-----------------------------------------------------------------
// Description :
// This zome can be used to add a comment to any hash in your App.
// If you have a App hash you can tag a comment to this and have people to add comments about the app.
// it can also be used to add comments to the previous comments.
// -----------------------------------------------------------------

function createComments({ comment, commentedOnHash }:CreateCommentsParams):Hash {
  const comments = { comment, "author": App.Key.Hash, "timestamp": new Date() }
  const hash = commit("comments", comments);
  commit("comments_link", {
    Links: [
      { Base: commentedOnHash, Link: hash, Tag: 'comments_tag' }
    ]
  });
  return hash;
}

function getComments({commentedOnHash}):Comment_Chain[] {
  const comments = getLinkedEntrys(commentedOnHash);
  debug("Comment List : " + JSON.stringify(comments))
  return comments;
}

function getLinkedEntrys(commentedOnHash) {
  let entries: any = {}
  try {
    entries = getLinks(commentedOnHash, "comments_tag", { Load: true }).map((e) => {
      let entry = { comment: e.Entry, reply: getLinkedEntrys(e.Hash) }
      //debug("Entry: "+JSON.stringify(entry));
      return entry
    });
  } catch (e) {
    return e
  }
  return entries
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
    case "comments":
      return true;
    case "comments_link":
      return true;
    default:
      return false;
  }
}

function validatePut(entryName, entry, header, pkg, sources) {
  // debug("entryName: " + entryName + " entry: " + entry + " header: " + header + " pkg: " + pkg + " sources: " + sources)
  switch (entryName) {
    case "comments":
      return true;
    case "comments_link":
      return true;
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
    case "comments_link":
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
