import NextLink from 'next/link';

const NotFoundPage = () => {
  return (
    <div className="mt-52 flex flex-col items-center font-semibold">
      <h1>404 - Not Found</h1>
      <p>Sorry, the page you are looking for does not exist.</p>
      <NextLink href="/" className="mt-4 inline-block text-blue-500 underline">
        Go to Home
      </NextLink>
    </div>
  );
};

export default NotFoundPage;
