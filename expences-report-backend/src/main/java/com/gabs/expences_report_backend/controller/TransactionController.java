package com.gabs.expences_report_backend.controller;

import com.gabs.expences_report_backend.dto.TransactionResponse;
import com.gabs.expences_report_backend.entity.Transaction;
import com.gabs.expences_report_backend.service.TransactionService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;

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

    @PostMapping("/addExpense")
    public ResponseEntity<String> addExpense(@RequestBody Map<String, Object> request,
                                                  @AuthenticationPrincipal UserDetails userDetails) {
        String userEmail = userDetails.getUsername();
        String description = (String) request.get("description");
        Double amount = Double.valueOf(request.get("amount").toString());
        Long categoryId = request.get("categoryId") != null ? Long.valueOf(request.get("categoryId").toString()) : null;
        LocalDateTime date = LocalDateTime.parse((String) request.get("date"));

        Transaction saved = transactionService.addTransaction(userEmail, description, amount, categoryId, date);
        return ResponseEntity.ok("saved");
    }
}
