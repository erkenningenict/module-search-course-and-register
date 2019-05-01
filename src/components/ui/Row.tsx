import * as React from 'react';

class Row extends React.Component<{}, {}> {
  public render() {
    return <div className="row">{this.props.children}</div>;
  }
}

export default Row;
