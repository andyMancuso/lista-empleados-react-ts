import { useEffect, useMemo, useRef, useState } from 'react'
import './App.css'
import Users from './components/Users'
import { type User } from './types'

const App = () => {
  const [users, setUsers] = useState<User[]>([])
  const [isDefaultColor, setIsDefaultColor] = useState(false)
  const [isSorting, setIsSorting] = useState(false)
  const [countryFilterValue, setCountryFilterValue] = useState('')
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


  const filteredByCountry = useMemo(() => {
    return countryFilterValue
      ? users.filter((user => {
        return user.location.country.toLowerCase().includes(countryFilterValue.toLowerCase())
      }))
      : users
  }, [countryFilterValue, users])

  const sortedUsers = useMemo(() => {
    return isSorting
      ? filteredByCountry.toSorted((a, b) => a.location.country.localeCompare(b.location.country))
      : filteredByCountry
  }, [filteredByCountry, isSorting])


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
          onChange={e => { setCountryFilterValue(e.target.value) }}
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
