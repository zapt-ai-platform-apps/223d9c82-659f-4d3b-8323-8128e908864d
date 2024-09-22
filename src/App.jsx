import { createSignal, createResource, onMount } from 'solid-js';

const fetchMessage = async () => {
  const response = await fetch('/api/hello');
  return response.json();
};

function App() {
  const [count, setCount] = createSignal(0);
  const [serverData, { refetch }] = createResource(fetchMessage);

  const fetchJokes = async () => {
    try {
      const response = await fetch('/api/getJokes');
      const data = await response.json();
      console.log(data)
      setJokes(data);
    } catch (error) {
      console.error('Error fetching jokes:', error);
    }
  };

  onMount(() => {
    fetchJokes();
  });

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
        Fetch Server Data
      </button>
      <div class="mt-4">
        {serverData.loading && <p>Loading...</p>}
        {serverData.error && <p>Error: {serverData.error.message}</p>}
        {serverData() && (
          <div>
            <p>Server says: {serverData().message}</p>
            <p>Current time: {serverData().currentTime}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;