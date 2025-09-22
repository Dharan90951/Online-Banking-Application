package com.banking.repository;

import com.banking.model.Bill;
import com.banking.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * Repository for managing Bill entities.
 */
@Repository
public interface BillRepository extends JpaRepository<Bill, Long> {
    
    /**
     * Find all bills belonging to a specific user.
     *
     * @param user the user whose bills to find
     * @return a list of bills belonging to the user
     */
    List<Bill> findByUser(User user);
    
    /**
     * Find all bills belonging to a specific user and having a specific status.
     *
     * @param user the user whose bills to find
     * @param status the status of the bills to find
     * @return a list of bills belonging to the user with the specified status
     */
    List<Bill> findByUserAndStatus(User user, String status);
}