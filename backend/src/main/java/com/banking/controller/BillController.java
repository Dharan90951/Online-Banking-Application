package com.banking.controller;

import com.banking.model.Bill;
import com.banking.model.User;
import com.banking.repository.BillRepository;
import com.banking.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

/**
 * Controller for handling bill-related requests.
 */
@RestController
@RequestMapping("/bills")
public class BillController {

    @Autowired
    private BillRepository billRepository;

    @Autowired
    private UserRepository userRepository;

    /**
     * Get all bills for the authenticated user.
     *
     * @return the response entity with the list of bills
     */
    @GetMapping
    public ResponseEntity<?> getAllBills() {
        // For now, just return mock data
        // In a real application, you would get the user from the authentication context
        Optional<User> user = userRepository.findById(1L);
        if (user.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found");
        }
        
        List<Bill> bills = billRepository.findByUser(user.get());
        return ResponseEntity.ok(bills);
    }

    /**
     * Create a new bill for the authenticated user.
     *
     * @param bill the bill to create
     * @return the response entity with the created bill
     */
    @PostMapping
    public ResponseEntity<?> createBill(@RequestBody Bill bill) {
        // For now, just return mock data
        // In a real application, you would get the user from the authentication context
        Optional<User> user = userRepository.findById(1L);
        if (user.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found");
        }
        
        bill.setUser(user.get());
        Bill savedBill = billRepository.save(bill);
        return ResponseEntity.status(HttpStatus.CREATED).body(savedBill);
    }

    /**
     * Update an existing bill.
     *
     * @param id the id of the bill to update
     * @param billDetails the updated bill details
     * @return the response entity with the updated bill
     */
    @PutMapping("/{id}")
    public ResponseEntity<?> updateBill(@PathVariable Long id, @RequestBody Bill billDetails) {
        Optional<Bill> bill = billRepository.findById(id);
        if (bill.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Bill not found");
        }
        
        Bill existingBill = bill.get();
        existingBill.setName(billDetails.getName());
        existingBill.setCategory(billDetails.getCategory());
        existingBill.setAccountNumber(billDetails.getAccountNumber());
        existingBill.setAmount(billDetails.getAmount());
        existingBill.setDueDate(billDetails.getDueDate());
        existingBill.setStatus(billDetails.getStatus());
        existingBill.setIcon(billDetails.getIcon());
        
        Bill updatedBill = billRepository.save(existingBill);
        return ResponseEntity.ok(updatedBill);
    }

    /**
     * Delete a bill.
     *
     * @param id the id of the bill to delete
     * @return the response entity with a success message
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteBill(@PathVariable Long id) {
        Optional<Bill> bill = billRepository.findById(id);
        if (bill.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Bill not found");
        }
        
        billRepository.delete(bill.get());
        
        Map<String, Boolean> response = new HashMap<>();
        response.put("deleted", Boolean.TRUE);
        return ResponseEntity.ok(response);
    }

    /**
     * Pay a bill.
     *
     * @param id the id of the bill to pay
     * @param paymentDetails the payment details
     * @return the response entity with the updated bill
     */
    @PostMapping("/{id}/pay")
    public ResponseEntity<?> payBill(@PathVariable Long id, @RequestBody Map<String, Object> paymentDetails) {
        Optional<Bill> bill = billRepository.findById(id);
        if (bill.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Bill not found");
        }
        
        Bill existingBill = bill.get();
        existingBill.setStatus("PAID");
        
billRepository.save(existingBill);
        
        Map<String, Object> response = new HashMap<>();
        response.put("message", "Bill payment successful");
        response.put("billId", id);
        response.put("status", "PAID");
        return ResponseEntity.ok(response);
    }
}