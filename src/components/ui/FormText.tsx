import { Input, TextArea } from '@erkenningen/ui';
import { FormikProps } from 'formik';
import React from 'react';
import FormItem from './FormItem';

interface IFormTextProps {
  id: string;
  label: string;
  name?: string;
  value?: string;
  placeholder?: string;
  mask?: string;
  readonly?: boolean;
  keyfilter?: string;
  onChange?: (e: any) => void;
  onBlur?: (e: any) => void;
  form?: FormikProps<any>;
  isTextArea?: boolean;
  labelClassNames?: string;
  formControlClassName?: string;
  helpText?: string;
}

class FormText extends React.Component<IFormTextProps, {}> {
  public render() {
    const handleChange = (event: any) => {
      if (this.props.form) {
        this.props.form.handleChange(event);
      }

      if (this.props.onChange) {
        this.props.onChange(event);
      }
    };

    const handleBlur = (event: any) => {
      if (this.props.form) {
        this.props.form.handleBlur(event);
      }

      if (this.props.onBlur) {
        this.props.onBlur(event);
      }
    };

    // Show nothing if readonly is true and value is empty
    if (this.props.readonly && !this.getFormValue()) {
      return null;
    }

    return (
      <FormItem
        label={this.props.label}
        for={this.props.id}
        form={this.props.form}
        name={this.props.name}
        labelClassNames={this.props.labelClassNames}
        formControlClassName={this.props.formControlClassName}
        helpText={this.props.helpText}
      >
        {this.props.isTextArea ? (
          <TextArea
            id={this.props.id}
            name={this.props.name}
            placeholder={this.props.placeholder || this.props.label}
            value={this.getFormValue()}
            readOnly={this.props.readonly}
            onChange={handleChange}
            onBlur={handleBlur}
            className="form-control"
          />
        ) : (
          <Input
            id={this.props.id}
            name={this.props.name}
            placeholder={this.props.placeholder || this.props.label}
            value={this.getFormValue()}
            readOnly={this.props.readonly}
            onChange={handleChange}
            onBlur={handleBlur}
            className="form-control"
          />
        )}
      </FormItem>
    );
  }

  private getFormValue(): any {
    if (this.props.value) {
      return this.props.value;
    }

    // Use name value for value retrieval
    if (this.props.form && this.props.name) {
      const parts = this.props.name.split('.');
      let value: any = this.props.form.values;
      for (const part of parts) {
        value = value[part];
      }
      return value;
    }

    return undefined;
  }
}

export default FormText;
