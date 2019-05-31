import React, { useEffect, useState } from 'react';

import { Link, RouteComponentProps } from 'react-router-dom';
import { parseLocationSearch } from '../../helpers/url-utils';

interface IIdLabel {
  Id: number;
  Label: string;
}

interface IOnlineCoursesProps {
  themeId?: number;
  competenceId?: number;
}

interface IFilterLists {
  Themes: IIdLabel[];
  KnowledgeAreas: IIdLabel[];
  Competences: IIdLabel[];
  Distances: IIdLabel[];
}

export function OnlineCoursesForm(onlineCourseProps: RouteComponentProps) {
  // const [searchData, setSearchData] = useState({});
  const [themeId, setThemeId] = useState(0);
  const [competenceId, setCompetenceId] = useState(0);
  const [routeSet, setRoute] = useState(false);

  // console.log('#DH# details', details);
  if (!routeSet) {
    const params = parseLocationSearch(onlineCourseProps.location.search);
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
  }
  return (
    <>
      <div className="panel-body">
        <p>
          <Link
            to={{
              pathname: '/bijeenkomsten-zoeken/op-locatie',
              search: onlineCourseProps.location.search,
            }}
          >
            Ga naar bijeenkomsten op locatie zoeken
          </Link>
        </p>
        )}
      </div>
      Online bijeenkomsten
      {/* <NormalCoursesTable searchData={searchData} /> */}
    </>
  );
}
