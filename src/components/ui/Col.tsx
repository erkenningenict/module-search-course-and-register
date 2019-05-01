import * as React from 'react';

interface IColProps {
  className?: string;
}

class Col extends React.Component<IColProps, {}> {
  public render() {
    return <div className={this.props.className || 'col-md-12'}>{this.props.children}</div>;
  }
}

export default Col;
