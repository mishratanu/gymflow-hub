package handler

import (
	"errors"
	"imagine_backend/internal/dto"
	"imagine_backend/internal/repositary"
	"imagine_backend/internal/services"
	"net/http"

	"github.com/gin-gonic/gin"
)

// Signup handles POST /api/auth/signup
func Signup(c *gin.Context) {
	var req dto.SignupRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	resp, err := services.Signup(req)
	if err != nil {
		switch {
		case errors.Is(err, services.ErrEmailTaken):
			c.JSON(http.StatusConflict, gin.H{"error": err.Error()})
		default:
			c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		}
		return
	}

	c.JSON(http.StatusCreated, resp)
}

// Login handles POST /api/auth/login
func Login(c *gin.Context) {
	var req dto.LoginRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	resp, err := services.Login(req)
	if err != nil {
		switch {
		case errors.Is(err, services.ErrInvalidCreds):
			c.JSON(http.StatusUnauthorized, gin.H{"error": err.Error()})
		default:
			c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		}
		return
	}

	// Record last login time (non-blocking) — use the user ID from the service response
	if resp != nil && resp.User.ID > 0 {
		go func() { _ = repositary.UpdateLastLogin(resp.User.ID) }()
	}

	c.JSON(http.StatusOK, resp)
}

// GetMe handles GET /api/auth/me — returns the authenticated user's profile.
func GetMe(c *gin.Context) {
	userIDVal, exists := c.Get("user_id")
	if !exists {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "not authenticated"})
		return
	}
	userID, ok := userIDVal.(uint)
	if !ok {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "invalid user context"})
		return
	}

	info, err := services.GetMe(userID)
	if err != nil {
		switch {
		case errors.Is(err, services.ErrUserNotFound):
			c.JSON(http.StatusNotFound, gin.H{"error": err.Error()})
		default:
			c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		}
		return
	}

	c.JSON(http.StatusOK, info)
}

// ForgotPassword handles POST /api/auth/forgot-password
func ForgotPassword(c *gin.Context) {
	var req dto.ForgotPasswordRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	resp, err := services.ForgotPassword(req)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, resp)
}

// ResetPassword handles POST /api/auth/reset-password
func ResetPassword(c *gin.Context) {
	var req dto.ResetPasswordRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if err := services.ResetPassword(req); err != nil {
		switch {
		case errors.Is(err, services.ErrTokenInvalid):
			c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		case errors.Is(err, services.ErrTokenExpired):
			c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		default:
			c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		}
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "Password reset successfully. You can now sign in with your new password."})
}
