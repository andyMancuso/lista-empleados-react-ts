import { useEffect, useState } from 'react'
import './App.css'
import Users from './components/Users'

const App = () => {
  const [users, setUsers] = useState([])
  const [isDefaultColor, setIsDefaultColor] = useState(false)

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

  const changeColors = () => {
    setIsDefaultColor(prev => !prev)
  }

  return (
    <>
      <h1 style={{ fontSize: '4rem' }}>Users List</h1>

      <header onClick={changeColors}>
        <button>Colorear Filas</button>
      </header>

      <Users
        users={users}
        isDefaultColor={isDefaultColor}
      />
    </>

  )
}

export default App
