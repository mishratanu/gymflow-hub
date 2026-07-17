package services

import (
	"imagine_backend/internal/dto"
	"imagine_backend/internal/repositary"
)

func GetFeatures() (dto.FeaturesListResponse, error) {
	records, err := repositary.GetAllFeatures()
	if err != nil {
		return dto.FeaturesListResponse{}, err
	}

	response := dto.FeaturesListResponse{
		Features: make([]dto.FeatureResponse, 0, len(records)),
	}
	for _, r := range records {
		response.Features = append(response.Features, dto.FeatureResponse{
			ID:          r.ID,
			Title:       r.Title,
			Description: r.Description,
			IconURL:     r.IconURL,
		})
	}
	return response, nil
}
