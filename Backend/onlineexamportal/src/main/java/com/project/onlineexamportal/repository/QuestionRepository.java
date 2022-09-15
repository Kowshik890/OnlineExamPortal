package com.project.onlineexamportal.repository;

import com.project.onlineexamportal.model.exam.Question;
import com.project.onlineexamportal.model.exam.Quiz;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface QuestionRepository extends JpaRepository<Question, Long> {
    List<Question> findByQuiz(Quiz quiz);
}
