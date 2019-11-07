# HCHC

[![Project](https://img.shields.io/badge/project-holochain-blue.svg?style=flat-square)](http://holochain.org/)
[![Chat](https://img.shields.io/badge/chat-chat%2eholochain%2enet-blue.svg?style=flat-square)](https://chat.holochain.org)

[![Twitter Follow](https://img.shields.io/twitter/follow/holochain.svg?style=social&label=Follow)](https://twitter.com/holochain)

License: [![License: GPL v3](https://img.shields.io/badge/License-GPL%20v3-blue.svg)](http://www.gnu.org/licenses/gpl-3.0)

The Holochain of Holochains

A distributed directory for finding and installing distributed apps that run on holochain

> Note : This is the developer.console for Holochain devs to upload their HApps

## Documentation
- [HCHC/HApps-Store : Design Decisions](https://hackmd.io/uBkCcxybSWyQ-h60dEi8bg)

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### Installing

The app can now be started for **development** purposes using

**For Windows:**
```
npm run hc:win
```
**For Other OS:**
```
npm run hc:dev
```
and opening the browser to http://localhost:4141

---
If you would like to persist data between sessions install to the **local holochain directory** by running the following from the project root directory:
```
hcadmin init <id/name string>
hcadmin join ./build-HCHC/ HCHC
hcd HCHC
```
### Prerequisites
Ensure holochain-proto (at least version 26) is installed on your machine by running.

```
hcd -v
```
Subsequent steps also assumes npm/yarn is installed.

## Built With

* [Holochain](https://github.com/holochain/holochain-proto)
* [Typescript](https://github.com/Microsoft/TypeScript)
* [React](https://reactjs.org/)
* [Redux](https://redux.js.org/)

## Authors

* **Joel Ulahanna** - [Zo-El](https://github.com/zo-el)
* **Lisa Jetton** - [JettTech](https://github.com/JettTech)

## License
[![License: GPL v3](https://img.shields.io/badge/License-GPL%20v3-blue.svg)](http://www.gnu.org/licenses/gpl-3.0)

Copyright (C) 2017 - 2019, Holochain Foundation

This program is free software: you can redistribute it and/or modify it under the terms of the license p
rovided in the LICENSE file (GPLv3).  This program is distributed in the hope that it will be useful, bu
t WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR
 PURPOSE.

**Note:** We are considering other 'looser' licensing options (like MIT license) but at this stage are using GPL while we're getting the matter sorted out.  See [this article](https://medium.com/holochain/licensing-needs-for-truly-p2p-software-a3e0fa42be6c) for some of our thinking on licensing for distributed application frameworks.
