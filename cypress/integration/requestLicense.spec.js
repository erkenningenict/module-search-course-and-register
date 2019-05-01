describe('Request license', function() {
  let polyfill;
  before(() => {
    const polyfillUrl = 'https://unpkg.com/unfetch/dist/unfetch.umd.js';
    cy.request(polyfillUrl).then((response) => {
      polyfill = response.body;
    });
  });

  beforeEach(() => {
    // Clear DNN cookie
    cy.setCookie('.DNN_Keurmerken', '', {
      domain: '.adviseren.erkenningen.nl',
    });
  });

  it('fills and submits the form without account and without BSN', () => {
    setup();
    // Has account?
    cy.get('.p-button-text').click();
    // Has BSN?
    cy.get('.btn > .p-button-text').click();
    fillPersonAndContactInfo();
    fillEmail();
    fillPreEducation();
    fillExamDate();
    // Documents
    cy.uploadFile('input[name=file1]', 'test.png', 'image/png');
    cy.uploadFile('input[name=file2]', 'test.png', 'image/png');
    cy.uploadFile('input[name=file3]', 'test.png', 'image/png');
    cy.get('.btn > .p-button-text').click();
    // Remarks and approval
    cy.get('#remarks').type('TEST');
    cy.get('.p-checkbox-box').click();
    // Naar samenvatting aanvraag button
    cy.get('.btn > .p-button-text').click();
    // Define graphql request
    cy.route('POST', 'graphql').as('requestLicense');
    // Afronden button
    cy.get('.btn > .p-button-text').click();
    // Wait for graphql request to finish
    cy.wait('@requestLicense');
    // Assert result
    cy.get(':nth-child(2) > .col-md-12 > :nth-child(1)').should(
      'contain',
      'Bedankt voor uw aanvraag.',
    );
  });

  it('fills and submits the form without account and with BSN', () => {
    setup();

    // Has account?
    cy.get('.p-button-text').click();
    // Has BSN?
    cy.get('#residentNl > .p-checkbox-box').click();
    cy.get('#hasBsn > .p-checkbox-box').click();
    cy.get('.btn > .p-button-text').click();

    // Define graphql request
    cy.route('POST', 'graphql').as('checkBsn');

    // NB: Only works if bsn has been removed from test database
    fillBSN(169264919, '24-06-1982');

    // Wait for graphql request to finish
    cy.wait('@checkBsn');

    fillEmail();
    fillPreEducation();
    fillExamDate();

    // Documents
    cy.uploadFile('input[name=file1]', 'test.png', 'image/png');
    cy.uploadFile('input[name=file2]', 'test.png', 'image/png');
    cy.uploadFile('input[name=file3]', 'test.png', 'image/png');

    cy.get('.btn > .p-button-text').click();

    // Remarks and approval
    cy.get('#remarks').type('TEST');
    cy.get('.p-checkbox-box').click();

    // Naar samenvatting aanvraag button
    cy.get('.btn > .p-button-text').click();

    // Define graphql request
    cy.route('POST', 'graphql').as('requestLicense');

    // Afronden button
    cy.get('.btn > .p-button-text').click();

    // Wait for graphql request to finish
    cy.wait('@requestLicense');

    // Assert result
    cy.get(':nth-child(2) > .col-md-12 > :nth-child(1)').should(
      'contain',
      'Bedankt voor uw aanvraag.',
    );
  });

  it('shows warning message for unknown BSN and birthdate', () => {
    setup();

    // Has account?
    cy.get('.p-button-text').click();
    // Has BSN?
    cy.get('#residentNl > .p-checkbox-box').click();
    cy.get('#hasBsn > .p-checkbox-box').click();
    cy.get('.btn > .p-button-text').click();

    // Define graphql request
    cy.route('POST', 'graphql').as('checkBsn');

    fillBSN(179461928, '01-01-2000');

    // Wait for graphql request to finish
    cy.wait('@checkBsn');

    cy.get(':nth-child(2) > .col-md-12 > .alert').should(
      'contain',
      'De combinatie BSN en geboortedatum is niet gevonden. Controleer uw invoer.',
    );

    return;
  });

  it('fills and submits the form using an account', () => {
    // Add account cookie
    const dnnCookie =
      '02D373A7DD58569FB084330F12A3521711F0EBF78320FA563EC6A55F76C30A560FD430E00299FCE6990A0A5F127D7072F262A1CBD52AC3145C32E548621A0E5940DE9ACC26273C6FDD6C6753BB1B7F8CE83CD09474AE0496B8FCF280BEAF29FE291CD42C318E83A6786E3E7A77097D3469E31F79184039C10E6CEA2BBDF0D671DB7BDF7C';
    cy.setCookie('.DNN_Keurmerken', dnnCookie, {
      domain: '.adviseren.erkenningen.nl',
    });

    cy.reload();
    cy.wait(1000);
    setup();
    cy.wait(3000);
    fillEmail();
    fillPreEducation();
    fillExamDate();
    // Documents
    cy.uploadFile('input[name=file1]', 'test.png', 'image/png');
    cy.uploadFile('input[name=file2]', 'test.png', 'image/png');
    cy.uploadFile('input[name=file3]', 'test.png', 'image/png');
    cy.get('.btn > .p-button-text').click();
    // Remarks and approval
    cy.get('#remarks').type('TEST');
    cy.get('.p-checkbox-box').click();
    // Naar samenvatting aanvraag button
    cy.get('.btn > .p-button-text').click();
    // Define graphql request
    cy.route('POST', 'graphql').as('requestLicense');
    // Afronden button
    cy.get('.btn > .p-button-text').click();
    // Wait for graphql request to finish
    cy.wait('@requestLicense');
    // Assert result
    cy.get(':nth-child(2) > .col-md-12 > :nth-child(1)').should(
      'contain',
      'Bedankt voor uw aanvraag.',
    );
  });

  function setup() {
    cy.server();
    cy.visit('http://localhost:3000', {
      onBeforeLoad(win) {
        // Replace fetch with polyfill
        delete win.fetch;
        win.eval(polyfill);
        win.fetch = win.unfetch;
      },
    });
  }

  function fillBSN(bsn, birthDate) {
    cy.get('#bsn').type(bsn);
    cy.get('#birthDate > .p-inputtext').type(birthDate);
    cy.get('.panel-body').click();
    // cy.get('#surname').type('');

    // Click next
    cy.get('.btn > .p-button-text').click();
  }

  function fillPersonAndContactInfo() {
    cy.get('#initials').type('G.W.');
    cy.get('#surname').type('Koudijs');
    cy.get('#birthDate > .p-inputtext').type('01-01-2000');
    cy.get('tbody > :nth-child(2) > :nth-child(1) > a').click();
    cy.get('#street').type('De Manhof');
    cy.get('#houseNumber').type('8');
    cy.get('#houseNumberAdd').type('A');
    cy.get('#zipCode').type('3907 JR');
    cy.get('#city').type('Veenendaal');
    cy.get('#country > .p-dropdown-label').click();
    cy.get(
      '#country > .p-dropdown-panel > .p-dropdown-items-wrapper > .p-dropdown-items > :nth-child(2)',
    ).click();
    cy.get('#nationality > .p-dropdown-label').click();
    cy.get(
      '#nationality > .p-dropdown-panel > .p-dropdown-items-wrapper > .p-dropdown-items > :nth-child(2)',
    ).click();

    // Click next
    cy.get('.btn > .p-button-text').click();
  }

  function fillEmail() {
    // Email
    cy.get('#email')
      .clear()
      .type('gerwin.koudijs@gmail.com');

    // Click next
    cy.get('.btn > .p-button-text').click();
  }

  function fillPreEducation() {
    cy.get('#preEducationCategory > .p-dropdown-label').click();
    cy.get(
      '#preEducationCategory > .p-dropdown-panel > .p-dropdown-items-wrapper > .p-dropdown-items > :nth-child(1)',
    ).click();

    cy.get('#preEducation > .p-dropdown-label').click();
    cy.get(
      '#preEducation > .p-dropdown-panel > .p-dropdown-items-wrapper > .p-dropdown-items > :nth-child(1)',
    ).click();

    cy.get('#certificate > .p-dropdown-label').click();
    cy.get(
      '#certificate > .p-dropdown-panel > .p-dropdown-items-wrapper > .p-dropdown-items > :nth-child(1)',
    ).click();

    // Click next
    cy.get('.btn > .p-button-text').click();
  }

  function fillExamDate() {
    // Exam date
    cy.get('.p-inputtext').type('06-01-2019');
    cy.get('tbody > :nth-child(2) > :nth-child(1) > a').click();

    // Click next
    cy.get('.btn > .p-button-text').click();
  }
});

