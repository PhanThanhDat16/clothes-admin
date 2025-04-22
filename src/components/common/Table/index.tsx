import { JSX } from 'react/jsx-runtime'

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
  console.log(data)
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
            data.map((item, index) => (
              // THÊM V4
              <tr key={index}>
                {columns.map((column) => (
                  <td key={column.dataKey} className="p-4 border-b border-blue-gray-50">
                    {column.render ? column.render(item[column.dataKey]) : item[column.dataKey]}
                  </td>
                ))}
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
