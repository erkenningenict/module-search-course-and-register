import * as React from 'react';

import { Button } from 'primereact/components/button/Button';

interface IButtonPrevProps {
  disabled?: boolean;
  label?: string;
  icon?: string;
  onClick?: (e: any) => void;
}

class ButtonPrev extends React.Component<IButtonPrevProps, {}> {
  public render() {
    return (
      <Button
        type="button"
        label={this.props.label ? this.props.label : 'Vorige'}
        icon={this.props.icon ? this.props.icon : 'pi pi-angle-left'}
        iconPos="left"
        className="p-button-secondary"
        onClick={this.props.onClick}
        disabled={this.props.disabled}
      />
    );
  }
}

export default ButtonPrev;
