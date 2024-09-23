import { createSignal, createResource, onMount, For } from 'solid-js';

const fetchMessage = async () => {
  const response = await fetch('/api/hello');
  return response.json();
};

function App() {
  const [count, setCount] = createSignal(0);
  const [serverData, { refetch }] = createResource(fetchMessage);
  const [jokes, setJokes] = createSignal([]);
  const [newJoke, setNewJoke] = createSignal({ setup: '', punchline: '' });

  const fetchJokes = async () => {
    try {
      const response = await fetch('/api/getJokes');
      const data = await response.json();
      setJokes(data);
    } catch (error) {
      console.error('Error fetching jokes:', error);
    }
  };

  const saveJoke = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/saveJoke', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newJoke()),
      });
      if (response.ok) {
        setNewJoke({ setup: '', punchline: '' });
        fetchJokes();
      } else {
        console.error('Error saving joke');
      }
    } catch (error) {
      console.error('Error saving joke:', error);
    }
  };

  onMount(() => {
    fetchJokes();
  });

  return (
    <div class="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
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
      <div class="mt-4 mb-8">
        {serverData.loading && <p>Loading...</p>}
        {serverData.error && <p>Error: {serverData.error.message}</p>}
        {serverData() && (
          <div>
            <p>Server says: {serverData().message}</p>
            <p>Current time: {serverData().currentTime}</p>
          </div>
        )}
      </div>

      <h2 class="text-2xl font-bold mb-4">Jokes</h2>
      <For each={jokes()}>
        {(joke) => (
          <div class="bg-white p-4 rounded shadow mb-4 w-full max-w-md">
            <p class="font-semibold">{joke.setup}</p>
            <p class="mt-2">{joke.punchline}</p>
          </div>
        )}
      </For>

      <h2 class="text-2xl font-bold mt-8 mb-4">Add New Joke</h2>
      <form onSubmit={saveJoke} class="w-full max-w-md">
        <input
          type="text"
          placeholder="Setup"
          value={newJoke().setup}
          onInput={(e) => setNewJoke({ ...newJoke(), setup: e.target.value })}
          class="w-full p-2 mb-2 border rounded"
          required
        />
        <input
          type="text"
          placeholder="Punchline"
          value={newJoke().punchline}
          onInput={(e) => setNewJoke({ ...newJoke(), punchline: e.target.value })}
          class="w-full p-2 mb-2 border rounded"
          required
        />
        <button
          type="submit"
          class="w-full px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-600"
        >
          Save Joke
        </button>
      </form>
    </div>
  );
}

export default App;