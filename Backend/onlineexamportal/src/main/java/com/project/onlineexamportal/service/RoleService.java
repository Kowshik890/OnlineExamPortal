package com.project.onlineexamportal.service;

import com.project.onlineexamportal.model.Role;
import com.project.onlineexamportal.repository.RoleRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class RoleService {

    private final RoleRepository roleRepository;

    public Role createRole(Role role) {
        return this.roleRepository.save(role);
    }

    public Role findById(Long id) {
        return this.roleRepository.findById(id).orElseThrow(() -> new IllegalArgumentException("Cannot find role with id - " + id));
    }
}
