package services

import (
	"crypto/rand"
	"encoding/hex"
	"errors"
	"fmt"
	"imagine_backend/internal/dto"
	"imagine_backend/internal/model"
	"imagine_backend/internal/repositary"
	"imagine_backend/internal/utils"
	"strings"
	"time"

	"golang.org/x/crypto/bcrypt"
	"gorm.io/gorm"
)

var (
	ErrEmailTaken     = errors.New("an account with this email already exists")
	ErrInvalidCreds   = errors.New("invalid email or password")
	ErrInternalServer = errors.New("something went wrong, please try again")
	ErrUserNotFound   = errors.New("no account found with that email address")
	ErrTokenExpired   = errors.New("reset link has expired, please request a new one")
	ErrTokenInvalid   = errors.New("invalid or already used reset link")
)

// Signup creates a new gym-owner account and returns a signed JWT + user info.
func Signup(req dto.SignupRequest) (*dto.AuthResponse, error) {
	email := strings.ToLower(strings.TrimSpace(req.Email))

	_, err := repositary.FindUserByEmail(email)
	if err == nil {
		return nil, ErrEmailTaken
	}
	if !errors.Is(err, gorm.ErrRecordNotFound) {
		return nil, ErrInternalServer
	}

	hash, err := bcrypt.GenerateFromPassword([]byte(req.Password), bcrypt.DefaultCost)
	if err != nil {
		return nil, ErrInternalServer
	}

	plan := req.Plan
	if plan == "" {
		plan = "Pro"
	}

	role := req.Role
	if role == "" {
		role = "gym_owner"
	}

	user := &model.User{
		Email:        email,
		PasswordHash: string(hash),
		FullName:     strings.TrimSpace(req.FirstName) + " " + strings.TrimSpace(req.LastName),
		Role:         role,
		GymName:      strings.TrimSpace(req.GymName),
		Plan:         plan,
		IsActive:     true,
	}

	if err := repositary.CreateUser(user); err != nil {
		return nil, ErrInternalServer
	}

	token, err := utils.GenerateJWT(user.ID, user.Email, user.Role)
	if err != nil {
		return nil, ErrInternalServer
	}

	return &dto.AuthResponse{
		Token: token,
		User: dto.UserInfo{
			ID:       user.ID,
			FullName: user.FullName,
			Email:    user.Email,
			Role:     user.Role,
			GymName:  user.GymName,
			Plan:     user.Plan,
			IsActive: user.IsActive,
		},
	}, nil
}

// Login validates credentials and returns a signed JWT + user info.
func Login(req dto.LoginRequest) (*dto.AuthResponse, error) {
	email := strings.ToLower(strings.TrimSpace(req.Email))

	user, err := repositary.FindUserByEmail(email)
	if errors.Is(err, gorm.ErrRecordNotFound) {
		return nil, ErrInvalidCreds
	}
	if err != nil {
		return nil, ErrInternalServer
	}

	if !user.IsActive {
		return nil, errors.New("your account has been deactivated, please contact support")
	}

	if err := bcrypt.CompareHashAndPassword([]byte(user.PasswordHash), []byte(req.Password)); err != nil {
		return nil, ErrInvalidCreds
	}

	token, err := utils.GenerateJWT(user.ID, user.Email, user.Role)
	if err != nil {
		return nil, ErrInternalServer
	}

	return &dto.AuthResponse{
		Token: token,
		User: dto.UserInfo{
			ID:       user.ID,
			FullName: user.FullName,
			Email:    user.Email,
			Role:     user.Role,
			GymName:  user.GymName,
			Plan:     user.Plan,
			IsActive: user.IsActive,
		},
	}, nil
}

// GetMe returns the full user profile for an authenticated user.
func GetMe(userID uint) (*dto.UserInfo, error) {
	user, err := repositary.FindUserByID(userID)
	if errors.Is(err, gorm.ErrRecordNotFound) {
		return nil, ErrUserNotFound
	}
	if err != nil {
		return nil, ErrInternalServer
	}
	return &dto.UserInfo{
		ID:       user.ID,
		FullName: user.FullName,
		Email:    user.Email,
		Role:     user.Role,
		GymName:  user.GymName,
		Plan:     user.Plan,
		IsActive: user.IsActive,
	}, nil
}

// ForgotPassword generates a reset token and stores it (in production this would email the link).
func ForgotPassword(req dto.ForgotPasswordRequest) (*dto.ForgotPasswordResponse, error) {
	email := strings.ToLower(strings.TrimSpace(req.Email))

	user, err := repositary.FindUserByEmail(email)
	if errors.Is(err, gorm.ErrRecordNotFound) {
		// Security: always return success to prevent email enumeration
		return &dto.ForgotPasswordResponse{
			Message: "If an account exists with that email, a reset link has been sent.",
		}, nil
	}
	if err != nil {
		return nil, ErrInternalServer
	}

	// Generate a cryptographically secure random token
	tokenBytes := make([]byte, 32)
	if _, err := rand.Read(tokenBytes); err != nil {
		return nil, ErrInternalServer
	}
	resetToken := hex.EncodeToString(tokenBytes)
	expiry := time.Now().Add(1 * time.Hour)

	if err := repositary.SetPasswordResetToken(user.ID, resetToken, expiry); err != nil {
		return nil, ErrInternalServer
	}

	// In production: send email with link containing resetToken
	// For now we return the token in the response for integration testing
	_ = fmt.Sprintf("https://gymflow.io/reset-password?token=%s", resetToken)

	return &dto.ForgotPasswordResponse{
		Message: "If an account exists with that email, a reset link has been sent.",
		DebugToken: resetToken, // Remove in production; useful for testing
	}, nil
}

// ResetPassword validates the token and updates the user's password.
func ResetPassword(req dto.ResetPasswordRequest) error {
	user, err := repositary.FindUserByResetToken(req.Token)
	if errors.Is(err, gorm.ErrRecordNotFound) {
		return ErrTokenInvalid
	}
	if err != nil {
		return ErrInternalServer
	}

	if user.ResetTokenExpiry == nil || time.Now().After(*user.ResetTokenExpiry) {
		return ErrTokenExpired
	}

	hash, err := bcrypt.GenerateFromPassword([]byte(req.NewPassword), bcrypt.DefaultCost)
	if err != nil {
		return ErrInternalServer
	}

	if err := repositary.UpdatePasswordAndClearToken(user.ID, string(hash)); err != nil {
		return ErrInternalServer
	}

	return nil
}
