import React from 'react'
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

const chatClient = StreamChat.getInstance('dbyh5vy8pr2z')
const userToken =
  'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoic3VwZXItbGVhZi04In0.OE_AiqF3Qu0iXIdrgHmZPyPLhRxZ2R9voVpNLralP-8'

chatClient.connectUser(
  {
    id: 'super-leaf-8',
    name: 'super-leaf-8',
    image: 'https://getstream.io/random_png/?id=super-leaf-8&name=super-leaf-8',
  },
  userToken,
)

const channel = chatClient.channel('messaging', 'super-leaf-8', {
  // add as many custom fields as you'd like
  image: 'https://www.drupal.org/files/project-images/react.png',
  name: 'Talk about React',
  members: ['super-leaf-8'],
})

const App = () => (
  <Chat client={chatClient} theme="messaging light">
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

export default App
