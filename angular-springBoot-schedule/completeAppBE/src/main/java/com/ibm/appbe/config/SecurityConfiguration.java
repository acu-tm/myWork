package com.ibm.appbe.config;

import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;

public class SecurityConfiguration extends WebSecurityConfigurerAdapter {

    @Override
    protected void configure(AuthenticationManagerBuilder auth) throws Exception{

    }

    @Override
    protected void configure(HttpSecurity http) throws Exception {

        //http.httpBasic().disable();

        http.authorizeRequests()
                .antMatchers("/admin").hasRole("ADMIN")
                .antMatchers("/puser").hasAnyRole("ADMIN", "INSTRUCTOR")
                .antMatchers("/user").hasAnyRole("ADMIN", "INSTRUCTOR", "STUDENT")
                .antMatchers("/").permitAll()
                .and().formLogin();
    }


}
