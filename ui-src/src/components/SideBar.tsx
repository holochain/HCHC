import * as React from "react";
// import "./SideBar.css";

const SideBar = ({children}) => {
  const sidebarStyle: any = {
    position: 'absolute',
    width: '230px',
    height: '100%',
    background: '#2A3F54',
    zIndex: 9999,
    display: 'flex'
  };

  return (
    <div className="sidebar col-md-3" style={sidebarStyle}>
      {children}
    </div>
  )
}

export default SideBar;
