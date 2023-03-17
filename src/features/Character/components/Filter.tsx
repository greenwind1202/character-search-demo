import { Column, Table as ReactTable } from '@tanstack/react-table';
interface FilterProps {
  column: Column<any, any>;
  table: ReactTable<any>;
}
export function Filter({ column, table }: FilterProps) {
  const firstValue = table.getPreFilteredRowModel().flatRows[0]?.getValue(column.id);

  const columnFilterValue = column.getFilterValue();

  return typeof firstValue === 'number' ? (
    <div className="flex space-x-2">
      <input
        type="number"
        value={(columnFilterValue as [number, number])?.[0] ?? ''}
        onChange={(e) => column.setFilterValue((old: [number, number]) => [e.target.value, old?.[1]])}
        placeholder={`Min`}
        className="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-xs focus:border-gray-500 focus:outline-none"
      />
      <input
        type="number"
        value={(columnFilterValue as [number, number])?.[1] ?? ''}
        onChange={(e) => column.setFilterValue((old: [number, number]) => [old?.[0], e.target.value])}
        placeholder={`Max`}
        className="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-xs focus:border-gray-500 focus:outline-none"
      />
    </div>
  ) : (
    <input
      type="text"
      value={(columnFilterValue ?? '') as string}
      onChange={(e) => column.setFilterValue(e.target.value)}
      placeholder={`Search...`}
      className="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-xs focus:border-gray-500 focus:outline-none"
    />
  );
}
