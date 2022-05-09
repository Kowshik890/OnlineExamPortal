package com.project.onlineexamportal.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.util.HashSet;
import java.util.Set;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class Role {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    private String roleName;
    // One user can have many roles
    // Cascade type is when user is deleted/inserted, its corresponding user role will be automatically deleted/inserted. No need to do manually.
    // FetchType.LAZY is used so that when role is fetched, at the same time user role will not be fetched. When it's needed, then it will be called by method.
    // mappedBy is used so that it can point its related model's column (e.g: role) not the table. If we don't use mappedBy then it will create another table.
    @OneToMany(cascade = CascadeType.ALL, fetch = FetchType.LAZY, mappedBy = "role")
    @JsonIgnore  // If you do not want to get JSON format for this attribute.
    private Set<UserRole> userRoles = new HashSet<>();
}
