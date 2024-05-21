import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { AiOutlineClose } from "react-icons/ai";
import styles from "../../Styles/Posts.module.css";
import { removePost } from "../../Redux/postsSlice";
import Pagination from "../Pagination/Pagination";
import postImg from "../../Assets/blog.jpg"


const truncateText = (text, charLimit) => {
    if (text.length > charLimit) {
        return text.slice(0, charLimit) + '...';
    }
    return text;
};

const Posts = () => {
    const dispatch = useDispatch();
    const { posts, currentPage } = useSelector((state) => state.posts);

    const currentData = posts.slice((currentPage - 1) * 6, currentPage * 6);

    return (
        <div className={styles.mainDiv}>
            <div className={styles.postsDiv}>
                {currentData?.map((post, index) => {
                    return (
                        <div key={post.id} className={styles.postsCard}>
                            <div className={styles.action}>
                                <button
                                    onClick={() =>
                                        dispatch(removePost(post?.id))
                                    }
                                >
                                    <AiOutlineClose />
                                </button>
                            </div>
                            <div className={styles?.content}>
                                <h2>{truncateText(post?.title, 30)}</h2>
                                <p>{truncateText(post?.body, 50)}</p>
                                <span>{new Date().toLocaleString()}</span>
                                <img src={post?.imgUrl ?? postImg} alt={postImg} />
                            </div>
                        </div>
                    );
                })}
            </div>
            <div className={styles.paginationDiv}>
                <Pagination />
            </div>
        </div>
    );
};

export default Posts;
