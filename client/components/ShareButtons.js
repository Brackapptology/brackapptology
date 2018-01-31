import React from 'react';
import {
    FacebookShareButton,
    TwitterShareButton,
    TwitterIcon,
    FacebookIcon
} from 'react-share';

export default function ShareButtons(props) {
    return (
        <div id="bracket-share-buttons">
            <TwitterShareButton
                url={props.url}
                title={props.title}
                via="Brackapptology">
                <TwitterIcon size={32} />
            </TwitterShareButton>
            <FacebookShareButton
                url={props.url}
                quote={props.quote}
            >
                <FacebookIcon size={32} />
            </FacebookShareButton>
        </div>
    )
}