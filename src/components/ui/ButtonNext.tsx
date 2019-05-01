import * as React from 'react';

import { Button } from 'primereact/components/button/Button';

interface IButtonNextProps {
  disabled?: boolean;
  label?: string;
  icon?: string;
  onClick?: (e: any) => void;
}

class ButtonNext extends React.Component<IButtonNextProps, {}> {
  public render() {
    return (
      <Button
        type="button"
        label={this.props.label ? this.props.label : 'Volgende'}
        className="btn btn-primary"
        icon={this.props.icon ? this.props.icon : 'pi pi-angle-right'}
        iconPos="right"
        onClick={this.props.onClick}
        disabled={this.props.disabled}
      />
    );
  }
}

export default ButtonNext;
