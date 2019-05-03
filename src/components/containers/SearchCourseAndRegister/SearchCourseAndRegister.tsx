import { TabPanel, TabView } from 'primereact/tabview';
import React from 'react';
import { NormalCoursesForm } from '../../NormalCourses/NormalCoursesForm';
import Panel from './../../../components/ui/Panel';

interface ISearchCourseAndRegisterProps {
  themeId?: number;
  competenceId?: number;
}

export function SearchCourseAndRegister(props: ISearchCourseAndRegisterProps) {
  return (
    <Panel title="Zoek bijeenkomst en aanmelden">
      <TabView>
        <TabPanel header="Bijeenkomst op locatie">
          <NormalCoursesForm themeId={props.themeId} competenceId={props.competenceId} />
        </TabPanel>
        <TabPanel header="Online bijeenkomst" />
      </TabView>
    </Panel>
  );
}
