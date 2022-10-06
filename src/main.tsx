import ReactDOM from 'react-dom/client';
import { Home } from './pages/home';
import './assets/styles/basic.css';
import { RecoilRoot } from 'recoil';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <RecoilRoot>
        <Home />
    </RecoilRoot>
);
