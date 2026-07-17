package services

import (
	"imagine_backend/internal/dto"
	"imagine_backend/internal/repositary"
)

func GetPricingPlans() (dto.PricingListResponse, error) {
	records, err := repositary.GetAllPricingPlans()
	if err != nil {
		return dto.PricingListResponse{}, err
	}

	response := dto.PricingListResponse{
		Plans: make([]dto.PricingResponse, 0, len(records)),
	}
	for _, r := range records {
		response.Plans = append(response.Plans, dto.PricingResponse{
			ID:           r.ID,
			TierName:     r.TierName,
			Description:  r.Description,
			MonthlyPrice: r.MonthlyPrice,
			Features:     r.Features,
			IsPopular:    r.IsPopular,
		})
	}
	return response, nil
}
