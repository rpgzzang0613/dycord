import DefaultLayout from '../layout/DefaultLayout.tsx';
import {Link} from 'react-router-dom';

const Test = () => {
  return (
    <DefaultLayout>
      <Link to="/test2">테스트2로</Link>
    </DefaultLayout>
  );
};

export default Test;
