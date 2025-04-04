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
            position: 'bottom-center', // 토스트 뜰 위치
            autoClose: 500, // 토스트 유지되는 시간
            type: 'warning', // info, success, warning, error
            hideProgressBar: true,
            toastId: 'specific_toast', // id가 겹치면 2개이상 뜨지 않음
            delay: 400, // 토스트 뜨기 전 대기시간
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
