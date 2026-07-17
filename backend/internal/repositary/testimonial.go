package repositary

import (
	"imagine_backend/internal/db"
	"imagine_backend/internal/model"
)

func GetAllTestimonials() ([]model.Testimonial, error) {
	var testimonials []model.Testimonial
	result := db.DB.Order("created_at DESC").Find(&testimonials)
	return testimonials, result.Error
}
