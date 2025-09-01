import ContentLoader from "react-content-loader";

const TableSkeleton = ({ rows = 5, columns = 4 }) => {
  return (
    <div className="w-full overflow-hidden rounded-lg border border-gray-200 dark:border-gray-700">
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-gray-100 dark:bg-gray-800">
            {Array(columns)
              .fill("")
              .map((_, index) => (
                <th key={index} className="px-4 py-3">
                  <ContentLoader
                    speed={2}
                    width={100}
                    height={20}
                    viewBox="0 0 100 20"
                    backgroundColor="#f3f3f3"
                    foregroundColor="#ecebeb"
                  >
                    <rect x="0" y="0" rx="4" ry="4" width="100" height="20" />
                  </ContentLoader>
                </th>
              ))}
          </tr>
        </thead>
        <tbody>
          {Array(rows)
            .fill("")
            .map((_, rowIndex) => (
              <tr key={rowIndex} className="border-b border-gray-200 dark:border-gray-700">
                {Array(columns)
                  .fill("")
                  .map((_, colIndex) => (
                    <td key={colIndex} className="px-4 py-3">
                      <ContentLoader
                        speed={2}
                        width={100}
                        height={20}
                        viewBox="0 0 100 20"
                        backgroundColor="#f3f3f3"
                        foregroundColor="#ecebeb"
                      >
                        <rect x="0" y="0" rx="4" ry="4" width="100" height="20" />
                      </ContentLoader>
                    </td>
                  ))}
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default TableSkeleton;