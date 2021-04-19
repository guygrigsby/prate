import React from 'react'
import { useAuth } from './use-auth.js'
import { StreamChat } from 'stream-chat'
import {
  Chat,
  Channel,
  ChannelHeader,
  MessageInput,
  MessageList,
  Thread,
  Window,
} from 'stream-chat-react'

import 'stream-chat-react/dist/css/index.css'
const ChatWindow = ({ user, id }) => {
  const chatClient = StreamChat.getInstance('dbyh5vy8pr2z')
  const userToken =
    'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoic3VwZXItbGVhZi04In0.OE_AiqF3Qu0iXIdrgHmZPyPLhRxZ2R9voVpNLralP-8'

  chatClient.connectUser(
    {
      id: id,
      name: user,
      image:
        'https://getstream.io/random_png/?id=super-leaf-8&name=super-leaf-8',
    },
    userToken,
  )

  const channel = chatClient.channel('commerce', 'super-leaf-8', {
    image: 'https://www.drupal.org/files/project-images/react.png',
    name: 'Prate all the things',
    members: [id],
  })

  return (
    <Chat client={chatClient} theme="commerce dark">
      <Channel channel={channel}>
        <Window>
          <ChannelHeader />
          <MessageList />
          <MessageInput />
        </Window>
        <Thread />
      </Channel>
    </Chat>
  )
}

export default ChatWindow
