import React from 'react'
import Modal from 'react-bootstrap/lib/Modal'
import _ from 'lodash'

const PROMOTER_FOLLOW_UP = ':)';
const NEUTRAL_FOLLOW_UP  = ':|';
const DETRACTOR_FOLLOW_UP  = ':(';

const MIN_SCORE = 0;
const MAX_SCORE = 10;
const SCORES = _.range(MIN_SCORE, MAX_SCORE+1);

class NPSModal extends React.Component {

    static propTypes = {
        mainQuestion: React.PropTypes.string.isRequired,
        applicationEndpoint: React.PropTypes.string,
        visible: React.PropTypes.bool.isRequired
    }

    constructor(props) {
        super(props);

        this.state = {
            showFollowUp: false,
            score: null,
            comment: null
        };
    }

    // TODO: Handle close
    render() {
        return (
            <Modal id="nps-modal" bsSize="medium" show={this.props.visible} onHide={}>
                <Modal.Header closeButton />
                <Modal.body>
                    { this.state.showFollowUp ? this.renderFollowUpForm() : this.renderMainQuestion() }
                </Modal.body>
            </Modal>
        );
    }

    renderMainQuestion = () => {
        return (
            <div>
                <div>{this.props.mainQuestion}</div>
                <div>
                    {_.map(SCORES, score => {
                        return (
                            <div key={score} onClick={() => this.onScoreClick(score)}> {score} </div>
                        );
                    })}
                </div>
            </div>
        );
    };

    onScoreClick = (score) => {
        // TODO: Fire event to snoopy
        // TODO: Send data to endpoint

        this.setState({showFollowUp: true, score});
    };

    renderFollowUpForm = () => {
        const followUpQuestion = this.deriveFollowUpQuestion();

        return (
            <form onSubmit={this.onSubmit}>
                <label> {followUpQuestion} </label>
                <input type="text" value={this.state.comment} onChange={this.handleCommentChange()} />
                <input type="submit" value="Submit" />
            </form>

        );
    };

    deriveFollowUpQuestion = () => {
        if (this.state.score < 7) {
            return DETRACTOR_FOLLOW_UP;
        } else if (this.state.score > 8) {
            return PROMOTER_FOLLOW_UP;
        } else {
            return NEUTRAL_FOLLOW_UP;
        }
    };

    handleCommentChange = (event) => {
        this.setState({comment: event.target.value});
    };

    onSubmit = () => {
        // TODO: Fire event to snoopy
        // TODO: Send data to endpoint
    };
}

export default NPSModal
