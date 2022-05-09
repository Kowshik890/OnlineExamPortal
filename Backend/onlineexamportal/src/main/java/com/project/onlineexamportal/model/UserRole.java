package com.project.onlineexamportal.model;

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
public class UserRole {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    // Many roles are belongs to one user
    @ManyToOne(fetch = FetchType.EAGER)
    private User user;
    @ManyToOne   // Many roles are belongs to one role id
    private Role role;
}
