import {
  ColumnDef,
  SortingState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table';
import React from 'react';
import { classNames } from '../../../utils/Utils';
import { Avatar } from '../components/Avatar';
import { Gender } from '../components/Gender';
import { Character } from '../models/CharacterModel';
import { Filter } from './Filter';
interface ResultTableProps {
  data: Character[];
}

function ResultTable({ data }: ResultTableProps) {
  const columns = React.useMemo<ColumnDef<Character>[]>(
    () => [
      {
        header: 'CHARACTER LIST',
        footer: (props) => props.column.id,
        columns: [
          {
            accessorKey: 'id',
            cell: (info) => <Avatar id={info.getValue()} />,
            header: () => <span>Avatar</span>,
            footer: (props) => props.column.id,
            enableColumnFilter: false,
            enableSorting: false,
          },
          {
            accessorFn: (row: Character) => row.name,
            id: 'name',
            cell: (info) => info.getValue(),
            header: () => <span>Name</span>,
            footer: (props) => props.column.id,
          },
          {
            accessorKey: 'height',
            header: () => 'Height',
            footer: (props) => props.column.id,
            className: 'text-center',
            width: 100,
          },
          {
            accessorKey: 'gender',
            cell: (info) => <Gender value={info.getValue()} />,
            header: () => <span>Gender</span>,
            footer: (props) => props.column.id,
          },
          {
            accessorKey: 'skin_color',
            header: 'Skin Color',
            footer: (props) => props.column.id,
          },
          {
            accessorKey: 'eye_color',
            header: 'Eye Color',
            footer: (props) => props.column.id,
          },
          {
            accessorKey: 'hair_color',
            header: 'Hair Color',
            footer: (props) => props.column.id,
          },
        ],
      },
    ],
    []
  );
  const [sorting, setSorting] = React.useState<SortingState>([]);
  // Use the state and functions returned from useReactTable to build UI
  const table = useReactTable({
    data,
    columns,
    initialState: {
      pagination: {
        pageIndex: 0,
        pageSize: 4,
      },
    },
    state: {
      sorting,
    },
    onSortingChange: setSorting,
    // Pipeline
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  // Render the UI
  return (
    <>
      <div className="mt-4 flex flex-col">
        <div className="-my-2 overflow-x-auto -mx-4 sm:-mx-6 lg:-mx-8 h-[calc(100vh-20rem)]">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              {table.getHeaderGroups().map((headerGroup) => (
                <tr key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <th
                      key={header.id}
                      colSpan={header.colSpan}
                      scope="col"
                      className="group px-6 py-3 text-xs font-medium text-gray-900 uppercase tracking-wider text-center"
                    >
                      {header.isPlaceholder ? null : (
                        <div
                          className={header.colSpan > 1 ? `text-lg` : ``}
                          onClick={header.column.getToggleSortingHandler()}
                        >
                          {flexRender(header.column.columnDef.header, header.getContext())}
                          {{
                            asc: ' 🔼',
                            desc: ' 🔽',
                          }[header.column.getIsSorted() as string] ?? null}
                          {header.column.getCanFilter() ? (
                            <div>
                              <Filter column={header.column} table={table} />
                            </div>
                          ) : null}
                        </div>
                      )}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {table.getRowModel().rows.map((row) => {
                return (
                  <tr key={row.id}>
                    {row.getVisibleCells().map((cell) => {
                      return (
                        <td key={cell.id} className="px-6 py-4 whitespace-nowrap" role="cell">
                          {flexRender(cell.column.columnDef.cell, cell.getContext())}
                        </td>
                      );
                    })}
                  </tr>
                );
              })}
            </tbody>
          </table>
          <div className="h-2" />
          <div className="flex items-center gap-2 justify-end">
            <button
              className={classNames(
                'border rounded p-1 border-slate-300',
                table.getCanPreviousPage() ? 'bg-white' : 'bg-gray'
              )}
              onClick={() => table.setPageIndex(0)}
              disabled={!table.getCanPreviousPage()}
            >
              {'<<'}
            </button>
            <button
              className={classNames(
                'border rounded p-1 border-slate-300',
                table.getCanPreviousPage() ? 'bg-white' : 'bg-gray'
              )}
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
            >
              {'<'}
            </button>
            <button
              className={classNames(
                'border rounded p-1 border-slate-300',
                table.getCanNextPage() ? 'bg-white' : 'bg-gray'
              )}
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
            >
              {'>'}
            </button>
            <button
              className={classNames(
                'border rounded p-1 border-slate-300',
                table.getCanNextPage() ? 'bg-white' : 'bg-gray'
              )}
              onClick={() => table.setPageIndex(table.getPageCount() - 1)}
              disabled={!table.getCanNextPage()}
            >
              {'>>'}
            </button>
            <span className="flex items-center gap-1">
              <div>Page</div>
              <strong>
                {table.getState().pagination.pageIndex + 1} of {table.getPageCount()}
              </strong>
            </span>
          </div>
        </div>
      </div>
    </>
  );
}

export default ResultTable;
