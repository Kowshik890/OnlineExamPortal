package com.project.onlineexamportal.service;

import com.project.onlineexamportal.model.exam.Category;
import com.project.onlineexamportal.repository.CategoryRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor
public class CategoryService {
    private final CategoryRepository categoryRepository;

    public Category addCategory(Category category) {
        return this.categoryRepository.save(category);
    }

    public List<Category> getAllCategoriesDesc() {
        return this.categoryRepository.findAllByOrderByIdDesc();
    }

    public List<Category> getAllCategoriesAsc() {
        return this.categoryRepository.findAll();
    }

    public void deleteCategoryById(Long categoryId) {
        this.categoryRepository.deleteById(categoryId);
    }

    public Category updateCategoryById(Long categoryId, Category category) {
        Category tempCategory = this.categoryRepository.findById(categoryId).orElseThrow(() -> new IllegalArgumentException("Cannot find category with id - " + categoryId));

        tempCategory.setTitle(category.getTitle());
        tempCategory.setDescription(category.getDescription());

        return this.categoryRepository.save(tempCategory);
    }

    public Category findCategoryById(Long categoryId) {
        return this.categoryRepository.findById(categoryId).orElseThrow(() -> new IllegalArgumentException("Cannot find category with id - " + categoryId));
    }
}
