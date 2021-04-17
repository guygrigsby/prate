/* eslint-disable global-require */
import React, { useEffect, useState } from 'react'
import { Chat } from 'stream-chat-react'
import { StreamChat } from 'stream-chat'
import { v4 as uuidv4 } from 'uuid'

import 'stream-chat-react/dist/css/index.css'

import './App.css'

import { useChecklist } from './ChecklistTasks'
import { AgentApp } from './AgentApp'
import { AgentHeader } from './components/AgentHeader/AgentHeader'
import { AgentLoading } from './components/AgentLoading/AgentLoading'
import { CustomerApp } from './CustomerApp'

const urlParams = new URLSearchParams(window.location.search)
const apiKey = urlParams.get('apikey') || process.env.REACT_APP_STREAM_KEY
const agentChannelId = `agent-demo-${uuidv4()}`
const customerChannelId = `customer-demo-${uuidv4()}`
const targetOrigin =
  urlParams.get('target_origin') || process.env.REACT_APP_TARGET_ORIGIN
const theme = 'dark'

const agentUserId =
  urlParams.get('prate_serve') || process.env.REACT_APP_AGENT_ID
const agentUserToken =
  'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoiY29vbC1uaWdodC04In0.nIONM9f1rnbDMTjCHJx8fcG-2TBQf2i15uZIx0CA_kQ'

const customerClient = StreamChat.getInstance(apiKey)
customerClient.setGuestUser({ id: 'guest' })

const App = () => {
  const [agentClient, setAgentClient] = useState()
  const [initialClient, setInitialClient] = useState()
  const [initialChannel, setInitialChannel] = useState()

  /**
   * Creates and watches a channel with a mock customer as the user
   */
  useEffect(() => {
    const getInitialChannel = async () => {
      const client = new StreamChat(apiKey) // since app is dual client need to construct an additional instance

      await client.connectUser(
        {
          id: 'prate_serve',
          name: 'Prate',
          image: 'https://getstream.io/random_svg/?name=Prate',
        },
        'TODO',
      )
      setInitialClient(client)

      const newChannel = await client.channel('commerce', agentChannelId, {
        image: require('./assets/jen-avatar.png'),
        name: 'Jen Alexander',
        issue: 'Enterprise Inquiry',
        subtitle: '#572 Enterprise Inquiry',
      })

      if (newChannel.state.messages.length) {
        newChannel.state.clearMessages()
      }

      await newChannel.watch()

      setInitialChannel(newChannel)
    }

    getInitialChannel()
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  /**
   * Sends messages to mock channel, disconnects mock channel, and sets
   * support agent as current user
   */
  useEffect(() => {
    const sendMessages = async () => {
      await initialChannel.sendMessage({
        text: 'I have a question about Enterprise',
      })

      await initialChannel.sendMessage({
        text:
          'My company is looking to upgrade our account to Enterprise. Can you provide me with some additional pricing information?',
      })

      await initialChannel.stopWatching()
      await initialClient.disconnect()

      const client = new StreamChat(apiKey) // since app is dual client need to construct an additional instance
      await client.connectUser(
        {
          id: agentUserId,
          name: 'Daniel Smith',
          image: require('./assets/user1.png'),
        },
        agentUserToken,
      )

      const [existingChannel] = await client.queryChannels({
        id: agentChannelId,
      })

      await existingChannel.watch()

      setAgentClient(client)
    }

    if (initialChannel && !initialChannel.state.messages.length) {
      sendMessages()
    }
  }, [initialChannel]) // eslint-disable-line react-hooks/exhaustive-deps

  useChecklist(customerClient, targetOrigin)

  return (
    <>
      <div className="agent-wrapper">
        <AgentHeader />
        {agentClient ? (
          <Chat client={agentClient}>
            <AgentApp {...{ agentChannelId, customerChannelId }} />
          </Chat>
        ) : (
          <AgentLoading />
        )}
      </div>
      {customerClient && (
        <Chat client={customerClient} theme={`commerce ${theme}`}>
          <CustomerApp {...{ customerChannelId }} />
        </Chat>
      )}
    </>
  )
}

export default App
