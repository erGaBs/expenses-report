package com.gabs.expences_report_backend.repository;

import com.gabs.expences_report_backend.entity.Transaction;
import com.gabs.expences_report_backend.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface TransactionRepository extends JpaRepository<Transaction, Long> {
    List<Transaction> findByUserId(Long userId);
    List<Transaction> findByUserEmail(String email);
}
