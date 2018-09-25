import * as React from 'react';
import styled from 'styled-components';
import "./DevSplashPage.css"

const Logo = styled.div`
  height: 25px;
  margin: -50px 5px 10px 5px;
`

const DevSplashPageLayout = styled.div`
    padding-top:40px
    display: grid;
    grid-template-columns: 80fr auto 15fr 15fr;
`

const ControlButton = styled.div`
  text-align: center;
  vertical-align: middle;
  border-radius: 25px;
  padding: 0.25em 1em;
  margin: 0 1em;
  background: transparent;
  color: #eee;
  border: 2px solid #eee;
`

class DevSplashPage extends React.Component<any, any> {
  public render() {
     return (
      <DevSplashPageLayout>
        <Logo>
          <div className="nav-logo"><img src="/holo-logo.png" /></div>
        </Logo>
        <div/>
        <ControlButton>
          Dashboard
        </ControlButton>
        <ControlButton>
          Settings
        </ControlButton>
      </DevSplashPageLayout>
    );
  }
}

export default DevSplashPage;
