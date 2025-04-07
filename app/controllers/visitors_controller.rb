class VisitorsController < ApplicationController
    def chat
        @messages = Message.all
    end

    def vote
        
    end
end