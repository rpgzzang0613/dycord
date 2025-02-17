import {create} from 'zustand/react';

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
    setIsSignedIn: (isSignedIn: boolean) => void;
    setMemberDetail: (memberDetail: member) => void;
    getMemberDetail: () => member;
    signUpMemberByEmail: (params: emailSignUp) => null; // TODO 차후 리턴타입 변경
    signInMemberByEmail: (params: emailSignIn) => null; // TODO 차후 리턴타입 변경
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
    setIsSignedIn: (isSignedIn: boolean) => set({isSignedIn}),
    setMemberDetail: (memberDetail: member) => set({memberDetail: {...memberDetail}}),
    getMemberDetail: () => {
      return get().memberDetail;
    },
    signUpMemberByEmail: (params: {email: string; pwd: string; name: string}) => {
      console.log(params);
      return null;
    },
    signInMemberByEmail: (params: {email: string; pwd: string}) => {
      console.log(params);
      return null;
    },
  },
}));
