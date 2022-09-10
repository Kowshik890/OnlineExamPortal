package com.project.onlineexamportal.model.exam;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.util.LinkedHashSet;
import java.util.Set;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class Category {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    private String title;
    private String description;
    @OneToMany(cascade = CascadeType.ALL, mappedBy = "category")   // fetch = FetchType.EAGER is removed due to causing issue while deleting quiz
    @JsonIgnore
    private Set<Quiz> quizzes = new LinkedHashSet<>(); // here there will be no columns for quizzes. that's why mappedBy = "category"

}
