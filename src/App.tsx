import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { store } from './redux/store';
import { Provider } from 'react-redux';
import FormCreatePage from './components/FormCreatePage/FormCreatePage';
import Home from './components/Home/Home';

const App = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <div className='main'>
          <Routes>
            <Route path='/' element={ <Home />} />
            <Route path='/create' element={ <FormCreatePage />} />
          </Routes>
        </div>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
