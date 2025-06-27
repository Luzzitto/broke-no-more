import React from "react";

const App = () => {
  return (
    <div className="min-h-screen bg-gray-100 p-8 text-gray-900">
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg p-8">
        <h1 className="text-4xl font-extrabold text-center mb-10 text-blue-700">
          Broke No More
        </h1>
        <div className="flex flex-row gap-4">
          <section className="basis-1/3 bg-blue-50">
            <div className="p-4">
              <h2 className="text-2xl font-bold text-blue-600 mb-4">
                Configuration
              </h2>

              {/* Current Balance & Income Setup */}
              <div className="grid grid-cols-1 gap-6">
                <div>
                  <label
                    htmlFor="initialBalance"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Initial Bank Balance
                  </label>
                  <input
                    type="number"
                    name="initialBalance"
                    id="initialBalance"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-2"
                  />
                </div>
                <div>
                  <label
                    htmlFor="incomeType"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Income Type
                  </label>
                  <select
                    name="incomeType"
                    id="incomeType"
                    className="form-select mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2"
                  >
                    <option disabled selected className="hidden">
                      Select an option
                    </option>
                    <option value="monthly">Monthly</option>
                    <option value="bi-weekly">Bi-Weekly</option>
                    <option value="Weekly">Weekly</option>
                  </select>
                </div>
                button.f
              </div>
            </div>
          </section>
          <section className="basis-2/3 bg-blue-100">
            <div className="p-4">
              <h2 className="text-2xl font-bold text-blue-600">Overview</h2>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default App;
