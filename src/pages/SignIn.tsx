import SocialButtons from '../components/sign-in/SocialButtons.tsx';

const SignIn = () => {
  return (
    <div>
      <h1>로그인</h1>
      <SocialButtons />
      <form action="/sign-in" method="post">
        <input type="text" name="email" placeholder="email" />
        <input type="password" name="password" placeholder="password" />
      </form>
    </div>
  );
};

export default SignIn;
