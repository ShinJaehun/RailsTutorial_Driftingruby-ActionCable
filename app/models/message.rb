class Message < ApplicationRecord
    after_create_commit :broadcasting
    
    def broadcasting
        # ActionCable.server.broadcast "chat", { 
        #     message: MessagesController.render(
        #         partial: 'messages/message',
        #         locals: {message: self}
        #     ).squish
        # }
        MessageBroadcastJob.perform_later(self)
    end
end
