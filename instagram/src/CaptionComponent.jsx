import React, {useState} from 'react';

const CaptionComponent = ({ caption, maxLength = 60 }) => {
    const [isExpanded, setIsExpanded] = useState(false);

    const shouldShowButton = caption.length > maxLength;

    const toggleExpanded = () => {
        setIsExpanded(!isExpanded);
    }

    const renderCaptionHTML = () => {
       let displayCaption = isExpanded || !shouldShowButton ? caption: caption.substring(0, maxLength) + " ... ";

       displayCaption = displayCaption.replace(/\n/g, '<br>');
       return {__html: displayCaption};
    }

    return (
        <span>
            <span dangerouslySetInnerHTML={renderCaptionHTML()}/>
            {shouldShowButton && (
                <span onClick={toggleExpanded} style={{cursor: "pointer", display: "inline-block"}}>
                    <span style={{lineHeight: "18px", color: "rgb(115, 115, 115"}}>
                        {isExpanded ? "" : "more"}
                    </span>
                </span>
            )}
        </span>
    );
};

export default CaptionComponent;