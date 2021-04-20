import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import Modal from 'react-modal';

import '../stylesheets/nps-modal.css';

const getScoreRange = (maxScore) => {
    return Array.from({ length: maxScore + 1 }, (_, i) => i);
}

Modal.setAppElement('body');

const NPSModal = (props) => {
    const {
        detractorFollowUpQuestion,
        detractorUpperBound,
        header,
        mainQuestion,
        maxScore,
        maxScoreBlurb,
        minScoreBlurb,
        modalClassName,
        modalClassPrefix,
        neutralFollowUpQuestion,
        onCommentSubmit,
        onScoreClick,
        overlayClassName,
        promoterFollowUpQuestion,
        promoterLowerBound,
    } = props;

    const [scoreRange, setScoreRange] = useState(getScoreRange(maxScore))
    const [visible, setVisible] = useState(true);
    const [showFollowUp, setShowFollowUp] = useState(false);
    const [followUpQuestion, setFollowUpQuestion] = useState();
    const [score, setScore] = useState();
    const [comment, setComment] = useState('');
    const [contentRef, setContentRef] = useState();

    useEffect(() => {
        setScoreRange(getScoreRange(maxScore));
    }, [maxScore])

    useEffect(() => {
        if (score <= detractorUpperBound) {
            setFollowUpQuestion(detractorFollowUpQuestion);
        } else if (score < promoterLowerBound) {
            setFollowUpQuestion(neutralFollowUpQuestion);
        } else {
            setFollowUpQuestion(promoterFollowUpQuestion);
        }
    }, [score])

    /* Defines the modal's placement after it mounts, used for the entrance transition */
    useEffect(() => {
        if (contentRef) {
            contentRef.style.opacity = '100%';
            contentRef.style.top = '120px';
        }
    }, [contentRef])

    /* Delays modal exit to allow for transition styles */
    const handleCloseRequest = () => {
        if (contentRef) {
            contentRef.style.opacity = '0';
            contentRef.style.top = '0';
        }

        setTimeout(() => {
            setVisible(false);
        }, 200)
    }

    const handleScoreSelected = (selectedScore) => {
        onScoreClick(score, mainQuestion);
        setScore(selectedScore);
        setShowFollowUp(true);
    }

    const handleCommentSubmit = () => {
        onCommentSubmit(comment, followUpQuestion);
        handleCloseRequest();
    }

    return (
        <Modal
            id="nps-modal"
            isOpen={visible}
            className={`nps-modal__content ${modalClassName}`}
            contentRef={node => setContentRef(node)}
            onRequestClose={handleCloseRequest}
            overlayClassName={`nps-modal__overlay ${overlayClassName}`}
        >
            <button
                className="close-button"
                onClick={handleCloseRequest}
            >×</button>

            { !!header && (
                <h2 className={[modalClassPrefix, 'modal-header'].join('-')}>{header}</h2>
            )}

            <div className={[modalClassPrefix, 'modal-body'].join('-')}>
                { showFollowUp
                    ? (
                        <form className="follow-up-container">
                            <label htmlFor="comment-input" className="question-prompt">{followUpQuestion}</label>
                            <textarea
                                className="comment-input"
                                id="comment-input"
                                onChange={({ target }) => setComment(target.value)}
                                rows="3"
                                value={comment}
                            />
                            <div className="form-actions">
                                <button
                                    className="button-submit"
                                    onClick={handleCommentSubmit}
                                >Submit</button>
                            </div>
                        </form>
                    ) : (
                        <div
                            className="score-selector-container"
                            onMouseLeave={() => setScore(undefined)}
                        >
                            <p className="question-prompt">{mainQuestion}</p>

                            <div className="score-selector">
                                {scoreRange.map((scoreOption) => (
                                    <button
                                        key={scoreOption}
                                        className={`score-selection ${scoreOption <= score ? 'score-selection__active' : ''}`}
                                        onMouseEnter={() => setScore(scoreOption)}
                                        onClick={() => handleScoreSelected(score)}
                                    >
                                        {scoreOption}
                                    </button>
                                ))}
                            </div>

                            <div className="score-labels">
                                <p className="score-label score-label__min">{minScoreBlurb}</p>
                                <p className="score-label score-label__max">{maxScoreBlurb}</p>
                            </div>
                        </div>
                    )
                }
            </div>
        </Modal>
    )
}

NPSModal.propTypes = {
    header: PropTypes.string,
    modalClassName: PropTypes.string,
    modalClassPrefix: PropTypes.string,
    overlayClassName: PropTypes.string,
    mainQuestion: PropTypes.string.isRequired,
    promoterFollowUpQuestion: PropTypes.string.isRequired,
    neutralFollowUpQuestion: PropTypes.string.isRequired,
    detractorFollowUpQuestion: PropTypes.string.isRequired,

    maxScore: PropTypes.number.isRequired,
    detractorUpperBound: PropTypes.number.isRequired,
    promoterLowerBound: PropTypes.number.isRequired,
    minScoreBlurb: PropTypes.string,
    maxScoreBlurb: PropTypes.string,

    onScoreClick: PropTypes.func.isRequired,
    onCommentSubmit: PropTypes.func.isRequired,
}

NPSModal.defaultProps = {
    header: '',
    maxScoreBlurb: 'Very likely',
    minScoreBlurb: 'Not likely',
    modalClassName: 'nps-modal',
    modalClassPrefix: '',
    overlayClassName: '',
}

export default NPSModal;
