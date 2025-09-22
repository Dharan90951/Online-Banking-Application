package com.banking.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.Set;

/**
 * Entity representing a bank account in the system.
 */
@Entity
@Table(name = "accounts")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@EntityListeners(AuditingEntityListener.class)
public class Account {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank
    @Size(max = 20)
    @Column(name = "account_number", nullable = false, unique = true)
    private String accountNumber;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "account_type_id", nullable = false)
    private AccountType accountType;

    @NotNull
    @Column(name = "balance", nullable = false)
    private BigDecimal balance;

    @NotBlank
    @Size(min = 3, max = 3)
    @Column(name = "currency", nullable = false)
    private String currency;

    @Column(name = "is_active", nullable = false)
    private boolean isActive;

    @Column(name = "opened_date", nullable = false)
    private LocalDateTime openedDate;

    @Column(name = "closed_date")
    private LocalDateTime closedDate;

    @OneToMany(mappedBy = "account", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @Builder.Default
    private Set<Transaction> transactions = new HashSet<>();

    @CreatedDate
    @Column(name = "created_at", nullable = false, updatable = false)
    private LocalDateTime createdAt;

    @LastModifiedDate
    @Column(name = "updated_at", nullable = false)
    private LocalDateTime updatedAt;

    /**
     * Helper method to add a transaction to the account.
     *
     * @param transaction The transaction to add
     * @return The updated account
     */
    public Account addTransaction(Transaction transaction) {
        transactions.add(transaction);
        transaction.setAccount(this);
        return this;
    }

    /**
     * Helper method to remove a transaction from the account.
     *
     * @param transaction The transaction to remove
     * @return The updated account
     */
    public Account removeTransaction(Transaction transaction) {
        transactions.remove(transaction);
        transaction.setAccount(null);
        return this;
    }

    /**
     * Method to deposit money into the account.
     *
     * @param amount The amount to deposit
     * @return The updated account
     * @throws IllegalArgumentException if amount is negative or zero
     */
    public Account deposit(@Positive BigDecimal amount) {
        if (amount.compareTo(BigDecimal.ZERO) <= 0) {
            throw new IllegalArgumentException("Deposit amount must be positive");
        }
        this.balance = this.balance.add(amount);
        return this;
    }

    /**
     * Method to withdraw money from the account.
     *
     * @param amount The amount to withdraw
     * @return The updated account
     * @throws IllegalArgumentException if amount is negative, zero, or exceeds balance
     */
    public Account withdraw(@Positive BigDecimal amount) {
        if (amount.compareTo(BigDecimal.ZERO) <= 0) {
            throw new IllegalArgumentException("Withdrawal amount must be positive");
        }
        if (amount.compareTo(this.balance) > 0) {
            throw new IllegalArgumentException("Insufficient funds");
        }
        this.balance = this.balance.subtract(amount);
        return this;
    }

    /**
     * Method to check if the account has sufficient funds for a transaction.
     *
     * @param amount The amount to check
     * @return true if sufficient funds are available, false otherwise
     */
    public boolean hasSufficientFunds(BigDecimal amount) {
        return this.balance.compareTo(amount) >= 0;
    }
}