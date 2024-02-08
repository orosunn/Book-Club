import './assets/css/style.css';
import 'semantic-ui-css/semantic.min.css';
import ReactDOM from 'react-dom';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import App from './App';
import Home from './pages/Home';
import Books from './pages/Books';
import Discussion from './pages/Discussion';
import Contact from './pages/Contact'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: '/books',
        element: <Books />,
      },
      {
        path: '/discussion',
        element: <Discussion />,
      },
      {
        path: '/contact',
        element: <Contact />,
      },
    ],
  },
]);

// ReactDOM.createRoot(document.getElementById('root')).render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>,
// )

ReactDOM.createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />
);
