
import AuthController from './controllers/AuthController';
import { Chat } from './pages/Chat';
import { Error404 } from './pages/Error404';
import { Error500 } from './pages/Error500';
import { Profile } from './pages/Profile';
import { ProfileChangePassword } from './pages/ProfileChangePassword';
import { ProfileChangeUser } from './pages/ProfileChangeUser';
import { SignIn } from './pages/SignIn';
import { SignUp } from './pages/SignUp';
import Router from './utils/Router';
import store from './utils/Store';

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

		let isProtectedRoute = true;

  switch (window.location.pathname) {
    case Routes.Index:
    case Routes.Register:
      isProtectedRoute = false;
      break;
  }

		try {
			await AuthController.fetchUser();
			setTimeout(()=>{router.start();},400)
			if (!isProtectedRoute) {
				setTimeout(()=>{router.go('/settings');},400)
			}
		} catch (e) {
			router.start();
			if(isProtectedRoute){
				router.go('/');
			}
		}
});