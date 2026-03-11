import { createBrowserRouter } from 'react-router';
import { Layout } from './components/layout/Layout';
import { HomePage } from './pages/HomePage';
import { BookingPage } from './pages/BookingPage';
import { ConfirmationPage } from './pages/ConfirmationPage';
import { useRouteError } from 'react-router';

function RootError() {
  const error = useRouteError();
  console.error(error);
  return (
    <div style= {{ padding: 20 }
}>
  <h1>Application Error </h1>
    < pre > { JSON.stringify(error, null, 2) } </pre>
    < pre > { String(error) } </pre>
    </div>
  );
}

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout><HomePage /></Layout >,
    errorElement: <RootError />
  },
  {
    path: '/book/:serviceId?',
    element: <Layout><BookingPage /></Layout >,
  },
  {
    path: '/booking/confirmed',
    element: <Layout><ConfirmationPage /></Layout >,
  },
  {
    path: '*',
    element: <div>Catch all - route not found </div>,
  }
]);
