import { useEffect, useRef, useState } from 'react'
import './App.css'
import Users from './components/Users'
import { type User } from './types'

const App = () => {
  const [users, setUsers] = useState<User[]>([])
  const [isDefaultColor, setIsDefaultColor] = useState(false)
  const [isSorting, setIsSorting] = useState(false)
  const [countryFilter, setCountryFilter] = useState('')
  const originalUsers = useRef<User[]>([])


  useEffect(() => {
    fetch('https://randomuser.me/api?results=100')
      .then(async res => await res.json())
      .then(res => {
        setUsers(res.results)
        originalUsers.current = res.results
      })
      .catch(err => {
        console.log(err)
      })
  }, [])


  const filteredByCountry = countryFilter
    ? users.filter((user => {
      return user.location.country.toLowerCase().includes(countryFilter.toLowerCase())
    }))
    : users


  const sortedUsers = isSorting
    ? filteredByCountry.toSorted((a, b) => {
      return a.location.country.localeCompare(b.location.country)
    })
    : filteredByCountry


  const changeColors = () => {
    setIsDefaultColor(prev => !prev)
  }

  const sortByCountry = () => {
    setIsSorting(prev => !prev)
  }

  const deleteRow = (email: string) => {
    const filteredUsers = users.filter((user) => user.email !== email)
    setUsers(filteredUsers)
  }

  const resetUsers = () => {
    setUsers(originalUsers.current)
  }


  return (
    <>
      <h1 style={{ fontSize: '4rem' }}>Users List</h1>

      <header style={{
        display: 'flex',
        margin: '0 auto',
        justifyContent: 'space-evenly',
        width: '100%',
        maxWidth: 800,
      }}>
        <button onClick={changeColors}>
          {isDefaultColor ? 'Default colors' : 'Change colors'}
        </button>

        <button onClick={sortByCountry}>
          {isSorting ? 'Unsort' : 'Sort by country'}
        </button>

        <button onClick={resetUsers}>
          Reset
        </button>

        <input
          type='text'
          placeholder='Filter by country'
          onChange={e => { setCountryFilter(e.target.value) }}
        />

      </header>

      <Users
        users={sortedUsers}
        isDefaultColor={isDefaultColor}
        deleteRow={deleteRow}
      />
    </>

  )
}

export default App
