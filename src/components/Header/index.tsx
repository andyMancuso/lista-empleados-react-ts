import { SortBy } from '../../types.d'

interface Props {
  changeColors: () => void
  isSortingByCountry: () => void
  resetUsers: () => void
  setCountryFilterValue: (value: string) => void
  isDefaultColor: boolean
  sortingValue: SortBy
}

const Header = (props: Props) => {
  const {
    changeColors,
    isSortingByCountry,
    resetUsers,
    setCountryFilterValue,
    isDefaultColor,
    sortingValue,
  } = props

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
    </>
  )
}

export default Header
