const Loader = () => {
  return (
    <div className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-white">
      <img
        src="/loaderlogo.png"
        alt="Loading..."
        className="h-24 w-auto animate-pulse object-contain"
      />
      <p className="mt-4 text-lg font-medium text-gray-600 animate-pulse">
        Loading...
      </p>
    </div>
  );
};

export default Loader;
