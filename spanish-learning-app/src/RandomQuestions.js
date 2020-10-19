import questionsData from "./resources/questions.json";
import Box from "@material-ui/core/Box";
import TextField from '@material-ui/core/TextField';
import {Button} from "@material-ui/core";
import React, { useState } from 'react';
import {makeStyles} from "@material-ui/core/styles";
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';

const images = require.context('../public/pictures', true);
const questions = questionsData;
let randomNumber = Math.floor(Math.random() * (questions.length - 1));
let currentQuestion = questions.find(q => q.id === randomNumber);

const useStyles = makeStyles({
    answerButton: {
        background: 'linear-gradient(90deg, rgba(255,218,46,1) 0%, rgba(255,181,70,1) 52%, rgba(238,129,19,1) 100%)',
        border: 0,
        borderRadius: 3,
        boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
        color: '#444239',
        fontWeight: 'bold',
        height: 48,
        padding: '0 30px',
    },
    card: {
        minWidth: '40%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    container: {
        display: 'flex',
        height: '100%'
    }
});

function RandomQuestions() {
    const classes = useStyles();
    const [answer, setAnswer] = useState('');
    const [isFormInvalid, setIsFormInvalid] = useState(false);
    const [answerSuccess, setAnswerSuccess] = useState('');
    const [question, setQuestion] = useState(currentQuestion);
    const [pic, setPic] = useState(images('./' + currentQuestion.pic));

    const validate = () => {
        setIsFormInvalid(!question.spanish.includes(answer));
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        let successMsg = isFormInvalid === false ? "SIKER!" : "ROSSZ VÁLASZ";
        setAnswerSuccess(successMsg);
        setAnswer('');

        if(!isFormInvalid) {
            let newRandomNum = Math.floor(Math.random() * (questions.length - 1));
            setQuestion(questions.find(q => q.id === newRandomNum));
            setPic(images('./' + question.pic));
        }
    };

    const handleChange = (event) => {
        setAnswer(event.target.value);
    }

    return(
        <Box className={classes.container}
             bgcolor="text.secondary"
             justifyContent="center"
             alignItems="center">
            <Card className={classes.card} variant="outlined">
                <CardContent>
                    <img
                        className={classes.questionImage}
                        src={pic}
                        alt="Question image"
                    />
                    <form onSubmit={handleSubmit} autoComplete="off">
                        <TextField id="outlined-basic"
                                   error={isFormInvalid}
                                   label="A kép mit ábrázol spanyolul?"
                                   variant="outlined"
                                   value={answer}
                                   onChange={handleChange} />
                        <CardActions>
                            <Button className={classes.answerButton} type={"submit"} onClick={validate}>Válaszolj</Button>
                        </CardActions>
                        <p hidden={!answerSuccess}>{answerSuccess}</p>
            </form>
                </CardContent>
            </Card>
        </Box>);
};

// class RandomQuestions extends Component {
//     constructor(props) {
//         super(props);
//         this.state = {
//             answer: '',
//             isFormInvalid: false,
//             answerSuccess: ''
//         }
//         this.handleSubmit = this.handleSubmit.bind(this);
//         this.handleChange = this.handleChange.bind(this);
//         this.validate = this.validate.bind(this);
//         this.randomNumber = Math.floor(Math.random() * (questions.length - 1));
//         this.currentQuestion = questions.find(q => q.id === this.randomNumber);
//         this.currentPic = images('./' + this.currentQuestion.pic);
//     }
//
//     validate() {
//         this.setState( { isFormInvalid: !this.currentQuestion.spanish.includes(this.state.answer)} );
//     }
//
//     handleSubmit(e) {
//         e.preventDefault();
//         let successMsg = this.state.isFormInvalid === false ? "SIKER!" : "ROSSZ VÁLASZ";
//         this.setState({ answerSuccess: successMsg, answer: ''})
//     };
//
//     handleChange(event) {
//         this.setState({answer: event.target.value});
//     }
//
//     render() {
//         return(
//             <Box bgcolor="warning.main">
//                 <img src={this.currentPic}/>
//                 <form onSubmit={this.handleSubmit} autoComplete="off">
//                     <TextField id="outlined-basic"
//                                error={this.state.isFormInvalid}
//                                label="A kép mit ábrázol spanyolul?"
//                                variant="outlined"
//                                value={this.state.answer}
//                                 onChange={this.handleChange}/>
//                     <Button type={"submit"} onClick={this.validate}>Válaszolj</Button>
//                     <p hidden={!this.state.answerSuccess}>{this.state.answerSuccess}</p>
//                 </form>
//             </Box>);
//     }



    //Kérdezze le a listából a lehetséges kérdéseket
    //Válasszon ki egyet véletlenszerűen
    //Jelenítse meg a feladatot
    // Feladat:
    // Kép
    // input field
    // submit gomb
    // új feladat gomb
    // megoldás jó/rossz
// }

export default RandomQuestions;