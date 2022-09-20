package com.project.onlineexamportal.controller;

import com.project.onlineexamportal.model.exam.Question;
import com.project.onlineexamportal.model.exam.Quiz;
import com.project.onlineexamportal.service.QuizService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/quiz")
@AllArgsConstructor
public class QuizController {

    private final QuizService quizService;

    @PostMapping("/add")
    @ResponseStatus(HttpStatus.ACCEPTED)
    public Quiz addQuiz(@RequestBody Quiz quiz) {
        return this.quizService.addQuiz(quiz);
    }

    @GetMapping("/all/desc")
    @ResponseStatus(HttpStatus.OK)
    public List<Quiz> getAllQuizzesDesc() {
        return this.quizService.getAllQuizzesDesc();
    }

    @GetMapping("/all/asc")
    @ResponseStatus(HttpStatus.OK)
    public List<Quiz> getAllQuizzesAsc() {
        return this.quizService.getAllQuizzesAsc();
    }

    // get all Quizzes for specific Category
    @GetMapping("/category/{categoryId}")
    @ResponseStatus(HttpStatus.OK)
    public List<Quiz> getAllQuizzesFromCategory(@PathVariable("categoryId") Long categoryId) {
        return this.quizService.getAllQuizzesFromCategory(categoryId);
    }

    @GetMapping("/{quizId}")
    @ResponseStatus(HttpStatus.OK)
    public Quiz findQuizById(@PathVariable("quizId") Long quizId) {
        return this.quizService.findQuizById(quizId);
    }

    @PutMapping("/{quizId}")
    @ResponseStatus(HttpStatus.OK)
    public Quiz updateQuizById(@PathVariable("quizId") Long quizId, @RequestBody Quiz quiz) {
        return this.quizService.updateQuizById(quizId, quiz);
    }

    @DeleteMapping("/{quizId}")
    @ResponseStatus(HttpStatus.OK)
    public void deleteQuizById(@PathVariable("quizId") Long quizId) {
        System.out.println("inside quiz controller");
        this.quizService.deleteQuizById(quizId);
    }
}
