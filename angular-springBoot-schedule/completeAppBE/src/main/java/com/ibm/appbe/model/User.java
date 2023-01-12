package com.ibm.appbe.model;

import com.ibm.appbe.config.HardcodedLabels.*;
import lombok.*;

import javax.persistence.*;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotEmpty;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Objects;
import java.util.Set;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Entity
@Table(name = "users")
public class User implements Serializable {
    @Id
    @Column(name = "user_id")
    @GeneratedValue(strategy= GenerationType.IDENTITY)
    private Long userId;

    @Column(name = "login_name", nullable = false, unique = true)
    @NotEmpty(message = "User login name is mandatory")
    private String loginName;

    @Column(name = "password")
    private String password;

    @Column(name = "full_name", nullable = false)
    @NotEmpty(message = "User full name is mandatory")
    private String fullName;

    @Column(name = "email")
    @Email
    private String email;

    @Enumerated(EnumType.STRING)
    @Column(name = "role", length = 32, nullable = false)
    //@NotEmpty(message = "User ROLE is mandatory")
    private ROLE role;

    @Enumerated(EnumType.STRING)
    @Column(name = "preference", length = 32)
    private GENRE preference;

    @ManyToMany(fetch = FetchType.EAGER, mappedBy = "subscribers", cascade = CascadeType.ALL)
    private Set<Movie> subscriptions = new HashSet<>();

    @Override
    public boolean equals(Object obj) {
        if (this == obj) { return true; }
        if (obj == null) { return false; }
        if (getClass() != obj.getClass()) { return false; };

        User other = (User) obj;
        return Objects.equals(loginName, other.getLoginName());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(loginName);
    }

}
