import { createSignal, createEffect, onMount, Show, For } from 'solid-js';
import { supabase, createEvent } from './supabaseClient';
import { Auth } from '@supabase/auth-ui-solid';
import { ThemeSupa } from '@supabase/auth-ui-shared';
import { SolidMarkdown } from 'solid-markdown';

function App() {
  const [count, setCount] = createSignal(0);
  const [user, setUser] = createSignal(null);
  const [currentPage, setCurrentPage] = createSignal('login');
  const [loading, setLoading] = createSignal(false);
  const [textResponse, setTextResponse] = createSignal('');
  const [jsonResponse, setJsonResponse] = createSignal(null);
  const [apiResponse, setApiResponse] = createSignal(null);
  const [jokes, setJokes] = createSignal([]);
  const [newJoke, setNewJoke] = createSignal({ setup: '', punchline: '' });
 
  const checkUserSignedIn = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (user) {
      setUser(user);
      setCurrentPage('homePage');
    }
  };

  onMount(() => {
    checkUserSignedIn();
    fetchJokes();
  });

  createEffect(() => {
    const authListener = supabase.auth.onAuthStateChange((_, session) => {
      if (session?.user) {
        setUser(session.user);
        setCurrentPage('homePage');
      } else {
        setUser(null);
        setCurrentPage('login');
      }
    });

    return () => {
      authListener.data.unsubscribe();
    };
  });

  const handleCreateTextEvent = async () => {
    setLoading(true);
    try {
      const result = await createEvent('chatgpt_request', {
        prompt: 'Tell me a joke',
        response_type: 'text'
      });
      setTextResponse(result);
    } catch (error) {
      console.error('Error creating event:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateJsonEvent = async () => {
    setLoading(true);
    try {
      const result = await createEvent('chatgpt_request', {
        prompt: 'Give me a joke in JSON format with the following structure: { "setup": "joke setup", "punchline": "joke punchline", "category": "joke category" }',
        response_type: 'json'
      });
      setJsonResponse(result);
    } catch (error) {
      console.error('Error creating event:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateApiEvent = async () => {
    setLoading(true);
    try {
      const result = await createEvent('call_api', {
        api_id: "bf138f8c-5337-41b2-8304-bffb3f2991aa",
        instructions: 'Get me a random animal fact'
      });
      setApiResponse(result[0]);
    } catch (error) {
      console.error('Error creating event:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
  };

  const fetchJokes = async () => {
    try {
      const response = await fetch('/api/getJokes');
      const data = await response.json();
      setJokes(data);
    } catch (error) {
      console.error('Error fetching jokes:', error);
    }
  };

  const handleCreateJoke = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch('/api/createJoke', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newJoke()),
      });
      const data = await response.json();
      setJokes([data, ...jokes()]);
      setNewJoke({ setup: '', punchline: '' });
    } catch (error) {
      console.error('Error creating joke:', error);
    }
  };

  return (
    <div class="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-gray-800">
      <Show
        when={currentPage() === 'homePage'}
        fallback={
          <div class="w-full max-w-md p-6 bg-white rounded-lg shadow-md">
            <h2 class="text-2xl font-bold mb-4 text-center">Sign in with ZAPT</h2>
            <a href="https://www.zapt.ai" target="_blank" rel="noopener noreferrer" class="text-blue-500 hover:underline mb-4 block text-center">
              Learn more about ZAPT
            </a>
            <Auth 
              supabaseClient={supabase}
              appearance={{ theme: ThemeSupa }}
              providers={['google', 'facebook', 'apple']}
            />
          </div>
        }
      >
        <div class="w-full max-w-4xl p-6 bg-white rounded-lg shadow-md">
          <h1 class="text-4xl font-bold mb-6 text-center">Welcome to the Joke App</h1>
          <div class="flex justify-between items-center mb-6">
            <p class="text-lg">Count: {count()}</p>
            <button
              class="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 cursor-pointer"
              onClick={handleSignOut}
            >
              Sign Out
            </button>
          </div>
          <div class="flex flex-wrap space-x-4 mb-6">
            <button
              class="flex-1 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 cursor-pointer mb-2"
              onClick={() => setCount(count() + 1)}
              disabled={loading()}
            >
              Increment
            </button>
            <button
              class="flex-1 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 cursor-pointer mb-2"
              onClick={handleCreateTextEvent}
              disabled={loading()}
            >
              <Show when={loading()}>Loading...</Show>
              <Show when={!loading()}>Get a Joke (Text)</Show>
            </button>
            <button
              class="flex-1 px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-600 cursor-pointer mb-2"
              onClick={handleCreateJsonEvent}
              disabled={loading()}
            >
              <Show when={loading()}>Loading...</Show>
              <Show when={!loading()}>Get a Joke (JSON)</Show>
            </button>
            <button
              class="flex-1 px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600 cursor-pointer mb-2"
              onClick={handleCreateApiEvent}
              disabled={loading()}
            >
              <Show when={loading()}>Loading...</Show>
              <Show when={!loading()}>Get Animal Fact</Show>
            </button>
          </div>
          <Show when={textResponse()}>
            <div class="mt-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
              <h3 class="text-xl font-semibold mb-2">Text Joke:</h3>
              <div class="text-gray-700 prose">
                <SolidMarkdown children={textResponse()} />
              </div>
            </div>
          </Show>
          <Show when={jsonResponse()}>
            <div class="mt-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
              <h3 class="text-xl font-semibold mb-2">JSON Joke:</h3>
              <p class="text-gray-700"><strong>Setup:</strong> {jsonResponse().setup}</p>
              <p class="text-gray-700"><strong>Punchline:</strong> {jsonResponse().punchline}</p>
              <p class="text-gray-700"><strong>Category:</strong> {jsonResponse().category}</p>
            </div>
          </Show>
          <Show when={apiResponse()}>
            <div class="mt-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
              <h3 class="text-xl font-semibold mb-2">Animal Fact:</h3>
              <div class="text-gray-700 prose">
                <SolidMarkdown children={apiResponse().characteristics.fact} />
              </div>
            </div>
          </Show>
          <div class="mt-8">
            <h2 class="text-2xl font-bold mb-4">Jokes from Database</h2>
            <form onSubmit={handleCreateJoke} class="mb-4">
              <input
                type="text"
                placeholder="Setup"
                value={newJoke().setup}
                onInput={(e) => setNewJoke({ ...newJoke(), setup: e.target.value })}
                class="w-full p-2 mb-2 border rounded box-border"
              />
              <input
                type="text"
                placeholder="Punchline"
                value={newJoke().punchline}
                onInput={(e) => setNewJoke({ ...newJoke(), punchline: e.target.value })}
                class="w-full p-2 mb-2 border rounded box-border"
              />
              <button type="submit" class="w-full p-2 bg-blue-500 text-white rounded hover:bg-blue-600 cursor-pointer">
                Add Joke
              </button>
            </form>
            <For each={jokes()}>
              {(joke) => (
                <div class="mb-4 p-4 bg-gray-50 rounded-lg border border-gray-200">
                  <p class="font-semibold">{joke.setup}</p>
                  <p class="text-gray-600">{joke.punchline}</p>
                </div>
              )}
            </For>
          </div>
        </div>
      </Show>
    </div>
  );
}

export default App;