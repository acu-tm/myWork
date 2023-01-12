package com.ibm.appbe.service.crud;

import com.ibm.appbe.model.Room;
import com.ibm.appbe.repository.RoomRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.webjars.NotFoundException;

import java.util.List;

@Service
public class ClassroomService {
    private final static Logger LOG = LoggerFactory.getLogger(ClassroomService.class);

    private final RoomRepository roomRepository;

    @Autowired
    public ClassroomService(final RoomRepository roomRepository) {
        this.roomRepository = roomRepository;
    }

    //get a list with all classroom records
    public List<Room> getAllClassroom() {
        return roomRepository.findAll();
    }

    //get a specific classroom by id
    public Room getClassroomById(long id) {
        return roomRepository.findById(id).orElseThrow(() -> new NotFoundException("** Classroom not found by id :: " + id));
    }

    // add a new classroom
    public Room createClassroom(Room room) {
        room = roomRepository.save(room);
        LOG.info("Classroom {} Successfully created", room.getRoomId());
        return room;
    }

    // update classroom by id
    public Room updateClassroom(Long id, Room room) {
        roomRepository.findById(id).orElseThrow(() -> new NotFoundException("** Classroom not found by id :: " + id));
        room.setRoomId(id);
        return roomRepository.save(room);
    }

    // delete a specific classroom by id
    public void removeClassroom(Long id) {
        Room room = roomRepository.findById(id).orElseThrow(() -> new NotFoundException("** Classroom not found by id :: " + id));
        roomRepository.delete(room);
    }

}
