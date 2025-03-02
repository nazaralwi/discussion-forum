interface ErrorMessageProps {
  message: string;
}

function ErrorMessage({ message }: ErrorMessageProps) {
  return (
    <>
      <main className="flex flex-1 p-4 justify-center">
        <p>{message}</p>
      </main>
    </>
  );
}

export default ErrorMessage;
