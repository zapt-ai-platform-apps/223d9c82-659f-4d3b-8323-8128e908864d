import { createSignal } from 'solid-js';

function App() {

  const [count, setCount] = createSignal(0);

  return (
    <div class="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 class="text-4xl font-bold mb-4">SolidJS + Vite + Tailwind</h1>
      <p class="mb-4">Count: {count()}</p>
      <button
        class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        onClick={() => setCount(count() + 1)}
      >
        Increment
      </button>
    </div>
  );
}

export default App;
