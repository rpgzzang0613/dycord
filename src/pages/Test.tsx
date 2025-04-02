import DefaultLayout from './layout/DefaultLayout.tsx';
import {Link} from 'react-router-dom';
import {toast} from 'react-toastify';

const Test = () => {
  return (
    <DefaultLayout>
      <button type="button" onClick={() => toast('까꿍')}>
        전역설정 그대로
      </button>
      <button
        type="button"
        onClick={() =>
          toast('까꿍', {
            position: 'bottom-center',
            autoClose: 500,
            type: 'error',
            hideProgressBar: true,
          })
        }
      >
        옵션 개별지정
      </button>
      <Link to="/test2">테스트2로</Link>
    </DefaultLayout>
  );
};

export default Test;
