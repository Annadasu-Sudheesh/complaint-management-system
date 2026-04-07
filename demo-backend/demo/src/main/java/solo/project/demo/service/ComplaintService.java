package solo.project.demo.service;

import java.time.LocalDateTime;
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

    // ✅ OPTIONAL (NORMAL ADD)
    public ComplaintEntity addComplaint(ComplaintEntity complaint) {

        Long userId = complaint.getUser().getId();

        UserEntity existingUser = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found with id: " + userId));

        complaint.setUser(existingUser);

        return complaintRepository.save(complaint);
    }

    // ✅ FILE UPLOAD METHOD
    public ComplaintEntity addComplaintWithFile(String title, String description, Long userId, String filePath) {

        UserEntity user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        ComplaintEntity complaint = new ComplaintEntity();

        complaint.setTitle(title);
        complaint.setDescription(description);

        // 🔥 CREATED TIME
        complaint.setCreatedAt(LocalDateTime.now());

        // ✅ DEFAULT VALUES
        complaint.setStatus("Pending");
        complaint.setPriority("Low");
        complaint.setRemark(null);

        complaint.setUser(user);

        if (filePath != null) {
            complaint.setFilePath(filePath);
        }

        return complaintRepository.save(complaint);
    }

    // ✅ GET USER COMPLAINTS
    public List<ComplaintEntity> getUserComplaints(Long userId) {

        UserEntity user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found with id: " + userId));

        return complaintRepository.findByUser(user);
    }

    // ✅ GET ALL COMPLAINTS (ADMIN)
    public List<ComplaintEntity> getAllComplaints() {
        return complaintRepository.findAll();
    }

    // ✅ UPDATE STATUS + PRIORITY + REMARK + RESOLVED TIME
    public ComplaintEntity updateComplaint(Long id, ComplaintEntity c) {

        ComplaintEntity complaint = complaintRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Complaint not found"));

        // 🚫 Prevent changes after resolved
        if ("Resolved".equalsIgnoreCase(complaint.getStatus())) {
            throw new RuntimeException("Cannot modify resolved complaint");
        }

        // ✅ STATUS UPDATE
        if (c.getStatus() != null) {

            complaint.setStatus(c.getStatus());

            // 🔥 ADD RESOLVED TIME
            if ("Resolved".equalsIgnoreCase(c.getStatus())) {
                complaint.setResolvedAt(LocalDateTime.now());
            }
        }

        // ✅ PRIORITY UPDATE
        if (c.getPriority() != null) {
            complaint.setPriority(c.getPriority());
        }

        // ✅ REMARK UPDATE
        if (c.getRemark() != null) {
            complaint.setRemark(c.getRemark());
        }

        return complaintRepository.save(complaint);
    }
}