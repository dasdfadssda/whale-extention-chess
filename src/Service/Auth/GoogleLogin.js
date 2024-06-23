import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../../fbase";

export function handleGoogleLogin() {
  const provider = new GoogleAuthProvider();
  signInWithPopup(auth, provider)
    .then((result) => {
      // 로그인 성공 후 사용자 정보 가져오기
      const user = result.user;
      console.log("구글 로그인 성공: ", result);
      console.log("User Info: ", user);
      alert("로그인 성공");
    })
    .catch((error) => {
      console.error("Error during Google login: ", error);
      alert("로그인 실패");
    });
}
