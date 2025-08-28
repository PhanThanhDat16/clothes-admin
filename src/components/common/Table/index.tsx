import { JSX } from 'react/jsx-runtime'
import { v4 } from 'uuid'
interface IColumns {
  title: string
  dataKey: string
  render?: (data: any) => JSX.Element
}

interface ITableProps {
  columns: IColumns[]
  data: any[]
}

const Table = ({ columns, data }: ITableProps) => {
  return (
    <>
      <table className="w-full">
        <thead className="bg-[var(--Athens-Gray)] w-full ">
          <tr>
            {columns.map((column) => (
              <td key={column.dataKey} className="text-[var(--Pale-Sky)] py-2 px-4 text-xs font-medium">
                {column.title}
              </td>
            ))}
          </tr>
        </thead>
        <tbody className="bg-white">
          {data.length > 0 ? (
            data.map((item) => (
              <tr key={v4()}>
                {columns.map((column) => {
                  const cellValue = item[column.dataKey]
                  return (
                    <td
                      key={column.dataKey}
                      className="p-4 border-b border-blue-gray-50 max-w-[200px]"
                      title={column.dataKey === 'id' || column.dataKey === 'description' ? cellValue : undefined}
                    >
                      {column.dataKey === 'id' ? (
                        <span>{String(cellValue).slice(0, 8)}...</span>
                      ) : column.dataKey === 'description' ? (
                        <span className="truncate block">{cellValue}</span>
                      ) : column.render ? (
                        column.render(cellValue)
                      ) : (
                        cellValue
                      )}
                    </td>
                  )
                })}
              </tr>
            ))
          ) : (
            <td className="flex items-center gap-2 px-4 py-2 text-sm font-normal">No data</td>
          )}
        </tbody>
      </table>
    </>
  )
}

export default Table
