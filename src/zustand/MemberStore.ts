import {create} from 'zustand/react';
import {testFetch} from '../api/internal/MemberFetch.ts';
import {ContentType, HttpMethod} from '../api/FetchHelper.ts';

type member = {
  id: number;
  email: string;
  name: string;
  is_empty_pwd: boolean;
};

type emailSignIn = {
  email: string;
  pwd: string;
};

type emailSignUp = emailSignIn & {
  name: string;
};

// 이 Zustand Store가 가지고 있는 상태 정의
interface State {
  isSignedIn: boolean;
  memberDetail: member;
}

// 이 Zustand Store가 가지고 있는 액션 정의
interface Action {
  action: {
    testFetch: (method: HttpMethod, contentType?: ContentType) => Promise<Response | undefined>; // TODO 차후 제거
    setIsSignedIn: (isSignedIn: boolean) => void;
    setMemberDetail: (memberDetail: member) => void;
    getMemberDetail: () => member;
    signUpMemberByEmail: (params: emailSignUp) => unknown; // TODO 차후 리턴타입 변경
    signInMemberByEmail: (params: emailSignIn) => unknown; // TODO 차후 리턴타입 변경
  };
}

// 상태 초기값 정의
const initialState = {
  isSignedIn: false,
  memberDetail: {
    id: 0,
    email: '',
    name: '',
    is_empty_pwd: false,
  },
};

export const useMemberStore = create<State & Action>((set, get) => ({
  ...initialState,
  action: {
    testFetch: async (method, contentType) => {
      return await testFetch(method, contentType);
    },
    setIsSignedIn: isSignedIn => set({isSignedIn}),
    setMemberDetail: memberDetail => set({memberDetail: {...memberDetail}}),
    getMemberDetail: () => {
      return get().memberDetail;
    },
    signUpMemberByEmail: params => {
      console.log(params);
      return null;
    },
    signInMemberByEmail: params => {
      console.log(params);
      return null;
    },
  },
}));
