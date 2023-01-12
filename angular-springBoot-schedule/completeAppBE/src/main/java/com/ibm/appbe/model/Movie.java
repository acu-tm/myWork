package com.ibm.appbe.model;

import lombok.*;

import javax.persistence.*;
import javax.validation.constraints.NotEmpty;
import java.io.Serializable;
import java.time.LocalDate;
import java.time.LocalTime;
import java.util.HashSet;
import java.util.Objects;
import java.util.Set;

import static com.ibm.appbe.config.HardcodedLabels.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Entity
@Table(name = "movies")
public class Movie implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "movie_id")
    private Long movieId;

    @Column(name = "movie_name")
    @NotEmpty(message = "Please provide a courseName")
    private String movieName;

    @Column(name = "start_date")
//    @Temporal(TemporalType.DATE)
//    @JsonFormat(pattern="yyyy-MM-dd")
    private LocalDate startDate;

    @Column(name = "start_time")
//    @Temporal(TemporalType.TIME)
//    @JsonFormat(pattern="HH:mm")
    private LocalTime startTime;

    @Column(name = "end_time")
//    @Temporal(TemporalType.TIME)
//    @JsonFormat(pattern="HH:mm")
    private LocalTime endTime;

    @Column(name = "room")
    private ROOM room;

    @Column(name = "capacity", nullable = false)
    private int capacity;

    @Column(name = "is3d")
    private boolean is3d;

    @ManyToMany(fetch = FetchType.EAGER, cascade = CascadeType.ALL)
    @JoinTable(
            name = "movie_user",
            joinColumns = { @JoinColumn(name = "movie_id", nullable = false, updatable = false) },
            inverseJoinColumns = { @JoinColumn(name = "user_id", nullable = false, updatable = false)
    })
    private Set<User> subscribers = new HashSet<>();

    // override necesare pentru comparare obiecte stateless - not references to object:  need to worry about it if your entity will be part of a Set
    // comparatie limitata la id
    @Override
    public boolean equals(Object obj) {
        if (this == obj) { return true; }
        if (obj == null) { return false; }
        if (getClass() != obj.getClass()) { return false; };

        Movie other = (Movie) obj;
        return Objects.equals(movieName, other.getMovieName());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(movieName);
    }

}
