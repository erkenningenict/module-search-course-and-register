import { Dialog } from 'primereact/dialog';
import React from 'react';
import './BEDialog.scss';

export function BEDialog(props: any) {
  return props.useDialog ? (
    <Dialog
      header={props.header}
      visible={props.visible}
      modal={true}
      className="BEDialog"
      //   style={{ width: '80vw', maxHeight: '90vh', overflow: 'scroll' }}
      footer={props.footer}
      onHide={() => props.onHideDialog(true)}
    >
      {props.children}
    </Dialog>
  ) : (
    props.children
  );
}
