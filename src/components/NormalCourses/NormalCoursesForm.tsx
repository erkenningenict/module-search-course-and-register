import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Col from '../ui/Col';
import Row from '../ui/Row';

import { Formik } from 'formik';
import FormSelect from '../ui/FormSelect';
import FormText from '../ui/FormText';
import { NormalCoursesTable } from './NormalCoursesTable';

interface IIdLabel {
  Id: number;
  Label: string;
}

interface INormalCoursesProps {
  themeId?: number;
  competenceId?: number;
}

interface IFilterLists {
  Themes: IIdLabel[];
  KnowledgeAreas: IIdLabel[];
  Competences: IIdLabel[];
  Distances: IIdLabel[];
}
const useDataApi = (initialUrl: string, initialData: IFilterLists) => {
  const [data, setData] = useState(initialData);
  const [url, setUrl] = useState(initialUrl);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsError(false);
      setIsLoading(true);

      try {
        const result = await axios(url);

        setData(result.data);
      } catch (error) {
        setIsError(true);
      }

      setIsLoading(false);
    };

    fetchData();
  }, [url]);

  const doFetch = (urlString: string) => {
    setUrl(urlString);
  };

  return { data, isLoading, isError, doFetch };
};

export function NormalCoursesForm(normalCoursesProps: INormalCoursesProps) {
  const [searchData, setSearchData] = useState({});
  const { data, isLoading, isError } = useDataApi(
    `${process.env.REACT_APP_DNN_WEB_API}/Course/FilterLists`,
    { Distances: [], KnowledgeAreas: [], Themes: [], Competences: [] },
  );
  return (
    <>
      <div className="panel-body">
        {isError && (
          <div>
            Er is een probleem opgetreden bij het ophalen van gegevens. Probeer het later opnieuw.
          </div>
        )}
        {!isError && (
          <Formik
            initialValues={{
              KnowledgeArea: 0,
              Theme: normalCoursesProps.themeId || 0,
              Competence: normalCoursesProps.competenceId || 0,
              DistanceRadius: 0,
              From: '',
              To: '',
              SearchTerm: '',
            }}
            onSubmit={(values, { setSubmitting }) => {
              // setTimeout(() => {
              // alert(JSON.stringify(values, null, 2));
              setSearchData(values);
              setSubmitting(false);
              // }, 400);
            }}
            render={(props: any) => {
              return (
                <form onSubmit={props.handleSubmit} className="form form-horizontal">
                  <FormSelect
                    id="knowledgeArea"
                    label="Sector"
                    options={data.KnowledgeAreas.map((item: IIdLabel) => ({
                      value: item.Id,
                      label: item.Label,
                    }))}
                    name="KnowledgeArea"
                    loading={isLoading}
                    form={props}
                  />
                  <FormSelect
                    id="theme"
                    label="Thema"
                    options={data.Themes.map((item: IIdLabel) => ({
                      value: item.Id,
                      label: item.Label,
                    }))}
                    loading={isLoading}
                    name="Theme"
                    form={props}
                  />
                  <FormSelect
                    id="competence"
                    label="Licentietype"
                    options={data.Competences.map((item: IIdLabel) => ({
                      value: item.Id,
                      label: item.Label,
                    }))}
                    loading={isLoading}
                    name="Competence"
                    form={props}
                  />
                  <Row>
                    <Col className="col-md-7" styles={{ paddingLeft: '36px' }}>
                      <FormText
                        id="dateFrom"
                        label="Datum vanaf"
                        placeholder="dd-mm-jjjj"
                        name="From"
                        form={props}
                        labelClassNames="col-md-5"
                        formControlClassName="col-md-3"
                      />
                    </Col>
                    <Col className="col-md-5">
                      <FormText
                        id="dateTo"
                        label="Datum tot"
                        placeholder="dd-mm-jjjj"
                        name="To"
                        form={props}
                        labelClassNames="col-md-4"
                        formControlClassName="col-md-5"
                      />
                    </Col>
                  </Row>
                  <FormText
                    id="zipcode"
                    label="Postcode"
                    placeholder="1234 AA"
                    name="Zipcode"
                    form={props}
                    labelClassNames="col-md-3"
                    formControlClassName="col-md-2"
                  />
                  <FormSelect
                    id="distance"
                    label="Afstand in km"
                    options={data.Distances.map((item: IIdLabel) => ({
                      value: item.Id,
                      label: item.Label,
                    }))}
                    name="distance"
                    loading={isLoading}
                    form={props}
                  />
                  <FormText
                    id="searchTerm"
                    label="Zoekterm"
                    placeholder="zoek in titel en naam"
                    name="SearchTerm"
                    form={props}
                  />
                  <div className="form-group row">
                    <div className="col-md-4 col-md-offset-3">
                      <button
                        type="submit"
                        className="btn btn-primary"
                        disabled={props.isSubmitting}
                      >
                        Zoeken
                      </button>
                    </div>
                  </div>
                </form>
              );
            }}
          />
        )}
      </div>
      <NormalCoursesTable searchData={searchData} />
    </>
  );
}
