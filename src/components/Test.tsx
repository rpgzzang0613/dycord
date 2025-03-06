import {useShallow} from 'zustand/react/shallow';
import {useMemberStore} from '../zustand/MemberStore.ts';
import {useState} from 'react';
import {HttpMethod} from '../api/FetchHelper.ts';

const Test = () => {
  const {isSignedIn, memberAction} = useMemberStore(
    useShallow(state => ({
      isSignedIn: state.isSignedIn,
      memberAction: state.action,
    }))
  );

  const [testObj, setTestObj] = useState<Record<string, string> | null>(null);

  const handleOnClick = async (method: HttpMethod) => {
    const testObj = (await memberAction.testFetch(method)) as Record<string, string>;
    setTestObj(testObj);
  };

  const handleKakaoLogin = async () => {
    window.Kakao.Auth.authorize({
      redirectUri: 'http://localhost:3636/kakao/callback',
    });
  };

  return (
    <>
      <div>로그인 : {isSignedIn ? 'ㅇ' : 'ㄴ'}</div>
      <div>fetch 내용 : {testObj ? JSON.stringify(testObj) : '없음'}</div>
      <button onClick={() => handleOnClick(HttpMethod.GET)}>Fetch GET Test</button>
      <button onClick={() => handleOnClick(HttpMethod.POST)}>Fetch POST Test</button>
      <button onClick={() => handleKakaoLogin()}>Kakao Login Test</button>
    </>
  );
};

export default Test;
