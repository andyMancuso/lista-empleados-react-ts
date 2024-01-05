import { SortBy } from '../../types.d'

interface Props {
  title: string
  value?: string
  handleSortBy: (newSortingValue: SortBy) => void
}
const TableHeader = (props: Props) => {
  const {
    title,
    value,
    handleSortBy,
  } = props

  return (
    <th
      style={{ cursor: 'pointer' }}
      onClick={() => {
        handleSortBy(
          value === 'country' ? SortBy.COUNTRY
            : value === 'name' ? SortBy.NAME
              : value === 'last' ? SortBy.LAST
                : SortBy.NONE,
        )
      }}
    >
      {title}
    </th>
  )
}

export default TableHeader
