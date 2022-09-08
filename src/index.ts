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
  const path = document.location.pathname;
  switch (path) {
    case '/':
      break;
    case '/auth':
      funPageSignIn();
      break;
    case '/registration':
      funPageSignUp();
      break;
    case '/profile':
      funPageProfile();
      break;
    case '/chat':
      funPageChat();
      break;
    case '/404':
      funpageError404();
      break;
    case '/500':
      funpageError500();
      break;
  }
});
