package solo.project.demo.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import solo.project.demo.model.ComplaintEntity;
import solo.project.demo.model.UserEntity;
import solo.project.demo.repository.ComplaintRepository;
import solo.project.demo.repository.UserRepository;

@Service
public class ComplaintService {

    @Autowired
    private ComplaintRepository complaintRepository;

    @Autowired
    private UserRepository userRepository;

    // Add complaint
    public ComplaintEntity addComplaint(ComplaintEntity complaint) {
        Long userId = complaint.getUser().getId();

        UserEntity existingUser = userRepository.findById(userId)
            .orElseThrow(() -> new RuntimeException("User not found"));

        complaint.setUser(existingUser);

        return complaintRepository.save(complaint);
    }

    // Get complaints by user
    public List<ComplaintEntity> getUserComplaints(Long userId) {
        UserEntity user = userRepository.findById(userId).get();
        return complaintRepository.findByUser(user);
    }

    // Get all complaints
    public List<ComplaintEntity> getAllComplaints() {
        return complaintRepository.findAll();
    }

    // Update complaint
    public ComplaintEntity updateComplaint(Long id, ComplaintEntity c) {
        ComplaintEntity complaint = complaintRepository.findById(id).get();

        complaint.setStatus(c.getStatus());

        if (c.getRemark() != null)
            complaint.setRemark(c.getRemark());

        if (c.getPriority() != null)
            complaint.setPriority(c.getPriority());

        return complaintRepository.save(complaint);
    }
}