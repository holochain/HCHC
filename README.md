# HCHC

The Holochain of Holochains

Its a distributed directory for finding and installing distributed apps that run on holochain

> Note : This is the developer.console for Holochain devs to upload their HApps


![GitHub last commit](https://img.shields.io/github/last-commit/Holo-Host/HCHC.svg)
![GitHub](https://img.shields.io/github/license/Holo-Host/HCHC.svg)

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### Prerequisites

Ensure holochain-proto (at least version 26) is installed on your machine by running.

```
hcd -v
```

Subsequent steps also assumes npm/yarn is installed.

### Installing

The app can now be started for development purposes using
```
npm run hc:dev
```
and opening the browser to http://localhost:3000

---
If you would like to persist data between sessions install to the local holochain directory by running the following from the project root directory:
```
hcadmin init <id/name string>
hcadmin join ./build/ HCHC
hcd HCHC
```

## Built With

* [Holochain](https://github.com/holochain/holochain-proto)
* [Typescript](https://github.com/Microsoft/TypeScript)
* [React](https://reactjs.org/)
* [Redux](https://redux.js.org/)

## Authors

* **Joel Ulahanna** - [Zo-El](https://github.com/zo-el)
* **Lisa Jetton** - [JettTech](https://github.com/JettTech)

## License

This project is licensed under the GPL-3 License - see the [LICENSE.md](LICENSE.md) file for details
