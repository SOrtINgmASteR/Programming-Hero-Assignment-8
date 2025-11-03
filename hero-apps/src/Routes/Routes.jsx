import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import Root from '../Components/Root.jsx';
import Error from '../Pages/Error.jsx';
import Home from '../Pages/Home.jsx';
import Apps from '../Pages/Apps.jsx';
import AppDetails from '../Pages/AppDetails.jsx';
import MyInstallation from '../Pages/MyInstallation.jsx';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    errorElement: <Error />, 
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: 'apps',
        element: <Apps />,
      },
      {
        path: 'apps/:appId',
        element: <AppDetails />,
      },
      {
        path: 'my-installations',
        element: <MyInstallation />,
      },
    ],
  },
]);
