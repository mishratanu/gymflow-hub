package server

import (
	"imagine_backend/internal/handler"
	v1 "imagine_backend/internal/handler/v1"
	"imagine_backend/internal/middleware"

	"github.com/gin-gonic/gin"
)

func RegisterRoutes(r *gin.Engine) {
	api := r.Group("/api")
	{
		api.GET("/health", handler.HealthCheck)

		// Landing page public endpoints
		api.GET("/testimonials", handler.GetTestimonials)
		api.GET("/pricing", handler.GetPricing)
		api.GET("/features", handler.GetFeatures)
		api.GET("/faq", handler.GetFAQs)

		// Auth endpoints
		auth := api.Group("/auth")
		{
			// Public: no auth required
			auth.POST("/signup", handler.Signup)
			auth.POST("/login", handler.Login)
			auth.POST("/forgot-password", handler.ForgotPassword)
			auth.POST("/reset-password", handler.ResetPassword)

			// Protected: requires valid JWT
			auth.GET("/me", middleware.AuthMiddleware(), handler.GetMe)
		}
	}

	// RAG proxy — consumed by imagine.bo-chat-widget.js
	v1Group := r.Group("/v1")
	{
		v1Group.GET("/kb", v1.ListKBs)
		v1Group.POST("/sessions", v1.CreateSession)
		v1Group.GET("/sessions", v1.ListSessions)
		v1Group.GET("/sessions/:id", v1.GetSessionHistory)
		v1Group.POST("/query", v1.Query)
	}
}
