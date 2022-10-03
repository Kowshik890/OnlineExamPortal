package com.project.onlineexamportal.controller;

import com.project.onlineexamportal.model.exam.Question;
import com.project.onlineexamportal.model.exam.Quiz;
import com.project.onlineexamportal.service.QuestionService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/question")
@AllArgsConstructor
public class QuestionController {

    private final QuestionService questionService;

    @PostMapping("/add")
    @ResponseStatus(HttpStatus.ACCEPTED)
    public Question addQuestion(@RequestBody Question question) {
        return this.questionService.addQuestion(question);
    }

    @GetMapping("/{questionId}")
    @ResponseStatus(HttpStatus.OK)
    public Question getQuestionById(@PathVariable("questionId") Long questionId) {
        return this.questionService.getQuestionById(questionId);
    }

    // get all question of any Quiz
    @GetMapping("/quiz/{quizId}")
    @ResponseStatus(HttpStatus.OK)
    public List<Question> getQuestionsOfQuiz(@PathVariable("quizId") Long quizId) {
        return this.questionService.getQuestionsOfQuiz(quizId);
    }

    // get all question of any Quiz for Admin
    @GetMapping("/quiz/all/{quizId}")
    @ResponseStatus(HttpStatus.OK)
    public List<Question> getAllQuestionsOfQuizAdmin(@PathVariable("quizId") Long quizId) {
        return this.questionService.getALLQuestionsOfQuizAdmin(quizId);
    }

    // evaluate-quiz
    @PostMapping("/evaluate-quiz")
    @ResponseStatus(HttpStatus.OK)
    public Map<String, Object> evaluateQuiz(@RequestBody List<Question> questions) {
        double marksGot = 0;
        int correctAnswer = 0;
        int attempted = 0;
        for (Question q: questions) {
            // single questions
            Question question = this.questionService.getQuestionById(q.getId());

            if (question.getAnswer().equals(q.getGivenAnswer())) {
                correctAnswer++;
                double marksSingle = questions.get(0).getQuiz().getMaxMarks()/questions.size();
                marksGot += marksSingle;
            }
            if (q.getGivenAnswer() != null) {
                attempted++;
            }
        }

        Map<String, Object> map = Map.of("marksGot", marksGot, "correctAnswer", correctAnswer, "attempted", attempted);
        return map;
    }

    @PutMapping("/{questionId}")
    @ResponseStatus(HttpStatus.OK)
    public Question updateQuestionById(@PathVariable("questionId") Long questionId, @RequestBody Question question) {
        return this.questionService.updateQuestionById(questionId, question);
    }

    @DeleteMapping("/{questionId}")
    @ResponseStatus(HttpStatus.OK)
    public void deleteQuestionById(@PathVariable("questionId") Long questionId) {
        this.questionService.deleteQuestionById(questionId);
    }
}
