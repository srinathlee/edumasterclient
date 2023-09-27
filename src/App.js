import {createBrowserRouter,RouterProvider} from 'react-router-dom'
import Home from './components/home';
import Dashboard from './components/dashboard';

function App() {
  const Router=createBrowserRouter([
    {
      path:"/",
      element:<Home/>
    },
    {
      path:"/dashboard",
      element:<Dashboard/>
    }
  ])


  return (    
      <RouterProvider router={Router}>
      </RouterProvider>
     );
}

export default App;
