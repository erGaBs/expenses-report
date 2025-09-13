package com.gabs.expences_report_backend.dto;


import java.time.LocalDateTime;

public record TransactionResponse(
        String category,
        Double amount,
        String description,
        LocalDateTime date
) {}
