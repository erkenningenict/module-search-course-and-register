import { TabPanel, TabView } from 'primereact/tabview';
import React from 'react';
import { NormalCourses } from '../../NormalCourses/NormalCourses';
import Panel from './../../../components/ui/Panel';

export function SearchCourseAndRegister(props: any) {
  return (
    <Panel title="Zoek bijeenkomst en aanmelden">
      <TabView>
        <TabPanel header="Bijeenkomst op locatie">
          Normal:
          <NormalCourses />
        </TabPanel>
        <TabPanel header="Online bijeenkomst" />
      </TabView>
    </Panel>
  );
}
