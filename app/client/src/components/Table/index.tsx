import React from 'react';

interface TableRowProps<T> {
    data: T;
    columns: {
        key: keyof T;
        label: string;
    }[];
    evenRow: boolean;
}

export const TableRow = <T extends object>({ data, columns, evenRow }: TableRowProps<T>) => {
    return (
        <tr className={evenRow ? 'bg-gray-50' : 'bg-white'}>
            {columns.map((column) => (
                <td
                    key={column.key as string}
                    className="px-4 py-2 border-b border-gray-200"
                >
                    {data[column.key] as React.ReactNode}
                </td>
            ))}
        </tr>
    );
};

export interface TableColumn<T> {
    key: keyof T;
    label: string;
}

interface TableProps<T> {
    data: T[];
    columns: TableColumn<T>[];
}

export const Table = <T extends object>({ data, columns }: TableProps<T>) => {
    return (
        <div className='p-5 bg-white rounded-md'>
            <table className="min-w-full bg-white">
                <thead className=''>
                    <tr>
                        {columns.map((column) => (
                            <th
                                key={column.key as string}
                                className="px-4 py-2 text-left border-b-2 border-gray-200"
                            >
                                {column.label}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody className='bg-red-500'>
                    {data.map((item, index) => (
                        <TableRow
                            key={index}
                            data={item}
                            columns={columns}
                            evenRow={index % 2 === 0}
                        />
                    ))}
                </tbody>
            </table>
        </div>
    );
};


