import { pageChat } from "./pages/Chat/chat";
import { pageProfile } from "./pages/Profile/profile";
import { pageSignIn } from "./pages/SignIn/signIn";
import { pageSignUp } from "./pages/SignUp/signUp";

function _pageSignIn() {
	pageSignIn()
}
function _pageSignUp() {
	pageSignUp()
}
function _pageProfile() {
	pageProfile()
}
function _pageChat() {
	pageChat()
}

window.addEventListener('DOMContentLoaded', () => {
	const _SignIn = document.querySelector('#idSignIn')!;
	_SignIn.addEventListener('click', _pageSignIn)
	const _SignUp = document.querySelector('#idSignUp')!;
	_SignUp.addEventListener('click', _pageSignUp)
	const _Profile = document.querySelector('#idProfile')!;
	_Profile.addEventListener('click', _pageProfile)
	const _Chat = document.querySelector('#idChat')!;
	_Chat.addEventListener('click', _pageChat)
});