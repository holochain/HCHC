import * as React from "react";
// import "./Menu.css";

const MenuItem = ({title, icon}) => {
  const menuItemStyle = {
    display: 'block',
    padding: '10px',
    color: '#fdfdfd',
    margin: '0 -15px',
    borderBottom: '1px solid rgb(35, 50, 66)'
  };

  const iconStyle = {
    marginRight: '10px'
  }

  return (
    <a href="#" style={menuItemStyle}>
      <i className={'fa fa-fw fa-' + icon} style={iconStyle}/>
      {title}
    </a>
  )
}

const Menu = ({pages}) => {
  const navStyle = {
    display: 'block',
    width: '100%'
  };
  return (
    <nav style={navStyle} >
      {pages.map((page) => {
        return <MenuItem key={page.name} title={page.name} icon={page.icon} />
      })}
    </nav>
  )
}

export default Menu;
