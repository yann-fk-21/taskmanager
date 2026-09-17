package com.taskmanager.backend;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.security.authentication.AuthenticationManager;

import static org.junit.jupiter.api.Assertions.assertNotNull;

@SpringBootTest
class BackendApplicationTests {

    @Autowired
    private AuthenticationManager authenticationManager;

    @Test
    void contextLoads() {
        assertNotNull(authenticationManager);
    }
}
