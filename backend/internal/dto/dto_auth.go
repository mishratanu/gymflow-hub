package dto

// SignupRequest is the payload for POST /api/auth/signup
type SignupRequest struct {
	FirstName string `json:"first_name" binding:"required,min=1,max=100"`
	LastName  string `json:"last_name"  binding:"required,min=1,max=100"`
	GymName   string `json:"gym_name"   binding:"required,min=1,max=200"`
	Email     string `json:"email"      binding:"required,email"`
	Password  string `json:"password"   binding:"required,min=8"`
	Plan      string `json:"plan"`
	Role      string `json:"role"`
}

// LoginRequest is the payload for POST /api/auth/login
type LoginRequest struct {
	Email    string `json:"email"    binding:"required,email"`
	Password string `json:"password" binding:"required"`
}

// ForgotPasswordRequest is the payload for POST /api/auth/forgot-password
type ForgotPasswordRequest struct {
	Email string `json:"email" binding:"required,email"`
}

// ForgotPasswordResponse is the response for POST /api/auth/forgot-password
type ForgotPasswordResponse struct {
	Message    string `json:"message"`
	DebugToken string `json:"debug_token,omitempty"` // only in non-production
}

// ResetPasswordRequest is the payload for POST /api/auth/reset-password
type ResetPasswordRequest struct {
	Token       string `json:"token"        binding:"required"`
	NewPassword string `json:"new_password" binding:"required,min=8"`
}

// AuthResponse is returned on successful signup or login
type AuthResponse struct {
	Token string   `json:"token"`
	User  UserInfo `json:"user"`
}

// UserInfo is the safe, public-facing user object (no password hash)
type UserInfo struct {
	ID        uint   `json:"id"`
	FullName  string `json:"full_name"`
	Email     string `json:"email"`
	Role      string `json:"role"`
	GymName   string `json:"gym_name"`
	Plan      string `json:"plan"`
	IsActive  bool   `json:"is_active"`
	AvatarURL string `json:"avatar_url"`
}
