package com.project.onlineexamportal.service;

import com.project.onlineexamportal.model.exam.Quiz;
import com.project.onlineexamportal.repository.QuizRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;

@Service
@AllArgsConstructor
public class QuizService {
    private final QuizRepository quizRepository;

    public Quiz addQuiz(Quiz quiz) {
        return this.quizRepository.save(quiz);
    }

    public List<Quiz> getAllQuizzes() {
        return this.quizRepository.findAll();
    }

    public void deleteQuizById(Long quizId) {
        System.out.println("inside quiz service");
        this.quizRepository.deleteByQuizId(quizId);
    }

    public Quiz updateQuizById(Long quizId, Quiz quiz) {
        Quiz tempQuiz = this.quizRepository.findById(quizId).orElseThrow(() -> new IllegalArgumentException("Cannot find quiz with id - " + quizId));

        tempQuiz.setTitle(quiz.getTitle());
        tempQuiz.setDescription(quiz.getDescription());
        tempQuiz.setMaxMarks(quiz.getMaxMarks());
        tempQuiz.setNumberOfQuestions(quiz.getNumberOfQuestions());
        tempQuiz.setCategory(quiz.getCategory());
        tempQuiz.setActive(quiz.isActive());

        return this.quizRepository.save(tempQuiz);
    }

    public Quiz findQuizById(Long quizId) {
        return this.quizRepository.findById(quizId).orElseThrow(() -> new IllegalArgumentException("Cannot find quiz with id - " + quizId));
    }
}
