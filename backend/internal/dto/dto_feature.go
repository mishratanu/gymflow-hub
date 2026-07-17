package dto

type FeatureResponse struct {
	ID          uint   `json:"id"`
	Title       string `json:"title"`
	Description string `json:"description"`
	IconURL     string `json:"icon_url"`
}

type FeaturesListResponse struct {
	Features []FeatureResponse `json:"features"`
}
