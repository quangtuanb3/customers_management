import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import CustomersIndex from './components/customers/index'
import './App.css'


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <CustomersIndex />
    </>
  )
}

export default App
