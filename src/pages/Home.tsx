import {useShallow} from 'zustand/react/shallow';
import {useMemberStore} from '../zustand/MemberStore.ts';
import {useState} from 'react';
import {ContentType, HttpMethod} from '../api/FetchHelper.ts';

const Home = () => {
  const {isSignedIn, memberAction} = useMemberStore(
    useShallow(state => ({
      isSignedIn: state.isSignedIn,
      memberAction: state.action,
    }))
  );

  const [testObj, setTestObj] = useState<Record<string, string> | null>(null);

  const handleOnClick = async (method: HttpMethod, contentType?: ContentType) => {
    const testRes = await memberAction.testFetch(method, contentType);
    if (testRes && testRes?.ok) {
      setTestObj(await testRes.json());
    }
  };

  return (
    <>
      <div>로그인 : {isSignedIn ? 'ㅇ' : 'ㄴ'}</div>
      <div>fetch 내용 : {testObj ? JSON.stringify(testObj) : '없음'}</div>
      <button type="button" onClick={() => handleOnClick(HttpMethod.GET)}>
        Fetch GET Test
      </button>
      <button type="button" onClick={() => handleOnClick(HttpMethod.POST, ContentType.FORM)}>
        Fetch POST FORM Test
      </button>
      <button type="button" onClick={() => handleOnClick(HttpMethod.POST, ContentType.JSON)}>
        Fetch POST JSON Test
      </button>
    </>
  );
};

export default Home;
