package solo.project.demo.controller;

import java.io.File;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import solo.project.demo.model.ComplaintEntity;
import solo.project.demo.service.ComplaintService;

@RestController
@CrossOrigin(origins = "http://localhost:5173")
public class ComplaintController {

    @Autowired
    private ComplaintService complaintService;

    // ✅ ADD COMPLAINT WITH FILE UPLOAD
    @PostMapping("/complaints")
    public ComplaintEntity addComplaint(
            @RequestParam("title") String title,
            @RequestParam("description") String description,
            @RequestParam("userId") Long userId,
            @RequestParam(value = "file", required = false) MultipartFile file
    ) {

        String filePath = null;

        try {
            if (file != null && !file.isEmpty()) {

                String uploadDir = "uploads/";
                File dir = new File(uploadDir);

                if (!dir.exists()) {
                    dir.mkdirs();
                }

                String fileName = System.currentTimeMillis() + "_" + file.getOriginalFilename();

                File destination = new File(uploadDir + fileName);

                file.transferTo(destination.getAbsoluteFile());

                filePath = uploadDir + fileName;
            }

        } catch (Exception e) {
            e.printStackTrace();
            throw new RuntimeException("File upload failed: " + e.getMessage());
        }

        // 🔥🔥 THIS WAS MISSING (VERY IMPORTANT)
        return complaintService.addComplaintWithFile(title, description, userId, filePath);
    }

    // ✅ GET USER COMPLAINTS
    @GetMapping("/complaints/{userId}")
    public List<ComplaintEntity> getUserComplaints(@PathVariable Long userId) {
        return complaintService.getUserComplaints(userId);
    }

    // ✅ GET ALL COMPLAINTS
    @GetMapping("/all-complaints")
    public List<ComplaintEntity> getAllComplaints() {
        return complaintService.getAllComplaints();
    }

    // ✅ UPDATE STATUS
    @PutMapping("/complaints/{id}")
    public ComplaintEntity updateComplaint(@PathVariable Long id, @RequestBody ComplaintEntity c) {
        return complaintService.updateComplaint(id, c);
    }
}