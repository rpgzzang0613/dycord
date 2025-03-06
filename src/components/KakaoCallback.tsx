const KakaoCallback = () => {
  const params = new URL(document.location.toString()).searchParams;
  const code = params.get('code');

  return <div>code: {code}</div>;
};

export default KakaoCallback;
