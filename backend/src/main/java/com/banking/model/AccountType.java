package com.banking.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
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
 * Entity representing a type of bank account in the system.
 */
@Entity
@Table(name = "account_types")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@EntityListeners(AuditingEntityListener.class)
public class AccountType {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank
    @Size(max = 50)
    @Column(name = "name", nullable = false, unique = true)
    private String name;

    @Column(name = "description")
    private String description;

    @NotNull
    @Column(name = "minimum_balance", nullable = false)
    private BigDecimal minimumBalance;

    @NotNull
    @Column(name = "interest_rate", nullable = false)
    private BigDecimal interestRate;

    @NotNull
    @Column(name = "monthly_fee", nullable = false)
    private BigDecimal monthlyFee;

    @OneToMany(mappedBy = "accountType", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @Builder.Default
    private Set<Account> accounts = new HashSet<>();

    @CreatedDate
    @Column(name = "created_at", nullable = false, updatable = false)
    private LocalDateTime createdAt;

    @LastModifiedDate
    @Column(name = "updated_at", nullable = false)
    private LocalDateTime updatedAt;

    /**
     * Helper method to add an account to this account type.
     *
     * @param account The account to add
     * @return The updated account type
     */
    public AccountType addAccount(Account account) {
        accounts.add(account);
        account.setAccountType(this);
        return this;
    }

    /**
     * Helper method to remove an account from this account type.
     *
     * @param account The account to remove
     * @return The updated account type
     */
    public AccountType removeAccount(Account account) {
        accounts.remove(account);
        account.setAccountType(null);
        return this;
    }
}