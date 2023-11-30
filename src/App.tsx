import { useEffect, useState } from 'react'
import { type User } from './types'

import './App.css'

function App () {
  const [users, setUsers] = useState<User[]>([])

  useEffect(() => {
    fetch('https://randomuser.me/api?results=100')
      .then(async res => await res.json())
      .then(res => {
        setUsers(res.results)
      })
      .catch(err => {
        console.log(err)
      })
  }, [])

  return (
    <>
      <h1 style={{ fontSize: '4rem' }}>Prueba técnica</h1>
      {
      }
    </>
  )
}

export default App
