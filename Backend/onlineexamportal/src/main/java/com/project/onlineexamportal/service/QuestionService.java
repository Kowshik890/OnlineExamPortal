package com.project.onlineexamportal.service;

import com.project.onlineexamportal.model.exam.Question;
import com.project.onlineexamportal.model.exam.Quiz;
import com.project.onlineexamportal.repository.QuestionRepository;
import com.project.onlineexamportal.repository.QuizRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Set;

@Service
@AllArgsConstructor
public class QuestionService {

    private final QuestionRepository questionRepository;
    private final QuizRepository quizRepository;

    public Question addQuestion(Question question) {
        return this.questionRepository.save(question);
    }

    public Question getQuestionById(Long questionId) {
        return this.questionRepository.findById(questionId).orElseThrow(() -> new IllegalArgumentException("Cannot find question with id - " + questionId));
    }

    public Question updateQuestionById(Long questionId, Question question) {
        Question tempQuestion = this.questionRepository.findById(questionId).orElseThrow(() -> new IllegalArgumentException("Cannot find question with id - " + questionId));

        tempQuestion.setContent(question.getContent());
        tempQuestion.setImage(question.getImage());
        tempQuestion.setQuiz(question.getQuiz());
        tempQuestion.setOption1(question.getOption1());
        tempQuestion.setOption2(question.getOption2());
        tempQuestion.setOption3(question.getOption3());
        tempQuestion.setOption4(question.getOption4());

        return this.questionRepository.save(tempQuestion);
    }

    public void deleteQuestionById(Long questionId) {
        this.questionRepository.deleteById(questionId);
    }

    // return list of questions from quizId (based on Number of Questions from Quiz)
    public List<Question> getQuestionsOfQuiz(Long quizId) {
        Quiz quiz = this.quizRepository.findById(quizId).orElseThrow(() -> new IllegalArgumentException("Cannot find question with id - " + quizId));
       Set<Question> questions = quiz.getQuestions();
       List questionList = new ArrayList(questions);
       if(questionList.size()> quiz.getNumberOfQuestions()) {    // check the Number of Questions of a quiz is greater or not than total number of questions of that quiz
           questionList = questionList.subList(0, quiz.getNumberOfQuestions()+1);
       }
       Collections.shuffle(questionList);   // shuffle the questions
       return questionList;
    }

    public List<Question> getALLQuestionsOfQuizAdmin(Long quizId) {
        Quiz quiz = new Quiz();
        quiz.setId(quizId);
        List<Question> questionsOfQuiz = this.questionRepository.findByQuiz(quiz);
        return questionsOfQuiz;
    }
}