Cypress.on('uncaught:exception', (err, runnable) => {
  // returning false here prevents Cypress from
  // failing the test
  return false;
});

/**
 * Converts Cypress fixtures, including JSON, to a Blob. All file types are
 * converted to base64 then converted to a Blob using Cypress
 * expect application/json. Json files are just stringified then converted to
 * a blob (prevents issues with invalid string decoding).
 * @param {String} fileUrl - The file url to upload
 * @param {String} type - content type of the uploaded file
 * @return {Promise} Resolves with blob containing fixture contents
 */
function getFixtureBlob(fileUrl, type) {
  return type === 'application/json'
    ? cy
        .fixture(fileUrl)
        .then(JSON.stringify)
        .then((jsonStr) => new Blob([jsonStr], { type: 'application/json' }))
    : cy.fixture(fileUrl, 'base64').then(Cypress.Blob.base64StringToBlob);
}

/**
 * Uploads a file to an input
 * @memberOf Cypress.Chainable#
 * @name uploadFile
 * @function
 * @param {String} selector - element to target
 * @param {String} fileUrl - The file url to upload
 * @param {String} type - content type of the uploaded file
 */
Cypress.Commands.add('uploadFile', (selector, fileUrl, type = '') => {
  return cy.get(selector).then((subject) => {
    return getFixtureBlob(fileUrl, type).then((blob) => {
      return cy.window().then((win) => {
        const el = subject[0];
        const nameSegments = fileUrl.split('/');
        const name = nameSegments[nameSegments.length - 1];
        const testFile = new win.File([blob], name, { type });
        const dataTransfer = new win.DataTransfer();
        dataTransfer.items.add(testFile);
        el.files = dataTransfer.files;
        return subject;
      });
    });
  });
});
