import { createSignal, onMount, createEffect, For } from 'solid-js';
import { createEvent, supabase } from './supabaseClient'
import { Auth } from '@supabase/auth-ui-solid'
import { ThemeSupa } from '@supabase/auth-ui-shared'

function App() {
  const [jokes, setJokes] = createSignal([]);
  const [newJoke, setNewJoke] = createSignal({ setup: '', punchline: '' });
  const [user, setUser] = createSignal(null)
  const [currentPage, setCurrentPage] = createSignal('login')

  const checkUserSignedIn = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser()
    if (user) {
      setUser(user)
      setCurrentPage('homePage')
    }
  }

  onMount(checkUserSignedIn)

  const handleSignOut = async () => {
    await supabase.auth.signOut()
    setUser(null)
    setCurrentPage('login')
  }

  const fetchJokes = async () => {
    const { data: { session } } = await supabase.auth.getSession()
    const response = await fetch('/api/getJokes', {
      headers: {
        'Authorization': `Bearer ${session.access_token}`
      }
    });
    if (response.ok) {
      const data = await response.json();
      setJokes(data);
    } else {
      console.error('Error fetching jokes:', error);
    }
  };

  const saveJoke = async (e) => {
    const { data: { session } } = await supabase.auth.getSession()

    e.preventDefault();
    try {
      const response = await fetch('/api/saveJoke', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${session.access_token}`,
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

  createEffect(() => {
    if(!user()) return;
    fetchJokes();
  });

  const [loading, setLoading] = createSignal(false);

  const handleGenerateJoke = async () => {
    setLoading(true)
    try {
      const result = await createEvent('chatgpt_request', {
        prompt: 'Give me a joke in JSON format with the following structure: { "setup": "joke setup", "punchline": "joke punchline" }',
        response_type: 'json'
      })
      console.log(result)
      setNewJoke(result)
    } catch (error) {
      console.error('Error creating event:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div class="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <Show
        when={currentPage() === 'homePage'}
        fallback={
          <div class="w-full max-w-md p-6 bg-white rounded-lg shadow-md h-full">
            <h2 class="text-2xl font-bold mb-4 text-center">Sign in with ZAPT</h2>
            <a
              href="https://www.zapt.ai"
              target="_blank"
              rel="noopener noreferrer"
              class="text-blue-500 hover:underline mb-4 block text-center"
            >
              Learn more about ZAPT
            </a>
            <Auth
              supabaseClient={supabase}
              appearance={{ theme: ThemeSupa }}
              providers={['google', 'facebook', 'apple']}
              magicLink={true}
            />
          </div>
        }
      >
        <h1 class="text-4xl font-bold mb-4">Jokes</h1>
        <button
          className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-6 rounded-full shadow-md focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-300 ease-in-out transform hover:scale-105"
          onClick={handleSignOut}
        >
          Sign Out
        </button>
        <For each={jokes()}>
          {(joke) => (
            <div class="bg-white p-4 rounded shadow mb-4 w-full max-w-md">
              <p class="font-semibold">{joke.setup}</p>
              <p class="mt-2">{joke.punchline}</p>
            </div>
          )}
        </For>

        <h2 class="text-2xl font-bold mt-8 mb-4">Add New Joke</h2>

        <button
          className={`flex items-center justify-center bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-6 rounded-full shadow-md focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-300 ease-in-out transform hover:scale-105 ${loading() ? 'opacity-50 cursor-not-allowed' : ''}`}
          onClick={handleGenerateJoke}
          disabled={loading()}
          aria-busy={loading()}
          aria-disabled={loading()}
        >
          <Show
            when={loading()}
            fallback={<span>Generate New Joke</span>}
          >
            <span>Generating...</span>
          </Show>
        </button>

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
      </Show>
    </div>
  );
}

export default App;