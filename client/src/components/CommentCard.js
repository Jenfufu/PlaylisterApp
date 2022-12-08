import React, { useContext, useState } from 'react'
import { GlobalStoreContext } from '../store'

function CommentCard(props){
    const { store } = useContext(GlobalStoreContext);
    const {comment} = props

    let cardClass = "comment-card"
    return(
        <div
            className={cardClass}
        >
            <p>{comment.user}<br></br></p>
            <p>{comment.comment}</p>

        </div>
    );
}
export default CommentCard;