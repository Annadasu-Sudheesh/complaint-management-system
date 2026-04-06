package solo.project.demo.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import solo.project.demo.model.ComplaintEntity;
import solo.project.demo.service.ComplaintService;

@RestController
@CrossOrigin(origins = "http://localhost:5173")
public class ComplaintController {

    @Autowired
    private ComplaintService complaintService;

    @PostMapping("/complaints")
    public ComplaintEntity addComplaint(@RequestBody ComplaintEntity complaint) {
        return complaintService.addComplaint(complaint);
    }

    @GetMapping("/complaints/{userId}")
    public List<ComplaintEntity> getUserComplaints(@PathVariable Long userId) {
        return complaintService.getUserComplaints(userId);
    }

    @GetMapping("/all-complaints")
    public List<ComplaintEntity> getAllComplaints() {
        return complaintService.getAllComplaints();
    }

    @PutMapping("/complaints/{id}")
    public ComplaintEntity updateComplaint(@PathVariable Long id, @RequestBody ComplaintEntity c) {
        return complaintService.updateComplaint(id, c);
    }
}