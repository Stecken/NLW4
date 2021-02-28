import React from "react";
import { AuthProvider } from "../contexts/AuthContext";
import '../styles/global.css'

function App({ Component, pageProps }) {

  return (
    <AuthProvider>
      <Component {...pageProps}/>
    </AuthProvider>
  )
}

export default App