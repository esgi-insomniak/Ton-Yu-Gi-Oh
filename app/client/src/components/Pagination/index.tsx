interface PaginationProps {
    page: number;
    setter: React.Dispatch<React.SetStateAction<number>>;
}

export const Pagination = ({ page, setter }: PaginationProps) => {
  return (
    <div className="w-full flex items-end justify-center h-fit">
      <div className="btn-group">
        <button
          className="btn"
          onClick={() => setter((prev: number) => prev - 1)}
          disabled={page - 1 < 0}
        >
          «
        </button>
        <button className="btn">{page + 1}</button>
        <button className="btn" onClick={() => setter((prev: number) => prev + 1)}>
          »
        </button>
      </div>
    </div>
  );
};
