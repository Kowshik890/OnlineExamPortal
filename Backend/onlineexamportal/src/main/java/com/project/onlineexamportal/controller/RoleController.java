package com.project.onlineexamportal.controller;

import com.project.onlineexamportal.model.Role;
import com.project.onlineexamportal.service.RoleService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/role")
@AllArgsConstructor
public class RoleController {

    private final RoleService roleService;

    @PostMapping("/")
    @ResponseStatus(HttpStatus.ACCEPTED)
    public Role createRole(@RequestBody Role role) {
        return this.roleService.createRole(role);
    }
}
