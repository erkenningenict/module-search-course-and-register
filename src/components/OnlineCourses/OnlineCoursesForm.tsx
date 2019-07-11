import { LinkButtonContainer, PanelBody, Spinner } from '@erkenningen/ui';
import { Formik } from 'formik';
import { Button } from 'primereact/button';
import React, { useContext, useState } from 'react';
import { Query } from 'react-apollo';
import { RouteComponentProps } from 'react-router';
import { IKennisgebied, IThema } from '../../shared/Model';
import { IListsQuery, LISTS_QUERY } from '../../shared/Queries';
import { UserContext } from '../../shared/UserContext';
import FormSelect from '../ui/FormSelect';
import LinkButton from '../ui/LinkButton';
import { parseLocationSearch } from './../../helpers/url-utils';
import { OnlineCoursesTable } from './OnlineCoursesTable';

interface IOnlineCourseFormProps extends RouteComponentProps {
  isOnline: boolean;
}

export function OnlineCoursesForm(props: IOnlineCourseFormProps) {
  const [searchData, setSearchData] = useState();

  const value = useContext(UserContext);
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
      </PanelBody>
      <Query<IListsQuery> query={LISTS_QUERY}>
        {({ loading, error, data }) => {
          if (loading) {
            return (
              <div>
                <Spinner />
              </div>
            ) as React.ReactNode;
          }

          if (error) {
            return (
              <p>Er is een fout opgetreden, probeer het later opnieuw. Details: {{ error }}</p>
            ) as React.ReactNode;
          }

          const licenseId: string | null =
            (value &&
              value.my &&
              value.my.Certificeringen &&
              value.my.Certificeringen.length > 0 &&
              value.my.Certificeringen[0].CertificeringID) ||
            null;

          if (!searchData) {
            let theme = 0;
            let competence = 0;
            const params = parseLocationSearch(props.location.search);
            params.forEach((param: { key: string; value: string }) => {
              switch (param.key) {
                case 'themaId':
                  theme = parseInt(param.value, 10);

                  break;
                case 'competentieId':
                  competence = parseInt(param.value, 10);
                  break;
                default:
              }
            });
            setSearchData({
              licenseId,
              themeId: theme,
              competenceId: competence,
              isOnlineCourse: props.isOnline,
            });

            return null;
          }

          if (!data) {
            return null;
          }

          const knowledgeAreas: IKennisgebied[] = [
            { KennisgebiedID: '0', Naam: 'Alle' },
            ...data.Kennisgebieden.sort((a: IKennisgebied, b: IKennisgebied) =>
              a.Naam < b.Naam ? -1 : 1,
            ),
          ];
          const themes = [
            { ThemaID: '0', Naam: 'Alle' },
            ...data.Themas.sort((a: IThema, b: IThema) => (a.Naam < b.Naam ? -1 : 1)),
          ];
          return (
            <Formik
              initialValues={{
                licenseId,
                knowledgeAreaId: 0,
                themeId: (searchData && searchData.themeId) || 0,
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
                    name="themeId"
                    form={formProps}
                  />
                  <div className="form-group row">
                    <div className="col-sm-4 col-md-3 col-sm-offset-4 col-md-offset-3">
                      <Button
                        type="submit"
                        label="Zoeken"
                        icon="pi pi-search"
                        disabled={formProps.isSubmitting}
                      />
                    </div>
                  </div>
                </form>
              )}
            />
          ) as React.ReactNode;
        }}
      </Query>
      {searchData && <OnlineCoursesTable searchData={searchData} />}
    </>
  );
}
