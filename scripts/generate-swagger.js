const swaggerJSDoc = require('swagger-jsdoc');
const fs = require('fs');
const path = require('path');
const yaml = require('js-yaml');
const { options } = require('../dist/swagger');

const swaggerSpec = swaggerJSDoc(options);

const docsPath = path.join(__dirname, '../docs');

if (!fs.existsSync(docsPath)) {
  fs.mkdirSync(docsPath);
}

const swaggerYaml = yaml.dump(swaggerSpec, { noRefs: true, skipInvalid: true });

const outputPath = path.join(docsPath, 'openapi.yaml');
fs.writeFileSync(outputPath, swaggerYaml, 'utf8');

console.log(`Swagger YAML généré avec succès à l'emplacement : ${outputPath}`);
