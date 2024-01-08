
interface Props {
  currentPage: number
  handlePageChange: (newPage: number) => void
}

const Pagination = (props: Props) => {
  const {
    currentPage,
    handlePageChange,
  } = props

  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      margin: '30px 0 30px 0',
    }}>
      <button
        onClick={() => { handlePageChange(currentPage + 1) }}
      >
        Load more users
      </button>
    </div>
  )
}

export default Pagination
