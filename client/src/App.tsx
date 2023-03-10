import { useState } from 'react'
import reactLogo from './assets/react.svg'
import { Outlet, Route, Routes } from 'react-router-dom';
import Login from './Components/Login';
import Register from './Components/Register';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'

function App() {

  return (
      <Routes>
        {/* <Layout /> */}
        <Route path="/" element={<Outlet/>}>
          {/* Home Page */}
          <Route index element={<h1>Hi</h1>} />

          {/* Login */}
          <Route path='login' element={<Login/>} />

          {/* Registration */}
          <Route path='/register' element={<Register/>} />

          {/* Expense tracking: Users should be able to input and categorize their expenses, so they can keep track of their spending. */}
          <Route path="/add" element={<h1>Hi</h1>} />

          {/* Income tracking: Users should be able to input their income, so they can see how much money they have coming in. */}
          <Route path="/income" element={<h1>Hi</h1>} />

          {/* Budget tracking: Users should be able to set up a budget for different categories and track their progress towards those goals. */}
          <Route path="/budget" element={<h1>Hi</h1>} />

          {/* Report generation: Users should be able to generate reports that summarize their financial data, such as spending trends or investment performance. */}
          <Route path="/report" element={<h1>Hi</h1>} />

          <Route path="*" element={<h1>Error 404</h1>} />
        </Route>
      </Routes>
  )
}

export default App
