package middleware

import (
	"net/http"

	"github.com/gin-gonic/gin"
)

// RequireRoles returns a middleware that allows only the specified roles.
// It must be chained AFTER AuthMiddleware() so that the "role" context key is set.
//
// Usage:
//
//	protected.GET("/admin", middleware.RequireRoles("super_admin", "gym_owner"), handler.AdminHandler)
func RequireRoles(roles ...string) gin.HandlerFunc {
	allowed := make(map[string]struct{}, len(roles))
	for _, r := range roles {
		allowed[r] = struct{}{}
	}

	return func(c *gin.Context) {
		roleVal, exists := c.Get("role")
		if !exists {
			c.JSON(http.StatusForbidden, gin.H{"error": "access denied: role not set"})
			c.Abort()
			return
		}

		role, ok := roleVal.(string)
		if !ok {
			c.JSON(http.StatusForbidden, gin.H{"error": "access denied: invalid role type"})
			c.Abort()
			return
		}

		if _, permitted := allowed[role]; !permitted {
			c.JSON(http.StatusForbidden, gin.H{
				"error": "access denied: your role does not have permission for this resource",
				"role":  role,
			})
			c.Abort()
			return
		}

		c.Next()
	}
}
