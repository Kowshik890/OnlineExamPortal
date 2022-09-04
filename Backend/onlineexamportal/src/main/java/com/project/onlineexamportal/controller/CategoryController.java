package com.project.onlineexamportal.controller;

import com.project.onlineexamportal.model.User;
import com.project.onlineexamportal.model.exam.Category;
import com.project.onlineexamportal.service.CategoryService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/category")
@AllArgsConstructor
public class CategoryController {

    private final CategoryService categoryService;

    @PostMapping("/add")
    @ResponseStatus(HttpStatus.ACCEPTED)
    public Category createCategory(@RequestBody Category category) {
        System.out.println("title: " + category.getTitle());
        return this.categoryService.addCategory(category);
    }

    @GetMapping("/{categoryId}")
    @ResponseStatus(HttpStatus.OK)
    public Category findCategoryById(@PathVariable("categoryId") Long categoryId) {
        return this.categoryService.findCategoryById(categoryId);
    }

    @GetMapping("/all")
    @ResponseStatus(HttpStatus.OK)
    public List<Category> findAllCategories() {
        return this.categoryService.getAllCategories();
    }

    @DeleteMapping("/{categoryId}")
    @ResponseStatus(HttpStatus.OK)
    public void deleteCategoryById(@PathVariable("categoryId") Long categoryId) {
        this.categoryService.deleteCategoryById(categoryId);
    }

    @PutMapping("/{categoryId}")
    @ResponseStatus(HttpStatus.OK)
    public Category updateCategoryById(@PathVariable("categoryId") Long categoryId, @RequestBody Category category) {
        return this.categoryService.updateCategoryById(categoryId, category);
    }
}
