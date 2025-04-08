class VoteChannel < ApplicationCable::Channel
  def subscribed
    # stream_from "some_channel"
    stream_from "vote"
    # ActionCable.server.broadcast 'vote', {
    #   power: data['power'],
    #   moethd: 'add'
    # }
  end

  def unsubscribed
    # Any cleanup needed when channel is unsubscribed
    stop_all_streams
  end

  def voted(data)
    # ActionCable.server.broadcast 'vote', power: data['power'], method: 'add'
    puts '##############################################'
    puts data
    puts '##############################################'
    # ActionCable.server.broadcast 'vote', power: data['power'], method: 'add'

    ActionCable.server.broadcast 'vote', { power: data['power'], method: 'add' }
  end

  def reduced(data)
    ActionCable.server.broadcast 'vote', { power: data['power'], method: 'subtract' }
  end
end
