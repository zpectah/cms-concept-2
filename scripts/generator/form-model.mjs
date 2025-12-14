import fs from 'fs';
import path from 'path';
import { toCamelCase } from '../utils/index.mjs';

const TEMPLATE_KEYS = {
  MAIN_COMPONENT: 'MAIN_COMPONENT',
  CUSTOM_HOOK: 'CUSTOM_HOOK',
  HELPERS: 'HELPERS',
  SCHEMA: 'SCHEMA',
  TYPES: 'TYPES',
};

const getFileNames = (componentName) => ({
  [TEMPLATE_KEYS.MAIN_COMPONENT]: `${componentName}.tsx`,
  [TEMPLATE_KEYS.CUSTOM_HOOK]: `use${componentName}.ts`,
  [TEMPLATE_KEYS.HELPERS]: 'helpers.ts',
  [TEMPLATE_KEYS.SCHEMA]: 'schema.ts',
  [TEMPLATE_KEYS.TYPES]: 'types.ts',
});

const templateContent = (componentName) => ({
  [TEMPLATE_KEYS.MAIN_COMPONENT]:
    `import { ControlledForm } from '../../../components';
import { I${componentName} } from './types';
import { use${componentName} } from './use${componentName}';

const ${componentName} = () => {
  const { form } = use${componentName}();

  return (
    <ControlledForm<I${componentName}>
      form={form}
    >
      <>...${componentName}...</>
    </ControlledForm>
  );
}

export default ${componentName};`,

  [TEMPLATE_KEYS.CUSTOM_HOOK]:
    `import { useNavigate, useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useViewContext } from '../../../contexts';
import { I${componentName} } from './types';
import { ${toCamelCase(componentName)}Schema } from './schema';

export const use${componentName} = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { rootUrl } = useViewContext();
  const form = useForm<I${componentName}>({
    resolver: zodResolver(${toCamelCase(componentName)}Schema),
    defaultValues: {},
  });

  const detailTitle = 'Detail title'; // TODO

  const closeHandler = () => {
    navigate(rootUrl);
  };

  const submitHandler = (data: I${componentName}) => {
    // TODO

    console.log('data', data);
  };

  return {
    id,
    rootUrl,
    detailTitle,
    form,
    onSubmit: submitHandler,
    onClose: closeHandler,
  };
}`,

  [TEMPLATE_KEYS.HELPERS]:
    `import { I${componentName} } from './types';

/** Gets default form values */
export const defaultDataToForm = (): I${componentName} => {
  return {};
};

/** Gets formatted detail data to form */
export const detailDataToForm = (data: object): I${componentName} => {
  return {};
};

/** Gets formatted form data to master before submit */
export const formDataToMaster = (data: I${componentName}): object => {
  const master = Object.assign({
    ...data,
  });

  return { ...master };
};`,

  [TEMPLATE_KEYS.SCHEMA]:
    `import z from 'zod';

export const ${toCamelCase(componentName)}Schema = z.object({
  /* TODO */
});`,

  [TEMPLATE_KEYS.TYPES]:
    `import z from 'zod';
import { ${toCamelCase(componentName)}Schema } from './schema';

export type I${componentName} = z.infer<typeof ${toCamelCase(componentName)}Schema>;
`,
});

function generateComponent() {
  const args = process.argv.slice(2);
  if (args.length < 2) {
    console.error('Použití: node generateComponent.js <NázevKomponenty> <Cesta/K/Umístění>');
    return;
  }

  const componentName = args[0];
  const targetPath = args[1];

  if (!/^[A-Z][a-zA-Z0-9]*$/.test(componentName)) {
    console.error('Název komponenty musí být ve formátu PascalCase (např. MyComponent).');
    return;
  }

  const componentDir = path.join(targetPath, componentName);

  try {
    if (fs.existsSync(componentDir)) {
      console.error(`\n❌ Chyba: Adresář již existuje: ${componentDir}`);
      return;
    }

    fs.mkdirSync(componentDir, { recursive: true });
    console.log(`Adresář vytvořen: ${componentDir}`);

    const fileNames = getFileNames(componentName);
    const templates = templateContent(componentName);

    // Iterace přes konstantní klíče, nikoli přes dynamické názvy souborů
    for (const key of Object.values(TEMPLATE_KEYS)) {
      const fileName = fileNames[key];
      const content = templates[key];
      const filePath = path.join(componentDir, fileName);

      fs.writeFileSync(filePath, content);
      console.log(`- Vytvořen soubor: ${fileName}`);
    }

    console.log(`\nKomponenta '${componentName}' byla úspěšně vygenerována.`);

  } catch (error) {
    console.error(`\nChyba při generování komponenty: ${error.message}`);
  }
}

generateComponent();
