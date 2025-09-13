package com.gabs.expences_report_backend.controller;

import com.gabs.expences_report_backend.dto.TransactionResponse;
import com.gabs.expences_report_backend.service.TransactionService;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/")
public class TransactionController {

    private final TransactionService transactionService;

    public TransactionController(TransactionService transactionService) {
        this.transactionService = transactionService;
    }

    @GetMapping("/expenses")
    public List<TransactionResponse> getExpenses(Authentication authentication) {
        String email = authentication.getName();
        return transactionService.getTransactionsForUserByEmail(email);
    }
}
