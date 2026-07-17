package repositary

import (
	"imagine_backend/internal/db"
	"imagine_backend/internal/model"
)

func GetAllFAQs() ([]model.FAQ, error) {
	var faqs []model.FAQ
	result := db.DB.Order("sort_order ASC, id ASC").Find(&faqs)
	return faqs, result.Error
}
