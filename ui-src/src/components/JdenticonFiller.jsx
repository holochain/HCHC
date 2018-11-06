import React from 'react';

const el = null
export default class Jdenticon extends React.Component {
  componentDidUpdate() {
    window.jdenticon.update(this.el)
  }

  componentDidMount() {
    window.jdenticon.update(this.el)
  }

  render () {
    const { hash, size, style } = this.props
    return <svg
      { ...this.props }
      style={{verticalAlign: 'middle', ...style}}
      ref={(el) => this.handleRef(el)} // tslint:disable-line
      width={size}
      height={size}
      data-jdenticon-value={hash}
      />
  }

  handleRef (el: any) { // tslint:disable-line
    this.el = el
  }
}
