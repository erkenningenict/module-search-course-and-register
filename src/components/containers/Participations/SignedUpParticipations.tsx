import { Button } from 'primereact/button';
import React from 'react';
import { Mutation, Query } from 'react-apollo';
import { Route, Switch } from 'react-router';
import { Link } from 'react-router-dom';
import { UNREGISTER } from '../../../shared/Mutations';
import { GET_PARTICIPATION_DETAILS } from '../../../shared/Queries';
import { INormalCourseDetails } from '../../../types/IFindNormalCoursesRow';
import { IOnlineCourseDetails } from '../../../types/IFindOnlineCoursesRow';
import { NormalCourseDetails } from '../../NormalCourses/NormalCourseDetails';
import { OnlineCourseDetails } from '../../OnlineCourses/OnlineCourseDetails';
import SignedUpParticipationsTable from '../../SignedUpParticipations/SignedUpParticipationsTable';
import Alert from '../../ui/Alert';
import LinkButton from '../../ui/LinkButton';
import LinkButtonContainer from '../../ui/LinkButtonContainer';
import Panel from '../../ui/Panel';
import Spinner from '../../ui/Spinner';

export default function SignedUpParticipations(props) {
  const returnToListLink = <Link to="/waar-ben-ik-aangemeld">Terug</Link>;
  return (
    <>
      <Panel title="Waar ben ik aangemeld" doNotIncludeBody={true}>
        <Switch>
          <Route
            exact={true}
            path="/waar-ben-ik-aangemeld"
            render={(routerProps: any) => {
              return <SignedUpParticipationsTable />;
            }}
          />
          <Route
            exact={true}
            path="/waar-ben-ik-aangemeld/:participationId"
            render={(routerProps: any) => {
              return (
                <>
                  <Mutation mutation={UNREGISTER}>
                    {(
                      unRegisterCourse: any,
                      { loading: mutationLoading, data: mutationData, error: mutationError },
                    ) => (
                      <>
                        <Query
                          query={GET_PARTICIPATION_DETAILS}
                          variables={{
                            participationId: parseInt(routerProps.match.params.participationId, 10),
                          }}
                          fetchPolicy="network-only"
                        >
                          {({ loading, data, error }) => {
                            if (mutationLoading || loading) {
                              return (
                                <div className="panel-body">
                                  <Spinner />
                                </div>
                              ) as React.ReactNode;
                            }

                            if (error || mutationError) {
                              return (
                                <div className="panel-body">
                                  <Alert>
                                    Er is een fout opgetreden, probeer het later opnieuw.
                                  </Alert>
                                </div>
                              ) as React.ReactNode;
                            }
                            if (mutationData && mutationData.unRegisterForCourse.success) {
                              return (
                                <div className="panel-body">
                                  <Alert type="success">
                                    {mutationData.unRegisterForCourse.message}
                                  </Alert>
                                  {returnToListLink}
                                </div>
                              ) as React.ReactNode;
                            }
                            if (mutationData && !mutationData.unRegisterForCourse.success) {
                              return (
                                <div className="panel-body">
                                  <Alert type="warning">
                                    {mutationData.unRegisterForCourse.message}
                                  </Alert>
                                  {returnToListLink}
                                </div>
                              ) as React.ReactNode;
                            }
                            if (!data) {
                              return null as React.ReactNode;
                            }

                            if (data && data.CursusDeelnameDetails === null) {
                              return (
                                <div className="panel-body">
                                  <Alert>Gegevens van de bijeenkomst zijn niet gevonden.</Alert>
                                  <Link to="/waar-ben-ik-aangemeld">Terug naar de lijst</Link>
                                </div>
                              ) as React.ReactNode;
                            }
                            const d = data.CursusDeelnameDetails;
                            const organizerData = d.Cursus.Vak.VakgroepID
                              ? d.Cursus.Vak.Vakgroep
                              : d.Cursus.Vak.Exameninstelling;

                            if (!data.CursusDeelnameDetails.DigitaalAanbod) {
                              const details: INormalCourseDetails = {
                                Distance: 0,
                                RegisteredDate: null,
                                CanUnRegister: true,
                                CourseId: d.Cursus.CursusID,
                                CourseCode: d.Cursus.CursusCode,
                                Date: d.Cursus.Sessies[0].Datum,
                                StartTime: new Date(d.Cursus.Sessies[0].Begintijd)
                                  .toISOString()
                                  .substr(11, 5),
                                EndTime: new Date(d.Cursus.Sessies[0].Eindtijd)
                                  .toISOString()
                                  .substr(11, 5),
                                LocationName: d.Cursus.Sessies[0].Lokatie.Naam,
                                LocationAddress: {
                                  ContactDataId: 0,
                                  Street: d.Cursus.Sessies[0].Lokatie.Contactgegevens.Adresregel1,
                                  HouseNr: d.Cursus.Sessies[0].Lokatie.Contactgegevens.Huisnummer,
                                  HouseNrExtension:
                                    d.Cursus.Sessies[0].Lokatie.Contactgegevens
                                      .HuisnummerToevoeging,
                                  Zipcode: d.Cursus.Sessies[0].Lokatie.Contactgegevens.Postcode,
                                  City: d.Cursus.Sessies[0].Lokatie.Contactgegevens.Woonplaats,
                                  Phone: d.Cursus.Sessies[0].Lokatie.Contactgegevens.Telefoon,
                                  Email: d.Cursus.Sessies[0].Lokatie.Contactgegevens.Email,
                                  EmailEmployer: '',
                                  Website: d.Cursus.Sessies[0].Lokatie.Contactgegevens.Straat,
                                },
                                Remarks: null,
                                SpecialtyId: 1,
                                Title:
                                  d.Cursus.Titel.length === 0 ? d.Cursus.Vak.Titel : d.Cursus.Titel,
                                Theme: d.Cursus.Vak.Themas[0].Naam,
                                Competence: d.Cursus.Vak.Competenties[0].Naam,
                                PromoText:
                                  d.Cursus.Promotietekst.length === 0
                                    ? d.Cursus.Vak.Promotietekst
                                    : d.Cursus.Promotietekst,
                                Price: d.Cursus.Prijs === 0 ? d.Cursus.Vak.Kosten : d.Cursus.Prijs,
                                Organizer: organizerData.Naam,
                                OrganizerPhone: organizerData.Contactgegevens.Telefoon,
                                OrganizerEmail: organizerData.Contactgegevens.Email,
                                OrganizerWebsite: organizerData.Contactgegevens.Website,
                              };
                              return <NormalCourseDetails details={details} /> as React.ReactNode;
                            } else {
                              const onlineDetails: IOnlineCourseDetails = {
                                Code: d.Cursus.Vak.VakID,
                                SpecialtyId: d.Cursus.Vak.VakID,
                                Title:
                                  d.Cursus.Titel.length === 0 ? d.Cursus.Vak.Titel : d.Cursus.Titel,
                                Theme: d.Cursus.Vak.Themas[0].Naam,
                                Competence: d.Cursus.Vak.Competenties[0].Naam,
                                PromoText:
                                  d.Cursus.Promotietekst.length === 0
                                    ? d.Cursus.Vak.Promotietekst
                                    : d.Cursus.Promotietekst,
                                Price: d.Cursus.Prijs === 0 ? d.Cursus.Vak.Kosten : d.Cursus.Prijs,
                                OrganizerId: 0,
                                Organizer: organizerData.Naam,
                                OrganizerPhone: organizerData.Contactgegevens.Telefoon,
                                OrganizerEmail: organizerData.Contactgegevens.Email,
                                OrganizerWebsite: organizerData.Contactgegevens.Website,
                              };
                              return (
                                <OnlineCourseDetails details={onlineDetails} />
                              ) as React.ReactNode;
                            }
                          }}
                        </Query>

                        {!mutationData && (
                          <div className="panel-body">
                            <Button
                              type="button"
                              label="Afmelden"
                              icon="pi pi-check"
                              onClick={() => {
                                const participationId: number = parseInt(
                                  routerProps.match.params.participationId,
                                  10,
                                );
                                unRegisterCourse({
                                  variables: { CursusDeelnameID: participationId },
                                });
                              }}
                            />
                            {returnToListLink}
                          </div>
                        )}
                      </>
                    )}
                  </Mutation>
                </>
              );
            }}
          />
        </Switch>
        <div className="panel-body">
          <LinkButtonContainer>
            <LinkButton
              to={{
                pathname: `/bijeenkomsten-zoeken/op-locatie`,
                search: props.location.search,
              }}
              name="Zoek bijeenkomst op locatie"
            />
            <LinkButton
              to={{
                pathname: `/bijeenkomsten-zoeken/online`,
                search: props.location.search,
              }}
              name="Zoek online bijeenkomst"
            />
            <LinkButton
              to={{
                pathname: `/wat-heb-ik-al-gevolgd/`,
                search: props.location.search,
              }}
              name="Wat heb ik al gevolgd?"
            />
          </LinkButtonContainer>
        </div>
      </Panel>
    </>
  );
}
