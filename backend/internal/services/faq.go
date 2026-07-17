package services

import (
	"imagine_backend/internal/dto"
	"imagine_backend/internal/repositary"
)

func GetFAQs() (dto.FAQListResponse, error) {
	records, err := repositary.GetAllFAQs()
	if err != nil {
		return dto.FAQListResponse{}, err
	}

	response := dto.FAQListResponse{
		FAQs: make([]dto.FAQResponse, 0, len(records)),
	}
	for _, r := range records {
		response.FAQs = append(response.FAQs, dto.FAQResponse{
			ID:        r.ID,
			Question:  r.Question,
			Answer:    r.Answer,
			SortOrder: r.SortOrder,
		})
	}
	return response, nil
}
