import { pageChat } from './pages/Chat/chat';
import { pageError404 } from './pages/Error404/error404';
import { pageError500 } from './pages/Error500/error500';
import { pageProfile } from './pages/Profile/profile';
import { pageSignIn } from './pages/SignIn/signIn';
import { pageSignUp } from './pages/SignUp/signUp';

function funPageSignIn() {
  pageSignIn();
}
function funPageSignUp() {
  pageSignUp();
}
function funPageProfile() {
  pageProfile();
}
function funPageChat() {
  pageChat();
}
function funpageError404() {
  pageError404();
}
function funpageError500() {
  pageError500();
}

window.addEventListener('DOMContentLoaded', () => {
  // const _SignIn = document.querySelector('#idSignIn')!;
  // _SignIn.addEventListener('click', _pageSignIn)
  // const _SignUp = document.querySelector('#idSignUp')!;
  // _SignUp.addEventListener('click', _pageSignUp)
  // const _Profile = document.querySelector('#idProfile')!;
  // _Profile.addEventListener('click', _pageProfile)
  // const _Chat = document.querySelector('#idChat')!;
  // _Chat.addEventListener('click', _pageChat)

  // const root = document.querySelector('#app')!;
  const path = document.location.pathname;
  switch (path) {
    case '/':
      // console.log(path)
      break;
    case '/auth':
      // console.log(path, root)
      funPageSignIn();
      break;
    case '/registration':
      // console.log(path, root)
      funPageSignUp();
      break;
    case '/profile':
      // console.log(path, root)
      funPageProfile();
      break;
    case '/chat':
      // console.log(path, root)
      funPageChat();
      break;
    case '/404':
      // console.log(path, root)
      funpageError404();
      break;
    case '/500':
      // console.log(path, root)
      funpageError500();
      break;
  }
});
