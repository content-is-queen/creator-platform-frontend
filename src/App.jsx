import {
  RouterProvider,
  createBrowserRouter,
  redirect,
} from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';

import isAuth from './helpers/isAuth';
import LoginActivity from './modules/Activities/LoginActivity';
import SignUpActivity from './modules/Activities/SignUpActivity';
import MessageActivity from './modules/Activities/MessageActivity';
import Dashboard from './modules/Activities/Dashboard';
import Opportunities from './modules/Activities/Opportunities';

const user = isAuth();

const router = createBrowserRouter([
  {
    path: '/',
    element: <Dashboard />,
    // loader() {
    //   if (!user) {
    //     throw redirect('/Login');
    //   }
    //   return <div>Loading...</div>;
    // },
  },

  {
    path: '/login',
    element: <LoginActivity />,
    loader() {
      if (user) {
        throw redirect('/');
      }
      return <div>Loading...</div>;
    },
  },
  {
    path: '/signup',
    element: <SignUpActivity />,
    loader() {
      if (user) {
        throw redirect('/');
      }
      return <div>Loading...</div>;
    },
  },
  {
    path: '/dashboard',
    element: <Dashboard />,
    loader() {
      if (user) {
        throw redirect('/');
      }
      return <div>Loading...</div>;
    },
  },

  {
    path: '/opportunities',
    element: <Opportunities />,
    // loader() {
    //   if (user) {
    //     throw redirect('/');
    //   }
    //   return <div>Loading...</div>;
    // },
  },
  {
    path: '/conversations',
    element: <MessageActivity />,
    // loader() {
    //   if (user) {
    //     throw redirect('/');
    //   }
    //   return <div>Loading...</div>;
    // },
  },
]);
const App = () => (
  <div>
    <RouterProvider router={router} />
  </div>
);
export default App;
