const Error = () => {
  return (
    <section>
      <div className="flex items-center justify-center w-screen h-screen bg-blue-600 flex-col">
        <p className="text-5xl text-white md:text-7xl lg:text-9xl">404</p>
        <a
          href="/app"
          className="bg-white text-blue-600 px-4 py-2 rounded-md hover:bg-blue-100 mt-4"
        >
          Go Home
        </a>
      </div>
    </section>
  );
};

export default Error;
