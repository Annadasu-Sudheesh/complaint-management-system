package solo.project.demo.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import solo.project.demo.model.ComplaintEntity;
import solo.project.demo.model.UserEntity;

public interface ComplaintRepository extends JpaRepository<ComplaintEntity, Long> {
    List<ComplaintEntity> findByUser(UserEntity user);
}