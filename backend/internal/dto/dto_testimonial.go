package dto

type TestimonialResponse struct {
	ID        uint   `json:"id"`
	OwnerName string `json:"owner_name"`
	GymName   string `json:"gym_name"`
	Content   string `json:"content"`
	AvatarURL string `json:"avatar_url"`
	Rating    int    `json:"rating"`
}

type TestimonialsListResponse struct {
	Testimonials []TestimonialResponse `json:"testimonials"`
}
