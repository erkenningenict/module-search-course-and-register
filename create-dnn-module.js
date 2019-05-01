require('dotenv').config();

const fs = require('fs-extra');
const archiver = require('archiver');
const path = require('path');
const log = require('console-emoji');

const moduleName = process.env.MODULE_NAME;
const buildFolder = path.resolve(__dirname, './build/static/');
const outputFolder = path.resolve(__dirname, './dnn/build/');
const dnnTemplate = path.resolve(__dirname, './dnn/ModuleTemplate.dnn');
const ascxTemplate = path.resolve(__dirname, './dnn/ModuleTemplate.ascx');
const genericModuleDll = 'AOCRaad.Erkenningen.GenericModule.dll';
const genericModulePath = path.resolve(__dirname, './dnn/', genericModuleDll);
const archivePath = path.resolve(outputFolder, `DNN Module AOCRaad.Erkenningen.${moduleName}.zip`);

const matcher = /^(runtime\~.*\.|(.*)(\.chunk\.))(js|css)$/;

const cssHtmlTemplate =
  '<link rel="stylesheet" href="/DesktopModules/AOCRaad.Erkenningen.' +
  process.env.MODULE_NAME +
  '/static/css/{{CSS_FILE}}">';
const jsHtmlTemplate =
  '<script src="/DesktopModules/AOCRaad.Erkenningen.' +
  process.env.MODULE_NAME +
  '/static/js/{{JS_FILE}}"></script>';
const dnnFileEntryTemplate = '<file><path>static/{{FOLDER}}</path><name>{{FILE}}</name></file>\r\n';

function run() {
  try {
    log(':put_litter_in_its_place:  Clearing output folder');

    // Clear output folder
    fs.removeSync(outputFolder);

    log(':open_file_folder:  Re-creating output folder');

    // Re-create output folder
    fs.ensureDirSync(outputFolder);

    log(':page_with_curl:  Creating DNN manifest');

    // Read dnn template, replace tokens and copy to output folder
    let dnnTemplateData = fs.readFileSync(dnnTemplate, 'utf-8');
    dnnTemplateData = dnnTemplateData.replace(new RegExp(`{{MODULE_NAME}}`, 'g'), moduleName);

    // Add file entries
    let fileEntries = '';
    ['css', 'js', 'media'].forEach((folder) => {
      fs.readdirSync(path.resolve(buildFolder, folder)).forEach((file) => {
        fileEntries += dnnFileEntryTemplate.replace('{{FOLDER}}', folder).replace('{{FILE}}', file);
      });
    });
    dnnTemplateData = dnnTemplateData.replace(new RegExp(`{{FILE_ENTRIES}}`, 'g'), fileEntries);

    fs.writeFileSync(
      path.resolve(outputFolder, moduleName + '.dnn'),
      dnnTemplateData,
      'utf-8',
      'w+',
    );

    log(':earth_americas:  Creating ASCX file');

    // Read ascx template, replace tokens and copy to output folder
    let ascxTemplateData = fs.readFileSync(ascxTemplate, 'utf-8');
    ascxTemplateData = ascxTemplateData.replace(new RegExp(`{{MODULE_NAME}}`, 'g'), moduleName);

    fs.readdirSync(path.resolve(buildFolder, 'css')).forEach((file) => {
      if (file.match(matcher)) {
        ascxTemplateData += '\r\n' + cssHtmlTemplate.replace('{{CSS_FILE}}', file);
      }
    });

    fs.readdirSync(path.resolve(buildFolder, 'js')).forEach((file) => {
      if (file.match(matcher)) {
        ascxTemplateData += '\r\n' + jsHtmlTemplate.replace('{{JS_FILE}}', file);
      }
    });

    fs.writeFileSync(
      path.resolve(outputFolder, moduleName + '.ascx'),
      ascxTemplateData,
      'utf-8',
      'w+',
    );

    log(':gift:  Copying assets to output folder');

    // Copy static build output to output folder
    fs.copySync(buildFolder, path.resolve(outputFolder, 'static'));

    log(':closed_book:  Copying module dll to output folder');

    // Copy generic dll to output folder
    fs.copySync(genericModulePath, path.resolve(outputFolder, genericModuleDll));

    log(':package:  Creating ZIP archive');

    // Create ZIP archive
    archive();

    log(':beer:  Finished!');
  } catch (err) {
    log(':rage:  ' + err);
  }

  console.log('');
}

function archive() {
  const archive = archiver('zip', {
    zlib: { level: 9 }, // Sets the compression level.
  });

  archive.on('warning', function(err) {
    if (err.code === 'ENOENT') {
      log(err, 'err');
    } else {
      throw err;
    }
  });

  archive.on('error', function(err) {
    throw err;
  });

  archive.directory(outputFolder, false);

  const output = fs.createWriteStream(archivePath);

  archive.pipe(output);
  archive.finalize();
}

run();
