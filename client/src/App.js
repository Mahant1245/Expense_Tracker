import './App.css';
import Graph from './components/Graph';
import Form from "./components/Form"
import BudgetInput from "./components/BudgetInput";
import ThemeManager from "./components/ThemeManager";
import WeatherPopup from "./components/WeatherPopup";



function App() {
  return (
    <div className="App">
      <ThemeManager />
      <WeatherPopup />
      <div className="container mx-auto max-w-6xl text-center drop-shadow-lg text-grey-800">
        <h1 className='text-4xl py-8 mb-10 bg-slate-800 text-white rounded'>Expense Tracker</h1>

        {/* grid column */}
        <div className='grid md:grid-cols-2 gap-4'>
          <BudgetInput onBudgetChange={(val)=> localStorage.setItem("budget",val)} />

          {/* chart */}
          <Graph>

          </Graph>
          {/* Form */}
          <Form></Form>
        </div>

      </div>
    </div>
  );

}

export default App;
