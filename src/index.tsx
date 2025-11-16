import { render } from 'preact';

import preactLogo from './assets/preact.svg';
import './style.css';
import { MainScreen } from './screens/MainScreen';

export function App() {
	return (
		<MainScreen/>
	);
}

render(<App />, document.getElementById('app'));
