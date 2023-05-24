function ErrorPg() {
  return (
    <div className="w-full h-screen flex flex-col justify-center items-center text-white ">
      <span className="block text-3xl">Oops!</span>
      <span className="block text-xl my-4">
        Sorry, an unexpected error has occurred.
      </span>
      <span className="block text-2xl">page not found</span>
    </div>
  );
}

export default ErrorPg;
