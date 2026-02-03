import ReactDOM from 'react-dom';
import { initializeBlock } from '@airtable/blocks/ui';
import App from './App';

initializeBlock(() => {
  ReactDOM.render(<App />, document.getElementById('root'));
});
