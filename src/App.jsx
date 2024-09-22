import { createSignal } from 'solid-js';

function App() {
  const [message, setMessage] = createSignal('');

  const fetchMessage = async () => {
    try {
      const response = await fetch('/api/hello');
      const data = await response.json();
      setMessage(data.message);
    } catch (error) {
      console.error('Error fetching message:', error);
    }
  };

  return (
    <div class="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 class="text-4xl font-bold mb-6">SolidJS with Tailwind CSS</h1>
      <button
        class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        onClick={fetchMessage}
      >
        Fetch Serverless Message
      </button>
      {message() && <p class="mt-4 text-xl">{message()}</p>}
    </div>
  );
}

export default App;
