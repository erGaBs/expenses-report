package com.gabs.expences_report_backend.dto;


import java.time.LocalDateTime;

public record TransactionResponse(
        Long id,
        String category,
        String type,
        Double amount,
        String description,
        LocalDateTime date
) {}
