
interface Props {
  handlePageChange: () => void
}

const Pagination = (props: Props) => {
  const {
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
        onClick={() => handlePageChange}
      >
        Load more users
      </button>
    </div>
  )
}

export default Pagination
