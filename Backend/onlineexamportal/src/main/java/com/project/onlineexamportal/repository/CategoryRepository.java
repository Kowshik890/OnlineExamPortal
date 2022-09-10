package com.project.onlineexamportal.repository;

import com.project.onlineexamportal.model.exam.Category;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CategoryRepository extends JpaRepository<Category, Long> {
    List<Category> findAllByOrderByIdDesc();
}
