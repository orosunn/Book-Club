import './assets/css/style.css'
import 'semantic-ui-css/semantic.min.css';
import ReactDOM from 'react-dom'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import App from './App';
import Home from './pages/Home'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      // {
      //   path: '/login',
      //   element: <Login />,
      // },
      // {
      //   path: '/donate',
      //   element: <Donate />,
      // },
      // {
      //   path: '/contact',
      //   element: <Contact />,
      // },
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
