package repositary

import (
	"imagine_backend/internal/db"
	"imagine_backend/internal/model"
)

func GetAllFeatures() ([]model.Feature, error) {
	var features []model.Feature
	result := db.DB.Order("id ASC").Find(&features)
	return features, result.Error
}
