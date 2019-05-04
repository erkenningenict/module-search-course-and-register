import 'primeicons/primeicons.css';
import 'primereact/resources/primereact.min.css';
import 'primereact/resources/themes/nova-light/theme.css';
import { TabPanel, TabView } from 'primereact/tabview';
import * as React from 'react';
import { HashRouter, Route } from 'react-router-dom';

import { useState } from 'react';
import './App.scss';
import { SearchCourseAndRegister } from './components/containers/SearchCourseAndRegister/SearchCourseAndRegister';

export default function App() {
  // const loggedIn = false;
  const [themeId, setThemeId] = useState(0);
  const [competenceId, setCompetenceId] = useState(0);
  const [routeSet, setRoute] = useState(false);

  const parseLocationSearch = (url: string) => {
    const paramsSplitted = url
      .trim()
      .replace(/^[?]/, '')
      .split('&');
    return paramsSplitted.map((param) => {
      const paramSet = param.split('=');
      return { key: paramSet[0], value: paramSet[1] };
    });
  };
  return (
    <div className="App container-fluid">
      <HashRouter>
        <>
          <Route
            path={'/'}
            exact={true}
            render={(props: any) => {
              props.history.push('bijeenkomsten-zoeken/op-locatie');
              return null;
            }}
          />
          <Route
            path="/bijeenkomsten-zoeken/op-locatie"
            render={(props: any) => {
              const params = parseLocationSearch(props.location.search);
              params.forEach((param: { key: string; value: string }) => {
                switch (param.key) {
                  case 'themaId':
                    setThemeId(parseInt(param.value, 10));
                    break;
                  case 'competentieId':
                    setCompetenceId(parseInt(param.value, 10));
                    break;
                  default:
                }
              });
              setRoute(true);
              return null;
            }}
          />
          <Route
            path={'/online'}
            render={(props: any) => {
              setRoute(true);
              return null;
            }}
          />
          {routeSet && (
            <TabView>
              <TabPanel header="Bijeenkomsten zoeken en aanmelden">
                <SearchCourseAndRegister themeId={themeId} competenceId={competenceId} />
              </TabPanel>
            </TabView>
          )}
        </>
      </HashRouter>
    </div>
  );
}
