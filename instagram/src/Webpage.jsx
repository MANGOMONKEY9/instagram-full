import React, {useState, useEffect, useRef, useCallback} from 'react';
import style from "./Webpage.module.css";
import CaptionComponent from './CaptionComponent';
import PostsContainer from './PostsContainer';
import LikesButton from './LikesButton';

export default function Webpage() {

var minWidth = 2;
var maxWidth = -318;
var minPost = 0;
var maxPost = -468;

var [transformX, setTransformX] = useState(2);
var [postX, setPostX] = useState(0)
const [isHidden, setIsHidden] = useState(false)
const [isHidden1, setIsHidden1] = useState(false) 
const [isHidden2, setIsHidden2] = useState(true)
const [isHidden3, setIsHidden3] = useState(false)
const [createHidden, setCreateHidden] = useState(true);

const [isButtonHidden, hideButton] = useState(false)
const [isButtonHidden2, hideButton2] = useState(false)
const [isCaptionHidden, setIsCaptionHidden] = useState(false)

//post uploading
const [captionInput, setCaptionInput] = useState("");
const handleShare = async () => {
    const postData = {
        caption: captionInput,
        pictureUrl: selectedFile,
        likes: 0,
        user_id: "blahajlover",
        prof_pic: "https://sadanduseless.b-cdn.net/wp-content/uploads/2018/10/ikea-shark2.jpg"
    };
    try {
        const response = await fetch ("http://localhost:4000/api/posts/create", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(postData),
        });
        if (response.ok) {
            console.log("Post created successfully")
            refreshPostsCallback();
        } else {
            window.alert("Post failed.")
        }
    }   catch(err) {
        console.log(err)
    }
    setCreateHidden(true);
    changeWidthDown();
    setIsHidden3(false);
    setSelectedFile(null);
    if (contentEditableRef.current) {
        contentEditableRef.current.innerHTML = "<p class='style.mad014'></p>"
        setIsCaptionHidden(false)
    }
    setInputKey(Date.now());
}
//ends here
const [inputKey, setInputKey] = useState(Date.now());

var [captionNos, setCaptionNos] = useState("0");

const [activeDotIndex, setActiveDotIndex] = useState(0);

const [selectedFile, setSelectedFile] = useState(null)

const [wldth, setWidthChange] = useState(502)

const createRef = useRef(null);
const changeWidthDown = useCallback(() => { 
    setWidthChange(502)
}, [setWidthChange])

const discardPost = useCallback(() => {
    changeWidthDown();
    setIsHidden3(false);
    if (selectedFile) {
        URL.revokeObjectURL(selectedFile);
        setSelectedFile(null);
    }
    setInputKey(Date.now())
    if (contentEditableRef.current) {
        contentEditableRef.current.innerHTML = "<p class='style.mad014'></p>"
        setIsCaptionHidden(false)
    }
}, [selectedFile, changeWidthDown, setIsHidden3, setSelectedFile, setInputKey]);

useEffect(() => {
    function handleClickOutside(event) {
        if (createRef.current && !createRef.current.contains(event.target)){
            setCreateHidden(true);
            discardPost();
        }
    }
    document.addEventListener("mousedown", handleClickOutside)

    return() => {
        document.removeEventListener("mousedown", handleClickOutside)
    }
}, [createRef, discardPost])

function createNewPost(event) {
    event.preventDefault();
    setCreateHidden(false);
}

function changeWidthUp() {
    setWidthChange(842)
}

useEffect(() => {
    hideButton(postX === minPost);
    hideButton2(postX === maxPost);

    if (postX === minPost) {
        setActiveDotIndex(0);
    } else if (postX === maxPost) {
        setActiveDotIndex(1);
    }
}, [postX, minPost, maxPost]);

function scrollNextPost() {
    setPostX(postX - 468);
}

function scrollPrevPost() {
    setPostX(postX + 468);
}

const commentPostSetter = (x) => {
    const inputValue = x.target.value;
    setIsHidden2(inputValue.length === 0)
}

function updateTransformX() {
    setTransformX(transformX - 320);
}

const contentEditableRef = useRef(null);

function toggleCaption(e) {
    const content = e.target.textContent.trim();
    setCaptionNos(`${content.length}`);
    if (content.length > 0) {
        setIsCaptionHidden(true)
    } else if (content.length === 0) {
        setIsCaptionHidden(false)
    }
    setCaptionInput(content);
}


useEffect(() => {
    setIsHidden(transformX === minWidth);
    setIsHidden1(transformX === maxWidth);

}, [transformX, minWidth, maxWidth])

function updateTransformX1() {
    setTransformX(transformX + 320)
}

function handleFileInput() {
    const fileInput = document.getElementById("fileInput");
    fileInput.click();
}

const [refreshPosts, setRefreshPosts] = useState(false)
const refreshPostsCallback = () => {
    setRefreshPosts(prev => !prev);
}; 

