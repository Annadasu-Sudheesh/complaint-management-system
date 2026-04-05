package solo.project.demo.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import solo.project.demo.model.ComplaintEntity;
import solo.project.demo.model.UserEntity;
import solo.project.demo.repository.ComplaintRepository;
import solo.project.demo.repository.UserRepository;

@RestController
@CrossOrigin(origins = "http://localhost:5173")
public class ComplaintController {

    @Autowired
    private ComplaintRepository complaintRepository;

    @Autowired
    private UserRepository userRepository;

    // FIXED: Manually link the user from the database before saving
    @PostMapping("/complaints")
    public ComplaintEntity addComplaint(@RequestBody ComplaintEntity complaint) {
        // 1. Get the ID of the user sent from the frontend
        Long userId = complaint.getUser().getId();
        
        // 2. Look up that user in your MySQL database
        UserEntity existingUser = userRepository.findById(userId)
            .orElseThrow(() -> new RuntimeException("User not found with id: " + userId));
        
        // 3. Set the 'managed' user back into the complaint
        complaint.setUser(existingUser);
        
        // 4. Now save it (This prevents the 'TransientPropertyValueException')
        return complaintRepository.save(complaint);
    }

    @GetMapping("/complaints/{userId}")
    public List<ComplaintEntity> getUserComplaints(@PathVariable Long userId) {
        UserEntity user = userRepository.findById(userId).get();
        return complaintRepository.findByUser(user);
    }

    @GetMapping("/all-complaints")
    public List<ComplaintEntity> getAllComplaints() {
        return complaintRepository.findAll();
    }

    @PutMapping("/complaints/{id}")
    public ComplaintEntity updateComplaint(@PathVariable Long id, @RequestBody ComplaintEntity c) {
        ComplaintEntity complaint = complaintRepository.findById(id).get();
        complaint.setStatus(c.getStatus());
        
        // Make sure your ComplaintEntity.java has these fields!
        if(c.getRemark() != null) complaint.setRemark(c.getRemark());
        if(c.getPriority() != null) complaint.setPriority(c.getPriority());
        
        return complaintRepository.save(complaint);
    }
}