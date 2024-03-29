import styles from "./Login.module.css";
import React, {useState, useEffect} from 'react';
import {useNavigate} from 'react-router-dom';

const imageURLs = [
    "https://www.instagram.com/static/images/homepage/screenshots/screenshot1-2x.png/cfd999368de3.png",
    "https://www.instagram.com/static/images/homepage/screenshots/screenshot2-2x.png/80b8aebdea57.png",
    "https://www.instagram.com/static/images/homepage/screenshots/screenshot3-2x.png/fe2540684ab2.png",
    "https://www.instagram.com/static/images/homepage/screenshots/screenshot4-2x.png/8e9224a71939.png"
]

export default function Login() {
    const navigate = useNavigate();

    const navigateHome = () => {
        navigate("/webpage");
    }
    const [currentImageIndex, setCurrentImageIndex] = useState(0)
    const [usernameInputHasValue, setUsernameInputHasValue] = useState(false);
    const [passwordInputHasValue, setPasswordInputHasValue] = useState(false);
    const [password, setPassword] = useState("");
    const [isButtonDisabled, setIsButtonDisabled] = useState(true);
    const [showWrongPasswordText, setShowWrongPasswordText] = useState(false);

    const login_auth = async (x) => {
        x.preventDefault();
        const usernameValue = document.getElementById("username").value;
        const passwordValue = document.getElementById("password").value;
        try {
            console.log("0")
            const response = await fetch (`http://localhost:4000/getData?username=${usernameValue}&password=${passwordValue}`)
            console.log("1.2")
            const data = await response.json()
            console.log("1")
            if (data.length === 0) {
                console.log("2")
                setShowWrongPasswordText(true)
            } else {
                console.log("3")
                setShowWrongPasswordText(false)
                navigateHome()
            }
        } catch (err) {
            console.error(err)
        }
    }

    function passwordStater(x) {
        setPasswordInputHasValue(x.target.value.trim().length > 0);
        setPassword(x.target.value);
        console.log(password);
    }

    useEffect(() => {
        const toggleImages = () => {
            setCurrentImageIndex((prevIndex) => (prevIndex + 1) % 4);
        };

        const intervalId = setInterval(toggleImages, 5000);

        return() => clearInterval(intervalId);
    }, []);

    useEffect(() => {
        setIsButtonDisabled(!(usernameInputHasValue && password.length >= 6));
    }, [usernameInputHasValue, password]);

    return(
        <div className={styles.mainpage}> 
            <article className={styles.main}>
                <div className={styles.loginleft}>
                    <div className={styles.animatingpics}>
                        {imageURLs.map((url, index) => (
                        <img
                            key={index}
                            alt=""
                            className={`${styles.phonepics} ${currentImageIndex === index ? '' : styles.hidden}`}
                            src={url}                        
                        />
                        ))}
                    </div>
                </div>
                <div className={styles.loginright}>
                        <div className={styles.loginui}>
                            <div className={styles.iglogo}>
                                <div className={styles.igbox} role="button">
                                    <div className={styles.ig}></div>
                                </div>
                            </div>
                            <div className={styles.logincontainer}>
                                <form className={styles.loginwithin}>
                                    <div className={styles.loginparts}>
                                        <div className={styles.loginboxes}>
                                            <div className={`${styles.a990128} ${usernameInputHasValue ? styles.inputfilled : ''}`}>
                                                <div className={styles.label}>
                                                    <span className={`${styles.placeholdertext} ${usernameInputHasValue ? styles.smalltext : ''}`}>
                                                        Phone number, username, or email
                                                    </span>
                                                    <input 
                                                        autoCapitalize="off" 
                                                        autoCorrect="off" 
                                                        maxLength={75} 
                                                        className={styles.input}
                                                        id="username"
                                                        onChange={(e) => setUsernameInputHasValue(e.target.value.trim().length > 0)}
                                                        >
                                                    </input>
                                                </div>
                                            </div>
                                        </div>
                                        <div className={styles.loginboxes}>
                                            <div className={`${styles.a990128} ${passwordInputHasValue ? styles.inputfilled : ''}`}>
                                                <div className={styles.label}>
                                                    <span className={`${styles.placeholdertext} ${passwordInputHasValue ? styles.smalltext : ''}`}>
                                                        Password
                                                    </span>
                                                    <input 
                                                        autoCapitalize="off" 
                                                        autoCorrect="off" 
                                                        maxLength={75} 
                                                        className={styles.input}
                                                        id="password"
                                                        onChange={(e) => 
                                                            passwordStater(e)
                                                        }
                                                        >
                                                    </input>
                                                </div>
                                            </div>
                                        </div>
                                        <div className={styles.loggin}>
                                            <button className={styles.loginbutton} disabled={isButtonDisabled} onClick={login_auth}>
                                                <div className={styles.buttontext}>
                                                    Log In
                                                </div>
                                            </button>
                                        </div>
                                        <div className={styles.orspacer}>
                                            <div className={styles.orinner}>
                                                <div className={styles.orline}></div>
                                                <div className={styles.or}>OR</div>
                                                <div className={styles.orline}></div>
                                            </div>
                                        </div>
                                        <div className={styles.facebooklogin}>
                                            <button className={styles.facebookbutton}>
                                                <span className={styles.facebooklogo}></span>
                                                <span className={styles.facebooktext}>
                                                    Log In with Facebook
                                                </span>
                                            </button>
                                        </div>
                                        <span className={styles.wrongpasswordtext} style={{display: showWrongPasswordText ? 'block' : 'none'}}>
                                            <div className={styles.wrongpasswordinner}>
                                                Sorry, your password was incorrect. Please double-check your password.
                                            </div>
                                        </span>
                                        <a className={styles.forgotpassword} href="https://www.instagram.com/accounts/password/reset/">
                                            <span className={styles.forgotpasswordtext}>
                                                Forgotten your Password?
                                            </span>
                                        </a>
                                    </div>
                                </form>
                            </div>
                        </div> 
                        <div className={styles.loginui}>
                            <span className={styles.signup}>
                                <p className={styles.signupcontainer}>
                                    Don't have an account?
                                     <a className={styles.signupbutton} href="https://www.instagram.com/accounts/emailsignup/">
                                        <span className={styles.signuptext}> Sign Up</span>
                                    </a>
                                </p>
                            </span>
                        </div> 
                        <div className={styles.gettheapp}>
                            <div className={styles.gettheappcontainer}>
                                <span className={styles.gettheapptext}>Get the App.</span>
                            </div>
                            <div className={styles.gettheappcontainer}>
                                <a className={styles.linkblock} href="https://l.instagram.com/?u=https%3A%2F%2Fplay.google.com%2Fstore%2Fapps%2Fdetails%3Fid%3Dcom.instagram.android%26referrer%3Dig_mid%253DEEA46D67-5058-4E2E-81B7-803F656D7024%2526utm_campaign%253DloginPage%2526utm_content%253Dlo%2526utm_source%253Dinstagramweb%2526utm_medium%253Dbadge&e=AT02UdFQz3ldL3LBW9DxhIQTw-975oD4iL_o5YLQ1-iVDEejFqSTI07V-4o_0O6yMnW4QWBFMLXxV517VTG4gsyC2b8HMW6YCa2wOhQGwe4PJfrexQiL56Pgf8yN0WrBkd6vLyk0M_rJHVQlwdN10Q">
                                    <img className={styles.imagery} alt="googleplay" src="https://static.cdninstagram.com/rsrc.php/v3/yz/r/c5Rp7Ym-Klz.png"></img>
                                </a>
                                <a className={styles.linkblock} href="ms-windows-store://pdp/?productid=9nblggh5l9xt&referrer=appbadge&source=www.instagram.com&mode=mini&pos=0%2C0%2C1920%2C1040">
                                    <img className={styles.imagery} alt="microsoft" src="https://static.cdninstagram.com/rsrc.php/v3/yu/r/EHY6QnZYdNX.png"></img>
                                </a>
                            </div>
                        </div>
                    </div>  
            </article>
            <footer className={styles.footer}>
                <div className={styles.footercontainer}>
                    <div className={styles.topcontainer}>
                        <div className={styles.innercontainer}>
                            <div className={styles.chips}>
                                <a href="https://about.meta.com/" className={styles.anchortag}>
                                    <span className={styles.chipstext}>Meta</span>
                                </a>
                            </div>
                            <div className={styles.chips}>
                                <a href="https://about.instagram.com/" className={styles.anchortag}>
                                    <span className={styles.chipstext}>About</span>
                                </a>
                            </div>
                            <div className={styles.chips}>
                                <a href="https://about.instagram.com/blog/" className={styles.anchortag}>
                                    <span className={styles.chipstext}>Blog</span>
                                </a>
                            </div>
                            <div className={styles.chips}>
                                <a href="https://www.instagram.com/about/jobs/" className={styles.anchortag}>
                                    <span className={styles.chipstext}>Jobs</span>
                                </a>
                            </div>
                            <div className={styles.chips}>
                                <a href="https://help.instagram.com/" className={styles.anchortag}>
                                    <span className={styles.chipstext}>Help</span>
                                </a>
                            </div>
                            <div className={styles.chips}>
                                <a href="https://developers.facebook.com/docs/instagram" className={styles.anchortag}>
                                    <span className={styles.chipstext}>API</span>
                                </a>
                            </div>
                            <div className={styles.chips}>
                                <a href="https://www.instagram.com/legal/privacy/" className={styles.anchortag}>
                                    <span className={styles.chipstext}>Privacy</span>
                                </a>
                            </div>
                            <div className={styles.chips}>
                                <a href="https://www.instagram.com/legal/terms/" className={styles.anchortag}>
                                    <span className={styles.chipstext}>Terms</span>
                                </a>
                            </div>
                            <div className={styles.chips}>
                                <a href="https://www.instagram.com/explore/locations/" className={styles.anchortag}>
                                    <span className={styles.chipstext}>Locations</span>
                                </a>
                            </div>
                            <div className={styles.chips}>
                                <a href="https://www.instagram.com/web/lite/" className={styles.anchortag}>
                                    <span className={styles.chipstext}>Instagram Lite</span>
                                </a>
                            </div>
                            <div className={styles.chips}>
                                <a href="https://www.threads.net/" className={styles.anchortag}>
                                    <span className={styles.chipstext}>Threads</span>
                                </a>
                            </div>
                            <div className={styles.chips}>
                                <a className={styles.anchortag} href="https://l.instagram.com/?u=https%3A%2F%2Fwww.facebook.com%2Fhelp%2Finstagram%2F261704639352628&e=AT02UdFQz3ldL3LBW9DxhIQTw-975oD4iL_o5YLQ1-iVDEejFqSTI07V-4o_0O6yMnW4QWBFMLXxV517VTG4gsyC2b8HMW6YCa2wOhQGwe4PJfrexQiL56Pgf8yN0WrBkd6vLyk0M_rJHVQlwdN10Q">
                                    <span className={styles.chipstext}>Contact Uploading & Non-Users</span>
                                </a>
                            </div>
                            <div className={styles.chips}>
                                <a href="https://about.meta.com/technologies/meta-verified/" className={styles.anchortag}>
                                    <span className={styles.chipstext}>Meta Verified</span>
                                </a>
                            </div>                           
                        </div>              
                    </div>
                    <div className={styles.bottomcontainer}>
                        <span className={styles.language}>
                            <div className={styles.languagetext}>
                                <span className={styles.innertextcontainer}>
                                    English
                                </span>
                                <div className={styles.selectarrow}>
                                <span className={styles.arrowstyle}>
                                <svg aria-label="Down chevron icon" class="x1lliihq x1n2onr6 x1roi4f4" fill="currentColor" height="12" role="img" viewBox="0 0 24 24" width="12"><title>Down chevron icon</title><path d="M21 17.502a.997.997 0 0 1-.707-.293L12 8.913l-8.293 8.296a1 1 0 1 1-1.414-1.414l9-9.004a1.03 1.03 0 0 1 1.414 0l9 9.004A1 1 0 0 1 21 17.502Z"></path></svg>
                                </span>
                            </div>
                            </div>
                            <select className={styles.select}>
                                <option>Afrikaans</option>
                                <option>العربية</option>
                                <option>Čeština</option>
                                <option>Dansk</option>
                                <option>Deutsch</option>
                                <option>Ελληνικά</option>
                                <option>English</option>
                                <option>English (UK)</option>
                                <option>Español (España)</option>
                                <option>Español</option>
                                <option>فارسی</option>
                                <option>Suomi</option>
                                <option>Français</option>
                                <option>עברית</option>
                                <option>Bahasa Indonesia</option>
                                <option>Italiano</option>
                                <option>日本語</option>
                                <option>한국어</option>
                                <option>Bahasa Melayu</option>
                                <option>Norsk</option>
                                <option>Nederlands</option>
                                <option>Polski</option>
                                <option>Português (Brasil)</option>
                                <option>Português (Portugal)</option>
                                <option>Русский</option>
                                <option>Svenska</option>
                                <option>ภาษาไทย</option>
                                <option>Filipino</option>
                                <option>Türkçe</option>
                                <option>中文(简体)</option>
                                <option>中文(台灣)</option>
                                <option>বাংলা</option>
                                <option>ગુજરાતી</option>
                                <option>हिन्दी</option>
                                <option>Hrvatski</option>
                                <option>Magyar</option>
                                <option>ಕನ್ನಡ</option>
                                <option>മലയാളം</option>
                                <option>मराठी</option>
                                <option>नेपाली</option>
                                <option>ਪੰਜਾਬੀ</option>
                                <option>සිංහල</option>
                                <option>Slovenčina</option>
                                <option>தமிழ்</option>
                                <option>తెలుగు</option>
                                <option>اردو</option>
                                <option>Tiếng Việt</option>
                                <option>中文(香港)</option>
                                <option>Български</option>
                                <option>Français (Canada)</option>
                                <option>Română</option>
                                <option>Српски</option>
                                <option>Українська</option>
                            </select>
                        </span>
                        <div className={styles.trademark}>
                            <span className={styles.trademarktext}>
                            © 2023 Instagram from Meta
                            </span>
                        </div>
                    </div>
                </div>                
            </footer>
        </div>
    )
}