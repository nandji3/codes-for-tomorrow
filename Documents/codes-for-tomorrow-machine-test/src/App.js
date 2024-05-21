import './App.css';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getAllPostsDataAction } from './Redux/postsAction';
import Posts from './Components/Posts/Posts';
import Loader from './Components/Loader/Loader';

const App = () => {

  const dispatch = useDispatch()
  const { isLoading } = useSelector((state) => state.posts)

  useEffect(() => {
    dispatch(getAllPostsDataAction())
  }, [dispatch]);

  return (
    <div>
      {isLoading ? <Loader /> : <Posts />}
    </div>
  );
}
export default App;