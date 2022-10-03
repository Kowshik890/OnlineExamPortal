package com.project.onlineexamportal.model.exam;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class Question {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    @Column(length = 5000)
    private String content;
    private String image;
    @Column(length = 5000)
    private String option1;
    @Column(length = 5000)
    private String option2;
    @Column(length = 5000)
    private String option3;
    @Column(length = 5000)
    private String option4;
    private String answer;
    @Transient
    private String givenAnswer;
    @ManyToOne(fetch = FetchType.EAGER)   // one quiz may have many questions
    private Quiz quiz;
}
