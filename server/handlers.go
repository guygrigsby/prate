package cloudfuncs

import (
	"context"
	"io/ioutil"
	"net/http"
	"os"

	stream "github.com/GetStream/stream-chat-go/v3"
	"github.com/guygrigsby/prate/server/prate"
	"github.com/inconshreveable/log15"
)

// APIKey ...
var APIKey = os.Getenv("STREAM_CHAT_API_KEY")

// APISecret ...
var APISecret = os.Getenv("STREAM_CHAT_API_SECRET")
var serverID = "prate_serve" // your server user id
// QueueEvent ...
func QueueEvent(w http.ResponseWriter, r *http.Request) {
	log := log15.New()

	if r.Method != http.MethodPost {
		http.Error(w, "", http.StatusMethodNotAllowed)
		return
	}
	b, err := ioutil.ReadAll(r.Body)
	if err != nil {
		log.Error(
			"cannot read request",
			"err", err,
		)
		http.Error(w, "Cannot read body", http.StatusBadRequest)
		return
	}
	defer r.Body.Close()

	client, err := stream.NewClient(APIKey, APISecret)
	if err != nil {
		log.Error(
			"cannot create client",
			"err", err,
		)
		return
	}

	if r.Header.Get(HeaderAPIKey) != APIKey {
		http.Error(w, "forbidden", http.StatusForbidden)
		return
	}

	sig := r.Header.Get(HeaderSig)

	if !client.VerifyWebhook(b, []byte(sig)) {
		http.Error(w, "forbidden", http.StatusForbidden)
		return
	}

	// queue it
}

func Message(ctx context.Context, msg PubSubMessage) error {
	log := log15.New()

	event := msg.Event

	if event.User.Banned {
		log.Error(
			"banned User",
		)

	}

	client, err := stream.NewClient(APIKey, APISecret)
	if err != nil {
		log.Error(
			"cannot create client",
			"err", err,
		)
		return err
	}
	// create channel with users
	users := []string{serverID, event.User.ID}
	channel, err := client.CreateChannel("messaging", event.ChannelID, serverID, map[string]interface{}{
		"members": users,
	})
	if err != nil {
		log.Error(
			"cannot create channel",
			"err", err,
		)
		return err
	}

	res, err := prate.Process(ctx, event.Message.Text)
	if err != nil {
		log.Error(
			"cannot process message",
			"message", event.Message.Text,
			"err", err,
		)
		return err
	}

	_, err = channel.SendMessage(&stream.Message{Text: res.Text}, event.User.ID)

	if err != nil {
		log.Error(
			"cannot send message",
			"err", err,
		)
		return err
	}
	return nil
}
