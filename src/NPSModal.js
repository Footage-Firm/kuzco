import React from 'react'
import Modal from 'react-bootstrap/lib/Modal'
import Button from 'react-bootstrap/lib/Button'

class NPSModal extends React.Component {

    static propTypes = {
        header: React.PropTypes.string,
        modalClassName: React.PropTypes.string,
        mainQuestion: React.PropTypes.string.isRequired,
        promoterFollowUpQuestion: React.PropTypes.string.isRequired,
        neutralFollowUpQuestion: React.PropTypes.string.isRequired,
        detractorFollowUpQuestion: React.PropTypes.string.isRequired,

        maxScore: React.PropTypes.number.isRequired,
        detractorUpperBound: React.PropTypes.number.isRequired,
        promoterLowerBound: React.PropTypes.number.isRequired,
        minScoreBlurb: React.PropTypes.string,
        maxScoreBlurb: React.PropTypes.string,

        onScoreClick: React.PropTypes.func.isRequired,
        onCommentSubmit: React.PropTypes.func.isRequired
    };

    static defaultProps = {
        header: '',
        modalClassName: "general",
        minScoreBlurb: "Not likely",
        maxScoreBlurb: "Very likely"
    };

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
                <Modal.Body  className={this.props.modalClassName}>
                    { this.state.showFollowUp ? this.renderFollowUpForm() : this.renderMainQuestion() }
                </Modal.Body>
            </Modal>
        );
    }

    renderMainQuestion() {

        const {
            header,
            mainQuestion,
            minScoreBlurb,
            maxScoreBlurb
        } = this.props;
        return (
            <div>
                {header !== '' &&
                    <div className="centered-row"><h1>{header}</h1></div>
                }
                <div className="centered-row"> {mainQuestion} </div>
                <div className="centered-row" style={{marginBottom: "32px"}}>
                    {this.state.scoreRange.map(score => {
                        return (
                            <div key={score} className="score">
                                <div className={this.state.score!== null && this.state.score >= score ? "btn btn-primary" : "btn btn-default"}
                                     onMouseEnter={() => this.onMouseEnter(score)}
                                     onMouseLeave={() => this.onMouseLeave()}
                                     onClick={() => this.onScoreClick(score)}> {score} </div>
                                {score === 0 ? <div className="score-label">{minScoreBlurb}</div> : ''}
                                {score === 10 ? <div className="score-label" style={{right: "11%"}}>{ maxScoreBlurb}</div> : ''}
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
