const LoadMoreDataBtn = ({ state, fetchData,additionalParam }) => {
  if (state != null && state.totalDocs > state.result.length) {
    return (
      <button
        onClick={() => fetchData({...additionalParam,page: state.page+1})}
        className="text-dark-grey p-2 px-3 hover:bg-grey/30 rounded-md flex items-center gap-2"
      >
        Lode More
      </button>
    );
  }
};

export default LoadMoreDataBtn;
