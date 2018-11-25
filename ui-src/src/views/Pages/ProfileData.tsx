// import * as React from 'react';
// import { Redirect, Link } from 'react-router-dom';
// import { connect } from 'react-redux'
// import Typography from '@material-ui/core/Typography';
// import { fetchPOST } from '../../utils';
// import { Hash } from '../../../../holochain';
// import { ProfileState, AppDetailState } from '../../../../types'
// // @material-ui/core components
// import withStyles from "@material-ui/core/styles/withStyles";
// import Icon from "@material-ui/core/Icon";
// import GridItem from "../../components/Grid/GridItem.jsx";
// // import AppComponentLayout from "./AppComponentLayout";
//
// /*tslint:disable jsx-no-lambda*/
// type ProfileDataProps = {
//   currentAgent: { agent: { Hash: Hash, Name: string } },
//   currentProfile: ProfileState | null,
//   fetchAgent: () => void,
//   fetchProfile: () => void,
//   createProfile: (profileBundle) => void,
//   updateProfile: (profileBundle) => void,
// }
//
//
// class ProfileData extends React.Component<ProfileDataProps, {}>  {
//   constructor(props: any) {
//     super(props);
//     this.state = {
//       submitted: false,
//       validate: false,
//     }
//   }
//
//   public componentDidMount() {
//     this.props.fetchAgent();
//     this.props.fetchProfile();
//   }
//
//   public validateEmail(email) {
//     const emailRex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
//     const { validate } = this.state;
//     if (emailRex.test(email)) {
//       validate.emailState = 'has-success'
//       this.setState({ newEmail: email });
//       return true;
//     }
//     else {
//       validate.emailState = 'has-danger'
//       return false
//     }
//   }
//
//   public handleUpdate = (eventCurrentTarget: any) => {
//     console.log("updating profile");
//     switch(eventCurrentTarget.id) {
//       case "newEmail":
//          this.setState({ newEmail: eventCurrentTarget!.value });
//           break;
//       case "newHandler":
//           this.setState({ newHandler: eventCurrentTarget!.value });
//           break;
//      }
//   }
//   //
//   // public createProfile = async (event) => {
//   //   event.preventDefault();
//   //   const { newEmail, newHandler, newAvatarImg } = this.state;
//   //   console.log("HERE IS >> this.state.newHandle : ", newHandler);
//   //   console.log("HERE IS >> this.state.newEmail : ", newEmail);
//   //   console.log("HERE IS >> this.state.newAvatarImg : ", newAvatarImg);
//   //
//   //   const validateEmail = this.validateEmail(newEmail);
//   //   console.log("Entity Email Validated? >>>", validateEmail);
//   //
//   //   if(!validateEmail && newEmail !== "") {
//   //     console.log("email NOT valid");
//   //     return this.setState({promptMessage: "This email doesn't look quite right. Please verify and resubmit your profile updates."})
//   //   }
//   //
//   //   if(!newHandler) {
//   //     this.setState({newHandler: this.props!.currentProfile ? this.props!.currentProfile!.handle : ""})
//   //   }
//   //
//   //   if(!newEmail) {
//   //     this.setState({newEmail: this.props!.currentProfile ? this.props!.currentProfile!.email : ""})
//   //   }
//   //
//   //   if(!newAvatarImg) {
//   //     this.setState({newAvatarImg: this.props!.currentProfile ? this.props!.currentProfile!.avatar : ""})
//   //   }
//   //
//   //   if(newEmail && newAvatarImg || newAvatarImg ) {
//   //     const ProfileBundle = { handle: newHandler , email: newEmail, avatar: newAvatarImg }
//   //     JSON.stringify(ProfileBundle);
//   //     console.log("ProfileBundle for Entity Email API CALL", ProfileBundle);
//   //
//   //     if(!this.props.currentProfile!.email) {
//   //       await this.props.genProfile(ProfileBundle);
//   //     }
//   //     else {
//   //       await this.props.updateProfile(ProfileBundle);
//   //     }
//   //   };
//   //   //this.props.submitProfileState(this.props.currentProfile)
//   // }
//
//   public handleSubmit = (event) => {
//     event.preventDefault(event);
//     console.log("HANDLESUBMIT event >>> ", event);
//     console.log("HANDLESUBMIT this.state >>> ", this.state);
//     this.createProfile(event);
//   }
//
//   public render() {
//     if (!this.props.currentAgent || !this.props.currentProfile) {
//       return <div/>
//     }
//     const { agent } = this.props.currentAgent;
//     const { currentProfile} = this.props;
//     console.log("AllMyApps", currentProfile);
//
//     const renderProfile = () => {
//       console.log("INSIDE renderProfile");
//       const justIcon :boolean = true;
//       const simple :boolean = true;
//       return (
//         <div />
//         // <AppComponentLayout key={app.Entry.uuid} hash={ app.Hash } title={app.Entry.title} description={app.Entry.description} image={app.Entry.thumbnail} lastUpdate={app.Entry.updated} />
//       )
//     };
//
//     return (
//       <GridItem xs={12} sm={6} md={4}>
//         {renderProfile}
//       </GridItem>
//     );
//   }
//   }
//
//
// const mapStateToProps = ({ AllMyApps, currentProfile, currentAgent, appsByCategory, allAppCategories, currentCategory, currentAppHash }) => ({ AllMyApps, currentProfile, currentAgent, appsByCategory, allAppCategories, currentCategory, currentAppHash });
// const mapDispatchToProps = dispatch => ({
//   fetchAgent: () => {
//     fetchPOST('/fn/whoami/getAgent')
//       .then(agent => {
//         dispatch({ type: 'FETCH_AGENT', agent })
//       })
//   },
//   fetchProfile: () => {
//     return fetchPOST('/fn/profile/getProfile')
//       .then(profileInfo => {
//         dispatch({ type: 'FETCH_PROFILE', profileInfo })
//       })
//   },
//   // createProfile({ handle, email, avatar })
//   createProfile: () => {
//     fetchPOST('/fn/profile/createProfile')
//       .then(allApps => {
//         console.log("allApps returned from local chain-->",allApps)
//         dispatch({ type: 'FETCH_ALL_APPS', allApps })
//     })
//   },
//   // updateProfile({ handle, email, avatar })
//   updateProfile: () => {
//     fetchPOST('/fn/profile/updateProfile')
//       .then(allApps => {
//         console.log("allApps returned from local chain-->",allApps)
//         dispatch({ type: 'FETCH_ALL_APPS', allApps })
//     })
//   },
// });
//
// export default connect(mapStateToProps, mapDispatchToProps)(ProfileData);
