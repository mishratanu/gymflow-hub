package dto

type FAQResponse struct {
	ID        uint   `json:"id"`
	Question  string `json:"question"`
	Answer    string `json:"answer"`
	SortOrder int    `json:"sort_order"`
}

type FAQListResponse struct {
	FAQs []FAQResponse `json:"faqs"`
}
