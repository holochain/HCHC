# HCHC

The Holochain of Holochains

Its a distributed directory for finding and installing distributed apps that run on holochain

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

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

test
