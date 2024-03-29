package com.project.onlineexamportal.repository;

import com.project.onlineexamportal.model.exam.Category;
import com.project.onlineexamportal.model.exam.Question;
import com.project.onlineexamportal.model.exam.Quiz;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import javax.transaction.Transactional;
import java.util.List;

@Repository
public interface QuizRepository extends JpaRepository<Quiz, Long> {
    List<Quiz> findAllByOrderByIdDesc();

    List<Quiz> findByCategoryAndActive(Category category, Boolean _boolean);

    List<Quiz> findByActive(Boolean _boolean);

    // Custom Delete Method using Delete Query
    /*@Transactional
    @Modifying
    @Query(value = "DELETE FROM quiz WHERE id=?1", nativeQuery = true)
    public void deleteByQuizId(Long quizId);*/
}
