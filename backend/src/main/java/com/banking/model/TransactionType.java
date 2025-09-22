package com.banking.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.Set;

/**
 * Entity representing a type of financial transaction in the system.
 */
@Entity
@Table(name = "transaction_types")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@EntityListeners(AuditingEntityListener.class)
public class TransactionType {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank
    @Size(max = 50)
    @Column(name = "name", nullable = false, unique = true)
    private String name;

    @Column(name = "description")
    private String description;

    @OneToMany(mappedBy = "transactionType", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @Builder.Default

    private Set<Transaction> transactions = new HashSet<>();

    @CreatedDate
    @Column(name = "created_at", nullable = false, updatable = false)
    private LocalDateTime createdAt;

    @LastModifiedDate
    @Column(name = "updated_at", nullable = false)
    private LocalDateTime updatedAt;

    /**
     * Helper method to add a transaction to this transaction type.
     *
     * @param transaction The transaction to add
     * @return The updated transaction type
     */
    public TransactionType addTransaction(Transaction transaction) {
        transactions.add(transaction);
        transaction.setTransactionType(this);
        return this;
    }

    /**
     * Helper method to remove a transaction from this transaction type.
     *
     * @param transaction The transaction to remove
     * @return The updated transaction type
     */
    public TransactionType removeTransaction(Transaction transaction) {
        transactions.remove(transaction);
        transaction.setTransactionType(null);
        return this;
    }
}