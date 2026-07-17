package services

import (
	"imagine_backend/internal/dto"
	"imagine_backend/internal/repositary"
)

func GetTestimonials() (dto.TestimonialsListResponse, error) {
	records, err := repositary.GetAllTestimonials()
	if err != nil {
		return dto.TestimonialsListResponse{}, err
	}

	response := dto.TestimonialsListResponse{
		Testimonials: make([]dto.TestimonialResponse, 0, len(records)),
	}
	for _, r := range records {
		response.Testimonials = append(response.Testimonials, dto.TestimonialResponse{
			ID:        r.ID,
			OwnerName: r.OwnerName,
			GymName:   r.GymName,
			Content:   r.Content,
			AvatarURL: r.AvatarURL,
			Rating:    r.Rating,
		})
	}
	return response, nil
}
