import { useState } from 'react'
import Navbar from './components/navbar'
import { createBrowserRouter , RouterProvider } from 'react-router-dom';
import Homepage from './routes/homepage/homepage'
import './App.css'
import "./components/layout/layout.jsx";
import ListPage from './routes/listpage/listPage.jsx';
import {Layout, RequireAuth} from './components/layout/layout.jsx';
import SinglePage from './components/singlepage/singlepage.jsx';
import LoginPage from './components/loginpage/loginpage.jsx';
import Profile from './components/profile/profile.jsx';
import Register from './components/register/register.jsx';
import ProfileUpdatePage from './routes/profileUpdatePage/profileUpdate.jsx';
import NewPostPage from './routes/newPostPage/newPostPage.jsx';
import { singlePageLoader , listPageLoader, profilePageLoader } from './lib/loaders.js';

function App() {

 const router = createBrowserRouter([
    {
      path: '/',
      element: <Layout />,
      children:[
          {
            path: '/',
            element:<Homepage />
          },
          {
            path: '/list',
            element:<ListPage />,
            loader :  listPageLoader,

          },
          {
            path: '/login',
            element:<LoginPage />
          },
          {
            path: '/:id',
            element:<SinglePage />,
            loader : singlePageLoader,
          },
          {
            path: '/register',
            element:<Register />
          }
      ]
    },
    {
    path: '/',
    element: <RequireAuth />,
    children:[
      {
        path: '/profile',
        element:<Profile />,
        loader : profilePageLoader
      },
      {
        path: '/profile/update',
        element:<ProfileUpdatePage />
      },
      {
        path: '/add',
        element:<NewPostPage />
      }
    ]
  }
  ])
 return (
     <RouterProvider router={router} />
 )
}

export default App
