import { useRef, useState, useEffect } from "react"
import clsx from "clsx"
import { toast } from 'react-toastify';
import styles from "./Comments.module.scss"
import logo from './logo.jpg'
import storage, { formatTime } from "../../../../util"

function Comments({ slug }) {
    const [valueComment, setValueComment] = useState('')
    const [valueEditComment, setValueEditComment] = useState('')
    const [comments, setComments] = useState(() => {
        const storedComments = storage.get('comments', {})
        return storedComments[slug] || []
    })
    const [indexEdit, setIndexEdit] = useState(-1)
    const commentRef = useRef()
    const commentEditRef = useRef()

    useEffect(() => {
        // element.setSelectionRange(start, end)
        // nếu start = end con trỏ sẽ đặt tại vị trí đó mà không có văn bản được chọn
        if (commentEditRef.current) {
            commentEditRef.current.focus()
            const length = commentEditRef.current.value.length
            commentEditRef.current.setSelectionRange(length, length)
        }
    }, [indexEdit])

    const handleAddComment = () => {
        if (valueComment.trim() !== '') {
            const newComment = {
                valueComment,
                like: 0,
                time: new Date()
            }
            const storedComments = storage.get('comments', {})
            storedComments[slug] = [...(storedComments[slug] || []), newComment]
            storage.set('comments', storedComments)
            setComments(storedComments[slug] || [])
            setValueComment('')
            toast.success('Bình luận thành công!', {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored"
            });
        }
    }

    const handleDeleteComment = (index) => {
        const storedComments = storage.get('comments', {})
        storedComments[slug].splice(index, 1)
        storage.set('comments', storedComments)
        setComments(storedComments[slug] || [])
        toast.success('Xoá bình luận thành công!', {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored"
        });
    }

    const handleEditComment = (index) => {
        setIndexEdit(index)
        setValueEditComment(comments[index].valueComment)
    }

    const handleSaveEditComment = () => {
        const storedComments = storage.get('comments', {})
        storedComments[slug][indexEdit].valueComment = valueEditComment
        storage.set('comments', storedComments)
        setComments(storedComments[slug] || [])
        setIndexEdit(-1)
        toast.success('Chỉnh sửa bình luận thành công!', {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored"
        });
    }

    const handleLikeComment = (index) => {
        const storedComments = storage.get('comments', {})
        storedComments[slug][index].like++
        storage.set('comments', storedComments)
        setComments(storedComments[slug] || [])
    }

    return (
        <div className={styles.comments}>
            <h4>
                <i className="fa-regular fa-comment"></i>
                Bình luận
            </h4>
            <div className={styles.comments__box}>
                <textarea
                    placeholder="Viết bình luận..."
                    value={valueComment}
                    onChange={e => setValueComment(e.target.value)}
                >
                </textarea>
                <button
                    ref={commentRef}
                    className={clsx('btn', 'btn--primary')}
                    onClick={handleAddComment}
                >
                    Bình luận
                </button>
            </div>
            <ul className={styles.comments__list_comment}>
                <span>{comments.length} bình luận</span>
                {comments.map((comment, index) => (
                    <li key={index}>
                        <div className={styles.comments__user}>
                            <figure>
                                <img src={logo} alt="user" />
                            </figure>
                            <div className={styles.comments__user_content}>
                                {index !== indexEdit &&
                                    <>
                                        <span>Người xem trên trang PHOFLIX</span>
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
                        <div className={styles.comments__actions}>
                            {index !== indexEdit &&
                                <button
                                    onClick={() => handleLikeComment(index)}
                                    className={clsx('btn', 'btn--primary')}
                                >
                                    {comment.like} lượt thích
                                </button>
                            }
                            {index !== indexEdit &&
                                <button
                                    onClick={() => handleDeleteComment(index)}
                                    className={clsx('btn', 'btn--primary')}
                                >
                                    Xoá
                                </button>
                            }
                            {index !== indexEdit &&
                                <button
                                    onClick={() => handleEditComment(index)}
                                    className={clsx('btn', 'btn--primary')}
                                >
                                    Chỉnh sửa
                                </button>
                            }
                            {index === indexEdit &&
                                <button
                                    onClick={() => setIndexEdit(-1)}
                                    className={clsx('btn', 'btn--primary')}>Huỷ
                                </button>
                            }
                            {index === indexEdit &&
                                <button
                                    onClick={handleSaveEditComment}
                                    className={clsx('btn', 'btn--primary')}>Lưu
                                </button>
                            }
                            {index !== indexEdit &&
                                <span> · {formatTime(comment?.time)}</span>
                            }
                        </div>
                    </li>
                ))}
            </ul>
        </div>

    )
}

export default Comments