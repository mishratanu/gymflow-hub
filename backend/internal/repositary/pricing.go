package repositary

import (
	"imagine_backend/internal/db"
	"imagine_backend/internal/model"
)

func GetAllPricingPlans() ([]model.Pricing, error) {
	var plans []model.Pricing
	result := db.DB.Order("monthly_price ASC").Find(&plans)
	return plans, result.Error
}
