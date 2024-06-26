import { init } from './selecting/a';

init({
  document: document,
  onSelectingDone: () => {
    console.log('onSelectingDone');

  }
});
