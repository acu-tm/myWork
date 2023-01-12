package com.ibm.appbe.model;

import lombok.*;

import javax.persistence.*;
import javax.validation.constraints.NotEmpty;
import java.io.Serializable;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Entity
@Table(name = "rooms")
public class Room implements Serializable {
    @Id
    @Column(name = "room_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long roomId;

    @Column(name = "room_name")
    @NotEmpty(message = "Please provide a classroom name")
    private String roomName;

    @Column(name = "room_details")
    private String roomDetails;

    @Column(name = "capacity", nullable = false)
    @NotEmpty(message = "Please provide a number of available places")
    private int capacity;

    @Column(name = "is3d")
    private boolean is3d;
}
