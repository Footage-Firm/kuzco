import React from 'react'
import Modal from 'react-bootstrap/lib/Modal'
import Button from 'react-bootstrap/lib/Button'


const PROMOTER_FOLLOW_UP = 'We\'re so happy you\'re happy! We\'d love to hear more about your experience:';
const NEUTRAL_FOLLOW_UP  = 'How can we improve your experience?';
const DETRACTOR_FOLLOW_UP  = 'We\'re sorry you feel that way! What is our product missing?';

const DETRACTOR_UPPER_BOUND = 6;
const PROMOTER_LOWER_BOUND = 9;

const MAX_SCORE = 10;
const SCORES = Array(MAX_SCORE+1).fill(0).map((val, index) => index);

class NPSModal extends React.Component {

    static propTypes = {
        mainQuestion: React.PropTypes.string.isRequired,
        onScoreClick: React.PropTypes.func.isRequired,
        onCommentSubmit: React.PropTypes.func.isRequired
    }

    constructor(props) {
        super(props);

        this.state = {
            visible: true,
            showFollowUp: false,
            score: null,
            comment: ""
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
                    {SCORES.map(score => {
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
        this.props.onScoreClick(score);
        this.setState({showFollowUp: true, score});
    }

    renderFollowUpForm() {
        const followUpQuestion = this.deriveFollowUpQuestion();

        return (
            <div>
                <div className="left-row">{followUpQuestion}</div>
                <textarea rows="3"value={this.state.comment} onChange={this.handleCommentChange} />
                <div className="right-row"><Button className="btn btn-primary" onClick={this.close}>Submit</Button></div>
            </div>
        );
    }

    deriveFollowUpQuestion() {
        if (this.state.score <= DETRACTOR_UPPER_BOUND) {
            return DETRACTOR_FOLLOW_UP;
        } else if (this.state.score >= PROMOTER_LOWER_BOUND) {
            return PROMOTER_FOLLOW_UP;
        } else {
            return NEUTRAL_FOLLOW_UP;
        }
    }

    handleCommentChange = (event) => {
        this.setState({comment: event.target.value});
    }

    close = () => {
        this.props.onCommentSubmit(this.state.comment);
        this.setState({visible: false});
    }
}

export default NPSModal
