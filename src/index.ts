// import { pageChat } from './pages/Chat/chat';
import AuthController from './controllers/AuthController';
import ChatController from './controllers/ChatController';
import { Chat } from './pages/Chat';
import { Error404 } from './pages/Error404';
// import { pageError404 } from './pages/Error404/error404';
import { Error500 } from './pages/Error500';
// import { pageError500 } from './pages/Error500/error500';
import { Profile } from './pages/Profile';
// import { pageProfile } from './pages/Profile/profile';
import { ProfileChangePassword } from './pages/ProfileChangePassword';
// import { pageProfileChangePassword } from './pages/ProfileChangePassword/profileChangePassword';
import { ProfileChangeUser } from './pages/ProfileChangeUser';
// import { pageProfileChangeUser } from './pages/ProfileChangeUser/profileChangeUser';
import { SignIn } from './pages/SignIn';
// import { pageSignIn } from './pages/SignIn/signIn';
import { SignUp } from './pages/SignUp';
// import { pageSignUp } from './pages/SignUp/signUp';
import Router from './utils/Router';
import store from './utils/Store';

// function funPageSignIn() {
//   pageSignIn();
// }
// function funPageSignUp() {
//   pageSignUp();
// }
// function funPageProfile() {
//   pageProfile();
// }
// function funPageProfileChangeUser() {
//   pageProfileChangeUser();
// }
// function funPageProfileChangePassword() {
//   pageProfileChangePassword();
// }
// function funPageChat() {
//   pageChat();
// }
// function funpageError404() {
//   pageError404();
// }
// function funpageError500() {
//   pageError500();
// }

// window.addEventListener('DOMContentLoaded', () => {
//   const path = document.location.pathname;
//   switch (path) {
//     case '/':
//       break;
//     case '/auth':
//       funPageSignIn();
//       break;
//     case '/registration':
//       funPageSignUp();
//       break;
//     case '/profile':
//       funPageProfile();
//       break;
//     case '/profile-change-user':
//       funPageProfileChangeUser();
//       break;
//     case '/profile-change-password':
//       funPageProfileChangePassword();
//       break;
//     case '/chat':
//       funPageChat();
//       break;
//     case '/404':
//       funpageError404();
//       break;
//     case '/500':
//       funpageError500();
//       break;
//   }
// });

enum Routes {
  Index = '/',
  Register = '/sign-up',
  Profile = '/settings'
}

export const router = new Router("#app");
window.storeWin = store; 
window.addEventListener('DOMContentLoaded', async () => {
  router
    .use('/', SignIn)
    .use('/sign-up', SignUp)
    .use('/settings', Profile)
    .use('/messenger', Chat)
    .use('/sign-in', SignIn)
    .use('/profile', ProfileChangeUser)
    .use('/password', ProfileChangePassword)
    .use('/500', Error500)
    .use('/404', Error404)
    .use('*', Error404)
    // .start();

		let isProtectedRoute = true;

  switch (window.location.pathname) {
    case Routes.Index:
    case Routes.Register:
      isProtectedRoute = false;
      break;
  }

		try {
			await AuthController.fetchUser();
			await ChatController.request();
			// console.log('try')
			setTimeout(()=>{router.start();},400)
			// router.start();
			if (!isProtectedRoute) {
				setTimeout(()=>{router.go('/settings');},400)
				// router.go('/settings');
			}
		} catch (e) {
			// console.log('catch')
			router.start();
			// console.log('go')
			if(isProtectedRoute){
				router.go('/');
			}
		}
});