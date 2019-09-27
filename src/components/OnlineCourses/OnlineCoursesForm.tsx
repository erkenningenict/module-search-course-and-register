import { useQuery } from '@apollo/react-hooks';
import {
  Button,
  LinkButtonContainer,
  PanelBody,
  parseLocationSearch,
  Spinner,
} from '@erkenningen/ui';
import { Formik } from 'formik';
import React, { useContext, useState } from 'react';
import { RouteComponentProps } from 'react-router';
import { StringParam, useQueryParam } from 'use-query-params';
import { IKennisgebied, IThema } from '../../shared/Model';
import { IListsQuery, LISTS } from '../../shared/Queries';
import { UserContext } from '../../shared/UserContext';
import FormSelect from '../ui/FormSelect';
import LinkButton from '../ui/LinkButton';
import { OnlineCoursesTable } from './OnlineCoursesTable';

interface IOnlineCourseFormProps extends RouteComponentProps {
  isOnline: boolean;
}

export function OnlineCoursesForm(props: IOnlineCourseFormProps) {
  const [searchData, setSearchData] = useState();
  const [themeId, setThemeId] = useQueryParam('themaId', StringParam);
  const [knowledgeAreaId, setKnowledgeAreaId] = useQueryParam('sectorId', StringParam);

  const value = useContext(UserContext);
  const { loading, data, error } = useQuery<IListsQuery>(LISTS);
  if (loading) {
    return (
      <div>
        <Spinner />
      </div>
    );
  }

  if (error) {
    return <p>Er is een fout opgetreden, probeer het later opnieuw. Details: {{ error }}</p>;
  }

  const licenseId: string | null =
    (value &&
      value.my &&
      value.my.Certificeringen &&
      value.my.Certificeringen.length > 0 &&
      value.my.Certificeringen[0].CertificeringID) ||
    null;

  if (!searchData) {
    let theme = '0';
    let knowledgeArea = '0';
    const params = parseLocationSearch(props.location.search);
    params.forEach((param: { key: string; value: string }) => {
      switch (param.key) {
        case 'themaId':
          theme = param.value;

          break;
        case 'sectorId':
          knowledgeArea = param.value;
          break;
        default:
      }
    });
    setSearchData({
      licenseId,
      themeId: theme,
      knowledgeAreaId: knowledgeArea,
      isOnlineCourse: props.isOnline,
    });

    return null;
  }

  if (!data) {
    return null;
  }

  const knowledgeAreas: IKennisgebied[] = [
    { KennisgebiedID: '0', Naam: 'Alle' },
    ...data.Kennisgebieden.sort((a: IKennisgebied, b: IKennisgebied) => (a.Naam < b.Naam ? -1 : 1)),
  ];
  const themes = [
    { ThemaID: '0', Naam: 'Alle' },
    ...data.Themas.sort((a: IThema, b: IThema) => (a.Naam < b.Naam ? -1 : 1)),
  ];
  return (
    <>
      <PanelBody>
        <LinkButtonContainer>
          <LinkButton
            to={{
              pathname: `/bijeenkomsten-zoeken/op-locatie`,
              search: props.location.search,
            }}
          >
            Bijeenkomsten op locatie
          </LinkButton>
          {value && (
            <>
              <LinkButton
                to={{
                  pathname: `/wat-heb-ik-al-gevolgd/`,
                  search: props.location.search,
                }}
              >
                Wat heb ik al gevolgd?
              </LinkButton>
              <LinkButton
                to={{
                  pathname: `/waar-ben-ik-aangemeld`,
                  search: props.location.search,
                }}
              >
                Waar ben ik aangemeld?
              </LinkButton>
            </>
          )}
        </LinkButtonContainer>
        <h3>Zoek een online bijeenkomst</h3>

        <Formik
          initialValues={{
            licenseId,
            knowledgeAreaId: (searchData && searchData.knowledgeAreaId) || '0',
            themeId: (searchData && searchData.themeId) || '0',
            isOnlineCourse: props.isOnline,
          }}
          onSubmit={(values, { setSubmitting }) => {
            setSearchData(values);
            setSubmitting(false);
          }}
          render={(formProps: any) => (
            <form onSubmit={formProps.handleSubmit} className="form form-horizontal">
              <FormSelect
                id="knowledgeArea"
                label="Sector"
                options={knowledgeAreas.map((item: IKennisgebied) => ({
                  value: item.KennisgebiedID,
                  label: item.Naam,
                }))}
                name="knowledgeAreaId"
                onChange={(e: any) => {
                  setKnowledgeAreaId(e.value);
                  setSearchData({
                    licenseId,
                    themeId,
                    knowledgeAreaId: e.value,
                    isOnlineCourse: props.isOnline,
                  });
                }}
                loading={loading}
                form={formProps}
              />
              <FormSelect
                id="themeId"
                label="Thema"
                options={themes.map((item: IThema) => ({
                  value: item.ThemaID,
                  label: item.Naam,
                }))}
                loading={loading}
                onChange={(e: any) => {
                  setThemeId(e.value);
                  setSearchData({
                    licenseId,
                    knowledgeAreaId,
                    themeId: e.value,
                    isOnlineCourse: props.isOnline,
                  });
                }}
                name="themeId"
                form={formProps}
              />
              <div className="form-group row">
                <div className="col-sm-4 col-md-3 offset-sm-4 offset-md-3 col-sm-offset-4 col-md-offset-3">
                  <Button
                    buttonType="submit"
                    label="Zoeken"
                    icon="pi pi-search"
                    disabled={formProps.isSubmitting}
                  />
                </div>
              </div>
            </form>
          )}
        />
      </PanelBody>
      {searchData && <OnlineCoursesTable {...props} searchData={searchData} />}
    </>
  );
}
