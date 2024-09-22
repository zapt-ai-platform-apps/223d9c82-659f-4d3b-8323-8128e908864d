import { createSignal, createResource } from 'solid-js';

const fetchMessage = async () => {
  const response = await fetch('/api/hello');
  return response.json();
};

function App() {
  const [count, setCount] = createSignal(0);
  const [message, { refetch }] = createResource(fetchMessage);

  return (
    <div class="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 class="text-4xl font-bold mb-4">SolidJS + Vite + Tailwind</h1>
      <p class="mb-4">Count: {count()}</p>
      <button
        class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 mb-4"
        onClick={() => setCount(count() + 1)}
      >
        Increment
      </button>
      <button
        class="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 mb-4"
        onClick={() => refetch()}
      >
        Fetch Server Message
      </button>
      <div class="mt-4">
        {message.loading && <p>Loading...</p>}
        {message.error && <p>Error: {message.error.message}</p>}
        {message() && <p>Server says: {message().message}</p>}
      </div>
    </div>
  );
}

export default App;