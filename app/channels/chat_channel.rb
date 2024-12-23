class ChatChannel < ApplicationCable::Channel
  def subscribed
    # stream_from "ChatChannel:#{params[:chat_message_id]}"
    stream_from "chat"

  end

  def unsubscribed
    # Any cleanup needed when channel is unsubscribed
    stop_all_streams
  end
end
