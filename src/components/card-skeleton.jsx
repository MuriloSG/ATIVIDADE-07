const CardSkeleton = () => {
  return (
    <div className="max-w-lg bg-white rounded-lg shadow-lg overflow-hidden animate-pulse">
      <div className="w-90 h-50 bg-gray-200 rounded-t-lg"></div>

      <div className="p-6">
        <div className="h-6 bg-gray-200 rounded w-3/4 mb-4"></div>

        <div className="mt-4">
          <div className="h-10 bg-gray-200 rounded w-24"></div>
        </div>
      </div>
    </div>
  );
};

export default CardSkeleton;
