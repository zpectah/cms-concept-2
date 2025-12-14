import { formModelGenerator } from './form-model.mjs';

(() => {
  const args = process.argv.slice(2);
  const module = args[0];

  switch (module) {

    case 'form:model':
      const name = args[1];
      const path = args[2];

      if (name && path) {
        formModelGenerator(name, path);
      } else {
        if (!name) console.log('Form name is not set');
        if (!path) console.log('Form path is not set');
      }
      break;

    case 'form:empty':
      console.log('todo');
      break;

    default:
      console.log('attribute is not set')
      break;

  }

})();
