import * as React from 'react';

interface IColProps {
  className?: string;
  styles?: object;
}

class Col extends React.Component<IColProps, {}> {
  public render() {
    return (
      <div className={this.props.className || 'col-md-12'} style={this.props.styles}>
        {this.props.children}
      </div>
    );
  }
}

export default Col;