function handleFileChange(e) {
    const file = e.target.files[0];
    console.log("before")
    if (file){
        console.log("after")
        const fileUrl = URL.createObjectURL(file);
        console.log(fileUrl)
        setSelectedFile(fileUrl);
        changeWidthUp();
        setIsHidden3(true);
    }
}

    return(
        <div className={style.body}>
            <div className={style.xuurf}>
                <div className={style.x58ef}>
                    <div className={style.gh9sh}>
                        <div className={style.ad9d95}>
                            <div className={style.mainbody}>
                                <div className={style.actionbar}>
                                    <div className={style.action}>
                                        <div className={style.withincontainer}>
                                            <div className={style.logocontainer}>
                                                <div className={style.logoinner}>
                                                    <div style={{opacity: 1}}>
                                                        <a className={style.f9954} href='/'>
                                                            <div className={style.e88sfg}>
                                                                <div className={style.fu08}>
                                                                    <svg aria-label="Instagram" class={style.logo} fill="currentColor" height="29" role="img" viewBox="32 4 113 32" width="103"><title>Instagram</title><path clip-rule="evenodd" d="M37.82 4.11c-2.32.97-4.86 3.7-5.66 7.13-1.02 4.34 3.21 6.17 3.56 5.57.4-.7-.76-.94-1-3.2-.3-2.9 1.05-6.16 2.75-7.58.32-.27.3.1.3.78l-.06 14.46c0 3.1-.13 4.07-.36 5.04-.23.98-.6 1.64-.33 1.9.32.28 1.68-.4 2.46-1.5a8.13 8.13 0 0 0 1.33-4.58c.07-2.06.06-5.33.07-7.19 0-1.7.03-6.71-.03-9.72-.02-.74-2.07-1.51-3.03-1.1Zm82.13 14.48a9.42 9.42 0 0 1-.88 3.75c-.85 1.72-2.63 2.25-3.39-.22-.4-1.34-.43-3.59-.13-5.47.3-1.9 1.14-3.35 2.53-3.22 1.38.13 2.02 1.9 1.87 5.16ZM96.8 28.57c-.02 2.67-.44 5.01-1.34 5.7-1.29.96-3 .23-2.65-1.72.31-1.72 1.8-3.48 4-5.64l-.01 1.66Zm-.35-10a10.56 10.56 0 0 1-.88 3.77c-.85 1.72-2.64 2.25-3.39-.22-.5-1.69-.38-3.87-.13-5.25.33-1.78 1.12-3.44 2.53-3.44 1.38 0 2.06 1.5 1.87 5.14Zm-13.41-.02a9.54 9.54 0 0 1-.87 3.8c-.88 1.7-2.63 2.24-3.4-.23-.55-1.77-.36-4.2-.13-5.5.34-1.95 1.2-3.32 2.53-3.2 1.38.14 2.04 1.9 1.87 5.13Zm61.45 1.81c-.33 0-.49.35-.61.93-.44 2.02-.9 2.48-1.5 2.48-.66 0-1.26-1-1.42-3-.12-1.58-.1-4.48.06-7.37.03-.59-.14-1.17-1.73-1.75-.68-.25-1.68-.62-2.17.58a29.65 29.65 0 0 0-2.08 7.14c0 .06-.08.07-.1-.06-.07-.87-.26-2.46-.28-5.79 0-.65-.14-1.2-.86-1.65-.47-.3-1.88-.81-2.4-.2-.43.5-.94 1.87-1.47 3.48l-.74 2.2.01-4.88c0-.5-.34-.67-.45-.7a9.54 9.54 0 0 0-1.8-.37c-.48 0-.6.27-.6.67 0 .05-.08 4.65-.08 7.87v.46c-.27 1.48-1.14 3.49-2.09 3.49s-1.4-.84-1.4-4.68c0-2.24.07-3.21.1-4.83.02-.94.06-1.65.06-1.81-.01-.5-.87-.75-1.27-.85-.4-.09-.76-.13-1.03-.11-.4.02-.67.27-.67.62v.55a3.71 3.71 0 0 0-1.83-1.49c-1.44-.43-2.94-.05-4.07 1.53a9.31 9.31 0 0 0-1.66 4.73c-.16 1.5-.1 3.01.17 4.3-.33 1.44-.96 2.04-1.64 2.04-.99 0-1.7-1.62-1.62-4.4.06-1.84.42-3.13.82-4.99.17-.8.04-1.2-.31-1.6-.32-.37-1-.56-1.99-.33-.7.16-1.7.34-2.6.47 0 0 .05-.21.1-.6.23-2.03-1.98-1.87-2.69-1.22-.42.39-.7.84-.82 1.67-.17 1.3.9 1.91.9 1.91a22.22 22.22 0 0 1-3.4 7.23v-.7c-.01-3.36.03-6 .05-6.95.02-.94.06-1.63.06-1.8 0-.36-.22-.5-.66-.67-.4-.16-.86-.26-1.34-.3-.6-.05-.97.27-.96.65v.52a3.7 3.7 0 0 0-1.84-1.49c-1.44-.43-2.94-.05-4.07 1.53a10.1 10.1 0 0 0-1.66 4.72c-.15 1.57-.13 2.9.09 4.04-.23 1.13-.89 2.3-1.63 2.3-.95 0-1.5-.83-1.5-4.67 0-2.24.07-3.21.1-4.83.02-.94.06-1.65.06-1.81 0-.5-.87-.75-1.27-.85-.42-.1-.79-.13-1.06-.1-.37.02-.63.35-.63.6v.56a3.7 3.7 0 0 0-1.84-1.49c-1.44-.43-2.93-.04-4.07 1.53-.75 1.03-1.35 2.17-1.66 4.7a15.8 15.8 0 0 0-.12 2.04c-.3 1.81-1.61 3.9-2.68 3.9-.63 0-1.23-1.21-1.23-3.8 0-3.45.22-8.36.25-8.83l1.62-.03c.68 0 1.29.01 2.19-.04.45-.02.88-1.64.42-1.84-.21-.09-1.7-.17-2.3-.18-.5-.01-1.88-.11-1.88-.11s.13-3.26.16-3.6c.02-.3-.35-.44-.57-.53a7.77 7.77 0 0 0-1.53-.44c-.76-.15-1.1 0-1.17.64-.1.97-.15 3.82-.15 3.82-.56 0-2.47-.11-3.02-.11-.52 0-1.08 2.22-.36 2.25l3.2.09-.03 6.53v.47c-.53 2.73-2.37 4.2-2.37 4.2.4-1.8-.42-3.15-1.87-4.3-.54-.42-1.6-1.22-2.79-2.1 0 0 .69-.68 1.3-2.04.43-.96.45-2.06-.61-2.3-1.75-.41-3.2.87-3.63 2.25a2.61 2.61 0 0 0 .5 2.66l.15.19c-.4.76-.94 1.78-1.4 2.58-1.27 2.2-2.24 3.95-2.97 3.95-.58 0-.57-1.77-.57-3.43 0-1.43.1-3.58.19-5.8.03-.74-.34-1.16-.96-1.54a4.33 4.33 0 0 0-1.64-.69c-.7 0-2.7.1-4.6 5.57-.23.69-.7 1.94-.7 1.94l.04-6.57c0-.16-.08-.3-.27-.4a4.68 4.68 0 0 0-1.93-.54c-.36 0-.54.17-.54.5l-.07 10.3c0 .78.02 1.69.1 2.09.08.4.2.72.36.91.15.2.33.34.62.4.28.06 1.78.25 1.86-.32.1-.69.1-1.43.89-4.2 1.22-4.31 2.82-6.42 3.58-7.16.13-.14.28-.14.27.07l-.22 5.32c-.2 5.37.78 6.36 2.17 6.36 1.07 0 2.58-1.06 4.2-3.74l2.7-4.5 1.58 1.46c1.28 1.2 1.7 2.36 1.42 3.45-.21.83-1.02 1.7-2.44.86-.42-.25-.6-.44-1.01-.71-.23-.15-.57-.2-.78-.04-.53.4-.84.92-1.01 1.55-.17.61.45.94 1.09 1.22.55.25 1.74.47 2.5.5 2.94.1 5.3-1.42 6.94-5.34.3 3.38 1.55 5.3 3.72 5.3 1.45 0 2.91-1.88 3.55-3.72.18.75.45 1.4.8 1.96 1.68 2.65 4.93 2.07 6.56-.18.5-.69.58-.94.58-.94a3.07 3.07 0 0 0 2.94 2.87c1.1 0 2.23-.52 3.03-2.31.09.2.2.38.3.56 1.68 2.65 4.93 2.07 6.56-.18l.2-.28.05 1.4-1.5 1.37c-2.52 2.3-4.44 4.05-4.58 6.09-.18 2.6 1.93 3.56 3.53 3.69a4.5 4.5 0 0 0 4.04-2.11c.78-1.15 1.3-3.63 1.26-6.08l-.06-3.56a28.55 28.55 0 0 0 5.42-9.44s.93.01 1.92-.05c.32-.02.41.04.35.27-.07.28-1.25 4.84-.17 7.88.74 2.08 2.4 2.75 3.4 2.75 1.15 0 2.26-.87 2.85-2.17l.23.42c1.68 2.65 4.92 2.07 6.56-.18.37-.5.58-.94.58-.94.36 2.2 2.07 2.88 3.05 2.88 1.02 0 2-.42 2.78-2.28.03.82.08 1.49.16 1.7.05.13.34.3.56.37.93.34 1.88.18 2.24.11.24-.05.43-.25.46-.75.07-1.33.03-3.56.43-5.21.67-2.79 1.3-3.87 1.6-4.4.17-.3.36-.35.37-.03.01.64.04 2.52.3 5.05.2 1.86.46 2.96.65 3.3.57 1 1.27 1.05 1.83 1.05.36 0 1.12-.1 1.05-.73-.03-.31.02-2.22.7-4.96.43-1.79 1.15-3.4 1.41-4 .1-.21.15-.04.15 0-.06 1.22-.18 5.25.32 7.46.68 2.98 2.65 3.32 3.34 3.32 1.47 0 2.67-1.12 3.07-4.05.1-.7-.05-1.25-.48-1.25Z" fill="currentColor" fill-rule="evenodd"></path></svg>
                                                                </div>
                                                            </div>
                                                        </a>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className={style.middlecontainer}>
                                                <div style={{position: "relative"}}>
                                                    <a className={style.actionpieces} href='/'>
                                                        <div className={style.w88irf}>
                                                            <div className={style.rr99f}>
                                                                <div className={style.ff9fas}>
                                                                <svg aria-label="Home" className={style.logo} fill="currentColor" height="24" role="img" viewBox="0 0 24 24" width="24"><title>Home</title><path d="M22 23h-6.001a1 1 0 0 1-1-1v-5.455a2.997 2.997 0 1 0-5.993 0V22a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V11.543a1.002 1.002 0 0 1 .31-.724l10-9.543a1.001 1.001 0 0 1 1.38 0l10 9.543a1.002 1.002 0 0 1 .31.724V22a1 1 0 0 1-1 1Z"></path></svg>
                                                                </div>
                                                            </div>
                                                            <div className={style.actionwording} style={{opacity: 1}}>
                                                                <div style={{width: "100%"}}>
                                                                    <span className={style.iif9a}>
                                                                        <span className={style.namernamers}>Home</span>
                                                                    </span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </a>
                                                </div>
                                                <div style={{position: "relative"}}>
                                                    <a className={style.actionpieces} href='/'>
                                                        <div className={style.w88irf}>
                                                            <div className={style.rr99f}>
                                                                <div className={style.ff9fas}>
                                                                <svg aria-label="Search" className={style.logo} fill="currentColor" height="24" role="img" viewBox="0 0 24 24" width="24"><title>Search</title><path d="M19 10.5A8.5 8.5 0 1 1 10.5 2a8.5 8.5 0 0 1 8.5 8.5Z" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"></path><line fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" x1="16.511" x2="22" y1="16.511" y2="22"></line></svg>
                                                                </div>
                                                            </div>
                                                            <div className={style.actionwording} style={{opacity: 1}}>
                                                                <div style={{width: "100%"}}>
                                                                    <span className={style.iif9a}>
                                                                        <span className={`${style.namernamers} ${style.unbolded}`}>Search</span>
                                                                    </span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </a>
                                                </div>
                                                <div style={{position: "relative"}}>
                                                    <a className={style.actionpieces} href='/'>
                                                        <div className={style.w88irf}>
                                                            <div className={style.rr99f}>
                                                                <div className={style.ff9fas}>
                                                                <svg aria-label="Explore" className={style.logo} fill="currentColor" height="24" role="img" viewBox="0 0 24 24" width="24"><title>Explore</title><polygon fill="none" points="13.941 13.953 7.581 16.424 10.06 10.056 16.42 7.585 13.941 13.953" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"></polygon><polygon fill-rule="evenodd" points="10.06 10.056 13.949 13.945 7.581 16.424 10.06 10.056"></polygon><circle cx="12.001" cy="12.005" fill="none" r="10.5" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"></circle></svg>
                                                                </div>
                                                            </div>
                                                            <div className={style.actionwording} style={{opacity: 1}}>
                                                                <div style={{width: "100%"}}>
                                                                    <span className={style.iif9a}>
                                                                        <span className={`${style.namernamers} ${style.unbolded}`}>Explore</span>
                                                                    </span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </a>
                                                </div>
                                                <div style={{position: "relative"}}>
                                                    <a className={style.actionpieces} href='/'> 
                                                        <div className={style.w88irf}>
                                                            <div className={style.rr99f}>
                                                                <div className={style.ff9fas}>
                                                                <svg aria-label="Reels" className={style.logo} fill="currentColor" height="24" role="img" viewBox="0 0 24 24" width="24"><title>Reels</title><line fill="none" stroke="currentColor" stroke-linejoin="round" stroke-width="2" x1="2.049" x2="21.95" y1="7.002" y2="7.002"></line><line fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" x1="13.504" x2="16.362" y1="2.001" y2="7.002"></line><line fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" x1="7.207" x2="10.002" y1="2.11" y2="7.002"></line><path d="M2 12.001v3.449c0 2.849.698 4.006 1.606 4.945.94.908 2.098 1.607 4.946 1.607h6.896c2.848 0 4.006-.699 4.946-1.607.908-.939 1.606-2.096 1.606-4.945V8.552c0-2.848-.698-4.006-1.606-4.945C19.454 2.699 18.296 2 15.448 2H8.552c-2.848 0-4.006.699-4.946 1.607C2.698 4.546 2 5.704 2 8.552Z" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"></path><path d="M9.763 17.664a.908.908 0 0 1-.454-.787V11.63a.909.909 0 0 1 1.364-.788l4.545 2.624a.909.909 0 0 1 0 1.575l-4.545 2.624a.91.91 0 0 1-.91 0Z" fill-rule="evenodd"></path></svg>
                                                                </div>
                                                            </div>
                                                            <div className={style.actionwording} style={{opacity: 1}}>
                                                                <div style={{width: "100%"}}>
                                                                    <span className={style.iif9a}>
                                                                        <span className={`${style.namernamers} ${style.unbolded}`}>Reels</span>
                                                                    </span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </a>
                                                </div>
                                                <div style={{display: "contents"}}>
                                                <div style={{position: "relative"}}>
                                                    <a className={style.actionpieces} href='/'>
                                                        <div className={style.w88irf}>
                                                            <div className={style.rr99f}>
                                                                <div className={style.ff9fas}>
                                                                <svg aria-label="Messenger" className={style.logo} fill="currentColor" height="24" role="img" viewBox="0 0 24 24" width="24"><title>Messenger</title><path d="M12.003 2.001a9.705 9.705 0 1 1 0 19.4 10.876 10.876 0 0 1-2.895-.384.798.798 0 0 0-.533.04l-1.984.876a.801.801 0 0 1-1.123-.708l-.054-1.78a.806.806 0 0 0-.27-.569 9.49 9.49 0 0 1-3.14-7.175 9.65 9.65 0 0 1 10-9.7Z" fill="none" stroke="currentColor" stroke-miterlimit="10" stroke-width="1.739"></path><path d="M17.79 10.132a.659.659 0 0 0-.962-.873l-2.556 2.05a.63.63 0 0 1-.758.002L11.06 9.47a1.576 1.576 0 0 0-2.277.42l-2.567 3.98a.659.659 0 0 0 .961.875l2.556-2.049a.63.63 0 0 1 .759-.002l2.452 1.84a1.576 1.576 0 0 0 2.278-.42Z" fill-rule="evenodd"></path></svg>
                                                                </div>
                                                            </div>
                                                            <div className={style.actionwording} style={{opacity: 1}}>
                                                                <div style={{width: "100%"}}>
                                                                    <span className={style.iif9a}>
                                                                        <span className={`${style.namernamers} ${style.unbolded}`}>Messages</span>
                                                                    </span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </a>
                                                </div>
                                                </div>
                                                <div style={{position: "relative"}}>
                                                    <a className={style.actionpieces} href='/'>
                                                        <div className={style.w88irf}>
                                                            <div className={style.rr99f}>
                                                                <div className={style.ff9fas}>
                                                                <svg aria-label="Notifications" className={style.logo} fill="currentColor" height="24" role="img" viewBox="0 0 24 24" width="24"><title>Notifications</title><path d="M16.792 3.904A4.989 4.989 0 0 1 21.5 9.122c0 3.072-2.652 4.959-5.197 7.222-2.512 2.243-3.865 3.469-4.303 3.752-.477-.309-2.143-1.823-4.303-3.752C5.141 14.072 2.5 12.167 2.5 9.122a4.989 4.989 0 0 1 4.708-5.218 4.21 4.21 0 0 1 3.675 1.941c.84 1.175.98 1.763 1.12 1.763s.278-.588 1.11-1.766a4.17 4.17 0 0 1 3.679-1.938m0-2a6.04 6.04 0 0 0-4.797 2.127 6.052 6.052 0 0 0-4.787-2.127A6.985 6.985 0 0 0 .5 9.122c0 3.61 2.55 5.827 5.015 7.97.283.246.569.494.853.747l1.027.918a44.998 44.998 0 0 0 3.518 3.018 2 2 0 0 0 2.174 0 45.263 45.263 0 0 0 3.626-3.115l.922-.824c.293-.26.59-.519.885-.774 2.334-2.025 4.98-4.32 4.98-7.94a6.985 6.985 0 0 0-6.708-7.218Z"></path></svg>
                                                                </div>
                                                            </div>
                                                            <div className={style.actionwording} style={{opacity: 1}}>
                                                                <div style={{width: "100%"}}>
                                                                    <span className={style.iif9a}>
                                                                        <span className={`${style.namernamers} ${style.unbolded}`}>Notifications</span>
                                                                    </span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </a>
                                                </div>
                                                <div style={{position: "relative"}}>
                                                    <a className={style.actionpieces} href='/'  onClick={(event) => createNewPost(event)}>
                                                        <div className={style.w88irf}>
                                                            <div className={style.rr99f}>
                                                                <div className={style.ff9fas}>
                                                                <svg aria-label="New post" className={style.logo} fill="currentColor" height="24" role="img" viewBox="0 0 24 24" width="24"><title>New post</title><path d="M2 12v3.45c0 2.849.698 4.005 1.606 4.944.94.909 2.098 1.608 4.946 1.608h6.896c2.848 0 4.006-.7 4.946-1.608C21.302 19.455 22 18.3 22 15.45V8.552c0-2.849-.698-4.006-1.606-4.945C19.454 2.7 18.296 2 15.448 2H8.552c-2.848 0-4.006.699-4.946 1.607C2.698 4.547 2 5.703 2 8.552Z" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"></path><line fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" x1="6.545" x2="17.455" y1="12.001" y2="12.001"></line><line fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" x1="12.003" x2="12.003" y1="6.545" y2="17.455"></line></svg>
                                                                </div>
                                                            </div>
                                                            <div className={style.actionwording} style={{opacity: 1}}>
                                                                <div style={{width: "100%"}}>
                                                                    <span className={style.iif9a}>
                                                                        <span className={`${style.namernamers} ${style.unbolded}`}>Create</span>
                                                                    </span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </a>
                                                </div>
                                                <div style={{position: "relative"}}>
                                                    <a className={style.actionpieces} href='/'>
                                                        <div className={style.w88irf}>
                                                            <div className={style.rr99f}>
                                                                <div className={style.ff9fas}>
                                                                    <span className={style.ls9f0} style={{height: "24px", width: "24px"}}>
                                                                        <img alt='profile pic' className={style.profpic} draggable='false' src='https://preview.redd.it/bought-the-ikea-meme-shark-v0-wpou07qid4cb1.jpg?width=640&crop=smart&auto=webp&s=979c43f16e417d0c7e56f4cc7b2d5d9a06d363a9'/>
                                                                    </span>
                                                                </div>
                                                            </div>
                                                            <div className={style.actionwording} style={{opacity: 1}}>
                                                                <div style={{width: "100%"}}>
                                                                    <span className={style.iif9a}>
                                                                        <span className={`${style.namernamers} ${style.unbolded}`}>Profile</span>
                                                                    </span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </a>
                                                </div>
                                            </div>
                                            <div className={style.bottomcontainer}>
                                                <div className={style.threadscontainer}>
                                                <div style={{position: "relative"}}>
                                                    <a className={style.actionpieces} href='https://www.threads.net'>
                                                        <div className={style.w88irf}>
                                                            <div className={style.rr99f}>
                                                                <div className={style.ff9fas}>
                                                                <svg aria-label="" className={style.logo} fill="currentColor" height="24" role="img" viewBox="0 0 192 192" width="24"><title></title><path class="xcslo1z" d="M141.537 88.9883C140.71 88.5919 139.87 88.2104 139.019 87.8451C137.537 60.5382 122.616 44.905 97.5619 44.745C97.4484 44.7443 97.3355 44.7443 97.222 44.7443C82.2364 44.7443 69.7731 51.1409 62.102 62.7807L75.881 72.2328C81.6116 63.5383 90.6052 61.6848 97.2286 61.6848C97.3051 61.6848 97.3819 61.6848 97.4576 61.6855C105.707 61.7381 111.932 64.1366 115.961 68.814C118.893 72.2193 120.854 76.925 121.825 82.8638C114.511 81.6207 106.601 81.2385 98.145 81.7233C74.3247 83.0954 59.0111 96.9879 60.0396 116.292C60.5615 126.084 65.4397 134.508 73.775 140.011C80.8224 144.663 89.899 146.938 99.3323 146.423C111.79 145.74 121.563 140.987 128.381 132.296C133.559 125.696 136.834 117.143 138.28 106.366C144.217 109.949 148.617 114.664 151.047 120.332C155.179 129.967 155.42 145.8 142.501 158.708C131.182 170.016 117.576 174.908 97.0135 175.059C74.2042 174.89 56.9538 167.575 45.7381 153.317C35.2355 139.966 29.8077 120.682 29.6052 96C29.8077 71.3178 35.2355 52.0336 45.7381 38.6827C56.9538 24.4249 74.2039 17.11 97.0132 16.9405C119.988 17.1113 137.539 24.4614 149.184 38.788C154.894 45.8136 159.199 54.6488 162.037 64.9503L178.184 60.6422C174.744 47.9622 169.331 37.0357 161.965 27.974C147.036 9.60668 125.202 0.195148 97.0695 0H96.9569C68.8816 0.19447 47.2921 9.6418 32.7883 28.0793C19.8819 44.4864 13.2244 67.3157 13.0007 95.9325L13 96L13.0007 96.0675C13.2244 124.684 19.8819 147.514 32.7883 163.921C47.2921 182.358 68.8816 191.806 96.9569 192H97.0695C122.03 191.827 139.624 185.292 154.118 170.811C173.081 151.866 172.51 128.119 166.26 113.541C161.776 103.087 153.227 94.5962 141.537 88.9883ZM98.4405 129.507C88.0005 130.095 77.1544 125.409 76.6196 115.372C76.2232 107.93 81.9158 99.626 99.0812 98.6368C101.047 98.5234 102.976 98.468 104.871 98.468C111.106 98.468 116.939 99.0737 122.242 100.233C120.264 124.935 108.662 128.946 98.4405 129.507Z"></path></svg>
                                                                </div>
                                                            </div>
                                                            <div className={style.actionwording} style={{opacity: 1}}>
                                                                <div style={{width: "100%"}}>
                                                                    <span className={style.iif9a}>
                                                                        <span className={`${style.namernamers} ${style.unbolded}`}>Threads</span>
                                                                    </span>
                                                                </div>
                                                            </div>
                                                            <div className={`${style.l1n88r} ${style.hideit}`}>
                                                            <svg aria-label="" className={style.logo} style={{color: "rgb(142,142,142)"}} fill="currentColor" height="16" role="img" viewBox="0 0 24 24" width="16"><title></title><path d="M22 14a1 1 0 0 0-1 1v4a2.002 2.002 0 0 1-2 2H5a2.002 2.002 0 0 1-2-2V5a2.002 2.002 0 0 1 2-2h4a1 1 0 0 0 0-2H5a4.004 4.004 0 0 0-4 4v14a4.004 4.004 0 0 0 4 4h14a4.004 4.004 0 0 0 4-4v-4a1 1 0 0 0-1-1Zm0-13h-7a1 1 0 0 0 0 2h4.586L7.293 15.293a1 1 0 1 0 1.414 1.414L21 4.414V9a1 1 0 0 0 2 0V2a1 1 0 0 0-1-1Z"></path></svg>
                                                            </div>
                                                        </div>
                                                    </a>
                                                </div>
                                                </div>
                                                <div style={{position: "relative"}}>
                                                    <a className={style.actionpieces} href='/'>
                                                        <div className={style.w88irf}>
                                                            <div className={style.rr99f}>
                                                                <div className={style.ff9fas}>
                                                                <svg aria-label="Settings" className={style.logo} fill="currentColor" height="24" role="img" viewBox="0 0 24 24" width="24"><title>Settings</title><line fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" x1="3" x2="21" y1="4" y2="4"></line><line fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" x1="3" x2="21" y1="12" y2="12"></line><line fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" x1="3" x2="21" y1="20" y2="20"></line></svg>
                                                                </div>
                                                            </div>
                                                            <div className={style.actionwording} style={{opacity: 1}}>
                                                                <div style={{width: "100%"}}>
                                                                    <span className={style.iif9a}>
                                                                        <span className={`${style.namernamers} ${style.unbolded}`}>More</span>
                                                                    </span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className={style._uiam}>
                                <div className={style.middlecolumn}>
                                    <div className={style.iid9s}>
                                        <div style={{maxWidth: "630px", width: "100%"}}>
                                            <div className={style.postcolumn}>
                                                <div className={style.storycontainer}>
                                                    <div class>
                                                        <div className={style.pff24}>
                                                            <div className={style.hhf42} role='menu'>
                                                                <div className={style.bff90}>
                                                                    <div className={style.storyboard}>
                                                                        <div className={style.storyboard1}>
                                                                            <ul className={style.storyboardy}>
                                                                                <div style={{transform: `translateX(${transformX}px)`, display: "flex", flexDirection: "row", transitionDuration: ".5s", transitionTimingFunction: "cubic-bezier(0,0,0,2))"}}>
                                                                                <li className={style.storyindiv} style={{marginRight: "14px"}}>
                                                                                    <div className={style.a88f}>
                                                                                        <button className={style.storybutton}>
                                                                                            <div className={style.storypic}>
                                                                                                <canvas className={style.storyborder} height={"66"} width={"66"} style={{left: "-5px", position: "absolute", top: "-5px", height: "66px", width: "66px"}}></canvas>
                                                                                                <span style={{height: "56px", width: "56px"}} className={style.gg9sd}>
                                                                                                    <img className={style.storypicture} alt={"yadadeedee's profile pic"} src='https://www.liquorbar.sg/images/2019/products/softdrinks/coca-cola-can.webp'/>
                                                                                                </span>
                                                                                            </div>
                                                                                            <div className={style.storyname}>
                                                                                                <div className={style.ffgvx}>
                                                                                                    cokezeroforlife
                                                                                                </div>
                                                                                            </div>
                                                                                        </button>
                                                                                    </div>
                                                                                </li>
                                                                                <li className={style.storyindiv} style={{marginRight: "14px"}}>
                                                                                    <div className={style.a88f}>
                                                                                        <button className={style.storybutton}>
                                                                                            <div className={style.storypic}>
                                                                                                <canvas className={style.storyborder} height={"66"} width={"66"} style={{left: "-5px", position: "absolute", top: "-5px", height: "66px", width: "66px"}}></canvas>
                                                                                                <span style={{height: "56px", width: "56px"}} className={style.gg9sd}>
                                                                                                    <img className={style.storypicture} alt={"yadadeedee's profile pic"} src='https://m.media-amazon.com/images/I/41GCL-r6y7L.jpg'/>
                                                                                                </span>
                                                                                            </div>
                                                                                            <div className={style.storyname}>
                                                                                                <div className={style.ffgvx}>
                                                                                                    mqmeqss
                                                                                                </div>
                                                                                            </div>
                                                                                        </button>
                                                                                    </div>
                                                                                </li>
                                                                                <li className={style.storyindiv} style={{marginRight: "14px"}}>
                                                                                    <div className={style.a88f}>
                                                                                        <button className={style.storybutton}>
                                                                                            <div className={style.storypic}>
                                                                                                <canvas className={style.storyborder} height={"66"} width={"66"} style={{left: "-5px", position: "absolute", top: "-5px", height: "66px", width: "66px"}}></canvas>
                                                                                                <span style={{height: "56px", width: "56px"}} className={style.gg9sd}>
                                                                                                    <img className={style.storypicture} alt={"yadadeedee's profile pic"} src='https://static.wixstatic.com/media/1a2594_c3cefcbf24e745629745db782dbcaff8~mv2.png/v1/fit/w_500,h_500,q_90/file.png'/>
                                                                                                </span>
                                                                                            </div>
                                                                                            <div className={style.storyname}>
                                                                                                <div className={style.ffgvx}>
                                                                                                    cowmilk42
                                                                                                </div>
                                                                                            </div>
                                                                                        </button>
                                                                                    </div>
                                                                                </li>
                                                                                <li className={style.storyindiv} style={{marginRight: "14px"}}>
                                                                                    <div className={style.a88f}>
                                                                                        <button className={style.storybutton}>
                                                                                            <div className={style.storypic}>
                                                                                                <canvas className={style.storyborder} height={"66"} width={"66"} style={{left: "-5px", position: "absolute", top: "-5px", height: "66px", width: "66px"}}></canvas>
                                                                                                <span style={{height: "56px", width: "56px"}} className={style.gg9sd}>
                                                                                                    <img className={style.storypicture} alt={"yadadeedee's profile pic"} src='https://static.wikia.nocookie.net/cartoons/images/4/41/Profile_-_Patrick_Star.png'/>
                                                                                                </span>
                                                                                            </div>
                                                                                            <div className={style.storyname}>
                                                                                                <div className={style.ffgvx}>
                                                                                                    mathgenthemather
                                                                                                </div>
                                                                                            </div>
                                                                                        </button>
                                                                                    </div>
                                                                                </li>
                                                                                <li className={style.storyindiv} style={{marginRight: "14px"}}>
                                                                                    <div className={style.a88f}>
                                                                                        <button className={style.storybutton}>
                                                                                            <div className={style.storypic}>
                                                                                                <canvas className={style.storyborder} height={"66"} width={"66"} style={{left: "-5px", position: "absolute", top: "-5px", height: "66px", width: "66px"}}></canvas>
                                                                                                <span style={{height: "56px", width: "56px"}} className={style.gg9sd}>
                                                                                                    <img className={style.storypicture} alt={"yadadeedee's profile pic"} src='https://pbs.twimg.com/profile_images/1423368674237304835/ufIN39ux_400x400.jpg'/>
                                                                                                </span>
                                                                                            </div>
                                                                                            <div className={style.storyname}>
                                                                                                <div className={style.ffgvx}>
                                                                                                    youngla
                                                                                                </div>
                                                                                            </div>
                                                                                        </button>
                                                                                    </div>
                                                                                </li>
                                                                                <li className={style.storyindiv} style={{marginRight: "14px"}}>
                                                                                    <div className={style.a88f}>
                                                                                        <button className={style.storybutton}>
                                                                                            <div className={style.storypic}>
                                                                                                <canvas className={style.storyborder} height={"66"} width={"66"} style={{left: "-5px", position: "absolute", top: "-5px", height: "66px", width: "66px"}}></canvas>
                                                                                                <span style={{height: "56px", width: "56px"}} className={style.gg9sd}>
                                                                                                    <img className={style.storypicture} alt={"yadadeedee's profile pic"} src='https://miro.medium.com/v2/resize:fit:942/1*cJR_m-7x8R19_2-vPK-JdA.jpeg'/>
                                                                                                </span>
                                                                                            </div>
                                                                                            <div className={style.storyname}>
                                                                                                <div className={style.ffgvx}>
                                                                                                    gymshark
                                                                                                </div>
                                                                                            </div>
                                                                                        </button>
                                                                                    </div>
                                                                                </li>
                                                                                <li className={style.storyindiv} style={{marginRight: "14px"}}>
                                                                                    <div className={style.a88f}>
                                                                                        <button className={style.storybutton}>
                                                                                            <div className={style.storypic}>
                                                                                                <canvas className={style.storyborder} height={"66"} width={"66"} style={{left: "-5px", position: "absolute", top: "-5px", height: "66px", width: "66px"}}></canvas>
                                                                                                <span style={{height: "56px", width: "56px"}} className={style.gg9sd}>
                                                                                                    <img className={style.storypicture} alt={"yadadeedee's profile pic"} src='https://i.pinimg.com/474x/09/4a/fb/094afb4f1177b891ee15f2823b3325e4.jpg'/>
                                                                                                </span>
                                                                                            </div>
                                                                                            <div className={style.storyname}>
                                                                                                <div className={style.ffgvx}>
                                                                                                    represent.clo
                                                                                                </div>
                                                                                            </div>
                                                                                        </button>
                                                                                    </div>
                                                                                </li>
                                                                                <li className={style.storyindiv} style={{marginRight: "14px"}}>
                                                                                    <div className={style.a88f}>
                                                                                        <button className={style.storybutton}>
                                                                                            <div className={style.storypic}>
                                                                                                <canvas className={style.storyborder} height={"66"} width={"66"} style={{left: "-5px", position: "absolute", top: "-5px", height: "66px", width: "66px"}}></canvas>
                                                                                                <span style={{height: "56px", width: "56px"}} className={style.gg9sd}>
                                                                                                    <img className={style.storypicture} alt={"yadadeedee's profile pic"} src='https://sadanduseless.b-cdn.net/wp-content/uploads/2018/10/ikea-shark2.jpg'/>
                                                                                                </span>
                                                                                            </div>
                                                                                            <div className={style.storyname}>
                                                                                                <div className={style.ffgvx}>
                                                                                                    blahajloverz
                                                                                                </div>
                                                                                            </div>
                                                                                        </button>
                                                                                    </div>
                                                                                </li>
                                                                                <li className={style.storyindiv} style={{marginRight: "14px"}}>
                                                                                    <div className={style.a88f}>
                                                                                        <button className={style.storybutton}>
                                                                                            <div className={style.storypic}>
                                                                                                <canvas className={style.storyborder} height={"66"} width={"66"} style={{left: "-5px", position: "absolute", top: "-5px", height: "66px", width: "66px"}}></canvas>
                                                                                                <span style={{height: "56px", width: "56px"}} className={style.gg9sd}>
                                                                                                    <img className={style.storypicture} alt={"yadadeedee's profile pic"} src='https://f4.bcbits.com/img/0009908796_10.jpg'/>
                                                                                                </span>
                                                                                            </div>
                                                                                            <div className={style.storyname}>
                                                                                                <div className={style.ffgvx}>
                                                                                                    themidnight
                                                                                                </div>
                                                                                            </div>
                                                                                        </button>
                                                                                    </div>
                                                                                </li>
                                                                                <li className={style.storyindiv} style={{marginRight: "14px"}}>
                                                                                    <div className={style.a88f}>
                                                                                        <button className={style.storybutton}>
                                                                                            <div className={style.storypic}>
                                                                                                <canvas className={style.storyborder} height={"66"} width={"66"} style={{left: "-5px", position: "absolute", top: "-5px", height: "66px", width: "66px"}}></canvas>
                                                                                                <span style={{height: "56px", width: "56px"}} className={style.gg9sd}>
                                                                                                    <img className={style.storypicture} alt={"yadadeedee's profile pic"} src='https://www.usatoday.com/gcdn/-mm-/4a4d4a1a940ad8caef81ce4191401d3882d637d8/c=539-0-1809-1270/local/-/media/2015/11/03/USATODAY/USATODAY/635821552048664889-899-070-101-4K-UniversalColor-WB-crop.jpg'/>
                                                                                                </span>
                                                                                            </div>
                                                                                            <div className={style.storyname}>
                                                                                                <div className={style.ffgvx}>
                                                                                                    shamaladingdong
                                                                                                </div>
                                                                                            </div>
                                                                                        </button>
                                                                                    </div>
                                                                                </li>
                                                                                <li className={style.storyindiv} style={{marginRight: "14px"}}>
                                                                                    <div className={style.a88f}>
                                                                                        <button className={style.storybutton}>
                                                                                            <div className={style.storypic}>
                                                                                                <canvas className={style.storyborder} height={"66"} width={"66"} style={{left: "-5px", position: "absolute", top: "-5px", height: "66px", width: "66px"}}></canvas>
                                                                                                <span style={{height: "56px", width: "56px"}} className={style.gg9sd}>
                                                                                                    <img className={style.storypicture} alt={"yadadeedee's profile pic"} src='https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/e7744062-6c58-423d-97f0-e7ad731f2b1d/ddlzyed-b6562b33-30ce-4e08-8df9-4c11ebd0227c.jpg/v1/fit/w_375,h_375,q_70,strp/art_by_ptcrow_ddlzyed-375w.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9MTAyNCIsInBhdGgiOiJcL2ZcL2U3NzQ0MDYyLTZjNTgtNDIzZC05N2YwLWU3YWQ3MzFmMmIxZFwvZGRsenllZC1iNjU2MmIzMy0zMGNlLTRlMDgtOGRmOS00YzExZWJkMDIyN2MuanBnIiwid2lkdGgiOiI8PTEwMjQifV1dLCJhdWQiOlsidXJuOnNlcnZpY2U6aW1hZ2Uub3BlcmF0aW9ucyJdfQ.zR0hINmQutYjvNcesPhWTzA0EyZjiPWRgunzPwFSUNs'/>
                                                                                                </span>
                                                                                            </div>
                                                                                            <div className={style.storyname}>
                                                                                                <div className={style.ffgvx}>
                                                                                                    pt_crow
                                                                                                </div>
                                                                                            </div>
                                                                                        </button>
                                                                                    </div>
                                                                                </li>
                                                                                <li className={style.storyindiv} style={{marginRight: "14px"}}>
                                                                                    <div className={style.a88f}>
                                                                                        <button className={style.storybutton}>
                                                                                            <div className={style.storypic}>
                                                                                                <canvas className={style.storyborder} height={"66"} width={"66"} style={{left: "-5px", position: "absolute", top: "-5px", height: "66px", width: "66px"}}></canvas>
                                                                                                <span style={{height: "56px", width: "56px"}} className={style.gg9sd}>
                                                                                                    <img className={style.storypicture} alt={"yadadeedee's profile pic"} src='https://www.motortrend.com/uploads/2022/08/r34-skyline-rear-drivers-quarter.png'/>
                                                                                                </span>
                                                                                            </div>
                                                                                            <div className={style.storyname}>
                                                                                                <div className={style.ffgvx}>
                                                                                                    sm65g
                                                                                                </div>
                                                                                            </div>
                                                                                        </button>
                                                                                    </div>
                                                                                </li>
                                                                                </div>
                                                                            </ul>
                                                                        </div>
                                                                    </div>
                                                                    <button className={`${style.buttons1} ${isHidden ? style.hidden: ""}`} id='backbutton' aria-label='go back' onClick={updateTransformX1}>
                                                                        <div className={style.b77gbv}></div>
                                                                    </button>
                                                                    <button className={`${style.buttons} ${isHidden1 ? style.hidden: ""}`} aria-label='next' onClick={updateTransformX}>
                                                                        <div className={style.bu77900}></div>
                                                                    </button>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className={style.posts}>
                                                    <div className={style.mi88fd} style={{maxWidth: "100%", width: "min(470px, 100vh)"}}>
                                                        <div>
                                                            <div className={style.postcontainer}>
                                                            <PostsContainer refreshPosts={refreshPosts}/>
                                                                <article class>
                                                                    <div className={style.p8gh}>
                                                                        <div className={style.postuser}>
                                                                            <div className={style.f9h54}>
                                                                                <div className={style.pic8t}>
                                                                                    <div className={style.o8faa} style={{height: "32px", width: "32px"}}>
                                                                                        <div className={style.fggph}>
                                                                                            <canvas className={style.storyborder} height={"42"} width={"42"} style={{left: "-5px", position: "absolute", top: "-5px", height: "42px", width: "42px"}}></canvas>
                                                                                            <span className={style.gg9sd} style={{height: "32px", width: "32px"}}>
                                                                                                <img alt='prof pic' className={style.storypicture} src='https://miro.medium.com/v2/resize:fit:942/1*cJR_m-7x8R19_2-vPK-JdA.jpeg'/>
                                                                                            </span>
                                                                                        </div>
                                                                                    </div>
                                                                                </div>
                                                                                <div className={style.postusername}>
                                                                                    <div className={style.user8g}>
                                                                                        <div className={style.inn3rt}>
                                                                                            <div className={style.inn3rt}>
                                                                                                <span className={style.opog9} style={{lineHeight: "18px"}}>
                                                                                                    <span className={style.ghphjnc}>
                                                                                                        <span style={{display: "inline"}}>
                                                                                                            <a className={style.ugphv} href='/'>
                                                                                                                <span className={style.us35}>
                                                                                                                    gymshark
                                                                                                                </span>
                                                                                                            </a>
                                                                                                        </span>
                                                                                                    </span>
                                                                                                </span>
                                                                                            </div>
                                                                                            <div className={style.inn3rt}>
                                                                                                <span style={{marginRight: "4px", marginLeft: "4px", display: "inline-block"}}>
                                                                                                    <span className={style.opog10} style={{lineHeight: "18px"}}>
                                                                                                    •
                                                                                                    </span>
                                                                                                </span>
                                                                                                <div className={style.inn3rt}>
                                                                                                    <a className={style.ugphv} href="/">
                                                                                                        <span className={style.opog10} style={{lineHeight: "18px"}}>
                                                                                                            <time title='23 January 2024'>2 w</time>
                                                                                                        </span>
                                                                                                    </a>
                                                                                                </div>
                                                                                            </div>
                                                                                        </div>
                                                                                    </div>   
                                                                                </div>
                                                                                <div className={style.inn3rt}>
                                                                                                <div className={style.ghb9as}>
                                                                                                    <div className={style.f9g00}>
                                                                                                        <div className={style.ggr521}>
                                                                                                            <div className={style.th3bar} style={{height: "24px", width: "24px"}}>
                                                                                                            <svg aria-label="More Options" class={style.svg921} fill="currentColor" height="24" role="img" viewBox="0 0 24 24" width="24"><title>More Options</title><circle cx="12" cy="12" r="1.5"></circle><circle cx="6" cy="12" r="1.5"></circle><circle cx="18" cy="12" r="1.5"></circle></svg>             
                                                                                                            </div>
                                                                                                        </div>   
                                                                                                    </div>
                                                                                                </div>
                                                                                            </div>
                                                                            </div>
                                                                        </div>
                                                                        <div className={style.postcontent}>
                                                                        <div className={style.p900}>
                                                                            <div style={{width: "calc(min(470px, 100vh) - 2px);"}}>
                                                                                <div className={style.p05ttts}>
                                                                                    <div className={style.p05tts}>
                                                                                        <div className={style.r8gbagh} style={{paddingBottom: "100%"}}></div>
                                                                                        <div className={style.aam1_}>
                                                                                            <div className={style.a145_}>
                                                                                                <div className={style.a9951}>
                                                                                                    <div className={style._fg5}>
                                                                                                        <ul className={style.p_0st} style={{transform: `translateX(${postX}px)`}}>
                                                                                                            <li className={style._te83}>
                                                                                                                <div style={{width: "468px"}}>
                                                                                                                    <div className={style.g012}>
                                                                                                                        <div className={style._p0014} style={{paddingBottom: "100%"}}>
                                                                                                                            <img alt="post pic" className={style._84img} style={{objectFit: "cover"}} src='https://cdn.shopify.com/s/files/1/0558/6413/1764/files/Rewrite_Gymshark_Logo_Design_History_Evolution_0_1024x1024.jpg'/>
                                                                                                                        </div>
                                                                                                                        <div style={{inset: "0", position: "absolute"}}></div>
                                                                                                                    </div>    
                                                                                                                </div>
                                                                                                            </li>
                                                                                                            <li className={style._te83}>
                                                                                                                <div style={{width: "468px"}}>
                                                                                                                    <div className={style.g012}>
                                                                                                                        <div className={style._p0014} style={{paddingBottom: "100%"}}>
                                                                                                                            <img alt="post pic" className={style._84img} style={{objectFit: "cover"}} src='https://images.ctfassets.net/8urtyqugdt2l/67UHCTVooQzZPwffbpEpvd/9fc0128078181f7e555c0ab864c4af1e/Gymshark_Black_Friday___Cyber_Monday_Sale_2023_Announcement_Tile.jpg'/>
                                                                                                                        </div>
                                                                                                                        <div style={{inset: "0", position: "absolute"}}></div>
                                                                                                                    </div>    
                                                                                                                </div>
                                                                                                            </li>
                                                                                                        </ul>
                                                                                                    </div>
                                                                                                </div>
                                                                                            </div>
                                                                                            <button className={`${style._pb1} ${isButtonHidden ? style.hidden : ""}`} id='postgoback' onClick={scrollPrevPost}>
                                                                                                <div className={style._pb2}></div>
                                                                                            </button>
                                                                                            <button className={`${style._pb3}  ${isButtonHidden2 ? style.hidden : ""}`} id='postgonext' onClick={scrollNextPost}>
                                                                                                <div className={style._pb4}></div>
                                                                                            </button>
                                                                                        </div>
                                                                                    </div>
                                                                                    <div className={style.postdots}>
                                                                                        <div className={`${style.pd1} ${activeDotIndex === 0 ? style.pd1_ : ""}`}></div>
                                                                                        <div className={`${style.pd1} ${activeDotIndex === 1 ? style.pd1_ : ""}`}></div>    
                                                                                    </div>    
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    <div className={style.postinfo}>
                                                                        <div className={style._sf8a}>
                                                                            <div>
                                                                                <div className={style.ffa_1}>
                                                                                    <div className={style._0f00}>
                                                                                        <span className={style.postheart}>
                                                                                            <LikesButton />
                                                                                        </span>
                                                                                        <span>
                                                                                            <div className={style.f0a1}>
                                                                                                <div className={style._010fa243}>
                                                                                                <svg aria-label="Comment" className={style.svg_1} fill="currentColor" height="24" role="img" viewBox="0 0 24 24" width="24"><title>Comment</title><path d="M20.656 17.008a9.993 9.993 0 1 0-3.59 3.615L22 22Z" fill="none" stroke="currentColor" stroke-linejoin="round" stroke-width="2"></path></svg>
                                                                                                </div>
                                                                                            </div>
                                                                                        </span>
                                                                                        <button className={style.postshare}>
                                                                                            <div className={style._sh84r}>
                                                                                            <svg aria-label="Share Post" className={style.svg_1} fill="currentColor" height="24" role="img" viewBox="0 0 24 24" width="24"><title>Share Post</title><line fill="none" stroke="currentColor" stroke-linejoin="round" stroke-width="2" x1="22" x2="9.218" y1="3" y2="10.083"></line><polygon fill="none" points="11.698 20.334 22 3.001 2 3.001 9.218 10.084 11.698 20.334" stroke="currentColor" stroke-linejoin="round" stroke-width="2"></polygon></svg>
                                                                                            </div>          
                                                                                        </button>
                                                                                    </div>
                                                                                    <div className={style.savebutton}>
                                                                                        <div>
                                                                                            <div style={{cursor: "pointer"}}>
                                                                                                <div className={style.f0a2}>
                                                                                                    <div className={style._010fa243}>
                                                                                                    <svg aria-label="Save" className={style.svg_1} fill="currentColor" height="24" role="img" viewBox="0 0 24 24" width="24"><title>Save</title><polygon fill="none" points="20 21 12 13.44 4 21 4 3 20 3 20 21" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"></polygon></svg>
                                                                                                    </div>
                                                                                                </div>
                                                                                            </div>
                                                                                        </div>
                                                                                    </div>
                                                                                </div>
                                                                                <section className={style.likesdisplay}>
                                                                                    <div className={style._04l}>
                                                                                        <div className={style._042}>
                                                                                            <span className={style._fva2} style={{lineHeight: "18px"}}>
                                                                                                <a href='/' className={style.likeslink}>
                                                                                                    <span style={{lineHeight: "18px"}} className={style.isz8}>
                                                                                                        <span className={style.numeroslikes}>
                                                                                                            510
                                                                                                        </span>
                                                                                                        {" "}likes
                                                                                                    </span>
                                                                                                </a>
                                                                                            </span>     
                                                                                        </div>
                                                                                    </div>
                                                                                </section>
                                                                                <div className={style.usercaption}>
                                                                                    <div className={style._041_}>
                                                                                        <span style={{display: "inline"}}>
                                                                                            <div>
                                                                                                <a href='/' className={style._0412_}>
                                                                                                    gymshark
                                                                                                </a>
                                                                                            </div>
                                                                                        </span>
                                                                                    </div>
                                                                                    <span className={style._412us_}>
                                                                                        <span className={style._412us_}>
                                                                                            <CaptionComponent caption="
                                                                                        We exist to unite the conditioning community.
                                                                                        <br>
                                                                                        <br>
                                                                                        It's not our goals that unite us, but the things we do to achieve them. 
                                                                                        <br>
                                                                                        <br>
                                                                                        Because although our training grounds and end goals might be different, sweat is our sport."/>
                                                                                        </span>
                                                                                    </span>     
                                                                                </div>
                                                                                <div className={style.commenting}>
                                                                                    <div className={style.f0124}>
                                                                                        <a href="/" className={style.i91}>
                                                                                            <span className={style._92a1} style={{lineHeight: "18px"}}>
                                                                                                View all {" "}
                                                                                                <span className={style.commentn0}>30</span>
                                                                                                {" "} comments
                                                                                            </span>
                                                                                        </a>
                                                                                    </div>
                                                                                </div>
                                                                                <div className={style.commenting}>
                                                                                    <section className={style.sa41}>
                                                                                        <div className={style._04gb}>
                                                                                            <form className={style._04gb1} method='POST'>
                                                                                                <div className={style._941}>
                                                                                                    <div className={style.emojiface}>
                                                                                                        <div className={style.ob912}>
                                                                                                            <div className={style._010fa243}>
                                                                                                            <svg aria-label="Emoji" className={style.svg99} fill="currentColor" height="13" role="img" viewBox="0 0 24 24" width="13"><title>Emoji</title><path d="M15.83 10.997a1.167 1.167 0 1 0 1.167 1.167 1.167 1.167 0 0 0-1.167-1.167Zm-6.5 1.167a1.167 1.167 0 1 0-1.166 1.167 1.167 1.167 0 0 0 1.166-1.167Zm5.163 3.24a3.406 3.406 0 0 1-4.982.007 1 1 0 1 0-1.557 1.256 5.397 5.397 0 0 0 8.09 0 1 1 0 0 0-1.55-1.263ZM12 .503a11.5 11.5 0 1 0 11.5 11.5A11.513 11.513 0 0 0 12 .503Zm0 21a9.5 9.5 0 1 1 9.5-9.5 9.51 9.51 0 0 1-9.5 9.5Z"></path></svg>
                                                                                                            </div>
                                                                                                        </div>
                                                                                                    </div>
                                                                                                    <textarea onChange={commentPostSetter} aria-label='Add a comment...' placeholder='Add a comment...' autoComplete='off' autoCorrect='off' className={style.c041_}></textarea>
                                                                                                    <div className={style._ai88}>
                                                                                                        <div className={`${style._ai89} ${isHidden2 ? style.hidden : ""}`}>
                                                                                                            Post
                                                                                                        </div>
                                                                                                    </div>
                                                                                                </div>
                                                                                            </form>
                                                                                        </div>  
                                                                                    </section>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    </div>
                                                                </article>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>  
                                            </div>
                                        </div>
                                        <div className={style.sidebar}>
                                            <div className={style.das9}>
                                                <div className={style.pd01}>
                                                    <div className={style.pd02} style={{width: "100%"}}>
                                                        <div className={style.pd03_}>
                                                            <div className={style._0p21}>
                                                                <div className={style.pd04_}>
                                                                    <div className={style.pd14}>
                                                                        <div className={style.t81}>
                                                                            <div className={style.t82}>
                                                                                <div className={style.pp1} style={{cursor: "pointer"}}>
                                                                                    <canvas className={style.storyborder} height={"54"} width={"54"} style={{left: "-5px", position: "absolute", top: "-5px", height: "54px", width: "54px"}}></canvas>
                                                                                    <span style={{width: "44px", height: "44px"}} className={style.gg9sd}>
                                                                                    <img className={style.storypicture} alt={"yadadeedee's profile pic"} src='https://preview.redd.it/bought-the-ikea-meme-shark-v0-wpou07qid4cb1.jpg?width=640&crop=smart&auto=webp&s=979c43f16e417d0c7e56f4cc7b2d5d9a06d363a9'/>
                                                                                    </span>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                        <div className={style.t91}>
                                                                            <div className={style.t92}>
                                                                                <div className={style.t93}>
                                                                                    <div className={style._t014}>
                                                                                        <a className={style._04name} href='/'>blahajlover</a>
                                                                                    </div>
                                                                                    <span className={style.t_eg} style={{lineHeight: "18px"}}>
                                                                                        <span className={style.x014}>
                                                                                            <div className={style._0af4}>
                                                                                                <span className={style._1fa42n_} style={{lineHeight: "18px"}}>Tony Jaboney</span>
                                                                                            </div>   
                                                                                        </span>
                                                                                    </span>    
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                        <div className={style.t21}>
                                                                            <div className={style.t22}>
                                                                                <div className={style.t23}>Switch</div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>                                                     
                                                </div>
                                                <div className={style._pd54}>
                                                    <div className={style._pd55}>
                                                        <div className={style.pd56}>
                                                            <div className={style.pd57a}>
                                                                <div className={style.pd58a}>
                                                                    <span className={style.k_41} style={{lineHeight: "18px"}}>
                                                                        Suggested for you
                                                                    </span>
                                                                </div>
                                                                <a className={style.pd58b} href='/'>
                                                                    <span className={style._14kl} style={{lineHeight: "16px"}}>
                                                                        See All
                                                                    </span>
                                                                </a>
                                                            </div>
                                                            <div className={style.xl01}>
                                                                <div className={style.x102}>
                                                                    <div style={{height: "auto", overflow: "hidden auto"}}>
                                                                        <div style={{display: "flex", flexDirection: "column", paddingBottom: "0", paddingTop: "0", position: "relative"}}>
                                                                            <div className={style.sug42}>
                                                                                <div className={style.sug41}>
                                                                                    <div className={style.sug43}>
                                                                                        <div className={style.sug44}>
                                                                                            <div className={style.parta}>
                                                                                                <div className={style.parta1}>
                                                                                                    <div class>
                                                                                                        <div className={style.parta2}>
                                                                                                            <canvas style={{left: "-5px", position: "absolute", top: "-5px", height: "54px", width: "54px"}}></canvas>
                                                                                                            <a style={{height: "44px", width: "44px"}} href='/' className={style.parta3}>
                                                                                                                <img alt='pics and deez' draggable="false" className={style.parta4} src='https://ew.com/thmb/IVjmtfkRu2ZP4GDYmiFkPUe7yTc=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/Weeknd-d4fb08e62a924691a18af068d9bfa972.jpg'/>
                                                                                                            </a>
                                                                                                        </div>
                                                                                                    </div>
                                                                                                </div>
                                                                                            </div>
                                                                                            <div className={style.partb}>
                                                                                                <div className={style.partb1}>
                                                                                                    <div className={style.partb2}>
                                                                                                        <div className={style._t014}>
                                                                                                            <a className={style._04name} href='/'>daweeknd</a>
                                                                                                        </div>
                                                                                                        <span className={style.partb3}>
                                                                                                            <span className={style.partb4}>Suggested for you</span>
                                                                                                        </span>
                                                                                                    </div>
                                                                                                </div>
                                                                                            </div>
                                                                                            <div className={style.t21}>
                                                                                                <div className={style.t22}>
                                                                                                    <div className={style.t23}>Follow</div>
                                                                                                </div>
                                                                                            </div>
                                                                                        </div>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                            <div className={style.sug42}>
                                                                                <div className={style.sug41}>
                                                                                    <div className={style.sug43}>
                                                                                        <div className={style.sug44}>
                                                                                            <div className={style.parta}>
                                                                                                <div className={style.parta1}>
                                                                                                    <div class>
                                                                                                        <div className={style.parta2}>
                                                                                                            <canvas style={{left: "-5px", position: "absolute", top: "-5px", height: "54px", width: "54px"}}></canvas>
                                                                                                            <a style={{height: "44px", width: "44px"}} href='/' className={style.parta3}>
                                                                                                                <img alt='pics and deez' draggable="false" className={style.parta4} src='https://2.bp.blogspot.com/-WMRO9yUWrqg/VRelQDMYJUI/AAAAAAAAEb8/LZoeQJHw5o8/s1600/IMG_9855.JPG'/>
                                                                                                            </a>
                                                                                                        </div>
                                                                                                    </div>
                                                                                                </div>
                                                                                            </div>
                                                                                            <div className={style.partb}>
                                                                                                <div className={style.partb1}>
                                                                                                    <div className={style.partb2}>
                                                                                                        <div className={style._t014}>
                                                                                                            <a className={style._04name} href='/'>glasgul</a>
                                                                                                        </div>
                                                                                                        <span className={style.partb3}>
                                                                                                            <span className={style.partb4}>Suggested for you</span>
                                                                                                        </span>
                                                                                                    </div>
                                                                                                </div>
                                                                                            </div>
                                                                                            <div className={style.t21}>
                                                                                                <div className={style.t22}>
                                                                                                    <div className={style.t23}>Follow</div>
                                                                                                </div>
                                                                                            </div>
                                                                                        </div>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                            <div className={style.sug42}>
                                                                                <div className={style.sug41}>
                                                                                    <div className={style.sug43}>
                                                                                        <div className={style.sug44}>
                                                                                            <div className={style.parta}>
                                                                                                <div className={style.parta1}>
                                                                                                    <div class>
                                                                                                        <div className={style.parta2}>
                                                                                                            <canvas style={{left: "-5px", position: "absolute", top: "-5px", height: "54px", width: "54px"}}></canvas>
                                                                                                            <a style={{height: "44px", width: "44px"}} href='/' className={style.parta3}>
                                                                                                                <img alt='pics and deez' draggable="false" className={style.parta4} src='https://i.guim.co.uk/img/static/sys-images/Guardian/About/General/2011/9/14/1315997543282/ryan-gosling-in-drive-007.jpg?width=465&dpr=1&s=none'/>
                                                                                                            </a>
                                                                                                        </div>
                                                                                                    </div>
                                                                                                </div>
                                                                                            </div>
                                                                                            <div className={style.partb}>
                                                                                                <div className={style.partb1}>
                                                                                                    <div className={style.partb2}>
                                                                                                        <div className={style._t014}>
                                                                                                            <a className={style._04name} href='/'>theoompaloompas</a>
                                                                                                        </div>
                                                                                                        <span className={style.partb3}>
                                                                                                            <span className={style.partb4}>Suggested for you</span>
                                                                                                        </span>
                                                                                                    </div>
                                                                                                </div>
                                                                                            </div>
                                                                                            <div className={style.t21}>
                                                                                                <div className={style.t22}>
                                                                                                    <div className={style.t23}>Follow</div>
                                                                                                </div>
                                                                                            </div>
                                                                                        </div>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                            <div className={style.sug42}>
                                                                                <div className={style.sug41}>
                                                                                    <div className={style.sug43}>
                                                                                        <div className={style.sug44}>
                                                                                            <div className={style.parta}>
                                                                                                <div className={style.parta1}>
                                                                                                    <div class>
                                                                                                        <div className={style.parta2}>
                                                                                                            <canvas style={{left: "-5px", position: "absolute", top: "-5px", height: "54px", width: "54px"}}></canvas>
                                                                                                            <a style={{height: "44px", width: "44px"}} href='/' className={style.parta3}>
                                                                                                                <img alt='pics and deez' draggable="false" className={style.parta4} src='https://i1.wp.com/mayakitchenette.com/wp-content/uploads/2023/10/Easy-Inari-Sushi-2.jpg?ssl=1'/>
                                                                                                            </a>
                                                                                                        </div>
                                                                                                    </div>
                                                                                                </div>
                                                                                            </div>
                                                                                            <div className={style.partb}>
                                                                                                <div className={style.partb1}>
                                                                                                    <div className={style.partb2}>
                                                                                                        <div className={style._t014}>
                                                                                                            <a className={style._04name} href='/'>sushiking412</a>
                                                                                                        </div>
                                                                                                        <span className={style.partb3}>
                                                                                                            <span className={style.partb4}>Suggested for you</span>
                                                                                                        </span>
                                                                                                    </div>
                                                                                                </div>
                                                                                            </div>
                                                                                            <div className={style.t21}>
                                                                                                <div className={style.t22}>
                                                                                                    <div className={style.t23}>Follow</div>
                                                                                                </div>
                                                                                            </div>
                                                                                        </div>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                            <div className={style.sug42}>
                                                                                <div className={style.sug41}>
                                                                                    <div className={style.sug43}>
                                                                                        <div className={style.sug44}>
                                                                                            <div className={style.parta}>
                                                                                                <div className={style.parta1}>
                                                                                                    <div class>
                                                                                                        <div className={style.parta2}>
                                                                                                            <canvas style={{left: "-5px", position: "absolute", top: "-5px", height: "54px", width: "54px"}}></canvas>
                                                                                                            <a style={{height: "44px", width: "44px"}} href='/' className={style.parta3}>
                                                                                                                <img alt='pics and deez' draggable="false" className={style.parta4} src='https://is1-ssl.mzstatic.com/image/thumb/Purple126/v4/92/81/20/9281204d-c07a-4cdc-0e7a-e43b8af80a92/AppIcon-0-0-1x_U007emarketing-0-7-0-85-220.png/1200x600wa.png'/>
                                                                                                            </a>
                                                                                                        </div>
                                                                                                    </div>
                                                                                                </div>
                                                                                            </div>
                                                                                            <div className={style.partb}>
                                                                                                <div className={style.partb1}>
                                                                                                    <div className={style.partb2}>
                                                                                                        <div className={style._t014}>
                                                                                                            <a className={style._04name} href='/'>poopmap</a>
                                                                                                        </div>
                                                                                                        <span className={style.partb3}>
                                                                                                            <span className={style.partb4}>Suggested for you</span>
                                                                                                        </span>
                                                                                                    </div>
                                                                                                </div>
                                                                                            </div>
                                                                                            <div className={style.t21}>
                                                                                                <div className={style.t22}>
                                                                                                    <div className={style.t23}>Follow</div>
                                                                                                </div>
                                                                                            </div>
                                                                                        </div>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className={style.footerinos}>
                                                    <div className={style.abn1}>
                                                        <nav className={style.abn2_}>
                                                            <ul className={style.abn3_}>
                                                                <li className={style.ab14}>
                                                                    <a href='https://about.instagram.com/' className={style.ab15}>
                                                                        <span style={{lineHeight: "16px"}} className={style.ab16}>
                                                                            About
                                                                        </span>
                                                                    </a>
                                                                </li>
                                                                <li className={style.ab14}>
                                                                    <a href='https://help.instagram.com/' className={style.ab15}>
                                                                        <span style={{lineHeight: "16px"}} className={style.ab16}>
                                                                            Help
                                                                        </span>
                                                                    </a>
                                                                </li>
                                                                <li className={style.ab14}>
                                                                    <a href='https://about.instagram.com/blog' className={style.ab15}>
                                                                        <span style={{lineHeight: "16px"}} className={style.ab16}>
                                                                            Press
                                                                        </span>
                                                                    </a>
                                                                </li>
                                                                <li className={style.ab14}>
                                                                    <a href='https://developers.facebook.com/docs/instagram' className={style.ab15}>
                                                                        <span style={{lineHeight: "16px"}} className={style.ab16}>
                                                                            API
                                                                        </span>
                                                                    </a>
                                                                </li>
                                                                <li className={style.ab14}>
                                                                    <a href='https://www.instagram.com/about/jobs/' className={style.ab15}>
                                                                        <span style={{lineHeight: "16px"}} className={style.ab16}>
                                                                            Jobs
                                                                        </span>
                                                                    </a>
                                                                </li>
                                                                <li className={style.ab14}>
                                                                    <a href='https://www.instagram.com/legal/privacy/' className={style.ab15}>
                                                                        <span style={{lineHeight: "16px"}} className={style.ab16}>
                                                                            Privacy
                                                                        </span>
                                                                    </a>
                                                                </li>
                                                                <li className={style.ab14}>
                                                                    <a href='https://www.instagram.com/legal/terms/' className={style.ab15}>
                                                                        <span style={{lineHeight: "16px"}} className={style.ab16}>
                                                                            Terms
                                                                        </span>
                                                                    </a>
                                                                </li>
                                                                <li className={style.ab14}>
                                                                    <a href='https://www.instagram.com/explore/locations/' className={style.ab15}>
                                                                        <span style={{lineHeight: "16px"}} className={style.ab16}>
                                                                            Locations
                                                                        </span>
                                                                    </a>
                                                                </li>
                                                                <li className={style.ab14}>
                                                                    <a href='https://www.instagram.com/language/preferences/' className={style.ab15}>
                                                                        <span style={{lineHeight: "16px"}} className={style.ab16}>
                                                                            Language
                                                                        </span>
                                                                    </a>
                                                                </li>
                                                                <li className={style.ab14}>
                                                                    <a href='https://www.instagram.com/accounts/meta_verified/?entrypoint=web_footer' className={style.ab15}>
                                                                        <span style={{lineHeight: "16px"}} className={style.ab16}>
                                                                            Meta Verified
                                                                        </span>
                                                                    </a>
                                                                </li>
                                                            </ul>
                                                        </nav>
                                                        <span className={style.i8r01a}>
                                                            <span style={{lineHeight: "16px"}} className={`${style.ab16} ${style.ab18}`}>
                                                                © 2024 Instagram from Meta
                                                            </span>
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className={`${style.createpost} ${createHidden ? style.none : ""}`}>
                                    <div className={style._xl2} ref={createRef}>
                                        <div className={style.b4ss}>
                                            <div className={style.ploaf}>
                                                <div className={style.kjw2}>
                                                    <div className={style.piaw4}>
                                                        <div style={{maxHeight: "898px", maxWidth: "855px", minHeight: "391px", minWidth: "348px", width: `${wldth}px`}}>
                                                            <div className={style.huia2_}>
                                                                <div style={{outline: "none"}}>
                                                                    <div className={style.huia3_} style={{width: "100%"}}>
                                                                        <div className={style.huia4_}>
                                                                            <div className={style.guia5_}>
                                                                                <div className={style.l921} style={{height: "100%", width: "100%"}}>
                                                                                    <div className={style.l992} style={{width: "calc(100% + 0px)"}}>
                                                                                        <div className={style.l940}>Create new post</div>
                                                                                    </div>
                                                                                </div>
                                                                                <div className={`${style.amnn} ${isHidden3 ? "" : style.none}`}>
                                                                                    <div className={style.amnn1}>
                                                                                        <div className={style.amnn2}>
                                                                                            <div className={style.amnn3} onClick={discardPost}>
                                                                                                <span style={{display: "inline-block", transform: "rotate(0deg)"}}>
                                                                                                <svg aria-label="Back" className={`${style.svg921} ${style.back4rw}`} fill="currentColor" height="24" role="img" viewBox="0 0 24 24" width="24"><title>Back</title><line fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" x1="2.909" x2="22.001" y1="12.004" y2="12.004"></line><polyline fill="none" points="9.276 4.726 2.001 12.004 9.276 19.274" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"></polyline></svg>
                                                                                                </span>
                                                                                            </div>
                                                                                        </div>
                                                                                    </div>
                                                                                </div>
                                                                                <div className={`${style.po2g} ${isHidden3 ? "" : style.none}`} onClick={handleShare}>
                                                                                    <div className={style.po2g1}>
                                                                                        <div className={style.po2g2}>Share</div>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>    
                                                                </div>
                                                                <div className={style.res83} style={{width:`${wldth}px`}}>
                                                                    <div className={`${style.res84} ${isHidden3 ? style.none : ""}`} style={{opacity: "1"}}>
                                                                        <div className={style.res85} style={{width: "100%", height: "100%"}}>
                                                                            <div className={style.res86} style={{height: "100%", width: "100%"}}>
                                                                                <svg aria-label="Icon to represent media such as images or videos" className={style.svg192} fill="currentColor" height="77" role="img" viewBox="0 0 97.6 77.3" width="96"><title>Icon to represent media such as images or videos</title><path d="M16.3 24h.3c2.8-.2 4.9-2.6 4.8-5.4-.2-2.8-2.6-4.9-5.4-4.8s-4.9 2.6-4.8 5.4c.1 2.7 2.4 4.8 5.1 4.8zm-2.4-7.2c.5-.6 1.3-1 2.1-1h.2c1.7 0 3.1 1.4 3.1 3.1 0 1.7-1.4 3.1-3.1 3.1-1.7 0-3.1-1.4-3.1-3.1 0-.8.3-1.5.8-2.1z" fill="currentColor"></path><path d="M84.7 18.4 58 16.9l-.2-3c-.3-5.7-5.2-10.1-11-9.8L12.9 6c-5.7.3-10.1 5.3-9.8 11L5 51v.8c.7 5.2 5.1 9.1 10.3 9.1h.6l21.7-1.2v.6c-.3 5.7 4 10.7 9.8 11l34 2h.6c5.5 0 10.1-4.3 10.4-9.8l2-34c.4-5.8-4-10.7-9.7-11.1zM7.2 10.8C8.7 9.1 10.8 8.1 13 8l34-1.9c4.6-.3 8.6 3.3 8.9 7.9l.2 2.8-5.3-.3c-5.7-.3-10.7 4-11 9.8l-.6 9.5-9.5 10.7c-.2.3-.6.4-1 .5-.4 0-.7-.1-1-.4l-7.8-7c-1.4-1.3-3.5-1.1-4.8.3L7 49 5.2 17c-.2-2.3.6-4.5 2-6.2zm8.7 48c-4.3.2-8.1-2.8-8.8-7.1l9.4-10.5c.2-.3.6-.4 1-.5.4 0 .7.1 1 .4l7.8 7c.7.6 1.6.9 2.5.9.9 0 1.7-.5 2.3-1.1l7.8-8.8-1.1 18.6-21.9 1.1zm76.5-29.5-2 34c-.3 4.6-4.3 8.2-8.9 7.9l-34-2c-4.6-.3-8.2-4.3-7.9-8.9l2-34c.3-4.4 3.9-7.9 8.4-7.9h.5l34 2c4.7.3 8.2 4.3 7.9 8.9z" fill="currentColor"></path><path d="M78.2 41.6 61.3 30.5c-2.1-1.4-4.9-.8-6.2 1.3-.4.7-.7 1.4-.7 2.2l-1.2 20.1c-.1 2.5 1.7 4.6 4.2 4.8h.3c.7 0 1.4-.2 2-.5l18-9c2.2-1.1 3.1-3.8 2-6-.4-.7-.9-1.3-1.5-1.8zm-1.4 6-18 9c-.4.2-.8.3-1.3.3-.4 0-.9-.2-1.2-.4-.7-.5-1.2-1.3-1.1-2.2l1.2-20.1c.1-.9.6-1.7 1.4-2.1.8-.4 1.7-.3 2.5.1L77 43.3c1.2.8 1.5 2.3.7 3.4-.2.4-.5.7-.9.9z" fill="currentColor"></path></svg>
                                                                                <div className={style.re14}>
                                                                                    <span className={style.re15} style={{lineHeight: "25px"}}>
                                                                                        Drag photos and videos here
                                                                                    </span>
                                                                                </div>
                                                                                <div className={style.re_1}>
                                                                                    <div className={style.o991}>
                                                                                        <button className={style.o99bt} onClick={handleFileInput}>Select From Computer</button>
                                                                                    </div>    
                                                                                </div>    
                                                                            </div>
                                                                        </div>
                                                                        <form encType='multipart/form-data' method="POST">
                                                                            <input accept='image/jpeg, image/png, image/heic, image/heif' key={inputKey} className={style.fas14512} id='fileInput' type='file' onChange={handleFileChange}/>
                                                                        </form>        
                                                                    </div>
                                                                    <div className={`${isHidden3 ? "" : style.none}`} style={{display: "flex"}}>
                                                                    <div className={style.alof1} style={{opacity: "1"}}>
                                                                        <div className={style.alof2}>
                                                                            <div className={style.alof3}>
                                                                                <div className={style.alof4}>
                                                                                    <div className={style.alof5} style={{width: "502px", height: "502px"}}>
                                                                                        <img className={style.previm} alt="photopreview" src={`${selectedFile}`}/>
                                                                                    </div>    
                                                                                </div>    
                                                                            </div>
                                                                        </div>
                                                                    </div> 
                                                                    <div className={style.aloe1} style={{opacity: "1"}}>
                                                                        <div className={style.aloe2}>
                                                                            <div className={style.aloe3}>
                                                                                <div>
                                                                                    <div className={style.aloe4}>
                                                                                        <div className={style.mad1}>
                                                                                            <div className={style.mad2}>
                                                                                                <div className={style.mad3}>
                                                                                                    <div className={style.mad4}>
                                                                                                        <div className={style.mad5}>
                                                                                                            <div className={style.mad6}>
                                                                                                                <div className={style.mad61}>
                                                                                                                    <div className={style.mad62}>
                                                                                                                        <span className={style.mad63} style={{width: "28px", height: "28px"}}>
                                                                                                                            <img className={style.mad64} alt='profopcic' src='https://preview.redd.it/bought-the-ikea-meme-shark-v0-wpou07qid4cb1.jpg?width=640&crop=smart&auto=webp&s=979c43f16e417d0c7e56f4cc7b2d5d9a06d363a9'/>
                                                                                                                        </span>
                                                                                                                    </div>    
                                                                                                                </div>
                                                                                                                <div className={style.mad71}>
                                                                                                                    <div className={style.mad72}>
                                                                                                                        <div className={style.mad73}>
                                                                                                                            <span className={style.mad74} style={{lineHeight: "18px"}}>
                                                                                                                                <span className={style.mad75}>
                                                                                                                                    blahajlover
                                                                                                                                </span>
                                                                                                                            </span>
                                                                                                                        </div>
                                                                                                                    </div>
                                                                                                                </div>
                                                                                                            </div>    
                                                                                                        </div>
                                                                                                    </div>
                                                                                                </div>  
                                                                                            </div>
                                                                                        </div>
                                                                                        <div class>
                                                                                            <div className={style.mad01}>
                                                                                                <div className={style.mad012}>
                                                                                                    <div className={style.mad013} style={{userSelect: "text", whiteSpace: "pre-line", wordBreak: "break-word"}} ref={contentEditableRef} contentEditable="true" spellCheck="true" onInput={toggleCaption}>
                                                                                                            <p className={style.mad014}>
                                                                                                                <br/>
                                                                                                            </p>
                                                                                                    </div>
                                                                                                    <div className={`${style.mad015} ${isCaptionHidden ? style.none : ""}`}>Write a caption...</div>    
                                                                                                </div>
                                                                                                <div className={style.mad02}>
                                                                                                    <div className={style.mad021}>
                                                                                                        <button className={style.mad022}>
                                                                                                            <div className={style.mad023}>
                                                                                                            <svg aria-label="Emoji" className={style.svg99} fill="currentColor" height="20" role="img" viewBox="0 0 24 24" width="20"><title>Emoji</title><path d="M15.83 10.997a1.167 1.167 0 1 0 1.167 1.167 1.167 1.167 0 0 0-1.167-1.167Zm-6.5 1.167a1.167 1.167 0 1 0-1.166 1.167 1.167 1.167 0 0 0 1.166-1.167Zm5.163 3.24a3.406 3.406 0 0 1-4.982.007 1 1 0 1 0-1.557 1.256 5.397 5.397 0 0 0 8.09 0 1 1 0 0 0-1.55-1.263ZM12 .503a11.5 11.5 0 1 0 11.5 11.5A11.513 11.513 0 0 0 12 .503Zm0 21a9.5 9.5 0 1 1 9.5-9.5 9.51 9.51 0 0 1-9.5 9.5Z"></path></svg>
                                                                                                            </div>
                                                                                                        </button>
                                                                                                        <div class style={{right: "5px", top: "5px"}}></div>
                                                                                                    </div>
                                                                                                    <div className={style.mad0211}>
                                                                                                        <span className={style.mad0212}>
                                                                                                            <div className={style.mad0213}>
                                                                                                                <span className={style.mad0214}>
                                                                                                                    <span className={style.mad0215}>{captionNos}</span>
                                                                                                                    /
                                                                                                                    <span className={style.mad0215}>2,200</span>
                                                                                                                </span>
                                                                                                            </div>
                                                                                                        </span>
                                                                                                    </div>
                                                                                                </div>    
                                                                                            </div>    
                                                                                        </div> 
                                                                                        <div>
                                                                                            <div className={style.aagh}>
                                                                                                <label className={style.aagh1} style={{height: "44px"}}>
                                                                                                    <input className={style.aagh2} placeholder='Add Location' spellCheck="true" type='text'/>
                                                                                                    <div className={style.aagh3}>
                                                                                                    <svg aria-label="Add Location" className={style.svg921} fill="currentColor" height="16" role="img" viewBox="0 0 24 24" width="16"><title>Add Location</title><path d="M12.053 8.105a1.604 1.604 0 1 0 1.604 1.604 1.604 1.604 0 0 0-1.604-1.604Zm0-7.105a8.684 8.684 0 0 0-8.708 8.66c0 5.699 6.14 11.495 8.108 13.123a.939.939 0 0 0 1.2 0c1.969-1.628 8.109-7.424 8.109-13.123A8.684 8.684 0 0 0 12.053 1Zm0 19.662C9.29 18.198 5.345 13.645 5.345 9.66a6.709 6.709 0 0 1 13.417 0c0 3.985-3.944 8.538-6.709 11.002Z"></path></svg>
                                                                                                    </div>
                                                                                                </label>
                                                                                            </div>
                                                                                        </div>
                                                                                        <div className={style.aubb}>
                                                                                            <div className={style.aubb1} style={{cursor: "pointer"}}>
                                                                                                <span className={style.aubb2} style={{lineHeight: "20px"}}>
                                                                                                    Accessibility
                                                                                                </span>
                                                                                                <span style={{display: "inline-block", transform: "rotate(180deg)"}}>
                                                                                                <svg aria-label="Down Chevron Icon" className={style.svg921} fill="currentColor" height="16" role="img" viewBox="0 0 24 24" width="16"><title>Down Chevron Icon</title><path d="M21 17.502a.997.997 0 0 1-.707-.293L12 8.913l-8.293 8.296a1 1 0 1 1-1.414-1.414l9-9.004a1.03 1.03 0 0 1 1.414 0l9 9.004A1 1 0 0 1 21 17.502Z"></path></svg>
                                                                                                </span>
                                                                                            </div>
                                                                                        </div>
                                                                                        <div className={style.aubb}>
                                                                                            <div className={style.aubb1} style={{cursor: "pointer"}}>
                                                                                                <span className={style.aubb2} style={{lineHeight: "20px"}}>
                                                                                                    Advanced Settings
                                                                                                </span>
                                                                                                <span style={{display: "inline-block", transform: "rotate(180deg)"}}>
                                                                                                <svg aria-label="Down Chevron Icon" className={style.svg921} fill="currentColor" height="16" role="img" viewBox="0 0 24 24" width="16"><title>Down Chevron Icon</title><path d="M21 17.502a.997.997 0 0 1-.707-.293L12 8.913l-8.293 8.296a1 1 0 1 1-1.414-1.414l9-9.004a1.03 1.03 0 0 1 1.414 0l9 9.004A1 1 0 0 1 21 17.502Z"></path></svg>
                                                                                                </span>
                                                                                            </div>
                                                                                        </div>
                                                                                        <hr className={style.aubb_}/>  
                                                                                    </div>    
                                                                                </div>
                                                                            </div>
                                                                        </div>   
                                                                    </div>       
                                                                </div>
                                                                </div>    
                                                            </div>                             
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
        </div>
    )
}