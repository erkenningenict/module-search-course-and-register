import { FormikProps } from 'formik';
import React from 'react';

interface IFormItemProps {
  label?: string;
  for?: string;
  name?: string;
  form?: FormikProps<any>;
  labelClassNames?: string;
  formControlClassName?: string;
  helpText?: string;
}

class FormItem extends React.Component<IFormItemProps, {}> {
  public render() {
    let labelClasses = this.props.labelClassNames || 'col-sm-4 col-md-3';
    labelClasses += ' control-label';
    return (
      <div className={'form-group row ' + (this.hasError(this.props.name) ? 'has-error' : '')}>
        {this.props.label ? (
          <label htmlFor={this.props.for} className={labelClasses}>
            {this.props.label}
          </label>
        ) : null}
        <div className={this.props.formControlClassName || 'col-sm-8 col-md-9'}>
          {this.props.children}
          {this.getError(this.props.name) && (
            <span className="help-block">{this.getError(this.props.name)}</span>
          )}
          {this.props.helpText && <span className="help-block">{this.props.helpText}</span>}
        </div>
      </div>
    );
  }

  private hasError(name?: string): boolean {
    return this.getError(name) !== undefined && this.getError(name) !== '';
  }

  private getError(name?: string): string {
    if (!name || !this.props.form) {
      return '';
    }

    // Use name for value retrieval
    const parts = name.split('.');
    let value: any = this.props.form.errors;
    for (const part of parts) {
      if (!value) {
        break;
      }
      value = value[part];
    }

    return value;
  }
}

export default FormItem;
