import './style.css';
import { auth, provider } from '../../Api';

import { signInWithPopup, FacebookAuthProvider } from 'firebase/auth';

export const Login = ({ onReceive }) => {

    const habdleFacebookLogin = async () => {

        signInWithPopup(auth, provider).then((result) => {

            const credential = FacebookAuthProvider.credentialFromResult(result);
            const accessToken = credential.accessToken;
            // fetch facebook graph api to get user actual profile picture
            fetch(`https://graph.facebook.com/${result.user.providerData[0].uid}/picture?type=large&access_token=${accessToken}`)
                .then((response) => response.blob())
                .then((blob) => {
                    onReceive(result, blob);
                })

        }).catch((err) => {
            console.log(err);
        });
    };

    return (
        <div className='login' >
            <button className='login--btn' onClick={habdleFacebookLogin}>Logar com Facebook</button>
        </div>
    );
}