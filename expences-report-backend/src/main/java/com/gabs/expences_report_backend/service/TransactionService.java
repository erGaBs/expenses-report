package com.gabs.expences_report_backend.service;

import com.gabs.expences_report_backend.dto.TransactionResponse;
import com.gabs.expences_report_backend.entity.Transaction;
import com.gabs.expences_report_backend.repository.TransactionRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class TransactionService {

    private final TransactionRepository transactionRepository;

    public TransactionService(TransactionRepository transactionRepository) {
        this.transactionRepository = transactionRepository;
    }

    public List<TransactionResponse> getTransactionsForUser(Long userId) {
        List<Transaction> transactions = transactionRepository.findByUserId(userId);
        return transactions.stream()
                .map(t -> new TransactionResponse(
                        t.getCategory().getName(),
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
                        t.getCategory().getName(),
                        t.getAmount(),
                        t.getDescription(),
                        t.getDate()
                ))
                .collect(Collectors.toList());
    }
}
