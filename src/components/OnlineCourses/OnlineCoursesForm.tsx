import { Formik } from 'formik';
import { Button } from 'primereact/button';
import React, { useContext, useState } from 'react';
import { Query } from 'react-apollo';
import { RouteComponentProps } from 'react-router';
import { IKennisgebied, IThema } from '../../shared/Model';
import { LISTS_QUERY } from '../../shared/Queries';
// import { SelectedLicenseContext } from '../../shared/SelectedLicenseContext';
import { UserContext } from '../../shared/UserContext';
import FormSelect from '../ui/FormSelect';
import LinkButton from '../ui/LinkButton';
import LinkButtonContainer from '../ui/LinkButtonContainer';
import Spinner from '../ui/Spinner';
import { parseLocationSearch } from './../../helpers/url-utils';
import { OnlineCoursesTable } from './OnlineCoursesTable';

interface IIdLabel {
  Id: number;
  Label: string;
}

interface IOnlineCourseFormProps extends RouteComponentProps {
  isOnline: boolean;
}

export function OnlineCoursesForm(props: IOnlineCourseFormProps) {
  const [searchData, setSearchData] = useState();

  const value = useContext(UserContext);
  return (
    <>
      <div className="panel-body">
        <LinkButtonContainer>
          <LinkButton
            to={{
              pathname: `/bijeenkomsten-zoeken/op-locatie`,
              search: props.location.search,
            }}
            name="Bijeenkomsten op locatie"
          />
          {value && (
            <>
              <LinkButton
                to={{
                  pathname: `/wat-heb-ik-al-gevolgd/`,
                  search: props.location.search,
                }}
                name="Wat heb ik al gevolgd?"
              />
              <LinkButton
                to={{
                  pathname: `/waar-ben-ik-aangemeld`,
                  search: props.location.search,
                }}
                name="Waar ben ik aangemeld?"
              />
            </>
          )}
        </LinkButtonContainer>
        <h3>Zoek een online bijeenkomst</h3>
      </div>
      <Query query={LISTS_QUERY}>
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

          const knowledgeAreas = [{ KennisgebiedID: 0, Naam: 'Alle' }, ...data.Kennisgebieden];
          const themes = [{ ThemaID: 0, Naam: 'Alle' }, ...data.Themas];
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
                      value: parseInt(item.KennisgebiedID, 10),
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
                      value: parseInt(item.ThemaID, 10),
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
