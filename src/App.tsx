import 'primeicons/primeicons.css';
import 'primereact/resources/primereact.min.css';
import 'primereact/resources/themes/nova-light/theme.css';
import { TabPanel, TabView } from 'primereact/tabview';
import * as React from 'react';
import { HashRouter, Route, Switch } from 'react-router-dom';

import './App.scss';
import { SearchCourseAndRegister } from './components/containers/SearchCourseAndRegister/SearchCourseAndRegister';
import Panel from './components/ui/Panel';
// import { NormalCourses } from './components/NormalCourses/NormalCourses';
// import Panel from './components/ui/Panel';

interface IAppState {
  activeIndex: number;
}

export default function App() {
  const loggedIn = true;
  let online = false;
  return (
    <div className="App container-fluid">
      <HashRouter>
        <div>
          <Route
            path={'/'}
            exact={true}
            render={(props: any) => {
              console.log('props', props.location.search);
              online = false;
              return null;
            }}
          />
          <Route
            path={'/online'}
            render={(props: any) => {
              online = true;
              console.log('props for online', props.location.search);
              return null;
            }}
          />
          <TabView>
            <TabPanel header="Bijeenkomsten zoeken en aanmelden">
              <SearchCourseAndRegister />
            </TabPanel>
            { (
              <TabPanel header="Header II" disabled={!loggedIn}>
                Content II
              </TabPanel>
            )}
          </TabView>
        </div>
      </HashRouter>
    </div>
  );
}
