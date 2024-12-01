export type TableRow = {
    [key: string]: string;
};

export type TableColumns = {
    id: string;
    label: string;
};

export type TableData = {
    columns: TableColumns[];
    rows: TableRow[];
};
