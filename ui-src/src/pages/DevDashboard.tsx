import * as React from "react";
import SideBar from "../components/SideBar";
import Menu from "../components/Menu";
import DevSplash from "./DevSplashPage";
// import "./DevDashboard.css";


// const Title = ({text}) => {
//   return (
//     <div className="text-center page-header">
//       {text}
//     </div>
//   )
// };

const PageView = ({page}) => {
  const viewStyles = {
    marginLeft: '230px',
    padding: '10px 20px 0'
  }
  return (
    // <Title text="Dev Dashboard Goes Here..." />
   <DevSplash/>
  )
}

type DashboardState = {
  pages: Array<any>,
}

class DevDashboard extends React.Component <DashboardState, any> {
  constructor(props) {
    super(props);
    this.state = {
      pages: [
        {
          "id": "1",
          "name": "Dashboard",
          "icon": "home",
          "children": []
        },
        {
          "id": "2",
          "name": "Add App",
          "icon": "file",
          "children": []
        },
        {
          "id": "3",
          "name": "Update App Files",
          "icon": "clipboard",
          "children": []
        },
        {
          "id": "4",
          "name": "Upgrade Apps",
          "icon": "code-fork",
          "children": []
        },
        {
          "id": "5",
          "name": "All App Stats",
          "icon": "database",
          "children": []
        }
      ]
    };
  }

  public render() {
    return (
      <div className="container-fluid">
        <div className="row">
          <SideBar>
            <Menu pages={this.state.pages} />
          </SideBar>
          <PageView page={this.state.pages[0]} />
        </div>
      </div>
    );
  }
}

export default DevDashboard;
