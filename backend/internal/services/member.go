package services

import (
	"errors"
	"imagine_backend/internal/dto"
	"imagine_backend/internal/model"
	"imagine_backend/internal/repositary"
	"strings"
	"unicode/utf8"

	"gorm.io/gorm"
)

var ErrMemberNotFound = errors.New("member not found")

// avatarInitials returns up to two uppercase initials from a full name.
func avatarInitials(name string) string {
	parts := strings.Fields(name)
	if len(parts) == 0 {
		return "??"
	}
	first, _ := utf8.DecodeRuneInString(parts[0])
	if len(parts) == 1 {
		return strings.ToUpper(string(first))
	}
	last, _ := utf8.DecodeRuneInString(parts[len(parts)-1])
	return strings.ToUpper(string(first)) + strings.ToUpper(string(last))
}

func memberToDTO(m *model.Member) dto.MemberResponse {
	joinDate := ""
	if !m.JoinDate.IsZero() {
		joinDate = m.JoinDate.Format("2006-01-02")
	}
	return dto.MemberResponse{
		ID:       m.ID,
		Name:     m.Name,
		Email:    m.Email,
		Phone:    m.Phone,
		Plan:     m.Plan,
		Status:   m.Status,
		JoinDate: joinDate,
		Avatar:   avatarInitials(m.Name),
	}
}

// ListMembers returns all members.
func ListMembers() ([]dto.MemberResponse, error) {
	members, err := repositary.ListMembers()
	if err != nil {
		return nil, ErrInternalServer
	}
	out := make([]dto.MemberResponse, 0, len(members))
	for i := range members {
		out = append(out, memberToDTO(&members[i]))
	}
	return out, nil
}

// CreateMember validates and inserts a new member.
func CreateMember(req dto.MemberRequest) (*dto.MemberResponse, error) {
	joinDate, err := req.ParseJoinDate()
	if err != nil {
		return nil, errors.New("invalid join_date format, expected YYYY-MM-DD")
	}

	m := &model.Member{
		Name:     strings.TrimSpace(req.Name),
		Email:    strings.ToLower(strings.TrimSpace(req.Email)),
		Phone:    strings.TrimSpace(req.Phone),
		Plan:     req.Plan,
		Status:   req.Status,
		JoinDate: joinDate,
	}
	if err := repositary.CreateMember(m); err != nil {
		return nil, ErrInternalServer
	}
	resp := memberToDTO(m)
	return &resp, nil
}

// UpdateMember validates and saves changes to an existing member.
func UpdateMember(id uint, req dto.MemberRequest) (*dto.MemberResponse, error) {
	m, err := repositary.GetMemberByID(id)
	if errors.Is(err, gorm.ErrRecordNotFound) {
		return nil, ErrMemberNotFound
	}
	if err != nil {
		return nil, ErrInternalServer
	}

	joinDate, err := req.ParseJoinDate()
	if err != nil {
		return nil, errors.New("invalid join_date format, expected YYYY-MM-DD")
	}

	m.Name     = strings.TrimSpace(req.Name)
	m.Email    = strings.ToLower(strings.TrimSpace(req.Email))
	m.Phone    = strings.TrimSpace(req.Phone)
	m.Plan     = req.Plan
	m.Status   = req.Status
	m.JoinDate = joinDate

	if err := repositary.UpdateMember(m); err != nil {
		return nil, ErrInternalServer
	}
	resp := memberToDTO(m)
	return &resp, nil
}

// DeleteMember soft-deletes a member by ID.
func DeleteMember(id uint) error {
	_, err := repositary.GetMemberByID(id)
	if errors.Is(err, gorm.ErrRecordNotFound) {
		return ErrMemberNotFound
	}
	if err != nil {
		return ErrInternalServer
	}
	return repositary.DeleteMember(id)
}
