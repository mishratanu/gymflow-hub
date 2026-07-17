package dto

type PricingResponse struct {
	ID           uint    `json:"id"`
	TierName     string  `json:"tier_name"`
	Description  string  `json:"description"`
	MonthlyPrice float64 `json:"monthly_price"`
	Features     string  `json:"features"`
	IsPopular    bool    `json:"is_popular"`
}

type PricingListResponse struct {
	Plans []PricingResponse `json:"plans"`
}
