package cloudfuncs

import "time"

const (
	// NewMessage is the event type for a newly created message
	NewMessage = "message.new"

	HeaderID      = "X-WEBHOOK-ID"
	HeaderAttempt = "X-WEBHOOK-ATTEMPT"
	HeaderAPIKey  = "X-API-KEY"
	HeaderSig     = "X-SIGNATURE"
)

type PubSubMessage struct {
	Event *Event
}

/*
Response code is 408, 429 or >=500: 3 attempts
Network error: 2 attempts
Request timeout: 3 attempts
The timeout of one request is 6 seconds, and the request with all retries cannot exceed the duration of 15 seconds.
*/

type Event struct {
	Type    string `json:"type"`
	Cid     string `json:"cid"`
	Message struct {
		ID   string `json:"id"`
		Text string `json:"text"`
		HTML string `json:"html"`
		Type string `json:"type"`
		User struct {
			ID        string    `json:"id"`
			Role      string    `json:"role"`
			CreatedAt time.Time `json:"created_at"`
			UpdatedAt time.Time `json:"updated_at"`
			Banned    bool      `json:"banned"`
			Online    bool      `json:"online"`
		} `json:"user"`
		Attachments     []interface{} `json:"attachments"`
		LatestReactions []interface{} `json:"latest_reactions"`
		OwnReactions    []interface{} `json:"own_reactions"`
		ReactionCounts  interface{}   `json:"reaction_counts"`
		ReactionScores  struct {
		} `json:"reaction_scores"`
		ReplyCount     int           `json:"reply_count"`
		CreatedAt      time.Time     `json:"created_at"`
		UpdatedAt      time.Time     `json:"updated_at"`
		MentionedUsers []interface{} `json:"mentioned_users"`
	} `json:"message"`
	User struct {
		ID                 string    `json:"id"`
		Role               string    `json:"role"`
		CreatedAt          time.Time `json:"created_at"`
		UpdatedAt          time.Time `json:"updated_at"`
		Banned             bool      `json:"banned"`
		Online             bool      `json:"online"`
		ChannelUnreadCount int       `json:"channel_unread_count"`
		ChannelLastReadAt  time.Time `json:"channel_last_read_at"`
		TotalUnreadCount   int       `json:"total_unread_count"`
		UnreadChannels     int       `json:"unread_channels"`
		UnreadCount        int       `json:"unread_count"`
	} `json:"user"`
	CreatedAt time.Time `json:"created_at"`
	Members   []struct {
		UserID    string    `json:"user_id"`
		User      []string  `json:"user"`
		CreatedAt time.Time `json:"created_at"`
		UpdatedAt time.Time `json:"updated_at"`
	} `json:"members"`
	ChannelType string `json:"channel_type"`
	ChannelID   string `json:"channel_id"`
}
