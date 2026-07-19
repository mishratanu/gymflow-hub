package dto

import "time"

// MemberRequest is used for both create and update
type MemberRequest struct {
	Name     string `json:"name"     binding:"required,min=2,max=255"`
	Email    string `json:"email"    binding:"required,email"`
	Phone    string `json:"phone"`
	Plan     string `json:"plan"     binding:"required,oneof=Basic Standard Premium Elite"`
	Status   string `json:"status"   binding:"required,oneof=Active Expired Suspended"`
	JoinDate string `json:"join_date"` // YYYY-MM-DD
}

// MemberResponse is the public-facing member object
type MemberResponse struct {
	ID       uint   `json:"id"`
	Name     string `json:"name"`
	Email    string `json:"email"`
	Phone    string `json:"phone"`
	Plan     string `json:"plan"`
	Status   string `json:"status"`
	JoinDate string `json:"join_date"`
	Avatar   string `json:"avatar"`
}

// ParseJoinDate parses the request's JoinDate string to time.Time
func (r *MemberRequest) ParseJoinDate() (time.Time, error) {
	if r.JoinDate == "" {
		return time.Now(), nil
	}
	return time.Parse("2006-01-02", r.JoinDate)
}
