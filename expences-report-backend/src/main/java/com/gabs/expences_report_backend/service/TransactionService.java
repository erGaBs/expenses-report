package com.gabs.expences_report_backend.service;

import com.gabs.expences_report_backend.dto.TransactionResponse;
import com.gabs.expences_report_backend.entity.Category;
import com.gabs.expences_report_backend.entity.Transaction;
import com.gabs.expences_report_backend.entity.User;
import com.gabs.expences_report_backend.repository.CategoryRepository;
import com.gabs.expences_report_backend.repository.TransactionRepository;
import com.gabs.expences_report_backend.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class TransactionService {

    private final TransactionRepository transactionRepository;
    private final UserRepository userRepository;
    private final CategoryRepository categoryRepository;

    public TransactionService(TransactionRepository transactionRepository, UserRepository userRepository, CategoryRepository categoryRepository) {
        this.transactionRepository = transactionRepository;
        this.userRepository = userRepository;
        this.categoryRepository = categoryRepository;
    }

    public List<TransactionResponse> getTransactionsForUser(Long userId) {
        List<Transaction> transactions = transactionRepository.findByUserId(userId);
        return transactions.stream()
                .map(t -> new TransactionResponse(
                        t.getId(),
                        t.getCategory().getName(),
                        t.getCategory().getType(),
                        t.getAmount(),
                        t.getDescription(),
                        t.getDate()
                ))
                .collect(Collectors.toList());
    }

    public List<TransactionResponse> getTransactionsForUserByEmail(String email) {
        return transactionRepository.findByUserEmail(email)
                .stream()
                .map(t -> new TransactionResponse(
                        t.getId(),
                        t.getCategory().getName(),
                        t.getCategory().getType(),
                        t.getAmount(),
                        t.getDescription(),
                        t.getDate()
                ))
                .collect(Collectors.toList());
    }

    public Transaction addTransaction(String userEmail, String description, Double amount, Long categoryId, LocalDateTime date) {
        User user = userRepository.findByEmail(userEmail)
                .orElseThrow(() -> new RuntimeException("User not found"));

        Category category = null;
        if (categoryId != null) {
            category = categoryRepository.findById(categoryId)
                    .orElseThrow(() -> new RuntimeException("Category not found"));
        }

        Transaction transaction = new Transaction();
        transaction.setUser(user);
        transaction.setDescription(description);
        transaction.setAmount(amount);
        transaction.setCategory(category);
        transaction.setDate(date);

        return transactionRepository.save(transaction);
    }
}
