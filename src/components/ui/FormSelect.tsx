import * as React from 'react';

import { FormikProps } from 'formik';

import { Dropdown } from 'primereact/components/dropdown/Dropdown';

import { validateField } from '../../shared/Form';
import FormItem from './FormItem';
import Spinner from './Spinner';

interface IFormSelectProps {
  id: string;
  label: string;
  name?: string;
  value?: any;
  readonly?: boolean;
  options: Array<{ label: string; value: any }>;
  placeholder?: string;
  onChange?: (e: any) => void;
  form?: FormikProps<any>;
  loading?: boolean;
  filter?: boolean;
}

class FormSelect extends React.Component<IFormSelectProps, {}> {
  public selectProps: any = this.props;
  public render() {
    const handleChange = (event: any) => {
      if (this.selectProps.form && this.selectProps.name) {
        this.selectProps.form.setFieldValue(this.selectProps.name, event.value);
        this.selectProps.form.setFieldTouched(this.selectProps.name, true);

        validateField(this.selectProps.form, this.selectProps.name, event.value);
      }
      if (this.selectProps.onChange) {
        this.selectProps.onChange(event);
      }
    };

    return (
      <FormItem
        label={this.props.label}
        for={this.props.id}
        form={this.props.form}
        name={this.props.name}
      >
        {this.props.loading ? (
          <span>
            <Spinner />
          </span>
        ) : (
          <Dropdown
            id={this.props.id}
            options={this.props.options}
            placeholder={this.props.placeholder || this.props.label}
            value={this.getFormValue()}
            onChange={handleChange}
            disabled={this.props.readonly}
            className="w-100"
            filter={this.props.filter}
            style={{ maxWidth: '100%' }}
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
    // if (this.props.form && this.props.name) {
    //   const parts = this.props.name;
    //   console.log('#DH# ', this.props.form.values);
    //   let value: any = this.props.form.values;
    //   for (const part of parts) {
    //     value = value[part];
    //   }
    //   return value;
    // }

    return undefined;
  }
}

export default FormSelect;
