package com.hbu.hanbatbox.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.util.matcher.IpAddressMatcher;

@Configuration
public class SecurityConfig {

  @Bean
  public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
    http
        .csrf(csrf -> csrf.disable())
        .authorizeHttpRequests(authz -> authz
            .requestMatchers(new IpAddressMatcher("223.194.160.0/24")).permitAll()
            .requestMatchers(new IpAddressMatcher("0:0:0:0:0:0:0:1")).permitAll()
            .requestMatchers(new IpAddressMatcher("127.0.0.1")).permitAll()
            .requestMatchers(new IpAddressMatcher("::1")).permitAll()
            .anyRequest().denyAll()
        )
        .formLogin(form -> form.disable());

    return http.build();
  }

  @Bean
  public PasswordEncoder passwordEncoder() {
    return new BCryptPasswordEncoder();
  }

}
