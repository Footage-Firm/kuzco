import React from 'react'
import Modal from 'react-bootstrap/lib/Modal'
import Button from 'react-bootstrap/lib/Button'
import PropTypes from 'prop-types'

class NPSModal extends React.Component {

    static propTypes = {
        mainQuestion: PropTypes.string.isRequired,
        promoterFollowUpQuestion: PropTypes.string.isRequired,
        neutralFollowUpQuestion: PropTypes.string.isRequired,
        detractorFollowUpQuestion: PropTypes.string.isRequired,

        maxScore: PropTypes.number.isRequired,
        detractorUpperBound: PropTypes.number.isRequired,
        promoterLowerBound: PropTypes.number.isRequired,

        onScoreClick: PropTypes.func.isRequired,
        onCommentSubmit: PropTypes.func.isRequired
    }

    constructor(props) {
        super(props);

        this.state = {
            scoreRange: Array(this.props.maxScore + 1).fill(0).map((val, index) => index),
            visible: true,
            showFollowUp: false,
            score: null,
            comment: ''
        };
    }

    render() {
        return (
            <Modal id="nps-modal" show={this.state.visible} onHide={this.close}>
                <Modal.Header closeButton/>
                <Modal.Body>
                    { this.state.showFollowUp ? this.renderFollowUpForm() : this.renderMainQuestion() }
                </Modal.Body>
            </Modal>
        );
    }

    renderMainQuestion() {
        return (
            <div>
                <div className="centered-row"> {this.props.mainQuestion} </div>
                <div className="centered-row" style={{marginBottom: "32px"}}>
                    {this.state.scoreRange.map(score => {
                        return (
                            <div key={score} className="score">
                                <div className={this.state.score!== null && this.state.score >= score ? "btn btn-primary" : "btn btn-default"}
                                     onMouseEnter={() => this.onMouseEnter(score)}
                                     onMouseLeave={() => this.onMouseLeave()}
                                     onClick={() => this.onScoreClick(score)}> {score} </div>
                                {score === 0 ? <div className="score-label">Not likely</div> : ''}
                                {score === 10 ? <div className="score-label" style={{right: "11%"}}>Very likely</div> : ''}
                            </div>
                        );
                    })}
                </div>
            </div>
        );
    }

    onMouseEnter = (score) => {
        this.setState({score});
    }

    onMouseLeave = () => {
        this.setState({score: null});
    }

    onScoreClick = (score) => {
        this.props.onScoreClick(score, this.props.mainQuestion);
        this.setState({showFollowUp: true, score});
    }

    renderFollowUpForm() {
        const followUpQuestion = this.deriveFollowUpQuestion();

        return (
            <div>
                <div className="left-row">{followUpQuestion}</div>
                <textarea rows="3"value={this.state.comment} onChange={this.handleCommentChange} />
                <div className="right-row"><Button className="btn btn-primary" onClick={() => this.submit(followUpQuestion)}>Submit</Button></div>
            </div>
        );
    }

    deriveFollowUpQuestion() {
        if (this.state.score <= this.props.detractorUpperBound) {
           return this.props.detractorFollowUpQuestion;
        } else if (this.state.score >= this.props.promoterLowerBound) {
            return this.props.promoterFollowUpQuestion;
        } else {
            return this.props.neutralFollowUpQuestion;
        }
    }

    handleCommentChange = (event) => {
        this.setState({comment: event.target.value});
    }

    submit(followUpQuestion) {
        this.props.onCommentSubmit(this.state.comment, followUpQuestion);
        this.setState({visible: false});
    }

    close = () => {
        this.setState({visible: false});
    }
}

export default NPSModal
