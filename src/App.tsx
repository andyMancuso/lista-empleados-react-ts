import { useEffect, useMemo, useRef, useState } from 'react'
import './App.css'
import Users from './components/Users'
import { SortBy, type User } from './types.d'

const App = () => {
  const [users, setUsers] = useState<User[]>([])
  const [isDefaultColor, setIsDefaultColor] = useState(false)
  const [sortingValue, setSortingValue] = useState<SortBy>(SortBy.NONE)
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

  const isSortingByCountry = () => {
    const newSortingValue = sortingValue === SortBy.NONE
      ? SortBy.COUNTRY
      : SortBy.NONE
    setSortingValue(newSortingValue)
  }

  const handleSortBy = (newSortingValue: SortBy) => {
    sortingValue === newSortingValue
      ? setSortingValue(SortBy.NONE)
      : setSortingValue(newSortingValue)
  }

  const inputFiltered = useMemo(() => {
    return countryFilterValue
      ? users.filter((user => {
        return user.location.country.toLowerCase().includes(countryFilterValue.toLowerCase())
      }))
      : users
  }, [countryFilterValue, users])


  const sortedByValue = useMemo(() => {
    if (sortingValue === SortBy.COUNTRY) {
      return inputFiltered.toSorted((a, b) => a.location.country.localeCompare(b.location.country))
    } else if (sortingValue === SortBy.NAME) {
      return inputFiltered.toSorted((a, b) => a.name.first.localeCompare(b.name.first))
    } else if (sortingValue === SortBy.LAST) {
      return inputFiltered.toSorted((a, b) => a.name.last.localeCompare(b.name.last))
    } else if (sortingValue === SortBy.NONE) {
      return inputFiltered
    }
  }, [inputFiltered, sortingValue])


  const changeColors = () => {
    setIsDefaultColor(prev => !prev)
  }

  const deleteRow = (email: string) => {
    const filteredUsers = users.filter((user) => user.email !== email)
    setUsers(filteredUsers)
  }

  const resetUsers = () => {
    setUsers(originalUsers.current)
    setSortingValue(SortBy.NONE)
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

        <button onClick={isSortingByCountry}>
          {sortingValue === SortBy.COUNTRY ? 'Unsort' : 'Sort by country'}
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
        users={sortedByValue}
        isDefaultColor={isDefaultColor}
        deleteRow={deleteRow}
        handleSortBy={handleSortBy}
      />
    </>

  )
}

export default App
