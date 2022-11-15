import Head from 'next/head'

import { useState } from 'react'

export default function Home() {
  const [state, setState] = useState({})
  const [excuse, setExcuse] = useState([])
  const [loading, setLoading] = useState(false)

  const generateExcuse = async (event) => {
    event.preventDefault()
    setLoading(true)
    const res = await fetch(`/api/hello?excuse=${state.excuse}&target=${state.target}`)
    const [result] = await res.json()
    setExcuse(result.result.data.json.generation)
    setLoading(false)
  }

  const handleChange = (event) => {
    const value = event.target.value
    setState({
      ...state,
      [event.target.name]: value
    })

    console.log(state)
  }

  return (
    <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
      <Head>
        <title>AI Excuses Generator</title>
        <meta name="description" content="AI Excuses Generator" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="my-4 bg-white overflow-hidden shadow rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <h1 className="text-lg leading-6 font-medium text-gray-900">AI Excuse Generator</h1>

          <form onSubmit={generateExcuse} className="space-y-8 divide-y divide-gray-200">
            <div className="space-y-8 divide-y divide-gray-200">
              <div>
                <div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                  <div className="sm:col-span-4">
                    <label htmlFor="target" className="block text-sm font-medium text-gray-700">
                      Who is this message for?
                    </label>
                    <div className="mt-1 flex rounded-md shadow-sm">
                      <input
                        onChange={handleChange}
                        type="text"
                        name="target"
                        id="target"
                        autoComplete="target"
                        className="flex-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full min-w-0 rounded-none rounded-r-md sm:text-sm border-gray-300"
                      />
                    </div>
                  </div>

                  <div className="sm:col-span-6">
                    <label htmlFor="about" className="block text-sm font-medium text-gray-700">
                      What did you mess up?
                    </label>
                    <div className="mt-1">
                      <textarea
                        onChange={handleChange}
                        id="excuse"
                        name="excuse"
                        rows={3}
                        className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border border-gray-300 rounded-md"
                        defaultValue={''}
                      />
                    </div>
                    <p className="mt-2 text-sm text-gray-500">Write your excuse</p>
                  </div>

                  <div className="sm:col-span-6">
                    <label htmlFor="about" className="block text-sm font-medium text-gray-700">
                      Generated
                    </label>
                    <div className="mt-1">
                      <textarea
                        id="generated"
                        name="generated"
                        rows={10}
                        className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border border-gray-300 rounded-md"
                        defaultValue={excuse}
                      />
                    </div>
                  </div>
                </div>
              </div>

            </div>

            <div className="pt-5">

              <div className="flex justify-end">


                {loading ?

                  <div role="status">
                    <svg aria-hidden="true" class="mr-2 w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                      <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                    </svg>
                    <span class="sr-only">Loading...</span>
                  </div>

                  :

                  <button
                    type="submit"
                    className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    Generate
                  </button>
                }
              </div>
            </div>
          </form>
        </div>
      </main>
    </div>
  )
}
