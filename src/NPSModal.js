import React from 'react'
import Modal from 'react-bootstrap/lib/Modal'
import Button from 'react-bootstrap/lib/Button'
import _ from 'lodash'
import axios from 'axios'

const PROMOTER_FOLLOW_UP = 'We\'re so happy you\'re happy! We\'d love to hear more about your experience:';
const NEUTRAL_FOLLOW_UP  = 'How can we improve your experience?';
const DETRACTOR_FOLLOW_UP  = 'We\'re sorry you feel that way! What is our product missing?';

const MIN_SCORE = 0;
const MAX_SCORE = 10;
const SCORES = _.range(MIN_SCORE, MAX_SCORE+1);

class NPSModal extends React.Component {

    static propTypes = {
        mainQuestion: React.PropTypes.string.isRequired,
        applicationEndpoint: React.PropTypes.string
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
                <Modal.Header closeButton style={{border: "none", paddingBottom: 0}}/>
                <Modal.Body >
                    { this.state.showFollowUp ? this.renderFollowUpForm() : this.renderMainQuestion() }
                </Modal.Body>
            </Modal>
        );
    }

    renderMainQuestion = () => {
        return (
            <div className="text-center">
                <div className="row form-group text-center">
                    <div className="col-xs-12"> {this.props.mainQuestion} </div>
                </div>
                <div className="row text-center form-group">
                    <div className="col-xs-10 col-xs-offset-1">
                        <div className="row">
                            {_.map(SCORES, score => {
                                return (
                                    <div className="col-xs-1">
                                        <div className="btn btn-primary" style={{}} key={score} onClick={() => this.onScoreClick(score)}> {score} </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
                <div className="row form-group">
                    <div className="col-xs-10 col-xs-offset-1">
                        <div className="row">
                            <div className="col-xs-3 text-left">Not likely</div>
                            <div className="col-xs-3 col-xs-offset-6">Very likely</div>
                        </div>
                    </div>
                </div>
            </div>
        );
    };

    onScoreClick = (score) => {
        this.setState({showFollowUp: true, score});
    };

    renderFollowUpForm = () => {
        const followUpQuestion = this.deriveFollowUpQuestion();

        return (
            <div>
                <div className="row form-group">
                    <div className="col-xs-12">{followUpQuestion}</div>
                </div>
                <div className="row form-group">
                    <div className="col-xs-12">
                        <textarea style={{width: "100%"}} value={this.state.comment} onChange={this.handleCommentChange} />
                    </div>
                </div>
                <div className="row form-group">
                    <div className="col-xs-2 col-xs-offset-10">
                        <Button className="btn btn-primary"  onClick={this.close}>Submit</Button>
                    </div>
                </div>
            </div>
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

    close = () => {
        // TODO: Send event to pipeline
        // TODO: Send score and follow up as separate events (in case user closes browser after selecting score)
        if (this.state.score) {
            axios.post(this.props.applicationEndpoint, {score: this.state.score, comment: this.state.comment});
        }
        this.setState({visible: false});
    }
}

export default NPSModal
