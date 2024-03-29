import React, {useEffect, useState} from "react";
import CaptionComponent from "./CaptionComponent";
import style from "./Webpage.module.css";
import LikesButton from "./LikesButton";

const PostComponent = ({postId}) => {
    const [pictureUrl, setPictureUrl] = useState("");
    const [captionText, setCaptionText] = useState("");
    const [likesNumber, setLikesNumber] = useState(0);
    const [postUser, setPostUser] = useState("");
    const [userPic, setUserPic] = useState("");
    const [timeStamp, setTimeStamp] = useState("");
    const [commentNumber, setCommentNumber] = useState(0)

    const [isHidden2, setIsHidden2] = useState(true);

    const [commentText, setCommentText] = useState("")
    const commentPostSetter = (x) => {
        const inputValue = x.target.value;
        setIsHidden2(inputValue.length === 0)
        setCommentText(inputValue);
    }

    const handlePostComment = async () => {
        const postData = {
            post_id: postId,
            user_id: "blahajlover",
            comment_text: commentText,
            comment_date: new Date().toISOString().slice(0, 10),
        };
        try{
            const response = await fetch(`http://localhost:4000/api/comments/${postId}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(postData),
            });
            if (response.ok) {
                console.log("comment posted successfully")
                setCommentText("");
                commentsNumber();
                setIsHidden2(true);
            }   else {
                window.alert("comment post failed")
            }
        } catch (err) {
            console.error(err)
        }

    }


    const fetchAndUpdatePost = async () => {
        const response = await fetch(`http://localhost:4000/api/posts/${postId}`);
        const data = await response.json();
        if (data && data.length > 0) {
            setLikesNumber(data[0].likes);
            console.log("success")
            console.log(likesNumber)
        } else {
            console.log("fail")
        }
    }

    const commentsNumber = async () => {
        const response = await fetch(`http://localhost:4000/api/postcomments/${postId}`);
        const data = await response.json();
        console.log(data.count)
        setCommentNumber(data.count)
    }

    useEffect(() => {
        const fetchPost = async () => {
            const response = await fetch(`http://localhost:4000/api/posts/${postId}`);
            const data = await response.json();
            if (data && data.length > 0) {
            console.log(`time:${data[0].created_at}`)
            setPictureUrl(data[0].picture_url)
            setCaptionText(data[0].caption)
            setLikesNumber(data[0].likes)
            setPostUser(data[0].user_id)
            setUserPic(data[0].prof_pic)
            setTimeStamp(data[0].created_at)
            }
        }; 
        fetchPost();
        commentsNumber()
    });

    const getTimeDifferenceString = (timeStamp) => {
        console.log(`time:${timeStamp}`)
        const postDate = new Date(timeStamp);
        const now = new Date();
        const differenceInSeconds = Math.floor((now - postDate) / 1000);
        const differenceInMinutes = Math.floor(differenceInSeconds / 60);
        const differenceInHours = Math.floor(differenceInMinutes / 60);
        const differenceInDays = Math.floor(differenceInHours / 24);
        const differenceInWeeks = Math.floor(differenceInDays / 7);
        const differenceInMonths = now.getMonth() - postDate.getMonth() + (12 * (now.getFullYear() - postDate.getFullYear()));
        if (differenceInMonths > 3) {
            return postDate.toLocaleDateString();
        } else if (differenceInWeeks >= 1) {
            return `${differenceInWeeks}w`;
        } else if (differenceInDays >= 1) {
            return `${differenceInDays}d`;
        } else if (differenceInHours >= 1) {
            return `${differenceInHours}h`;
        } else if (differenceInMinutes >= 1) {
            return `${differenceInMinutes}m`;
        } else {
            return 'Just now';
        }
    }

    return (
        <div>
            <div className={style.p8gh}>
                                                                        <div className={style.postuser}>
                                                                            <div className={style.f9h54}>
                                                                                <div className={style.pic8t}>
                                                                                    <div className={style.o8faa} style={{height: "32px", width: "32px"}}>
                                                                                        <div className={style.fggph}>
                                                                                            <canvas className={style.storyborder} height={"42"} width={"42"} style={{left: "-5px", position: "absolute", top: "-5px", height: "42px", width: "42px"}}></canvas>
                                                                                            <span className={style.gg9sd} style={{height: "32px", width: "32px"}}>
                                                                                                <img alt='prof pic' className={style.storypicture} src={userPic}/>
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
                                                                                                                    {postUser}
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
                                                                                                            <time title='23 January 2024'>{timeStamp && getTimeDifferenceString(timeStamp)}</time>
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
                                                                                                        <ul className={style.p_0st}>
                                                                                                            <li className={style._te83}>
                                                                                                                <div style={{width: "468px"}}>
                                                                                                                    <div className={style.g012}>
                                                                                                                        <div className={style._p0014} style={{paddingBottom: "100%"}}>
                                                                                                                            <img alt="post pic" className={style._84img} style={{objectFit: "cover"}} src={pictureUrl}/>
                                                                                                                        </div>
                                                                                                                        <div style={{inset: "0", position: "absolute"}}></div>
                                                                                                                    </div>    
                                                                                                                </div>
                                                                                                            </li>
                                                                                                        </ul>
                                                                                                    </div>
                                                                                                </div>
                                                                                            </div>
                                                                                        </div>
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
                                                                                            <LikesButton postId={postId} initialLikes={likesNumber} onLikesUpdate={fetchAndUpdatePost}/>
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
                                                                                                            {likesNumber}
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
                                                                                                    {postUser}
                                                                                                </a>
                                                                                            </div>
                                                                                        </span>
                                                                                    </div>
                                                                                    <span className={style._412us_}>
                                                                                        <span className={style._412us_}>
                                                                                        <CaptionComponent caption={captionText}/>
                                                                                        </span>
                                                                                    </span>     
                                                                                </div>
                                                                                { commentNumber > 0? (
                                                                                <div className={style.commenting}>
                                                                                    <div className={style.f0124}>
                                                                                        <a href="/" className={style.i91}>
                                                                                            <span className={style._92a1} style={{lineHeight: "18px"}}>
                                                                                                View all {" "}
                                                                                                <span className={style.commentn0}>{commentNumber}</span>
                                                                                                {" "} comments
                                                                                            </span>
                                                                                        </a>
                                                                                    </div>
                                                                                </div>
                                                                                ) : null
                                                                                }           
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
                                                                                                    <textarea onChange={commentPostSetter} aria-label='Add a comment...' placeholder='Add a comment...' autoComplete='off' autoCorrect='off' className={style.c041_} value={commentText}></textarea>
                                                                                                    <div className={style._ai88}>
                                                                                                        <div className={`${style._ai89} ${isHidden2 ? style.hidden : ""}`} onClick={handlePostComment}>
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
        </div>
    )

};

export default PostComponent;