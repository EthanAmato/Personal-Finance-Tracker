import { useState } from 'react'
import reactLogo from './assets/react.svg'
import { InMemoryCache, ApolloProvider, HttpLink, from } from "@apollo/client"
import { ErrorResponse } from '@apollo/client/link/error';
import { ApolloClient } from '@apollo/client';
import { onError } from '@apollo/client/link/error';
import { Outlet, Route, Routes } from 'react-router-dom';
import Login from './Components/Login';

//function that tells program what to do if there are any errors
const errorLink = onError(({ graphQLErrors, networkError }: ErrorResponse) => {
  if (graphQLErrors) {
    graphQLErrors.map(({ message, path }) => {
      alert(`GraphQL Error ${message} on path ${path}`)
    });
  }
})
//set up where to go/what to do if there are errors and, otherwise, where to find the graphql server
const link = from([
  errorLink,
  new HttpLink({ uri: "http://localhost:5000/graphql" })
])


//To make ApolloClient in react, you need to create a connection with graphql at the topmost component
const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: link
})


function App() {

  return (
    <ApolloProvider client={client}>
      <Routes>
        {/* <Layout /> */}
        <Route path="/" element={<Outlet/>}>
          {/* Home Page */}
          <Route index element={<h1>Hi</h1>} />

          {/* Login */}
          <Route path='login' element={<Login/>} />

          {/* Registration */}
          <Route path='/register' element={<h1>Hi</h1>} />

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
    </ApolloProvider>
  )
}

export default App
