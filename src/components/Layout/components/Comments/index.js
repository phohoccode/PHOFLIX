import { useRef, useState, useEffect } from "react";
import clsx from "clsx";
import styles from "./Comments.module.scss"
import logo from './logo.jpg'

function Comments({ slug }) {
    const [valueComment, setValueComment] = useState('')
    const [valueEditComment, setValueEditComment] = useState('')
    const [comments, setComments] = useState(() => {
        const storedComments = JSON.parse(localStorage.getItem('comments')) || {}
        return storedComments[slug] || []
    })
    const [indexEdit, setIndexEdit] = useState(-1)
    const commentRef = useRef()
    const commentEditRef = useRef()

    const handleAddComment = () => {
        if (valueComment.trim() !== '') {
            const newComment = {
                valueComment,
                like: 0,
            }
            const storedComments = JSON.parse(localStorage.getItem('comments')) || {}
            storedComments[slug] = [...(storedComments[slug] || []), newComment]
            localStorage.setItem('comments', JSON.stringify(storedComments))
            setComments(storedComments[slug] || [])
            setValueComment('')
        }
    }

    const handleDeleteComment = (index) => {
        const storedComments = JSON.parse(localStorage.getItem('comments')) || {}
        storedComments[slug].splice(index, 1)
        localStorage.setItem('comments', JSON.stringify(storedComments))
        setComments(storedComments[slug] || [])
    }

    const handleEditComment = (index) => {
        setIndexEdit(index)
        setValueEditComment(comments[index].valueComment)                                                       
    }
    
    const handleSaveEditComment = () => {
        const storedComments = JSON.parse(localStorage.getItem('comments')) || {}
        storedComments[slug][indexEdit].valueComment = valueEditComment
        localStorage.setItem('comments', JSON.stringify(storedComments))
        setComments(storedComments[slug] || [])
        setIndexEdit(-1)
    }

    const handleLikeComment = (index) => {
        const storedComments = JSON.parse(localStorage.getItem('comments')) || {}
        storedComments[slug][index].like++
        localStorage.setItem('comments', JSON.stringify(storedComments))
        setComments(storedComments[slug] || [])
    }   

    return (
        <div className={clsx(styles.comments)}>
            <h4>
                Bình luận
                <i className="fa-regular fa-comment"></i>
            </h4>
            <div className={clsx(styles.comments__box)}>
                <textarea
                    placeholder="Viết bình luận..."
                    value={valueComment}
                    onChange={e => setValueComment(e.target.value)}
                >
                </textarea>
                <button
                    ref={commentRef}
                    className={clsx('btn btn--primary')}
                    onClick={handleAddComment}
                >
                    Bình luận
                </button>
            </div>
            <ul className={clsx(styles.comments__list_comment)}>
                <span>{comments.length} bình luận</span>
                {comments && comments.map((comment, index) => (
                    <li key={index}>
                        <div className={clsx(styles.comments__user)}>
                            <figure>
                                <img src={logo} alt="user" />
                            </figure>
                            <div className={clsx(styles.comments__user_content)}>
                                {index !== indexEdit &&
                                    <>
                                        <span>Người dùng ẩn danh</span>
                                        <p>{comment.valueComment}</p>
                                    </>
                                }
                                {index === indexEdit &&
                                    <textarea
                                        ref={commentEditRef}
                                        value={valueEditComment}
                                        onChange={e => setValueEditComment(e.target.value)}
                                    >
                                    </textarea>
                                }
                            </div>
                        </div>
                        <div className="seperate"></div>
                        <div className={clsx(styles.comments__actions)}>
                            {index !== indexEdit &&
                                <button
                                    onClick={() => handleLikeComment(index)}
                                    className={clsx('btn btn--primary')}
                                >
                                    {comment.like} lượt thích
                                </button>
                            }   
                            {index !== indexEdit &&
                                <button
                                    onClick={() => handleDeleteComment(index)}
                                    className={clsx('btn btn--primary')}
                                >
                                    Xoá
                                </button>
                            }
                            {index !== indexEdit &&
                                <button
                                    onClick={() => handleEditComment(index)}
                                    className={clsx('btn btn--primary')}
                                >
                                    Chỉnh sửa
                                </button>
                            }
                            {index === indexEdit &&
                                <button
                                onClick={() => setIndexEdit(-1)}
                                className={clsx('btn btn--primary')}>Huỷ
                                </button>
                            }
                            {index === indexEdit &&
                                <button
                                    onClick={handleSaveEditComment}
                                    className={clsx('btn btn--primary')}>Lưu
                                </button>
                            }
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Comments