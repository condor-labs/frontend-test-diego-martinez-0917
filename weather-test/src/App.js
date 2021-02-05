import './App.scss';
import FavoritePlaces from './pages/favoritePlaces';
import Header from './pages/header'
import Slider from './pages/slide';
import Suggets from './pages/sugget';
import Visit from './pages/visit';

export default function App() {
  return (
    <div className='App'>
      <Header/>
      <Slider/>
      <FavoritePlaces/>
      <Suggets/>
      <Visit/>
    </div>
  );
}